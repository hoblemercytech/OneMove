// Browser-side head updates, used by the SEO component on client-side navigation.
function upsert(selector, create) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
}

function setMeta(attr, key, content) {
  const el = upsert(`meta[${attr}="${key}"]`, () => {
    const m = document.createElement('meta');
    m.setAttribute(attr, key);
    return m;
  });
  el.setAttribute('content', content);
}

export function applyHead({ title, description, canonical, ogImage, ogTitle, ogDescription, schema = [] }) {
  document.title = title;
  setMeta('name', 'description', description);
  const link = upsert('link[rel="canonical"]', () => {
    const l = document.createElement('link');
    l.setAttribute('rel', 'canonical');
    return l;
  });
  link.setAttribute('href', canonical);

  setMeta('property', 'og:type', 'website');
  setMeta('property', 'og:url', canonical);
  setMeta('property', 'og:title', ogTitle || title);
  setMeta('property', 'og:description', ogDescription || description);
  setMeta('property', 'og:image', ogImage);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', ogTitle || title);
  setMeta('name', 'twitter:description', ogDescription || description);
  setMeta('name', 'twitter:image', ogImage);

  document.head.querySelectorAll('script[data-seo-jsonld]').forEach((n) => n.remove());
  schema.forEach((obj) => {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.setAttribute('data-seo-jsonld', 'true');
    s.text = JSON.stringify(obj);
    document.head.appendChild(s);
  });
}
