import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Phone } from 'lucide-react';
import SEO from '../components/SEO.jsx';
import PageHeader from '../components/PageHeader.jsx';
import RouteCard from '../components/RouteCard.jsx';
import FAQ from '../components/FAQ.jsx';
import CTASection from '../components/CTASection.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import NotFound from './NotFound.jsx';
import { getLocation } from '../data/locations.js';
import { getRoute } from '../data/routes.js';
import { SITE } from '../data/site.js';
import { seoFor } from '../seo/pages.js';

export default function LocationPage() {
  const { slug } = useParams();
  const loc = getLocation(slug);
  const seo = useMemo(() => (loc ? seoFor(loc.path) : null), [loc]);
  if (!loc) return <NotFound />;

  const routes = loc.routes.map(getRoute).filter(Boolean);

  return (
    <>
      <SEO {...seo} />
      <PageHeader path={loc.path} title={loc.h1} lead={loc.intro[0]}>
        <Link className="btn btn--primary" to="/contact/">Request a Delivery</Link>
        <WhatsAppButton variant="ghost-dark" />
      </PageHeader>

      <section className="section" aria-labelledby="intro-title">
        <div className="container split">
          <h2 id="intro-title" className="h2">{loc.slug === 'offa' ? 'Your delivery service in Offa' : `Delivery to ${loc.name}`}</h2>
          <div className="prose">
            {loc.intro.slice(1).map((p) => <p key={p}>{p}</p>)}
            {loc.note && <p className="callout">{loc.note}</p>}
          </div>
        </div>
      </section>

      <section className="section section--soft" aria-labelledby="svc-title">
        <div className="container split">
          <h2 id="svc-title" className="h2">Services available</h2>
          <ul className="checklist">
            {loc.services.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="how-title">
        <div className="container">
          <h2 id="how-title" className="h2">{loc.slug === 'offa' ? 'How delivery works in Offa' : `How delivery to ${loc.name} works`}</h2>
          <ol className="steps steps--light">
            {loc.howItWorks.map((s, i) => (
              <li className="steps__item" key={s}>
                <span className="steps__num" aria-hidden="true">{i + 1}</span>
                <p className="steps__text">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--soft" aria-labelledby="routes-title">
        <div className="container">
          <h2 id="routes-title" className="h2">{loc.slug === 'offa' ? 'Routes from Offa' : `Relevant route${routes.length > 1 ? 's' : ''}`}</h2>
          <div className="grid grid--2">
            {routes.map((r) => <RouteCard key={r.slug} route={r} />)}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="biz-title">
        <div className="container split">
          <h2 id="biz-title" className="h2">Businesses we serve</h2>
          <ul className="checklist">
            {loc.businesses.map((b) => <li key={b}>{b}</li>)}
          </ul>
        </div>
      </section>

      <FAQ items={loc.faqs} />

      <section className="section section--soft" aria-labelledby="contact-title">
        <div className="container">
          <h2 id="contact-title" className="h3">Contact OneMove</h2>
          <p>
            <a className="textlink" href={`tel:${SITE.phoneTel}`}><Phone size={16} aria-hidden="true" /> {SITE.phoneDisplay}</a>
            {' '}· Call or WhatsApp. See also <Link to="/services/">our services</Link> and <Link to="/routes/">all routes</Link>.
          </p>
        </div>
      </section>

      <CTASection
        title={loc.slug === 'offa' ? 'Send your next order from Offa' : `Send an order to ${loc.name}`}
        whatsappMessage={`Hello OneMove, I would like to arrange a delivery${loc.slug === 'offa' ? ' from Offa' : ` to ${loc.name}`}.`}
      />
    </>
  );
}
