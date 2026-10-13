import manifest from "../src/data/search-manifest.generated.json";
import { topicFor } from "../src/lib/discovery";
import { MAX_QUERY_LENGTH, SEARCH_LIMIT, SEARCH_MODEL, SEARCH_INSTRUCTION } from "../src/lib/search-config";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  AI: { run(model: string, input: { queries: string[]; instruction: string }): Promise<{ data: number[][]; shape: number[] }> };
  VECTORIZE: { query(vector: number[], options: { topK: number; namespace: string; returnMetadata: "none" }): Promise<{ matches: { id: string; score: number }[] }> };
  SEARCH_RATE_LIMITER: { limit(options: { key: string }): Promise<{ success: boolean }> };
}
interface Context { waitUntil(promise: Promise<unknown>): void }

const fields = { source: "sourceTypes", form: "toolForms", output: "outputForms", runtime: "dependencies" } as const;
const entriesById = new Map(manifest.entries.map(entry => [entry.id, entry]));
const cache = () => (caches as unknown as { default: Cache }).default;
let vectorData: Float32Array | undefined;

function json(body: unknown, status = 200, extra: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...extra } });
}

function eligible(entry: typeof manifest.entries[number], params: URLSearchParams) {
  return (!params.get("topic") || params.get("topic") === "all" || topicFor(entry) === params.get("topic"))
    && (!params.get("group") || entry.readmeGroup === params.get("group"))
    && Object.entries(fields).every(([param, field]) => !params.get(param) || entry[field].includes(params.get(param)!));
}

async function key(request: Request, kind: string, value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const hash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
  return new Request(`${new URL(request.url).origin}/__catalog-cache/${manifest.version}/${kind}/${hash}`);
}

async function queryVector(request: Request, env: Env, context: Context, query: string) {
  const cacheKey = await key(request, "embedding", query);
  const cached = await cache().match(cacheKey);
  if (cached) return await cached.json() as number[];
  const result = await env.AI.run(SEARCH_MODEL, { queries: [query], instruction: SEARCH_INSTRUCTION });
  const vector = result.data?.[0];
  if (result.shape?.[1] !== manifest.dimensions || vector?.length !== manifest.dimensions || !vector.every(Number.isFinite)) {
    throw new Error("Invalid query embedding.");
  }
  const norm = Math.hypot(...vector);
  if (norm < 0.001) throw new Error("Empty query embedding.");
  const normalized = vector.map(value => value / norm);
  context.waitUntil(cache().put(cacheKey, Response.json(normalized, { headers: { "Cache-Control": "public, max-age=86400" } })));
  return normalized;
}

async function filteredRanking(request: Request, env: Env, vector: number[], params: URLSearchParams) {
  // Vectorize returns at most 100 matches. For intersecting facets, rank the
  // complete eligible subset so a globally lower-ranked match is never lost.
  if (!vectorData) {
    const response = await env.ASSETS.fetch(new Request(new URL(manifest.vectorPath, request.url)));
    if (!response.ok) throw new Error("Search vector asset is missing.");
    const data = new Float32Array(await response.arrayBuffer());
    if (data.length !== manifest.total * manifest.dimensions) throw new Error("Search vector asset version mismatch.");
    vectorData = data;
  }
  const ranked: { id: string; score: number }[] = [];
  for (let index = 0; index < manifest.entries.length; index++) {
    const entry = manifest.entries[index];
    if (!eligible(entry, params)) continue;
    let score = 0;
    for (let dim = 0; dim < manifest.dimensions; dim++) score += vector[dim] * vectorData[index * manifest.dimensions + dim];
    ranked.push({ id: entry.id, score });
  }
  return ranked.sort((a, b) => b.score - a.score).slice(0, SEARCH_LIMIT);
}

