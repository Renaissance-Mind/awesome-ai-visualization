# Cloudflare deployment

The production directory is served by the `awesome-ai-visualization` Cloudflare
Worker using Static Assets. It is a static React/Vite application; no application
server, database or runtime API secret is required.

- Production: https://awesome-ai-visualization.renaissancemind.ai/
- Configuration: `wrangler.jsonc`
- Build output: `dist/`
- Deployment command: `npm run deploy:cf`

## Publish

Use an existing authorized Wrangler login for the configured Cloudflare account.
The deployment command checks the real catalog, rebuilds the frontend, then
uploads the assets with a pinned Wrangler version. Credentials are managed by
Wrangler and are never stored in this repository.

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

Source commits and Cloudflare deployments are separate actions. A Git push does
not deploy this Worker. Use `npx --yes wrangler@4.143.0 deployments list --name
awesome-ai-visualization` to inspect deployment history.

References: [Static Assets](https://developers.cloudflare.com/workers/static-assets/)
and [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).
