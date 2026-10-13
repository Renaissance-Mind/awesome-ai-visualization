#!/usr/bin/env python3
"""Collect current GitHub activity and derive evidence-backed activity labels.

Requires Python/PyYAML and authenticated gh. No repository clone or model API.
"""

import argparse
import hashlib
import json
import math
import subprocess
from collections import Counter
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timedelta, timezone
from pathlib import Path

from collect_repository_activity import ROOT, catalog_repositories, write_json


LABELS = {
    "archived": "已归档",
    "empty": "默认分支无提交",
    "updated_7d": "近7天更新",
    "updated_30d": "近30天更新",
    "updated_90d": "近90天更新",
    "quiet_90d": "近90天无提交",
    "sustained_activity": "持续维护",
    "stars_growing_7d": "Star周增长",
    "stars_fast_growth_7d": "Star周快速增长",
    "stars_growing_30d": "Star月增长",
    "unavailable": "数据暂不可用",
}


def iso(date):
    return date.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")


def parse_date(value):
    return datetime.fromisoformat(value.replace("Z", "+00:00"))


def collect_batch(rows, cutoff):
    fields = []
    for index, row in enumerate(rows):
        owner, name = row["catalog_repo"].split("/", 1)
        histories = " ".join(
            f"d{days}: history(first: {10 if days == 90 else 1}, "
            f"since: {json.dumps(iso(cutoff - timedelta(days=days)))}, "
            f"until: {json.dumps(iso(cutoff))}) {{ totalCount "
            + ("nodes { oid committedDate messageHeadline url } " if days == 90 else "")
            + "}"
            for days in (7, 30, 60, 90)
        )
        fields.append(
            f"r{index}: repository(owner: {json.dumps(owner)}, name: {json.dumps(name)}) "
            "{ id nameWithOwner url stargazerCount forkCount isArchived isFork "
            "defaultBranchRef { name target { ... on Commit { oid committedDate "
            + histories + " } } } }"
        )
    result = subprocess.run(
        ["gh", "api", "graphql", "--input", "-"],
        input=json.dumps({"query": "query { " + " ".join(fields) + " }"}),
        text=True, capture_output=True, timeout=180,
    )
    payload = json.loads(result.stdout) if result.stdout.strip() else {}
    errors = payload.get("errors", [])
    # Authentication, rate limits, and whole-query errors must fail the run.
    if not payload.get("data") or any(not error.get("path") for error in errors):
        raise RuntimeError(result.stderr or json.dumps(payload))
    failures = {error["path"][0]: error["message"] for error in errors}
    observed_at = iso(datetime.now(timezone.utc))
    records = []
    for index, row in enumerate(rows):
        alias = f"r{index}"
        value = payload["data"].get(alias)
        if not value or alias in failures:
            records.append({**row, "status": "unavailable", "observed_at": observed_at,
                            "error": failures.get(alias, "Repository unavailable")})
            continue
        ref = value["defaultBranchRef"]
        head = ref["target"] if ref else None
        counts = {str(days): head[f"d{days}"]["totalCount"] if head else 0
                  for days in (7, 30, 60, 90)}
        if sorted(counts.values()) != list(counts.values()):
            raise ValueError(f"Inconsistent commit windows for {value['nameWithOwner']}")
        records.append({
            **row, "status": "ok", "observed_at": observed_at,
            "id": value["id"], "repo": value["nameWithOwner"], "url": value["url"],
            "stars": value["stargazerCount"], "forks": value["forkCount"],
            "archived": value["isArchived"], "is_fork": value["isFork"],
            "default_branch": ref["name"] if ref else None,
            "head_sha": head["oid"] if head else None,
            "head_committed_at": head["committedDate"] if head else None,
            "commits": counts,
            "recent_commits": head["d90"]["nodes"] if head else [],
        })
    return records


def deduplicate(records):
    unique, unavailable = {}, []
    for row in sorted(records, key=lambda item: item["catalog_repo"].lower()):
        if row["status"] != "ok":
            unavailable.append({**row, "catalog_aliases": [row["catalog_repo"]]})
        elif row["id"] not in unique:
            unique[row["id"]] = {**row, "catalog_aliases": [row["catalog_repo"]]}
        else:
            unique[row["id"]]["catalog_aliases"].append(row["catalog_repo"])
            unique[row["id"]]["entries"].extend(row["entries"])
    return list(unique.values()) + unavailable


def load_history(directory):
    history = {}
    for path in sorted(directory.glob("*.json")):
        snapshot = json.loads(path.read_text())
        for row in snapshot["records"]:
            history.setdefault(row["id"], []).append(row)
    return history


def growth(row, history, days):
    observed = parse_date(row["observed_at"])
    candidates = []
    tolerance = 1 if days == 7 else 2
    for previous in history.get(row["id"], []):
        elapsed = (observed - parse_date(previous["observed_at"])).total_seconds() / 86400
        if abs(elapsed - days) <= tolerance:
            candidates.append((abs(elapsed - days), elapsed, previous))
    if not candidates:
        return None
    _, elapsed, previous = min(candidates, key=lambda item: item[0])
    return {"baseline_at": previous["observed_at"], "interval_days": round(elapsed, 3),
            "baseline_stars": previous["stars"],
            "stars_delta": row["stars"] - previous["stars"],
            "forks_delta": row["forks"] - previous["forks"]}


