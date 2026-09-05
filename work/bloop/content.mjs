const dimensions = {
  'hero': [1524, 850], 'photoshoot-00': [1232, 1250],
  'disrupt-01': [1428, 804], 'disrupt-02': [1344, 704],
  'creative-01': [1420, 1498], 'creative-02': [1420, 1498],
  'photoshoot-01': [1340, 1345], 'photoshoot-02': [1340, 1345],
  'photoshoot-03': [1340, 1345], 'photoshoot-04': [1340, 1345]
};
const image = (file, alt, extra = {}) => {
  const [width, height] = dimensions[Object.keys(dimensions).find(key => file.startsWith(key))];
  return { src: `/images/bloop/${file}`, alt, width, height, ...extra };
};
const text = (id, title, paragraphs) => ({ type: 'text', id, title, paragraphs });
const media = (images, layout = 'single', extra = {}) => ({ type: 'media', images, layout, ...extra });

export default {
  title: 'Bloop',
  discipline: 'Brand strategy + identity',
  description: 'Bloop — a sensory-first brand for small-batch, toxin-free laundry soap. A case study by Brett McMillin.',
  source: 'https://www.brettmcm.com/case-studies/bloop',
  hero: image('hero-Dxph4Y12.webp', 'Bloop laundry soap packaging and brand world'),
  mark: '/images/bloop/wordmark.svg',
  markWidth: 131,
  blocks: [
    { type: 'statement', variant: 'intro', id: 'overview', label: 'Overview', paragraphs: [[
      { text: 'Bloop was founded on a simple tension.', emphasis: true },
      ' Most natural laundry soaps feel generic and dated. Most conventional detergents feel artificial and overengineered. The founders believed there was room for something better: a small-batch, toxin-free laundry soap with crafted scents that feel contemporary and desirable.'
    ]] },
    text('challenge', 'The challenge', [
      'The ambition was not to compete on claims. It was to change how a basic household product feels.',
      'Laundry is routine. But it touches identity. How you smell. How your home feels. What you choose to bring into your space.',
      'The opportunity was to build a brand that treats a utility like a cultural object.'
    ]),
    media([image('photoshoot-00-COAv23_b.webp', 'Bloop laundry soap in a domestic setting')]),
    text('strategy', 'Strategic insight', [
      'The category defaults to two extremes. Virtue signaling sustainability or loud freshness performance. We rejected both.',
      'Instead, we positioned Bloop as sensory first. A brand built around joy in the everyday. Not guilt. Not fear. Not perfection.',
      'The core narrative became simple and human:',
      [{ text: 'We smell good. We look good. We feel good.', emphasis: true }],
      'This reframed laundry from chore to ritual. It shifted the role of the product from necessity to enhancement and guided every decision that followed.'
    ]),
    media([image('disrupt-01-sfT5gt38.webp', 'Bloop brand campaign and packaging')], 'single', { width: 'wide' }),
    text('system', 'Building the system', [
      'The identity needed to feel modern, light, and confident. Not earthy. Not sterile.',
      'The wordmark balances softness and clarity. Rounded forms reference suds and softness while maintaining structure. Color is used to signal freshness and scent variation without leaning on predictable “eco” palettes.'
    ]),
    media([image('disrupt-02-CJkvixBE.webp', 'Bloop identity system across packaging and campaign')], 'single', { width: 'wide' }),
    { type: 'statement', paragraphs: [
      [{ text: 'Most importantly, the brand does not overclaim.', emphasis: true }, ' The voice is honest about imperfection. Bloop commits to continuous improvement rather than purity theater. That stance builds trust in a category where exaggeration is common.'],
      'The result is a system with clear architecture and room for growth across scents, formats, and future extensions.'
    ] },
    media([
      image('creative-01-BXLFZ2fW.webp', 'Bloop creative direction and brand applications'),
      image('creative-02-Pe5mLnHJ.webp', 'Bloop packaging and visual identity details')
    ], 'pair', { width: 'wide' }),
    text('why', 'Why it works', [
      'This was not about decoration. It was about strategic clarity.',
      'We helped the founders articulate what they were really building. A sensory brand inside a functional category. We created a system that connects product, identity, and story from day one.'
    ]),
    media([
      image('photoshoot-01-DJLZ1M5T.webp', 'Bloop product photography'),
      image('photoshoot-02-DZK7Io-G.webp', 'Bloop laundry ritual and scent story'),
      image('photoshoot-03-Cw1bdqBN.webp', 'Bloop packaging in use'),
      image('photoshoot-04-4QkQdRMC.webp', 'Bloop sensory brand world')
    ], 'grid', { width: 'wide' }),
    { type: 'statement', id: 'outcome', label: 'Outcome', paragraphs: [
      [{ text: 'The outcome was a launch with immediate distinction and strong early engagement.', emphasis: true }, ' More importantly, the brand feels inevitable. It fits the product. It fits the founders. It fits the culture it wants to live in.'],
      'That alignment is the real result.'
    ] }
  ]
};
