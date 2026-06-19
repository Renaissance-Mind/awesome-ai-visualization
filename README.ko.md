![AI visualization banner](assets/banner.png)

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![Catalog](https://img.shields.io/badge/catalog-150_items-blue)](data/catalog.yml)
[![Last researched](https://img.shields.io/badge/last_researched-2026--06--20-brightgreen)](docs/search-log.md)

[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md) | 한국어 | [Español](README.es.md) | [Türkçe](README.tr.md) | [Русский](README.ru.md)

> [!NOTE]
> 이 프로젝트는 RenaissanceMind Agent의 도움으로 자동 업데이트됩니다. 도구 메타데이터, 스타 수, 라이선스, 약관은 변할 수 있으므로 항목을 사용하기 전에 공식 사이트나 저장소를 확인하세요.

논문, 뉴스, 웹 페이지, 문서, 코드베이스, 데이터, 지식 모음을 사람이 읽을 수 있는 시각 자료나 발표용 결과물로 바꾸는 AI 및 Agent 도구 모음입니다.

이 카탈로그는 **정보 출처**, **도구 형태**, **출력 결과물**, **의존성 유형**으로 태그됩니다. 슬라이드는 출력 형태 중 하나일 뿐이며, 많은 도구가 보고서, 웹 페이지, 다이어그램, 마인드맵, 대시보드, 코드 맵도 생성합니다.

일부 프로젝트 이름, 공식 용어, 짧은 설명은 검색성과 원문 추적성을 위해 영어로 유지했습니다.

## ✨ 추천 사용법

| 대상 | 추천 |
| --- | --- |
| 🤖 Agent용 | [`ai-visualization-advisor`](skills/ai-visualization-advisor/SKILL.md) skill을 설치/활성화한 뒤, 사용자의 정보 출처, 대상 독자, 제약 조건에 맞춰 출력 형태와 도구를 추천하게 하세요. 먼저 [`data/catalog.yml`](data/catalog.yml) 및 [`data/tool-research.yml`](data/tool-research.yml)을 읽도록 설계되어 있습니다. |
| 👤 사람용 | 이 README를 보거나 [awesome-ai-visualization.renaissancemind.ai](https://awesome-ai-visualization.renaissancemind.ai/)에서 도구를 탐색하고 필터링하세요(권장). |

## 목차

- [주요 워크플로 도구](#주요-워크플로-도구)
- [보조, 전처리 및 후처리 도구](#보조-전처리-및-후처리-도구)
- [도구 선택 방법](#도구-선택-방법)
- [더 많은 도구 찾기](#더-많은-도구-찾기)
- [데이터](#데이터)
- [기여](#기여)

## 주요 워크플로 도구

이 섹션은 정보 출처를 사람이 읽고, 검토하고, 발표하고, 공유할 수 있는 결과물로 직접 바꾸는 도구를 모았습니다. 각 행은 주요 태그로 분류되어 있습니다.

### 논문, 연구 및 학술 탐색

논문, 연구 주제, 학술 코퍼스에서 시작해 설명 자료, 보고서, 지도, 그림, 커뮤니케이션 결과물을 만드는 도구입니다.

| 프로젝트 | 정보 출처 | 도구 형태 | 출력 결과물 | 의존성 |
| --- | --- | --- | --- | --- |
| [Paper2Any](https://github.com/OpenDCAI/Paper2Any) [![Star](https://img.shields.io/github/stars/OpenDCAI/Paper2Any?style=flat&logo=github&label=Star)](https://github.com/OpenDCAI/Paper2Any/stargazers) | 논문/연구 | 오픈소스 앱/프레임워크 | 그래픽 초록/인포그래픽 / PPT/덱 / 웹/인터랙티브 페이지 | 로컬 런타임 / 모델 API / 문서 파싱/OCR / 렌더링/내보내기 / GPU/가속기 / 템플릿/자산 |
| [paper-2-web](https://github.com/davila7/claude-code-templates/blob/main/cli-tool/components/skills/scientific/paper-2-web/SKILL.md?plain=1) [![Star](https://img.shields.io/github/stars/davila7/claude-code-templates?style=flat&logo=github&label=Star)](https://github.com/davila7/claude-code-templates/stargazers) | 논문/연구 | Agent Skill | 그래픽 초록/인포그래픽 / PPT/덱 / 웹/인터랙티브 페이지 | Agent 호스트 / 모델 API / 로컬 런타임 / 렌더링/내보내기 / 템플릿/자산 |
| [paper-to-course](https://github.com/ZeroxZhang/paper-to-course) [![Star](https://img.shields.io/github/stars/ZeroxZhang/paper-to-course?style=flat&logo=github&label=Star)](https://github.com/ZeroxZhang/paper-to-course/stargazers) | 논문/연구 | Agent Skill | 웹/인터랙티브 페이지 / Q&A/학습 자료 | Agent 호스트 / 모델 API / 로컬 런타임 / 렌더링/내보내기 |
| [Auto-Research-In-Sleep](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep) [![Star](https://img.shields.io/github/stars/wanshuiyin/Auto-claude-code-research-in-sleep?style=flat&logo=github&label=Star)](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep/stargazers) | 논문/연구 | Skill 모음 | 긴 보고서 / 근거 표 | Agent 호스트 / 모델 API / 로컬 런타임 / 시스템 도구 / 렌더링/내보내기 / 템플릿/자산 |
| [scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) [![Star](https://img.shields.io/github/stars/K-Dense-AI/scientific-agent-skills?style=flat&logo=github&label=Star)](https://github.com/K-Dense-AI/scientific-agent-skills/stargazers) | 논문/연구 | Skill 모음 | 그래픽 초록/인포그래픽 / PPT/덱 / 웹/인터랙티브 페이지 | Agent 호스트 / 모델 API / 외부 검색/데이터 / 렌더링/내보내기 |
| [claude-scientific-writer](https://github.com/K-Dense-AI/claude-scientific-writer) [![Star](https://img.shields.io/github/stars/K-Dense-AI/claude-scientific-writer?style=flat&logo=github&label=Star)](https://github.com/K-Dense-AI/claude-scientific-writer/stargazers) | 논문/연구 | Agent Skill | 긴 보고서 / 근거 표 | Agent 호스트 / 모델 API / 외부 검색/데이터 / 템플릿/자산 |
| [SciGA](https://github.com/IyatomiLab/SciGA) [![Star](https://img.shields.io/github/stars/IyatomiLab/SciGA?style=flat&logo=github&label=Star)](https://github.com/IyatomiLab/SciGA/stargazers) | 논문/연구 | 데이터셋/벤치마크 | 그래픽 초록/인포그래픽 / PPT/덱 / 웹/인터랙티브 페이지 | 로컬 런타임 / 문서 파싱/OCR / GPU/가속기 |
| [Academic Figures](https://github.com/sai-tv/academic-figures) [![Star](https://img.shields.io/github/stars/sai-tv/academic-figures?style=flat&logo=github&label=Star)](https://github.com/sai-tv/academic-figures/stargazers) | 논문/연구 자료 / 텍스트/아이디어 | Agent Skill | 그래픽 초록/인포그래픽 / SVG/PNG/PDF | Agent 호스트 / 모델 API / 렌더링/내보내기 / 템플릿/소재 |
| [Paper2Slides](https://github.com/pchi123/Paper2Slides) [![Star](https://img.shields.io/github/stars/pchi123/Paper2Slides?style=flat&logo=github&label=Star)](https://github.com/pchi123/Paper2Slides/stargazers) | Papers/research | Open-source app/framework | Graphical abstract/infographic / PPT/deck | Local runtime / Document parsing/OCR / Rendering/export / Templates/assets |
| [AI-Researcher](https://github.com/HKUDS/AI-Researcher) [![Star](https://img.shields.io/github/stars/HKUDS/AI-Researcher?style=flat&logo=github&label=Star)](https://github.com/HKUDS/AI-Researcher/stargazers) | 논문/연구 | 연구 프로토타입 | 긴 보고서 / 근거 표 | 로컬 런타임 / 모델 API / 외부 검색/데이터 / GPU/가속기 |
| [Elicit](https://elicit.com/) | 논문/연구 | 제품/SaaS | 브리핑/보고서 / 근거 표 | 브라우저/계정 / 외부 검색/데이터 |
| [Paperguide](https://paperguide.ai/) | 논문/연구 | 제품/SaaS | 브리핑/보고서 / 근거 표 | 브라우저/계정 / 외부 검색/데이터 |
| [SciSpace Infographic Maker](https://scispace.com/agents/infographic-maker-hbcwetac) | 논문/연구 | 제품/SaaS | 그래픽 초록/인포그래픽 / PPT/덱 / 웹/인터랙티브 페이지 | 브라우저/계정 / 템플릿/자산 |
| [Grabstract](https://grabstract.io/graphical-abstracts) | 논문/연구 | 제품/SaaS | 그래픽 초록/인포그래픽 / PPT/덱 / 웹/인터랙티브 페이지 | 브라우저/계정 / 템플릿/자산 |
| [Open Knowledge Maps](https://openknowledgemaps.org/) | 논문/연구 / 인용 그래프 | 제품/SaaS | 문헌/지식 지도 | 브라우저/계정 / 외부 검색/데이터 |
| [Connected Papers](https://www.connectedpapers.com/) | 논문/연구 / 인용 그래프 | 제품/SaaS | 문헌/지식 지도 | 브라우저/계정 / 외부 검색/데이터 |
| [ResearchRabbit](https://www.researchrabbit.ai/) | 논문/연구 / 인용 그래프 | 제품/SaaS | 문헌/지식 지도 | 브라우저/계정 / 외부 검색/데이터 |
| [Litmaps](https://www.litmaps.com/) | 논문/연구 / 인용 그래프 | 제품/SaaS | 문헌/지식 지도 | 브라우저/계정 / 외부 검색/데이터 |
| [Consensus](https://consensus.app/) | 논문/연구 | 제품/SaaS | 브리핑/보고서 / 근거 표 | 브라우저/계정 / 외부 검색/데이터 |

### 웹, 뉴스 및 인텔리전스

웹 페이지, 검색 결과, 뉴스 스트림, 시장 데이터, 위협 인텔리전스에서 근거 있는 보고서, 대시보드, 지도를 만드는 도구입니다.

| 프로젝트 | 정보 출처 | 도구 형태 | 출력 결과물 | 의존성 |
| --- | --- | --- | --- | --- |
| [GPT Researcher](https://github.com/assafelovic/gpt-researcher) [![Star](https://img.shields.io/github/stars/assafelovic/gpt-researcher?style=flat&logo=github&label=Star)](https://github.com/assafelovic/gpt-researcher/stargazers) | 웹/검색 / 뉴스/인텔리전스 | 오픈소스 앱/프레임워크 | 긴 보고서 / 출처 있는 답변 | 로컬 런타임 / 모델 API / 외부 검색/데이터 / 스토리지/인덱스 |
| [STORM](https://github.com/stanford-oval/storm) [![Star](https://img.shields.io/github/stars/stanford-oval/storm?style=flat&logo=github&label=Star)](https://github.com/stanford-oval/storm/stargazers) | 웹/검색 / 뉴스/인텔리전스 | 오픈소스 앱/프레임워크 | 긴 보고서 / 출처 있는 답변 | 로컬 런타임 / 모델 API / 외부 검색/데이터 / 스토리지/인덱스 |
| [Scira](https://github.com/zaidmukaddam/scira) [![Star](https://img.shields.io/github/stars/zaidmukaddam/scira?style=flat&logo=github&label=Star)](https://github.com/zaidmukaddam/scira/stargazers) | 웹/검색 / 뉴스/인텔리전스 | 오픈소스 앱/프레임워크 / Bot/어시스턴트 | 긴 보고서 / 출처 있는 답변 | 로컬 런타임 / 모델 API / 외부 검색/데이터 / 스토리지/인덱스 |
| [Vane](https://github.com/ItzCrazyKns/Vane) [![Star](https://img.shields.io/github/stars/ItzCrazyKns/Vane?style=flat&logo=github&label=Star)](https://github.com/ItzCrazyKns/Vane/stargazers) | 웹/검색 / 뉴스/인텔리전스 | 오픈소스 앱/프레임워크 / Bot/어시스턴트 | 긴 보고서 / 출처 있는 답변 | 로컬 런타임 / 모델 API / 외부 검색/데이터 / 스토리지/인덱스 |
| [FinRobot](https://github.com/AI4Finance-Foundation/FinRobot) [![Star](https://img.shields.io/github/stars/AI4Finance-Foundation/FinRobot?style=flat&logo=github&label=Star)](https://github.com/AI4Finance-Foundation/FinRobot/stargazers) | 뉴스/인텔리전스 / 데이터/표 / 웹/검색 | 오픈소스 앱/프레임워크 | 긴 보고서 / 차트/대시보드 | 로컬 런타임 / 모델 API / 외부 검색/데이터 / 렌더링/내보내기 |
| [Market-Intelligence-Agent](https://github.com/vikas-kashyap97/Market-Intelligence-Agent) [![Star](https://img.shields.io/github/stars/vikas-kashyap97/Market-Intelligence-Agent?style=flat&logo=github&label=Star)](https://github.com/vikas-kashyap97/Market-Intelligence-Agent/stargazers) | 뉴스/인텔리전스 / 데이터/표 / 웹/검색 | 오픈소스 앱/프레임워크 | 차트/대시보드 / 브리핑/보고서 | 로컬 런타임 / 모델 API / 외부 검색/데이터 / 렌더링/내보내기 / 스토리지/인덱스 |
| [World Monitor](https://github.com/FutureSpeakAI/agent-fridays-global-intelligence-monitor) [![Star](https://img.shields.io/github/stars/FutureSpeakAI/agent-fridays-global-intelligence-monitor?style=flat&logo=github&label=Star)](https://github.com/FutureSpeakAI/agent-fridays-global-intelligence-monitor/stargazers) | 뉴스/인텔리전스 / 웹/검색 | 오픈소스 앱/프레임워크 | 차트/대시보드 / 브리핑/보고서 | 로컬 런타임 / 모델 API / 외부 검색/데이터 / 렌더링/내보내기 / 스토리지/인덱스 |
| [OSSInsight](https://github.com/pingcap/ossinsight) [![Star](https://img.shields.io/github/stars/pingcap/ossinsight?style=flat&logo=github&label=Star)](https://github.com/pingcap/ossinsight/stargazers) | 코드베이스 / 데이터/표 / 웹/검색 | 오픈소스 앱/프레임워크 / 제품/SaaS | 차트/대시보드 / 브리핑/보고서 | 브라우저/계정 / 외부 검색/데이터 / 렌더링/내보내기 / 저장소/인덱스 |

### 문서, PDF 및 지식 베이스

PDF, 오피스 파일, 웹 페이지, 개인 문서, 팀 지식 베이스에서 브리핑, Q&A, 학습 자료, 지식 지도를 만드는 도구입니다.

| 프로젝트 | 정보 출처 | 도구 형태 | 출력 결과물 | 의존성 |
| --- | --- | --- | --- | --- |
| [notex](https://github.com/smallnest/notex) [![Star](https://img.shields.io/github/stars/smallnest/notex?style=flat&logo=github&label=Star)](https://github.com/smallnest/notex/stargazers) | PDF/문서 / 웹/검색 / 지식 베이스 | 오픈소스 앱/프레임워크 | 브리핑/보고서 / 마인드맵/지식 지도 / Q&A/학습 자료 | 로컬 런타임 / 모델 API / 문서 파싱/OCR / 렌더링/내보내기 / 스토리지/인덱스 |
| [Open Notebook](https://github.com/lfnovo/open-notebook) [![Star](https://img.shields.io/github/stars/lfnovo/open-notebook?style=flat&logo=github&label=Star)](https://github.com/lfnovo/open-notebook/stargazers) | PDF/문서 / 웹/검색 / 지식 베이스 | 오픈소스 앱/프레임워크 | 브리핑/보고서 / 마인드맵/지식 지도 / Q&A/학습 자료 | 로컬 런타임 / 모델 API / 문서 파싱/OCR / 스토리지/인덱스 |
| [SurfSense](https://github.com/MODSetter/SurfSense) [![Star](https://img.shields.io/github/stars/MODSetter/SurfSense?style=flat&logo=github&label=Star)](https://github.com/MODSetter/SurfSense/stargazers) | PDF/문서 / 웹/검색 / 지식 베이스 | 오픈소스 앱/프레임워크 | 브리핑/보고서 / 마인드맵/지식 지도 / Q&A/학습 자료 | 로컬 런타임 / 모델 API / 외부 검색/데이터 / 스토리지/인덱스 |
| [NotebookLM](https://notebooklm.google/) | PDF/문서 / 웹/검색 / 지식 베이스 | 제품/SaaS / Bot/어시스턴트 | 브리핑/보고서 / 마인드맵/지식 지도 / Q&A/학습 자료 | 브라우저/계정 |
| [NotebookLM AI Plugin](https://github.com/proyecto26/notebooklm-ai-plugin) [![Star](https://img.shields.io/github/stars/proyecto26/notebooklm-ai-plugin?style=flat&logo=github&label=Star)](https://github.com/proyecto26/notebooklm-ai-plugin/stargazers) | PDF/문서 / 웹/검색 / 지식 베이스 / 임의/다중 소스 | Agent Skill / Bot/어시스턴트 | PPT/프레젠테이션 / 비디오/오디오 / 마인드맵/지식맵 / 인포그래픽/비주얼 리포트 / 브리핑/리포트 / 표/타임라인 / Q&A/학습 자료 | Agent 호스트 / 브라우저/계정 / 로컬 런타임 / 문서 파싱/OCR / 외부 검색/데이터 / 렌더링/내보내기 |

### 코드베이스와 소프트웨어 시스템

저장소, 로컬 코드, 의존성, diff를 아키텍처 다이어그램, repo wiki, 코드 맵, 지식 그래프로 바꾸는 도구입니다.

| 프로젝트 | 정보 출처 | 도구 형태 | 출력 결과물 | 의존성 |
| --- | --- | --- | --- | --- |
| [GitDiagram](https://github.com/ahmedkhaleel2004/gitdiagram) [![Star](https://img.shields.io/github/stars/ahmedkhaleel2004/gitdiagram?style=flat&logo=github&label=Star)](https://github.com/ahmedkhaleel2004/gitdiagram/stargazers) | 코드베이스 | 오픈소스 앱/프레임워크 | 코드 맵/Repo Wiki / 아키텍처/흐름도 | 브라우저/계정 / 모델 API / 코드 분석 |
| [CodeBoarding](https://github.com/Codeboarding/CodeBoarding) [![Star](https://img.shields.io/github/stars/Codeboarding/CodeBoarding?style=flat&logo=github&label=Star)](https://github.com/Codeboarding/CodeBoarding/stargazers) | 코드베이스 | 오픈소스 앱/프레임워크 | 코드 맵/Repo Wiki / 아키텍처/흐름도 | 로컬 런타임 / 모델 API / 코드 분석 / 렌더링/내보내기 / 스토리지/인덱스 |
| [Understand-Anything](https://github.com/Egonex-AI/Understand-Anything) [![Star](https://img.shields.io/github/stars/Egonex-AI/Understand-Anything?style=flat&logo=github&label=Star)](https://github.com/Egonex-AI/Understand-Anything/stargazers) | 코드베이스 | Agent Skill | 코드 맵/Repo Wiki / 아키텍처/흐름도 | Agent 호스트 / 로컬 런타임 / 모델 API / 코드 분석 / 스토리지/인덱스 |
| [DeepWiki Open](https://github.com/AsyncFuncAI/deepwiki-open) [![Star](https://img.shields.io/github/stars/AsyncFuncAI/deepwiki-open?style=flat&logo=github&label=Star)](https://github.com/AsyncFuncAI/deepwiki-open/stargazers) | 코드베이스 | 오픈소스 앱/프레임워크 | 코드 맵/Repo Wiki / 아키텍처/흐름도 | 로컬 런타임 / 모델 API / 코드 분석 / 렌더링/내보내기 |
| [PocketFlow Tutorial 코드베이스 Knowledge](https://github.com/The-Pocket/PocketFlow-Tutorial-코드베이스-Knowledge) [![Star](https://img.shields.io/github/stars/The-Pocket/PocketFlow-Tutorial-코드베이스-Knowledge?style=flat&logo=github&label=Star)](https://github.com/The-Pocket/PocketFlow-Tutorial-코드베이스-Knowledge/stargazers) | 코드베이스 | 오픈소스 앱/프레임워크 | 코드 맵/Repo Wiki / 아키텍처/흐름도 | 로컬 런타임 / 모델 API / 코드 분석 / 렌더링/내보내기 |
| [local-deepwiki-mcp](https://github.com/UrbanDiver/local-deepwiki-mcp) [![Star](https://img.shields.io/github/stars/UrbanDiver/local-deepwiki-mcp?style=flat&logo=github&label=Star)](https://github.com/UrbanDiver/local-deepwiki-mcp/stargazers) | 코드베이스 | MCP Server / 오픈소스 앱/프레임워크 | 코드 맵/Repo Wiki / 아키텍처/흐름도 / 웹/인터랙티브 페이지 / SVG/PNG/PDF | MCP 클라이언트 / 로컬 런타임 / 모델 API / 코드 분석 / 스토리지/인덱스 / 렌더링/내보내기 / GPU/가속기 |
| [GitVizz](https://github.com/adithya-s-k/GitVizz) [![Star](https://img.shields.io/github/stars/adithya-s-k/GitVizz?style=flat&logo=github&label=Star)](https://github.com/adithya-s-k/GitVizz/stargazers) | 코드베이스 | 오픈소스 앱/프레임워크 | 코드 맵/Repo Wiki / 아키텍처/흐름도 | 브라우저/계정 / 모델 API / 코드 분석 / 렌더링/내보내기 |
| [codeflow](https://github.com/braedonsaunders/codeflow) [![Star](https://img.shields.io/github/stars/braedonsaunders/codeflow?style=flat&logo=github&label=Star)](https://github.com/braedonsaunders/codeflow/stargazers) | 코드베이스 | 오픈소스 앱/프레임워크 | 코드 맵/Repo Wiki / 아키텍처/흐름도 | 브라우저/계정 / 모델 API / 코드 분석 / 렌더링/내보내기 |
| [oh-my-mermaid](https://github.com/oh-my-mermaid/oh-my-mermaid) [![Star](https://img.shields.io/github/stars/oh-my-mermaid/oh-my-mermaid?style=flat&logo=github&label=Star)](https://github.com/oh-my-mermaid/oh-my-mermaid/stargazers) | 코드베이스 | Agent Skill | 코드 맵/Repo Wiki / 아키텍처/흐름도 | Agent 호스트 / 모델 API / 코드 분석 / 렌더링/내보내기 |
| [codag-visualizer](https://github.com/codag-megalith/codag-visualizer) [![Star](https://img.shields.io/github/stars/codag-megalith/codag-visualizer?style=flat&logo=github&label=Star)](https://github.com/codag-megalith/codag-visualizer/stargazers) | 코드베이스 | 오픈소스 앱/프레임워크 | 코드 맵/Repo Wiki / 아키텍처/흐름도 | 로컬 런타임 / 코드 분석 / 렌더링/내보내기 |
| [codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp) [![Star](https://img.shields.io/github/stars/DeusData/codebase-memory-mcp?style=flat&logo=github&label=Star)](https://github.com/DeusData/codebase-memory-mcp/stargazers) | 코드베이스 | MCP Server | 코드 맵/Repo Wiki / 아키텍처/흐름도 | MCP 클라이언트 / 로컬 런타임 / 코드 분석 / 스토리지/인덱스 |
| [CodeAtlas](https://github.com/lucyb0207/CodeAtlas) [![Star](https://img.shields.io/github/stars/lucyb0207/CodeAtlas?style=flat&logo=github&label=Star)](https://github.com/lucyb0207/CodeAtlas/stargazers) | 코드베이스 | 오픈소스 앱/프레임워크 | 코드 맵/Repo Wiki / 아키텍처/흐름도 | 로컬 런타임 / 코드 분석 / 렌더링/내보내기 |
| [devlensOSS](https://github.com/devlensio/devlensOSS) [![Star](https://img.shields.io/github/stars/devlensio/devlensOSS?style=flat&logo=github&label=Star)](https://github.com/devlensio/devlensOSS/stargazers) | 코드베이스 | 오픈소스 앱/프레임워크 | 코드 맵/Repo Wiki / 아키텍처/흐름도 | 로컬 런타임 / 코드 분석 / 렌더링/내보내기 |
| [Visual-Explainer](https://github.com/jircik/Visual-Explainer) [![Star](https://img.shields.io/github/stars/jircik/Visual-Explainer?style=flat&logo=github&label=Star)](https://github.com/jircik/Visual-Explainer/stargazers) | 코드베이스 | Agent Skill | 코드 맵/Repo Wiki / 아키텍처/흐름도 | Agent 호스트 / 모델 API / 코드 분석 / 렌더링/내보내기 |
| [codemap-skill](https://github.com/Asixa/codemap-skill) [![Star](https://img.shields.io/github/stars/Asixa/codemap-skill?style=flat&logo=github&label=Star)](https://github.com/Asixa/codemap-skill/stargazers) | 코드베이스 | Agent Skill | 코드 맵/Repo Wiki / 아키텍처/흐름도 | Agent 호스트 / 모델 API / 코드 분석 |
| [DeepWiki](https://docs.devin.ai/work-with-devin/deepwiki) | 코드베이스 | 제품/SaaS | 코드 맵/Repo Wiki / 아키텍처/흐름도 | 브라우저/계정 / 코드 분석 |
| [CodeSee](https://www.codesee.io/) | 코드베이스 | 제품/SaaS | 코드 맵/Repo Wiki / 아키텍처/흐름도 | 브라우저/계정 / 코드 분석 |

### 데이터, 표 및 비즈니스 지표

Tools that turn CSVs, databases, metrics, or business data into charts, dashboards, or analytical reports.

| 프로젝트 | 정보 출처 | 도구 형태 | 출력 결과물 | 의존성 |
| --- | --- | --- | --- | --- |
| [Data Formulator](https://github.com/microsoft/data-formulator) [![Star](https://img.shields.io/github/stars/microsoft/data-formulator?style=flat&logo=github&label=Star)](https://github.com/microsoft/data-formulator/stargazers) | 데이터/표 / 데이터베이스 | 오픈소스 앱/프레임워크 | 차트/대시보드 / 브리핑/보고서 | 로컬 런타임 / 모델 API / 렌더링/내보내기 |
| [LIDA](https://github.com/microsoft/lida) [![Star](https://img.shields.io/github/stars/microsoft/lida?style=flat&logo=github&label=Star)](https://github.com/microsoft/lida/stargazers) | 데이터/표 / 데이터베이스 | 오픈소스 앱/프레임워크 | 차트/대시보드 / 브리핑/보고서 | 로컬 런타임 / 모델 API / 렌더링/내보내기 |
| [WrenAI](https://github.com/Canner/WrenAI) [![Star](https://img.shields.io/github/stars/Canner/WrenAI?style=flat&logo=github&label=Star)](https://github.com/Canner/WrenAI/stargazers) | 데이터/표 / 데이터베이스 / 지식 베이스 | 오픈소스 앱/프레임워크 / Agent Skill | 차트/대시보드 / 브리핑/보고서 | Agent 호스트 / 로컬 런타임 / 모델 API / 외부 검색/데이터 / 저장소/인덱스 |
| [chart-visualization-skills](https://github.com/antvis/chart-visualization-skills) [![Star](https://img.shields.io/github/stars/antvis/chart-visualization-skills?style=flat&logo=github&label=Star)](https://github.com/antvis/chart-visualization-skills/stargazers) | 데이터/표 / 텍스트/아이디어 / 코드/기술 문서 | Skill 모음 / API/SDK/라이브러리 | 차트/대시보드 / 인포그래픽/비주얼 리포트 / 아키텍처/흐름도 / 렌더링된 차트 | Agent 호스트 / 로컬 런타임 / 렌더링/내보내기 / 템플릿/자산 |
| [mcp-server-chart](https://github.com/antvis/mcp-server-chart) [![Star](https://img.shields.io/github/stars/antvis/mcp-server-chart?style=flat&logo=github&label=Star)](https://github.com/antvis/mcp-server-chart/stargazers) | 데이터/표 / 텍스트/아이디어 / 데이터베이스 | MCP Server / Skill 모음 | 차트/대시보드 / 인포그래픽/비주얼 리포트 / 아키텍처/흐름도 / 화이트보드/마인드맵 / 렌더링된 차트 | MCP 클라이언트 / 로컬 런타임 / 렌더링/내보내기 |
| [MatPlotAgent](https://github.com/thunlp/MatPlotAgent) [![Star](https://img.shields.io/github/stars/thunlp/MatPlotAgent?style=flat&logo=github&label=Star)](https://github.com/thunlp/MatPlotAgent/stargazers) | 데이터/표 / 데이터베이스 | 연구 프로토타입 | 차트/대시보드 / 브리핑/보고서 | 로컬 런타임 / 모델 API / 렌더링/내보내기 |
| [OpenVizAI](https://github.com/OpenVizAI/OpenVizAI) [![Star](https://img.shields.io/github/stars/OpenVizAI/OpenVizAI?style=flat&logo=github&label=Star)](https://github.com/OpenVizAI/OpenVizAI/stargazers) | 데이터/표 / 데이터베이스 | 오픈소스 앱/프레임워크 | 차트/대시보드 / 브리핑/보고서 | 로컬 런타임 / 모델 API / 렌더링/내보내기 |
| [generative-dashboard-builder](https://github.com/KaranChandekar/generative-dashboard-builder) [![Star](https://img.shields.io/github/stars/KaranChandekar/generative-dashboard-builder?style=flat&logo=github&label=Star)](https://github.com/KaranChandekar/generative-dashboard-builder/stargazers) | 데이터/표 / 데이터베이스 | 오픈소스 앱/프레임워크 | 차트/대시보드 / 브리핑/보고서 | 로컬 런타임 / 모델 API / 렌더링/내보내기 / 스토리지/인덱스 |
| [OpenBI](https://github.com/narender-rk10/OpenBI) [![Star](https://img.shields.io/github/stars/narender-rk10/OpenBI?style=flat&logo=github&label=Star)](https://github.com/narender-rk10/OpenBI/stargazers) | 데이터/표 / 데이터베이스 | 오픈소스 앱/프레임워크 | 차트/대시보드 / 브리핑/보고서 | 로컬 런타임 / 모델 API / 외부 검색/데이터 / 스토리지/인덱스 / 렌더링/내보내기 |

### 일반 텍스트, 아이디어 및 화이트보드 시각화

Tools that turn prompts, drafts, whiteboard ideas, or semi-structured text into infographics, diagrams, whiteboards, or visual reports.

| 프로젝트 | 정보 출처 | 도구 형태 | 출력 결과물 | 의존성 |
| --- | --- | --- | --- | --- |
| [q-skills](https://github.com/TyrealQ/q-skills) [![Star](https://img.shields.io/github/stars/TyrealQ/q-skills?style=flat&logo=github&label=Star)](https://github.com/TyrealQ/q-skills/stargazers) | 텍스트/아이디어 / PDF/문서 / 데이터/표 | Skill 모음 | 인포그래픽/시각 보고서 / 긴 보고서 | Agent 호스트 / 모델 API / 로컬 런타임 / 렌더링/내보내기 |
| [Visualize](https://github.com/careerhackeralex/visualize) [![Star](https://img.shields.io/github/stars/careerhackeralex/visualize?style=flat&logo=github&label=Star)](https://github.com/careerhackeralex/visualize/stargazers) | 텍스트/아이디어 / 데이터/표 / 코드/기술 설명 | Agent Skill | 웹/인터랙티브 페이지 / PPT/프레젠테이션 / 차트/대시보드 / 인포그래픽/비주얼 리포트 / 아키텍처/흐름도 | Agent 호스트 / 모델 API / 로컬 런타임 / 렌더링/내보내기 / 템플릿/소재 |
| [Visual Explainer Skill](https://github.com/ericblue/visual-explainer-skill) [![Star](https://img.shields.io/github/stars/ericblue/visual-explainer-skill?style=flat&logo=github&label=Star)](https://github.com/ericblue/visual-explainer-skill/stargazers) | 텍스트/아이디어 / PDF/문서 / 코드베이스 / 코드/기술 설명 | Agent Skill | 인포그래픽/비주얼 리포트 / 화이트보드/마인드맵 / PPT/프레젠테이션 / 아키텍처/흐름도 / 그래픽 초록/인포그래픽 | Agent 호스트 / 모델 API / 렌더링/내보내기 / 템플릿/소재 |
| [Piktochart AI](https://piktochart.com/generative-ai/) | 텍스트/아이디어 / PDF/문서 / 데이터/표 | 제품/SaaS | 인포그래픽/시각 보고서 / 긴 보고서 | 브라우저/계정 / 템플릿/자산 |
| [Venngage AI Infographic Generator](https://venngage.com/ai-tools/infographic-generator) | 텍스트/아이디어 / PDF/문서 / 데이터/표 | 제품/SaaS | 인포그래픽/시각 보고서 / 긴 보고서 | 브라우저/계정 / 템플릿/자산 |
| [Venngage AI Report Generator](https://venngage.com/ai-tools/report-generator) | 텍스트/아이디어 / PDF/문서 / 데이터/표 | 제품/SaaS | 인포그래픽/시각 보고서 / 긴 보고서 | 브라우저/계정 / 템플릿/자산 |
| [Jeda AI Infographic Generator](https://www.jeda.ai/ai-infographic-generator) | 텍스트/아이디어 / PDF/문서 / 데이터/표 | 제품/SaaS | 인포그래픽/시각 보고서 / 긴 보고서 | 브라우저/계정 / 문서 파싱/OCR / 템플릿/자산 |
| [Infogram](https://infogram.com/) | 텍스트/아이디어 / PDF/문서 / 데이터/표 | 제품/SaaS | 인포그래픽/시각 보고서 / 긴 보고서 | 브라우저/계정 / 외부 검색/데이터 / 템플릿/자산 |
| [DeepDiagram](https://github.com/LingyiChen-AI/DeepDiagram) [![Star](https://img.shields.io/github/stars/LingyiChen-AI/DeepDiagram?style=flat&logo=github&label=Star)](https://github.com/LingyiChen-AI/DeepDiagram/stargazers) | 텍스트/아이디어 / 코드/기술 텍스트 / 데이터/표 | 오픈소스 앱/프레임워크 | 아키텍처/흐름도 / 화이트보드/마인드맵 / 차트/대시보드 / 인포그래픽/비주얼 리포트 / 다이어그램/Mermaid | 로컬 런타임 / 모델 API / 렌더링/내보내기 / 템플릿/자산 / 저장소/인덱스 |
| [Napkin AI](https://www.napkin.ai/) | 텍스트/아이디어 / 코드/기술 텍스트 | 제품/SaaS | 아키텍처/흐름도 / 화이트보드/마인드맵 | 브라우저/계정 / 템플릿/자산 |
| [Eraser AI](https://www.eraser.io/ai) | 텍스트/아이디어 / 코드/기술 텍스트 | 제품/SaaS | 아키텍처/흐름도 / 화이트보드/마인드맵 | 브라우저/계정 / 템플릿/자산 |
| [Mermaid Chart AI](https://mermaid.ai/mermaid-ai) | 텍스트/아이디어 / 코드/기술 텍스트 | 제품/SaaS | 아키텍처/흐름도 / 화이트보드/마인드맵 | 브라우저/계정 / 렌더링/내보내기 |
| [Whimsical AI](https://whimsical.com/ai) | 텍스트/아이디어 / 코드/기술 텍스트 | 제품/SaaS | 아키텍처/흐름도 / 화이트보드/마인드맵 | 브라우저/계정 / 템플릿/자산 |
| [Lucid AI](https://www.lucidchart.com/pages/use-cases/diagram-with-AI) | 텍스트/아이디어 / 코드/기술 텍스트 | 제품/SaaS | 아키텍처/흐름도 / 화이트보드/마인드맵 | 브라우저/계정 / 템플릿/자산 |
| [Miro AI diagrams](https://help.miro.com/hc/en-us/articles/28782102127890-Miro-AI-with-Diagrams-and-mindmaps) | 텍스트/아이디어 / 코드/기술 텍스트 | 제품/SaaS | 아키텍처/흐름도 / 화이트보드/마인드맵 | 브라우저/계정 / 템플릿/자산 |
| [FigJam AI](https://help.figma.com/hc/en-us/articles/18706554628119-Make-boards-and-diagrams-with-FigJam-AI) | 텍스트/아이디어 / 코드/기술 텍스트 | 제품/SaaS | 아키텍처/흐름도 / 화이트보드/마인드맵 | 브라우저/계정 / 템플릿/자산 |

### 프로그래매틱 비디오와 모션 설명

프롬프트, 웹 페이지, 저장소, 구조화된 타임라인, Agent가 생성한 HTML을 내레이션 또는 애니메이션이 포함된 MP4/비디오 결과물로 바꾸는 도구.

| 프로젝트 | 정보 출처 | 도구 형태 | 출력 결과물 | 의존성 |
| --- | --- | --- | --- | --- |
| [html-video](https://github.com/nexu-io/html-video) [![Star](https://img.shields.io/github/stars/nexu-io/html-video?style=flat&logo=github&label=Star)](https://github.com/nexu-io/html-video/stargazers) | 텍스트/아이디어 / 웹/검색 / 코드베이스 | 오픈소스 앱/프레임워크 | 비디오/오디오 / 웹/인터랙티브 페이지 | Agent 호스트 / 로컬 런타임 / 모델 API / 렌더링/내보내기 / 시스템 도구 / 템플릿/자산 |
| [NextFrame](https://github.com/ChaosRealmsAI/NextFrame) [![Star](https://img.shields.io/github/stars/ChaosRealmsAI/NextFrame?style=flat&logo=github&label=Star)](https://github.com/ChaosRealmsAI/NextFrame/stargazers) | DSL/코드 / 텍스트/아이디어 | 오픈소스 앱/프레임워크 | 비디오/오디오 / 웹/인터랙티브 페이지 | 로컬 런타임 / 렌더링/내보내기 / 시스템 도구 |
| [Helios](https://github.com/BintzGavin/helios) [![Star](https://img.shields.io/github/stars/BintzGavin/helios?style=flat&logo=github&label=Star)](https://github.com/BintzGavin/helios/stargazers) | DSL/코드 / 텍스트/아이디어 | API/SDK/라이브러리 / Agent Skill | 비디오/오디오 / 웹/인터랙티브 페이지 | 로컬 런타임 / 렌더링/내보내기 / 시스템 도구 / Agent 호스트 |
| [OpenMontage](https://github.com/calesthio/OpenMontage) [![Star](https://img.shields.io/github/stars/calesthio/OpenMontage?style=flat&logo=github&label=Star)](https://github.com/calesthio/OpenMontage/stargazers) | 텍스트/아이디어 / 웹/검색 / 뉴스 | 오픈소스 앱/프레임워크 | 비디오/오디오 | Agent 호스트 / 로컬 런타임 / 모델 API / 외부 검색/데이터 / 렌더링/내보내기 / 시스템 도구 |
| [ralphy](https://github.com/alecs5am/ralphy) [![Star](https://img.shields.io/github/stars/alecs5am/ralphy?style=flat&logo=github&label=Star)](https://github.com/alecs5am/ralphy/stargazers) | 텍스트/아이디어 / 웹/검색 | 오픈소스 앱/프레임워크 | 비디오/오디오 | Agent 호스트 / 로컬 런타임 / 모델 API / 렌더링/내보내기 / 시스템 도구 / 저장소/인덱스 |

### 프레젠테이션과 다중 출처 콘텐츠

Tools that turn text, documents, web pages, research material, or outlines into decks, or let agents generate/edit presentations.

| 프로젝트 | 정보 출처 | 도구 형태 | 출력 결과물 | 의존성 |
| --- | --- | --- | --- | --- |
| [ppt-master](https://github.com/hugohe3/ppt-master) [![Star](https://img.shields.io/github/stars/hugohe3/ppt-master?style=flat&logo=github&label=Star)](https://github.com/hugohe3/ppt-master/stargazers) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | 오픈소스 앱/프레임워크 | PPT/덱 | 로컬 런타임 / 모델 API / 렌더링/내보내기 / 템플릿/자산 |
| [Presenton](https://github.com/presenton/presenton) [![Star](https://img.shields.io/github/stars/presenton/presenton?style=flat&logo=github&label=Star)](https://github.com/presenton/presenton/stargazers) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | 오픈소스 앱/프레임워크 / API/SDK/라이브러리 | PPT/덱 | 로컬 런타임 / 모델 API / 렌더링/내보내기 / MCP 클라이언트 / 템플릿/자산 |
| [PPTAgent](https://github.com/icip-cas/PPTAgent) [![Star](https://img.shields.io/github/stars/icip-cas/PPTAgent?style=flat&logo=github&label=Star)](https://github.com/icip-cas/PPTAgent/stargazers) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | 연구 프로토타입 | PPT/덱 | 로컬 런타임 / 모델 API / 렌더링/내보내기 / 템플릿/자산 |
| [AI Multi-Agent Presentation Builder](https://github.com/Azure-Samples/ai-multi-agent-presentation-builder) [![Star](https://img.shields.io/github/stars/Azure-Samples/ai-multi-agent-presentation-builder?style=flat&logo=github&label=Star)](https://github.com/Azure-Samples/ai-multi-agent-presentation-builder/stargazers) | 텍스트/아이디어 / 웹/검색 | 오픈소스 앱/프레임워크 | PPT/덱 | 로컬 런타임 / 모델 API / 외부 검색/데이터 / 렌더링/내보내기 / 템플릿/자산 |
| [presentation-ai](https://github.com/allweonedev/presentation-ai) [![Star](https://img.shields.io/github/stars/allweonedev/presentation-ai?style=flat&logo=github&label=Star)](https://github.com/allweonedev/presentation-ai/stargazers) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | 오픈소스 앱/프레임워크 | PPT/덱 | 로컬 런타임 / 모델 API / 렌더링/내보내기 / 템플릿/자산 |
| [slide-deck-ai](https://github.com/barun-saha/slide-deck-ai) [![Star](https://img.shields.io/github/stars/barun-saha/slide-deck-ai?style=flat&logo=github&label=Star)](https://github.com/barun-saha/slide-deck-ai/stargazers) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | 오픈소스 앱/프레임워크 | PPT/덱 | 로컬 런타임 / 모델 API / 렌더링/내보내기 / 템플릿/자산 |
| [odin-slides](https://github.com/leonid20000/odin-slides) [![Star](https://img.shields.io/github/stars/leonid20000/odin-slides?style=flat&logo=github&label=Star)](https://github.com/leonid20000/odin-slides/stargazers) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | 오픈소스 앱/프레임워크 | PPT/덱 | 로컬 런타임 / 모델 API / 문서 파싱/OCR / 렌더링/내보내기 / 시스템 도구 |
| [ppt-agents](https://github.com/chenxingqiang/ppt-agents) [![Star](https://img.shields.io/github/stars/chenxingqiang/ppt-agents?style=flat&logo=github&label=Star)](https://github.com/chenxingqiang/ppt-agents/stargazers) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | 오픈소스 앱/프레임워크 | PPT/덱 | Agent 호스트 / 로컬 런타임 / 모델 API / 렌더링/내보내기 |
| [deckdown](https://github.com/adityachauhan0/deckdown) [![Star](https://img.shields.io/github/stars/adityachauhan0/deckdown?style=flat&logo=github&label=Star)](https://github.com/adityachauhan0/deckdown/stargazers) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | 오픈소스 앱/프레임워크 | PPT/덱 | 로컬 런타임 / 렌더링/내보내기 |
| [Frontend Slides](https://github.com/zarazhangrui/frontend-slides) [![Star](https://img.shields.io/github/stars/zarazhangrui/frontend-slides?style=flat&logo=github&label=Star)](https://github.com/zarazhangrui/frontend-slides/stargazers) | Text/ideas / PDF/documents | Agent Skill | PPT/deck / Web/interactive page | Agent host / Model API / Local runtime / Rendering/export |
| [Office-PowerPoint-MCP-Server](https://github.com/GongRzhe/Office-PowerPoint-MCP-Server) [![Star](https://img.shields.io/github/stars/GongRzhe/Office-PowerPoint-MCP-Server?style=flat&logo=github&label=Star)](https://github.com/GongRzhe/Office-PowerPoint-MCP-Server/stargazers) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | MCP Server | PPT/덱 | MCP 클라이언트 / 로컬 런타임 / 렌더링/내보내기 / 시스템 도구 |
| [Alai MCP Server](https://github.com/getalai/alai-mcp-server) [![Star](https://img.shields.io/github/stars/getalai/alai-mcp-server?style=flat&logo=github&label=Star)](https://github.com/getalai/alai-mcp-server/stargazers) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | MCP Server / 제품/SaaS | PPT/덱 / SVG/PNG/PDF | MCP 클라이언트 / 브라우저/계정 / 렌더링/내보내기 / 템플릿/자산 |
| [mcp-ppt](https://github.com/ltc6539/mcp-ppt) [![Star](https://img.shields.io/github/stars/ltc6539/mcp-ppt?style=flat&logo=github&label=Star)](https://github.com/ltc6539/mcp-ppt/stargazers) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | MCP Server | PPT/덱 / SVG/PNG/PDF | MCP 클라이언트 / 로컬 런타임 / 렌더링/내보내기 |
| [pptx-tools](https://github.com/jongalloway/pptx-tools) [![Star](https://img.shields.io/github/stars/jongalloway/pptx-tools?style=flat&logo=github&label=Star)](https://github.com/jongalloway/pptx-tools/stargazers) | 텍스트/아이디어 / Office 문서 | MCP Server / API/SDK/라이브러리 | PPT/덱 / 구조화 데이터/Markdown | MCP 클라이언트 / 로컬 런타임 / 렌더링/내보내기 / 시스템 도구 / 템플릿/자산 |
| [Marp MCP](https://github.com/masaki39/marp-mcp) [![Star](https://img.shields.io/github/stars/masaki39/marp-mcp?style=flat&logo=github&label=Star)](https://github.com/masaki39/marp-mcp/stargazers) | 텍스트/아이디어 / DSL/코드 | MCP Server / Agent Skill | PPT/덱 / 웹/인터랙티브 페이지 | MCP 클라이언트 / Agent 호스트 / 로컬 런타임 / 렌더링/내보내기 / 템플릿/자산 |
| [pptx-from-layouts-skill](https://github.com/tristan-mcinnis/pptx-from-layouts-skill) [![Star](https://img.shields.io/github/stars/tristan-mcinnis/pptx-from-layouts-skill?style=flat&logo=github&label=Star)](https://github.com/tristan-mcinnis/pptx-from-layouts-skill/stargazers) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | Agent Skill | PPT/덱 | Agent 호스트 / 로컬 런타임 / 렌더링/내보내기 / 템플릿/자산 |
| [hands-on-deck](https://github.com/EveryInc/hands-on-deck) [![Star](https://img.shields.io/github/stars/EveryInc/hands-on-deck?style=flat&logo=github&label=Star)](https://github.com/EveryInc/hands-on-deck/stargazers) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | Agent Skill | PPT/덱 | Agent 호스트 / 로컬 런타임 / 렌더링/내보내기 |
| [agent-slides](https://github.com/mpuig/agent-slides) [![Star](https://img.shields.io/github/stars/mpuig/agent-slides?style=flat&logo=github&label=Star)](https://github.com/mpuig/agent-slides/stargazers) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | Agent Skill | PPT/덱 | Agent 호스트 / 로컬 런타임 / 모델 API / 렌더링/내보내기 / 템플릿/자산 |
| [ultimate-ppt-master-skill](https://github.com/kdnsna/ultimate-ppt-master-skill) [![Star](https://img.shields.io/github/stars/kdnsna/ultimate-ppt-master-skill?style=flat&logo=github&label=Star)](https://github.com/kdnsna/ultimate-ppt-master-skill/stargazers) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | Agent Skill | PPT/덱 | Agent 호스트 / 로컬 런타임 / 모델 API / 렌더링/내보내기 / 템플릿/자산 |
| [codex-ppt-skill](https://github.com/ningzimu/codex-ppt-skill) [![Star](https://img.shields.io/github/stars/ningzimu/codex-ppt-skill?style=flat&logo=github&label=Star)](https://github.com/ningzimu/codex-ppt-skill/stargazers) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | Agent Skill | PPT/덱 | Agent 호스트 / 로컬 런타임 / 모델 API / 렌더링/내보내기 / 템플릿/자산 |
| [presentation-skills](https://github.com/pamelafox/presentation-skills) [![Star](https://img.shields.io/github/stars/pamelafox/presentation-skills?style=flat&logo=github&label=Star)](https://github.com/pamelafox/presentation-skills/stargazers) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | Skill 모음 | PPT/덱 | Agent 호스트 / 로컬 런타임 / 렌더링/내보내기 |
| [anthropics/skills](https://github.com/anthropics/skills) [![Star](https://img.shields.io/github/stars/anthropics/skills?style=flat&logo=github&label=Star)](https://github.com/anthropics/skills/stargazers) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | Skill 모음 | PPT/덱 | Agent 호스트 / 로컬 런타임 / 문서 파싱/OCR / 렌더링/내보내기 |
| [MiniMax-AI/skills](https://github.com/MiniMax-AI/skills) [![Star](https://img.shields.io/github/stars/MiniMax-AI/skills?style=flat&logo=github&label=Star)](https://github.com/MiniMax-AI/skills/stargazers) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | Skill 모음 | PPT/덱 | Agent 호스트 / 로컬 런타임 / 모델 API / 렌더링/내보내기 |
| [Gamma](https://gamma.app/) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | 제품/SaaS | PPT/덱 | 브라우저/계정 / 템플릿/자산 |
| [SlideSpeak](https://slidespeak.co/) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | 제품/SaaS | PPT/덱 | 브라우저/계정 / 문서 파싱/OCR / 템플릿/자산 |
| [Canva AI Presentations](https://www.canva.com/create/ai-presentations/) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | 제품/SaaS | PPT/덱 | 브라우저/계정 / 템플릿/자산 |
| [Presentations.AI](https://www.presentations.ai/) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | 제품/SaaS | PPT/덱 | 브라우저/계정 / 문서 파싱/OCR / 템플릿/자산 |
| [Beautiful.ai](https://www.beautiful.ai/presentation-maker) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | 제품/SaaS | PPT/덱 | 브라우저/계정 / 템플릿/자산 |
| [Decktopus](https://www.decktopus.com/) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | 제품/SaaS | PPT/덱 | 브라우저/계정 / 템플릿/자산 |
| [PPT.AI](https://ppt.ai/) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | 제품/SaaS | PPT/덱 | 브라우저/계정 / 문서 파싱/OCR / 템플릿/자산 |
| [Slidesgo AI Presentation Maker](https://slidesgo.com/ai/presentation-maker) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | 제품/SaaS | PPT/덱 | 브라우저/계정 / 템플릿/자산 |
| [Microsoft Copilot in PowerPoint](https://powerpoint.cloud.microsoft/create/en/ai-presentation-maker/) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | 제품/SaaS / Bot/어시스턴트 | PPT/덱 | 브라우저/계정 / 시스템 도구 / 템플릿/자산 |
| [Adobe Express AI Presentation Maker](https://www.adobe.com/express/create/ai/presentation) | 텍스트/아이디어 / PDF/문서 / 웹/검색 | 제품/SaaS | PPT/덱 | 브라우저/계정 / 템플릿/자산 |

## 보조, 전처리 및 후처리 도구

This section contains smaller, lower-level, or more specialized tools. They may not cover a full content production workflow by themselves, but they are often key components inside agent workflows.

### PDF, 문서 파싱 및 구조화 추출

PDF, 논문, Office 파일, 스캔을 Markdown, JSON, 레이아웃, 표, OCR 결과로 바꾸는 전처리 도구입니다.

| 프로젝트 | 정보 출처 | 도구 형태 | 출력 결과물 | 의존성 |
| --- | --- | --- | --- | --- |
| [MinerU](https://github.com/opendatalab/MinerU) [![Star](https://img.shields.io/github/stars/opendatalab/MinerU?style=flat&logo=github&label=Star)](https://github.com/opendatalab/MinerU/stargazers) | PDF/문서 / Office 문서 / 논문/연구 | 오픈소스 앱/프레임워크 | 구조화 데이터/Markdown | 로컬 런타임 / 문서 파싱/OCR / GPU/가속기 |
| [Docling](https://github.com/docling-project/docling) [![Star](https://img.shields.io/github/stars/docling-project/docling?style=flat&logo=github&label=Star)](https://github.com/docling-project/docling/stargazers) | PDF/문서 / Office 문서 / 논문/연구 | 오픈소스 앱/프레임워크 | 구조화 데이터/Markdown | 로컬 런타임 / 문서 파싱/OCR |
| [MarkItDown](https://github.com/microsoft/markitdown) [![Star](https://img.shields.io/github/stars/microsoft/markitdown?style=flat&logo=github&label=Star)](https://github.com/microsoft/markitdown/stargazers) | PDF/문서 / Office 문서 / 웹/검색 결과 | API/SDK/라이브러리 | 구조화 데이터/Markdown | 로컬 런타임 / 문서 파싱/OCR / 모델 API |
| [Marker](https://github.com/datalab-to/marker) [![Star](https://img.shields.io/github/stars/datalab-to/marker?style=flat&logo=github&label=Star)](https://github.com/datalab-to/marker/stargazers) | PDF/문서 / Office 문서 / 논문/연구 | 오픈소스 앱/프레임워크 | 구조화 데이터/Markdown | 로컬 런타임 / 문서 파싱/OCR / GPU/가속기 |
| [Unstructured](https://github.com/Unstructured-IO/unstructured) [![Star](https://img.shields.io/github/stars/Unstructured-IO/unstructured?style=flat&logo=github&label=Star)](https://github.com/Unstructured-IO/unstructured/stargazers) | PDF/문서 / Office 문서 / 논문/연구 | 오픈소스 앱/프레임워크 | 구조화 데이터/Markdown | 로컬 런타임 / 문서 파싱/OCR |
| [GROBID](https://github.com/grobidOrg/grobid) [![Star](https://img.shields.io/github/stars/grobidOrg/grobid?style=flat&logo=github&label=Star)](https://github.com/grobidOrg/grobid/stargazers) | PDF/문서 / Office 문서 / 논문/연구 | 오픈소스 앱/프레임워크 | 구조화 데이터/Markdown | 로컬 런타임 / 시스템 도구 / 문서 파싱/OCR |
| [PaperMage](https://github.com/allenai/papermage) [![Star](https://img.shields.io/github/stars/allenai/papermage?style=flat&logo=github&label=Star)](https://github.com/allenai/papermage/stargazers) | PDF/문서 / Office 문서 / 논문/연구 | API/SDK/라이브러리 | 구조화 데이터/Markdown | 로컬 런타임 / 문서 파싱/OCR |
| [s2orc-doc2json](https://github.com/allenai/s2orc-doc2json) [![Star](https://img.shields.io/github/stars/allenai/s2orc-doc2json?style=flat&logo=github&label=Star)](https://github.com/allenai/s2orc-doc2json/stargazers) | PDF/문서 / Office 문서 / 논문/연구 | 오픈소스 앱/프레임워크 | 구조화 데이터/Markdown | 로컬 런타임 / 문서 파싱/OCR |

### 마인드맵 특화 도구

문서, 웹 페이지, 동영상, 위협 인텔리전스, 텍스트를 마인드맵으로 바꾸는 작고 집중된 도구입니다.

| 프로젝트 | 정보 출처 | 도구 형태 | 출력 결과물 | 의존성 |
| --- | --- | --- | --- | --- |
| [TI-Mindmap-GPT](https://github.com/format81/TI-Mindmap-GPT) [![Star](https://img.shields.io/github/stars/format81/TI-Mindmap-GPT?style=flat&logo=github&label=Star)](https://github.com/format81/TI-Mindmap-GPT/stargazers) | 뉴스/인텔리전스 / 웹/검색 / PDF/문서 | 오픈소스 앱/프레임워크 | 마인드맵/지식 지도 / 긴 보고서 / 표/타임라인 | 로컬 런타임 / 모델 API / 문서 파싱/OCR / 렌더링/내보내기 / 외부 검색/데이터 |
| [mindmap-generator](https://github.com/Dicklesworthstone/mindmap-generator) [![Star](https://img.shields.io/github/stars/Dicklesworthstone/mindmap-generator?style=flat&logo=github&label=Star)](https://github.com/Dicklesworthstone/mindmap-generator/stargazers) | PDF/문서 / 웹/검색 / 지식 베이스 | 오픈소스 앱/프레임워크 | 마인드맵/지식 지도 | 로컬 런타임 / 모델 API / 문서 파싱/OCR / 렌더링/내보내기 |
| [Mapify](https://mapify.so/) | PDF/문서 / 웹/검색 / 지식 베이스 | 제품/SaaS | 마인드맵/지식 지도 | 브라우저/계정 / 문서 파싱/OCR / 템플릿/자산 |

### 다이어그램, Mermaid 및 렌더링 구성 요소

Agent가 Mermaid, SVG, PNG, PDF 및 다이어그램 결과물을 생성, 검증, 내보내도록 돕는 후처리/렌더링 도구입니다.

| 프로젝트 | 정보 출처 | 도구 형태 | 출력 결과물 | 의존성 |
| --- | --- | --- | --- | --- |
| [Mermaid](https://github.com/mermaid-js/mermaid) [![Star](https://img.shields.io/github/stars/mermaid-js/mermaid?style=flat&logo=github&label=Star)](https://github.com/mermaid-js/mermaid/stargazers) | DSL/코드 | API/SDK/라이브러리 | 다이어그램/Mermaid / SVG/PNG/PDF | 렌더링/내보내기 |
| [mermaid-js-ai-agent](https://github.com/disler/mermaid-js-ai-agent) [![Star](https://img.shields.io/github/stars/disler/mermaid-js-ai-agent?style=flat&logo=github&label=Star)](https://github.com/disler/mermaid-js-ai-agent/stargazers) | 텍스트/아이디어 / 코드/기술 텍스트 | 오픈소스 앱/프레임워크 | 다이어그램/Mermaid / SVG/PNG/PDF | 로컬 런타임 / 모델 API / 렌더링/내보내기 |
| [mermaid-skill](https://github.com/Agents365-ai/mermaid-skill) [![Star](https://img.shields.io/github/stars/Agents365-ai/mermaid-skill?style=flat&logo=github&label=Star)](https://github.com/Agents365-ai/mermaid-skill/stargazers) | 텍스트/아이디어 / 코드/기술 텍스트 | Agent Skill | 다이어그램/Mermaid / SVG/PNG/PDF | Agent 호스트 / 로컬 런타임 / 모델 API / 렌더링/내보내기 |
| [Pretty-mermaid-skills](https://github.com/imxv/Pretty-mermaid-skills) [![Star](https://img.shields.io/github/stars/imxv/Pretty-mermaid-skills?style=flat&logo=github&label=Star)](https://github.com/imxv/Pretty-mermaid-skills/stargazers) | 텍스트/아이디어 / 코드/기술 텍스트 | Agent Skill | 다이어그램/Mermaid / SVG/PNG/PDF | Agent 호스트 / 로컬 런타임 / 렌더링/내보내기 |
| [agent-toolkit mermaid diagrams](https://github.com/softaworks/agent-toolkit) [![Star](https://img.shields.io/github/stars/softaworks/agent-toolkit?style=flat&logo=github&label=Star)](https://github.com/softaworks/agent-toolkit/stargazers) | 텍스트/아이디어 / 코드/기술 텍스트 | Skill 모음 | 다이어그램/Mermaid / SVG/PNG/PDF | Agent 호스트 / 모델 API / 렌더링/내보내기 |
| [beautiful-mermaid](https://github.com/lukilabs/beautiful-mermaid) [![Star](https://img.shields.io/github/stars/lukilabs/beautiful-mermaid?style=flat&logo=github&label=Star)](https://github.com/lukilabs/beautiful-mermaid/stargazers) | DSL/코드 | API/SDK/라이브러리 | 다이어그램/Mermaid / SVG/PNG/PDF | 로컬 런타임 / 렌더링/내보내기 |
| [LLMermaid](https://github.com/fladdict/llmermaid) [![Star](https://img.shields.io/github/stars/fladdict/llmermaid?style=flat&logo=github&label=Star)](https://github.com/fladdict/llmermaid/stargazers) | 텍스트/아이디어 / 코드/기술 텍스트 | 연구 프로토타입 | 다이어그램/Mermaid / SVG/PNG/PDF | 로컬 런타임 / 모델 API / 렌더링/내보내기 |
| [GenAIScript](https://github.com/microsoft/genaiscript) [![Star](https://img.shields.io/github/stars/microsoft/genaiscript?style=flat&logo=github&label=Star)](https://github.com/microsoft/genaiscript/stargazers) | PDF/문서 / 데이터/표 / 코드베이스 / DSL/코드 | API/SDK/라이브러리 | 다이어그램/Mermaid / 구조화 데이터/Markdown | 로컬 런타임 / 모델 API / 문서 파싱/OCR / 렌더링/내보내기 |
| [mcp-mermaid](https://github.com/hustcc/mcp-mermaid) [![Star](https://img.shields.io/github/stars/hustcc/mcp-mermaid?style=flat&logo=github&label=Star)](https://github.com/hustcc/mcp-mermaid/stargazers) | 텍스트/아이디어 / 코드/기술 텍스트 / DSL/코드 | MCP Server | 다이어그램/Mermaid / SVG/PNG/PDF | MCP 클라이언트 / 로컬 런타임 / 렌더링/내보내기 |
| [mcp-media-forge](https://github.com/PavelGuzenfeld/mcp-media-forge) [![Star](https://img.shields.io/github/stars/PavelGuzenfeld/mcp-media-forge?style=flat&logo=github&label=Star)](https://github.com/PavelGuzenfeld/mcp-media-forge/stargazers) | 텍스트/아이디어 / 데이터/표 / DSL/코드 | MCP Server | 다이어그램/Mermaid / 아키텍처/흐름도 / 차트/대시보드 / 웹/인터랙티브 페이지 / PPT/덱 / SVG/PNG/PDF | MCP 클라이언트 / 로컬 런타임 / 렌더링/내보내기 / 시스템 도구 |
| [AntV Infographic](https://github.com/antvis/infographic) [![Star](https://img.shields.io/github/stars/antvis/infographic?style=flat&logo=github&label=Star)](https://github.com/antvis/infographic/stargazers) | 텍스트/아이디어 / 데이터/표 / DSL/코드 | API/SDK/라이브러리 | 인포그래픽/비주얼 리포트 / 차트/렌더링 출력 / SVG/PNG/PDF | 로컬 런타임 / 렌더링/내보내기 / 템플릿/소재 |
| [Markdown Viewer Agent Skills](https://github.com/markdown-viewer/skills) [![Star](https://img.shields.io/github/stars/markdown-viewer/skills?style=flat&logo=github&label=Star)](https://github.com/markdown-viewer/skills/stargazers) | 텍스트/아이디어 / 데이터/표 / 코드/기술 텍스트 | Skill 모음 | 아키텍처/흐름도 / 차트/대시보드 / 인포그래픽/비주얼 리포트 / 마인드맵/지식 지도 / 렌더링된 차트 | Agent 호스트 / 로컬 런타임 / 렌더링/내보내기 / 템플릿/자산 |
| [AgentFigureGallery](https://github.com/Dsadd4/AgentFigureGallery) [![Star](https://img.shields.io/github/stars/Dsadd4/AgentFigureGallery?style=flat&logo=github&label=Star)](https://github.com/Dsadd4/AgentFigureGallery/stargazers) | 논문/연구 / 데이터/표 | Agent Skill / 데이터셋/벤치마크 | 렌더링된 차트 / SVG/PNG/PDF | Agent 호스트 / 로컬 런타임 / 외부 검색/데이터 / 렌더링/내보내기 |

## 도구 선택 방법

### 정보 출처

| 정보 출처 | 의미 |
| --- | --- |
| 논문/연구 | Papers, arXiv links, academic PDFs, research topics, and experimental results. |
| PDF/문서 | PDFs, long documents, manuals, reports, and exported documents. |
| Office 문서 | Word, PowerPoint, Excel, and other office files. |
| 웹/검색 | Web pages, URLs, search results, extracted page text, and cited sources. |
| 뉴스/인텔리전스 | News streams, market intelligence, threat intelligence, and industry updates. |
| 코드베이스 | GitHub repositories, local code, diffs, dependencies, and symbols. |
| 데이터/표 | CSV, Excel, metrics, time series, and business data. |
| 데이터베이스 | SQL/BI sources, business databases, vector stores, or external data APIs. |
| 지식 베이스 | Notion, Google Drive, Slack, meeting notes, and personal/team documents. |
| 텍스트/아이디어 | Prompts, outlines, drafts, whiteboard ideas, and notes. |
| 코드/기술 텍스트 | Code snippets, API descriptions, and system-design text. |
| DSL/코드 | Mermaid, diagram DSLs, configuration, and executable drawing code. |
| 인용 그래프 | Paper citation relations, related-paper networks, and literature graphs. |
| 임의/다중 출처 | General tools that work across multiple source types. |

### 도구 형태

| 도구 형태 | 의미 |
| --- | --- |
| 제품/SaaS | Hosted website or commercial product, usually browser/account based. |
| 오픈소스 앱/프레임워크 | Runnable or deployable application/framework. |
| Agent Skill | Workflow package for Claude Code, Codex, Cursor, Gemini CLI, or similar agents. |
| Skill 모음 | Repository or suite containing multiple agent skills. |
| MCP Server | Model Context Protocol server exposing files, slides, code, or data capabilities to agents. |
| API/SDK/라이브러리 | Parser, renderer, generator, or data interface called by other tools. |
| Bot/어시스턴트 | Chat/search assistant, browser extension, or collaboration assistant. |
| 연구 프로토타입/데이터셋 | Paper, benchmark, dataset, or research code. |
| Awesome/인덱스 | Directory for discovering tools, papers, and skills. |

### 출력 결과물

| 출력 결과물 | 의미 |
| --- | --- |
| PPT/덱 | PPTX, slides, decks, templates, and presentation masters. |
| 긴 보고서 | Cited research reports, market reports, and analytical documents. |
| 브리핑/보고서 | Summaries, briefings, study guides, and Q&A material. |
| 웹/인터랙티브 페이지 | HTML, interactive tutorials, explainers, and shareable pages. |
| 그래픽 초록/인포그래픽 | Graphical abstracts, infographics, posters, and scientific schematics. |
| 인포그래픽/시각 보고서 | Business infographics, visual reports, and branded summaries. |
| 아키텍처/흐름도 | Mermaid, flowcharts, sequence diagrams, system diagrams, and whiteboards. |
| 화이트보드/마인드맵 | Whiteboards, freeform canvases, and divergent visual maps. |
| 마인드맵/지식 지도 | Mind maps, concept maps, and knowledge networks. |
| 문헌/지식 지도 | Literature maps, related-paper graphs, and research knowledge maps. |
| 차트/대시보드 | Charts, BI dashboards, KPIs, and interactive data views. |
| 표/타임라인 | 근거 표s, IOC tables, event timelines, and comparison tables. |
| 코드 맵/Repo Wiki | Repository maps, repo wikis, dependency graphs, and code knowledge graphs. |
| 다이어그램/Mermaid | Mermaid, diagrams-as-code, and verifiable diagram text. |
| SVG/PNG/PDF | Rendered images, vector graphics, or exported files. |
| 비디오/오디오 | Paper videos, narrated explainers, and audio briefings. |
| 구조화 데이터/Markdown | Markdown, JSON, layout, tables, and OCR outputs for downstream generation. |
| 근거 표 | Paper screening tables, evidence matrices, and citation tables. |
| 출처 있는 답변 | Source-grounded answers or search-result synthesis. |
| Q&A/학습 자료 | Notebook Q&A, quizzes, and study guides. |
| 도구 인덱스 | Awesome lists, tool directories, and paper lists. |
| 렌더링된 차트 | Visual output from renderers or chart components. |

### 의존성 유형

`의존성` describe what a tool needs to run. They are separate from the source, tool, and output tags: those tags answer “where does the information come from, what is the tool, and what does it produce”; dependency tags answer “what does it need”.

| 의존성 | 의미 | 일반적인 예 |
| --- | --- | --- |
| 브라우저/계정 | Browser and account based; usually no local installation. | Google account, Canva account, SaaS plan |
| Agent 호스트 | Needs an agent environment to execute a skill/workflow. | Claude Code, Codex, Cursor, Gemini CLI, OpenCode |
| 모델 API | Calls text, vision, or image model APIs. | OpenAI, Anthropic, Gemini, OpenRouter, Azure OpenAI, Replicate |
| 로컬 런타임 | Needs local runtimes and package managers. | Python, Node.js, Go, Rust, Java, Conda, uv, pnpm |
| 시스템 도구 | Depends on local binaries or office software. | Docker, LibreOffice, Microsoft PowerPoint, Pandoc, LaTeX, Chrome |
| 문서 파싱/OCR | Needs PDF parsing, OCR, layout recovery, or document structure extraction. | MinerU, Docling, Marker, GROBID, Tesseract, layout models |
| 렌더링/내보내기 | Renders intermediate formats into SVG, PNG, PDF, PPTX, or web pages. | Mermaid, Kroki, Playwright, python-pptx, pptxgenjs, SVG renderer |
| 외부 검색/데이터 | Needs web search, paper databases, citation networks, or data APIs. | arXiv, Semantic Scholar, OpenAlex, Google Scholar, web search |
| GPU/가속기 | Local model inference, OCR, vision, or image generation may need acceleration. | CUDA, ROCm, Apple Metal/MPS, cloud GPU |
| MCP 클라이언트 | Needs a client that can connect to MCP Servers. | Claude Desktop, Cursor, Codex, Cline, Continue |
| 코드 분석 | Parses files, symbols, dependencies, and repository structure. | tree-sitter, language servers, ripgrep, ctags, Git |
| 스토리지/인덱스 | Persists state, vector indexes, or graphs. | SQLite, Postgres, Chroma, Qdrant, Neo4j, file index |
| 템플릿/자산 | Needs templates, brand assets, or design resources for high-quality output. | PPTX template, slide master, brand kit, icons, image assets |

Star badges are shown next to GitHub project names where available. Non-GitHub products do not show a star badge.

## 더 많은 도구 찾기

awesome list, 논문 목록, skill 레지스트리, MCP 디렉터리입니다. 단일 생산 도구는 아니지만 이 저장소를 확장하는 데 유용합니다.

| 프로젝트 | 범위 | 도구 형태 | 찾기 좋은 항목 |
| --- | --- | --- | --- |
| [awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) [![Star](https://img.shields.io/github/stars/VoltAgent/awesome-agent-skills?style=flat&logo=github&label=Star)](https://github.com/VoltAgent/awesome-agent-skills/stargazers) | 임의/다중 출처 | Awesome/인덱스 | Large agent skill directory. |
| [awesome-llm-skills](https://github.com/Prat011/awesome-llm-skills) [![Star](https://img.shields.io/github/stars/Prat011/awesome-llm-skills?style=flat&logo=github&label=Star)](https://github.com/Prat011/awesome-llm-skills/stargazers) | 임의/다중 출처 | Awesome/인덱스 | Cross-agent LLM skills list. |
| [Awesome-Powerpoint-AI-Agents](https://github.com/ishandutta2007/Awesome-Powerpoint-AI-Agents) [![Star](https://img.shields.io/github/stars/ishandutta2007/Awesome-Powerpoint-AI-Agents?style=flat&logo=github&label=Star)](https://github.com/ishandutta2007/Awesome-Powerpoint-AI-Agents/stargazers) | 임의/다중 출처 | Awesome/인덱스 | Directly similar PowerPoint AI agents ecosystem list. |
| [AI-Presentation-Builders-Index](https://github.com/danielrosehill/AI-Presentation-Builders-Index) [![Star](https://img.shields.io/github/stars/danielrosehill/AI-Presentation-Builders-Index?style=flat&logo=github&label=Star)](https://github.com/danielrosehill/AI-Presentation-Builders-Index/stargazers) | 임의/다중 출처 | Awesome/인덱스 | 오픈·셀프호스팅·Agent 기반 프레젠테이션 빌더, Skill, MCP, 렌더러, 파서 인덱스. |
| [awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) [![Star](https://img.shields.io/github/stars/punkpeye/awesome-mcp-servers?style=flat&logo=github&label=Star)](https://github.com/punkpeye/awesome-mcp-servers/stargazers) | 임의/다중 출처 | Awesome/인덱스 | Large MCP Server directory. |
| [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) [![Star](https://img.shields.io/github/stars/hesreallyhim/awesome-claude-code?style=flat&logo=github&label=Star)](https://github.com/hesreallyhim/awesome-claude-code/stargazers) | 임의/다중 출처 | Awesome/인덱스 | Claude Code skill, hook, slash-command, app, and plugin index. |
| [awesome_ai_agents](https://github.com/jim-schwoebel/awesome_ai_agents) [![Star](https://img.shields.io/github/stars/jim-schwoebel/awesome_ai_agents?style=flat&logo=github&label=Star)](https://github.com/jim-schwoebel/awesome_ai_agents/stargazers) | 임의/다중 출처 | Awesome/인덱스 | Broad AI agent resources. |
| [awesome-ai-tools](https://github.com/mahseema/awesome-ai-tools) [![Star](https://img.shields.io/github/stars/mahseema/awesome-ai-tools?style=flat&logo=github&label=Star)](https://github.com/mahseema/awesome-ai-tools/stargazers) | 임의/다중 출처 | Awesome/인덱스 | Broad AI tools list. |
| [awesome-ai-auto-research](https://github.com/worldbench/awesome-ai-auto-research) [![Star](https://img.shields.io/github/stars/worldbench/awesome-ai-auto-research?style=flat&logo=github&label=Star)](https://github.com/worldbench/awesome-ai-auto-research/stargazers) | 임의/다중 출처 | Awesome/인덱스 | AI auto-research landscape, including paper-to-slides, posters, videos, websites, and social outputs. |
| [LLM-Visualization-Paper-List](https://github.com/zengxingchen/LLM-Visualization-Paper-List) [![Star](https://img.shields.io/github/stars/zengxingchen/LLM-Visualization-Paper-List?style=flat&logo=github&label=Star)](https://github.com/zengxingchen/LLM-Visualization-Paper-List/stargazers) | 임의/다중 출처 | Awesome/인덱스 | Paper list for visualization meets LLM. |
| [awesome-ai-for-science](https://github.com/ai-boost/awesome-ai-for-science) [![Star](https://img.shields.io/github/stars/ai-boost/awesome-ai-for-science?style=flat&logo=github&label=Star)](https://github.com/ai-boost/awesome-ai-for-science/stargazers) | 임의/다중 출처 | Awesome/인덱스 | Broad AI-for-science tool, paper, dataset, and framework index. |
| [AlterLab-Academic-Skills](https://github.com/AlterLab-IEU/AlterLab-Academic-Skills) [![Star](https://img.shields.io/github/stars/AlterLab-IEU/AlterLab-Academic-Skills?style=flat&logo=github&label=Star)](https://github.com/AlterLab-IEU/AlterLab-Academic-Skills/stargazers) | 임의/다중 출처 | Skill 모음 | Evaluated academic agent skills including visualization, reports, writing, and research pipelines. |
| [SenseNova-Skills](https://github.com/OpenSenseNova/SenseNova-Skills) [![Star](https://img.shields.io/github/stars/OpenSenseNova/SenseNova-Skills?style=flat&logo=github&label=Star)](https://github.com/OpenSenseNova/SenseNova-Skills/stargazers) | 임의/다중 출처 | Skill 모음 | Office and productivity skills covering image generation, visualization, slide decks, Excel analysis, and deep research. |
| [TransformingScienceLLMs](https://github.com/NL2G/TransformingScienceLLMs) [![Star](https://img.shields.io/github/stars/NL2G/TransformingScienceLLMs?style=flat&logo=github&label=Star)](https://github.com/NL2G/TransformingScienceLLMs/stargazers) | 임의/다중 출처 | Awesome/인덱스 | Collection of papers, AI models, and tools for LLM-assisted scientific work. |

## 데이터

The structured catalog lives in [data/catalog.yml](data/catalog.yml). It includes information-source tags, tool-form tags, output-artifact tags, dependency tags, category, GitHub star snapshots, license, update date, and short notes.

The research cache lives in [data/tool-research.yml](data/tool-research.yml). It stores official examples, docs, demos, templates, papers, videos, effect images/GIFs, and other discovery links; it is not rendered directly into the README.

The search trail and query strategy live in [docs/search-log.md](docs/search-log.md).

## 기여

Contributions are welcome. For a new entry, please include:

- 프로젝트 name and URL.
- 정보 출처, for example `논문/연구`, `웹/검색`, `뉴스/인텔리전스`, `PDF/문서`, `코드베이스`, or `데이터/표`.
- 도구 형태, for example `제품/SaaS`, `오픈소스 앱/프레임워크`, `Agent Skill`, `MCP Server`, `API/SDK/라이브러리`, or `Bot/어시스턴트`.
- 출력 결과물, for example `PPT/덱`, `긴 보고서`, `웹/인터랙티브 페이지`, `마인드맵/지식 지도`, or `차트/대시보드`.
- Dependency types from the table above, for example `모델 API`, `렌더링/내보내기`, or `템플릿/자산`.
- One sentence explaining why the project belongs here.

Prefer tools that produce artifacts people can inspect, edit, cite, present, or use to understand a complex system.
