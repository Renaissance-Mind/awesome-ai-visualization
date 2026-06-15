import {
  BarChart3,
  BookOpenText,
  Boxes,
  FileText,
  GitBranch,
  Globe2,
  Image as ImageIcon,
  LayoutDashboard,
  ListChecks,
  Map,
  Network,
  PanelTop,
  Presentation,
  Table2,
  Video,
  type LucideIcon,
} from "lucide-react";
import { labelFor } from "../lib/labels";
import type { CatalogEntry } from "../types";

type EffectModel = {
  title: string;
  Icon: LucideIcon;
  variant: string;
};

const effectModels: Record<string, EffectModel> = {
  "PPT/演示文稿": { title: "Slide deck", Icon: Presentation, variant: "deck" },
  "报告/长文档": { title: "Long report", Icon: BookOpenText, variant: "report" },
  "报告/简报": { title: "Briefing", Icon: FileText, variant: "briefing" },
  "网页/交互页面": { title: "Interactive page", Icon: Globe2, variant: "web" },
  "图形摘要/信息图": { title: "Graphical abstract", Icon: ImageIcon, variant: "abstract" },
  "信息图/视觉报告": { title: "Visual report", Icon: ImageIcon, variant: "infographic" },
  "架构图/流程图": { title: "Flow diagram", Icon: GitBranch, variant: "diagram" },
  "白板/思维导图": { title: "Whiteboard", Icon: Network, variant: "map" },
  "思维导图/知识地图": { title: "Knowledge map", Icon: Map, variant: "map" },
  "文献地图/知识地图": { title: "Literature map", Icon: Network, variant: "network" },
  "图表/仪表盘": { title: "Dashboard", Icon: LayoutDashboard, variant: "dashboard" },
  "表格/时间线": { title: "Timeline", Icon: Table2, variant: "timeline" },
  "代码地图/Repo Wiki": { title: "Repo wiki", Icon: Boxes, variant: "repo" },
  "图表/Mermaid": { title: "Mermaid", Icon: GitBranch, variant: "mermaid" },
  "SVG/PNG/PDF": { title: "Rendered export", Icon: PanelTop, variant: "export" },
  "视频/音频": { title: "Video / audio", Icon: Video, variant: "media" },
  "结构化数据/Markdown": { title: "Structured data", Icon: Table2, variant: "structured" },
  "证据表": { title: "Evidence table", Icon: ListChecks, variant: "evidence" },
  "引用答案": { title: "Cited answer", Icon: FileText, variant: "cited" },
  "问答/学习材料": { title: "Study material", Icon: ListChecks, variant: "study" },
  "工具索引": { title: "Tool index", Icon: Boxes, variant: "index" },
  "图表/渲染输出": { title: "Rendered chart", Icon: BarChart3, variant: "dashboard" },
};

const fallbackEffect: EffectModel = {
  title: "Visual artifact",
  Icon: PanelTop,
  variant: "generic",
};

const getEffectModel = (outputForm: string) => effectModels[outputForm] ?? fallbackEffect;

export function EffectStrip({ entry }: { entry: CatalogEntry }) {
  const outputForms = entry.outputForms.slice(0, 4);

  if (outputForms.length === 0) {
    return null;
  }

  return (
    <div className="effect-strip" aria-label={`${entry.name} output previews`}>
      {outputForms.map((outputForm) => {
        const model = getEffectModel(outputForm);

        return (
          <span className={`effect-mini effect-${model.variant}`} key={outputForm} title={labelFor(outputForm)}>
            <model.Icon size={13} />
            <i />
          </span>
        );
      })}
    </div>
  );
}

export function EffectPreviewGrid({ entry }: { entry: CatalogEntry }) {
  const outputForms = entry.outputForms.slice(0, 6);

  return (
    <div className="effect-showcase">
      <div className="effect-showcase-header">
        <span>Output previews</span>
        <strong>{outputForms.length}</strong>
      </div>
      <div className="effect-grid">
        {outputForms.map((outputForm) => {
          const model = getEffectModel(outputForm);

          return (
            <article className="effect-tile" key={outputForm}>
              <div className={`effect-visual effect-${model.variant}`}>
                <EffectVisual variant={model.variant} />
              </div>
              <div className="effect-caption">
                <model.Icon size={14} />
                <span>{model.title}</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function EffectVisual({ variant }: { variant: string }) {
  if (variant === "deck") {
    return (
      <>
        <span className="slide-title" />
        <span className="slide-chart" />
        <span className="slide-line" />
        <span className="slide-line short" />
      </>
    );
  }

  if (variant === "report" || variant === "briefing" || variant === "cited") {
    return (
      <>
        <span className="doc-title" />
        <span className="doc-line" />
        <span className="doc-line" />
        <span className="doc-line short" />
        <span className="doc-cite" />
      </>
    );
  }

  if (variant === "diagram" || variant === "mermaid" || variant === "map" || variant === "network") {
    return (
      <>
        <span className="node node-a" />
        <span className="node node-b" />
        <span className="node node-c" />
        <span className="node node-d" />
        <span className="edge edge-a" />
        <span className="edge edge-b" />
        <span className="edge edge-c" />
      </>
    );
  }

  if (variant === "dashboard") {
    return (
      <>
        <span className="bar bar-a" />
        <span className="bar bar-b" />
        <span className="bar bar-c" />
        <span className="sparkline" />
        <span className="donut" />
      </>
    );
  }

  if (variant === "repo" || variant === "index") {
    return (
      <>
        <span className="repo-sidebar" />
        <span className="repo-block block-a" />
        <span className="repo-block block-b" />
        <span className="repo-block block-c" />
        <span className="repo-block block-d" />
      </>
    );
  }

  if (variant === "structured" || variant === "timeline" || variant === "evidence" || variant === "study") {
    return (
      <>
        <span className="table-row row-a" />
        <span className="table-row row-b" />
        <span className="table-row row-c" />
        <span className="table-dot dot-a" />
        <span className="table-dot dot-b" />
      </>
    );
  }

  if (variant === "web" || variant === "export" || variant === "media") {
    return (
      <>
        <span className="browser-bar" />
        <span className="browser-hero" />
        <span className="browser-card card-a" />
        <span className="browser-card card-b" />
      </>
    );
  }

  return (
    <>
      <span className="generic-frame" />
      <span className="generic-line" />
      <span className="generic-line short" />
    </>
  );
}
