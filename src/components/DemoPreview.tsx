import { ExternalLink, Globe2, MonitorPlay, Video } from "lucide-react";
import type { CatalogEntry, CatalogLink } from "../types";

const getEmbedUrl = (url: string) => {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }

    if (parsed.hostname === "youtu.be") {
      return `https://www.youtube.com/embed/${parsed.pathname.replace("/", "")}`;
    }

    if (parsed.hostname.includes("loom.com") && parsed.pathname.includes("/share/")) {
      return url.replace("/share/", "/embed/");
    }

    return url;
  } catch {
    return url;
  }
};

const getPreviewMode = (link: CatalogLink) => {
  const url = link.url.toLowerCase();

  if (link.kind === "video" || url.includes("youtube.com") || url.includes("youtu.be") || url.includes("loom.com")) {
    return "video";
  }

  if (url.endsWith(".png") || url.endsWith(".jpg") || url.endsWith(".jpeg") || url.endsWith(".gif") || url.endsWith(".webp")) {
    return "image";
  }

  return "page";
};

const formatKind = (kind?: string) => {
  if (!kind) {
    return "Link";
  }

  return kind.charAt(0).toUpperCase() + kind.slice(1);
};

export function DemoBadges({ entry }: { entry: CatalogEntry }) {
  if (entry.previewLinks.length === 0) {
    return null;
  }

  const demoCount = entry.previewLinks.filter((link) => link.kind === "demo" || link.kind === "homepage").length;

  return (
    <div className="demo-badges" aria-label={`${entry.name} official demos`}>
      <span>
        <MonitorPlay size={13} />
        {demoCount || entry.previewLinks.length} live
      </span>
      <span>{entry.previewLinks.length} examples</span>
    </div>
  );
}

export function DemoPreview({
  entry,
  selectedLink,
  onSelect,
}: {
  entry: CatalogEntry;
  selectedLink: CatalogLink | undefined;
  onSelect: (link: CatalogLink) => void;
}) {
  if (entry.previewLinks.length === 0) {
    return (
      <div className="demo-preview">
        <div className="panel-kicker">
          <MonitorPlay size={15} />
          Live demo
        </div>
        <div className="demo-empty">
          <p>No official demo/example URL was captured for this entry yet.</p>
          <a href={entry.homepage ?? entry.url} target="_blank">
            <ExternalLink size={14} />
            Open official surface
          </a>
        </div>
      </div>
    );
  }

  const activeLink = selectedLink ?? entry.previewLinks[0];
  const mode = getPreviewMode(activeLink);
  const embedUrl = getEmbedUrl(activeLink.url);

  return (
    <div className="demo-preview">
      <div className="demo-preview-header">
        <div className="panel-kicker">
          {mode === "video" ? <Video size={15} /> : <MonitorPlay size={15} />}
          Live demo
        </div>
        <a href={activeLink.url} target="_blank">
          <ExternalLink size={14} />
          Open
        </a>
      </div>

      <div className="demo-frame" data-mode={mode}>
        {mode === "image" ? (
          <img src={activeLink.url} alt={activeLink.title} />
        ) : (
          <iframe
            title={`${entry.name} demo: ${activeLink.title}`}
            src={embedUrl}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        )}
      </div>

      <div className="demo-active">
        <strong>{activeLink.title}</strong>
        <span>
          <Globe2 size={12} />
          {formatKind(activeLink.kind)}
        </span>
      </div>
      <p className="demo-source">{activeLink.url}</p>

      <div className="demo-link-list" aria-label={`${entry.name} demo and example links`}>
        {entry.previewLinks.map((link) => (
          <button
            className={link.url === activeLink.url ? "is-active" : ""}
            key={link.url}
            type="button"
            onClick={() => onSelect(link)}
          >
            <span>{formatKind(link.kind)}</span>
            <strong>{link.title}</strong>
          </button>
        ))}
      </div>
    </div>
  );
}
