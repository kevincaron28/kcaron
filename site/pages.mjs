import { copy, github, origin } from './content.mjs';
import { addonInstall, addons, discord, goblinTesterSteps, products, statusLabels } from './products.mjs';
import { french, goblinLedgerApp } from '../worker/routes.mjs';

const escape = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);
const at = (lang, path) => lang === 'fr' ? french(path) : path;
const arrow = '<span aria-hidden="true">→</span>';
const external = '<span aria-hidden="true">↗</span>';
const isExternal = href => /^https?:/.test(href);
const button = (href, label, outline = false) =>
  `<a class="button${outline ? ' button-outline' : ''}" href="${escape(href)}">${escape(label)} ${isExternal(href) ? external : arrow}</a>`;
const productBySlug = slug => products.find(product => product.slug === slug);
const nav = ['guilded', 'cardstead', 'goblin-ledger'];

function layout(lang, path, { title, description, theme = '', body, consent = true }) {
  const t = copy[lang];
  const url = at(lang, path);
  const fullTitle = path === '/' ? t.title : `${title} — Kevin Caron`;
  const current = slug => path.startsWith(`/${slug}/`) ? ' aria-current="page"' : '';
  return `<!doctype html>
<html lang="${lang}-CA">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f6f4ee" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#111315" media="(prefers-color-scheme: dark)">
  <meta name="google-adsense-account" content="ca-pub-6948243189424271">
  <title>${escape(fullTitle)}</title>
  <meta name="description" content="${escape(description)}">
  <link rel="canonical" href="${origin}${url}">
  <link rel="alternate" hreflang="en-CA" href="${origin}${path}">
  <link rel="alternate" hreflang="fr-CA" href="${origin}${french(path)}">
  <link rel="alternate" hreflang="x-default" href="${origin}${path}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="K Caron Projects">
  <meta property="og:title" content="${escape(fullTitle)}">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:url" content="${origin}${url}">
  <meta property="og:locale" content="${t.locale}">
  <meta property="og:image" content="${origin}/assets/social.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/assets/favicon.png" type="image/png">
  <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/portfolio.css">
</head>
<body${theme ? ` class="theme-${theme}"` : ''}>
  <a class="skip" href="#main">${t.skip}</a>
  <header class="header">
    <div class="shell header-inner">
      <a class="wordmark" href="${at(lang, '/')}"><span class="mark" aria-hidden="true">KC</span><span>Kevin Caron</span></a>
      <nav class="navigation" aria-label="${t.menu}">
        ${nav.map(slug => `<a href="${at(lang, `/${slug}/`)}"${current(slug)}>${productBySlug(slug).name}</a>`).join('\n        ')}
        <a href="${at(lang, '/')}#more">${lang === 'fr' ? 'Autres projets' : 'More'}</a>
        <a href="${at(lang, '/')}#about">${t.about}</a>
      </nav>
      <div class="languages" aria-label="Language / Langue">
        <a href="${path}" lang="en-CA" hreflang="en-CA" aria-label="English"${lang === 'en' ? ' aria-current="page"' : ''}>EN</a>
        <a href="${french(path)}" lang="fr-CA" hreflang="fr-CA" aria-label="Français"${lang === 'fr' ? ' aria-current="page"' : ''}>FR</a>
      </div>
    </div>
  </header>
  ${body}
  <footer class="footer">
    <div class="shell footer-inner"><span>Kevin Caron · ${t.footer}</span><a href="${at(lang, '/addons/')}">${t.addonsTitle}</a><a href="${discord}">Discord</a><a href="${github}">GitHub</a><a href="${at(lang, '/privacy/')}">${t.privacy}</a></div>
  </footer>
  ${consent ? '<script src="/consent.js" defer></script>' : ''}
</body>
</html>
`;
}

function shotSrc(shot, lang) {
  return `/assets/products/${shot.src}${shot.lang ? `-${lang}` : ''}.webp`;
}

