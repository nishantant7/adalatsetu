import { AmountInput, Button, Card, Field, Switch } from '@/shared/ui';
import { INSTRUMENT_TYPES } from '../content/statute';
import './InstrumentForm.css';

export default function InstrumentForm({ values, errors, setField, onCalculate, onReset }) {
  const bind = (name) => ({
    value: values[name],
    onChange: (event) => setField(name, event.target.value),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onCalculate();
  };

  return (
    <Card
      as="form"
      title="Instrument details"
      description="Fill the required fields and press Calculate."
      className="instrument-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="instrument-form__fields">
        <Field label="Market value / consideration" required error={errors.marketValue}>
          {(props) => (
            <AmountInput
              {...props}
              placeholder="e.g. 6,50,000"
              value={values.marketValue}
              onChange={(value) => setField('marketValue', value)}
            />
          )}
        </Field>

        <Field label="Stamp duty already paid" required error={errors.dutyPaid}>
          {(props) => (
            <AmountInput
              {...props}
              placeholder="e.g. 1,000"
              value={values.dutyPaid}
              onChange={(value) => setField('dutyPaid', value)}
            />
          )}
        </Field>

        <div className="instrument-form__fields instrument-form__fields--two">
          <Field
            label="Date of execution"
            required
            error={errors.executionDate}
            hint="Counted in the period"
          >
            {(props) => (
              <input {...props} type="date" className="input" {...bind('executionDate')} />
            )}
          </Field>
          <Field
            label="Date of hearing"
            required
            error={errors.hearingDate}
            hint="Not counted in the period"
          >
            {(props) => <input {...props} type="date" className="input" {...bind('hearingDate')} />}
          </Field>
        </div>
      </div>

      <details className="instrument-form__section">
        <summary>Calculation options</summary>
        <Field label="Stamp duty rate (%)" hint="Applied to market value" error={errors.dutyRate}>
          {(props) => (
            <input
              {...props}
              type="number"
              inputMode="decimal"
              min="0"
              max="100"
              step="0.01"
              className="input instrument-form__rate"
              {...bind('dutyRate')}
            />
          )}
        </Field>
        <Switch
          checked={values.includeInterest}
          onChange={(checked) => setField('includeInterest', checked)}
          label="Include interest @ 1% per month"
          hint="As per the proviso to clause (a) of Section 35"
        />
      </details>

      <details className="instrument-form__section">
        <summary>Case details (optional)</summary>
        <div className="instrument-form__fields">
          <Field label="Nature of instrument">
            {(props) => (
              <>
                <input
                  {...props}
                  type="text"
                  className="input"
                  list="instrument-types"
                  placeholder="e.g. Agreement to Sell"
                  {...bind('instrumentType')}
                />
                <datalist id="instrument-types">
                  {INSTRUMENT_TYPES.map((type) => (
                    <option key={type} value={type} />
                  ))}
                </datalist>
              </>
            )}
          </Field>
          <div className="instrument-form__fields instrument-form__fields--two">
            <Field label="Case number">
              {(props) => (
                <input
                  {...props}
                  type="text"
                  className="input"
                  placeholder="e.g. RCS-A 45/2026"
                  {...bind('caseNumber')}
                />
              )}
            </Field>
            <Field label="Case title">
              {(props) => (
                <input
                  {...props}
                  type="text"
                  className="input"
                  placeholder="e.g. A v. B"
                  {...bind('caseTitle')}
                />
              )}
            </Field>
          </div>
          <Field label="Court">
            {(props) => (
              <input
                {...props}
                type="text"
                className="input"
                placeholder="e.g. Court of Civil Judge, Bhopal"
                {...bind('court')}
              />
            )}
          </Field>
        </div>
      </details>

      <div className="instrument-form__actions">
        <Button type="submit" size="lg" icon="calculator" className="instrument-form__calculate">
          Calculate
        </Button>
        <Button variant="secondary" size="lg" icon="refresh" onClick={onReset}>
          Reset
        </Button>
      </div>
    </Card>
  );
}
