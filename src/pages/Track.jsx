
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Package,
  MapPin,
  ArrowRight,
  Check,
  Clock3,
  CircleDot,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

import SEO from '../components/SEO.jsx';
import PageHeader from '../components/PageHeader.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import { lookupTracking } from '../utils/tracking.js';
import { seoFor } from '../seo/pages.js';

const seo = seoFor('/track/');

const STATUS_LABELS = {
  pending: 'Request received',
  reviewing: 'Under review',
  confirmed: 'Delivery confirmed',
  pickup_arranged: 'Pickup arranged',
  in_transit: 'In transit',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

const STATUS_ORDER = [
  'pending',
  'reviewing',
  'confirmed',
  'pickup_arranged',
  'in_transit',
  'delivered',
];

function formatStatus(status) {
  return (
    STATUS_LABELS[status] ||
    String(status || 'Unknown').replace(/_/g, ' ')
  );
}

function formatDate(value) {
  if (!value) return '—';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return new Intl.DateTimeFormat('en-NG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function getStatusIndex(status) {
  return STATUS_ORDER.indexOf(status);
}

function StatusTimeline({ currentStatus }) {
  const currentIndex = getStatusIndex(currentStatus);

  return (
    <div className="tracking-timeline">
      {STATUS_ORDER.map((status, index) => {
        const completed =
          currentIndex >= 0 && index < currentIndex;

        const current =
          status === currentStatus;

        const cancelled =
          currentStatus === 'cancelled';

        return (
          <div
            className={[
              'tracking-timeline__item',
              completed ? 'tracking-timeline__item--completed' : '',
              current ? 'tracking-timeline__item--current' : '',
              cancelled ? 'tracking-timeline__item--cancelled' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            key={status}
          >
            <div className="tracking-timeline__marker">
              {completed ? (
                <Check size={14} strokeWidth={2.5} aria-hidden="true" />
              ) : current ? (
                <CircleDot size={15} aria-hidden="true" />
              ) : (
                <span />
              )}
            </div>

            <div className="tracking-timeline__content">
              <strong>{formatStatus(status)}</strong>

              {current && (
                <span className="tracking-timeline__current">
                  Current status
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TrackingDetails({ delivery }) {
  const status = delivery.status;
  const isCancelled = status === 'cancelled';

  return (
    <div className="tracking-result">
      <div className="tracking-result__top">
        <div>
          <span className="tracking-result__eyebrow">
            Delivery tracking
          </span>

          <h2 className="tracking-result__id">
            {delivery.trackingId}
          </h2>
        </div>

        <span
          className={[
            'tracking-status',
            isCancelled ? 'tracking-status--cancelled' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span className="tracking-status__dot" />
          {formatStatus(status)}
        </span>
      </div>

      <div className="tracking-route">
        <div className="tracking-route__point">
          <span className="tracking-route__icon tracking-route__icon--start">
            <MapPin size={18} aria-hidden="true" />
          </span>

          <div>
            <span>Pickup</span>
            <strong>{delivery.pickupCity || '—'}</strong>
          </div>
        </div>

        <div className="tracking-route__line">
          <span />
          <ArrowRight size={17} aria-hidden="true" />
          <span />
        </div>

        <div className="tracking-route__point tracking-route__point--destination">
          <span className="tracking-route__icon tracking-route__icon--end">
            <MapPin size={18} aria-hidden="true" />
          </span>

          <div>
            <span>Destination</span>
            <strong>{delivery.destinationCity || '—'}</strong>
          </div>
        </div>
      </div>

      <div className="tracking-grid">
        <div className="tracking-info-card">
          <div className="tracking-info-card__icon">
            <Package size={18} aria-hidden="true" />
          </div>

          <div>
            <span>Package</span>
            <strong>{delivery.packageType || '—'}</strong>
          </div>
        </div>

        <div className="tracking-info-card">
          <div className="tracking-info-card__icon">
            <Package size={18} aria-hidden="true" />
          </div>

          <div>
            <span>Packages</span>
            <strong>
              {delivery.packageCount ?? '—'}
              {delivery.packageCount === 1 ? ' package' : ' packages'}
            </strong>
          </div>
        </div>

        <div className="tracking-info-card">
          <div className="tracking-info-card__icon">
            <Clock3 size={18} aria-hidden="true" />
          </div>

          <div>
            <span>Requested</span>
            <strong>{formatDate(delivery.createdAt)}</strong>
          </div>
        </div>

        <div className="tracking-info-card">
          <div className="tracking-info-card__icon">
            <RefreshCw size={18} aria-hidden="true" />
          </div>

          <div>
            <span>Last updated</span>
            <strong>{formatDate(delivery.updatedAt)}</strong>
          </div>
        </div>
      </div>

      <div className="tracking-progress">
        <div className="tracking-progress__header">
          <div>
            <span className="tracking-result__eyebrow">
              Delivery progress
            </span>

            <h3>{formatStatus(status)}</h3>
          </div>

          <Package size={21} aria-hidden="true" />
        </div>

        <StatusTimeline currentStatus={status} />
      </div>

      {isCancelled && (
        <div className="tracking-alert tracking-alert--danger">
          <AlertCircle size={19} aria-hidden="true" />

          <div>
            <strong>Delivery cancelled</strong>
            <p>
              This delivery request has been cancelled. Please contact
              OneMove if you need further information.
            </p>
          </div>
        </div>
      )}

      <div className="tracking-help">
        <div>
          <strong>Need help with this delivery?</strong>
          <span>
            Contact OneMove and include your tracking ID.
          </span>
        </div>

        <WhatsAppButton
          variant="solid"
          label="Contact OneMove"
          message={`Hello OneMove, I need an update about my delivery. Tracking ID: ${delivery.trackingId}`}
        />
      </div>
    </div>
  );
}

export default function Track() {
  const [searchParams] = useSearchParams();

  const [id, setId] = useState(
    () => searchParams.get('id')?.trim() || ''
  );

  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  const runLookup = async (trackingId) => {
    const cleanId = String(trackingId || '').trim();

    if (!cleanId) {
      setResult({ state: 'invalid' });
      return;
    }

    setBusy(true);

    try {
      const response = await lookupTracking(cleanId);
      setResult(response);
    } catch (error) {
      console.error('Tracking lookup error:', error);

      setResult({
        state: 'error',
        trackingId: cleanId.toUpperCase(),
      });
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    const queryId = searchParams.get('id')?.trim() || '';

    if (!queryId) {
      return;
    }

    setId(queryId);
    runLookup(queryId);
  }, [searchParams]);

  const onSubmit = async (event) => {
    event.preventDefault();
    await runLookup(id);
  };

  return (
    <>
      <SEO {...seo} />

      <PageHeader
        path="/track/"
        title="Track a OneMove Delivery"
        lead="Enter your tracking ID to see the latest delivery status."
      />

      <section className="section track-section" aria-label="Delivery tracking">
        <div className="container container--narrow">
          <form
            className="trackform"
            onSubmit={onSubmit}
            noValidate
          >
            <div className="trackform__field">
              <label htmlFor="tracking-id">
                Tracking ID
              </label>

              <div className="trackform__input-wrap">
                <Search
                  size={18}
                  aria-hidden="true"
                />

                <input
                  id="tracking-id"
                  name="trackingId"
                  value={id}
                  onChange={(event) => {
                    setId(event.target.value);
                    setResult(null);
                  }}
                  placeholder="OM-261003-7F42K"
                  autoComplete="off"
                  autoCapitalize="characters"
                  spellCheck="false"
                  aria-describedby={
                    result?.state === 'invalid'
                      ? 'track-error'
                      : undefined
                  }
                />
              </div>
            </div>

            <button
              className="btn btn--primary btn--lg trackform__submit"
              type="submit"
              disabled={busy}
            >
              {busy ? (
                <>
                  <RefreshCw
                    size={18}
                    className="trackform__spinner"
                    aria-hidden="true"
                  />
                  Checking...
                </>
              ) : (
                <>
                  <Search
                    size={18}
                    aria-hidden="true"
                  />
                  Track Delivery
                </>
              )}
            </button>
          </form>

          <div
            aria-live="polite"
            className="trackresult"
          >
            {result?.state === 'invalid' && (
              <div
                id="track-error"
                className="tracking-alert tracking-alert--danger"
              >
                <AlertCircle
                  size={19}
                  aria-hidden="true"
                />

                <div>
                  <strong>Tracking ID required</strong>
                  <p>
                    Enter your OneMove tracking ID to continue.
                  </p>
                </div>
              </div>
            )}

            {result?.state === 'not_found' && (
              <div className="tracking-alert tracking-alert--danger">
                <AlertCircle
                  size={19}
                  aria-hidden="true"
                />

                <div>
                  <strong>Tracking ID not found</strong>
                  <p>
                    We could not find that delivery. Check the
                    tracking ID and try again.
                  </p>
                </div>
              </div>
            )}

            {result?.state === 'error' && (
              <div className="tracking-alert tracking-alert--danger">
                <AlertCircle
                  size={19}
                  aria-hidden="true"
                />

                <div>
                  <strong>Unable to check tracking</strong>
                  <p>
                    Something went wrong while checking this
                    delivery. Please try again shortly.
                  </p>
                </div>
              </div>
            )}

            {result?.state === 'found' && (
              <TrackingDetails
                delivery={result.delivery}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
