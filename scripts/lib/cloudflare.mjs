import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";

const config = JSON.parse(await readFile(new URL("../../wrangler.jsonc", import.meta.url), "utf8"));
export const accountId = process.env.CLOUDFLARE_ACCOUNT_ID ?? config.account_id;

async function credentials() {
  if (process.env.CLOUDFLARE_API_TOKEN) return process.env.CLOUDFLARE_API_TOKEN;
  const directory = process.platform === "darwin"
    ? path.join(homedir(), "Library/Preferences/.wrangler")
    : path.join(process.env.XDG_CONFIG_HOME ?? path.join(homedir(), ".config"), ".wrangler");
  const profile = await readFile(path.join(directory, "config/default.toml"), "utf8");
  const token = profile.match(/^oauth_token\s*=\s*"([^"]+)"/m)?.[1];
  if (!token) throw new Error("Run Wrangler login, or provide CLOUDFLARE_API_TOKEN.");
  return token;
}

// Credentials remain in memory and are never included in logs or output files.
export async function cloudflare(endpoint, { method = "GET", body, timeout = 120000 } = {}) {
  const multipart = body instanceof FormData;
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}${endpoint}`, {
    method,
    headers: { Authorization: `Bearer ${await credentials()}`, ...(body && !multipart ? { "Content-Type": "application/json" } : {}) },
    body: body ? (multipart ? body : JSON.stringify(body)) : undefined,
    signal: AbortSignal.timeout(timeout),
  });
  const data = await response.json();
  if (!response.ok || data.success === false) {
    throw new Error(`Cloudflare ${response.status}: ${JSON.stringify(data.errors ?? data)}`);
  }
  return data.result;
}

export const runAI = (model, body) => cloudflare(`/ai/run/${model}`, { method: "POST", body });
