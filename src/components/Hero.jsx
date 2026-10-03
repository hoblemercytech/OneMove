import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SITE } from '../data/site.js';
import WhatsAppButton from './WhatsAppButton.jsx';

const ORDERS = [60, 140, 220, 300];
const DESTS = [
  { name: 'Ilorin', y: 60 },
  { name: 'Osogbo', y: 140 },
  { name: 'Ibadan', y: 220 },
  { name: 'Lagos', y: 300 },
];

// Many orders -> one coordinated move -> many destinations.
function HeroNetwork() {
  const reduce = useReducedMotion();
  const draw = (delay) => ({
    initial: reduce ? false : { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: 0.8, delay, ease: 'easeOut' },
  });
  return (
    <figure className="net">
      <svg viewBox="0 0 480 360" role="img" aria-labelledby="net-title net-desc" className="net__svg">
        <title id="net-title">Orders flowing into one coordinated move</title>
        <desc id="net-desc">
          Four customer orders on the left join one OneMove hub, then continue to Ilorin, Osogbo, Ibadan and Lagos.
        </desc>
        {ORDERS.map((y, i) => (
          <motion.path
            key={`in-${y}`}
            d={`M40 ${y} C 112 ${y}, 112 180, 172 180`}
            fill="none"
            stroke="#4DA3FF"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
            {...draw(0.15 + i * 0.1)}
          />
        ))}
        {DESTS.map((d, i) => (
          <motion.path
            key={`out-${d.name}`}
            id={`out-${d.name}`}
            d={`M236 180 C 290 180, 290 ${d.y}, 330 ${d.y}`}
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            {...draw(0.9 + i * 0.1)}
          />
        ))}
        {ORDERS.map((y, i) => (
          <motion.g
            key={`o-${y}`}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <rect x="12" y={y - 14} width="28" height="28" rx="6" fill="#0C2B5A" stroke="#4DA3FF" strokeWidth="1.5" />
            <path d={`M12 ${y - 4}h28M26 ${y - 14}v10`} stroke="#4DA3FF" strokeWidth="1.5" fill="none" />
          </motion.g>
        ))}
        <motion.g
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <circle cx="204" cy="180" r="44" fill="#1261FF" opacity="0.18" />
          <circle cx="204" cy="180" r="32" fill="#1261FF" />
          <path d="M190 172c8 0 8 8 16 8M190 188c8 0 8-8 16-8M206 180h10" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M212 175l5 5-5 5" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
        {DESTS.map((d, i) => (
          <motion.g
            key={d.name}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 + i * 0.1, duration: 0.4 }}
          >
            <circle cx="338" cy={d.y} r="8" fill="#071B3A" stroke="#fff" strokeWidth="3" />
            <text x="356" y={d.y + 6} className="net__label">{d.name}</text>
          </motion.g>
        ))}
        <circle r="4.5" fill="#fff" className="net__pulse">
          <animateMotion dur="3.6s" begin="2.4s" repeatCount="indefinite" path="M236 180 C 290 180, 290 300, 330 300" />
        </circle>
      </svg>
      <figcaption className="net__cap">
        <span>Your orders</span>
        <span>One coordinated move</span>
        <span>Their destinations</span>
      </figcaption>
    </figure>
  );
}

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <h1 id="hero-title" className="hero__title">{SITE.tagline}</h1>
          <p className="hero__sub">{SITE.subTagline}</p>
          <p className="hero__text">
            OneMove helps businesses coordinate customer orders and packages through local and interstate delivery
            networks.
          </p>
          <div className="hero__actions">
            <Link className="btn btn--primary btn--lg" to="/contact/">Request a Delivery</Link>
            <a className="btn btn--outline-dark btn--lg" href="#how-it-works">How It Works</a>
            <WhatsAppButton variant="ghost-dark" className="btn--lg" />
          </div>
        </div>
        <HeroNetwork />
      </div>
    </section>
  );
}
