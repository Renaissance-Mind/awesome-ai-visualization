#!/usr/bin/env python3
"""Query the awesome-ai-visualization catalog for tool recommendations."""

from __future__ import annotations

import argparse
import math
import re
import sys
import textwrap
import urllib.error
import urllib.request
from collections import Counter
from pathlib import Path

try:
    import yaml
except ImportError as exc:
    raise SystemExit("PyYAML is required. Install with: python3 -m pip install pyyaml") from exc


ORG_REPO = "Renaissance-Mind/awesome-ai-visualization"
RAW_BASES = [
    f"https://raw.githubusercontent.com/{ORG_REPO}/main",
    f"https://raw.githubusercontent.com/{ORG_REPO}/master",
]

ALIASES = {
    "paper": ["论文/科研资料"],
    "papers": ["论文/科研资料"],
    "research": ["论文/科研资料"],
    "pdf": ["PDF/文档"],
    "document": ["PDF/文档"],
    "documents": ["PDF/文档"],
    "office": ["Office 文档"],
    "web": ["网页/搜索结果"],
    "url": ["网页/搜索结果"],
    "search": ["网页/搜索结果"],
    "news": ["新闻/资讯"],
    "intelligence": ["新闻/资讯"],
    "code": ["代码库"],
    "codebase": ["代码库"],
    "repo": ["代码库"],
    "repository": ["代码库"],
    "data": ["数据/表格"],
    "table": ["数据/表格"],
    "database": ["数据库"],
    "db": ["数据库"],
    "knowledge": ["知识库/个人资料"],
    "kb": ["知识库/个人资料"],
    "text": ["文本/想法"],
    "idea": ["文本/想法"],
    "ideas": ["文本/想法"],
    "dsl": ["DSL/代码"],
    "citation": ["引用网络"],
    "multi": ["任意/多源"],
    "ppt": ["PPT/演示文稿"],
    "deck": ["PPT/演示文稿"],
    "slides": ["PPT/演示文稿"],
    "presentation": ["PPT/演示文稿"],
    "report": ["报告/长文档", "报告/简报"],
    "briefing": ["报告/简报"],
    "webpage": ["网页/交互页面"],
    "website": ["网页/交互页面"],
    "infographic": ["图形摘要/信息图", "信息图/视觉报告"],
    "graphical abstract": ["图形摘要/信息图"],
    "diagram": ["架构图/流程图", "图表/Mermaid"],
    "flowchart": ["架构图/流程图"],
    "mindmap": ["思维导图/知识地图", "白板/思维导图"],
    "mind map": ["思维导图/知识地图", "白板/思维导图"],
    "dashboard": ["图表/仪表盘"],
    "chart": ["图表/仪表盘", "图表/渲染输出"],
    "repo wiki": ["代码地图/Repo Wiki"],
    "code map": ["代码地图/Repo Wiki"],
    "video": ["视频/音频"],
    "markdown": ["结构化数据/Markdown"],
    "evidence": ["证据表"],
    "answer": ["引用答案"],
    "study": ["问答/学习材料"],
    "saas": ["产品/SaaS"],
    "product": ["产品/SaaS"],
    "open source": ["开源应用/框架"],
    "opensource": ["开源应用/框架"],
    "framework": ["开源应用/框架"],
    "agent skill": ["Agent Skill"],
    "skill": ["Agent Skill", "Skill 集合"],
    "mcp": ["MCP Server"],
    "api": ["API/SDK/库"],
    "sdk": ["API/SDK/库"],
    "library": ["API/SDK/库"],
    "bot": ["Bot/助手"],
    "assistant": ["Bot/助手"],
    "browser": ["浏览器/账号"],
    "account": ["浏览器/账号"],
    "model api": ["模型 API"],
    "llm api": ["模型 API"],
    "local": ["本地语言环境"],
    "runtime": ["本地语言环境"],
    "gpu": ["GPU/加速器"],
    "ocr": ["文档解析/OCR"],
    "rendering": ["渲染/导出"],
    "export": ["渲染/导出"],
    "external search": ["外部检索/数据源"],
    "storage": ["存储/索引"],
    "template": ["模板/素材"],
}


def repo_root_from_here() -> Path | None:
    here = Path(__file__).resolve()
    for parent in [here.parent, *here.parents]:
        if (parent / "data" / "catalog.yml").exists():
            return parent
    return None


