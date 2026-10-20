// Narrative retained from the original case study; design examples and details from
// https://www.figma.com/slides/MrhWJL3zhqoYJszFQubkxh (October 2026).
const dimensions = {
  'dt6-book': [1600, 1067], 'dt-stack': [2000, 1333], 'united-in-dirt': [1920, 1383],
  'dt5-snake': [2000, 1333], 'dt3-back': [5568, 3712], 'dt-coin': [864, 1184],
  'dt7-shipper': [1800, 1013], 'dt7-vip1': [1200, 1600], 'dt7-vip2': [1200, 1600],
  'dtspreads': [1000, 523], 'dt5-stack': [2000, 1333]
};
const image = (file, alt, extra = {}) => {
  const [width, height] = dimensions[Object.keys(dimensions).find(key => file.startsWith(key))];
  return { src: `/images/dusty-times/${file}`, alt, width, height, ...extra };
};
const deckDimensions = {"impact-background.jpg": [4096, 2726], "vip-detail.png": [486, 427], "print-pages.png": [573, 560], "print-binding.png": [573, 560], "print-cover.png": [573, 560], "publication-impact.png": [1920, 1080], "cover-photo.png": [1888, 904], "vip-box.png": [982, 427], "hella-box.png": [808, 860], "print-detail.png": [1187, 863], "spread-03.png": [1920, 1080], "spread-06.png": [1920, 1080], "spread-04.png": [1920, 1080], "spread-05.png": [1920, 1080], "spread-clarke.png": [1920, 1080], };
const deck = (file, alt, extra = {}) => {
  const [width, height] = deckDimensions[file];
  return { src: `/images/dusty-times/deck/${file}`, alt, width, height, ...extra };
};
const text = (id, title, paragraphs) => ({ type: 'text', id, title, paragraphs });
const media = (images, layout = 'single', extra = {}) => ({ type: 'media', images, layout, ...extra });

