import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page not found | OneMove Logistics';
    let robots = document.head.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex');
    return () => robots.remove();
  }, []);
  return (
    <section className="section">
      <div className="container container--narrow">
        <h1 className="h1">This page could not be found</h1>
        <p className="lead">The link may be old or mistyped. Try one of these instead.</p>
        <ul className="linklist">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services/">Services</Link></li>
          <li><Link to="/locations/">Locations</Link></li>
          <li><Link to="/contact/">Request a delivery</Link></li>
        </ul>
      </div>
    </section>
  );
}
