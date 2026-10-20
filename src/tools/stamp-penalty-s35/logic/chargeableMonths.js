import { addMonths, diffInDays } from '@/shared/lib/dates';

/**
 * Counts months "for every month or part thereof" from the date of execution.
 *
 * The execution day itself is counted, and any part of a month counts as a
 * full month. For an instrument executed on 15-Jan:
 *   - calculated on 15-Jan → 1 month
 *   - calculated on 14-Feb → 1 month
 *   - calculated on 15-Feb → 2 months
 *
 * @param {Date} executionDate
 * @param {Date} endDate - date of calculation / payment (must not be before executionDate)
 * @returns {{ months: number, completedMonths: number, extraDays: number }}
 *   `months` is the chargeable count; `completedMonths` and `extraDays`
 *   describe the actual period for display.
 */
export function countChargeableMonths(executionDate, endDate) {
  let completedMonths = 0;
  while (addMonths(executionDate, completedMonths + 1) <= endDate) {
    completedMonths += 1;
  }

  const startOfPartMonth = addMonths(executionDate, completedMonths);
  const extraDays = diffInDays(startOfPartMonth, endDate) + 1; // execution day is inclusive

  return { months: completedMonths + 1, completedMonths, extraDays };
}
