import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO.jsx';
import Hero from '../components/Hero.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import LocationCard from '../components/LocationCard.jsx';
import ProcessFlow from '../components/ProcessFlow.jsx';
import RouteMap from '../components/RouteMap.jsx';
import FAQ from '../components/FAQ.jsx';
import CTASection from '../components/CTASection.jsx';
import { SERVICES } from '../data/services.js';
import { LOCATIONS } from '../data/locations.js';
import { HOME_FAQS } from '../data/faqs.js';
import { seoFor } from '../seo/pages.js';

const seo = seoFor('/');

const STEPS = [
  { title: 'Share your order details', text: 'Send the pickup location, destination, package type and receiver details through the form or WhatsApp.' },
  { title: 'OneMove arranges pickup', text: 'We confirm the details with you and coordinate collection from your business.' },
  { title: 'Transportation is coordinated', text: 'Your order moves locally or between cities through available delivery and transportation partners.' },
  { title: 'Your customer receives it', text: 'Delivery is completed at the destination, with confirmation passed on where available.' },
];


import {
  ShoppingBag,
  Store,
  Shirt,
  Utensils,
  Pill,
  ShoppingCart,
  Sparkles,
  BriefcaseBusiness,
  TrendingUp,
} from 'lucide-react';

const BUSINESS = [
  { name: 'Online sellers', icon: ShoppingBag },
  { name: 'Vendors', icon: Store },
  { name: 'Boutiques', icon: Shirt },
  { name: 'Food businesses', icon: Utensils },
  { name: 'Pharmacies', icon: Pill },
  { name: 'Supermarkets', icon: ShoppingCart },
  { name: 'Cosmetics businesses', icon: Sparkles },
  { name: 'Small businesses', icon: BriefcaseBusiness },
  { name: 'Growing Nigerian brands', icon: TrendingUp },
];

export default function Home() {
  return (
    <>
      <SEO {...seo} />
      <Hero />

   
<section className="section problem-section" aria-labelledby="problem-title">
  <div className="container split problem-section__grid">
    <div className="problem-section__visual">
      <img
        src="/onemove-delivery-problem.jpg"
        alt="Business owner organizing customer packages for delivery"
        loading="lazy"
        width="1200"
        height="900"
      />

      <div className="problem-section__badge">
        <span className="problem-section__dot" />
        Multiple orders. Multiple destinations.
      </div>
    </div>

    <div className="problem-section__copy">
      <p className="eyebrow">The delivery challenge</p>

      <h2 id="problem-title" className="h2">
        Delivery should not slow your sales down
      </h2>

      <div className="prose">
        <p>
          When orders come in for different customers and different cities,
          someone has to arrange every pickup, find transport and make sure
          each package reaches the right person. For a growing business,
          that someone is usually you.
        </p>

        <p>
          The result is time spent chasing transport instead of selling, and
          customers asking where their order is. OneMove takes the
          coordination off your hands.
        </p>
      </div>
    </div>
  </div>
</section>



      <section className="section section--soft" aria-labelledby="what-title">
        <div className="container">
          <h2 id="what-title" className="h2">What OneMove does</h2>
          <p className="lead">
            We coordinate the movement of your orders: pickup, transportation and destination delivery, through
            available delivery and transportation partners. You deal with one team.
          </p>
          <ProcessFlow />
          <p className="small-note">
            OneMove coordinates the movement. We do not claim to own every vehicle used.{' '}
            <Link to="/services/delivery-coordination/">How coordination works</Link>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head">
            <h2 id="services-title" className="h2">Services</h2>
            <Link className="textlink" to="/services/">All services <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="grid grid--2">
            {SERVICES.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section section--navy" aria-labelledby="how-title">
        <div className="container">
          <h2 id="how-title" className="h2 h2--light">How it works</h2>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li className="steps__item" key={s.title}>
                <span className="steps__num" aria-hidden="true">{i + 1}</span>
                <h3 className="steps__title">{s.title}</h3>
                <p className="steps__text">{s.text}</p>
              </li>
            ))}
          </ol>
          <Link className="btn btn--primary" to="/contact/">Request a Delivery</Link>
        </div>
      </section>

      <section className="section" aria-labelledby="scope-title">
        <div className="container">
          <h2 id="scope-title" className="h2">Local and interstate, through one point of contact</h2>
          <div className="grid grid--2 scope">
            <div className="scope__col">
              <h3 className="h3">Local delivery</h3>
              <p>
                Customer orders within supported locations, with Offa as our core location. We arrange pickup and
                the final handover to your customer.
              </p>
              <Link className="textlink" to="/services/local-delivery/">Local delivery services <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
            <div className="scope__col">
              <h3 className="h3">Interstate delivery</h3>
              <p>
                Packages moving between cities, such as Offa to Ilorin, Osogbo, Ibadan and Lagos, coordinated
                through transportation partners.
              </p>
              <Link className="textlink" to="/services/interstate-delivery/">Interstate delivery services <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

  
<section
  className="section section--soft routes-section"
  aria-labelledby="routes-title"
>
  <div className="container split split--map">
    <div className="routes-section__copy">
      <p className="eyebrow">Our network</p>

      <h2 id="routes-title" className="h2">
        Routes from Offa
      </h2>

      <p className="lead">
        Four routes are coordinated by OneMove today. Abuja and Port Harcourt
        can be arranged based on current network and transport availability.
      </p>

      <Link className="btn btn--outline" to="/routes/">
        View all routes
      </Link>
    </div>

    <RouteMap />
  </div>
</section>

      <section className="section" aria-labelledby="biz-title">
        <div className="container split">
          <div>
            <h2 id="biz-title" className="h2">Made for businesses that sell</h2>
            <div className="prose">
              <p>
                Orders come from WhatsApp chats, Instagram pages, TikTok videos and shop counters. OneMove fits
                the way these businesses work: send the order details, and we coordinate the rest.
              </p>
            </div>
            <Link className="textlink" to="/services/business-delivery/">Business delivery <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
         
<ul className="chips" aria-label="Businesses OneMove supports">
  {BUSINESS.map(({ name, icon: Icon }) => (
    <li key={name} className="chip">
      <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
      <span>{name}</span>
    </li>
  ))}
</ul>


        </div>
      </section>

      <section className="section section--soft" aria-labelledby="loc-title">
        <div className="container">
          <div className="section-head">
            <h2 id="loc-title" className="h2">Locations served</h2>
            <Link className="textlink" to="/locations/">All locations <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="loclist">
            {LOCATIONS.map((l) => <LocationCard key={l.slug} location={l} />)}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="track-title">
        <div className="container trackband">
          <div>
            <h2 id="track-title" className="h2">Already sent something?</h2>
            <p>Enter your tracking ID, or message OneMove for the latest update on your delivery.</p>
          </div>
          <Link className="btn btn--primary" to="/track/">Track Delivery</Link>
        </div>
      </section>

      <FAQ items={HOME_FAQS} />
      <CTASection />
    </>
  );
}
