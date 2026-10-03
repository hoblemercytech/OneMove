import { Phone, Globe, Music2 } from 'lucide-react';
import SEO from '../components/SEO.jsx';
import PageHeader from '../components/PageHeader.jsx';
import ContactForm from '../components/ContactForm.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import { SITE } from '../data/site.js';
import { seoFor } from '../seo/pages.js';

const seo = seoFor('/contact/');

export default function Contact() {
  return (
    <>
      <SEO {...seo} />
      <PageHeader
        path="/contact/"
        title="Contact OneMove Logistics"
        lead="Request a delivery or ask a question. Share your pickup and destination and we will confirm the details with you."
      />
      <section className="section" aria-label="Contact details and delivery request">
        <div className="container contact">
          <aside className="contact__card" aria-labelledby="details-title">
            <h2 id="details-title" className="h3">OneMove Logistics</h2>
            <dl className="contact__list">
              <div>
                <dt><Phone size={16} aria-hidden="true" /> Phone</dt>
                <dd><a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a></dd>
              </div>
              <div>
                <dt>WhatsApp</dt>
                <dd><a href={`https://wa.me/${SITE.whatsappNumber}`} target="_blank" rel="noopener noreferrer">{SITE.phoneDisplay}</a></dd>
              </div>
              <div>
                <dt><Globe size={16} aria-hidden="true" /> Website</dt>
                <dd><a href={`${SITE.url}/`}>{SITE.url}/</a></dd>
              </div>
              <div>
                <dt><Music2 size={16} aria-hidden="true" /> TikTok</dt>
                <dd><a href={SITE.tiktokUrl} target="_blank" rel="noopener noreferrer">{SITE.tiktokHandle}</a></dd>
              </div>
            </dl>
            <WhatsAppButton variant="solid" />
          </aside>

          <div className="contact__form">
            <h2 className="h3">Delivery request</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
