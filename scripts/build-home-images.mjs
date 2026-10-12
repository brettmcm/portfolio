import { readFile, writeFile } from 'node:fs/promises';
import { imageAttributes, gallerySizes } from './responsive-images.mjs';
for (const file of ['index.html', 'about/index.html']) {
  const path = new URL('../' + file, import.meta.url);
  const original = await readFile(path, 'utf8');
  const prefix = file.startsWith('about/') ? '../' : './';
  const html = original.replace(/<img\b[^>]*>/g, tag => {
    const src = (tag.match(/data-image-original="([^"]+)"/) || tag.match(/\ssrc="([^"]+)"/))?.[1];
    if (!src || src.endsWith('.svg')) return tag;
    const key = src.replace(/^(?:\.\.?\/)+/, '/');
    const isHero = tag.includes('hero-slide-image');
    const width = Number(tag.match(/ width="(\d+)"/)?.[1]);
    const height = Number(tag.match(/ height="(\d+)"/)?.[1]);
    const sizes = tag.includes('hero-base-image') ? `max(100vw, ${(100 * width / height).toFixed(2)}vh)` : isHero ? `(max-width: 760px) calc((100vw - 20px) * ${Math.max(1, width / height).toFixed(4)}), max(100vw, ${(100 * width / height).toFixed(2)}vh)` : tag.includes('work-tile-image') ? 'auto, calc(100vw - 2 * clamp(20px, 3vw, 44px))' : tag.includes('about-portrait') ? 'auto, 300px' : gallerySizes;
    const attrs = imageAttributes(key, { sizes, relative: true }).replaceAll('./images/', prefix + 'images/');
    const clean = tag.replace(/\s(?:src|srcset|sizes|width|height|data-image-original)="[^"]*"/g, '');
    return clean.replace('<img', `<img data-image-original="${src}" ${attrs}`);
  });
  if (html !== original) await writeFile(path, html);
}
console.log('Built responsive homepage and About images');
