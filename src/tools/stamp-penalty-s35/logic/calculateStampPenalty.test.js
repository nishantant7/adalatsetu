import { describe, expect, it } from 'vitest';
import { calculateChargeablePeriod } from './chargeablePeriod';
import { calculateStampPenalty } from './calculateStampPenalty';
import { validateInputs } from './validateInputs';

const date = (y, m, d) => new Date(y, m - 1, d);

describe('calculateChargeablePeriod', () => {
  it.each([
    // [label, execution, hearing, completed months, remaining days]
    ['same day (hearing day excluded)', date(2025, 1, 15), date(2025, 1, 15), 0, 0],
    ['15-Jan to 14-Feb hearing: 30 days', date(2025, 1, 15), date(2025, 2, 14), 0, 30],
    ['15-Jan to 15-Feb hearing: exactly one month', date(2025, 1, 15), date(2025, 2, 15), 1, 0],
    ['15-Jan to 20-Feb hearing: one month and 5 days', date(2025, 1, 15), date(2025, 2, 20), 1, 5],
    ['month-end clamp', date(2025, 1, 31), date(2025, 2, 28), 1, 0],
    ['multi-year span', date(2018, 2, 20), date(2026, 10, 25), 104, 5],
  ])('%s', (_label, execution, hearing, completedMonths, remainingDays) => {
    expect(calculateChargeablePeriod(execution, hearing)).toMatchObject({
      completedMonths,
      remainingDays,
    });
  });

  it('expresses remaining days as thirtieths of a month', () => {
    expect(calculateChargeablePeriod(date(2025, 1, 15), date(2025, 2, 20)).months).toBeCloseTo(
      1 + 5 / 30,
    );
  });
});

describe('calculateStampPenalty', () => {
  // Worked example: MV ₹6,50,000 @ 5%, ₹1,000 paid, exactly 105 months.
  const example = {
    marketValue: 650000,
    dutyRate: 5,
    dutyPaid: 1000,
    executionDate: date(2017, 7, 20),
    hearingDate: date(2026, 4, 20),
  };

  it('caps penalty at the deficit and adds uncapped interest', () => {
    const result = calculateStampPenalty(example);
    expect(result.properDuty).toBe(32500);
    expect(result.deficit).toBe(31500);
    expect(result.period.months).toBe(105);
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

  it('charges remaining days as days/30 of a month', () => {
    // 1 month + 5 days = 35/30 months → 31,500 × 1% × 35/30 = 367.5 → ₹368
    const result = calculateStampPenalty({
      ...example,
      executionDate: date(2025, 1, 15),
      hearingDate: date(2025, 2, 20),
    });
    expect(result.penaltyBeforeCap).toBe(368);
    expect(result.penalty).toBe(368);
    expect(result.isPenaltyCapped).toBe(false);
    expect(result.interest).toBe(368);
    expect(result.total).toBe(31500 + 368 + 368);
  });

  it('charges nothing extra when the hearing is on the execution day', () => {
    const result = calculateStampPenalty({ ...example, hearingDate: example.executionDate });
    expect(result.penalty).toBe(0);
    expect(result.interest).toBe(0);
    expect(result.total).toBe(31500);
  });

  it('rounds every amount up to the next rupee', () => {
    const result = calculateStampPenalty({
      marketValue: 10001,
      dutyRate: 5,
      dutyPaid: 0,
      executionDate: date(2026, 1, 1),
      hearingDate: date(2026, 2, 1),
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
    hearingDate: date(2026, 2, 1),
  };

  it('accepts valid input', () => {
    expect(validateInputs(valid)).toEqual({});
  });

  it('reports every missing required field', () => {
    expect(Object.keys(validateInputs({ dutyRate: 5 })).sort()).toEqual([
      'dutyPaid',
      'executionDate',
      'hearingDate',
      'marketValue',
    ]);
  });

  it('rejects a hearing date before execution', () => {
    expect(validateInputs({ ...valid, hearingDate: date(2025, 12, 31) }).hearingDate).toMatch(
      /before/,
    );
  });

  it('rejects non-positive market value and negative duty paid', () => {
    expect(validateInputs({ ...valid, marketValue: 0 }).marketValue).toMatch(/greater than zero/);
    expect(validateInputs({ ...valid, dutyPaid: -1 }).dutyPaid).toMatch(/negative/);
  });
});
