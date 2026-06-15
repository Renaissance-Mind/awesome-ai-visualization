#!/usr/bin/env python3
"""Scrape official research links for catalog entries.

The output is intentionally separate from README files. It is a research cache
for official docs, demos, examples, templates, papers, and media links.
"""

from __future__ import annotations

import argparse
import concurrent.futures
import datetime as dt
import re
import sys
import warnings
from dataclasses import dataclass
from html import unescape
from pathlib import Path
from typing import Any
from urllib.parse import parse_qs, urljoin, urlparse, urlunparse

import requests
import yaml
from bs4 import BeautifulSoup, MarkupResemblesLocatorWarning


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_CATALOG = ROOT / "data" / "catalog.yml"
DEFAULT_OUTPUT = ROOT / "data" / "tool-research.yml"

USER_AGENT = "awesome-illustration-research/1.0 (+https://github.com)"
REQUEST_TIMEOUT = 16
MAX_WORKERS = 8
MAX_LINKS_PER_ENTRY = 40
MAX_EXAMPLE_LINKS_PER_ENTRY = 20
MAX_EFFECT_ASSETS_PER_ENTRY = 12

LINK_KIND_PATTERNS: list[tuple[str, re.Pattern[str]]] = [
    ("example", re.compile(r"\bexamples?\b|\bsamples?\b|示例|案例|case[- ]?stud(y|ies)", re.I)),
    ("demo", re.compile(r"\bdemo\b|演示|live demo|try it|playground|sandbox", re.I)),
    ("showcase", re.compile(r"showcase|gallery|画廊|作品|展示", re.I)),
    ("template", re.compile(r"template|templates|theme|themes|layout|layouts|starter|模板|主题|素材|布局|母版", re.I)),
    ("tutorial", re.compile(r"tutorial|walkthrough|course|lesson|教程|课程|指南", re.I)),
    ("docs", re.compile(r"\bdocs?\b|documentation|quickstart|getting started|guide|usage|manual|reference|api|文档|说明", re.I)),
    ("paper", re.compile(r"\barxiv\b|\bpapers?\b|\bpublications?\b|\bbenchmarks?\b|\bdatasets?\b|\bleaderboard\b|论文|评测|数据集|基准", re.I)),
    ("video", re.compile(r"youtube|youtu\.be|video|loom|bilibili|录屏|视频", re.I)),
]

EXAMPLE_KINDS = {"example", "demo", "showcase", "template", "tutorial", "paper", "video"}
EXCLUDED_LINK_DOMAINS = {
    "img.shields.io",
    "api.star-history.com",
    "star-history.com",
    "badge.fury.io",
    "docusaurus.io",
}
EXCLUDED_PATH_PARTS = {
    "license",
    "code_of_conduct",
    "contributing",
    "security",
    "stargazers",
    "forks",
    "issues",
    "pulls",
    "actions",
    "workflows",
}

MARKDOWN_LINK_RE = re.compile(r"(?<!!)\[([^\]\n]{1,160})\]\(([^)\s]+)(?:\s+\"[^\"]*\")?\)")
MARKDOWN_IMAGE_RE = re.compile(r"!\[([^\]\n]{0,180})\]\(([^)\s]+)(?:\s+\"[^\"]*\")?\)")
HTML_LINK_RE = re.compile(r"<a\s+[^>]*href=[\"']([^\"']+)[\"'][^>]*>(.*?)</a>", re.I | re.S)
HEADING_RE = re.compile(r"^\s{0,3}#{1,4}\s+(.+?)\s*$", re.M)
HEADING_SIGNAL_RE = re.compile(
    r"showcase|examples?|samples?|demo|gallery|template|tutorial|quickstart|get started|documentation|docs|usage|"
    r"benchmark|dataset|paper2|poster|video|slides?|presentation|dashboard|visual|diagram|playground|"
    r"示例|演示|模板|教程|文档|案例|画廊|图表|可视化|演示文稿",
    re.I,
)
warnings.filterwarnings("ignore", category=MarkupResemblesLocatorWarning)

