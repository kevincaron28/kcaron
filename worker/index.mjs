import { createOwnerResources } from './private-resources.mjs';
import { resources } from './owner-manifest.mjs';

const ownerResources = createOwnerResources({ resources });
const languagePaths = new Map([
  ['/', { en: '/', fr: '/fr/' }],
  ['/fr/', { en: '/', fr: '/fr/' }],
  ['/addons/', { en: '/addons/', fr: '/fr/addons/' }],
  ['/fr/addons/', { en: '/addons/', fr: '/fr/addons/' }],
  ['/privacy/', { en: '/privacy/', fr: '/fr/privacy/' }],
  ['/fr/privacy/', { en: '/privacy/', fr: '/fr/privacy/' }],
  ['/creator/', { en: '/', fr: '/fr/' }]
]);

export default {
  async fetch(request, env) {
    const ownerResponse = await ownerResources(request, env);
    if (ownerResponse) return ownerResponse;

    const url = new URL(request.url);
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response(null, { status: 405, headers: { Allow: 'GET, HEAD' } });
    }
    const path = url.pathname.endsWith('/') ? url.pathname : url.pathname + '/';
    const language = url.searchParams.get('lang');
    if (path === '/support/') return Response.redirect('https://ko-fi.com/wowguilded', 302);
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
    return env.ASSETS.fetch(request);
  }
};
