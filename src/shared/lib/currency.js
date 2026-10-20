/** Currency helpers for Indian Rupees. */

const inrFormatter = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });
const inputFormatter = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 });

/** ₹6,50,000 */
export function formatINR(amount) {
  return `₹${inrFormatter.format(Math.round(amount))}`;
}

/** Formats a raw amount for display inside an input (6,50,000). */
export function formatAmountInput(amount) {
  return Number.isFinite(amount) ? inputFormatter.format(amount) : '';
}

/** Parses user input such as "6,50,000" or "₹ 1000". Returns NaN for empty/invalid input. */
export function parseAmount(value) {
  const cleaned = String(value ?? '').replace(/[,\s₹]/g, '');
  if (cleaned === '') return Number.NaN;
  return Number(cleaned);
}

/**
 * Rounds up to the next whole rupee, ignoring floating-point noise
 * (so 4549.000000001 becomes 4549, not 4550).
 */
export function ceilToRupee(amount) {
  return Math.ceil(Number(amount.toFixed(6)));
}
