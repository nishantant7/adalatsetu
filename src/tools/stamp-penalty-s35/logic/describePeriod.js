import { formatDuration } from '@/shared/lib/dates';
import { DAYS_PER_PART_MONTH } from './constants';

const monthsFormatter = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 4 });

/** "8 years, 8 months, 5 days" — the actual period, for display. */
export function describePeriod({ period }) {
  return formatDuration({
    years: Math.floor(period.completedMonths / 12),
    months: period.completedMonths % 12,
    days: period.remainingDays,
  });
}

/** "104 + 5/30 = 104.1667 months" or "105 months" — how the chargeable months are made up. */
export function describeChargeableMonths({ period }) {
  const { completedMonths, remainingDays, months } = period;
  if (remainingDays === 0) return `${completedMonths} months`;
  return `${completedMonths} + ${remainingDays}/${DAYS_PER_PART_MONTH} = ${monthsFormatter.format(months)} months`;
}

/** "104.1667" */
export function formatMonths(months) {
  return monthsFormatter.format(months);
}