MEDIA_EXTENSIONS = (".png", ".jpg", ".jpeg", ".gif", ".webp", ".mp4", ".webm", ".mov", ".avif")
IMAGE_EXTENSIONS = (".png", ".jpg", ".jpeg", ".webp", ".avif")
ANIMATED_EXTENSIONS = (".gif",)
VIDEO_EXTENSIONS = (".mp4", ".webm", ".mov")
ASSET_SIGNAL_RE = re.compile(
    r"screenshot|screen[-_ ]?shot|showcase|gallery|demo|example|sample|result|output|preview|cover|poster|"
    r"before|after|workflow|comparison|效果|示例|案例|展示|演示|预览|输出|结果|截图|对比",
    re.I,
)
MEDIA_NOISE_RE = re.compile(
    r"badge|shield|logo|icon|favicon|avatar|profile|sponsor|license|stars?|fork|visitor|counter|"
    r"download|pypi|npm|version|coverage|discord|twitter|x\.com|wechat|weixin|qr|二维码",
    re.I,
)


class NoAliasDumper(yaml.SafeDumper):
    def ignore_aliases(self, data: Any) -> bool:
        return True


@dataclass(frozen=True)
class Source:
    kind: str
    url: str
    link_base_url: str


def normalize_url(url: str) -> str:
    parsed = urlparse(url.strip())
    if not parsed.scheme:
        return url.strip()
    parsed = parsed._replace(fragment="")
    return urlunparse(parsed)


def strip_tracking_query(url: str) -> str:
    parsed = urlparse(url)
    if parsed.netloc.endswith("github.com") and parsed.query == "plain=1":
        parsed = parsed._replace(query="")
    return urlunparse(parsed)


def normalize_asset_url(url: str) -> str:
    parsed = urlparse(normalize_url(url))
    if "X-Amz-" in parsed.query or "AWS4-HMAC-SHA256" in parsed.query:
        parsed = parsed._replace(query="")
    if parsed.netloc.lower() == "github.com":
        parts = [part for part in parsed.path.split("/") if part]
        if len(parts) >= 5 and parts[2] == "blob":
            owner, repo, branch = parts[0], parts[1], parts[3]
            file_path = "/".join(parts[4:])
            return urlunparse(
                parsed._replace(
                    netloc="raw.githubusercontent.com",
                    path=f"/{owner}/{repo}/{branch}/{file_path}",
                    query="",
                )
            )
    return urlunparse(parsed)


def github_repo_from_url(url: str) -> tuple[str, str] | None:
    parsed = urlparse(url)
    if parsed.netloc.lower() != "github.com":
        return None
    parts = [part for part in parsed.path.split("/") if part]
    if len(parts) < 2:
        return None
    return parts[0], parts[1]


def github_raw_from_blob_url(url: str) -> Source | None:
    parsed = urlparse(strip_tracking_query(url))
    if parsed.netloc.lower() != "github.com":
        return None
    parts = [part for part in parsed.path.split("/") if part]
    if len(parts) < 5 or parts[2] != "blob":
        return None
    owner, repo, branch = parts[0], parts[1], parts[3]
    file_path = "/".join(parts[4:])
    raw_url = f"https://raw.githubusercontent.com/{owner}/{repo}/{branch}/{file_path}"
    base_path = "/".join(parts[:4] + parts[4:-1])
    return Source("github_blob_raw", raw_url, f"https://github.com/{base_path}/")


def github_readme_source(url: str) -> Source | None:
    repo = github_repo_from_url(url)
    if not repo:
        return None
    owner, repo_name = repo
    raw_url = f"https://raw.githubusercontent.com/{owner}/{repo_name}/HEAD/README.md"
    return Source("github_readme", raw_url, f"https://github.com/{owner}/{repo_name}/blob/HEAD/")


def github_readme_alternatives(url: str) -> list[str]:
    parsed = urlparse(url)
    if parsed.netloc.lower() != "raw.githubusercontent.com":
        return []
    parts = [part for part in parsed.path.split("/") if part]
    if len(parts) < 4 or parts[2] != "HEAD" or parts[-1] != "README.md":
        return []
    owner, repo = parts[0], parts[1]
    names = ["Readme.md", "README.rst", "README", "readme.md"]
    return [f"https://raw.githubusercontent.com/{owner}/{repo}/HEAD/{name}" for name in names]


def html_to_text(text: str) -> str:
    soup = BeautifulSoup(text, "html.parser")
    return soup.get_text(" ", strip=True)


def clean_text(text: str) -> str:
    text = unescape(text)
    if "<" in text and ">" in text:
        text = BeautifulSoup(text, "html.parser").get_text(" ", strip=True)
    text = re.sub(r"\s+", " ", text).strip()
    return text[:180]


def classify_link(title: str, url: str) -> str | None:
    if is_noise_link(title, url):
        return None
    parsed = urlparse(url)
    haystack = f"{title} {parsed.path} {parsed.query}".lower()
    for kind, pattern in LINK_KIND_PATTERNS:
        if pattern.search(haystack):
            return kind
    return None


