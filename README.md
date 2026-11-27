# K Caron Projects

Independent portfolio for [kcaron.top](https://kcaron.top/). English lives at `/` and Québec French at `/fr/`. Both homepages and addon catalogs are generated from the same templates and project data.

`npm run build` renders the site to `dist/`. Serve that directory at the web root for a public preview. Use Node 24 and `npm test` to check the generated site and Worker routing.

Each product has its own page (EN and FR) with screenshots, features, install steps and usage guides. Edit products in `site/products.mjs`, site wording and privacy text in `site/content.mjs`, and the page list in `worker/routes.mjs` (the build, sitemap and `?lang=` redirects all read it). Styles are in `public/portfolio.css`. Screenshots in `public/assets/products/` are real captures from the apps, their store listings and the live websites, saved as WebP.

The Goblin Ledger web app is served at `/goblin-ledger/app/` from the build in `vendor/goblin-ledger/` (see `vendor/README.md` to update it). It gets its own Content-Security-Policy, without ads.

## Cloudflare Pages preview and cutover

1. Create the Pages project `kcaron` in the existing Cloudflare account, with GitHub repo `kevincaron28/kcaron`, production branch `main`, build command `npm run build`, output `dist`, and Node 24. For Direct Upload, run `npm test` and `npx wrangler pages deploy dist --project-name=kcaron --branch=main` after creating the Pages project. The build emits the advanced-mode Pages Function under `dist/_worker.js/`.
2. Use the existing `OWNER_RESOURCES` KV binding and configure the Pages project's `OWNER_ACCESS_ISSUER`, `OWNER_ACCESS_AUD` and `OWNER_EMAIL` from the current owner setup. Keep the Cloudflare Access application protecting both `/owner` and `/owner/*` on the apex host. Private bytes stay in KV. Preview hosts reject owner requests.
3. Verify the `pages.dev` deployment for both languages, ads.txt, consent, privacy, support redirect, robots and sitemap. Kevin handles the custom-domain transfer of `kcaron.top` and `www.kcaron.top` and Search Console. On the live domain, also verify both languages, `?lang=fr`, the `www` redirect, verification and a signed-in owner download. In a signed-out session, confirm the owner index and direct download are blocked.
4. Leave `guilded.kcaron.top`, `bot.kcaron.top`, `dl.kcaron.top` and the Search Console DNS TXT record in place. Remove the old creator build and route wiring from Guilded only after both deployments pass. To roll back, reassign the two creator hostnames to the existing Guilded Worker.

Google requires a certified CMP for personalised AdSense in the EEA, UK and Switzerland. Confirm regional ad settings in AdSense before enabling Auto ads.
