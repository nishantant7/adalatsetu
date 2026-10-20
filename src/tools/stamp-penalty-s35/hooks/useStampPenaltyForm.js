import { useCallback, useMemo, useState } from 'react';
import { parseAmount } from '@/shared/lib/currency';
import { parseISODate, toISODate, today } from '@/shared/lib/dates';
import {
  calculateStampPenalty,
  hasRequiredInputs,
  validateInputs,
} from '../logic/calculateStampPenalty';
import { DEFAULT_DUTY_RATE } from '../logic/constants';

/** Raw form values are kept as strings exactly as typed; parsing happens below. */
export function createDefaultValues() {
  return {
    marketValue: '',
    dutyPaid: '',
    executionDate: '',
    dutyRate: String(DEFAULT_DUTY_RATE),
    calculationDate: toISODate(today()),
    includeInterest: true,
    instrumentType: '',
    caseNumber: '',
    caseTitle: '',
    court: '',
  };
}

function parseValues(values) {
  return {
    marketValue: parseAmount(values.marketValue),
    dutyPaid: parseAmount(values.dutyPaid),
    dutyRate: Number(values.dutyRate),
    executionDate: parseISODate(values.executionDate),
    calculationDate: parseISODate(values.calculationDate) ?? today(),
    includeInterest: values.includeInterest,
  };
}

/**
 * Form state for the stamp penalty calculator. The result is recalculated on
 * every change, so the UI always shows the latest figures.
 */
export function useStampPenaltyForm() {
  const [values, setValues] = useState(createDefaultValues);

  const setField = useCallback((name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
  }, []);

  const reset = useCallback(() => setValues(createDefaultValues()), []);

  const load = useCallback((saved) => {
    setValues({ ...createDefaultValues(), ...saved });
  }, []);

  const { error, result } = useMemo(() => {
    const parsed = parseValues(values);
    if (!hasRequiredInputs(parsed)) return { error: null, result: null };
    const validationError = validateInputs(parsed);
    if (validationError) return { error: validationError, result: null };
    return { error: null, result: calculateStampPenalty(parsed) };
  }, [values]);

  return { values, setField, reset, load, error, result };
}
