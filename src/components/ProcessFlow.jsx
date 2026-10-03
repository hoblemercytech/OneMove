import { PROCESS_STAGES } from '../data/services.js';

export default function ProcessFlow({ dark = false }) {
  return (
    <ol className={`flow${dark ? ' flow--dark' : ''}`} aria-label="How an order moves with OneMove">
      {PROCESS_STAGES.map((s, i) => (
        <li className="flow__step" key={s.label}>
          <span className="flow__dot" aria-hidden="true" />
          <span className="flow__label">{s.label}</span>
          <span className="flow__detail">{s.detail}</span>
          {i < PROCESS_STAGES.length - 1 && <span className="flow__line" aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}
