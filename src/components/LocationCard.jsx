import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function LocationCard({ location }) {
  return (
    <Link className="loc" to={location.path}>
      <span className="loc__name">{location.name}</span>
      <span className="loc__text">{location.summary}</span>
      <ArrowRight className="loc__arrow" size={18} aria-hidden="true" />
    </Link>
  );
}
