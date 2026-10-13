import { GitCommitHorizontal, GitFork, Star } from "lucide-react";
import { activityKeys, isFresh, signalDate, visibleActivity, type ActivityKey } from "../lib/repository-signals";
import { formatCompactNumber, formatNumber } from "../lib/catalog";
import type { CatalogEntry, RepositorySignal, SignalGrowth } from "../types";

const tagLabels: Partial<Record<ActivityKey, string>> = { hot: "HOT · 正在升温", popular: "Popular", sustained: "持续维护", recent: "近期更新", archived: "已归档" };
function explanation(key: ActivityKey, signal: RepositorySignal) {
  if (signal.status !== "ok") return "动态数据暂未获取";
  const date = "。采集于 " + signalDate(signal.observed_at);
  if (key === "hot") return `约7天净增 ${formatNumber(signal.growth["7d"]!.stars_delta)} Star；基线至少100，净增至少100且增幅至少5%` + date;
  if (key === "popular") return `当前 ${formatNumber(signal.stars)} Star，达到5,000门槛` + date;
  if (key === "archived") return "GitHub 已标记此仓库为归档" + date;
  if (key === "recent") return `近7天 ${signal.commits["7"]} 次提交` + date;
  const c = signal.commits;
  return `最近三个30天窗口分别有 ${c["30"]}、${c["60"] - c["30"]}、${c["90"] - c["60"]} 次提交；每个窗口至少2次` + date;
}
export function ActivityTags({ signal, now }: { signal?: RepositorySignal | null; now?: number }) {
  return <span className="activity-tags">{visibleActivity(signal, now).map(key => <details className={"activity-tag tag-" + key} key={key}>
    <summary title={explanation(key, signal!)}>{tagLabels[key]}</summary><span className="tag-explanation">{explanation(key, signal!)}</span>
  </details>)}</span>;
}
function changeText(growth: SignalGrowth) {
  const delta = growth.stars_delta;
  const rate = growth.baseline_stars > 0 ? `（${delta >= 0 ? "+" : ""}${(delta / growth.baseline_stars * 100).toFixed(1)}%）` : "";
  return `${delta > 0 ? "+" : ""}${formatNumber(delta)}${rate}`;
}
export function ActivityMetrics({ entry, now }: { entry: CatalogEntry; now?: number }) {
  const s = entry.activity;
  if (!s) return null;
  if (s.status !== "ok") return <div className="activity-metrics muted">暂未获取动态</div>;
  const fresh = isFresh(s, now);
  return <div className="activity-metrics">
    <span title={"采集于 " + signalDate(s.observed_at)}><Star size={13} aria-hidden="true" />{formatCompactNumber(s.stars)} Star</span>
    <span><GitCommitHorizontal size={14} aria-hidden="true" />近30天 {formatNumber(s.commits["30"])} 次提交</span>
    {fresh && s.growth["7d"] && <span className="growth-metric">7天 {changeText(s.growth["7d"])} Star</span>}
    {!fresh && <span className="muted">历史快照 · {signalDate(s.observed_at)}</span>}
  </div>;
}
export function RepositoryActivity({ entry, now }: { entry: CatalogEntry; now?: number }) {
  const s = entry.activity;
  if (!s) return null;
  if (s.status !== "ok") return <section id="repository-activity" className="reading-section"><h2>项目动态</h2><p>暂未获取 GitHub 动态数据。项目维护状态待确认。</p></section>;
  const fresh = isFresh(s, now);
  const points = (s.star_history ?? []).filter(p => Number.isFinite(Date.parse(p.observed_at)) && Number.isFinite(p.stars));
  const min = Math.min(...points.map(p => p.stars)), max = Math.max(...points.map(p => p.stars));
  const start = points.length ? Date.parse(points[0].observed_at) : 0;
  const end = points.length ? Date.parse(points[points.length - 1].observed_at) : 0;
  const chart = points.map(p => `${10 + (Date.parse(p.observed_at) - start) / (end - start || 1) * 560},${100 - (p.stars - min) / (max - min || 1) * 80}`).join(" ");
  const keys = activityKeys(s, now);
  return <section id="repository-activity" className="reading-section">
    <div className="activity-section-title"><h2>项目动态</h2><ActivityTags signal={s} now={now} /></div>
    <p className="activity-observed">采集于 {signalDate(s.observed_at)} · 北京时间{!fresh && " · 数据超过72小时，展示历史快照"}</p>
    <dl className="facts signal-facts">
      <div><dt><Star size={15} aria-hidden="true" />当前 Star</dt><dd>{formatNumber(s.stars)}</dd></div>
      <div><dt><GitFork size={15} aria-hidden="true" />Fork</dt><dd>{formatNumber(s.forks)}</dd></div>
      <div><dt>维护状态</dt><dd>{s.archived ? "已归档" : !s.default_branch ? "默认分支无提交" : keys.includes("sustained") ? "持续维护" : s.commits["90"] === 0 ? "近90天无提交" : "有近期提交"}</dd></div>
      {(["7d", "30d"] as const).map(period => <div key={period}><dt>{period === "7d" ? "7天" : "30天"} Star 净增长</dt><dd>{s.growth[period] ? changeText(s.growth[period]!) : "正在积累数据"}{s.growth[period] && <small>对比 {signalDate(s.growth[period]!.baseline_at)} · 实际间隔 {s.growth[period]!.interval_days.toFixed(1)} 天</small>}</dd></div>)}
      <div><dt>默认分支提交数</dt><dd>7天 {s.commits["7"]} · 30天 {s.commits["30"]} · 90天 {s.commits["90"]}</dd></div>
    </dl>
    {points.length >= 2 && <figure className="star-trend"><figcaption>Star 趋势 · 最近 {points.length} 个观测日</figcaption>
      <svg viewBox="0 0 580 115" role="img" aria-label={`Star 从 ${points[0].stars} 变为 ${points[points.length - 1].stars}，范围 ${min} 到 ${max}`}><path d="M10 100H570" className="trend-axis" /><polyline points={chart} fill="none" className="trend-line" /></svg>
      <div><span>{signalDate(points[0].observed_at)} · {formatNumber(points[0].stars)}</span><span>{signalDate(points[points.length - 1].observed_at)} · {formatNumber(points[points.length - 1].stars)}</span></div>
      <small>纵轴范围 {formatNumber(min)}–{formatNumber(max)} Star</small>
    </figure>}
    {s.recent_commits.length > 0 && <div className="recent-commits"><h3>最近提交</h3><ul>{s.recent_commits.map(commit => <li key={commit.oid}><a href={commit.url} target="_blank" rel="noreferrer">{commit.messageHeadline}</a><span>{commit.oid.slice(0, 7)} · {signalDate(commit.committedDate)}</span></li>)}</ul></div>}
    <details className="activity-rules"><summary>标签规则与统计口径</summary><p>HOT：约7天前基线至少100 Star，净增至少100且增幅至少5%。Popular：当前至少5,000 Star。持续维护：最近三个连续30天窗口各至少2次提交。近期更新：近7天至少1次提交。已归档：GitHub 的归档标记。</p><p>提交统计包含合并、机器人和 fork 继承历史，覆盖采集时默认分支可达的提交。Star 增长为快照净差值，包含取消收藏的影响。周基线允许6–8天，月基线允许28–32天。标签衡量关注度和提交频率。</p></details>
  </section>;
}
