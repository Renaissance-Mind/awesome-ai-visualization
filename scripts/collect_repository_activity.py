#!/usr/bin/env python3
"""Collect auditable monthly GitHub activity for every repo in the catalog.

Requires Python with PyYAML, Git, and authenticated GitHub CLI. Commit-only Git
fetches preserve the complete history of each snapshot's default-branch HEAD.
Cached histories are local; published outputs contain only metadata and counts.
"""

import argparse
import csv
import hashlib
import json
import os
import re
import subprocess
from collections import Counter
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse
from zoneinfo import ZoneInfo

import yaml


ROOT = Path(__file__).resolve().parents[1]
TZ = ZoneInfo("Asia/Shanghai")


def write_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n")
    temporary.replace(path)


def catalog_repositories(path):
    catalog = yaml.safe_load(path.read_text())
    repos = {}
    for entry in catalog["entries"]:
        url = urlparse(entry["url"])
        parts = url.path.strip("/").split("/")
        if url.hostname != "github.com" or len(parts) < 2:
            continue
        name = "/".join(parts[:2]).removesuffix(".git")
        row = repos.setdefault(name.lower(), {"catalog_repo": name, "entries": []})
        row["entries"].append(entry["name"])
    return catalog, list(repos.values())


def metadata_batch(rows):
    fields = []
    for i, row in enumerate(rows):
        owner, name = row["catalog_repo"].split("/", 1)
        fields.append(
            f"r{i}: repository(owner:{json.dumps(owner)},name:{json.dumps(name)}) "
            "{ id nameWithOwner url createdAt isFork isArchived "
            "defaultBranchRef { name target { ... on Commit "
            "{ oid history { totalCount } } } } }"
        )
    query = "query { " + " ".join(fields) + " }"
    result = subprocess.run(
        ["gh", "api", "graphql", "--input", "-"],
        input=json.dumps({"query": query}), text=True, capture_output=True, timeout=120,
    )
    # GitHub may return both valid data and per-repository NOT_FOUND errors.
    payload = json.loads(result.stdout) if result.stdout.strip() else {}
    if "data" not in payload:
        raise RuntimeError(result.stderr or json.dumps(payload))
    if any(error.get("type") != "NOT_FOUND" for error in payload.get("errors", [])):
        raise RuntimeError(json.dumps(payload["errors"]))
    failures = {e.get("path", [None])[0]: e["message"] for e in payload.get("errors", [])}
    records = []
    for i, row in enumerate(rows):
        metadata = payload["data"].get(f"r{i}")
        if metadata is None:
            records.append({**row, "metadata_status": "unavailable",
                            "error": failures.get(f"r{i}", "Repository unavailable")})
        else:
            records.append({**row, "metadata_status": "ok", **metadata})
    return records


def git(path, *args, timeout=1200):
    env = {**os.environ, "GIT_TERMINAL_PROMPT": "0"}
    result = subprocess.run(["git", "-C", str(path), *args], capture_output=True,
                            text=True, timeout=timeout, env=env)
    if result.returncode:
        raise RuntimeError(result.stderr.strip())
    return result.stdout


