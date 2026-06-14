# Advisory Framework

Use this reference when a user's scenario is underspecified or when output-form selection matters more than picking a single tool.

## Source To Output Map

| Information source | Strong output forms | Use when |
| --- | --- | --- |
| Papers/research | Long report, graphical abstract, PPT/deck, literature map, teaching webpage | The user needs academic understanding, communication, field mapping, or presentation artifacts. |
| PDF/documents | Briefing/report, Q&A/study material, mind map, structured Markdown | The user wants to condense long files, extract concepts, or create reusable notes. |
| Web/search | Cited answer, long report, briefing, webpage explainer | The user needs grounded synthesis from many pages. |
| News/intelligence | Briefing/report, timeline, dashboard, evidence table | The user needs monitoring, market intelligence, threat intelligence, or executive updates. |
| Codebase | Code map/repo wiki, architecture diagram, dependency graph | The user needs onboarding, code review, repository explanation, or system visualization. |
| Data/tables/database | Dashboard, charts, visual report, KPI briefing | The user needs analytical presentation or decision support. |
| Knowledge base | Briefing/report, Q&A, mind map, knowledge map | The user needs to turn scattered personal or team material into navigable insight. |
| Text/ideas | Mind map, architecture/flow diagram, deck, webpage explainer | The user has rough thoughts and needs structure. |

## Decision Questions

Ask these only when the answer changes the recommendation:

| Decision | Why it matters |
| --- | --- |
| Private/proprietary input? | Filters away SaaS/browser-only tools unless the user accepts upload risk. |
| Offline required? | Filters away model APIs, external search, and browser/account workflows. |
| Open-source/GitHub-first? | Prioritizes reproducible repos, Agent Skills, MCP Servers, and local frameworks. |
| Editable output required? | Prefers PPTX, HTML, Markdown, Mermaid, SVG, structured data, or repo wiki outputs. |
| Citations required? | Prefers research/report tools with source grounding and evidence tables. |
| Automatic refresh required? | Prefers dashboards, monitoring agents, APIs, or pipelines over one-shot generators. |
| Audience and polish level? | Separates internal analysis from public infographic, executive deck, or teaching page. |
| Existing environment? | Uses available Agent host, MCP client, local runtime, model API, or GPU. |

## Common Recommendation Shapes

### Paper To Human-Readable Artifact

Recommend:

1. Graphical abstract or infographic if the user wants fast conceptual communication.
2. Long report if the user needs citations, evidence, or systematic synthesis.
3. PPT/deck if the user needs to present to a group.
4. Literature map if the user is exploring a field rather than explaining one paper.

### Codebase To Understanding

Recommend:

1. Repo wiki or code map for onboarding and persistent documentation.
2. Architecture/flow diagram for explaining the system to humans.
3. MCP/Agent Skill workflows when the user wants iterative Q&A over the repo.

### Private Enterprise Knowledge

Recommend:

1. Open-source/local or MCP-based tools first.
2. Local parsing and indexing before any model call.
3. SaaS only if the user confirms upload and account constraints are acceptable.

### News Or Market Intelligence

Recommend:

1. Cited briefing when the user needs narrative synthesis.
2. Dashboard/timeline when the user needs repeated monitoring.
3. Evidence table when claims need to be auditable.
