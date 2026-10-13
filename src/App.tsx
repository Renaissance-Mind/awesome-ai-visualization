import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Github, Languages, Layers3, Play, Search, SlidersHorizontal, X } from "lucide-react";
import { lazy, Suspense, useEffect, useMemo, useRef, useState, type AnchorHTMLAttributes, type ReactNode } from "react";
import rawCatalog from "./data/catalog.generated.json";
import { localPreviews } from "./data/editorial";
import { RepositoryBadge } from "./components/RepositoryBadge";
import { formatCompactNumber, formatNumber, getHostname } from "./lib/catalog";
import { buildHref, catalogWindow, descriptionFor, filterCatalog, filterFields, galleryAssets, groupNames, previewAssets, sortOptions, topicFor, topics, validSort, videoEmbed } from "./lib/discovery";
import type { CatalogAsset, CatalogData, CatalogEntry, CatalogLink } from "./types";
import { useSemanticSearch } from "./lib/useSemanticSearch";
import { MAX_QUERY_LENGTH } from "./lib/search-config";
import Homepage, { designFor, languageFor } from "./components/Homepage";

const catalog = rawCatalog as CatalogData;
const ProjectExplanation = lazy(() => import("./components/ProjectExplanation"));
const repository = "https://github.com/Renaissance-Mind/awesome-ai-visualization";
const navigationEvent = "catalog:navigate";

function navigate(href: string, replace = false, scroll = true) {
  if (replace) window.history.replaceState(null, "", href);
  else window.history.pushState(null, "", href);
  window.dispatchEvent(new Event(navigationEvent));
  if (scroll) window.scrollTo({ top: 0, behavior: "instant" });
}

function useLocation() {
  const [search, setSearch] = useState(window.location.search);
  useEffect(() => {
    const update = () => setSearch(window.location.search);
    window.addEventListener("popstate", update);
    window.addEventListener(navigationEvent, update);
    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener(navigationEvent, update);
    };
  }, []);
  return useMemo(() => new URLSearchParams(search), [search]);
}

