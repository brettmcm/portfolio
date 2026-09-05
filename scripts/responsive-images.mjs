import { readFileSync } from 'node:fs';
const manifest = JSON.parse(readFileSync(new URL('../images/responsive-manifest.json', import.meta.url), 'utf8'));
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Match the shared CSS container widths and gutters. Lazy images use their actual
// rendered width in browsers supporting sizes="auto", with these CSS fallbacks.
export const contentWidth = (wide = false) => `(min(100vw, ${wide ? 1200 : 900}px) - 2 * clamp(20px, 3vw, 44px))`;
export const gallerySizes = `auto, min(calc${contentWidth()}, 90vw)`;
export function mediaSizes(block, item, nested = false, parent = null) {
  let width = contentWidth(nested ? parent?.width === 'wide' : block.width === 'wide');
  const about = nested && parent?.variant === 'about';
  const mobileWidth = width;
  if (about) width = `((${width} - 48px) / 2.65)`;
  let size = `calc${width}`;
  if (block.layout === 'pair' || block.layout === 'grid') {
    size = `calc((${width} - 8px) / 2)`;
    const mobile = block.layout === 'pair' ? `calc${mobileWidth}` : `calc((${mobileWidth} - 4px) / 2)`;
    return `auto, (max-width: 480px) ${mobile}, ${size}`;
  }
  if (block.layout === 'mosaic') {
    const [start, end] = (item.span || '1 / 2').split('/').map(Number);
    size = end - start === 2 ? `calc((${width} - 16px) * 5 / 9 + 8px)` : `calc((${width} - 16px) * 4 / 9)`;
    const mobile = end - start === 2 ? `calc((${mobileWidth} - 8px) * 5 / 9 + 4px)` : `calc((${mobileWidth} - 8px) * 4 / 9)`;
    return `auto, (max-width: 480px) ${mobile}, ${size}`;
  }
  return `auto, ${about ? `(max-width: 760px) calc${mobileWidth}, ` : ''}${size}`;
}
export function imageAttributes(src, { sizes = 'auto, 100vw', eager = false, relative = false, width, height } = {}) {
  const key = src.replace(/^\.\//, '/');
  const entry = manifest[key];
  const url = path => relative ? `.${path}` : path;
  if (!entry) {
    if (key.startsWith('/images/') && !key.endsWith('.svg')) throw new Error(`Missing responsive asset: ${key}. Run python3 scripts/build-images.py.`);
    return `src="${escape(src)}"${width && height ? ` width="${escape(width)}" height="${escape(height)}"` : ''}`;
  }
  // The hero's cover crop can be wider than its box on narrow, tall viewports.
  if (eager) sizes = `max(100vw, ${(260 * entry.width / entry.height).toFixed(2)}px)`;
  const fallback = entry.variants.find(v => v.width >= 960) || entry.variants.at(-1);
  return `src="${escape(url(fallback.src))}" srcset="${entry.variants.map(v => `${escape(url(v.src))} ${v.width}w`).join(', ')}" sizes="${escape(sizes)}" width="${entry.width}" height="${entry.height}"`;
}
