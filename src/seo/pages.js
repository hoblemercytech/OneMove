// Single registry of every page: SEO text, breadcrumbs and FAQs.
// The sitemap, prerender step, SEO component, breadcrumbs and JSON-LD all read from here.
import { SITE } from '../data/site.js';
import { SERVICES } from '../data/services.js';
import { LOCATIONS } from '../data/locations.js';
import { ROUTES } from '../data/routes.js';
import { HOME_FAQS } from '../data/faqs.js';
import { buildSchemas } from './schema.js';

const HOME = { name: 'Home', path: '/' };

const staticPages = [
  {
    path: '/',
    title: 'OneMove Logistics | Delivery & Logistics Company in Nigeria',
    description:
      'OneMove Logistics coordinates local and interstate deliveries for businesses in Nigeria. Delivery, dispatch and logistics coordination from Offa to Ilorin, Osogbo, Ibadan, Lagos and beyond.',
    crumbs: [],
    faqs: HOME_FAQS,
  },
  {
    path: '/services/',
    title: 'Delivery & Logistics Services for Businesses | OneMove Logistics',
    description:
      'Local delivery, interstate delivery, business delivery and delivery coordination from OneMove. Simple delivery coordination for growing businesses.',
    crumbs: [HOME, { name: 'Services', path: '/services/' }],
  },
  {
    path: '/locations/',
    title: 'Delivery Locations We Serve | OneMove Logistics',
    description:
      'See where OneMove Logistics coordinates deliveries: Offa, Ilorin, Osogbo, Ibadan and Lagos, with more routes arranged on request.',
    crumbs: [HOME, { name: 'Locations', path: '/locations/' }],
  },
  {
    path: '/routes/',
    title: 'Interstate Delivery Routes from Offa | OneMove Logistics',
    description:
      'Delivery routes coordinated by OneMove from Offa to Ilorin, Osogbo, Ibadan and Lagos, plus Abuja and Port Harcourt by arrangement.',
    crumbs: [HOME, { name: 'Routes', path: '/routes/' }],
  },
  {
    path: '/track/',
    title: 'Track a OneMove Delivery | OneMove Logistics',
    description:
      'Enter your tracking ID to check a OneMove delivery. Online tracking is being prepared; contact OneMove on WhatsApp for the latest update.',
    crumbs: [HOME, { name: 'Track Delivery', path: '/track/' }],
  },
  {
    path: '/about/',
    title: 'About OneMove Logistics | Delivery Coordination for Businesses',
    description:
      'OneMove is a logistics and delivery coordination company helping Nigerian businesses move customer orders with less stress and better coordination.',
    crumbs: [HOME, { name: 'About', path: '/about/' }],
  },
  {
    path: '/contact/',
    title: 'Contact OneMove Logistics | Request a Delivery',
    description:
      'Request a delivery or talk to OneMove Logistics. Call or WhatsApp 08169941984, or send your pickup and destination details through the delivery request form.',
    crumbs: [HOME, { name: 'Contact', path: '/contact/' }],
  },
];

const servicePages = SERVICES.map((s) => ({
  path: s.path,
  title: s.title,
  description: s.description,
  crumbs: [HOME, { name: 'Services', path: '/services/' }, { name: s.name, path: s.path }],
  faqs: s.faqs,
}));

const locationPages = LOCATIONS.map((l) => ({
  path: l.path,
  title: l.title,
  description: l.description,
  crumbs: [HOME, { name: 'Locations', path: '/locations/' }, { name: l.name, path: l.path }],
  faqs: l.faqs,
}));

const routePages = ROUTES.map((r) => ({
  path: r.path,
  title: r.title,
  description: r.description,
  crumbs: [HOME, { name: 'Routes', path: '/routes/' }, { name: `${r.from} to ${r.to}`, path: r.path }],
  faqs: r.faqs,
}));

export const PAGES = [...staticPages, ...servicePages, ...locationPages, ...routePages];

export const getPage = (path) => PAGES.find((p) => p.path === path);
export const getCrumbs = (path) => (getPage(path) || {}).crumbs || [];
export const canonicalFor = (path) => `${SITE.url}${path}`;

// Props for the <SEO /> component.
export function seoFor(path) {
  const page = getPage(path);
  if (!page) throw new Error(`No SEO entry for ${path}`);
  return {
    title: page.title,
    description: page.description,
    canonical: canonicalFor(path),
    ogImage: `${SITE.url}${SITE.ogImage}`,
    ogTitle: page.title,
    ogDescription: page.description,
    schema: buildSchemas(page),
  };
}
