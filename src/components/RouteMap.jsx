import { Link } from 'react-router-dom';
import { ROUTES } from '../data/routes.js';

const YS = { 'offa-to-ilorin': 40, 'offa-to-osogbo': 110, 'offa-to-ibadan': 180, 'offa-to-lagos': 250, 'offa-to-abuja': 330, 'offa-to-port-harcourt': 400 };

// Route visualization: Offa as the origin, six destinations. Dashed lines are routes by arrangement.
export default function RouteMap() {
  return (
    <figure className="rmap">
      <svg viewBox="0 0 400 440" className="rmap__svg" aria-label="Routes from Offa to Ilorin, Osogbo, Ibadan, Lagos, Abuja and Port Harcourt">
        {ROUTES.map((r) => {
          const y = YS[r.slug];
          const dashed = r.status === 'arrangement';
          return (
            <path
              key={`l-${r.slug}`}
              d={`M64 220 C 150 220, 150 ${y}, 214 ${y}`}
              fill="none"
              stroke={dashed ? '#4DA3FF' : '#1261FF'}
              strokeWidth={dashed ? 2 : 3}
              strokeDasharray={dashed ? '6 7' : undefined}
              strokeLinecap="round"
            />
          );
        })}
        <circle cx="50" cy="220" r="16" fill="#1261FF" />
        <circle cx="50" cy="220" r="26" fill="none" stroke="#1261FF" strokeOpacity="0.25" strokeWidth="2" />
        <text x="50" y="262" textAnchor="middle" className="rmap__origin">Offa</text>
        {ROUTES.map((r) => {
          const y = YS[r.slug];
          return (
            <Link key={r.slug} to={r.path} aria-label={`${r.from} to ${r.to} delivery`} className="rmap__node">
              <circle cx="228" cy={y} r="11" fill="#fff" stroke={r.status === 'supported' ? '#1261FF' : '#4DA3FF'} strokeWidth="3" />
              <text x="250" y={y + 6} className="rmap__label">{r.to}</text>
              <rect x="212" y={y - 22} width="176" height="44" fill="transparent" />
            </Link>
          );
        })}
      </svg>
      <figcaption className="rmap__cap">
        <span><i className="rmap__key rmap__key--solid" /> Coordinated routes</span>
        <span><i className="rmap__key rmap__key--dash" /> Available by arrangement</span>
      </figcaption>
    </figure>
  );
}
