import { formatDuration } from '@/shared/lib/dates';

/** "8 years, 8 months, 1 day" — the actual period behind the chargeable month count. */
export function describePeriod(result) {
  const { completedMonths, extraDays } = result.period;
  return formatDuration({
    years: Math.floor(completedMonths / 12),
    months: completedMonths % 12,
    days: extraDays,
  });
}
