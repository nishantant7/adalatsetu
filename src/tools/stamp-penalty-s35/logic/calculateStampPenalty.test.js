import { describe, expect, it } from 'vitest';
import { calculateStampPenalty, validateInputs } from './calculateStampPenalty';
import { countChargeableMonths } from './chargeableMonths';

const date = (y, m, d) => new Date(y, m - 1, d);

describe('countChargeableMonths', () => {
  it.each([
    ['same day', date(2025, 1, 15), date(2025, 1, 15), 1],
    ['one day short of a month', date(2025, 1, 15), date(2025, 2, 14), 1],
    ['exactly one month later (part month counts)', date(2025, 1, 15), date(2025, 2, 15), 2],
    ['month-end clamp, before', date(2025, 1, 31), date(2025, 2, 27), 1],
    ['month-end clamp, on', date(2025, 1, 31), date(2025, 2, 28), 2],
    ['multi-year span', date(2024, 1, 15), date(2026, 10, 20), 34],
  ])('%s', (_label, start, end, expected) => {
    expect(countChargeableMonths(start, end).months).toBe(expected);
  });

  it('reports the actual period for display', () => {
    expect(countChargeableMonths(date(2018, 2, 20), date(2026, 10, 20))).toEqual({
      months: 105,
      completedMonths: 104,
      extraDays: 1,
    });
  });
});

describe('calculateStampPenalty', () => {
  // Worked example: MV ₹6,50,000 @ 5%, ₹1,000 paid, 105 months.
  const example = {
    marketValue: 650000,
    dutyRate: 5,
    dutyPaid: 1000,
    executionDate: date(2018, 2, 20),
    calculationDate: date(2026, 10, 20),
  };

  it('caps penalty at the deficit and adds uncapped interest', () => {
    const result = calculateStampPenalty(example);
    expect(result.properDuty).toBe(32500);
    expect(result.deficit).toBe(31500);
    expect(result.months).toBe(105);
    expect(result.penaltyBeforeCap).toBe(33075);
    expect(result.penalty).toBe(31500);
    expect(result.isPenaltyCapped).toBe(true);
    expect(result.interest).toBe(33075);
    expect(result.total).toBe(96075);
  });

  it('excludes interest when asked', () => {
    const result = calculateStampPenalty({ ...example, includeInterest: false });
    expect(result.interest).toBe(0);
    expect(result.total).toBe(63000);
  });

  it('does not cap penalty when it is below the deficit', () => {
    const result = calculateStampPenalty({ ...example, calculationDate: date(2018, 8, 1) });
    expect(result.months).toBe(6);
    expect(result.penalty).toBe(1890);
    expect(result.isPenaltyCapped).toBe(false);
  });

  it('rounds every amount up to the next rupee', () => {
    const result = calculateStampPenalty({
      marketValue: 10001,
      dutyRate: 5,
      dutyPaid: 0,
      executionDate: date(2026, 1, 1),
      calculationDate: date(2026, 1, 1),
    });
    expect(result.properDuty).toBe(501); // 500.05 → 501
    expect(result.penalty).toBe(6); // 5.01 → 6
    expect(result.total).toBe(513);
  });

  it('ignores floating-point noise when rounding', () => {
    const result = calculateStampPenalty({ ...example, marketValue: 649857, dutyRate: 0.7 });
    expect(result.properDuty).toBe(4549);
  });

  it('returns zero deficit when duty paid covers proper duty', () => {
    const result = calculateStampPenalty({ ...example, dutyPaid: 40000 });
    expect(result.deficit).toBe(0);
    expect(result.total).toBe(0);
  });
});

describe('validateInputs', () => {
  const valid = {
    marketValue: 100,
    dutyRate: 5,
    dutyPaid: 0,
    executionDate: date(2026, 1, 1),
    calculationDate: date(2026, 2, 1),
  };

  it('accepts valid input', () => {
    expect(validateInputs(valid)).toBeNull();
  });

  it('rejects a calculation date before execution', () => {
    expect(validateInputs({ ...valid, calculationDate: date(2025, 12, 31) })).toMatch(/before/);
  });

  it('rejects non-positive market value and negative duty paid', () => {
    expect(validateInputs({ ...valid, marketValue: 0 })).toMatch(/Market value/);
    expect(validateInputs({ ...valid, dutyPaid: -1 })).toMatch(/negative/);
  });
});
