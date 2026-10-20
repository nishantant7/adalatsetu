import { SITE } from '@/config/site';
import { formatINR } from '@/shared/lib/currency';
import { formatDate } from '@/shared/lib/dates';
import { describeChargeableMonths } from './describePeriod';

/** Plain-text summary suitable for WhatsApp (uses *bold* markup). */
export function buildShareSummary(r, { caseNumber, caseTitle } = {}) {
  const caseLine = [caseNumber, caseTitle].filter(Boolean).join(' — ');
  return [
    '*Stamp Penalty u/s 35 (MP Amendment 2025)*',
    caseLine || null,
    `Executed: ${formatDate(r.executionDate)} | Hearing: ${formatDate(r.hearingDate)}`,
    `Market value: ${formatINR(r.marketValue)} @ ${r.dutyRate}%`,
    `Proper duty: ${formatINR(r.properDuty)} | Paid: ${formatINR(r.dutyPaid)}`,
    `Deficit (A): ${formatINR(r.deficit)}`,
    `Period: ${describeChargeableMonths(r)}`,
    `Penalty (B): ${formatINR(r.penalty)}${r.isPenaltyCapped ? ' (capped at deficit)' : ''}`,
    r.includeInterest ? `Interest (C): ${formatINR(r.interest)}` : null,
    `*Total payable: ${formatINR(r.total)}*`,
    `— via ${SITE.name}`,
  ]
    .filter(Boolean)
    .join('\n');
}
