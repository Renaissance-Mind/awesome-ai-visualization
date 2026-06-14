# Search Log

Last researched: 2026-06-14.

This log records the discovery process used to seed the catalog. The goal is broad coverage with a clear audit trail, not a claim that every low-quality demo on GitHub has been included.

Update on 2026-06-14: the scope was broadened from presentation/codebase examples to the larger category of "complex content to human-readable visual, explanatory, and report artifacts." PPT is now treated as one output surface, not the whole domain.

Second update on 2026-06-14: the README was reorganized into three explicit axes: information source, tool form, and output artifact. This pass added more web/news/intelligence and knowledge-base tools so the catalog is not centered only on papers, decks, and codebases.

## Search Surfaces

- GitHub repository search through `gh search repos` and `gh api search/repositories`.
- GitHub topic pages and topic search.
- Web search for commercial sites, docs, blog announcements, and product pages.
- Existing awesome lists and skill registries.
- Reverse lookup from high-signal projects into related terms such as `agent skill`, `MCP`, `paper`, `report`, `infographic`, `graphical abstract`, `Mermaid`, `PowerPoint`, `codebase visualization`, and `data visualization`.

## GitHub Query Families

Deck and PowerPoint:

- `topic:powerpoint-generation`
- `topic:slide-generator ai`
- `topic:presentation-generator ai`
- `topic:ai-presentation-generator`
- `AI PowerPoint generator`
- `LLM PPTX generator`
- `agent presentation generator`
- `MCP PowerPoint presentation`
- `agent skill presentation pptx`

Codebase maps:

- `topic:codebase-visualization`
- `topic:code-visualization llm`
- `codebase diagram llm`
- `repository visualization llm`
- `Github repository diagram AI`
- `architecture diagram llm codebase`

Diagram generation:

- `topic:mermaid llm`
- `mermaid ai agent`
- `text to diagram llm`
- `site:github.com "SKILL.md" "Mermaid" "Claude Code" "Codex"`
- `site:github.com "SKILL.md" "codebase" "visualization" "Claude Code"`

Data visualization:

- `topic:ai-dashboard`
- `data visualization llm agent`
- `csv visualization ai agent`
- `dashboard builder llm`

Paper, research, and document artifacts:

- `AI research paper to infographic LLM`
- `paper to poster LLM GitHub research paper visualization`
- `research paper to report LLM agent GitHub`
- `paper to blog LLM GitHub arxiv`
- `paper-2-web SKILL.md`
- `Paper2Any`
- `paper-slides SKILL.md`
- `paper to infographic SKILL.md`
- `paper2slides`
- `graphical abstract AI research paper github`
- `graphical abstract generator LLM`
- `scientific schematics agent skill`
- `mindmap generator LLM document GitHub`

Web, news, intelligence, and knowledge-base artifacts:

- `stanford oval storm llm knowledge curation github report article official`
- `Perplexica open source AI search engine answers sources GitHub`
- `Scira AI GitHub open source AI search engine`
- `open-notebook GitHub NotebookLM alternative official docs`
- `SurfSense open source NotebookLM alternative GitHub report sources`
- `AI news monitoring dashboard report generator GitHub LLM visualization`
- `site:github.com news intelligence agent LLM dashboard report charts`
- `site:github.com market intelligence agent LLM report visualization charts news`
- `site:github.com threat intelligence mind map GPT report URL PDF`

Document extraction and representation:

- `PDF to markdown LLM ready scientific papers GitHub`
- `scientific paper parser PDF to JSON GitHub`
- `document parser PDF markdown LLM GitHub`
- `paper PDF to mind map LLM`

Skill discovery:

- `site:github.com "SKILL.md" "PowerPoint" "Codex" "Claude Code"`
- `site:github.com "agent skill" "PowerPoint" "PPTX" "Claude Code"`
- `site:github.com "SKILL.md" "Mermaid" "Claude Code" "Codex"`

## Web Query Families

Presentation websites:

- `AI presentation generator Gamma Tome Beautiful.ai Canva Decktopus SlideSpeak website`
- `Tome AI presentation generator website export PowerPoint`
- `Beautiful.ai AI presentation maker official`
- `Decktopus AI presentation maker official`
- `Presentations.AI AI presentation PowerPoint export`

Diagram and whiteboard websites:

- `AI diagram generator website Mermaid Chart Napkin AI Eraser Whimsical FigJam AI`
- `Napkin AI text to visual diagrams presentations`
- `Eraser AI diagram generator plain English code snippets`
- `Lucidchart AI diagram generator text prompt`
- `Miro AI diagram flowchart mind map prompt`

Codebase products:

- `AI codebase visualization GitHub diagram website GitDiagram`
- `DeepWiki AI codebase documentation website GitHub repository`
- `CodeBoarding codebase visual map LLM architecture diagrams`
- `CodeSee codebase map AI visualization developer`

Paper and research products:

- `AI research paper visual summary website paper to infographic`
- `paper to infographic AI tool research paper visual summary`
- `AI paper to report website research assistant generates reports`
- `NotebookLM paper report mind map briefing document sources AI`
- `SciSpace infographic maker research notes export PPTX SVG`
- `graphical abstract AI generator research paper`

