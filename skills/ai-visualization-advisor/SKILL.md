---
name: ai-visualization-advisor
description: Recommend AI, LLM, and agent tools for organizing, distilling, visualizing, and presenting information. Use when a user needs to turn papers, news, web pages, PDFs, documents, codebases, data, knowledge bases, or rough ideas into reports, PPT/decks, diagrams, infographics, dashboards, mind maps, code maps, web pages, videos, or other human-readable artifacts; when they ask which tool, skill, framework, MCP server, API, SaaS, or workflow to use; when they only know the information source and need output-form recommendations; or when they need advice that accounts for privacy, private deployment, offline use, model APIs, GPU requirements, GitHub/open-source preference, editability, budget, or enterprise constraints.
---

# AI Visualization Advisor

## Core Rule

Use the repository data files as the source of truth, not the README tables.

Prefer the latest canonical data from `Renaissance-Mind/awesome-ai-visualization` when network access is available:

- `data/catalog.yml`: categories, information sources, tool forms, output forms, dependencies, stars, licenses, and notes.
- `data/tool-research.yml`: fetched official pages, official docs, examples, demos, templates, tutorials, and source headings.

If the GitHub raw data cannot be fetched, use the nearest local checkout that contains `data/catalog.yml` and state that the advice is based on local data.

## Quick Start

Use the bundled query helper first when a recommendation depends on the catalog.

The helper requires Python 3 and PyYAML. If this skill is copied outside the repository, pass `--repo /path/to/awesome-ai-visualization` or use `--latest` to fetch GitHub raw data.

```bash
python3 skills/ai-visualization-advisor/scripts/query_catalog.py --list-taxonomy
python3 skills/ai-visualization-advisor/scripts/query_catalog.py --latest --source paper --output infographic --top 8 --research
python3 skills/ai-visualization-advisor/scripts/query_catalog.py --latest --source codebase --output "代码地图/Repo Wiki" --private-deploy --top 6
python3 skills/ai-visualization-advisor/scripts/query_catalog.py --latest --query "paper to report with citations" --open-source-only --no-gpu --top 8 --research
```

The helper accepts Chinese taxonomy tags and common English aliases. It falls back from GitHub raw data to local data if needed.

## Recommendation Workflow

1. Extract the user's current state:
   - Information source: paper, PDF, webpage, news, codebase, data table, database, knowledge base, rough idea, or mixed sources.
   - Intended audience and use: self-understanding, team briefing, public sharing, academic communication, executive report, product research, teaching, code onboarding, monitoring, or decision support.
   - Desired output if known: report, deck, diagram, infographic, dashboard, mind map, code map, webpage, video, or editable file.
   - Operating constraints: private deployment, offline use, SaaS allowed, model API allowed, GPU available, GitHub/open-source preference, MCP/Agent host available, budget, and editability.
2. If only the source is known, propose 2-4 plausible output forms before choosing tools. Use `references/advisory-framework.md` for the source-to-output map and question bank.
3. Query `catalog.yml` through the helper. Use `tool-research.yml` evidence when recommending unfamiliar tools or when the user asks for examples, demos, or official docs.
4. Rank recommendations:
   - Prefer GitHub/open-source entries when comparable, because this catalog is meant to be useful for agent workflows and reproducible setups.
   - Prefer `catalog_section: main` for end-to-end workflows; use support sections only for PDF parsing, rendering, Mermaid, mind maps, or other pre/post-processing needs.
   - For private deployment, prefer open-source apps/frameworks, Agent Skills, MCP Servers, APIs/SDKs, and local runtimes; avoid SaaS/browser-only tools unless the user permits them.
   - For offline use, avoid browser/account, external search/data, and model API dependencies unless the user explicitly accepts partial offline operation.
   - For no-GPU environments, avoid entries tagged `GPU/加速器` unless GPU is optional.
   - For editable outputs, favor tools that produce PPTX, Markdown, Mermaid, SVG, HTML, structured data, or code-backed diagrams over screenshot-only outputs.
5. Return a concise recommendation:
   - State assumptions in one short sentence if the user did not answer every constraint.
   - Recommend the output form first when that is still undecided.
   - Provide a short ranked table with tool, best fit, why, requirements, caveats, and official docs/examples when useful.
   - End with the next concrete action, such as testing one tool, designing a pipeline, or asking the smallest missing question.

## Clarifying Questions

Ask only questions that change the recommendation. Prefer at most three at a time:

- Does the information contain sensitive or proprietary material?
- Must the workflow support private deployment or offline use?
- Are SaaS products acceptable, or should recommendations stay GitHub/open-source first?
- Can the user call model APIs such as OpenAI, Anthropic, Gemini, OpenRouter, or Azure OpenAI?
- Is a GPU available or should GPU-heavy options be avoided?
- Does the output need to be editable, presentation-ready, cited, or automatically refreshable?
- Who is the audience: personal learning, team briefing, executives, public readers, researchers, students, or developers?

If the user gives enough context, proceed with assumptions instead of blocking on questions.

## Output Guidance

When the user only has an information source:

- Papers/research: suggest long report, graphical abstract/infographic, deck, literature map, or teaching webpage depending on depth and audience.
- PDFs/documents/knowledge bases: suggest briefing/report, Q&A/study material, mind map, or knowledge map.
- Web/news/intelligence: suggest cited report, briefing, timeline, dashboard, or monitoring workflow.
- Codebases: suggest repo wiki, code map, architecture diagram, or dependency graph.
- Data/tables/databases: suggest dashboard, chart, visual report, or analyst report.
- Rough text/ideas: suggest diagram, mind map, deck, or webpage explainer.

For detailed selection heuristics, read `references/advisory-framework.md`.

## Using Support Tools

Use support tools as pipeline components, not as replacements for end-to-end tools:

- PDF/OCR/document parsing before report, deck, or infographic generation.
- Mermaid/rendering tools after an Agent has drafted a diagram.
- Mind map tools when the final artifact is a knowledge map or concept map.
- Awesome/index entries only when the user asks for more discovery surfaces.
