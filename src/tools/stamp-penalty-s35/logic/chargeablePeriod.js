import { addMonths, diffInDays } from '@/shared/lib/dates';
import { DAYS_PER_PART_MONTH } from './constants';

/**
 * Period from the date of execution to the date of hearing.
 *
 * - The execution day is counted; the hearing day is not.
 * - Whole months are counted date to date (15-Jan to 14-Feb, end of day, is one month).
 * - Remaining days are charged as days / 30 of a month.
 *
 * Executed 15-Jan, hearing 20-Feb → 1 month + 5 days (15-Feb … 19-Feb) = 1 + 5/30 months.
 *
 * @param {Date} executionDate
 * @param {Date} hearingDate - must not be before executionDate
 * @returns {{ completedMonths: number, remainingDays: number, totalDays: number, months: number }}
 *   `totalDays` is the period in 30-day-month days (completedMonths × 30 + remainingDays),
 *   which keeps amount calculations exact; `months` is the same period as a decimal.
 */
export function calculateChargeablePeriod(executionDate, hearingDate) {
  let completedMonths = 0;
  while (addMonths(executionDate, completedMonths + 1) <= hearingDate) {
    completedMonths += 1;
  }

  const remainingDays = diffInDays(addMonths(executionDate, completedMonths), hearingDate);
  const totalDays = completedMonths * DAYS_PER_PART_MONTH + remainingDays;

  return {
    completedMonths,
    remainingDays,
    totalDays,
    months: totalDays / DAYS_PER_PART_MONTH,
  };
}