function image(shot, lang, eager = false) {
  return `<img src="${shotSrc(shot, lang)}" width="${shot.width}" height="${shot.height}" alt="${escape(shot.alt[lang])}"${eager ? '' : ' loading="lazy"'}>`;
}

function framed(shot, lang, eager = false) {
  return `<div class="${shot.frame === 'phone' ? 'phone' : 'wide-shot'}">${image(shot, lang, eager)}</div>`;
}

function badges(product, lang) {
  return `<div class="badges">${product.statuses.map(([kind, what]) =>
    `<span class="badge badge-${kind}">${escape(what[lang])} <b>${escape(statusLabels[kind][lang])}</b></span>`).join('')}</div>`;
}

function card(product, lang) {
  const t = copy[lang];
  const phones = product.shots.filter(shot => shot.frame === 'phone').slice(0, 2);
  const media = phones.length
    ? `<div class="card-media">${phones.map(shot => image(shot, lang)).join('')}</div>`
    : product.shots.length ? `<div class="card-media wide">${image(product.shots[0], lang)}</div>` : '';
  return `<a class="card theme-${product.theme}" href="${at(lang, `/${product.slug}/`)}">
    ${media}
    <div class="card-body">
      <p class="eyebrow">${escape(product.category[lang])}</p>
      <div class="card-title">${product.icon ? `<img src="/assets/products/${product.icon}" width="32" height="32" alt="">` : ''}<h3>${escape(product.name)}</h3></div>
      ${badges(product, lang)}
      <p>${product.tagline[lang]}</p>
      <span class="more-link">${t.details} ${arrow}</span>
    </div>
  </a>`;
}

export function renderHome(lang) {
  const t = copy[lang];
  const featured = ['guilded', 'cardstead', 'goblin-ledger'].map(productBySlug);
  const heroShots = [featured[2].shots[0], featured[1].shots[0], featured[0].shots[1]];
  const addonsCard = `<a class="card" href="${at(lang, '/addons/')}">
    <div class="card-body">
      <p class="eyebrow">CurseForge</p>
      <div class="card-title"><img src="/assets/catchkeeper.png" width="32" height="32" alt=""><h3>${t.addonsTitle}</h3></div>
      <div class="badges"><span class="badge badge-live">10 addons <b>${statusLabels.live[lang]}</b></span></div>
      <p>${t.addonsCard}</p>
      <span class="more-link">${t.details} ${arrow}</span>
    </div>
  </a>`;
  return layout(lang, '/', { description: t.description, body: `<main id="main">
    <section class="hero">
      <div class="shell hero-inner">
        <div>
          <p class="eyebrow">${t.role}</p>
          <h1>${t.heroTitle}</h1>
          <p class="hero-copy">${t.intro}</p>
          <div class="actions"><a class="button" href="#products">${t.explore} <span aria-hidden="true">↓</span></a><a class="button button-outline" href="${discord}">Discord ${external}</a></div>
        </div>
        <div class="hero-phones" aria-hidden="true">${heroShots.map(shot => `<div class="phone"><img src="${shotSrc(shot, lang)}" width="${shot.width}" height="${shot.height}" alt=""></div>`).join('')}</div>
      </div>
    </section>
    <div class="shell">
      <section class="section" id="products" aria-labelledby="products-title">
        <div class="section-head"><div><h2 id="products-title">${t.apps}</h2><p>${t.appsIntro}</p></div></div>
        <div class="cards">${featured.map(product => card(product, lang)).join('')}</div>
      </section>
      <section class="section" id="more" aria-labelledby="more-title">
        <div class="section-head"><div><h2 id="more-title">${t.moreWork}</h2></div></div>
        <div class="cards">${card(productBySlug('lantern-deck'), lang)}${card(productBySlug('pied-marin'), lang)}${addonsCard}</div>
      </section>
      <section class="section split" id="about" aria-labelledby="about-title">
        <div><p class="eyebrow">${t.about}</p><h2 id="about-title">${t.aboutTitle}</h2></div>
        <p>${t.bio}</p>
      </section>
      <section class="section" id="contact" aria-labelledby="contact-title">
        <div class="contact">
          <div><h2 id="contact-title">${t.contactTitle}</h2><p>${t.contactCopy}</p></div>
          <div class="actions">${button(discord, t.discordLink)}${button(github, 'GitHub', true)}</div>
        </div>
      </section>
    </div>
  </main>` });
}

