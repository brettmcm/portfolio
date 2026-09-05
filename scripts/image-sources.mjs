import { readFile } from 'node:fs/promises';
import canary from '../work/canary/content.mjs';
import bloop from '../work/bloop/content.mjs';
import dustyTimes from '../work/dusty-times/content.mjs';
const collect = blocks => blocks.flatMap(b => b.images || (b.blocks ? collect(b.blocks) : []));
const sources = [canary, bloop, dustyTimes].flatMap(p => [p.hero, ...collect(p.blocks)]).map(i => i.src);
const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
for (const [tag] of homepage.matchAll(/<img\b[^>]*>/g)) {
  const src = (tag.match(/data-image-original="([^"]+)"/) || tag.match(/\ssrc="([^"]+)"/))?.[1];
  if (src && !src.endsWith('.svg')) sources.push(src.replace(/^\.\//, '/'));
}
console.log(JSON.stringify([...new Set(sources)].sort()));
