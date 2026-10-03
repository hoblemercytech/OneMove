import { Link } from 'react-router-dom';
import WhatsAppButton from './WhatsAppButton.jsx';

export default function CTASection({
  title = 'Ready to move your next order?',
  text = 'Send your pickup and destination details. OneMove will confirm the arrangement with you.',
  primary = { label: 'Request a Delivery', to: '/contact/' },
  whatsappLabel = 'Chat on WhatsApp',
  whatsappMessage,
}) {
  return (
    <section className="section section--navy cta" aria-labelledby="cta-title">
      <div className="container cta__inner">
        <div>
          <h2 id="cta-title" className="cta__title">{title}</h2>
          <p className="cta__text">{text}</p>
        </div>
        <div className="cta__actions">
          <Link className="btn btn--primary" to={primary.to}>{primary.label}</Link>
          <WhatsAppButton label={whatsappLabel} message={whatsappMessage} variant="ghost-dark" />
        </div>
      </div>
    </section>
  );
}
