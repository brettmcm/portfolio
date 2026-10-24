# Brett McMillin portfolio

Standalone HTML, CSS, and JavaScript. No install or build step.

Open index.html directly, or serve this folder with `python3 -m http.server 4187 --bind 127.0.0.1`.

Edit personal copy in index.html. Images and the Switzer and Departure Mono fonts are local. style.css preserves Ledger’s proposal stylesheet and contents navigation styling. The homepage has a 100vh sticky hero: native scrolling moves a dot along the curve and opens on the original monochrome image, then cycles through all 20 carousel stills, grouped Branding, Editorial, then Digital. The hero eases upward over the final 7% of the curve and joins normal page scrolling at the endpoint. Contents links use smooth anchor scrolling. On mobile, the original image fills the hero while subsequent images cycle in a centered square with 10px side gutters. The hero keeps the full-width navigation, the “Do less, better.” curve, and a bottom-left discipline label, with animated noise over the images. Reduced-motion mode removes the pinned scroll sequence and displays the first image. The carousel videos are not used as backgrounds. About, Practice, and Experience precede Speaking on the homepage and are also available at `/about/`. The page follows the system light/dark appearance. The header Contact button opens email. Full experience opens an accessible modal side panel, with Escape, Close, and backdrop dismissal.

Content note: Personal copy is a draft. The main experience section is a discipline-based overview. The full-experience panel reproduces the nine roles, titles, and dates from https://www.brettmcm.com/about, consulted September 4, 2026. Gallery images and project descriptions come from Ledger’s existing portfolio gallery.

## Case-study template

Preview `/work/canary`, `/work/bloop`, `/work/stir-sessions`, or `/work/dusty-times` on the local server. The homepage combines all four linked case studies and twelve logos in a full-width grid with responsive outer gutters matching the header and 8px tile gaps. Logo tiles are at least square and stretch to fill taller rows, with a uniform theme-aware background and slightly larger logos on mobile; case-study tiles are 16:9 and always span two columns, Stir Sessions retains its centered brand icon, while Canary, Bloop, and Dusty Times use muted, looping video backgrounds without logo overlays. All tiles have 4px corners. The grid uses four columns above 1200px, three columns above 850px, and two columns on smaller screens. Reorder tiles within `.work-grid` in `index.html`; tiles flow across aligned rows, with four logo tiles between each case study. Canary, Bloop, and Dusty Times preserve the source narrative and project media from brettmcm.com (September 4, 2026). Stir Sessions uses the supplied September 2025 brand platform, style guide, and project assets, with scope limited to strategy, visual identity, and packaging direction. Its packaging images are concepts and its lifestyle imagery is creative direction. The original site's related-project navigation is intentionally omitted until local work navigation is defined.

- `work/canary/content.mjs`: ordered content and image properties.
- `work/bloop/content.mjs`: Bloop narrative and media.
- `work/dusty-times/content.mjs`: Dusty Times narrative and media. The October 2026 expansion retains the original narrative and images, adding print details, editorial spreads, publication totals, VIP packaging, and the Hella partnership from the supplied Figma Slides deck. It uses the existing text, statement, single-image, pair, and mosaic blocks without changes to shared styling or components.
- `work/stir-sessions/content.mjs`: Stir Sessions narrative and media. The color section describes the palette expansion and includes the updated color visual.
- Paragraphs can be strings or arrays of inline runs: `['Normal text. ', { text: 'Emphasized sentence.', emphasis: true }, ' More normal text.']`. Emphasis applies the darker ink color with an inline span; only separate entries in `paragraphs` create paragraph breaks.
- `work/blocks.mjs`: reusable static renderers for `text`, `statement`, `media`, and `split` blocks. Media supports `single`, `pair`, `grid`, and `mosaic` layouts; blocks support IDs, wider containers, and nesting. Images accept alt text, dimensions, captions, grid spans, and animated-image markers.
- `work/case-study.css`: shared case-study layout, inheriting the existing site palette/type styles.
- `work/case-study.js`: contents navigation, scroll indicator, and automatic reduced-motion support for animated images.

After changing content or renderers, run `node work/build.mjs`. The generated case-study HTML is ready for static hosting and works without JavaScript; JavaScript adds only navigation feedback and reduced-motion handling. To add a case study, supply another content object to `renderCaseStudy` and add its output to the build script. No framework or dependencies required.

