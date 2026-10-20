import { ThemeToggle } from '@/features/theme';
import { Icon } from '@/shared/ui';
import Logo from './Logo';
import './TopBar.css';

export default function TopBar({ onMenuClick }) {
  return (
    <header className="topbar">
      <button type="button" className="topbar__menu" onClick={onMenuClick} aria-label="Open menu">
        <Icon name="menu" size={20} />
      </button>
      <div className="topbar__logo">
        <Logo />
      </div>
      <div className="topbar__spacer" />
      <ThemeToggle />
    </header>
  );
}
