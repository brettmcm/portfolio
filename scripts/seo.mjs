const origin = 'https://brettmcm.com';
const name = 'Brett McMillin';
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const absolute = path => new URL(path, origin).href;

// Static metadata: crawlers and link previews do not need to run JavaScript.
export function renderSeoMetadata({ title, description, path, image }) {
  const url = absolute(path);
  const person = {
    '@type': 'Person', '@id': `${origin}/#person`, name,
    url: `${origin}/`, image: `${origin}/images/portrait.webp`,
    jobTitle: 'Designer and creative director'
  };
  const website = {
    '@type': 'WebSite', '@id': `${origin}/#website`,
    url: `${origin}/`, name, publisher: { '@id': person['@id'] }
  };
  const page = {
    '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, description,
    isPartOf: { '@id': website['@id'] },
    author: { '@id': person['@id'] },
    ...(path === '/' ? { about: { '@id': person['@id'] } } : {})
  };
  const schema = {
    '@context': 'https://schema.org',
    '@graph': path === '/' ? [website, person, page] : [person, page]
  };
  return `<title>${escape(title)}</title>
<meta name="description" content="${escape(description)}">
<link rel="canonical" href="${escape(url)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${name}">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="${escape(title)}">
<meta property="og:description" content="${escape(description)}">
<meta property="og:url" content="${escape(url)}">
<meta property="og:image" content="${escape(absolute(image.src))}">
<meta property="og:image:alt" content="${escape(image.alt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escape(title)}">
<meta name="twitter:description" content="${escape(description)}">
<meta name="twitter:image" content="${escape(absolute(image.src))}">
<meta name="twitter:image:alt" content="${escape(image.alt)}">
<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`;
}
