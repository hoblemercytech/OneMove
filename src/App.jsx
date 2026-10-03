
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';

// Home loads with the main bundle for the fastest first paint;
// other pages load on demand.
const Services = lazy(() => import('./pages/Services.jsx'));
const ServicePage = lazy(() => import('./pages/ServicePage.jsx'));
const Locations = lazy(() => import('./pages/Locations.jsx'));
const LocationPage = lazy(() => import('./pages/LocationPage.jsx'));
const RoutesIndex = lazy(() => import('./pages/RoutesIndex.jsx'));
const RoutePage = lazy(() => import('./pages/RoutePage.jsx'));
const Track = lazy(() => import('./pages/Track.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

// Admin pages are also loaded only when someone visits them.
const Admin = lazy(() => import('./pages/Admin.jsx'));
const AdminLogin = lazy(() => import('./pages/AdminLogin.jsx'));
const AdminGuard = lazy(() => import('./components/AdminGuard.jsx'));

export default function App() {
  return (
    <Suspense
      fallback={
        <div
          className="page-loading"
          aria-busy="true"
        />
      }
    >
      <Routes>

        {/* =================================================
            PUBLIC WEBSITE
        ================================================= */}

        <Route element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route
            path="services"
            element={<Services />}
          />

          <Route
            path="services/:slug"
            element={<ServicePage />}
          />

          <Route
            path="locations"
            element={<Locations />}
          />

          <Route
            path="locations/:slug"
            element={<LocationPage />}
          />

          <Route
            path="routes"
            element={<RoutesIndex />}
          />

          <Route
            path="routes/:slug"
            element={<RoutePage />}
          />

          <Route
            path="track"
            element={<Track />}
          />

          <Route
            path="about"
            element={<About />}
          />

          <Route
            path="contact"
            element={<Contact />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>


        {/* =================================================
            ADMIN
        ================================================= */}

        {/* Public admin login */}
        <Route
          path="admin/login"
          element={<AdminLogin />}
        />

        {/* Protected production admin dashboard */}
        <Route
          path="admin"
          element={
            <AdminGuard>
              <Admin />
            </AdminGuard>
          }
        />

      </Routes>
    </Suspense>
  );
}