function steps(list, lang) {
  return `<ol class="steps">${list.map(step => `<li>${step[lang]}</li>`).join('')}</ol>`;
}

export function renderProduct(slug, lang) {
  const t = copy[lang];
  const product = productBySlug(slug);
  const path = `/${slug}/`;
  const resolve = href => isExternal(href) || href.startsWith('/') ? (href.startsWith('/') && !href.startsWith(goblinLedgerApp) ? at(lang, href) : href) : at(lang, path) + href;
  const phones = product.shots.filter(shot => shot.frame === 'phone').slice(0, 2);
  const heroMedia = phones.length
    ? `<div class="hero-media">${phones.map((shot, index) => framed(shot, lang, index === 0)).join('')}</div>`
    : product.shots.length ? `<div class="hero-media wide">${framed(product.shots[0], lang, true)}</div>` : '';
  const sections = [
    product.shots.length && ['screenshots', t.screenshots],
    ['features', t.features],
    product.install.length && ['install', t.install],
    ['guides', t.guides]
  ].filter(Boolean);
  const body = `<main id="main">
    <section class="product-hero${heroMedia ? '' : ' no-media'}">
      <div class="shell product-hero-inner">
        <div>
          <a class="crumb" href="${at(lang, '/')}#products"><span aria-hidden="true">←</span> ${t.allProducts}</a>
          <p class="eyebrow">${escape(product.category[lang])}</p>
          <div class="product-name">${product.icon ? `<img src="/assets/products/${product.icon}" width="64" height="64" alt="">` : ''}<h1>${escape(product.name)}</h1></div>
          ${badges(product, lang)}
          <p class="tagline">${product.tagline[lang]}</p>
          <p class="summary">${product.summary[lang]}</p>
          <div class="actions">${product.links.map(link => button(resolve(link.href), link.label[lang], !link.primary)).join('')}</div>
        </div>
        ${heroMedia}
      </div>
    </section>
    <nav class="page-nav" aria-label="${escape(product.name)}"><div class="shell">${sections.map(([id, label]) => `<a href="#${id}">${label}</a>`).join('')}</div></nav>
    <div class="shell">
      ${product.shots.length ? `<section class="section" id="screenshots" aria-labelledby="screenshots-title">
        <div class="section-head"><h2 id="screenshots-title">${t.screenshots}</h2></div>
        <div class="gallery">${product.shots.map(shot => `<figure class="is-${shot.frame}">${framed(shot, lang)}<figcaption>${escape(shot.caption[lang])}</figcaption></figure>`).join('')}</div>
      </section>` : ''}
      <section class="section" id="features" aria-labelledby="features-title">
        <div class="section-head"><h2 id="features-title">${t.features}</h2></div>
        <div class="feature-grid">${product.features.map(([title, text]) => `<div class="feature"><h3>${title[lang]}</h3><p>${text[lang]}</p></div>`).join('')}</div>
      </section>
      ${product.install.length ? `<section class="section" id="install" aria-labelledby="install-title">
        <div class="section-head"><h2 id="install-title">${t.install}</h2></div>
        <div class="install-list">${product.install.map(platform => `<article class="platform${platform.image ? '' : ' no-image'}">
          <div>
            <div class="platform-head"><h3>${platform.title[lang]}</h3><span class="badge badge-${platform.status}">${statusLabels[platform.status][lang]}</span></div>
            ${steps(platform.steps, lang)}
            ${platform.more ? `<p class="note">${platform.more[lang]}</p>` : ''}
          </div>
          ${platform.image ? `<figure>${framed(platform.image, lang)}<figcaption>${escape(platform.image.caption[lang])}</figcaption></figure>` : ''}
        </article>`).join('')}</div>
      </section>` : ''}
      <section class="section" id="guides" aria-labelledby="guides-title">
        <div class="section-head"><h2 id="guides-title">${t.guides}</h2></div>
        <div class="guide-grid">${product.guides.map(guide => `<article class="guide"><h3>${guide.title[lang]}</h3>${steps(guide.steps, lang)}</article>`).join('')}</div>
        ${product.more ? `<p class="note">${product.more[lang]}</p>` : ''}
      </section>
    </div>
  </main>`;
  return layout(lang, path, { title: `${product.name} — ${product.category[lang]}`, description: product.tagline[lang].replace(/<[^>]+>/g, ''), theme: product.theme, body });
}

