import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import worker from '../worker/index.mjs';

const dist = new URL('../dist/', import.meta.url);
const routes = [
  ['/', 'en-CA', '/fr/'],
  ['/fr/', 'fr-CA', '/'],
  ['/addons/', 'en-CA', '/fr/addons/'],
  ['/fr/addons/', 'fr-CA', '/addons/'],
  ['/privacy/', 'en-CA', '/fr/privacy/'],
  ['/fr/privacy/', 'fr-CA', '/privacy/']
];

test('all published pages resolve assets, links, section anchors and their translated counterpart', async () => {
  for (const [path, lang, alternate] of routes) {
    const html = await page(path);
    assert.match(html, new RegExp(`<html lang="${lang}">`));
    assert.equal((html.match(/<h1>/g) ?? []).length, 1);
    assert.ok(html.includes(`rel="canonical" href="https://kcaron.top${path}"`));
    assert.ok(html.includes(`href="https://kcaron.top${alternate}"`));
    assert.doesNotMatch(html, /\{\{GUILDED_VERSION\}\}|guilded\.kcaron\.top|googlesyndication\.com/);
    if (path.endsWith('/privacy/')) assert.doesNotMatch(html, /<script/);
    else assert.ok(html.includes('<script src="/consent.js" defer></script>'));

    for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (!value.startsWith('/') && !value.startsWith('#')) continue;
      const [target, anchor] = value.split('#');
      const file = target || path;
      if (anchor) assert.ok((await page(file)).includes(`id="${anchor}"`), value);
      else if (file.endsWith('/')) await page(file);
      else await access(new URL(file.slice(1), dist));
    }
  }
  for (const lang of ['en', 'fr']) {
    const html = await page(lang === 'fr' ? '/fr/addons/' : '/addons/');
    assert.equal((html.match(/https:\/\/www\.curseforge\.com\/wow\/addons\//g) ?? []).length, 10);
  }
});

test('legacy URLs and www redirect to their canonical page', async () => {
  const cases = [
    ['https://kcaron.top/?lang=fr&ref=discord', 'https://kcaron.top/fr/?ref=discord'],
    ['https://kcaron.top/creator/?lang=fr', 'https://kcaron.top/fr/'],
    ['https://kcaron.top/creator/index.html', 'https://kcaron.top/'],
    ['https://www.kcaron.top/?lang=fr', 'https://kcaron.top/fr/'],
    ['https://kcaron.top/fr/addons/?lang=en', 'https://kcaron.top/addons/']
  ];
  for (const [from, to] of cases) {
    const response = await worker.fetch(new Request(from), {});
    assert.equal(response.status, 308);
    assert.equal(response.headers.get('location'), to);
  }
  assert.equal((await worker.fetch(new Request('https://kcaron.top/support/'), {})).headers.get('location'), 'https://ko-fi.com/wowguilded');
  assert.equal((await worker.fetch(new Request('https://www.kcaron.top/support'), {})).status, 302);
});

test('unchanged consent script defers Google until a choice and sets the correct mode', async () => {
  const consent = await readFile(new URL('consent.js', dist), 'utf8');
  const ads = await readFile(new URL('ads.txt', dist), 'utf8');
  assert.equal(ads.trim(), 'google.com, pub-6948243189424271, DIRECT, f08c47fec0942fa0');
  for (const [lang, button, expected] of [['en', 'Accept', undefined], ['fr', 'Refuser', 1]]) {
    const nodes = [];
    const element = tag => ({
      tag, children: [], appendChild(child) { this.children.push(child); child.parentNode = this; },
      removeChild(child) { this.children = this.children.filter(node => node !== child); },
      setAttribute() {}, addEventListener(event, handler) { this[event] = handler; }
    });
    const document = {
      documentElement: { lang }, readyState: 'complete', head: element('head'), body: element('body'),
      createElement(tag) { const node = element(tag); nodes.push(node); return node; },
      querySelector: () => null, getElementById: id => nodes.find(node => node.id === id)
    };
    const storage = new Map();
    const window = { localStorage: { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value) } };
    runInNewContext(consent, { document, window });
    assert.equal(nodes.filter(node => node.tag === 'script').length, 0);
    const learn = new URL(nodes.find(node => node.tag === 'a').href, 'https://kcaron.top');
    const privacy = await worker.fetch(new Request(learn), {});
    const destination = new URL(privacy.headers.get('location'));
    assert.ok((await page(destination.pathname)).includes(`id="${decodeURIComponent(learn.hash.slice(1))}"`));
    nodes.find(node => node.tag === 'button' && node.textContent === button).click();
    assert.match(nodes.find(node => node.tag === 'script').src, /client=ca-pub-6948243189424271$/);
    assert.equal(window.adsbygoogle.requestNonPersonalizedAds, expected);
  }
});

test('public assets and exact Search Console verification filename are forwarded', async () => {
  const env = { ASSETS: { fetch: request => new Response(new URL(request.url).pathname) } };
  const response = await worker.fetch(new Request('https://kcaron.top/'), env);
  assert.equal(await response.text(), '/');
  const verification = await worker.fetch(new Request('https://kcaron.top/googlefc463a9e1454c920.html'), env);
  assert.equal(await verification.text(), '/googlefc463a9e1454c920.txt');
});

test('owner requests fail closed before static assets or private storage are read', async () => {
  const env = {
    OWNER_ACCESS_ISSUER: 'https://example-team.cloudflareaccess.com',
    OWNER_ACCESS_AUD: 'a'.repeat(64),
    OWNER_EMAIL: 'owner@example.com',
    OWNER_RESOURCES: { get: () => assert.fail('Private storage was read') },
    ASSETS: { fetch: () => assert.fail('Owner route reached static assets') }
  };
  for (const path of ['/owner', '/owner/', '/owner/downloads/approved-brand-kit-v2.zip']) {
    const denied = await worker.fetch(new Request(`https://kcaron.top${path}`), env);
    assert.equal(denied.status, 401);
    assert.match(denied.headers.get('cache-control'), /no-store/);
    assert.equal((await worker.fetch(new Request(`https://www.kcaron.top${path}`), env)).status, 404);
    assert.equal((await worker.fetch(new Request(`https://kcaron.top${path}`), { ...env, OWNER_ACCESS_AUD: '' })).status, 503);
  }
});

function page(path) {
  return readFile(new URL(path.slice(1) + 'index.html', dist), 'utf8');
}
