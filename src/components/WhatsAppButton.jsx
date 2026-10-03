import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '../data/site.js';

export default function WhatsAppButton({
  label = 'Chat on WhatsApp',
  message,
  variant = 'ghost', // 'ghost' | 'solid' | 'ghost-dark'
  className = '',
}) {
  return (
    <a
      className={`btn btn--wa-${variant} ${className}`.trim()}
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircle size={18} aria-hidden="true" />
      {label}
      <span className="sr-only"> (opens WhatsApp in a new tab)</span>
    </a>
  );
}
