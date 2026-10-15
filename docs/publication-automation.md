# Automated publication

Catalog research runs in the existing Codex heartbeat every two days at 07:00
Asia/Shanghai. After pushing its catalog changes, it runs `npm run maintain:publication`.
A separate hourly heartbeat runs the same command to publish missed changes,
verify the live site, retry failures and report actionable failures in its chat.
Both use the existing local GitHub and Wrangler authorization. The Mac and Codex
must be available for these heartbeats to execute; the daily GitHub Actions
collector runs independently on GitHub.

## Release sequence

The maintenance command fetches `origin/main` and creates an isolated detached
worktree. A lock in the repository's common Git directory serializes overlapping
research and publication runs. The user's working files are never staged by this
command. Public Git histories and embedding checkpoints persist under
`<git-common-dir>/publication/` and are reused by later worktrees.

On the first run of a new Shanghai calendar month, it refreshes the complete
repository activity snapshot. `--refresh-activity` forces an extra refresh.
Collection retries resume the pinned snapshot. A network or permission failure,
or an incomplete Git history, fails publication instead of replacing the charts
with partial counts. Confirmed inaccessible repositories remain recorded as 404.
The script rebuilds category totals, eight localized pages, sixteen SVGs and the
README chart sections. Dates, totals, category labels and coverage come from the
snapshot. Python requires PyYAML and matplotlib; the configured Arial Unicode MS
font is available on the authoring Mac. `ACTIVITY_FONT` can select another installed
font covering all eight languages. Missing glyphs fail generation.

Next, the command generates changed project explanations, synchronizes the
versioned vector namespace, waits for all vector IDs to be indexed, runs retrieval
and frontend checks, validates charts, and builds the site. Only the generated
publication files are staged and committed. A concurrent update to main causes a
push or freshness failure; the next hourly run starts from current main.

The build receives `release.json` with the exact source commit, catalog count,
search version, chart snapshot time and SHA-256 hashes of the main assets, search
vectors, all localized charts/pages, CSV, chart code and a real catalog preview.
The Worker is then deployed with pinned Wrangler. Verification compares live
metadata and asset bytes with the prepared build, checks the freshness of daily
signals, and tests real search, combined filters, validation errors and the vector
asset checksum. A release is complete only after these checks pass.

## Retries and notifications

Network stages have up to three attempts with 10/30-second delays. Index readiness
allows six attempts to accommodate ingestion lag. Post-deployment asset checks
allow four attempts; they retry verification without redeploying. Deterministic
build/validation failures surface immediately. The next hourly heartbeat retries
from current main. If an already published version fails live verification, it
rebuilds and redeploys that source and verifies again.

The daily signals workflow retries collection and push up to three times, keeps
its artifact even on failure, and uses GitHub's normal failed-workflow notifications.
The hourly heartbeat additionally inspects its latest run, reports failures and
requests up to two failed-job reruns per run ID. A collector failure remains an
attention state until the workflow recovers.

`<git-common-dir>/publication/status.json` records the failed stage, source commit,
retained worktree, collector state and completion time. Failed worktrees remain
available for diagnosis; successful worktrees are removed. The hourly heartbeat
reports new failures, material changes, recovery and completed publications in
its own chat, staying quiet for unchanged healthy checks and repeated failures.
Authentication failures requiring renewed user authorization are reported there.
No credentials are copied to the worktrees, Git repository or status file.

## Commands

```sh
npm run test:publication
npm run maintain:publication
npm run maintain:publication -- --refresh-activity
```

`npm run deploy:cf` remains available for a prepared, committed checkout. It builds,
checks the index, prepares release metadata, deploys, and runs both production
checks. The maintenance command is the unattended entry point: it also handles
artifact preparation, monthly refresh, isolated commits, bounded retries and status.
