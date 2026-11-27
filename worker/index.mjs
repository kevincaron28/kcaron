import { createOwnerResources } from './private-resources.mjs';
import { resources } from './owner-manifest.mjs';
import { french, goblinLedgerApp, pages } from './routes.mjs';

const ownerResources = createOwnerResources({ resources });
const languagePaths = new Map([
  ...pages.flatMap(path => [path, french(path)].map(from => [from, { en: path, fr: french(path) }])),
  ['/creator/', { en: '/', fr: '/fr/' }]
]);

// headers: { site, app } security headers; the Goblin Ledger web app gets its own.
export function createSite({ site: headers, app: appHeaders }) {
  return { async fetch(request, env) {
    const ownerResponse = await ownerResources(request, env);
    if (ownerResponse) return ownerResponse;

    const url = new URL(request.url);
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response(null, { status: 405, headers: { Allow: 'GET, HEAD' } });
    }
    const path = url.pathname.endsWith('/') ? url.pathname : url.pathname + '/';
    const language = url.searchParams.get('lang');
    if (path === '/support/') return Response.redirect('https://ko-fi.com/wowguilded', 302);
    // One web app for both languages: the French address keeps its query (item links) and lands on the same app.
    if (path === '/fr' + goblinLedgerApp) {
      if (url.hostname === 'www.kcaron.top') url.hostname = 'kcaron.top';
      url.pathname = goblinLedgerApp;
      return Response.redirect(url.href, 308);
    }
    if (path === '/docs/PRIVACY/') {
      if (url.hostname === 'www.kcaron.top') url.hostname = 'kcaron.top';
      url.pathname = language === 'fr' ? '/fr/privacy/' : '/privacy/';
      url.searchParams.delete('lang');
      return Response.redirect(url.href, 308);
    }
    const destinations = languagePaths.get(path);
    const selected = destinations && (language === 'en' || language === 'fr');
    const legacyCreator = path === '/creator/' || url.pathname === '/creator/index.html';
    if (selected || legacyCreator || url.hostname === 'www.kcaron.top') {
      if (url.hostname === 'www.kcaron.top') url.hostname = 'kcaron.top';
      if (selected || legacyCreator) {
        url.pathname = selected ? destinations[language] : language === 'fr' ? '/fr/' : '/';
        url.searchParams.delete('lang');
      }
      return Response.redirect(url.href, 308);
    }
    if (url.pathname === '/googlefc463a9e1454c920.html') {
      url.pathname = '/googlefc463a9e1454c920.txt';
      return env.ASSETS.fetch(new Request(url, request));
    }
    const asset = await env.ASSETS.fetch(request);
    const response = new Response(asset.body, asset);
    const app = url.pathname.startsWith(goblinLedgerApp);
    for (const [name, value] of Object.entries(app ? appHeaders : headers)) response.headers.set(name, value);
    if (url.pathname === '/ads.txt' && response.ok) {
      response.headers.set('Content-Type', 'text/plain; charset=utf-8');
    }
    return response;
  } };
}
