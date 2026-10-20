import { formatINR } from '@/shared/lib/currency';
import { formatDate } from '@/shared/lib/dates';
import { describePeriod } from '../logic/describePeriod';

export default function CalculationSteps({ result: r }) {
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
      Period {formatDate(r.executionDate)} to {formatDate(r.calculationDate)}, execution day
      included = {describePeriod(r)} → <strong>{r.months} months</strong> (part of a month counts as
      a full month)
    </>,
    <>
      Penalty (B) = {formatINR(r.deficit)} × 1% × {r.months} = {formatINR(r.penaltyBeforeCap)}
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
        Interest (C) = {formatINR(r.deficit)} × 1% × {r.months} ={' '}
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
