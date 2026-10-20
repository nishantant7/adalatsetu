import { ceilToRupee } from '@/shared/lib/currency';
import { calculateChargeablePeriod } from './chargeablePeriod';
import { DAYS_PER_PART_MONTH, INTEREST_RATE_PER_MONTH, PENALTY_RATE_PER_MONTH } from './constants';

/** amount × rate% per month × period, using whole days so fractions stay exact. */
function chargeFor(amount, ratePerMonth, totalDays) {
  return ceilToRupee((amount * ratePerMonth * totalDays) / (100 * DAYS_PER_PART_MONTH));
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
 * Months run from the date of execution to the date of hearing (see
 * calculateChargeablePeriod). Every amount is rounded up to the next rupee.
 *
 * Inputs must already be valid (see validateInputs).
 *
 * @param {object} input
 * @param {number} input.marketValue
 * @param {number} input.dutyRate - percent applied to market value
 * @param {number} input.dutyPaid
 * @param {Date} input.executionDate
 * @param {Date} input.hearingDate
 * @param {boolean} [input.includeInterest=true]
 */
export function calculateStampPenalty({
  marketValue,
  dutyRate,
  dutyPaid,
  executionDate,
  hearingDate,
  includeInterest = true,
}) {
  const properDuty = ceilToRupee((marketValue * dutyRate) / 100);
  const deficit = Math.max(0, ceilToRupee(properDuty - dutyPaid));
  const period = calculateChargeablePeriod(executionDate, hearingDate);

  const penaltyBeforeCap = chargeFor(deficit, PENALTY_RATE_PER_MONTH, period.totalDays);
  const penalty = Math.min(penaltyBeforeCap, deficit);
  const interest = includeInterest
    ? chargeFor(deficit, INTEREST_RATE_PER_MONTH, period.totalDays)
    : 0;

  return {
    marketValue,
    dutyRate,
    dutyPaid,
    executionDate,
    hearingDate,
    includeInterest,
    properDuty,
    deficit,
    period,
    penaltyBeforeCap,
    penalty,
    isPenaltyCapped: penaltyBeforeCap > deficit,
    interest,
    total: deficit + penalty + interest,
  };
}
