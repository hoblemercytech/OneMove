import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { whatsappLink } from '../data/site.js';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}


export default function MainLayout() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <ScrollToTop />

      <Navbar />

      <main id="main" tabIndex="-1">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}


