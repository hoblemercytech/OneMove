import SEO from '../components/SEO.jsx';
import PageHeader from '../components/PageHeader.jsx';
import LocationCard from '../components/LocationCard.jsx';
import CTASection from '../components/CTASection.jsx';
import { LOCATIONS } from '../data/locations.js';
import { seoFor } from '../seo/pages.js';

const seo = seoFor('/locations/');

export default function Locations() {
  return (
    <>
      <SEO {...seo} />
      <PageHeader
        path="/locations/"
        title="Locations We Serve"
        lead="Offa is OneMove’s core location. From there we coordinate deliveries to Ilorin, Osogbo, Ibadan and Lagos."
      />
      <section className="section" aria-label="Locations">
        <div className="container">
          <div className="loclist">
            {LOCATIONS.map((l) => <LocationCard key={l.slug} location={l} />)}
          </div>
          <p className="small-note">
            Need somewhere else? Contact OneMove and ask what can be arranged.
          </p>
        </div>
      </section>
      <CTASection />
    </>
  );
}
