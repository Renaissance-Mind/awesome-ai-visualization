// Reading copy for selected entries. Facts come from the canonical catalog and
// linked official sources; all other entries retain their original descriptions.
export const editorial: Record<string, { summary: string; detail: string; topic?: string }> = {
  "Open Design": {
    summary: "从文字到网页、演示与仪表盘。",
    detail: "在本地设计工作台中生成、预览并继续修改作品。",
    topic: "create",
  },
  "baoyu-design": {
    summary: "让现有的编码助手参与界面设计。",
    detail: "生成可交互的 HTML 页面，再通过预览逐步调整。",
    topic: "create",
  },
  PaperBanana: {
    summary: "把研究方法与图注转成科学图解。",
    detail: "参考示例组织结构，生成方法图与统计图。",
  },
  Graphify: {
    summary: "把代码和文档连成可探索的知识图谱。",
    detail: "通过关系与结构理解复杂项目，生成交互页面和报告。",
  },
  "Data Formulator": {
    summary: "用自然语言探索数据与可视化。",
    detail: "围绕数据表迭代图表，让分析过程更直观。",
  },
  Presenton: {
    summary: "从文字、文档与网页资料生成演示稿。",
    detail: "提供开源应用与 API，便于接入演示制作流程。",
  },
  "Open CoDesign": {
    summary: "从提示生成页面与演示，在本地工作台中继续调整。",
    detail: "支持自行配置模型服务，并导出 HTML、PDF、PPTX 等文件。",
    topic: "create",
  },
  "Huashu Design": {
    summary: "通过设计 Skill 探索视觉方向、制作页面原型与演示。",
    detail: "围绕 HTML 组织设计、评审与动画导出流程。",
    topic: "create",
  },
  "scroll-craft": {
    summary: "围绕滚动节奏、画面衔接与素材组织制作网页。",
    detail: "提供设计流程、滚动引擎和浏览器验证工具。",
    topic: "create",
  },
  Paper2Any: {
    summary: "把论文、文字与研究主题转成多种视觉产物。",
    detail: "覆盖科研图解、技术路线、演示文稿、海报与多模态内容。",
  },
  Gamma: {
    summary: "从文字和资料生成演示、文档与网页。",
    detail: "在浏览器中组织内容，并导出 PPT 或 PDF。",
  },
  "Napkin AI": {
    summary: "把文字转成用于沟通与讲解的视觉图形。",
    detail: "支持以 PPT、PNG、SVG 和 PDF 等格式导出。",
  },
  Docling: {
    summary: "把文档转成结构化、便于继续处理的内容。",
    detail: "为资料整理、检索和生成式 AI 工作流提供文档解析能力。",
  },
  Marker: {
    summary: "将 PDF 转成 Markdown 和 JSON。",
    detail: "把文档内容交给后续的阅读、分析与可视化流程。",
  },
  HyperFrames: {
    summary: "把 HTML、CSS 与动画制作流程转成视频。",
    detail: "通过 Agent Skill、命令行预览与渲染工具生成 MP4。",
  },
};

export const featuredNames = ["Open Design", "baoyu-design", "PaperBanana", "Graphify", "Data Formulator", "Presenton"];

// Original, unmodified official assets are stored locally for stable first-page
// previews. Cropping happens in CSS; the detail gallery retains the full source.
export const localPreviews: Record<string, { path: string; source: string; title: string; crop?: string }> = {
  "Open Design": {
    path: "/catalog-previews/open-design.png",
    source: "https://raw.githubusercontent.com/nexu-io/open-design/HEAD/docs/screenshots/skills/deck-swiss-international.png",
    title: "Open Design 官方示例：Swiss International 演示",
    crop: "slide",
  },
  "baoyu-design": {
    path: "/catalog-previews/baoyu-design.webp",
    source: "https://raw.githubusercontent.com/JimLiu/baoyu-design/HEAD/assets/screenshots/codex-reader-mac-app.webp",
    title: "baoyu-design 官方示例：Reader 页面",
    crop: "reader",
  },
  PaperBanana: {
    path: "/catalog-previews/paperbanana.jpg",
    source: "https://raw.githubusercontent.com/dwzhu-pku/PaperBanana/HEAD/assets/teaser_figure.jpg",
    title: "PaperBanana 官方示例：方法图与统计图",
  },
  Graphify: {
    path: "/catalog-previews/graphify.png",
    source: "https://raw.githubusercontent.com/Graphify-Labs/graphify/v8/docs/graph-hero.png",
    title: "Graphify 官方示例：FastAPI 代码库知识图谱",
  },
};
