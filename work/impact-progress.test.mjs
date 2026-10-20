import test from 'node:test';
import assert from 'node:assert/strict';
import { impactGroups } from './impact-progress.mjs';

test('milestone groups reveal separately and preserve the completed groups', () => {
  assert.deepEqual(impactGroups(0).map(s => s.count), [0, 0, 0]);
  assert.deepEqual(impactGroups(.23), [{shown:true,count:8},{shown:false,count:0},{shown:false,count:0}]);
  assert.deepEqual(impactGroups(.5), [{shown:true,count:8},{shown:true,count:58},{shown:false,count:0}]);
  assert.deepEqual(impactGroups(1), [{shown:true,count:8},{shown:true,count:58},{shown:true,count:845}]);
  assert.deepEqual(impactGroups(.19), impactGroups(.22));
  assert.deepEqual(impactGroups(.46), impactGroups(.49));
  let previous = [0,0,0];
  for (let i=0;i<=10000;i++) {
    const counts=impactGroups(i/10000).map(s=>s.count);
    counts.forEach((n,j)=>assert.ok(n>=previous[j] && n<=previous[j]+1));
    previous=counts;
  }
});
