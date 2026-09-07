import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { imageAttributes } from './responsive-images.mjs';
const root = new URL('../', import.meta.url);

test('every published raster image has local responsive candidates and loading hints', async () => {
  let count = 0;
  for (const file of ['index.html', 'work/canary/index.html', 'work/bloop/index.html', 'work/dusty-times/index.html']) {
    const html = await readFile(new URL(file, root), 'utf8');
    for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
      const attrs = Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(m => [m[1], m[2]]));
      if (attrs.src.endsWith('.svg')) continue;
      count++;
      assert.ok(attrs.srcset && attrs.sizes && Number(attrs.width) && Number(attrs.height), tag);
      assert.equal(attrs.decoding, 'async');
      assert.equal(attrs.loading, attrs.fetchpriority === 'high' ? 'eager' : 'lazy');
      assert.ok(attrs.src.includes('/responsive/'));
      const candidates = attrs.srcset.split(', ').map(c => c.split(' '));
      assert.ok(candidates.length > 1);
      let previous = 0;
      for (const [src, descriptor] of candidates) {
        const width = Number.parseInt(descriptor);
        assert.ok(width > previous && width <= Number(attrs.width) && width <= 2400);
        previous = width;
        await access(new URL(src.replace(/^\.?\//, ''), root));
      }
    }
  }
  assert.equal(count, 61);
});

test('new local raster images cannot silently bypass the optimization pipeline', () => {
  assert.throws(() => imageAttributes('/images/new-photo.jpg'), /Missing responsive asset/);
});
