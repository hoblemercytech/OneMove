// JSON-LD builders. Pure functions, no browser APIs, so the prerender script can use them too.
import { SITE } from '../data/site.js';

const AREAS = ['Offa', 'Ilorin', 'Osogbo', 'Ibadan', 'Lagos'];

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE.url}/#business`,
    name: SITE.name,
    url: `${SITE.url}/`,
    logo: `${SITE.url}${SITE.logo}`,
    image: `${SITE.url}${SITE.ogImage}`,
    telephone: SITE.phoneTel,
    description:
      'OneMove Logistics coordinates local and interstate deliveries for businesses in Nigeria through a network of delivery and transportation partners.',
    slogan: SITE.tagline,
    areaServed: AREAS.map((name) => ({ '@type': 'City', name })),
    serviceType: [
      'Local delivery coordination',
      'Interstate delivery coordination',
      'Business delivery',
      'Delivery coordination',
    ],
    sameAs: [SITE.tiktokUrl],
    // No physical address is published. Add "address" here only when the business confirms one.
  };
}

export function breadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE.url}${c.path}`,
    })),
  };
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function buildSchemas(page) {
  const out = [];
  if (page.path === '/') out.push(localBusinessSchema());
  if (page.crumbs && page.crumbs.length > 1) out.push(breadcrumbSchema(page.crumbs));
  if (page.faqs && page.faqs.length) out.push(faqSchema(page.faqs));
  return out;
}
