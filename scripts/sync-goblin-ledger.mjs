// Copies a Goblin Ledger web build into vendor/goblin-ledger/, which the site publishes at /goblin-ledger/app/.
// In the wow-trading repo: npm run build. Then here: node scripts/sync-goblin-ledger.mjs <path to wow-trading>/dist
import { access, cp, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const source = process.argv[2];
if (!source) throw new Error('Usage: node scripts/sync-goblin-ledger.mjs <wow-trading dist folder>');
await access(resolve(source, 'index.html'));
const target = new URL('../vendor/goblin-ledger/', import.meta.url);
await rm(target, { recursive: true, force: true });
await cp(resolve(source), target, { recursive: true });
console.log('Goblin Ledger web app copied. Run npm test, then commit vendor/goblin-ledger.');