export function renderGoblinTesters(lang) {
  const t = copy[lang];
  const product = productBySlug('goblin-ledger');
  const body = `<main id="main">
    <section class="product-hero">
      <div class="shell product-hero-inner">
        <div>
          <a class="crumb" href="${at(lang, '/goblin-ledger/')}"><span aria-hidden="true">←</span> Goblin Ledger</a>
          <div class="product-name"><img src="/assets/products/${product.icon}" width="64" height="64" alt=""><h1>${t.testersTitle}</h1></div>
          <div class="badges"><span class="badge badge-testing">Android <b>${statusLabels.testing[lang]}</b></span></div>
          <p class="tagline">${t.testersIntro}</p>
        </div>
        <div class="hero-media">${framed(product.shots[2], lang, true)}${framed(product.shots[1], lang, true)}</div>
      </div>
    </section>
    <div class="shell">
      <section class="section" id="steps" aria-labelledby="steps-title">
        <div class="section-head"><h2 id="steps-title">${t.testersSteps}</h2></div>
        <ol class="big-steps">${goblinTesterSteps.slice(0, 3).map(step => `<li>${step[lang]}</li>`).join('')}</ol>
        <p class="note">${goblinTesterSteps[3][lang]} ${t.testersHelp} <a href="${discord}">Discord</a>.</p>
      </section>
      <section class="section" aria-labelledby="web-title">
        <div class="section-head"><div><h2 id="web-title">${t.testersWeb}</h2></div></div>
        <div class="actions">${button(goblinLedgerApp, t.openApp)}${button(at(lang, '/goblin-ledger/'), product.name, true)}</div>
      </section>
    </div>
  </main>`;
  return layout(lang, '/goblin-ledger/testers/', { title: t.testersTitle, description: t.testersIntro, theme: 'goblin', body });
}

export function renderAddons(lang) {
  const t = copy[lang];
  const catalog = addons.map(addon => `<article class="addon" id="${addon.slug}">
    ${addon.image ? `<img src="/assets/${addon.image}" width="48" height="48" alt="" loading="lazy">` : `<span class="addon-initial" aria-hidden="true">${addon.name[0]}</span>`}
    <div><h3>${escape(addon.name)}</h3><p>${escape(addon[lang])}</p>
      <a class="text-link" href="https://www.curseforge.com/wow/addons/${addon.slug}">${t.getAddon} ${external}</a></div>
  </article>`).join('');
  const body = `<main id="main">
    <section class="product-hero no-media">
      <div class="shell product-hero-inner">
        <div>
          <a class="crumb" href="${at(lang, '/')}#more"><span aria-hidden="true">←</span> ${t.allProducts}</a>
          <p class="eyebrow">World of Warcraft · CurseForge</p>
          <h1>${t.addonsTitle}</h1>
          <p class="tagline">${t.addonsIntro}</p>
        </div>
      </div>
    </section>
    <div class="shell">
      <section class="section" aria-labelledby="catalog-title">
        <div class="section-head"><h2 id="catalog-title">${addons.length} addons</h2></div>
        <div class="addon-grid">${catalog}</div>
      </section>
      <section class="section" id="install" aria-labelledby="install-title">
        <div class="section-head"><h2 id="install-title">${t.install}</h2></div>
        <div class="guide-grid">
          <article class="guide"><h3>${t.curseforge}</h3>${steps(addonInstall.curseforge(lang === 'fr' ? 'le nom de l’addon' : 'the addon’s name'), lang)}</article>
          <article class="guide"><h3>${t.manual}</h3>${steps(addonInstall.manual, lang)}</article>
        </div>
      </section>
    </div>
  </main>`;
  return layout(lang, '/addons/', { title: t.addonsTitle, description: t.addonsIntro, body });
}

