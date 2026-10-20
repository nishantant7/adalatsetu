import { useCallback, useState } from 'react';
import { parseAmount } from '@/shared/lib/currency';
import { parseISODate, toISODate, today } from '@/shared/lib/dates';
import { calculateStampPenalty } from '../logic/calculateStampPenalty';
import { DEFAULT_DUTY_RATE } from '../logic/constants';
import { validateInputs } from '../logic/validateInputs';

/** Fields that affect the figures. Case details only affect the drafted text. */
const CALCULATION_FIELDS = [
  'marketValue',
  'dutyPaid',
  'dutyRate',
  'executionDate',
  'hearingDate',
  'includeInterest',
];

/** Raw form values are kept as strings exactly as typed; parsing happens on Calculate. */
export function createDefaultValues() {
  return {
    marketValue: '',
    dutyPaid: '',
    executionDate: '',
    hearingDate: toISODate(today()),
    dutyRate: String(DEFAULT_DUTY_RATE),
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
    dutyRate: values.dutyRate === '' ? Number.NaN : Number(values.dutyRate),
    executionDate: parseISODate(values.executionDate),
    hearingDate: parseISODate(values.hearingDate),
    includeInterest: values.includeInterest,
  };
}

function calculationKey(values) {
  return JSON.stringify(CALCULATION_FIELDS.map((field) => values[field]));
}

/**
 * Form state for the stamp penalty calculator. Figures are calculated only
 * when `calculate()` is called; `isStale` is true when inputs have changed
 * since the last calculation.
 */
export function useStampPenaltyForm() {
  const [values, setValues] = useState(createDefaultValues);
  const [errors, setErrors] = useState({});
  const [calculation, setCalculation] = useState(null);

  const setField = useCallback((name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const { [name]: _removed, ...rest } = current;
      return rest;
    });
  }, []);

  const runCalculation = useCallback((formValues) => {
    const parsed = parseValues(formValues);
    const validationErrors = validateInputs(parsed);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setCalculation(null);
      return false;
    }

    setCalculation({ result: calculateStampPenalty(parsed), key: calculationKey(formValues) });
    return true;
  }, []);

  const calculate = useCallback(() => runCalculation(values), [runCalculation, values]);

  const reset = useCallback(() => {
    setValues(createDefaultValues());
    setErrors({});
    setCalculation(null);
  }, []);

  /** Fills the form (e.g. from history or the worked example) and calculates straight away. */
  const loadAndCalculate = useCallback(
    (saved) => {
      const next = { ...createDefaultValues(), ...saved };
      setValues(next);
      runCalculation(next);
    },
    [runCalculation],
  );

  return {
    values,
    errors,
    setField,
    calculate,
    reset,
    loadAndCalculate,
    result: calculation?.result ?? null,
    isStale: Boolean(calculation) && calculation.key !== calculationKey(values),
  };
}
