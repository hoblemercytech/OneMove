
export function LogoMark({ size = 34 }) {
  return (
    <img
      src="/logo.png"
      alt=""
      width={size}
      height={size}
      className="logo__mark"
      aria-hidden="true"
    />
  );
}

export default function Logo({ light = false }) {
  return (
    <span className={`logo${light ? ' logo--light' : ''}`}>
      <LogoMark />

      <span className="logo__word">
        OneMove<span className="logo__sub"> Logistics</span>
      </span>
    </span>
  );
}
