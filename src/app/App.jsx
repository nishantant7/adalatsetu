import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppShell from '@/app/layout/AppShell';
import { ROUTE_PATTERNS } from '@/config/routes';
import { ToastProvider } from '@/shared/ui';
import AboutPage from '@/pages/AboutPage';
import HistoryPage from '@/pages/HistoryPage';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import ToolPage from '@/pages/ToolPage';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path={ROUTE_PATTERNS.tool} element={<ToolPage />} />
            <Route path={ROUTE_PATTERNS.history} element={<HistoryPage />} />
            <Route path={ROUTE_PATTERNS.about} element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}
