import { addons, copy, discord, github, origin } from './content.mjs';

const paths = {
  en: { home: '/', addons: '/addons/', privacy: '/privacy/', goldlinePrivacy: '/goldline/privacy/' },
  fr: { home: '/fr/', addons: '/fr/addons/', privacy: '/fr/privacy/', goldlinePrivacy: '/fr/goldline/privacy/' }
};
const escape = value => value.replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);
const arrow = '<span aria-hidden="true">↗</span>';
const link = (url, label, className = 'text-link') =>
  `<a class="${className}" href="${escape(url)}">${escape(label)} ${arrow}</a>`;

function layout(lang, page, body) {
  const t = copy[lang];
  const urls = paths[lang];
  const pageTitle = page === 'addons' ? t.addons : page === 'goldlinePrivacy' ? t.goldlinePrivacyTitle : t.privacy;
  const title = page === 'home' ? t.title : `${pageTitle} — Kevin Caron`;
  const description = page === 'home' ? t.description : page === 'addons' ? t.addonsIntro : page === 'goldlinePrivacy' ? t.goldlinePrivacyDescription : t.privacyDescription;
  return `<!doctype html>
<html lang="${lang}-CA">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#171a17">
  <meta name="google-adsense-account" content="ca-pub-6948243189424271">
  <title>${escape(title)}</title>
  <meta name="description" content="${escape(description)}">
  <link rel="canonical" href="${origin}${urls[page]}">
  <link rel="alternate" hreflang="en-CA" href="${origin}${paths.en[page]}">
  <link rel="alternate" hreflang="fr-CA" href="${origin}${paths.fr[page]}">
  <link rel="alternate" hreflang="x-default" href="${origin}${paths.en[page]}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="K Caron Projects">
  <meta property="og:title" content="${escape(title)}">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:url" content="${origin}${urls[page]}">
  <meta property="og:locale" content="${t.locale}">
  <meta property="og:image" content="${origin}/assets/social.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/assets/favicon.png" type="image/png">
  <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/portfolio.css">
</head>
<body>
  <a class="skip" href="#main">${t.skip}</a>
  <header class="header">
    <div class="shell header-inner">
      <a class="wordmark" href="${urls.home}" aria-label="Kevin Caron"><span class="mark" aria-hidden="true">KC</span><span>Kevin Caron</span></a>
      <nav class="navigation" aria-label="${lang === 'fr' ? 'Navigation principale' : 'Main navigation'}">
        <a href="${urls.home}#work">${t.work}</a>
        <a href="${urls.home}#about">${t.about}</a>
        <a href="${urls.home}#contact">${t.contact}</a>
      </nav>
      <div class="languages" aria-label="Language / Langue">
        <a href="${paths.en[page]}" lang="en-CA" hreflang="en-CA" aria-label="English"${lang === 'en' ? ' aria-current="page"' : ''}>EN</a>
        <a href="${paths.fr[page]}" lang="fr-CA" hreflang="fr-CA" aria-label="Français"${lang === 'fr' ? ' aria-current="page"' : ''}>FR</a>
      </div>
    </div>
  </header>
  ${body}
  <footer class="footer">
    <div class="shell footer-inner"><span>Kevin Caron · ${t.footer}</span>${link(github, 'GitHub')} ${link(discord, 'Discord')} <a class="text-link" href="${urls.privacy}">${t.privacy}</a></div>
  </footer>
  ${page === 'privacy' || page === 'goldlinePrivacy' ? '' : '<script src="/consent.js" defer></script>'}
</body>
</html>
`;
}

// An illustration of the app's controls. The labels are localized with the page.
function deck(t) {
  return `<div class="deck-art" aria-hidden="true">
    <div class="deck">
      <div class="deck-header"><strong><span class="deck-signal"></span> Lantern Deck</strong><span>${t.rehearsal}</span></div>
      <div class="deck-body">
        <span class="deck-label">${t.scenes}</span>
        <div class="deck-scenes">
          <div class="scene is-active"><b>▶</b>${t.gameplay}</div>
          <div class="scene"><b>Ⅱ</b>${t.brb}</div>
          <div class="scene"><b>◷</b>${t.starting}</div>
          <div class="scene"><b>■</b>${t.ending}</div>
        </div>
        <div class="deck-audio"><span>${t.microphone} <b>${t.on}</b></span><span>${t.desktop} <b>${t.muted}</b></span></div>
      </div>
    </div>
  </div>`;
}

