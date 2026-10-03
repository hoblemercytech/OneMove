
import { SITE, whatsappLink } from '../data/site.js';
import { supabase } from '../lib/supabase.js';

/**
 * Builds a WhatsApp message for direct customer contact.
 */
export function buildRequestMessage(v) {
  return [
    'Hello OneMove, I would like to request a delivery.',
    `Name: ${v.name}`,
    v.business ? `Business: ${v.business}` : null,
    v.email ? `Email: ${v.email}` : null,
    `Phone: ${v.phone}`,
    `Pickup location: ${v.pickup}`,
    v.pickupCity ? `Pickup city: ${v.pickupCity}` : null,
    v.recipientName ? `Recipient: ${v.recipientName}` : null,
    v.recipientPhone ? `Recipient phone: ${v.recipientPhone}` : null,
    `Destination address: ${v.destination}`,
    v.destinationCity ? `Destination city: ${v.destinationCity}` : null,
    `Package type: ${v.packageType}`,
    `Number of packages: ${v.packages}`,
    v.info ? `Additional information: ${v.info}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}

/**
 * Submits a delivery request through the Supabase Edge Function.
 *
 * The Edge Function handles:
 * - server-side validation
 * - database insertion
 * - tracking ID generation
 * - customer confirmation email
 * - admin notification email
 */
export async function submitDeliveryRequest(values) {
  const payload = {
    name: String(values.name || '').trim(),
    business: String(values.business || '').trim(),
    email: String(values.email || '').trim().toLowerCase(),
    phone: String(values.phone || '').trim(),

    pickup: String(values.pickup || '').trim(),
    pickupCity: String(values.pickupCity || '').trim(),

    recipientName: String(values.recipientName || '').trim(),
    recipientPhone: String(values.recipientPhone || '').trim(),

    destination: String(values.destination || '').trim(),
    destinationCity: String(values.destinationCity || '').trim(),

    packageType: String(values.packageType || '').trim(),
    packages: Number(values.packages || 1),

    info: String(values.info || '').trim(),

    source: SITE.url,
  };

  const { data, error } = await supabase.functions.invoke(
    'submit-delivery-request',
    {
      body: payload,
    }
  );

  if (error) {
    console.error('Delivery request submission failed:', error);
    throw new Error('Unable to submit the delivery request.');
  }

  if (!data?.trackingId) {
    console.error('Unexpected Edge Function response:', data);
    throw new Error(
      'The delivery request was created without a tracking ID.'
    );
  }

  return {
    ok: true,
    channel: 'backend',
    trackingId: data.trackingId,
  };
}

/**
 * Opens WhatsApp manually with the delivery request details.
 *
 * This is separate from the backend submission flow.
 */
export function openWhatsAppRequest(values) {
  const url = whatsappLink(buildRequestMessage(values));

  window.open(
    url,
    '_blank',
    'noopener,noreferrer'
  );
}
