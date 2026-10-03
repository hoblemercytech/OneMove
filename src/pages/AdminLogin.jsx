
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockKeyhole, LogIn, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO.jsx';
import { supabase } from '../lib/supabase.js';

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!active || !session) return;

      const { data: admin } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (admin) {
        navigate('/admin/', { replace: true });
      }
    }

    checkSession();

    return () => {
      active = false;
    };
  }, [navigate]);

  async function handleSubmit(event) {
    event.preventDefault();

    setError('');

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setError('Enter your admin email and password.');
      return;
    }

    setBusy(true);

    try {
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

      if (loginError) {
        throw loginError;
      }

      if (!data.session || !data.user) {
        throw new Error('Unable to create an admin session.');
      }

      const { data: admin, error: adminError } =
        await supabase
          .from('admin_users')
          .select('user_id')
          .eq('user_id', data.user.id)
          .maybeSingle();

      if (adminError) {
        await supabase.auth.signOut();
        throw new Error(
          'Unable to verify your administrator account.'
        );
      }

      if (!admin) {
        await supabase.auth.signOut();

        throw new Error(
          'This account is not authorized to access the OneMove admin dashboard.'
        );
      }

      navigate('/admin/', { replace: true });
    } catch (err) {
      console.error('Admin login failed:', err);

      setError(
        err instanceof Error
          ? err.message
          : 'Unable to sign in.'
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <SEO
        title="Admin Login | OneMove Logistics"
        description="Secure OneMove Logistics administrator login."
        canonical="/admin/login/"
        noindex
      />

      <main className="admin-login">
        <div className="admin-login__card">

          <div className="admin-login__brand">
            <img
              src="/logo.png"
              alt="OneMove Logistics"
            />
          </div>

          <div className="admin-login__heading">
            <div className="admin-login__icon">
              <LockKeyhole
                size={20}
                aria-hidden="true"
              />
            </div>

            <div>
              <p className="admin-login__eyebrow">
                Secure access
              </p>

              <h1>Admin dashboard</h1>

              <p>
                Sign in to manage OneMove deliveries,
                customers and notifications.
              </p>
            </div>
          </div>

          <form
            className="admin-login__form"
            onSubmit={handleSubmit}
          >
            <div className="field">
              <label htmlFor="admin-email">
                Email address
              </label>

              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                autoComplete="email"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="admin-password">
                Password
              </label>

              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="current-password"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div
                className="admin-login__error"
                role="alert"
              >
                <AlertCircle
                  size={17}
                  aria-hidden="true"
                />

                <span>{error}</span>
              </div>
            )}

            <button
              className="btn btn--primary btn--lg admin-login__submit"
              type="submit"
              disabled={busy}
            >
              <LogIn
                size={18}
                aria-hidden="true"
              />

              {busy ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="admin-login__security">
            OneMove administrator access is restricted
            to authorized accounts.
          </p>
        </div>
      </main>
    </>
  );
}
