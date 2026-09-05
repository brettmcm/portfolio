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
const text = (id, title, paragraphs) => ({ type: 'text', id, title, paragraphs });
const media = (images, layout = 'single', extra = {}) => ({ type: 'media', images, layout, ...extra });

export default {
  title: 'Dusty Times',
  discipline: 'Brand strategy + editorial direction',
  description: 'Dusty Times — rebuilding a legacy off-road newspaper as an annual lifestyle journal and media brand. A case study by Brett McMillin.',
  source: 'https://www.brettmcm.com/case-studies/dusty-times',
  hero: image('dt6-book-D7eVpNhZ.jpg', 'Dusty Times annual journal'),
  mark: '/images/dusty-times/wordmark.svg',
  markWidth: 247,
  blocks: [
    { type: 'statement', variant: 'intro', id: 'overview', label: 'Overview', paragraphs: [
      [{ text: 'Dusty Times was once the primary publication of the off-road racing world.', emphasis: true }, ' Brett McM Design helped rebuild it as a new kind of media brand.'],
      'As founding partner and design director, Brett McMillin led the transformation of a legacy racing newspaper into an annual lifestyle journal with cultural relevance and long-term brand equity.'
    ] },
    media([image('dt-stack-CRBoKATR.webp', 'Stacked issues of Dusty Times')], 'single', { width: 'wide' }),
    text('context', 'Context', [
      'From 1983 to 2013, Dusty Times served as the connective tissue of the off-road community through race coverage and classifieds.',
      'When it shut down, the brand disappeared with it.',
      'In 2019, Custom Wheel House acquired the rights and set out to revive it. Not as a continuation, but as a redefinition.',
      'The opportunity was to take a known name and give it a new role in the culture.'
    ]),
    text('tension', 'Tension', [
      'The category had moved on from print.',
      'At the same time, off-road culture had not developed a visual or editorial standard that matched its evolution. Most media in the space remained purely functional.',
      'Launching a print publication under these conditions required a clear point of view.',
      [{ text: 'Dusty Times needed to justify its existence through quality, not frequency.', emphasis: true }]
    ]),
    media([image('united-in-dirt-Cq730Nk2.webp', 'United in Dirt editorial feature')], 'single', { width: 'wide' }),
    text('role', 'Role', [
      'Brett McM Design operated as a founding partner, not a vendor.',
      'The scope included brand positioning, editorial posture, visual identity, art direction, publication design, production oversight, and quality standards across every output.',
      'The mandate was to build a brand that could carry forward for years, not just launch an issue.'
    ]),
    media([
      image('dt5-snake-BbwukKQ-.webp', 'Dusty Times off-road editorial photography', { span: '1 / 3' }),
      image('dt3-back-B0-ftOug.jpg', 'Dusty Times journal photographed in the desert', { span: '3 / 4' }),
      image('dt-coin-B1HB0ebq.jpg', 'Dusty Times collectible coin', { span: '1 / 2' }),
      image('dt7-shipper-CVjazZ6D.webp', 'Dusty Times issue and shipping package', { span: '2 / 4' })
    ], 'mosaic', { width: 'wide' }),
    text('shift', 'Strategic shift', [
      'The most important decision was structural.',
      'Dusty Times moved from a monthly newspaper to an annual journal.',
      'This removed the pressure of news and created space for storytelling, photography, and pace.',
      [{ text: 'The publication became something to collect, not consume.', emphasis: true }]
    ]),
    media([
      image('dt7-vip1-t_sGQ8Fx.webp', 'Dusty Times event experience'),
      image('dt7-vip2-CdRzWtLv.webp', 'Dusty Times event installation')
    ], 'pair', { width: 'wide' }),
    text('system', 'System', [
      'The work focused on building a system that could scale with consistency.',
      'Photography was treated as the primary voice. Layouts created rhythm without excess. Typography remained restrained and confident. Editorial tone balanced authenticity with discipline.',
      'Each issue could evolve, but the identity remained intact.'
    ]),
    media([image('dtspreads-DtbuvSGF.gif', 'Animated Dusty Times magazine spreads', { animated: true })], 'single', { width: 'wide' }),
    text('constraints', 'Constraints', [
      'The project operated without a clear business model.',
      'Early issues were fully funded internally. Advertising was intentionally excluded to establish credibility. Distribution and audience willingness to pay were unknown.',
      'Production added another layer of complexity, requiring the team to learn the mechanics of print publishing in real time.',
      'The first print run of Issue 01 was fully scrapped and reprinted to protect the standard of the brand. A sobering learning moment, and a decision set the tone for everything that followed. Brand above all else.'
    ]),
    media([image('dt5-stack-DH1tRoxe.webp', 'Dusty Times Issue 5 stack')], 'single', { width: 'wide' }),
    text('discipline', 'Editorial discipline', [
      'Growth created pressure to expand content.',
      'The decision was to narrow instead.',
      'Stories were selected based on alignment with the brand standard, not access or convenience. Strong material was rejected if it did not meet the level of execution required.',
      'This protected the integrity of the publication.'
    ]),
    { type: 'statement', id: 'outcome', label: 'Outcome', paragraphs: [
      [{ text: 'Dusty Times now operates as a cultural object within the off-road industry.', emphasis: true }, ' It carries weight beyond its content. The original audience recognizes the legacy. A new audience engages with it as a modern expression of the culture.'],
      'The brand has become a point of alignment for partners, contributors, and events. Dusty Times is expanding into a broader platform — the publication anchors a growing ecosystem of partnerships, sponsorships, and event integrations. Print remains central. The system is built to scale beyond it.'
    ] }
  ]
};
