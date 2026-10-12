#!/usr/bin/env python3
"""Partition the pinned repository activity snapshot by catalog category."""

import argparse
import csv
import hashlib
import html
import json
from collections import Counter
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

import yaml


ROOT = Path(__file__).resolve().parents[1]
LABELS = {
    "presentation-tools": "演示文稿",
    "data-dashboard": "数据仪表盘",
    "doc-to-knowledge": "文档与知识",
    "meta-index": "索引与目录",
    "codebase-map": "代码库可视化",
    "rendering-primitive": "底层渲染",
    "diagram-generation": "架构与流程图",
    "video-generation": "视频生成",
    "infographic-report": "信息图",
    "research-report": "研究报告",
    "paper-visualization": "论文可视化",
    "literature-map": "文献地图",
    "commercial-site": "商业站点",
}


def write_json(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("output", type=Path, help="Inline chart fragment path")
    parser.add_argument("--start", default="2024-01")
    args = parser.parse_args()
    data = ROOT / "data" / "repository-activity"
    summary = json.loads((data / "summary.json").read_text())
    catalog_path = ROOT / "data" / "catalog.yml"
    if hashlib.sha256(catalog_path.read_bytes()).hexdigest() != summary["catalog_sha256"]:
        raise ValueError("Catalog differs from the activity snapshot; refresh activity before regrouping")
    catalog = yaml.safe_load(catalog_path.read_text())
    entries = {entry["name"]: (i, entry["category"]) for i, entry in enumerate(catalog["entries"])}
    repositories = json.loads((data / "repositories.json").read_text())
    original = [row for row in json.loads((data / "monthly.json").read_text()) if row["month"] >= args.start]
    if not original or original[0]["month"] != args.start:
        raise ValueError("Start must be a YYYY-MM month covered by the snapshot")
    by_month = {row["month"]: {"month": row["month"], "partial_month": row["partial_month"],
                              "commits": Counter(), "repos_created": Counter()} for row in original}
    totals, populations, newly_created = Counter(), Counter(), Counter()
    assignments = []
    tz = ZoneInfo(summary["timezone"])
    cutoff = datetime.fromisoformat(summary["cutoff"])
    multi_category = []
    for repo in repositories:
        candidates = [entries[name] for name in repo["entries"]]
        category = min(candidates)[1]
        categories = list(dict.fromkeys(category for _, category in sorted(candidates)))
        assignment = {"repo": repo["catalog_repo"], "category": category,
                      "catalog_categories": categories, "entries": repo["entries"],
                      "metadata_status": repo["metadata_status"], "commit_status": repo["commit_status"]}
        assignments.append(assignment)
        if len(categories) > 1:
            multi_category.append(assignment)
        if repo["metadata_status"] != "ok":
            continue
        populations[category] += 1
        created = datetime.fromisoformat(repo["createdAt"].replace("Z", "+00:00"))
        month = created.astimezone(tz).strftime("%Y-%m")
        if created <= cutoff and month in by_month:
            by_month[month]["repos_created"][category] += 1
            newly_created[category] += 1
        if repo["commit_status"] in ("ok", "empty"):
            for month, count in repo["monthly_commits"].items():
                if month in by_month:
                    by_month[month]["commits"][category] += count
                    totals[category] += count
    keys = sorted(populations, key=lambda key: (-totals[key], key))
    categories = [{"id": key, "label": LABELS[key], "repos": populations[key],
                   "commits": totals[key], "repos_created": newly_created[key]} for key in keys]
    monthly = []
    for source in original:
        row = by_month[source["month"]]
        for key in ("commits", "repos_created"):
            row[key] = {category: row[key][category] for category in keys}
            assert sum(row[key].values()) == source[key], (source["month"], key)
        monthly.append(row)
    category_summary = {"cutoff": summary["cutoff"], "timezone": summary["timezone"],
                        "start": args.start, "end": monthly[-1]["month"],
                        "covered_repos": sum(populations.values()),
                        "unavailable_repos": summary["commit_history_coverage"].get("unavailable", 0),
                        "commits": sum(totals.values()), "repos_created": sum(newly_created.values()),
                        "categories": categories, "multi_category_repos": multi_category,
                        "assignment_rule": "Every repo counted once, assigned to its first entry's category in the catalog. "
                        "This groups repos by use case, not by whether a commit is AI-related.",
                        "excluded_categories": [key for key in LABELS if key not in populations]}
    write_json(data / "category-monthly.json", monthly)
    write_json(data / "category-summary.json", category_summary)
    write_json(data / "repo-categories.json", assignments)
    with (data / "category-monthly.csv").open("w", newline="") as output:
        writer = csv.writer(output, lineterminator="\n")
        writer.writerow(["month", "category", "category_label", "commits", "repos_created", "partial_month"])
        for row in monthly:
            for category in categories:
                key = category["id"]
                writer.writerow([row["month"], key, category["label"], row["commits"][key],
                                 row["repos_created"][key], row["partial_month"]])
    template = (ROOT / "scripts" / "templates" / "repository-category-activity.html").read_text()
    asof = cutoff.astimezone(tz)
    replacements = {
        "__SNAPSHOT__": f"{args.start}—{monthly[-1]['month']} · 月度 bin · {len(categories)} 类 · 截至 {asof:%Y-%m-%d %H:%M}（上海）",
        "__COVERAGE__": f"覆盖 {sum(populations.values())} / {summary['catalog_repo_urls']} repo · 当月未结束：末列浅色",
        "__COMMIT_TOTAL__": f"2024 年起合计 {sum(totals.values()):,} 次 commit · 默认分支完整历史",
        "__CREATION_TOTAL__": f"2024 年起合计 {sum(newly_created.values()):,} 个新建 repo · GitHub 创建时间",
    }
    for token, value in replacements.items():
        template = template.replace(token, html.escape(value))
    template = template.replace("/* CATEGORY_DATA */ {}", json.dumps({"categories": categories, "monthly": monthly}, ensure_ascii=False))
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(template)
    print(json.dumps({"months": len(monthly), "categories": len(categories),
                      "commits": sum(totals.values()), "repos_created": sum(newly_created.values()),
                      "monthly_reconciliation": "passed", "chart": str(args.output)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
