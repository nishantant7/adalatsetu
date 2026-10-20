import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { SITE } from '@/config/site';
import './Logo.css';

export default function Logo({ onClick }) {
  return (
    <Link to={ROUTES.home} className="logo" onClick={onClick}>
      <span className="logo__mark" aria-hidden="true">
        <svg viewBox="0 0 64 64" width="34" height="34">
          <rect width="64" height="64" rx="16" fill="currentColor" />
          <g
            fill="none"
            stroke="#f0a94b"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M32 15v33M21 48h22M19 21h26" />
            <path d="M19 21l-6 12h12zM45 21l-6 12h12z" />
          </g>
          <circle cx="32" cy="15" r="3" fill="#f0a94b" />
        </svg>
      </span>
      <span className="logo__text">
        <span className="logo__name">{SITE.name}</span>
        <span className="logo__hindi" lang="hi">
          {SITE.nameHindi}
        </span>
      </span>
    </Link>
  );
}
