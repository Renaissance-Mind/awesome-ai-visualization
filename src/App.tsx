import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  ExternalLink,
  Github,
  Globe2,
  Layers3,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { EffectEvidenceBadges, EffectEvidencePreview } from "./components/EffectEvidencePreview";
import rawCatalog from "./data/catalog.generated.json";
import {
  createEmptyFilters,
  formatCompactNumber,
  formatNumber,
  getHostname,
  matchesFilters,
  matchesQuery,
  sortEntries,
  type Filters,
  type SortKey,
} from "./lib/catalog";
import { categoryLabels, groupLabels, labelFor } from "./lib/labels";
import type { CatalogAsset, CatalogData, CatalogEntry } from "./types";

const catalog = rawCatalog as CatalogData;

type FacetKey = keyof Filters;

const filterSections: Array<{
  key: FacetKey;
  title: string;
  source: keyof CatalogData["facets"];
  limit: number;
}> = [
  { key: "groups", title: "Catalog area", source: "groups", limit: 11 },
  { key: "sourceTypes", title: "Information source", source: "sourceTypes", limit: 12 },
  { key: "toolForms", title: "Tool form", source: "toolForms", limit: 10 },
  { key: "outputForms", title: "Output artifact", source: "outputForms", limit: 12 },
  { key: "dependencies", title: "Runtime needs", source: "dependencies", limit: 12 },
];

const sortOptions: Array<{ key: SortKey; label: string }> = [
  { key: "recommended", label: "Recommended" },
  { key: "stars", label: "Stars" },
  { key: "updated", label: "Fresh" },
  { key: "evidence", label: "Evidence" },
  { key: "name", label: "A-Z" },
];

const readmeLinks = [
  { label: "EN", href: "README.md" },
  { label: "简", href: "README.zh-CN.md" },
  { label: "繁", href: "README.zh-TW.md" },
  { label: "JA", href: "README.ja.md" },
  { label: "KO", href: "README.ko.md" },
  { label: "ES", href: "README.es.md" },
];

const toggleFilter = (filters: Filters, key: FacetKey, value: string) => {
  const next = {
    sourceTypes: new Set(filters.sourceTypes),
    toolForms: new Set(filters.toolForms),
    outputForms: new Set(filters.outputForms),
    dependencies: new Set(filters.dependencies),
    groups: new Set(filters.groups),
  };

  if (next[key].has(value)) {
    next[key].delete(value);
  } else {
    next[key].add(value);
  }

  return next;
};

const getActiveFilterCount = (filters: Filters) =>
  Object.values(filters).reduce((total, values) => total + values.size, 0);

const getFacetRows = (facets: Record<string, number>, limit: number) =>
  Object.entries(facets)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);

const getSelectedSummary = (entry: CatalogEntry) => [
  {
    label: "Sources",
    values: entry.sourceTypes,
  },
  {
    label: "Tool",
    values: entry.toolForms,
  },
  {
    label: "Artifacts",
    values: entry.outputForms,
  },
];

