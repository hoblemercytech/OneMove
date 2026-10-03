
import { supabase } from '../lib/supabase.js';

/**
 * Looks up a delivery using its public tracking ID.
 *
 * The database RPC returns only tracking-safe information.
 * Customer contact details and admin notes are not exposed.
 */
export async function lookupTracking(trackingId) {
  const id = String(trackingId || '').trim().toUpperCase();

  if (!id) {
    return { state: 'invalid' };
  }

  const { data, error } = await supabase.rpc(
    'lookup_delivery_tracking',
    {
      p_tracking_id: id,
    }
  );

  if (error) {
    console.error('Tracking lookup failed:', error);

    return {
      state: 'error',
      trackingId: id,
    };
  }

  const delivery = Array.isArray(data) ? data[0] : data;

  if (!delivery) {
    return {
      state: 'not_found',
      trackingId: id,
    };
  }

  return {
    state: 'found',
    delivery: {
      trackingId: delivery.tracking_id,
      status: delivery.status,
      pickupCity: delivery.pickup_city,
      destinationCity: delivery.destination_city,
      packageType: delivery.package_type,
      packageCount: delivery.package_count,
      createdAt: delivery.created_at,
      updatedAt: delivery.updated_at,
    },
  };
}