def read_url(url: str) -> str:
    with urllib.request.urlopen(url, timeout=20) as response:
        return response.read().decode("utf-8")


def load_yaml_text(path: Path | None, remote_name: str, latest: bool) -> tuple[dict, str]:
    errors: list[str] = []

    if latest:
        for base in RAW_BASES:
            url = f"{base}/{remote_name}"
            try:
                return yaml.safe_load(read_url(url)), url
            except (urllib.error.URLError, TimeoutError, OSError) as exc:
                errors.append(f"{url}: {exc}")

    if path and path.exists():
        return yaml.safe_load(path.read_text(encoding="utf-8")), str(path)

    if not latest:
        for base in RAW_BASES:
            url = f"{base}/{remote_name}"
            try:
                return yaml.safe_load(read_url(url)), url
            except (urllib.error.URLError, TimeoutError, OSError) as exc:
                errors.append(f"{url}: {exc}")

    raise SystemExit("Could not load " + remote_name + "\n" + "\n".join(errors))


def load_data(repo: str | None, latest: bool) -> tuple[dict, dict | None, str, str | None]:
    root = Path(repo).resolve() if repo else repo_root_from_here()
    catalog_path = root / "data" / "catalog.yml" if root else None
    research_path = root / "data" / "tool-research.yml" if root else None

    catalog, catalog_source = load_yaml_text(catalog_path, "data/catalog.yml", latest)
    try:
        research, research_source = load_yaml_text(research_path, "data/tool-research.yml", latest)
    except SystemExit:
        research, research_source = None, None

    return catalog, research, catalog_source, research_source


def split_schema_values(schema_value: str) -> list[str]:
    if not isinstance(schema_value, str):
        return []
    if ":" in schema_value:
        schema_value = schema_value.split(":", 1)[1]
    return [part.strip(" '") for part in schema_value.split("|") if part.strip()]


def allowed_values(catalog: dict, key: str) -> set[str]:
    values = set(split_schema_values(catalog.get("schema", {}).get(key, "")))
    for entry in catalog.get("entries", []):
        value = entry.get(key)
        if isinstance(value, list):
            values.update(value)
    return values


def norm(value: str) -> str:
    return re.sub(r"\s+", " ", value.casefold()).strip()


def resolve(raw_values: list[str], allowed: set[str]) -> list[str]:
    resolved: list[str] = []
    allowed_by_norm = {norm(value): value for value in allowed}

    for raw in raw_values:
        raw_norm = norm(raw)
        if raw_norm in allowed_by_norm:
            resolved.append(allowed_by_norm[raw_norm])
            continue
        if raw_norm in ALIASES:
            resolved.extend([value for value in ALIASES[raw_norm] if not allowed or value in allowed])
            continue
        contains = [value for value in allowed if raw_norm and raw_norm in norm(value)]
        resolved.extend(contains or [raw])

    unique: list[str] = []
    for value in resolved:
        if value not in unique:
            unique.append(value)
    return unique


def entry_text(entry: dict) -> str:
    fields = [
        entry.get("name", ""),
        entry.get("note", ""),
        entry.get("category", ""),
        entry.get("surface", ""),
        " ".join(entry.get("source_types", []) or []),
        " ".join(entry.get("tool_forms", []) or []),
        " ".join(entry.get("output_forms", []) or []),
        " ".join(entry.get("dependencies", []) or []),
    ]
    return norm(" ".join(str(field) for field in fields))


def intersects(entry: dict, key: str, desired: list[str]) -> bool:
    if not desired:
        return True
    values = entry.get(key, []) or []
    return bool(set(values) & set(desired))


def github_url(entry: dict) -> bool:
    return "github.com" in (entry.get("url") or "")


def score_entry(entry: dict, args: argparse.Namespace, resolved: dict[str, list[str]]) -> float:
    score = 0.0
    for key, weight in [
        ("source_types", 40),
        ("output_forms", 40),
        ("tool_forms", 25),
        ("dependencies", 10),
    ]:
        matches = set(entry.get(key, []) or []) & set(resolved.get(key, []))
        score += weight * len(matches)

    if args.query:
        text = entry_text(entry)
        for token in re.findall(r"[\w\-/\u4e00-\u9fff]+", norm(args.query)):
            if token in text:
                score += 6
            if token in norm(entry.get("name", "")):
                score += 8

    if args.prefer_github and github_url(entry):
        score += 6
    if entry.get("catalog_section") == "main":
        score += 5
    if entry.get("catalog_section") == "indexes":
        score -= 6

    stars = entry.get("stars")
    if isinstance(stars, int) and stars > 0:
        score += min(math.log10(stars + 1), 5)

    return score


