
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Send,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
} from 'lucide-react';
import { PACKAGE_TYPES } from '../data/site.js';
import { supabase } from '../lib/supabase.js';

const EMPTY = {
  name: '',
  business: '',
  email: '',
  phone: '',
  pickup: '',
  pickupCity: '',
  recipientName: '',
  recipientPhone: '',
  destination: '',
  destinationCity: '',
  packageType: '',
  packages: '1',
  info: '',
};

const REQUIRED = {
  name: 'Enter your name.',
  email: 'Enter your email address.',
  phone: 'Enter a phone number we can reach you on.',
  pickup: 'Enter the pickup location.',
  pickupCity: 'Enter the pickup city.',
  recipientName: 'Enter the recipient name.',
  recipientPhone: 'Enter the recipient phone number.',
  destination: 'Enter the destination address.',
  destinationCity: 'Enter the destination city.',
  packageType: 'Choose a package type.',
  packages: 'Enter the number of packages.',
};

export default function ContactForm() {
  const [params] = useSearchParams();

  const [values, setValues] = useState(() => ({
    ...EMPTY,
    pickup: params.get('pickup') || '',
    destination: params.get('destination') || '',
  }));

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    state: 'idle',
  });
  const [copied, setCopied] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: undefined,
      }));
    }
  };

  const validate = () => {
    const next = {};

    Object.keys(REQUIRED).forEach((key) => {
      if (!String(values[key] ?? '').trim()) {
        next[key] = REQUIRED[key];
      }
    });

    if (
      values.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
    ) {
      next.email = 'Enter a valid email address.';
    }

    if (
      values.phone &&
      !/^[+\d][\d\s()-]{6,}$/.test(values.phone.trim())
    ) {
      next.phone = 'Enter a valid phone number.';
    }

    if (
      values.recipientPhone &&
      !/^[+\d][\d\s()-]{6,}$/.test(values.recipientPhone.trim())
    ) {
      next.recipientPhone = 'Enter a valid phone number.';
    }

    if (values.packages && Number(values.packages) < 1) {
      next.packages = 'Enter at least 1 package.';
    }

    return next;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const found = validate();

    setErrors(found);

    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];

      document
        .getElementById(`f-${first}`)
        ?.focus();

      return;
    }

    setStatus({
      state: 'sending',
    });

    try {
      const { data, error } = await supabase.functions.invoke(
        'submit-delivery-request',
        {
          body: {
            ...values,
            packages: Number(values.packages),
          },
        }
      );

      if (error) {
        throw error;
      }

      if (!data?.trackingId) {
        throw new Error('No tracking ID returned.');
      }

      setStatus({
        state: 'done',
        trackingId: data.trackingId,
      });

      setCopied(false);
    } catch (error) {
      console.error('Delivery request error:', error);

      setStatus({
        state: 'error',
      });
    }
  };

  const copyTrackingId = async () => {
    if (!status.trackingId) return;

    try {
      await navigator.clipboard.writeText(status.trackingId);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Could not copy tracking ID:', error);
    }
  };

  if (status.state === 'done') {
    return (
      <div className="form-done" role="status">
        <div className="form-done__icon">
          <CheckCircle2 size={30} aria-hidden="true" />
        </div>

        <p className="eyebrow">Request received</p>

        <h3>Your delivery request has been received.</h3>

        <p>
          Thank you for choosing OneMove Logistics and trusting us
          with your delivery request. Our team will review the
          details and contact you to confirm the arrangement.
        </p>

        <div className="tracking-card">
          <span>Your tracking ID</span>

          <strong>{status.trackingId}</strong>

          <button
            type="button"
            onClick={copyTrackingId}
            className={`tracking-card__copy ${
              copied ? 'tracking-card__copy--copied' : ''
            }`}
            aria-label={
              copied
                ? 'Tracking ID copied'
                : 'Copy tracking ID'
            }
          >
            {copied ? (
              <>
                <Check size={15} aria-hidden="true" />
                Copied
              </>
            ) : (
              <>
                <Copy size={15} aria-hidden="true" />
                Copy ID
              </>
            )}
          </button>
        </div>

        <p className="form-done__note">
          We've also sent a confirmation to{' '}
          <strong>{values.email}</strong>.
        </p>

        <div className="form-done__actions">
          <a
            className="btn btn--primary"
            href={`/track/?id=${encodeURIComponent(
              status.trackingId
            )}`}
          >
            Track request
            <ArrowRight size={17} aria-hidden="true" />
          </a>

          <button
            type="button"
            className="linkbtn"
            onClick={() => {
              setValues(EMPTY);
              setErrors({});
              setCopied(false);
              setStatus({
                state: 'idle',
              });
            }}
          >
            Make another request
          </button>
        </div>
      </div>
    );
  }

  const field = (
    name,
    label,
    props = {},
    optional = false
  ) => (
    <div className="field">
      <label htmlFor={`f-${name}`}>
        {label}

        {optional && (
          <span className="field__opt">
            {' '}
            (optional)
          </span>
        )}
      </label>

      <input
        id={`f-${name}`}
        name={name}
        value={values[name]}
        onChange={onChange}
        aria-invalid={errors[name] ? 'true' : undefined}
        aria-describedby={
          errors[name] ? `e-${name}` : undefined
        }
        required={!optional}
        {...props}
      />

      {errors[name] && (
        <p
          className="field__err"
          id={`e-${name}`}
        >
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <form
      className="form"
      onSubmit={onSubmit}
      noValidate
    >
      <div className="form__section">
        <div className="form__section-heading">
          <span>01</span>

          <div>
            <h3>Your details</h3>
            <p>Tell us who we should contact.</p>
          </div>
        </div>

        <div className="form__row">
          {field('name', 'Full name', {
            autoComplete: 'name',
          })}

          {field(
            'business',
            'Business name',
            {
              autoComplete: 'organization',
            },
            true
          )}
        </div>

        <div className="form__row">
          {field('email', 'Email address', {
            type: 'email',
            inputMode: 'email',
            autoComplete: 'email',
          })}

          {field(
            'phone',
            'Phone / WhatsApp number',
            {
              type: 'tel',
              inputMode: 'tel',
              autoComplete: 'tel',
            }
          )}
        </div>
      </div>

      <div className="form__section">
        <div className="form__section-heading">
          <span>02</span>

          <div>
            <h3>Pickup</h3>
            <p>
              Where should the package be collected?
            </p>
          </div>
        </div>

        {field('pickup', 'Pickup location', {
          placeholder: 'e.g. Shop 12, Offa market',
          autoComplete: 'street-address',
        })}

        {field('pickupCity', 'Pickup city', {
          placeholder: 'e.g. Offa',
          autoComplete: 'address-level2',
        })}
      </div>

      <div className="form__section">
        <div className="form__section-heading">
          <span>03</span>

          <div>
            <h3>Recipient</h3>
            <p>
              Who should receive the package?
            </p>
          </div>
        </div>

        <div className="form__row">
          {field(
            'recipientName',
            'Recipient name',
            {
              autoComplete: 'name',
            }
          )}

          {field(
            'recipientPhone',
            'Recipient phone',
            {
              type: 'tel',
              inputMode: 'tel',
              autoComplete: 'tel',
            }
          )}
        </div>
      </div>

      <div className="form__section">
        <div className="form__section-heading">
          <span>04</span>

          <div>
            <h3>Destination</h3>
            <p>
              Where should the package be delivered?
            </p>
          </div>
        </div>

        {field(
          'destination',
          'Destination address',
          {
            placeholder: 'e.g. No. 10 Main Street',
            autoComplete: 'street-address',
          }
        )}

        {field(
          'destinationCity',
          'Destination city',
          {
            placeholder: 'e.g. Ibadan',
            autoComplete: 'address-level2',
          }
        )}
      </div>

      <div className="form__section">
        <div className="form__section-heading">
          <span>05</span>

          <div>
            <h3>Package details</h3>
            <p>
              Give us a little information about what
              you're sending.
            </p>
          </div>
        </div>

        <div className="form__row">
          <div className="field">
            <label htmlFor="f-packageType">
              Package type
            </label>

            <select
              id="f-packageType"
              name="packageType"
              value={values.packageType}
              onChange={onChange}
              required
              aria-invalid={
                errors.packageType
                  ? 'true'
                  : undefined
              }
              aria-describedby={
                errors.packageType
                  ? 'e-packageType'
                  : undefined
              }
            >
              <option value="">
                Choose one
              </option>

              {PACKAGE_TYPES.map((type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              ))}
            </select>

            {errors.packageType && (
              <p
                className="field__err"
                id="e-packageType"
              >
                {errors.packageType}
              </p>
            )}
          </div>

          {field(
            'packages',
            'Number of packages',
            {
              type: 'number',
              inputMode: 'numeric',
              min: 1,
              step: 1,
            }
          )}
        </div>

        <div className="field">
          <label htmlFor="f-info">
            Additional information
            <span className="field__opt">
              {' '}
              (optional)
            </span>
          </label>

          <textarea
            id="f-info"
            name="info"
            rows="4"
            value={values.info}
            onChange={onChange}
            placeholder="Anything we should know about this delivery?"
          />
        </div>
      </div>

      {status.state === 'error' && (
        <div
          className="form-alert"
          role="alert"
        >
          <strong>
            We couldn't submit your request.
          </strong>

          <span>
            Please check your connection and try again.
            You can also contact OneMove on WhatsApp.
          </span>
        </div>
      )}

      <button
        className="btn btn--primary btn--lg btn--block"
        type="submit"
        disabled={status.state === 'sending'}
      >
        <Send
          size={18}
          aria-hidden="true"
        />

        {status.state === 'sending'
          ? 'Submitting request…'
          : 'Request Delivery'}
      </button>

      <p className="form__privacy">
        By submitting this request, you agree that
        OneMove may use the information provided to
        arrange and communicate about your delivery
        request.
      </p>
    </form>
  );
}
