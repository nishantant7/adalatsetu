/**
 * Safe wrappers around localStorage. Storage can be unavailable (private mode,
 * blocked cookies), so every access is guarded and falls back gracefully.
 */

const PREFIX = 'adalatsetu:';

export function readJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
