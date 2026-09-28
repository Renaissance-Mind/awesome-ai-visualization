# Catalog frontend brief

Implement the selected [directory design](design/catalog-reference.png) in the existing React + Vite application.

The reader should be able to scan several real tools, understand each one's core purpose, and open a full introduction with official evidence. Keep the directory useful as the data grows.

## Requirements

- Use data/catalog.yml and data/tool-research.yml through the existing generated-data pipeline.
- Use borderless list rows with optional official thumbnails, concise descriptions and detail links.
- Do not add cards, tag lists, statistic tiles or a “什么时候用” column.
- Support searching, broad topics, all canonical filter values, sorting and pagination.
- Preserve browsing context through detail navigation, browser history and refresh.
- Include reader-oriented topic guides and tool detail pages.
- Keep external resources linked to their real GitHub or official URLs in production.
- Work at desktop, tablet and mobile widths.

The source-grounded reading copy lives in src/data/editorial.ts; it never replaces the canonical catalog facts. All uncurated entries retain their original descriptions.

The npm script design:open remains available for the Open Design workflow. It is not required to run or build this site.

See ../design-systems/awesome-ai-visualization/DESIGN.md and ../design-qa.md for the design contract and verification.