def commit_history(row, cache, cutoff):
    ref = row["defaultBranchRef"]
    if ref is None:
        return {**row, "commit_status": "empty", "monthly_commits": {},
                "observed_commits": 0, "excluded_future_commits": 0}
    sha = ref["target"]["oid"]
    cache_key = hashlib.sha256((row["id"] + sha).encode()).hexdigest()
    counts_path = cache / "counts" / (cache_key + ".json")
    if counts_path.exists():
        cached = json.loads(counts_path.read_text())
        if cached["cutoff"] == cutoff.isoformat():
            return {**row, **cached["counts"]}
    repo_path = cache / "git" / (row["id"] + ".git")
    repo_path.mkdir(parents=True, exist_ok=True)
    if not (repo_path / "HEAD").exists():
        git(repo_path, "init", "--bare")
        git(repo_path, "remote", "add", "origin", row["url"] + ".git")
        git(repo_path, "config", "remote.origin.promisor", "true")
        git(repo_path, "config", "remote.origin.partialclonefilter", "tree:0")
    git(repo_path, "fetch", "--quiet", "--no-tags", "--filter=tree:0", "origin", sha)
    dates = git(repo_path, "log", "--format=%ct", sha).splitlines()
    total = ref["target"]["history"]["totalCount"]
    if len(dates) != total:
        raise ValueError(f"Incomplete history for {row['nameWithOwner']}: {len(dates)} != {total}")
    counts = Counter()
    future = 0
    earliest = None
    for timestamp in dates:
        date = datetime.fromtimestamp(int(timestamp), timezone.utc)
        if date > cutoff:
            future += 1
            continue
        month = date.astimezone(TZ).strftime("%Y-%m")
        counts[month] += 1
        earliest = min(earliest, date) if earliest else date
    value = {"commit_status": "ok", "snapshot_head": sha,
             "observed_commits": len(dates), "counted_commits": sum(counts.values()),
             "excluded_future_commits": future,
             "earliest_commit": earliest.isoformat() if earliest else None,
             "monthly_commits": dict(sorted(counts.items()))}
    write_json(counts_path, {"cutoff": cutoff.isoformat(), "counts": value})
    return {**row, **value}


def month_range(start, end):
    year, month = map(int, start.split("-"))
    while f"{year:04d}-{month:02d}" <= end:
        yield f"{year:04d}-{month:02d}"
        year, month = (year + 1, 1) if month == 12 else (year, month + 1)


def aggregate(records, cutoff):
    commits, created = Counter(), Counter()
    for row in records:
        if row["metadata_status"] != "ok":
            continue
        date = datetime.fromisoformat(row["createdAt"].replace("Z", "+00:00"))
        if date <= cutoff:
            created[date.astimezone(TZ).strftime("%Y-%m")] += 1
        if row["commit_status"] in ("ok", "empty"):
            commits.update(row["monthly_commits"])
    start = min(list(commits) + list(created))
    end = cutoff.astimezone(TZ).strftime("%Y-%m")
    return [{"month": m, "commits": commits[m], "repos_created": created[m],
             "partial_month": m == end} for m in month_range(start, end)]


def verify_unavailable(row):
    result = subprocess.run(["gh", "api", "repos/" + row["catalog_repo"]],
                            capture_output=True, text=True, timeout=120)
    body = json.loads(result.stdout)
    status = re.search(r"HTTP (\d+)", result.stderr)
    return {"catalog_repo": row["catalog_repo"], "graphql_error": row["error"],
            "rest_http_status": int(status.group(1)) if status else (200 if result.returncode == 0 else None),
            "rest_message": body.get("message"),
            "checked_at": datetime.now(timezone.utc).isoformat()}


