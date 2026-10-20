import { describe, expect, it } from 'vitest';
import { calculateStampPenalty } from './calculateStampPenalty';
import { buildOrderDraft } from './orderDraft';

const result = calculateStampPenalty({
  marketValue: 650000,
  dutyRate: 5,
  dutyPaid: 1000,
  executionDate: new Date(2018, 1, 20),
  calculationDate: new Date(2026, 9, 20),
});

describe('buildOrderDraft', () => {
  it('mentions the capped penalty, interest and total in English', () => {
    const text = buildOrderDraft(result, { instrumentType: 'Agreement to Sell' }, 'en');
    expect(text).toContain('The Agreement to Sell dated 20-02-2018');
    expect(text).toContain(
      'restricted to the principal amount of deficit stamp duty, i.e. ₹31,500',
    );
    expect(text).toContain('₹33,075');
    expect(text).toContain('₹96,075 (Rupees Ninety Six Thousand Seventy Five only)');
  });

  it('omits interest when excluded', () => {
    const noInterest = calculateStampPenalty({ ...result, includeInterest: false });
    expect(buildOrderDraft(noInterest, {}, 'en')).not.toContain('interest @');
  });

  it('builds the Hindi paragraph with a default instrument word', () => {
    const text = buildOrderDraft(result, {}, 'hi');
    expect(text.startsWith('प्रस्तुत लिखत दिनांक 20-02-2018')).toBe(true);
    expect(text).toContain('धारा 35');
  });
});