def media_extension(url: str) -> str:
    parsed = urlparse(url)
    path = parsed.path.lower()
    return next((extension for extension in MEDIA_EXTENSIONS if path.endswith(extension)), "")


def media_label_from_url(url: str) -> str:
    filename = urlparse(url).path.rstrip("/").split("/")[-1]
    stem = filename.rsplit(".", 1)[0] if "." in filename else filename
    label = re.sub(r"[-_]+", " ", stem).strip()
    return clean_text(label.title()) if label else "Official media"


def youtube_id(url: str) -> str | None:
    parsed = urlparse(url)
    domain = parsed.netloc.lower()
    if "youtube.com" in domain:
        return parse_qs(parsed.query).get("v", [None])[0]
    if domain == "youtu.be":
        return parsed.path.strip("/") or None
    return None


def loom_id(url: str) -> str | None:
    parsed = urlparse(url)
    if "loom.com" not in parsed.netloc.lower():
        return None
    parts = [part for part in parsed.path.split("/") if part]
    if len(parts) >= 2 and parts[0] in {"share", "embed"}:
        return parts[1]
    return None


def asset_kind(url: str) -> str | None:
    extension = media_extension(url)
    if extension in IMAGE_EXTENSIONS:
        return "image"
    if extension in ANIMATED_EXTENSIONS:
        return "gif"
    if extension in VIDEO_EXTENSIONS:
        return "video"
    if youtube_id(url):
        return "video"
    if loom_id(url):
        return "video"
    return None


def youtube_thumbnail_url(url: str) -> str | None:
    video_id = youtube_id(url)
    if not video_id:
        return None
    return f"https://img.youtube.com/vi/{video_id}/hqdefault.jpg"


def asset_score(asset: dict[str, str]) -> int:
    haystack = f"{asset.get('title', '')} {urlparse(asset['url']).path}"
    score = 0
    if ASSET_SIGNAL_RE.search(haystack):
        score += 5
    if asset["kind"] in {"gif", "video"}:
        score += 3
    if asset["kind"] == "image":
        score += 2
    if "githubusercontent.com" in urlparse(asset["url"]).netloc:
        score += 1
    return score


def is_noise_link(title: str, url: str) -> bool:
    title = title.strip()
    if title.startswith("!["):
        return True
    parsed = urlparse(url)
    domain = parsed.netloc.lower()
    if domain in EXCLUDED_LINK_DOMAINS:
        return True
    path_parts = {part.lower() for part in parsed.path.split("/") if part}
    if path_parts & EXCLUDED_PATH_PARTS:
        return True
    filename = parsed.path.rstrip("/").split("/")[-1].lower()
    if filename in {"license", "license.md", "readme", "readme.md"}:
        return True
    return False


def source_title(text: str, content_type: str) -> str | None:
    if "html" in content_type:
        soup = BeautifulSoup(text, "html.parser")
        if soup.title and soup.title.string:
            return clean_text(soup.title.string)
        meta = soup.find("meta", attrs={"property": "og:title"}) or soup.find("meta", attrs={"name": "title"})
        if meta and meta.get("content"):
            return clean_text(meta["content"])
    heading = HEADING_RE.search(text)
    if heading:
        return clean_text(heading.group(1))
    return None


def source_description(text: str, content_type: str) -> str | None:
    if "html" not in content_type:
        return None
    soup = BeautifulSoup(text, "html.parser")
    meta = soup.find("meta", attrs={"name": "description"}) or soup.find("meta", attrs={"property": "og:description"})
    if meta and meta.get("content"):
        return clean_text(meta["content"])
    return None


def extract_links(text: str, content_type: str, base_url: str, source_url: str) -> list[dict[str, str]]:
    links: list[dict[str, str]] = []
    if "html" in content_type:
        for href, label in HTML_LINK_RE.findall(text):
            add_link(links, href, clean_text(label), base_url, source_url)
    else:
        for label, href in MARKDOWN_LINK_RE.findall(text):
            add_link(links, href, clean_text(label), base_url, source_url)
    return links


def srcset_first_url(srcset: str) -> str:
    return srcset.split(",", 1)[0].strip().split(" ", 1)[0]


def is_noise_asset(title: str, url: str) -> bool:
    parsed = urlparse(url)
    domain = parsed.netloc.lower()
    haystack = f"{title} {parsed.path}".lower()
    if domain in EXCLUDED_LINK_DOMAINS:
        return True
    if MEDIA_NOISE_RE.search(haystack):
        return True
    if parsed.path.lower().endswith(".svg") and not ASSET_SIGNAL_RE.search(haystack):
        return True
    return False


