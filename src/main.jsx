import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import { applyStoredTheme } from './features/theme';
import './shared/styles/tokens.css';
import './shared/styles/base.css';

applyStoredTheme();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
