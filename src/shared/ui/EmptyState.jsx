import Icon from './Icon';
import './EmptyState.css';

export default function EmptyState({ icon = 'info', title, children }) {
  return (
    <div className="empty-state">
      <span className="empty-state__icon">
        <Icon name={icon} size={22} />
      </span>
      {title && <p className="empty-state__title">{title}</p>}
      {children && <div className="empty-state__body">{children}</div>}
    </div>
  );
}
