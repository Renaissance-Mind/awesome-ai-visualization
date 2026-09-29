import { Github, Star } from "lucide-react";
import { useState } from "react";
import { formatCompactNumber } from "../lib/catalog";
import { githubRepository } from "../lib/discovery";
import type { CatalogEntry } from "../types";

export function RepositoryBadge({ entry }: { entry: CatalogEntry }) {
  const repository = githubRepository(entry.url);
  const [state, setState] = useState<"loading" | "ready" | "failed">("loading");
  if (!repository) return null;
  const badgeUrl = "https://img.shields.io/github/stars/" + repository
    + "?style=flat-square&logo=github&label=GitHub%20Stars&labelColor=24292f&color=0053eb";
  return <a className="repository-badge" href={"https://github.com/" + repository} target="_blank" rel="noreferrer"
    aria-label={repository + " 的 GitHub 仓库与 Star 数量（新窗口）"}
    title={repository + (state === "ready" ? " · GitHub Stars" : " · Star 为目录收录时的快照，非实时") }>
    {state !== "ready" && <span className="repository-badge-fallback"><Github size={12} aria-hidden="true" /><span>GitHub</span><Star size={11} aria-hidden="true" /><span>{entry.stars === null ? "—" : formatCompactNumber(entry.stars)}</span></span>}
    {state !== "failed" && <img className={state === "ready" ? undefined : "is-loading"} src={badgeUrl}
      alt={repository + " 的 GitHub Stars 徽章"} width={148} height={20} loading="lazy" decoding="async"
      onLoad={() => setState("ready")} onError={() => setState("failed")} />}
  </a>;
}
