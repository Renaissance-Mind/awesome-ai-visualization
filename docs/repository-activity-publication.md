# Localized repository activity charts

The activity report lives at `/activity/<locale>/` on the existing website.
English, Simplified Chinese, Traditional Chinese, Japanese, Korean, Spanish,
Turkish and Russian each have two vector SVG figures and a standalone interactive
page. Their titles, legends, instructions, totals and methodological notes use
the corresponding language. The website navigation links to the Chinese report;
the language picker connects all eight versions.

Each README embeds its own two SVGs from `public/activity/<locale>/`. The commit
image links to `#commits`; the repository-creation image links to `#repos-created`
on the same-language website page. The surrounding README content is preserved.
The generated sections are bounded by `repository-activity:start` and
`repository-activity:end` comments so publication can be repeated safely.

All outputs use the auditable category snapshot in `data/repository-activity/`.
The snapshot is recollected on the first hourly publication run of each Shanghai
calendar month. Dates, totals, coverage and category ordering are derived from
`category-summary.json`; the final month is incomplete. These are use-case
categories and commits cover entire default-branch histories. See the dataset
README for counting rules and [Automated publication](publication-automation.md)
for scheduling, retries, deployment and live verification.

## Regenerate

```sh
python3 scripts/publish_repository_activity.py
node scripts/check-repository-activity.mjs
npm run check:frontend
npm run build
```

The publication script requires matplotlib and the font specified in
`data/repository-activity/locales.json` (Arial Unicode MS on the authoring Mac).
SVG text is converted to vector paths so readers do not need that font installed.
Missing glyphs and clipped legend/title text fail generation. SVG metadata
retains a readable title and description. The scripts read the existing fixed
snapshot; they do not recollect or change repository statistics.

`scripts/templates/repository-activity-page.*` contains the standalone page,
styles and interactions. Public copies ship with the regular Vite build. D3
7.9.0 is bundled locally under `public/activity/vendor/`, with its ISC license,
so the report does not depend on a remote script CDN or a Codex session.

Publish the reviewed build using the existing Cloudflare configuration, as
described in `docs/deployment.md`. Verify the eight language URLs and both SVG
links after deployment. Keep publishing and Git commits separate, and compare
the deployed report assets with the local files when validating a release.
