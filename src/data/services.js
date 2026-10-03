export const SERVICES = [
  {
    slug: 'local-delivery',
    icon: 'MapPin',
    name: 'Local Delivery',
    path: '/services/local-delivery/',
    summary: 'For businesses sending customer orders within supported locations.',
    title: 'Local Delivery Services | OneMove Logistics',
    description:
      'Local delivery coordination for businesses. OneMove arranges pickup, dispatch and customer delivery for orders and packages within supported locations.',
    h1: 'Local Delivery Services for Businesses',
    lead:
      'You take the order. OneMove coordinates how it gets from your pickup point to your customer, using available local delivery partners.',
    blocks: [
      {
        title: 'What we coordinate',
        items: [
          'Pickup coordination: we arrange where and when the order is collected from you.',
          'Order information: receiver name, phone number and any handling notes travel with the order.',
          'Destination: we confirm the delivery address with you before the order moves.',
          'Delivery partner: we match the order with an available local delivery partner.',
          'Customer delivery: the order is handed to your customer at the destination.',
          'Delivery confirmation where available, so you know the order reached the customer.',
        ],
      },
      {
        title: 'What we need from you',
        items: [
          'Pickup location and a contact person.',
          'The receiver’s name, phone number and delivery address.',
          'The package type and number of packages.',
          'Any special handling, such as food, fragile items or time-sensitive orders.',
        ],
      },
      {
        title: 'Good to know',
        items: [
          'Local delivery is available within supported locations. Offa is our core location.',
          'For a location not listed on this website, contact OneMove to ask what can be arranged.',
          'Availability depends on delivery partner capacity at the time of your request.',
        ],
      },
    ],
    related: ['business-delivery', 'delivery-coordination'],
    faqs: [
      {
        q: 'Where is local delivery available?',
        a: 'Local delivery is coordinated within supported locations, with Offa as our core location. Contact OneMove with your pickup and delivery addresses to confirm what is available.',
      },
      {
        q: 'Do you handle one order at a time or several?',
        a: 'Both. Many businesses send several customer orders on the same day, and OneMove can coordinate them together so you deal with one point of contact.',
      },
      {
        q: 'Will I know when my customer receives the order?',
        a: 'Where delivery confirmation is available, OneMove passes it on to you. Ask us about confirmation when you request the delivery.',
      },
    ],
  },
  {
    slug: 'interstate-delivery',
    icon: 'Route',
    name: 'Interstate Delivery',
    path: '/services/interstate-delivery/',
    summary: 'For businesses moving packages and goods between cities and states.',
    title: 'Interstate Delivery Services in Nigeria | OneMove Logistics',
    description:
      'Interstate delivery coordination in Nigeria. OneMove coordinates business orders from Offa to Ilorin, Osogbo, Ibadan and Lagos through transport partners.',
    h1: 'Interstate Delivery Across Nigeria',
    lead:
      'OneMove coordinates the movement of business orders and packages between supported cities using transportation and delivery partners.',
    blocks: [
      {
        title: 'How interstate delivery works',
        items: [
          'You send the order details and pickup location.',
          'OneMove coordinates pickup and the transportation leg between cities.',
          'A delivery partner at the destination completes delivery to your customer, where this applies to the route.',
        ],
      },
      {
        title: 'Why businesses use it',
        items: [
          'Sell to customers in another city without arranging transport yourself each time.',
          'Keep one point of contact for pickup, transportation and destination delivery.',
          'Send several orders to different destinations in one request.',
        ],
      },
    ],
    routeGroups: [
      {
        title: 'Routes from Offa',
        note: 'OneMove coordinates deliveries on these routes.',
        slugs: ['offa-to-ilorin', 'offa-to-osogbo', 'offa-to-ibadan', 'offa-to-lagos'],
      },
      {
        title: 'Routes by arrangement',
        note:
          'Abuja and Port Harcourt are routes being supported and expanded. Availability is arranged based on current network and transport availability, and is not a regular scheduled service unless confirmed by OneMove.',
        slugs: ['offa-to-abuja', 'offa-to-port-harcourt'],
      },
    ],
    related: ['delivery-coordination', 'business-delivery'],
    faqs: [
      {
        q: 'Does OneMove run a daily service between cities?',
        a: 'OneMove does not promise a fixed daily schedule. We coordinate each request based on the route and current transport availability, and confirm the arrangement with you.',
      },
      {
        q: 'Can I send to a city that is not listed?',
        a: 'You can ask. Contact OneMove with the pickup location and destination and we will tell you whether it can be arranged.',
      },
      {
        q: 'Who delivers to my customer in the destination city?',
        a: 'Destination delivery is handled through delivery partners in the destination area where the route supports it. OneMove coordinates the handover.',
      },
    ],
  },
  {
    slug: 'business-delivery',
    icon: 'Store',
    name: 'Business Delivery',
    path: '/services/business-delivery/',
    summary:
      'For vendors, online sellers, food businesses, boutiques, pharmacies, stores and other businesses that need delivery coordination.',
    title: 'Business Delivery Services in Nigeria | OneMove Logistics',
    description:
      'Business delivery for online sellers, vendors, boutiques, food businesses and pharmacies. OneMove coordinates customer orders locally and between cities.',
    h1: 'Delivery Solutions for Growing Businesses',
    lead:
      'When orders start coming in from more customers and more cities, delivery becomes a job of its own. OneMove coordinates it so you can stay on the business.',
    audiences: [
      'Online sellers',
      'Vendors',
      'Boutiques',
      'Food businesses',
      'Pharmacies',
      'Supermarkets',
      'Cosmetics businesses',
      'Small businesses',
      'Growing Nigerian brands',
    ],
    blocks: [
      {
        title: 'How OneMove supports your orders',
        items: [
          'Customer orders are collected from your pickup point.',
          'Orders going to different destinations can be handled in one request.',
          'Local and interstate deliveries go through the same point of contact.',
          'You get updates on request through WhatsApp while tracking is being prepared.',
        ],
      },
      {
        title: 'Built around how small businesses sell',
        items: [
          'Orders often arrive through WhatsApp, Instagram, TikTok or a shop counter. You can send the details to OneMove the same way.',
          'You do not need a large shipping volume to start. Send what you have.',
          'Tell us the handling your product needs, such as food, fragile or time-sensitive items.',
        ],
      },
    ],
    cta: { label: 'Talk to OneMove', external: true },
    related: ['local-delivery', 'interstate-delivery'],
    faqs: [
      {
        q: 'Is there a minimum number of orders?',
        a: 'OneMove does not publish a minimum on this website. Tell us how many packages you have and we will confirm how it can be coordinated.',
      },
      {
        q: 'Can I send different orders to different cities at once?',
        a: 'Yes, you can share all of them in one request. OneMove coordinates each destination and keeps you updated.',
      },
      {
        q: 'Do you deliver food and pharmacy items?',
        a: 'Tell OneMove what you are sending when you request. Handling needs for items like food and pharmacy products are confirmed before the order moves.',
      },
    ],
  },
  {
    slug: 'delivery-coordination',
    icon: 'Boxes',
    name: 'Delivery Coordination',
    path: '/services/delivery-coordination/',
    summary:
      'OneMove coordinates pickup, transportation and destination delivery through available delivery and transportation partners.',
    title: 'Delivery Coordination Services | OneMove Logistics',
    description:
      'OneMove coordinates pickup, transportation and destination delivery for business orders through delivery and transportation partners across Nigeria.',
    h1: 'We Coordinate the Movement of Your Orders',
    lead:
      'OneMove sits between your business and the people who move packages. We arrange each step and keep you informed, instead of owning every vehicle on the road.',
    showProcess: true,
    blocks: [
      {
        title: 'Coordination, not ownership',
        items: [
          'OneMove coordinates the movement of orders. We do not claim ownership of every vehicle used.',
          'We work with delivery and transportation partners and match each order with what is available for the route.',
          'This lets us support local and interstate movement without tying your business to a single vehicle or driver.',
        ],
      },
      {
        title: 'What coordination covers',
        items: [
          'Pickup: arranging collection from your business.',
          'Transportation: arranging the movement between pickup and destination.',
          'Destination: arranging handover and delivery to your customer.',
          'Communication: you deal with OneMove, not with every partner along the way.',
        ],
      },
    ],
    related: ['local-delivery', 'interstate-delivery'],
    faqs: [
      {
        q: 'What is the difference between coordination and a fleet service?',
        a: 'A fleet service moves goods in its own vehicles. OneMove coordinates movement through available partners and manages the process for you.',
      },
      {
        q: 'Who is responsible if I have a question about my order?',
        a: 'Contact OneMove. You do not need to chase individual partners. We follow up on your behalf.',
      },
    ],
  },
];

export const PROCESS_STAGES = [
  { label: 'Customer Order', detail: 'You receive an order' },
  { label: 'Pickup', detail: 'Collection is arranged' },
  { label: 'Transportation', detail: 'Movement is coordinated' },
  { label: 'Destination', detail: 'Handover at the destination' },
  { label: 'Customer Delivery', detail: 'Your customer receives it' },
];

export const getService = (slug) => SERVICES.find((s) => s.slug === slug);
