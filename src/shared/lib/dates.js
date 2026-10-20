/**
 * Date helpers. All dates are treated as local calendar dates (time set to midnight)
 * so that day and month arithmetic is not affected by time zones.
 */

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function today() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function daysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

/**
 * Adds calendar months, clamping to the last day of the target month
 * (e.g. 31 Jan + 1 month = 28/29 Feb).
 */
export function addMonths(date, months) {
  const totalMonths = date.getMonth() + months;
  const year = date.getFullYear() + Math.floor(totalMonths / 12);
  const monthIndex = ((totalMonths % 12) + 12) % 12;
  const day = Math.min(date.getDate(), daysInMonth(year, monthIndex));
  return new Date(year, monthIndex, day);
}

/** Whole days between two dates (end − start). */
export function diffInDays(start, end) {
  return Math.round((end - start) / MS_PER_DAY);
}

/** Parses an `<input type="date">` value (YYYY-MM-DD) as a local date. */
export function parseISODate(value) {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

/** Formats a date as YYYY-MM-DD for `<input type="date">`. */
export function toISODate(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

/** Formats a date as DD-MM-YYYY, the usual style in Indian court orders. */
export function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}-${month}-${date.getFullYear()}`;
}

/** Human-readable duration such as "8 years, 8 months, 1 day". */
export function formatDuration({ years = 0, months = 0, days = 0 }) {
  const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
  const parts = [];
  if (years) parts.push(plural(years, 'year'));
  if (months) parts.push(plural(months, 'month'));
  if (days || parts.length === 0) parts.push(plural(days, 'day'));
  return parts.join(', ');
}