def filtered_entries(catalog: dict, args: argparse.Namespace) -> tuple[list[tuple[float, dict]], dict[str, list[str]]]:
    source_allowed = allowed_values(catalog, "source_types")
    output_allowed = allowed_values(catalog, "output_forms")
    tool_allowed = allowed_values(catalog, "tool_forms")
    dep_allowed = allowed_values(catalog, "dependencies")

    resolved = {
        "source_types": resolve(args.source, source_allowed),
        "output_forms": resolve(args.output, output_allowed),
        "tool_forms": resolve(args.tool_form, tool_allowed),
        "dependencies": resolve(args.dependency, dep_allowed),
        "exclude_dependencies": resolve(args.exclude_dependency, dep_allowed),
    }

    allowed_sections = set(args.section or ["main"])
    if args.include_support:
        allowed_sections.update({"support_doc_parse", "support_render", "support_mindmap"})
    if args.include_indexes:
        allowed_sections.add("indexes")

    results: list[tuple[float, dict]] = []
    for entry in catalog.get("entries", []):
        section = entry.get("catalog_section") or "main"
        if section not in allowed_sections:
            continue
        if args.github_only and not github_url(entry):
            continue
        if args.open_source_only and "产品/SaaS" in (entry.get("tool_forms", []) or []):
            continue
        if args.private_deploy:
            if "产品/SaaS" in (entry.get("tool_forms", []) or []):
                continue
            if "浏览器/账号" in (entry.get("dependencies", []) or []):
                continue
        if args.offline:
            blocked = {"浏览器/账号", "模型 API", "外部检索/数据源"}
            if blocked & set(entry.get("dependencies", []) or []):
                continue
        if args.no_gpu and "GPU/加速器" in (entry.get("dependencies", []) or []):
            continue
        if set(entry.get("dependencies", []) or []) & set(resolved["exclude_dependencies"]):
            continue
        if not intersects(entry, "source_types", resolved["source_types"]):
            continue
        if not intersects(entry, "output_forms", resolved["output_forms"]):
            continue
        if not intersects(entry, "tool_forms", resolved["tool_forms"]):
            continue
        if not intersects(entry, "dependencies", resolved["dependencies"]):
            continue

        score = score_entry(entry, args, resolved)
        if args.query and score <= 0:
            continue
        results.append((score, entry))

    results.sort(key=lambda item: (item[0], item[1].get("stars") or 0, item[1].get("name", "")), reverse=True)
    return results, resolved


def research_map(research: dict | None) -> dict[str, dict]:
    if not research:
        return {}
    return {entry.get("name"): entry for entry in research.get("entries", []) if entry.get("name")}


def md_link(title: str, url: str | None) -> str:
    if not url:
        return title
    return f"[{title}]({url})"


def compact(values: list[str] | None, limit: int = 3) -> str:
    values = values or []
    if len(values) <= limit:
        return " / ".join(values)
    return " / ".join(values[:limit]) + f" / +{len(values) - limit}"


def evidence_for(entry: dict, research_by_name: dict[str, dict]) -> str:
    research = research_by_name.get(entry.get("name")) or {}
    pieces: list[str] = []
    for key, label in [("official_docs", "Docs"), ("official_examples", "Examples")]:
        links = research.get(key) or []
        if links:
            first = links[0]
            pieces.append(f"{label}: " + md_link(first.get("title") or first.get("url") or label, first.get("url")))
    return "<br>".join(pieces)


def print_taxonomy(catalog: dict, source: str) -> None:
    print(f"Data source: {source}")
    print(f"Entries: {len(catalog.get('entries', []))}")
    for key, label in [
        ("source_types", "Information sources"),
        ("tool_forms", "Tool forms"),
        ("output_forms", "Output forms"),
        ("dependencies", "Dependencies"),
    ]:
        counter: Counter[str] = Counter()
        for entry in catalog.get("entries", []):
            counter.update(entry.get(key, []) or [])
        print(f"\n## {label}")
        for value, count in counter.most_common():
            print(f"- {value}: {count}")


