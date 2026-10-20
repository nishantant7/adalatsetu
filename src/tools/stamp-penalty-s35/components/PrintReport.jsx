import { createPortal } from 'react-dom';
import { SITE } from '@/config/site';
import { formatINR } from '@/shared/lib/currency';
import { formatDate } from '@/shared/lib/dates';
import { rupeesInWords } from '@/shared/lib/numberToWords';
import { ACT_SHORT_NAME } from '../logic/constants';
import { describePeriod } from '../logic/describePeriod';
import { buildOrderDraft } from '../logic/orderDraft';
import './PrintReport.css';

/** A4-friendly report, rendered outside the app shell and shown only when printing. */
export default function PrintReport({ result: r, details }) {
  const caseRows = [
    ['Court', details.court],
    ['Case number', details.caseNumber],
    ['Case title', details.caseTitle],
    ['Nature of instrument', details.instrumentType],
  ].filter(([, value]) => value);

  const figureRows = [
    ['Date of execution', formatDate(r.executionDate)],
    ['Date of calculation / payment', formatDate(r.calculationDate)],
    ['Market value', formatINR(r.marketValue)],
    [`Proper stamp duty @ ${r.dutyRate}%`, formatINR(r.properDuty)],
    ['Stamp duty paid', formatINR(r.dutyPaid)],
    ['(A) Deficit stamp duty', formatINR(r.deficit)],
    ['Chargeable period', `${r.months} months (${describePeriod(r)})`],
    [
      `(B) Penalty @ 1% p.m.${r.isPenaltyCapped ? ' — restricted to deficit' : ''}`,
      formatINR(r.penalty),
    ],
    ...(r.includeInterest ? [['(C) Interest @ 1% p.m.', formatINR(r.interest)]] : []),
  ];

  return createPortal(
    <article className="print-only print-report">
      <h1>Stamp Duty Calculation u/s 35</h1>
      <p className="print-report__sub">Indian Stamp Act, 1899 as amended by the {ACT_SHORT_NAME}</p>

      {caseRows.length > 0 && (
        <table>
          <tbody>
            {caseRows.map(([label, value]) => (
              <tr key={label}>
                <th>{label}</th>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <table>
        <tbody>
          {figureRows.map(([label, value]) => (
            <tr key={label}>
              <th>{label}</th>
              <td className="is-amount">{value}</td>
            </tr>
          ))}
          <tr className="is-total">
            <th>Total payable</th>
            <td className="is-amount">{formatINR(r.total)}</td>
          </tr>
        </tbody>
      </table>
      <p className="print-report__words">{rupeesInWords(r.total)}</p>

      <p className="print-report__order">{buildOrderDraft(r, details, 'en')}</p>
      <p className="print-report__order" lang="hi">
        {buildOrderDraft(r, details, 'hi')}
      </p>

      <p className="print-report__footer">Generated with {SITE.name} · Verify before use.</p>
    </article>,
    document.body,
  );
}