def label_record(row, history):
    if row["status"] != "ok":
        return {**row, "tags": ["unavailable"], "growth": {"7d": None, "30d": None}}
    tags = []
    counts = row["commits"]
    if row["archived"]:
        tags.append("archived")
    elif not row["default_branch"]:
        tags.append("empty")
    else:
        tags.append(next((f"updated_{days}d" for days in (7, 30, 90)
                          if counts[str(days)] > 0), "quiet_90d"))
        periods = [counts["30"], counts["60"] - counts["30"],
                   counts["90"] - counts["60"]]
        if min(periods) >= 2:
            tags.append("sustained_activity")
    changes = {f"{days}d": growth(row, history, days) for days in (7, 30)}
    for period, change in changes.items():
        if change is None:
            continue
        baseline = change["baseline_stars"]
        if change["stars_delta"] >= max(10, math.ceil(baseline * 0.05)):
            tags.append(f"stars_growing_{period}")
        if period == "7d" and change["stars_delta"] >= max(50, math.ceil(baseline * 0.20)):
            tags.append("stars_fast_growth_7d")
    return {**row, "tags": tags, "growth": changes}


def publish(output, records, cutoff, fingerprint, scope):
    history = load_history(output / "history")
    records = [label_record(row, history) for row in records]
    for row in records:
        if row["status"] == "ok":
            points = {point["observed_at"][:10]: {key: point[key] for key in ("observed_at", "stars")}
                      for point in history.get(row["id"], [])}
            points[row["observed_at"][:10]] = {key: row[key] for key in ("observed_at", "stars")}
            row["star_history"] = sorted(points.values(), key=lambda point: point["observed_at"])[-30:]
    records.sort(key=lambda row: row["catalog_repo"].lower())
    latest = {"schema_version": 1, "cutoff": iso(cutoff), "catalog_sha256": fingerprint,
              "scope": scope, "labels": LABELS, "records": records}
    compact = {"cutoff": iso(cutoff), "records": [
        {key: row[key] for key in ("id", "observed_at", "stars", "forks")}
        for row in records if row["status"] == "ok"
    ]}
    # Keep the first successful observation of each ID per UTC day. A rerun can
    # recover missing repositories without erasing a baseline collected earlier.
    daily_path = output / "history" / f"{cutoff:%Y-%m-%d}.json"
    if daily_path.exists():
        previous = json.loads(daily_path.read_text())
        merged = {row["id"]: row for row in compact["records"]}
        merged.update({row["id"]: row for row in previous["records"]})
        compact = {**previous, "records": sorted(merged.values(), key=lambda row: row["id"])}
    write_json(daily_path, compact)
    write_json(output / "latest.json", latest)
    summary = {
        "cutoff": iso(cutoff), "scope": scope, "repositories": len(records),
        "coverage": dict(Counter(row["status"] for row in records)),
        "tags": dict(Counter(tag for row in records for tag in row["tags"])),
        "growth_7d_coverage": sum(row["growth"]["7d"] is not None for row in records),
        "growth_30d_coverage": sum(row["growth"]["30d"] is not None for row in records),
    }
    write_json(output / "summary.json", summary)
    return summary


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--catalog", type=Path, default=ROOT / "data/catalog.yml")
    parser.add_argument("--output", type=Path, default=ROOT / "data/repository-signals")
    parser.add_argument("--workers", type=int, default=3)
    parser.add_argument("--repo", action="append", help="Only collect owner/name; repeatable")
    args = parser.parse_args()
    if args.workers < 1:
        parser.error("--workers must be positive")
    _, rows = catalog_repositories(args.catalog)
    if args.repo:
        selected = {name.lower() for name in args.repo}
        missing = selected - {row["catalog_repo"].lower() for row in rows}
        if missing:
            parser.error("Repositories absent from catalog: " + ", ".join(sorted(missing)))
        rows = [row for row in rows if row["catalog_repo"].lower() in selected]
        if args.output.resolve() == (ROOT / "data/repository-signals").resolve():
            parser.error("Subset runs require --output to avoid replacing full-catalog data")
    cutoff = datetime.now(timezone.utc)
    records = []
    batches = [rows[index:index + 10] for index in range(0, len(rows), 10)]
    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        jobs = [pool.submit(collect_batch, batch, cutoff) for batch in batches]
        for job in as_completed(jobs):
            records.extend(job.result())
            print(f"Collected: {len(records)}/{len(rows)}", flush=True)
    records = deduplicate(records)
    if not any(row["status"] == "ok" for row in records):
        raise RuntimeError("No repositories collected; existing snapshots preserved")
    summary = publish(args.output, records, cutoff,
                      hashlib.sha256(args.catalog.read_bytes()).hexdigest(),
                      "catalog" if not args.repo else sorted(args.repo))
    print(json.dumps(summary, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
