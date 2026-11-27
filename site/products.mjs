// One entry per product page. Text is trusted HTML written here; every string comes in English and Québec French.
// Screenshots are real captures from the apps, the store listings or the live websites (see public/assets/products/).
const b = (en, fr) => ({ en, fr });

export const discord = 'https://discord.gg/YjzFwtP64V';
export const testerGroup = 'testers-community@googlegroups.com';

export const statusLabels = {
  live: b('Live', 'Disponible'),
  testing: b('Closed testing', 'Test fermé'),
  coming: b('Coming soon', 'Bientôt')
};

// Phone screenshots are 9:16; wide ones keep their own ratio.
const phone = (src, alt, caption, lang = true) => ({ src, alt, caption, lang, frame: 'phone', width: 540, height: 960 });
const wide = (src, alt, caption, width, height, lang = false) => ({ src, alt, caption, lang, frame: 'wide', width, height });

const curseforgeSteps = name => [
  b('Install the <a href="https://www.curseforge.com/download/app">CurseForge app</a> and open World of Warcraft in it.', 'Installez l’<a href="https://www.curseforge.com/download/app">application CurseForge</a> et ouvrez-y World of Warcraft.'),
  b(`Search for <strong>${name}</strong> and click <strong>Install</strong>. The app keeps it up to date.`, `Cherchez <strong>${name}</strong> et cliquez sur <strong>Installer</strong>. L’application le garde à jour.`),
  b('Start the game (or type <code>/reload</code>) and check that the addon is ticked in the AddOns list on the character screen.', 'Lancez le jeu (ou tapez <code>/reload</code>) et vérifiez que l’addon est coché dans la liste des AddOns à l’écran des personnages.')
];

const manualSteps = [
  b('Close the game and download the latest .zip from the addon’s <strong>Files</strong> tab on CurseForge.', 'Fermez le jeu et téléchargez le dernier .zip dans l’onglet <strong>Files</strong> de l’addon sur CurseForge.'),
  b('Open your game folder (for WoW Forever, the Forever folder), then <code>Interface\\AddOns</code>.', 'Ouvrez le dossier du jeu (pour WoW Forever, le dossier Forever), puis <code>Interface\\AddOns</code>.'),
  b('Extract the .zip there, so the addon’s folder sits directly in <code>AddOns</code>, then start the game.', 'Extrayez le .zip à cet endroit pour que le dossier de l’addon soit directement dans <code>AddOns</code>, puis lancez le jeu.')
];

const playTesterSteps = (pkg, extra) => [
  b(`Join the Google Group <a href="https://groups.google.com/g/testers-community"><strong>${testerGroup}</strong></a> with the Google account you use on your phone.`, `Joignez le groupe Google <a href="https://groups.google.com/g/testers-community"><strong>${testerGroup}</strong></a> avec le compte Google de votre téléphone.`),
  b(`Open <a href="https://play.google.com/apps/testing/${pkg}">the testing page</a> and tap <strong>Become a tester</strong>.`, `Ouvrez <a href="https://play.google.com/apps/testing/${pkg}">la page de test</a> et touchez <strong>Devenir testeur</strong>.`),
  b(`Install the app from <a href="https://play.google.com/store/apps/details?id=${pkg}">Google Play</a>. Updates arrive through Play like any other app.`, `Installez l’application depuis <a href="https://play.google.com/store/apps/details?id=${pkg}">Google Play</a>. Les mises à jour arrivent par Play comme pour toute autre application.`),
  ...(extra ? [extra] : [])
];

