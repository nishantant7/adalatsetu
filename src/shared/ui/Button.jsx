import { Link } from 'react-router-dom';
import Icon from './Icon';
import './Button.css';

/**
 * @param {'primary' | 'secondary' | 'ghost' | 'danger'} [variant]
 * @param {'sm' | 'md' | 'lg'} [size]
 * @param {string} [icon] - Icon name shown before the label
 * @param {string} [to] - Renders a router link instead of a button
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  to,
  className = '',
  children,
  type = 'button',
  ...rest
}) {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim();
  const content = (
    <>
      {icon && <Icon name={icon} size={size === 'sm' ? 15 : 17} />}
      {children && <span>{children}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