def write_readme(output, summary):
    cutoff = datetime.fromisoformat(summary["cutoff"]).astimezone(TZ)
    coverage = summary["commit_history_coverage"]
    (output / "README.md").write_text(f'''# Repo 月度开发活动

数据快照截至 **{cutoff:%Y-%m-%d %H:%M:%S}（Asia/Shanghai）**。目录包含 {summary["catalog_entries"]} 个条目，
其中 {summary["github_catalog_entries"]} 个条目的主链接指向 GitHub，共 {summary["catalog_repo_urls"]} 个规范化仓库 URL。
成功取得 {summary["repos_with_creation_date"]} 个仓库的元数据，
其中 {coverage.get("ok", 0)} 个仓库取得完整默认分支历史，{coverage.get("empty", 0)} 个仓库为空。
另有 {coverage.get("unavailable", 0)} 个仓库不可访问，REST 已复核为 HTTP 404，不计为零提交仓库。

原始月度序列覆盖 {summary["monthly_start"]} 至 {summary["monthly_end"]}，空月补零，当月标记为未结束。
共计 {summary["total_commits"]:,} 次提交；网站分类图表从 2024-01 开始，合计见 `category-summary.json`。
提交按 committer 时间归入上海时区，包含合并、机器人及 fork 继承历史。
同一个提交出现在不同仓库时分别计数。仓库创建时间来自 GitHub `createdAt`，不代表目录收录时间。
同一 GitHub 仓库 ID 只统计一次，分类按其在目录中的首个条目确定。

`snapshot.json` 固定 GitHub 元数据和默认分支 HEAD；`repositories.json` 保存逐仓库计数；
`monthly.json` / `monthly.csv` 为全时段汇总；`category-monthly.json` / `.csv` 为分类汇总；
`unavailable.json` 保存不可访问仓库的复核结果。每个成功仓库的提交条数均与固定 HEAD 的
GitHub GraphQL `history.totalCount` 校验。网络、权限及历史不完整错误会使更新失败，保留断点后重试。

每月首次发布巡检自动重新采集、分类并生成八种语言图表，再校验和上线。入口为
`npm run maintain:publication`；使用 `-- --refresh-activity` 可强制刷新。
失败重试沿用同一快照和缓存，避免重复下载已完成历史。
独立采集：`python3 scripts/collect_repository_activity.py --refresh`；断点续跑时省略 `--refresh`。

统计范围为本目录收录的相关仓库，不代表整个 AI 行业的开发趋势。
来源：[GitHub Repository](https://docs.github.com/en/graphql/reference/objects#repository)、
[git log](https://git-scm.com/docs/git-log)。
''')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--workers", type=int, default=8)
    parser.add_argument("--refresh", action="store_true", help="Start a fresh metadata snapshot")
    parser.add_argument("--output", type=Path, default=ROOT / "data" / "repository-activity")
    parser.add_argument("--cache", type=Path, default=ROOT / ".cache" / "repository-activity")
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    catalog_path = ROOT / "data" / "catalog.yml"
    catalog, catalog_rows = catalog_repositories(catalog_path)
    fingerprint = hashlib.sha256(catalog_path.read_bytes()).hexdigest()
    metadata_path = args.output / "snapshot.json"
    if metadata_path.exists() and not args.refresh:
        snapshot = json.loads(metadata_path.read_text())
        if snapshot["catalog_sha256"] != fingerprint:
            raise ValueError("Catalog changed; use --refresh to collect a consistent new snapshot")
    else:
        cutoff = datetime.now(timezone.utc)
        metadata = []
        batches = [catalog_rows[i:i + 20] for i in range(0, len(catalog_rows), 20)]
        with ThreadPoolExecutor(max_workers=3) as pool:
            jobs = [pool.submit(metadata_batch, batch) for batch in batches]
            for job in as_completed(jobs):
                metadata.extend(job.result())
                print(f"Metadata: {len(metadata)}/{len(catalog_rows)}", flush=True)
        # Renamed/redirected catalog URLs that resolve to one GitHub ID count once.
        unique, unavailable = {}, []
        for row in sorted(metadata, key=lambda r: r["catalog_repo"].lower()):
            if row["metadata_status"] != "ok":
                unavailable.append(row)
            elif row["id"] not in unique:
                unique[row["id"]] = {**row, "catalog_aliases": [row["catalog_repo"]]}
            else:
                unique[row["id"]]["entries"].extend(row["entries"])
                unique[row["id"]]["catalog_aliases"].append(row["catalog_repo"])
        snapshot = {"cutoff": cutoff.isoformat(), "catalog_sha256": fingerprint,
                    "catalog_entries": len(catalog["entries"]),
                    "github_catalog_entries": sum(len(r["entries"]) for r in catalog_rows),
                    "catalog_repo_urls": len(catalog_rows),
                    "records": list(unique.values()) + unavailable}
        write_json(metadata_path, snapshot)
    cutoff = datetime.fromisoformat(snapshot["cutoff"])
    records = []
    checkpoint = args.output / "repositories.json"
    previous = json.loads(checkpoint.read_text()) if checkpoint.exists() else []
    done = {r["id"]: r for r in previous if r.get("commit_status") in ("ok", "empty")}
    pending = []
    for row in snapshot["records"]:
        if row["metadata_status"] != "ok":
            records.append({**row, "commit_status": "unavailable"})
        elif row["id"] in done and not args.refresh and (
            done[row["id"]].get("defaultBranchRef") == row["defaultBranchRef"]
        ):
            records.append(done[row["id"]])
        else:
            pending.append(row)
    print(f"History: {len(records)} complete; {len(pending)} pending", flush=True)
    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        jobs = {pool.submit(commit_history, r, args.cache, cutoff): r for r in pending}
        for job in as_completed(jobs):
            row = jobs[job]
            try:
                records.append(job.result())
            except (RuntimeError, ValueError, subprocess.TimeoutExpired) as error:
                records.append({**row, "commit_status": "unavailable", "error": str(error)})
                print(f"Unavailable: {row['nameWithOwner']}: {error}", flush=True)
            if len(records) % 20 == 0 or len(records) == len(snapshot["records"]):
                write_json(checkpoint, sorted(records, key=lambda r: r["catalog_repo"].lower()))
                print(f"History: {len(records)}/{len(snapshot['records'])}; "
                      f"commits: {sum(r.get('counted_commits', 0) for r in records):,}", flush=True)
    records.sort(key=lambda r: r["catalog_repo"].lower())
    write_json(checkpoint, records)
    with ThreadPoolExecutor(max_workers=3) as pool:
        unavailable = list(pool.map(verify_unavailable,
                                    [r for r in records if r["metadata_status"] != "ok"]))
    write_json(args.output / "unavailable.json", unavailable)
    incomplete = [r["catalog_repo"] for r in records
                  if r["metadata_status"] == "ok" and r["commit_status"] == "unavailable"]
    unconfirmed = [r["catalog_repo"] for r in unavailable if r["rest_http_status"] != 404]
    if incomplete or unconfirmed:
        raise RuntimeError(f"Incomplete snapshot; rerun without --refresh to resume. "
                           f"Histories: {incomplete}; unresolved metadata: {unconfirmed}")
    monthly = aggregate(records, cutoff)
    write_json(args.output / "monthly.json", monthly)
    with (args.output / "monthly.csv").open("w", newline="") as output:
        writer = csv.DictWriter(output, fieldnames=list(monthly[0]), lineterminator="\n")
        writer.writeheader()
        writer.writerows(monthly)
    coverage = Counter(r["commit_status"] for r in records)
    summary = {k: v for k, v in snapshot.items() if k != "records"}
    summary.update({"timezone": "Asia/Shanghai", "monthly_start": monthly[0]["month"],
                    "monthly_end": monthly[-1]["month"],
                    "repos_with_creation_date": sum(r["metadata_status"] == "ok" for r in records),
                    "commit_history_coverage": dict(coverage),
                    "total_commits": sum(m["commits"] for m in monthly),
                    "forks": sum(r.get("isFork", False) for r in records),
                    "excluded_future_commits": sum(r.get("excluded_future_commits", 0) for r in records),
                    "generated_at": datetime.now(timezone.utc).isoformat(),
                    "commit_definition": "Each commit reachable from the pinned default-branch HEAD; "
                    "includes merges and bots; monthly bins use committer timestamp in Asia/Shanghai. "
                    "A shared commit in different repos is counted in each repo, including inherited fork history.",
                    "creation_definition": "GitHub createdAt, deduplicated by repository ID; "
                    "monthly bins in Asia/Shanghai. This is not the catalog inclusion date.",
                    "population": "GitHub repositories referenced by catalog entries' primary URL. "
                    "All entry forms included. Product-only URLs without a primary GitHub URL excluded.",
                    "sources": ["https://docs.github.com/en/graphql/reference/objects#repository",
                                "https://git-scm.com/docs/git-log", "https://git-scm.com/docs/git-clone"]})
    write_json(args.output / "summary.json", summary)
    write_readme(args.output, summary)
    print(json.dumps(summary, ensure_ascii=False, indent=2), flush=True)


if __name__ == "__main__":
    main()
