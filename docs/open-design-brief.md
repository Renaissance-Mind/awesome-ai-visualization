# Open Design Brief

This brief is for generating or iterating the repository frontend in Open Design.

## Goal

Create a production-quality frontend for `Renaissance-Mind/awesome-ai-visualization`, an awesome catalog of AI and agent tools that turn papers, documents, web pages, codebases, data, and ideas into visual artifacts.

## Required Surface

- A searchable, filterable catalog application.
- Use `data/catalog.yml` as the canonical tool source.
- Use `data/tool-research.yml` for captured docs, examples, demos, and evidence links.
- Preserve the repository's axes: information source, tool form, output artifact, dependency type, category, and README group.
- Include a selected-tool detail panel with official links and a source-to-artifact flow.
- Include compact catalog stats and result distribution.

## Design System

Use `design-systems/awesome-ai-visualization/DESIGN.md`.

## Open Design Entry

The npm script `npm run design:open` starts the Open Design ADE launcher when the local Open Design runtime is available. The official Open Design product is local-first and agent-native; generated artifacts should land as editable project files, not remote-only mockups.

## Implementation Notes

- React + Vite is the target implementation.
- Do not mock catalog entries.
- Do not add broad `try/catch` wrappers around normal app logic.
- Keep the UI dense enough for repeated research use.
- Keep visual assets inspectable and local.
