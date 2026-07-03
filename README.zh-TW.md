![AI visualization banner](assets/banner.png)

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![Catalog](https://img.shields.io/badge/catalog-216_items-blue)](data/catalog.yml)
[![Last researched](https://img.shields.io/badge/last_researched-2026--07--03-brightgreen)](docs/search-log.md)

[English](README.md) | [简体中文](README.zh-CN.md) | 繁體中文 | [日本語](README.ja.md) | [한국어](README.ko.md) | [Español](README.es.md) | [Türkçe](README.tr.md) | [Русский](README.ru.md)

> [!NOTE]
> 本專案由 RenaissanceMind Agent 輔助自動更新。工具資訊、Star、授權條款和服務條款可能會變化，使用前請核实對應官網或倉庫。

一個關於 AI 視覺化與内容呈現的精選目錄：收集使用 LLM 或 Agent，把論文、新聞、網頁、文件、程式碼庫、資料集和知識集合轉成“給人看的”視覺產物的工具、網站、開源專案、Agent Skill 和 MCP Server。

這個列表按**資訊來源**、**工具形態**、**產出物形式**和**依賴類型**標注。PPT 只是產出物之一；同一個工具也可能同時產出報告、網頁、圖表、心智圖或程式碼地圖。

## ✨ 推薦使用方式

| 使用者 | 建議 |
| --- | --- |
| 🤖 For Agent | 安裝/啟用 [`ai-visualization-advisor`](skills/ai-visualization-advisor/SKILL.md) skill，讓 Agent 根據資訊來源、目標讀者和使用限制，建議合適的資訊呈現形式與工具；它會優先讀取 [`data/catalog.yml`](data/catalog.yml) 和 [`data/tool-research.yml`](data/tool-research.yml)。 |
| 👤 For Human | 查閱目前 README，或訪問 [awesome-ai-visualization.renaissancemind.ai](https://awesome-ai-visualization.renaissancemind.ai/)（Recommended）瀏覽與篩選工具。 |

## 目錄

- [主要工作流程工具](#主要工作流程工具)
- [輔助、前後處理與小工具](#輔助前後處理與小工具)
- [如何篩選工具](#如何篩選工具)
- [繼續發現更多工具](#繼續發現更多工具)
- [資料](#資料)
- [貢獻](#貢獻)

## 主要工作流程工具

這一部分放“從資訊來源直接生成面向人閱讀/展示的產物”的工具。每行都同時標註三條軸：資訊來源、工具形態、產出物形式。

### 論文、科研資料與學術檢索

從論文、科研主題和文獻庫出發，生成圖形摘要、報告、課程、文獻地圖或學術傳播產物。

| 專案 | 資訊來源 | 工具形態 | 產出物形式 | 依賴類型 |
| --- | --- | --- | --- | --- |
| [Paper2Any](https://github.com/OpenDCAI/Paper2Any) [![Star](https://img.shields.io/github/stars/OpenDCAI/Paper2Any?style=flat&logo=github&label=Star)](https://github.com/OpenDCAI/Paper2Any/stargazers) | 論文/科研資料 | 開源應用/框架 | 圖形摘要/資訊圖 / PPT/簡報 / 網頁/互動頁面 | 本機語言環境 / 模型 API / 文件解析/OCR / 渲染/匯出 / GPU/加速器 / 範本/素材 |
| [paper-2-web](https://github.com/davila7/claude-code-templates/blob/main/cli-tool/components/skills/scientific/paper-2-web/SKILL.md?plain=1) [![Star](https://img.shields.io/github/stars/davila7/claude-code-templates?style=flat&logo=github&label=Star)](https://github.com/davila7/claude-code-templates/stargazers) | 論文/科研資料 | Agent Skill | 圖形摘要/資訊圖 / PPT/簡報 / 網頁/互動頁面 | Agent 宿主 / 模型 API / 本機語言環境 / 渲染/匯出 / 範本/素材 |
| [paper-to-course](https://github.com/ZeroxZhang/paper-to-course) [![Star](https://img.shields.io/github/stars/ZeroxZhang/paper-to-course?style=flat&logo=github&label=Star)](https://github.com/ZeroxZhang/paper-to-course/stargazers) | 論文/科研資料 | Agent Skill | 網頁/互動頁面 / 問答/學習材料 | Agent 宿主 / 模型 API / 本機語言環境 / 渲染/匯出 |
| [Auto-Research-In-Sleep](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep) [![Star](https://img.shields.io/github/stars/wanshuiyin/Auto-claude-code-research-in-sleep?style=flat&logo=github&label=Star)](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep/stargazers) | 論文/科研資料 | Skill 集合 | 報告/長文件 / 證據表 | Agent 宿主 / 模型 API / 本機語言環境 / 系統工具 / 渲染/匯出 / 範本/素材 |
| [scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) [![Star](https://img.shields.io/github/stars/K-Dense-AI/scientific-agent-skills?style=flat&logo=github&label=Star)](https://github.com/K-Dense-AI/scientific-agent-skills/stargazers) | 論文/科研資料 | Skill 集合 | 圖形摘要/資訊圖 / PPT/簡報 / 網頁/互動頁面 | Agent 宿主 / 模型 API / 外部檢索/資料來源 / 渲染/匯出 |
| [claude-scientific-writer](https://github.com/K-Dense-AI/claude-scientific-writer) [![Star](https://img.shields.io/github/stars/K-Dense-AI/claude-scientific-writer?style=flat&logo=github&label=Star)](https://github.com/K-Dense-AI/claude-scientific-writer/stargazers) | 論文/科研資料 | Agent Skill | 報告/長文件 / 證據表 | Agent 宿主 / 模型 API / 外部檢索/資料來源 / 範本/素材 |
| [SciGA](https://github.com/IyatomiLab/SciGA) [![Star](https://img.shields.io/github/stars/IyatomiLab/SciGA?style=flat&logo=github&label=Star)](https://github.com/IyatomiLab/SciGA/stargazers) | 論文/科研資料 | 資料集/評測 | 圖形摘要/資訊圖 / PPT/簡報 / 網頁/互動頁面 | 本機語言環境 / 文件解析/OCR / GPU/加速器 |
| [Academic Figures](https://github.com/sai-tv/academic-figures) [![Star](https://img.shields.io/github/stars/sai-tv/academic-figures?style=flat&logo=github&label=Star)](https://github.com/sai-tv/academic-figures/stargazers) | 論文/研究資料 / 文字/想法 | Agent Skill | 圖形摘要/資訊圖 / SVG/PNG/PDF | Agent 宿主 / 模型 API / 渲染/匯出 / 模板/素材 |
| [PaperBanana](https://github.com/dwzhu-pku/PaperBanana) [![Star](https://img.shields.io/github/stars/dwzhu-pku/PaperBanana?style=flat&logo=github&label=Star)](https://github.com/dwzhu-pku/PaperBanana/stargazers) | 論文/科研資料 / 文字/想法 | 開源應用/框架 | 圖形摘要/資訊圖 / SVG/PNG/PDF | 本機語言環境 / 模型 API / 文件解析/OCR / 外部檢索/資料來源 / 渲染/匯出 / 範本/素材 |
| [PaperBanana Skills](https://github.com/PlutoLei/paperbanana-skill) [![Star](https://img.shields.io/github/stars/PlutoLei/paperbanana-skill?style=flat&logo=github&label=Star)](https://github.com/PlutoLei/paperbanana-skill/stargazers) | 論文/科研資料 / PDF/文件 / 資料/表格 / 文字/想法 | Agent Skill | 圖形摘要/資訊圖 / PPT/簡報 / SVG/PNG/PDF | Agent 宿主 / 模型 API / 本地語言環境 / 文件解析/OCR / 外部檢索/資料源 / 渲染/匯出 / 模板/素材 |
| [academic-slides-skill](https://github.com/Rebeccca2000/academic-slides-skill) [![Star](https://img.shields.io/github/stars/Rebeccca2000/academic-slides-skill?style=flat&logo=github&label=Star)](https://github.com/Rebeccca2000/academic-slides-skill/stargazers) | 論文/科研資料 / PDF/文件 / 文字/想法 | Agent Skill | PPT/簡報 / 網頁/互動頁面 / SVG/PNG/PDF | Agent 宿主 / 本地語言環境 / 渲染/匯出 / 範本/素材 |
| [academic-pptx-skill](https://github.com/Gabberflast/academic-pptx-skill) [![Star](https://img.shields.io/github/stars/Gabberflast/academic-pptx-skill?style=flat&logo=github&label=Star)](https://github.com/Gabberflast/academic-pptx-skill/stargazers) | 論文/科研資料 / PDF/文件 / 文字/想法 | Agent Skill | PPT/簡報 / 報告/簡報 | Agent 宿主 / 模型 API / 渲染/匯出 / 範本/素材 |
| [PaperToSlides](https://github.com/jxtse/PaperToSlides) [![Star](https://img.shields.io/github/stars/jxtse/PaperToSlides?style=flat&logo=github&label=Star)](https://github.com/jxtse/PaperToSlides/stargazers) | 論文/科研資料 / PDF/文件 | 開源應用/框架 | PPT/簡報 | 本地語言環境 / 模型 API / 文件解析/OCR / 渲染/匯出 / GPU/加速器 |
| [Paper2Slides](https://github.com/pchi123/Paper2Slides) [![Star](https://img.shields.io/github/stars/pchi123/Paper2Slides?style=flat&logo=github&label=Star)](https://github.com/pchi123/Paper2Slides/stargazers) | Papers/research | Open-source app/framework | Graphical abstract/infographic / PPT/deck | Local runtime / Document parsing/OCR / Rendering/export / Templates/assets |
| [AI-Researcher](https://github.com/HKUDS/AI-Researcher) [![Star](https://img.shields.io/github/stars/HKUDS/AI-Researcher?style=flat&logo=github&label=Star)](https://github.com/HKUDS/AI-Researcher/stargazers) | 論文/科研資料 | 研究原型 | 報告/長文件 / 證據表 | 本機語言環境 / 模型 API / 外部檢索/資料來源 / GPU/加速器 |
| [Elicit](https://elicit.com/) | 論文/科研資料 | 產品/SaaS | 報告/簡報 / 證據表 | 瀏覽器/帳號 / 外部檢索/資料來源 |
| [Paperguide](https://paperguide.ai/) | 論文/科研資料 | 產品/SaaS | 報告/簡報 / 證據表 | 瀏覽器/帳號 / 外部檢索/資料來源 |
| [SciSpace Infographic Maker](https://scispace.com/agents/infographic-maker-hbcwetac) | 論文/科研資料 | 產品/SaaS | 圖形摘要/資訊圖 / PPT/簡報 / 網頁/互動頁面 | 瀏覽器/帳號 / 範本/素材 |
| [Grabstract](https://grabstract.io/graphical-abstracts) | 論文/科研資料 | 產品/SaaS | 圖形摘要/資訊圖 / PPT/簡報 / 網頁/互動頁面 | 瀏覽器/帳號 / 範本/素材 |
| [Open Knowledge Maps](https://openknowledgemaps.org/) | 論文/科研資料 / 引用網路 | 產品/SaaS | 文獻地圖/知識地圖 | 瀏覽器/帳號 / 外部檢索/資料來源 |
| [Connected Papers](https://www.connectedpapers.com/) | 論文/科研資料 / 引用網路 | 產品/SaaS | 文獻地圖/知識地圖 | 瀏覽器/帳號 / 外部檢索/資料來源 |
| [ResearchRabbit](https://www.researchrabbit.ai/) | 論文/科研資料 / 引用網路 | 產品/SaaS | 文獻地圖/知識地圖 | 瀏覽器/帳號 / 外部檢索/資料來源 |
| [Litmaps](https://www.litmaps.com/) | 論文/科研資料 / 引用網路 | 產品/SaaS | 文獻地圖/知識地圖 | 瀏覽器/帳號 / 外部檢索/資料來源 |
| [Consensus](https://consensus.app/) | 論文/科研資料 | 產品/SaaS | 報告/簡報 / 證據表 | 瀏覽器/帳號 / 外部檢索/資料來源 |

### 網頁、新聞、資訊與產業情報

從網頁、搜尋結果、新聞流、市場資料或威脅情報出發，生成帶來源的報告、儀表板和知識圖。

| 專案 | 資訊來源 | 工具形態 | 產出物形式 | 依賴類型 |
| --- | --- | --- | --- | --- |
| [GPT Researcher](https://github.com/assafelovic/gpt-researcher) [![Star](https://img.shields.io/github/stars/assafelovic/gpt-researcher?style=flat&logo=github&label=Star)](https://github.com/assafelovic/gpt-researcher/stargazers) | 網頁/搜尋結果 / 新聞/資訊 | 開源應用/框架 | 報告/長文件 / 引用答案 | 本機語言環境 / 模型 API / 外部檢索/資料來源 / 儲存/索引 |
| [STORM](https://github.com/stanford-oval/storm) [![Star](https://img.shields.io/github/stars/stanford-oval/storm?style=flat&logo=github&label=Star)](https://github.com/stanford-oval/storm/stargazers) | 網頁/搜尋結果 / 新聞/資訊 | 開源應用/框架 | 報告/長文件 / 引用答案 | 本機語言環境 / 模型 API / 外部檢索/資料來源 / 儲存/索引 |
| [Scira](https://github.com/zaidmukaddam/scira) [![Star](https://img.shields.io/github/stars/zaidmukaddam/scira?style=flat&logo=github&label=Star)](https://github.com/zaidmukaddam/scira/stargazers) | 網頁/搜尋結果 / 新聞/資訊 | 開源應用/框架 / Bot/助手 | 報告/長文件 / 引用答案 | 本機語言環境 / 模型 API / 外部檢索/資料來源 / 儲存/索引 |
| [Vane](https://github.com/ItzCrazyKns/Vane) [![Star](https://img.shields.io/github/stars/ItzCrazyKns/Vane?style=flat&logo=github&label=Star)](https://github.com/ItzCrazyKns/Vane/stargazers) | 網頁/搜尋結果 / 新聞/資訊 | 開源應用/框架 / Bot/助手 | 報告/長文件 / 引用答案 | 本機語言環境 / 模型 API / 外部檢索/資料來源 / 儲存/索引 |
| [FinRobot](https://github.com/AI4Finance-Foundation/FinRobot) [![Star](https://img.shields.io/github/stars/AI4Finance-Foundation/FinRobot?style=flat&logo=github&label=Star)](https://github.com/AI4Finance-Foundation/FinRobot/stargazers) | 新聞/資訊 / 資料/表格 / 網頁/搜尋結果 | 開源應用/框架 | 報告/長文件 / 圖表/儀表板 | 本機語言環境 / 模型 API / 外部檢索/資料來源 / 渲染/匯出 |
| [Market-Intelligence-Agent](https://github.com/vikas-kashyap97/Market-Intelligence-Agent) [![Star](https://img.shields.io/github/stars/vikas-kashyap97/Market-Intelligence-Agent?style=flat&logo=github&label=Star)](https://github.com/vikas-kashyap97/Market-Intelligence-Agent/stargazers) | 新聞/資訊 / 資料/表格 / 網頁/搜尋結果 | 開源應用/框架 | 圖表/儀表板 / 報告/簡報 | 本機語言環境 / 模型 API / 外部檢索/資料來源 / 渲染/匯出 / 儲存/索引 |
| [World Monitor](https://github.com/FutureSpeakAI/agent-fridays-global-intelligence-monitor) [![Star](https://img.shields.io/github/stars/FutureSpeakAI/agent-fridays-global-intelligence-monitor?style=flat&logo=github&label=Star)](https://github.com/FutureSpeakAI/agent-fridays-global-intelligence-monitor/stargazers) | 新聞/資訊 / 網頁/搜尋結果 | 開源應用/框架 | 圖表/儀表板 / 報告/簡報 | 本機語言環境 / 模型 API / 外部檢索/資料來源 / 渲染/匯出 / 儲存/索引 |
| [OSSInsight](https://github.com/pingcap/ossinsight) [![Star](https://img.shields.io/github/stars/pingcap/ossinsight?style=flat&logo=github&label=Star)](https://github.com/pingcap/ossinsight/stargazers) | 程式碼庫 / 資料/表格 / 網頁/搜尋結果 | 開源應用/框架 / 產品/SaaS | 圖表/儀表板 / 報告/簡報 | 瀏覽器/帳號 / 外部檢索/資料來源 / 渲染/匯出 / 儲存/索引 |

### 文件、PDF 與知識庫

從 PDF、Office 文件、網頁、個人資料庫或團隊知識庫出發，生成簡報、問答、學習材料和知识地圖。

| 專案 | 資訊來源 | 工具形態 | 產出物形式 | 依賴類型 |
| --- | --- | --- | --- | --- |
| [notex](https://github.com/smallnest/notex) [![Star](https://img.shields.io/github/stars/smallnest/notex?style=flat&logo=github&label=Star)](https://github.com/smallnest/notex/stargazers) | PDF/文件 / 網頁/搜尋結果 / 知識庫/個人資料 | 開源應用/框架 | 報告/簡報 / 心智圖/知識地圖 / 問答/學習材料 | 本機語言環境 / 模型 API / 文件解析/OCR / 渲染/匯出 / 儲存/索引 |
| [Open Notebook](https://github.com/lfnovo/open-notebook) [![Star](https://img.shields.io/github/stars/lfnovo/open-notebook?style=flat&logo=github&label=Star)](https://github.com/lfnovo/open-notebook/stargazers) | PDF/文件 / 網頁/搜尋結果 / 知識庫/個人資料 | 開源應用/框架 | 報告/簡報 / 心智圖/知識地圖 / 問答/學習材料 | 本機語言環境 / 模型 API / 文件解析/OCR / 儲存/索引 |
| [SurfSense](https://github.com/MODSetter/SurfSense) [![Star](https://img.shields.io/github/stars/MODSetter/SurfSense?style=flat&logo=github&label=Star)](https://github.com/MODSetter/SurfSense/stargazers) | PDF/文件 / 網頁/搜尋結果 / 知識庫/個人資料 | 開源應用/框架 | 報告/簡報 / 心智圖/知識地圖 / 問答/學習材料 | 本機語言環境 / 模型 API / 外部檢索/資料來源 / 儲存/索引 |
| [NotebookLM](https://notebooklm.google/) | PDF/文件 / 網頁/搜尋結果 / 知識庫/個人資料 | 產品/SaaS / Bot/助手 | 報告/簡報 / 心智圖/知識地圖 / 問答/學習材料 | 瀏覽器/帳號 |
| [NotebookLM AI Plugin](https://github.com/proyecto26/notebooklm-ai-plugin) [![Star](https://img.shields.io/github/stars/proyecto26/notebooklm-ai-plugin?style=flat&logo=github&label=Star)](https://github.com/proyecto26/notebooklm-ai-plugin/stargazers) | PDF/文件 / 網頁/搜尋結果 / 知識庫/個人資料 / 任意/多源 | Agent Skill / Bot/助手 | PPT/簡報 / 影片/音訊 / 心智圖/知識地圖 / 資訊圖/視覺報告 / 報告/簡報 / 表格/時間線 / 問答/學習材料 | Agent 宿主 / 瀏覽器/帳號 / 本機語言環境 / 文件解析/OCR / 外部檢索/資料源 / 渲染/匯出 |

### 程式碼庫與軟體系統

把 GitHub 倉庫、本機程式碼、依賴和 diff 轉成架構圖、程式碼地圖、Repo Wiki 或知識圖譜。

| 專案 | 資訊來源 | 工具形態 | 產出物形式 | 依賴類型 |
| --- | --- | --- | --- | --- |
| [GitDiagram](https://github.com/ahmedkhaleel2004/gitdiagram) [![Star](https://img.shields.io/github/stars/ahmedkhaleel2004/gitdiagram?style=flat&logo=github&label=Star)](https://github.com/ahmedkhaleel2004/gitdiagram/stargazers) | 程式碼庫 | 開源應用/框架 | 程式碼地圖/Repo Wiki / 架構圖/流程圖 | 瀏覽器/帳號 / 模型 API / 程式碼分析工具 |
| [CodeBoarding](https://github.com/Codeboarding/CodeBoarding) [![Star](https://img.shields.io/github/stars/Codeboarding/CodeBoarding?style=flat&logo=github&label=Star)](https://github.com/Codeboarding/CodeBoarding/stargazers) | 程式碼庫 | 開源應用/框架 | 程式碼地圖/Repo Wiki / 架構圖/流程圖 | 本機語言環境 / 模型 API / 程式碼分析工具 / 渲染/匯出 / 儲存/索引 |
| [Understand-Anything](https://github.com/Egonex-AI/Understand-Anything) [![Star](https://img.shields.io/github/stars/Egonex-AI/Understand-Anything?style=flat&logo=github&label=Star)](https://github.com/Egonex-AI/Understand-Anything/stargazers) | 程式碼庫 | Agent Skill | 程式碼地圖/Repo Wiki / 架構圖/流程圖 | Agent 宿主 / 本機語言環境 / 模型 API / 程式碼分析工具 / 儲存/索引 |
| [GitNexus](https://github.com/abhigyanpatwari/GitNexus) [![Star](https://img.shields.io/github/stars/abhigyanpatwari/GitNexus?style=flat&logo=github&label=Star)](https://github.com/abhigyanpatwari/GitNexus/stargazers) | 程式碼庫 | 開源應用/框架 / MCP Server | 程式碼地圖/Repo Wiki / 架構圖/流程圖 / 網頁/互動頁面 | MCP Client / 本機語言環境 / 程式碼分析工具 / 儲存/索引 / 渲染/匯出 |
| [DeepWiki Open](https://github.com/AsyncFuncAI/deepwiki-open) [![Star](https://img.shields.io/github/stars/AsyncFuncAI/deepwiki-open?style=flat&logo=github&label=Star)](https://github.com/AsyncFuncAI/deepwiki-open/stargazers) | 程式碼庫 | 開源應用/框架 | 程式碼地圖/Repo Wiki / 架構圖/流程圖 | 本機語言環境 / 模型 API / 程式碼分析工具 / 渲染/匯出 |
| [PocketFlow Tutorial Codebase Knowledge](https://github.com/The-Pocket/PocketFlow-Tutorial-Codebase-Knowledge) [![Star](https://img.shields.io/github/stars/The-Pocket/PocketFlow-Tutorial-Codebase-Knowledge?style=flat&logo=github&label=Star)](https://github.com/The-Pocket/PocketFlow-Tutorial-Codebase-Knowledge/stargazers) | 程式碼庫 | 開源應用/框架 | 程式碼地圖/Repo Wiki / 架構圖/流程圖 | 本機語言環境 / 模型 API / 程式碼分析工具 / 渲染/匯出 |
| [local-deepwiki-mcp](https://github.com/UrbanDiver/local-deepwiki-mcp) [![Star](https://img.shields.io/github/stars/UrbanDiver/local-deepwiki-mcp?style=flat&logo=github&label=Star)](https://github.com/UrbanDiver/local-deepwiki-mcp/stargazers) | 程式碼庫 | MCP Server / 開源應用/框架 | 程式碼地圖/Repo Wiki / 架構圖/流程圖 / 網頁/互動頁面 / SVG/PNG/PDF | MCP Client / 本機語言環境 / 模型 API / 程式碼分析工具 / 儲存/索引 / 渲染/匯出 / GPU/加速器 |
| [GitVizz](https://github.com/adithya-s-k/GitVizz) [![Star](https://img.shields.io/github/stars/adithya-s-k/GitVizz?style=flat&logo=github&label=Star)](https://github.com/adithya-s-k/GitVizz/stargazers) | 程式碼庫 | 開源應用/框架 | 程式碼地圖/Repo Wiki / 架構圖/流程圖 | 瀏覽器/帳號 / 模型 API / 程式碼分析工具 / 渲染/匯出 |
| [codeflow](https://github.com/braedonsaunders/codeflow) [![Star](https://img.shields.io/github/stars/braedonsaunders/codeflow?style=flat&logo=github&label=Star)](https://github.com/braedonsaunders/codeflow/stargazers) | 程式碼庫 | 開源應用/框架 | 程式碼地圖/Repo Wiki / 架構圖/流程圖 | 瀏覽器/帳號 / 模型 API / 程式碼分析工具 / 渲染/匯出 |
| [oh-my-mermaid](https://github.com/oh-my-mermaid/oh-my-mermaid) [![Star](https://img.shields.io/github/stars/oh-my-mermaid/oh-my-mermaid?style=flat&logo=github&label=Star)](https://github.com/oh-my-mermaid/oh-my-mermaid/stargazers) | 程式碼庫 | Agent Skill | 程式碼地圖/Repo Wiki / 架構圖/流程圖 | Agent 宿主 / 模型 API / 程式碼分析工具 / 渲染/匯出 |
| [codag-visualizer](https://github.com/codag-megalith/codag-visualizer) [![Star](https://img.shields.io/github/stars/codag-megalith/codag-visualizer?style=flat&logo=github&label=Star)](https://github.com/codag-megalith/codag-visualizer/stargazers) | 程式碼庫 | 開源應用/框架 | 程式碼地圖/Repo Wiki / 架構圖/流程圖 | 本機語言環境 / 程式碼分析工具 / 渲染/匯出 |
| [codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp) [![Star](https://img.shields.io/github/stars/DeusData/codebase-memory-mcp?style=flat&logo=github&label=Star)](https://github.com/DeusData/codebase-memory-mcp/stargazers) | 程式碼庫 | MCP Server | 程式碼地圖/Repo Wiki / 架構圖/流程圖 | MCP Client / 本機語言環境 / 程式碼分析工具 / 儲存/索引 |
| [CodeAtlas](https://github.com/lucyb0207/CodeAtlas) [![Star](https://img.shields.io/github/stars/lucyb0207/CodeAtlas?style=flat&logo=github&label=Star)](https://github.com/lucyb0207/CodeAtlas/stargazers) | 程式碼庫 | 開源應用/框架 | 程式碼地圖/Repo Wiki / 架構圖/流程圖 | 本機語言環境 / 程式碼分析工具 / 渲染/匯出 |
| [devlensOSS](https://github.com/devlensio/devlensOSS) [![Star](https://img.shields.io/github/stars/devlensio/devlensOSS?style=flat&logo=github&label=Star)](https://github.com/devlensio/devlensOSS/stargazers) | 程式碼庫 | 開源應用/框架 | 程式碼地圖/Repo Wiki / 架構圖/流程圖 | 本機語言環境 / 程式碼分析工具 / 渲染/匯出 |
| [Visual-Explainer](https://github.com/jircik/Visual-Explainer) [![Star](https://img.shields.io/github/stars/jircik/Visual-Explainer?style=flat&logo=github&label=Star)](https://github.com/jircik/Visual-Explainer/stargazers) | 程式碼庫 | Agent Skill | 程式碼地圖/Repo Wiki / 架構圖/流程圖 | Agent 宿主 / 模型 API / 程式碼分析工具 / 渲染/匯出 |
| [codemap-skill](https://github.com/Asixa/codemap-skill) [![Star](https://img.shields.io/github/stars/Asixa/codemap-skill?style=flat&logo=github&label=Star)](https://github.com/Asixa/codemap-skill/stargazers) | 程式碼庫 | Agent Skill | 程式碼地圖/Repo Wiki / 架構圖/流程圖 | Agent 宿主 / 模型 API / 程式碼分析工具 |
| [DeepWiki](https://docs.devin.ai/work-with-devin/deepwiki) | 程式碼庫 | 產品/SaaS | 程式碼地圖/Repo Wiki / 架構圖/流程圖 | 瀏覽器/帳號 / 程式碼分析工具 |
| [CodeSee](https://www.codesee.io/) | 程式碼庫 | 產品/SaaS | 程式碼地圖/Repo Wiki / 架構圖/流程圖 | 瀏覽器/帳號 / 程式碼分析工具 |

### 資料、表格與業務指標

把 CSV、資料庫、指標和業務資料轉成圖表、儀表板或分析報告。

| 專案 | 資訊來源 | 工具形態 | 產出物形式 | 依賴類型 |
| --- | --- | --- | --- | --- |
| [Data Formulator](https://github.com/microsoft/data-formulator) [![Star](https://img.shields.io/github/stars/microsoft/data-formulator?style=flat&logo=github&label=Star)](https://github.com/microsoft/data-formulator/stargazers) | 資料/表格 / 資料庫 | 開源應用/框架 | 圖表/儀表板 / 報告/簡報 | 本機語言環境 / 模型 API / 渲染/匯出 |
| [LIDA](https://github.com/microsoft/lida) [![Star](https://img.shields.io/github/stars/microsoft/lida?style=flat&logo=github&label=Star)](https://github.com/microsoft/lida/stargazers) | 資料/表格 / 資料庫 | 開源應用/框架 | 圖表/儀表板 / 報告/簡報 | 本機語言環境 / 模型 API / 渲染/匯出 |
| [WrenAI](https://github.com/Canner/WrenAI) [![Star](https://img.shields.io/github/stars/Canner/WrenAI?style=flat&logo=github&label=Star)](https://github.com/Canner/WrenAI/stargazers) | 資料/表格 / 資料庫 / 知識庫/個人資料 | 開源應用/框架 / Agent Skill | 圖表/儀表板 / 報告/簡報 | Agent 宿主 / 本機語言環境 / 模型 API / 外部檢索/資料來源 / 儲存/索引 |
| [Vanna](https://github.com/vanna-ai/vanna) [![Star](https://img.shields.io/github/stars/vanna-ai/vanna?style=flat&logo=github&label=Star)](https://github.com/vanna-ai/vanna/stargazers) | 資料庫 / 資料/表格 | 開源應用/框架 / API/SDK/庫 | 圖表/儀表板 / 報告/簡報 | 本機語言環境 / 模型 API / 外部檢索/資料來源 / 儲存/索引 / 渲染/匯出 |
| [VMind](https://github.com/VisActor/VMind) [![Star](https://img.shields.io/github/stars/VisActor/VMind?style=flat&logo=github&label=Star)](https://github.com/VisActor/VMind/stargazers) | 資料/表格 / 文字/想法 | API/SDK/庫 | 圖表/儀表板 / 資訊圖/視覺報告 / 圖表/渲染輸出 | 本機語言環境 / 模型 API / 渲染/匯出 / 範本/素材 |
| [Semiotic](https://github.com/nteract/semiotic) [![Star](https://img.shields.io/github/stars/nteract/semiotic?style=flat&logo=github&label=Star)](https://github.com/nteract/semiotic/stargazers) | 資料/表格 / DSL/代碼 | API/SDK/庫 / MCP Server | 圖表/儀表板 / 圖表/渲染輸出 / SVG/PNG/PDF | 本機語言環境 / MCP Client / 渲染/匯出 / 範本/素材 |
| [chart-visualization-skills](https://github.com/antvis/chart-visualization-skills) [![Star](https://img.shields.io/github/stars/antvis/chart-visualization-skills?style=flat&logo=github&label=Star)](https://github.com/antvis/chart-visualization-skills/stargazers) | 資料/表格 / 文字/想法 / 代碼/技術描述 | Skill 集合 / API/SDK/庫 | 圖表/儀表板 / 資訊圖/視覺報告 / 架構圖/流程圖 / 圖表/渲染輸出 | Agent 宿主 / 本機語言環境 / 渲染/匯出 / 模板/素材 |
| [mcp-server-chart](https://github.com/antvis/mcp-server-chart) [![Star](https://img.shields.io/github/stars/antvis/mcp-server-chart?style=flat&logo=github&label=Star)](https://github.com/antvis/mcp-server-chart/stargazers) | 資料/表格 / 文字/想法 / 資料庫 | MCP Server / Skill 集合 | 圖表/儀表板 / 資訊圖/視覺報告 / 架構圖/流程圖 / 白板/心智圖 / 圖表/渲染輸出 | MCP Client / 本機語言環境 / 渲染/匯出 |
| [mcp-dashboards](https://github.com/KyuRish/mcp-dashboards) [![Star](https://img.shields.io/github/stars/KyuRish/mcp-dashboards?style=flat&logo=github&label=Star)](https://github.com/KyuRish/mcp-dashboards/stargazers) | 資料/表格 / 資料庫 / 任意/多源 | MCP Server | 圖表/儀表板 / PPT/簡報 / SVG/PNG/PDF | MCP Client / Agent 宿主 / 本機語言環境 / 外部檢索/資料源 / 渲染/匯出 |
| [mcp-grafana](https://github.com/grafana/mcp-grafana) [![Star](https://img.shields.io/github/stars/grafana/mcp-grafana?style=flat&logo=github&label=Star)](https://github.com/grafana/mcp-grafana/stargazers) | 資料/表格 / 資料庫 / 任意/多源 | MCP Server | 圖表/儀表板 / SVG/PNG/PDF / 證據表 | MCP Client / 瀏覽器/帳號 / 外部檢索/資料源 / 渲染/匯出 / 系統工具 |
| [Claude Data Analysis Assistant](https://github.com/liangdabiao/claude-data-analysis) [![Star](https://img.shields.io/github/stars/liangdabiao/claude-data-analysis?style=flat&logo=github&label=Star)](https://github.com/liangdabiao/claude-data-analysis/stargazers) | 資料/表格 / 資料庫 | Agent Skill / 開源應用/框架 | 圖表/儀表板 / 報告/長文件 / SVG/PNG/PDF | Agent 宿主 / 本機語言環境 / 模型 API / 渲染/匯出 / 範本/素材 |
| [wshm](https://github.com/wshm-dev/wshm) [![Star](https://img.shields.io/github/stars/wshm-dev/wshm?style=flat&logo=github&label=Star)](https://github.com/wshm-dev/wshm/stargazers) | 程式碼庫 / 資料/表格 / 網頁/搜尋結果 | 開源應用/框架 | 圖表/儀表板 / 報告/長文件 / 網頁/互動頁面 | 本機語言環境 / 模型 API / 外部檢索/資料來源 / 程式碼分析工具 / 儲存/索引 / 渲染/匯出 |
| [MatPlotAgent](https://github.com/thunlp/MatPlotAgent) [![Star](https://img.shields.io/github/stars/thunlp/MatPlotAgent?style=flat&logo=github&label=Star)](https://github.com/thunlp/MatPlotAgent/stargazers) | 資料/表格 / 資料庫 | 研究原型 | 圖表/儀表板 / 報告/簡報 | 本機語言環境 / 模型 API / 渲染/匯出 |
| [OpenVizAI](https://github.com/OpenVizAI/OpenVizAI) [![Star](https://img.shields.io/github/stars/OpenVizAI/OpenVizAI?style=flat&logo=github&label=Star)](https://github.com/OpenVizAI/OpenVizAI/stargazers) | 資料/表格 / 資料庫 | 開源應用/框架 | 圖表/儀表板 / 報告/簡報 | 本機語言環境 / 模型 API / 渲染/匯出 |
| [generative-dashboard-builder](https://github.com/KaranChandekar/generative-dashboard-builder) [![Star](https://img.shields.io/github/stars/KaranChandekar/generative-dashboard-builder?style=flat&logo=github&label=Star)](https://github.com/KaranChandekar/generative-dashboard-builder/stargazers) | 資料/表格 / 資料庫 | 開源應用/框架 | 圖表/儀表板 / 報告/簡報 | 本機語言環境 / 模型 API / 渲染/匯出 / 儲存/索引 |
| [OpenBI](https://github.com/narender-rk10/OpenBI) [![Star](https://img.shields.io/github/stars/narender-rk10/OpenBI?style=flat&logo=github&label=Star)](https://github.com/narender-rk10/OpenBI/stargazers) | 資料/表格 / 資料庫 | 開源應用/框架 | 圖表/儀表板 / 報告/簡報 | 本機語言環境 / 模型 API / 外部檢索/資料來源 / 儲存/索引 / 渲染/匯出 |

### 通用文字、想法與白板圖示

从提示詞、草稿、白板想法或半結構化文本生成信息圖、流程圖、白板圖和視覺報告。

| 專案 | 資訊來源 | 工具形態 | 產出物形式 | 依賴類型 |
| --- | --- | --- | --- | --- |
| [q-skills](https://github.com/TyrealQ/q-skills) [![Star](https://img.shields.io/github/stars/TyrealQ/q-skills?style=flat&logo=github&label=Star)](https://github.com/TyrealQ/q-skills/stargazers) | 文字/想法 / PDF/文件 / 資料/表格 | Skill 集合 | 資訊圖/視覺報告 / 報告/長文件 | Agent 宿主 / 模型 API / 本機語言環境 / 渲染/匯出 |
| [Visualize](https://github.com/careerhackeralex/visualize) [![Star](https://img.shields.io/github/stars/careerhackeralex/visualize?style=flat&logo=github&label=Star)](https://github.com/careerhackeralex/visualize/stargazers) | 文字/想法 / 資料/表格 / 程式碼/技術描述 | Agent Skill | 網頁/互動頁面 / PPT/簡報 / 圖表/儀表板 / 資訊圖/視覺報告 / 架構圖/流程圖 | Agent 宿主 / 模型 API / 本機語言環境 / 渲染/匯出 / 模板/素材 |
| [Visual Explainer Skill](https://github.com/ericblue/visual-explainer-skill) [![Star](https://img.shields.io/github/stars/ericblue/visual-explainer-skill?style=flat&logo=github&label=Star)](https://github.com/ericblue/visual-explainer-skill/stargazers) | 文字/想法 / PDF/文件 / 程式碼庫 / 程式碼/技術描述 | Agent Skill | 資訊圖/視覺報告 / 白板/心智圖 / PPT/簡報 / 架構圖/流程圖 / 圖形摘要/資訊圖 | Agent 宿主 / 模型 API / 渲染/匯出 / 模板/素材 |
| [visual-explainer](https://github.com/nicobailon/visual-explainer) [![Star](https://img.shields.io/github/stars/nicobailon/visual-explainer?style=flat&logo=github&label=Star)](https://github.com/nicobailon/visual-explainer/stargazers) | 文字/想法 / 程式碼庫 / 程式碼/技術描述 / 資料/表格 | Agent Skill | 網頁/互動頁面 / PPT/簡報 / 架構圖/流程圖 / 圖表/儀表板 / 資訊圖/視覺報告 | Agent 宿主 / 本機語言環境 / 渲染/匯出 / 範本/素材 |
| [Sideshow](https://github.com/modem-dev/sideshow) [![Star](https://img.shields.io/github/stars/modem-dev/sideshow?style=flat&logo=github&label=Star)](https://github.com/modem-dev/sideshow/stargazers) | 文字/想法 / 代碼/技術描述 / 資料/表格 / DSL/代碼 | 開源應用/框架 | 網頁/互動頁面 / 圖表/Mermaid / 架構圖/流程圖 / 圖表/儀表板 / SVG/PNG/PDF | Agent 宿主 / 本機語言環境 / 渲染/匯出 |
| [baoyu-skills](https://github.com/JimLiu/baoyu-skills) [![Star](https://img.shields.io/github/stars/JimLiu/baoyu-skills?style=flat&logo=github&label=Star)](https://github.com/JimLiu/baoyu-skills/stargazers) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | Skill 集合 | 資訊圖/視覺報告 / 圖形摘要/資訊圖 / PPT/簡報 / SVG/PNG/PDF | Agent 宿主 / 模型 API / 本機語言環境 / 渲染/匯出 / 範本/素材 |
| [aiz-infographic](https://github.com/aizzaku/aiz-infographic) [![Star](https://img.shields.io/github/stars/aizzaku/aiz-infographic?style=flat&logo=github&label=Star)](https://github.com/aizzaku/aiz-infographic/stargazers) | 文字/想法 / 資料/表格 | Agent Skill | 資訊圖/視覺報告 / 網頁/互動頁面 / SVG/PNG/PDF | Agent 宿主 / 本機語言環境 / 渲染/匯出 / 範本/素材 |
| [ascii-canvas](https://github.com/noodlebindev/ascii-canvas) [![Star](https://img.shields.io/github/stars/noodlebindev/ascii-canvas?style=flat&logo=github&label=Star)](https://github.com/noodlebindev/ascii-canvas/stargazers) | 文字/想法 / 程式碼/技術描述 / 論文/科研資料 / 資料/表格 | Agent Skill | 資訊圖/視覺報告 / 架構圖/流程圖 / 白板/心智圖 / 表格/時間線 / PPT/簡報 | Agent 宿主 / 本機語言環境 / 渲染/匯出 |
| [Piktochart AI](https://piktochart.com/generative-ai/) | 文字/想法 / PDF/文件 / 資料/表格 | 產品/SaaS | 資訊圖/視覺報告 / 報告/長文件 | 瀏覽器/帳號 / 範本/素材 |
| [hbr-style-visualization](https://github.com/kgraph57/hbr-style-visualization) [![Star](https://img.shields.io/github/stars/kgraph57/hbr-style-visualization?style=flat&logo=github&label=Star)](https://github.com/kgraph57/hbr-style-visualization/stargazers) | 文字/想法 / 資料/表格 | Agent Skill | 資訊圖/視覺報告 / 圖表/儀表板 / PPT/簡報 | Agent 宿主 / 模型 API / 渲染/匯出 / 範本/素材 |
| [viz-skills](https://github.com/silvere/viz-skills) [![Star](https://img.shields.io/github/stars/silvere/viz-skills?style=flat&logo=github&label=Star)](https://github.com/silvere/viz-skills/stargazers) | 文字/想法 / 網頁/搜尋結果 / PDF/文件 | Agent Skill | 資訊圖/視覺報告 / SVG/PNG/PDF / 白板/心智圖 | Agent 宿主 / 本地語言環境 / 渲染/匯出 |
| [Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs) | 文字/想法 / PDF/文件 / Office 文件 / 網頁/搜尋結果 / 程式碼庫 | 產品/SaaS / Bot/助手 | 資訊圖/視覺報告 / PPT/簡報 / 網頁/互動頁面 / SVG/PNG/PDF | 瀏覽器/帳號 / 模型 API / 渲染/匯出 / 範本/素材 |
| [Venngage AI Infographic Generator](https://venngage.com/ai-tools/infographic-generator) | 文字/想法 / PDF/文件 / 資料/表格 | 產品/SaaS | 資訊圖/視覺報告 / 報告/長文件 | 瀏覽器/帳號 / 範本/素材 |
| [Venngage AI Report Generator](https://venngage.com/ai-tools/report-generator) | 文字/想法 / PDF/文件 / 資料/表格 | 產品/SaaS | 資訊圖/視覺報告 / 報告/長文件 | 瀏覽器/帳號 / 範本/素材 |
| [Jeda AI Infographic Generator](https://www.jeda.ai/ai-infographic-generator) | 文字/想法 / PDF/文件 / 資料/表格 | 產品/SaaS | 資訊圖/視覺報告 / 報告/長文件 | 瀏覽器/帳號 / 文件解析/OCR / 範本/素材 |
| [Infogram](https://infogram.com/) | 文字/想法 / PDF/文件 / 資料/表格 | 產品/SaaS | 資訊圖/視覺報告 / 報告/長文件 | 瀏覽器/帳號 / 外部檢索/資料來源 / 範本/素材 |
| [DeepDiagram](https://github.com/LingyiChen-AI/DeepDiagram) [![Star](https://img.shields.io/github/stars/LingyiChen-AI/DeepDiagram?style=flat&logo=github&label=Star)](https://github.com/LingyiChen-AI/DeepDiagram/stargazers) | 文字/想法 / 代碼/技術描述 / 資料/表格 | 開源應用/框架 | 架構圖/流程圖 / 白板/心智圖 / 圖表/儀表板 / 資訊圖/視覺報告 / 圖表/Mermaid | 本機語言環境 / 模型 API / 渲染/匯出 / 範本/素材 / 儲存/索引 |
| [next-ai-draw-io](https://github.com/DayuanJiang/next-ai-draw-io) [![Star](https://img.shields.io/github/stars/DayuanJiang/next-ai-draw-io?style=flat&logo=github&label=Star)](https://github.com/DayuanJiang/next-ai-draw-io/stargazers) | 文字/想法 / 代碼/技術描述 | 開源應用/框架 | 架構圖/流程圖 / 白板/心智圖 / SVG/PNG/PDF | 瀏覽器/帳號 / 本機語言環境 / 模型 API / 渲染/匯出 / 範本/素材 |
| [Napkin AI](https://www.napkin.ai/) | 文字/想法 / 代碼/技術描述 | 產品/SaaS | 架構圖/流程圖 / 白板/心智圖 | 瀏覽器/帳號 / 範本/素材 |
| [Eraser AI](https://www.eraser.io/ai) | 文字/想法 / 代碼/技術描述 | 產品/SaaS | 架構圖/流程圖 / 白板/心智圖 | 瀏覽器/帳號 / 範本/素材 |
| [Mermaid Chart AI](https://mermaid.ai/mermaid-ai) | 文字/想法 / 代碼/技術描述 | 產品/SaaS | 架構圖/流程圖 / 白板/心智圖 | 瀏覽器/帳號 / 渲染/匯出 |
| [Whimsical AI](https://whimsical.com/ai) | 文字/想法 / 代碼/技術描述 | 產品/SaaS | 架構圖/流程圖 / 白板/心智圖 | 瀏覽器/帳號 / 範本/素材 |
| [Lucid AI](https://www.lucidchart.com/pages/use-cases/diagram-with-AI) | 文字/想法 / 代碼/技術描述 | 產品/SaaS | 架構圖/流程圖 / 白板/心智圖 | 瀏覽器/帳號 / 範本/素材 |
| [Miro AI diagrams](https://help.miro.com/hc/en-us/articles/28782102127890-Miro-AI-with-Diagrams-and-mindmaps) | 文字/想法 / 代碼/技術描述 | 產品/SaaS | 架構圖/流程圖 / 白板/心智圖 | 瀏覽器/帳號 / 範本/素材 |
| [FigJam AI](https://help.figma.com/hc/en-us/articles/18706554628119-Make-boards-and-diagrams-with-FigJam-AI) | 文字/想法 / 代碼/技術描述 | 產品/SaaS | 架構圖/流程圖 / 白板/心智圖 | 瀏覽器/帳號 / 範本/素材 |

### 程式化影片與動態講解

把提示詞、網頁、程式碼庫、結構化時間軸或 Agent 生成的 HTML 轉成帶旁白或動畫的 MP4/影片產物。

| 專案 | 資訊來源 | 工具形態 | 產出物形式 | 依賴類型 |
| --- | --- | --- | --- | --- |
| [html-video](https://github.com/nexu-io/html-video) [![Star](https://img.shields.io/github/stars/nexu-io/html-video?style=flat&logo=github&label=Star)](https://github.com/nexu-io/html-video/stargazers) | 文字/想法 / 網頁/搜尋結果 / 程式碼庫 | 開源應用/框架 | 影片/音訊 / 網頁/互動頁面 | Agent 宿主 / 本機語言環境 / 模型 API / 渲染/匯出 / 系統工具 / 範本/素材 |
| [HyperFrames](https://github.com/heygen-com/hyperframes) [![Star](https://img.shields.io/github/stars/heygen-com/hyperframes?style=flat&logo=github&label=Star)](https://github.com/heygen-com/hyperframes/stargazers) | 文字/想法 / 網頁/搜尋結果 / PDF/文件 / 資料/表格 / DSL/代碼 | 開源應用/框架 / Agent Skill | 影片/音訊 / 網頁/互動頁面 / 圖表/儀表板 | Agent 宿主 / 本機語言環境 / 渲染/匯出 / 系統工具 / 範本/素材 |
| [NextFrame](https://github.com/ChaosRealmsAI/NextFrame) [![Star](https://img.shields.io/github/stars/ChaosRealmsAI/NextFrame?style=flat&logo=github&label=Star)](https://github.com/ChaosRealmsAI/NextFrame/stargazers) | DSL/代碼 / 文字/想法 | 開源應用/框架 | 影片/音訊 / 網頁/互動頁面 | 本機語言環境 / 渲染/匯出 / 系統工具 |
| [Helios](https://github.com/BintzGavin/helios) [![Star](https://img.shields.io/github/stars/BintzGavin/helios?style=flat&logo=github&label=Star)](https://github.com/BintzGavin/helios/stargazers) | DSL/代碼 / 文字/想法 | API/SDK/庫 / Agent Skill | 影片/音訊 / 網頁/互動頁面 | 本機語言環境 / 渲染/匯出 / 系統工具 / Agent 宿主 |
| [OpenMontage](https://github.com/calesthio/OpenMontage) [![Star](https://img.shields.io/github/stars/calesthio/OpenMontage?style=flat&logo=github&label=Star)](https://github.com/calesthio/OpenMontage/stargazers) | 文字/想法 / 網頁/搜尋結果 / 新聞/資訊 | 開源應用/框架 | 影片/音訊 | Agent 宿主 / 本機語言環境 / 模型 API / 外部檢索/資料源 / 渲染/匯出 / 系統工具 |
| [ralphy](https://github.com/alecs5am/ralphy) [![Star](https://img.shields.io/github/stars/alecs5am/ralphy?style=flat&logo=github&label=Star)](https://github.com/alecs5am/ralphy/stargazers) | 文字/想法 / 網頁/搜尋結果 | 開源應用/框架 | 影片/音訊 | Agent 宿主 / 本機語言環境 / 模型 API / 渲染/匯出 / 系統工具 / 儲存/索引 |
| [data-animation-skills](https://github.com/iart-ai/data-animation-skills) [![Star](https://img.shields.io/github/stars/iart-ai/data-animation-skills?style=flat&logo=github&label=Star)](https://github.com/iart-ai/data-animation-skills/stargazers) | 資料/表格 / 文字/想法 | Skill 集合 | 影片/音訊 / 圖表/儀表板 / 資訊圖/視覺報告 / PPT/簡報 | Agent 宿主 / 本機語言環境 / 渲染/匯出 / 範本/素材 |

### 簡報與多來源內容呈現

把文本、文件、網頁、研究材料或大綱轉成 PPT、Deck，或讓 Agent 生成/编辑簡報。

| 專案 | 資訊來源 | 工具形態 | 產出物形式 | 依賴類型 |
| --- | --- | --- | --- | --- |
| [ppt-master](https://github.com/hugohe3/ppt-master) [![Star](https://img.shields.io/github/stars/hugohe3/ppt-master?style=flat&logo=github&label=Star)](https://github.com/hugohe3/ppt-master/stargazers) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | 開源應用/框架 | PPT/簡報 | 本機語言環境 / 模型 API / 渲染/匯出 / 範本/素材 |
| [Presenton](https://github.com/presenton/presenton) [![Star](https://img.shields.io/github/stars/presenton/presenton?style=flat&logo=github&label=Star)](https://github.com/presenton/presenton/stargazers) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | 開源應用/框架 / API/SDK/庫 | PPT/簡報 | 本機語言環境 / 模型 API / 渲染/匯出 / MCP Client / 範本/素材 |
| [PPTAgent](https://github.com/icip-cas/PPTAgent) [![Star](https://img.shields.io/github/stars/icip-cas/PPTAgent?style=flat&logo=github&label=Star)](https://github.com/icip-cas/PPTAgent/stargazers) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | 研究原型 | PPT/簡報 | 本機語言環境 / 模型 API / 渲染/匯出 / 範本/素材 |
| [AI Multi-Agent Presentation Builder](https://github.com/Azure-Samples/ai-multi-agent-presentation-builder) [![Star](https://img.shields.io/github/stars/Azure-Samples/ai-multi-agent-presentation-builder?style=flat&logo=github&label=Star)](https://github.com/Azure-Samples/ai-multi-agent-presentation-builder/stargazers) | 文字/想法 / 網頁/搜尋結果 | 開源應用/框架 | PPT/簡報 | 本機語言環境 / 模型 API / 外部檢索/資料源 / 渲染/匯出 / 範本/素材 |
| [presentation-ai](https://github.com/allweonedev/presentation-ai) [![Star](https://img.shields.io/github/stars/allweonedev/presentation-ai?style=flat&logo=github&label=Star)](https://github.com/allweonedev/presentation-ai/stargazers) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | 開源應用/框架 | PPT/簡報 | 本機語言環境 / 模型 API / 渲染/匯出 / 範本/素材 |
| [DeckForge](https://github.com/Whatsonyourmind/deckforge) [![Star](https://img.shields.io/github/stars/Whatsonyourmind/deckforge?style=flat&logo=github&label=Star)](https://github.com/Whatsonyourmind/deckforge/stargazers) | 文字/想法 / 資料/表格 / 資料庫 | 開源應用/框架 / MCP Server / API/SDK/库 | PPT/簡報 / 圖表/儀表板 | MCP Client / 本地語言環境 / 模型 API / 渲染/匯出 / 範本/素材 / 儲存/索引 |
| [slide-deck-ai](https://github.com/barun-saha/slide-deck-ai) [![Star](https://img.shields.io/github/stars/barun-saha/slide-deck-ai?style=flat&logo=github&label=Star)](https://github.com/barun-saha/slide-deck-ai/stargazers) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | 開源應用/框架 | PPT/簡報 | 本機語言環境 / 模型 API / 渲染/匯出 / 範本/素材 |
| [odin-slides](https://github.com/leonid20000/odin-slides) [![Star](https://img.shields.io/github/stars/leonid20000/odin-slides?style=flat&logo=github&label=Star)](https://github.com/leonid20000/odin-slides/stargazers) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | 開源應用/框架 | PPT/簡報 | 本機語言環境 / 模型 API / 文件解析/OCR / 渲染/匯出 / 系統工具 |
| [ppt-agents](https://github.com/chenxingqiang/ppt-agents) [![Star](https://img.shields.io/github/stars/chenxingqiang/ppt-agents?style=flat&logo=github&label=Star)](https://github.com/chenxingqiang/ppt-agents/stargazers) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | 開源應用/框架 | PPT/簡報 | Agent 宿主 / 本機語言環境 / 模型 API / 渲染/匯出 |
| [deckdown](https://github.com/adityachauhan0/deckdown) [![Star](https://img.shields.io/github/stars/adityachauhan0/deckdown?style=flat&logo=github&label=Star)](https://github.com/adityachauhan0/deckdown/stargazers) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | 開源應用/框架 | PPT/簡報 | 本機語言環境 / 渲染/匯出 |
| [Frontend Slides](https://github.com/zarazhangrui/frontend-slides) [![Star](https://img.shields.io/github/stars/zarazhangrui/frontend-slides?style=flat&logo=github&label=Star)](https://github.com/zarazhangrui/frontend-slides/stargazers) | Text/ideas / PDF/documents | Agent Skill | PPT/deck / Web/interactive page | Agent host / Model API / Local runtime / Rendering/export |
| [Slides AI Plugin](https://github.com/proyecto26/slides-ai-plugin) [![Star](https://img.shields.io/github/stars/proyecto26/slides-ai-plugin?style=flat&logo=github&label=Star)](https://github.com/proyecto26/slides-ai-plugin/stargazers) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | Agent Skill | PPT/簡報 / 網頁/互動頁面 | Agent 宿主 / 模型 API / 本機語言環境 / 渲染/匯出 / 範本/素材 |
| [Present](https://github.com/glebis/claude-skills/tree/main/present) [![Star](https://img.shields.io/github/stars/glebis/claude-skills?style=flat&logo=github&label=Star)](https://github.com/glebis/claude-skills/stargazers) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 / 知識庫/個人資料 | Agent Skill | PPT/簡報 / 網頁/互動頁面 / 影片/音訊 / 報告/長文件 | Agent 宿主 / 模型 API / 本地語言環境 / 渲染/匯出 / 模板/素材 |
| [slidemason](https://github.com/erickittelson/slidemason) [![Star](https://img.shields.io/github/stars/erickittelson/slidemason?style=flat&logo=github&label=Star)](https://github.com/erickittelson/slidemason/stargazers) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | 開源應用/框架 / Agent Skill | PPT/簡報 / SVG/PNG/PDF | Agent 宿主 / 本機語言環境 / 渲染/匯出 / 範本/素材 |
| [cc-slidev](https://github.com/rhuss/cc-slidev) [![Star](https://img.shields.io/github/stars/rhuss/cc-slidev?style=flat&logo=github&label=Star)](https://github.com/rhuss/cc-slidev/stargazers) | 文字/想法 / 代碼/技術描述 | Agent Skill | PPT/簡報 / 網頁/互動頁面 / SVG/PNG/PDF | Agent 宿主 / 本機語言環境 / 渲染/匯出 / 範本/素材 |
| [slidev-deck-stack](https://github.com/astroicers/slidev-deck-stack) [![Star](https://img.shields.io/github/stars/astroicers/slidev-deck-stack?style=flat&logo=github&label=Star)](https://github.com/astroicers/slidev-deck-stack/stargazers) | 文字/想法 / 代碼/技術描述 / DSL/代碼 | Agent Skill | PPT/簡報 / 網頁/互動頁面 / 圖表/Mermaid / SVG/PNG/PDF | Agent 宿主 / 本地語言環境 / 渲染/匯出 / 範本/素材 |
| [high-quality-slides](https://github.com/andyqiu847-ai/high-quality-slides) [![Star](https://img.shields.io/github/stars/andyqiu847-ai/high-quality-slides?style=flat&logo=github&label=Star)](https://github.com/andyqiu847-ai/high-quality-slides/stargazers) | 文字/想法 / PDF/文件 / Office 文件 / 網頁/搜尋結果 | Agent Skill | PPT/簡報 / 網頁/互動頁面 / SVG/PNG/PDF | Agent 宿主 / 模型 API / 本地語言環境 / 文件解析/OCR / 渲染/匯出 / 範本/素材 |
| [Presentation Skill](https://github.com/grapeot/presentation_skill) [![Star](https://img.shields.io/github/stars/grapeot/presentation_skill?style=flat&logo=github&label=Star)](https://github.com/grapeot/presentation_skill/stargazers) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | Agent Skill | PPT/簡報 / 網頁/互動頁面 / 圖形摘要/資訊圖 | Agent 宿主 / 模型 API / 本地語言環境 / 渲染/匯出 / 範本/素材 |
| [presentation-writing-claude-skill](https://github.com/marcusnelson/presentation-writing-claude-skill) [![Star](https://img.shields.io/github/stars/marcusnelson/presentation-writing-claude-skill?style=flat&logo=github&label=Star)](https://github.com/marcusnelson/presentation-writing-claude-skill/stargazers) | 文字/想法 / PDF/文件 / Office 文件 / 資料/表格 | Agent Skill | PPT/簡報 / 報告/簡報 / 結構化資料/Markdown | Agent 宿主 / 模型 API / 文件解析/OCR / 渲染/匯出 / 範本/素材 |
| [Office-PowerPoint-MCP-Server](https://github.com/GongRzhe/Office-PowerPoint-MCP-Server) [![Star](https://img.shields.io/github/stars/GongRzhe/Office-PowerPoint-MCP-Server?style=flat&logo=github&label=Star)](https://github.com/GongRzhe/Office-PowerPoint-MCP-Server/stargazers) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | MCP Server | PPT/簡報 | MCP Client / 本機語言環境 / 渲染/匯出 / 系統工具 |
| [PptMcp](https://github.com/trsdn/mcp-server-ppt) [![Star](https://img.shields.io/github/stars/trsdn/mcp-server-ppt?style=flat&logo=github&label=Star)](https://github.com/trsdn/mcp-server-ppt/stargazers) | 文字/想法 / Office 文件 / 資料/表格 | MCP Server / API/SDK/庫 | PPT/簡報 / SVG/PNG/PDF / 影片/音訊 / 圖表/儀表板 | MCP Client / 本機語言環境 / 渲染/匯出 / 系統工具 |
| [ppt-mcp](https://github.com/ykuwai/ppt-mcp) [![Star](https://img.shields.io/github/stars/ykuwai/ppt-mcp?style=flat&logo=github&label=Star)](https://github.com/ykuwai/ppt-mcp/stargazers) | 文字/想法 / Office 文件 / 資料/表格 | MCP Server | PPT/簡報 / SVG/PNG/PDF / 圖表/儀表板 | MCP Client / 本地語言環境 / 渲染/匯出 / 系統工具 / 模板/素材 |
| [Alai MCP Server](https://github.com/getalai/alai-mcp-server) [![Star](https://img.shields.io/github/stars/getalai/alai-mcp-server?style=flat&logo=github&label=Star)](https://github.com/getalai/alai-mcp-server/stargazers) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | MCP Server / 產品/SaaS | PPT/簡報 / SVG/PNG/PDF | MCP Client / 瀏覽器/帳號 / 渲染/匯出 / 範本/素材 |
| [Presentations.AI MCP Server](https://github.com/slidecraft-in/presentations-ai-mcp-server) [![Star](https://img.shields.io/github/stars/slidecraft-in/presentations-ai-mcp-server?style=flat&logo=github&label=Star)](https://github.com/slidecraft-in/presentations-ai-mcp-server/stargazers) | 文字/想法 / PDF/文件 / Office 文件 / 網頁/搜尋結果 | MCP Server / 產品/SaaS | PPT/簡報 / SVG/PNG/PDF | MCP Client / 瀏覽器/帳號 / 文件解析/OCR / 渲染/匯出 / 範本/素材 |
| [google-slides-mcp](https://github.com/matteoantoci/google-slides-mcp) [![Star](https://img.shields.io/github/stars/matteoantoci/google-slides-mcp?style=flat&logo=github&label=Star)](https://github.com/matteoantoci/google-slides-mcp/stargazers) | 文字/想法 / Office 文件 | MCP Server | PPT/簡報 | MCP Client / 本機語言環境 / 瀏覽器/帳號 / 渲染/匯出 |
| [DocGem MCP](https://github.com/xpm-cmd/docgem-mcp) [![Star](https://img.shields.io/github/stars/xpm-cmd/docgem-mcp?style=flat&logo=github&label=Star)](https://github.com/xpm-cmd/docgem-mcp/stargazers) | 文字/想法 / Office 文件 / 資料/表格 / DSL/代碼 | MCP Server | PPT/簡報 / 報告/長文件 / 圖表/Mermaid / 架構圖/流程圖 / SVG/PNG/PDF / 結構化資料/Markdown | MCP Client / Agent 宿主 / 本機語言環境 / 渲染/匯出 / 系統工具 |
| [mcp-ppt](https://github.com/ltc6539/mcp-ppt) [![Star](https://img.shields.io/github/stars/ltc6539/mcp-ppt?style=flat&logo=github&label=Star)](https://github.com/ltc6539/mcp-ppt/stargazers) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | MCP Server | PPT/簡報 / SVG/PNG/PDF | MCP Client / 本機語言環境 / 渲染/匯出 |
| [pptx-tools](https://github.com/jongalloway/pptx-tools) [![Star](https://img.shields.io/github/stars/jongalloway/pptx-tools?style=flat&logo=github&label=Star)](https://github.com/jongalloway/pptx-tools/stargazers) | 文字/想法 / Office 文件 | MCP Server / API/SDK/庫 | PPT/簡報 / 結構化資料/Markdown | MCP Client / 本機語言環境 / 渲染/匯出 / 系統工具 / 範本/素材 |
| [Marp MCP](https://github.com/masaki39/marp-mcp) [![Star](https://img.shields.io/github/stars/masaki39/marp-mcp?style=flat&logo=github&label=Star)](https://github.com/masaki39/marp-mcp/stargazers) | 文字/想法 / DSL/代碼 | MCP Server / Agent Skill | PPT/簡報 / 網頁/互動頁面 | MCP Client / Agent 宿主 / 本機語言環境 / 渲染/匯出 / 範本/素材 |
| [Marp Slide Creator](https://github.com/softaworks/agent-toolkit/blob/main/skills/marp-slide/README.md) [![Star](https://img.shields.io/github/stars/softaworks/agent-toolkit?style=flat&logo=github&label=Star)](https://github.com/softaworks/agent-toolkit/stargazers) | 文字/想法 / DSL/代碼 | Agent Skill | PPT/簡報 / 網頁/互動頁面 / SVG/PNG/PDF | Agent 宿主 / 本機語言環境 / 渲染/匯出 / 範本/素材 |
| [marp-slides](https://github.com/robonuggets/marp-slides) [![Star](https://img.shields.io/github/stars/robonuggets/marp-slides?style=flat&logo=github&label=Star)](https://github.com/robonuggets/marp-slides/stargazers) | 文字/想法 / 資料/表格 / DSL/代碼 | Agent Skill | PPT/簡報 / 圖表/儀表板 / 網頁/互動頁面 / SVG/PNG/PDF | Agent 宿主 / 本機語言環境 / 渲染/匯出 / 範本/素材 |
| [PptxGenJS-mcp-server](https://github.com/Hrithik-s-Raj/PptxGenJS-mcp-server) [![Star](https://img.shields.io/github/stars/Hrithik-s-Raj/PptxGenJS-mcp-server?style=flat&logo=github&label=Star)](https://github.com/Hrithik-s-Raj/PptxGenJS-mcp-server/stargazers) | 文字/想法 / 資料/表格 | MCP Server | PPT/簡報 / 圖表/儀表板 | MCP Client / Agent 宿主 / 本機語言環境 / 渲染/匯出 |
| [md-slides](https://github.com/zl190/md-slides) [![Star](https://img.shields.io/github/stars/zl190/md-slides?style=flat&logo=github&label=Star)](https://github.com/zl190/md-slides/stargazers) | 文字/想法 / DSL/代碼 | Agent Skill | PPT/簡報 / 網頁/互動頁面 / 架構圖/流程圖 | Agent 宿主 / 本機語言環境 / 模型 API / 渲染/匯出 / 範本/素材 |
| [md2html](https://github.com/ogermer/md2html) [![Star](https://img.shields.io/github/stars/ogermer/md2html?style=flat&logo=github&label=Star)](https://github.com/ogermer/md2html/stargazers) | 文字/想法 / DSL/代碼 | Agent Skill | PPT/簡報 / 網頁/互動頁面 / SVG/PNG/PDF | Agent 宿主 / 本地語言環境 / 渲染/匯出 / 範本/素材 |
| [deckset-claude-skill](https://github.com/doudou1337/deckset-claude-skill) [![Star](https://img.shields.io/github/stars/doudou1337/deckset-claude-skill?style=flat&logo=github&label=Star)](https://github.com/doudou1337/deckset-claude-skill/stargazers) | 文字/想法 / DSL/代碼 | Agent Skill | PPT/簡報 | Agent 宿主 / 本機語言環境 / 模型 API / 渲染/匯出 / 範本/素材 |
| [pptx-from-layouts-skill](https://github.com/tristan-mcinnis/pptx-from-layouts-skill) [![Star](https://img.shields.io/github/stars/tristan-mcinnis/pptx-from-layouts-skill?style=flat&logo=github&label=Star)](https://github.com/tristan-mcinnis/pptx-from-layouts-skill/stargazers) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | Agent Skill | PPT/簡報 | Agent 宿主 / 本機語言環境 / 渲染/匯出 / 範本/素材 |
| [hands-on-deck](https://github.com/EveryInc/hands-on-deck) [![Star](https://img.shields.io/github/stars/EveryInc/hands-on-deck?style=flat&logo=github&label=Star)](https://github.com/EveryInc/hands-on-deck/stargazers) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | Agent Skill | PPT/簡報 | Agent 宿主 / 本機語言環境 / 渲染/匯出 |
| [agent-slides](https://github.com/mpuig/agent-slides) [![Star](https://img.shields.io/github/stars/mpuig/agent-slides?style=flat&logo=github&label=Star)](https://github.com/mpuig/agent-slides/stargazers) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | Agent Skill | PPT/簡報 | Agent 宿主 / 本機語言環境 / 模型 API / 渲染/匯出 / 範本/素材 |
| [ultimate-ppt-master-skill](https://github.com/kdnsna/ultimate-ppt-master-skill) [![Star](https://img.shields.io/github/stars/kdnsna/ultimate-ppt-master-skill?style=flat&logo=github&label=Star)](https://github.com/kdnsna/ultimate-ppt-master-skill/stargazers) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | Agent Skill | PPT/簡報 | Agent 宿主 / 本機語言環境 / 模型 API / 渲染/匯出 / 範本/素材 |
| [codex-ppt-skill](https://github.com/ningzimu/codex-ppt-skill) [![Star](https://img.shields.io/github/stars/ningzimu/codex-ppt-skill?style=flat&logo=github&label=Star)](https://github.com/ningzimu/codex-ppt-skill/stargazers) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | Agent Skill | PPT/簡報 | Agent 宿主 / 本機語言環境 / 模型 API / 渲染/匯出 / 範本/素材 |
| [presentation-skills](https://github.com/pamelafox/presentation-skills) [![Star](https://img.shields.io/github/stars/pamelafox/presentation-skills?style=flat&logo=github&label=Star)](https://github.com/pamelafox/presentation-skills/stargazers) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | Skill 集合 | PPT/簡報 | Agent 宿主 / 本機語言環境 / 渲染/匯出 |
| [anthropics/skills](https://github.com/anthropics/skills) [![Star](https://img.shields.io/github/stars/anthropics/skills?style=flat&logo=github&label=Star)](https://github.com/anthropics/skills/stargazers) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | Skill 集合 | PPT/簡報 | Agent 宿主 / 本機語言環境 / 文件解析/OCR / 渲染/匯出 |
| [MiniMax-AI/skills](https://github.com/MiniMax-AI/skills) [![Star](https://img.shields.io/github/stars/MiniMax-AI/skills?style=flat&logo=github&label=Star)](https://github.com/MiniMax-AI/skills/stargazers) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | Skill 集合 | PPT/簡報 | Agent 宿主 / 本機語言環境 / 模型 API / 渲染/匯出 |
| [daymade/claude-code-skills](https://github.com/daymade/claude-code-skills) [![Star](https://img.shields.io/github/stars/daymade/claude-code-skills?style=flat&logo=github&label=Star)](https://github.com/daymade/claude-code-skills/stargazers) | 文字/想法 / PDF/文件 / Office 文件 / DSL/代碼 | Skill 集合 | PPT/簡報 / 圖表/Mermaid / SVG/PNG/PDF / 結構化資料/Markdown | Agent 宿主 / 本機語言環境 / 渲染/匯出 / 系統工具 / 文件解析/OCR |
| [slide-design-skill](https://github.com/SlideSpeak/slide-design-skill) [![Star](https://img.shields.io/github/stars/SlideSpeak/slide-design-skill?style=flat&logo=github&label=Star)](https://github.com/SlideSpeak/slide-design-skill/stargazers) | 文字/想法 / 網頁/搜尋結果 / 資料/表格 | Agent Skill | PPT/簡報 / 網頁/互動頁面 / 圖表/儀表板 / 資訊圖/視覺報告 | Agent 宿主 / 本地語言環境 / 模型 API / 渲染/匯出 / 範本/素材 |
| [html-slides](https://github.com/bluedusk/html-slides) [![Star](https://img.shields.io/github/stars/bluedusk/html-slides?style=flat&logo=github&label=Star)](https://github.com/bluedusk/html-slides/stargazers) | 文字/想法 / Office 文件 / DSL/代碼 | Agent Skill | PPT/簡報 / 網頁/互動頁面 | Agent 宿主 / 本地語言環境 / 渲染/匯出 / 範本/素材 |
| [pptx-mcp-live](https://github.com/ykarapazar/pptx-mcp-live) [![Star](https://img.shields.io/github/stars/ykarapazar/pptx-mcp-live?style=flat&logo=github&label=Star)](https://github.com/ykarapazar/pptx-mcp-live/stargazers) | 文字/想法 / Office 文件 / 資料/表格 | MCP Server | PPT/簡報 / SVG/PNG/PDF | MCP Client / 本地語言環境 / 渲染/匯出 / 系統工具 |
| [claude-skill-academic-ppt](https://github.com/PHY041/claude-skill-academic-ppt) [![Star](https://img.shields.io/github/stars/PHY041/claude-skill-academic-ppt?style=flat&logo=github&label=Star)](https://github.com/PHY041/claude-skill-academic-ppt/stargazers) | 論文/科研資料 / PDF/文件 / 文字/想法 / DSL/代碼 | Agent Skill | PPT/簡報 / 圖形摘要/資訊圖 | Agent 宿主 / 本地語言環境 / 模型 API / 文件解析/OCR / 渲染/匯出 / 範本/素材 |
| [ppt-skills](https://github.com/danny0926/ppt-skills) [![Star](https://img.shields.io/github/stars/danny0926/ppt-skills?style=flat&logo=github&label=Star)](https://github.com/danny0926/ppt-skills/stargazers) | 文字/想法 / 資料/表格 | Agent Skill | PPT/簡報 / 資訊圖/視覺報告 / SVG/PNG/PDF | Agent 宿主 / 本地語言環境 / 渲染/匯出 / 範本/素材 |
| [typst-claude-skill](https://github.com/ChanMeng666/typst-claude-skill) [![Star](https://img.shields.io/github/stars/ChanMeng666/typst-claude-skill?style=flat&logo=github&label=Star)](https://github.com/ChanMeng666/typst-claude-skill/stargazers) | 文字/想法 / PDF/文件 / 論文/科研資料 / DSL/代碼 | Agent Skill | 報告/長文件 / PPT/簡報 / SVG/PNG/PDF | Agent 宿主 / 本機語言環境 / 渲染/匯出 / 範本/素材 |
| [LobsterAI](https://github.com/netease-youdao/LobsterAI) [![Star](https://img.shields.io/github/stars/netease-youdao/LobsterAI?style=flat&logo=github&label=Star)](https://github.com/netease-youdao/LobsterAI/stargazers) | 任意/多來源 / PDF/文件 / Office 文件 / 網頁/搜尋結果 / 資料/表格 | 開源應用/框架 / Bot/助手 | PPT/簡報 / 報告/長文件 / 網頁/互動頁面 / 圖表/儀表板 / 視訊/音訊 | Agent 宿主 / 本機語言環境 / 模型 API / MCP Client / 系統工具 / 外部檢索/資料來源 / 渲染/匯出 / 儲存/索引 |
| [Garden Skills](https://github.com/ConardLi/garden-skills) [![Star](https://img.shields.io/github/stars/ConardLi/garden-skills?style=flat&logo=github&label=Star)](https://github.com/ConardLi/garden-skills/stargazers) | 任意/多來源 / PDF/文件 / 網頁/搜尋結果 / 文字/想法 / 資料/表格 | Skill 集合 | PPT/簡報 / 網頁/互動頁面 / 報告/長文件 / 資訊圖/視覺報告 / 圖表/儀表板 / 視訊/音訊 | Agent 宿主 / 本機語言環境 / 模型 API / 渲染/匯出 / 範本/素材 |
| [ai-agents-skills](https://github.com/hoodini/ai-agents-skills) [![Star](https://img.shields.io/github/stars/hoodini/ai-agents-skills?style=flat&logo=github&label=Star)](https://github.com/hoodini/ai-agents-skills/stargazers) | 任意/多來源 / 文字/想法 / 網頁/搜尋結果 / 代碼/技術描述 | Skill 集合 | PPT/簡報 / 網頁/互動頁面 / 視訊/音訊 / 圖表/Mermaid / 圖形摘要/資訊圖 | Agent 宿主 / 本機語言環境 / 模型 API / 系統工具 / 渲染/匯出 / 範本/素材 |
| [keynote-slides-skill](https://github.com/dbmcco/keynote-slides-skill) [![Star](https://img.shields.io/github/stars/dbmcco/keynote-slides-skill?style=flat&logo=github&label=Star)](https://github.com/dbmcco/keynote-slides-skill/stargazers) | 文字/想法 / 資料/表格 / 網頁/搜尋結果 | Agent Skill | PPT/簡報 / 網頁/互動頁面 / 資訊圖/視覺報告 | Agent 宿主 / 本機語言環境 / 模型 API / 渲染/匯出 / 範本/素材 |
| [Claude Office Skills](https://github.com/claude-office-skills/skills) [![Star](https://img.shields.io/github/stars/claude-office-skills/skills?style=flat&logo=github&label=Star)](https://github.com/claude-office-skills/skills/stargazers) | Office 文件 / PDF/文件 / 文字/想法 / 資料/表格 | Skill 集合 / MCP Server | PPT/簡報 / 報告/長文件 / SVG/PNG/PDF / 結構化資料/Markdown | Agent 宿主 / 本機語言環境 / MCP Client / 系統工具 / 文件解析/OCR / 渲染/匯出 / 範本/素材 |
| [Gamma](https://gamma.app/) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | 產品/SaaS | PPT/簡報 | 瀏覽器/帳號 / 範本/素材 |
| [SlideSpeak](https://slidespeak.co/) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | 產品/SaaS | PPT/簡報 | 瀏覽器/帳號 / 文件解析/OCR / 範本/素材 |
| [Canva AI Presentations](https://www.canva.com/create/ai-presentations/) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | 產品/SaaS | PPT/簡報 | 瀏覽器/帳號 / 範本/素材 |
| [Presentations.AI](https://www.presentations.ai/) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | 產品/SaaS | PPT/簡報 | 瀏覽器/帳號 / 文件解析/OCR / 範本/素材 |
| [Beautiful.ai](https://www.beautiful.ai/presentation-maker) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | 產品/SaaS | PPT/簡報 | 瀏覽器/帳號 / 範本/素材 |
| [Decktopus](https://www.decktopus.com/) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | 產品/SaaS | PPT/簡報 | 瀏覽器/帳號 / 範本/素材 |
| [PPT.AI](https://ppt.ai/) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | 產品/SaaS | PPT/簡報 | 瀏覽器/帳號 / 文件解析/OCR / 範本/素材 |
| [Slidesgo AI Presentation Maker](https://slidesgo.com/ai/presentation-maker) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | 產品/SaaS | PPT/簡報 | 瀏覽器/帳號 / 範本/素材 |
| [Microsoft Copilot in PowerPoint](https://powerpoint.cloud.microsoft/create/en/ai-presentation-maker/) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | 產品/SaaS / Bot/助手 | PPT/簡報 | 瀏覽器/帳號 / 系統工具 / 範本/素材 |
| [Adobe Express AI Presentation Maker](https://www.adobe.com/express/create/ai/presentation) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 | 產品/SaaS | PPT/簡報 | 瀏覽器/帳號 / 範本/素材 |

## 輔助、前後處理與小工具

這一部分放更小、更底层或更專门的工具。它们不一定独立完成整條内容生產鏈，但經常是 Agent 工作流里的關键元件。

### PDF、文件解析與結構化擷取

前處理工具：把 PDF、論文、Office 或掃描件轉成 Markdown、JSON、layout、表格和 OCR 結果。

| 專案 | 資訊來源 | 工具形態 | 產出物形式 | 依賴類型 |
| --- | --- | --- | --- | --- |
| [MinerU](https://github.com/opendatalab/MinerU) [![Star](https://img.shields.io/github/stars/opendatalab/MinerU?style=flat&logo=github&label=Star)](https://github.com/opendatalab/MinerU/stargazers) | PDF/文件 / Office 文件 / 論文/科研資料 | 開源應用/框架 | 結構化資料/Markdown | 本機語言環境 / 文件解析/OCR / GPU/加速器 |
| [Docling](https://github.com/docling-project/docling) [![Star](https://img.shields.io/github/stars/docling-project/docling?style=flat&logo=github&label=Star)](https://github.com/docling-project/docling/stargazers) | PDF/文件 / Office 文件 / 論文/科研資料 | 開源應用/框架 | 結構化資料/Markdown | 本機語言環境 / 文件解析/OCR |
| [MarkItDown](https://github.com/microsoft/markitdown) [![Star](https://img.shields.io/github/stars/microsoft/markitdown?style=flat&logo=github&label=Star)](https://github.com/microsoft/markitdown/stargazers) | PDF/文件 / Office 文件 / 網頁/搜尋結果 | API/SDK/庫 | 結構化資料/Markdown | 本機語言環境 / 文件解析/OCR / 模型 API |
| [Marker](https://github.com/datalab-to/marker) [![Star](https://img.shields.io/github/stars/datalab-to/marker?style=flat&logo=github&label=Star)](https://github.com/datalab-to/marker/stargazers) | PDF/文件 / Office 文件 / 論文/科研資料 | 開源應用/框架 | 結構化資料/Markdown | 本機語言環境 / 文件解析/OCR / GPU/加速器 |
| [Unstructured](https://github.com/Unstructured-IO/unstructured) [![Star](https://img.shields.io/github/stars/Unstructured-IO/unstructured?style=flat&logo=github&label=Star)](https://github.com/Unstructured-IO/unstructured/stargazers) | PDF/文件 / Office 文件 / 論文/科研資料 | 開源應用/框架 | 結構化資料/Markdown | 本機語言環境 / 文件解析/OCR |
| [GROBID](https://github.com/grobidOrg/grobid) [![Star](https://img.shields.io/github/stars/grobidOrg/grobid?style=flat&logo=github&label=Star)](https://github.com/grobidOrg/grobid/stargazers) | PDF/文件 / Office 文件 / 論文/科研資料 | 開源應用/框架 | 結構化資料/Markdown | 本機語言環境 / 系統工具 / 文件解析/OCR |
| [PaperMage](https://github.com/allenai/papermage) [![Star](https://img.shields.io/github/stars/allenai/papermage?style=flat&logo=github&label=Star)](https://github.com/allenai/papermage/stargazers) | PDF/文件 / Office 文件 / 論文/科研資料 | API/SDK/庫 | 結構化資料/Markdown | 本機語言環境 / 文件解析/OCR |
| [s2orc-doc2json](https://github.com/allenai/s2orc-doc2json) [![Star](https://img.shields.io/github/stars/allenai/s2orc-doc2json?style=flat&logo=github&label=Star)](https://github.com/allenai/s2orc-doc2json/stargazers) | PDF/文件 / Office 文件 / 論文/科研資料 | 開源應用/框架 | 結構化資料/Markdown | 本機語言環境 / 文件解析/OCR |

### 心智圖專項工具

相對小而聚焦的工具：專门把文件、網頁、影片、威脅情報或文本轉成心智圖。

| 專案 | 資訊來源 | 工具形態 | 產出物形式 | 依賴類型 |
| --- | --- | --- | --- | --- |
| [TI-Mindmap-GPT](https://github.com/format81/TI-Mindmap-GPT) [![Star](https://img.shields.io/github/stars/format81/TI-Mindmap-GPT?style=flat&logo=github&label=Star)](https://github.com/format81/TI-Mindmap-GPT/stargazers) | 新聞/資訊 / 網頁/搜尋結果 / PDF/文件 | 開源應用/框架 | 心智圖/知識地圖 / 報告/長文件 / 表格/時間軸 | 本機語言環境 / 模型 API / 文件解析/OCR / 渲染/匯出 / 外部檢索/資料來源 |
| [mindmap-generator](https://github.com/Dicklesworthstone/mindmap-generator) [![Star](https://img.shields.io/github/stars/Dicklesworthstone/mindmap-generator?style=flat&logo=github&label=Star)](https://github.com/Dicklesworthstone/mindmap-generator/stargazers) | PDF/文件 / 網頁/搜尋結果 / 知識庫/個人資料 | 開源應用/框架 | 心智圖/知識地圖 | 本機語言環境 / 模型 API / 文件解析/OCR / 渲染/匯出 |
| [Mapify](https://mapify.so/) | PDF/文件 / 網頁/搜尋結果 / 知識庫/個人資料 | 產品/SaaS | 心智圖/知識地圖 | 瀏覽器/帳號 / 文件解析/OCR / 範本/素材 |
| [Mapify MCP Server](https://github.com/xmindltd/mapify-mcp-server) [![Star](https://img.shields.io/github/stars/xmindltd/mapify-mcp-server?style=flat&logo=github&label=Star)](https://github.com/xmindltd/mapify-mcp-server/stargazers) | 文字/想法 / PDF/文件 / 網頁/搜尋結果 / 任意/多來源 | MCP Server / 產品/SaaS | 心智圖/知識地圖 | MCP Client / 瀏覽器/帳號 / 模型 API / 外部檢索/資料源 / 模板/素材 |
| [mind-map-mcp](https://github.com/sawyer-shi/mind-map-mcp) [![Star](https://img.shields.io/github/stars/sawyer-shi/mind-map-mcp?style=flat&logo=github&label=Star)](https://github.com/sawyer-shi/mind-map-mcp/stargazers) | 文字/想法 / PDF/文件 / 知識庫/個人資料 | MCP Server / 開源應用/框架 | 心智圖/知識地圖 / SVG/PNG/PDF | MCP Client / 本地語言環境 / 渲染/匯出 |
| [MindRepo](https://github.com/NguyenVu04/mind-repo) [![Star](https://img.shields.io/github/stars/NguyenVu04/mind-repo?style=flat&logo=github&label=Star)](https://github.com/NguyenVu04/mind-repo/stargazers) | PDF/文件 / 知識庫/個人資料 / 論文/科研資料 | 開源應用/框架 | 心智圖/知識地圖 / 問答/學習材料 / 報告/簡報 | 本地語言環境 / 模型 API / 文件解析/OCR / 儲存/索引 |

### 圖表、Mermaid 與渲染元件

後處理/渲染工具：讓 Agent 更容易生成、驗證或匯出 Mermaid、SVG、PNG、PDF 等圖表產物。

| 專案 | 資訊來源 | 工具形態 | 產出物形式 | 依賴類型 |
| --- | --- | --- | --- | --- |
| [Mermaid](https://github.com/mermaid-js/mermaid) [![Star](https://img.shields.io/github/stars/mermaid-js/mermaid?style=flat&logo=github&label=Star)](https://github.com/mermaid-js/mermaid/stargazers) | DSL/代碼 | API/SDK/庫 | 圖表/Mermaid / SVG/PNG/PDF | 渲染/匯出 |
| [mermaid-js-ai-agent](https://github.com/disler/mermaid-js-ai-agent) [![Star](https://img.shields.io/github/stars/disler/mermaid-js-ai-agent?style=flat&logo=github&label=Star)](https://github.com/disler/mermaid-js-ai-agent/stargazers) | 文字/想法 / 代碼/技術描述 | 開源應用/框架 | 圖表/Mermaid / SVG/PNG/PDF | 本機語言環境 / 模型 API / 渲染/匯出 |
| [mermaid-skill](https://github.com/Agents365-ai/mermaid-skill) [![Star](https://img.shields.io/github/stars/Agents365-ai/mermaid-skill?style=flat&logo=github&label=Star)](https://github.com/Agents365-ai/mermaid-skill/stargazers) | 文字/想法 / 代碼/技術描述 | Agent Skill | 圖表/Mermaid / SVG/PNG/PDF | Agent 宿主 / 本機語言環境 / 模型 API / 渲染/匯出 |
| [Mermaid Skill for Claude Code](https://github.com/WH-2099/mermaid-skill) [![Star](https://img.shields.io/github/stars/WH-2099/mermaid-skill?style=flat&logo=github&label=Star)](https://github.com/WH-2099/mermaid-skill/stargazers) | 文字/想法 / 代碼/技術描述 / DSL/代碼 | Agent Skill | 圖表/Mermaid / 架構圖/流程圖 / 白板/心智圖 / SVG/PNG/PDF | Agent 宿主 / 本機語言環境 / 渲染/匯出 |
| [Pretty-mermaid-skills](https://github.com/imxv/Pretty-mermaid-skills) [![Star](https://img.shields.io/github/stars/imxv/Pretty-mermaid-skills?style=flat&logo=github&label=Star)](https://github.com/imxv/Pretty-mermaid-skills/stargazers) | 文字/想法 / 代碼/技術描述 | Agent Skill | 圖表/Mermaid / SVG/PNG/PDF | Agent 宿主 / 本機語言環境 / 渲染/匯出 |
| [agent-toolkit mermaid diagrams](https://github.com/softaworks/agent-toolkit) [![Star](https://img.shields.io/github/stars/softaworks/agent-toolkit?style=flat&logo=github&label=Star)](https://github.com/softaworks/agent-toolkit/stargazers) | 文字/想法 / 代碼/技術描述 | Skill 集合 | 圖表/Mermaid / SVG/PNG/PDF | Agent 宿主 / 模型 API / 渲染/匯出 |
| [beautiful-mermaid](https://github.com/lukilabs/beautiful-mermaid) [![Star](https://img.shields.io/github/stars/lukilabs/beautiful-mermaid?style=flat&logo=github&label=Star)](https://github.com/lukilabs/beautiful-mermaid/stargazers) | DSL/代碼 | API/SDK/庫 | 圖表/Mermaid / SVG/PNG/PDF | 本機語言環境 / 渲染/匯出 |
| [LLMermaid](https://github.com/fladdict/llmermaid) [![Star](https://img.shields.io/github/stars/fladdict/llmermaid?style=flat&logo=github&label=Star)](https://github.com/fladdict/llmermaid/stargazers) | 文字/想法 / 代碼/技術描述 | 研究原型 | 圖表/Mermaid / SVG/PNG/PDF | 本機語言環境 / 模型 API / 渲染/匯出 |
| [GenAIScript](https://github.com/microsoft/genaiscript) [![Star](https://img.shields.io/github/stars/microsoft/genaiscript?style=flat&logo=github&label=Star)](https://github.com/microsoft/genaiscript/stargazers) | PDF/文件 / 資料/表格 / 程式碼庫 / DSL/代碼 | API/SDK/庫 | 圖表/Mermaid / 結構化資料/Markdown | 本機語言環境 / 模型 API / 文件解析/OCR / 渲染/匯出 |
| [mcp-mermaid](https://github.com/hustcc/mcp-mermaid) [![Star](https://img.shields.io/github/stars/hustcc/mcp-mermaid?style=flat&logo=github&label=Star)](https://github.com/hustcc/mcp-mermaid/stargazers) | 文字/想法 / 代碼/技術描述 / DSL/代碼 | MCP Server | 圖表/Mermaid / SVG/PNG/PDF | MCP Client / 本機語言環境 / 渲染/匯出 |
| [mermaider](https://github.com/vtomilin/mermaider) [![Star](https://img.shields.io/github/stars/vtomilin/mermaider?style=flat&logo=github&label=Star)](https://github.com/vtomilin/mermaider/stargazers) | DSL/代碼 / 代碼/技術描述 | MCP Server | 圖表/Mermaid / 圖表/渲染輸出 | MCP Client / 本地語言環境 / 渲染/匯出 / 系統工具 |
| [Mermaid Live MCP Server](https://github.com/TakanariShimbo/mermaid-live-mcp-server/blob/main/docs/README.md?plain=1) [![Star](https://img.shields.io/github/stars/TakanariShimbo/mermaid-live-mcp-server?style=flat&logo=github&label=Star)](https://github.com/TakanariShimbo/mermaid-live-mcp-server/stargazers) | 文字/想法 / 代碼/技術描述 / DSL/代碼 | MCP Server | 圖表/Mermaid / 架構圖/流程圖 / SVG/PNG/PDF | MCP Client / 本地語言環境 / 渲染/匯出 |
| [Claude Mermaid](https://github.com/veelenga/claude-mermaid) [![Star](https://img.shields.io/github/stars/veelenga/claude-mermaid?style=flat&logo=github&label=Star)](https://github.com/veelenga/claude-mermaid/stargazers) | 文字/想法 / 代碼/技術描述 / DSL/代碼 | MCP Server / Agent Skill | 圖表/Mermaid / SVG/PNG/PDF | MCP Client / Agent 宿主 / 本機語言環境 / 渲染/匯出 |
| [mermaid-mcp-server](https://github.com/peng-shawn/mermaid-mcp-server) [![Star](https://img.shields.io/github/stars/peng-shawn/mermaid-mcp-server?style=flat&logo=github&label=Star)](https://github.com/peng-shawn/mermaid-mcp-server/stargazers) | 文字/想法 / 代碼/技術描述 / DSL/代碼 | MCP Server | 圖表/Mermaid / SVG/PNG/PDF | MCP Client / 本地語言環境 / 渲染/匯出 |
| [mcp-media-forge](https://github.com/PavelGuzenfeld/mcp-media-forge) [![Star](https://img.shields.io/github/stars/PavelGuzenfeld/mcp-media-forge?style=flat&logo=github&label=Star)](https://github.com/PavelGuzenfeld/mcp-media-forge/stargazers) | 文字/想法 / 資料/表格 / DSL/代碼 | MCP Server | 圖表/Mermaid / 架構圖/流程圖 / 圖表/儀表板 / 網頁/互動頁面 / PPT/簡報 / SVG/PNG/PDF | MCP Client / 本機語言環境 / 渲染/匯出 / 系統工具 |
| [UML-MCP](https://github.com/antoinebou12/uml-mcp) [![Star](https://img.shields.io/github/stars/antoinebou12/uml-mcp?style=flat&logo=github&label=Star)](https://github.com/antoinebou12/uml-mcp/stargazers) | 文字/想法 / 代碼/技術描述 / DSL/代碼 | MCP Server | 架構圖/流程圖 / 圖表/Mermaid / SVG/PNG/PDF | MCP Client / 本機語言環境 / 渲染/匯出 |
| [Kroki-MCP](https://github.com/utain/kroki-mcp) [![Star](https://img.shields.io/github/stars/utain/kroki-mcp?style=flat&logo=github&label=Star)](https://github.com/utain/kroki-mcp/stargazers) | 文字/想法 / 代碼/技術描述 / DSL/代碼 | MCP Server | 圖表/Mermaid / 架構圖/流程圖 / SVG/PNG/PDF | MCP Client / 本機語言環境 / 渲染/匯出 |
| [drawio-mcp](https://github.com/jgraph/drawio-mcp) [![Star](https://img.shields.io/github/stars/jgraph/drawio-mcp?style=flat&logo=github&label=Star)](https://github.com/jgraph/drawio-mcp/stargazers) | 文字/想法 / 代碼/技術描述 / DSL/代碼 | MCP Server / Agent Skill | 架構圖/流程圖 / 圖表/Mermaid / SVG/PNG/PDF | MCP Client / Agent 宿主 / 本機語言環境 / 渲染/匯出 / 系統工具 |
| [Excalidraw MCP](https://github.com/excalidraw/excalidraw-mcp) [![Star](https://img.shields.io/github/stars/excalidraw/excalidraw-mcp?style=flat&logo=github&label=Star)](https://github.com/excalidraw/excalidraw-mcp/stargazers) | 文字/想法 / 代碼/技術描述 | MCP Server | 架構圖/流程圖 / 白板/心智圖 / 網頁/互動頁 | MCP Client / 瀏覽器/帳號 / 本機語言環境 / 渲染/匯出 |
| [AntV Infographic](https://github.com/antvis/infographic) [![Star](https://img.shields.io/github/stars/antvis/infographic?style=flat&logo=github&label=Star)](https://github.com/antvis/infographic/stargazers) | 文字/想法 / 資料/表格 / DSL/程式碼 | API/SDK/庫 | 資訊圖/視覺報告 / 圖表/渲染輸出 / SVG/PNG/PDF | 本機語言環境 / 渲染/匯出 / 模板/素材 |
| [Markdown Viewer Agent Skills](https://github.com/markdown-viewer/skills) [![Star](https://img.shields.io/github/stars/markdown-viewer/skills?style=flat&logo=github&label=Star)](https://github.com/markdown-viewer/skills/stargazers) | 文字/想法 / 資料/表格 / 代碼/技術描述 | Skill 集合 | 架構圖/流程圖 / 圖表/儀表板 / 資訊圖/視覺報告 / 心智圖/知識地圖 / 圖表/渲染輸出 | Agent 宿主 / 本機語言環境 / 渲染/匯出 / 模板/素材 |
| [Preview Skills](https://github.com/veelenga/preview-skills) [![Star](https://img.shields.io/github/stars/veelenga/preview-skills?style=flat&logo=github&label=Star)](https://github.com/veelenga/preview-skills/stargazers) | 文字/想法 / 資料/表格 / DSL/代碼 / 代碼/技術描述 | Skill 集合 | 網頁/互動頁面 / 圖表/Mermaid / 結構化資料/Markdown | Agent 宿主 / 本機語言環境 / 渲染/匯出 |
| [AgentFigureGallery](https://github.com/Dsadd4/AgentFigureGallery) [![Star](https://img.shields.io/github/stars/Dsadd4/AgentFigureGallery?style=flat&logo=github&label=Star)](https://github.com/Dsadd4/AgentFigureGallery/stargazers) | 論文/科研資料 / 資料/表格 | Agent Skill / 資料集/評測 | 圖表/渲染輸出 / SVG/PNG/PDF | Agent 宿主 / 本機語言環境 / 外部檢索/資料來源 / 渲染/匯出 |

## 如何篩選工具

### 資訊來源

| 資訊來源 | 含義 |
| --- | --- |
| 論文/科研資料 | 論文、arXiv、學術 PDF、科研主題和實驗結果。 |
| PDF/文件 | PDF、長文件、手冊、報告和網頁匯出的文件。 |
| Office 文件 | Word、PowerPoint、Excel 等辦公文件。 |
| 網頁/搜尋結果 | 網頁、搜尋結果、URL、網頁正文和引用來源。 |
| 新聞/資訊 | 新聞流、市場資訊、威脅情報、產業動態。 |
| 程式碼庫 | GitHub 倉庫、本機程式碼、diff、依賴關係。 |
| 資料/表格 | CSV、Excel、指標、時間序列和業務資料。 |
| 資料庫 | SQL/BI 資料源、業務庫、向量庫或外部資料介面。 |
| 知識庫/個人資料 | Notion、Google Drive、Slack、會議資料、個人文件庫。 |
| 文字/想法 | 一句話提示、草稿、大綱、白板想法。 |
| 代碼/技術描述 | 代碼片段、API 描述、系統設計文本。 |
| DSL/代碼 | Mermaid、圖表 DSL、設定和可執行绘圖代碼。 |
| 引用網路 | 論文引用關係、相關論文網路、文獻圖谱。 |
| 任意/多來源 | 跨多种來源都能工作的通用場景。 |

### 工具形態

| 工具形態 | 含義 |
| --- | --- |
| 產品/SaaS | 託管網站或商業產品，通常需要瀏覽器和帳號。 |
| 開源應用/框架 | 可以本機執行、部署或二次開發的應用/框架。 |
| Agent Skill | 给 Claude Code、Codex、Cursor、Gemini CLI 等 Agent 執行的工作流包。 |
| Skill 集合 | 包含多個 Agent Skill 的倉庫或套件。 |
| MCP Server | 透過 Model Context Protocol 把文件、PPT、代碼或資料能力提供給 Agent。 |
| API/SDK/庫 | 被其他工具呼叫的解析、渲染、生成或資料介面。 |
| Bot/助手 | 以聊天、搜尋助手、瀏覽器擴展或協作助手形態出現的工具。 |
| 研究原型/資料集 | 論文、評測、資料集或研究代碼。 |
| Awesome/索引 | 幫助繼續發現工具、論文和 Skill 的目錄。 |

### 產出物形式

| 產出物形式 | 含義 |
| --- | --- |
| PPT/簡報 | PPTX、Slides、Deck、带模板或母版的演示稿。 |
| 報告/長文件 | 带引用的 research report、產業報告、分析報告。 |
| 報告/簡報 | 摘要、briefing、study guide、問答型材料。 |
| 網頁/互動頁面 | HTML、互動式教學、網頁 explainer、可分享頁面。 |
| 圖形摘要/資訊圖 | Graphical abstract、infographic、海報、科學示意圖。 |
| 資訊圖/視覺報告 | 商業信息圖、視覺報告、品牌化摘要。 |
| 架構圖/流程圖 | Mermaid、流程圖、時序圖、系統圖、白板圖。 |
| 白板/心智圖 | 白板、自由畫布、發散式圖示。 |
| 心智圖/知識地圖 | Mind map、概念圖、知识網路。 |
| 文獻地圖/知識地圖 | 文獻關係圖、相關論文圖、科研知识地圖。 |
| 圖表/儀表板 | Charts、BI dashboard、KPI、互動式資料視圖。 |
| 表格/時間軸 | 證據表、IOC 表、事件時間線、對照表。 |
| 程式碼地圖/Repo Wiki | 倉庫結構圖、Repo wiki、依賴圖、代碼知識圖譜。 |
| 圖表/Mermaid | Mermaid、diagram-as-code、可驗證圖表文本。 |
| SVG/PNG/PDF | 渲染後的圖片、向量圖或匯出文件。 |
| 影片/音訊 | 論文影片、講解影片、音頻簡報。 |
| 結構化資料/Markdown | Markdown、JSON、layout、表格、OCR 結果，供後續生成使用。 |
| 證據表 | 文獻篩選表、證據矩陣、引用表。 |
| 引用答案 | 带來源引用的回答或搜尋結果綜合。 |
| 問答/學習材料 | Notebook 問答、測驗、學習指南。 |
| 工具索引 | Awesome list、工具目錄、論文列表。 |
| 圖表/渲染輸出 | 渲染器或圖表元件生成的視覺輸出。 |

### 依賴類型

`依賴類型` 描述一個工具真正依賴什麼。它和上面的三類標签不同：前面幾欄回答“從哪裡來、工具是什麼、產物是什麼”，依賴類型回答“執行它需要什麼”。

| 依賴類型 | 含義 | 常見例子 |
| --- | --- | --- |
| 瀏覽器/帳號 | 只需要瀏覽器和帳號，通常不需要本地安裝 | Google 帳號、Canva 帳號、商業 SaaS 套餐 |
| Agent 宿主 | 需要在 Agent 環境中執行 Skill 或工作流 | Claude Code、Codex、Cursor、Gemini CLI、OpenCode |
| 模型 API | 需要呼叫文本、視覺或圖像模型介面 | OpenAI、Anthropic、Gemini、OpenRouter、Azure OpenAI、Replicate |
| 本機語言環境 | 需要本地安裝語言執行時和包管理器 | Python、Node.js、Go、Rust、Java、Conda、uv、pnpm |
| 系統工具 | 依賴本機二進位工具或辦公軟件 | Docker、LibreOffice、Microsoft PowerPoint、Pandoc、LaTeX、Chrome |
| 文件解析/OCR | 依賴 PDF 解析、OCR、版面復原或文件結構抽取 | MinerU、Docling、Marker、GROBID、Tesseract、版面模型 |
| 渲染/匯出 | 依賴把中間格式渲染成 SVG、PNG、PDF、PPTX 或網頁 | Mermaid、Kroki、Playwright、python-pptx、pptxgenjs、SVG 渲染器 |
| 外部檢索/資料來源 | 需要連網搜索、論文庫、引用網路或資料庫 | arXiv、Semantic Scholar、OpenAlex、Google Scholar、網頁搜尋 |
| GPU/加速器 | 本地模型推理、OCR、視覺模型或圖像生成需要加速 | CUDA、ROCm、Apple Metal/MPS、雲端 GPU |
| MCP Client | 需要能連接 MCP Server 的用戶端 | Claude Desktop、Cursor、Codex、Cline、Continue |
| 程式碼分析工具 | 程式碼庫視覺化常見依賴，用於解析文件、符號和依賴 | tree-sitter、語言伺服器、ripgrep、ctags、Git |
| 儲存/索引 | 需要持久化專案状態、向量索引或圖資料庫 | SQLite、Postgres、Chroma、Qdrant、Neo4j、文件索引 |
| 範本/素材 | 需要額外模板、品牌素材或設計資源才能產出高品質結果 | PPTX 模板、母版、品牌素材包、圖示集、圖片素材 |

GitHub 專案的 Star 徽章直接放在專案名後面，盡量使用即時 badge；非 GitHub 產品不顯示 Star。

## 繼續發現更多工具

這一部分收錄已有 awesome list、論文列表、Skill 目錄和 MCP 目錄。它们不是单個生產工具，但适合继续擴展這個倉庫。

| 專案 | 覆蓋範圍 | 工具形態 | 適合用來找什麼 |
| --- | --- | --- | --- |
| [awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) [![Star](https://img.shields.io/github/stars/VoltAgent/awesome-agent-skills?style=flat&logo=github&label=Star)](https://github.com/VoltAgent/awesome-agent-skills/stargazers) | 任意/多來源 | Awesome/索引 | 大型 Agent Skill 目錄。 |
| [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) [![Star](https://img.shields.io/github/stars/ComposioHQ/awesome-claude-skills?style=flat&logo=github&label=Star)](https://github.com/ComposioHQ/awesome-claude-skills/stargazers) | 任意/多來源 | Awesome/索引 | Claude Skills 目錄，涵蓋視覺化、資料、文件、自動化與 MCP 發現。 |
| [awesome-llm-skills](https://github.com/Prat011/awesome-llm-skills) [![Star](https://img.shields.io/github/stars/Prat011/awesome-llm-skills?style=flat&logo=github&label=Star)](https://github.com/Prat011/awesome-llm-skills/stargazers) | 任意/多來源 | Awesome/索引 | 跨 Agent 的 LLM Skill 列表。 |
| [Awesome-Powerpoint-AI-Agents](https://github.com/ishandutta2007/Awesome-Powerpoint-AI-Agents) [![Star](https://img.shields.io/github/stars/ishandutta2007/Awesome-Powerpoint-AI-Agents?style=flat&logo=github&label=Star)](https://github.com/ishandutta2007/Awesome-Powerpoint-AI-Agents/stargazers) | 任意/多來源 | Awesome/索引 | 和本倉庫最接近的 PowerPoint AI Agent 生態列表。 |
| [AI-Presentation-Builders-Index](https://github.com/danielrosehill/AI-Presentation-Builders-Index) [![Star](https://img.shields.io/github/stars/danielrosehill/AI-Presentation-Builders-Index?style=flat&logo=github&label=Star)](https://github.com/danielrosehill/AI-Presentation-Builders-Index/stargazers) | 任意/多源 | Awesome/索引 | 開放、自託管和 Agent 驅動的簡報構建器、Skill、MCP、渲染器和解析器索引。 |
| [awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) [![Star](https://img.shields.io/github/stars/punkpeye/awesome-mcp-servers?style=flat&logo=github&label=Star)](https://github.com/punkpeye/awesome-mcp-servers/stargazers) | 任意/多來源 | Awesome/索引 | 大型 MCP Server 目錄。 |
| [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) [![Star](https://img.shields.io/github/stars/hesreallyhim/awesome-claude-code?style=flat&logo=github&label=Star)](https://github.com/hesreallyhim/awesome-claude-code/stargazers) | 任意/多來源 | Awesome/索引 | Claude Code Skill、Hook、Slash Command、應用和插件索引。 |
| [awesome_ai_agents](https://github.com/jim-schwoebel/awesome_ai_agents) [![Star](https://img.shields.io/github/stars/jim-schwoebel/awesome_ai_agents?style=flat&logo=github&label=Star)](https://github.com/jim-schwoebel/awesome_ai_agents/stargazers) | 任意/多來源 | Awesome/索引 | 綜合 AI Agent 資源目錄。 |
| [awesome-ai-tools](https://github.com/mahseema/awesome-ai-tools) [![Star](https://img.shields.io/github/stars/mahseema/awesome-ai-tools?style=flat&logo=github&label=Star)](https://github.com/mahseema/awesome-ai-tools/stargazers) | 任意/多來源 | Awesome/索引 | 綜合 AI 工具目錄。 |
| [awesome-ai-auto-research](https://github.com/worldbench/awesome-ai-auto-research) [![Star](https://img.shields.io/github/stars/worldbench/awesome-ai-auto-research?style=flat&logo=github&label=Star)](https://github.com/worldbench/awesome-ai-auto-research/stargazers) | 任意/多來源 | Awesome/索引 | AI 自動科研工具版圖，包括論文转投影片、海報、影片、網頁和社交媒體產物。 |
| [LLM-Visualization-Paper-List](https://github.com/zengxingchen/LLM-Visualization-Paper-List) [![Star](https://img.shields.io/github/stars/zengxingchen/LLM-Visualization-Paper-List?style=flat&logo=github&label=Star)](https://github.com/zengxingchen/LLM-Visualization-Paper-List/stargazers) | 任意/多來源 | Awesome/索引 | LLM 與視覺化交叉方向的論文列表。 |
| [awesome-ai-for-science](https://github.com/ai-boost/awesome-ai-for-science) [![Star](https://img.shields.io/github/stars/ai-boost/awesome-ai-for-science?style=flat&logo=github&label=Star)](https://github.com/ai-boost/awesome-ai-for-science/stargazers) | 任意/多來源 | Awesome/索引 | AI for Science 的工具、論文、資料集和框架索引。 |
| [AlterLab-Academic-Skills](https://github.com/AlterLab-IEU/AlterLab-Academic-Skills) [![Star](https://img.shields.io/github/stars/AlterLab-IEU/AlterLab-Academic-Skills?style=flat&logo=github&label=Star)](https://github.com/AlterLab-IEU/AlterLab-Academic-Skills/stargazers) | 任意/多來源 | Skill 集合 | 經過評測的學術 Agent Skill，涵蓋視覺化、報告、寫作和科研流程。 |
| [SenseNova-Skills](https://github.com/OpenSenseNova/SenseNova-Skills) [![Star](https://img.shields.io/github/stars/OpenSenseNova/SenseNova-Skills?style=flat&logo=github&label=Star)](https://github.com/OpenSenseNova/SenseNova-Skills/stargazers) | 任意/多來源 | Skill 集合 | 辦公與生產力 Skill 集合，涵蓋圖像生成、視覺化、投影片、Excel 分析和深度研究。 |
| [OpenClaw Medical Skills](https://github.com/FreedomIntelligence/OpenClaw-Medical-Skills) [![Star](https://img.shields.io/github/stars/FreedomIntelligence/OpenClaw-Medical-Skills?style=flat&logo=github&label=Star)](https://github.com/FreedomIntelligence/OpenClaw-Medical-Skills/stargazers) | 論文/科研資料 / PDF/文件 / 資料/表格 / 資料庫 | Skill 集合 | 醫學與科研 Skill 庫，涵蓋研究報告、臨床文件、組學視覺化、通路圖、QC 報告和圖表輸出。 |
| [Awesome HTML Slide Skills](https://github.com/ToseaAI/awesome-html-slide-skills) [![Star](https://img.shields.io/github/stars/ToseaAI/awesome-html-slide-skills?style=flat&logo=github&label=Star)](https://github.com/ToseaAI/awesome-html-slide-skills/stargazers) | 任意/多來源 | Awesome/索引 | HTML 簡報 Skill 與範本庫索引，面向 Agent 生成單文件簡報生態。 |
| [TransformingScienceLLMs](https://github.com/NL2G/TransformingScienceLLMs) [![Star](https://img.shields.io/github/stars/NL2G/TransformingScienceLLMs?style=flat&logo=github&label=Star)](https://github.com/NL2G/TransformingScienceLLMs/stargazers) | 任意/多來源 | Awesome/索引 | LLM 輔助科學工作的論文、模型和工具集合。 |

## 資料

結構化目錄在 [data/catalog.yml](data/catalog.yml)，包含資訊來源、工具形態、產出物形式、依賴類型、分類、GitHub Star 快照、授權條款、更新時間和簡短說明。

工具調研快取放在 [data/tool-research.yml](data/tool-research.yml)，包含官方示例、文件、demo、模板、論文、影片、效果圖/GIF 等線索；它不直接渲染到 README。

搜尋記錄與檢索策略在 [docs/search-log.md](docs/search-log.md)。

## 貢獻

歡迎補充專案。新增條目最好包含：

- 專案名稱和 URL。
- 資訊來源：例如 `論文/科研資料、網頁/搜尋結果、新聞/資訊、PDF/文件、程式碼庫、資料/表格`。
- 工具形態：例如 `產品/SaaS、開源應用/框架、Agent Skill、MCP Server、API/SDK/庫、Bot/助手`。
- 產出物形式：例如 `PPT/簡報、報告/長文件、網頁/互動頁面、心智圖/知識地圖、圖表/儀表板`。
- 依賴類型：从上面的依賴類型表里選擇，例如 `模型 API、渲染/匯出、範本/素材`。
- 一句話說明它為什麼属於這個列表。

優先收錄能產出可檢視、可編輯、可引用、可展示，或者能帮助人理解複雜系統的工具。
