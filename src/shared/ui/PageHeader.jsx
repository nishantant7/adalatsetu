import './PageHeader.css';

export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <header className="page-header">
      {eyebrow && <p className="page-header__eyebrow">{eyebrow}</p>}
      <h1 className="page-header__title">{title}</h1>
      {description && <p className="page-header__description">{description}</p>}
      {children && <div className="page-header__extra">{children}</div>}
    </header>
  );
}
