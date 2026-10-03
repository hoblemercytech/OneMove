import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo.jsx';
import { NAV_LINKS } from '../data/site.js';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="nav">
      <div className="container nav__bar">
        <Link to="/" className="nav__brand" aria-label="OneMove Logistics home">
          <Logo />
        </Link>

        <nav className="nav__desktop" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className="nav__link">
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/contact/" className="btn btn--primary nav__cta">Request Delivery</Link>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" className="nav__mobile" aria-label="Mobile">
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === '/'} className="nav__mlink">
                  {l.mobileLabel}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/contact/" className="btn btn--primary btn--block">Request Delivery</Link>
        </nav>
      )}
    </header>
  );
}
