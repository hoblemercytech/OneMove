# OneMove Logistics website

React + Vite + React Router + Framer Motion + Lucide React, with plain CSS. No Tailwind.
**Move Orders. Move Business.**

## Contents

- [Installation](#installation)
- [Development](#development)
- [Production build](#production-build)
- [Deploying to Vercel](#deploying-to-vercel)
- [Connecting the domain](#connecting-the-domain)
- [SEO setup](#seo-setup)
- [Google Search Console](#google-search-console)
- [Google Business Profile](#google-business-profile-website-update)
- [Editing content](#editing-content)
- [Connecting the form and tracking](#connecting-the-form-and-tracking)
- [Project structure](#project-structure)

## Installation

Requires Node.js 18 or newer.

```bash
npm install
```

This also creates `package-lock.json`. Commit it so Vercel installs the exact same versions.

## Development

```bash
npm run dev
```

Opens at http://localhost:5173. Every route works on refresh, for example `/locations/offa/`.

## Production build

```bash
npm run build
npm run preview   # optional: serve the built site locally
```

`npm run build` does three things:

1. `prebuild` regenerates `public/sitemap.xml` from the page registry.
2. `vite build` creates the app in `dist/`.
3. `scripts/prerender.mjs` writes an `index.html` into `dist/` for every route, each with its own title,
   description, canonical URL, Open Graph and Twitter tags and JSON-LD. Crawlers and link previews
   (WhatsApp, Facebook, X) therefore see the right metadata without running JavaScript.

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. In Vercel choose **Add New > Project** and import the repository.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy.

`vercel.json` already sets `trailingSlash: true` and a fallback rewrite to `/index.html`, so refreshing
`/locations/offa/` or any other route does not return a 404.

Optional environment variables (Project Settings > Environment Variables), see `.env.example`:

| Variable | Purpose |
| --- | --- |
| `VITE_REQUEST_ENDPOINT` | URL that receives delivery requests as JSON (POST). |
| `VITE_TRACKING_ENDPOINT` | Reserved for the future tracking system. |

## Connecting the domain

1. In Vercel open the project, then **Settings > Domains**, and add `onemove-logistics.com` and
   `www.onemove-logistics.com`.
2. At your domain registrar, add the DNS records Vercel shows. Normally an `A` record for the root
   domain and a `CNAME` for `www`.
3. Wait for DNS to update. Vercel issues the HTTPS certificate automatically.
4. Set the non-`www` domain as primary so the canonical URLs (`https://onemove-logistics.com/...`) match.

## SEO setup

- **Page text:** every page's title, description, breadcrumbs and FAQs live in `src/seo/pages.js` and the data
  files in `src/data/`. The `<SEO />` component, sitemap, prerender step and JSON-LD all read from them.
- **Canonical domain:** set in `src/data/site.js` (`SITE.url`).
- **Structured data:** `LocalBusiness` on the homepage (no street address, because none has been
  provided), `BreadcrumbList` on inner pages and `FAQPage` where FAQs are shown. Add an `address` to
  `localBusinessSchema()` in `src/seo/schema.js` only once OneMove confirms a public address.
- **Sitemap:** `public/sitemap.xml` (22 URLs), regenerated on every build.
- **robots.txt:** `public/robots.txt` allows everything and points to the sitemap.
- **Images:** `public/og-image.png` (1200 x 630), `public/favicon.svg`, `public/apple-touch-icon.png`.
- There is no meta keywords tag and no hidden text.

## Google Search Console

1. Go to https://search.google.com/search-console and add a **Domain** property for `onemove-logistics.com`
   (or a URL-prefix property for `https://onemove-logistics.com/`).
2. Verify ownership with the DNS TXT record Google gives you, added at your registrar.
3. Open **Sitemaps** and submit `https://onemove-logistics.com/sitemap.xml`.
4. Use **URL Inspection** on the homepage and `/locations/offa/`, then click **Request indexing**.
5. After a few days check **Pages** for indexing problems and **Enhancements** for structured data.

## Google Business Profile website update

1. Sign in at https://business.google.com and open the OneMove Logistics profile.
2. Choose **Edit profile > Business information > Website**.
3. Enter `https://onemove-logistics.com/` and save.
4. Make sure the phone number on the profile is `08169941984`, matching the website.
5. Keep the business name, phone and service areas identical to what is on this website.

## Editing content

| To change | Edit |
| --- | --- |
| Phone, WhatsApp, TikTok, domain, tagline, navigation | `src/data/site.js` |
| Services and their page text | `src/data/services.js` |
| Location pages | `src/data/locations.js` |
| Route pages | `src/data/routes.js` |
| FAQs | `src/data/faqs.js` and the `faqs` arrays in the files above |
| Titles and descriptions | the same data files, wired up in `src/seo/pages.js` |

To add a location or route, add an entry to the data file and add its slug to the relevant lists. The page,
sitemap, breadcrumbs, prerendered metadata and JSON-LD follow automatically.

Route status is either `supported` or `arrangement`. Abuja and Port Harcourt are set to `arrangement`, which
shows "By arrangement" labels and an availability notice. Change them to `supported` only after OneMove
confirms regular service on those routes.

## Connecting the form and tracking

**Delivery request form** (`src/components/ContactForm.jsx`, `src/utils/submitRequest.js`)
- With no environment variable set, submitting opens WhatsApp with the request pre-filled, so no
  request is lost before a backend exists.
- Set `VITE_REQUEST_ENDPOINT` to POST the request as JSON instead. Fields: `name`, `business`, `phone`,
  `pickup`, `destination`, `packageType`, `packages`, `info`, `source`, `submittedAt`.
- For Supabase, point the endpoint at an edge function that inserts into a `delivery_requests` table, or replace the
  `fetch` call in `submitRequest.js` with the Supabase client.

**Tracking** (`src/pages/Track.jsx`, `src/utils/tracking.js`)
- `lookupTracking()` currently returns `not_configured`, which shows the "Tracking is being prepared" message.
- Instructions for connecting Supabase are in the comment at the top of `tracking.js`. The page already
  handles `found` and `not_found` states.

## Project structure

```
public/            favicon, OG image, robots.txt, sitemap.xml
scripts/           generate-sitemap.mjs, prerender.mjs
src/
  components/      Navbar, Footer, Hero, ServiceCard, LocationCard, RouteCard, CTASection, FAQ,
                   ContactForm, WhatsAppButton, SEO, Breadcrumbs, RouteMap, ProcessFlow, PageHeader, Logo
  layouts/         MainLayout
  pages/           Home, Services, ServicePage, Locations, LocationPage, RoutesIndex, RoutePage,
                   Track, About, Contact, NotFound
  data/            site, services, locations, routes, faqs
  seo/             pages (registry), schema, headTags, applyHead
  utils/           icons, submitRequest, tracking
  styles/          base, layout, components, sections
  assets/          (reserved for future images)
```

## Content notes

The site makes no claims about prices, delivery times, schedules, fleet size, offices, partners, reviews or
statistics. Where something is not confirmed (Abuja, Port Harcourt, tracking), the copy says so. Please
review the wording before launch and update it as the business confirms more.
