import SEO from '../components/SEO.jsx';
import PageHeader from '../components/PageHeader.jsx';
import RouteCard from '../components/RouteCard.jsx';
import RouteMap from '../components/RouteMap.jsx';
import CTASection from '../components/CTASection.jsx';
import { ROUTES } from '../data/routes.js';
import { seoFor } from '../seo/pages.js';

const seo = seoFor('/routes/');

export default function RoutesIndex() {
  return (
    <>
      <SEO {...seo} />
      <PageHeader
        path="/routes/"
        title="Delivery Routes from Offa"
        lead="OneMove coordinates deliveries from Offa to Ilorin, Osogbo, Ibadan and Lagos. Abuja and Port Harcourt are arranged based on current network and transport availability."
      />
      <section className="section" aria-label="Routes">
        <div className="container split split--map">
          <div className="grid">
            {ROUTES.map((r) => <RouteCard key={r.slug} route={r} />)}
          </div>
          <RouteMap />
        </div>
      </section>
      <CTASection />
    </>
  );
}
