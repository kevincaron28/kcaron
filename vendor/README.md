# Vendored builds

`goblin-ledger/` is the Goblin Ledger web app, built from `kevincaron28/Trading-Wow` and published at
`https://kcaron.top/goblin-ledger/app/`. Current copy: Trading-Wow `main` at `14ca51216` (recap v2 links, tester feedback).

Item links: `https://kcaron.top/goblin-ledger/app/?house=<house id>&item=<item id>` (for example `?house=113&item=22457`).
Opening such a link goes straight to that item's chart on that auction house.

To update: run `npm run build` in the Trading-Wow repo, then `node scripts/sync-goblin-ledger.mjs <Trading-Wow>/dist`,
`npm test`, and commit.