def add_asset(
    assets: list[dict[str, str]],
    raw_url: str,
    title: str,
    base_url: str,
    source_url: str,
    *,
    kind_override: str | None = None,
    thumbnail_url: str | None = None,
) -> None:
    raw_url = raw_url.strip()
    if not raw_url or raw_url.startswith(("#", "mailto:", "javascript:", "tel:", "data:")):
        return
    absolute = normalize_asset_url(urljoin(base_url, raw_url))
    kind = kind_override or asset_kind(absolute)
    if not kind or is_noise_asset(title, absolute):
        return

    asset = {
        "kind": kind,
        "title": clean_text(title) or media_label_from_url(absolute),
        "url": absolute,
        "source": source_url,
    }
    if thumbnail_url:
        asset["thumbnail_url"] = thumbnail_url
    assets.append(asset)


def extract_html_media_assets(text: str, content_type: str, media_base_url: str, source_url: str) -> list[dict[str, str]]:
    assets: list[dict[str, str]] = []
    soup = BeautifulSoup(text, "html.parser")

    if "html" in content_type:
        for meta_name in ("og:image", "twitter:image"):
            meta = soup.find("meta", attrs={"property": meta_name}) or soup.find("meta", attrs={"name": meta_name})
            if meta and meta.get("content"):
                add_asset(assets, meta["content"], source_title(text, content_type) or meta_name, media_base_url, source_url)

    for image in soup.find_all("img"):
        src = image.get("src") or image.get("data-src") or image.get("data-original")
        if not src and image.get("srcset"):
            src = srcset_first_url(image["srcset"])
        if src:
            title = image.get("alt") or image.get("title") or media_label_from_url(src)
            add_asset(assets, src, title, media_base_url, source_url)

    for video in soup.find_all("video"):
        poster = video.get("poster")
        if poster:
            add_asset(assets, poster, video.get("title") or media_label_from_url(poster), media_base_url, source_url)
        src = video.get("src")
        if src:
            add_asset(assets, src, video.get("title") or media_label_from_url(src), media_base_url, source_url)
        for source in video.find_all("source"):
            if source.get("src"):
                add_asset(
                    assets,
                    source["src"],
                    source.get("title") or media_label_from_url(source["src"]),
                    media_base_url,
                    source_url,
                )
    return assets


def extract_effect_assets(text: str, content_type: str, media_base_url: str, source_url: str) -> list[dict[str, str]]:
    assets: list[dict[str, str]] = extract_html_media_assets(text, content_type, media_base_url, source_url)
    if "html" in content_type:
        pass
    else:
        for label, href in MARKDOWN_IMAGE_RE.findall(text):
            add_asset(assets, href, label or media_label_from_url(href), media_base_url, source_url)
        for label, href in MARKDOWN_LINK_RE.findall(text):
            if media_extension(href) or youtube_id(href) or loom_id(href):
                add_asset(assets, href, label or media_label_from_url(href), media_base_url, source_url)
    return assets


def add_link(links: list[dict[str, str]], href: str, title: str, base_url: str, source_url: str) -> None:
    href = href.strip()
    if not href or href.startswith(("#", "mailto:", "javascript:", "tel:")):
        return
    absolute = normalize_url(urljoin(base_url, href))
    if not absolute.startswith(("http://", "https://")):
        return
    kind = classify_link(title, absolute)
    if not kind:
        return
    links.append(
        {
            "kind": kind,
            "title": title or absolute,
            "url": absolute,
            "source": source_url,
        }
    )


def heading_signals(text: str) -> list[str]:
    signals: list[str] = []
    for heading in HEADING_RE.findall(text):
        title = clean_text(heading)
        if HEADING_SIGNAL_RE.search(title):
            signals.append(title)
    return list(dict.fromkeys(signals))[:12]


