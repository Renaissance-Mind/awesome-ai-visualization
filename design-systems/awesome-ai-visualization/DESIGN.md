# Awesome AI Visualization Design System

Use this Open Design system for the Awesome AI Visualization catalog frontend.

## Product Surface

- Build a real catalog application, not a marketing landing page.
- The primary workflow is search, filter, compare, inspect, and open official links.
- The catalog data source is `data/catalog.yml`; research evidence is `data/tool-research.yml`.
- Do not invent tool entries, star counts, licenses, docs, examples, categories, or runtime requirements.

## Visual Direction

- Local-first design workspace aesthetic: precise, calm, technical, and file-backed.
- White interface with graphite text, thin slate borders, compact controls, and subtle canvas-grid texture.
- Accents: electric blue for navigation/action, vivid green for flow/output, small amber only for warnings or freshness.
- Avoid beige, cream, purple-heavy gradients, decorative blobs, and oversized hero treatment.
- Border radius should stay at 8px or less.

## Layout

- Desktop default: top command bar, left filter rail, central result list, right insight/detail panel.
- Mobile: collapse to one column while preserving search first, filters second, results third, details after results.
- Repeated tools may use cards. Do not put cards inside cards.
- Keep the first viewport operational: search, stats, filters, results, and selected detail should all be visible on a laptop viewport.

## Components

- Search input: large enough for long tool/category queries.
- Filters: checkbox-like controls grouped by source, tool form, output artifact, dependency, and catalog area.
- Tool rows: dense list rows with name, note, tags, stars, license, update date, source link, and homepage link.
- Details: selected tool note, source-to-artifact flow, metadata, output previews, docs, examples, and result mix.
- Output previews must be derived from `output_forms` and shown as visual artifact shapes, not invented product screenshots.
- Use icon buttons for reset, source, homepage, search, and navigation actions.

## Typography

- Modern system sans-serif.
- UI chrome uses 11px-13px sizes with deliberate weights.
- Tool names use 15px-22px depending on context.
- Avoid negative letter spacing and viewport-scaled font sizes.

## Interaction

- Filtering is conjunctive within every active facet group.
- Search matches name, notes, categories, tags, license, and dependencies.
- The selected tool updates when the current result set changes.
- Sort modes: recommended, stars, freshness, evidence, and name.

## Delivery

- The frontend must be runnable with `npm run dev`.
- The production build must regenerate catalog JSON from YAML before Vite builds.
- Generated frontend data lives at `src/data/catalog.generated.json`.
