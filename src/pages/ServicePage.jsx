import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import PageHeader from '../components/PageHeader.jsx';
import ProcessFlow from '../components/ProcessFlow.jsx';
import RouteCard from '../components/RouteCard.jsx';
import FAQ from '../components/FAQ.jsx';
import CTASection from '../components/CTASection.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import NotFound from './NotFound.jsx';
import { getService } from '../data/services.js';
import { getRoute } from '../data/routes.js';
import { seoFor } from '../seo/pages.js';

export default function ServicePage() {
  const { slug } = useParams();
  const service = getService(slug);
  const seo = useMemo(() => (service ? seoFor(service.path) : null), [service]);
  if (!service) return <NotFound />;

  const related = (service.related || []).map(getService).filter(Boolean);

  return (
    <>
      <SEO {...seo} />
      <PageHeader path={service.path} title={service.h1} lead={service.lead}>
        {service.cta?.external ? (
          <WhatsAppButton variant="solid" label={service.cta.label} message="Hello OneMove, I would like to talk about delivery for my business." />
        ) : (
          <Link className="btn btn--primary" to="/contact/">Request a Delivery</Link>
        )}
        {service.cta?.external && <Link className="btn btn--outline-dark" to="/contact/">Request a Delivery</Link>}
      </PageHeader>

      {service.showProcess && (
        <section className="section" aria-labelledby="process-title">
          <div className="container">
            <h2 id="process-title" className="h2">How an order moves</h2>
            <ProcessFlow />
          </div>
        </section>
      )}

      {service.audiences && (
        <section className="section section--soft" aria-labelledby="aud-title">
          <div className="container">
            <h2 id="aud-title" className="h2">Who OneMove supports</h2>
            <ul className="chips chips--row">
              {service.audiences.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </div>
        </section>
      )}

      {service.blocks.map((b, i) => (
        <section className={`section${i % 2 === 0 && !service.audiences ? ' section--soft' : ''}`} key={b.title} aria-labelledby={`b-${i}`}>
          <div className="container split">
            <h2 id={`b-${i}`} className="h2">{b.title}</h2>
            <ul className="checklist">
              {b.items.map((it) => <li key={it}>{it}</li>)}
            </ul>
          </div>
        </section>
      ))}

      {service.routeGroups && service.routeGroups.map((g) => (
        <section className="section" key={g.title} aria-label={g.title}>
          <div className="container">
            <h2 className="h2">{g.title}</h2>
            <p className="lead">{g.note}</p>
            <div className="grid grid--2">
              {g.slugs.map(getRoute).filter(Boolean).map((r) => <RouteCard key={r.slug} route={r} />)}
            </div>
          </div>
        </section>
      ))}

      {related.length > 0 && (
        <section className="section section--soft" aria-labelledby="rel-title">
          <div className="container">
            <h2 id="rel-title" className="h3">Related services</h2>
            <ul className="linklist">
              {related.map((r) => <li key={r.slug}><Link to={r.path}>{r.name}</Link>: {r.summary}</li>)}
            </ul>
          </div>
        </section>
      )}

      <FAQ items={service.faqs} />
      <CTASection />
    </>
  );
}
