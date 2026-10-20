/**
 * Saved calculations ("case history").
 *
 * The API is async on purpose: today records live in the browser's
 * localStorage, but the same functions can later call a backend without
 * changing any component.
 *
 * Record shape:
 *   { id, toolId, title, subtitle, amount, savedAt, inputs }
 */
import { readJSON, writeJSON } from '@/shared/lib/storage';

const STORAGE_KEY = 'history';

function readAll() {
  return readJSON(STORAGE_KEY, []);
}

export async function listRecords() {
  return readAll();
}

export async function saveRecord(record) {
  const entry = {
    ...record,
    id: crypto.randomUUID?.() ?? String(Date.now()),
    savedAt: new Date().toISOString(),
  };
  const ok = writeJSON(STORAGE_KEY, [entry, ...readAll()]);
  if (!ok) throw new Error('Browser storage is unavailable.');
  return entry;
}

export async function getRecord(id) {
  return readAll().find((record) => record.id === id) ?? null;
}

export async function deleteRecord(id) {
  writeJSON(
    STORAGE_KEY,
    readAll().filter((record) => record.id !== id),
  );
}

export async function clearRecords() {
  writeJSON(STORAGE_KEY, []);
}
