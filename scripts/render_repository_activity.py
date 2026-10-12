#!/usr/bin/env python3
"""Embed collected monthly activity in a theme-aware inline chart fragment."""

import argparse
import html
import json
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo


ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("output", type=Path)
    parser.add_argument("--data", type=Path, default=ROOT / "data" / "repository-activity")
    args = parser.parse_args()
    monthly = json.loads((args.data / "monthly.json").read_text())
    summary = json.loads((args.data / "summary.json").read_text())
    template = (ROOT / "scripts" / "templates" / "repository-activity.html").read_text()
    coverage = summary["commit_history_coverage"]
    successful = coverage.get("ok", 0) + coverage.get("empty", 0)
    asof = datetime.fromisoformat(summary["cutoff"]).astimezone(ZoneInfo(summary["timezone"]))
    commit_label = f"{successful} repo · {summary['total_commits']:,} commits · 默认分支完整历史（含合并提交）"
    creation_label = f"{summary['repos_with_creation_date']} repo · GitHub 创建时间 · 末尾虚线：当月未结束"
    missing = coverage.get("unavailable", 0)
    if missing:
        commit_label += f" · {missing} repo 未覆盖"
    description = (
        f"按上海时区逐月汇总，时间范围 {monthly[0]['month']} 至 {monthly[-1]['month']}。"
        f"commit 为每个仓库默认分支 HEAD 的全部可达提交，按提交者时间归入月份；含机器人、合并提交，"
        f"{summary['forks']} 个 fork 的继承历史计入各自仓库。"
        f"新建 repo 采用 GitHub createdAt；空月为零，未结束的当月不与完整月份直接比较。"
        f"commit 完整覆盖 {successful} repo，共 {summary['total_commits']:,} 次；"
        f"创建时间覆盖 {summary['repos_with_creation_date']} repo。"
    )
    replacements = {
        "__SNAPSHOT_LABEL__": f"每月一个 bin · 截至 {asof:%Y-%m-%d %H:%M}（上海）",
        "__COMMIT_COVERAGE__": commit_label,
        "__CREATION_COVERAGE__": creation_label,
        "__ACCESSIBLE_DESCRIPTION__": description,
    }
    for token, value in replacements.items():
        template = template.replace(token, html.escape(value))
    template = template.replace("/* MONTHLY_DATA */ []", json.dumps(monthly, ensure_ascii=False))
    if "__SNAPSHOT_LABEL__" in template or "/* MONTHLY_DATA */" in template:
        raise ValueError("Unreplaced chart placeholders")
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(template)
    print(args.output)


if __name__ == "__main__":
    main()
