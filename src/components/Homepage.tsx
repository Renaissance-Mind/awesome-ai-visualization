import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, Braces, ChartNoAxesCombined, FileText, Layers3, Monitor, Pause, Play, Sparkles } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type ComponentType } from "react";
import type { CatalogData } from "../types";
import "./homepage.css";

export type HomepageDesign = "atlas" | "cosmos" | "studio";
export type Language = "zh" | "en";
export const designs: HomepageDesign[] = ["atlas", "cosmos", "studio"];
export const languageFor = (params: URLSearchParams): Language => params.get("lang") === "en" ? "en" : "zh";
export const designFor = (params: URLSearchParams): HomepageDesign => designs.find(design => design === params.get("design")) ?? "atlas";

type Props = { catalog: CatalogData; params: URLSearchParams; go: (href: string) => void };
const journeys = [
  { zh: "论文", en: "Papers", icon: BookOpen, input: ["研究方法与图注", "Methods & captions"], output: ["科学图解", "Scientific figures"], tool: "PaperBanana", source: "论文/科研资料", topic: "explain" },
  { zh: "代码", en: "Code", icon: Braces, input: ["代码库与文档", "Code & documentation"], output: ["交互知识图谱", "Interactive knowledge graph"], tool: "Graphify", source: "代码库", topic: "knowledge" },
  { zh: "想法", en: "Ideas", icon: Sparkles, input: ["文字与创作想法", "Text & creative ideas"], output: ["网页与演示", "Websites & presentations"], tool: "Open Design", source: "文本/想法", topic: "create" },
];
const previewPaths: Record<string, string> = { PaperBanana: "/catalog-previews/paperbanana.jpg", Graphify: "/catalog-previews/graphify.png", "Open Design": "/catalog-previews/open-design.png" };

function OutputGlyph({ type }: { type: number }) {
  return <svg viewBox="0 0 160 100" className="output-glyph" aria-hidden="true">
    {type === 0 ? <><path d="M15 50H42M64 50H94M116 50H145" /><rect x="42" y="30" width="22" height="40" rx="3" /><rect x="94" y="30" width="22" height="40" rx="3" /><path d="M53 30V15H105V30M53 70V85H105V70" /><circle cx="15" cy="50" r="5" /><circle cx="145" cy="50" r="5" /></>
      : type === 1 ? <><path d="M80 50L27 22M80 50L26 80M80 50L132 18M80 50L137 75M27 22L26 80M132 18L137 75" /><circle cx="80" cy="50" r="13" /><circle cx="27" cy="22" r="8" /><circle cx="26" cy="80" r="6" /><circle cx="132" cy="18" r="6" /><circle cx="137" cy="75" r="10" /></>
        : <><rect x="18" y="12" width="124" height="76" rx="4" /><path d="M18 27H142M30 43H76M30 53H62M30 70H50" /><rect x="91" y="40" width="36" height="33" rx="2" /><circle cx="27" cy="20" r="1" /><circle cx="34" cy="20" r="1" /><circle cx="41" cy="20" r="1" /></>}
  </svg>;
}

function VisualEngine({ design, locale, active }: { design: HomepageDesign; locale: Language; active: number }) {
  const visualRef = useRef<HTMLDivElement>(null);
  const en = locale === "en";
  return <div className={"visual-engine engine-" + design} ref={visualRef} aria-hidden="true"
    onPointerMove={event => { const box = event.currentTarget.getBoundingClientRect(); visualRef.current?.style.setProperty("--pointer-x", ((event.clientX - box.left) / box.width - .5) * 12 + "px"); visualRef.current?.style.setProperty("--pointer-y", ((event.clientY - box.top) / box.height - .5) * 12 + "px"); }}
    onPointerLeave={() => { visualRef.current?.style.setProperty("--pointer-x", "0px"); visualRef.current?.style.setProperty("--pointer-y", "0px"); }}>
    <div className="engine-grid" />
    <div className="engine-orbit orbit-one" /><div className="engine-orbit orbit-two" /><div className="engine-orbit orbit-three" />
    <svg viewBox="0 0 600 500" className="engine-wires"><g>{[0, 1, 2].map(i => <path key={i} d={`M110 ${110 + i * 140} C230 ${110 + i * 140},190 250,300 250 S410 ${110 + i * 140},500 ${110 + i * 140}`} />)}</g>
      <g className="wire-signal">{[0, 1, 2].map(i => <path key={i} style={{ animationDelay: `${i * -.8}s` }} d={`M110 ${110 + i * 140} C230 ${110 + i * 140},190 250,300 250 S410 ${110 + i * 140},500 ${110 + i * 140}`} />)}</g>
    </svg>
    <div className="engine-center"><div className="center-aura" /><Layers3 size={38} strokeWidth={1.1} /><span>AI × HUMAN</span></div>
    <div className="engine-caption">{en ? "A map of possibilities" : "一张通往理解的地图"}</div>
    {journeys.map((journey, i) => { const Icon = journey.icon; return <div key={journey.tool} className={"engine-source source-" + i + (active === i ? " is-active" : "")}><Icon size={20} strokeWidth={1.3} /><span>{en ? journey.en : journey.zh}</span><i>0{i + 1}</i></div>; })}
    {journeys.map((journey, i) => <div key={journey.tool} className={"engine-output output-" + i + (active === i ? " is-active" : "")}><OutputGlyph type={i} /><span>{journey.output[en ? 1 : 0]}</span></div>)}
    <span className="engine-label label-in">01 / {en ? "INFORMATION" : "信息来源"}</span><span className="engine-label label-out">03 / {en ? "UNDERSTANDING" : "视觉产物"}</span>
    <span className="floating-dot dot-one" /><span className="floating-dot dot-two" /><span className="floating-dot dot-three" />
  </div>;
}

