import { describe, expect, it } from 'vitest';
import { calculateStampPenalty } from './calculateStampPenalty';
import { buildOrderDraft } from './orderDraft';

const input = {
  marketValue: 650000,
  dutyRate: 5,
  dutyPaid: 1000,
  executionDate: new Date(2017, 6, 20),
  hearingDate: new Date(2026, 3, 20),
};
const result = calculateStampPenalty(input);

describe('buildOrderDraft', () => {
  it('mentions the period, capped penalty, interest and total in English', () => {
    const text = buildOrderDraft(result, { instrumentType: 'Agreement to Sell' }, 'en');
    expect(text).toContain('The Agreement to Sell dated 20-07-2017');
    expect(text).toContain(
      'to the date of hearing 20-04-2026, i.e. 105 months, works out to ₹33,075',
    );
    expect(text).toContain(
      'restricted to the principal amount of deficit stamp duty, i.e. ₹31,500',
    );
    expect(text).toContain('₹96,075 (Rupees Ninety Six Thousand Seventy Five only)');
  });

  it('describes a part month in days', () => {
    const partMonth = calculateStampPenalty({
      ...input,
      executionDate: new Date(2025, 0, 15),
      hearingDate: new Date(2025, 1, 20),
    });
    expect(buildOrderDraft(partMonth, {}, 'en')).toContain('1 month and 5 days (1.1667 months)');
    expect(buildOrderDraft(partMonth, {}, 'hi')).toContain('1 माह 5 दिन (1.1667 माह)');
  });

  it('omits interest when excluded', () => {
    const noInterest = calculateStampPenalty({ ...input, includeInterest: false });
    expect(buildOrderDraft(noInterest, {}, 'en')).not.toContain('interest @');
  });

  it('builds the Hindi paragraph with a default instrument word', () => {
    const text = buildOrderDraft(result, {}, 'hi');
    expect(text.startsWith('प्रस्तुत लिखत दिनांक 20-07-2017')).toBe(true);
    expect(text).toContain('धारा 35');
  });
});
