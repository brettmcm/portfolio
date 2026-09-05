import { imageAttributes, mediaSizes } from '../scripts/responsive-images.mjs';
// Pure HTML renderers: the same blocks can serve any case study, without a framework.
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// A paragraph is plain text or an array of inline runs. Emphasis never adds a paragraph break.
const inline = value => {
  if (Array.isArray(value)) return value.map(inline).join('');
  const text = escape(typeof value === 'string' ? value : value.text).replace(/\n/g, '<br>');
  return value.emphasis ? `<span class="case-emphasis">${text}</span>` : text;
};
const paragraphs = items => items.map(p => `<p>${inline(p)}</p>`).join('\n');
const image = (item, eager = false, sizes) => `<img ${imageAttributes(item.src, { eager, sizes, width: item.width, height: item.height })} alt="${escape(item.alt)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async"${eager ? ' fetchpriority="high"' : ''}>`;
const renderers = {
  text: b => `${b.title ? `<h2>${escape(b.title)}</h2>` : ''}<div class="section-copy">${paragraphs(b.paragraphs)}</div>`,
  statement: b => `<div class="case-statement">${paragraphs(b.paragraphs)}</div>`,
  media: (b, nested, parent) => `<div class="case-media case-media--${escape(b.layout || 'single')}"${b.layout === 'cycle' ? ' data-image-cycle data-cycle-interval="1000" aria-label="Category references"' : ''}>${b.images.map((item, index) => `<figure${item.span ? ` style="grid-column:${escape(item.span)}"` : ''}${b.layout === 'cycle' ? ` class="${index === 0 ? 'is-active' : ''}" aria-hidden="${index === 0 ? 'false' : 'true'}"` : ''}>${image(item, false, mediaSizes(b, item, nested, parent))}${item.animated ? '<button class="pdf-button motion-toggle" type="button" aria-pressed="false">Pause animation</button>' : ''}${item.caption ? `<figcaption>${escape(item.caption)}</figcaption>` : ''}</figure>`).join('')}</div>`,
  split: b => b.blocks.map(child => renderBlock(child, true, b)).join('')
};
export function renderBlock(block, nested = false, parent = null) {
  if (!renderers[block.type]) throw new Error(`Unknown block: ${block.type}`);
  const tag = nested ? 'div' : block.type === 'text' && block.title ? 'section' : 'div';
  return `<${tag}${block.id ? ` id="${escape(block.id)}"` : ''} class="case-block case-block--${escape(block.type)}${nested ? ' case-block--nested' : ''}${block.width ? ` case-block--${escape(block.width)}` : ''}${block.variant ? ` case-block--${escape(block.variant)}` : ''}">${renderers[block.type](block, nested, parent)}</${tag}>`;
}
export function renderCaseStudy(project) {
  const entries = [{ id: 'top', label: project.title }, ...project.blocks.filter(b => b.id).map(b => ({ id: b.id, label: b.label || b.title }))];
  return `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${escape(project.description)}"><title>${escape(project.title)} — Brett McMillin</title><link rel="icon" href="data:,"><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/work/case-study.css"><script src="/work/case-study.js?v=4" defer></script></head>
<body class="case-study"><a class="skip-link" href="#overview">Skip to content</a><div class="proposal-scrollbar" aria-hidden="true"><div class="proposal-scrollbar-thumb"></div></div>
<nav class="contents-nav" aria-label="Case study contents" data-proposal-contents>${entries.map(e => `<a href="#${e.id}"><span class="contents-mark" aria-hidden="true"></span><span class="contents-label">${escape(e.label)}</span></a>`).join('')}</nav>
<main><header class="hero" id="top"><nav aria-label="Main navigation"><a class="wordmark" href="/">Brett McMillin</a><a class="pdf-button" href="mailto:hello@brettmcm.com">Contact</a></nav><div class="case-hero-media">${image(project.hero, true)}</div><div class="case-title"><h1>${project.mark ? `<img class="case-title-mark" src="${escape(project.mark)}" alt="${escape(project.title)}"${project.markWidth ? ` style="width:${Number(project.markWidth)}px"` : ''}>` : escape(project.title)}</h1><p class="client">${escape(project.discipline)}</p></div></header>
${project.blocks.map(b => renderBlock(b)).join('\n')}
<section class="section contact" id="contact"><div class="contact-row"><div class="section-heading"><h2>Let’s talk</h2><p>and build the brand with care from the start.</p></div><a class="contact-button" href="mailto:hello@brettmcm.com">Email Brett</a></div></section><footer><a class="wordmark" href="/">Brett McMillin</a><a class="case-top" href="#top">Back to top ↑</a></footer></main></body></html>`;
}
