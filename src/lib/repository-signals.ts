import type { CatalogEntry, RepositorySignal, SignalSnapshot } from "../types";

export const SIGNAL_MAX_AGE = 72 * 60 * 60 * 1000;
export const activityOptions = [
  { key: "", label: "全部动态" }, { key: "hot", label: "正在升温" },
  { key: "popular", label: "热门项目" }, { key: "sustained", label: "持续维护" },
  { key: "recent", label: "近期更新" }, { key: "month", label: "近30天更新" },
  { key: "quiet", label: "近90天无提交" }, { key: "archived", label: "已归档" },
] as const;
export type ActivityKey = typeof activityOptions[number]["key"];
export const validActivity = (value: string | null): ActivityKey => activityOptions.find(option => option.key === value)?.key ?? "";
export function isFresh(signal: RepositorySignal, now = Date.now()) {
  const age = now - Date.parse(signal.observed_at);
  return Number.isFinite(age) && age >= -60000 && age <= SIGNAL_MAX_AGE;
}
export function activityKeys(signal: RepositorySignal | null | undefined, now = Date.now()): ActivityKey[] {
  if (!signal || signal.status !== "ok" || !isFresh(signal, now)) return [];
  if (signal.archived) return ["archived"];
  const keys: ActivityKey[] = [];
  const week = signal.growth["7d"];
  if (week && week.interval_days >= 6 && week.interval_days <= 8 && week.baseline_stars >= 100
      && week.stars_delta >= 100 && week.stars_delta >= week.baseline_stars * .05) keys.push("hot");
  if (signal.stars >= 5000) keys.push("popular");
  if (signal.default_branch) {
    const count = signal.commits;
    if (Math.min(count["30"], count["60"] - count["30"], count["90"] - count["60"]) >= 2) keys.push("sustained");
    if (count["7"] > 0) keys.push("recent");
    if (count["30"] > 0) keys.push("month");
    if (count["90"] === 0) keys.push("quiet");
  }
  return keys;
}
export function visibleActivity(signal: RepositorySignal | null | undefined, now = Date.now()): ActivityKey[] {
  const keys = activityKeys(signal, now);
  if (keys.includes("archived")) return ["archived"];
  return [keys.includes("hot") ? "hot" : keys.includes("popular") ? "popular" : null,
    keys.includes("sustained") ? "sustained" : keys.includes("recent") ? "recent" : null].filter((key): key is ActivityKey => key !== null);
}
export function observedStars(entry: CatalogEntry) {
  return entry.activity?.status === "ok" ? entry.activity.stars : null;
}
export function signalIndex(snapshot: SignalSnapshot) {
  const index = new Map<string, RepositorySignal>();
  for (const signal of snapshot.records) {
    for (const alias of signal.catalog_aliases ?? [signal.catalog_repo]) index.set(alias.toLowerCase(), signal);
  }
  return index;
}
export function signalDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", { timeZone: "Asia/Shanghai", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}
export function decodeSnapshot(value: unknown): SignalSnapshot {
  const data = value as SignalSnapshot;
  if (data?.schema_version !== 1 || data.scope !== "catalog" || !Number.isFinite(Date.parse(data.cutoff)) || !Array.isArray(data.records)
      || !data.records.every(row => typeof row.catalog_repo === "string" && Array.isArray(row.catalog_aliases)
        && row.catalog_aliases.every(alias => typeof alias === "string") && Number.isFinite(Date.parse(row.observed_at))
        && (row.status === "unavailable" || (row.status === "ok" && Number.isInteger(row.stars) && row.stars >= 0
          && Number.isInteger(row.forks) && row.forks >= 0 && typeof row.archived === "boolean"
          && ["7", "30", "60", "90"].every(days => Number.isInteger(row.commits?.[days as "7"]) && row.commits[days as "7"] >= 0)
          && row.commits["7"] <= row.commits["30"] && row.commits["30"] <= row.commits["60"] && row.commits["60"] <= row.commits["90"]
          && !!row.growth && ["7d", "30d"].every(period => {
            const growth = row.growth[period as "7d"];
            return growth === null || (Number.isFinite(growth?.stars_delta) && Number.isFinite(growth?.interval_days) && Number.isFinite(growth?.baseline_stars));
          }) && Array.isArray(row.recent_commits))))) throw new Error("Invalid repository signal snapshot");
  return data;
}