## Search and sharing metadata

The homepage's Open Graph video is `videos/pattern.mp4` (1920 × 1080). Canary, Bloop, and Dusty Times declare `socialVideo` in their content files using the same MP4 assets as their homepage work-grid tiles. The shared metadata renderer emits absolute HTTPS video URLs and the MP4 media type; existing social images remain available as fallbacks.

The homepage metadata lives in the `<head>` of `index.html`. Case studies use `scripts/seo.mjs` through the shared renderer: edit `seoTitle`, `path`, and `socialImage` in each project's `content.mjs`, then run `node work/build.mjs`. The existing `description` also supplies the search and sharing descriptions. Metadata includes absolute canonical URLs, Open Graph and Twitter cards, and JSON-LD describing Brett and the page; the homepage additionally declares the website name. Visible copy and artwork are independent of these fields.

`sitemap.xml` lists only the homepage and four active case studies. Add future public pages explicitly. The legacy `/about/` page is no longer linked from navigation and is intentionally omitted; omission from the sitemap does not prevent indexing. `robots.txt` allows crawling and advertises the sitemap. After publishing, submit `https://brettmcm.com/sitemap.xml` in Google Search Console, inspect the homepage and case-study URLs, and request recrawling. Search Console submission has not been performed from this workspace.

The supplied favicon set is served from the site root: `favicon.ico`, 16px/32px PNG icons, `apple-touch-icon.png`, and 192px/512px Android icons. Every page references the icons and `site.webmanifest`; the manifest names the site Brett McMillin. Keep these URLs stable when replacing the artwork. Case-study icon links live in `work/blocks.mjs`; homepage and legacy About links live in their HTML heads.

## Responsive images

All published raster images (including animations) use generated WebP candidates, intrinsic dimensions, and CSS-aware `sizes`/`srcset`. Case-study heroes load eagerly with high priority; remaining images load lazily and decode asynchronously. SVG logos remain resolution-independent. The homepage gallery is static HTML, including Scope, so responsive candidates are available before JavaScript runs.

Generated assets and `images/responsive-manifest.json` are committed: hosting and preview still need no dependencies or build step. Originals remain untouched. Candidate widths range from 240 to 2400 pixels, never exceeding the original. Filenames include a source/settings hash for cache invalidation. Animated WebP preserves frame timing and looping, and reduced-motion handling temporarily removes and restores `srcset`.

After adding or replacing an image, regenerate using Python 3 with Pillow (WebP support) and Node 22+:

```sh
python3 scripts/build-images.py
node scripts/build-home-images.mjs
node work/build.mjs
node --test work/blocks.test.mjs scripts/images.test.mjs
```

For homepage images, `data-image-original` points to the editable original; add new images with their original `src`, or update `data-image-original` to replace an existing image. Case-study sources stay in each `content.mjs`. When adding an image with a new filename, also add its pixel width and height to that file’s `dimensions` map before running the image generator. The generator discovers only published images. Existing hashed variants are reused on subsequent builds. Keep the `sizes` fallbacks in `scripts/responsive-images.mjs` aligned with layout changes; browsers supporting `sizes="auto"` use the actual rendered width for lazy images.

## Dusty Times spread sequence

The On the page section uses a full-viewport sticky spread viewer. Native scrolling advances 24 JPEGs, copied from `~/Desktop/DT Spreads`, in the Figma deck’s order (slides 9–32). `images/dusty-times/spreads/order.json` records the verified node/file mapping. Nearby frames load on demand, backward scrolling reverses the sequence, and the viewer releases into Constraints. Landscape frames fill the viewport; portrait frames contain the complete image. A subtle 2px bar tracks scroll progress. Reduced-motion preferences show an ordinary ordered gallery; without JavaScript, all spreads remain available. The viewer uses the shared media block with the `scroll-spreads` layout.

The image before Outcome is now a second full-viewport scroll section using the original desert racing photograph. Three vertically stacked SVG dot groups reveal 8 Years, 58 Features, and 845 Pages in sequence. Completed groups remain visible, with pauses between milestones and before release. The content aligns to the same 900px text container. `work/impact-progress.mjs` defines the three phases; reduced motion and no-JavaScript views show the complete diagram. Verify phase boundaries with `node --test work/impact-progress.test.mjs`.
