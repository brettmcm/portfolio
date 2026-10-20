import test from 'node:test';
import assert from 'node:assert/strict';
import { viewerRelease } from './viewer-release.mjs';
test('viewer holds until content completes, then releases continuously into page motion', () => {
  assert.equal(viewerRelease(900,1000,400),0);
  assert.equal(viewerRelease(1000,1000,400),0);
  assert.equal(viewerRelease(1200,1000,400),50);
  assert.equal(viewerRelease(1400,1000,400),200);
  assert.equal(viewerRelease(1500,1000,400),200);
  const finalSlope=viewerRelease(1400,1000,400)-viewerRelease(1399.999,1000,400);
  assert.ok(Math.abs(finalSlope/.001-1)<.00001);
});