export default {
  path: '/work/dusty-times/',
  seoTitle: 'Dusty Times Editorial Design',
  socialImage: { src: '/images/dusty-times/dt6-book-D7eVpNhZ.jpg', alt: 'Dusty Times annual journal' },
  title: 'Dusty Times',
  discipline: 'Brand strategy + editorial direction',
  description: 'Dusty Times — rebuilding a legacy off-road newspaper as an annual lifestyle journal and media brand. A case study by Brett McMillin.',
  source: 'https://www.brettmcm.com/case-studies/dusty-times',
  hero: deck('cover-photo.png', 'A Porsche kicking up dust in the desert'),
  mark: '/images/dusty-times/wordmark.svg',
  markWidth: 247,
  blocks: [
    { type: 'statement', variant: 'intro', id: 'overview', label: 'Overview', paragraphs: [
      [{ text: 'Dusty Times was once the primary publication of the off-road racing world.', emphasis: true }, ' I helped rebuild it as a new kind of media brand.'],
      'As founding partner and design director, I led the transformation of a legacy racing newspaper into an annual lifestyle journal with cultural relevance and long-term brand equity.'
    ] },
    media([image('dt-stack-CRBoKATR.webp', 'Stacked issues of Dusty Times')], 'single', { width: 'wide' }),
    text('context', 'Rebuilding Dusty Times', [
      'From 1983 to 2013, Dusty Times was a newspaper connecting the off-road racing community through race coverage and classifieds. Its revival in 2019 gave that familiar name a new purpose.',
      'The shift to an annual journal made room for long-form stories, photography, and a slower pace. The new medium needed to feel worth keeping.',
      'The design direction was built around photography, confident typography, and layouts that balance immersion with breathing room. Each issue could take on its own character while remaining part of a recognizable collection.'
    ]),
    media([
      deck('print-pages.png', 'Close-up of Dusty Times printed editorial photography and text', { caption: '110+ immersive pages per issue' }),
      deck('print-binding.png', 'Dusty Times open book showing the perfect binding and heavy paper', { caption: 'Perfect-bound book' }),
      deck('print-cover.png', 'Dusty Times cover photographed on a wooden table', { caption: '9 × 12 inch home fixture' })
    ], 'triptych', { width: 'wide' }),
    text('print', 'Made to be kept', [
      'The format gives the work room: a 9 × 12 inch, perfect-bound journal with more than 110 pages per issue. Heavy paper, a smooth matte-like finish, and a coated cardstock cover make the physical object part of the design.',
      'Unique perspectives and photography lead each issue, with limited to no advertising. The cover has to work at a distance and reward a closer look. Inside, the pace changes between photographs, dense passages of text, and spreads with room to breathe.'
    ]),
    text('pages', 'On the page', [
      'Photography leads, but the pages do more than frame images. A small red graphic can pull a desert photograph into the typography. An oversized title can turn a portrait into an opening. A passage of blue type can become the visual center of a spread.',
      'The system leaves room for those shifts. Each feature needs a rhythm that fits its subject, with enough consistency to belong to the same book.'
    ]),
    media([
      {"src": "/images/dusty-times/spreads/acetylene-01.jpeg", "width": 3000, "height": 2000, "alt": "Dusty Times editorial spread: Acetylene 01", "caption": "Acetylene 01"},
      {"src": "/images/dusty-times/spreads/kings-hwy-01.jpeg", "width": 3000, "height": 2000, "alt": "Dusty Times editorial spread: Kings Hwy 01", "caption": "Kings Hwy 01"},
      {"src": "/images/dusty-times/spreads/kings-hwy-02.jpeg", "width": 3000, "height": 2000, "alt": "Dusty Times editorial spread: Kings Hwy 02", "caption": "Kings Hwy 02"},
      {"src": "/images/dusty-times/spreads/kings-hwy-03.jpeg", "width": 3000, "height": 2000, "alt": "Dusty Times editorial spread: Kings Hwy 03", "caption": "Kings Hwy 03"},
      {"src": "/images/dusty-times/spreads/mcd-01.jpeg", "width": 3000, "height": 2000, "alt": "Dusty Times editorial spread: Mcd 01", "caption": "Mcd 01"},
      {"src": "/images/dusty-times/spreads/porsche-01.jpeg", "width": 3000, "height": 2000, "alt": "Dusty Times editorial spread: Porsche 01", "caption": "Porsche 01"},
      {"src": "/images/dusty-times/spreads/porsche-02.jpeg", "width": 3000, "height": 2000, "alt": "Dusty Times editorial spread: Porsche 02", "caption": "Porsche 02"},
      {"src": "/images/dusty-times/spreads/porsche-03.jpeg", "width": 3000, "height": 2000, "alt": "Dusty Times editorial spread: Porsche 03", "caption": "Porsche 03"},
      {"src": "/images/dusty-times/spreads/sal-fish.jpeg", "width": 3000, "height": 2000, "alt": "Dusty Times editorial spread: Sal Fish", "caption": "Sal Fish"},
      {"src": "/images/dusty-times/spreads/sal-fish-02.jpeg", "width": 3000, "height": 2000, "alt": "Dusty Times editorial spread: Sal Fish 02", "caption": "Sal Fish 02"},
      {"src": "/images/dusty-times/spreads/sal-fish-03.jpeg", "width": 3000, "height": 2000, "alt": "Dusty Times editorial spread: Sal Fish 03", "caption": "Sal Fish 03"},
      {"src": "/images/dusty-times/spreads/half-safe-01.jpeg", "width": 3000, "height": 2000, "alt": "Dusty Times editorial spread: Half Safe 01", "caption": "Half Safe 01"},
      {"src": "/images/dusty-times/spreads/finding-lines-01.jpeg", "width": 3000, "height": 2000, "alt": "Dusty Times editorial spread: Finding Lines 01", "caption": "Finding Lines 01"},
      {"src": "/images/dusty-times/spreads/finding-lines-02.jpeg", "width": 3000, "height": 2000, "alt": "Dusty Times editorial spread: Finding Lines 02", "caption": "Finding Lines 02"},
      {"src": "/images/dusty-times/spreads/finding-lines-03.jpeg", "width": 3000, "height": 2000, "alt": "Dusty Times editorial spread: Finding Lines 03", "caption": "Finding Lines 03"},
      {"src": "/images/dusty-times/spreads/finding-lines-04.jpeg", "width": 3000, "height": 2000, "alt": "Dusty Times editorial spread: Finding Lines 04", "caption": "Finding Lines 04"},
      {"src": "/images/dusty-times/spreads/fore-mother-01.jpeg", "width": 3000, "height": 2000, "alt": "Dusty Times editorial spread: Fore Mother 01", "caption": "Fore Mother 01"},
      {"src": "/images/dusty-times/spreads/fore-mother-02.jpeg", "width": 3000, "height": 2000, "alt": "Dusty Times editorial spread: Fore Mother 02", "caption": "Fore Mother 02"},
      {"src": "/images/dusty-times/spreads/descansos-01.jpeg", "width": 3000, "height": 2000, "alt": "Dusty Times editorial spread: Descansos 01", "caption": "Descansos 01"},
      {"src": "/images/dusty-times/spreads/hammer-people-01.jpeg", "width": 3000, "height": 2000, "alt": "Dusty Times editorial spread: Hammer People 01", "caption": "Hammer People 01"},
      {"src": "/images/dusty-times/spreads/hammer-people-02.jpeg", "width": 3000, "height": 2000, "alt": "Dusty Times editorial spread: Hammer People 02", "caption": "Hammer People 02"},
      {"src": "/images/dusty-times/spreads/hammer-people-03.jpeg", "width": 3000, "height": 2000, "alt": "Dusty Times editorial spread: Hammer People 03", "caption": "Hammer People 03"},
      {"src": "/images/dusty-times/spreads/fox-shocks-01.jpeg", "width": 3000, "height": 2000, "alt": "Dusty Times editorial spread: Fox Shocks 01", "caption": "Fox Shocks 01"},
      {"src": "/images/dusty-times/spreads/culture-01.jpeg", "width": 3000, "height": 2000, "alt": "Dusty Times editorial spread: Culture 01", "caption": "Culture 01"}
    ], 'scroll-spreads', { variant: 'scroll-spreads' }),
    text('constraints', 'Constraints', [
      'The project operated without a clear business model.',
      'Early issues were fully funded internally. Advertising was intentionally excluded to establish credibility. Distribution and audience willingness to pay were unknown.',
      'Production added another layer of complexity, requiring me to learn the mechanics of print publishing in real time.',
      'The first print run of Issue 01 was fully scrapped and reprinted to protect the standard of the brand. A sobering learning moment, and a decision that set the tone for everything that followed. Brand above all else.'
    ]),
    media([image('dt5-stack-DH1tRoxe.webp', 'Dusty Times Issue 5 stack')], 'single', { width: 'wide' }),
    text('discipline', 'Editorial discipline', [
      'Growth created pressure to expand content.',
      'I chose to narrow instead.',
      'I selected stories for their alignment with the brand standard, not access or convenience. I turned down strong material when it did not meet the level of execution the publication needed.',
      'This protected the integrity of the publication.'
    ]),
    media([
      image('dt5-snake-BbwukKQ-.webp', 'Dusty Times off-road editorial photography'),
      image('dt3-back-B0-ftOug.jpg', 'Dusty Times journal photographed in the desert')
    ], 'pair', { width: 'wide' }),
    text('beyond', 'Beyond the book', [
      'The same attention extends to how an issue reaches people. Limited runs of 300 VIP gift boxes go to a hand-picked audience of athletes, event organizers, and people within the industry.',
      'Packaging, collectible coins, apparel, and event installations give the identity a life outside the pages. The publication remains the starting point.'
    ]),
    media([
      image('united-in-dirt-Cq730Nk2.webp', 'Man wearing a United in Dirt T-shirt among orange torii gates'),
      deck('vip-box.png', 'Dusty Times VIP journal inside a custom black presentation box and shipping carton'),
      deck('vip-detail.png', 'United in Dirt mark engraved on the wooden Dusty Times presentation box'),
      image('dt-coin-B1HB0ebq.jpg', 'Dusty Times collectible coin')
    ], 'pair', { width: 'wide', variant: 'packaging-mosaic' }),
    { type: 'split', id: 'hella', label: 'Hella partnership', variant: 'partnership', width: 'wide', blocks: [
      media([deck('hella-box.png', 'Hella × Dusty Times limited-edition boxed journal with yellow packaging and black cover')]),
    text(null, 'Hella partnership', [
      'The 2025 Hella collaboration brought the publication and its physical presentation together. Issue 07 included a two-page ad, a 12-page brand story, and a 10-page feature highlighting key products.',
      'The partnership extended to 250 limited-edition Hella × Dusty Times boxed books for VIP gifting, events, and customer incentives. Content usage rights and collaborative social posts gave the work a life beyond the issue.'
    ])
    ] },
    media([deck('impact-background.jpg', 'Off-road racing car throwing dust beneath a sandstone cliff')], 'impact', { variant: 'impact' }),
    { type: 'statement', id: 'outcome', label: 'Outcome', paragraphs: [
      [{ text: 'Dusty Times now operates as a cultural object within the off-road industry.', emphasis: true }, ' It carries weight beyond its content. The original audience recognizes the legacy. A new audience engages with it as a modern expression of the culture.'],
      'The brand has become a point of alignment for partners, contributors, and events. Dusty Times is expanding into a broader platform — the publication anchors a growing set of partnerships, sponsorships, and event integrations. Print remains central. The system is built to scale beyond it.'
    ] }
  ]
};
