import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { renderPage } from '../site/pages.mjs';
import { appHeaders, publicHeaders } from '../site/headers.mjs';
import { origin } from '../site/content.mjs';
import { french, goblinLedgerApp, pages } from '../worker/routes.mjs';

const output = new URL('../dist/', import.meta.url);
await rm(output, { recursive: true, force: true });
await cp(new URL('../public/', import.meta.url), output, { recursive: true });
await cp(new URL('../worker/', import.meta.url), new URL('_worker.js/', output), { recursive: true });
// The Goblin Ledger web app, built in the wow-trading repo and copied in by scripts/sync-goblin-ledger.mjs.
await cp(new URL('../vendor/goblin-ledger/', import.meta.url), new URL(goblinLedgerApp.slice(1), output), { recursive: true });

const consent = await readFile(new URL('consent.js', output), 'utf8');
const headers = { site: publicHeaders(consent), app: appHeaders() };
await writeFile(new URL('_worker.js/index.js', output), `import { createSite } from './index.mjs';\nexport default createSite(${JSON.stringify(headers, null, 2)});\n`);

for (const path of pages) {
  for (const lang of ['en', 'fr']) {
    const file = new URL((lang === 'fr' ? french(path) : path).slice(1) + 'index.html', output);
    await mkdir(new URL('.', file), { recursive: true });
    await writeFile(file, renderPage(path, lang));
  }
}

const urls = pages.flatMap(path => [path, french(path)]).map(path => `  <url><loc>${origin}${path}</loc></url>`);
urls.push(`  <url><loc>${origin}${goblinLedgerApp}</loc></url>`);
await writeFile(new URL('sitemap.xml', output), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
