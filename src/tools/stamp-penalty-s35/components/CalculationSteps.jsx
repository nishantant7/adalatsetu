import { formatINR } from '@/shared/lib/currency';
import { formatDate } from '@/shared/lib/dates';
import { DAYS_PER_PART_MONTH } from '../logic/constants';
import { describeChargeableMonths, describePeriod } from '../logic/describePeriod';

/** "(104 + 5/30)" or "105" — the month multiplier as used in the formula. */
function monthMultiplier({ completedMonths, remainingDays }) {
  return remainingDays
    ? `(${completedMonths} + ${remainingDays}/${DAYS_PER_PART_MONTH})`
    : String(completedMonths);
}

export default function CalculationSteps({ result: r }) {
  const months = describeChargeableMonths(r);
  const multiplier = monthMultiplier(r.period);
  const { completedMonths, remainingDays } = r.period;
  const wholeMonths = `${completedMonths} whole month${completedMonths === 1 ? '' : 's'}`;

  const steps = [
    <>
      Proper stamp duty = {formatINR(r.marketValue)} × {r.dutyRate}% ={' '}
      <strong>{formatINR(r.properDuty)}</strong>
    </>,
    <>
      Deficit (A) = {formatINR(r.properDuty)} − {formatINR(r.dutyPaid)} ={' '}
      <strong>{formatINR(r.deficit)}</strong>
    </>,
    <>
      Period {formatDate(r.executionDate)} to {formatDate(r.hearingDate)} (execution day counted,
      hearing day excluded) = {describePeriod(r)}: {wholeMonths} date to date
      {remainingDays > 0 && (
        <>
          {' '}
          + {remainingDays} days ÷ {DAYS_PER_PART_MONTH}
        </>
      )}{' '}
      → <strong>{months}</strong>
    </>,
    <>
      Penalty (B) = {formatINR(r.deficit)} × 1% × {multiplier} = {formatINR(r.penaltyBeforeCap)}
      {r.isPenaltyCapped ? (
        <>
          , more than the deficit, so restricted to <strong>{formatINR(r.penalty)}</strong>
        </>
      ) : (
        <>
          {' '}
          → <strong>{formatINR(r.penalty)}</strong>
        </>
      )}
    </>,
    r.includeInterest ? (
      <>
        Interest (C) = {formatINR(r.deficit)} × 1% × {multiplier} ={' '}
        <strong>{formatINR(r.interest)}</strong> (no upper limit)
      </>
    ) : (
      <>Interest excluded (see calculation options)</>
    ),
    <>
      Total = {formatINR(r.deficit)} + {formatINR(r.penalty)}
      {r.includeInterest && <> + {formatINR(r.interest)}</>} = <strong>{formatINR(r.total)}</strong>
    </>,
  ];

  return (
    <ol className="stamp-tool__steps">
      {steps.map((step, index) => (
        <li key={index}>{step}</li>
      ))}
    </ol>
  );
}
