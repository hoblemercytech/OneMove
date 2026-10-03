
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase.js';

export default function AdminGuard({ children }) {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let active = true;

    async function verifyAdmin() {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        if (active) {
          setAuthorized(false);
          setLoading(false);
        }

        return;
      }

      const { data: admin, error } =
        await supabase
          .from('admin_users')
          .select('user_id')
          .eq('user_id', session.user.id)
          .maybeSingle();

      if (!active) return;

      if (error || !admin) {
        await supabase.auth.signOut();

        setAuthorized(false);
        setLoading(false);

        return;
      }

      setAuthorized(true);
      setLoading(false);
    }

    verifyAdmin();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!session?.user) {
          if (active) {
            setAuthorized(false);
            setLoading(false);
          }

          return;
        }

        const { data: admin } =
          await supabase
            .from('admin_users')
            .select('user_id')
            .eq('user_id', session.user.id)
            .maybeSingle();

        if (!active) return;

        if (!admin) {
          await supabase.auth.signOut();

          setAuthorized(false);
          setLoading(false);

          return;
        }

        setAuthorized(true);
        setLoading(false);
      }
    );

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <main className="admin-auth-loading">
        <div className="admin-auth-loading__spinner" />
        <p>Checking administrator access…</p>
      </main>
    );
  }

  if (!authorized) {
    return (
      <Navigate
        to="/admin/login/"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return children;
}
