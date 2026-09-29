import { editorial, featuredNames, localPreviews } from "../data/editorial";
import { matchesQuery, sortEntries, type SortKey } from "./catalog";
import type { CatalogAsset, CatalogEntry } from "../types";

export const topics = [
  { key: "all", label: "全部", title: "工具目录", intro: "先了解能做什么，再选择适合你的工具。" },
  { key: "create", label: "演示与网页", title: "制作演示与交互页面", intro: "从想法和资料出发，找到适合自己的创作方式。" },
  { key: "explain", label: "图解与研究", title: "让复杂内容更易理解", intro: "用图解、信息图与研究材料，清晰地解释一个想法。" },
  { key: "knowledge", label: "数据与知识", title: "看清数据与知识中的关系", intro: "从数据、文档与代码中发现结构，组织成可阅读的内容。" },
  { key: "support", label: "辅助工具", title: "完善你的内容工作流", intro: "解析、渲染与导出工具，让资料顺利走到最终产物。" },
];

export const groupNames: Record<string, string> = {
  paper: "论文与研究", web_news: "网页与资讯", docs: "文档与知识", code: "代码库",
  data: "数据分析", text_visual: "文字与视觉表达", video: "视频制作", presentation: "演示文稿",
  support_doc_parse: "文档解析", support_render: "渲染与导出", support_mindmap: "思维导图",
  indexes: "发现更多工具", index: "发现更多工具", diagrams: "图解", diagram: "图解",
  text: "文字表达", knowledge: "知识整理",
};

export function topicFor(entry: CatalogEntry): string {
  if (entry.catalogSection !== "main") return "support";
  if (editorial[entry.name]?.topic) return editorial[entry.name].topic!;
  if (["presentation-tools", "commercial-site", "video-generation"].includes(entry.category)) return "create";
  if (["paper-visualization", "diagram-generation", "infographic-report", "literature-map"].includes(entry.category)) return "explain";
  if (["data-dashboard", "codebase-map", "doc-to-knowledge", "research-report"].includes(entry.category)) return "knowledge";
  return "support";
}

export function descriptionFor(entry: CatalogEntry) {
  return editorial[entry.name] ?? { summary: entry.note, detail: "" };
}

export const sortOptions: { key: SortKey; label: string }[] = [
  { key: "recommended", label: "编辑精选" }, { key: "name", label: "名称 A–Z" },
  { key: "updated", label: "项目更新" }, { key: "stars", label: "收录时 Star" },
  { key: "evidence", label: "资料丰富度" },
];

export function validSort(value: string | null): SortKey {
  return sortOptions.find((option) => option.key === value)?.key ?? "recommended";
}

export const filterFields = [
  { param: "source", field: "sourceTypes", label: "资料来源" },
  { param: "form", field: "toolForms", label: "工具形态" },
  { param: "output", field: "outputForms", label: "想要的产出" },
  { param: "runtime", field: "dependencies", label: "运行依赖" },
] as const;

export function filterCatalog(entries: CatalogEntry[], params: URLSearchParams) {
  const topic = params.get("topic") ?? "all";
  const terms = (params.get("q") ?? "").normalize("NFKC").trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const matches = entries.filter((entry) => {
    if (topic !== "all" && topicFor(entry) !== topic) return false;
    if (params.get("group") && entry.readmeGroup !== params.get("group")) return false;
    if (!filterFields.every(({ param, field }) => !params.get(param) || entry[field].includes(params.get(param)!))) return false;
    const copy = descriptionFor(entry);
    const extraText = [copy.summary, copy.detail, groupNames[entry.readmeGroup], topics.find((t) => t.key === topicFor(entry))?.label].join(" ").toLocaleLowerCase();
    return terms.every((term) => matchesQuery(entry, term) || extraText.includes(term));
  });
  const sort = validSort(params.get("sort"));
  const sorted = sortEntries(matches, sort);
  if (sort !== "recommended") return sorted;
  const featured = new Map(featuredNames.map((name, index) => [name, index]));
  return sorted.sort((a, b) => (featured.get(a.name) ?? featured.size) - (featured.get(b.name) ?? featured.size));
}

export const CATALOG_BATCH_SIZE = 20;

export function githubRepository(url: string): string | null {
  if (!URL.canParse(url)) return null;
  const parsed = new URL(url);
  if (parsed.hostname !== "github.com" || !["https:", "http:"].includes(parsed.protocol)) return null;
  const [owner, rawName] = parsed.pathname.split("/").filter(Boolean);
  const name = rawName?.replace(/\.git$/, "");
  if (!owner || !name || !/^[\w.-]+$/.test(owner) || !/^[\w.-]+$/.test(name)) return null;
  if (["topics", "collections", "orgs", "users", "marketplace", "features", "settings", "search", "sponsors"].includes(owner.toLowerCase())) return null;
  return owner + "/" + name;
}

// The URL's page value now records how many batches have been revealed. Keep
// the preceding entries so refresh and detail-return links restore the list.
export function catalogWindow<T>(items: T[], pageValue: string | null) {
  const totalBatches = Math.max(1, Math.ceil(items.length / CATALOG_BATCH_SIZE));
  const requested = Number(pageValue);
  const batch = Number.isFinite(requested)
    ? Math.max(1, Math.min(totalBatches, Math.floor(requested) || 1))
    : 1;
  const visible = items.slice(0, batch * CATALOG_BATCH_SIZE);
  return { items: visible, batch, hasMore: visible.length < items.length };
}

export function galleryAssets(entry: CatalogEntry): CatalogAsset[] {
  const local = localPreviews[entry.name];
  const assets = entry.effectAssets.filter((asset) =>
    !/shields\.io|badge|spaces-on-hf|avatars\.github|github\.com\/[^/]+\.png|favicon|logo|\/icon[s]?\//i.test(asset.url + " " + asset.title),
  );
  if (!local) return assets;
  return [{ kind: "image", title: local.title, url: local.path, source: local.source }, ...assets.filter((a) => a.url !== local.source)];
}

export function previewAssets(entry: CatalogEntry): CatalogAsset[] {
  // These curated rows deliberately use text-only introductions in the design.
  if (["Data Formulator", "Presenton"].includes(entry.name)) return [];
  return galleryAssets(entry).filter((asset) => ["image", "gif"].includes(asset.kind)).slice(0, 3);
}

export function buildHref(params: URLSearchParams, changes: Record<string, string | null>) {
  const next = new URLSearchParams(params);
  Object.entries(changes).forEach(([key, value]) => value === null || value === "" ? next.delete(key) : next.set(key, value));
  return next.size ? "?" + next.toString() : "/";
}

export function videoEmbed(url: string) {
  if (!URL.canParse(url)) return null;
  const parsed = new URL(url);
  if (["www.youtube.com", "youtube.com", "youtu.be"].includes(parsed.hostname)) {
    const id = parsed.hostname === "youtu.be" ? parsed.pathname.slice(1) : parsed.searchParams.get("v");
    return id && /^[\w-]{11}$/.test(id) ? "https://www.youtube-nocookie.com/embed/" + id : null;
  }
  if (["www.loom.com", "loom.com"].includes(parsed.hostname) && /^\/share\/[a-z\d]+$/i.test(parsed.pathname)) return "https://www.loom.com" + parsed.pathname.replace("/share/", "/embed/");
  return null;
}
