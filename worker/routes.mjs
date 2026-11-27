// Every published page, by its English path. The French page is the same path under /fr/.
// The build, the sitemap and the Worker's ?lang= redirects all read this list.
export const pages = [
  '/',
  '/guilded/',
  '/cardstead/',
  '/goblin-ledger/',
  '/goblin-ledger/testers/',
  '/lantern-deck/',
  '/pied-marin/',
  '/addons/',
  '/privacy/',
  '/goldline/privacy/'
];

// The Goblin Ledger web app (one build for both languages; the app has its own language setting).
// Item links: /goblin-ledger/app/?house=<house id>&item=<item id>
export const goblinLedgerApp = '/goblin-ledger/app/';

export const french = path => path === '/' ? '/fr/' : '/fr' + path;
