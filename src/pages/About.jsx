
import SEO from '../components/SEO.jsx';
import PageHeader from '../components/PageHeader.jsx';
import CTASection from '../components/CTASection.jsx';
import { seoFor } from '../seo/pages.js';

const seo = seoFor('/about/');

const VALUES = [
  {
    name: 'Reliability',
    text: 'We do what we say we will do, and we tell you early when something changes.',
  },
  {
    name: 'Transparency',
    text: 'Plain information about what is available, what is not, and what we are still building.',
  },
  {
    name: 'Efficiency',
    text: 'Fewer steps between a customer order and a delivered package.',
  },
  {
    name: 'Business First',
    text: 'Everything is shaped around how businesses sell and the customers they serve.',
  },
];

export default function About() {
  return (
    <>
      <SEO {...seo} />

      <PageHeader
        path="/about/"
        title="About OneMove Logistics"
        lead="OneMove is a logistics and delivery coordination company helping businesses move customer orders with less stress and better coordination."
      />

      {/* About introduction */}
      <section className="section about-intro" aria-labelledby="about-intro-title">
        <div className="container about-intro__grid">
          <div className="about-intro__visual">
            <img
              src="/onemove-about.jpg"
              alt="Logistics coordination and package movement for businesses"
              loading="lazy"
              width="1200"
              height="900"
            />

            <div className="about-intro__badge">
              <span className="about-intro__dot" />
              Coordinating movement
            </div>
          </div>

          <div className="about-intro__copy">
            <p className="eyebrow">Who we are</p>

            <h2 id="about-intro-title">
              One team coordinating the movement behind your orders.
            </h2>

            <p>
              OneMove helps businesses coordinate customer orders and packages
              through available delivery and transportation partners.
            </p>

            <p>
              Instead of businesses having to arrange every pickup, transport
              connection and destination delivery themselves, OneMove helps
              coordinate the movement from one point to another.
            </p>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="section section--soft" aria-labelledby="how-title">
        <div className="container split about-work">
          <div>
            <p className="eyebrow">How we work</p>
            <h2 id="how-title" className="h2">
              Simple coordination. Clear communication.
            </h2>
          </div>

          <div className="prose">
            <p>
              OneMove coordinates the movement of orders and packages through
              a network of delivery and transportation partners. We handle the
              arrangement of pickup, transportation and destination delivery,
              so that businesses can focus on selling.
            </p>

            <p>
              Our core location is Offa, and we coordinate local and interstate
              deliveries from there.
            </p>
          </div>
        </div>
      </section>

      {/* Mission and vision */}
      <section className="section about-purpose" aria-label="Mission and vision">
        <div className="container">
          <div className="about-purpose__heading">
            <p className="eyebrow">Where we're going</p>
            <h2 className="h2">Built around better movement</h2>
          </div>

          <div className="grid grid--2 about-purpose__grid">
            <article className="about-purpose__card">
              <span className="about-purpose__number">01</span>

              <h2 className="h3">Mission</h2>

              <p className="lead">
                Make product delivery simpler and more efficient for Nigerian
                businesses.
              </p>
            </article>

            <article className="about-purpose__card">
              <span className="about-purpose__number">02</span>

              <h2 className="h3">Vision</h2>

              <p className="lead">
                Build a connected delivery network helping businesses move
                products seamlessly between cities and communities.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section--soft" aria-labelledby="values-title">
        <div className="container">
          <div className="values__heading">
            <div>
              <p className="eyebrow">What guides us</p>
              <h2 id="values-title" className="h2">
                Our values
              </h2>
            </div>

            <p>
              The principles behind how we communicate, coordinate and serve
              businesses.
            </p>
          </div>

          <dl className="values">
            {VALUES.map((v, index) => (
              <div className="values__item" key={v.name}>
                <span className="values__number">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <dt>{v.name}</dt>

                <dd>{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CTASection title="Let’s move your next order" />
    </>
  );
}
