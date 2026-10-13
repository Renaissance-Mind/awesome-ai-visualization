export type CatalogLink = {
  kind?: string;
  title: string;
  url: string;
  source?: string;
};

export type CatalogAsset = CatalogLink & {
  kind: "image" | "gif" | "video" | string;
  thumbnailUrl?: string | null;
};

export type SignalGrowth = { baseline_at: string; interval_days: number; baseline_stars: number; stars_delta: number; forks_delta: number };
type SignalBase = { catalog_repo: string; catalog_aliases: string[]; observed_at: string };
export type RepositorySignal = SignalBase & ({ status: "unavailable"; error?: string } | {
  status: "ok"; id: string; repo: string; url: string; stars: number; forks: number;
  archived: boolean; default_branch: string | null;
  commits: Record<"7" | "30" | "60" | "90", number>;
  growth: { "7d": SignalGrowth | null; "30d": SignalGrowth | null };
  recent_commits: { oid: string; committedDate: string; messageHeadline: string; url: string }[];
  star_history?: { observed_at: string; stars: number }[];
});
export type SignalSnapshot = { schema_version: number; cutoff: string; scope: string; records: RepositorySignal[] };

export type CatalogEntry = {
  name: string;
  url: string;
  primaryUrl: string | null;
  homepage: string | null;
  category: string;
  surface: string;
  dependencies: string[];
  stars: number | null;
  activity?: RepositorySignal | null;
  license: string | null;
  updated: string | null;
  note: string;
  sourceTypes: string[];
  toolForms: string[];
  outputForms: string[];
  catalogSection: string;
  readmeGroup: string;
  docs: CatalogLink[];
  examples: CatalogLink[];
  effectAssets: CatalogAsset[];
  docsCount: number;
  examplesCount: number;
  effectAssetsCount: number;
};

export type CatalogData = {
  generatedAt: string;
  lastResearched: string;
  sourceCatalog: string;
  summary: {
    total: number;
    openSource: number;
    saas: number;
    modelApi: number;
    examples: number;
    effectAssets: number;
    docs: number;
  };
  facets: {
    sourceTypes: Record<string, number>;
    toolForms: Record<string, number>;
    outputForms: Record<string, number>;
    dependencies: Record<string, number>;
    categories: Record<string, number>;
    groups: Record<string, number>;
  };
  entries: CatalogEntry[];
};
