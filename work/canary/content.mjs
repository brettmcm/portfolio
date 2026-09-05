// Content only. Shared block rendering lives in ../blocks.mjs.
const dimensions = {
  hero: [1524, 738], challenge: [616, 625], creative: [1340, 1345], brush: [700, 700],
  'disrupt-01': [1428, 804], 'disrupt-02': [1344, 704], scout: [1420, 1098],
  'photoshoot-01': [1096, 729], 'photoshoot-02': [867, 729],
  'photoshoot-03': [1096, 729], 'photoshoot-04': [867, 729]
};
const image = (file, alt, extra = {}) => {
  const [width, height] = dimensions[Object.keys(dimensions).find(key => file.startsWith(key))];
  return { src: `/images/canary/${file}`, alt, width, height, ...extra };
};
const text = (id, title, paragraphs) => ({ type: 'text', id, title, paragraphs });
const media = (images, layout = 'single', extra = {}) => ({ type: 'media', images, layout, ...extra });
export default {
  title: 'Canary', discipline: 'Brand identity + creative direction',
  description: 'Canary — a brand identity for sustainable personal care. A case study by Brett McMillin.',
  source: 'https://www.brettmcm.com/case-studies/canary',
  hero: image('hero-DtRu36Gc.webp', 'Canary lifestyle photography: brushing with a bamboo toothbrush against a green backdrop'),
  mark: '/images/canary/wordmark.svg',
  blocks: [
    { type: 'statement', variant: 'intro', id: 'overview', label: 'Overview', paragraphs: [
      [
        { text: 'The sustainable personal care aisle had become visually predictable.', emphasis: true },
        ' Soft colors. Gentle typography. Earnest language about doing better.'
      ],
      'Everything looked responsible. Very little felt distinct.'
    ] },
    text('challenge', 'The challenge', [
      'Canary saw an opening. They did not want to participate in the polite aesthetic that had come to define "clean." They believed sustainability could feel active and engaged, not muted and careful.',
      'At the same time, they were building products for real households. Adults and kids. Shared bathrooms. Daily routines.',
      'This created a real tension.',
      'Push too far into rebellion and lose families.\nSoften too much and become invisible.',
      'The brand needed to feel opinionated without feeling niche. Playful without feeling trivial. Serious about waste, but at home in everyday life.'
    ]),
    { type: 'split', id: 'strategy', label: 'Strategic insight', variant: 'about', blocks: [
      text(null, 'Strategic insight', [
        'The problem was not simply aesthetic. It was cultural.',
        'Many eco brands speak from a place of moral distance. They signal virtue. They imply correction.',
        'Canary did not want to correct people. They wanted to invite them.'
      ]),
      media([
        image('challenge-01-Dord3L3k.webp', 'Category reference: Bite toothpaste tablets in a glass jar'),
        image('challenge-02-Ba5Y9Gmy.webp', 'Category reference: Kaylaan toothpaste tablet packaging'),
        image('challenge-03-B8_CojeN.webp', 'Category reference: Unpaste tooth tabs in soft green packaging'),
        image('challenge-04-BLG-zHGB.webp', 'Category reference: Huppy toothpaste tablets in a green tin')
      ], 'cycle')
    ] },
    media([image('disrupt-01-Pgnt_xJK.webp', 'Canary brand campaign and visual language')], 'single', { width: 'wide' }),
    { type: 'split', blocks: [
      text(null, null, [
        'The shift was subtle but important. The enemy was not the consumer. It was plastic. It was wasteful systems that had become normal.',
        'That distinction allowed the brand to carry conviction without judgment.',
        'Subversion became optimism with clarity. Not aggression.'
      ]),
      media([
        image('photoshoot-03-CbHm4phk.webp', 'Canary lifestyle photoshoot', { span: '1 / 3' }),
        image('photoshoot-02-3ipTovK8.webp', 'Canary personal care in everyday life', { span: '3 / 4' }),
        image('photoshoot-04-BLyR45jv.webp', 'Canary product lifestyle detail', { span: '1 / 2' }),
        image('photoshoot-01-DIMdDrf9.webp', 'Canary lifestyle photography', { span: '2 / 4' })
      ], 'mosaic')
    ] },
    media([image('disrupt-02-XfP4pOww.webp', 'Canary visual identity and brand expression')], 'single', { width: 'wide' }),
    text('identity', 'Visual identity', [
      'The identity holds tension deliberately.',
      'The wordmark is direct and confident. It shows up clearly on shelf. The typography is structured, not delicate. The language is plain about reducing plastic and rethinking habits.',
      'That gives the brand credibility with younger, design-aware consumers who expect brands to stand for something real.',
      'At the same time, the color system is energetic and welcoming. The mascot introduces personality without irony. The tone respects parents and speaks to children without condescension.',
      'Nothing is sarcastic. Nothing is preachy.',
      'Playfulness lives in expression. Conviction lives in stance.',
      "Because those roles are defined, a kid's toothpaste and an adult body product feel like parts of the same point of view."
    ]),
    media([
      image('scout-01-CA7Vz_2U.webp', 'Scout, the Canary mascot, and its visual development'),
      image('scout-02-EJMfcjwj.webp', 'Canary mascot expressions and applications')
    ], 'pair', { width: 'wide' }),
    text('system', 'A system that adapts', [
      'The work resulted in a cohesive brand language that moves naturally from product to product.',
      'On shelf, Canary stands apart from the soft neutrals that surround it. In a family bathroom, it feels lively but not chaotic. In social channels, it can speak clearly about waste without shifting tone.',
      'There is range, but there is no drift.',
      'The brand feels intentional because each element plays a defined role. Nothing competes for attention. Nothing feels added for decoration.',
      'The identity does not sit on top of the product. It expresses what the product believes.'
    ]),
    media([
      image('creative-01-DCMRuiev.webp', 'Canary brand guidelines'),
      image('creative-02-CjWp1EbB.webp', 'Canary identity system application'),
      image('brush-BjpHfMY3.gif', 'Animated Canary lifestyle and personal care photography', { animated: true }),
      image('creative-04-CECOBg85.webp', 'Canary Ghassoul Clay and Rose face mask jar surrounded by powder'),
      image('creative-05-CaAskDmi.webp', 'Canary bird mascot printed on a dark fabric surface'),
      image('creative-06-C_VHbDqd.webp', 'Canary lifestyle portrait against a green backdrop')
    ], 'grid', { width: 'wide' }),
    { type: 'statement', paragraphs: [
      [
        { text: 'The most important work was not choosing colors or type. It was defining what Canary would not become.', emphasis: true },
        ' There were opportunities to lean harder into edge. There were opportunities to soften the work to feel safer. The discipline was in refusing both extremes.'
      ],
      'Canary is for real households. But it does not look or sound like a generic household brand. Holding that line required clarity and restraint. It gave Canary confidence in future decisions, not just this launch.'
    ] },
    text('outcome', 'The outcome', [
      'At launch, Canary did not blend into the eco aisle.',
      'It felt present. Confident. Engaged.',
      'It works for children and adults. For families and design-conscious young consumers. It carries a clear point of view without feeling exclusive.',
      'The result is a brand that feels deliberate in everyday life. Not loud. Not careful. Just clear.'
    ])
  ]
};
