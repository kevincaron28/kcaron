import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { renderAddons, renderHome, renderPrivacy } from '../site/pages.mjs';
import { renderHeaders } from '../site/headers.mjs';

const output = new URL('../dist/', import.meta.url);
await rm(output, { recursive: true, force: true });
await cp(new URL('../public/', import.meta.url), output, { recursive: true });
await cp(new URL('../worker/', import.meta.url), new URL('_worker.js/', output), { recursive: true });
await writeFile(new URL('_worker.js/index.js', output), "export { default } from './index.mjs';\n");
const consent = await readFile(new URL('consent.js', output), 'utf8');
await writeFile(new URL('_headers', output), renderHeaders(consent));

const pages = [
  ['index.html', renderHome('en')],
  ['fr/index.html', renderHome('fr')],
  ['addons/index.html', renderAddons('en')],
  ['fr/addons/index.html', renderAddons('fr')],
  ['privacy/index.html', renderPrivacy('en')],
  ['fr/privacy/index.html', renderPrivacy('fr')]
];

for (const [path, html] of pages) {
  const file = new URL(path, output);
  await mkdir(new URL('.', file), { recursive: true });
  await writeFile(file, html);
}
