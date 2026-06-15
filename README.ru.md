![AI visualization banner](assets/banner.png)

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![Catalog](https://img.shields.io/badge/catalog-128_items-blue)](data/catalog.yml)
[![Last researched](https://img.shields.io/badge/last_researched-2026--06--15-brightgreen)](docs/search-log.md)

[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [Español](README.es.md) | [Türkçe](README.tr.md) | Русский

> [!NOTE]
> Этот проект автоматически обновляется при помощи RenaissanceMind Agent. Метаданные инструментов, звезды, лицензии и условия могут меняться; перед использованием записи проверьте официальный сайт или репозиторий.

Кураторский список AI- и agent-инструментов, которые превращают статьи, новости, веб-страницы, документы, кодовые базы, данные и коллекции знаний в визуальные или презентационные материалы для людей.

Каталог размечен по **источнику информации**, **форме инструмента**, **типу результата** и **типу зависимости**. Слайды — лишь один формат вывода; многие инструменты также создают отчеты, веб-страницы, диаграммы, mind map, дашборды или карты кода.

Некоторые названия проектов, официальные термины и краткие описания оставлены на английском для поиска и сопоставления с исходниками.

## ✨ Рекомендуемое использование

| Читатель | Рекомендация |
| --- | --- |
| 🤖 Для Agent | Установите/включите skill [`ai-visualization-advisor`](skills/ai-visualization-advisor/SKILL.md), чтобы агент рекомендовал формы вывода и инструменты с учетом источников, аудитории и ограничений пользователя. Сначала он должен читать [`data/catalog.yml`](data/catalog.yml) и [`data/tool-research.yml`](data/tool-research.yml). |
| 👤 Для человека | Изучите этот README или используйте [awesome-ai-visualization.renaissancemind.ai](https://awesome-ai-visualization.renaissancemind.ai/) (рекомендуется), чтобы просматривать и фильтровать инструменты. |

## Содержание

- [Основные инструменты](#основные-инструменты)
- [Вспомогательные инструменты и пред/постобработка](#вспомогательные-инструменты-и-предпостобработка)
- [Как выбрать инструмент](#как-выбрать-инструмент)
- [Найти больше инструментов](#найти-больше-инструментов)
- [Данные](#данные)
- [Как внести вклад](#как-внести-вклад)

## Основные инструменты

В этом разделе собраны инструменты, которые напрямую превращают источники информации в материалы, которые можно читать, проверять, презентовать или распространять. Каждая строка размечена основными тегами.

### Статьи, исследования и научный поиск

Инструменты, которые начинают со статей, исследовательских тем или научных корпусов и создают объяснения, отчеты, карты, схемы или коммуникационные материалы.

| Проект | Источник информации | Форма инструмента | Результат | Зависимости |
| --- | --- | --- | --- | --- |
| [Paper2Any](https://github.com/OpenDCAI/Paper2Any) [![Star](https://img.shields.io/github/stars/OpenDCAI/Paper2Any?style=flat&logo=github&label=Star)](https://github.com/OpenDCAI/Paper2Any/stargazers) | Статьи/исследования | Open-source приложение/фреймворк | Графический абстракт/инфографика / PPT/deck / Веб/интерактивная страница | Локальный runtime / Model API / Парсинг документов/OCR / Рендеринг/экспорт / GPU/ускоритель / Шаблоны/assets |
| [paper-2-web](https://github.com/davila7/claude-code-templates/blob/main/cli-tool/components/skills/scientific/paper-2-web/SKILL.md?plain=1) [![Star](https://img.shields.io/github/stars/davila7/claude-code-templates?style=flat&logo=github&label=Star)](https://github.com/davila7/claude-code-templates/stargazers) | Статьи/исследования | Agent skill | Графический абстракт/инфографика / PPT/deck / Веб/интерактивная страница | Agent host / Model API / Локальный runtime / Рендеринг/экспорт / Шаблоны/assets |
| [paper-to-course](https://github.com/ZeroxZhang/paper-to-course) [![Star](https://img.shields.io/github/stars/ZeroxZhang/paper-to-course?style=flat&logo=github&label=Star)](https://github.com/ZeroxZhang/paper-to-course/stargazers) | Статьи/исследования | Agent skill | Веб/интерактивная страница / Q&A/учебные материалы | Agent host / Model API / Локальный runtime / Рендеринг/экспорт |
| [Auto-Research-In-Sleep](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep) [![Star](https://img.shields.io/github/stars/wanshuiyin/Auto-claude-code-research-in-sleep?style=flat&logo=github&label=Star)](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep/stargazers) | Статьи/исследования | Коллекция skill | Длинный отчет / Таблица доказательств | Agent host / Model API / Локальный runtime / Системные инструменты / Рендеринг/экспорт / Шаблоны/assets |
| [scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) [![Star](https://img.shields.io/github/stars/K-Dense-AI/scientific-agent-skills?style=flat&logo=github&label=Star)](https://github.com/K-Dense-AI/scientific-agent-skills/stargazers) | Статьи/исследования | Коллекция skill | Графический абстракт/инфографика / PPT/deck / Веб/интерактивная страница | Agent host / Model API / Внешний поиск/данные / Рендеринг/экспорт |
| [claude-scientific-writer](https://github.com/K-Dense-AI/claude-scientific-writer) [![Star](https://img.shields.io/github/stars/K-Dense-AI/claude-scientific-writer?style=flat&logo=github&label=Star)](https://github.com/K-Dense-AI/claude-scientific-writer/stargazers) | Статьи/исследования | Agent skill | Длинный отчет / Таблица доказательств | Agent host / Model API / Внешний поиск/данные / Шаблоны/assets |
| [SciGA](https://github.com/IyatomiLab/SciGA) [![Star](https://img.shields.io/github/stars/IyatomiLab/SciGA?style=flat&logo=github&label=Star)](https://github.com/IyatomiLab/SciGA/stargazers) | Статьи/исследования | Датасет/бенчмарк | Графический абстракт/инфографика / PPT/deck / Веб/интерактивная страница | Локальный runtime / Парсинг документов/OCR / GPU/ускоритель |
| [Paper2Slides](https://github.com/pchi123/Paper2Slides) [![Star](https://img.shields.io/github/stars/pchi123/Paper2Slides?style=flat&logo=github&label=Star)](https://github.com/pchi123/Paper2Slides/stargazers) | Papers/research | Open-source app/framework | Graphical abstract/infographic / PPT/deck | Local runtime / Document parsing/OCR / Rendering/export / Templates/assets |
| [AI-Researcher](https://github.com/HKUDS/AI-Researcher) [![Star](https://img.shields.io/github/stars/HKUDS/AI-Researcher?style=flat&logo=github&label=Star)](https://github.com/HKUDS/AI-Researcher/stargazers) | Статьи/исследования | Исследовательский прототип | Длинный отчет / Таблица доказательств | Локальный runtime / Model API / Внешний поиск/данные / GPU/ускоритель |
| [Elicit](https://elicit.com/) | Статьи/исследования | Продукт/SaaS | Брифинг/отчет / Таблица доказательств | Браузер/аккаунт / Внешний поиск/данные |
| [Paperguide](https://paperguide.ai/) | Статьи/исследования | Продукт/SaaS | Брифинг/отчет / Таблица доказательств | Браузер/аккаунт / Внешний поиск/данные |
| [SciSpace Infographic Maker](https://scispace.com/agents/infographic-maker-hbcwetac) | Статьи/исследования | Продукт/SaaS | Графический абстракт/инфографика / PPT/deck / Веб/интерактивная страница | Браузер/аккаунт / Шаблоны/assets |
| [Grabstract](https://grabstract.io/graphical-abstracts) | Статьи/исследования | Продукт/SaaS | Графический абстракт/инфографика / PPT/deck / Веб/интерактивная страница | Браузер/аккаунт / Шаблоны/assets |
| [Open Knowledge Maps](https://openknowledgemaps.org/) | Статьи/исследования / Граф цитирований | Продукт/SaaS | Карта литературы/знаний | Браузер/аккаунт / Внешний поиск/данные |
| [Connected Papers](https://www.connectedpapers.com/) | Статьи/исследования / Граф цитирований | Продукт/SaaS | Карта литературы/знаний | Браузер/аккаунт / Внешний поиск/данные |
| [ResearchRabbit](https://www.researchrabbit.ai/) | Статьи/исследования / Граф цитирований | Продукт/SaaS | Карта литературы/знаний | Браузер/аккаунт / Внешний поиск/данные |
| [Litmaps](https://www.litmaps.com/) | Статьи/исследования / Граф цитирований | Продукт/SaaS | Карта литературы/знаний | Браузер/аккаунт / Внешний поиск/данные |
| [Consensus](https://consensus.app/) | Статьи/исследования | Продукт/SaaS | Брифинг/отчет / Таблица доказательств | Браузер/аккаунт / Внешний поиск/данные |

### Веб, новости и разведка

Инструменты, которые используют веб-страницы, результаты поиска, новостные потоки, рыночные данные или threat intelligence и создают обоснованные отчеты, дашборды или карты.

| Проект | Источник информации | Форма инструмента | Результат | Зависимости |
| --- | --- | --- | --- | --- |
| [GPT Researcher](https://github.com/assafelovic/gpt-researcher) [![Star](https://img.shields.io/github/stars/assafelovic/gpt-researcher?style=flat&logo=github&label=Star)](https://github.com/assafelovic/gpt-researcher/stargazers) | Веб/поиск / Новости/разведка | Open-source приложение/фреймворк | Длинный отчет / Ответ с цитатами | Локальный runtime / Model API / Внешний поиск/данные / Хранилище/индекс |
| [STORM](https://github.com/stanford-oval/storm) [![Star](https://img.shields.io/github/stars/stanford-oval/storm?style=flat&logo=github&label=Star)](https://github.com/stanford-oval/storm/stargazers) | Веб/поиск / Новости/разведка | Open-source приложение/фреймворк | Длинный отчет / Ответ с цитатами | Локальный runtime / Model API / Внешний поиск/данные / Хранилище/индекс |
| [Scira](https://github.com/zaidmukaddam/scira) [![Star](https://img.shields.io/github/stars/zaidmukaddam/scira?style=flat&logo=github&label=Star)](https://github.com/zaidmukaddam/scira/stargazers) | Веб/поиск / Новости/разведка | Open-source приложение/фреймворк / Бот/ассистент | Длинный отчет / Ответ с цитатами | Локальный runtime / Model API / Внешний поиск/данные / Хранилище/индекс |
| [Vane](https://github.com/ItzCrazyKns/Vane) [![Star](https://img.shields.io/github/stars/ItzCrazyKns/Vane?style=flat&logo=github&label=Star)](https://github.com/ItzCrazyKns/Vane/stargazers) | Веб/поиск / Новости/разведка | Open-source приложение/фреймворк / Бот/ассистент | Длинный отчет / Ответ с цитатами | Локальный runtime / Model API / Внешний поиск/данные / Хранилище/индекс |
| [FinRobot](https://github.com/AI4Finance-Foundation/FinRobot) [![Star](https://img.shields.io/github/stars/AI4Finance-Foundation/FinRobot?style=flat&logo=github&label=Star)](https://github.com/AI4Finance-Foundation/FinRobot/stargazers) | Новости/разведка / Данные/таблицы / Веб/поиск | Open-source приложение/фреймворк | Длинный отчет / График/дашборд | Локальный runtime / Model API / Внешний поиск/данные / Рендеринг/экспорт |
| [Market-Intelligence-Agent](https://github.com/vikas-kashyap97/Market-Intelligence-Agent) [![Star](https://img.shields.io/github/stars/vikas-kashyap97/Market-Intelligence-Agent?style=flat&logo=github&label=Star)](https://github.com/vikas-kashyap97/Market-Intelligence-Agent/stargazers) | Новости/разведка / Данные/таблицы / Веб/поиск | Open-source приложение/фреймворк | График/дашборд / Брифинг/отчет | Локальный runtime / Model API / Внешний поиск/данные / Рендеринг/экспорт / Хранилище/индекс |
| [World Monitor](https://github.com/FutureSpeakAI/agent-fridays-global-intelligence-monitor) [![Star](https://img.shields.io/github/stars/FutureSpeakAI/agent-fridays-global-intelligence-monitor?style=flat&logo=github&label=Star)](https://github.com/FutureSpeakAI/agent-fridays-global-intelligence-monitor/stargazers) | Новости/разведка / Веб/поиск | Open-source приложение/фреймворк | График/дашборд / Брифинг/отчет | Локальный runtime / Model API / Внешний поиск/данные / Рендеринг/экспорт / Хранилище/индекс |

### Документы, PDF и базы знаний

Инструменты, которые используют PDF, офисные файлы, веб-страницы, личные документы или командные базы знаний и создают брифинги, Q&A, учебные материалы или карты знаний.

| Проект | Источник информации | Форма инструмента | Результат | Зависимости |
| --- | --- | --- | --- | --- |
| [notex](https://github.com/smallnest/notex) [![Star](https://img.shields.io/github/stars/smallnest/notex?style=flat&logo=github&label=Star)](https://github.com/smallnest/notex/stargazers) | PDF/документы / Веб/поиск / База знаний | Open-source приложение/фреймворк | Брифинг/отчет / Mind map/карта знаний / Q&A/учебные материалы | Локальный runtime / Model API / Парсинг документов/OCR / Рендеринг/экспорт / Хранилище/индекс |
| [Open Notebook](https://github.com/lfnovo/open-notebook) [![Star](https://img.shields.io/github/stars/lfnovo/open-notebook?style=flat&logo=github&label=Star)](https://github.com/lfnovo/open-notebook/stargazers) | PDF/документы / Веб/поиск / База знаний | Open-source приложение/фреймворк | Брифинг/отчет / Mind map/карта знаний / Q&A/учебные материалы | Локальный runtime / Model API / Парсинг документов/OCR / Хранилище/индекс |
| [SurfSense](https://github.com/MODSetter/SurfSense) [![Star](https://img.shields.io/github/stars/MODSetter/SurfSense?style=flat&logo=github&label=Star)](https://github.com/MODSetter/SurfSense/stargazers) | PDF/документы / Веб/поиск / База знаний | Open-source приложение/фреймворк | Брифинг/отчет / Mind map/карта знаний / Q&A/учебные материалы | Локальный runtime / Model API / Внешний поиск/данные / Хранилище/индекс |
| [NotebookLM](https://notebooklm.google/) | PDF/документы / Веб/поиск / База знаний | Продукт/SaaS / Бот/ассистент | Брифинг/отчет / Mind map/карта знаний / Q&A/учебные материалы | Браузер/аккаунт |

### Кодовые базы и программные системы

Инструменты, которые превращают репозитории, локальный код, зависимости или diff в архитектурные диаграммы, repo wiki, карты кода или графы знаний.

| Проект | Источник информации | Форма инструмента | Результат | Зависимости |
| --- | --- | --- | --- | --- |
| [GitDiagram](https://github.com/ahmedkhaleel2004/gitdiagram) [![Star](https://img.shields.io/github/stars/ahmedkhaleel2004/gitdiagram?style=flat&logo=github&label=Star)](https://github.com/ahmedkhaleel2004/gitdiagram/stargazers) | Кодовая база | Open-source приложение/фреймворк | Карта кода/repo wiki / Архитектура/flow diagram | Браузер/аккаунт / Model API / Анализ кода |
| [CodeBoarding](https://github.com/Codeboarding/CodeBoarding) [![Star](https://img.shields.io/github/stars/Codeboarding/CodeBoarding?style=flat&logo=github&label=Star)](https://github.com/Codeboarding/CodeBoarding/stargazers) | Кодовая база | Open-source приложение/фреймворк | Карта кода/repo wiki / Архитектура/flow diagram | Локальный runtime / Model API / Анализ кода / Рендеринг/экспорт / Хранилище/индекс |
| [Understand-Anything](https://github.com/Egonex-AI/Understand-Anything) [![Star](https://img.shields.io/github/stars/Egonex-AI/Understand-Anything?style=flat&logo=github&label=Star)](https://github.com/Egonex-AI/Understand-Anything/stargazers) | Кодовая база | Agent skill | Карта кода/repo wiki / Архитектура/flow diagram | Agent host / Локальный runtime / Model API / Анализ кода / Хранилище/индекс |
| [DeepWiki Open](https://github.com/AsyncFuncAI/deepwiki-open) [![Star](https://img.shields.io/github/stars/AsyncFuncAI/deepwiki-open?style=flat&logo=github&label=Star)](https://github.com/AsyncFuncAI/deepwiki-open/stargazers) | Кодовая база | Open-source приложение/фреймворк | Карта кода/repo wiki / Архитектура/flow diagram | Локальный runtime / Model API / Анализ кода / Рендеринг/экспорт |
| [PocketFlow Tutorial Кодовая база Knowledge](https://github.com/The-Pocket/PocketFlow-Tutorial-Кодовая база-Knowledge) [![Star](https://img.shields.io/github/stars/The-Pocket/PocketFlow-Tutorial-Кодовая база-Knowledge?style=flat&logo=github&label=Star)](https://github.com/The-Pocket/PocketFlow-Tutorial-Кодовая база-Knowledge/stargazers) | Кодовая база | Open-source приложение/фреймворк | Карта кода/repo wiki / Архитектура/flow diagram | Локальный runtime / Model API / Анализ кода / Рендеринг/экспорт |
| [GitVizz](https://github.com/adithya-s-k/GitVizz) [![Star](https://img.shields.io/github/stars/adithya-s-k/GitVizz?style=flat&logo=github&label=Star)](https://github.com/adithya-s-k/GitVizz/stargazers) | Кодовая база | Open-source приложение/фреймворк | Карта кода/repo wiki / Архитектура/flow diagram | Браузер/аккаунт / Model API / Анализ кода / Рендеринг/экспорт |
| [codeflow](https://github.com/braedonsaunders/codeflow) [![Star](https://img.shields.io/github/stars/braedonsaunders/codeflow?style=flat&logo=github&label=Star)](https://github.com/braedonsaunders/codeflow/stargazers) | Кодовая база | Open-source приложение/фреймворк | Карта кода/repo wiki / Архитектура/flow diagram | Браузер/аккаунт / Model API / Анализ кода / Рендеринг/экспорт |
| [oh-my-mermaid](https://github.com/oh-my-mermaid/oh-my-mermaid) [![Star](https://img.shields.io/github/stars/oh-my-mermaid/oh-my-mermaid?style=flat&logo=github&label=Star)](https://github.com/oh-my-mermaid/oh-my-mermaid/stargazers) | Кодовая база | Agent skill | Карта кода/repo wiki / Архитектура/flow diagram | Agent host / Model API / Анализ кода / Рендеринг/экспорт |
| [codag-visualizer](https://github.com/codag-megalith/codag-visualizer) [![Star](https://img.shields.io/github/stars/codag-megalith/codag-visualizer?style=flat&logo=github&label=Star)](https://github.com/codag-megalith/codag-visualizer/stargazers) | Кодовая база | Open-source приложение/фреймворк | Карта кода/repo wiki / Архитектура/flow diagram | Локальный runtime / Анализ кода / Рендеринг/экспорт |
| [codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp) [![Star](https://img.shields.io/github/stars/DeusData/codebase-memory-mcp?style=flat&logo=github&label=Star)](https://github.com/DeusData/codebase-memory-mcp/stargazers) | Кодовая база | MCP server | Карта кода/repo wiki / Архитектура/flow diagram | MCP client / Локальный runtime / Анализ кода / Хранилище/индекс |
| [CodeAtlas](https://github.com/lucyb0207/CodeAtlas) [![Star](https://img.shields.io/github/stars/lucyb0207/CodeAtlas?style=flat&logo=github&label=Star)](https://github.com/lucyb0207/CodeAtlas/stargazers) | Кодовая база | Open-source приложение/фреймворк | Карта кода/repo wiki / Архитектура/flow diagram | Локальный runtime / Анализ кода / Рендеринг/экспорт |
| [devlensOSS](https://github.com/devlensio/devlensOSS) [![Star](https://img.shields.io/github/stars/devlensio/devlensOSS?style=flat&logo=github&label=Star)](https://github.com/devlensio/devlensOSS/stargazers) | Кодовая база | Open-source приложение/фреймворк | Карта кода/repo wiki / Архитектура/flow diagram | Локальный runtime / Анализ кода / Рендеринг/экспорт |
| [Visual-Explainer](https://github.com/jircik/Visual-Explainer) [![Star](https://img.shields.io/github/stars/jircik/Visual-Explainer?style=flat&logo=github&label=Star)](https://github.com/jircik/Visual-Explainer/stargazers) | Кодовая база | Agent skill | Карта кода/repo wiki / Архитектура/flow diagram | Agent host / Model API / Анализ кода / Рендеринг/экспорт |
| [codemap-skill](https://github.com/Asixa/codemap-skill) [![Star](https://img.shields.io/github/stars/Asixa/codemap-skill?style=flat&logo=github&label=Star)](https://github.com/Asixa/codemap-skill/stargazers) | Кодовая база | Agent skill | Карта кода/repo wiki / Архитектура/flow diagram | Agent host / Model API / Анализ кода |
| [DeepWiki](https://docs.devin.ai/work-with-devin/deepwiki) | Кодовая база | Продукт/SaaS | Карта кода/repo wiki / Архитектура/flow diagram | Браузер/аккаунт / Анализ кода |
| [CodeSee](https://www.codesee.io/) | Кодовая база | Продукт/SaaS | Карта кода/repo wiki / Архитектура/flow diagram | Браузер/аккаунт / Анализ кода |

### Данные, таблицы и бизнес-метрики

Tools that turn CSVs, databases, metrics, or business data into charts, dashboards, or analytical reports.

| Проект | Источник информации | Форма инструмента | Результат | Зависимости |
| --- | --- | --- | --- | --- |
| [Data Formulator](https://github.com/microsoft/data-formulator) [![Star](https://img.shields.io/github/stars/microsoft/data-formulator?style=flat&logo=github&label=Star)](https://github.com/microsoft/data-formulator/stargazers) | Данные/таблицы / База данных | Open-source приложение/фреймворк | График/дашборд / Брифинг/отчет | Локальный runtime / Model API / Рендеринг/экспорт |
| [LIDA](https://github.com/microsoft/lida) [![Star](https://img.shields.io/github/stars/microsoft/lida?style=flat&logo=github&label=Star)](https://github.com/microsoft/lida/stargazers) | Данные/таблицы / База данных | Open-source приложение/фреймворк | График/дашборд / Брифинг/отчет | Локальный runtime / Model API / Рендеринг/экспорт |
| [MatPlotAgent](https://github.com/thunlp/MatPlotAgent) [![Star](https://img.shields.io/github/stars/thunlp/MatPlotAgent?style=flat&logo=github&label=Star)](https://github.com/thunlp/MatPlotAgent/stargazers) | Данные/таблицы / База данных | Исследовательский прототип | График/дашборд / Брифинг/отчет | Локальный runtime / Model API / Рендеринг/экспорт |
| [OpenVizAI](https://github.com/OpenVizAI/OpenVizAI) [![Star](https://img.shields.io/github/stars/OpenVizAI/OpenVizAI?style=flat&logo=github&label=Star)](https://github.com/OpenVizAI/OpenVizAI/stargazers) | Данные/таблицы / База данных | Open-source приложение/фреймворк | График/дашборд / Брифинг/отчет | Локальный runtime / Model API / Рендеринг/экспорт |
| [generative-dashboard-builder](https://github.com/KaranChandekar/generative-dashboard-builder) [![Star](https://img.shields.io/github/stars/KaranChandekar/generative-dashboard-builder?style=flat&logo=github&label=Star)](https://github.com/KaranChandekar/generative-dashboard-builder/stargazers) | Данные/таблицы / База данных | Open-source приложение/фреймворк | График/дашборд / Брифинг/отчет | Локальный runtime / Model API / Рендеринг/экспорт / Хранилище/индекс |
| [OpenBI](https://github.com/narender-rk10/OpenBI) [![Star](https://img.shields.io/github/stars/narender-rk10/OpenBI?style=flat&logo=github&label=Star)](https://github.com/narender-rk10/OpenBI/stargazers) | Данные/таблицы / База данных | Open-source приложение/фреймворк | График/дашборд / Брифинг/отчет | Локальный runtime / Model API / Внешний поиск/данные / Хранилище/индекс / Рендеринг/экспорт |

### Текст, идеи и визуализации для доски

Tools that turn prompts, drafts, whiteboard ideas, or semi-structured text into infographics, diagrams, whiteboards, or visual reports.

| Проект | Источник информации | Форма инструмента | Результат | Зависимости |
| --- | --- | --- | --- | --- |
| [q-skills](https://github.com/TyrealQ/q-skills) [![Star](https://img.shields.io/github/stars/TyrealQ/q-skills?style=flat&logo=github&label=Star)](https://github.com/TyrealQ/q-skills/stargazers) | Текст/идеи / PDF/документы / Данные/таблицы | Коллекция skill | Инфографика/визуальный отчет / Длинный отчет | Agent host / Model API / Локальный runtime / Рендеринг/экспорт |
| [Piktochart AI](https://piktochart.com/generative-ai/) | Текст/идеи / PDF/документы / Данные/таблицы | Продукт/SaaS | Инфографика/визуальный отчет / Длинный отчет | Браузер/аккаунт / Шаблоны/assets |
| [Venngage AI Infographic Generator](https://venngage.com/ai-tools/infographic-generator) | Текст/идеи / PDF/документы / Данные/таблицы | Продукт/SaaS | Инфографика/визуальный отчет / Длинный отчет | Браузер/аккаунт / Шаблоны/assets |
| [Venngage AI Report Generator](https://venngage.com/ai-tools/report-generator) | Текст/идеи / PDF/документы / Данные/таблицы | Продукт/SaaS | Инфографика/визуальный отчет / Длинный отчет | Браузер/аккаунт / Шаблоны/assets |
| [Jeda AI Infographic Generator](https://www.jeda.ai/ai-infographic-generator) | Текст/идеи / PDF/документы / Данные/таблицы | Продукт/SaaS | Инфографика/визуальный отчет / Длинный отчет | Браузер/аккаунт / Парсинг документов/OCR / Шаблоны/assets |
| [Infogram](https://infogram.com/) | Текст/идеи / PDF/документы / Данные/таблицы | Продукт/SaaS | Инфографика/визуальный отчет / Длинный отчет | Браузер/аккаунт / Внешний поиск/данные / Шаблоны/assets |
| [Napkin AI](https://www.napkin.ai/) | Текст/идеи / Код/технический текст | Продукт/SaaS | Архитектура/flow diagram / Доска/mind map | Браузер/аккаунт / Шаблоны/assets |
| [Eraser AI](https://www.eraser.io/ai) | Текст/идеи / Код/технический текст | Продукт/SaaS | Архитектура/flow diagram / Доска/mind map | Браузер/аккаунт / Шаблоны/assets |
| [Mermaid Chart AI](https://mermaid.ai/mermaid-ai) | Текст/идеи / Код/технический текст | Продукт/SaaS | Архитектура/flow diagram / Доска/mind map | Браузер/аккаунт / Рендеринг/экспорт |
| [Whimsical AI](https://whimsical.com/ai) | Текст/идеи / Код/технический текст | Продукт/SaaS | Архитектура/flow diagram / Доска/mind map | Браузер/аккаунт / Шаблоны/assets |
| [Lucid AI](https://www.lucidchart.com/pages/use-cases/diagram-with-AI) | Текст/идеи / Код/технический текст | Продукт/SaaS | Архитектура/flow diagram / Доска/mind map | Браузер/аккаунт / Шаблоны/assets |
| [Miro AI diagrams](https://help.miro.com/hc/en-us/articles/28782102127890-Miro-AI-with-Diagrams-and-mindmaps) | Текст/идеи / Код/технический текст | Продукт/SaaS | Архитектура/flow diagram / Доска/mind map | Браузер/аккаунт / Шаблоны/assets |
| [FigJam AI](https://help.figma.com/hc/en-us/articles/18706554628119-Make-boards-and-diagrams-with-FigJam-AI) | Текст/идеи / Код/технический текст | Продукт/SaaS | Архитектура/flow diagram / Доска/mind map | Браузер/аккаунт / Шаблоны/assets |

### Программируемое видео и motion-объяснения

Инструменты, которые превращают промпты, веб-страницы, репозитории, структурированные таймлайны или HTML от агента в озвученные или анимированные MP4/video-артефакты.

| Проект | Источник информации | Форма инструмента | Результат | Зависимости |
| --- | --- | --- | --- | --- |
| [html-video](https://github.com/nexu-io/html-video) [![Star](https://img.shields.io/github/stars/nexu-io/html-video?style=flat&logo=github&label=Star)](https://github.com/nexu-io/html-video/stargazers) | Текст/идеи / Веб/поиск / Кодовая база | Open-source приложение/фреймворк | Видео/аудио / Веб/интерактивная страница | Agent host / Локальный runtime / Model API / Рендеринг/экспорт / Системные инструменты / Шаблоны/assets |
| [NextFrame](https://github.com/ChaosRealmsAI/NextFrame) [![Star](https://img.shields.io/github/stars/ChaosRealmsAI/NextFrame?style=flat&logo=github&label=Star)](https://github.com/ChaosRealmsAI/NextFrame/stargazers) | DSL/код / Текст/идеи | Open-source приложение/фреймворк | Видео/аудио / Веб/интерактивная страница | Локальный runtime / Рендеринг/экспорт / Системные инструменты |
| [Helios](https://github.com/BintzGavin/helios) [![Star](https://img.shields.io/github/stars/BintzGavin/helios?style=flat&logo=github&label=Star)](https://github.com/BintzGavin/helios/stargazers) | DSL/код / Текст/идеи | API/SDK/библиотека / Agent Skill | Видео/аудио / Веб/интерактивная страница | Локальный runtime / Рендеринг/экспорт / Системные инструменты / Agent host |
| [OpenMontage](https://github.com/calesthio/OpenMontage) [![Star](https://img.shields.io/github/stars/calesthio/OpenMontage?style=flat&logo=github&label=Star)](https://github.com/calesthio/OpenMontage/stargazers) | Текст/идеи / Веб/поиск / Новости | Open-source приложение/фреймворк | Видео/аудио | Agent host / Локальный runtime / Model API / Внешний поиск/данные / Рендеринг/экспорт / Системные инструменты |
| [ralphy](https://github.com/alecs5am/ralphy) [![Star](https://img.shields.io/github/stars/alecs5am/ralphy?style=flat&logo=github&label=Star)](https://github.com/alecs5am/ralphy/stargazers) | Текст/идеи / Веб/поиск | Open-source приложение/фреймворк | Видео/аудио | Agent host / Локальный runtime / Model API / Рендеринг/экспорт / Системные инструменты / Хранилище/индекс |

### Презентации и многоисточниковый контент

Tools that turn text, documents, web pages, research material, or outlines into decks, or let agents generate/edit presentations.

| Проект | Источник информации | Форма инструмента | Результат | Зависимости |
| --- | --- | --- | --- | --- |
| [ppt-master](https://github.com/hugohe3/ppt-master) [![Star](https://img.shields.io/github/stars/hugohe3/ppt-master?style=flat&logo=github&label=Star)](https://github.com/hugohe3/ppt-master/stargazers) | Текст/идеи / PDF/документы / Веб/поиск | Open-source приложение/фреймворк | PPT/deck | Локальный runtime / Model API / Рендеринг/экспорт / Шаблоны/assets |
| [Presenton](https://github.com/presenton/presenton) [![Star](https://img.shields.io/github/stars/presenton/presenton?style=flat&logo=github&label=Star)](https://github.com/presenton/presenton/stargazers) | Текст/идеи / PDF/документы / Веб/поиск | Open-source приложение/фреймворк / API/SDK/библиотека | PPT/deck | Локальный runtime / Model API / Рендеринг/экспорт / MCP client / Шаблоны/assets |
| [PPTAgent](https://github.com/icip-cas/PPTAgent) [![Star](https://img.shields.io/github/stars/icip-cas/PPTAgent?style=flat&logo=github&label=Star)](https://github.com/icip-cas/PPTAgent/stargazers) | Текст/идеи / PDF/документы / Веб/поиск | Исследовательский прототип | PPT/deck | Локальный runtime / Model API / Рендеринг/экспорт / Шаблоны/assets |
| [presentation-ai](https://github.com/allweonedev/presentation-ai) [![Star](https://img.shields.io/github/stars/allweonedev/presentation-ai?style=flat&logo=github&label=Star)](https://github.com/allweonedev/presentation-ai/stargazers) | Текст/идеи / PDF/документы / Веб/поиск | Open-source приложение/фреймворк | PPT/deck | Локальный runtime / Model API / Рендеринг/экспорт / Шаблоны/assets |
| [slide-deck-ai](https://github.com/barun-saha/slide-deck-ai) [![Star](https://img.shields.io/github/stars/barun-saha/slide-deck-ai?style=flat&logo=github&label=Star)](https://github.com/barun-saha/slide-deck-ai/stargazers) | Текст/идеи / PDF/документы / Веб/поиск | Open-source приложение/фреймворк | PPT/deck | Локальный runtime / Model API / Рендеринг/экспорт / Шаблоны/assets |
| [odin-slides](https://github.com/leonid20000/odin-slides) [![Star](https://img.shields.io/github/stars/leonid20000/odin-slides?style=flat&logo=github&label=Star)](https://github.com/leonid20000/odin-slides/stargazers) | Текст/идеи / PDF/документы / Веб/поиск | Open-source приложение/фреймворк | PPT/deck | Локальный runtime / Model API / Парсинг документов/OCR / Рендеринг/экспорт / Системные инструменты |
| [ppt-agents](https://github.com/chenxingqiang/ppt-agents) [![Star](https://img.shields.io/github/stars/chenxingqiang/ppt-agents?style=flat&logo=github&label=Star)](https://github.com/chenxingqiang/ppt-agents/stargazers) | Текст/идеи / PDF/документы / Веб/поиск | Open-source приложение/фреймворк | PPT/deck | Agent host / Локальный runtime / Model API / Рендеринг/экспорт |
| [deckdown](https://github.com/adityachauhan0/deckdown) [![Star](https://img.shields.io/github/stars/adityachauhan0/deckdown?style=flat&logo=github&label=Star)](https://github.com/adityachauhan0/deckdown/stargazers) | Текст/идеи / PDF/документы / Веб/поиск | Open-source приложение/фреймворк | PPT/deck | Локальный runtime / Рендеринг/экспорт |
| [Frontend Slides](https://github.com/zarazhangrui/frontend-slides) [![Star](https://img.shields.io/github/stars/zarazhangrui/frontend-slides?style=flat&logo=github&label=Star)](https://github.com/zarazhangrui/frontend-slides/stargazers) | Text/ideas / PDF/documents | Agent Skill | PPT/deck / Web/interactive page | Agent host / Model API / Local runtime / Rendering/export |
| [Office-PowerPoint-MCP-Server](https://github.com/GongRzhe/Office-PowerPoint-MCP-Server) [![Star](https://img.shields.io/github/stars/GongRzhe/Office-PowerPoint-MCP-Server?style=flat&logo=github&label=Star)](https://github.com/GongRzhe/Office-PowerPoint-MCP-Server/stargazers) | Текст/идеи / PDF/документы / Веб/поиск | MCP server | PPT/deck | MCP client / Локальный runtime / Рендеринг/экспорт / Системные инструменты |
| [pptx-from-layouts-skill](https://github.com/tristan-mcinnis/pptx-from-layouts-skill) [![Star](https://img.shields.io/github/stars/tristan-mcinnis/pptx-from-layouts-skill?style=flat&logo=github&label=Star)](https://github.com/tristan-mcinnis/pptx-from-layouts-skill/stargazers) | Текст/идеи / PDF/документы / Веб/поиск | Agent skill | PPT/deck | Agent host / Локальный runtime / Рендеринг/экспорт / Шаблоны/assets |
| [hands-on-deck](https://github.com/EveryInc/hands-on-deck) [![Star](https://img.shields.io/github/stars/EveryInc/hands-on-deck?style=flat&logo=github&label=Star)](https://github.com/EveryInc/hands-on-deck/stargazers) | Текст/идеи / PDF/документы / Веб/поиск | Agent skill | PPT/deck | Agent host / Локальный runtime / Рендеринг/экспорт |
| [agent-slides](https://github.com/mpuig/agent-slides) [![Star](https://img.shields.io/github/stars/mpuig/agent-slides?style=flat&logo=github&label=Star)](https://github.com/mpuig/agent-slides/stargazers) | Текст/идеи / PDF/документы / Веб/поиск | Agent skill | PPT/deck | Agent host / Локальный runtime / Model API / Рендеринг/экспорт / Шаблоны/assets |
| [ultimate-ppt-master-skill](https://github.com/kdnsna/ultimate-ppt-master-skill) [![Star](https://img.shields.io/github/stars/kdnsna/ultimate-ppt-master-skill?style=flat&logo=github&label=Star)](https://github.com/kdnsna/ultimate-ppt-master-skill/stargazers) | Текст/идеи / PDF/документы / Веб/поиск | Agent skill | PPT/deck | Agent host / Локальный runtime / Model API / Рендеринг/экспорт / Шаблоны/assets |
| [codex-ppt-skill](https://github.com/ningzimu/codex-ppt-skill) [![Star](https://img.shields.io/github/stars/ningzimu/codex-ppt-skill?style=flat&logo=github&label=Star)](https://github.com/ningzimu/codex-ppt-skill/stargazers) | Текст/идеи / PDF/документы / Веб/поиск | Agent skill | PPT/deck | Agent host / Локальный runtime / Model API / Рендеринг/экспорт / Шаблоны/assets |
| [presentation-skills](https://github.com/pamelafox/presentation-skills) [![Star](https://img.shields.io/github/stars/pamelafox/presentation-skills?style=flat&logo=github&label=Star)](https://github.com/pamelafox/presentation-skills/stargazers) | Текст/идеи / PDF/документы / Веб/поиск | Коллекция skill | PPT/deck | Agent host / Локальный runtime / Рендеринг/экспорт |
| [anthropics/skills](https://github.com/anthropics/skills) [![Star](https://img.shields.io/github/stars/anthropics/skills?style=flat&logo=github&label=Star)](https://github.com/anthropics/skills/stargazers) | Текст/идеи / PDF/документы / Веб/поиск | Коллекция skill | PPT/deck | Agent host / Локальный runtime / Парсинг документов/OCR / Рендеринг/экспорт |
| [MiniMax-AI/skills](https://github.com/MiniMax-AI/skills) [![Star](https://img.shields.io/github/stars/MiniMax-AI/skills?style=flat&logo=github&label=Star)](https://github.com/MiniMax-AI/skills/stargazers) | Текст/идеи / PDF/документы / Веб/поиск | Коллекция skill | PPT/deck | Agent host / Локальный runtime / Model API / Рендеринг/экспорт |
| [Gamma](https://gamma.app/) | Текст/идеи / PDF/документы / Веб/поиск | Продукт/SaaS | PPT/deck | Браузер/аккаунт / Шаблоны/assets |
| [SlideSpeak](https://slidespeak.co/) | Текст/идеи / PDF/документы / Веб/поиск | Продукт/SaaS | PPT/deck | Браузер/аккаунт / Парсинг документов/OCR / Шаблоны/assets |
| [Canva AI Presentations](https://www.canva.com/create/ai-presentations/) | Текст/идеи / PDF/документы / Веб/поиск | Продукт/SaaS | PPT/deck | Браузер/аккаунт / Шаблоны/assets |
| [Presentations.AI](https://www.presentations.ai/) | Текст/идеи / PDF/документы / Веб/поиск | Продукт/SaaS | PPT/deck | Браузер/аккаунт / Парсинг документов/OCR / Шаблоны/assets |
| [Beautiful.ai](https://www.beautiful.ai/presentation-maker) | Текст/идеи / PDF/документы / Веб/поиск | Продукт/SaaS | PPT/deck | Браузер/аккаунт / Шаблоны/assets |
| [Decktopus](https://www.decktopus.com/) | Текст/идеи / PDF/документы / Веб/поиск | Продукт/SaaS | PPT/deck | Браузер/аккаунт / Шаблоны/assets |
| [PPT.AI](https://ppt.ai/) | Текст/идеи / PDF/документы / Веб/поиск | Продукт/SaaS | PPT/deck | Браузер/аккаунт / Парсинг документов/OCR / Шаблоны/assets |
| [Slidesgo AI Presentation Maker](https://slidesgo.com/ai/presentation-maker) | Текст/идеи / PDF/документы / Веб/поиск | Продукт/SaaS | PPT/deck | Браузер/аккаунт / Шаблоны/assets |
| [Microsoft Copilot in PowerPoint](https://powerpoint.cloud.microsoft/create/en/ai-presentation-maker/) | Текст/идеи / PDF/документы / Веб/поиск | Продукт/SaaS / Бот/ассистент | PPT/deck | Браузер/аккаунт / Системные инструменты / Шаблоны/assets |
| [Adobe Express AI Presentation Maker](https://www.adobe.com/express/create/ai/presentation) | Текст/идеи / PDF/документы / Веб/поиск | Продукт/SaaS | PPT/deck | Браузер/аккаунт / Шаблоны/assets |

## Вспомогательные инструменты и пред/постобработка

This section contains smaller, lower-level, or more specialized tools. They may not cover a full content production workflow by themselves, but they are often key components inside agent workflows.

### PDF, парсинг документов и структурированное извлечение

Инструменты предобработки, которые превращают PDF, статьи, Office-файлы или сканы в Markdown, JSON, layout, таблицы или OCR-результаты.

| Проект | Источник информации | Форма инструмента | Результат | Зависимости |
| --- | --- | --- | --- | --- |
| [MinerU](https://github.com/opendatalab/MinerU) [![Star](https://img.shields.io/github/stars/opendatalab/MinerU?style=flat&logo=github&label=Star)](https://github.com/opendatalab/MinerU/stargazers) | PDF/документы / Office-документы / Статьи/исследования | Open-source приложение/фреймворк | Структурированные данные/Markdown | Локальный runtime / Парсинг документов/OCR / GPU/ускоритель |
| [Docling](https://github.com/docling-project/docling) [![Star](https://img.shields.io/github/stars/docling-project/docling?style=flat&logo=github&label=Star)](https://github.com/docling-project/docling/stargazers) | PDF/документы / Office-документы / Статьи/исследования | Open-source приложение/фреймворк | Структурированные данные/Markdown | Локальный runtime / Парсинг документов/OCR |
| [MarkItDown](https://github.com/microsoft/markitdown) [![Star](https://img.shields.io/github/stars/microsoft/markitdown?style=flat&logo=github&label=Star)](https://github.com/microsoft/markitdown/stargazers) | PDF/документы / Office-документы / Веб/поисковые результаты | API/SDK/библиотека | Структурированные данные/Markdown | Локальный runtime / Парсинг документов/OCR / API модели |
| [Marker](https://github.com/datalab-to/marker) [![Star](https://img.shields.io/github/stars/datalab-to/marker?style=flat&logo=github&label=Star)](https://github.com/datalab-to/marker/stargazers) | PDF/документы / Office-документы / Статьи/исследования | Open-source приложение/фреймворк | Структурированные данные/Markdown | Локальный runtime / Парсинг документов/OCR / GPU/ускоритель |
| [Unstructured](https://github.com/Unstructured-IO/unstructured) [![Star](https://img.shields.io/github/stars/Unstructured-IO/unstructured?style=flat&logo=github&label=Star)](https://github.com/Unstructured-IO/unstructured/stargazers) | PDF/документы / Office-документы / Статьи/исследования | Open-source приложение/фреймворк | Структурированные данные/Markdown | Локальный runtime / Парсинг документов/OCR |
| [GROBID](https://github.com/grobidOrg/grobid) [![Star](https://img.shields.io/github/stars/grobidOrg/grobid?style=flat&logo=github&label=Star)](https://github.com/grobidOrg/grobid/stargazers) | PDF/документы / Office-документы / Статьи/исследования | Open-source приложение/фреймворк | Структурированные данные/Markdown | Локальный runtime / Системные инструменты / Парсинг документов/OCR |
| [PaperMage](https://github.com/allenai/papermage) [![Star](https://img.shields.io/github/stars/allenai/papermage?style=flat&logo=github&label=Star)](https://github.com/allenai/papermage/stargazers) | PDF/документы / Office-документы / Статьи/исследования | API/SDK/библиотека | Структурированные данные/Markdown | Локальный runtime / Парсинг документов/OCR |
| [s2orc-doc2json](https://github.com/allenai/s2orc-doc2json) [![Star](https://img.shields.io/github/stars/allenai/s2orc-doc2json?style=flat&logo=github&label=Star)](https://github.com/allenai/s2orc-doc2json/stargazers) | PDF/документы / Office-документы / Статьи/исследования | Open-source приложение/фреймворк | Структурированные данные/Markdown | Локальный runtime / Парсинг документов/OCR |

### Специализированные mind-map инструменты

Небольшие специализированные инструменты для превращения документов, веб-страниц, видео, threat intelligence или текста в mind map.

| Проект | Источник информации | Форма инструмента | Результат | Зависимости |
| --- | --- | --- | --- | --- |
| [TI-Mindmap-GPT](https://github.com/format81/TI-Mindmap-GPT) [![Star](https://img.shields.io/github/stars/format81/TI-Mindmap-GPT?style=flat&logo=github&label=Star)](https://github.com/format81/TI-Mindmap-GPT/stargazers) | Новости/разведка / Веб/поиск / PDF/документы | Open-source приложение/фреймворк | Mind map/карта знаний / Длинный отчет / Таблицы/timeline | Локальный runtime / Model API / Парсинг документов/OCR / Рендеринг/экспорт / Внешний поиск/данные |
| [mindmap-generator](https://github.com/Dicklesworthstone/mindmap-generator) [![Star](https://img.shields.io/github/stars/Dicklesworthstone/mindmap-generator?style=flat&logo=github&label=Star)](https://github.com/Dicklesworthstone/mindmap-generator/stargazers) | PDF/документы / Веб/поиск / База знаний | Open-source приложение/фреймворк | Mind map/карта знаний | Локальный runtime / Model API / Парсинг документов/OCR / Рендеринг/экспорт |
| [Mapify](https://mapify.so/) | PDF/документы / Веб/поиск / База знаний | Продукт/SaaS | Mind map/карта знаний | Браузер/аккаунт / Парсинг документов/OCR / Шаблоны/assets |

### Диаграммы, Mermaid и компоненты рендеринга

Инструменты постобработки и рендеринга, которые помогают агентам генерировать, проверять или экспортировать Mermaid, SVG, PNG, PDF и диаграммы.

| Проект | Источник информации | Форма инструмента | Результат | Зависимости |
| --- | --- | --- | --- | --- |
| [Mermaid](https://github.com/mermaid-js/mermaid) [![Star](https://img.shields.io/github/stars/mermaid-js/mermaid?style=flat&logo=github&label=Star)](https://github.com/mermaid-js/mermaid/stargazers) | DSL/код | API/SDK/библиотека | Диаграмма/Mermaid / SVG/PNG/PDF | Рендеринг/экспорт |
| [mermaid-js-ai-agent](https://github.com/disler/mermaid-js-ai-agent) [![Star](https://img.shields.io/github/stars/disler/mermaid-js-ai-agent?style=flat&logo=github&label=Star)](https://github.com/disler/mermaid-js-ai-agent/stargazers) | Текст/идеи / Код/технический текст | Open-source приложение/фреймворк | Диаграмма/Mermaid / SVG/PNG/PDF | Локальный runtime / Model API / Рендеринг/экспорт |
| [mermaid-skill](https://github.com/Agents365-ai/mermaid-skill) [![Star](https://img.shields.io/github/stars/Agents365-ai/mermaid-skill?style=flat&logo=github&label=Star)](https://github.com/Agents365-ai/mermaid-skill/stargazers) | Текст/идеи / Код/технический текст | Agent skill | Диаграмма/Mermaid / SVG/PNG/PDF | Agent host / Локальный runtime / Model API / Рендеринг/экспорт |
| [Pretty-mermaid-skills](https://github.com/imxv/Pretty-mermaid-skills) [![Star](https://img.shields.io/github/stars/imxv/Pretty-mermaid-skills?style=flat&logo=github&label=Star)](https://github.com/imxv/Pretty-mermaid-skills/stargazers) | Текст/идеи / Код/технический текст | Agent skill | Диаграмма/Mermaid / SVG/PNG/PDF | Agent host / Локальный runtime / Рендеринг/экспорт |
| [agent-toolkit mermaid diagrams](https://github.com/softaworks/agent-toolkit) [![Star](https://img.shields.io/github/stars/softaworks/agent-toolkit?style=flat&logo=github&label=Star)](https://github.com/softaworks/agent-toolkit/stargazers) | Текст/идеи / Код/технический текст | Коллекция skill | Диаграмма/Mermaid / SVG/PNG/PDF | Agent host / Model API / Рендеринг/экспорт |
| [beautiful-mermaid](https://github.com/lukilabs/beautiful-mermaid) [![Star](https://img.shields.io/github/stars/lukilabs/beautiful-mermaid?style=flat&logo=github&label=Star)](https://github.com/lukilabs/beautiful-mermaid/stargazers) | DSL/код | API/SDK/библиотека | Диаграмма/Mermaid / SVG/PNG/PDF | Локальный runtime / Рендеринг/экспорт |
| [LLMermaid](https://github.com/fladdict/llmermaid) [![Star](https://img.shields.io/github/stars/fladdict/llmermaid?style=flat&logo=github&label=Star)](https://github.com/fladdict/llmermaid/stargazers) | Текст/идеи / Код/технический текст | Исследовательский прототип | Диаграмма/Mermaid / SVG/PNG/PDF | Локальный runtime / Model API / Рендеринг/экспорт |

## Как выбрать инструмент

### Источник информации

| Источник информации | Значение |
| --- | --- |
| Статьи/исследования | Papers, arXiv links, academic PDFs, research topics, and experimental results. |
| PDF/документы | PDFs, long documents, manuals, reports, and exported documents. |
| Office-документы | Word, PowerPoint, Excel, and other office files. |
| Веб/поиск | Web pages, URLs, search results, extracted page text, and cited sources. |
| Новости/разведка | News streams, market intelligence, threat intelligence, and industry updates. |
| Кодовая база | GitHub repositories, local code, diffs, dependencies, and symbols. |
| Данные/таблицы | CSV, Excel, metrics, time series, and business data. |
| База данных | SQL/BI sources, business databases, vector stores, or external data APIs. |
| База знаний | Notion, Google Drive, Slack, meeting notes, and personal/team documents. |
| Текст/идеи | Prompts, outlines, drafts, whiteboard ideas, and notes. |
| Код/технический текст | Code snippets, API descriptions, and system-design text. |
| DSL/код | Mermaid, diagram DSLs, configuration, and executable drawing code. |
| Граф цитирований | Paper citation relations, related-paper networks, and literature graphs. |
| Любой/многоисточниковый | General tools that work across multiple source types. |

### Форма инструмента

| Форма инструмента | Значение |
| --- | --- |
| Продукт/SaaS | Hosted website or commercial product, usually browser/account based. |
| Open-source приложение/фреймворк | Runnable or deployable application/framework. |
| Agent skill | Workflow package for Claude Code, Codex, Cursor, Gemini CLI, or similar agents. |
| Коллекция skill | Repository or suite containing multiple agent skills. |
| MCP server | Model Context Protocol server exposing files, slides, code, or data capabilities to agents. |
| API/SDK/библиотека | Parser, renderer, generator, or data interface called by other tools. |
| Бот/ассистент | Chat/search assistant, browser extension, or collaboration assistant. |
| Исследовательский прототип/датасет | Paper, benchmark, dataset, or research code. |
| Awesome/индекс | Directory for discovering tools, papers, and skills. |

### Результат

| Результат | Значение |
| --- | --- |
| PPT/deck | PPTX, slides, decks, templates, and presentation masters. |
| Длинный отчет | Cited research reports, market reports, and analytical documents. |
| Брифинг/отчет | Summaries, briefings, study guides, and Q&A material. |
| Веб/интерактивная страница | HTML, interactive tutorials, explainers, and shareable pages. |
| Графический абстракт/инфографика | Graphical abstracts, infographics, posters, and scientific schematics. |
| Инфографика/визуальный отчет | Business infographics, visual reports, and branded summaries. |
| Архитектура/flow diagram | Mermaid, flowcharts, sequence diagrams, system diagrams, and whiteboards. |
| Доска/mind map | Whiteboards, freeform canvases, and divergent visual maps. |
| Mind map/карта знаний | Mind maps, concept maps, and knowledge networks. |
| Карта литературы/знаний | Literature maps, related-paper graphs, and research knowledge maps. |
| График/дашборд | Charts, BI dashboards, KPIs, and interactive data views. |
| Таблицы/timeline | Таблица доказательствs, IOC tables, event timelines, and comparison tables. |
| Карта кода/repo wiki | Repository maps, repo wikis, dependency graphs, and code knowledge graphs. |
| Диаграмма/Mermaid | Mermaid, diagrams-as-code, and verifiable diagram text. |
| SVG/PNG/PDF | Rendered images, vector graphics, or exported files. |
| Видео/аудио | Paper videos, narrated explainers, and audio briefings. |
| Структурированные данные/Markdown | Markdown, JSON, layout, tables, and OCR outputs for downstream generation. |
| Таблица доказательств | Paper screening tables, evidence matrices, and citation tables. |
| Ответ с цитатами | Source-grounded answers or search-result synthesis. |
| Q&A/учебные материалы | Notebook Q&A, quizzes, and study guides. |
| Индекс инструментов | Awesome lists, tool directories, and paper lists. |
| Отрендеренный график | Visual output from renderers or chart components. |

### Типы зависимостей

`Зависимости` describe what a tool needs to run. They are separate from the source, tool, and output tags: those tags answer “where does the information come from, what is the tool, and what does it produce”; dependency tags answer “what does it need”.

| Зависимость | Значение | Частые примеры |
| --- | --- | --- |
| Браузер/аккаунт | Browser and account based; usually no local installation. | Google account, Canva account, SaaS plan |
| Agent host | Needs an agent environment to execute a skill/workflow. | Claude Code, Codex, Cursor, Gemini CLI, OpenCode |
| Model API | Calls text, vision, or image model APIs. | OpenAI, Anthropic, Gemini, OpenRouter, Azure OpenAI, Replicate |
| Локальный runtime | Needs local runtimes and package managers. | Python, Node.js, Go, Rust, Java, Conda, uv, pnpm |
| Системные инструменты | Depends on local binaries or office software. | Docker, LibreOffice, Microsoft PowerPoint, Pandoc, LaTeX, Chrome |
| Парсинг документов/OCR | Needs PDF parsing, OCR, layout recovery, or document structure extraction. | MinerU, Docling, Marker, GROBID, Tesseract, layout models |
| Рендеринг/экспорт | Renders intermediate formats into SVG, PNG, PDF, PPTX, or web pages. | Mermaid, Kroki, Playwright, python-pptx, pptxgenjs, SVG renderer |
| Внешний поиск/данные | Needs web search, paper databases, citation networks, or data APIs. | arXiv, Semantic Scholar, OpenAlex, Google Scholar, web search |
| GPU/ускоритель | Local model inference, OCR, vision, or image generation may need acceleration. | CUDA, ROCm, Apple Metal/MPS, cloud GPU |
| MCP client | Needs a client that can connect to MCP servers. | Claude Desktop, Cursor, Codex, Cline, Continue |
| Анализ кода | Parses files, symbols, dependencies, and repository structure. | tree-sitter, language servers, ripgrep, ctags, Git |
| Хранилище/индекс | Persists state, vector indexes, or graphs. | SQLite, Postgres, Chroma, Qdrant, Neo4j, file index |
| Шаблоны/assets | Needs templates, brand assets, or design resources for high-quality output. | PPTX template, slide master, brand kit, icons, image assets |

Star badges are shown next to GitHub project names where available. Non-GitHub products do not show a star badge.

## Найти больше инструментов

Это awesome lists, списки статей, реестры skill и MCP-директории. Это не отдельные production-инструменты, но они полезны для расширения этого репозитория.

| Проект | Охват | Форма инструмента | Полезно для поиска |
| --- | --- | --- | --- |
| [awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) [![Star](https://img.shields.io/github/stars/VoltAgent/awesome-agent-skills?style=flat&logo=github&label=Star)](https://github.com/VoltAgent/awesome-agent-skills/stargazers) | Любой/многоисточниковый | Awesome/индекс | Large agent skill directory. |
| [awesome-llm-skills](https://github.com/Prat011/awesome-llm-skills) [![Star](https://img.shields.io/github/stars/Prat011/awesome-llm-skills?style=flat&logo=github&label=Star)](https://github.com/Prat011/awesome-llm-skills/stargazers) | Любой/многоисточниковый | Awesome/индекс | Cross-agent LLM skills list. |
| [Awesome-Powerpoint-AI-Agents](https://github.com/ishandutta2007/Awesome-Powerpoint-AI-Agents) [![Star](https://img.shields.io/github/stars/ishandutta2007/Awesome-Powerpoint-AI-Agents?style=flat&logo=github&label=Star)](https://github.com/ishandutta2007/Awesome-Powerpoint-AI-Agents/stargazers) | Любой/многоисточниковый | Awesome/индекс | Directly similar PowerPoint AI agents ecosystem list. |
| [awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) [![Star](https://img.shields.io/github/stars/punkpeye/awesome-mcp-servers?style=flat&logo=github&label=Star)](https://github.com/punkpeye/awesome-mcp-servers/stargazers) | Любой/многоисточниковый | Awesome/индекс | Large MCP server directory. |
| [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) [![Star](https://img.shields.io/github/stars/hesreallyhim/awesome-claude-code?style=flat&logo=github&label=Star)](https://github.com/hesreallyhim/awesome-claude-code/stargazers) | Любой/многоисточниковый | Awesome/индекс | Claude Code skill, hook, slash-command, app, and plugin index. |
| [awesome_ai_agents](https://github.com/jim-schwoebel/awesome_ai_agents) [![Star](https://img.shields.io/github/stars/jim-schwoebel/awesome_ai_agents?style=flat&logo=github&label=Star)](https://github.com/jim-schwoebel/awesome_ai_agents/stargazers) | Любой/многоисточниковый | Awesome/индекс | Broad AI agent resources. |
| [awesome-ai-tools](https://github.com/mahseema/awesome-ai-tools) [![Star](https://img.shields.io/github/stars/mahseema/awesome-ai-tools?style=flat&logo=github&label=Star)](https://github.com/mahseema/awesome-ai-tools/stargazers) | Любой/многоисточниковый | Awesome/индекс | Broad AI tools list. |
| [awesome-ai-auto-research](https://github.com/worldbench/awesome-ai-auto-research) [![Star](https://img.shields.io/github/stars/worldbench/awesome-ai-auto-research?style=flat&logo=github&label=Star)](https://github.com/worldbench/awesome-ai-auto-research/stargazers) | Любой/многоисточниковый | Awesome/индекс | AI auto-research landscape, including paper-to-slides, posters, videos, websites, and social outputs. |
| [LLM-Visualization-Paper-List](https://github.com/zengxingchen/LLM-Visualization-Paper-List) [![Star](https://img.shields.io/github/stars/zengxingchen/LLM-Visualization-Paper-List?style=flat&logo=github&label=Star)](https://github.com/zengxingchen/LLM-Visualization-Paper-List/stargazers) | Любой/многоисточниковый | Awesome/индекс | Paper list for visualization meets LLM. |
| [awesome-ai-for-science](https://github.com/ai-boost/awesome-ai-for-science) [![Star](https://img.shields.io/github/stars/ai-boost/awesome-ai-for-science?style=flat&logo=github&label=Star)](https://github.com/ai-boost/awesome-ai-for-science/stargazers) | Любой/многоисточниковый | Awesome/индекс | Broad AI-for-science tool, paper, dataset, and framework index. |
| [AlterLab-Academic-Skills](https://github.com/AlterLab-IEU/AlterLab-Academic-Skills) [![Star](https://img.shields.io/github/stars/AlterLab-IEU/AlterLab-Academic-Skills?style=flat&logo=github&label=Star)](https://github.com/AlterLab-IEU/AlterLab-Academic-Skills/stargazers) | Любой/многоисточниковый | Коллекция skill | Evaluated academic agent skills including visualization, reports, writing, and research pipelines. |
| [SenseNova-Skills](https://github.com/OpenSenseNova/SenseNova-Skills) [![Star](https://img.shields.io/github/stars/OpenSenseNova/SenseNova-Skills?style=flat&logo=github&label=Star)](https://github.com/OpenSenseNova/SenseNova-Skills/stargazers) | Любой/многоисточниковый | Коллекция skill | Office and productivity skills covering image generation, visualization, slide decks, Excel analysis, and deep research. |
| [TransformingScienceLLMs](https://github.com/NL2G/TransformingScienceLLMs) [![Star](https://img.shields.io/github/stars/NL2G/TransformingScienceLLMs?style=flat&logo=github&label=Star)](https://github.com/NL2G/TransformingScienceLLMs/stargazers) | Любой/многоисточниковый | Awesome/индекс | Collection of papers, AI models, and tools for LLM-assisted scientific work. |

## Данные

The structured catalog lives in [data/catalog.yml](data/catalog.yml). It includes information-source tags, tool-form tags, output-artifact tags, dependency tags, category, GitHub star snapshots, license, update date, and short notes.

The research cache lives in [data/tool-research.yml](data/tool-research.yml). It stores official examples, docs, demos, templates, papers, videos, effect images/GIFs, and other discovery links; it is not rendered directly into the README.

The search trail and query strategy live in [docs/search-log.md](docs/search-log.md).

## Как внести вклад

Contributions are welcome. For a new entry, please include:

- Проект name and URL.
- Источник информации, for example `Статьи/исследования`, `Веб/поиск`, `Новости/разведка`, `PDF/документы`, `Кодовая база`, or `Данные/таблицы`.
- Форма инструмента, for example `Продукт/SaaS`, `Open-source приложение/фреймворк`, `Agent skill`, `MCP server`, `API/SDK/библиотека`, or `Бот/ассистент`.
- Результат, for example `PPT/deck`, `Длинный отчет`, `Веб/интерактивная страница`, `Mind map/карта знаний`, or `График/дашборд`.
- Dependency types from the table above, for example `Model API`, `Рендеринг/экспорт`, or `Шаблоны/assets`.
- One sentence explaining why the project belongs here.

Prefer tools that produce artifacts people can inspect, edit, cite, present, or use to understand a complex system.
