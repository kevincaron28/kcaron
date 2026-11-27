# kcaron.top audit and redesign plan

## What the old site communicated

The homepage title, social preview, main calls to action and much of the navigation described Guilded. Kevin Caron appeared in the header and lower on the page, but the first screen positioned kcaron.top as a second Guilded homepage. A visitor looking for a developer portfolio had to pass Guilded features, supported editions and installation guides before reaching other projects.

The portfolio already had two assets worth preserving. Its English and Québec French copy made the site useful in both languages, and the addon listings gave players direct paths to downloads. In the standalone extraction, the homepage still depended on Guilded site scripts and release substitution, leaving a raw version placeholder in the catalog. Its Search Console verification and protected owner resources also depended on the shared Worker.

## What the project review showed

| Project | What it demonstrates | Portfolio placement |
| --- | --- | --- |
| Lantern Deck | A Windows streaming tool with phone and tablet control, scene switching and visible audio state | Lead project and GitHub link. The card includes an illustration of the deck. |
| Pied Marin Fishing | A bilingual community website with a tournament directory, team results and a fishing log | Featured project with an existing team photo and a link to the live site. |
| Guilded | A substantial WoW Forever suite spanning guild workflows, dungeon results and optional companion and Discord sync | Featured project with a real addon screenshot and one link to guildedwow.com. |
| Catchkeeper and Trailmark | Focused, released WoW addons with a clearly defined use | Compact homepage entries with direct CurseForge links. |
| Other listed WoW addons | The broader catalog already available to visitors | Full bilingual catalog with stable project links. |

The review covered public-facing positioning and portfolio evidence. It did not include code review of the featured projects. For Lantern Deck, the public repository’s current README was used over the older local quick-start. The existing Pied Marin website, public CurseForge listings and original creator source informed the rest.

## Implemented design

1. Lead with Kevin Caron and a brief explanation of who the projects serve. Use a type-led KC monogram, dark green and chartreuse palette, and Inter typography throughout the portfolio.
2. Show a desktop app, a community website and a game suite in the first project section. Keep Guilded’s guides, releases and product onboarding at guildedwow.com.
3. Give players an addon catalog with direct CurseForge links. Keep personal contact focused on the existing GitHub profile and project Discord.
4. Publish separate English and French HTML routes with language links, canonical metadata, a sitemap and a new sharing image. Use shared content and templates to keep both languages in sync. Serve the generated pages without client-side JavaScript.
5. Prepare the standalone Cloudflare Worker. Retain the existing owner resource handler and manifest, legacy French entry links, support redirect and Search Console verification. Verify both deployments before deleting the creator source in Guilded.

## Source and release checks

| Check | Status |
| --- | --- |
| Source pages, project assets and build | Implemented |
| Local link and asset checks, bilingual routes and catalog count | Covered by automated tests |
| Legacy redirects, exact verification URL and signed-out owner behavior | Covered by automated tests |
| Cloudflare production routing and signed-in owner download | Requires deployment and the existing Access settings |
| GitHub repository and removal of old Guilded creator files | Pending remote repository and verified cutover |

The existing Worker remains the rollback target until both hostnames and the authenticated owner download are verified. See the README for the cutover order.

## November 2026: product hub

kcaron.top became the hub for every product, with one page per product in English and Québec French.

| Page | What it has |
| --- | --- |
| Home (`/`, `/fr/`) | Short intro, the three apps with real screenshots and status badges, then Lantern Deck, Pied Marin and the addons |
| Guilded, Cardstead, Goblin Ledger, Lantern Deck, Pied Marin (`/<product>/`) | What it is, screenshots, features, install steps per platform with a status (live, closed testing, coming), how to use the main features |
| Goblin Ledger testers (`/goblin-ledger/testers/`) | The three tester steps: Google Group, Play opt-in, install |
| Goblin Ledger web app (`/goblin-ledger/app/`) | The real app, with item links `?house=<id>&item=<id>` |
| WoW addons (`/addons/`) | All ten addons, each with an anchor, and how to install with CurseForge or by hand |

Design: a light, neutral site (dark when the system is dark) with Inter. Each product page takes its own brand colour, so Guilded, Cardstead and Goblin Ledger stay separate brands. The pages need no JavaScript beyond the existing consent script.

Screenshots are real: the Guilded Play and Microsoft Store listings and in-game captures from the Guilded repo, and fresh captures of the Cardstead web app, the Goblin Ledger web app and piedmarinfishing.com in both languages. Lantern Deck has no screenshots yet, so its page shows none rather than a drawing of the UI.

Unchanged: `/privacy/`, `/goldline/privacy/` (linked from Google Play) and their French pages, ads.txt, consent and AdSense tags, `/owner`, `/support/` and the Search Console file. The sitemap is now generated from `worker/routes.mjs`.
