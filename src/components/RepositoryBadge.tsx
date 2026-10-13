import { Github } from "lucide-react";
import { githubRepository } from "../lib/discovery";
import type { CatalogEntry } from "../types";

export function RepositoryBadge({ entry }: { entry: CatalogEntry }) {
  const repository = githubRepository(entry.url);
  if (!repository) return null;
  return <a className="repository-badge" href={"https://github.com/" + repository} target="_blank" rel="noreferrer"
    aria-label={repository + " 的 GitHub 仓库（新窗口）"} title={repository}>
    <span className="repository-badge-fallback"><Github size={12} aria-hidden="true" /><span>GitHub</span></span>
  </a>;
}