export default function Homepage({ catalog, params, go }: Props) {
  const locale = languageFor(params);
  const design = designFor(params);
  const en = locale === "en";
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const rootRef = useRef<HTMLDivElement>(null);
  const href = (updates: Record<string, string>) => { const next = new URLSearchParams({ lang: locale, design, ...updates }); return "?" + next; };
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("revealed"); observer.unobserve(entry.target); } }), { threshold: .12 });
    root.querySelectorAll(".home-reveal").forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [design]);
  const jump = (event: React.MouseEvent<HTMLAnchorElement>, url: string) => { if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); go(url); };
  const journey = journeys[active];
  return <div ref={rootRef} className={"homepage home-" + design + (paused ? " motion-paused" : "")}>
    <section className="home-hero home-shell">
      <div className="hero-copy">
        <p className="home-eyebrow"><span className="live-dot" />THE HUMAN SIDE OF AI</p>
        <h1>{en ? <>From information<br /><em>to understanding.</em></> : <>让信息<br /><em>成为理解。</em></>}</h1>
        <p className="hero-description">{en ? "Discover AI tools that turn papers, code, data and ideas into things people can see, explore and understand." : "把论文、代码、数据与想法，变成可以看见、探索和理解的内容。发现让复杂信息走向人的 AI 工具。"}</p>
        <div className="hero-actions"><a href={href({ view: "catalog" })} onClick={event => jump(event, href({ view: "catalog" }))} className="home-primary">{en ? "Explore the catalog" : "探索工具目录"}<ArrowUpRight size={21} /></a><a href="#project-logic" className="home-secondary">{en ? "Our thinking" : "了解项目逻辑"}<ArrowDown size={16} /></a></div>
        <div className="hero-footnote"><span>{String(catalog.summary.total)}<small>{en ? "curated tools" : "个精选工具"}</small></span><span>{String(Object.keys(catalog.facets.sourceTypes).length)}<small>{en ? "types of input" : "类信息来源"}</small></span><span>{String(Object.keys(catalog.facets.outputForms).length)}<small>{en ? "forms of output" : "类产出形式"}</small></span></div>
      </div>
      <VisualEngine design={design} locale={locale} active={active} />
      <div className="hero-bottom"><span>AWESOME AI VISUALIZATION / OPEN CATALOG</span><button onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? <Play size={12} /> : <Pause size={12} />}{en ? (paused ? "Play motion" : "Pause motion") : (paused ? "播放动画" : "暂停动画")}</button></div>
    </section>
    <div className="home-ribbon" aria-hidden="true"><div>{[0, 1].map(i => <span key={i}>PAPERS <i>↗</i> CODE <i>↗</i> DATA <i>↗</i> IDEAS <i>→</i> FIGURES <i>✳</i> MAPS <i>✳</i> STORIES <i>✳</i> UNDERSTANDING <i>↗</i> </span>)}</div></div>
    <section className="home-purpose home-shell home-reveal" id="project-logic">
      <p className="section-index">01 / {en ? "WHY THIS EXISTS" : "项目意义"}</p>
      <div className="purpose-copy"><h2>{en ? <>Great information deserves<br /><em>a form we can understand.</em></> : <>好的信息，<br /><em>值得被更好地理解。</em></>}</h2><p>{en ? "A paper can become a diagram. A codebase can become a map. A dataset can become an explorable story. We connect information, tools and visual forms so you can find a path from what you have to what your audience needs." : "一篇论文可以是一张图，一座代码库可以是一幅地图，一份数据可以成为可探索的故事。我们连接信息来源、工具能力与呈现形式，帮助你从手里的材料，找到适合读者的表达方式。"}</p></div>
    </section>
    <section className="home-workflow home-shell home-reveal">
      <div className="section-topline"><p className="section-index">02 / {en ? "THE LOGIC" : "从材料到表达"}</p><p>{en ? "Choose a starting point. See the path." : "选择一种材料，看看它可以走向哪里。"}</p></div>
      <div className="journey-picker" role="group" aria-label={en ? "Choose source material" : "选择信息来源"}>{journeys.map((item, i) => { const Icon = item.icon; return <button key={item.tool} aria-pressed={active === i} onClick={() => setActive(i)}><Icon size={17} />{en ? item.en : item.zh}</button>; })}</div>
      <div className="journey-stage" key={active}>
        <div className="journey-node"><span>01 / INPUT</span><h3>{journey.input[en ? 1 : 0]}</h3><div className="material-lines"><i /><i /><i /><i /></div></div>
        <ArrowRight className="journey-arrow" size={28} strokeWidth={1} />
        <a className="journey-node journey-tool" href={href({ tool: journey.tool })} onClick={event => jump(event, href({ tool: journey.tool }))}><span>02 / AI TOOL <ArrowUpRight size={15} /></span><Layers3 size={35} strokeWidth={1.1} /><h3>{journey.tool}</h3><small>{en ? "Read the project" : "阅读项目介绍"}</small></a>
        <ArrowRight className="journey-arrow" size={28} strokeWidth={1} />
        <div className="journey-node journey-result"><span>03 / OUTPUT</span><OutputGlyph type={active} /><h3>{journey.output[en ? 1 : 0]}</h3></div>
      </div>
      <p className="workflow-note">{en ? "Examples drawn from the catalog. Open each project for its official outputs and requirements." : "示例来自已收录项目。打开项目介绍，查看官方效果和使用条件。"}</p>
    </section>
    <section className="home-examples home-shell home-reveal">
      <div className="section-topline"><div><p className="section-index">03 / {en ? "SEE THE POSSIBILITIES" : "看见可能性"}</p><h2>{en ? "From the real world." : "看看它们如何呈现。"}</h2></div><a className="home-secondary" href={href({ view: "catalog" })} onClick={event => jump(event, href({ view: "catalog" }))}>{en ? "All tools" : "全部工具"}<ArrowRight size={17} /></a></div>
      <div className="home-example-grid">{journeys.map((item, i) => <a key={item.tool} href={href({ tool: item.tool })} onClick={event => jump(event, href({ tool: item.tool }))} className="home-example" style={{ "--order": i } as CSSProperties}><div className="example-image"><img src={previewPaths[item.tool]} alt={en ? item.tool + " project preview" : item.tool + " 项目预览"} loading="lazy" /><span><ArrowUpRight size={24} /></span></div><div className="example-caption"><div><p>{item.tool}</p><span>{item.input[en ? 1 : 0]} → {item.output[en ? 1 : 0]}</span></div><small>0{i + 1}</small></div></a>)}</div>
    </section>
    <section className="home-discover home-shell home-reveal"><p className="section-index">04 / {en ? "FIND YOUR WAY" : "找到你的路径"}</p><div className="discover-title"><h2>{en ? <>What would you like<br /><em>to make clear?</em></> : <>你想让什么，<br /><em>变得清晰？</em></>}</h2><p>{en ? "Explore by source, output, tool type or runtime. Compare real examples and official documentation before choosing." : "按信息来源、产出形式、工具形态与运行条件筛选，结合真实效果与官方资料，找到适合你工作流的工具。"}</p></div>
      <div className="discover-links">{([
        [BookOpen, "论文与研究", "Papers & research", { source: "论文/科研资料" }],
        [Braces, "代码与知识", "Code & knowledge", { topic: "knowledge" }],
        [Monitor, "演示与网页", "Presentations & websites", { topic: "create" }],
        [ChartNoAxesCombined, "数据与图表", "Data & charts", { source: "数据/表格" }],
      ] as [ComponentType<{ size?: number; strokeWidth?: number }>, string, string, Record<string, string>][]).map(([Icon, zh, english, filter], i) => <a key={zh} href={href({ view: "catalog", ...filter })} onClick={event => jump(event, href({ view: "catalog", ...filter }))}><span>0{i + 1}</span><Icon size={24} strokeWidth={1.3} /><h3>{en ? english : zh}</h3><ArrowUpRight size={23} /></a>)}</div>
      <div className="agent-note"><FileText size={20} /><p>{en ? "For people to explore. For agents to use." : "让人可以探索，也让 Agent 可以调用。"}<small>{en ? "Open structured catalog + AI Visualization Advisor Skill" : "开放的结构化目录 + AI Visualization Advisor Skill"}</small></p><a href="https://github.com/Renaissance-Mind/awesome-ai-visualization/blob/main/skills/ai-visualization-advisor/SKILL.md" target="_blank" rel="noreferrer">Advisor Skill<ArrowUpRight size={16} /></a></div>
    </section>
    <aside className="design-picker" aria-label={en ? "Homepage design previews" : "首页设计稿选择"}><span>{en ? "DESIGN" : "设计稿"}</span>{designs.map((item, i) => <button key={item} aria-pressed={design === item} onClick={() => go(href({ design: item }))}><i className={"design-dot design-dot-" + item} />{[en ? "Atlas" : "A · 纸上图谱", en ? "Cosmos" : "B · 深空星图", en ? "Studio" : "C · 创作工作台"][i]}</button>)}</aside>
  </div>;
}
