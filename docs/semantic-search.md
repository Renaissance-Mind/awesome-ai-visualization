# Semantic project search

The directory searches project capabilities with Cloudflare Workers AI's
`@cf/qwen/qwen3-embedding-0.6b`. Search results retain the embedding ranking and
do not expose similarity scores. Browsing without a query keeps the existing
editorial and alternative sort orders.

## Project explanations

`data/project-profiles.json` contains one explanation per canonical catalog
entry. Each records its name, URL, Chinese summary, explanation, concrete use
cases, input materials, outputs, tool form, requirements, original English
description, and source URLs. The source hash ties the explanation to the
catalog and the official descriptions previously collected in
`data/tool-research.yml`.

The explanation prose is generated only from the original functional
description and collected official page descriptions, using Cloudflare's
hosted text-generation models recorded on each profile. Input/output/runtime tags are retained separately; they
are not combined into undocumented capabilities. These are assisted summaries of the collected source snapshot,
not independent verification of every project's current capabilities. Original
descriptions and URLs remain available for review. The generator rejects
missing projects, changed names, truncated output, and malformed responses;
completed batches are checkpointed so interrupted work can resume.

The embedding document combines the explanation, use cases, original
description and structured input/output/runtime tags. Documents use the
model's `documents` input; queries use its `queries` input with a fixed software
retrieval instruction. Both sides use 1024 dimensions and normalized vectors.

## Request flow

1. The browser waits for a pause in typing, then submits the query and selected
   filters to the same-origin `/api/search` endpoint. No model or API credential
   is sent to the browser.
2. The Worker normalizes and bounds the query, applies a request rate limit,
   and calls Workers AI. Repeated query vectors are cached for 24 hours.
3. Unfiltered queries search the matching version namespace in Vectorize,
   returning at most 100 nearest projects. The public response contains ordered
   project names, the index version and the result limit, without scores.
4. Selected topics and facets are applied before taking the top results. Since
   Vectorize can return at most 100 results without metadata, the Worker ranks
   the entire eligible subset against the same precomputed Float32 vectors.
   This avoids losing a relevant tool merely because it was outside the global
   top 100 before filtering. The versioned vector file is a static asset,
   loaded once per Worker isolate.
5. Identical results are cached for one hour. The frontend also retains a
   bounded result cache, cancels superseded requests, and preserves ordering
   through incremental loading and detail-page navigation. An unavailable
   search displays a retry action.

Search sends user query text to Cloudflare. It does not run a browser model.
The Worker does not log query text. Cache URLs use hashes rather than the query
itself. Caches are bound to the complete dataset and search instruction version.

## Updating the index

Use the existing Wrangler authorization for the account in `wrangler.jsonc`,
or provide `CLOUDFLARE_API_TOKEN` with Workers AI and Vectorize permissions.
Credentials are read in memory and never written into project outputs.

```sh
npm run generate:profiles
npm run sync:search
npm run check:search
npm run deploy:cf
```

The deployment command repeats the index readiness check after building, so a
new catalog version cannot go live before its matching vectors are indexed.

The profile generator only regenerates changed source records. Embedding
checkpoints under `.wrangler/catalog-search/` reuse unchanged document vectors.
Keep that directory between updates to avoid recomputing unchanged embeddings.
The build refuses missing or stale explanations. A changed query instruction,
document, filter classification or model creates a new index version.

Vector IDs include their version, and each version has its own Vectorize
namespace. Index updates therefore leave the currently deployed site's
namespace intact. Complete ingestion and check every new vector ID before
deploying the matching site. Prior namespaces can be retained for rollback;
delete their vector IDs only after confirming they are no longer deployed.

`npm run check:search` checks profile coverage, source retention, vector
dimensions and normalization, verifies every remote vector ID, and runs real
Chinese capability searches plus an exact project-name query. These retrieval
cases are regression checks, not a comprehensive relevance benchmark.
`/api/search/status` reports the deployed model, version and project count.
`npm run check:search-api -- https://your-preview.workers.dev` checks the real
HTTP endpoint, intersecting facets, request validation, hidden scores and the
uploaded vector asset checksum.

For development, build the assets once with `npm run build`, start
`npm run dev:api`, then run `npm run dev` in another terminal. Vite forwards
`/api` requests to the Worker at port 8787; the remote Worker uses the real
Cloudflare AI and vector bindings.

## Cloudflare resources

- Worker: `awesome-ai-visualization`
- Model binding: `AI`
- Vectorize index: `awesome-ai-catalog-qwen3`, 1024 dimensions, cosine metric
- Static assets binding: `ASSETS`
- Search limit: 500 characters, 100 results
- Uncached request limit: 30 requests per 60 seconds per IP at each Cloudflare
  location, enforced by the Workers rate-limiting binding

No public endpoint changes the index. Index writes run through the authorized
maintenance scripts. Search returns catalog project identifiers; the frontend
resolves them against its bundled catalog.

References: [Qwen model API](https://developers.cloudflare.com/workers-ai/models/qwen3-embedding-0.6b/),
[Vectorize limits](https://developers.cloudflare.com/vectorize/platform/limits/),
[Worker-first API routing](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/).
