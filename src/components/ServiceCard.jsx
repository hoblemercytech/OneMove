import { Link } from 'react-router-dom';
import { ServiceIcon } from '../utils/icons.jsx';

export default function ServiceCard({ service }) {
  return (
    <article className="svc">
      <span className="svc__icon"><ServiceIcon name={service.icon} /></span>
      <h3 className="svc__title">
        <Link to={service.path} className="svc__link">{service.name}</Link>
      </h3>
      <p className="svc__text">{service.summary}</p>
    </article>
  );
}