export function App() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(() => createEmptyFilters());
  const [sortKey, setSortKey] = useState<SortKey>("recommended");
  const [selectedName, setSelectedName] = useState("");
  const [selectedAssetUrl, setSelectedAssetUrl] = useState("");

  const activeFilterCount = getActiveFilterCount(filters);

  const filteredEntries = useMemo(() => {
    const matches = catalog.entries.filter(
      (entry) => matchesQuery(entry, query) && matchesFilters(entry, filters),
    );

    return sortEntries(matches, sortKey);
  }, [filters, query, sortKey]);

  useEffect(() => {
    if (!filteredEntries.some((entry) => entry.name === selectedName)) {
      setSelectedName(filteredEntries[0]?.name ?? "");
    }
  }, [filteredEntries, selectedName]);

  const selectedEntry =
    filteredEntries.find((entry) => entry.name === selectedName) ?? filteredEntries[0] ?? catalog.entries[0];

  const selectedEffectAsset =
    selectedEntry.effectAssets.find((asset) => asset.url === selectedAssetUrl) ?? selectedEntry.effectAssets[0];

  useEffect(() => {
    setSelectedAssetUrl(selectedEntry.effectAssets[0]?.url ?? "");
  }, [selectedEntry.name]);

  const visibleCategoryRows = useMemo(() => {
    const counts = filteredEntries.reduce<Record<string, number>>((acc, entry) => {
      acc[entry.category] = (acc[entry.category] ?? 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7);
  }, [filteredEntries]);

  const maxCategoryCount = Math.max(...visibleCategoryRows.map(([, count]) => count), 1);

  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="README.md" aria-label="Open README">
          <span className="brand-mark">
            <Layers3 size={18} strokeWidth={2.2} />
          </span>
          <span>
            <strong>Awesome AI Visualization</strong>
            <small>Open Design catalog interface</small>
          </span>
        </a>

        <nav className="topnav" aria-label="Repository navigation">
          <a href="data/catalog.yml">Data</a>
          <a href="skills/ai-visualization-advisor/SKILL.md">Advisor skill</a>
          <a href="https://github.com/Renaissance-Mind/awesome-ai-visualization" target="_blank">
            <Github size={16} />
            GitHub
          </a>
        </nav>

        <div className="language-row" aria-label="README languages">
          {readmeLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </header>

      <main className="workspace">
        <aside className="filter-rail" aria-label="Catalog filters">
          <div className="rail-header">
            <span>
              <SlidersHorizontal size={16} />
              Filters
            </span>
            <button className="icon-button" type="button" onClick={() => setFilters(createEmptyFilters())}>
              <RotateCcw size={15} />
              <span className="sr-only">Reset filters</span>
            </button>
          </div>

          {filterSections.map((section) => (
            <section className="filter-section" key={section.key}>
              <h2>{section.title}</h2>
              <div className="filter-list">
                {getFacetRows(catalog.facets[section.source], section.limit).map(([value, count]) => {
                  const checked = filters[section.key].has(value);

                  return (
                    <button
                      className={`filter-option ${checked ? "is-active" : ""}`}
                      key={value}
                      type="button"
                      onClick={() => setFilters((current) => toggleFilter(current, section.key, value))}
                    >
                      <span className="check-box">{checked ? <Check size={12} /> : null}</span>
                      <span>{section.key === "groups" ? groupLabels[value] ?? value : labelFor(value)}</span>
                      <em>{count}</em>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </aside>

        <section className="results-panel" aria-label="Catalog results">
          <div className="search-strip">
            <div className="search-box">
              <Search size={19} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search tools, outputs, runtimes, notes..."
              />
            </div>
            <div className="status-chip">
              {formatNumber(filteredEntries.length)} shown
              {activeFilterCount > 0 ? ` · ${activeFilterCount} filters` : ""}
            </div>
          </div>

          <section className="metric-strip" aria-label="Catalog statistics">
            <Metric label="Tools" value={formatNumber(catalog.summary.total)} />
            <Metric label="Open source" value={formatNumber(catalog.summary.openSource)} accent="blue" />
            <Metric label="SaaS" value={formatNumber(catalog.summary.saas)} accent="green" />
            <Metric label="Model API" value={formatNumber(catalog.summary.modelApi)} />
            <Metric label="Effect assets" value={formatNumber(catalog.summary.effectAssets)} />
          </section>

          <div className="control-row">
            <div className="sort-tabs" role="tablist" aria-label="Sort tools">
              {sortOptions.map((option) => (
                <button
                  key={option.key}
                  className={sortKey === option.key ? "is-active" : ""}
                  type="button"
                  onClick={() => setSortKey(option.key)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p>
              Last researched <strong>{catalog.lastResearched}</strong>
            </p>
          </div>

          <div className="tool-list">
            {filteredEntries.map((entry, index) => (
              <ToolRow
                entry={entry}
                index={index}
                key={entry.name}
                selected={entry.name === selectedEntry.name}
                onSelect={() => setSelectedName(entry.name)}
              />
            ))}
          </div>
        </section>

        <aside className="insight-panel" aria-label="Catalog insights">
          <section className="insight-block">
            <EffectEvidencePreview
              entry={selectedEntry}
              selectedAsset={selectedEffectAsset}
              onSelect={(asset: CatalogAsset) => setSelectedAssetUrl(asset.url)}
            />
          </section>

          <section className="insight-block selected-detail">
            <div className="panel-kicker">
              <Sparkles size={15} />
              Selected tool
            </div>
            <h2>{selectedEntry.name}</h2>
            <p>{selectedEntry.note}</p>
            <div className="detail-actions">
              <a href={selectedEntry.url} target="_blank">
                <Github size={15} />
                Source
              </a>
              {selectedEntry.homepage ? (
                <a href={selectedEntry.homepage} target="_blank">
                  <Globe2 size={15} />
                  Homepage
                </a>
              ) : null}
            </div>

            <div className="flow-map" aria-label="Source to artifact map">
              {getSelectedSummary(selectedEntry).map((step, index) => (
                <div className="flow-step" key={step.label}>
                  <span>{step.label}</span>
                  <strong>{step.values.slice(0, 2).map(labelFor).join(" / ")}</strong>
                  {index < 2 ? <ArrowRight size={16} /> : null}
                </div>
              ))}
            </div>

            <dl className="metadata-grid">
              <div>
                <dt>Stars</dt>
                <dd>{formatCompactNumber(selectedEntry.stars)}</dd>
              </div>
              <div>
                <dt>License</dt>
                <dd>{selectedEntry.license ?? "n/a"}</dd>
              </div>
              <div>
                <dt>Docs</dt>
                <dd>{selectedEntry.docsCount}</dd>
              </div>
              <div>
                <dt>Assets</dt>
                <dd>{selectedEntry.effectAssetsCount}</dd>
              </div>
            </dl>
          </section>

          <section className="insight-block">
            <div className="panel-kicker">
              <BookOpen size={15} />
              Evidence links
            </div>
            <LinkStack title="Docs" links={selectedEntry.docs} />
            <LinkStack title="Examples" links={selectedEntry.examples} />
          </section>

          <section className="insight-block">
            <div className="panel-kicker">
              <Layers3 size={15} />
              Result mix
            </div>
            <div className="bar-list">
              {visibleCategoryRows.map(([category, count]) => (
                <button
                  type="button"
                  key={category}
                  className="bar-row"
                  onClick={() =>
                    setFilters((current) => ({
                      ...current,
                      groups: new Set(
                        catalog.entries
                          .filter((entry) => entry.category === category)
                          .map((entry) => entry.readmeGroup),
                      ),
                    }))
                  }
                >
                  <span>{categoryLabels[category] ?? category}</span>
                  <strong>{count}</strong>
                  <i style={{ inlineSize: `${(count / maxCategoryCount) * 100}%` }} />
                </button>
              ))}
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
}

function Metric({
  label,
  value,
  accent = "dark",
}: {
  label: string;
  value: string;
  accent?: "dark" | "blue" | "green";
}) {
  return (
    <div className={`metric metric-${accent}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ToolRow({
  entry,
  index,
  selected,
  onSelect,
}: {
  entry: CatalogEntry;
  index: number;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <article className={`tool-row ${selected ? "is-selected" : ""}`}>
      <button className="tool-main" type="button" onClick={onSelect}>
        <span className="rank">{String(index + 1).padStart(2, "0")}</span>
        <span className="tool-copy">
          <span className="tool-heading">
            <strong>{entry.name}</strong>
            <em>{categoryLabels[entry.category] ?? entry.category}</em>
          </span>
          <span className="tool-note">{entry.note}</span>
          <EffectEvidenceBadges entry={entry} />
          <span className="tag-row">
            {[...entry.sourceTypes, ...entry.toolForms, ...entry.outputForms].slice(0, 5).map((tag) => (
              <span key={tag}>{labelFor(tag)}</span>
            ))}
          </span>
        </span>
        <span className="tool-meta">
          <span>
            <Star size={14} />
            {formatCompactNumber(entry.stars)}
          </span>
          <span>{entry.license ?? "n/a"}</span>
          <span>{entry.updated ?? "unknown"}</span>
        </span>
        <ChevronRight size={18} />
      </button>

      <div className="quick-links">
        <a href={entry.url} target="_blank" aria-label={`${entry.name} source`}>
          <ExternalLink size={14} />
          {getHostname(entry.url)}
        </a>
        {entry.homepage ? (
          <a href={entry.homepage} target="_blank" aria-label={`${entry.name} homepage`}>
            <Globe2 size={14} />
            Homepage
          </a>
        ) : null}
      </div>
    </article>
  );
}

function LinkStack({ title, links }: { title: string; links: CatalogEntry["docs"] }) {
  if (links.length === 0) {
    return (
      <div className="link-stack">
        <h3>{title}</h3>
        <p className="empty-note">No official links captured yet.</p>
      </div>
    );
  }

  return (
    <div className="link-stack">
      <h3>{title}</h3>
      {links.map((link) => (
        <a href={link.url} target="_blank" key={`${title}-${link.url}`}>
          <span>{link.title}</span>
          <ExternalLink size={13} />
        </a>
      ))}
    </div>
  );
}
