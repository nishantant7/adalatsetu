import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SITE } from '@/config/site';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import './AppShell.css';

export default function AppShell() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="app-shell">
      <Sidebar isOpen={isMenuOpen} onNavigate={closeMenu} />
      {isMenuOpen && <div className="app-shell__scrim" onClick={closeMenu} aria-hidden="true" />}

      <div className="app-shell__main">
        <TopBar onMenuClick={() => setMenuOpen(true)} />
        <main className="app-shell__content">
          <Outlet />
        </main>
        <footer className="app-shell__footer">
          <p>
            {SITE.name} is a calculation aid. Verify every figure against the statute and the facts
            of the case before relying on it.
          </p>
        </footer>
      </div>
    </div>
  );
}
