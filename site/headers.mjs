import { createHash } from 'node:crypto';

export function publicHeaders(consent) {
  // Permit the exact inline style created by the unchanged consent script.
  const styleLiteral = consent.match(/css\.textContent = ("[^"\r\n]*");/);
  if (!styleLiteral) throw new Error('Consent style text could not be found');
  const hash = createHash('sha256').update(JSON.parse(styleLiteral[1])).digest('base64');
  const scripts = 'https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.adtrafficquality.google https://www.googletagservices.com https://*.google.com';
  const frames = 'https://googleads.g.doubleclick.net https://*.googlesyndication.com https://*.doubleclick.net https://*.google.com https://*.adtrafficquality.google';
  const connections = [...new Set(`${scripts} ${frames}`.split(' '))].join(' ');
  return {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': `default-src 'none'; script-src 'self' ${scripts}; style-src 'self' 'sha256-${hash}'; frame-src ${frames}; connect-src ${connections}; font-src 'self'; img-src 'self' https:; base-uri 'none'; frame-ancestors 'none'; form-action 'none'`
  };
}

// The Goblin Ledger web app reads prices from data.kcaron.top (GitHub as a backup), shows Blizzard's item icons and
// sets styles from script (chart library). It carries no ads, so Google is not allowed here.
export function appHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://data.kcaron.top https://raw.githubusercontent.com https://github.com; img-src 'self' data: blob: https://render.worldofwarcraft.com; font-src 'self' data:; manifest-src 'self'; worker-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'"
  };
}
