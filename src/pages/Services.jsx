
import SEO from '../components/SEO.jsx';
import PageHeader from '../components/PageHeader.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import CTASection from '../components/CTASection.jsx';
import { SERVICES } from '../data/services.js';
import { seoFor } from '../seo/pages.js';

const seo = seoFor('/services/');

export default function Services() {
  return (
    <>
      <SEO {...seo} />

      <PageHeader
        path="/services/"
        title="Delivery Services for Growing Businesses"
        lead="OneMove coordinates the movement of customer orders and packages, locally and between cities, through available delivery and transportation partners."
      />

      <section className="section services-intro" aria-labelledby="services-intro-title">
        <div className="container services-intro__grid">
          <div className="services-intro__visual">
            <img
              src="/onemove-services.jpg"
              alt="Packages being coordinated for delivery through a connected logistics route"
              loading="lazy"
              width="1200"
              height="900"
            />

            <div className="services-intro__route">
              <span />
              <span />
              <span />
            </div>

            <div className="services-intro__badge">
              <span className="services-intro__dot" />
              Coordinated delivery
            </div>
          </div>

          <div className="services-intro__copy">
            <p className="eyebrow">How we help</p>

            <h2 id="services-intro-title">
              One network for the orders your business needs to move.
            </h2>

            <p>
              Whether you're sending orders within your city or coordinating
              packages between locations, OneMove helps arrange the movement
              through available delivery and transportation partners.
            </p>

            <p>
              Every request is confirmed with you before the order moves,
              so the arrangement is based on the route, destination and
              delivery options available at the time.
            </p>
          </div>
        </div>
      </section>

      <section className="section services-list" aria-label="Services">
        <div className="container">
          <div className="services-list__heading">
            <div>
              <p className="eyebrow">Our services</p>
              <h2 className="h2">Ways OneMove can help move your orders</h2>
            </div>

            <p className="services-list__lead">
              Choose the service that matches what you need to move.
            </p>
          </div>

          <div className="grid grid--2">
            {SERVICES.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>

          <p className="small-note">
            OneMove does not promise services beyond what is confirmed for
            your request. We confirm availability with you before an order
            moves.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
