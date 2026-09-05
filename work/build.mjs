import { writeFile } from 'node:fs/promises';
import { renderCaseStudy } from './blocks.mjs';
import canary from './canary/content.mjs';
import bloop from './bloop/content.mjs';
import dustyTimes from './dusty-times/content.mjs';
// Regenerate static HTML after editing content or block templates.
await writeFile(new URL('./canary/index.html', import.meta.url), renderCaseStudy(canary));
await writeFile(new URL('./bloop/index.html', import.meta.url), renderCaseStudy(bloop));
await writeFile(new URL('./dusty-times/index.html', import.meta.url), renderCaseStudy(dustyTimes));
console.log('Built Canary, Bloop, and Dusty Times case studies');
