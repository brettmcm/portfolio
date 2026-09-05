# Brett McMillin portfolio

Standalone HTML, CSS, and JavaScript. No install or build step.

Open index.html directly, or serve this folder with `python3 -m http.server 4187 --bind 127.0.0.1`.

Edit personal copy in index.html. Images and the Departure Mono font are local. style.css preserves Ledger’s proposal stylesheet and contents navigation styling. The carousel has Branding, Editorial, and Digital tabs, previous/next buttons, and keyboard access. The page follows the system light/dark appearance. The header Contact button opens email. Full experience opens an accessible modal side panel, with Escape, Close, and backdrop dismissal.

Content note: Personal copy is a draft. The main experience section is a discipline-based overview. The full-experience panel reproduces the nine roles, titles, and dates from https://www.brettmcm.com/about, consulted September 4, 2026. Gallery images and project descriptions come from Ledger’s existing portfolio gallery.

## Case-study template

Preview `/work/canary`, `/work/bloop`, or `/work/dusty-times` on the local server. No homepage links have been added. Each case study preserves the source narrative and project media from brettmcm.com (September 4, 2026). The original site's related-project navigation is intentionally omitted until local work navigation is defined.

- `work/canary/content.mjs`: ordered content and image properties.
- `work/bloop/content.mjs`: Bloop narrative and media.
- `work/dusty-times/content.mjs`: Dusty Times narrative and media.
- Paragraphs can be strings or arrays of inline runs: `['Normal text. ', { text: 'Emphasized sentence.', emphasis: true }, ' More normal text.']`. Emphasis applies the darker ink color with an inline span; only separate entries in `paragraphs` create paragraph breaks.
- `work/blocks.mjs`: reusable static renderers for `text`, `statement`, `media`, and `split` blocks. Media supports `single`, `pair`, `grid`, and `mosaic` layouts; blocks support IDs, wider containers, and nesting. Images accept alt text, dimensions, captions, grid spans, and animation controls.
- `work/case-study.css`: shared case-study layout, inheriting the existing site palette/type styles.
- `work/case-study.js`: contents navigation, scroll indicator, and animation pause/play with reduced-motion support.

After changing content or renderers, run `node work/build.mjs`. The generated case-study HTML is ready for static hosting and works without JavaScript; JavaScript adds only navigation feedback and animation controls. To add a case study, supply another content object to `renderCaseStudy` and add its output to the build script. No framework or dependencies required.
