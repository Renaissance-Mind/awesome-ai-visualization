#!/usr/bin/env python3
"""Build the showcase site data file from the structured catalog.

Reads data/catalog.yml (the curated catalog) and data/tool-research.yml
(crawled official example/demo/doc links) and emits site/data.js, a single
`window.ATLAS_DATA = {...}` global so the page works both from file:// and
when served over HTTP (GitHub Pages), with no fetch/CORS dependency.

Usage:  python3 scripts/build_site.py
"""
from __future__ import annotations

import json
import re
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
CATALOG = ROOT / "data" / "catalog.yml"
RESEARCH = ROOT / "data" / "tool-research.yml"
PREVIEWS = ROOT / "site" / "previews.json"
OUT = ROOT / "site" / "data.js"

# Default "input" phrase per field, used when a note has no parseable source.
INPUT_DEFAULT = {
    "paper-visualization": "Paper / PDF",
    "research-report": "Research question",
    "literature-map": "Seed papers",
    "doc-to-knowledge": "Documents",
    "infographic-report": "Text / data",
    "presentation-tools": "Doc / outline",
    "codebase-map": "Codebase",
    "diagram-generation": "Text / prompt",
    "data-dashboard": "Dataset",
    "rendering-primitive": "Diagram code",
    "commercial-site": "Text / prompt",
    "meta-index": "A topic",
}
# Structured catalog vocab (Chinese) -> concise English, for the X -> Y framing.
SOURCE_EN = {
    "PDF/文档": "PDF / docs", "文本/想法": "Text / idea", "网页/搜索结果": "Web / search",
    "论文/科研资料": "Papers", "代码库": "Codebase", "数据/表格": "Data / tables",
    "任意/多源": "Any source", "代码/技术描述": "Code / spec", "新闻/资讯": "News",
    "Office 文档": "Office docs", "知识库/个人资料": "Knowledge base", "数据库": "Database",
    "引用网络": "Citation graph", "DSL/代码": "DSL / code",
}
OUTPUT_EN = {
    "PPT/演示文稿": "slide decks", "架构图/流程图": "architecture diagrams",
    "代码地图/Repo Wiki": "code maps & wikis", "报告/长文档": "long-form reports",
    "报告/简报": "briefings", "工具索引": "a tool index", "图表/仪表盘": "charts & dashboards",
    "网页/交互页面": "interactive web pages", "思维导图/知识地图": "mind maps",
    "结构化数据/Markdown": "structured data", "图表/Mermaid": "Mermaid diagrams",
    "SVG/PNG/PDF": "SVG / PNG / PDF", "白板/思维导图": "whiteboards",
    "图形摘要/信息图": "graphical abstracts", "证据表": "evidence tables",
    "信息图/视觉报告": "infographics", "问答/学习材料": "Q&A study material",
    "引用答案": "cited answers", "文献地图/知识地图": "literature maps",
    "表格/时间线": "tables & timelines",
}
_LEAD_VERB = re.compile(r"^(turns?|converts?|generates?|creates?|produces?|transforms?|"
                        r"makes?|builds?|renders?)\s+", re.I)


def build_io(entry, category):
    """Prefer the catalog's structured source_types/output_forms; fall back to
    parsing the note. Returns (input, output)."""
    srcs = [SOURCE_EN.get(s, s) for s in (entry.get("source_types") or [])]
    outs = [OUTPUT_EN.get(o, o) for o in (entry.get("output_forms") or [])]
    if srcs and outs:
        inp = " / ".join(dict.fromkeys(srcs[:2]))
        out = ", ".join(dict.fromkeys(outs[:2]))
        return inp, out
    return parse_io(entry.get("note", ""), category)


def parse_io(note: str, category: str):
    """Best-effort split of a note into (input, output) for the X -> Y framing."""
    n = (note or "").strip().rstrip(".")
    m = re.search(r"^(.{3,58}?)\s+(?:into|to)\s+(.+)$", n, re.I)
    if m and len(m.group(2).split()) >= 2:
        inp = _LEAD_VERB.sub("", m.group(1)).strip()
        out = m.group(2).strip()
    else:
        inp = INPUT_DEFAULT.get(category, "A topic")
        out = _LEAD_VERB.sub("", n).strip()
    out = re.split(r"\s*[,;.]\s+", out)[0]
    words = out.split()
    if len(words) > 9:
        out = " ".join(words[:9]).rstrip(",") + "…"
    inp = (inp[:1].upper() + inp[1:]) if inp else inp
    return inp or "—", out or "—"

