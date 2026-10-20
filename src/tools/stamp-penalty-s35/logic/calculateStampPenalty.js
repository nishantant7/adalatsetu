import { ceilToRupee } from '@/shared/lib/currency';
import { countChargeableMonths } from './chargeableMonths';
import { INTEREST_RATE_PER_MONTH, PENALTY_RATE_PER_MONTH } from './constants';

/**
 * Validates raw inputs. Returns an error message, or null when inputs are usable.
 * Returns null (no error) while required fields are still empty, so the UI can
 * stay quiet until the user has entered something.
 */
export function validateInputs({
  marketValue,
  dutyRate,
  dutyPaid,
  executionDate,
  calculationDate,
}) {
  if (marketValue <= 0) return 'Market value must be greater than zero.';
  if (dutyPaid < 0) return 'Stamp duty paid cannot be negative.';
  if (!(dutyRate >= 0) || dutyRate > 100) return 'Enter a stamp duty rate between 0 and 100.';
  if (executionDate && calculationDate && calculationDate < executionDate) {
    return 'Date of calculation cannot be before the date of execution.';
  }
  return null;
}

export function hasRequiredInputs({ marketValue, dutyPaid, executionDate }) {
  return Number.isFinite(marketValue) && Number.isFinite(dutyPaid) && executionDate instanceof Date;
}

/**
 * Deficit duty, penalty and interest under clause (a) of the proviso to
 * Section 35, Indian Stamp Act, 1899, as substituted in Madhya Pradesh by
 * the Indian Stamp (MP Second Amendment) Act, 2025:
 *
 *   Deficit  (A) = proper duty − duty paid
 *   Penalty  (B) = A × 1% × months, but not more than A
 *   Interest (C) = A × 1% × months (no upper limit)
 *   Total        = A + B + C
 *
 * Every amount is rounded up to the next rupee.
 *
 * @param {object} input
 * @param {number} input.marketValue
 * @param {number} input.dutyRate - percent applied to market value
 * @param {number} input.dutyPaid
 * @param {Date} input.executionDate
 * @param {Date} input.calculationDate
 * @param {boolean} [input.includeInterest=true]
 */
export function calculateStampPenalty({
  marketValue,
  dutyRate,
  dutyPaid,
  executionDate,
  calculationDate,
  includeInterest = true,
}) {
  const properDuty = ceilToRupee((marketValue * dutyRate) / 100);
  const deficit = Math.max(0, ceilToRupee(properDuty - dutyPaid));
  const period = countChargeableMonths(executionDate, calculationDate);

  const penaltyBeforeCap = ceilToRupee((deficit * PENALTY_RATE_PER_MONTH * period.months) / 100);
  const penalty = Math.min(penaltyBeforeCap, deficit);
  const interest = includeInterest
    ? ceilToRupee((deficit * INTEREST_RATE_PER_MONTH * period.months) / 100)
    : 0;

  return {
    marketValue,
    dutyRate,
    dutyPaid,
    executionDate,
    calculationDate,
    includeInterest,
    properDuty,
    deficit,
    period,
    months: period.months,
    penaltyBeforeCap,
    penalty,
    isPenaltyCapped: penaltyBeforeCap > deficit,
    interest,
    total: deficit + penalty + interest,
  };
}
