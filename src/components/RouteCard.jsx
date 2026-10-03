import { Link } from 'react-router-dom';

export default function RouteCard({ route }) {
  return (
    <Link className="rcard" to={route.path}>
      <span className="rcard__path">
        <span>{route.from}</span>
        <span className="rcard__line" aria-hidden="true" />
        <span>{route.to}</span>
      </span>
      <span className="rcard__text">{route.summary}</span>
      <span className={`tag tag--${route.status}`}>
        {route.status === 'supported' ? 'Coordinated route' : 'By arrangement'}
      </span>
    </Link>
  );
}