function addonTile(addon, lang, heading = 'h3') {
  return `<article class="addon-tile">
    ${addon.image ? `<img src="/assets/${addon.image}" width="48" height="48" alt="" loading="lazy">` : ''}
    <div><${heading}>${escape(addon.name)}</${heading}><p>${escape(addon[lang])}</p>
      ${link(`https://www.curseforge.com/wow/addons/${addon.slug}`, 'CurseForge')}</div>
  </article>`;
}

export function renderHome(lang) {
  const t = copy[lang];
  return layout(lang, 'home', `<main id="main">
    <section class="hero">
      <div class="shell hero-inner">
        <div>
          <p class="label"><span class="status-dot" aria-hidden="true"></span>${t.role}</p>
          <h1>Kevin <span>Caron<span class="period" aria-hidden="true">.</span></span></h1>
          <p class="hero-copy">${t.intro}</p>
          <div class="hero-actions"><a class="button" href="#work">${t.explore}<span aria-hidden="true">↓</span></a>${link(github, 'GitHub', 'button button-outline')}</div>
        </div>
        <div class="hero-mark" aria-hidden="true"><span class="hero-letter-k">K</span><span class="hero-letter-c">C</span></div>
      </div>
    </section>
    <div class="shell">
      <section class="work-section" id="work" aria-labelledby="work-title">
        <h2 class="section-title" id="work-title">${t.selected}</h2>
        <article class="project project-featured">
          <div class="project-copy">
            <p class="label">${t.lanternCategory}</p><h3>Lantern Deck</h3><p>${t.lantern}</p>
            ${link(github + '/Lantern-Deck', t.lanternLink)}
          </div>
          ${deck(t)}
        </article>
        <div class="work-grid">
          <article class="project">
            <img class="project-image fishing-image" src="/assets/pied-marin.jpg" alt="${t.fishingAlt}" loading="lazy" width="800" height="602">
            <div class="project-copy">
              <p class="label">${t.fishingCategory}</p><h3>Pied Marin Fishing</h3><p>${t.fishing}</p>
              ${link('https://piedmarinfishing.com/', t.fishingLink)}
            </div>
          </article>
          <article class="project">
            <div class="guilded-art"><img class="project-image" src="/assets/guilded.webp" alt="${t.guildedAlt}" loading="lazy" width="821" height="462"></div>
            <div class="project-copy">
              <p class="label">${t.guildedCategory}</p><h3>Guilded</h3><p>${t.guilded}</p>
              ${link('https://guildedwow.com/', t.guildedLink)}
            </div>
          </article>
          <article class="project">
            <div class="project-copy">
              <p class="label">${t.goldlineCategory}</p><h3>Goldline</h3><p>${t.goldline}</p>
              ${link('https://github.com/kevincaron28/Trading-Wow/releases/latest/download/goldline.apk', t.goldlineLink, 'button')}
              <p><a class="text-link" href="${paths[lang].goldlinePrivacy}">${t.goldlinePrivacyTitle}</a></p>
            </div>
          </article>
        </div>
      </section>
      <section class="addons-section" aria-labelledby="addons-title">
        <div class="section-heading">
          <div><h2 class="section-title" id="addons-title">${t.addons}</h2><p>${t.addonsIntro}</p></div>
          ${link(paths[lang].addons, t.allAddons, 'button button-outline')}
        </div>
        <div class="addon-grid">${addons.slice(0, 2).map(addon => addonTile(addon, lang)).join('')}</div>
      </section>
      <section class="about-section" id="about" aria-labelledby="about-title">
        <div><p class="label">${t.about}</p><h2 class="section-title" id="about-title">${t.aboutTitle}</h2></div>
        <p>${t.bio}</p>
      </section>
      <section class="contact-section" id="contact" aria-labelledby="contact-title">
        <div><h2 id="contact-title">${t.contactTitle}</h2><p>${t.contactCopy}</p></div>
        <div class="contact-actions">${link(discord, t.discordLink, 'button')}${link(github, 'GitHub', 'button button-outline')}</div>
      </section>
    </div>
  </main>`);
}

export function renderAddons(lang) {
  const t = copy[lang];
  const catalog = addons.map(addon => addonTile(addon, lang, 'h2')).join('');
  return layout(lang, 'addons', `<main id="main" class="shell catalog">
    <a class="text-link" href="${paths[lang].home}#work"><span aria-hidden="true">←</span> ${t.work}</a>
    <h1>${t.addons}</h1><p>${t.addonsIntro}</p>
    <div class="addon-grid">${catalog}</div>
  </main>`);
}

export function renderPrivacy(lang) {
  const t = copy[lang];
  return layout(lang, 'privacy', `<main id="main" class="shell catalog privacy">
    <h1>${t.privacy}</h1><p>${t.privacyDescription}</p>
    <section aria-labelledby="${t.adsAnchor}">
      <h2 id="${t.adsAnchor}">${t.adsHeading}</h2>
      <p>${t.adsIntro}</p><ul><li>${t.adsAccept}</li><li>${t.adsDecline}</li></ul>
      <p>${t.adsChange}</p>
      <p>${link('https://policies.google.com/technologies/partner-sites?hl=' + lang, t.googlePrivacy)}</p>
    </section>
    <section aria-labelledby="privacy-contact"><h2 id="privacy-contact">${t.contact}</h2>
      <p>${t.privacyContact} <strong>Kevin Caron</strong>.</p>
      <p>${link(discord, t.discordLink)}</p>
    </section>
  </main>`);
}

export function renderGoldlinePrivacy(lang) {
  const t = copy[lang];
  const section = (id, heading, body) => `<section aria-labelledby="${id}"><h2 id="${id}">${heading}</h2>${body}</section>`;
  return layout(lang, 'goldlinePrivacy', `<main id="main" class="shell catalog privacy">
    <a class="text-link" href="${paths[lang].home}#work"><span aria-hidden="true">←</span> ${t.work}</a>
    <h1>${t.goldlinePrivacyTitle}</h1><p>${t.goldlinePrivacyDescription}</p>
    ${section('goldline-collect', t.gpCollectHeading, `<p>${t.gpCollect}</p>`)}
    ${section('goldline-device', t.gpDeviceHeading, `<p>${t.gpDevice}</p>`)}
    ${section('goldline-network', t.gpNetworkHeading, `<p>${t.gpNetwork}</p><ul><li>${t.gpNetworkPrices}</li><li>${t.gpNetworkIcons}</li></ul><p>${t.gpNetworkNote}</p>`)}
    ${section('goldline-notifications', t.gpNotificationsHeading, `<p>${t.gpNotifications}</p>`)}
    ${section('goldline-children', t.gpChildrenHeading, `<p>${t.gpChildren}</p>`)}
    ${section('goldline-contact', t.contact, `<p>${t.gpContact} <strong>Kevin Caron</strong>.</p><p>${link(discord, t.discordLink)}</p><p>${t.gpUpdated}</p>`)}
  </main>`);
}