def fetch_source(session: requests.Session, source: Source) -> dict[str, Any]:
    urls_to_try = [source.url]
    if source.kind == "github_readme":
        urls_to_try.extend(github_readme_alternatives(source.url))

    attempts: list[dict[str, Any]] = []
    response: requests.Response | None = None
    for url in urls_to_try:
        response = session.get(url, timeout=REQUEST_TIMEOUT, allow_redirects=True)
        attempts.append({"url": url, "status": response.status_code})
        if response.status_code < 400:
            break

    if response is None:
        raise RuntimeError(f"No response for {source.url}")

    content_type = response.headers.get("content-type", "").split(";")[0].lower()
    result: dict[str, Any] = {
        "kind": source.kind,
        "url": response.request.url,
        "final_url": response.url,
        "status": response.status_code,
        "content_type": content_type,
    }
    if len(attempts) > 1:
        result["attempted_urls"] = attempts
    if response.status_code >= 400:
        result["error"] = f"HTTP {response.status_code}"
        return result
    text = response.text
    result["title"] = source_title(text, content_type)
    description = source_description(text, content_type)
    if description:
        result["description"] = description
    result["bytes"] = len(response.content)
    result["_links"] = extract_links(text, content_type, source.link_base_url, response.url)
    result["_effect_assets"] = extract_effect_assets(text, content_type, response.url, response.url)
    result["_headings"] = heading_signals(text)
    return result


def entry_sources(entry: dict[str, Any]) -> list[Source]:
    sources: list[Source] = []
    raw = github_raw_from_blob_url(entry["url"])
    if raw:
        sources.append(raw)
    elif github_repo_from_url(entry["url"]):
        readme = github_readme_source(entry["url"])
        if readme:
            sources.append(readme)
    else:
        sources.append(Source("primary_page", entry["url"], entry["url"]))

    homepage = entry.get("homepage")
    if homepage and homepage != entry["url"]:
        sources.append(Source("homepage", homepage, homepage))

    seen: set[str] = set()
    unique_sources: list[Source] = []
    for source in sources:
        if source.url in seen:
            continue
        seen.add(source.url)
        unique_sources.append(source)
    return unique_sources


def dedupe_links(links: list[dict[str, str]]) -> list[dict[str, str]]:
    deduped: list[dict[str, str]] = []
    seen: set[tuple[str, str]] = set()
    for link in links:
        key = (link["kind"], link["url"])
        if key in seen:
            continue
        seen.add(key)
        deduped.append(link)
    return deduped


def dedupe_assets(assets: list[dict[str, str]]) -> list[dict[str, str]]:
    deduped: list[dict[str, str]] = []
    seen: set[str] = set()
    for asset in sorted(assets, key=asset_score, reverse=True):
        key = asset["url"]
        if key in seen:
            continue
        seen.add(key)
        deduped.append(asset)
    return deduped


def media_assets_from_links(links: list[dict[str, str]]) -> list[dict[str, str]]:
    assets: list[dict[str, str]] = []
    for link in links:
        thumbnail_url = youtube_thumbnail_url(link["url"])
        if thumbnail_url:
            assets.append(
                {
                    "kind": "video",
                    "title": link["title"],
                    "url": link["url"],
                    "thumbnail_url": thumbnail_url,
                    "source": link.get("source", link["url"]),
                }
            )
            continue

        if loom_id(link["url"]):
            assets.append(
                {
                    "kind": "video",
                    "title": link["title"],
                    "url": link["url"],
                    "source": link.get("source", link["url"]),
                }
            )
            continue

        kind = asset_kind(link["url"])
        if kind and not is_noise_asset(link["title"], link["url"]):
            assets.append(
                {
                    "kind": kind,
                    "title": link["title"],
                    "url": normalize_asset_url(link["url"]),
                    "source": link.get("source", link["url"]),
                }
            )
    return assets


def scrape_entry(entry: dict[str, Any]) -> dict[str, Any]:
    session = requests.Session()
    session.headers.update({"User-Agent": USER_AGENT, "Accept": "text/html,text/plain,application/xhtml+xml,*/*"})

    fetched_sources: list[dict[str, Any]] = []
    official_links: list[dict[str, str]] = []
    official_effect_assets: list[dict[str, str]] = []
    source_headings: list[str] = []

    for source in entry_sources(entry):
        try:
            fetched = fetch_source(session, source)
        except requests.RequestException as exc:
            fetched = {
                "kind": source.kind,
                "url": source.url,
                "status": None,
                "error": f"{exc.__class__.__name__}: {exc}",
            }
        official_links.extend(fetched.pop("_links", []))
        official_effect_assets.extend(fetched.pop("_effect_assets", []))
        source_headings.extend(fetched.pop("_headings", []))
        fetched_sources.append(fetched)

    official_links = dedupe_links(official_links)[:MAX_LINKS_PER_ENTRY]
    official_examples = [link for link in official_links if link["kind"] in EXAMPLE_KINDS][:MAX_EXAMPLE_LINKS_PER_ENTRY]
    official_docs = [link for link in official_links if link["kind"] == "docs"][:MAX_EXAMPLE_LINKS_PER_ENTRY]
    official_effect_assets = dedupe_assets(
        official_effect_assets + media_assets_from_links(official_examples)
    )[:MAX_EFFECT_ASSETS_PER_ENTRY]

    result: dict[str, Any] = {
        "name": entry["name"],
        "category": entry.get("category"),
        "surface": entry.get("surface"),
        "primary_url": entry["url"],
    }
    if entry.get("homepage"):
        result["homepage"] = entry["homepage"]
    if entry.get("dependencies"):
        result["dependencies"] = entry["dependencies"]
    if entry.get("note"):
        result["catalog_note"] = entry["note"]

    result["fetched_sources"] = fetched_sources
    if official_examples:
        result["official_examples"] = official_examples
    if official_docs:
        result["official_docs"] = official_docs
    if official_effect_assets:
        result["official_effect_assets"] = official_effect_assets
    if official_links:
        result["official_links"] = official_links
    if source_headings:
        result["source_headings"] = list(dict.fromkeys(source_headings))[:12]
    return result