function Link({ href = "/", children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const next = new URL(href, window.location.origin);
  const current = new URLSearchParams(window.location.search);
  for (const key of ["lang", "design"]) if (!next.searchParams.has(key) && current.has(key)) next.searchParams.set(key, current.get(key)!);
  const destination = next.pathname + next.search + next.hash;
  return <a href={destination} {...props} onClick={(event) => {
    props.onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    event.preventDefault();
    navigate(destination);
  }}>{children}</a>;
}

function External({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return <a className={"text-link " + className} href={href} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only">（新窗口）</span></a>;
}

function Thumbnail({ entry }: { entry: CatalogEntry }) {
  const assets = useMemo(() => previewAssets(entry), [entry]);
  const [index, setIndex] = useState(0);
  const asset = assets[index];
  if (!asset) return null;
  const crop = index === 0 ? localPreviews[entry.name]?.crop : undefined;
  return <span className={"thumbnail" + (crop ? " crop-" + crop : "")}>
    <img src={asset.url} alt={asset.title} loading="lazy" decoding="async" onError={() => setIndex((value) => value + 1)} />
  </span>;
}

function ToolRow({ entry, params }: { entry: CatalogEntry; params: URLSearchParams }) {
  const copy = descriptionFor(entry);
  const href = buildHref(params, { tool: entry.name });
  const video = entry.effectAssets.find((asset) => asset.kind === "video");
  return <li className="tool-row">
    <Link className="tool-visual" href={href} tabIndex={-1} aria-hidden="true"><Thumbnail entry={entry} /></Link>
    <div className="tool-copy">
      <div className="tool-title"><h2><Link href={href}>{entry.name}</Link></h2><RepositoryBadge entry={entry} /></div>
      <p>{copy.summary}{copy.detail && <><br />{copy.detail}</>}</p>
      {video && previewAssets(entry).length === 0 && <External href={video.url} className="video-link">观看官方演示</External>}
    </div>
    <Link className="text-link read-link" href={href} aria-label={"阅读 " + entry.name + " 的介绍"}>阅读介绍<ArrowRight size={17} aria-hidden="true" /></Link>
  </li>;
}

function Header({ view, params }: { view: string; params: URLSearchParams }) {
  const en = languageFor(params) === "en";
  return <header className="site-header wrap">
    <Link className="brand" href="/">
      <span className="brand-icon"><Layers3 size={21} strokeWidth={1.7} aria-hidden="true" /></span>
      <span>Awesome AI Visualization</span>
    </Link>
    <nav aria-label={en ? "Main navigation" : "网站导航"}>
      <Link href="/" aria-current={view === "home" ? "page" : undefined}>{en ? "Home" : "首页"}</Link>
      <Link href="?view=catalog" aria-current={view === "catalog" ? "page" : undefined}>{en ? "Catalog" : "工具目录"}</Link>
      <a href={en ? "/activity/en/" : "/activity/zh-CN/"}>{en ? "Activity" : "开发统计"}</a>
      <label className="language-select"><Languages size={15} aria-hidden="true" /><span className="sr-only">{en ? "Language" : "语言"}</span>
        <select aria-label={en ? "Language" : "语言"} value={en ? "en" : "zh"} onChange={event => navigate(buildHref(params, { lang: event.target.value }), false, false)}>
          <option value="zh">简体中文</option><option value="en">English</option>
        </select><ChevronDown size={12} aria-hidden="true" />
      </label>
      <a className="github-link" href={repository} target="_blank" rel="noreferrer" aria-label={en ? "GitHub repository (opens in a new window)" : "GitHub 仓库（新窗口）"} title="GitHub"><Github size={21} strokeWidth={1.6} aria-hidden="true" /></a>
    </nav>
  </header>;
}

function Facets({ params }: { params: URLSearchParams }) {
  const active = [...filterFields.map((f) => f.param), "group"].filter((key) => params.has(key));
  const update = (key: string, value: string) => navigate(buildHref(params, { [key]: value, page: null }), false, false);
  return <details className="refine" open={active.length > 0 || undefined}>
    <summary><SlidersHorizontal size={15} aria-hidden="true" />筛选{active.length > 0 && <span>（{active.length}）</span>}<ChevronDown size={14} aria-hidden="true" /></summary>
    <div className="refine-fields">
      {filterFields.map(({ param, field, label }) => <label key={param}>{label}
        <select value={params.get(param) ?? ""} onChange={(e) => update(param, e.target.value)}>
          <option value="">不限</option>
          {Object.keys(catalog.facets[field]).sort((a, b) => a.localeCompare(b, "zh")).map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </label>)}
      <label>目录方向<select value={params.get("group") ?? ""} onChange={(e) => update("group", e.target.value)}>
        <option value="">不限</option>
        {Object.keys(catalog.facets.groups).sort().map((value) => <option key={value} value={value}>{groupNames[value] ?? value}</option>)}
      </select></label>
      {active.length > 0 && <button className="text-link clear-filters" onClick={() => navigate(buildHref(params, { source: null, form: null, output: null, runtime: null, group: null, page: null }), false, false)}>清除筛选<X size={14} aria-hidden="true" /></button>}
    </div>
  </details>;
}

function Directory({ params }: { params: URLSearchParams }) {
  const [draft, setDraft] = useState(params.get("q") ?? "");
  const inputRef = useRef<HTMLInputElement>(null);
  const composing = useRef(false);
  const semantic = useSemanticSearch(params);
  const matches = useMemo(() => {
    if (!params.get("q")?.trim()) return filterCatalog(catalog.entries, params);
    const byName = new Map(catalog.entries.map(entry => [entry.name, entry]));
    return (semantic.result?.names ?? []).map(name => byName.get(name)).filter((entry): entry is CatalogEntry => !!entry);
  }, [params, semantic.result]);
  const visible = catalogWindow(matches, params.get("page"));
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const activeTopic = params.get("topic") ?? "all";
  const hasSearch = !!params.get("q")?.trim();
  useEffect(() => setDraft(params.get("q") ?? ""), [params]);
  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (!visible.hasMore || !sentinel || !("IntersectionObserver" in window)) return;
    let active = true;
    const observer = new IntersectionObserver((entries) => {
      if (!active || !entries.some((entry) => entry.isIntersecting)) return;
      active = false;
      observer.disconnect();
      navigate(buildHref(params, { page: String(visible.batch + 1), size: null }), true, false);
    }, { rootMargin: "0px 0px 360px 0px" });
    observer.observe(sentinel);
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [params, visible.batch, visible.hasMore]);
  const search = (query: string) => {
    setDraft(query);
    navigate(buildHref(params, { q: query, page: null }), true, false);
  };
  return <>
    <section className="directory-heading">
      <div><h1>工具目录</h1><p>先了解能做什么，再选择适合你的工具。</p></div>
      <form className="search" role="search" onSubmit={(event) => { event.preventDefault(); if (!composing.current) search(draft); }}>
        <Search size={23} aria-hidden="true" />
        <label className="sr-only" htmlFor="catalog-search">搜索名称或描述你的需求</label>
        <input ref={inputRef} id="catalog-search" type="search" value={draft} maxLength={MAX_QUERY_LENGTH}
          onCompositionStart={() => { composing.current = true; }}
          onCompositionEnd={(event) => { composing.current = false; search(event.currentTarget.value); }}
          onChange={(event) => { setDraft(event.target.value); if (!composing.current) search(event.target.value); }}
          placeholder="搜索名称或描述你的需求" autoComplete="off" />
        {draft && <button type="button" aria-label="清空搜索" onClick={() => { search(""); inputRef.current?.focus(); }}><X size={17} /></button>}
      </form>
    </section>
    <div className="catalog-toolbar">
      <nav className="topic-nav" aria-label="内容分类">
        {topics.map((topic) => <Link key={topic.key} aria-current={activeTopic === topic.key ? "page" : undefined}
          href={buildHref(params, { topic: topic.key === "all" ? null : topic.key, page: null })}>{topic.label}</Link>)}
      </nav>
      <div className="catalog-meta">
        <span role="status" aria-live="polite">{semantic.loading ? "正在查找…" : semantic.error ? "搜索未完成" : formatNumber(matches.length) + (hasSearch ? " 个匹配工具" : " 个工具")}</span><span aria-hidden="true">·</span>
        {hasSearch ? <span>按相关性排列</span> : <label className="sort-label"><span className="sr-only">排列方式</span>
          <select aria-label="排列方式" value={validSort(params.get("sort"))} onChange={(e) => navigate(buildHref(params, { sort: e.target.value, page: null }), false, false)}>
            {sortOptions.map((option) => <option key={option.key} value={option.key}>{option.label}</option>)}
          </select><ChevronDown size={13} aria-hidden="true" />
        </label>}
      </div>
    </div>
    <div className="list-heading"><span>{hasSearch ? "搜索结果" : "工具"}</span><Facets params={params} /></div>
    {semantic.loading ? <section className="empty-state" aria-busy="true" role="status"><h2>正在查找适合的工具</h2><p>正在根据你的需求整理搜索结果。</p></section>
      : semantic.error ? <section className="empty-state" role="alert"><h2>搜索暂时未完成</h2><p>{semantic.error}</p><button type="button" className="text-link" onClick={semantic.retry}>重新搜索<ArrowRight size={17} /></button></section>
      : matches.length ? <ul className="tool-list" aria-label="工具列表">{visible.items.map((entry) => <ToolRow key={entry.name} entry={entry} params={params} />)}</ul>
      : <section className="empty-state"><h2>没有找到符合条件的工具</h2><p>试试更短的名称或用途，也可以放宽筛选条件。</p>
        <Link className="text-link" href="?view=catalog">查看全部工具<ArrowRight size={17} /></Link></section>}
    {matches.length > 0 && <div className="load-more" ref={loadMoreRef}>
      <p role="status" aria-live="polite">已显示 {formatNumber(visible.items.length)} / {formatNumber(matches.length)} 个工具</p>
      {visible.hasMore ? <div>
        <span>向下滚动自动加载</span>
        <button type="button" className="text-link" onClick={() => navigate(buildHref(params, { page: String(visible.batch + 1), size: null }), true, false)}>加载更多<ArrowDown size={16} aria-hidden="true" /></button>
      </div> : <span>已显示全部工具</span>}
    </div>}
  </>;
}

function Media({ asset, name }: { asset: CatalogAsset; name: string }) {
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const directVideo = /\.(mp4|webm|mov)(?:[?#]|$)/i.test(asset.url);
  const embed = asset.kind === "video" ? videoEmbed(asset.url) : null;
  if (failed) return <div className="media-fallback"><p>这份官方素材暂时无法在页面中显示。</p><External href={asset.source ?? asset.url}>到来源页面查看</External></div>;
  if (asset.kind === "video" && !directVideo) {
    if (playing && embed) return <iframe title={name + " 官方演示：" + asset.title} src={embed} loading="lazy" allow="fullscreen; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" />;
    return <div className="video-preview">
      {asset.thumbnailUrl && <img src={asset.thumbnailUrl} alt={asset.title} loading="lazy" onError={(e) => { e.currentTarget.hidden = true; }} />}
      <div>{embed ? <button className="text-link" onClick={() => setPlaying(true)}><Play size={20} />播放官方演示</button> : <External href={asset.url}>观看官方演示</External>}
        <p>视频来自 {getHostname(asset.url)}</p></div>
    </div>;
  }
  if (directVideo) return <video controls playsInline preload="none" poster={asset.thumbnailUrl ?? undefined} src={asset.url} onError={() => setFailed(true)} />;
  return <img src={asset.url} alt={asset.title} loading="lazy" onError={() => setFailed(true)} />;
}

function Gallery({ entry }: { entry: CatalogEntry }) {
  const assets = useMemo(() => galleryAssets(entry), [entry]);
  const [selected, setSelected] = useState(0);
  const asset = assets[selected];
  if (!asset) return <section id="examples" className="reading-section"><h2>实际效果</h2><p>目前还没有收录可预览的官方素材。</p><External href={entry.homepage ?? entry.url}>到官方页面查看</External></section>;
  return <section id="examples" className="reading-section"><h2>实际效果</h2>
    <figure className="effect-figure"><div className="effect-media"><Media key={asset.url} asset={asset} name={entry.name} /></div>
      <figcaption>{asset.title}<External href={asset.source ?? asset.url}>原始来源</External></figcaption>
    </figure>
    {assets.length > 1 && <details className="more-assets"><summary>查看全部 {assets.length} 份素材<ArrowDown size={15} /></summary>
      <ul>{assets.map((item, index) => <li key={item.url}><button aria-pressed={selected === index} onClick={() => setSelected(index)}>
        {selected === index && <Check size={14} aria-hidden="true" />}<span>{item.title}</span>
      </button></li>)}</ul>
    </details>}
  </section>;
}

function ResourceList({ title, links }: { title: string; links: CatalogLink[] }) {
  if (!links.length) return null;
  return <div className="resource-group"><h3>{title}</h3><ul>{links.map((link) => <li key={link.url}><External href={link.url}>{link.title.replace(/^`|`$/g, "")}</External></li>)}</ul></div>;
}

function Detail({ entry, params }: { entry: CatalogEntry; params: URLSearchParams }) {
  const copy = descriptionFor(entry);
  const topic = topics.find((item) => item.key === topicFor(entry))!;
  const returnHref = buildHref(params, { tool: null, view: "catalog" });
  const resources = [{ title: "GitHub 仓库", url: entry.url }];
  if (!entry.url.includes("github.com")) resources[0].title = "官方页面";
  if (entry.homepage && entry.homepage !== entry.url) resources.push({ title: "项目主页", url: entry.homepage });
  return <article className="detail-page">
    <nav className="breadcrumb" aria-label="当前位置"><Link href={returnHref}>工具目录</Link><span>/</span><Link href={"?topic=" + topic.key}>{topic.label}</Link><span>/</span><span>{entry.name}</span></nav>
    <header className="detail-heading"><div className="detail-title"><h1>{entry.name}</h1><RepositoryBadge entry={entry} /></div><p className="detail-lead">{copy.summary}</p>{copy.detail && <p>{copy.detail}</p>}
      <div className="official-actions">{resources.map((link) => <External key={link.url} href={link.url}>{link.title}</External>)}</div>
    </header>
    <div className="reading-layout"><div className="reading-body">
      <section id="project-profile" className="reading-section"><h2>项目说明</h2>
        <Suspense fallback={<p role="status">正在读取项目说明…</p>}><ProjectExplanation name={entry.name} /></Suspense>
      </section>
      <Gallery entry={entry} />
      <section id="input-output" className="reading-section"><h2>从什么开始，会得到什么</h2><div className="prose-columns">
        <div><h3>准备的材料</h3><p>{entry.sourceTypes.length ? entry.sourceTypes.join("、") : "请参考项目官方说明"}。</p></div>
        <div><h3>生成的结果</h3><p>{entry.outputForms.length ? entry.outputForms.join("、") : "请参考项目官方说明"}。</p></div>
      </div></section>
      <section id="requirements" className="reading-section"><h2>使用前需要知道</h2>
        <p>{entry.toolForms.length > 0 && <>这是以{entry.toolForms.join("、")}形式提供的工具。</>}
          {entry.dependencies.length > 0 && <>目录记录的依赖包括{entry.dependencies.join("、")}，具体配置以官方文档为准。</>}</p>
        <dl className="facts">
          {entry.license && <div><dt>许可证</dt><dd>{entry.license === "unknown" || entry.license === "NOASSERTION" ? "待核实，请查看官方仓库" : entry.license}</dd></div>}
          {entry.stars !== null && <div><dt>收录时 Star</dt><dd>{formatCompactNumber(entry.stars)}<small>非实时数据</small></dd></div>}
          {entry.updated && <div><dt>记录的项目更新</dt><dd>{entry.updated}</dd></div>}
        </dl>
      </section>
      <section id="sources" className="reading-section"><h2>从官方资料开始</h2>
        <ResourceList title="项目入口" links={resources} />
        <ResourceList title="文档与使用说明" links={entry.docs} />
        <ResourceList title="示例与模板" links={entry.examples} />
        <p className="source-note">目录最近整理于 {catalog.lastResearched}。条目信息以项目最新官方说明为准。</p>
      </section>
    </div><aside className="reading-toc" aria-label="本页内容"><p>本页内容</p>
      <a href="#project-profile">项目说明</a><a href="#examples">实际效果</a><a href="#input-output">输入与产出</a><a href="#requirements">使用条件</a><a href="#sources">官方资料</a>
    </aside></div>
    <div className="reading-footer"><Link className="text-link" href={returnHref}><ArrowLeft size={16} />返回工具目录</Link><Link className="text-link" href={"?topic=" + topic.key}>继续探索{topic.label}<ArrowRight size={16} /></Link></div>
  </article>;
}

function Footer({ params }: { params: URLSearchParams }) {
  const en = languageFor(params) === "en";
  return <footer className="site-footer wrap"><div><p>{en ? "Drawn from official project sources" : "内容来自项目官方资料"}</p><span>{en ? "Last researched" : "最近整理"} · {catalog.lastResearched}</span></div>
    <nav aria-label="项目资料">
      <External href={repository + "/blob/main/data/catalog.yml"}>{en ? "Catalog data" : "目录数据"}</External>
      <External href={repository + "/blob/main/skills/ai-visualization-advisor/SKILL.md"}>Advisor Skill</External>
      <External href={repository + (en ? "/blob/main/README.md" : "/blob/main/README.zh-CN.md")}>{en ? "Read README" : "阅读 README"}</External>
    </nav>
  </footer>;
}

export function App() {
  const params = useLocation();
  const toolName = params.get("tool");
  const entry = toolName ? catalog.entries.find((item) => item.name === toolName) : undefined;
  const browseParams = ["q", "topic", "source", "form", "output", "runtime", "group", "page", "sort"];
  const view = toolName || params.get("view") === "catalog" || params.get("view") === "guides" || browseParams.some(key => params.has(key)) ? "catalog" : "home";
  const directoryParams = new URLSearchParams(params);
  directoryParams.set("view", "catalog");
  directoryParams.delete("guide");
  const en = languageFor(params) === "en";
  const design = designFor(params);
  useEffect(() => {
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [toolName, view]);
  useEffect(() => {
    document.title = (entry?.name ?? (view === "home" ? (en ? "Home" : "首页") : (en ? "Catalog" : "工具目录"))) + " · Awesome AI Visualization";
    document.documentElement.lang = en ? "en" : "zh-CN";
  }, [entry, view, en]);
  return <div className={"site-frame" + (view === "home" ? " home-frame design-" + design : "")}><a className="skip-link" href="#main">{en ? "Skip to content" : "跳到内容"}</a><Header view={view} params={params} /><main id="main" className={view === "home" ? "" : "wrap"} tabIndex={-1}>
    {toolName ? (entry ? <Detail key={entry.name} entry={entry} params={params} /> : <section className="empty-state"><h1>没有找到这个工具</h1><p>名称可能已调整，可以返回目录继续查找。</p><Link className="text-link" href="?view=catalog">返回工具目录<ArrowRight size={17} /></Link></section>)
      : view === "home" ? <Homepage catalog={catalog} params={params} go={navigate} /> : <Directory params={directoryParams} />}
  </main><Footer params={params} /></div>;
}
