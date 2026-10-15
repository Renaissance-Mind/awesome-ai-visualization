# Cloudflare deployment

The production directory is served by the `awesome-ai-visualization` Cloudflare
Worker using Static Assets. The React/Vite application uses a Worker API for
semantic search, Workers AI for query embeddings, and Vectorize for its project
index. Bindings connect these services without a runtime API secret.

- Production: https://awesome-ai-visualization.renaissancemind.ai/
- Configuration: `wrangler.jsonc`
- Build output: `dist/`
- Deployment command: `npm run deploy:cf`

## Automatic publication

The catalog research heartbeat publishes after updates. An hourly publication
heartbeat checks main, updates charts once per Shanghai calendar month, retries
failures and verifies the deployed site. See [Automated publication](publication-automation.md)
for its local runtime, schedule, recovery and notification behavior.

## Publish

Use an existing authorized Wrangler login for the configured Cloudflare account.
The deployment command checks the real catalog, rebuilds the frontend, verifies
that every matching vector is indexed and checks retrieval, then
uploads the assets with a pinned Wrangler version. Credentials are managed by
Wrangler and are never stored in this repository.

Before deploying changed catalog content, regenerate its explanations and sync
the matching search index. See [Semantic search](semantic-search.md) for the
source and index maintenance workflow. `npm run check:search` verifies the
indexed version before it becomes the deployed version.

Cloudflare's Worker Custom Domain provisions the hostname and its certificate.
The deployment targets only this Worker and exact hostname. It does not deploy
or configure the other applications in the account.

To validate the deployment configuration without publishing:

```sh
npm run build
npx --yes wrangler@4.143.0 deploy --dry-run
```

## Verify

1. Check the production URL and a detail URL such as `/?tool=Graphify`.
2. Compare the JavaScript and CSS assets referenced by the live HTML with
   `dist/index.html`; compare their hashes when proving an exact deployment.
3. Check an official local preview under `/catalog-previews/`.
4. Open the production site in a browser and verify search, title badges and
   automatic loading in batches of 20.
5. Verify `/api/search/status` and a natural-language search such as
   “把代码库和文档转换成可以探索的知识图谱”. Confirm that searches retain
   relevance order, filters work, and detail pages show the project explanation.

Source commits and Cloudflare deployments are separate actions. A Git push alone does
not deploy this Worker; the publication heartbeat detects and deploys pending commits. Use `npx --yes wrangler@4.143.0 deployments list --name
awesome-ai-visualization` to inspect deployment history.

References: [Static Assets](https://developers.cloudflare.com/workers/static-assets/)
and [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).
