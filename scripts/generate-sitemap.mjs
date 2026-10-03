import { writeFileSync, mkdirSync } from 'node:fs';
import { PAGES } from '../src/seo/pages.js';
import { SITE } from '../src/data/site.js';

const today = new Date().toISOString().slice(0, 10);
const priority = (p) => (p === '/' ? '1.0' : p === '/locations/offa/' ? '0.9' : p.split('/').filter(Boolean).length === 1 ? '0.8' : '0.7');

const urls = PAGES.map(
  (p) => `  <url>\n    <loc>${SITE.url}${p.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority(p.path)}</priority>\n  </url>`
).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
mkdirSync(new URL('../public/', import.meta.url), { recursive: true });
writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml);
console.log(`sitemap.xml written with ${PAGES.length} URLs`);
