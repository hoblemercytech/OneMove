import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Info } from 'lucide-react';
import SEO from '../components/SEO.jsx';
import PageHeader from '../components/PageHeader.jsx';
import FAQ from '../components/FAQ.jsx';
import CTASection from '../components/CTASection.jsx';
import NotFound from './NotFound.jsx';
import { getRoute } from '../data/routes.js';
import { GENERAL_DELIVERY_FAQS } from '../data/faqs.js';
import { seoFor } from '../seo/pages.js';

export default function RoutePage() {
  const { slug } = useParams();
  const route = getRoute(slug);
  const seo = useMemo(() => (route ? seoFor(route.path) : null), [route]);
  if (!route) return <NotFound />;

  const { from, to } = route;
  const arranged = route.status === 'arrangement';
  const requestUrl = `/contact/?pickup=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}`;

  return (
    <>
      <SEO {...seo} />
      <PageHeader path={route.path} title={route.h1} lead={route.intro}>
        <Link className="btn btn--primary" to={requestUrl}>
          {arranged ? `Ask about ${to} delivery` : 'Request a Delivery'}
        </Link>
      </PageHeader>

      <section className="section" aria-label="Route overview">
        <div className="container">
          <div className="routebar">
            <div><span className="routebar__k">Origin</span><strong>{from}</strong></div>
            <span className={`routebar__line${arranged ? ' routebar__line--dash' : ''}`} aria-hidden="true" />
            <div><span className="routebar__k">Destination</span><strong>{to}</strong></div>
          </div>
          {arranged && (
            <p className="notice" role="note">
              <Info size={20} aria-hidden="true" />
              <span>
                {to} delivery is arranged based on current network and transport availability. It is not a regular
                scheduled service unless OneMove has confirmed it for your request.
              </span>
            </p>
          )}
        </div>
      </section>

      <section className="section section--soft" aria-labelledby="who-title">
        <div className="container split">
          <h2 id="who-title" className="h2">Who uses this route</h2>
          <ul className="checklist">
            {route.whoUses.map((w) => <li key={w}>{w}</li>)}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="coord-title">
        <div className="container split">
          <h2 id="coord-title" className="h2">What can be coordinated</h2>
          <ul className="checklist">
            <li>Business orders and customer packages going from {from} to {to}</li>
            <li>Several orders for different receivers in one request</li>
            <li>Pickup from your location in {from}</li>
            <li>Transportation between {from} and {to}</li>
            <li>Handover to your customer in {to}</li>
          </ul>
        </div>
      </section>

      <section className="section section--soft" aria-labelledby="req-title">
        <div className="container">
          <h2 id="req-title" className="h2">How to request a delivery</h2>
          <ol className="steps steps--light">
            <li className="steps__item">
              <span className="steps__num" aria-hidden="true">1</span>
              <p className="steps__text">Fill in the <Link to={requestUrl}>delivery request form</Link> or message OneMove on WhatsApp.</p>
            </li>
            <li className="steps__item">
              <span className="steps__num" aria-hidden="true">2</span>
              <p className="steps__text">Share the package type, number of packages and the receiver’s details in {to}.</p>
            </li>
            <li className="steps__item">
              <span className="steps__num" aria-hidden="true">3</span>
              <p className="steps__text">OneMove confirms the arrangement with you before the order moves.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section" aria-label="Pickup, transportation and delivery">
        <div className="container grid grid--3">
          <div>
            <h2 className="h3">Pickup information</h2>
            <p>
              OneMove arranges pickup from your business or chosen pickup point in {from}. Share the address, a
              contact person and when the order will be ready.
            </p>
          </div>
          <div>
            <h2 className="h3">Transportation process</h2>
            <p>
              {arranged
                ? `OneMove first checks what is available between ${from} and ${to} for your package, then confirms the arrangement with you before the order moves.`
                : `Once collected, the package is moved from ${from} to ${to} through a transportation partner arranged by OneMove. Ask for an update at any point.`}
            </p>
          </div>
          <div>
            <h2 className="h3">Destination delivery</h2>
            <p>
              In {to}, the package is handed to your customer through a delivery partner where this applies to the
              route. Delivery confirmation is passed on where available.
            </p>
          </div>
        </div>
      </section>

      {route.locationSlug && (
        <section className="section section--soft" aria-label="Related location">
          <div className="container">
            <p>
              Learn more about <Link to={`/locations/${route.locationSlug}/`}>delivery services in {to}</Link> or
              see <Link to="/routes/">all routes from Offa</Link>.
            </p>
          </div>
        </section>
      )}

      <FAQ items={[...route.faqs, ...GENERAL_DELIVERY_FAQS]} />
      <CTASection
        title={`Send an order from ${from} to ${to}`}
        primary={{ label: arranged ? `Ask about ${to} delivery` : 'Request a Delivery', to: requestUrl }}
        whatsappMessage={`Hello OneMove, I would like to arrange a delivery from ${from} to ${to}.`}
      />
    </>
  );
}
