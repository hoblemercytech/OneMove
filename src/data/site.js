// Central business details. Update here and every page, form and link follows.
export const SITE = {
  name: 'OneMove Logistics',
  shortName: 'OneMove',
  url: 'https://onemove-logistics.com',
  tagline: 'Move Orders. Move Business.',
  subTagline: 'Simple delivery coordination for growing businesses.',
  phoneDisplay: '08169941984',
  phoneTel: '+2348169941984',
  whatsappNumber: '2348169941984', // international format, no "+"
  tiktokHandle: '@onemovelogistics',
  tiktokUrl: 'https://www.tiktok.com/@onemovelogistics',
  ogImage: '/og-image.png',
  logo: '/apple-touch-icon.png',
  year: 2026,
};

export const whatsappLink = (message = 'Hello OneMove, I would like to request a delivery.') =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const NAV_LINKS = [
  { label: 'Home', mobileLabel: 'Home', to: '/' },
  { label: 'Services', mobileLabel: 'Services', to: '/services/' },
  { label: 'Locations', mobileLabel: 'Locations', to: '/locations/' },
  { label: 'Routes', mobileLabel: 'Routes', to: '/routes/' },
  { label: 'Track Delivery', mobileLabel: 'Track', to: '/track/' },
  { label: 'About', mobileLabel: 'About', to: '/about/' },
  { label: 'Contact', mobileLabel: 'Contact', to: '/contact/' },
];

export const PACKAGE_TYPES = [
  'Parcels / small packages',
  'Food items',
  'Clothing and fashion',
  'Cosmetics and personal care',
  'Pharmacy items',
  'Groceries / supermarket items',
  'Electronics and accessories',
  'Documents',
  'Other',
];
