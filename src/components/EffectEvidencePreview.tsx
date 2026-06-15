import { ExternalLink, Film, Globe2, Image as ImageIcon, MonitorPlay, Play } from "lucide-react";
import type { CatalogAsset, CatalogEntry } from "../types";

const directVideoExtensions = [".mp4", ".webm", ".mov"];

const getEmbedUrl = (url: string) => {
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
};

const isDirectVideo = (asset: CatalogAsset) => directVideoExtensions.some((extension) => asset.url.toLowerCase().includes(extension));

const formatKind = (kind?: string) => {
  if (!kind) {
    return "Asset";
  }

  return kind.charAt(0).toUpperCase() + kind.slice(1);
};

export function EffectEvidenceBadges({ entry }: { entry: CatalogEntry }) {
  if (entry.effectAssets.length === 0) {
    return null;
  }

  const visualCount = entry.effectAssets.filter((asset) => asset.kind === "image" || asset.kind === "gif").length;
  const videoCount = entry.effectAssets.filter((asset) => asset.kind === "video").length;

  return (
    <div className="evidence-badges" aria-label={`${entry.name} official effect assets`}>
      <span>
        <ImageIcon size={13} />
        {visualCount || entry.effectAssets.length} visuals
      </span>
      {videoCount > 0 ? (
        <span>
          <Film size={13} />
          {videoCount} videos
        </span>
      ) : null}
    </div>
  );
}

export function EffectEvidencePreview({
  entry,
  selectedAsset,
  onSelect,
}: {
  entry: CatalogEntry;
  selectedAsset: CatalogAsset | undefined;
  onSelect: (asset: CatalogAsset) => void;
}) {
  if (entry.effectAssets.length === 0) {
    return (
      <div className="evidence-preview">
        <div className="panel-kicker">
          <ImageIcon size={15} />
          Official effect evidence
        </div>
        <div className="evidence-empty">
          <p>No official effect image, GIF, or video asset was captured for this entry yet.</p>
          <a href={entry.homepage ?? entry.url} target="_blank">
            <ExternalLink size={14} />
            Open official surface
          </a>
        </div>
      </div>
    );
  }

  const activeAsset = selectedAsset ?? entry.effectAssets[0];
  const showVideoFrame = activeAsset.kind === "video" && !activeAsset.thumbnailUrl && !isDirectVideo(activeAsset);
  const sourceUrl = activeAsset.source ?? entry.homepage ?? entry.url;

  return (
    <div className="evidence-preview">
      <div className="evidence-preview-header">
        <div className="panel-kicker">
          {activeAsset.kind === "video" ? <Film size={15} /> : <ImageIcon size={15} />}
          Official effect evidence
        </div>
        <div className="evidence-actions">
          <a href={sourceUrl} target="_blank">
            <Globe2 size={14} />
            Source
          </a>
          <a href={activeAsset.url} target="_blank">
            <ExternalLink size={14} />
            Asset
          </a>
        </div>
      </div>

      <div className="evidence-frame" data-kind={activeAsset.kind}>
        {isDirectVideo(activeAsset) ? (
          <video controls muted playsInline poster={activeAsset.thumbnailUrl ?? undefined} src={activeAsset.url} />
        ) : showVideoFrame ? (
          <iframe
            title={`${entry.name} official video: ${activeAsset.title}`}
            src={getEmbedUrl(activeAsset.url)}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-presentation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        ) : (
          <div className="evidence-image-wrap">
            <img src={activeAsset.thumbnailUrl ?? activeAsset.url} alt={activeAsset.title} />
            {activeAsset.kind === "video" ? (
              <span className="video-overlay">
                <Play size={15} fill="currentColor" />
                Video evidence
              </span>
            ) : null}
          </div>
        )}
      </div>

      <div className="evidence-active">
        <strong>{activeAsset.title}</strong>
        <span>
          <MonitorPlay size={12} />
          {formatKind(activeAsset.kind)}
        </span>
      </div>
      <p className="evidence-source">{activeAsset.url}</p>

      <div className="evidence-asset-list" aria-label={`${entry.name} official effect assets`}>
        {entry.effectAssets.map((asset) => (
          <button
            className={asset.url === activeAsset.url ? "is-active" : ""}
            key={asset.url}
            type="button"
            onClick={() => onSelect(asset)}
          >
            <span>{formatKind(asset.kind)}</span>
            <strong>{asset.title}</strong>
          </button>
        ))}
      </div>
    </div>
  );
}
