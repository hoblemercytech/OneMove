// Builds the <head> SEO block as a string. Used by the prerender step at build time.
import { SITE } from '../data/site.js';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function renderHeadBlock({ title, description, canonical, ogImage, ogTitle, ogDescription, schema = [] }) {
  const lines = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${esc(canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:locale" content="en_NG" />`,
    `<meta property="og:url" content="${esc(canonical)}" />`,
    `<meta property="og:title" content="${esc(ogTitle || title)}" />`,
    `<meta property="og:description" content="${esc(ogDescription || description)}" />`,
    `<meta property="og:image" content="${esc(ogImage)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(ogTitle || title)}" />`,
    `<meta name="twitter:description" content="${esc(ogDescription || description)}" />`,
    `<meta name="twitter:image" content="${esc(ogImage)}" />`,
  ];
  schema.forEach((obj) => {
    const json = JSON.stringify(obj).replace(/</g, '\\u003c');
    lines.push(`<script type="application/ld+json" data-seo-jsonld="true">${json}</script>`);
  });
  return lines.join('\n    ');
}
