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

export type CatalogEntry = {
  name: string;
  url: string;
  primaryUrl: string | null;
  homepage: string | null;
  category: string;
  surface: string;
  dependencies: string[];
  stars: number | null;
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
