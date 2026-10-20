import './Card.css';

export default function Card({
  as: Tag = 'section',
  title,
  description,
  actions,
  className = '',
  children,
  ...rest
}) {
  const hasHeader = title || description || actions;
  return (
    <Tag className={`card ${className}`.trim()} {...rest}>
      {hasHeader && (
        <header className="card__header">
          <div>
            {title && <h2 className="card__title">{title}</h2>}
            {description && <p className="card__description">{description}</p>}
          </div>
          {actions && <div className="card__actions">{actions}</div>}
        </header>
      )}
      {children}
    </Tag>
  );
}