def scrape_catalog(catalog_path: Path, max_entries: int | None) -> dict[str, Any]:
    catalog = yaml.safe_load(catalog_path.read_text())
    entries = catalog["entries"]
    if max_entries:
        entries = entries[:max_entries]

    results: list[dict[str, Any]] = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        future_to_entry = {executor.submit(scrape_entry, entry): entry for entry in entries}
        completed = 0
        for future in concurrent.futures.as_completed(future_to_entry):
            entry = future_to_entry[future]
            completed += 1
            try:
                results.append(future.result())
            except Exception as exc:
                results.append(
                    {
                        "name": entry["name"],
                        "category": entry.get("category"),
                        "surface": entry.get("surface"),
                        "primary_url": entry["url"],
                        "fatal_error": f"{exc.__class__.__name__}: {exc}",
                    }
                )
            print(f"[{completed:03d}/{len(entries):03d}] {entry['name']}", file=sys.stderr)

    order = {entry["name"]: index for index, entry in enumerate(entries)}
    results.sort(key=lambda item: order.get(item["name"], 10_000))

    fetched_count = sum(
        1
        for item in results
        for source in item.get("fetched_sources", [])
        if isinstance(source.get("status"), int) and 200 <= source["status"] < 400
    )
    failed_count = sum(
        1
        for item in results
        for source in item.get("fetched_sources", [])
        if not isinstance(source.get("status"), int) or source["status"] >= 400
    )
    example_count = sum(len(item.get("official_examples", [])) for item in results)
    docs_count = sum(len(item.get("official_docs", [])) for item in results)
    effect_asset_count = sum(len(item.get("official_effect_assets", [])) for item in results)

    try:
        source_catalog = str(catalog_path.relative_to(ROOT))
    except ValueError:
        source_catalog = str(catalog_path)

    return {
        "generated_at": dt.datetime.now(dt.UTC).replace(microsecond=0).isoformat(),
        "source_catalog": source_catalog,
        "scope": "Official project URLs, GitHub README/skill files, and catalog homepages. Stored as research data, not rendered in README.",
        "schema": {
            "fetched_sources": "Official pages fetched for each catalog entry, with HTTP status and lightweight page metadata.",
            "official_examples": "Official example/demo/showcase/template/tutorial/paper/video links discovered from fetched sources.",
            "official_effect_assets": "Official image/GIF/video assets and video thumbnails discovered from official sources for effect previews.",
            "official_docs": "Official documentation/guide/quickstart/API links discovered from fetched sources.",
            "official_links": "All official links matching research keywords, including examples and docs.",
            "source_headings": "README or page headings that mention examples, demos, docs, templates, papers, or tutorials.",
        },
        "summary": {
            "entries": len(results),
            "fetched_sources_ok": fetched_count,
            "fetched_sources_failed": failed_count,
            "official_examples": example_count,
            "official_effect_assets": effect_asset_count,
            "official_docs": docs_count,
        },
        "entries": results,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--catalog", type=Path, default=DEFAULT_CATALOG)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--max-entries", type=int, default=None)
    args = parser.parse_args()

    data = scrape_catalog(args.catalog, args.max_entries)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(yaml.dump(data, Dumper=NoAliasDumper, allow_unicode=True, sort_keys=False, width=120))
    print(f"Wrote {args.output}", file=sys.stderr)


if __name__ == "__main__":
    main()
