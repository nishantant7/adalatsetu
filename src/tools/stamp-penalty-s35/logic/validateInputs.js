/**
 * Validates parsed form values. Returns an object of field → message;
 * an empty object means the inputs are valid.
 */
export function validateInputs({ marketValue, dutyRate, dutyPaid, executionDate, hearingDate }) {
  const errors = {};

  if (!Number.isFinite(marketValue)) errors.marketValue = 'Enter the market value.';
  else if (marketValue <= 0) errors.marketValue = 'Market value must be greater than zero.';

  if (!Number.isFinite(dutyPaid)) errors.dutyPaid = 'Enter the stamp duty paid (0 if none).';
  else if (dutyPaid < 0) errors.dutyPaid = 'Stamp duty paid cannot be negative.';

  if (!Number.isFinite(dutyRate) || dutyRate < 0 || dutyRate > 100) {
    errors.dutyRate = 'Enter a rate between 0 and 100.';
  }

  if (!executionDate) errors.executionDate = 'Enter the date of execution.';
  if (!hearingDate) errors.hearingDate = 'Enter the date of hearing.';
  else if (executionDate && hearingDate < executionDate) {
    errors.hearingDate = 'Date of hearing cannot be before the date of execution.';
  }

  return errors;
}
