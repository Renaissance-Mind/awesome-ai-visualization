![AI visualization banner](assets/banner.png)

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![Catalog](https://img.shields.io/badge/catalog-175_items-blue)](data/catalog.yml)
[![Last researched](https://img.shields.io/badge/last_researched-2026--06--25-brightgreen)](docs/search-log.md)

English | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [Español](README.es.md) | [Türkçe](README.tr.md) | [Русский](README.ru.md)

> [!NOTE]
> This project is auto-updated with help from RenaissanceMind Agent. Tool metadata, stars, licenses, and terms may change over time; verify the official site or repository before relying on an entry.

A curated list of AI and agent tools that turn papers, news, web pages, documents, codebases, data, and knowledge collections into human-readable visual or presentation artifacts.

The catalog is tagged by **information source**, **tool form**, **output artifact**, and **dependency type**. Slides are only one output surface; many tools also produce reports, web pages, diagrams, mind maps, dashboards, or code maps.

## ✨ Recommended Use

| Reader | Recommendation |
| --- | --- |
| 🤖 For Agent | Install/enable the [`ai-visualization-advisor`](skills/ai-visualization-advisor/SKILL.md) skill, then let the agent recommend output forms and tools based on the user's sources, audience, and constraints. It should read [`data/catalog.yml`](data/catalog.yml) and [`data/tool-research.yml`](data/tool-research.yml) first. |
| 👤 For Human | Browse this README, or use [awesome-ai-visualization.renaissancemind.ai](https://awesome-ai-visualization.renaissancemind.ai/) (recommended) to explore and filter tools. |

## Contents

- [Frontend](#frontend)
- [Main Workflow Tools](#main-workflow-tools)
- [Supporting and Pre/Post-Processing Tools](#supporting-and-prepost-processing-tools)
- [How To Choose A Tool](#how-to-choose-a-tool)
- [Find More Tools](#find-more-tools)
- [Data](#data)
- [Contributing](#contributing)

## Frontend

This repository now includes an Open Design-guided React frontend for browsing the catalog as a real application.

```bash
npm install
npm run dev
```

The frontend regenerates [`src/data/catalog.generated.json`](src/data/catalog.generated.json) from [`data/catalog.yml`](data/catalog.yml) and [`data/tool-research.yml`](data/tool-research.yml) before development and production builds. The Open Design brief lives in [`docs/open-design-brief.md`](docs/open-design-brief.md), and the portable design system lives in [`design-systems/awesome-ai-visualization/DESIGN.md`](design-systems/awesome-ai-visualization/DESIGN.md).

## Main Workflow Tools

This section contains tools that directly turn information sources into artifacts people can read, inspect, present, or share. Each row is tagged on all three axes.

### Papers, Research, and Scholarly Discovery

Tools that start from papers, research topics, or scholarly corpora and produce explainers, reports, maps, figures, or communication artifacts.

| Project | Information source | Tool form | Output artifact | Dependencies |
| --- | --- | --- | --- | --- |
| [Paper2Any](https://github.com/OpenDCAI/Paper2Any) [![Star](https://img.shields.io/github/stars/OpenDCAI/Paper2Any?style=flat&logo=github&label=Star)](https://github.com/OpenDCAI/Paper2Any/stargazers) | Papers/research | Open-source app/framework | Graphical abstract/infographic / PPT/deck / Web/interactive page | Local runtime / Model API / Document parsing/OCR / Rendering/export / GPU/accelerator / Templates/assets |
| [paper-2-web](https://github.com/davila7/claude-code-templates/blob/main/cli-tool/components/skills/scientific/paper-2-web/SKILL.md?plain=1) [![Star](https://img.shields.io/github/stars/davila7/claude-code-templates?style=flat&logo=github&label=Star)](https://github.com/davila7/claude-code-templates/stargazers) | Papers/research | Agent skill | Graphical abstract/infographic / PPT/deck / Web/interactive page | Agent host / Model API / Local runtime / Rendering/export / Templates/assets |
| [paper-to-course](https://github.com/ZeroxZhang/paper-to-course) [![Star](https://img.shields.io/github/stars/ZeroxZhang/paper-to-course?style=flat&logo=github&label=Star)](https://github.com/ZeroxZhang/paper-to-course/stargazers) | Papers/research | Agent skill | Web/interactive page / Q&A/study material | Agent host / Model API / Local runtime / Rendering/export |
| [Auto-Research-In-Sleep](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep) [![Star](https://img.shields.io/github/stars/wanshuiyin/Auto-claude-code-research-in-sleep?style=flat&logo=github&label=Star)](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep/stargazers) | Papers/research | Skill collection | Long report / Evidence table | Agent host / Model API / Local runtime / System tools / Rendering/export / Templates/assets |
| [scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) [![Star](https://img.shields.io/github/stars/K-Dense-AI/scientific-agent-skills?style=flat&logo=github&label=Star)](https://github.com/K-Dense-AI/scientific-agent-skills/stargazers) | Papers/research | Skill collection | Graphical abstract/infographic / PPT/deck / Web/interactive page | Agent host / Model API / External search/data / Rendering/export |
| [claude-scientific-writer](https://github.com/K-Dense-AI/claude-scientific-writer) [![Star](https://img.shields.io/github/stars/K-Dense-AI/claude-scientific-writer?style=flat&logo=github&label=Star)](https://github.com/K-Dense-AI/claude-scientific-writer/stargazers) | Papers/research | Agent skill | Long report / Evidence table | Agent host / Model API / External search/data / Templates/assets |
| [SciGA](https://github.com/IyatomiLab/SciGA) [![Star](https://img.shields.io/github/stars/IyatomiLab/SciGA?style=flat&logo=github&label=Star)](https://github.com/IyatomiLab/SciGA/stargazers) | Papers/research | Dataset/benchmark | Graphical abstract/infographic / PPT/deck / Web/interactive page | Local runtime / Document parsing/OCR / GPU/accelerator |
| [Academic Figures](https://github.com/sai-tv/academic-figures) [![Star](https://img.shields.io/github/stars/sai-tv/academic-figures?style=flat&logo=github&label=Star)](https://github.com/sai-tv/academic-figures/stargazers) | Papers/research / Text/ideas | Agent skill | Graphical abstract/infographic / SVG/PNG/PDF | Agent host / Model API / Rendering/export / Templates/assets |
| [PaperBanana](https://github.com/dwzhu-pku/PaperBanana) [![Star](https://img.shields.io/github/stars/dwzhu-pku/PaperBanana?style=flat&logo=github&label=Star)](https://github.com/dwzhu-pku/PaperBanana/stargazers) | Papers/research / Text/ideas | Open-source app/framework | Graphical abstract/infographic / SVG/PNG/PDF | Local runtime / Model API / Document parsing/OCR / External search/data / Rendering/export / Templates/assets |
| [Paper2Slides](https://github.com/pchi123/Paper2Slides) [![Star](https://img.shields.io/github/stars/pchi123/Paper2Slides?style=flat&logo=github&label=Star)](https://github.com/pchi123/Paper2Slides/stargazers) | Papers/research | Open-source app/framework | Graphical abstract/infographic / PPT/deck | Local runtime / Document parsing/OCR / Rendering/export / Templates/assets |
| [AI-Researcher](https://github.com/HKUDS/AI-Researcher) [![Star](https://img.shields.io/github/stars/HKUDS/AI-Researcher?style=flat&logo=github&label=Star)](https://github.com/HKUDS/AI-Researcher/stargazers) | Papers/research | Research prototype | Long report / Evidence table | Local runtime / Model API / External search/data / GPU/accelerator |
| [Elicit](https://elicit.com/) | Papers/research | Product/SaaS | Briefing/report / Evidence table | Browser/account / External search/data |
| [Paperguide](https://paperguide.ai/) | Papers/research | Product/SaaS | Briefing/report / Evidence table | Browser/account / External search/data |
| [SciSpace Infographic Maker](https://scispace.com/agents/infographic-maker-hbcwetac) | Papers/research | Product/SaaS | Graphical abstract/infographic / PPT/deck / Web/interactive page | Browser/account / Templates/assets |
| [Grabstract](https://grabstract.io/graphical-abstracts) | Papers/research | Product/SaaS | Graphical abstract/infographic / PPT/deck / Web/interactive page | Browser/account / Templates/assets |
| [Open Knowledge Maps](https://openknowledgemaps.org/) | Papers/research / Citation graph | Product/SaaS | Literature/knowledge map | Browser/account / External search/data |
| [Connected Papers](https://www.connectedpapers.com/) | Papers/research / Citation graph | Product/SaaS | Literature/knowledge map | Browser/account / External search/data |
| [ResearchRabbit](https://www.researchrabbit.ai/) | Papers/research / Citation graph | Product/SaaS | Literature/knowledge map | Browser/account / External search/data |
| [Litmaps](https://www.litmaps.com/) | Papers/research / Citation graph | Product/SaaS | Literature/knowledge map | Browser/account / External search/data |
| [Consensus](https://consensus.app/) | Papers/research | Product/SaaS | Briefing/report / Evidence table | Browser/account / External search/data |

### Web, News, and Intelligence

Tools that start from web pages, search results, news streams, market data, or threat intelligence and produce grounded reports, dashboards, or maps.

| Project | Information source | Tool form | Output artifact | Dependencies |
| --- | --- | --- | --- | --- |
| [GPT Researcher](https://github.com/assafelovic/gpt-researcher) [![Star](https://img.shields.io/github/stars/assafelovic/gpt-researcher?style=flat&logo=github&label=Star)](https://github.com/assafelovic/gpt-researcher/stargazers) | Web/search / News/intelligence | Open-source app/framework | Long report / Cited answer | Local runtime / Model API / External search/data / Storage/index |
| [STORM](https://github.com/stanford-oval/storm) [![Star](https://img.shields.io/github/stars/stanford-oval/storm?style=flat&logo=github&label=Star)](https://github.com/stanford-oval/storm/stargazers) | Web/search / News/intelligence | Open-source app/framework | Long report / Cited answer | Local runtime / Model API / External search/data / Storage/index |
| [Scira](https://github.com/zaidmukaddam/scira) [![Star](https://img.shields.io/github/stars/zaidmukaddam/scira?style=flat&logo=github&label=Star)](https://github.com/zaidmukaddam/scira/stargazers) | Web/search / News/intelligence | Open-source app/framework / Bot/assistant | Long report / Cited answer | Local runtime / Model API / External search/data / Storage/index |
| [Vane](https://github.com/ItzCrazyKns/Vane) [![Star](https://img.shields.io/github/stars/ItzCrazyKns/Vane?style=flat&logo=github&label=Star)](https://github.com/ItzCrazyKns/Vane/stargazers) | Web/search / News/intelligence | Open-source app/framework / Bot/assistant | Long report / Cited answer | Local runtime / Model API / External search/data / Storage/index |
| [FinRobot](https://github.com/AI4Finance-Foundation/FinRobot) [![Star](https://img.shields.io/github/stars/AI4Finance-Foundation/FinRobot?style=flat&logo=github&label=Star)](https://github.com/AI4Finance-Foundation/FinRobot/stargazers) | News/intelligence / Data/tables / Web/search | Open-source app/framework | Long report / Chart/dashboard | Local runtime / Model API / External search/data / Rendering/export |
| [Market-Intelligence-Agent](https://github.com/vikas-kashyap97/Market-Intelligence-Agent) [![Star](https://img.shields.io/github/stars/vikas-kashyap97/Market-Intelligence-Agent?style=flat&logo=github&label=Star)](https://github.com/vikas-kashyap97/Market-Intelligence-Agent/stargazers) | News/intelligence / Data/tables / Web/search | Open-source app/framework | Chart/dashboard / Briefing/report | Local runtime / Model API / External search/data / Rendering/export / Storage/index |
| [World Monitor](https://github.com/FutureSpeakAI/agent-fridays-global-intelligence-monitor) [![Star](https://img.shields.io/github/stars/FutureSpeakAI/agent-fridays-global-intelligence-monitor?style=flat&logo=github&label=Star)](https://github.com/FutureSpeakAI/agent-fridays-global-intelligence-monitor/stargazers) | News/intelligence / Web/search | Open-source app/framework | Chart/dashboard / Briefing/report | Local runtime / Model API / External search/data / Rendering/export / Storage/index |
| [OSSInsight](https://github.com/pingcap/ossinsight) [![Star](https://img.shields.io/github/stars/pingcap/ossinsight?style=flat&logo=github&label=Star)](https://github.com/pingcap/ossinsight/stargazers) | Codebase / Data/tables / Web/search | Open-source app/framework / Product/SaaS | Chart/dashboard / Briefing/report | Browser/account / External search/data / Rendering/export / Storage/index |

### Documents, PDFs, and Knowledge Bases

Tools that start from PDFs, office files, web pages, personal documents, or team knowledge bases and produce briefings, Q&A, study material, or knowledge maps.

| Project | Information source | Tool form | Output artifact | Dependencies |
| --- | --- | --- | --- | --- |
| [notex](https://github.com/smallnest/notex) [![Star](https://img.shields.io/github/stars/smallnest/notex?style=flat&logo=github&label=Star)](https://github.com/smallnest/notex/stargazers) | PDF/documents / Web/search / Knowledge base | Open-source app/framework | Briefing/report / Mind map/knowledge map / Q&A/study material | Local runtime / Model API / Document parsing/OCR / Rendering/export / Storage/index |
| [Open Notebook](https://github.com/lfnovo/open-notebook) [![Star](https://img.shields.io/github/stars/lfnovo/open-notebook?style=flat&logo=github&label=Star)](https://github.com/lfnovo/open-notebook/stargazers) | PDF/documents / Web/search / Knowledge base | Open-source app/framework | Briefing/report / Mind map/knowledge map / Q&A/study material | Local runtime / Model API / Document parsing/OCR / Storage/index |
| [SurfSense](https://github.com/MODSetter/SurfSense) [![Star](https://img.shields.io/github/stars/MODSetter/SurfSense?style=flat&logo=github&label=Star)](https://github.com/MODSetter/SurfSense/stargazers) | PDF/documents / Web/search / Knowledge base | Open-source app/framework | Briefing/report / Mind map/knowledge map / Q&A/study material | Local runtime / Model API / External search/data / Storage/index |
| [NotebookLM](https://notebooklm.google/) | PDF/documents / Web/search / Knowledge base | Product/SaaS / Bot/assistant | Briefing/report / Mind map/knowledge map / Q&A/study material | Browser/account |
| [NotebookLM AI Plugin](https://github.com/proyecto26/notebooklm-ai-plugin) [![Star](https://img.shields.io/github/stars/proyecto26/notebooklm-ai-plugin?style=flat&logo=github&label=Star)](https://github.com/proyecto26/notebooklm-ai-plugin/stargazers) | PDF/documents / Web/search / Knowledge base / Any/multi-source | Agent skill / Bot/assistant | PPT/deck / Video/audio / Mind map/knowledge map / Infographic/visual report / Briefing/report / Table/timeline / Q&A/study material | Agent host / Browser/account / Local runtime / Document parsing/OCR / External search/data / Rendering/export |

### Codebases and Software Systems

Tools that turn repositories, local code, dependencies, or diffs into architecture diagrams, repo wikis, code maps, or knowledge graphs.

| Project | Information source | Tool form | Output artifact | Dependencies |
| --- | --- | --- | --- | --- |
| [GitDiagram](https://github.com/ahmedkhaleel2004/gitdiagram) [![Star](https://img.shields.io/github/stars/ahmedkhaleel2004/gitdiagram?style=flat&logo=github&label=Star)](https://github.com/ahmedkhaleel2004/gitdiagram/stargazers) | Codebase | Open-source app/framework | Code map/repo wiki / Architecture/flow diagram | Browser/account / Model API / Code analysis |
| [CodeBoarding](https://github.com/Codeboarding/CodeBoarding) [![Star](https://img.shields.io/github/stars/Codeboarding/CodeBoarding?style=flat&logo=github&label=Star)](https://github.com/Codeboarding/CodeBoarding/stargazers) | Codebase | Open-source app/framework | Code map/repo wiki / Architecture/flow diagram | Local runtime / Model API / Code analysis / Rendering/export / Storage/index |
| [Understand-Anything](https://github.com/Egonex-AI/Understand-Anything) [![Star](https://img.shields.io/github/stars/Egonex-AI/Understand-Anything?style=flat&logo=github&label=Star)](https://github.com/Egonex-AI/Understand-Anything/stargazers) | Codebase | Agent skill | Code map/repo wiki / Architecture/flow diagram | Agent host / Local runtime / Model API / Code analysis / Storage/index |
| [GitNexus](https://github.com/abhigyanpatwari/GitNexus) [![Star](https://img.shields.io/github/stars/abhigyanpatwari/GitNexus?style=flat&logo=github&label=Star)](https://github.com/abhigyanpatwari/GitNexus/stargazers) | Codebase | Open-source app/framework / MCP server | Code map/repo wiki / Architecture/flow diagram / Web/interactive page | MCP client / Local runtime / Code analysis / Storage/index / Rendering/export |
| [DeepWiki Open](https://github.com/AsyncFuncAI/deepwiki-open) [![Star](https://img.shields.io/github/stars/AsyncFuncAI/deepwiki-open?style=flat&logo=github&label=Star)](https://github.com/AsyncFuncAI/deepwiki-open/stargazers) | Codebase | Open-source app/framework | Code map/repo wiki / Architecture/flow diagram | Local runtime / Model API / Code analysis / Rendering/export |
| [local-deepwiki-mcp](https://github.com/UrbanDiver/local-deepwiki-mcp) [![Star](https://img.shields.io/github/stars/UrbanDiver/local-deepwiki-mcp?style=flat&logo=github&label=Star)](https://github.com/UrbanDiver/local-deepwiki-mcp/stargazers) | Codebase | MCP server / Open-source app/framework | Code map/repo wiki / Architecture/flow diagram / Web/interactive page / SVG/PNG/PDF | MCP client / Local runtime / Model API / Code analysis / Storage/index / Rendering/export / GPU/accelerator |
| [PocketFlow Tutorial Codebase Knowledge](https://github.com/The-Pocket/PocketFlow-Tutorial-Codebase-Knowledge) [![Star](https://img.shields.io/github/stars/The-Pocket/PocketFlow-Tutorial-Codebase-Knowledge?style=flat&logo=github&label=Star)](https://github.com/The-Pocket/PocketFlow-Tutorial-Codebase-Knowledge/stargazers) | Codebase | Open-source app/framework | Code map/repo wiki / Architecture/flow diagram | Local runtime / Model API / Code analysis / Rendering/export |
| [GitVizz](https://github.com/adithya-s-k/GitVizz) [![Star](https://img.shields.io/github/stars/adithya-s-k/GitVizz?style=flat&logo=github&label=Star)](https://github.com/adithya-s-k/GitVizz/stargazers) | Codebase | Open-source app/framework | Code map/repo wiki / Architecture/flow diagram | Browser/account / Model API / Code analysis / Rendering/export |
| [codeflow](https://github.com/braedonsaunders/codeflow) [![Star](https://img.shields.io/github/stars/braedonsaunders/codeflow?style=flat&logo=github&label=Star)](https://github.com/braedonsaunders/codeflow/stargazers) | Codebase | Open-source app/framework | Code map/repo wiki / Architecture/flow diagram | Browser/account / Model API / Code analysis / Rendering/export |
| [oh-my-mermaid](https://github.com/oh-my-mermaid/oh-my-mermaid) [![Star](https://img.shields.io/github/stars/oh-my-mermaid/oh-my-mermaid?style=flat&logo=github&label=Star)](https://github.com/oh-my-mermaid/oh-my-mermaid/stargazers) | Codebase | Agent skill | Code map/repo wiki / Architecture/flow diagram | Agent host / Model API / Code analysis / Rendering/export |
| [codag-visualizer](https://github.com/codag-megalith/codag-visualizer) [![Star](https://img.shields.io/github/stars/codag-megalith/codag-visualizer?style=flat&logo=github&label=Star)](https://github.com/codag-megalith/codag-visualizer/stargazers) | Codebase | Open-source app/framework | Code map/repo wiki / Architecture/flow diagram | Local runtime / Code analysis / Rendering/export |
| [codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp) [![Star](https://img.shields.io/github/stars/DeusData/codebase-memory-mcp?style=flat&logo=github&label=Star)](https://github.com/DeusData/codebase-memory-mcp/stargazers) | Codebase | MCP server | Code map/repo wiki / Architecture/flow diagram | MCP client / Local runtime / Code analysis / Storage/index |
| [CodeAtlas](https://github.com/lucyb0207/CodeAtlas) [![Star](https://img.shields.io/github/stars/lucyb0207/CodeAtlas?style=flat&logo=github&label=Star)](https://github.com/lucyb0207/CodeAtlas/stargazers) | Codebase | Open-source app/framework | Code map/repo wiki / Architecture/flow diagram | Local runtime / Code analysis / Rendering/export |
| [devlensOSS](https://github.com/devlensio/devlensOSS) [![Star](https://img.shields.io/github/stars/devlensio/devlensOSS?style=flat&logo=github&label=Star)](https://github.com/devlensio/devlensOSS/stargazers) | Codebase | Open-source app/framework | Code map/repo wiki / Architecture/flow diagram | Local runtime / Code analysis / Rendering/export |
| [Visual-Explainer](https://github.com/jircik/Visual-Explainer) [![Star](https://img.shields.io/github/stars/jircik/Visual-Explainer?style=flat&logo=github&label=Star)](https://github.com/jircik/Visual-Explainer/stargazers) | Codebase | Agent skill | Code map/repo wiki / Architecture/flow diagram | Agent host / Model API / Code analysis / Rendering/export |
| [codemap-skill](https://github.com/Asixa/codemap-skill) [![Star](https://img.shields.io/github/stars/Asixa/codemap-skill?style=flat&logo=github&label=Star)](https://github.com/Asixa/codemap-skill/stargazers) | Codebase | Agent skill | Code map/repo wiki / Architecture/flow diagram | Agent host / Model API / Code analysis |
| [DeepWiki](https://docs.devin.ai/work-with-devin/deepwiki) | Codebase | Product/SaaS | Code map/repo wiki / Architecture/flow diagram | Browser/account / Code analysis |
| [CodeSee](https://www.codesee.io/) | Codebase | Product/SaaS | Code map/repo wiki / Architecture/flow diagram | Browser/account / Code analysis |

### Data, Tables, and Business Metrics

Tools that turn CSVs, databases, metrics, or business data into charts, dashboards, or analytical reports.

| Project | Information source | Tool form | Output artifact | Dependencies |
| --- | --- | --- | --- | --- |
| [Data Formulator](https://github.com/microsoft/data-formulator) [![Star](https://img.shields.io/github/stars/microsoft/data-formulator?style=flat&logo=github&label=Star)](https://github.com/microsoft/data-formulator/stargazers) | Data/tables / Database | Open-source app/framework | Chart/dashboard / Briefing/report | Local runtime / Model API / Rendering/export |
| [LIDA](https://github.com/microsoft/lida) [![Star](https://img.shields.io/github/stars/microsoft/lida?style=flat&logo=github&label=Star)](https://github.com/microsoft/lida/stargazers) | Data/tables / Database | Open-source app/framework | Chart/dashboard / Briefing/report | Local runtime / Model API / Rendering/export |
| [WrenAI](https://github.com/Canner/WrenAI) [![Star](https://img.shields.io/github/stars/Canner/WrenAI?style=flat&logo=github&label=Star)](https://github.com/Canner/WrenAI/stargazers) | Data/tables / Database / Knowledge base | Open-source app/framework / Agent skill | Chart/dashboard / Briefing/report | Agent host / Local runtime / Model API / External data / Storage/index |
| [Vanna](https://github.com/vanna-ai/vanna) [![Star](https://img.shields.io/github/stars/vanna-ai/vanna?style=flat&logo=github&label=Star)](https://github.com/vanna-ai/vanna/stargazers) | Database / Data/tables | Open-source app/framework / API/SDK/library | Chart/dashboard / Briefing/report | Local runtime / Model API / External search/data / Storage/index / Rendering/export |
| [VMind](https://github.com/VisActor/VMind) [![Star](https://img.shields.io/github/stars/VisActor/VMind?style=flat&logo=github&label=Star)](https://github.com/VisActor/VMind/stargazers) | Data/tables / Text/ideas | API/SDK/library | Chart/dashboard / Infographic/visual report / Rendered chart | Local runtime / Model API / Rendering/export / Templates/assets |
| [Semiotic](https://github.com/nteract/semiotic) [![Star](https://img.shields.io/github/stars/nteract/semiotic?style=flat&logo=github&label=Star)](https://github.com/nteract/semiotic/stargazers) | Data/tables / DSL/code | API/SDK/library / MCP server | Chart/dashboard / Rendered chart / SVG/PNG/PDF | Local runtime / MCP client / Rendering/export / Templates/assets |
| [chart-visualization-skills](https://github.com/antvis/chart-visualization-skills) [![Star](https://img.shields.io/github/stars/antvis/chart-visualization-skills?style=flat&logo=github&label=Star)](https://github.com/antvis/chart-visualization-skills/stargazers) | Data/tables / Text/ideas / Code/technical text | Skill collection / API/SDK/library | Chart/dashboard / Visual report / Flow diagram / Rendered chart | Agent host / Local runtime / Rendering/export / Templates/assets |
| [mcp-server-chart](https://github.com/antvis/mcp-server-chart) [![Star](https://img.shields.io/github/stars/antvis/mcp-server-chart?style=flat&logo=github&label=Star)](https://github.com/antvis/mcp-server-chart/stargazers) | Data/tables / Text/ideas / Database | MCP server / Skill collection | Chart/dashboard / Visual report / Flow diagram / Whiteboard/mind map / Rendered chart | MCP client / Local runtime / Rendering/export |
| [mcp-dashboards](https://github.com/KyuRish/mcp-dashboards) [![Star](https://img.shields.io/github/stars/KyuRish/mcp-dashboards?style=flat&logo=github&label=Star)](https://github.com/KyuRish/mcp-dashboards/stargazers) | Data/tables / Database / Any/multi-source | MCP server | Chart/dashboard / PPT/deck / SVG/PNG/PDF | MCP client / Agent host / Local runtime / External search/data / Rendering/export |
| [MatPlotAgent](https://github.com/thunlp/MatPlotAgent) [![Star](https://img.shields.io/github/stars/thunlp/MatPlotAgent?style=flat&logo=github&label=Star)](https://github.com/thunlp/MatPlotAgent/stargazers) | Data/tables / Database | Research prototype | Chart/dashboard / Briefing/report | Local runtime / Model API / Rendering/export |
| [OpenVizAI](https://github.com/OpenVizAI/OpenVizAI) [![Star](https://img.shields.io/github/stars/OpenVizAI/OpenVizAI?style=flat&logo=github&label=Star)](https://github.com/OpenVizAI/OpenVizAI/stargazers) | Data/tables / Database | Open-source app/framework | Chart/dashboard / Briefing/report | Local runtime / Model API / Rendering/export |
| [generative-dashboard-builder](https://github.com/KaranChandekar/generative-dashboard-builder) [![Star](https://img.shields.io/github/stars/KaranChandekar/generative-dashboard-builder?style=flat&logo=github&label=Star)](https://github.com/KaranChandekar/generative-dashboard-builder/stargazers) | Data/tables / Database | Open-source app/framework | Chart/dashboard / Briefing/report | Local runtime / Model API / Rendering/export / Storage/index |
| [OpenBI](https://github.com/narender-rk10/OpenBI) [![Star](https://img.shields.io/github/stars/narender-rk10/OpenBI?style=flat&logo=github&label=Star)](https://github.com/narender-rk10/OpenBI/stargazers) | Data/tables / Database | Open-source app/framework | Chart/dashboard / Briefing/report | Local runtime / Model API / External search/data / Storage/index / Rendering/export |

### General Text, Ideas, and Whiteboard Visuals

Tools that turn prompts, drafts, whiteboard ideas, or semi-structured text into infographics, diagrams, whiteboards, or visual reports.

| Project | Information source | Tool form | Output artifact | Dependencies |
| --- | --- | --- | --- | --- |
| [q-skills](https://github.com/TyrealQ/q-skills) [![Star](https://img.shields.io/github/stars/TyrealQ/q-skills?style=flat&logo=github&label=Star)](https://github.com/TyrealQ/q-skills/stargazers) | Text/ideas / PDF/documents / Data/tables | Skill collection | Infographic/visual report / Long report | Agent host / Model API / Local runtime / Rendering/export |
| [Visualize](https://github.com/careerhackeralex/visualize) [![Star](https://img.shields.io/github/stars/careerhackeralex/visualize?style=flat&logo=github&label=Star)](https://github.com/careerhackeralex/visualize/stargazers) | Text/ideas / Data/tables / Code/technical text | Agent skill | Web/interactive page / PPT/deck / Chart/dashboard / Infographic/visual report / Architecture/flow diagram | Agent host / Model API / Local runtime / Rendering/export / Templates/assets |
| [Visual Explainer Skill](https://github.com/ericblue/visual-explainer-skill) [![Star](https://img.shields.io/github/stars/ericblue/visual-explainer-skill?style=flat&logo=github&label=Star)](https://github.com/ericblue/visual-explainer-skill/stargazers) | Text/ideas / PDF/documents / Codebase / Code/technical text | Agent skill | Infographic/visual report / Whiteboard/mind map / PPT/deck / Architecture/flow diagram / Graphical abstract/infographic | Agent host / Model API / Rendering/export / Templates/assets |
| [visual-explainer](https://github.com/nicobailon/visual-explainer) [![Star](https://img.shields.io/github/stars/nicobailon/visual-explainer?style=flat&logo=github&label=Star)](https://github.com/nicobailon/visual-explainer/stargazers) | Text/ideas / Codebase / Code/technical text / Data/tables | Agent skill | Web/interactive page / PPT/deck / Architecture/flow diagram / Chart/dashboard / Infographic/visual report | Agent host / Local runtime / Rendering/export / Templates/assets |
| [baoyu-skills](https://github.com/JimLiu/baoyu-skills) [![Star](https://img.shields.io/github/stars/JimLiu/baoyu-skills?style=flat&logo=github&label=Star)](https://github.com/JimLiu/baoyu-skills/stargazers) | Text/ideas / PDF/documents / Web/search | Skill collection | Infographic/visual report / Graphical abstract/infographic / PPT/deck / SVG/PNG/PDF | Agent host / Model API / Local runtime / Rendering/export / Templates/assets |
| [aiz-infographic](https://github.com/aizzaku/aiz-infographic) [![Star](https://img.shields.io/github/stars/aizzaku/aiz-infographic?style=flat&logo=github&label=Star)](https://github.com/aizzaku/aiz-infographic/stargazers) | Text/ideas / Data/tables | Agent skill | Infographic/visual report / Web/interactive page / SVG/PNG/PDF | Agent host / Local runtime / Rendering/export / Templates/assets |
| [ascii-canvas](https://github.com/noodlebindev/ascii-canvas) [![Star](https://img.shields.io/github/stars/noodlebindev/ascii-canvas?style=flat&logo=github&label=Star)](https://github.com/noodlebindev/ascii-canvas/stargazers) | Text/ideas / Code/technical text / Papers/research / Data/tables | Agent skill | Infographic/visual report / Architecture/flow diagram / Whiteboard/mind map / Timeline / PPT/deck | Agent host / Local runtime / Rendering/export |
| [Piktochart AI](https://piktochart.com/generative-ai/) | Text/ideas / PDF/documents / Data/tables | Product/SaaS | Infographic/visual report / Long report | Browser/account / Templates/assets |
| [hbr-style-visualization](https://github.com/kgraph57/hbr-style-visualization) [![Star](https://img.shields.io/github/stars/kgraph57/hbr-style-visualization?style=flat&logo=github&label=Star)](https://github.com/kgraph57/hbr-style-visualization/stargazers) | Text/ideas / Data/tables | Agent skill | Infographic/visual report / Chart/dashboard / PPT/deck | Agent host / Model API / Rendering/export / Templates/assets |
| [Venngage AI Infographic Generator](https://venngage.com/ai-tools/infographic-generator) | Text/ideas / PDF/documents / Data/tables | Product/SaaS | Infographic/visual report / Long report | Browser/account / Templates/assets |
| [Venngage AI Report Generator](https://venngage.com/ai-tools/report-generator) | Text/ideas / PDF/documents / Data/tables | Product/SaaS | Infographic/visual report / Long report | Browser/account / Templates/assets |
| [Jeda AI Infographic Generator](https://www.jeda.ai/ai-infographic-generator) | Text/ideas / PDF/documents / Data/tables | Product/SaaS | Infographic/visual report / Long report | Browser/account / Document parsing/OCR / Templates/assets |
| [Infogram](https://infogram.com/) | Text/ideas / PDF/documents / Data/tables | Product/SaaS | Infographic/visual report / Long report | Browser/account / External search/data / Templates/assets |
| [DeepDiagram](https://github.com/LingyiChen-AI/DeepDiagram) [![Star](https://img.shields.io/github/stars/LingyiChen-AI/DeepDiagram?style=flat&logo=github&label=Star)](https://github.com/LingyiChen-AI/DeepDiagram/stargazers) | Text/ideas / Code/technical text / Data/tables | Open-source app/framework | Architecture/flow diagram / Whiteboard/mind map / Chart/dashboard / Infographic/visual report / Diagram/Mermaid | Local runtime / Model API / Rendering/export / Templates/assets / Storage/index |
| [next-ai-draw-io](https://github.com/DayuanJiang/next-ai-draw-io) [![Star](https://img.shields.io/github/stars/DayuanJiang/next-ai-draw-io?style=flat&logo=github&label=Star)](https://github.com/DayuanJiang/next-ai-draw-io/stargazers) | Text/ideas / Code/technical text | Open-source app/framework | Architecture/flow diagram / Whiteboard/mind map / SVG/PNG/PDF | Browser/account / Local runtime / Model API / Rendering/export / Templates/assets |
| [Napkin AI](https://www.napkin.ai/) | Text/ideas / Code/technical text | Product/SaaS | Architecture/flow diagram / Whiteboard/mind map | Browser/account / Templates/assets |
| [Eraser AI](https://www.eraser.io/ai) | Text/ideas / Code/technical text | Product/SaaS | Architecture/flow diagram / Whiteboard/mind map | Browser/account / Templates/assets |
| [Mermaid Chart AI](https://mermaid.ai/mermaid-ai) | Text/ideas / Code/technical text | Product/SaaS | Architecture/flow diagram / Whiteboard/mind map | Browser/account / Rendering/export |
| [Whimsical AI](https://whimsical.com/ai) | Text/ideas / Code/technical text | Product/SaaS | Architecture/flow diagram / Whiteboard/mind map | Browser/account / Templates/assets |
| [Lucid AI](https://www.lucidchart.com/pages/use-cases/diagram-with-AI) | Text/ideas / Code/technical text | Product/SaaS | Architecture/flow diagram / Whiteboard/mind map | Browser/account / Templates/assets |
| [Miro AI diagrams](https://help.miro.com/hc/en-us/articles/28782102127890-Miro-AI-with-Diagrams-and-mindmaps) | Text/ideas / Code/technical text | Product/SaaS | Architecture/flow diagram / Whiteboard/mind map | Browser/account / Templates/assets |
| [FigJam AI](https://help.figma.com/hc/en-us/articles/18706554628119-Make-boards-and-diagrams-with-FigJam-AI) | Text/ideas / Code/technical text | Product/SaaS | Architecture/flow diagram / Whiteboard/mind map | Browser/account / Templates/assets |

### Programmatic Video and Motion Explainers

Tools that turn prompts, web pages, repositories, structured timelines, or agent-produced HTML into narrated or animated MP4/video artifacts.

| Project | Information source | Tool form | Output artifact | Dependencies |
| --- | --- | --- | --- | --- |
| [html-video](https://github.com/nexu-io/html-video) [![Star](https://img.shields.io/github/stars/nexu-io/html-video?style=flat&logo=github&label=Star)](https://github.com/nexu-io/html-video/stargazers) | Text/ideas / Web/search / Codebase | Open-source app/framework | Video/audio / Web/interactive page | Agent host / Local runtime / Model API / Rendering/export / System tools / Templates/assets |
| [HyperFrames](https://github.com/heygen-com/hyperframes) [![Star](https://img.shields.io/github/stars/heygen-com/hyperframes?style=flat&logo=github&label=Star)](https://github.com/heygen-com/hyperframes/stargazers) | Text/ideas / Web/search / PDF/documents / Data/tables / DSL/code | Open-source app/framework / Agent skill | Video/audio / Web/interactive page / Chart/dashboard | Agent host / Local runtime / Rendering/export / System tools / Templates/assets |
| [NextFrame](https://github.com/ChaosRealmsAI/NextFrame) [![Star](https://img.shields.io/github/stars/ChaosRealmsAI/NextFrame?style=flat&logo=github&label=Star)](https://github.com/ChaosRealmsAI/NextFrame/stargazers) | DSL/code / Text/ideas | Open-source app/framework | Video/audio / Web/interactive page | Local runtime / Rendering/export / System tools |
| [Helios](https://github.com/BintzGavin/helios) [![Star](https://img.shields.io/github/stars/BintzGavin/helios?style=flat&logo=github&label=Star)](https://github.com/BintzGavin/helios/stargazers) | DSL/code / Text/ideas | API/SDK/library / Agent skill | Video/audio / Web/interactive page | Local runtime / Rendering/export / System tools / Agent host |
| [OpenMontage](https://github.com/calesthio/OpenMontage) [![Star](https://img.shields.io/github/stars/calesthio/OpenMontage?style=flat&logo=github&label=Star)](https://github.com/calesthio/OpenMontage/stargazers) | Text/ideas / Web/search / News/intelligence | Open-source app/framework | Video/audio | Agent host / Local runtime / Model API / External search/data / Rendering/export / System tools |
| [ralphy](https://github.com/alecs5am/ralphy) [![Star](https://img.shields.io/github/stars/alecs5am/ralphy?style=flat&logo=github&label=Star)](https://github.com/alecs5am/ralphy/stargazers) | Text/ideas / Web/search | Open-source app/framework | Video/audio | Agent host / Local runtime / Model API / Rendering/export / System tools / Storage/index |
| [data-animation-skills](https://github.com/iart-ai/data-animation-skills) [![Star](https://img.shields.io/github/stars/iart-ai/data-animation-skills?style=flat&logo=github&label=Star)](https://github.com/iart-ai/data-animation-skills/stargazers) | Data/tables / Text/ideas | Skill collection | Video/audio / Chart/dashboard / Infographic/visual report / PPT/deck | Agent host / Local runtime / Rendering/export / Templates/assets |

### Presentations and Multi-Source Content

Tools that turn text, documents, web pages, research material, or outlines into decks, or let agents generate/edit presentations.

| Project | Information source | Tool form | Output artifact | Dependencies |
| --- | --- | --- | --- | --- |
| [ppt-master](https://github.com/hugohe3/ppt-master) [![Star](https://img.shields.io/github/stars/hugohe3/ppt-master?style=flat&logo=github&label=Star)](https://github.com/hugohe3/ppt-master/stargazers) | Text/ideas / PDF/documents / Web/search | Open-source app/framework | PPT/deck | Local runtime / Model API / Rendering/export / Templates/assets |
| [Presenton](https://github.com/presenton/presenton) [![Star](https://img.shields.io/github/stars/presenton/presenton?style=flat&logo=github&label=Star)](https://github.com/presenton/presenton/stargazers) | Text/ideas / PDF/documents / Web/search | Open-source app/framework / API/SDK/library | PPT/deck | Local runtime / Model API / Rendering/export / MCP client / Templates/assets |
| [PPTAgent](https://github.com/icip-cas/PPTAgent) [![Star](https://img.shields.io/github/stars/icip-cas/PPTAgent?style=flat&logo=github&label=Star)](https://github.com/icip-cas/PPTAgent/stargazers) | Text/ideas / PDF/documents / Web/search | Research prototype | PPT/deck | Local runtime / Model API / Rendering/export / Templates/assets |
| [AI Multi-Agent Presentation Builder](https://github.com/Azure-Samples/ai-multi-agent-presentation-builder) [![Star](https://img.shields.io/github/stars/Azure-Samples/ai-multi-agent-presentation-builder?style=flat&logo=github&label=Star)](https://github.com/Azure-Samples/ai-multi-agent-presentation-builder/stargazers) | Text/ideas / Web/search | Open-source app/framework | PPT/deck | Local runtime / Model API / External search/data / Rendering/export / Templates/assets |
| [presentation-ai](https://github.com/allweonedev/presentation-ai) [![Star](https://img.shields.io/github/stars/allweonedev/presentation-ai?style=flat&logo=github&label=Star)](https://github.com/allweonedev/presentation-ai/stargazers) | Text/ideas / PDF/documents / Web/search | Open-source app/framework | PPT/deck | Local runtime / Model API / Rendering/export / Templates/assets |
| [slide-deck-ai](https://github.com/barun-saha/slide-deck-ai) [![Star](https://img.shields.io/github/stars/barun-saha/slide-deck-ai?style=flat&logo=github&label=Star)](https://github.com/barun-saha/slide-deck-ai/stargazers) | Text/ideas / PDF/documents / Web/search | Open-source app/framework | PPT/deck | Local runtime / Model API / Rendering/export / Templates/assets |
| [odin-slides](https://github.com/leonid20000/odin-slides) [![Star](https://img.shields.io/github/stars/leonid20000/odin-slides?style=flat&logo=github&label=Star)](https://github.com/leonid20000/odin-slides/stargazers) | Text/ideas / PDF/documents / Web/search | Open-source app/framework | PPT/deck | Local runtime / Model API / Document parsing/OCR / Rendering/export / System tools |
| [ppt-agents](https://github.com/chenxingqiang/ppt-agents) [![Star](https://img.shields.io/github/stars/chenxingqiang/ppt-agents?style=flat&logo=github&label=Star)](https://github.com/chenxingqiang/ppt-agents/stargazers) | Text/ideas / PDF/documents / Web/search | Open-source app/framework | PPT/deck | Agent host / Local runtime / Model API / Rendering/export |
| [deckdown](https://github.com/adityachauhan0/deckdown) [![Star](https://img.shields.io/github/stars/adityachauhan0/deckdown?style=flat&logo=github&label=Star)](https://github.com/adityachauhan0/deckdown/stargazers) | Text/ideas / PDF/documents / Web/search | Open-source app/framework | PPT/deck | Local runtime / Rendering/export |
| [Frontend Slides](https://github.com/zarazhangrui/frontend-slides) [![Star](https://img.shields.io/github/stars/zarazhangrui/frontend-slides?style=flat&logo=github&label=Star)](https://github.com/zarazhangrui/frontend-slides/stargazers) | Text/ideas / PDF/documents | Agent Skill | PPT/deck / Web/interactive page | Agent host / Model API / Local runtime / Rendering/export |
| [Slides AI Plugin](https://github.com/proyecto26/slides-ai-plugin) [![Star](https://img.shields.io/github/stars/proyecto26/slides-ai-plugin?style=flat&logo=github&label=Star)](https://github.com/proyecto26/slides-ai-plugin/stargazers) | Text/ideas / PDF/documents / Web/search | Agent skill | PPT/deck / Web/interactive page | Agent host / Model API / Local runtime / Rendering/export / Templates/assets |
| [slidemason](https://github.com/erickittelson/slidemason) [![Star](https://img.shields.io/github/stars/erickittelson/slidemason?style=flat&logo=github&label=Star)](https://github.com/erickittelson/slidemason/stargazers) | Text/ideas / PDF/documents / Web/search | Open-source app/framework / Agent skill | PPT/deck / SVG/PNG/PDF | Agent host / Local runtime / Rendering/export / Templates/assets |
| [cc-slidev](https://github.com/rhuss/cc-slidev) [![Star](https://img.shields.io/github/stars/rhuss/cc-slidev?style=flat&logo=github&label=Star)](https://github.com/rhuss/cc-slidev/stargazers) | Text/ideas / Code/technical text | Agent skill | PPT/deck / Web/interactive page / SVG/PNG/PDF | Agent host / Local runtime / Rendering/export / Templates/assets |
| [Office-PowerPoint-MCP-Server](https://github.com/GongRzhe/Office-PowerPoint-MCP-Server) [![Star](https://img.shields.io/github/stars/GongRzhe/Office-PowerPoint-MCP-Server?style=flat&logo=github&label=Star)](https://github.com/GongRzhe/Office-PowerPoint-MCP-Server/stargazers) | Text/ideas / PDF/documents / Web/search | MCP server | PPT/deck | MCP client / Local runtime / Rendering/export / System tools |
| [Alai MCP Server](https://github.com/getalai/alai-mcp-server) [![Star](https://img.shields.io/github/stars/getalai/alai-mcp-server?style=flat&logo=github&label=Star)](https://github.com/getalai/alai-mcp-server/stargazers) | Text/ideas / PDF/documents / Web/search | MCP server / Product/SaaS | PPT/deck / SVG/PNG/PDF | MCP client / Browser/account / Rendering/export / Templates/assets |
| [mcp-ppt](https://github.com/ltc6539/mcp-ppt) [![Star](https://img.shields.io/github/stars/ltc6539/mcp-ppt?style=flat&logo=github&label=Star)](https://github.com/ltc6539/mcp-ppt/stargazers) | Text/ideas / PDF/documents / Web/search | MCP server | PPT/deck / SVG/PNG/PDF | MCP client / Local runtime / Rendering/export |
| [pptx-tools](https://github.com/jongalloway/pptx-tools) [![Star](https://img.shields.io/github/stars/jongalloway/pptx-tools?style=flat&logo=github&label=Star)](https://github.com/jongalloway/pptx-tools/stargazers) | Text/ideas / Office docs | MCP server / API/SDK/library | PPT/deck / Structured data/Markdown | MCP client / Local runtime / Rendering/export / System tools / Templates/assets |
| [Marp MCP](https://github.com/masaki39/marp-mcp) [![Star](https://img.shields.io/github/stars/masaki39/marp-mcp?style=flat&logo=github&label=Star)](https://github.com/masaki39/marp-mcp/stargazers) | Text/ideas / DSL/code | MCP server / Agent skill | PPT/deck / Web/interactive page | MCP client / Agent host / Local runtime / Rendering/export / Templates/assets |
| [PptxGenJS-mcp-server](https://github.com/Hrithik-s-Raj/PptxGenJS-mcp-server) [![Star](https://img.shields.io/github/stars/Hrithik-s-Raj/PptxGenJS-mcp-server?style=flat&logo=github&label=Star)](https://github.com/Hrithik-s-Raj/PptxGenJS-mcp-server/stargazers) | Text/ideas / Data/tables | MCP server | PPT/deck / Chart/dashboard | MCP client / Agent host / Local runtime / Rendering/export |
| [md-slides](https://github.com/zl190/md-slides) [![Star](https://img.shields.io/github/stars/zl190/md-slides?style=flat&logo=github&label=Star)](https://github.com/zl190/md-slides/stargazers) | Text/ideas / DSL/code | Agent skill | PPT/deck / Web/interactive page / Architecture/flow diagram | Agent host / Local runtime / Model API / Rendering/export / Templates/assets |
| [deckset-claude-skill](https://github.com/doudou1337/deckset-claude-skill) [![Star](https://img.shields.io/github/stars/doudou1337/deckset-claude-skill?style=flat&logo=github&label=Star)](https://github.com/doudou1337/deckset-claude-skill/stargazers) | Text/ideas / DSL/code | Agent skill | PPT/deck | Agent host / Local runtime / Model API / Rendering/export / Templates/assets |
| [pptx-from-layouts-skill](https://github.com/tristan-mcinnis/pptx-from-layouts-skill) [![Star](https://img.shields.io/github/stars/tristan-mcinnis/pptx-from-layouts-skill?style=flat&logo=github&label=Star)](https://github.com/tristan-mcinnis/pptx-from-layouts-skill/stargazers) | Text/ideas / PDF/documents / Web/search | Agent skill | PPT/deck | Agent host / Local runtime / Rendering/export / Templates/assets |
| [hands-on-deck](https://github.com/EveryInc/hands-on-deck) [![Star](https://img.shields.io/github/stars/EveryInc/hands-on-deck?style=flat&logo=github&label=Star)](https://github.com/EveryInc/hands-on-deck/stargazers) | Text/ideas / PDF/documents / Web/search | Agent skill | PPT/deck | Agent host / Local runtime / Rendering/export |
| [agent-slides](https://github.com/mpuig/agent-slides) [![Star](https://img.shields.io/github/stars/mpuig/agent-slides?style=flat&logo=github&label=Star)](https://github.com/mpuig/agent-slides/stargazers) | Text/ideas / PDF/documents / Web/search | Agent skill | PPT/deck | Agent host / Local runtime / Model API / Rendering/export / Templates/assets |
| [ultimate-ppt-master-skill](https://github.com/kdnsna/ultimate-ppt-master-skill) [![Star](https://img.shields.io/github/stars/kdnsna/ultimate-ppt-master-skill?style=flat&logo=github&label=Star)](https://github.com/kdnsna/ultimate-ppt-master-skill/stargazers) | Text/ideas / PDF/documents / Web/search | Agent skill | PPT/deck | Agent host / Local runtime / Model API / Rendering/export / Templates/assets |
| [codex-ppt-skill](https://github.com/ningzimu/codex-ppt-skill) [![Star](https://img.shields.io/github/stars/ningzimu/codex-ppt-skill?style=flat&logo=github&label=Star)](https://github.com/ningzimu/codex-ppt-skill/stargazers) | Text/ideas / PDF/documents / Web/search | Agent skill | PPT/deck | Agent host / Local runtime / Model API / Rendering/export / Templates/assets |
| [presentation-skills](https://github.com/pamelafox/presentation-skills) [![Star](https://img.shields.io/github/stars/pamelafox/presentation-skills?style=flat&logo=github&label=Star)](https://github.com/pamelafox/presentation-skills/stargazers) | Text/ideas / PDF/documents / Web/search | Skill collection | PPT/deck | Agent host / Local runtime / Rendering/export |
| [anthropics/skills](https://github.com/anthropics/skills) [![Star](https://img.shields.io/github/stars/anthropics/skills?style=flat&logo=github&label=Star)](https://github.com/anthropics/skills/stargazers) | Text/ideas / PDF/documents / Web/search | Skill collection | PPT/deck | Agent host / Local runtime / Document parsing/OCR / Rendering/export |
| [MiniMax-AI/skills](https://github.com/MiniMax-AI/skills) [![Star](https://img.shields.io/github/stars/MiniMax-AI/skills?style=flat&logo=github&label=Star)](https://github.com/MiniMax-AI/skills/stargazers) | Text/ideas / PDF/documents / Web/search | Skill collection | PPT/deck | Agent host / Local runtime / Model API / Rendering/export |
| [daymade/claude-code-skills](https://github.com/daymade/claude-code-skills) [![Star](https://img.shields.io/github/stars/daymade/claude-code-skills?style=flat&logo=github&label=Star)](https://github.com/daymade/claude-code-skills/stargazers) | Text/ideas / PDF/documents / Office docs / DSL/code | Skill collection | PPT/deck / Diagram/Mermaid / SVG/PNG/PDF / Structured data/Markdown | Agent host / Local runtime / Rendering/export / System tools / Document parsing/OCR |
| [Gamma](https://gamma.app/) | Text/ideas / PDF/documents / Web/search | Product/SaaS | PPT/deck | Browser/account / Templates/assets |
| [SlideSpeak](https://slidespeak.co/) | Text/ideas / PDF/documents / Web/search | Product/SaaS | PPT/deck | Browser/account / Document parsing/OCR / Templates/assets |
| [Canva AI Presentations](https://www.canva.com/create/ai-presentations/) | Text/ideas / PDF/documents / Web/search | Product/SaaS | PPT/deck | Browser/account / Templates/assets |
| [Presentations.AI](https://www.presentations.ai/) | Text/ideas / PDF/documents / Web/search | Product/SaaS | PPT/deck | Browser/account / Document parsing/OCR / Templates/assets |
| [Beautiful.ai](https://www.beautiful.ai/presentation-maker) | Text/ideas / PDF/documents / Web/search | Product/SaaS | PPT/deck | Browser/account / Templates/assets |
| [Decktopus](https://www.decktopus.com/) | Text/ideas / PDF/documents / Web/search | Product/SaaS | PPT/deck | Browser/account / Templates/assets |
| [PPT.AI](https://ppt.ai/) | Text/ideas / PDF/documents / Web/search | Product/SaaS | PPT/deck | Browser/account / Document parsing/OCR / Templates/assets |
| [Slidesgo AI Presentation Maker](https://slidesgo.com/ai/presentation-maker) | Text/ideas / PDF/documents / Web/search | Product/SaaS | PPT/deck | Browser/account / Templates/assets |
| [Microsoft Copilot in PowerPoint](https://powerpoint.cloud.microsoft/create/en/ai-presentation-maker/) | Text/ideas / PDF/documents / Web/search | Product/SaaS / Bot/assistant | PPT/deck | Browser/account / System tools / Templates/assets |
| [Adobe Express AI Presentation Maker](https://www.adobe.com/express/create/ai/presentation) | Text/ideas / PDF/documents / Web/search | Product/SaaS | PPT/deck | Browser/account / Templates/assets |

## Supporting and Pre/Post-Processing Tools

This section contains smaller, lower-level, or more specialized tools. They may not cover a full content production workflow by themselves, but they are often key components inside agent workflows.

### PDF, Document Parsing, and Structured Extraction

Pre-processing tools that turn PDFs, papers, Office files, or scans into Markdown, JSON, layout, tables, or OCR results.

| Project | Information source | Tool form | Output artifact | Dependencies |
| --- | --- | --- | --- | --- |
| [MinerU](https://github.com/opendatalab/MinerU) [![Star](https://img.shields.io/github/stars/opendatalab/MinerU?style=flat&logo=github&label=Star)](https://github.com/opendatalab/MinerU/stargazers) | PDF/documents / Office docs / Papers/research | Open-source app/framework | Structured data/Markdown | Local runtime / Document parsing/OCR / GPU/accelerator |
| [Docling](https://github.com/docling-project/docling) [![Star](https://img.shields.io/github/stars/docling-project/docling?style=flat&logo=github&label=Star)](https://github.com/docling-project/docling/stargazers) | PDF/documents / Office docs / Papers/research | Open-source app/framework | Structured data/Markdown | Local runtime / Document parsing/OCR |
| [MarkItDown](https://github.com/microsoft/markitdown) [![Star](https://img.shields.io/github/stars/microsoft/markitdown?style=flat&logo=github&label=Star)](https://github.com/microsoft/markitdown/stargazers) | PDF/documents / Office docs / Web/search results | API/SDK/library | Structured data/Markdown | Local runtime / Document parsing/OCR / Model API |
| [Marker](https://github.com/datalab-to/marker) [![Star](https://img.shields.io/github/stars/datalab-to/marker?style=flat&logo=github&label=Star)](https://github.com/datalab-to/marker/stargazers) | PDF/documents / Office docs / Papers/research | Open-source app/framework | Structured data/Markdown | Local runtime / Document parsing/OCR / GPU/accelerator |
| [Unstructured](https://github.com/Unstructured-IO/unstructured) [![Star](https://img.shields.io/github/stars/Unstructured-IO/unstructured?style=flat&logo=github&label=Star)](https://github.com/Unstructured-IO/unstructured/stargazers) | PDF/documents / Office docs / Papers/research | Open-source app/framework | Structured data/Markdown | Local runtime / Document parsing/OCR |
| [GROBID](https://github.com/grobidOrg/grobid) [![Star](https://img.shields.io/github/stars/grobidOrg/grobid?style=flat&logo=github&label=Star)](https://github.com/grobidOrg/grobid/stargazers) | PDF/documents / Office docs / Papers/research | Open-source app/framework | Structured data/Markdown | Local runtime / System tools / Document parsing/OCR |
| [PaperMage](https://github.com/allenai/papermage) [![Star](https://img.shields.io/github/stars/allenai/papermage?style=flat&logo=github&label=Star)](https://github.com/allenai/papermage/stargazers) | PDF/documents / Office docs / Papers/research | API/SDK/library | Structured data/Markdown | Local runtime / Document parsing/OCR |
| [s2orc-doc2json](https://github.com/allenai/s2orc-doc2json) [![Star](https://img.shields.io/github/stars/allenai/s2orc-doc2json?style=flat&logo=github&label=Star)](https://github.com/allenai/s2orc-doc2json/stargazers) | PDF/documents / Office docs / Papers/research | Open-source app/framework | Structured data/Markdown | Local runtime / Document parsing/OCR |

### Focused Mind-Map Tools

Smaller focused tools for turning documents, web pages, videos, threat intelligence, or text into mind maps.

| Project | Information source | Tool form | Output artifact | Dependencies |
| --- | --- | --- | --- | --- |
| [TI-Mindmap-GPT](https://github.com/format81/TI-Mindmap-GPT) [![Star](https://img.shields.io/github/stars/format81/TI-Mindmap-GPT?style=flat&logo=github&label=Star)](https://github.com/format81/TI-Mindmap-GPT/stargazers) | News/intelligence / Web/search / PDF/documents | Open-source app/framework | Mind map/knowledge map / Long report / Tables/timeline | Local runtime / Model API / Document parsing/OCR / Rendering/export / External search/data |
| [mindmap-generator](https://github.com/Dicklesworthstone/mindmap-generator) [![Star](https://img.shields.io/github/stars/Dicklesworthstone/mindmap-generator?style=flat&logo=github&label=Star)](https://github.com/Dicklesworthstone/mindmap-generator/stargazers) | PDF/documents / Web/search / Knowledge base | Open-source app/framework | Mind map/knowledge map | Local runtime / Model API / Document parsing/OCR / Rendering/export |
| [Mapify](https://mapify.so/) | PDF/documents / Web/search / Knowledge base | Product/SaaS | Mind map/knowledge map | Browser/account / Document parsing/OCR / Templates/assets |

### Diagram, Mermaid, and Rendering Components

Post-processing and rendering tools that help agents generate, validate, or export Mermaid, SVG, PNG, PDF, and diagram artifacts.

| Project | Information source | Tool form | Output artifact | Dependencies |
| --- | --- | --- | --- | --- |
| [Mermaid](https://github.com/mermaid-js/mermaid) [![Star](https://img.shields.io/github/stars/mermaid-js/mermaid?style=flat&logo=github&label=Star)](https://github.com/mermaid-js/mermaid/stargazers) | DSL/code | API/SDK/library | Diagram/Mermaid / SVG/PNG/PDF | Rendering/export |
| [mermaid-js-ai-agent](https://github.com/disler/mermaid-js-ai-agent) [![Star](https://img.shields.io/github/stars/disler/mermaid-js-ai-agent?style=flat&logo=github&label=Star)](https://github.com/disler/mermaid-js-ai-agent/stargazers) | Text/ideas / Code/technical text | Open-source app/framework | Diagram/Mermaid / SVG/PNG/PDF | Local runtime / Model API / Rendering/export |
| [mermaid-skill](https://github.com/Agents365-ai/mermaid-skill) [![Star](https://img.shields.io/github/stars/Agents365-ai/mermaid-skill?style=flat&logo=github&label=Star)](https://github.com/Agents365-ai/mermaid-skill/stargazers) | Text/ideas / Code/technical text | Agent skill | Diagram/Mermaid / SVG/PNG/PDF | Agent host / Local runtime / Model API / Rendering/export |
| [Pretty-mermaid-skills](https://github.com/imxv/Pretty-mermaid-skills) [![Star](https://img.shields.io/github/stars/imxv/Pretty-mermaid-skills?style=flat&logo=github&label=Star)](https://github.com/imxv/Pretty-mermaid-skills/stargazers) | Text/ideas / Code/technical text | Agent skill | Diagram/Mermaid / SVG/PNG/PDF | Agent host / Local runtime / Rendering/export |
| [agent-toolkit mermaid diagrams](https://github.com/softaworks/agent-toolkit) [![Star](https://img.shields.io/github/stars/softaworks/agent-toolkit?style=flat&logo=github&label=Star)](https://github.com/softaworks/agent-toolkit/stargazers) | Text/ideas / Code/technical text | Skill collection | Diagram/Mermaid / SVG/PNG/PDF | Agent host / Model API / Rendering/export |
| [beautiful-mermaid](https://github.com/lukilabs/beautiful-mermaid) [![Star](https://img.shields.io/github/stars/lukilabs/beautiful-mermaid?style=flat&logo=github&label=Star)](https://github.com/lukilabs/beautiful-mermaid/stargazers) | DSL/code | API/SDK/library | Diagram/Mermaid / SVG/PNG/PDF | Local runtime / Rendering/export |
| [LLMermaid](https://github.com/fladdict/llmermaid) [![Star](https://img.shields.io/github/stars/fladdict/llmermaid?style=flat&logo=github&label=Star)](https://github.com/fladdict/llmermaid/stargazers) | Text/ideas / Code/technical text | Research prototype | Diagram/Mermaid / SVG/PNG/PDF | Local runtime / Model API / Rendering/export |
| [GenAIScript](https://github.com/microsoft/genaiscript) [![Star](https://img.shields.io/github/stars/microsoft/genaiscript?style=flat&logo=github&label=Star)](https://github.com/microsoft/genaiscript/stargazers) | PDF/documents / Data/tables / Codebase / DSL/code | API/SDK/library | Diagram/Mermaid / Structured data/Markdown | Local runtime / Model API / Parsing/OCR / Rendering/export |
| [mcp-mermaid](https://github.com/hustcc/mcp-mermaid) [![Star](https://img.shields.io/github/stars/hustcc/mcp-mermaid?style=flat&logo=github&label=Star)](https://github.com/hustcc/mcp-mermaid/stargazers) | Text/ideas / Code/technical text / DSL/code | MCP server | Diagram/Mermaid / SVG/PNG/PDF | MCP client / Local runtime / Rendering/export |
| [mcp-media-forge](https://github.com/PavelGuzenfeld/mcp-media-forge) [![Star](https://img.shields.io/github/stars/PavelGuzenfeld/mcp-media-forge?style=flat&logo=github&label=Star)](https://github.com/PavelGuzenfeld/mcp-media-forge/stargazers) | Text/ideas / Data/tables / DSL/code | MCP server | Diagram/Mermaid / Architecture/flow diagram / Chart/dashboard / Web/interactive page / PPT/deck / SVG/PNG/PDF | MCP client / Local runtime / Rendering/export / System tools |
| [UML-MCP](https://github.com/antoinebou12/uml-mcp) [![Star](https://img.shields.io/github/stars/antoinebou12/uml-mcp?style=flat&logo=github&label=Star)](https://github.com/antoinebou12/uml-mcp/stargazers) | Text/ideas / Code/technical text / DSL/code | MCP server | Flow diagram / Diagram/Mermaid / SVG/PNG/PDF | MCP client / Local runtime / Rendering/export |
| [Kroki-MCP](https://github.com/utain/kroki-mcp) [![Star](https://img.shields.io/github/stars/utain/kroki-mcp?style=flat&logo=github&label=Star)](https://github.com/utain/kroki-mcp/stargazers) | Text/ideas / Code/technical text / DSL/code | MCP server | Diagram/Mermaid / Architecture/flow diagram / SVG/PNG/PDF | MCP client / Local runtime / Rendering/export |
| [AntV Infographic](https://github.com/antvis/infographic) [![Star](https://img.shields.io/github/stars/antvis/infographic?style=flat&logo=github&label=Star)](https://github.com/antvis/infographic/stargazers) | Text/ideas / Data/tables / DSL/code | API/SDK/library | Infographic/visual report / Chart/rendering output / SVG/PNG/PDF | Local runtime / Rendering/export / Templates/assets |
| [Markdown Viewer Agent Skills](https://github.com/markdown-viewer/skills) [![Star](https://img.shields.io/github/stars/markdown-viewer/skills?style=flat&logo=github&label=Star)](https://github.com/markdown-viewer/skills/stargazers) | Text/ideas / Data/tables / Code/technical text | Skill collection | Flow diagram / Chart/dashboard / Infographic/visual report / Mind map/knowledge map / Rendered chart | Agent host / Local runtime / Rendering/export / Templates/assets |
| [Preview Skills](https://github.com/veelenga/preview-skills) [![Star](https://img.shields.io/github/stars/veelenga/preview-skills?style=flat&logo=github&label=Star)](https://github.com/veelenga/preview-skills/stargazers) | Text/ideas / Data/tables / DSL/code / Code/technical text | Skill collection | Web/interactive page / Diagram/Mermaid / Structured data/Markdown | Agent host / Local runtime / Rendering/export |
| [AgentFigureGallery](https://github.com/Dsadd4/AgentFigureGallery) [![Star](https://img.shields.io/github/stars/Dsadd4/AgentFigureGallery?style=flat&logo=github&label=Star)](https://github.com/Dsadd4/AgentFigureGallery/stargazers) | Papers/research / Data/tables | Agent skill / Dataset/benchmark | Rendered chart / SVG/PNG/PDF | Agent host / Local runtime / External data / Rendering/export |

## How To Choose A Tool

### Information Source

| Information source | Meaning |
| --- | --- |
| Papers/research | Papers, arXiv links, academic PDFs, research topics, and experimental results. |
| PDF/documents | PDFs, long documents, manuals, reports, and exported documents. |
| Office docs | Word, PowerPoint, Excel, and other office files. |
| Web/search | Web pages, URLs, search results, extracted page text, and cited sources. |
| News/intelligence | News streams, market intelligence, threat intelligence, and industry updates. |
| Codebase | GitHub repositories, local code, diffs, dependencies, and symbols. |
| Data/tables | CSV, Excel, metrics, time series, and business data. |
| Database | SQL/BI sources, business databases, vector stores, or external data APIs. |
| Knowledge base | Notion, Google Drive, Slack, meeting notes, and personal/team documents. |
| Text/ideas | Prompts, outlines, drafts, whiteboard ideas, and notes. |
| Code/technical text | Code snippets, API descriptions, and system-design text. |
| DSL/code | Mermaid, diagram DSLs, configuration, and executable drawing code. |
| Citation graph | Paper citation relations, related-paper networks, and literature graphs. |
| Any/multi-source | General tools that work across multiple source types. |

### Tool Form

| Tool form | Meaning |
| --- | --- |
| Product/SaaS | Hosted website or commercial product, usually browser/account based. |
| Open-source app/framework | Runnable or deployable application/framework. |
| Agent skill | Workflow package for Claude Code, Codex, Cursor, Gemini CLI, or similar agents. |
| Skill collection | Repository or suite containing multiple agent skills. |
| MCP server | Model Context Protocol server exposing files, slides, code, or data capabilities to agents. |
| API/SDK/library | Parser, renderer, generator, or data interface called by other tools. |
| Bot/assistant | Chat/search assistant, browser extension, or collaboration assistant. |
| Research prototype/dataset | Paper, benchmark, dataset, or research code. |
| Awesome/index | Directory for discovering tools, papers, and skills. |

### Output Artifact

| Output artifact | Meaning |
| --- | --- |
| PPT/deck | PPTX, slides, decks, templates, and presentation masters. |
| Long report | Cited research reports, market reports, and analytical documents. |
| Briefing/report | Summaries, briefings, study guides, and Q&A material. |
| Web/interactive page | HTML, interactive tutorials, explainers, and shareable pages. |
| Graphical abstract/infographic | Graphical abstracts, infographics, posters, and scientific schematics. |
| Infographic/visual report | Business infographics, visual reports, and branded summaries. |
| Architecture/flow diagram | Mermaid, flowcharts, sequence diagrams, system diagrams, and whiteboards. |
| Whiteboard/mind map | Whiteboards, freeform canvases, and divergent visual maps. |
| Mind map/knowledge map | Mind maps, concept maps, and knowledge networks. |
| Literature/knowledge map | Literature maps, related-paper graphs, and research knowledge maps. |
| Chart/dashboard | Charts, BI dashboards, KPIs, and interactive data views. |
| Tables/timeline | Evidence tables, IOC tables, event timelines, and comparison tables. |
| Code map/repo wiki | Repository maps, repo wikis, dependency graphs, and code knowledge graphs. |
| Diagram/Mermaid | Mermaid, diagrams-as-code, and verifiable diagram text. |
| SVG/PNG/PDF | Rendered images, vector graphics, or exported files. |
| Video/audio | Paper videos, narrated explainers, and audio briefings. |
| Structured data/Markdown | Markdown, JSON, layout, tables, and OCR outputs for downstream generation. |
| Evidence table | Paper screening tables, evidence matrices, and citation tables. |
| Cited answer | Source-grounded answers or search-result synthesis. |
| Q&A/study material | Notebook Q&A, quizzes, and study guides. |
| Tool index | Awesome lists, tool directories, and paper lists. |
| Rendered chart | Visual output from renderers or chart components. |

### Dependency Types

`Dependencies` describe what a tool needs to run. They are separate from the source, tool, and output tags: those tags answer “where does the information come from, what is the tool, and what does it produce”; dependency tags answer “what does it need”.

| Dependency | Meaning | Common examples |
| --- | --- | --- |
| Browser/account | Browser and account based; usually no local installation. | Google account, Canva account, SaaS plan |
| Agent host | Needs an agent environment to execute a skill/workflow. | Claude Code, Codex, Cursor, Gemini CLI, OpenCode |
| Model API | Calls text, vision, or image model APIs. | OpenAI, Anthropic, Gemini, OpenRouter, Azure OpenAI, Replicate |
| Local runtime | Needs local runtimes and package managers. | Python, Node.js, Go, Rust, Java, Conda, uv, pnpm |
| System tools | Depends on local binaries or office software. | Docker, LibreOffice, Microsoft PowerPoint, Pandoc, LaTeX, Chrome |
| Document parsing/OCR | Needs PDF parsing, OCR, layout recovery, or document structure extraction. | MinerU, Docling, Marker, GROBID, Tesseract, layout models |
| Rendering/export | Renders intermediate formats into SVG, PNG, PDF, PPTX, or web pages. | Mermaid, Kroki, Playwright, python-pptx, pptxgenjs, SVG renderer |
| External search/data | Needs web search, paper databases, citation networks, or data APIs. | arXiv, Semantic Scholar, OpenAlex, Google Scholar, web search |
| GPU/accelerator | Local model inference, OCR, vision, or image generation may need acceleration. | CUDA, ROCm, Apple Metal/MPS, cloud GPU |
| MCP client | Needs a client that can connect to MCP servers. | Claude Desktop, Cursor, Codex, Cline, Continue |
| Code analysis | Parses files, symbols, dependencies, and repository structure. | tree-sitter, language servers, ripgrep, ctags, Git |
| Storage/index | Persists state, vector indexes, or graphs. | SQLite, Postgres, Chroma, Qdrant, Neo4j, file index |
| Templates/assets | Needs templates, brand assets, or design resources for high-quality output. | PPTX template, slide master, brand kit, icons, image assets |

Star badges are shown next to GitHub project names where available. Non-GitHub products do not show a star badge.

## Find More Tools

These are awesome lists, paper lists, skill registries, and MCP directories. They are not single production tools, but they are useful for expanding this repository.

| Project | Coverage | Tool form | Useful for finding |
| --- | --- | --- | --- |
| [awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) [![Star](https://img.shields.io/github/stars/VoltAgent/awesome-agent-skills?style=flat&logo=github&label=Star)](https://github.com/VoltAgent/awesome-agent-skills/stargazers) | Any/multi-source | Awesome/index | Large agent skill directory. |
| [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) [![Star](https://img.shields.io/github/stars/ComposioHQ/awesome-claude-skills?style=flat&logo=github&label=Star)](https://github.com/ComposioHQ/awesome-claude-skills/stargazers) | Any/multi-source | Awesome/index | Curated Claude Skills directory with visualization, data, document, automation, and MCP discovery. |
| [awesome-llm-skills](https://github.com/Prat011/awesome-llm-skills) [![Star](https://img.shields.io/github/stars/Prat011/awesome-llm-skills?style=flat&logo=github&label=Star)](https://github.com/Prat011/awesome-llm-skills/stargazers) | Any/multi-source | Awesome/index | Cross-agent LLM skills list. |
| [Awesome-Powerpoint-AI-Agents](https://github.com/ishandutta2007/Awesome-Powerpoint-AI-Agents) [![Star](https://img.shields.io/github/stars/ishandutta2007/Awesome-Powerpoint-AI-Agents?style=flat&logo=github&label=Star)](https://github.com/ishandutta2007/Awesome-Powerpoint-AI-Agents/stargazers) | Any/multi-source | Awesome/index | Directly similar PowerPoint AI agents ecosystem list. |
| [AI-Presentation-Builders-Index](https://github.com/danielrosehill/AI-Presentation-Builders-Index) [![Star](https://img.shields.io/github/stars/danielrosehill/AI-Presentation-Builders-Index?style=flat&logo=github&label=Star)](https://github.com/danielrosehill/AI-Presentation-Builders-Index/stargazers) | Any/multi-source | Awesome/index | Open and agent-driven presentation builders, skills, MCP servers, renderers, and parsers. |
| [awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) [![Star](https://img.shields.io/github/stars/punkpeye/awesome-mcp-servers?style=flat&logo=github&label=Star)](https://github.com/punkpeye/awesome-mcp-servers/stargazers) | Any/multi-source | Awesome/index | Large MCP server directory. |
| [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) [![Star](https://img.shields.io/github/stars/hesreallyhim/awesome-claude-code?style=flat&logo=github&label=Star)](https://github.com/hesreallyhim/awesome-claude-code/stargazers) | Any/multi-source | Awesome/index | Claude Code skill, hook, slash-command, app, and plugin index. |
| [awesome_ai_agents](https://github.com/jim-schwoebel/awesome_ai_agents) [![Star](https://img.shields.io/github/stars/jim-schwoebel/awesome_ai_agents?style=flat&logo=github&label=Star)](https://github.com/jim-schwoebel/awesome_ai_agents/stargazers) | Any/multi-source | Awesome/index | Broad AI agent resources. |
| [awesome-ai-tools](https://github.com/mahseema/awesome-ai-tools) [![Star](https://img.shields.io/github/stars/mahseema/awesome-ai-tools?style=flat&logo=github&label=Star)](https://github.com/mahseema/awesome-ai-tools/stargazers) | Any/multi-source | Awesome/index | Broad AI tools list. |
| [awesome-ai-auto-research](https://github.com/worldbench/awesome-ai-auto-research) [![Star](https://img.shields.io/github/stars/worldbench/awesome-ai-auto-research?style=flat&logo=github&label=Star)](https://github.com/worldbench/awesome-ai-auto-research/stargazers) | Any/multi-source | Awesome/index | AI auto-research landscape, including paper-to-slides, posters, videos, websites, and social outputs. |
| [LLM-Visualization-Paper-List](https://github.com/zengxingchen/LLM-Visualization-Paper-List) [![Star](https://img.shields.io/github/stars/zengxingchen/LLM-Visualization-Paper-List?style=flat&logo=github&label=Star)](https://github.com/zengxingchen/LLM-Visualization-Paper-List/stargazers) | Any/multi-source | Awesome/index | Paper list for visualization meets LLM. |
| [awesome-ai-for-science](https://github.com/ai-boost/awesome-ai-for-science) [![Star](https://img.shields.io/github/stars/ai-boost/awesome-ai-for-science?style=flat&logo=github&label=Star)](https://github.com/ai-boost/awesome-ai-for-science/stargazers) | Any/multi-source | Awesome/index | Broad AI-for-science tool, paper, dataset, and framework index. |
| [AlterLab-Academic-Skills](https://github.com/AlterLab-IEU/AlterLab-Academic-Skills) [![Star](https://img.shields.io/github/stars/AlterLab-IEU/AlterLab-Academic-Skills?style=flat&logo=github&label=Star)](https://github.com/AlterLab-IEU/AlterLab-Academic-Skills/stargazers) | Any/multi-source | Skill collection | Evaluated academic agent skills including visualization, reports, writing, and research pipelines. |
| [SenseNova-Skills](https://github.com/OpenSenseNova/SenseNova-Skills) [![Star](https://img.shields.io/github/stars/OpenSenseNova/SenseNova-Skills?style=flat&logo=github&label=Star)](https://github.com/OpenSenseNova/SenseNova-Skills/stargazers) | Any/multi-source | Skill collection | Office and productivity skills covering image generation, visualization, slide decks, Excel analysis, and deep research. |
| [TransformingScienceLLMs](https://github.com/NL2G/TransformingScienceLLMs) [![Star](https://img.shields.io/github/stars/NL2G/TransformingScienceLLMs?style=flat&logo=github&label=Star)](https://github.com/NL2G/TransformingScienceLLMs/stargazers) | Any/multi-source | Awesome/index | Collection of papers, AI models, and tools for LLM-assisted scientific work. |

## Data

The structured catalog lives in [data/catalog.yml](data/catalog.yml). It includes information-source tags, tool-form tags, output-artifact tags, dependency tags, category, GitHub star snapshots, license, update date, and short notes.

The research cache lives in [data/tool-research.yml](data/tool-research.yml). It stores official examples, docs, demos, templates, papers, videos, effect images/GIFs, and other discovery links; it is not rendered directly into the README.

The search trail and query strategy live in [docs/search-log.md](docs/search-log.md).

## Contributing

Contributions are welcome. For a new entry, please include:

- Project name and URL.
- Information source, for example `Papers/research`, `Web/search`, `News/intelligence`, `PDF/documents`, `Codebase`, or `Data/tables`.
- Tool form, for example `Product/SaaS`, `Open-source app/framework`, `Agent skill`, `MCP server`, `API/SDK/library`, or `Bot/assistant`.
- Output artifact, for example `PPT/deck`, `Long report`, `Web/interactive page`, `Mind map/knowledge map`, or `Chart/dashboard`.
- Dependency types from the table above, for example `Model API`, `Rendering/export`, or `Templates/assets`.
- One sentence explaining why the project belongs here.

Prefer tools that produce artifacts people can inspect, edit, cite, present, or use to understand a complex system.
