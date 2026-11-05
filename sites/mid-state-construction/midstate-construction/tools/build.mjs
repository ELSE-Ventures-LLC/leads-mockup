/**
 * build.mjs — injects generated line-art into the HTML template.
 * Usage: node tools/build.mjs   (from sites/midstate-construction/)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { heroBuilding, mississippiMap, projectSheets } from './iso-art.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const template = readFileSync(join(root, 'src', 'index.template.html'), 'utf8');

const art = {
  'hero-building': heroBuilding(),
  'map-mississippi': mississippiMap(),
};
projectSheets.forEach(({ id, fn }) => { art[`sheet-${id}`] = fn(); });

let out = template.replace(/<!-- @svg:([\w-]+) -->/g, (m, name) => {
  if (!art[name]) throw new Error(`No art generator named "${name}"`);
  return art[name];
});

writeFileSync(join(root, 'public', 'index.html'), out);
console.log(`built public/index.html (${(out.length / 1024).toFixed(1)} KB)`);
