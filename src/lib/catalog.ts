import type { CatalogEntry } from "../types";

export type SortKey = "recommended" | "stars" | "updated" | "evidence" | "name";

export type Filters = {
  sourceTypes: Set<string>;
  toolForms: Set<string>;
  outputForms: Set<string>;
  dependencies: Set<string>;
  groups: Set<string>;
};

export const createEmptyFilters = (): Filters => ({
  sourceTypes: new Set(),
  toolForms: new Set(),
  outputForms: new Set(),
  dependencies: new Set(),
  groups: new Set(),
});

const includesEvery = (values: string[], selected: Set<string>) =>
  selected.size === 0 || [...selected].every((item) => values.includes(item));

export const matchesFilters = (entry: CatalogEntry, filters: Filters) =>
  includesEvery(entry.sourceTypes, filters.sourceTypes) &&
  includesEvery(entry.toolForms, filters.toolForms) &&
  includesEvery(entry.outputForms, filters.outputForms) &&
  includesEvery(entry.dependencies, filters.dependencies) &&
  (filters.groups.size === 0 || filters.groups.has(entry.readmeGroup));

export const matchesQuery = (entry: CatalogEntry, query: string) => {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return true;
  }

  const haystack = [
    entry.name,
    entry.note,
    entry.category,
    entry.surface,
    entry.license ?? "",
    ...entry.sourceTypes,
    ...entry.toolForms,
    ...entry.outputForms,
    ...entry.dependencies,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalized);
};

export const scoreEntry = (entry: CatalogEntry) => {
  const stars = Math.log10((entry.stars ?? 0) + 1) * 8;
  const evidence = Math.min(entry.docsCount + entry.examplesCount, 12);
  const openSource = entry.toolForms.includes("开源应用/框架") ? 5 : 0;
  const updated = entry.updated ? 3 : 0;

  return stars + evidence + openSource + updated;
};

export const sortEntries = (entries: CatalogEntry[], sortKey: SortKey) =>
  [...entries].sort((a, b) => {
    if (sortKey === "stars") {
      return (b.stars ?? -1) - (a.stars ?? -1);
    }

    if (sortKey === "updated") {
      return (b.updated ?? "").localeCompare(a.updated ?? "");
    }

    if (sortKey === "evidence") {
      return b.docsCount + b.examplesCount - (a.docsCount + a.examplesCount);
    }

    if (sortKey === "name") {
      return a.name.localeCompare(b.name);
    }

    return scoreEntry(b) - scoreEntry(a);
  });

export const formatNumber = (value: number) => new Intl.NumberFormat("en-US").format(value);

export const formatCompactNumber = (value: number | null) => {
  if (value === null) {
    return "n/a";
  }

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
};

export const getHostname = (url: string) => new URL(url).hostname.replace(/^www\./, "");