export const products = [
  {
    slug: 'guilded', name: 'Guilded', theme: 'guilded', icon: 'guilded/logo.webp',
    category: b('WoW Forever guild suite', 'Suite de guilde pour WoW Forever'),
    tagline: b('Everything your WoW Forever guild runs on: raids, loot, dungeons and crafting, in game, in Discord and on your phone.', 'Tout ce qui fait rouler votre guilde WoW Forever : raids, butin, donjons et artisanat, en jeu, dans Discord et sur votre téléphone.'),
    summary: b('Guilded started as an addon for my own guild. It grew into a suite: the addon records raids, loot and dungeon runs, the Guild Sync Companion sends that to Discord, the bot posts sign-ups and leaderboards, and the phone app keeps the guild in your pocket.', 'Guilded a commencé comme un addon pour ma propre guilde. C’est devenu une suite : l’addon enregistre les raids, le butin et les donjons, le Guild Sync Companion envoie tout ça dans Discord, le bot publie les inscriptions et les classements, et l’application mobile garde la guilde dans votre poche.'),
    statuses: [['live', b('Addon', 'Addon')], ['live', b('Windows companion', 'Compagnon Windows')], ['live', b('Discord bot', 'Bot Discord')], ['testing', b('Android app', 'Application Android')]],
    links: [
      { href: 'https://guildedwow.com/', label: b('Visit guildedwow.com', 'Visiter guildedwow.com'), primary: true },
      { href: 'https://www.curseforge.com/wow/addons/guilded', label: b('Addon on CurseForge', 'Addon sur CurseForge') },
      { href: 'https://apps.microsoft.com/detail/9N680XX3QFL9', label: b('Companion on the Microsoft Store', 'Compagnon sur le Microsoft Store') }
    ],
    shots: [
      phone('guilded/phone-01-guild-activity', b('Guilded phone app, Guild tab: recent guild activity', 'Application Guilded, onglet Guilde : activité récente de la guilde'), b('Guild activity on the phone app', 'L’activité de la guilde sur l’application')),
      phone('guilded/phone-02-guild-raids', b('Guilded phone app: raid sign-up with role buttons', 'Application Guilded : inscription à un raid avec les boutons de rôle'), b('Sign up for a raid from your phone', 'Inscrivez-vous à un raid depuis votre téléphone')),
      phone('guilded/phone-04-character', b('Guilded phone app, Me tab: dungeon rank and recent runs', 'Application Guilded, onglet Moi : rang en donjon et sorties récentes'), b('Your dungeon rank and runs', 'Votre rang et vos sorties en donjon')),
      phone('guilded/phone-06-alerts', b('Guilded phone app, Alerts tab', 'Application Guilded, onglet Alertes'), b('Raid alerts from your guild server', 'Alertes de raid de votre serveur')),
      wide('guilded/addon-01-home', b('Guilded addon home page in game', 'Page d’accueil de l’addon Guilded en jeu'), b('The addon in game: your day at a glance', 'L’addon en jeu : votre journée en un coup d’œil'), 778, 585),
      wide('guilded/addon-02-guild-overview', b('Guilded addon guild overview with classes and levels', 'Aperçu de la guilde dans l’addon, avec classes et niveaux'), b('Guild overview: classes and levels', 'Aperçu de la guilde : classes et niveaux'), 778, 585),
      wide('guilded/addon-10-loot', b('Guilded addon loot page with GP bidding', 'Page de butin de l’addon avec les enchères en GP'), b('Loot and GP bidding', 'Butin et enchères en GP'), 778, 585),
      wide('guilded/companion-01-everything-working', b('Guild Sync Companion window showing every check in green', 'Fenêtre du Guild Sync Companion avec toutes les vérifications au vert'), b('Guild Sync Companion on Windows', 'Guild Sync Companion sur Windows'), 1280, 720, true),
      wide('guilded/discord-dungeon-run', b('Example dungeon run card posted in Discord', 'Exemple de carte de donjon publiée dans Discord'), b('A dungeon run card in Discord (example guild)', 'Une carte de donjon dans Discord (guilde exemple)'), 900, 472)
    ],
    features: [
      [b('Raid nights', 'Soirées de raid'), b('Sign-ups in Discord or on the phone, invites in one command, attendance and boss kills recorded by the addon.', 'Inscriptions dans Discord ou sur le téléphone, invitations en une commande, présences et boss vaincus enregistrés par l’addon.')],
      [b('EP/GP and loot', 'EP/GP et butin'), b('Award EP, run GP bids in game and check standings and loot history in Discord.', 'Donnez des EP, lancez des enchères en GP en jeu et consultez le classement et l’historique du butin dans Discord.')],
      [b('Dungeon runs and scores', 'Donjons et pointages'), b('Runs are recorded automatically, scored, posted as cards and ranked on guildedwow.com.', 'Les sorties sont enregistrées automatiquement, notées, publiées en cartes et classées sur guildedwow.com.')],
      [b('Crafting and the guild map', 'Artisanat et carte de guilde'), b('Find who can craft what, post crafting orders and see guildmates on the world map.', 'Trouvez qui peut fabriquer quoi, publiez des commandes et voyez vos membres sur la carte du monde.')],
      [b('Ready checks and gear', 'Appels et équipement'), b('Every ready check also checks gear, enchants and consumables, so the raid lead knows who to nudge.', 'Chaque appel vérifie aussi l’équipement, les enchantements et les consommables, pour savoir qui relancer.')],
      [b('Discord sync', 'Synchronisation Discord'), b('The companion uploads your saved data after each session; the bot turns it into posts, leaderboards and recaps.', 'Le compagnon envoie vos données après chaque session; le bot en fait des publications, des classements et des résumés.')]
    ],
    install: [
      { title: b('The addon', 'L’addon'), status: 'live', steps: [...curseforgeSteps('Guilded'), b('Type <code>/guilded</code> in game. A setup window opens on first login; reopen it with <code>/guilded setup</code>.', 'Tapez <code>/guilded</code> en jeu. Une fenêtre de configuration s’ouvre à la première connexion; rouvrez-la avec <code>/guilded setup</code>.')], image: wide('guilded/install-curseforge', b('Guilded on CurseForge, Files tab', 'Guilded sur CurseForge, onglet Files'), b('Guilded on CurseForge', 'Guilded sur CurseForge'), 915, 625) },
      { title: b('Guild Sync Companion (Windows 10 and 11)', 'Guild Sync Companion (Windows 10 et 11)'), status: 'live', steps: [
        b('Get <a href="https://apps.microsoft.com/detail/9N680XX3QFL9"><strong>Guild Sync Companion</strong></a> from the Microsoft Store and click <strong>Get</strong> or <strong>Download</strong>.', 'Obtenez <a href="https://apps.microsoft.com/detail/9N680XX3QFL9"><strong>Guild Sync Companion</strong></a> dans le Microsoft Store et cliquez sur <strong>Obtenir</strong> ou <strong>Télécharger</strong>.'),
        b('Open it once. It finds WoW and your guild’s Discord by itself, and installs or updates the addon if needed.', 'Ouvrez-le une fois. Il trouve WoW et le Discord de votre guilde tout seul, et installe ou met à jour l’addon au besoin.'),
        b('Type <code>/reload</code> in game. The <strong>Last sync</strong> line turns green. <strong>Sign in with Discord</strong> is optional.', 'Tapez <code>/reload</code> en jeu. La ligne <strong>Dernière synchro</strong> passe au vert. <strong>Se connecter avec Discord</strong> est facultatif.')
      ], image: wide('guilded/install-store', b('Guild Sync Companion on the Microsoft Store', 'Guild Sync Companion sur le Microsoft Store'), b('The Microsoft Store listing', 'La fiche du Microsoft Store'), 915, 480) },
      { title: b('The Discord bot (for server admins)', 'Le bot Discord (pour les admins du serveur)'), status: 'live', steps: [
        b('<a href="https://discord.com/oauth2/authorize?client_id=1552633893587394590&amp;scope=bot+applications.commands&amp;integration_type=0&amp;permissions=2269718837849168">Add Guilded to your server</a>.', '<a href="https://discord.com/oauth2/authorize?client_id=1552633893587394590&amp;scope=bot+applications.commands&amp;integration_type=0&amp;permissions=2269718837849168">Ajoutez Guilded à votre serveur</a>.'),
        b('Run <code>/setup start</code> for the guided setup. Guilded Lite works right away.', 'Lancez <code>/setup start</code> pour la configuration guidée. Guilded Lite fonctionne tout de suite.'),
        b('Addon sync and seasons unlock once your server is approved. Ask in the <a href="' + discord + '">project Discord</a>.', 'La synchro de l’addon et les saisons se débloquent une fois votre serveur approuvé. Demandez dans le <a href="' + discord + '">Discord des projets</a>.')
      ] },
      { title: b('The Android app', 'L’application Android'), status: 'testing', steps: [
        b('The app is in closed testing on Google Play. Ask for a tester spot in the <a href="' + discord + '">project Discord</a> so your Google account is added.', 'L’application est en test fermé sur Google Play. Demandez une place de testeur dans le <a href="' + discord + '">Discord des projets</a> pour que votre compte Google soit ajouté.'),
        b('Open <a href="https://play.google.com/apps/testing/top.kcaron.guilded">the testing page</a> on your phone and tap <strong>Become a tester</strong>.', 'Ouvrez <a href="https://play.google.com/apps/testing/top.kcaron.guilded">la page de test</a> sur votre téléphone et touchez <strong>Devenir testeur</strong>.'),
        b('Install <a href="https://play.google.com/store/apps/details?id=top.kcaron.guilded">Guilded from Google Play</a>, then sign in with Discord.', 'Installez <a href="https://play.google.com/store/apps/details?id=top.kcaron.guilded">Guilded depuis Google Play</a>, puis connectez-vous avec Discord.')
      ] }
    ],
    guides: [
      { title: b('Open the addon', 'Ouvrir l’addon'), steps: [
        b('Click the gold coin on the minimap or type <code>/guilded menu</code>.', 'Cliquez sur la pièce dorée de la minicarte ou tapez <code>/guilded menu</code>.'),
        b('The sidebar has Home, Guild, Dungeons, Crafting, Raids, Officer and Settings.', 'La barre de côté contient Accueil, Guilde, Donjons, Artisanat, Raids, Officier et Réglages.'),
        b('<strong>Send to Discord</strong> pushes your latest data right away.', '<strong>Envoyer à Discord</strong> envoie vos dernières données tout de suite.')
      ] },
      { title: b('Link your character', 'Lier votre personnage'), steps: [
        b('In Discord, run <code>/character link</code>.', 'Dans Discord, lancez <code>/character link</code>.'),
        b('Send the bot your full character name, or let the companion link it for you.', 'Envoyez au bot le nom complet de votre personnage, ou laissez le compagnon le lier pour vous.'),
        b('In game, <code>/guilded share</code> gives you a line to paste if you need it.', 'En jeu, <code>/guilded share</code> vous donne une ligne à coller au besoin.')
      ] },
      { title: b('Run a raid night', 'Mener une soirée de raid'), steps: [
        b('Raid leads post the raid with <code>/lead create</code>. Members sign up on the Discord post or in the phone app.', 'Le chef de raid publie le raid avec <code>/lead create</code>. Les membres s’inscrivent sur la publication Discord ou dans l’application.'),
        b('In game, <code>/guilded invite raid</code> invites everyone signed up, and <code>/guilded start &lt;title&gt;</code> starts the record.', 'En jeu, <code>/guilded invite raid</code> invite tous les inscrits, et <code>/guilded start &lt;titre&gt;</code> lance l’enregistrement.'),
        b('Mark bosses with <code>/guilded boss &lt;name&gt;</code> and finish with <code>/guilded end</code>. The recap is posted in Discord.', 'Notez les boss avec <code>/guilded boss &lt;nom&gt;</code> et terminez avec <code>/guilded end</code>. Le résumé est publié dans Discord.')
      ] },
      { title: b('EP/GP and loot bids', 'EP/GP et enchères'), steps: [
        b('Award EP to the group with <code>/guilded award group &lt;amount&gt;</code>.', 'Donnez des EP au groupe avec <code>/guilded award group &lt;montant&gt;</code>.'),
        b('Start a bid with <code>/guilded bid start &lt;min GP&gt; &lt;item&gt;</code>; the Loot page shows bids and the winner.', 'Lancez une enchère avec <code>/guilded bid start &lt;GP min&gt; &lt;objet&gt;</code>; la page Butin montre les mises et le gagnant.'),
        b('Members check their standing with <code>/epgp balance</code> and past loot with <code>/loot history</code> in Discord.', 'Les membres voient leur solde avec <code>/epgp balance</code> et l’historique avec <code>/loot history</code> dans Discord.')
      ] },
      { title: b('Dungeon scores', 'Pointages de donjon'), steps: [
        b('Just play: runs are recorded automatically when the group has the addon.', 'Jouez, tout simplement : les sorties sont enregistrées automatiquement quand le groupe a l’addon.'),
        b('Type <code>/guilded score</code> for your score and <code>/guilded dungeon status</code> during a run.', 'Tapez <code>/guilded score</code> pour votre pointage et <code>/guilded dungeon status</code> pendant une sortie.'),
        b('Run cards land in Discord and on the <a href="https://guildedwow.com/leaderboards/">guildedwow.com leaderboards</a>.', 'Les cartes de sortie arrivent dans Discord et dans les <a href="https://guildedwow.com/leaderboards/">classements de guildedwow.com</a>.')
      ] }
    ],
    more: b('Full guides for members and officers live on <a href="https://guildedwow.com/">guildedwow.com</a>. Guilded also comes in two smaller addons: <a href="/addons/#guilded-dungeons">Guilded Dungeons</a> and <a href="/addons/#guilded-games">Guilded Games</a>.', 'Les guides complets pour les membres et les officiers sont sur <a href="https://guildedwow.com/">guildedwow.com</a>. Guilded existe aussi en deux addons plus légers : <a href="/fr/addons/#guilded-dungeons">Guilded Dungeons</a> et <a href="/fr/addons/#guilded-games">Guilded Games</a>.')
  },
  {
    slug: 'cardstead', name: 'Cardstead', theme: 'cardstead', icon: 'cardstead/icon.webp',
    category: b('Pokémon TCG prices for Canada', 'Prix Pokémon TCG pour le Canada'),
    tagline: b('Price checks in Canadian dollars and drop alerts for Pokémon TCG collectors in Canada.', 'Des prix en dollars canadiens et des alertes d’arrivage pour les collectionneurs Pokémon TCG au Canada.'),
    summary: b('Cardstead shows what cards and sealed products are worth in CA$, with where the price comes from, how recent it is and how sure it is. It also tracks drops and restocks at Canadian shops, your watchlist and your set checklists. No account needed, no ads.', 'Cardstead montre ce que valent les cartes et les produits scellés en $ CA, avec la source du prix, sa date et son niveau de confiance. Il suit aussi les arrivages dans les boutiques canadiennes, votre liste de suivi et vos listes d’extensions. Aucun compte requis, aucune pub.'),
    statuses: [['live', b('Web app', 'Application Web')], ['testing', b('Android app', 'Application Android')]],
    links: [
      { href: 'https://pokeflip-studio.vercel.app/', label: b('Open Cardstead', 'Ouvrir Cardstead'), primary: true },
      { href: 'https://play.google.com/apps/testing/top.kcaron.cardstudio', label: b('Become an Android tester', 'Devenir testeur Android') }
    ],
    shots: [
      phone('cardstead/prices', b('Cardstead Prices tab with popular products and their CA$ prices', 'Onglet Prix de Cardstead avec les produits populaires et leurs prix en $ CA'), b('Prices: search any card or sealed product', 'Prix : cherchez une carte ou un produit scellé')),
      phone('cardstead/product', b('Cardstead product page: market value, MSRP and price history', 'Page produit de Cardstead : valeur marchande, PDSF et historique des prix'), b('A product: value, source, confidence and history', 'Un produit : valeur, source, confiance et historique')),
      phone('cardstead/sets', b('Cardstead All sets page with set values', 'Page Toutes les extensions de Cardstead avec la valeur des extensions'), b('Every set with its value', 'Chaque extension avec sa valeur')),
      phone('cardstead/drops', b('Cardstead Drops tab with recent restocks at Canadian shops', 'Onglet Arrivages de Cardstead avec les arrivages récents en boutique'), b('Drops and restocks at Canadian shops', 'Arrivages dans les boutiques canadiennes')),
      phone('cardstead/watch', b('Cardstead Watchlist tab', 'Onglet Liste de suivi de Cardstead'), b('Your watchlist', 'Votre liste de suivi'))
    ],
    features: [
      [b('Check a price', 'Vérifier un prix'), b('Every card of every set and sealed products, by name or number, French names included. Sold prices from TCGplayer and Cardmarket, converted at the Bank of Canada rate.', 'Chaque carte de chaque extension et les produits scellés, par nom ou numéro, noms français compris. Prix vendus de TCGplayer et Cardmarket, convertis au taux de la Banque du Canada.')],
      [b('Price history', 'Historique des prix'), b('7 days, 30 days or a year, with the source, date and a confidence level on every price.', '7 jours, 30 jours ou un an, avec la source, la date et un niveau de confiance pour chaque prix.')],
      [b('eBay.ca asking prices', 'Prix demandés sur eBay.ca'), b('The typical price of listings that ship to Canada, with a link to the cheapest. Asking prices, clearly labelled, never called sales.', 'Le prix typique des annonces livrées au Canada, avec un lien vers la moins chère. Des prix demandés, bien indiqués, jamais présentés comme des ventes.')],
      [b('Watchlist', 'Liste de suivi'), b('Pick the printing, condition or grade, then a target price or an “under value” level.', 'Choisissez l’impression, l’état ou la note, puis un prix cible ou un seuil « sous la valeur ».')],
      [b('Set checklists', 'Listes d’extensions'), b('Value owned, value missing, cost to complete, Master set mode, and whether a booster pack is worth opening.', 'Valeur possédée, valeur manquante, coût pour compléter, mode Master set, et si un booster vaut la peine d’être ouvert.')],
      [b('Drops in Canada', 'Arrivages au Canada'), b('Coming drops, recent restocks at Canadian shops and optional drop and price alerts.', 'Prochaines sorties, arrivages récents dans les boutiques canadiennes et alertes facultatives d’arrivage et de prix.')]
    ],
    install: [
      { title: b('On the web (any phone or computer)', 'Sur le Web (téléphone ou ordinateur)'), status: 'live', steps: [
        b('Open <a href="https://pokeflip-studio.vercel.app/">Cardstead</a>. It works in any recent browser, in English or French.', 'Ouvrez <a href="https://pokeflip-studio.vercel.app/?lang=fr">Cardstead</a>. Il fonctionne dans tout navigateur récent, en français ou en anglais.'),
        b('To keep it on your phone, use your browser’s <strong>Add to Home screen</strong> (or <strong>Install app</strong>).', 'Pour le garder sur votre téléphone, utilisez <strong>Ajouter à l’écran d’accueil</strong> (ou <strong>Installer l’application</strong>) dans votre navigateur.')
      ] },
      { title: b('Android app (closed testing)', 'Application Android (test fermé)'), status: 'testing', steps: playTesterSteps('top.kcaron.cardstudio') }
    ],
    guides: [
      { title: b('Check a price', 'Vérifier un prix'), steps: [
        b('On <strong>Prices</strong>, type a card or product in <strong>Find a product</strong>, for example “Charizard 4/102”.', 'Dans <strong>Prix</strong>, tapez une carte ou un produit dans <strong>Trouver un produit</strong>, par exemple « Dracaufeu 4/102 ».'),
        b('Open a result to see the CA$ value, where it comes from, its date and its confidence.', 'Ouvrez un résultat pour voir la valeur en $ CA, sa source, sa date et sa confiance.'),
        b('Switch the history between <strong>7 days</strong>, <strong>30 days</strong> and <strong>1 year</strong>.', 'Passez l’historique entre <strong>7 jours</strong>, <strong>30 jours</strong> et <strong>1 an</strong>.')
      ] },
      { title: b('Fill a set checklist', 'Remplir une liste d’extension'), steps: [
        b('Tap <strong>All sets</strong> and pick a set.', 'Touchez <strong>Toutes les extensions</strong> et choisissez une extension.'),
        b('Tap the cards you own to tick them. The value owned and the cost to complete update as you go.', 'Touchez les cartes que vous avez pour les cocher. La valeur possédée et le coût pour compléter se mettent à jour.'),
        b('Turn on Master set mode to count every printing.', 'Activez le mode Master set pour compter chaque impression.')
      ] },
      { title: b('Watch a card', 'Suivre une carte'), steps: [
        b('On <strong>Watchlist</strong>, tap <strong>Add a card</strong>.', 'Dans <strong>Liste de suivi</strong>, touchez <strong>Ajouter une carte</strong>.'),
        b('Pick the exact card and printing, with a grade and the price you paid if you like.', 'Choisissez la carte et l’impression exactes, avec une note et le prix payé si vous voulez.'),
        b('Set a target price or a “% under value” level. Cardstead checks once a day while it’s open.', 'Fixez un prix cible ou un seuil « % sous la valeur ». Cardstead vérifie une fois par jour quand il est ouvert.')
      ] },
      { title: b('Follow drops and get alerts', 'Suivre les arrivages et recevoir des alertes'), steps: [
        b('Open <strong>Drops</strong> for coming drops and the last 7 days of restocks at Canadian shops.', 'Ouvrez <strong>Arrivages</strong> pour les prochaines sorties et les arrivages des 7 derniers jours en boutique.'),
        b('Watch a product with a maximum price, your province and the stores you want.', 'Suivez un produit avec un prix maximum, votre province et les boutiques voulues.'),
        b('For alerts, go to <strong>Settings</strong>, <strong>Sign in</strong> with your email (no password), then turn on <strong>Drop alerts on this device</strong>.', 'Pour les alertes, allez dans <strong>Réglages</strong>, <strong>Se connecter</strong> avec votre courriel (sans mot de passe), puis activez <strong>Alertes d’arrivage sur cet appareil</strong>.')
      ] }
    ],
    more: b('Prices are for information only; they are not appraisals or financial advice. Cardstead is independent and not affiliated with Nintendo, The Pokémon Company, eBay, TCGplayer or Cardmarket.', 'Les prix sont donnés à titre informatif; ce ne sont ni des évaluations ni des conseils financiers. Cardstead est indépendant et n’est affilié ni à Nintendo, ni à The Pokémon Company, ni à eBay, TCGplayer ou Cardmarket.')
  },
  {
    slug: 'goblin-ledger', name: 'Goblin Ledger', theme: 'goblin', icon: 'goblin-ledger/icon.webp',
    category: b('WoW Forever auction house prices', 'Prix de l’hôtel des ventes de WoW Forever'),
    tagline: b('Live auction house prices, charts and market indexes for WoW Forever, on the web and on Android.', 'Les prix de l’hôtel des ventes en direct, des graphiques et des indices de marché pour WoW Forever, sur le Web et sur Android.'),
    summary: b('Goblin Ledger reads Blizzard’s official auction house data for WoW Forever every hour and turns it into charts you can actually use: watchlists, movers, deals, flips between houses and a weekly recap. Free, no account, no ads.', 'Goblin Ledger lit les données officielles de l’hôtel des ventes de WoW Forever chaque heure et en fait des graphiques vraiment utiles : listes de suivi, variations, aubaines, reventes entre hôtels et un résumé de la semaine. Gratuit, sans compte, sans pub.'),
    statuses: [['live', b('Web app', 'Application Web')], ['testing', b('Android app', 'Application Android')]],
    links: [
      { href: '/goblin-ledger/app/', label: b('Open the web app', 'Ouvrir l’application Web'), primary: true },
      { href: 'testers/', label: b('Become an Android tester', 'Devenir testeur Android'), local: true }
    ],
    shots: [
      phone('goblin-ledger/overview', b('Goblin Ledger Market tab with the weekly summary and the Ledger 100 index', 'Onglet Marché de Goblin Ledger avec le résumé de la semaine et l’indice Ledger 100'), b('Market: the week and the Ledger 100 index', 'Marché : la semaine et l’indice Ledger 100')),
      phone('goblin-ledger/watchlist', b('Goblin Ledger Flipping watchlist with prices and 24h change', 'Liste de suivi Revente de Goblin Ledger avec prix et variation sur 24 h'), b('Watchlists with 24h change', 'Listes de suivi avec variation sur 24 h')),
      phone('goblin-ledger/chart', b('Goblin Ledger candle chart for Black Lotus', 'Graphique en chandeliers du Lotus noir dans Goblin Ledger'), b('Charts for every item', 'Un graphique pour chaque objet')),
      phone('goblin-ledger/explore', b('Goblin Ledger Explore tab with item categories', 'Onglet Explorer de Goblin Ledger avec les catégories d’objets'), b('Explore every item on sale', 'Explorez tout ce qui est en vente')),
      phone('goblin-ledger/alerts', b('Goblin Ledger price and deal alerts', 'Alertes de prix et d’aubaines de Goblin Ledger'), b('Price and deal alerts', 'Alertes de prix et d’aubaines'))
    ],
    features: [
      [b('Market overview', 'Aperçu du marché'), b('The week in a few lines, the Ledger 100 price index, gold traded and the biggest movers.', 'La semaine en quelques lignes, l’indice des prix Ledger 100, l’or échangé et les plus fortes variations.')],
      [b('Watchlists', 'Listes de suivi'), b('Nine ready-made lists (flipping, herbs, ores, cloth, enchanting, raid consumables and more) plus your own.', 'Neuf listes prêtes (revente, herbes, minerais, tissus, enchantement, consommables de raid et plus) en plus des vôtres.')],
      [b('Real charts', 'De vrais graphiques'), b('Candles, line or area; 1H to 1W; moving averages, Bollinger bands, RSI and MACD; compare two items.', 'Chandeliers, ligne ou aire; de 1 h à 1 semaine; moyennes mobiles, bandes de Bollinger, RSI et MACD; comparez deux objets.')],
      [b('Deals and flips', 'Aubaines et reventes'), b('Items listed below their 7-day average, and a flip finder between your faction house and Blackwater.', 'Les objets sous leur moyenne de 7 jours, et un chercheur de reventes entre votre hôtel de faction et Blackwater.')],
      [b('Alerts', 'Alertes'), b('Price above or below a level, and deal alerts on a whole list. On Android they run in the background.', 'Prix au-dessus ou en dessous d’un seuil, et alertes d’aubaines sur une liste entière. Sur Android, elles tournent en arrière-plan.')],
      [b('Every realm group', 'Tous les groupes de royaumes'), b('PvP and the other realm groups, Alliance, Horde and Blackwater, in English or French, dark or light.', 'JcJ et les autres groupes de royaumes, Alliance, Horde et Blackwater, en français ou en anglais, sombre ou clair.')]
    ],
    install: [
      { title: b('On the web', 'Sur le Web'), status: 'live', steps: [
        b('Open <a href="/goblin-ledger/app/">kcaron.top/goblin-ledger/app</a> on a phone or a computer.', 'Ouvrez <a href="/goblin-ledger/app/">kcaron.top/goblin-ledger/app</a> sur un téléphone ou un ordinateur.'),
        b('Pick your realm group and faction. You can change them any time from the house button at the top.', 'Choisissez votre groupe de royaumes et votre faction. Vous pouvez les changer en tout temps avec le bouton de l’hôtel, en haut.'),
        b('To keep it on your phone, use your browser’s <strong>Add to Home screen</strong>.', 'Pour le garder sur votre téléphone, utilisez <strong>Ajouter à l’écran d’accueil</strong> dans votre navigateur.')
      ] },
      { title: b('Android app (closed testing)', 'Application Android (test fermé)'), status: 'testing', steps: playTesterSteps('top.kcaron.goldline'), more: b('The same steps on their own page: <a href="testers/">become a tester</a>.', 'Les mêmes étapes sur leur propre page : <a href="testers/">devenir testeur</a>.') }
    ],
    guides: [
      { title: b('Follow an item', 'Suivre un objet'), steps: [
        b('On <strong>Watchlist</strong>, tap the search icon and type an item name (English or French) or its item ID.', 'Dans <strong>Suivi</strong>, touchez la loupe et tapez le nom d’un objet (français ou anglais) ou son numéro.'),
        b('Add it to the list shown in one tap, or open it to see its chart.', 'Ajoutez-le à la liste affichée en un toucher, ou ouvrez-le pour voir son graphique.'),
        b('Switch lists with the list name at the top. Sort by price or change, in % or in gold.', 'Changez de liste avec son nom, en haut. Triez par prix ou par variation, en % ou en or.')
      ] },
      { title: b('Read a chart', 'Lire un graphique'), steps: [
        b('Pick a time frame: <strong>1H</strong>, <strong>4H</strong>, <strong>1D</strong> or <strong>1W</strong>.', 'Choisissez une période : <strong>1H</strong>, <strong>4H</strong>, <strong>1J</strong> ou <strong>1S</strong>.'),
        b('Each candle is the market value; the bars underneath are the quantity listed.', 'Chaque chandelier est la valeur marchande; les barres en dessous sont la quantité en vente.'),
        b('Add indicators or a second item to compare from the layers button.', 'Ajoutez des indicateurs ou un deuxième objet à comparer avec le bouton des couches.')
      ] },
      { title: b('Find deals and flips', 'Trouver des aubaines et des reventes'), steps: [
        b('Open <strong>Explore</strong>, then <strong>Markets</strong>.', 'Ouvrez <strong>Explorer</strong>, puis <strong>Marchés</strong>.'),
        b('<strong>Deals</strong> lists items under their 7-day average; the flip finder compares your house with Blackwater after the house cut.', 'Les <strong>aubaines</strong> sont les objets sous leur moyenne de 7 jours; le chercheur de reventes compare votre hôtel avec Blackwater, après la commission.'),
        b('Tap any row to open its chart before you buy.', 'Touchez une ligne pour ouvrir son graphique avant d’acheter.')
      ] },
      { title: b('Set an alert', 'Créer une alerte'), steps: [
        b('Open an item’s chart and tap the bell.', 'Ouvrez le graphique d’un objet et touchez la cloche.'),
        b('Choose above or below and a price.', 'Choisissez au-dessus ou en dessous et un prix.'),
        b('For a whole list, use <strong>Deal alerts</strong> on the <strong>Alerts</strong> tab. On the web, keep the page open and allow notifications.', 'Pour une liste entière, utilisez <strong>Alertes d’aubaines</strong> dans l’onglet <strong>Alertes</strong>. Sur le Web, gardez la page ouverte et autorisez les notifications.')
      ] },
      { title: b('Link to an item', 'Partager un lien vers un objet'), steps: [
        b('Every item has a stable address: <code>kcaron.top/goblin-ledger/app/?house=&lt;house&gt;&amp;item=&lt;item ID&gt;</code>.', 'Chaque objet a une adresse stable : <code>kcaron.top/goblin-ledger/app/?house=&lt;hôtel&gt;&amp;item=&lt;numéro&gt;</code>.'),
        b('The market recaps in Discord link every item this way, so a tap opens its chart.', 'Les résumés du marché dans Discord lient chaque objet ainsi : un toucher ouvre son graphique.')
      ] }
    ],
    more: b('Prefer not to use Google Play? The <a href="https://github.com/kevincaron28/Trading-Wow/releases/latest/download/goldline.apk">APK is on GitHub</a>. Privacy: <a href="/goldline/privacy/">Goblin Ledger privacy policy</a>. Goblin Ledger is an independent fan project, not affiliated with Blizzard Entertainment.', 'Vous préférez éviter Google Play? L’<a href="https://github.com/kevincaron28/Trading-Wow/releases/latest/download/goldline.apk">APK est sur GitHub</a>. Confidentialité : <a href="/fr/goldline/privacy/">politique de confidentialité de Goblin Ledger</a>. Goblin Ledger est un projet de fan indépendant, sans affiliation avec Blizzard Entertainment.')
  },
  {
    slug: 'lantern-deck', name: 'Lantern Deck', theme: 'lantern',
    category: b('Windows app for streamers', 'Application Windows pour streamers'),
    tagline: b('Control TikTok LIVE Studio from your phone or tablet: switch scenes, mute audio and see what’s live at a glance.', 'Contrôlez TikTok LIVE Studio depuis votre téléphone ou votre tablette : changez de scène, coupez le son et voyez ce qui est actif d’un coup d’œil.'),
    summary: b('Lantern Deck is a free, open-source control deck for TikTok LIVE Studio on Windows. It talks to LIVE Studio directly, so buttons light up on the real scene and mute state. No account, no subscription, no telemetry.', 'Lantern Deck est un panneau de contrôle gratuit et libre pour TikTok LIVE Studio sur Windows. Il parle directement à LIVE Studio : les boutons s’allument selon la vraie scène et le vrai état du son. Aucun compte, aucun abonnement, aucune télémétrie.'),
    statuses: [['live', b('Windows', 'Windows')]],
    links: [
      { href: 'https://github.com/kevincaron28/Lantern-Deck/releases', label: b('Download from GitHub', 'Télécharger sur GitHub'), primary: true },
      { href: 'https://github.com/kevincaron28/Lantern-Deck', label: b('Source code', 'Code source') }
    ],
    shots: [],
    features: [
      [b('Direct studio control', 'Contrôle direct du studio'), b('Scene buttons light up on the current scene; mute buttons show Muted or On. No hotkeys needed.', 'Les boutons de scène s’allument sur la scène en cours; ceux du son affichent Coupé ou Actif. Aucun raccourci clavier requis.')],
      [b('Phone and tablet deck', 'Panneau sur téléphone et tablette'), b('Scan a QR code, enter a one-time code, done. Paired devices stay paired.', 'Scannez un code QR, entrez un code unique, c’est tout. Les appareils jumelés le restent.')],
      [b('Safe by default', 'Sécuritaire par défaut'), b('Starts in rehearsal until you turn on Live control. While you’re live, phones confirm scene changes.', 'Démarre en répétition tant que le contrôle en direct n’est pas activé. En direct, le téléphone confirme les changements de scène.')],
      [b('Multi-step buttons', 'Boutons à plusieurs étapes'), b('One tap for several steps, like switching to BRB and muting the mic. A LIVE timer shows how long you’ve been on.', 'Un toucher pour plusieurs étapes, comme passer à « De retour bientôt » et couper le micro. Un chrono montre depuis combien de temps vous êtes en direct.')]
    ],
    install: [
      { title: b('Windows 10 and 11', 'Windows 10 et 11'), status: 'live', steps: [
        b('Download <code>Lantern-Deck-&lt;version&gt;-Setup.exe</code> from the <a href="https://github.com/kevincaron28/Lantern-Deck/releases">Releases page</a> (or the Portable .zip).', 'Téléchargez <code>Lantern-Deck-&lt;version&gt;-Setup.exe</code> sur la <a href="https://github.com/kevincaron28/Lantern-Deck/releases">page des versions</a> (ou le .zip portable).'),
        b('Run it. It installs for your Windows user, no administrator rights. The build is unsigned, so SmartScreen may warn the first time.', 'Lancez-le. Il s’installe pour votre utilisateur Windows, sans droits d’administrateur. La version n’est pas signée : SmartScreen peut avertir la première fois.'),
        b('If Windows asks about network access, allow <strong>Private</strong> networks only.', 'Si Windows demande l’accès réseau, autorisez seulement les réseaux <strong>privés</strong>.')
      ] }
    ],
    guides: [
      { title: b('First run (5 minutes)', 'Premier démarrage (5 minutes)'), steps: [
        b('Open LIVE Studio on its main screen, then start Lantern Deck. The control center opens.', 'Ouvrez LIVE Studio sur son écran principal, puis lancez Lantern Deck. Le centre de contrôle s’ouvre.'),
        b('Pair your phone: scan the QR code and enter the pairing code. Phone and PC must be on the same home network.', 'Jumelez votre téléphone : scannez le code QR et entrez le code de jumelage. Le téléphone et le PC doivent être sur le même réseau.'),
        b('<strong>Edit buttons → Match scenes by name</strong>, check, save.', '<strong>Modifier les boutons → Associer les scènes par nom</strong>, vérifiez, enregistrez.'),
        b('Run the studio test while offline, then flip <strong>Live control</strong> on.', 'Lancez le test du studio hors ligne, puis activez le <strong>contrôle en direct</strong>.')
      ] }
    ],
    more: b('The phone link is plain HTTP on your home network: never forward its port to the internet. Lantern Deck is independent and not affiliated with TikTok.', 'Le lien du téléphone est en HTTP simple sur votre réseau : ne redirigez jamais son port vers Internet. Lantern Deck est indépendant et n’est pas affilié à TikTok.')
  },
  {
    slug: 'pied-marin', name: 'Pied Marin Fishing', theme: 'fishing',
    category: b('Community website', 'Site communautaire'),
    tagline: b('A bilingual home for our Québec fishing team, with a tournament guide, our best catches and a log of our days on the water.', 'Le site bilingue de notre équipe de pêche québécoise, avec un guide des tournois, nos plus belles prises et un journal de nos sorties sur l’eau.'),
    summary: b('Pied Marin Fishing is a crew from Québec that fishes pike, bass and walleye. I built the team’s website, including a directory of fishing tournaments across the province that any angler can use.', 'Pied Marin Fishing est une équipe du Québec qui pêche le brochet, l’achigan et le doré. J’ai bâti le site de l’équipe, avec un répertoire des tournois de pêche de la province que tout pêcheur peut utiliser.'),
    statuses: [['live', b('Website', 'Site Web')]],
    links: [{ href: 'https://piedmarinfishing.com/', label: b('Visit piedmarinfishing.com', 'Visiter piedmarinfishing.com'), primary: true }],
    shots: [
      wide('pied-marin/home', b('Pied Marin Fishing home page', 'Page d’accueil de Pied Marin Fishing'), b('The home page', 'La page d’accueil'), 1280, 800, true),
      wide('pied-marin/tournaments', b('Québec tournament guide with filters by season and species', 'Guide des tournois au Québec avec filtres par saison et espèce'), b('The Québec tournament guide', 'Le guide des tournois au Québec'), 1280, 800, true),
      wide('pied-marin/catches', b('The team’s best catches', 'Les plus belles prises de l’équipe'), b('Our best catches', 'Nos plus belles prises'), 1280, 800, true),
      wide('pied-marin/team', b('A northern pike caught by the Pied Marin Fishing team', 'Un grand brochet pêché par l’équipe Pied Marin Fishing'), b('A good day on the water', 'Une belle journée sur l’eau'), 800, 602)
    ],
    features: [
      [b('Tournament guide', 'Guide des tournois'), b('Fishing tournaments across Québec, filtered by season, species and region.', 'Les tournois de pêche du Québec, filtrés par saison, espèce et région.')],
      [b('Best catches', 'Plus belles prises'), b('The fish we’re proudest of, with the spot, the season and the story.', 'Les poissons dont on est le plus fiers, avec l’endroit, la saison et l’histoire.')],
      [b('Team and season', 'Équipe et saison'), b('Who we are, our results and our outings, in French and English.', 'Qui on est, nos résultats et nos sorties, en français et en anglais.')]
    ],
    install: [],
    guides: [
      { title: b('Find a tournament', 'Trouver un tournoi'), steps: [
        b('Open <a href="https://piedmarinfishing.com/tournaments.html?lang=en">Tournaments</a>.', 'Ouvrez <a href="https://piedmarinfishing.com/tournaments.html">Tournois</a>.'),
        b('Pick the season, then filter by species or search a lake or town.', 'Choisissez la saison, puis filtrez par espèce ou cherchez un lac ou une ville.'),
        b('Open a tournament for its date, place and organizer’s link.', 'Ouvrez un tournoi pour sa date, son lieu et le lien de l’organisateur.')
      ] }
    ]
  }
];

