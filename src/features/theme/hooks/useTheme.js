import { useCallback, useEffect, useState } from 'react';
import { readJSON, writeJSON } from '@/shared/lib/storage';

const STORAGE_KEY = 'theme';

function systemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Applies the saved theme to <html>. Call once before rendering to avoid a flash. */
export function applyStoredTheme() {
  const stored = readJSON(STORAGE_KEY, null);
  if (stored) document.documentElement.dataset.theme = stored;
}

/** Current theme ('light' | 'dark') and a toggle that remembers the choice. */
export function useTheme() {
  const [theme, setTheme] = useState(() => readJSON(STORAGE_KEY, null) ?? systemTheme());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      writeJSON(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
