import { readFile, writeFile } from 'node:fs/promises';
import { imageAttributes, gallerySizes } from './responsive-images.mjs';
const path = new URL('../index.html', import.meta.url);
const original = await readFile(path, 'utf8');
const html = original.replace(/<img\b[^>]*>/g, tag => {
  const src = (tag.match(/data-image-original="([^"]+)"/) || tag.match(/\ssrc="([^"]+)"/))?.[1];
  if (!src || src.endsWith('.svg')) return tag;
  const sizes = tag.includes('about-portrait') ? 'auto, 300px' : gallerySizes;
  const clean = tag.replace(/\s(?:src|srcset|sizes|width|height|data-image-original)="[^"]*"/g, '');
  return clean.replace('<img', `<img data-image-original="${src}" ${imageAttributes(src, { sizes, relative: true })}`);
});
if (html !== original) await writeFile(path, html);
console.log('Built responsive homepage images');