export default {
  async fetch(request: Request, env: Env, context: Context): Promise<Response> {
    const url = new URL(request.url);
    if (!url.pathname.startsWith("/api/")) return env.ASSETS.fetch(request);
    if (url.pathname === "/api/search/status" && request.method === "GET") {
      return json({ model: SEARCH_MODEL, version: manifest.version, projects: manifest.total, dimensions: manifest.dimensions });
    }
    if (url.pathname !== "/api/search") return json({ error: "接口不存在。" }, 404);
    if (!["GET", "POST"].includes(request.method)) return json({ error: "请求方式不支持。" }, 405, { Allow: "GET, POST" });
    const origin = request.headers.get("Origin");
    if (origin && origin !== url.origin) return json({ error: "请从本站发起搜索。" }, 403);
    if (Number(request.headers.get("Content-Length") ?? 0) > 8192) return json({ error: "搜索内容过长。" }, 413);
    let params = url.searchParams;
    if (request.method === "POST") {
      if (!request.headers.get("Content-Type")?.includes("application/json")) return json({ error: "请求格式不正确。" }, 415);
      const reader = request.body?.getReader();
      const chunks: Uint8Array[] = [];
      let length = 0;
      if (reader) {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          length += value.byteLength;
          if (length > 8192) { await reader.cancel(); return json({ error: "搜索内容过长。" }, 413); }
          chunks.push(value);
        }
      }
      const bytes = new Uint8Array(length);
      let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
      const text = new TextDecoder().decode(bytes);
      let body: Record<string, unknown>;
      try { body = JSON.parse(text); }
      catch { return json({ error: "请求格式不正确。" }, 400); }
      if (!body || typeof body !== "object" || Array.isArray(body) || Object.values(body).some(value => typeof value !== "string")) return json({ error: "请求格式不正确。" }, 400);
      params = new URLSearchParams(body as Record<string, string>);
    }
    const query = (params.get("q") ?? "").normalize("NFKC").trim();
    if (!query || query.length > MAX_QUERY_LENGTH) return json({ error: `请输入 1–${MAX_QUERY_LENGTH} 个字符的搜索内容。` }, 400);
    const filtered = new URLSearchParams();
    for (const field of ["topic", "group", ...Object.keys(fields)]) {
      const value = params.get(field);
      if (value && value.length <= 100) filtered.set(field, value);
      else if (value) return json({ error: "筛选条件不正确。" }, 400);
    }
    // Canonical keys let equal queries and filters reuse the same cached result.
    filtered.sort();
    try {
      const cacheKey = await key(request, "results", query + "\n" + filtered.toString());
      const cached = await cache().match(cacheKey);
      if (cached) return json(await cached.json());
      const allowed = manifest.entries.filter(entry => eligible(entry, filtered));
      if (!allowed.length) return json({ names: [], version: manifest.version, limit: SEARCH_LIMIT });
      const quota = await env.SEARCH_RATE_LIMITER.limit({ key: request.headers.get("CF-Connecting-IP") ?? "local" });
      if (!quota.success) return json({ error: "搜索较频繁，请稍后再试。" }, 429, { "Retry-After": "60" });
      const vector = await queryVector(request, env, context, query);
      const ranked = filtered.size
        ? await filteredRanking(request, env, vector, filtered)
        : (await env.VECTORIZE.query(vector, { namespace: manifest.version, topK: SEARCH_LIMIT, returnMetadata: "none" })).matches;
      if (!ranked.length && !filtered.size) throw new Error("Vectorize index is not ready.");
      const names = ranked.map(match => entriesById.get(match.id)?.name).filter((name): name is string => !!name);
      const result = { names, version: manifest.version, limit: SEARCH_LIMIT };
      context.waitUntil(cache().put(cacheKey, Response.json(result, { headers: { "Cache-Control": "public, max-age=3600" } })));
      return json(result);
    } catch (error) {
      console.error("Catalog search failed", error instanceof Error ? error.message : "Unknown error");
      return json({ error: "搜索暂时无法完成，请稍后重试。" }, 503);
    }
  },
};
