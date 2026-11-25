import { acquirePublicationLock, command } from "./lib/publication.mjs";
import { basename } from "node:path";

const [operation, ...args] = process.argv.slice(2);
if (!(operation === "deploy" && !args.length) &&
    !(operation === "prune" && args.every(arg => arg === "--dry-run"))) {
  throw new Error("Usage: publish-catalog.mjs deploy | prune [--dry-run]");
}
const lock = args.includes("--dry-run") ? undefined : await acquirePublicationLock();
if (lock === null) throw new Error("Another catalog publication is running. Retry when it finishes.");
try {
  if (operation === "deploy") {
    const cli = process.env.npm_execpath;
    const npm = args => cli && basename(cli) === "npm-cli.js"
      ? command(process.execPath, [cli, ...args])
      : command("npm", args, { shell: process.platform === "win32" });
    for (const check of ["check:frontend", "build", "check:search"]) await npm(["run", check]);
    await command(process.execPath, ["scripts/prepare-release.mjs"]);
    await npm(["exec", "--yes", "--package=wrangler@4.143.0", "--", "wrangler", "deploy"]);
    await npm(["run", "check:publication"]);
    await npm(["run", "check:search-api"]);
  }
  await command(process.execPath, ["scripts/prune-search-index.mjs", ...args]);
} finally {
  await lock?.release();
}