# Field (category) display order, English label, blurb, and the muted hue used
# for its dot / marker / hover tint. Chosen as a harmonious 12-stop wheel.
CATEGORIES = [
    ("paper-visualization", "Papers & Scientific Artifacts",
     "Turn scientific papers into figures, posters, and explainers.", "#C75643"),
    ("research-report", "Research Reports",
     "Agents that produce grounded, cited research reports.", "#D9863C"),
    ("literature-map", "Literature Maps",
     "Citation graphs and maps of a whole research field.", "#AE8B2E"),
    ("doc-to-knowledge", "Document to Knowledge",
     "Convert documents into structured, navigable knowledge.", "#6E8C3A"),
    ("infographic-report", "Infographics & Visual Reports",
     "Text and data into presentation-ready infographics.", "#2F8A6B"),
    ("presentation-tools", "Presentations & Decks",
     "Generate, edit, and agent-control slide decks.", "#2C7D92"),
    ("codebase-map", "Codebase Maps",
     "Explain software through architecture maps and wikis.", "#3E6DAE"),
    ("diagram-generation", "Diagrams & Whiteboards",
     "Diagrams-as-code, whiteboards, and mind maps.", "#6757AE"),
    ("data-dashboard", "Data Viz & Dashboards",
     "Datasets and questions into charts and dashboards.", "#8E55A8"),
    ("rendering-primitive", "Rendering Primitives",
     "Core renderers other tools quietly build on.", "#B5527E"),
    ("commercial-site", "Commercial Platforms",
     "Hosted platforms and polished SaaS products.", "#9A6A52"),
    ("meta-index", "Indexes & Directories",
     "Awesome lists and registries to keep exploring.", "#5E6670"),
]

SURFACE_LABELS = {
    "open-source": "Open source",
    "product": "Product",
    "skill": "Agent skill",
    "mcp": "MCP server",
    "library": "Library",
    "research": "Research",
    "dataset": "Dataset",
    "index": "Index",
}

# Catalog stores dependency tags in Chinese; map to clean English for the EN site.
DEP_EN = {
    "浏览器/账号": "Browser/account",
    "Agent 宿主": "Agent host",
    "模型 API": "Model API",
    "本地语言环境": "Local runtime",
    "系统工具": "System tools",
    "文档解析/OCR": "Doc parsing/OCR",
    "渲染/导出": "Rendering/export",
    "外部检索/数据源": "External search/data",
    "GPU/加速器": "GPU/accelerator",
    "MCP Client": "MCP client",
    "代码分析工具": "Code analysis",
    "存储/索引": "Storage/index",
    "模板/素材": "Templates/assets",
}

# Which example kinds are most worth showing, in priority order.
KIND_PRIORITY = ["demo", "showcase", "example", "video", "tutorial", "paper", "template"]
KIND_FALLBACK_LABEL = {
    "demo": "Live demo",
    "showcase": "Showcase",
    "example": "Example",
    "video": "Video",
    "tutorial": "Tutorial",
    "paper": "Paper",
    "template": "Template",
    "docs": "Documentation",
}
MAX_EXAMPLES = 6
MAX_DOCS = 3


def clean_title(raw: str, kind: str) -> str:
    """Normalise a crawled link title into a short, human label."""
    t = (raw or "").strip()
    # strip markdown emphasis / inline code fences
    t = t.replace("`", "").replace("**", "").replace("*", "").strip()
    t = re.sub(r"\s+", " ", t)
    # a bare URL or empty title -> fall back to a kind-based label
    if not t or t.lower().startswith("http"):
        return KIND_FALLBACK_LABEL.get(kind, kind.title())
    if len(t) > 52:
        t = t[:51].rstrip() + "…"
    return t


def curate_links(links, exclude_urls, *, docs=False, limit=MAX_EXAMPLES):
    """De-duplicate, drop self-links, prioritise by kind, and cap the list."""
    seen = set(exclude_urls)
    cleaned = []
    for L in links or []:
        url = (L.get("url") or "").strip()
        if not url or url in seen:
            continue
        seen.add(url)
        kind = (L.get("kind") or "docs").strip()
        cleaned.append({
            "kind": "docs" if docs else kind,
            "title": clean_title(L.get("title"), kind),
            "url": url,
        })
    if not docs:
        order = {k: i for i, k in enumerate(KIND_PRIORITY)}
        cleaned.sort(key=lambda x: order.get(x["kind"], len(order)))
    return cleaned[:limit]


