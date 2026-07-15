![AI visualization banner](assets/banner.png)

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![Catalog](https://img.shields.io/badge/catalog-303_items-blue)](data/catalog.yml)
[![Last researched](https://img.shields.io/badge/last_researched-2026--07--16-brightgreen)](docs/search-log.md)

[English](README.md) | 简体中文 | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [Español](README.es.md) | [Türkçe](README.tr.md) | [Русский](README.ru.md)

> [!NOTE]
> 本项目由 RenaissanceMind Agent 辅助自动更新。工具信息、Star、许可证和服务条款可能会变化，使用前请核实对应官网或仓库。

一个关于 AI 可视化与内容呈现的精选目录：收集使用 LLM 或 Agent，把论文、新闻、网页、文档、代码库、数据集和知识集合转成“给人看的”视觉产物的工具、网站、开源项目、Agent Skill 和 MCP Server。

这个列表按**信息来源**、**工具形态**、**产出物形式**和**依赖类型**标注。PPT 只是产出物之一；同一个工具也可能同时产出报告、网页、图表、思维导图或代码地图。

## ✨ 推荐使用方式

| 使用者 | 建议 |
| --- | --- |
| 🤖 For Agent | 安装/启用 [`ai-visualization-advisor`](skills/ai-visualization-advisor/SKILL.md) skill，让 Agent 根据信息源、目标读者和使用限制，建议合适的信息呈现形式与工具；它会优先读取 [`data/catalog.yml`](data/catalog.yml) 和 [`data/tool-research.yml`](data/tool-research.yml)。 |
| 👤 For Human | 查阅当前 README，或访问 [awesome-ai-visualization.renaissancemind.ai](https://awesome-ai-visualization.renaissancemind.ai/)（Recommended）浏览和筛选工具。 |

## 目录

- [主工作流工具](#主工作流工具)
- [辅助、前后处理与小工具](#辅助前后处理与小工具)
- [怎么筛选工具](#怎么筛选工具)
- [继续发现更多工具](#继续发现更多工具)
- [数据](#数据)
- [贡献](#贡献)

## 主工作流工具

这一部分放“从信息来源直接生成面向人阅读/展示的产物”的工具。每行都同时标注三条轴：信息来源、工具形态、产出物形式。

### 论文、科研资料与学术检索

从论文、科研主题和文献库出发，生成图形摘要、报告、课程、文献地图或学术传播产物。

| 项目 | 信息来源 | 工具形态 | 产出物形式 | 依赖类型 |
| --- | --- | --- | --- | --- |
| [Paper2Any](https://github.com/OpenDCAI/Paper2Any) [![Star](https://img.shields.io/github/stars/OpenDCAI/Paper2Any?style=flat&logo=github&label=Star)](https://github.com/OpenDCAI/Paper2Any/stargazers) | 论文/科研资料 | 开源应用/框架 | 图形摘要/信息图 / PPT/演示文稿 / 网页/交互页面 | 本地语言环境 / 模型 API / 文档解析/OCR / 渲染/导出 / GPU/加速器 / 模板/素材 |
| [paper-2-web](https://github.com/davila7/claude-code-templates/blob/main/cli-tool/components/skills/scientific/paper-2-web/SKILL.md?plain=1) [![Star](https://img.shields.io/github/stars/davila7/claude-code-templates?style=flat&logo=github&label=Star)](https://github.com/davila7/claude-code-templates/stargazers) | 论文/科研资料 | Agent Skill | 图形摘要/信息图 / PPT/演示文稿 / 网页/交互页面 | Agent 宿主 / 模型 API / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [paper-to-course](https://github.com/ZeroxZhang/paper-to-course) [![Star](https://img.shields.io/github/stars/ZeroxZhang/paper-to-course?style=flat&logo=github&label=Star)](https://github.com/ZeroxZhang/paper-to-course/stargazers) | 论文/科研资料 | Agent Skill | 网页/交互页面 / 问答/学习材料 | Agent 宿主 / 模型 API / 本地语言环境 / 渲染/导出 |
| [Auto-Research-In-Sleep](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep) [![Star](https://img.shields.io/github/stars/wanshuiyin/Auto-claude-code-research-in-sleep?style=flat&logo=github&label=Star)](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep/stargazers) | 论文/科研资料 | Skill 集合 | 报告/长文档 / 证据表 | Agent 宿主 / 模型 API / 本地语言环境 / 系统工具 / 渲染/导出 / 模板/素材 |
| [scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) [![Star](https://img.shields.io/github/stars/K-Dense-AI/scientific-agent-skills?style=flat&logo=github&label=Star)](https://github.com/K-Dense-AI/scientific-agent-skills/stargazers) | 论文/科研资料 | Skill 集合 | 图形摘要/信息图 / PPT/演示文稿 / 网页/交互页面 | Agent 宿主 / 模型 API / 外部检索/数据源 / 渲染/导出 |
| [claude-scientific-writer](https://github.com/K-Dense-AI/claude-scientific-writer) [![Star](https://img.shields.io/github/stars/K-Dense-AI/claude-scientific-writer?style=flat&logo=github&label=Star)](https://github.com/K-Dense-AI/claude-scientific-writer/stargazers) | 论文/科研资料 | Agent Skill | 报告/长文档 / 证据表 | Agent 宿主 / 模型 API / 外部检索/数据源 / 模板/素材 |
| [SciGA](https://github.com/IyatomiLab/SciGA) [![Star](https://img.shields.io/github/stars/IyatomiLab/SciGA?style=flat&logo=github&label=Star)](https://github.com/IyatomiLab/SciGA/stargazers) | 论文/科研资料 | 数据集/评测 | 图形摘要/信息图 / PPT/演示文稿 / 网页/交互页面 | 本地语言环境 / 文档解析/OCR / GPU/加速器 |
| [Academic Figures](https://github.com/sai-tv/academic-figures) [![Star](https://img.shields.io/github/stars/sai-tv/academic-figures?style=flat&logo=github&label=Star)](https://github.com/sai-tv/academic-figures/stargazers) | 论文/科研资料 / 文本/想法 | Agent Skill | 图形摘要/信息图 / SVG/PNG/PDF | Agent 宿主 / 模型 API / 渲染/导出 / 模板/素材 |
| [PaperBanana](https://github.com/dwzhu-pku/PaperBanana) [![Star](https://img.shields.io/github/stars/dwzhu-pku/PaperBanana?style=flat&logo=github&label=Star)](https://github.com/dwzhu-pku/PaperBanana/stargazers) | 论文/科研资料 / 文本/想法 | 开源应用/框架 | 图形摘要/信息图 / SVG/PNG/PDF | 本地语言环境 / 模型 API / 文档解析/OCR / 外部检索/数据源 / 渲染/导出 / 模板/素材 |
| [PaperBanana Skills](https://github.com/PlutoLei/paperbanana-skill) [![Star](https://img.shields.io/github/stars/PlutoLei/paperbanana-skill?style=flat&logo=github&label=Star)](https://github.com/PlutoLei/paperbanana-skill/stargazers) | 论文/科研资料 / PDF/文档 / 数据/表格 / 文本/想法 | Agent Skill | 图形摘要/信息图 / PPT/演示文稿 / SVG/PNG/PDF | Agent 宿主 / 模型 API / 本地语言环境 / 文档解析/OCR / 外部检索/数据源 / 渲染/导出 / 模板/素材 |
| [academic-slides-skill](https://github.com/Rebeccca2000/academic-slides-skill) [![Star](https://img.shields.io/github/stars/Rebeccca2000/academic-slides-skill?style=flat&logo=github&label=Star)](https://github.com/Rebeccca2000/academic-slides-skill/stargazers) | 论文/科研资料 / PDF/文档 / 文本/想法 | Agent Skill | PPT/演示文稿 / 网页/交互页面 / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [academic-pptx-skill](https://github.com/Gabberflast/academic-pptx-skill) [![Star](https://img.shields.io/github/stars/Gabberflast/academic-pptx-skill?style=flat&logo=github&label=Star)](https://github.com/Gabberflast/academic-pptx-skill/stargazers) | 论文/科研资料 / PDF/文档 / 文本/想法 | Agent Skill | PPT/演示文稿 / 报告/简报 | Agent 宿主 / 模型 API / 渲染/导出 / 模板/素材 |
| [PaperToSlides](https://github.com/jxtse/PaperToSlides) [![Star](https://img.shields.io/github/stars/jxtse/PaperToSlides?style=flat&logo=github&label=Star)](https://github.com/jxtse/PaperToSlides/stargazers) | 论文/科研资料 / PDF/文档 | 开源应用/框架 | PPT/演示文稿 | 本地语言环境 / 模型 API / 文档解析/OCR / 渲染/导出 / GPU/加速器 |
| [Paper2Slides](https://github.com/pchi123/Paper2Slides) [![Star](https://img.shields.io/github/stars/pchi123/Paper2Slides?style=flat&logo=github&label=Star)](https://github.com/pchi123/Paper2Slides/stargazers) | Papers/research | Open-source app/framework | Graphical abstract/infographic / PPT/deck | Local runtime / Document parsing/OCR / Rendering/export / Templates/assets |
| [AI-Researcher](https://github.com/HKUDS/AI-Researcher) [![Star](https://img.shields.io/github/stars/HKUDS/AI-Researcher?style=flat&logo=github&label=Star)](https://github.com/HKUDS/AI-Researcher/stargazers) | 论文/科研资料 | 研究原型 | 报告/长文档 / 证据表 | 本地语言环境 / 模型 API / 外部检索/数据源 / GPU/加速器 |
| [Elicit](https://elicit.com/) | 论文/科研资料 | 产品/SaaS | 报告/简报 / 证据表 | 浏览器/账号 / 外部检索/数据源 |
| [Paperguide](https://paperguide.ai/) | 论文/科研资料 | 产品/SaaS | 报告/简报 / 证据表 | 浏览器/账号 / 外部检索/数据源 |
| [SciSpace Infographic Maker](https://scispace.com/agents/infographic-maker-hbcwetac) | 论文/科研资料 | 产品/SaaS | 图形摘要/信息图 / PPT/演示文稿 / 网页/交互页面 | 浏览器/账号 / 模板/素材 |
| [Grabstract](https://grabstract.io/graphical-abstracts) | 论文/科研资料 | 产品/SaaS | 图形摘要/信息图 / PPT/演示文稿 / 网页/交互页面 | 浏览器/账号 / 模板/素材 |
| [Open Knowledge Maps](https://openknowledgemaps.org/) | 论文/科研资料 / 引用网络 | 产品/SaaS | 文献地图/知识地图 | 浏览器/账号 / 外部检索/数据源 |
| [Connected Papers](https://www.connectedpapers.com/) | 论文/科研资料 / 引用网络 | 产品/SaaS | 文献地图/知识地图 | 浏览器/账号 / 外部检索/数据源 |
| [ResearchRabbit](https://www.researchrabbit.ai/) | 论文/科研资料 / 引用网络 | 产品/SaaS | 文献地图/知识地图 | 浏览器/账号 / 外部检索/数据源 |
| [Litmaps](https://www.litmaps.com/) | 论文/科研资料 / 引用网络 | 产品/SaaS | 文献地图/知识地图 | 浏览器/账号 / 外部检索/数据源 |
| [Consensus](https://consensus.app/) | 论文/科研资料 | 产品/SaaS | 报告/简报 / 证据表 | 浏览器/账号 / 外部检索/数据源 |

### 网页、新闻、资讯与行业情报

从网页、搜索结果、新闻流、市场数据或威胁情报出发，生成带来源的报告、仪表盘和知识图。

| 项目 | 信息来源 | 工具形态 | 产出物形式 | 依赖类型 |
| --- | --- | --- | --- | --- |
| [GPT Researcher](https://github.com/assafelovic/gpt-researcher) [![Star](https://img.shields.io/github/stars/assafelovic/gpt-researcher?style=flat&logo=github&label=Star)](https://github.com/assafelovic/gpt-researcher/stargazers) | 网页/搜索结果 / 新闻/资讯 | 开源应用/框架 | 报告/长文档 / 引用答案 | 本地语言环境 / 模型 API / 外部检索/数据源 / 存储/索引 |
| [STORM](https://github.com/stanford-oval/storm) [![Star](https://img.shields.io/github/stars/stanford-oval/storm?style=flat&logo=github&label=Star)](https://github.com/stanford-oval/storm/stargazers) | 网页/搜索结果 / 新闻/资讯 | 开源应用/框架 | 报告/长文档 / 引用答案 | 本地语言环境 / 模型 API / 外部检索/数据源 / 存储/索引 |
| [Scira](https://github.com/zaidmukaddam/scira) [![Star](https://img.shields.io/github/stars/zaidmukaddam/scira?style=flat&logo=github&label=Star)](https://github.com/zaidmukaddam/scira/stargazers) | 网页/搜索结果 / 新闻/资讯 | 开源应用/框架 / Bot/助手 | 报告/长文档 / 引用答案 | 本地语言环境 / 模型 API / 外部检索/数据源 / 存储/索引 |
| [Vane](https://github.com/ItzCrazyKns/Vane) [![Star](https://img.shields.io/github/stars/ItzCrazyKns/Vane?style=flat&logo=github&label=Star)](https://github.com/ItzCrazyKns/Vane/stargazers) | 网页/搜索结果 / 新闻/资讯 | 开源应用/框架 / Bot/助手 | 报告/长文档 / 引用答案 | 本地语言环境 / 模型 API / 外部检索/数据源 / 存储/索引 |
| [FinRobot](https://github.com/AI4Finance-Foundation/FinRobot) [![Star](https://img.shields.io/github/stars/AI4Finance-Foundation/FinRobot?style=flat&logo=github&label=Star)](https://github.com/AI4Finance-Foundation/FinRobot/stargazers) | 新闻/资讯 / 数据/表格 / 网页/搜索结果 | 开源应用/框架 | 报告/长文档 / 图表/仪表盘 | 本地语言环境 / 模型 API / 外部检索/数据源 / 渲染/导出 |
| [Market-Intelligence-Agent](https://github.com/vikas-kashyap97/Market-Intelligence-Agent) [![Star](https://img.shields.io/github/stars/vikas-kashyap97/Market-Intelligence-Agent?style=flat&logo=github&label=Star)](https://github.com/vikas-kashyap97/Market-Intelligence-Agent/stargazers) | 新闻/资讯 / 数据/表格 / 网页/搜索结果 | 开源应用/框架 | 图表/仪表盘 / 报告/简报 | 本地语言环境 / 模型 API / 外部检索/数据源 / 渲染/导出 / 存储/索引 |
| [World Monitor](https://github.com/FutureSpeakAI/agent-fridays-global-intelligence-monitor) [![Star](https://img.shields.io/github/stars/FutureSpeakAI/agent-fridays-global-intelligence-monitor?style=flat&logo=github&label=Star)](https://github.com/FutureSpeakAI/agent-fridays-global-intelligence-monitor/stargazers) | 新闻/资讯 / 网页/搜索结果 | 开源应用/框架 | 图表/仪表盘 / 报告/简报 | 本地语言环境 / 模型 API / 外部检索/数据源 / 渲染/导出 / 存储/索引 |
| [OSSInsight](https://github.com/pingcap/ossinsight) [![Star](https://img.shields.io/github/stars/pingcap/ossinsight?style=flat&logo=github&label=Star)](https://github.com/pingcap/ossinsight/stargazers) | 代码库 / 数据/表格 / 网页/搜索结果 | 开源应用/框架 / 产品/SaaS | 图表/仪表盘 / 报告/简报 | 浏览器/账号 / 外部检索/数据源 / 渲染/导出 / 存储/索引 |

### 文档、PDF 与知识库

从 PDF、Office 文档、网页、个人资料库或团队知识库出发，生成简报、问答、学习材料和知识地图。

| 项目 | 信息来源 | 工具形态 | 产出物形式 | 依赖类型 |
| --- | --- | --- | --- | --- |
| [notex](https://github.com/smallnest/notex) [![Star](https://img.shields.io/github/stars/smallnest/notex?style=flat&logo=github&label=Star)](https://github.com/smallnest/notex/stargazers) | PDF/文档 / 网页/搜索结果 / 知识库/个人资料 | 开源应用/框架 | 报告/简报 / 思维导图/知识地图 / 问答/学习材料 | 本地语言环境 / 模型 API / 文档解析/OCR / 渲染/导出 / 存储/索引 |
| [Open Notebook](https://github.com/lfnovo/open-notebook) [![Star](https://img.shields.io/github/stars/lfnovo/open-notebook?style=flat&logo=github&label=Star)](https://github.com/lfnovo/open-notebook/stargazers) | PDF/文档 / 网页/搜索结果 / 知识库/个人资料 | 开源应用/框架 | 报告/简报 / 思维导图/知识地图 / 问答/学习材料 | 本地语言环境 / 模型 API / 文档解析/OCR / 存储/索引 |
| [SurfSense](https://github.com/MODSetter/SurfSense) [![Star](https://img.shields.io/github/stars/MODSetter/SurfSense?style=flat&logo=github&label=Star)](https://github.com/MODSetter/SurfSense/stargazers) | PDF/文档 / 网页/搜索结果 / 知识库/个人资料 | 开源应用/框架 | 报告/简报 / 思维导图/知识地图 / 问答/学习材料 | 本地语言环境 / 模型 API / 外部检索/数据源 / 存储/索引 |
| [NotebookLM](https://notebooklm.google/) | PDF/文档 / 网页/搜索结果 / 知识库/个人资料 | 产品/SaaS / Bot/助手 | 报告/简报 / 思维导图/知识地图 / 问答/学习材料 | 浏览器/账号 |
| [NotebookLM AI Plugin](https://github.com/proyecto26/notebooklm-ai-plugin) [![Star](https://img.shields.io/github/stars/proyecto26/notebooklm-ai-plugin?style=flat&logo=github&label=Star)](https://github.com/proyecto26/notebooklm-ai-plugin/stargazers) | PDF/文档 / 网页/搜索结果 / 知识库/个人资料 / 任意/多源 | Agent Skill / Bot/助手 | PPT/演示文稿 / 视频/音频 / 思维导图/知识地图 / 信息图/视觉报告 / 报告/简报 / 表格/时间线 / 问答/学习材料 | Agent 宿主 / 浏览器/账号 / 本地语言环境 / 文档解析/OCR / 外部检索/数据源 / 渲染/导出 |
| [printable-docs-skill](https://github.com/sam33339999/printable-docs-skill) [![Star](https://img.shields.io/github/stars/sam33339999/printable-docs-skill?style=flat&logo=github&label=Star)](https://github.com/sam33339999/printable-docs-skill/stargazers) | 文本/想法 / PDF/文档 / Office 文档 | Agent Skill | 报告/长文档 / 信息图/视觉报告 / PPT/演示文稿 / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [notebooklm-py](https://github.com/teng-lin/notebooklm-py) [![Star](https://img.shields.io/github/stars/teng-lin/notebooklm-py?style=flat&logo=github&label=Star)](https://github.com/teng-lin/notebooklm-py/stargazers) | PDF/documents / Web/search / Knowledge base / Any/multi-source | Agent skill / API/SDK/library | PPT/deck / Infographic/visual report / Mind map/knowledge map / Video/audio / Table/timeline / Structured data/Markdown | Agent host / Browser/account / Local runtime / Document parsing/OCR / External search/data / Rendering/export |
| [notebooklm-skill](https://github.com/claude-world/notebooklm-skill) [![Star](https://img.shields.io/github/stars/claude-world/notebooklm-skill?style=flat&logo=github&label=Star)](https://github.com/claude-world/notebooklm-skill/stargazers) | PDF/documents / Web/search / Knowledge base / Any/multi-source | Agent skill / MCP server | PPT/deck / Briefing/report / Mind map/knowledge map / Infographic/visual report / Video/audio / Table/timeline / Q&A/study material | Agent host / MCP client / Browser/account / Local runtime / Document parsing/OCR / External search/data / Rendering/export |
| [NotebookLM MCP](https://github.com/alfredang/notebooklm-mcp) [![Star](https://img.shields.io/github/stars/alfredang/notebooklm-mcp?style=flat&logo=github&label=Star)](https://github.com/alfredang/notebooklm-mcp/stargazers) | PDF/documents / Web/search / Knowledge base / Any/multi-source | MCP server | PPT/deck / Mind map/knowledge map / Infographic/visual report / Video/audio / Briefing/report / Q&A/study material | MCP client / Browser/account / Local runtime / Document parsing/OCR / External search/data / Rendering/export |
| [qiaomu-anything-to-notebooklm](https://github.com/joeseesun/qiaomu-anything-to-notebooklm) [![Star](https://img.shields.io/github/stars/joeseesun/qiaomu-anything-to-notebooklm?style=flat&logo=github&label=Star)](https://github.com/joeseesun/qiaomu-anything-to-notebooklm/stargazers) | PDF/文档 / 网页/搜索结果 / 知识库/个人资料 / 任意/多源 | Agent Skill | PPT/演示文稿 / 思维导图/知识地图 / 视频/音频 / 问答/学习材料 / 报告/简报 | Agent 宿主 / 浏览器/账号 / 本地语言环境 / 文档解析/OCR / 外部检索/数据源 / 渲染/导出 |

### 代码库与软件系统

把 GitHub 仓库、本地代码、依赖和 diff 转成架构图、代码地图、Repo Wiki 或知识图谱。

| 项目 | 信息来源 | 工具形态 | 产出物形式 | 依赖类型 |
| --- | --- | --- | --- | --- |
| [GitDiagram](https://github.com/ahmedkhaleel2004/gitdiagram) [![Star](https://img.shields.io/github/stars/ahmedkhaleel2004/gitdiagram?style=flat&logo=github&label=Star)](https://github.com/ahmedkhaleel2004/gitdiagram/stargazers) | 代码库 | 开源应用/框架 | 代码地图/Repo Wiki / 架构图/流程图 | 浏览器/账号 / 模型 API / 代码分析工具 |
| [CodeBoarding](https://github.com/Codeboarding/CodeBoarding) [![Star](https://img.shields.io/github/stars/Codeboarding/CodeBoarding?style=flat&logo=github&label=Star)](https://github.com/Codeboarding/CodeBoarding/stargazers) | 代码库 | 开源应用/框架 | 代码地图/Repo Wiki / 架构图/流程图 | 本地语言环境 / 模型 API / 代码分析工具 / 渲染/导出 / 存储/索引 |
| [Understand-Anything](https://github.com/Egonex-AI/Understand-Anything) [![Star](https://img.shields.io/github/stars/Egonex-AI/Understand-Anything?style=flat&logo=github&label=Star)](https://github.com/Egonex-AI/Understand-Anything/stargazers) | 代码库 | Agent Skill | 代码地图/Repo Wiki / 架构图/流程图 | Agent 宿主 / 本地语言环境 / 模型 API / 代码分析工具 / 存储/索引 |
| [GitNexus](https://github.com/abhigyanpatwari/GitNexus) [![Star](https://img.shields.io/github/stars/abhigyanpatwari/GitNexus?style=flat&logo=github&label=Star)](https://github.com/abhigyanpatwari/GitNexus/stargazers) | 代码库 | 开源应用/框架 / MCP Server | 代码地图/Repo Wiki / 架构图/流程图 / 网页/交互页面 | MCP Client / 本地语言环境 / 代码分析工具 / 存储/索引 / 渲染/导出 |
| [Django ORM Lens](https://github.com/FROWNINGdev/django-orm-lens) [![Star](https://img.shields.io/github/stars/FROWNINGdev/django-orm-lens?style=flat&logo=github&label=Star)](https://github.com/FROWNINGdev/django-orm-lens/stargazers) | 代码库 / 数据库 / 代码/技术描述 | MCP Server / 开源应用/框架 | 代码地图/Repo Wiki / 架构图/流程图 / 图表/仪表盘 | MCP Client / 本地语言环境 / 代码分析工具 / 渲染/导出 / 系统工具 |
| [DeepWiki Open](https://github.com/AsyncFuncAI/deepwiki-open) [![Star](https://img.shields.io/github/stars/AsyncFuncAI/deepwiki-open?style=flat&logo=github&label=Star)](https://github.com/AsyncFuncAI/deepwiki-open/stargazers) | 代码库 | 开源应用/框架 | 代码地图/Repo Wiki / 架构图/流程图 | 本地语言环境 / 模型 API / 代码分析工具 / 渲染/导出 |
| [PocketFlow Tutorial Codebase Knowledge](https://github.com/The-Pocket/PocketFlow-Tutorial-Codebase-Knowledge) [![Star](https://img.shields.io/github/stars/The-Pocket/PocketFlow-Tutorial-Codebase-Knowledge?style=flat&logo=github&label=Star)](https://github.com/The-Pocket/PocketFlow-Tutorial-Codebase-Knowledge/stargazers) | 代码库 | 开源应用/框架 | 代码地图/Repo Wiki / 架构图/流程图 | 本地语言环境 / 模型 API / 代码分析工具 / 渲染/导出 |
| [local-deepwiki-mcp](https://github.com/UrbanDiver/local-deepwiki-mcp) [![Star](https://img.shields.io/github/stars/UrbanDiver/local-deepwiki-mcp?style=flat&logo=github&label=Star)](https://github.com/UrbanDiver/local-deepwiki-mcp/stargazers) | 代码库 | MCP Server / 开源应用/框架 | 代码地图/Repo Wiki / 架构图/流程图 / 网页/交互页面 / SVG/PNG/PDF | MCP Client / 本地语言环境 / 模型 API / 代码分析工具 / 存储/索引 / 渲染/导出 / GPU/加速器 |
| [GitVizz](https://github.com/adithya-s-k/GitVizz) [![Star](https://img.shields.io/github/stars/adithya-s-k/GitVizz?style=flat&logo=github&label=Star)](https://github.com/adithya-s-k/GitVizz/stargazers) | 代码库 | 开源应用/框架 | 代码地图/Repo Wiki / 架构图/流程图 | 浏览器/账号 / 模型 API / 代码分析工具 / 渲染/导出 |
| [codeflow](https://github.com/braedonsaunders/codeflow) [![Star](https://img.shields.io/github/stars/braedonsaunders/codeflow?style=flat&logo=github&label=Star)](https://github.com/braedonsaunders/codeflow/stargazers) | 代码库 | 开源应用/框架 | 代码地图/Repo Wiki / 架构图/流程图 | 浏览器/账号 / 模型 API / 代码分析工具 / 渲染/导出 |
| [oh-my-mermaid](https://github.com/oh-my-mermaid/oh-my-mermaid) [![Star](https://img.shields.io/github/stars/oh-my-mermaid/oh-my-mermaid?style=flat&logo=github&label=Star)](https://github.com/oh-my-mermaid/oh-my-mermaid/stargazers) | 代码库 | Agent Skill | 代码地图/Repo Wiki / 架构图/流程图 | Agent 宿主 / 模型 API / 代码分析工具 / 渲染/导出 |
| [codag-visualizer](https://github.com/codag-megalith/codag-visualizer) [![Star](https://img.shields.io/github/stars/codag-megalith/codag-visualizer?style=flat&logo=github&label=Star)](https://github.com/codag-megalith/codag-visualizer/stargazers) | 代码库 | 开源应用/框架 | 代码地图/Repo Wiki / 架构图/流程图 | 本地语言环境 / 代码分析工具 / 渲染/导出 |
| [codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp) [![Star](https://img.shields.io/github/stars/DeusData/codebase-memory-mcp?style=flat&logo=github&label=Star)](https://github.com/DeusData/codebase-memory-mcp/stargazers) | 代码库 | MCP Server | 代码地图/Repo Wiki / 架构图/流程图 | MCP Client / 本地语言环境 / 代码分析工具 / 存储/索引 |
| [CodeAtlas](https://github.com/lucyb0207/CodeAtlas) [![Star](https://img.shields.io/github/stars/lucyb0207/CodeAtlas?style=flat&logo=github&label=Star)](https://github.com/lucyb0207/CodeAtlas/stargazers) | 代码库 | 开源应用/框架 | 代码地图/Repo Wiki / 架构图/流程图 | 本地语言环境 / 代码分析工具 / 渲染/导出 |
| [devlensOSS](https://github.com/devlensio/devlensOSS) [![Star](https://img.shields.io/github/stars/devlensio/devlensOSS?style=flat&logo=github&label=Star)](https://github.com/devlensio/devlensOSS/stargazers) | 代码库 | 开源应用/框架 | 代码地图/Repo Wiki / 架构图/流程图 | 本地语言环境 / 代码分析工具 / 渲染/导出 |
| [Visual-Explainer](https://github.com/jircik/Visual-Explainer) [![Star](https://img.shields.io/github/stars/jircik/Visual-Explainer?style=flat&logo=github&label=Star)](https://github.com/jircik/Visual-Explainer/stargazers) | 代码库 | Agent Skill | 代码地图/Repo Wiki / 架构图/流程图 | Agent 宿主 / 模型 API / 代码分析工具 / 渲染/导出 |
| [codemap-skill](https://github.com/Asixa/codemap-skill) [![Star](https://img.shields.io/github/stars/Asixa/codemap-skill?style=flat&logo=github&label=Star)](https://github.com/Asixa/codemap-skill/stargazers) | 代码库 | Agent Skill | 代码地图/Repo Wiki / 架构图/流程图 | Agent 宿主 / 模型 API / 代码分析工具 |
| [DeepWiki](https://docs.devin.ai/work-with-devin/deepwiki) | 代码库 | 产品/SaaS | 代码地图/Repo Wiki / 架构图/流程图 | 浏览器/账号 / 代码分析工具 |
| [CodeSee](https://www.codesee.io/) | 代码库 | 产品/SaaS | 代码地图/Repo Wiki / 架构图/流程图 | 浏览器/账号 / 代码分析工具 |

### 数据、表格与业务指标

把 CSV、数据库、指标和业务数据转成图表、仪表盘或分析报告。

| 项目 | 信息来源 | 工具形态 | 产出物形式 | 依赖类型 |
| --- | --- | --- | --- | --- |
| [Data Formulator](https://github.com/microsoft/data-formulator) [![Star](https://img.shields.io/github/stars/microsoft/data-formulator?style=flat&logo=github&label=Star)](https://github.com/microsoft/data-formulator/stargazers) | 数据/表格 / 数据库 | 开源应用/框架 | 图表/仪表盘 / 报告/简报 | 本地语言环境 / 模型 API / 渲染/导出 |
| [LIDA](https://github.com/microsoft/lida) [![Star](https://img.shields.io/github/stars/microsoft/lida?style=flat&logo=github&label=Star)](https://github.com/microsoft/lida/stargazers) | 数据/表格 / 数据库 | 开源应用/框架 | 图表/仪表盘 / 报告/简报 | 本地语言环境 / 模型 API / 渲染/导出 |
| [tufte-claude-skill](https://github.com/aref-vc/tufte-claude-skill) [![Star](https://img.shields.io/github/stars/aref-vc/tufte-claude-skill?style=flat&logo=github&label=Star)](https://github.com/aref-vc/tufte-claude-skill/stargazers) | 数据/表格 / 文本/想法 | Agent Skill | 图表/仪表盘 / 信息图/视觉报告 / 报告/简报 | Agent 宿主 / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [WrenAI](https://github.com/Canner/WrenAI) [![Star](https://img.shields.io/github/stars/Canner/WrenAI?style=flat&logo=github&label=Star)](https://github.com/Canner/WrenAI/stargazers) | 数据/表格 / 数据库 / 知识库/个人资料 | 开源应用/框架 / Agent Skill | 图表/仪表盘 / 报告/简报 | Agent 宿主 / 本地语言环境 / 模型 API / 外部检索/数据源 / 存储/索引 |
| [Vanna](https://github.com/vanna-ai/vanna) [![Star](https://img.shields.io/github/stars/vanna-ai/vanna?style=flat&logo=github&label=Star)](https://github.com/vanna-ai/vanna/stargazers) | 数据库 / 数据/表格 | 开源应用/框架 / API/SDK/库 | 图表/仪表盘 / 报告/简报 | 本地语言环境 / 模型 API / 外部检索/数据源 / 存储/索引 / 渲染/导出 |
| [VMind](https://github.com/VisActor/VMind) [![Star](https://img.shields.io/github/stars/VisActor/VMind?style=flat&logo=github&label=Star)](https://github.com/VisActor/VMind/stargazers) | 数据/表格 / 文本/想法 | API/SDK/库 | 图表/仪表盘 / 信息图/视觉报告 / 图表/渲染输出 | 本地语言环境 / 模型 API / 渲染/导出 / 模板/素材 |
| [Semiotic](https://github.com/nteract/semiotic) [![Star](https://img.shields.io/github/stars/nteract/semiotic?style=flat&logo=github&label=Star)](https://github.com/nteract/semiotic/stargazers) | 数据/表格 / DSL/代码 | API/SDK/库 / MCP Server | 图表/仪表盘 / 图表/渲染输出 / SVG/PNG/PDF | 本地语言环境 / MCP Client / 渲染/导出 / 模板/素材 |
| [chart-visualization-skills](https://github.com/antvis/chart-visualization-skills) [![Star](https://img.shields.io/github/stars/antvis/chart-visualization-skills?style=flat&logo=github&label=Star)](https://github.com/antvis/chart-visualization-skills/stargazers) | 数据/表格 / 文本/想法 / 代码/技术描述 | Skill 集合 / API/SDK/库 | 图表/仪表盘 / 信息图/视觉报告 / 架构图/流程图 / 图表/渲染输出 | Agent 宿主 / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [mcp-server-chart](https://github.com/antvis/mcp-server-chart) [![Star](https://img.shields.io/github/stars/antvis/mcp-server-chart?style=flat&logo=github&label=Star)](https://github.com/antvis/mcp-server-chart/stargazers) | 数据/表格 / 文本/想法 / 数据库 | MCP Server / Skill 集合 | 图表/仪表盘 / 信息图/视觉报告 / 架构图/流程图 / 白板/思维导图 / 图表/渲染输出 | MCP Client / 本地语言环境 / 渲染/导出 |
| [mcp-dashboards](https://github.com/KyuRish/mcp-dashboards) [![Star](https://img.shields.io/github/stars/KyuRish/mcp-dashboards?style=flat&logo=github&label=Star)](https://github.com/KyuRish/mcp-dashboards/stargazers) | 数据/表格 / 数据库 / 任意/多源 | MCP Server | 图表/仪表盘 / PPT/演示文稿 / SVG/PNG/PDF | MCP Client / Agent 宿主 / 本地语言环境 / 外部检索/数据源 / 渲染/导出 |
| [mcp-grafana](https://github.com/grafana/mcp-grafana) [![Star](https://img.shields.io/github/stars/grafana/mcp-grafana?style=flat&logo=github&label=Star)](https://github.com/grafana/mcp-grafana/stargazers) | 数据/表格 / 数据库 / 任意/多源 | MCP Server | 图表/仪表盘 / SVG/PNG/PDF / 证据表 | MCP Client / 浏览器/账号 / 外部检索/数据源 / 渲染/导出 / 系统工具 |
| [Metabase Dashboard Skill](https://github.com/TongHuaLabs/metabase-dashboard-skill) [![Star](https://img.shields.io/github/stars/TongHuaLabs/metabase-dashboard-skill?style=flat&logo=github&label=Star)](https://github.com/TongHuaLabs/metabase-dashboard-skill/stargazers) | 数据库 / 数据/表格 | Agent Skill | 图表/仪表盘 / 证据表 | Agent 宿主 / MCP Client / 浏览器/账号 / 外部检索/数据源 / 渲染/导出 / 模板/素材 |
| [Claude Data Analysis Assistant](https://github.com/liangdabiao/claude-data-analysis) [![Star](https://img.shields.io/github/stars/liangdabiao/claude-data-analysis?style=flat&logo=github&label=Star)](https://github.com/liangdabiao/claude-data-analysis/stargazers) | 数据/表格 / 数据库 | Agent Skill / 开源应用/框架 | 图表/仪表盘 / 报告/长文档 / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / 模型 API / 渲染/导出 / 模板/素材 |
| [Data Analytics Skills for Claude](https://github.com/nimrodfisher/data-analytics-skills) [![Star](https://img.shields.io/github/stars/nimrodfisher/data-analytics-skills?style=flat&logo=github&label=Star)](https://github.com/nimrodfisher/data-analytics-skills/stargazers) | 数据/表格 / 数据库 / 文本/想法 | Skill 集合 | 图表/仪表盘 / 报告/简报 / 信息图/视觉报告 | Agent 宿主 / 模型 API / 渲染/导出 / 模板/素材 |
| [wshm](https://github.com/wshm-dev/wshm) [![Star](https://img.shields.io/github/stars/wshm-dev/wshm?style=flat&logo=github&label=Star)](https://github.com/wshm-dev/wshm/stargazers) | 代码库 / 数据/表格 / 网页/搜索结果 | 开源应用/框架 | 图表/仪表盘 / 报告/长文档 / 网页/交互页面 | 本地语言环境 / 模型 API / 外部检索/数据源 / 代码分析工具 / 存储/索引 / 渲染/导出 |
| [MatPlotAgent](https://github.com/thunlp/MatPlotAgent) [![Star](https://img.shields.io/github/stars/thunlp/MatPlotAgent?style=flat&logo=github&label=Star)](https://github.com/thunlp/MatPlotAgent/stargazers) | 数据/表格 / 数据库 | 研究原型 | 图表/仪表盘 / 报告/简报 | 本地语言环境 / 模型 API / 渲染/导出 |
| [OpenVizAI](https://github.com/OpenVizAI/OpenVizAI) [![Star](https://img.shields.io/github/stars/OpenVizAI/OpenVizAI?style=flat&logo=github&label=Star)](https://github.com/OpenVizAI/OpenVizAI/stargazers) | 数据/表格 / 数据库 | 开源应用/框架 | 图表/仪表盘 / 报告/简报 | 本地语言环境 / 模型 API / 渲染/导出 |
| [generative-dashboard-builder](https://github.com/KaranChandekar/generative-dashboard-builder) [![Star](https://img.shields.io/github/stars/KaranChandekar/generative-dashboard-builder?style=flat&logo=github&label=Star)](https://github.com/KaranChandekar/generative-dashboard-builder/stargazers) | 数据/表格 / 数据库 | 开源应用/框架 | 图表/仪表盘 / 报告/简报 | 本地语言环境 / 模型 API / 渲染/导出 / 存储/索引 |
| [OpenBI](https://github.com/narender-rk10/OpenBI) [![Star](https://img.shields.io/github/stars/narender-rk10/OpenBI?style=flat&logo=github&label=Star)](https://github.com/narender-rk10/OpenBI/stargazers) | 数据/表格 / 数据库 | 开源应用/框架 | 图表/仪表盘 / 报告/简报 | 本地语言环境 / 模型 API / 外部检索/数据源 / 存储/索引 / 渲染/导出 |
| [MCP Visuals Server](https://github.com/harrybin/visuals-mcp) [![Star](https://img.shields.io/github/stars/harrybin/visuals-mcp?style=flat&logo=github&label=Star)](https://github.com/harrybin/visuals-mcp/stargazers) | Data/tables / Knowledge base / Any/multi-source | MCP server | Chart/dashboard / Table/timeline / Web/interactive page | MCP client / Local runtime / Rendering/export |
| [viz-mcp](https://github.com/mindfullabai/viz-mcp) [![Star](https://img.shields.io/github/stars/mindfullabai/viz-mcp?style=flat&logo=github&label=Star)](https://github.com/mindfullabai/viz-mcp/stargazers) | 数据/表格 / 任意/多源 | MCP Server | 图表/仪表盘 / SVG/PNG/PDF / 网页/交互页面 | MCP Client / 本地语言环境 / 渲染/导出 / 存储/索引 |
| [data-visualization-mcp-server](https://github.com/kate-marine/data-visualization-mcp-server) [![Star](https://img.shields.io/github/stars/kate-marine/data-visualization-mcp-server?style=flat&logo=github&label=Star)](https://github.com/kate-marine/data-visualization-mcp-server/stargazers) | 数据/表格 / 数据库 | MCP Server | 图表/仪表盘 / SVG/PNG/PDF / 网页/交互页面 | MCP Client / 本地语言环境 / 渲染/导出 / 存储/索引 |
| [DataViz](https://github.com/SCKelemen/dataviz) [![Star](https://img.shields.io/github/stars/SCKelemen/dataviz?style=flat&logo=github&label=Star)](https://github.com/SCKelemen/dataviz/stargazers) | 数据/表格 / DSL/代码 | API/SDK/库 / MCP Server | 图表/仪表盘 / 图表/渲染输出 / SVG/PNG/PDF | MCP Client / 本地语言环境 / 渲染/导出 |
| [QuickChart MCP Server](https://github.com/GongRzhe/Quickchart-MCP-Server) [![Star](https://img.shields.io/github/stars/GongRzhe/Quickchart-MCP-Server?style=flat&logo=github&label=Star)](https://github.com/GongRzhe/Quickchart-MCP-Server/stargazers) | 数据/表格 / DSL/代码 | MCP Server | 图表/仪表盘 / 图表/渲染输出 / SVG/PNG/PDF | MCP Client / 本地语言环境 / 渲染/导出 / 外部检索/数据源 |
| [Elastic MCP Dashbuilder](https://github.com/elastic/example-mcp-dashbuilder) [![Star](https://img.shields.io/github/stars/elastic/example-mcp-dashbuilder?style=flat&logo=github&label=Star)](https://github.com/elastic/example-mcp-dashbuilder/stargazers) | 数据库 / 数据/表格 | MCP Server | 图表/仪表盘 / 网页/交互页面 | MCP Client / 本地语言环境 / 外部检索/数据源 / 存储/索引 / 渲染/导出 |
| [Chart Canvas](https://github.com/gluip/chart-canvas) [![Star](https://img.shields.io/github/stars/gluip/chart-canvas?style=flat&logo=github&label=Star)](https://github.com/gluip/chart-canvas/stargazers) | 数据/表格 / 数据库 / DSL/代码 | MCP Server | 图表/仪表盘 / 图表/Mermaid / 网页/交互页面 | MCP Client / 本地语言环境 / 外部检索/数据源 / 渲染/导出 |
| [Panel Live Server](https://github.com/panel-extensions/panel-live-server) [![Star](https://img.shields.io/github/stars/panel-extensions/panel-live-server?style=flat&logo=github&label=Star)](https://github.com/panel-extensions/panel-live-server/stargazers) | 数据/表格 / DSL/代码 | MCP Server / API/SDK/库 | 图表/仪表盘 / 网页/交互页面 | MCP Client / 本地语言环境 / 渲染/导出 / 存储/索引 |
| [HoloViz MCP](https://github.com/MarcSkovMadsen/holoviz-mcp) [![Star](https://img.shields.io/github/stars/MarcSkovMadsen/holoviz-mcp?style=flat&logo=github&label=Star)](https://github.com/MarcSkovMadsen/holoviz-mcp/stargazers) | 数据/表格 / DSL/代码 | MCP Server / Skill 集合 | 图表/仪表盘 / 网页/交互页面 | MCP Client / Agent 宿主 / 本地语言环境 / 渲染/导出 |
| [Data-Analysis-Agent](https://github.com/Zafer-Liu/Data-Analysis-Agent) [![Star](https://img.shields.io/github/stars/Zafer-Liu/Data-Analysis-Agent?style=flat&logo=github&label=Star)](https://github.com/Zafer-Liu/Data-Analysis-Agent/stargazers) | Data/tables / Database | Open-source app/framework / Bot/assistant | Chart/dashboard / Briefing/report | Browser/account / Local runtime / Model API / External search/data / Rendering/export / Storage/index |
| [Amplitude MCP Server](https://github.com/amplitude/mcp-server-guide) [![Star](https://img.shields.io/github/stars/amplitude/mcp-server-guide?style=flat&logo=github&label=Star)](https://github.com/amplitude/mcp-server-guide/stargazers) | Database / Data/tables | MCP server / Product/SaaS | Chart/dashboard / Evidence table | MCP client / Browser/account / External search/data / Storage/index |
| [JimuReport](https://github.com/jeecgboot/jimureport) [![Star](https://img.shields.io/github/stars/jeecgboot/jimureport?style=flat&logo=github&label=Star)](https://github.com/jeecgboot/jimureport/stargazers) | 数据/表格 / 数据库 / 文本/想法 | 开源应用/框架 / Agent Skill | 图表/仪表盘 / 报告/简报 / 网页/交互页面 | 浏览器/账号 / 本地语言环境 / 外部检索/数据源 / 渲染/导出 / 存储/索引 |
| [Vizro](https://github.com/mckinsey/vizro) [![Star](https://img.shields.io/github/stars/mckinsey/vizro?style=flat&logo=github&label=Star)](https://github.com/mckinsey/vizro/stargazers) | 数据/表格 / 数据库 / DSL/代码 | 开源应用/框架 / API/SDK/库 | 图表/仪表盘 / 网页/交互页面 | 本地语言环境 / 渲染/导出 / 模板/素材 |
| [mcp-server-antv](https://github.com/antvis/mcp-server-antv) [![Star](https://img.shields.io/github/stars/antvis/mcp-server-antv?style=flat&logo=github&label=Star)](https://github.com/antvis/mcp-server-antv/stargazers) | 数据/表格 / DSL/代码 / 代码/技术描述 | MCP Server | 图表/仪表盘 / 图表/渲染输出 / 架构图/流程图 | MCP Client / 本地语言环境 / 外部检索/数据源 / 渲染/导出 |

### 通用文本、想法与白板图示

从提示词、草稿、白板想法或半结构化文本生成信息图、流程图、白板图和视觉报告。

| 项目 | 信息来源 | 工具形态 | 产出物形式 | 依赖类型 |
| --- | --- | --- | --- | --- |
| [q-skills](https://github.com/TyrealQ/q-skills) [![Star](https://img.shields.io/github/stars/TyrealQ/q-skills?style=flat&logo=github&label=Star)](https://github.com/TyrealQ/q-skills/stargazers) | 文本/想法 / PDF/文档 / 数据/表格 | Skill 集合 | 信息图/视觉报告 / 报告/长文档 | Agent 宿主 / 模型 API / 本地语言环境 / 渲染/导出 |
| [Visualize](https://github.com/careerhackeralex/visualize) [![Star](https://img.shields.io/github/stars/careerhackeralex/visualize?style=flat&logo=github&label=Star)](https://github.com/careerhackeralex/visualize/stargazers) | 文本/想法 / 数据/表格 / 代码/技术描述 | Agent Skill | 网页/交互页面 / PPT/演示文稿 / 图表/仪表盘 / 信息图/视觉报告 / 架构图/流程图 | Agent 宿主 / 模型 API / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [Infographic Agent](https://github.com/ryanbaumann/infographic-agent) [![Star](https://img.shields.io/github/stars/ryanbaumann/infographic-agent?style=flat&logo=github&label=Star)](https://github.com/ryanbaumann/infographic-agent/stargazers) | PDF/文档 / 网页/搜索结果 / 数据/表格 / 文本/想法 | 开源应用/框架 / Agent Skill | 信息图/视觉报告 / 图形摘要/信息图 / SVG/PNG/PDF | 浏览器/账号 / 本地语言环境 / Model API / 文档解析/OCR / 渲染/导出 / 存储/索引 |
| [Infographics Skill](https://github.com/amigoscode/infographics-skill) [![Star](https://img.shields.io/github/stars/amigoscode/infographics-skill?style=flat&logo=github&label=Star)](https://github.com/amigoscode/infographics-skill/stargazers) | 文本/想法 / 代码/技术描述 | Agent Skill | 信息图/视觉报告 / 图形摘要/信息图 / SVG/PNG/PDF | Agent 宿主 / 模型 API / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [print-onepager-skill](https://github.com/JavierDiaz90/print-onepager-skill) [![Star](https://img.shields.io/github/stars/JavierDiaz90/print-onepager-skill?style=flat&logo=github&label=Star)](https://github.com/JavierDiaz90/print-onepager-skill/stargazers) | 文本/想法 / PDF/文档 / 数据/表格 | Agent Skill | 信息图/视觉报告 / 报告/简报 / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [visual-note-card-skills](https://github.com/beilunyang/visual-note-card-skills) [![Star](https://img.shields.io/github/stars/beilunyang/visual-note-card-skills?style=flat&logo=github&label=Star)](https://github.com/beilunyang/visual-note-card-skills/stargazers) | 文本/想法 / 网页/搜索结果 / PDF/文档 | Agent Skill | 信息图/视觉报告 / 图形摘要/信息图 / 网页/交互页面 | Agent 宿主 / 模型 API / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [Visual Explainer Skill](https://github.com/ericblue/visual-explainer-skill) [![Star](https://img.shields.io/github/stars/ericblue/visual-explainer-skill?style=flat&logo=github&label=Star)](https://github.com/ericblue/visual-explainer-skill/stargazers) | 文本/想法 / PDF/文档 / 代码库 / 代码/技术描述 | Agent Skill | 信息图/视觉报告 / 白板/思维导图 / PPT/演示文稿 / 架构图/流程图 / 图形摘要/信息图 | Agent 宿主 / 模型 API / 渲染/导出 / 模板/素材 |
| [visual-explainer](https://github.com/nicobailon/visual-explainer) [![Star](https://img.shields.io/github/stars/nicobailon/visual-explainer?style=flat&logo=github&label=Star)](https://github.com/nicobailon/visual-explainer/stargazers) | 文本/想法 / 代码库 / 代码/技术描述 / 数据/表格 | Agent Skill | 网页/交互页面 / PPT/演示文稿 / 架构图/流程图 / 图表/仪表盘 / 信息图/视觉报告 | Agent 宿主 / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [Sideshow](https://github.com/modem-dev/sideshow) [![Star](https://img.shields.io/github/stars/modem-dev/sideshow?style=flat&logo=github&label=Star)](https://github.com/modem-dev/sideshow/stargazers) | 文本/想法 / 代码/技术描述 / 数据/表格 / DSL/代码 | 开源应用/框架 | 网页/交互页面 / 图表/Mermaid / 架构图/流程图 / 图表/仪表盘 / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / 渲染/导出 |
| [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) [![Star](https://img.shields.io/github/stars/CopilotKit/OpenGenerativeUI?style=flat&logo=github&label=Star)](https://github.com/CopilotKit/OpenGenerativeUI/stargazers) | 文本/想法 / 数据/表格 / 代码/技术描述 | 开源应用/框架 / MCP Server | 网页/交互页面 / 信息图/视觉报告 / 架构图/流程图 / 图表/仪表盘 | Agent 宿主 / MCP Client / 本地语言环境 / 模型 API / 渲染/导出 / 模板/素材 |
| [Open Design](https://github.com/nexu-io/open-design) [![Star](https://img.shields.io/github/stars/nexu-io/open-design?style=flat&logo=github&label=Star)](https://github.com/nexu-io/open-design/stargazers) | 文本/想法 / 网页/搜索结果 / 代码库 / 数据/表格 | 开源应用/框架 | 网页/交互页面 / PPT/演示文稿 / 图表/仪表盘 / SVG/PNG/PDF / 视频/音频 | Agent 宿主 / 模型 API / 本地语言环境 / 渲染/导出 / 系统工具 / 模板/素材 |
| [iPolloWork](https://github.com/Devin-AXIS/iPolloWork) [![Star](https://img.shields.io/github/stars/Devin-AXIS/iPolloWork?style=flat&logo=github&label=Star)](https://github.com/Devin-AXIS/iPolloWork/stargazers) | 文本/想法 / 代码库 / 数据/表格 / 网页/搜索结果 | 开源应用/框架 | 网页/交互页面 / PPT/演示文稿 / 图表/仪表盘 / SVG/PNG/PDF / 视频/音频 | Agent 宿主 / 本地语言环境 / 模型 API / 渲染/导出 / 系统工具 / 模板/素材 |
| [baoyu-skills](https://github.com/JimLiu/baoyu-skills) [![Star](https://img.shields.io/github/stars/JimLiu/baoyu-skills?style=flat&logo=github&label=Star)](https://github.com/JimLiu/baoyu-skills/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | Skill 集合 | 信息图/视觉报告 / 图形摘要/信息图 / PPT/演示文稿 / SVG/PNG/PDF | Agent 宿主 / 模型 API / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [aiz-infographic](https://github.com/aizzaku/aiz-infographic) [![Star](https://img.shields.io/github/stars/aizzaku/aiz-infographic?style=flat&logo=github&label=Star)](https://github.com/aizzaku/aiz-infographic/stargazers) | 文本/想法 / 数据/表格 | Agent Skill | 信息图/视觉报告 / 网页/交互页面 / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [Social Card Images for AI Agents](https://github.com/kostja94/social-cards-skills) [![Star](https://img.shields.io/github/stars/kostja94/social-cards-skills?style=flat&logo=github&label=Star)](https://github.com/kostja94/social-cards-skills/stargazers) | Text/ideas / Web/search / News/intelligence | Agent skill | Infographic/visual report / SVG/PNG/PDF | Agent host / Local runtime / Model API / Rendering/export / Templates/assets |
| [gemini-infographic](https://github.com/charlie947/social-media-skills/blob/main/skills/gemini-infographic/SKILL.md) [![Star](https://img.shields.io/github/stars/charlie947/social-media-skills?style=flat&logo=github&label=Star)](https://github.com/charlie947/social-media-skills/stargazers) | Text/ideas / Web/search / News/intelligence | Agent skill | Infographic/visual report / Graphical abstract/infographic | Agent host / Model API / Templates/assets |
| [ascii-canvas](https://github.com/noodlebindev/ascii-canvas) [![Star](https://img.shields.io/github/stars/noodlebindev/ascii-canvas?style=flat&logo=github&label=Star)](https://github.com/noodlebindev/ascii-canvas/stargazers) | 文本/想法 / 代码/技术描述 / 论文/科研资料 / 数据/表格 | Agent Skill | 信息图/视觉报告 / 架构图/流程图 / 白板/思维导图 / 表格/时间线 / PPT/演示文稿 | Agent 宿主 / 本地语言环境 / 渲染/导出 |
| [Piktochart AI](https://piktochart.com/generative-ai/) | 文本/想法 / PDF/文档 / 数据/表格 | 产品/SaaS | 信息图/视觉报告 / 报告/长文档 | 浏览器/账号 / 模板/素材 |
| [hbr-style-visualization](https://github.com/kgraph57/hbr-style-visualization) [![Star](https://img.shields.io/github/stars/kgraph57/hbr-style-visualization?style=flat&logo=github&label=Star)](https://github.com/kgraph57/hbr-style-visualization/stargazers) | 文本/想法 / 数据/表格 | Agent Skill | 信息图/视觉报告 / 图表/仪表盘 / PPT/演示文稿 | Agent 宿主 / 模型 API / 渲染/导出 / 模板/素材 |
| [viz-skills](https://github.com/silvere/viz-skills) [![Star](https://img.shields.io/github/stars/silvere/viz-skills?style=flat&logo=github&label=Star)](https://github.com/silvere/viz-skills/stargazers) | 文本/想法 / 网页/搜索结果 / PDF/文档 | Agent Skill | 信息图/视觉报告 / SVG/PNG/PDF / 白板/思维导图 | Agent 宿主 / 本地语言环境 / 渲染/导出 |
| [Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs) | 文本/想法 / PDF/文档 / Office 文档 / 网页/搜索结果 / 代码库 | 产品/SaaS / Bot/助手 | 信息图/视觉报告 / PPT/演示文稿 / 网页/交互页面 / SVG/PNG/PDF | 浏览器/账号 / 模型 API / 渲染/导出 / 模板/素材 |
| [Venngage AI Infographic Generator](https://venngage.com/ai-tools/infographic-generator) | 文本/想法 / PDF/文档 / 数据/表格 | 产品/SaaS | 信息图/视觉报告 / 报告/长文档 | 浏览器/账号 / 模板/素材 |
| [Venngage AI Report Generator](https://venngage.com/ai-tools/report-generator) | 文本/想法 / PDF/文档 / 数据/表格 | 产品/SaaS | 信息图/视觉报告 / 报告/长文档 | 浏览器/账号 / 模板/素材 |
| [Jeda AI Infographic Generator](https://www.jeda.ai/ai-infographic-generator) | 文本/想法 / PDF/文档 / 数据/表格 | 产品/SaaS | 信息图/视觉报告 / 报告/长文档 | 浏览器/账号 / 文档解析/OCR / 模板/素材 |
| [Infogram](https://infogram.com/) | 文本/想法 / PDF/文档 / 数据/表格 | 产品/SaaS | 信息图/视觉报告 / 报告/长文档 | 浏览器/账号 / 外部检索/数据源 / 模板/素材 |
| [DeepDiagram](https://github.com/LingyiChen-AI/DeepDiagram) [![Star](https://img.shields.io/github/stars/LingyiChen-AI/DeepDiagram?style=flat&logo=github&label=Star)](https://github.com/LingyiChen-AI/DeepDiagram/stargazers) | 文本/想法 / 代码/技术描述 / 数据/表格 | 开源应用/框架 | 架构图/流程图 / 白板/思维导图 / 图表/仪表盘 / 信息图/视觉报告 / 图表/Mermaid | 本地语言环境 / 模型 API / 渲染/导出 / 模板/素材 / 存储/索引 |
| [next-ai-draw-io](https://github.com/DayuanJiang/next-ai-draw-io) [![Star](https://img.shields.io/github/stars/DayuanJiang/next-ai-draw-io?style=flat&logo=github&label=Star)](https://github.com/DayuanJiang/next-ai-draw-io/stargazers) | 文本/想法 / 代码/技术描述 | 开源应用/框架 | 架构图/流程图 / 白板/思维导图 / SVG/PNG/PDF | 浏览器/账号 / 本地语言环境 / 模型 API / 渲染/导出 / 模板/素材 |
| [Napkin AI](https://www.napkin.ai/) | 文本/想法 / 代码/技术描述 | 产品/SaaS | 架构图/流程图 / 白板/思维导图 | 浏览器/账号 / 模板/素材 |
| [Eraser AI](https://www.eraser.io/ai) | 文本/想法 / 代码/技术描述 | 产品/SaaS | 架构图/流程图 / 白板/思维导图 | 浏览器/账号 / 模板/素材 |
| [Mermaid Chart AI](https://mermaid.ai/mermaid-ai) | 文本/想法 / 代码/技术描述 | 产品/SaaS | 架构图/流程图 / 白板/思维导图 | 浏览器/账号 / 渲染/导出 |
| [Whimsical AI](https://whimsical.com/ai) | 文本/想法 / 代码/技术描述 | 产品/SaaS | 架构图/流程图 / 白板/思维导图 | 浏览器/账号 / 模板/素材 |
| [Lucid AI](https://www.lucidchart.com/pages/use-cases/diagram-with-AI) | 文本/想法 / 代码/技术描述 | 产品/SaaS | 架构图/流程图 / 白板/思维导图 | 浏览器/账号 / 模板/素材 |
| [Miro AI diagrams](https://help.miro.com/hc/en-us/articles/28782102127890-Miro-AI-with-Diagrams-and-mindmaps) | 文本/想法 / 代码/技术描述 | 产品/SaaS | 架构图/流程图 / 白板/思维导图 | 浏览器/账号 / 模板/素材 |
| [FigJam AI](https://help.figma.com/hc/en-us/articles/18706554628119-Make-boards-and-diagrams-with-FigJam-AI) | 文本/想法 / 代码/技术描述 | 产品/SaaS | 架构图/流程图 / 白板/思维导图 | 浏览器/账号 / 模板/素材 |
| [System Design Visualizer](https://github.com/mallahyari/system-design-visualizer) [![Star](https://img.shields.io/github/stars/mallahyari/system-design-visualizer?style=flat&logo=github&label=Star)](https://github.com/mallahyari/system-design-visualizer/stargazers) | 代码/技术描述 / 文本/想法 | 开源应用/框架 | 架构图/流程图 / 图表/Mermaid / 网页/交互页面 | 浏览器/账号 / 本地语言环境 / 模型 API / 渲染/导出 |
| [Strategy Consulting Visualization Skill](https://github.com/kgraph57/mckinsey-style-visualization-skill) [![Star](https://img.shields.io/github/stars/kgraph57/mckinsey-style-visualization-skill?style=flat&logo=github&label=Star)](https://github.com/kgraph57/mckinsey-style-visualization-skill/stargazers) | 文本/想法 / 数据/表格 | Agent Skill | 信息图/视觉报告 / PPT/演示文稿 / SVG/PNG/PDF / 图表/仪表盘 | Agent 宿主 / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [Diagram Creator Skill](https://github.com/ferdinandobons/diagram-creator-skill) [![Star](https://img.shields.io/github/stars/ferdinandobons/diagram-creator-skill?style=flat&logo=github&label=Star)](https://github.com/ferdinandobons/diagram-creator-skill/stargazers) | 文本/想法 / PDF/文档 / Office 文档 / 数据/表格 / 代码/技术描述 | Agent Skill | 架构图/流程图 / 网页/交互页面 / 白板/思维导图 | Agent 宿主 / 本地语言环境 / 渲染/导出 / 模板/素材 |

### 程序化视频与动态讲解

把提示词、网页、代码库、结构化时间线或 Agent 生成的 HTML 转成带解说或动画的 MP4/视频产物。

| 项目 | 信息来源 | 工具形态 | 产出物形式 | 依赖类型 |
| --- | --- | --- | --- | --- |
| [html-video](https://github.com/nexu-io/html-video) [![Star](https://img.shields.io/github/stars/nexu-io/html-video?style=flat&logo=github&label=Star)](https://github.com/nexu-io/html-video/stargazers) | 文本/想法 / 网页/搜索结果 / 代码库 | 开源应用/框架 | 视频/音频 / 网页/交互页面 | Agent 宿主 / 本地语言环境 / 模型 API / 渲染/导出 / 系统工具 / 模板/素材 |
| [HyperFrames](https://github.com/heygen-com/hyperframes) [![Star](https://img.shields.io/github/stars/heygen-com/hyperframes?style=flat&logo=github&label=Star)](https://github.com/heygen-com/hyperframes/stargazers) | 文本/想法 / 网页/搜索结果 / PDF/文档 / 数据/表格 / DSL/代码 | 开源应用/框架 / Agent Skill | 视频/音频 / 网页/交互页面 / 图表/仪表盘 | Agent 宿主 / 本地语言环境 / 渲染/导出 / 系统工具 / 模板/素材 |
| [NextFrame](https://github.com/ChaosRealmsAI/NextFrame) [![Star](https://img.shields.io/github/stars/ChaosRealmsAI/NextFrame?style=flat&logo=github&label=Star)](https://github.com/ChaosRealmsAI/NextFrame/stargazers) | DSL/代码 / 文本/想法 | 开源应用/框架 | 视频/音频 / 网页/交互页面 | 本地语言环境 / 渲染/导出 / 系统工具 |
| [Helios](https://github.com/BintzGavin/helios) [![Star](https://img.shields.io/github/stars/BintzGavin/helios?style=flat&logo=github&label=Star)](https://github.com/BintzGavin/helios/stargazers) | DSL/代码 / 文本/想法 | API/SDK/库 / Agent Skill | 视频/音频 / 网页/交互页面 | 本地语言环境 / 渲染/导出 / 系统工具 / Agent 宿主 |
| [OpenMontage](https://github.com/calesthio/OpenMontage) [![Star](https://img.shields.io/github/stars/calesthio/OpenMontage?style=flat&logo=github&label=Star)](https://github.com/calesthio/OpenMontage/stargazers) | 文本/想法 / 网页/搜索结果 / 新闻/资讯 | 开源应用/框架 | 视频/音频 | Agent 宿主 / 本地语言环境 / 模型 API / 外部检索/数据源 / 渲染/导出 / 系统工具 |
| [ralphy](https://github.com/alecs5am/ralphy) [![Star](https://img.shields.io/github/stars/alecs5am/ralphy?style=flat&logo=github&label=Star)](https://github.com/alecs5am/ralphy/stargazers) | 文本/想法 / 网页/搜索结果 | 开源应用/框架 | 视频/音频 | Agent 宿主 / 本地语言环境 / 模型 API / 渲染/导出 / 系统工具 / 存储/索引 |
| [data-animation-skills](https://github.com/iart-ai/data-animation-skills) [![Star](https://img.shields.io/github/stars/iart-ai/data-animation-skills?style=flat&logo=github&label=Star)](https://github.com/iart-ai/data-animation-skills/stargazers) | 数据/表格 / 文本/想法 | Skill 集合 | 视频/音频 / 图表/仪表盘 / 信息图/视觉报告 / PPT/演示文稿 | Agent 宿主 / 本地语言环境 / 渲染/导出 / 模板/素材 |

### 演示文稿与多源内容呈现

把文本、文档、网页、研究材料或大纲转成 PPT、Deck，或让 Agent 生成/编辑演示文稿。

| 项目 | 信息来源 | 工具形态 | 产出物形式 | 依赖类型 |
| --- | --- | --- | --- | --- |
| [ppt-master](https://github.com/hugohe3/ppt-master) [![Star](https://img.shields.io/github/stars/hugohe3/ppt-master?style=flat&logo=github&label=Star)](https://github.com/hugohe3/ppt-master/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | 开源应用/框架 | PPT/演示文稿 | 本地语言环境 / 模型 API / 渲染/导出 / 模板/素材 |
| [Presenton](https://github.com/presenton/presenton) [![Star](https://img.shields.io/github/stars/presenton/presenton?style=flat&logo=github&label=Star)](https://github.com/presenton/presenton/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | 开源应用/框架 / API/SDK/库 | PPT/演示文稿 | 本地语言环境 / 模型 API / 渲染/导出 / MCP Client / 模板/素材 |
| [Deckbuilder](https://github.com/teknologika/Deckbuilder) [![Star](https://img.shields.io/github/stars/teknologika/Deckbuilder?style=flat&logo=github&label=Star)](https://github.com/teknologika/Deckbuilder/stargazers) | 文本/想法 / DSL/代码 / 数据/表格 | MCP Server / API/SDK/库 | PPT/演示文稿 | MCP Client / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [PPTAgent](https://github.com/icip-cas/PPTAgent) [![Star](https://img.shields.io/github/stars/icip-cas/PPTAgent?style=flat&logo=github&label=Star)](https://github.com/icip-cas/PPTAgent/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | 研究原型 | PPT/演示文稿 | 本地语言环境 / 模型 API / 渲染/导出 / 模板/素材 |
| [AI Multi-Agent Presentation Builder](https://github.com/Azure-Samples/ai-multi-agent-presentation-builder) [![Star](https://img.shields.io/github/stars/Azure-Samples/ai-multi-agent-presentation-builder?style=flat&logo=github&label=Star)](https://github.com/Azure-Samples/ai-multi-agent-presentation-builder/stargazers) | 文本/想法 / 网页/搜索结果 | 开源应用/框架 | PPT/演示文稿 | 本地语言环境 / 模型 API / 外部检索/数据源 / 渲染/导出 / 模板/素材 |
| [presentation-ai](https://github.com/allweonedev/presentation-ai) [![Star](https://img.shields.io/github/stars/allweonedev/presentation-ai?style=flat&logo=github&label=Star)](https://github.com/allweonedev/presentation-ai/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | 开源应用/框架 | PPT/演示文稿 | 本地语言环境 / 模型 API / 渲染/导出 / 模板/素材 |
| [DeckForge](https://github.com/Whatsonyourmind/deckforge) [![Star](https://img.shields.io/github/stars/Whatsonyourmind/deckforge?style=flat&logo=github&label=Star)](https://github.com/Whatsonyourmind/deckforge/stargazers) | 文本/想法 / 数据/表格 / 数据库 | 开源应用/框架 / MCP Server / API/SDK/库 | PPT/演示文稿 / 图表/仪表盘 | MCP Client / 本地语言环境 / 模型 API / 渲染/导出 / 模板/素材 / 存储/索引 |
| [slide-deck-ai](https://github.com/barun-saha/slide-deck-ai) [![Star](https://img.shields.io/github/stars/barun-saha/slide-deck-ai?style=flat&logo=github&label=Star)](https://github.com/barun-saha/slide-deck-ai/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | 开源应用/框架 | PPT/演示文稿 | 本地语言环境 / 模型 API / 渲染/导出 / 模板/素材 |
| [odin-slides](https://github.com/leonid20000/odin-slides) [![Star](https://img.shields.io/github/stars/leonid20000/odin-slides?style=flat&logo=github&label=Star)](https://github.com/leonid20000/odin-slides/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | 开源应用/框架 | PPT/演示文稿 | 本地语言环境 / 模型 API / 文档解析/OCR / 渲染/导出 / 系统工具 |
| [SlideSmith AI](https://github.com/SalmanSattar01/docweaver) [![Star](https://img.shields.io/github/stars/SalmanSattar01/docweaver?style=flat&logo=github&label=Star)](https://github.com/SalmanSattar01/docweaver/stargazers) | PDF/documents / Office docs / Text/ideas | Open-source app/framework | PPT/deck / SVG/PNG/PDF / Web/interactive page | Local runtime / Model API / Document parsing/OCR / Rendering/export / GPU/accelerator |
| [slide-maker](https://github.com/addsumtech/slides_maker) [![Star](https://img.shields.io/github/stars/addsumtech/slides_maker?style=flat&logo=github&label=Star)](https://github.com/addsumtech/slides_maker/stargazers) | 论文/科研资料 / PDF/文档 / Office 文档 / 代码库 / 数据/表格 / 文本/想法 | 开源应用/框架 / Agent Skill | PPT/演示文稿 / 图表/仪表盘 / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / Model API / 文档解析/OCR / 渲染/导出 / 模板/素材 |
| [edit2docs](https://github.com/CocoRoF/edit2docs) [![Star](https://img.shields.io/github/stars/CocoRoF/edit2docs?style=flat&logo=github&label=Star)](https://github.com/CocoRoF/edit2docs/stargazers) | 文本/想法 / Office 文档 / 数据/表格 | 开源应用/框架 / MCP Server / API/SDK/库 | PPT/演示文稿 / 报告/长文档 / 图表/仪表盘 / SVG/PNG/PDF | Agent 宿主 / MCP Client / 本地语言环境 / 模型 API / 文档解析/OCR / 渲染/导出 |
| [dashi-ppt-skill](https://github.com/chuspeeism/dashi-ppt-skill) [![Star](https://img.shields.io/github/stars/chuspeeism/dashi-ppt-skill?style=flat&logo=github&label=Star)](https://github.com/chuspeeism/dashi-ppt-skill/stargazers) | 文本/想法 / PDF/文档 / Office 文档 / 数据/表格 / 网页/搜索结果 | Agent Skill | PPT/演示文稿 / 网页/交互页面 / 图表/仪表盘 / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / 渲染/导出 / 系统工具 / 模板/素材 |
| [deck-factory](https://github.com/kimsh-1/deck-factory) [![Star](https://img.shields.io/github/stars/kimsh-1/deck-factory?style=flat&logo=github&label=Star)](https://github.com/kimsh-1/deck-factory/stargazers) | 文本/想法 / 数据/表格 / 网页/搜索结果 | Agent Skill | PPT/演示文稿 / 网页/交互页面 / SVG/PNG/PDF / 视频/音频 | Agent 宿主 / 本地语言环境 / 渲染/导出 / 系统工具 / 模板/素材 |
| [econ-slides-skill](https://github.com/hanlulong/econ-slides-skill) [![Star](https://img.shields.io/github/stars/hanlulong/econ-slides-skill?style=flat&logo=github&label=Star)](https://github.com/hanlulong/econ-slides-skill/stargazers) | 论文/科研资料 / PDF/文档 / 数据/表格 | Agent Skill | PPT/演示文稿 / 报告/简报 / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / 文档解析/OCR / 渲染/导出 / 系统工具 / 模板/素材 |
| [voiceover-deck](https://github.com/Gostems87/voiceover-deck) [![Star](https://img.shields.io/github/stars/Gostems87/voiceover-deck?style=flat&logo=github&label=Star)](https://github.com/Gostems87/voiceover-deck/stargazers) | 文本/想法 / 网页/搜索结果 | Agent Skill | PPT/演示文稿 / 网页/交互页面 / 视频/音频 | Agent 宿主 / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [PresentationSkill-ClaudeCode](https://github.com/ZeroAlcoholic/PresentationSkill-ClaudeCode) [![Star](https://img.shields.io/github/stars/ZeroAlcoholic/PresentationSkill-ClaudeCode?style=flat&logo=github&label=Star)](https://github.com/ZeroAlcoholic/PresentationSkill-ClaudeCode/stargazers) | 文本/想法 / PDF/文档 / 数据/表格 / 任意/多源 | Skill 集合 / Agent Skill | PPT/演示文稿 / 图形摘要/信息图 / 报告/简报 / 网页/交互页面 / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / 渲染/导出 / 系统工具 / 模板/素材 |
| [ppt-agents](https://github.com/chenxingqiang/ppt-agents) [![Star](https://img.shields.io/github/stars/chenxingqiang/ppt-agents?style=flat&logo=github&label=Star)](https://github.com/chenxingqiang/ppt-agents/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | 开源应用/框架 | PPT/演示文稿 | Agent 宿主 / 本地语言环境 / 模型 API / 渲染/导出 |
| [Slideia](https://github.com/Fidelisaboke/slideia) [![Star](https://img.shields.io/github/stars/Fidelisaboke/slideia?style=flat&logo=github&label=Star)](https://github.com/Fidelisaboke/slideia/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | 开源应用/框架 / MCP Server / API/SDK/库 | PPT/演示文稿 | MCP Client / 本地语言环境 / 模型 API / 渲染/导出 |
| [deckdown](https://github.com/adityachauhan0/deckdown) [![Star](https://img.shields.io/github/stars/adityachauhan0/deckdown?style=flat&logo=github&label=Star)](https://github.com/adityachauhan0/deckdown/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | 开源应用/框架 | PPT/演示文稿 | 本地语言环境 / 渲染/导出 |
| [Frontend Slides](https://github.com/zarazhangrui/frontend-slides) [![Star](https://img.shields.io/github/stars/zarazhangrui/frontend-slides?style=flat&logo=github&label=Star)](https://github.com/zarazhangrui/frontend-slides/stargazers) | Text/ideas / PDF/documents | Agent Skill | PPT/deck / Web/interactive page | Agent host / Model API / Local runtime / Rendering/export |
| [Slides AI Plugin](https://github.com/proyecto26/slides-ai-plugin) [![Star](https://img.shields.io/github/stars/proyecto26/slides-ai-plugin?style=flat&logo=github&label=Star)](https://github.com/proyecto26/slides-ai-plugin/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | Agent Skill | PPT/演示文稿 / 网页/交互页面 | Agent 宿主 / 模型 API / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [Present](https://github.com/glebis/claude-skills/tree/main/present) [![Star](https://img.shields.io/github/stars/glebis/claude-skills?style=flat&logo=github&label=Star)](https://github.com/glebis/claude-skills/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 / 知识库/个人资料 | Agent Skill | PPT/演示文稿 / 网页/交互页面 / 视频/音频 / 报告/长文档 | Agent 宿主 / 模型 API / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [slidemason](https://github.com/erickittelson/slidemason) [![Star](https://img.shields.io/github/stars/erickittelson/slidemason?style=flat&logo=github&label=Star)](https://github.com/erickittelson/slidemason/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | 开源应用/框架 / Agent Skill | PPT/演示文稿 / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [cc-slidev](https://github.com/rhuss/cc-slidev) [![Star](https://img.shields.io/github/stars/rhuss/cc-slidev?style=flat&logo=github&label=Star)](https://github.com/rhuss/cc-slidev/stargazers) | 文本/想法 / 代码/技术描述 | Agent Skill | PPT/演示文稿 / 网页/交互页面 / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [revealjs-skill](https://github.com/ryanbbrown/revealjs-skill) [![Star](https://img.shields.io/github/stars/ryanbbrown/revealjs-skill?style=flat&logo=github&label=Star)](https://github.com/ryanbbrown/revealjs-skill/stargazers) | 文本/想法 / 数据/表格 / 代码/技术描述 | Agent Skill | PPT/演示文稿 / 网页/交互页面 / 图表/仪表盘 / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / 渲染/导出 / 系统工具 / 模板/素材 |
| [slidev-deck-stack](https://github.com/astroicers/slidev-deck-stack) [![Star](https://img.shields.io/github/stars/astroicers/slidev-deck-stack?style=flat&logo=github&label=Star)](https://github.com/astroicers/slidev-deck-stack/stargazers) | 文本/想法 / 代码/技术描述 / DSL/代码 | Agent Skill | PPT/演示文稿 / 网页/交互页面 / 图表/Mermaid / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [high-quality-slides](https://github.com/andyqiu847-ai/high-quality-slides) [![Star](https://img.shields.io/github/stars/andyqiu847-ai/high-quality-slides?style=flat&logo=github&label=Star)](https://github.com/andyqiu847-ai/high-quality-slides/stargazers) | 文本/想法 / PDF/文档 / Office 文档 / 网页/搜索结果 | Agent Skill | PPT/演示文稿 / 网页/交互页面 / SVG/PNG/PDF | Agent 宿主 / 模型 API / 本地语言环境 / 文档解析/OCR / 渲染/导出 / 模板/素材 |
| [Presentation Skill](https://github.com/grapeot/presentation_skill) [![Star](https://img.shields.io/github/stars/grapeot/presentation_skill?style=flat&logo=github&label=Star)](https://github.com/grapeot/presentation_skill/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | Agent Skill | PPT/演示文稿 / 网页/交互页面 / 图形摘要/信息图 | Agent 宿主 / 模型 API / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [presentation-writing-claude-skill](https://github.com/marcusnelson/presentation-writing-claude-skill) [![Star](https://img.shields.io/github/stars/marcusnelson/presentation-writing-claude-skill?style=flat&logo=github&label=Star)](https://github.com/marcusnelson/presentation-writing-claude-skill/stargazers) | 文本/想法 / PDF/文档 / Office 文档 / 数据/表格 | Agent Skill | PPT/演示文稿 / 报告/简报 / 结构化数据/Markdown | Agent 宿主 / 模型 API / 文档解析/OCR / 渲染/导出 / 模板/素材 |
| [Office-PowerPoint-MCP-Server](https://github.com/GongRzhe/Office-PowerPoint-MCP-Server) [![Star](https://img.shields.io/github/stars/GongRzhe/Office-PowerPoint-MCP-Server?style=flat&logo=github&label=Star)](https://github.com/GongRzhe/Office-PowerPoint-MCP-Server/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | MCP Server | PPT/演示文稿 | MCP Client / 本地语言环境 / 渲染/导出 / 系统工具 |
| [Presentation Gen MCP Server](https://github.com/kevinten-ai/mcp-presentation) [![Star](https://img.shields.io/github/stars/kevinten-ai/mcp-presentation?style=flat&logo=github&label=Star)](https://github.com/kevinten-ai/mcp-presentation/stargazers) | 文本/想法 / 数据/表格 / Office 文档 | MCP Server | PPT/演示文稿 | MCP Client / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [MCP Office Documents Server](https://github.com/ForLegalAI/mcp-ms-office-documents) [![Star](https://img.shields.io/github/stars/ForLegalAI/mcp-ms-office-documents?style=flat&logo=github&label=Star)](https://github.com/ForLegalAI/mcp-ms-office-documents/stargazers) | 文本/想法 / Office 文档 / 数据/表格 | MCP Server | PPT/演示文稿 / 报告/长文档 / 图表/仪表盘 / 结构化数据/Markdown | MCP Client / 本地语言环境 / 渲染/导出 / 系统工具 / 模板/素材 / 存储/索引 |
| [2slides MCP Server](https://github.com/2slides/mcp-2slides) [![Star](https://img.shields.io/github/stars/2slides/mcp-2slides?style=flat&logo=github&label=Star)](https://github.com/2slides/mcp-2slides/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | MCP Server / 产品/SaaS | PPT/演示文稿 | MCP Client / 浏览器/账号 / 模型 API / 渲染/导出 / 模板/素材 |
| [PowerPointMcp](https://github.com/sbroenne/mcp-server-powerpoint) [![Star](https://img.shields.io/github/stars/sbroenne/mcp-server-powerpoint?style=flat&logo=github&label=Star)](https://github.com/sbroenne/mcp-server-powerpoint/stargazers) | 文本/想法 / Office 文档 / 数据/表格 | MCP Server / API/SDK/库 | PPT/演示文稿 / SVG/PNG/PDF / 图表/仪表盘 | MCP Client / 本地语言环境 / 渲染/导出 / 系统工具 |
| [PPT-MCP](https://github.com/guangxiangdebizi/PPT-MCP) [![Star](https://img.shields.io/github/stars/guangxiangdebizi/PPT-MCP?style=flat&logo=github&label=Star)](https://github.com/guangxiangdebizi/PPT-MCP/stargazers) | 文本/想法 / Office 文档 / 数据/表格 | MCP Server | PPT/演示文稿 / 图表/仪表盘 | MCP Client / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [PptMcp](https://github.com/trsdn/mcp-server-ppt) [![Star](https://img.shields.io/github/stars/trsdn/mcp-server-ppt?style=flat&logo=github&label=Star)](https://github.com/trsdn/mcp-server-ppt/stargazers) | 文本/想法 / Office 文档 / 数据/表格 | MCP Server / API/SDK/库 | PPT/演示文稿 / SVG/PNG/PDF / 视频/音频 / 图表/仪表盘 | MCP Client / 本地语言环境 / 渲染/导出 / 系统工具 |
| [ppt-mcp](https://github.com/ykuwai/ppt-mcp) [![Star](https://img.shields.io/github/stars/ykuwai/ppt-mcp?style=flat&logo=github&label=Star)](https://github.com/ykuwai/ppt-mcp/stargazers) | 文本/想法 / Office 文档 / 数据/表格 | MCP Server | PPT/演示文稿 / SVG/PNG/PDF / 图表/仪表盘 | MCP Client / 本地语言环境 / 渲染/导出 / 系统工具 / 模板/素材 |
| [Alai MCP Server](https://github.com/getalai/alai-mcp-server) [![Star](https://img.shields.io/github/stars/getalai/alai-mcp-server?style=flat&logo=github&label=Star)](https://github.com/getalai/alai-mcp-server/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | MCP Server / 产品/SaaS | PPT/演示文稿 / SVG/PNG/PDF | MCP Client / 浏览器/账号 / 渲染/导出 / 模板/素材 |
| [Presentations.AI MCP Server](https://github.com/slidecraft-in/presentations-ai-mcp-server) [![Star](https://img.shields.io/github/stars/slidecraft-in/presentations-ai-mcp-server?style=flat&logo=github&label=Star)](https://github.com/slidecraft-in/presentations-ai-mcp-server/stargazers) | 文本/想法 / PDF/文档 / Office 文档 / 网页/搜索结果 | MCP Server / 产品/SaaS | PPT/演示文稿 / SVG/PNG/PDF | MCP Client / 浏览器/账号 / 文档解析/OCR / 渲染/导出 / 模板/素材 |
| [Figma Console MCP](https://github.com/southleft/figma-console-mcp) [![Star](https://img.shields.io/github/stars/southleft/figma-console-mcp?style=flat&logo=github&label=Star)](https://github.com/southleft/figma-console-mcp/stargazers) | 文本/想法 / 代码/技术描述 / 数据/表格 | MCP Server | PPT/演示文稿 / 白板/思维导图 / 架构图/流程图 / SVG/PNG/PDF | MCP Client / 浏览器/账号 / 本地语言环境 / 渲染/导出 / 系统工具 |
| [google-slides-mcp](https://github.com/matteoantoci/google-slides-mcp) [![Star](https://img.shields.io/github/stars/matteoantoci/google-slides-mcp?style=flat&logo=github&label=Star)](https://github.com/matteoantoci/google-slides-mcp/stargazers) | 文本/想法 / Office 文档 | MCP Server | PPT/演示文稿 | MCP Client / 本地语言环境 / 浏览器/账号 / 渲染/导出 |
| [DocGem MCP](https://github.com/xpm-cmd/docgem-mcp) [![Star](https://img.shields.io/github/stars/xpm-cmd/docgem-mcp?style=flat&logo=github&label=Star)](https://github.com/xpm-cmd/docgem-mcp/stargazers) | 文本/想法 / Office 文档 / 数据/表格 / DSL/代码 | MCP Server | PPT/演示文稿 / 报告/长文档 / 图表/Mermaid / 架构图/流程图 / SVG/PNG/PDF / 结构化数据/Markdown | MCP Client / Agent 宿主 / 本地语言环境 / 渲染/导出 / 系统工具 |
| [mcp-ppt](https://github.com/ltc6539/mcp-ppt) [![Star](https://img.shields.io/github/stars/ltc6539/mcp-ppt?style=flat&logo=github&label=Star)](https://github.com/ltc6539/mcp-ppt/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | MCP Server | PPT/演示文稿 / SVG/PNG/PDF | MCP Client / 本地语言环境 / 渲染/导出 |
| [slide-mcp](https://github.com/Rikuto-des/slide-mcp) [![Star](https://img.shields.io/github/stars/Rikuto-des/slide-mcp?style=flat&logo=github&label=Star)](https://github.com/Rikuto-des/slide-mcp/stargazers) | 文本/想法 / 数据/表格 / DSL/代码 | MCP Server / 开源应用/框架 | PPT/演示文稿 / 图表/仪表盘 / SVG/PNG/PDF | MCP Client / 浏览器/账号 / 本地语言环境 / 模型 API / 渲染/导出 / 模板/素材 |
| [figma-slides-mcp](https://github.com/luan007/figma-slides-mcp) [![Star](https://img.shields.io/github/stars/luan007/figma-slides-mcp?style=flat&logo=github&label=Star)](https://github.com/luan007/figma-slides-mcp/stargazers) | 文本/想法 / 数据/表格 / DSL/代码 | MCP Server / Agent Skill | PPT/演示文稿 / 图表/仪表盘 / 架构图/流程图 / SVG/PNG/PDF | MCP Client / 浏览器/账号 / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [figma-use-slides](https://github.com/figma/mcp-server-guide/blob/main/skills/figma-use-slides/SKILL.md) [![Star](https://img.shields.io/github/stars/figma/mcp-server-guide?style=flat&logo=github&label=Star)](https://github.com/figma/mcp-server-guide/stargazers) | 文本/想法 / Office 文档 / 数据/表格 / 网页/搜索结果 | Agent Skill / MCP Server | PPT/演示文稿 / 网页/交互页面 / SVG/PNG/PDF | MCP Client / 浏览器/账号 / Agent 宿主 / 渲染/导出 / 模板/素材 |
| [pptx-tools](https://github.com/jongalloway/pptx-tools) [![Star](https://img.shields.io/github/stars/jongalloway/pptx-tools?style=flat&logo=github&label=Star)](https://github.com/jongalloway/pptx-tools/stargazers) | 文本/想法 / Office 文档 | MCP Server / API/SDK/库 | PPT/演示文稿 / 结构化数据/Markdown | MCP Client / 本地语言环境 / 渲染/导出 / 系统工具 / 模板/素材 |
| [che-pptx-mcp](https://github.com/PsychQuant/che-pptx-mcp) [![Star](https://img.shields.io/github/stars/PsychQuant/che-pptx-mcp?style=flat&logo=github&label=Star)](https://github.com/PsychQuant/che-pptx-mcp/stargazers) | 文本/想法 / Office 文档 | MCP Server | PPT/演示文稿 / 结构化数据/Markdown / SVG/PNG/PDF | MCP Client / 本地语言环境 / 渲染/导出 / 系统工具 |
| [Marp MCP](https://github.com/masaki39/marp-mcp) [![Star](https://img.shields.io/github/stars/masaki39/marp-mcp?style=flat&logo=github&label=Star)](https://github.com/masaki39/marp-mcp/stargazers) | 文本/想法 / DSL/代码 | MCP Server / Agent Skill | PPT/演示文稿 / 网页/交互页面 | MCP Client / Agent 宿主 / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [Marp Slide Creator](https://github.com/softaworks/agent-toolkit/blob/main/skills/marp-slide/README.md) [![Star](https://img.shields.io/github/stars/softaworks/agent-toolkit?style=flat&logo=github&label=Star)](https://github.com/softaworks/agent-toolkit/stargazers) | 文本/想法 / DSL/代码 | Agent Skill | PPT/演示文稿 / 网页/交互页面 / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [marp-slides](https://github.com/robonuggets/marp-slides) [![Star](https://img.shields.io/github/stars/robonuggets/marp-slides?style=flat&logo=github&label=Star)](https://github.com/robonuggets/marp-slides/stargazers) | 文本/想法 / 数据/表格 / DSL/代码 | Agent Skill | PPT/演示文稿 / 图表/仪表盘 / 网页/交互页面 / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [PptxGenJS-mcp-server](https://github.com/Hrithik-s-Raj/PptxGenJS-mcp-server) [![Star](https://img.shields.io/github/stars/Hrithik-s-Raj/PptxGenJS-mcp-server?style=flat&logo=github&label=Star)](https://github.com/Hrithik-s-Raj/PptxGenJS-mcp-server/stargazers) | 文本/想法 / 数据/表格 | MCP Server | PPT/演示文稿 / 图表/仪表盘 | MCP Client / Agent 宿主 / 本地语言环境 / 渲染/导出 |
| [md-slides](https://github.com/zl190/md-slides) [![Star](https://img.shields.io/github/stars/zl190/md-slides?style=flat&logo=github&label=Star)](https://github.com/zl190/md-slides/stargazers) | 文本/想法 / DSL/代码 | Agent Skill | PPT/演示文稿 / 网页/交互页面 / 架构图/流程图 | Agent 宿主 / 本地语言环境 / 模型 API / 渲染/导出 / 模板/素材 |
| [md2html](https://github.com/ogermer/md2html) [![Star](https://img.shields.io/github/stars/ogermer/md2html?style=flat&logo=github&label=Star)](https://github.com/ogermer/md2html/stargazers) | 文本/想法 / DSL/代码 | Agent Skill | PPT/演示文稿 / 网页/交互页面 / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [deckset-claude-skill](https://github.com/doudou1337/deckset-claude-skill) [![Star](https://img.shields.io/github/stars/doudou1337/deckset-claude-skill?style=flat&logo=github&label=Star)](https://github.com/doudou1337/deckset-claude-skill/stargazers) | 文本/想法 / DSL/代码 | Agent Skill | PPT/演示文稿 | Agent 宿主 / 本地语言环境 / 模型 API / 渲染/导出 / 模板/素材 |
| [pptx-from-layouts-skill](https://github.com/tristan-mcinnis/pptx-from-layouts-skill) [![Star](https://img.shields.io/github/stars/tristan-mcinnis/pptx-from-layouts-skill?style=flat&logo=github&label=Star)](https://github.com/tristan-mcinnis/pptx-from-layouts-skill/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | Agent Skill | PPT/演示文稿 | Agent 宿主 / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [hands-on-deck](https://github.com/EveryInc/hands-on-deck) [![Star](https://img.shields.io/github/stars/EveryInc/hands-on-deck?style=flat&logo=github&label=Star)](https://github.com/EveryInc/hands-on-deck/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | Agent Skill | PPT/演示文稿 | Agent 宿主 / 本地语言环境 / 渲染/导出 |
| [agent-slides](https://github.com/mpuig/agent-slides) [![Star](https://img.shields.io/github/stars/mpuig/agent-slides?style=flat&logo=github&label=Star)](https://github.com/mpuig/agent-slides/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | Agent Skill | PPT/演示文稿 | Agent 宿主 / 本地语言环境 / 模型 API / 渲染/导出 / 模板/素材 |
| [ultimate-ppt-master-skill](https://github.com/kdnsna/ultimate-ppt-master-skill) [![Star](https://img.shields.io/github/stars/kdnsna/ultimate-ppt-master-skill?style=flat&logo=github&label=Star)](https://github.com/kdnsna/ultimate-ppt-master-skill/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | Agent Skill | PPT/演示文稿 | Agent 宿主 / 本地语言环境 / 模型 API / 渲染/导出 / 模板/素材 |
| [codex-ppt-skill](https://github.com/ningzimu/codex-ppt-skill) [![Star](https://img.shields.io/github/stars/ningzimu/codex-ppt-skill?style=flat&logo=github&label=Star)](https://github.com/ningzimu/codex-ppt-skill/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | Agent Skill | PPT/演示文稿 | Agent 宿主 / 本地语言环境 / 模型 API / 渲染/导出 / 模板/素材 |
| [presentation-skills](https://github.com/pamelafox/presentation-skills) [![Star](https://img.shields.io/github/stars/pamelafox/presentation-skills?style=flat&logo=github&label=Star)](https://github.com/pamelafox/presentation-skills/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | Skill 集合 | PPT/演示文稿 | Agent 宿主 / 本地语言环境 / 渲染/导出 |
| [anthropics/skills](https://github.com/anthropics/skills) [![Star](https://img.shields.io/github/stars/anthropics/skills?style=flat&logo=github&label=Star)](https://github.com/anthropics/skills/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | Skill 集合 | PPT/演示文稿 | Agent 宿主 / 本地语言环境 / 文档解析/OCR / 渲染/导出 |
| [MiniMax-AI/skills](https://github.com/MiniMax-AI/skills) [![Star](https://img.shields.io/github/stars/MiniMax-AI/skills?style=flat&logo=github&label=Star)](https://github.com/MiniMax-AI/skills/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | Skill 集合 | PPT/演示文稿 | Agent 宿主 / 本地语言环境 / 模型 API / 渲染/导出 |
| [daymade/claude-code-skills](https://github.com/daymade/claude-code-skills) [![Star](https://img.shields.io/github/stars/daymade/claude-code-skills?style=flat&logo=github&label=Star)](https://github.com/daymade/claude-code-skills/stargazers) | 文本/想法 / PDF/文档 / Office 文档 / DSL/代码 | Skill 集合 | PPT/演示文稿 / 图表/Mermaid / SVG/PNG/PDF / 结构化数据/Markdown | Agent 宿主 / 本地语言环境 / 渲染/导出 / 系统工具 / 文档解析/OCR |
| [slide-design-skill](https://github.com/SlideSpeak/slide-design-skill) [![Star](https://img.shields.io/github/stars/SlideSpeak/slide-design-skill?style=flat&logo=github&label=Star)](https://github.com/SlideSpeak/slide-design-skill/stargazers) | 文本/想法 / 网页/搜索结果 / 数据/表格 | Agent Skill | PPT/演示文稿 / 网页/交互页面 / 图表/仪表盘 / 信息图/视觉报告 | Agent 宿主 / 本地语言环境 / 模型 API / 渲染/导出 / 模板/素材 |
| [html-slides](https://github.com/bluedusk/html-slides) [![Star](https://img.shields.io/github/stars/bluedusk/html-slides?style=flat&logo=github&label=Star)](https://github.com/bluedusk/html-slides/stargazers) | 文本/想法 / Office 文档 / DSL/代码 | Agent Skill | PPT/演示文稿 / 网页/交互页面 | Agent 宿主 / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [pptx-mcp-live](https://github.com/ykarapazar/pptx-mcp-live) [![Star](https://img.shields.io/github/stars/ykarapazar/pptx-mcp-live?style=flat&logo=github&label=Star)](https://github.com/ykarapazar/pptx-mcp-live/stargazers) | 文本/想法 / Office 文档 / 数据/表格 | MCP Server | PPT/演示文稿 / SVG/PNG/PDF | MCP Client / 本地语言环境 / 渲染/导出 / 系统工具 |
| [claude-skill-academic-ppt](https://github.com/PHY041/claude-skill-academic-ppt) [![Star](https://img.shields.io/github/stars/PHY041/claude-skill-academic-ppt?style=flat&logo=github&label=Star)](https://github.com/PHY041/claude-skill-academic-ppt/stargazers) | 论文/科研资料 / PDF/文档 / 文本/想法 / DSL/代码 | Agent Skill | PPT/演示文稿 / 图形摘要/信息图 | Agent 宿主 / 本地语言环境 / 模型 API / 文档解析/OCR / 渲染/导出 / 模板/素材 |
| [ppt-skills](https://github.com/danny0926/ppt-skills) [![Star](https://img.shields.io/github/stars/danny0926/ppt-skills?style=flat&logo=github&label=Star)](https://github.com/danny0926/ppt-skills/stargazers) | 文本/想法 / 数据/表格 | Agent Skill | PPT/演示文稿 / 信息图/视觉报告 / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [typst-claude-skill](https://github.com/ChanMeng666/typst-claude-skill) [![Star](https://img.shields.io/github/stars/ChanMeng666/typst-claude-skill?style=flat&logo=github&label=Star)](https://github.com/ChanMeng666/typst-claude-skill/stargazers) | 文本/想法 / PDF/文档 / 论文/科研资料 / DSL/代码 | Agent Skill | 报告/长文档 / PPT/演示文稿 / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [LobsterAI](https://github.com/netease-youdao/LobsterAI) [![Star](https://img.shields.io/github/stars/netease-youdao/LobsterAI?style=flat&logo=github&label=Star)](https://github.com/netease-youdao/LobsterAI/stargazers) | 任意/多源 / PDF/文档 / Office 文档 / 网页/搜索结果 / 数据/表格 | 开源应用/框架 / Bot/助手 | PPT/演示文稿 / 报告/长文档 / 网页/交互页面 / 图表/仪表盘 / 视频/音频 | Agent 宿主 / 本地语言环境 / 模型 API / MCP Client / 系统工具 / 外部检索/数据源 / 渲染/导出 / 存储/索引 |
| [Garden Skills](https://github.com/ConardLi/garden-skills) [![Star](https://img.shields.io/github/stars/ConardLi/garden-skills?style=flat&logo=github&label=Star)](https://github.com/ConardLi/garden-skills/stargazers) | 任意/多源 / PDF/文档 / 网页/搜索结果 / 文本/想法 / 数据/表格 | Skill 集合 | PPT/演示文稿 / 网页/交互页面 / 报告/长文档 / 信息图/视觉报告 / 图表/仪表盘 / 视频/音频 | Agent 宿主 / 本地语言环境 / 模型 API / 渲染/导出 / 模板/素材 |
| [ai-agents-skills](https://github.com/hoodini/ai-agents-skills) [![Star](https://img.shields.io/github/stars/hoodini/ai-agents-skills?style=flat&logo=github&label=Star)](https://github.com/hoodini/ai-agents-skills/stargazers) | 任意/多源 / 文本/想法 / 网页/搜索结果 / 代码/技术描述 | Skill 集合 | PPT/演示文稿 / 网页/交互页面 / 视频/音频 / 图表/Mermaid / 图形摘要/信息图 | Agent 宿主 / 本地语言环境 / 模型 API / 系统工具 / 渲染/导出 / 模板/素材 |
| [keynote-slides-skill](https://github.com/dbmcco/keynote-slides-skill) [![Star](https://img.shields.io/github/stars/dbmcco/keynote-slides-skill?style=flat&logo=github&label=Star)](https://github.com/dbmcco/keynote-slides-skill/stargazers) | 文本/想法 / 数据/表格 / 网页/搜索结果 | Agent Skill | PPT/演示文稿 / 网页/交互页面 / 信息图/视觉报告 | Agent 宿主 / 本地语言环境 / 模型 API / 渲染/导出 / 模板/素材 |
| [Claude Office Skills](https://github.com/claude-office-skills/skills) [![Star](https://img.shields.io/github/stars/claude-office-skills/skills?style=flat&logo=github&label=Star)](https://github.com/claude-office-skills/skills/stargazers) | Office 文档 / PDF/文档 / 文本/想法 / 数据/表格 | Skill 集合 / MCP Server | PPT/演示文稿 / 报告/长文档 / SVG/PNG/PDF / 结构化数据/Markdown | Agent 宿主 / 本地语言环境 / MCP Client / 系统工具 / 文档解析/OCR / 渲染/导出 / 模板/素材 |
| [guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill) [![Star](https://img.shields.io/github/stars/op7418/guizang-ppt-skill?style=flat&logo=github&label=Star)](https://github.com/op7418/guizang-ppt-skill/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 / 数据/表格 | Agent Skill | PPT/演示文稿 / 网页/交互页面 / 信息图/视觉报告 / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / 模型 API / 渲染/导出 / 模板/素材 |
| [gpt-image2-ppt-skills](https://github.com/JuneYaooo/gpt-image2-ppt-skills) [![Star](https://img.shields.io/github/stars/JuneYaooo/gpt-image2-ppt-skills?style=flat&logo=github&label=Star)](https://github.com/JuneYaooo/gpt-image2-ppt-skills/stargazers) | 文本/想法 / Office 文档 / 网页/搜索结果 | Agent Skill | PPT/演示文稿 / 信息图/视觉报告 / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / 模型 API / 渲染/导出 / 模板/素材 |
| [ppt-image-first](https://github.com/NyxTides/ppt-image-first) [![Star](https://img.shields.io/github/stars/NyxTides/ppt-image-first?style=flat&logo=github&label=Star)](https://github.com/NyxTides/ppt-image-first/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | Agent Skill | PPT/演示文稿 / 信息图/视觉报告 | Agent 宿主 / 本地语言环境 / 模型 API / 渲染/导出 / 模板/素材 |
| [Skywork-Skills](https://github.com/SkyworkAI/Skywork-Skills) [![Star](https://img.shields.io/github/stars/SkyworkAI/Skywork-Skills?style=flat&logo=github&label=Star)](https://github.com/SkyworkAI/Skywork-Skills/stargazers) | 任意/多源 / 文本/想法 / PDF/文档 / 数据/表格 | Skill 集合 | PPT/演示文稿 / 报告/长文档 / 图表/仪表盘 / 信息图/视觉报告 / 视频/音频 | Agent 宿主 / 本地语言环境 / 模型 API / 渲染/导出 / 模板/素材 |
| [slide-deck-generator](https://github.com/code-on-sunday/slide-deck-generator) [![Star](https://img.shields.io/github/stars/code-on-sunday/slide-deck-generator?style=flat&logo=github&label=Star)](https://github.com/code-on-sunday/slide-deck-generator/stargazers) | 文本/想法 / DSL/代码 | Agent Skill | PPT/演示文稿 / 网页/交互页面 | Agent 宿主 / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [codex-claude-academic-skills](https://github.com/zLanqing/codex-claude-academic-skills) [![Star](https://img.shields.io/github/stars/zLanqing/codex-claude-academic-skills?style=flat&logo=github&label=Star)](https://github.com/zLanqing/codex-claude-academic-skills/stargazers) | 论文/科研资料 / PDF/文档 / Office 文档 / 数据/表格 | Skill 集合 | PPT/演示文稿 / 报告/长文档 / 图表/仪表盘 / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / 模型 API / 文档解析/OCR / 渲染/导出 / 模板/素材 |
| [Gamma](https://gamma.app/) | 文本/想法 / PDF/文档 / 网页/搜索结果 | 产品/SaaS | PPT/演示文稿 | 浏览器/账号 / 模板/素材 |
| [SlideSpeak](https://slidespeak.co/) | 文本/想法 / PDF/文档 / 网页/搜索结果 | 产品/SaaS | PPT/演示文稿 | 浏览器/账号 / 文档解析/OCR / 模板/素材 |
| [slidespeak-mcp](https://github.com/SlideSpeak/slidespeak-mcp) [![Star](https://img.shields.io/github/stars/SlideSpeak/slidespeak-mcp?style=flat&logo=github&label=Star)](https://github.com/SlideSpeak/slidespeak-mcp/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 | MCP Server / 产品/SaaS | PPT/演示文稿 | MCP Client / 浏览器/账号 / 模型 API / 渲染/导出 / 模板/素材 |
| [Canva AI Presentations](https://www.canva.com/create/ai-presentations/) | 文本/想法 / PDF/文档 / 网页/搜索结果 | 产品/SaaS | PPT/演示文稿 | 浏览器/账号 / 模板/素材 |
| [Presentations.AI](https://www.presentations.ai/) | 文本/想法 / PDF/文档 / 网页/搜索结果 | 产品/SaaS | PPT/演示文稿 | 浏览器/账号 / 文档解析/OCR / 模板/素材 |
| [Beautiful.ai](https://www.beautiful.ai/presentation-maker) | 文本/想法 / PDF/文档 / 网页/搜索结果 | 产品/SaaS | PPT/演示文稿 | 浏览器/账号 / 模板/素材 |
| [Decktopus](https://www.decktopus.com/) | 文本/想法 / PDF/文档 / 网页/搜索结果 | 产品/SaaS | PPT/演示文稿 | 浏览器/账号 / 模板/素材 |
| [PPT.AI](https://ppt.ai/) | 文本/想法 / PDF/文档 / 网页/搜索结果 | 产品/SaaS | PPT/演示文稿 | 浏览器/账号 / 文档解析/OCR / 模板/素材 |
| [Slidesgo AI Presentation Maker](https://slidesgo.com/ai/presentation-maker) | 文本/想法 / PDF/文档 / 网页/搜索结果 | 产品/SaaS | PPT/演示文稿 | 浏览器/账号 / 模板/素材 |
| [Microsoft Copilot in PowerPoint](https://powerpoint.cloud.microsoft/create/en/ai-presentation-maker/) | 文本/想法 / PDF/文档 / 网页/搜索结果 | 产品/SaaS / Bot/助手 | PPT/演示文稿 | 浏览器/账号 / 系统工具 / 模板/素材 |
| [Adobe Express AI Presentation Maker](https://www.adobe.com/express/create/ai/presentation) | 文本/想法 / PDF/文档 / 网页/搜索结果 | 产品/SaaS | PPT/演示文稿 | 浏览器/账号 / 模板/素材 |

## 辅助、前后处理与小工具

这一部分放更小、更底层或更专门的工具。它们不一定独立完成整条内容生产链，但经常是 Agent 工作流里的关键组件。

### PDF、文档解析与结构化抽取

前处理工具：把 PDF、论文、Office 或扫描件转成 Markdown、JSON、layout、表格和 OCR 结果。

| 项目 | 信息来源 | 工具形态 | 产出物形式 | 依赖类型 |
| --- | --- | --- | --- | --- |
| [MinerU](https://github.com/opendatalab/MinerU) [![Star](https://img.shields.io/github/stars/opendatalab/MinerU?style=flat&logo=github&label=Star)](https://github.com/opendatalab/MinerU/stargazers) | PDF/文档 / Office 文档 / 论文/科研资料 | 开源应用/框架 | 结构化数据/Markdown | 本地语言环境 / 文档解析/OCR / GPU/加速器 |
| [Docling](https://github.com/docling-project/docling) [![Star](https://img.shields.io/github/stars/docling-project/docling?style=flat&logo=github&label=Star)](https://github.com/docling-project/docling/stargazers) | PDF/文档 / Office 文档 / 论文/科研资料 | 开源应用/框架 | 结构化数据/Markdown | 本地语言环境 / 文档解析/OCR |
| [MarkItDown](https://github.com/microsoft/markitdown) [![Star](https://img.shields.io/github/stars/microsoft/markitdown?style=flat&logo=github&label=Star)](https://github.com/microsoft/markitdown/stargazers) | PDF/文档 / Office 文档 / 网页/搜索结果 | API/SDK/库 | 结构化数据/Markdown | 本地语言环境 / 文档解析/OCR / 模型 API |
| [MarkSight](https://github.com/Rinava/MarkSight) [![Star](https://img.shields.io/github/stars/Rinava/MarkSight?style=flat&logo=github&label=Star)](https://github.com/Rinava/MarkSight/stargazers) | 文本/想法 / PDF/文档 / DSL/代码 | 开源应用/框架 / MCP Server | 结构化数据/Markdown / 网页/交互页面 / 图表/Mermaid / SVG/PNG/PDF | MCP Client / 本地语言环境 / 渲染/导出 |
| [Marker](https://github.com/datalab-to/marker) [![Star](https://img.shields.io/github/stars/datalab-to/marker?style=flat&logo=github&label=Star)](https://github.com/datalab-to/marker/stargazers) | PDF/文档 / Office 文档 / 论文/科研资料 | 开源应用/框架 | 结构化数据/Markdown | 本地语言环境 / 文档解析/OCR / GPU/加速器 |
| [Unstructured](https://github.com/Unstructured-IO/unstructured) [![Star](https://img.shields.io/github/stars/Unstructured-IO/unstructured?style=flat&logo=github&label=Star)](https://github.com/Unstructured-IO/unstructured/stargazers) | PDF/文档 / Office 文档 / 论文/科研资料 | 开源应用/框架 | 结构化数据/Markdown | 本地语言环境 / 文档解析/OCR |
| [GROBID](https://github.com/grobidOrg/grobid) [![Star](https://img.shields.io/github/stars/grobidOrg/grobid?style=flat&logo=github&label=Star)](https://github.com/grobidOrg/grobid/stargazers) | PDF/文档 / Office 文档 / 论文/科研资料 | 开源应用/框架 | 结构化数据/Markdown | 本地语言环境 / 系统工具 / 文档解析/OCR |
| [PaperMage](https://github.com/allenai/papermage) [![Star](https://img.shields.io/github/stars/allenai/papermage?style=flat&logo=github&label=Star)](https://github.com/allenai/papermage/stargazers) | PDF/文档 / Office 文档 / 论文/科研资料 | API/SDK/库 | 结构化数据/Markdown | 本地语言环境 / 文档解析/OCR |
| [s2orc-doc2json](https://github.com/allenai/s2orc-doc2json) [![Star](https://img.shields.io/github/stars/allenai/s2orc-doc2json?style=flat&logo=github&label=Star)](https://github.com/allenai/s2orc-doc2json/stargazers) | PDF/文档 / Office 文档 / 论文/科研资料 | 开源应用/框架 | 结构化数据/Markdown | 本地语言环境 / 文档解析/OCR |

### 思维导图专项工具

相对小而聚焦的工具：专门把文档、网页、视频、威胁情报或文本转成思维导图。

| 项目 | 信息来源 | 工具形态 | 产出物形式 | 依赖类型 |
| --- | --- | --- | --- | --- |
| [TI-Mindmap-GPT](https://github.com/format81/TI-Mindmap-GPT) [![Star](https://img.shields.io/github/stars/format81/TI-Mindmap-GPT?style=flat&logo=github&label=Star)](https://github.com/format81/TI-Mindmap-GPT/stargazers) | 新闻/资讯 / 网页/搜索结果 / PDF/文档 | 开源应用/框架 | 思维导图/知识地图 / 报告/长文档 / 表格/时间线 | 本地语言环境 / 模型 API / 文档解析/OCR / 渲染/导出 / 外部检索/数据源 |
| [mindmap-generator](https://github.com/Dicklesworthstone/mindmap-generator) [![Star](https://img.shields.io/github/stars/Dicklesworthstone/mindmap-generator?style=flat&logo=github&label=Star)](https://github.com/Dicklesworthstone/mindmap-generator/stargazers) | PDF/文档 / 网页/搜索结果 / 知识库/个人资料 | 开源应用/框架 | 思维导图/知识地图 | 本地语言环境 / 模型 API / 文档解析/OCR / 渲染/导出 |
| [Mapify](https://mapify.so/) | PDF/文档 / 网页/搜索结果 / 知识库/个人资料 | 产品/SaaS | 思维导图/知识地图 | 浏览器/账号 / 文档解析/OCR / 模板/素材 |
| [Mapify MCP Server](https://github.com/xmindltd/mapify-mcp-server) [![Star](https://img.shields.io/github/stars/xmindltd/mapify-mcp-server?style=flat&logo=github&label=Star)](https://github.com/xmindltd/mapify-mcp-server/stargazers) | 文本/想法 / PDF/文档 / 网页/搜索结果 / 任意/多源 | MCP Server / 产品/SaaS | 思维导图/知识地图 | MCP Client / 浏览器/账号 / 模型 API / 外部检索/数据源 / 模板/素材 |
| [mindmapio-mcp](https://github.com/MohGanji/mindmapio-mcp) [![Star](https://img.shields.io/github/stars/MohGanji/mindmapio-mcp?style=flat&logo=github&label=Star)](https://github.com/MohGanji/mindmapio-mcp/stargazers) | 文本/想法 / 网页/搜索结果 / 知识库/个人资料 / 任意/多源 | MCP Server / Agent Skill / 产品/SaaS | 思维导图/知识地图 / 问答/学习材料 | MCP Client / Agent 宿主 / 浏览器/账号 / 本地语言环境 / 外部检索/数据源 |
| [mind-map-mcp](https://github.com/sawyer-shi/mind-map-mcp) [![Star](https://img.shields.io/github/stars/sawyer-shi/mind-map-mcp?style=flat&logo=github&label=Star)](https://github.com/sawyer-shi/mind-map-mcp/stargazers) | 文本/想法 / PDF/文档 / 知识库/个人资料 | MCP Server / 开源应用/框架 | 思维导图/知识地图 / SVG/PNG/PDF | MCP Client / 本地语言环境 / 渲染/导出 |
| [mindmap-mcp-server](https://github.com/YuChenSSR/mindmap-mcp-server) [![Star](https://img.shields.io/github/stars/YuChenSSR/mindmap-mcp-server?style=flat&logo=github&label=Star)](https://github.com/YuChenSSR/mindmap-mcp-server/stargazers) | 文本/想法 / PDF/文档 / 知识库/个人资料 | MCP Server | 思维导图/知识地图 / 网页/交互页面 | MCP Client / 本地语言环境 / 渲染/导出 |
| [Obsidian Visual Skills Pack](https://github.com/axtonliu/axton-obsidian-visual-skills) [![Star](https://img.shields.io/github/stars/axtonliu/axton-obsidian-visual-skills?style=flat&logo=github&label=Star)](https://github.com/axtonliu/axton-obsidian-visual-skills/stargazers) | 文本/想法 / 知识库/个人资料 / 代码/技术描述 | Skill 集合 | 白板/思维导图 / 图表/Mermaid / 架构图/流程图 | Agent 宿主 / 本地语言环境 / 渲染/导出 / 存储/索引 |
| [MindRepo](https://github.com/NguyenVu04/mind-repo) [![Star](https://img.shields.io/github/stars/NguyenVu04/mind-repo?style=flat&logo=github&label=Star)](https://github.com/NguyenVu04/mind-repo/stargazers) | PDF/文档 / 知识库/个人资料 / 论文/科研资料 | 开源应用/框架 | 思维导图/知识地图 / 问答/学习材料 / 报告/简报 | 本地语言环境 / 模型 API / 文档解析/OCR / 存储/索引 |

### 图表、Mermaid 与渲染组件

后处理/渲染工具：让 Agent 更容易生成、验证或导出 Mermaid、SVG、PNG、PDF 等图表产物。

| 项目 | 信息来源 | 工具形态 | 产出物形式 | 依赖类型 |
| --- | --- | --- | --- | --- |
| [Mermaid](https://github.com/mermaid-js/mermaid) [![Star](https://img.shields.io/github/stars/mermaid-js/mermaid?style=flat&logo=github&label=Star)](https://github.com/mermaid-js/mermaid/stargazers) | DSL/代码 | API/SDK/库 | 图表/Mermaid / SVG/PNG/PDF | 渲染/导出 |
| [mermaid-js-ai-agent](https://github.com/disler/mermaid-js-ai-agent) [![Star](https://img.shields.io/github/stars/disler/mermaid-js-ai-agent?style=flat&logo=github&label=Star)](https://github.com/disler/mermaid-js-ai-agent/stargazers) | 文本/想法 / 代码/技术描述 | 开源应用/框架 | 图表/Mermaid / SVG/PNG/PDF | 本地语言环境 / 模型 API / 渲染/导出 |
| [mermaid-skill](https://github.com/Agents365-ai/mermaid-skill) [![Star](https://img.shields.io/github/stars/Agents365-ai/mermaid-skill?style=flat&logo=github&label=Star)](https://github.com/Agents365-ai/mermaid-skill/stargazers) | 文本/想法 / 代码/技术描述 | Agent Skill | 图表/Mermaid / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / 模型 API / 渲染/导出 |
| [Mermaid Skill for Claude Code](https://github.com/WH-2099/mermaid-skill) [![Star](https://img.shields.io/github/stars/WH-2099/mermaid-skill?style=flat&logo=github&label=Star)](https://github.com/WH-2099/mermaid-skill/stargazers) | 文本/想法 / 代码/技术描述 / DSL/代码 | Agent Skill | 图表/Mermaid / 架构图/流程图 / 白板/思维导图 / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / 渲染/导出 |
| [Pretty-mermaid-skills](https://github.com/imxv/Pretty-mermaid-skills) [![Star](https://img.shields.io/github/stars/imxv/Pretty-mermaid-skills?style=flat&logo=github&label=Star)](https://github.com/imxv/Pretty-mermaid-skills/stargazers) | 文本/想法 / 代码/技术描述 | Agent Skill | 图表/Mermaid / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / 渲染/导出 |
| [agent-toolkit mermaid diagrams](https://github.com/softaworks/agent-toolkit) [![Star](https://img.shields.io/github/stars/softaworks/agent-toolkit?style=flat&logo=github&label=Star)](https://github.com/softaworks/agent-toolkit/stargazers) | 文本/想法 / 代码/技术描述 | Skill 集合 | 图表/Mermaid / SVG/PNG/PDF | Agent 宿主 / 模型 API / 渲染/导出 |
| [beautiful-mermaid](https://github.com/lukilabs/beautiful-mermaid) [![Star](https://img.shields.io/github/stars/lukilabs/beautiful-mermaid?style=flat&logo=github&label=Star)](https://github.com/lukilabs/beautiful-mermaid/stargazers) | DSL/代码 | API/SDK/库 | 图表/Mermaid / SVG/PNG/PDF | 本地语言环境 / 渲染/导出 |
| [LLMermaid](https://github.com/fladdict/llmermaid) [![Star](https://img.shields.io/github/stars/fladdict/llmermaid?style=flat&logo=github&label=Star)](https://github.com/fladdict/llmermaid/stargazers) | 文本/想法 / 代码/技术描述 | 研究原型 | 图表/Mermaid / SVG/PNG/PDF | 本地语言环境 / 模型 API / 渲染/导出 |
| [GenAIScript](https://github.com/microsoft/genaiscript) [![Star](https://img.shields.io/github/stars/microsoft/genaiscript?style=flat&logo=github&label=Star)](https://github.com/microsoft/genaiscript/stargazers) | PDF/文档 / 数据/表格 / 代码库 / DSL/代码 | API/SDK/库 | 图表/Mermaid / 结构化数据/Markdown | 本地语言环境 / 模型 API / 文档解析/OCR / 渲染/导出 |
| [mcp-mermaid](https://github.com/hustcc/mcp-mermaid) [![Star](https://img.shields.io/github/stars/hustcc/mcp-mermaid?style=flat&logo=github&label=Star)](https://github.com/hustcc/mcp-mermaid/stargazers) | 文本/想法 / 代码/技术描述 / DSL/代码 | MCP Server | 图表/Mermaid / SVG/PNG/PDF | MCP Client / 本地语言环境 / 渲染/导出 |
| [mermaider](https://github.com/vtomilin/mermaider) [![Star](https://img.shields.io/github/stars/vtomilin/mermaider?style=flat&logo=github&label=Star)](https://github.com/vtomilin/mermaider/stargazers) | DSL/代码 / 代码/技术描述 | MCP Server | 图表/Mermaid / 图表/渲染输出 | MCP Client / 本地语言环境 / 渲染/导出 / 系统工具 |
| [Mermaid Live MCP Server](https://github.com/TakanariShimbo/mermaid-live-mcp-server/blob/main/docs/README.md?plain=1) [![Star](https://img.shields.io/github/stars/TakanariShimbo/mermaid-live-mcp-server?style=flat&logo=github&label=Star)](https://github.com/TakanariShimbo/mermaid-live-mcp-server/stargazers) | 文本/想法 / 代码/技术描述 / DSL/代码 | MCP Server | 图表/Mermaid / 架构图/流程图 / SVG/PNG/PDF | MCP Client / 本地语言环境 / 渲染/导出 |
| [Mermaid PowerPoint Add-in](https://github.com/accionlabs/mermaid-powerpoint-addin) [![Star](https://img.shields.io/github/stars/accionlabs/mermaid-powerpoint-addin?style=flat&logo=github&label=Star)](https://github.com/accionlabs/mermaid-powerpoint-addin/stargazers) | DSL/代码 / 文本/想法 | 开源应用/框架 | PPT/演示文稿 / 图表/Mermaid / 架构图/流程图 / SVG/PNG/PDF | 浏览器/账号 / 本地语言环境 / 渲染/导出 / 系统工具 |
| [gemini-diagram-mcp](https://github.com/arunsanna/gemini-diagram-mcp) [![Star](https://img.shields.io/github/stars/arunsanna/gemini-diagram-mcp?style=flat&logo=github&label=Star)](https://github.com/arunsanna/gemini-diagram-mcp/stargazers) | Text/ideas / Data/tables / Code/technical text | MCP server | Architecture/flow diagram / Chart/dashboard / SVG/PNG/PDF | MCP client / Model API / Rendering/export |
| [diagrams-mcp](https://github.com/ByteOverDev/diagrams-mcp) [![Star](https://img.shields.io/github/stars/ByteOverDev/diagrams-mcp?style=flat&logo=github&label=Star)](https://github.com/ByteOverDev/diagrams-mcp/stargazers) | 文本/想法 / 代码/技术描述 / DSL/代码 | MCP Server | 架构图/流程图 / 图表/Mermaid / SVG/PNG/PDF | MCP Client / 本地语言环境 / 渲染/导出 / 系统工具 |
| [drawio-skill](https://github.com/Agents365-ai/drawio-skill) [![Star](https://img.shields.io/github/stars/Agents365-ai/drawio-skill?style=flat&logo=github&label=Star)](https://github.com/Agents365-ai/drawio-skill/stargazers) | 文本/想法 / 代码库 / 代码/技术描述 / DSL/代码 / 数据/表格 | Agent Skill | 架构图/流程图 / 图表/Mermaid / 代码地图/Repo Wiki / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / 渲染/导出 / 系统工具 / 代码分析工具 / 模板/素材 |
| [Draw.io MCP Plugin](https://github.com/jmo808/drawio_plugin) [![Star](https://img.shields.io/github/stars/jmo808/drawio_plugin?style=flat&logo=github&label=Star)](https://github.com/jmo808/drawio_plugin/stargazers) | 文本/想法 / 代码库 / 代码/技术描述 / DSL/代码 / 数据/表格 | MCP Server / Agent Skill | 架构图/流程图 / 图表/Mermaid / 代码地图/Repo Wiki / SVG/PNG/PDF | MCP Client / Agent 宿主 / 本地语言环境 / 渲染/导出 / 系统工具 / 代码分析工具 / 模板/素材 |
| [Network Sketcher](https://github.com/cisco-open/network-sketcher) [![Star](https://img.shields.io/github/stars/cisco-open/network-sketcher?style=flat&logo=github&label=Star)](https://github.com/cisco-open/network-sketcher/stargazers) | 文本/想法 / 数据/表格 / 代码/技术描述 | MCP Server / 开源应用/框架 | 架构图/流程图 / PPT/演示文稿 / 网页/交互页面 / SVG/PNG/PDF / 结构化数据/Markdown | MCP Client / 本地语言环境 / 外部检索/数据源 / 渲染/导出 / 系统工具 / 代码分析工具 |
| [diagramzu-mcp](https://github.com/yenchieh/diagramzu-mcp) [![Star](https://img.shields.io/github/stars/yenchieh/diagramzu-mcp?style=flat&logo=github&label=Star)](https://github.com/yenchieh/diagramzu-mcp/stargazers) | 文本/想法 / 代码/技术描述 / DSL/代码 | MCP Server / 产品/SaaS | 图表/Mermaid / 架构图/流程图 / 网页/交互页面 | MCP Client / 浏览器/账号 / 本地语言环境 / 渲染/导出 / 存储/索引 |
| [Claude Mermaid](https://github.com/veelenga/claude-mermaid) [![Star](https://img.shields.io/github/stars/veelenga/claude-mermaid?style=flat&logo=github&label=Star)](https://github.com/veelenga/claude-mermaid/stargazers) | 文本/想法 / 代码/技术描述 / DSL/代码 | MCP Server / Agent Skill | 图表/Mermaid / SVG/PNG/PDF | MCP Client / Agent 宿主 / 本地语言环境 / 渲染/导出 |
| [Sailor](https://github.com/aj-geddes/sailor) [![Star](https://img.shields.io/github/stars/aj-geddes/sailor?style=flat&logo=github&label=Star)](https://github.com/aj-geddes/sailor/stargazers) | Text/ideas / Code/technical text / DSL/code | MCP server / Open-source app/framework | Diagram/Mermaid / Architecture/flow diagram / Whiteboard/mind map / SVG/PNG/PDF | MCP client / Browser/account / Local runtime / Model API / Rendering/export / System tools |
| [Mermaid MCP App](https://github.com/finfin/mermaid-mcp-app) [![Star](https://img.shields.io/github/stars/finfin/mermaid-mcp-app?style=flat&logo=github&label=Star)](https://github.com/finfin/mermaid-mcp-app/stargazers) | Text/ideas / Code/technical text / DSL/code | MCP server / Open-source app/framework | Diagram/Mermaid / Architecture/flow diagram / Whiteboard/mind map / SVG/PNG/PDF | MCP client / Local runtime / Rendering/export |
| [mermaid-diagram-claude-code](https://github.com/zabolotiny/mermaid-diagram-claude-code) [![Star](https://img.shields.io/github/stars/zabolotiny/mermaid-diagram-claude-code?style=flat&logo=github&label=Star)](https://github.com/zabolotiny/mermaid-diagram-claude-code/stargazers) | 文本/想法 / 代码库 / 代码/技术描述 / DSL/代码 | Agent Skill / MCP Server | 图表/Mermaid / 架构图/流程图 / 网页/交互页面 | Agent 宿主 / MCP Client / 本地语言环境 / 代码分析工具 / 渲染/导出 |
| [mermaid-mcp-server](https://github.com/peng-shawn/mermaid-mcp-server) [![Star](https://img.shields.io/github/stars/peng-shawn/mermaid-mcp-server?style=flat&logo=github&label=Star)](https://github.com/peng-shawn/mermaid-mcp-server/stargazers) | 文本/想法 / 代码/技术描述 / DSL/代码 | MCP Server | 图表/Mermaid / SVG/PNG/PDF | MCP Client / 本地语言环境 / 渲染/导出 |
| [mcp-media-forge](https://github.com/PavelGuzenfeld/mcp-media-forge) [![Star](https://img.shields.io/github/stars/PavelGuzenfeld/mcp-media-forge?style=flat&logo=github&label=Star)](https://github.com/PavelGuzenfeld/mcp-media-forge/stargazers) | 文本/想法 / 数据/表格 / DSL/代码 | MCP Server | 图表/Mermaid / 架构图/流程图 / 图表/仪表盘 / 网页/交互页面 / PPT/演示文稿 / SVG/PNG/PDF | MCP Client / 本地语言环境 / 渲染/导出 / 系统工具 |
| [UML-MCP](https://github.com/antoinebou12/uml-mcp) [![Star](https://img.shields.io/github/stars/antoinebou12/uml-mcp?style=flat&logo=github&label=Star)](https://github.com/antoinebou12/uml-mcp/stargazers) | 文本/想法 / 代码/技术描述 / DSL/代码 | MCP Server | 架构图/流程图 / 图表/Mermaid / SVG/PNG/PDF | MCP Client / 本地语言环境 / 渲染/导出 |
| [Kroki-MCP](https://github.com/utain/kroki-mcp) [![Star](https://img.shields.io/github/stars/utain/kroki-mcp?style=flat&logo=github&label=Star)](https://github.com/utain/kroki-mcp/stargazers) | 文本/想法 / 代码/技术描述 / DSL/代码 | MCP Server | 图表/Mermaid / 架构图/流程图 / SVG/PNG/PDF | MCP Client / 本地语言环境 / 渲染/导出 |
| [drawio-mcp](https://github.com/jgraph/drawio-mcp) [![Star](https://img.shields.io/github/stars/jgraph/drawio-mcp?style=flat&logo=github&label=Star)](https://github.com/jgraph/drawio-mcp/stargazers) | 文本/想法 / 代码/技术描述 / DSL/代码 | MCP Server / Agent Skill | 架构图/流程图 / 图表/Mermaid / SVG/PNG/PDF | MCP Client / Agent 宿主 / 本地语言环境 / 渲染/导出 / 系统工具 |
| [Excalidraw MCP](https://github.com/excalidraw/excalidraw-mcp) [![Star](https://img.shields.io/github/stars/excalidraw/excalidraw-mcp?style=flat&logo=github&label=Star)](https://github.com/excalidraw/excalidraw-mcp/stargazers) | 文本/想法 / 代码/技术描述 | MCP Server | 架构图/流程图 / 白板/思维导图 / 网页/交互页面 | MCP Client / 浏览器/账号 / 本地语言环境 / 渲染/导出 |
| [mcp_excalidraw](https://github.com/yctimlin/mcp_excalidraw) [![Star](https://img.shields.io/github/stars/yctimlin/mcp_excalidraw?style=flat&logo=github&label=Star)](https://github.com/yctimlin/mcp_excalidraw/stargazers) | 文本/想法 / 代码/技术描述 / DSL/代码 | MCP Server / Agent Skill | 架构图/流程图 / 白板/思维导图 / 网页/交互页面 / SVG/PNG/PDF | MCP Client / Agent 宿主 / 浏览器/账号 / 本地语言环境 / 渲染/导出 |
| [whiteboard](https://github.com/kamiazya/whiteboard) [![Star](https://img.shields.io/github/stars/kamiazya/whiteboard?style=flat&logo=github&label=Star)](https://github.com/kamiazya/whiteboard/stargazers) | 文本/想法 / 代码/技术描述 / 知识库/个人资料 | MCP Server / Agent Skill / 开源应用/框架 | 白板/思维导图 / 架构图/流程图 / 网页/交互页面 / SVG/PNG/PDF | MCP Client / Agent 宿主 / 浏览器/账号 / 本地语言环境 / 渲染/导出 / 存储/索引 |
| [AntV Infographic](https://github.com/antvis/infographic) [![Star](https://img.shields.io/github/stars/antvis/infographic?style=flat&logo=github&label=Star)](https://github.com/antvis/infographic/stargazers) | 文本/想法 / 数据/表格 / DSL/代码 | API/SDK/库 | 信息图/视觉报告 / 图表/渲染输出 / SVG/PNG/PDF | 本地语言环境 / 渲染/导出 / 模板/素材 |
| [Markdown Viewer Agent Skills](https://github.com/markdown-viewer/skills) [![Star](https://img.shields.io/github/stars/markdown-viewer/skills?style=flat&logo=github&label=Star)](https://github.com/markdown-viewer/skills/stargazers) | 文本/想法 / 数据/表格 / 代码/技术描述 | Skill 集合 | 架构图/流程图 / 图表/仪表盘 / 信息图/视觉报告 / 思维导图/知识地图 / 图表/渲染输出 | Agent 宿主 / 本地语言环境 / 渲染/导出 / 模板/素材 |
| [Preview Skills](https://github.com/veelenga/preview-skills) [![Star](https://img.shields.io/github/stars/veelenga/preview-skills?style=flat&logo=github&label=Star)](https://github.com/veelenga/preview-skills/stargazers) | 文本/想法 / 数据/表格 / DSL/代码 / 代码/技术描述 | Skill 集合 | 网页/交互页面 / 图表/Mermaid / 结构化数据/Markdown | Agent 宿主 / 本地语言环境 / 渲染/导出 |
| [AgentFigureGallery](https://github.com/Dsadd4/AgentFigureGallery) [![Star](https://img.shields.io/github/stars/Dsadd4/AgentFigureGallery?style=flat&logo=github&label=Star)](https://github.com/Dsadd4/AgentFigureGallery/stargazers) | 论文/科研资料 / 数据/表格 | Agent Skill / 数据集/评测 | 图表/渲染输出 / SVG/PNG/PDF | Agent 宿主 / 本地语言环境 / 外部检索/数据源 / 渲染/导出 |
| [amCharts 5 MCP Server](https://github.com/amcharts/amcharts5-mcp) [![Star](https://img.shields.io/github/stars/amcharts/amcharts5-mcp?style=flat&logo=github&label=Star)](https://github.com/amcharts/amcharts5-mcp/stargazers) | 数据/表格 / DSL/代码 | MCP Server | 图表/仪表盘 / 图表/渲染输出 | MCP Client / 浏览器/账号 / 外部检索/数据源 / 渲染/导出 |

## 怎么筛选工具

### 信息来源

| 信息来源 | 含义 |
| --- | --- |
| 论文/科研资料 | 论文、arXiv、学术 PDF、科研主题和实验结果。 |
| PDF/文档 | PDF、长文档、手册、报告和网页导出的文档。 |
| Office 文档 | Word、PowerPoint、Excel 等办公文件。 |
| 网页/搜索结果 | 网页、搜索结果、URL、网页正文和引用来源。 |
| 新闻/资讯 | 新闻流、市场资讯、威胁情报、行业动态。 |
| 代码库 | GitHub 仓库、本地代码、diff、依赖关系。 |
| 数据/表格 | CSV、Excel、指标、时间序列和业务数据。 |
| 数据库 | SQL/BI 数据源、业务库、向量库或外部数据接口。 |
| 知识库/个人资料 | Notion、Google Drive、Slack、会议资料、个人文档库。 |
| 文本/想法 | 一句话提示、草稿、大纲、白板想法。 |
| 代码/技术描述 | 代码片段、API 描述、系统设计文本。 |
| DSL/代码 | Mermaid、图表 DSL、配置和可执行绘图代码。 |
| 引用网络 | 论文引用关系、相关论文网络、文献图谱。 |
| 任意/多源 | 跨多种来源都能工作的通用场景。 |

### 工具形态

| 工具形态 | 含义 |
| --- | --- |
| 产品/SaaS | 托管网站或商业产品，通常需要浏览器和账号。 |
| 开源应用/框架 | 可以本地运行、部署或二次开发的应用/框架。 |
| Agent Skill | 给 Claude Code、Codex、Cursor、Gemini CLI 等 Agent 执行的工作流包。 |
| Skill 集合 | 包含多个 Agent Skill 的仓库或套件。 |
| MCP Server | 通过 Model Context Protocol 把文件、PPT、代码或数据能力暴露给 Agent。 |
| API/SDK/库 | 被其他工具调用的解析、渲染、生成或数据接口。 |
| Bot/助手 | 以聊天、搜索助手、浏览器扩展或协作助手形态出现的工具。 |
| 研究原型/数据集 | 论文、评测、数据集或研究代码。 |
| Awesome/索引 | 帮助继续发现工具、论文和 Skill 的目录。 |

### 产出物形式

| 产出物形式 | 含义 |
| --- | --- |
| PPT/演示文稿 | PPTX、Slides、Deck、带模板或母版的演示稿。 |
| 报告/长文档 | 带引用的 research report、行业报告、分析报告。 |
| 报告/简报 | 摘要、briefing、study guide、问答型材料。 |
| 网页/交互页面 | HTML、交互式教程、网页 explainer、可分享页面。 |
| 图形摘要/信息图 | Graphical abstract、infographic、海报、科学示意图。 |
| 信息图/视觉报告 | 商业信息图、视觉报告、品牌化摘要。 |
| 架构图/流程图 | Mermaid、流程图、时序图、系统图、白板图。 |
| 白板/思维导图 | 白板、自由画布、发散式图示。 |
| 思维导图/知识地图 | Mind map、概念图、知识网络。 |
| 文献地图/知识地图 | 文献关系图、相关论文图、科研知识地图。 |
| 图表/仪表盘 | Charts、BI dashboard、KPI、交互式数据视图。 |
| 表格/时间线 | 证据表、IOC 表、事件时间线、对照表。 |
| 代码地图/Repo Wiki | 仓库结构图、Repo wiki、依赖图、代码知识图谱。 |
| 图表/Mermaid | Mermaid、diagram-as-code、可验证图表文本。 |
| SVG/PNG/PDF | 渲染后的图片、矢量图或导出文件。 |
| 视频/音频 | 论文视频、讲解视频、音频简报。 |
| 结构化数据/Markdown | Markdown、JSON、layout、表格、OCR 结果，供后续生成使用。 |
| 证据表 | 文献筛选表、证据矩阵、引用表。 |
| 引用答案 | 带来源引用的回答或搜索结果综合。 |
| 问答/学习材料 | Notebook 问答、测验、学习指南。 |
| 工具索引 | Awesome list、工具目录、论文列表。 |
| 图表/渲染输出 | 渲染器或图表组件生成的视觉输出。 |

### 依赖类型

`依赖类型` 描述一个工具真正依赖什么。它和上面的三类标签不同：前面几列回答“从哪里来、工具是什么、产物是什么”，依赖类型回答“运行它需要什么”。

| 依赖类型 | 含义 | 常见例子 |
| --- | --- | --- |
| 浏览器/账号 | 只需要浏览器和账号，通常不需要本地安装 | Google 账号、Canva 账号、商业 SaaS 套餐 |
| Agent 宿主 | 需要在 Agent 环境中运行 Skill 或工作流 | Claude Code、Codex、Cursor、Gemini CLI、OpenCode |
| 模型 API | 需要调用文本、视觉或图像模型接口 | OpenAI、Anthropic、Gemini、OpenRouter、Azure OpenAI、Replicate |
| 本地语言环境 | 需要本地安装语言运行时和包管理器 | Python、Node.js、Go、Rust、Java、Conda、uv、pnpm |
| 系统工具 | 依赖本机二进制工具或办公软件 | Docker、LibreOffice、Microsoft PowerPoint、Pandoc、LaTeX、Chrome |
| 文档解析/OCR | 依赖 PDF 解析、OCR、版面恢复或文档结构抽取 | MinerU、Docling、Marker、GROBID、Tesseract、版面模型 |
| 渲染/导出 | 依赖把中间格式渲染成 SVG、PNG、PDF、PPTX 或网页 | Mermaid、Kroki、Playwright、python-pptx、pptxgenjs、SVG 渲染器 |
| 外部检索/数据源 | 需要联网搜索、论文库、引用网络或数据库 | arXiv、Semantic Scholar、OpenAlex、Google Scholar、网页搜索 |
| GPU/加速器 | 本地模型推理、OCR、视觉模型或图像生成需要加速 | CUDA、ROCm、Apple Metal/MPS、云 GPU |
| MCP Client | 需要能连接 MCP Server 的客户端 | Claude Desktop、Cursor、Codex、Cline、Continue |
| 代码分析工具 | 代码库可视化常见依赖，用于解析文件、符号和依赖 | tree-sitter、语言服务器、ripgrep、ctags、Git |
| 存储/索引 | 需要持久化项目状态、向量索引或图数据库 | SQLite、Postgres、Chroma、Qdrant、Neo4j、文件索引 |
| 模板/素材 | 需要额外模板、品牌素材或设计资源才能产出高质量结果 | PPTX 模板、母版、品牌素材包、图标集、图片素材 |

GitHub 项目的 Star 徽章直接放在项目名后面，尽量使用实时 badge；非 GitHub 产品不显示 Star。

## 继续发现更多工具

这一部分收录已有 awesome list、论文列表、Skill 目录和 MCP 目录。它们不是单个生产工具，但适合继续扩展这个仓库。

| 项目 | 覆盖范围 | 工具形态 | 适合用来找什么 |
| --- | --- | --- | --- |
| [awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) [![Star](https://img.shields.io/github/stars/VoltAgent/awesome-agent-skills?style=flat&logo=github&label=Star)](https://github.com/VoltAgent/awesome-agent-skills/stargazers) | 任意/多源 | Awesome/索引 | 大型 Agent Skill 目录。 |
| [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) [![Star](https://img.shields.io/github/stars/ComposioHQ/awesome-claude-skills?style=flat&logo=github&label=Star)](https://github.com/ComposioHQ/awesome-claude-skills/stargazers) | 任意/多源 | Awesome/索引 | Claude Skills 目录，覆盖可视化、数据、文档、自动化和 MCP 发现。 |
| [awesome-llm-skills](https://github.com/Prat011/awesome-llm-skills) [![Star](https://img.shields.io/github/stars/Prat011/awesome-llm-skills?style=flat&logo=github&label=Star)](https://github.com/Prat011/awesome-llm-skills/stargazers) | 任意/多源 | Awesome/索引 | 跨 Agent 的 LLM Skill 列表。 |
| [Awesome-Powerpoint-AI-Agents](https://github.com/ishandutta2007/Awesome-Powerpoint-AI-Agents) [![Star](https://img.shields.io/github/stars/ishandutta2007/Awesome-Powerpoint-AI-Agents?style=flat&logo=github&label=Star)](https://github.com/ishandutta2007/Awesome-Powerpoint-AI-Agents/stargazers) | 任意/多源 | Awesome/索引 | 和本仓库最接近的 PowerPoint AI Agent 生态列表。 |
| [AI-Presentation-Builders-Index](https://github.com/danielrosehill/AI-Presentation-Builders-Index) [![Star](https://img.shields.io/github/stars/danielrosehill/AI-Presentation-Builders-Index?style=flat&logo=github&label=Star)](https://github.com/danielrosehill/AI-Presentation-Builders-Index/stargazers) | 任意/多源 | Awesome/索引 | 开放、自托管和 Agent 驱动的演示文稿构建器、Skill、MCP、渲染器和解析器索引。 |
| [awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) [![Star](https://img.shields.io/github/stars/punkpeye/awesome-mcp-servers?style=flat&logo=github&label=Star)](https://github.com/punkpeye/awesome-mcp-servers/stargazers) | 任意/多源 | Awesome/索引 | 大型 MCP Server 目录。 |
| [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) [![Star](https://img.shields.io/github/stars/hesreallyhim/awesome-claude-code?style=flat&logo=github&label=Star)](https://github.com/hesreallyhim/awesome-claude-code/stargazers) | 任意/多源 | Awesome/索引 | Claude Code Skill、Hook、Slash Command、应用和插件索引。 |
| [awesome_ai_agents](https://github.com/jim-schwoebel/awesome_ai_agents) [![Star](https://img.shields.io/github/stars/jim-schwoebel/awesome_ai_agents?style=flat&logo=github&label=Star)](https://github.com/jim-schwoebel/awesome_ai_agents/stargazers) | 任意/多源 | Awesome/索引 | 综合 AI Agent 资源目录。 |
| [awesome-ai-tools](https://github.com/mahseema/awesome-ai-tools) [![Star](https://img.shields.io/github/stars/mahseema/awesome-ai-tools?style=flat&logo=github&label=Star)](https://github.com/mahseema/awesome-ai-tools/stargazers) | 任意/多源 | Awesome/索引 | 综合 AI 工具目录。 |
| [awesome-ai-auto-research](https://github.com/worldbench/awesome-ai-auto-research) [![Star](https://img.shields.io/github/stars/worldbench/awesome-ai-auto-research?style=flat&logo=github&label=Star)](https://github.com/worldbench/awesome-ai-auto-research/stargazers) | 任意/多源 | Awesome/索引 | AI 自动科研工具版图，包括论文转幻灯片、海报、视频、网页和社交媒体产物。 |
| [LLM-Visualization-Paper-List](https://github.com/zengxingchen/LLM-Visualization-Paper-List) [![Star](https://img.shields.io/github/stars/zengxingchen/LLM-Visualization-Paper-List?style=flat&logo=github&label=Star)](https://github.com/zengxingchen/LLM-Visualization-Paper-List/stargazers) | 任意/多源 | Awesome/索引 | LLM 与可视化交叉方向的论文列表。 |
| [awesome-ai-for-science](https://github.com/ai-boost/awesome-ai-for-science) [![Star](https://img.shields.io/github/stars/ai-boost/awesome-ai-for-science?style=flat&logo=github&label=Star)](https://github.com/ai-boost/awesome-ai-for-science/stargazers) | 任意/多源 | Awesome/索引 | AI for Science 的工具、论文、数据集和框架索引。 |
| [AlterLab-Academic-Skills](https://github.com/AlterLab-IEU/AlterLab-Academic-Skills) [![Star](https://img.shields.io/github/stars/AlterLab-IEU/AlterLab-Academic-Skills?style=flat&logo=github&label=Star)](https://github.com/AlterLab-IEU/AlterLab-Academic-Skills/stargazers) | 任意/多源 | Skill 集合 | 经过评测的学术 Agent Skill，覆盖可视化、报告、写作和科研流程。 |
| [SenseNova-Skills](https://github.com/OpenSenseNova/SenseNova-Skills) [![Star](https://img.shields.io/github/stars/OpenSenseNova/SenseNova-Skills?style=flat&logo=github&label=Star)](https://github.com/OpenSenseNova/SenseNova-Skills/stargazers) | 任意/多源 | Skill 集合 | 办公与生产力 Skill 集合，覆盖图像生成、可视化、幻灯片、Excel 分析和深度研究。 |
| [OpenClaw Medical Skills](https://github.com/FreedomIntelligence/OpenClaw-Medical-Skills) [![Star](https://img.shields.io/github/stars/FreedomIntelligence/OpenClaw-Medical-Skills?style=flat&logo=github&label=Star)](https://github.com/FreedomIntelligence/OpenClaw-Medical-Skills/stargazers) | 论文/科研资料 / PDF/文档 / 数据/表格 / 数据库 | Skill 集合 | 医学与科研 Skill 库，覆盖研究报告、临床文档、组学可视化、通路图、QC 报告和图表输出。 |
| [Awesome HTML Slide Skills](https://github.com/ToseaAI/awesome-html-slide-skills) [![Star](https://img.shields.io/github/stars/ToseaAI/awesome-html-slide-skills?style=flat&logo=github&label=Star)](https://github.com/ToseaAI/awesome-html-slide-skills/stargazers) | 任意/多源 | Awesome/索引 | HTML 演示文稿 Skill 与模板库索引，面向 Agent 生成单文件演示生态。 |
| [TransformingScienceLLMs](https://github.com/NL2G/TransformingScienceLLMs) [![Star](https://img.shields.io/github/stars/NL2G/TransformingScienceLLMs?style=flat&logo=github&label=Star)](https://github.com/NL2G/TransformingScienceLLMs/stargazers) | 任意/多源 | Awesome/索引 | LLM 辅助科学工作的论文、模型和工具集合。 |
| [HeyClaude](https://github.com/JSONbored/awesome-claude) [![Star](https://img.shields.io/github/stars/JSONbored/awesome-claude?style=flat&logo=github&label=Star)](https://github.com/JSONbored/awesome-claude/stargazers) | Any/multi-source | Awesome/index / MCP server | Claude workflow registry for agents, MCP servers, skills, commands, hooks, tools, templates, feeds, JSON exports, Raycast, and read-only MCP discovery. |

## 数据

结构化目录在 [data/catalog.yml](data/catalog.yml)，包含信息来源、工具形态、产出物形式、依赖类型、分类、GitHub Star 快照、许可证、更新时间和简短说明。

工具调研缓存放在 [data/tool-research.yml](data/tool-research.yml)，包含官方示例、文档、demo、模板、论文、视频、效果图/GIF 等线索；它不直接渲染到 README。

搜索记录和检索策略在 [docs/search-log.md](docs/search-log.md)。

## 贡献

欢迎补充项目。新增条目最好包含：

- 项目名称和 URL。
- 信息来源：例如 `论文/科研资料、网页/搜索结果、新闻/资讯、PDF/文档、代码库、数据/表格`。
- 工具形态：例如 `产品/SaaS、开源应用/框架、Agent Skill、MCP Server、API/SDK/库、Bot/助手`。
- 产出物形式：例如 `PPT/演示文稿、报告/长文档、网页/交互页面、思维导图/知识地图、图表/仪表盘`。
- 依赖类型：从上面的依赖类型表里选择，例如 `模型 API、渲染/导出、模板/素材`。
- 一句话说明它为什么属于这个列表。

优先收录能产出可查看、可编辑、可引用、可展示，或者能帮助人理解复杂系统的工具。
