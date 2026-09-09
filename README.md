# Brett McMillin portfolio

Standalone HTML, CSS, and JavaScript. No install or build step.

Open index.html directly, or serve this folder with `python3 -m http.server 4187 --bind 127.0.0.1`.

Edit personal copy in index.html. Images and the Switzer and Departure Mono fonts are local. style.css preserves Ledger’s proposal stylesheet and contents navigation styling. The carousel has Branding, Editorial, and Digital tabs, previous/next buttons, and keyboard access. The page follows the system light/dark appearance. The header Contact button opens email. Full experience opens an accessible modal side panel, with Escape, Close, and backdrop dismissal.

Content note: Personal copy is a draft. The main experience section is a discipline-based overview. The full-experience panel reproduces the nine roles, titles, and dates from https://www.brettmcm.com/about, consulted September 4, 2026. Gallery images and project descriptions come from Ledger’s existing portfolio gallery.

## Case-study template

Preview `/work/canary`, `/work/bloop`, or `/work/dusty-times` on the local server. A compact logo row below Selected work links to all three case studies. Each case study preserves the source narrative and project media from brettmcm.com (September 4, 2026). The original site's related-project navigation is intentionally omitted until local work navigation is defined.

- `work/canary/content.mjs`: ordered content and image properties.
- `work/bloop/content.mjs`: Bloop narrative and media.
- `work/dusty-times/content.mjs`: Dusty Times narrative and media.
- Paragraphs can be strings or arrays of inline runs: `['Normal text. ', { text: 'Emphasized sentence.', emphasis: true }, ' More normal text.']`. Emphasis applies the darker ink color with an inline span; only separate entries in `paragraphs` create paragraph breaks.
- `work/blocks.mjs`: reusable static renderers for `text`, `statement`, `media`, and `split` blocks. Media supports `single`, `pair`, `grid`, and `mosaic` layouts; blocks support IDs, wider containers, and nesting. Images accept alt text, dimensions, captions, grid spans, and animation controls.
- `work/case-study.css`: shared case-study layout, inheriting the existing site palette/type styles.
- `work/case-study.js`: contents navigation, scroll indicator, and animation pause/play with reduced-motion support.

After changing content or renderers, run `node work/build.mjs`. The generated case-study HTML is ready for static hosting and works without JavaScript; JavaScript adds only navigation feedback and animation controls. To add a case study, supply another content object to `renderCaseStudy` and add its output to the build script. No framework or dependencies required.

## Responsive images

All 61 published raster images (including animations) use generated WebP candidates, intrinsic dimensions, and CSS-aware `sizes`/`srcset`. Case-study heroes load eagerly with high priority; remaining images load lazily and decode asynchronously. SVG logos remain resolution-independent. The homepage gallery is static HTML, including Scope, so responsive candidates are available before JavaScript runs.

Generated assets and `images/responsive-manifest.json` are committed: hosting and preview still need no dependencies or build step. Originals remain untouched. Candidate widths range from 240 to 2400 pixels, never exceeding the original. Filenames include a source/settings hash for cache invalidation. Animated WebP preserves frame timing and looping, and pause/play temporarily removes and restores `srcset`.

After adding or replacing an image, regenerate using Python 3 with Pillow (WebP support) and Node 22+:

```sh
python3 scripts/build-images.py
node scripts/build-home-images.mjs
node work/build.mjs
node --test work/blocks.test.mjs scripts/images.test.mjs
```

For homepage images, `data-image-original` points to the editable original; add new images with their original `src`, or update `data-image-original` to replace an existing image. Case-study sources stay in each `content.mjs`. The generator discovers only published images. Existing hashed variants are reused on subsequent builds. Keep the `sizes` fallbacks in `scripts/responsive-images.mjs` aligned with layout changes; browsers supporting `sizes="auto"` use the actual rendered width for lazy images.
