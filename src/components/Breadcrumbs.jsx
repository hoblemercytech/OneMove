import { Link } from 'react-router-dom';
import { getCrumbs } from '../seo/pages.js';

export default function Breadcrumbs({ path, dark = false }) {
  const crumbs = getCrumbs(path);
  if (crumbs.length < 2) return null;
  return (
    <nav className={`crumbs${dark ? ' crumbs--dark' : ''}`} aria-label="Breadcrumb">
      <ol>
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path}>
              {last ? <span aria-current="page">{c.name}</span> : <Link to={c.path}>{c.name}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
