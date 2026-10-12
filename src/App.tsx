import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Layers3, Play, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type AnchorHTMLAttributes, type ReactNode } from "react";
import rawCatalog from "./data/catalog.generated.json";
import { localPreviews } from "./data/editorial";
import { RepositoryBadge } from "./components/RepositoryBadge";
import { LocaleContext, useTranslations } from "./LocaleContext";
import { localeFrom, localizedHref, toolCount, translate } from "./lib/i18n";
import { localizedLabel } from "./lib/labels";
import { formatCompactNumber, formatNumber, getHostname } from "./lib/catalog";
import { buildHref, catalogWindow, descriptionFor, filterCatalog, filterFields, galleryAssets, groupNames, previewAssets, sortOptions, topicFor, topics, validSort, videoEmbed } from "./lib/discovery";
import type { CatalogAsset, CatalogData, CatalogEntry, CatalogLink } from "./types";

const catalog = rawCatalog as CatalogData;
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

function Link({ href = "/", children, preserveScroll = false, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { preserveScroll?: boolean }) {
  const { locale } = useTranslations();
  const destination = localizedHref(href, locale);
  return <a href={destination} {...props} onClick={(event) => {
    props.onClick?.(event);
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    event.preventDefault();
    navigate(destination, false, !preserveScroll);
  }}>{children}</a>;
}

function External({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  const { t } = useTranslations();
  return <a className={"text-link " + className} href={href} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only">{t("（新窗口）")}</span></a>;
}

function Thumbnail({ entry }: { entry: CatalogEntry }) {
  const { locale } = useTranslations();
  const assets = useMemo(() => previewAssets(entry, locale), [entry, locale]);
  const [index, setIndex] = useState(0);
  const asset = assets[index];
  if (!asset) return null;
  const crop = index === 0 ? localPreviews[entry.name]?.crop : undefined;
  return <span className={"thumbnail" + (crop ? " crop-" + crop : "")}>
    <img src={asset.url} alt={asset.title} loading="lazy" decoding="async" onError={() => setIndex((value) => value + 1)} />
  </span>;
}

function ToolRow({ entry, params }: { entry: CatalogEntry; params: URLSearchParams }) {
  const { locale, t } = useTranslations();
  const copy = descriptionFor(entry, locale);
  const href = buildHref(params, { tool: entry.name });
  const video = entry.effectAssets.find((asset) => asset.kind === "video");
  return <li className="tool-row">
    <Link className="tool-visual" href={href} tabIndex={-1} aria-hidden="true"><Thumbnail entry={entry} /></Link>
    <div className="tool-copy">
      <div className="tool-title"><h2><Link href={href}>{entry.name}</Link></h2><RepositoryBadge entry={entry} /></div>
      <p>{copy.summary}{copy.detail && <><br />{copy.detail}</>}</p>
      {video && previewAssets(entry).length === 0 && <External href={video.url} className="video-link">{t("观看官方演示")}</External>}
    </div>
    <Link className="text-link read-link" href={href} aria-label={t("阅读 {name} 的介绍", { name: entry.name })}>{t("阅读介绍")}<ArrowRight size={17} aria-hidden="true" /></Link>
  </li>;
}

function Header({ view, params }: { view: string; params: URLSearchParams }) {
  const { locale, t } = useTranslations();
  return <header className="site-header wrap">
    <Link className="brand" href="/">
      <span className="brand-icon"><Layers3 size={21} strokeWidth={1.7} aria-hidden="true" /></span>
      <span>Awesome AI Visualization</span>
    </Link>
    <div className="header-controls"><nav aria-label={t("网站导航")}>
      <Link href="/" aria-current={view === "catalog" ? "page" : undefined}>{t("工具目录")}</Link>
      <Link href="?view=guides" aria-current={view === "guides" ? "page" : undefined}>{t("专题指南")}</Link>
      <a href={locale === "zh" ? "/activity/zh-CN/" : "/activity/en/"}>{t("开发统计")}</a>
      <a href={repository} target="_blank" rel="noreferrer">GitHub<ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only">{t("（新窗口）")}</span></a>
    </nav><div className="language-switch" role="group" aria-label={t("语言")}>
      {(["zh", "en"] as const).map((language) => <Link key={language}
        href={buildHref(params, { lang: language })} preserveScroll
        lang={language === "zh" ? "zh-CN" : "en"} hrefLang={language === "zh" ? "zh-CN" : "en"}
        aria-current={locale === language ? "true" : undefined}>{language === "zh" ? "中文" : "EN"}</Link>)}
    </div></div>
  </header>;
}

function Facets({ params }: { params: URLSearchParams }) {
  const { locale, t } = useTranslations();
  const active = [...filterFields.map((f) => f.param), "group"].filter((key) => params.has(key));
  const update = (key: string, value: string) => navigate(buildHref(params, { [key]: value, page: null }), false, false);
  return <details className="refine" open={active.length > 0 || undefined}>
    <summary><SlidersHorizontal size={15} aria-hidden="true" />{t("筛选")}{active.length > 0 && <span>({active.length})</span>}<ChevronDown size={14} aria-hidden="true" /></summary>
    <div className="refine-fields">
      {filterFields.map(({ param, field, label }) => <label key={param}>{t(label)}
        <select value={params.get(param) ?? ""} onChange={(e) => update(param, e.target.value)}>
          <option value="">{t("不限")}</option>
          {Object.keys(catalog.facets[field]).sort((a, b) => localizedLabel(a, locale).localeCompare(localizedLabel(b, locale), locale === "zh" ? "zh-CN" : "en")).map((value) => <option key={value} value={value}>{localizedLabel(value, locale)}</option>)}
        </select>
      </label>)}
      <label>{t("目录方向")}<select value={params.get("group") ?? ""} onChange={(e) => update("group", e.target.value)}>
        <option value="">{t("不限")}</option>
        {Object.keys(catalog.facets.groups).sort().map((value) => <option key={value} value={value}>{t(groupNames[value] ?? value)}</option>)}
      </select></label>
      {active.length > 0 && <button className="text-link clear-filters" onClick={() => navigate(buildHref(params, { source: null, form: null, output: null, runtime: null, group: null, page: null }), false, false)}>{t("清除筛选")}<X size={14} aria-hidden="true" /></button>}
    </div>
  </details>;
}

function Directory({ params }: { params: URLSearchParams }) {
  const { locale, t } = useTranslations();
  const [draft, setDraft] = useState(params.get("q") ?? "");
  const inputRef = useRef<HTMLInputElement>(null);
  const matches = useMemo(() => filterCatalog(catalog.entries, params), [params]);
  const visible = catalogWindow(matches, params.get("page"));
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const activeTopic = params.get("topic") ?? "all";
  const hasSearch = !!params.get("q");
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
      <div><h1>{t("工具目录")}</h1><p>{t("先了解能做什么，再选择适合你的工具。")}</p></div>
      <form className="search" role="search" onSubmit={(event) => { event.preventDefault(); search(draft); }}>
        <Search size={23} aria-hidden="true" />
        <label className="sr-only" htmlFor="catalog-search">{t("搜索名称或用途")}</label>
        <input ref={inputRef} id="catalog-search" type="search" value={draft} onChange={(event) => search(event.target.value)} placeholder={t("搜索名称或用途")} autoComplete="off" />
        {draft && <button type="button" aria-label={t("清空搜索")} onClick={() => { search(""); inputRef.current?.focus(); }}><X size={17} /></button>}
      </form>
    </section>
    <div className="catalog-toolbar">
      <nav className="topic-nav" aria-label={t("内容分类")}>
        {topics.map((topic) => <Link key={topic.key} aria-current={activeTopic === topic.key ? "page" : undefined}
          href={buildHref(params, { topic: topic.key === "all" ? null : topic.key, page: null })}>{t(topic.label)}</Link>)}
      </nav>
      <div className="catalog-meta">
        <span role="status" aria-live="polite">{toolCount(locale, matches.length)}</span><span aria-hidden="true">·</span>
        <label className="sort-label"><span className="sr-only">{t("排列方式")}</span>
          <select aria-label={t("排列方式")} value={validSort(params.get("sort"))} onChange={(e) => navigate(buildHref(params, { sort: e.target.value, page: null }), false, false)}>
            {sortOptions.map((option) => <option key={option.key} value={option.key}>{t(option.label)}</option>)}
          </select><ChevronDown size={13} aria-hidden="true" />
        </label>
      </div>
    </div>
    <div className="list-heading"><span>{hasSearch ? t("搜索结果") : t("工具")}</span><Facets params={params} /></div>
    {matches.length ? <ul className="tool-list" aria-label={t("工具列表")}>{visible.items.map((entry) => <ToolRow key={entry.name} entry={entry} params={params} />)}</ul>
      : <section className="empty-state"><h2>{t("没有找到符合条件的工具")}</h2><p>{t("试试更短的名称或用途，也可以放宽筛选条件。")}</p>
        <Link className="text-link" href="/">{t("查看全部工具")}<ArrowRight size={17} /></Link></section>}
    {matches.length > 0 && <div className="load-more" ref={loadMoreRef}>
      <p role="status" aria-live="polite">{t("已显示 {shown} / {total} 个工具", { shown: formatNumber(visible.items.length), total: formatNumber(matches.length) })}</p>
      {visible.hasMore ? <div>
        <span>{t("向下滚动自动加载")}</span>
        <button type="button" className="text-link" onClick={() => navigate(buildHref(params, { page: String(visible.batch + 1), size: null }), true, false)}>{t("加载更多")}<ArrowDown size={16} aria-hidden="true" /></button>
      </div> : <span>{t("已显示全部工具")}</span>}
    </div>}
  </>;
}

function Media({ asset, name }: { asset: CatalogAsset; name: string }) {
  const { t } = useTranslations();
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const directVideo = /\.(mp4|webm|mov)(?:[?#]|$)/i.test(asset.url);
  const embed = asset.kind === "video" ? videoEmbed(asset.url) : null;
  if (failed) return <div className="media-fallback"><p>{t("这份官方素材暂时无法在页面中显示。")}</p><External href={asset.source ?? asset.url}>{t("到来源页面查看")}</External></div>;
  if (asset.kind === "video" && !directVideo) {
    if (playing && embed) return <iframe title={t("{name} 官方演示：{title}", { name, title: asset.title })} src={embed} loading="lazy" allow="fullscreen; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" />;
    return <div className="video-preview">
      {asset.thumbnailUrl && <img src={asset.thumbnailUrl} alt={asset.title} loading="lazy" onError={(e) => { e.currentTarget.hidden = true; }} />}
      <div>{embed ? <button className="text-link" onClick={() => setPlaying(true)}><Play size={20} />{t("播放官方演示")}</button> : <External href={asset.url}>{t("观看官方演示")}</External>}
        <p>{t("视频来自 {host}", { host: getHostname(asset.url) })}</p></div>
    </div>;
  }
  if (directVideo) return <video controls playsInline preload="none" poster={asset.thumbnailUrl ?? undefined} src={asset.url} onError={() => setFailed(true)} />;
  return <img src={asset.url} alt={asset.title} loading="lazy" onError={() => setFailed(true)} />;
}

function Gallery({ entry }: { entry: CatalogEntry }) {
  const { locale, t } = useTranslations();
  const assets = useMemo(() => galleryAssets(entry, locale), [entry, locale]);
  const [selected, setSelected] = useState(0);
  const asset = assets[selected];
  if (!asset) return <section id="examples" className="reading-section"><h2>{t("实际效果")}</h2><p>{t("目前还没有收录可预览的官方素材。")}</p><External href={entry.homepage ?? entry.url}>{t("到官方页面查看")}</External></section>;
  return <section id="examples" className="reading-section"><h2>{t("实际效果")}</h2>
    <figure className="effect-figure"><div className="effect-media"><Media key={asset.url} asset={asset} name={entry.name} /></div>
      <figcaption>{asset.title}<External href={asset.source ?? asset.url}>{t("原始来源")}</External></figcaption>
    </figure>
    {assets.length > 1 && <details className="more-assets"><summary>{t("查看全部 {count} 份素材", { count: assets.length })}<ArrowDown size={15} /></summary>
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
  const { locale, t } = useTranslations();
  const copy = descriptionFor(entry, locale);
  const topic = topics.find((item) => item.key === topicFor(entry))!;
  const returnHref = buildHref(params, { tool: null });
  const resources = [{ title: t("GitHub 仓库"), url: entry.url }];
  if (!entry.url.includes("github.com")) resources[0].title = t("官方页面");
  if (entry.homepage && entry.homepage !== entry.url) resources.push({ title: t("项目主页"), url: entry.homepage });
  return <article className="detail-page">
    <nav className="breadcrumb" aria-label={t("当前位置")}><Link href={returnHref}>{t("工具目录")}</Link><span>/</span><Link href={"?topic=" + topic.key}>{t(topic.label)}</Link><span>/</span><span>{entry.name}</span></nav>
    <header className="detail-heading"><div className="detail-title"><h1>{entry.name}</h1><RepositoryBadge entry={entry} /></div><p className="detail-lead">{copy.summary}</p>{copy.detail && <p>{copy.detail}</p>}
      <div className="official-actions">{resources.map((link) => <External key={link.url} href={link.url}>{link.title}</External>)}</div>
    </header>
    <div className="reading-layout"><div className="reading-body">
      <Gallery entry={entry} />
      <section id="input-output" className="reading-section"><h2>{t("从什么开始，会得到什么")}</h2><div className="prose-columns">
        <div><h3>{t("准备的材料")}</h3><p>{entry.sourceTypes.length ? entry.sourceTypes.map(value => localizedLabel(value, locale)).join(locale === "zh" ? "、" : ", ") : t("请参考项目官方说明")}{locale === "zh" ? "。" : "."}</p></div>
        <div><h3>{t("生成的结果")}</h3><p>{entry.outputForms.length ? entry.outputForms.map(value => localizedLabel(value, locale)).join(locale === "zh" ? "、" : ", ") : t("请参考项目官方说明")}{locale === "zh" ? "。" : "."}</p></div>
      </div></section>
      <section id="requirements" className="reading-section"><h2>{t("使用前需要知道")}</h2>
        <p>{entry.toolForms.length > 0 && t("这是以{forms}形式提供的工具。", { forms: entry.toolForms.map(value => localizedLabel(value, locale)).join(locale === "zh" ? "、" : ", ") })}{" "}
          {entry.dependencies.length > 0 && t("目录记录的依赖包括{dependencies}，具体配置以官方文档为准。", { dependencies: entry.dependencies.map(value => localizedLabel(value, locale)).join(locale === "zh" ? "、" : ", ") })}</p>
        <dl className="facts">
          {entry.license && <div><dt>{t("许可证")}</dt><dd>{entry.license === "unknown" || entry.license === "NOASSERTION" ? t("待核实，请查看官方仓库") : entry.license}</dd></div>}
          {entry.stars !== null && <div><dt>{t("收录时 Star")}</dt><dd>{formatCompactNumber(entry.stars)}<small>{t("非实时数据")}</small></dd></div>}
          {entry.updated && <div><dt>{t("记录的项目更新")}</dt><dd>{entry.updated}</dd></div>}
        </dl>
      </section>
      <section id="sources" className="reading-section"><h2>{t("从官方资料开始")}</h2>
        <ResourceList title={t("项目入口")} links={resources} />
        <ResourceList title={t("文档与使用说明")} links={entry.docs} />
        <ResourceList title={t("示例与模板")} links={entry.examples} />
        <p className="source-note">{t("目录最近整理于 {date}。条目信息以项目最新官方说明为准。", { date: catalog.lastResearched })}</p>
      </section>
    </div><aside className="reading-toc" aria-label={t("本页内容")}><p>{t("本页内容")}</p>
      <a href="#examples">{t("实际效果")}</a><a href="#input-output">{t("输入与产出")}</a><a href="#requirements">{t("使用条件")}</a><a href="#sources">{t("官方资料")}</a>
    </aside></div>
    <div className="reading-footer"><Link className="text-link" href={returnHref}><ArrowLeft size={16} />{t("返回工具目录")}</Link><Link className="text-link" href={"?topic=" + topic.key}>{t("继续探索{topic}", { topic: t(topic.label) })}<ArrowRight size={16} /></Link></div>
  </article>;
}

function Guides({ params }: { params: URLSearchParams }) {
  const { locale, t } = useTranslations();
  const selected = topics.find((topic) => topic.key === params.get("guide") && topic.key !== "all");
  if (!selected) return <section className="guides-index"><div className="directory-heading"><div><h1>{t("专题指南")}</h1><p>{t("从你要表达的内容出发，找到合适的方向。")}</p></div></div>
    <div className="guide-list">{topics.slice(1).map((topic) => <article key={topic.key}>
      <h2><Link href={"?view=guides&guide=" + topic.key}>{t(topic.title)}</Link></h2><p>{t(topic.intro)}</p><Link className="text-link" href={"?view=guides&guide=" + topic.key}>{t("阅读这个专题")}<ArrowRight size={17} /></Link>
    </article>)}</div>
  </section>;
  const entries = filterCatalog(catalog.entries, new URLSearchParams({ topic: selected.key }));
  const groups = [
    { id: "workspace", title: t("通过应用完成创作"), intro: t("在独立应用或在线服务中组织内容、预览结果并继续修改。"), test: (entry: CatalogEntry) => !entry.toolForms.some((form) => /Skill|MCP|API/.test(form)) },
    { id: "agent", title: t("延续已有的 Agent 工作流"), intro: t("把专门的工具与设计能力带入你正在使用的工作环境。"), test: (entry: CatalogEntry) => entry.toolForms.some((form) => /Skill/.test(form)) },
    { id: "integrate", title: t("接入自己的工具与流程"), intro: t("通过 MCP、API 与库连接资料处理、生成和导出环节。"), test: (entry: CatalogEntry) => !entry.toolForms.some((form) => /Skill/.test(form)) && entry.toolForms.some((form) => /MCP|API/.test(form)) },
  ].map((group) => ({ ...group, entries: entries.filter(group.test).slice(0, 3) })).filter((group) => group.entries.length);
  return <article className="guide-page"><nav className="breadcrumb" aria-label={t("当前位置")}><Link href="?view=guides">{t("专题指南")}</Link><span>/</span><span>{t(selected.label)}</span></nav>
    <header className="guide-heading"><h1>{t(selected.title)}</h1><p>{t(selected.intro)}</p><p>{t("先按自己的工作环境缩小范围，再查看实际效果与使用条件。")}</p></header>
    <div className="guide-layout"><aside className="reading-toc" aria-label={t("本页内容")}><p>{t("本页内容")}</p>{groups.map((group) => <a key={group.id} href={"#" + group.id}>{group.title}</a>)}</aside>
      <div>{groups.map((group) => <section className="guide-section" key={group.id} id={group.id}><h2>{group.title}</h2><p>{group.intro}</p>
        <ul>{group.entries.map((entry) => <ToolRow key={entry.name} entry={entry} params={params} />)}</ul>
      </section>)}
      <Link className="text-link browse-topic" href={"?topic=" + selected.key}>{t("浏览这个方向的全部 {count} 个工具", { count: formatNumber(entries.length) })}<ArrowRight size={17} /></Link>
    </div></div>
  </article>;
}

function Footer() {
  const { locale, t } = useTranslations();
  return <footer className="site-footer wrap"><div><p>{t("内容来自项目官方资料")}</p><span>{t("最近整理 · {date}", { date: catalog.lastResearched })}</span></div>
    <nav aria-label={t("项目资料")}>
      <External href={repository + "/blob/main/data/catalog.yml"}>{t("目录数据")}</External>
      <External href={repository + "/blob/main/skills/ai-visualization-advisor/SKILL.md"}>Advisor Skill</External>
      <External href={repository + "/blob/main/" + (locale === "zh" ? "README.zh-CN.md" : "README.md")}>{t("阅读 README")}</External>
    </nav>
  </footer>;
}

export function App() {
  const params = useLocation();
  const locale = localeFrom(params);
  const t = (key: string, values?: Record<string, string | number>) => translate(locale, key, values);
  const toolName = params.get("tool");
  const entry = toolName ? catalog.entries.find((item) => item.name === toolName) : undefined;
  const view = params.get("view") === "guides" ? "guides" : "catalog";
  useEffect(() => {
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [toolName, view, params.get("guide")]);
  useEffect(() => {
    document.title = (entry?.name ?? (view === "guides" ? t("专题指南") : t("工具目录"))) + " · Awesome AI Visualization";
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    document.querySelector('meta[name="description"]')?.setAttribute("content", t("发现把论文、文档、数据与想法转成视觉产物的 AI 工具。浏览工具介绍、官方效果与使用资料。"));
  }, [entry, view, locale]);
  return <LocaleContext.Provider value={locale}><a className="skip-link" href="#main">{t("跳到内容")}</a><Header view={view} params={params} /><main id="main" className="wrap" tabIndex={-1}>
    {toolName ? (entry ? <Detail key={entry.name} entry={entry} params={params} /> : <section className="empty-state"><h1>{t("没有找到这个工具")}</h1><p>{t("名称可能已调整，可以返回目录继续查找。")}</p><Link className="text-link" href="/">{t("返回工具目录")}<ArrowRight size={17} /></Link></section>)
      : view === "guides" ? <Guides params={params} /> : <Directory params={params} />}
  </main><Footer /></LocaleContext.Provider>;
}
