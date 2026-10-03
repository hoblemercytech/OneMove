import '../styles/admin.css';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  LayoutDashboard,
  Truck,
  Users,
  Bell,
  Mail,
  Upload,
  Menu,
  ArrowRight,
  X,
  Search,
  ArrowUpRight,
  Clock3,
  CheckCircle2,
  CircleAlert,
  MapPin,
  ChevronRight,
  Package,
  LogOut,
  RefreshCw,
} from 'lucide-react';
import { supabase } from '../lib/supabase.js';




const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'deliveries',
    label: 'Deliveries',
    icon: Truck,
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: Users,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
  },
  {
    id: 'messages',
    label: 'Messages',
    icon: Mail,
  },
  {
    id: 'uploads',
    label: 'Uploads',
    icon: Upload,
  },
];


const DELIVERY_STATUSES = [
  { value: 'pending', label: 'Pending' },
  { value: 'reviewing', label: 'Reviewing' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'pickup_arranged', label: 'Pickup Arranged' },
  { value: 'in_transit', label: 'In Transit' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];


function formatNumber(value) {
  return new Intl.NumberFormat('en-NG').format(
    Number(value || 0)
  );
}

function formatDate(value) {
  if (!value) return '—';

  return new Intl.DateTimeFormat('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

function formatDateTime(value) {
  if (!value) return '—';

  return new Intl.DateTimeFormat('en-NG', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

function getCustomerRank(requestCount) {
  const count = Number(requestCount || 0);

  if (count >= 10) return 'VIP';
  if (count >= 5) return 'Frequent';
  if (count >= 2) return 'Regular';

  return 'New';
}

function StatusBadge({ status }) {
  const normalized = String(status || '')
    .toLowerCase()
    .replaceAll('_', ' ');

  return (
    <span
      className={`admin-status admin-status--${normalized.replace(
        /\s+/g,
        '-'
      )}`}
    >
      {normalized || 'unknown'}
    </span>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  detail,
  loading,
}) {
  return (
    <article className="admin-stat">
      <div className="admin-stat__top">
        <div className="admin-stat__icon">
          <Icon size={19} aria-hidden="true" />
        </div>

        {detail && (
          <span className="admin-stat__detail">
            {detail}
          </span>
        )}
      </div>

      <div className="admin-stat__value">
        {loading ? '—' : formatNumber(value)}
      </div>

      <div className="admin-stat__label">
        {label}
      </div>
    </article>
  );
}

function DashboardOverview({
  stats,
  deliveries,
  customers,
  loading,
  onSectionChange,
}) {
  return (
    <section className="admin-section">
      <div className="admin-section__heading">
        <div>
          <p className="admin-eyebrow">Overview</p>
          <h1>Good to see you.</h1>
          <p>
            Here's what is happening across OneMove
            right now.
          </p>
        </div>

        <button
          type="button"
          className="admin-refresh"
          onClick={() => window.location.reload()}
          aria-label="Refresh dashboard"
        >
          <RefreshCw size={17} aria-hidden="true" />
          Refresh
        </button>
      </div>

      <div className="admin-stats">
        <StatCard
          label="Total deliveries"
          value={stats.totalDeliveries}
          icon={Truck}
          loading={loading}
        />

        <StatCard
          label="Total customers"
          value={stats.totalCustomers}
          icon={Users}
          loading={loading}
        />

        <StatCard
          label="Pending requests"
          value={stats.pending}
          icon={Clock3}
          loading={loading}
        />

        <StatCard
          label="Delivered"
          value={stats.delivered}
          icon={CheckCircle2}
          loading={loading}
        />
      </div>

      <div className="admin-grid admin-grid--main">
        <article className="admin-panel">
          <div className="admin-panel__heading">
            <div>
              <h2>Recent deliveries</h2>
              <p>Latest customer requests.</p>
            </div>

            <button
              type="button"
              className="admin-link"
              onClick={() =>
                onSectionChange('deliveries')
              }
            >
              View all
              <ArrowUpRight
                size={15}
                aria-hidden="true"
              />
            </button>
          </div>

          {loading ? (
            <div className="admin-empty">
              Loading deliveries…
            </div>
          ) : deliveries.length === 0 ? (
            <div className="admin-empty">
              <Truck size={24} aria-hidden="true" />
              <p>No delivery requests yet.</p>
            </div>
          ) : (
            <div className="admin-list">
              {deliveries.map((delivery) => (
                <div
                  className="admin-list-item"
                  key={delivery.id}
                >
                  <div className="admin-list-item__icon">
                    <Package
                      size={17}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="admin-list-item__content">
                    <strong>
                      {delivery.customer_name ||
                        'Unnamed customer'}
                    </strong>

                    <span>
                      {delivery.pickup_city ||
                        delivery.pickup_location ||
                        'Pickup'}{' '}
                      →{' '}
                      {delivery.destination_city ||
                        delivery.destination_address ||
                        'Destination'}
                    </span>
                  </div>

                  <div className="admin-list-item__meta">
                    <StatusBadge
                      status={delivery.status}
                    />
                    <small>
                      {formatDateTime(
                        delivery.created_at
                      )}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </article>

        <article className="admin-panel">
          <div className="admin-panel__heading">
            <div>
              <h2>Most active customers</h2>
              <p>Customers using OneMove most often.</p>
            </div>

            <button
              type="button"
              className="admin-link"
              onClick={() =>
                onSectionChange('customers')
              }
            >
              Customers
              <ArrowUpRight
                size={15}
                aria-hidden="true"
              />
            </button>
          </div>

          {loading ? (
            <div className="admin-empty">
              Loading customers…
            </div>
          ) : customers.length === 0 ? (
            <div className="admin-empty">
              <Users size={24} aria-hidden="true" />
              <p>No customers yet.</p>
            </div>
          ) : (
            <div className="admin-customer-list">
              {customers.slice(0, 6).map((customer) => (
                <div
                  className="admin-customer"
                  key={customer.id}
                >
                  <div className="admin-customer__avatar">
                    {String(
                      customer.full_name || '?'
                    )
                      .trim()
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="admin-customer__info">
                    <strong>
                      {customer.full_name}
                    </strong>

                    <span>
                      {customer.business_name ||
                        customer.email}
                    </span>
                  </div>

                  <div className="admin-customer__count">
                    <strong>
                      {formatNumber(
                        customer.request_count
                      )}
                    </strong>

                    <span>requests</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </article>
      </div>
    </section>
  );
}


function DeliveriesSection({
  deliveries,
  loading,
  onRefresh,
  onStatusChange,
  updatingDeliveryId,
}) {
  return (
    <section className="admin-section">
      <div className="admin-section__heading">
        <div>
          <p className="admin-eyebrow">Delivery management</p>
          <h1>Deliveries</h1>
          <p>
            Review delivery requests and update their current status.
          </p>
        </div>

        <button
          type="button"
          className="admin-refresh"
          onClick={onRefresh}
          disabled={loading}
        >
          <RefreshCw size={15} aria-hidden="true" />
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="admin-panel admin-panel--table">
        <div className="admin-panel__heading">
          <h2>All delivery requests</h2>
        </div>

        {loading && deliveries.length === 0 ? (
          <div className="admin-empty">
            Loading deliveries...
          </div>
        ) : deliveries.length === 0 ? (
          <div className="admin-empty">
            No delivery requests yet.
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Tracking ID</th>
                  <th>Customer</th>
                  <th>Route</th>
                  <th>Package</th>
                  <th>Status</th>
                  <th>Created</th>
                </tr>
              </thead>

              <tbody>
                {deliveries.map((delivery) => {
                  const updating =
                    updatingDeliveryId === delivery.id;

                  return (
                    <tr key={delivery.id}>
                      <td>
                        <strong>{delivery.tracking_id}</strong>
                      </td>

                      <td>
                        <strong>
                          {delivery.customer?.full_name ||
                            delivery.customer_name ||
                            'Unknown customer'}
                        </strong>

                        {delivery.business_name && (
                          <div className="admin-table__secondary">
                            {delivery.business_name}
                          </div>
                        )}
                      </td>

                      <td>
                        <div className="admin-route">
                          <span>
                            {delivery.pickup_city ||
                              delivery.pickup_location ||
                              '—'}
                          </span>

                          <ArrowRight
                            size={14}
                            aria-hidden="true"
                          />

                          <span>
                            {delivery.destination_city ||
                              delivery.destination_address ||
                              '—'}
                          </span>
                        </div>
                      </td>

                      <td>
                        {delivery.package_type || '—'}

                        {delivery.package_count && (
                          <div className="admin-table__secondary">
                            {delivery.package_count} package
                            {delivery.package_count === 1
                              ? ''
                              : 's'}
                          </div>
                        )}
                      </td>

                      <td>
                        <div className="admin-status-control">
                          <select
                            className="admin-status-select"
                            value={delivery.status || 'pending'}
                            disabled={updating}
                            onChange={(event) =>
                              onStatusChange(
                                delivery.id,
                                event.target.value
                              )
                            }
                            aria-label={`Change status for ${delivery.tracking_id}`}
                          >
                            {DELIVERY_STATUSES.map((status) => (
                              <option
                                key={status.value}
                                value={status.value}
                              >
                                {status.label}
                              </option>
                            ))}
                          </select>

                          {updating && (
                            <span className="admin-status-saving">
                              Saving...
                            </span>
                          )}
                        </div>
                      </td>

                      <td>
                        {formatDate(delivery.created_at)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

function CustomersSection({
  customers,
  loading,
}) {
  const [search, setSearch] = useState('');
  const [rank, setRank] = useState('all');
  const [sort, setSort] = useState('requests');

  const filteredCustomers = useMemo(() => {
    let result = [...customers];

    const query = search.trim().toLowerCase();

    if (query) {
      result = result.filter((customer) =>
        [
          customer.full_name,
          customer.business_name,
          customer.email,
          customer.phone,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value)
              .toLowerCase()
              .includes(query)
          )
      );
    }

    if (rank !== 'all') {
      result = result.filter(
        (customer) =>
          getCustomerRank(customer.request_count) ===
          rank
      );
    }

    result.sort((a, b) => {
      if (sort === 'requests') {
        return (
          Number(b.request_count || 0) -
          Number(a.request_count || 0)
        );
      }

      if (sort === 'recent') {
        return (
          new Date(b.last_request_at || 0) -
          new Date(a.last_request_at || 0)
        );
      }

      return String(a.full_name || '').localeCompare(
        String(b.full_name || '')
      );
    });

    return result;
  }, [customers, search, rank, sort]);

  return (
    <section className="admin-section">
      <div className="admin-section__heading">
        <div>
          <p className="admin-eyebrow">Customers</p>
          <h1>Customer directory</h1>
          <p>
            One profile per customer, with real request
            history.
          </p>
        </div>
      </div>

      <div className="admin-panel">
        <div className="admin-customer-toolbar">
          <div className="admin-search">
            <Search
              size={17}
              aria-hidden="true"
            />

            <input
              type="search"
              placeholder="Search customers..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <select
            value={rank}
            onChange={(event) =>
              setRank(event.target.value)
            }
            aria-label="Filter customer rank"
          >
            <option value="all">All customers</option>
            <option value="VIP">VIP</option>
            <option value="Frequent">Frequent</option>
            <option value="Regular">Regular</option>
            <option value="New">New</option>
          </select>

          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value)
            }
            aria-label="Sort customers"
          >
            <option value="requests">
              Most requests
            </option>
            <option value="recent">
              Most recent
            </option>
            <option value="name">
              Name
            </option>
          </select>
        </div>

        {loading ? (
          <div className="admin-empty">
            Loading customers…
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="admin-empty">
            <Users size={28} aria-hidden="true" />
            <p>No matching customers.</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Requests</th>
                  <th>Rank</th>
                  <th>Last request</th>
                </tr>
              </thead>

              <tbody>
                {filteredCustomers.map((customer) => {
                  const customerRank =
                    getCustomerRank(
                      customer.request_count
                    );

                  return (
                    <tr key={customer.id}>
                      <td>
                        <div className="admin-customer-cell">
                          <div className="admin-customer__avatar">
                            {String(
                              customer.full_name || '?'
                            )
                              .trim()
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <strong>
                              {customer.full_name}
                            </strong>

                            <small>
                              {customer.business_name ||
                                'Individual customer'}
                            </small>
                          </div>
                        </div>
                      </td>

                      <td>
                        <strong>
                          {customer.email}
                        </strong>

                        <small>
                          {customer.phone || '—'}
                        </small>
                      </td>

                      <td>
                        <strong>
                          {formatNumber(
                            customer.request_count
                          )}
                        </strong>
                      </td>

                      <td>
                        <span
                          className={`admin-rank admin-rank--${customerRank.toLowerCase()}`}
                        >
                          {customerRank}
                        </span>
                      </td>

                      <td>
                        {formatDate(
                          customer.last_request_at
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

function NotificationsSection({
  notifications,
  loading,
  onMarkRead,
  onMarkAllRead,
}) {
  return (
    <section className="admin-section">
      <div className="admin-section__heading">
        <div>
          <p className="admin-eyebrow">Activity</p>
          <h1>Notifications</h1>
          <p>
            Real-time activity from the OneMove
            platform.
          </p>
        </div>

        {notifications.some(
          (notification) => !notification.is_read
        ) && (
          <button
            type="button"
            className="admin-button admin-button--secondary"
            onClick={onMarkAllRead}
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="admin-panel">
        {loading ? (
          <div className="admin-empty">
            Loading notifications…
          </div>
        ) : notifications.length === 0 ? (
          <div className="admin-empty">
            <Bell size={28} aria-hidden="true" />
            <p>No notifications yet.</p>
          </div>
        ) : (
          <div className="admin-notifications">
            {notifications.map((notification) => (
              <button
                type="button"
                className={`admin-notification ${
                  notification.is_read
                    ? ''
                    : 'admin-notification--unread'
                }`}
                key={notification.id}
                onClick={() =>
                  !notification.is_read &&
                  onMarkRead(notification.id)
                }
              >
                <div className="admin-notification__icon">
                  {notification.type ===
                  'delivery_request' ? (
                    <Truck
                      size={17}
                      aria-hidden="true"
                    />
                  ) : (
                    <Bell
                      size={17}
                      aria-hidden="true"
                    />
                  )}
                </div>

                <div>
                  <strong>
                    {notification.title}
                  </strong>

                  <p>
                    {notification.message}
                  </p>

                  <small>
                    {formatDateTime(
                      notification.created_at
                    )}
                  </small>
                </div>

                {!notification.is_read && (
                  <span className="admin-notification__dot" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ComingSoonSection({ type }) {
  const content = {
    messages: {
      eyebrow: 'Communication',
      title: 'Customer messages',
      description:
        'Send email messages to individual customers or your entire customer list.',
      icon: Mail,
    },
    uploads: {
      eyebrow: 'Files',
      title: 'Uploads',
      description:
        'Manage files and attachments that can be used when communicating with customers.',
      icon: Upload,
    },
  };

  const item = content[type];
  const Icon = item.icon;

  return (
    <section className="admin-section">
      <div className="admin-section__heading">
        <div>
          <p className="admin-eyebrow">
            {item.eyebrow}
          </p>

          <h1>{item.title}</h1>

          <p>{item.description}</p>
        </div>
      </div>

      <div className="admin-panel admin-coming-soon">
        <div className="admin-coming-soon__icon">
          <Icon size={24} aria-hidden="true" />
        </div>

        <h2>Ready for the next production layer</h2>

        <p>
          This section will be connected to the real
          messaging and storage backend next.
        </p>
      </div>
    </section>
  );
}

export default function Admin() {
  const [activeSection, setActiveSection] =
    useState('dashboard');

    const [updatingDeliveryId, setUpdatingDeliveryId] = useState(null);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState('');

  const [stats, setStats] = useState({
    totalDeliveries: 0,
    totalCustomers: 0,
    pending: 0,
    delivered: 0,
  });

  const [deliveries, setDeliveries] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [notifications, setNotifications] =
    useState([]);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const [
        deliveriesResult,
        customersResult,
        pendingResult,
        deliveredResult,
        recentDeliveriesResult,
        notificationsResult,
      ] = await Promise.all([
        supabase
          .from('delivery_requests')
          .select('id', { count: 'exact', head: true }),

        supabase
          .from('customers')
          .select('id', { count: 'exact', head: true }),

        supabase
          .from('delivery_requests')
          .select('id', {
            count: 'exact',
            head: true,
          })
          .eq('status', 'pending'),

        supabase
          .from('delivery_requests')
          .select('id', {
            count: 'exact',
            head: true,
          })
          .eq('status', 'delivered'),

        supabase
          .from('delivery_requests')
          .select(`
            id,
            tracking_id,
            customer_id,
            customer_name,
            customer_email,
            pickup_location,
            pickup_city,
            destination_address,
            destination_city,
            package_type,
            package_count,
            status,
            created_at
          `)
          .order('created_at', {
            ascending: false,
          })
          .limit(20),

        supabase
          .from('admin_notifications')
          .select(`
            id,
            type,
            title,
            message,
            customer_id,
            delivery_request_id,
            is_read,
            created_at
          `)
          .order('created_at', {
            ascending: false,
          })
          .limit(50),
      ]);

      const results = [
        deliveriesResult,
        customersResult,
        pendingResult,
        deliveredResult,
        recentDeliveriesResult,
        notificationsResult,
      ];

      const failed = results.find(
        (result) => result.error
      );

      if (failed) {
        throw failed.error;
      }

      const customersQuery = await supabase
        .from('customers')
        .select(`
          id,
          full_name,
          business_name,
          email,
          phone,
          request_count,
          created_at,
          updated_at,
          last_request_at
        `)
        .order('request_count', {
          ascending: false,
        })
        .limit(1000);

      if (customersQuery.error) {
        throw customersQuery.error;
      }

      setStats({
        totalDeliveries:
          deliveriesResult.count || 0,

        totalCustomers:
          customersResult.count || 0,

        pending:
          pendingResult.count || 0,

        delivered:
          deliveredResult.count || 0,
      });

      setDeliveries(
        recentDeliveriesResult.data || []
      );

      setCustomers(
        customersQuery.data || []
      );

      setNotifications(
        notificationsResult.data || []
      );
    } catch (err) {
      console.error(
        'Admin dashboard loading failed:',
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load the admin dashboard.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  useEffect(() => {
    const channel = supabase
      .channel('admin-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'admin_notifications',
        },
        (payload) => {
          setNotifications((current) => [
            payload.new,
            ...current,
          ]);

          loadDashboard();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadDashboard]);



const handleStatusChange = async (deliveryId, newStatus) => {
  if (!deliveryId || !newStatus) return;

  setUpdatingDeliveryId(deliveryId);
  setError('');

  const updatedAt = new Date().toISOString();

  const { error: updateError } = await supabase
    .from('delivery_requests')
    .update({
      status: newStatus,
      updated_at: updatedAt,
    })
    .eq('id', deliveryId);

  if (updateError) {
    console.error(
      'Failed to update delivery status:',
      updateError
    );

    setError(
      'Unable to update the delivery status. Please try again.'
    );

    setUpdatingDeliveryId(null);
    return;
  }

  setDeliveries((current) =>
    current.map((delivery) =>
      delivery.id === deliveryId
        ? {
            ...delivery,
            status: newStatus,
            updated_at: updatedAt,
          }
        : delivery
    )
  );

  setUpdatingDeliveryId(null);

  // Refresh dashboard counts and latest data.
  await loadDashboard();
};



  async function markNotificationRead(id) {
    const { error: updateError } =
      await supabase
        .from('admin_notifications')
        .update({
          is_read: true,
        })
        .eq('id', id);

    if (updateError) {
      console.error(
        'Notification update failed:',
        updateError
      );
      return;
    }

    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              is_read: true,
            }
          : notification
      )
    );
  }

  async function markAllNotificationsRead() {
    const { error: updateError } =
      await supabase
        .from('admin_notifications')
        .update({
          is_read: true,
        })
        .eq('is_read', false);

    if (updateError) {
      console.error(
        'Notifications update failed:',
        updateError
      );
      return;
    }

    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        is_read: true,
      }))
    );
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  }

  function navigateSection(section) {
    setActiveSection(section);
    setMobileOpen(false);
  }

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  return (
    <div className="admin-shell">
      {mobileOpen && (
        <button
          type="button"
          className="admin-sidebar-overlay"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`admin-sidebar ${
          mobileOpen
            ? 'admin-sidebar--open'
            : ''
        }`}
      >
        <div className="admin-sidebar__brand">
          <img
            src="/logo.png"
            alt="OneMove Logistics"
          />

          <button
            type="button"
            className="admin-mobile-close"
            onClick={() =>
              setMobileOpen(false)
            }
            aria-label="Close menu"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>

        <nav className="admin-sidebar__nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <button
                type="button"
                key={item.id}
                className={`admin-nav-item ${
                  activeSection === item.id
                    ? 'admin-nav-item--active'
                    : ''
                }`}
                onClick={() =>
                  navigateSection(item.id)
                }
              >
                <Icon
                  size={18}
                  aria-hidden="true"
                />

                <span>{item.label}</span>

                {item.id ===
                  'notifications' &&
                  unreadCount > 0 && (
                    <span className="admin-nav-badge">
                      {unreadCount > 99
                        ? '99+'
                        : unreadCount}
                    </span>
                  )}
              </button>
            );
          })}
        </nav>

        <div className="admin-sidebar__bottom">
          <button
            type="button"
            className="admin-nav-item admin-nav-item--logout"
            onClick={handleSignOut}
          >
            <LogOut
              size={18}
              aria-hidden="true"
            />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <button
            type="button"
            className="admin-mobile-menu"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} aria-hidden="true" />
          </button>

          <div className="admin-topbar__title">
            <span>OneMove Operations</span>
            <strong>Admin</strong>
          </div>

          <div className="admin-topbar__actions">
            <button
              type="button"
              className="admin-notification-button"
              onClick={() =>
                navigateSection('notifications')
              }
              aria-label="Open notifications"
            >
              <Bell
                size={19}
                aria-hidden="true"
              />

              {unreadCount > 0 && (
                <span />
              )}
            </button>
          </div>
        </header>

        {error && (
          <div className="admin-global-error">
            <CircleAlert
              size={18}
              aria-hidden="true"
            />

            <div>
              <strong>
                Unable to load some dashboard data.
              </strong>

              <p>{error}</p>
            </div>

            <button
              type="button"
              onClick={loadDashboard}
            >
              Try again
            </button>
          </div>
        )}

        {activeSection === 'dashboard' && (
          <DashboardOverview
            stats={stats}
            deliveries={deliveries}
            customers={customers}
            loading={loading}
            onSectionChange={navigateSection}
          />
        )}

        {activeSection === 'deliveries' && (
       <DeliveriesSection
  deliveries={deliveries}
  loading={loading}
  onRefresh={loadDashboard}
  onStatusChange={handleStatusChange}
  updatingDeliveryId={updatingDeliveryId}
/>
        )}

        {activeSection === 'customers' && (
          <CustomersSection
            customers={customers}
            loading={loading}
          />
        )}

        {activeSection === 'notifications' && (
          <NotificationsSection
            notifications={notifications}
            loading={loading}
            onMarkRead={markNotificationRead}
            onMarkAllRead={
              markAllNotificationsRead
            }
          />
        )}

        {activeSection === 'messages' && (
          <ComingSoonSection type="messages" />
        )}

        {activeSection === 'uploads' && (
          <ComingSoonSection type="uploads" />
        )}
      </main>
    </div>
  );
}
