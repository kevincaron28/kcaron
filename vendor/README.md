# Vendored builds

`goblin-ledger/` is the Goblin Ledger web app, built from `kevincaron28/Trading-Wow` and published at
`https://kcaron.top/goblin-ledger/app/`. Current copy: Trading-Wow `main` at `df2fc15e7` (app 1.1.2).

Item links: `https://kcaron.top/goblin-ledger/app/?house=<house id>&item=<item id>` (for example `?house=113&item=22457`).
The app reads these once a build with the `?house=&item=` link support is copied in.

To update: run `npm run build` in the Trading-Wow repo, then `node scripts/sync-goblin-ledger.mjs <Trading-Wow>/dist`,
`npm test`, and commit.
