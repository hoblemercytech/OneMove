import Breadcrumbs from './Breadcrumbs.jsx';

export default function PageHeader({ path, title, lead, children }) {
  return (
    <header className="phead">
      <div className="container">
        <Breadcrumbs path={path} dark />
        <h1 className="phead__title">{title}</h1>
        {lead && <p className="phead__lead">{lead}</p>}
        {children && <div className="phead__actions">{children}</div>}
      </div>
    </header>
  );
}
