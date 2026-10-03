
import { Link } from 'react-router-dom';
import { ArrowUpRight, Phone, Music2 } from 'lucide-react';
import Logo from './Logo.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';
import { SITE, NAV_LINKS } from '../data/site.js';
import { SERVICES } from '../data/services.js';
import { LOCATIONS } from '../data/locations.js';

export default function Footer() {
  return (
    <footer className="footer">

      {/* Main footer */}
      <div className="container footer__grid">

        {/* Brand */}
        <div className="footer__brand">
          <Logo light />

          <p className="footer__tag">
            {SITE.tagline}
          </p>

          <p className="footer__desc">
            OneMove coordinates local and interstate delivery of customer
            orders and packages for businesses in Nigeria through a network
            of delivery and transportation partners.
          </p>

          <div className="footer__statement">
            <span className="footer__statement-line" />
            <span>Move orders. Move business.</span>
          </div>
        </div>


        {/* Navigation */}
        <nav aria-label="Footer navigation">
          <h2 className="footer__h">Explore</h2>

          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>
                  {l.label}
                  <ArrowUpRight
                    size={13}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>


        {/* Services */}
        <nav aria-label="Footer services">
          <h2 className="footer__h">Services</h2>

          <ul>
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to={s.path}>
                  {s.name}
                  <ArrowUpRight
                    size={13}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>


        {/* Locations */}
        <nav aria-label="Footer locations">
          <h2 className="footer__h">Locations</h2>

          <ul>
            {LOCATIONS.map((l) => (
              <li key={l.slug}>
                <Link to={l.path}>
                  {l.name}
                  <ArrowUpRight
                    size={13}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>


        {/* Contact */}
        <div className="footer__contact">
          <h2 className="footer__h">Get in touch</h2>

          <p className="footer__contact-intro">
            Need to coordinate a delivery or discuss a business route?
          </p>

          <ul className="footer__contact-list">

            <li>
              <a href={`tel:${SITE.phoneTel}`}>
                <span className="footer__contact-icon">
                  <Phone size={15} aria-hidden="true" />
                </span>

                <span>
                  <small>Call OneMove</small>
                  {SITE.phoneDisplay}
                </span>
              </a>
            </li>

            <li>
              <a
                href={SITE.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="footer__contact-icon">
                  <Music2 size={15} aria-hidden="true" />
                </span>

                <span>
                  <small>Follow us on </small>
                  TikTok {SITE.tiktokHandle}
                </span>

                <span className="sr-only">
                  {' '}
                  (opens in a new tab)
                </span>
              </a>
            </li>

          </ul>

       
        </div>
      </div>


      {/* Bottom bar */}
      <div className="container footer__legal">

        <p>
          © {SITE.year} OneMove Logistics. All rights reserved.
        </p>

        <p className="footer__legal-note">
          Coordinated delivery for growing businesses.
        </p>

      </div>
    </footer>
  );
}