Literature-map products:

- `Open Knowledge Maps AI literature visualization official`
- `Connected Papers visual literature map research papers official`
- `ResearchRabbit literature discovery visualization official`
- `Litmaps literature review map citation visualization official`

Infographic and visual-report products:

- `Piktochart AI infographic generator uploaded content`
- `Venngage AI infographic generator document report`
- `Jeda AI infographic generator PDF report article`
- `Infogram AI visuals chart suggestions interactive stories`

## Selection Heuristics

Included if at least one is true:

- The project creates or edits a visual/presentation artifact.
- The project turns a paper or research topic into a figure, graphical abstract, poster, report, web explainer, course, briefing, or literature map.
- The project gives an agent deterministic access to a visual artifact format.
- The project turns a codebase, document, dataset, or prose into a visual map, diagram, dashboard, wiki, course, or deck.
- The project parses papers/documents into a structured representation that is a direct substrate for downstream visual or report generation.
- The project is a major registry that helps discover relevant tools.
- The project is a widely used rendering primitive that LLMs commonly target.

Excluded if:

- It is only a generic agent framework with no presentation or visualization surface.
- It is only a generic charting or slide library with no agent relevance.
- It is a one-off toy demo with no clear reuse path.
- It primarily generates images or video without a structured presentation, diagram, report, paper, or editable output workflow.

## Similar Efforts Found

- [Awesome-Powerpoint-AI-Agents](https://github.com/ishandutta2007/Awesome-Powerpoint-AI-Agents) is closest to a direct PowerPoint-agent list, but it is narrower than this repository.
- [awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills), [awesome-llm-skills](https://github.com/Prat011/awesome-llm-skills), and [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) are broad skill registries, useful for discovery but not focused on visualization/presentation.
- [awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) is the best broad MCP discovery surface.
- [worldbench/awesome-ai-auto-research](https://github.com/worldbench/awesome-ai-auto-research) is useful for the broader AI auto-research landscape, including paper-to-slides/posters/videos/websites/social outputs.
- [scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills), [claude-scientific-writer](https://github.com/K-Dense-AI/claude-scientific-writer), and related academic skill collections are strong skill-registry surfaces for paper/report/figure workflows.
- Commercial comparison pages around Gamma, Canva, Beautiful.ai, Decktopus, and Presentations.AI are plentiful, but most compare products rather than agent-native workflows.

## Added in the Three-Axis Pass

- [STORM](https://github.com/stanford-oval/storm): web/search to long-form cited report.
- [Open Notebook](https://github.com/lfnovo/open-notebook): open-source NotebookLM-style document and knowledge-base workflow.
- [SurfSense](https://github.com/MODSetter/SurfSense): open-source multi-source knowledge/research assistant.
- [Mapify](https://mapify.so/): documents, webpages, videos, and papers to mind maps.
- [TI-Mindmap-GPT](https://github.com/format81/TI-Mindmap-GPT): threat intelligence sources to mind maps, IOC tables, timelines, and reports.
- [Market-Intelligence-Agent](https://github.com/vikas-kashyap97/Market-Intelligence-Agent): live market data and news to charts and strategic summaries.
- [World Monitor](https://github.com/FutureSpeakAI/agent-fridays-global-intelligence-monitor): global news and infrastructure monitoring dashboard.
- [FinRobot](https://github.com/AI4Finance-Foundation/FinRobot): financial analysis agents and research reports.
- [Scira](https://github.com/zaidmukaddam/scira): open-source cited web search assistant.
- [Vane](https://github.com/ItzCrazyKns/Vane): open-source AI answering engine.

## Early Market Read

- Presentation generation is moving from prompt-to-slides toward editable native PPTX with templates, speaker notes, and proof/repair loops.
- Paper and document workflows are becoming "artifact multiplexers": one source can produce graphical abstracts, posters, reports, web explainers, courses, decks, and scripts.
- Agent skills are becoming the strongest packaging format for repeatable office and diagram workflows.
- Research-report tools are converging on evidence tables, citation grounding, paper screening, and customizable report scope.
- Literature-map tools are still mostly productized websites rather than agent skills, but they are central to making research understandable visually.
- PDF/document extraction is a substrate category: without layout, figure, table, citation, and section recovery, downstream visuals become shallow.
- Codebase visualization has two modes: instant public repository maps and deeper local/self-hosted code knowledge graphs for agents.
- Mermaid remains the most common diagram target because LLMs can write it and tools can validate/render it.
- Data visualization agents are strongest when they combine chart generation with executable analysis and provenance.

## Gaps for the Next Pass

- Run deeper GitHub code search for `SKILL.md` files that mention `paper`, `poster`, `graphical abstract`, `infographic`, `report`, `web`, `course`, `pptx`, `mermaid`, `diagram`, `slides`, `deck`, and `visualization`.
- Try the highest-signal tools on the same benchmark inputs: one paper PDF/arXiv URL, one long business report, one GitHub repo, one CSV, one architecture prompt.
- Add columns for output editability, local/self-hosted support, agent interface, and artifact verification.
- Verify commercial pricing/API/export claims because these change quickly.
