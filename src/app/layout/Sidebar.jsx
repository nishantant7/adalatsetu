import { NavLink } from 'react-router-dom';
import { Icon } from '@/shared/ui';
import { getToolsByCategory, toolPath } from '@/tools/registry';
import { ROUTES } from '@/config/routes';
import { SITE } from '@/config/site';
import Logo from './Logo';
import './Sidebar.css';

const MAIN_LINKS = [
  { to: ROUTES.home, label: 'Home', icon: 'home', end: true },
  { to: ROUTES.history, label: 'History', icon: 'history' },
];

function navClass({ isActive }) {
  return `sidebar__link ${isActive ? 'is-active' : ''}`.trim();
}

export default function Sidebar({ isOpen, onNavigate }) {
  return (
    <aside className={`sidebar ${isOpen ? 'is-open' : ''}`.trim()} aria-label="Main navigation">
      <div className="sidebar__brand">
        <Logo onClick={onNavigate} />
      </div>

      <nav className="sidebar__nav">
        <ul className="sidebar__list">
          {MAIN_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.end} className={navClass} onClick={onNavigate}>
                <Icon name={link.icon} />
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {getToolsByCategory().map((category) => (
          <div key={category.id} className="sidebar__group">
            <p className="sidebar__group-title">{category.name}</p>
            <ul className="sidebar__list">
              {category.tools.map((tool) => (
                <li key={tool.id}>
                  <NavLink to={toolPath(tool)} className={navClass} onClick={onNavigate}>
                    <Icon name={tool.icon} />
                    {tool.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="sidebar__group">
          <p className="sidebar__group-title">Coming soon</p>
          <p className="sidebar__soon">More court tools are on the way.</p>
        </div>
      </nav>

      <div className="sidebar__footer">
        <NavLink to={ROUTES.about} className={navClass} onClick={onNavigate}>
          <Icon name="info" />
          About {SITE.name}
        </NavLink>
      </div>
    </aside>
  );
}