def print_markdown(results: list[tuple[float, dict]], resolved: dict[str, list[str]], research: dict | None, args: argparse.Namespace, data_source: str) -> None:
    print(f"Data source: {data_source}")
    active = {key: value for key, value in resolved.items() if value}
    if active:
        print("Resolved filters: " + "; ".join(f"{key}={', '.join(value)}" for key, value in active.items()))
    print()

    if not results:
        print("No matching entries. Relax output/source filters, allow support tools, or disable strict private/offline constraints.")
        return

    research_by_name = research_map(research) if args.research else {}
    headers = ["Tool", "Fit", "Tool form", "Outputs", "Requirements", "Stars", "Note"]
    if args.research:
        headers.append("Official evidence")
    print("| " + " | ".join(headers) + " |")
    print("| " + " | ".join(["---"] * len(headers)) + " |")

    for score, entry in results[: args.top]:
        stars = str(entry.get("stars", "")) if entry.get("stars") is not None else ""
        row = [
            md_link(entry.get("name", ""), entry.get("url")),
            f"{score:.1f}",
            compact(entry.get("tool_forms")),
            compact(entry.get("output_forms")),
            compact(entry.get("dependencies"), limit=4),
            stars,
            (entry.get("note") or "").replace("|", "\\|"),
        ]
        if args.research:
            row.append(evidence_for(entry, research_by_name).replace("|", "\\|"))
        print("| " + " | ".join(row) + " |")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Query data/catalog.yml and data/tool-research.yml for AI visualization tool recommendations.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=textwrap.dedent(
            """\
            Examples:
              query_catalog.py --list-taxonomy
              query_catalog.py --latest --source paper --output infographic --top 8 --research
              query_catalog.py --source codebase --output "代码地图/Repo Wiki" --private-deploy --top 6
            """
        ),
    )
    parser.add_argument("--repo", help="Path to an awesome-ai-visualization checkout.")
    parser.add_argument("--latest", action="store_true", help="Try GitHub raw data before local files.")
    parser.add_argument("--list-taxonomy", action="store_true", help="Print taxonomy values and counts.")
    parser.add_argument("--source", action="append", default=[], help="Information source tag or alias. Repeatable.")
    parser.add_argument("--output", action="append", default=[], help="Output artifact tag or alias. Repeatable.")
    parser.add_argument("--tool-form", action="append", default=[], help="Tool form tag or alias. Repeatable.")
    parser.add_argument("--dependency", action="append", default=[], help="Required dependency tag or alias. Repeatable.")
    parser.add_argument("--exclude-dependency", action="append", default=[], help="Dependency tag to exclude. Repeatable.")
    parser.add_argument("--section", action="append", choices=["main", "support_doc_parse", "support_render", "support_mindmap", "indexes"], help="Catalog section to include. Defaults to main.")
    parser.add_argument("--include-support", action="store_true", help="Include support/pre-post-processing tools.")
    parser.add_argument("--include-indexes", action="store_true", help="Include awesome/index entries.")
    parser.add_argument("--query", help="Free-text search over names, notes, tags, and dependencies.")
    parser.add_argument("--top", type=int, default=10, help="Number of entries to print.")
    parser.add_argument("--research", action="store_true", help="Include first official doc/example link when available.")
    parser.add_argument("--private-deploy", action="store_true", help="Filter away SaaS/browser-account tools.")
    parser.add_argument("--offline", action="store_true", help="Filter away browser/account, model API, and external-search dependencies.")
    parser.add_argument("--no-gpu", action="store_true", help="Filter away GPU/accelerator-tagged entries.")
    parser.add_argument("--open-source-only", action="store_true", help="Filter away Product/SaaS entries.")
    parser.add_argument("--github-only", action="store_true", help="Only include GitHub URLs.")
    parser.add_argument("--prefer-github", action=argparse.BooleanOptionalAction, default=True, help="Boost GitHub entries in ranking.")
    return parser


def main() -> None:
    args = build_parser().parse_args()
    catalog, research, catalog_source, _research_source = load_data(args.repo, args.latest)

    if args.list_taxonomy:
        print_taxonomy(catalog, catalog_source)
        return

    results, resolved = filtered_entries(catalog, args)
    print_markdown(results, resolved, research, args, catalog_source)


if __name__ == "__main__":
    main()
