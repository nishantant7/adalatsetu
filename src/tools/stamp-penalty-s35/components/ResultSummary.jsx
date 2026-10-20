import { Badge } from '@/shared/ui';
import { formatINR } from '@/shared/lib/currency';
import { formatDate } from '@/shared/lib/dates';
import { rupeesInWords } from '@/shared/lib/numberToWords';
import { describeChargeableMonths, describePeriod } from '../logic/describePeriod';
import './ResultSummary.css';

export default function ResultSummary({ result }) {
  const rows = [
    { label: 'Market value', value: formatINR(result.marketValue) },
    { label: `Proper stamp duty @ ${result.dutyRate}%`, value: formatINR(result.properDuty) },
    { label: 'Stamp duty paid', value: formatINR(result.dutyPaid) },
    { label: 'Deficit stamp duty', code: 'A', value: formatINR(result.deficit), emphasis: true },
    {
      label: 'Chargeable period',
      note: `${formatDate(result.executionDate)} to ${formatDate(result.hearingDate)} (hearing day excluded) · ${describePeriod(result)}`,
      value: describeChargeableMonths(result),
    },
    {
      label: 'Penalty @ 1% per month',
      code: 'B',
      badge: result.isPenaltyCapped ? 'Capped at deficit' : null,
      note: result.isPenaltyCapped ? `Calculated ${formatINR(result.penaltyBeforeCap)}` : null,
      value: formatINR(result.penalty),
    },
    {
      label: 'Interest @ 1% per month',
      code: 'C',
      value: result.includeInterest ? formatINR(result.interest) : 'Excluded',
      muted: !result.includeInterest,
    },
  ];

  return (
    <div className="result-summary">
      <div className="result-summary__total">
        <p className="result-summary__label">Total payable</p>
        <p className="result-summary__amount">{formatINR(result.total)}</p>
        <p className="result-summary__words">{rupeesInWords(result.total)}</p>
        <p className="result-summary__formula">
          {result.includeInterest ? 'A + B + C' : 'A + B'} · Deficit + Penalty
          {result.includeInterest ? ' + Interest' : ''}
        </p>
      </div>

      <table className="result-summary__table">
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className={[row.emphasis && 'is-emphasis', row.muted && 'is-muted']
                .filter(Boolean)
                .join(' ')}
            >
              <th scope="row">
                <span className="result-summary__row-label">
                  {row.code && <span className="result-summary__code">{row.code}</span>}
                  {row.label}
                  {row.badge && <Badge tone="accent">{row.badge}</Badge>}
                </span>
                {row.note && <span className="result-summary__note">{row.note}</span>}
              </th>
              <td>{row.value}</td>
            </tr>
          ))}
          <tr className="is-total">
            <th scope="row">Total payable</th>
            <td>{formatINR(result.total)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