export function renderPrivacy(lang) {
  const t = copy[lang];
  return layout(lang, '/privacy/', { title: t.privacy, description: t.privacyDescription, consent: false, body: `<main id="main" class="shell text-page">
    <h1>${t.privacy}</h1><p>${t.privacyDescription}</p>
    <section aria-labelledby="${t.adsAnchor}">
      <h2 id="${t.adsAnchor}">${t.adsHeading}</h2>
      <p>${t.adsIntro}</p><ul><li>${t.adsAccept}</li><li>${t.adsDecline}</li></ul>
      <p>${t.adsChange}</p>
      <p><a class="text-link" href="https://policies.google.com/technologies/partner-sites?hl=${lang}">${t.googlePrivacy} ${external}</a></p>
    </section>
    <section aria-labelledby="privacy-contact"><h2 id="privacy-contact">${t.contact}</h2>
      <p>${t.privacyContact} <strong>Kevin Caron</strong>.</p>
      <p><a class="text-link" href="${discord}">${t.discordLink} ${external}</a></p>
    </section>
  </main>` });
}

export function renderGoldlinePrivacy(lang) {
  const t = copy[lang];
  const section = (id, heading, body) => `<section aria-labelledby="${id}"><h2 id="${id}">${heading}</h2>${body}</section>`;
  return layout(lang, '/goldline/privacy/', { title: t.goldlinePrivacyTitle, description: t.goldlinePrivacyDescription, theme: 'goblin', consent: false, body: `<main id="main" class="shell text-page">
    <a class="crumb" href="${at(lang, '/goblin-ledger/')}"><span aria-hidden="true">←</span> Goblin Ledger</a>
    <h1>${t.goldlinePrivacyTitle}</h1><p>${t.goldlinePrivacyDescription}</p>
    ${section('goldline-collect', t.gpCollectHeading, `<p>${t.gpCollect}</p>`)}
    ${section('goldline-device', t.gpDeviceHeading, `<p>${t.gpDevice}</p>`)}
    ${section('goldline-network', t.gpNetworkHeading, `<p>${t.gpNetwork}</p><ul><li>${t.gpNetworkPrices}</li><li>${t.gpNetworkIcons}</li><li>${t.gpNetworkUpdates}</li></ul><p>${t.gpNetworkNote}</p>`)}
    ${section('goldline-notifications', t.gpNotificationsHeading, `<p>${t.gpNotifications}</p>`)}
    ${section('goldline-children', t.gpChildrenHeading, `<p>${t.gpChildren}</p>`)}
    ${section('goldline-contact', t.contact, `<p>${t.gpContact} <strong>Kevin Caron</strong>.</p><p><a class="text-link" href="${discord}">${t.discordLink} ${external}</a></p><p>${t.gpUpdated}</p>`)}
  </main>` });
}

export function renderPage(path, lang) {
  if (path === '/') return renderHome(lang);
  if (path === '/addons/') return renderAddons(lang);
  if (path === '/privacy/') return renderPrivacy(lang);
  if (path === '/goldline/privacy/') return renderGoldlinePrivacy(lang);
  if (path === '/goblin-ledger/testers/') return renderGoblinTesters(lang);
  return renderProduct(path.slice(1, -1), lang);
}
