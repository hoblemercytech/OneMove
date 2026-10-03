// Runs after `vite build`. Writes a copy of dist/index.html for every route with that route's
// own title, description, canonical, Open Graph, Twitter tags and JSON-LD already in the HTML,
// so crawlers and link previews see correct metadata without running JavaScript.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { PAGES, seoFor } from '../src/seo/pages.js';
import { renderHeadBlock } from '../src/seo/headTags.js';

const dist = new URL('../dist/', import.meta.url);
const template = readFileSync(new URL('index.html', dist), 'utf8');
const blockRe = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
if (!blockRe.test(template)) throw new Error('SEO markers missing from dist/index.html');

for (const page of PAGES) {
  const block = `<!--seo:start-->\n    ${renderHeadBlock(seoFor(page.path))}\n    <!--seo:end-->`;
  const html = template.replace(blockRe, () => block);
  if (page.path === '/') {
    writeFileSync(new URL('index.html', dist), html);
  } else {
    const dir = new URL(`.${page.path}`, dist);
    mkdirSync(dir, { recursive: true });
    writeFileSync(new URL('index.html', dir), html);
  }
}
console.log(`Prerendered head metadata for ${PAGES.length} routes`);