def main() -> None:
    catalog = yaml.safe_load(CATALOG.read_text())
    research = yaml.safe_load(RESEARCH.read_text())
    previews = json.loads(PREVIEWS.read_text()) if PREVIEWS.exists() else {}

    research_by_name = {e["name"]: e for e in research.get("entries", [])}

    cat_meta = {cid: {"id": cid, "name": name, "desc": desc, "color": color}
                for cid, name, desc, color in CATEGORIES}
    cat_order = {cid: i for i, (cid, *_rest) in enumerate(CATEGORIES)}

    entries = []
    surface_counts: dict[str, int] = {}
    dep_counts: dict[str, int] = {}
    total_stars = 0
    with_demos = 0
    with_preview = 0

    for e in catalog.get("entries", []):
        name = e["name"]
        url = e.get("url", "")
        homepage = e.get("homepage")
        category = e.get("category", "meta-index")
        surface = e.get("surface", "product")
        deps = [DEP_EN.get(d, d) for d in (e.get("dependencies") or [])]
        stars = e.get("stars")
        note = (e.get("note") or "").strip()

        r = research_by_name.get(name, {})
        exclude = {url}
        if homepage:
            exclude.add(homepage)
        examples = curate_links(r.get("official_examples"), exclude, limit=MAX_EXAMPLES)
        used = exclude | {x["url"] for x in examples}
        docs = curate_links(r.get("official_docs"), used, docs=True, limit=MAX_DOCS)

        tid = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
        prev = previews.get(tid) or []
        preview = None
        if prev:
            p = prev[0]
            preview = {"src": p["file"], "w": p["w"], "h": p["h"], "from": p.get("kind")}
            with_preview += 1
        inp, out = build_io(e, category)

        if examples:
            with_demos += 1
        if isinstance(stars, int):
            total_stars += stars
        surface_counts[surface] = surface_counts.get(surface, 0) + 1
        for d in deps:
            dep_counts[d] = dep_counts.get(d, 0) + 1

        entries.append({
            "id": tid,
            "name": name,
            "url": url,
            "homepage": homepage,
            "category": category,
            "surface": surface,
            "deps": deps,
            "stars": stars,
            "license": e.get("license"),
            "updated": e.get("updated"),
            "note": note,
            "input": inp,
            "output": out,
            "preview": preview,
            "examples": examples,
            "docs": docs,
        })

    # order entries: by field display order, then by stars desc, then name
    entries.sort(key=lambda x: (
        cat_order.get(x["category"], 99),
        -(x["stars"] or 0),
        x["name"].lower(),
    ))

    categories = []
    for cid, name, desc, color in CATEGORIES:
        group = [x for x in entries if x["category"] == cid]
        categories.append({
            "id": cid, "name": name, "desc": desc, "color": color,
            "count": len(group),
            "stars": sum(x["stars"] or 0 for x in group),
        })

    surfaces = [{"id": s, "label": SURFACE_LABELS.get(s, s), "count": c}
                for s, c in sorted(surface_counts.items(), key=lambda kv: -kv[1])]

    data = {
        "meta": {
            "generated": research.get("generated_at"),
            "lastResearched": catalog.get("last_researched"),
            "totals": {
                "tools": len(entries),
                "fields": len(CATEGORIES),
                "stars": total_stars,
                "withDemos": with_demos,
                "withPreview": with_preview,
                "products": surface_counts.get("product", 0),
                "openSource": surface_counts.get("open-source", 0)
                + surface_counts.get("skill", 0)
                + surface_counts.get("mcp", 0)
                + surface_counts.get("library", 0),
            },
        },
        "categories": categories,
        "surfaces": surfaces,
        "entries": entries,
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    payload = json.dumps(data, ensure_ascii=False, indent=2)
    OUT.write_text(
        "// Auto-generated by scripts/build_site.py - do not edit by hand.\n"
        "window.ATLAS_DATA = " + payload + ";\n"
    )
    print(f"Wrote {OUT.relative_to(ROOT)}  ·  {len(entries)} tools  ·  "
          f"{total_stars:,} stars  ·  {with_demos} with demos")


if __name__ == "__main__":
    main()
