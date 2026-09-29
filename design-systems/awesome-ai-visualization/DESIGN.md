# Awesome AI Visualization Design System

The selected reference is [catalog-reference.png](../../docs/design/catalog-reference.png).
This design supersedes the earlier three-panel dashboard.

## Reader experience

- Start with the actual catalog, rather than a promotional landing page.
- The primary sequence is browse or search → read a short introduction → open the tool detail → inspect official evidence and source links.
- Use one continuous white page, graphite headings, muted body text and cobalt links.
- Organize content with whitespace, alignment, typography and light horizontal rules.
- Do not use cards, nested panels, statistical tiles or tag/badge lists. A single GitHub Stars badge after a GitHub tool title is the explicitly requested exception.
- Do not add a “什么时候用” column or an equivalent recommendation column.

## Directory

- Compact masthead with the project name, catalog, guides and GitHub.
- Page heading and underlined search field; no oversized hero.
- Plain text topic navigation. Auxiliary tools remain discoverable.
- A tool row contains an optional official image, tool name, short description and detail link.
- Rows without an image remain readable without placeholders.
- Show 20 entries initially. Automatically append 20 more near the bottom, preserving existing rows. Include a keyboard-accessible load-more action and a completed state; do not show page navigation or a page-size selector.
- Sort and advanced filters are quiet controls. Detailed taxonomy is available on demand rather than permanently occupying a sidebar.
- Search, filters, ordering, the revealed batch count and the current detail are encoded in the URL. Search, topic, sort and filter changes reset to the first 20 entries.

## Content

- Canonical facts remain in data/catalog.yml and data/tool-research.yml.
- src/data/editorial.ts provides source-grounded Chinese reading copy for selected entries. Other entries retain the canonical description.
- Never invent tools, previews, statistics, testimonials or supported capabilities.
- Detail pages display evidence, inputs, outputs, dependencies and official resources.
- GitHub tool titles link to their repository through a Shields.io Stars badge, following the existing README convention. While unavailable or loading, the fallback count is explicitly identified as a catalog snapshot in its tooltip. Non-GitHub entries have no repository badge. Detail metadata retains its labelled snapshot count.
- Use official image/GIF/video assets. Do not substitute generated marketing imagery for actual product evidence.

## Typography and responsive behavior

- Arial with PingFang SC / Microsoft YaHei fallback matches the chosen reference without a font download.
- Desktop tool names are 25px, descriptions 17px with generous line height.
- The existing Lucide library supplies the reference's thin search, arrow and layers icons.
- Desktop uses open image/text/link rows. Mobile keeps a small thumbnail beside the text, places the detail link below and allows full-width text when no image exists.
- Mobile navigation can scroll horizontally within its own region; the document must not overflow.
- Keyboard focus must remain visible, search and selects labelled, and native links usable without a pointer.

## Build and verification

- npm run dev runs the local React + Vite application.
- npm run build regenerates the catalog JSON and performs TypeScript and production-build checks.
- npm run check:frontend verifies discovery behavior against every real catalog entry.
- Browser and visual verification is recorded in design-qa.md.