export const addons = [
  { name: 'Catchkeeper', slug: 'catchkeeper', en: 'A journal for your catches, fishing spots and sessions.', fr: 'Un journal de vos prises, lieux de pêche et sessions.', image: 'catchkeeper.png' },
  { name: 'Trailmark', slug: 'trailmark', en: 'Record the routes you take through Azeroth.', fr: 'Gardez une trace de vos trajets en Azeroth.', image: 'trailmark.png' },
  { name: 'Guilded Dungeons', slug: 'guilded-dungeons', en: 'Dungeon timers, run results and leaderboards, the light version of Guilded.', fr: 'Chronos de donjon, résultats et classements : la version légère de Guilded.' },
  { name: 'Guilded Games', slug: 'guilded-games', en: 'Dice and trivia games for party and raid chat. Only the host needs it.', fr: 'Jeux de dés et quiz pour le clavardage de groupe ou de raid. Seul l’hôte en a besoin.' },
  { name: 'Pullscript', slug: 'pullscript', en: 'Raid assignments, markers and pull timers.', fr: 'Affectations de raid, marqueurs et comptes à rebours.' },
  { name: 'Well Supplied', slug: 'well-supplied', en: 'Reminders for buffs and raid preparation.', fr: 'Rappels de buffs et de préparation de raid.' },
  { name: 'Tandem', slug: 'tandem', en: 'Partner targeting and customizable buttons for duo play.', fr: 'Ciblage du partenaire et boutons personnalisables pour jouer en duo.' },
  { name: 'Wayledger', slug: 'wayledger', en: 'Wishlists and planning for item and recipe runs.', fr: 'Listes d’objets et de recettes à obtenir, et planification de sorties.' },
  { name: 'Unfinished Business', slug: 'unfinished-business', en: 'Track personal goals for items, levels, quests and reputation.', fr: 'Suivi des objectifs d’objets, de niveaux, de quêtes et de réputation.' },
  { name: 'Spellscript', slug: 'spellscript', en: 'A guided macro editor with saved drafts.', fr: 'Un éditeur guidé de macros avec sauvegarde des brouillons.' }
];

export const addonInstall = { curseforge: curseforgeSteps, manual: manualSteps };
export const goblinTesterSteps = playTesterSteps('top.kcaron.goldline', b('Keep the app installed and opted in for at least 14 days. That’s what lets Goblin Ledger go public on Google Play.', 'Gardez l’application installée et restez inscrit au moins 14 jours. C’est ce qui permet à Goblin Ledger de sortir publiquement sur Google Play.'));
