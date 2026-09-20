import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { renderBlock, renderCaseStudy } from './blocks.mjs';
import canary from './canary/content.mjs';
import bloop from './bloop/content.mjs';
import dustyTimes from './dusty-times/content.mjs';
import stirSessions from './stir-sessions/content.mjs';

const projects = [canary, bloop, dustyTimes, stirSessions];

test('inline emphasis preserves continuous paragraphs and escapes content', () => {
  const html = renderBlock({ type: 'statement', paragraphs: [
    ['Before ', { text: '<Highlighted> & clear.', emphasis: true }, ' After.'],
    'A separate paragraph.'
  ] });
  assert.match(html, /<p>Before <span class="case-emphasis">&lt;Highlighted&gt; &amp; clear\.<\/span> After\.<\/p>/);
  assert.equal((html.match(/<p>/g) || []).length, 2);
  assert.equal(canary.blocks[0].paragraphs.length, 2);
});

test('static case studies stay in sync with their content and blocks', async () => {
  for (const project of projects) {
    const slug = project.title.toLowerCase().replaceAll(' ', '-');
    assert.equal(await readFile(new URL(`./${slug}/index.html`, import.meta.url), 'utf8'), renderCaseStudy(project));
  }
});
test('every original project asset is local and dimensioned', async () => {
  const collect = blocks => blocks.flatMap(b => b.images || (b.blocks ? collect(b.blocks) : []));
  const images = projects.flatMap(project => {
    const media = collect(project.blocks);
    assert.ok(project.hero && media.length > 0, `${project.title} must include a hero and project media`);
    return [project.hero, ...media];
  });
  for (const image of images) {
    assert.ok(image.alt && image.width > 0 && image.height > 0);
    await access(new URL(`..${image.src}`, import.meta.url));
  }
  for (const project of projects) await access(new URL(`..${project.mark}`, import.meta.url));
});
test('all contents targets are unique and available', () => {
  for (const project of projects) {
    const ids = [...renderCaseStudy(project).matchAll(/ id="([^"]+)"/g)].map(m => m[1]);
    assert.equal(ids.length, new Set(ids).size);
    for (const block of project.blocks.filter(b => b.id)) assert.ok(ids.includes(block.id));
  }
});
test('reusable text and media properties render without unsafe markup', () => {
  assert.match(renderBlock({ type: 'text', title: '<Title>', paragraphs: ['A & B\nNext'] }), /&lt;Title&gt;/);
  assert.match(renderBlock({ type: 'text', paragraphs: ['A & B\nNext'] }), /A &amp; B<br>Next/);
  assert.match(renderBlock({ type: 'media', layout: 'pair', images: [{ src: '/example.webp', alt: 'Example', caption: 'A caption' }] }), /<figcaption>A caption<\/figcaption>/);
  assert.throws(() => renderBlock({ type: 'unknown' }), /Unknown block/);
});
