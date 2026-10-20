import { AmountInput, Button, Card, Field, Switch } from '@/shared/ui';
import { INSTRUMENT_TYPES } from '../content/statute';
import './InstrumentForm.css';

export default function InstrumentForm({ values, setField, error, onReset, onLoadExample }) {
  const bind = (name) => ({
    value: values[name],
    onChange: (event) => setField(name, event.target.value),
  });

  return (
    <Card
      as="form"
      title="Instrument details"
      description="Fill the three required fields. Everything else has a sensible default."
      className="instrument-form"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="instrument-form__fields">
        <Field label="Market value / consideration" required>
          {(props) => (
            <AmountInput
              {...props}
              placeholder="e.g. 6,50,000"
              value={values.marketValue}
              onChange={(value) => setField('marketValue', value)}
            />
          )}
        </Field>

        <Field label="Stamp duty already paid" required>
          {(props) => (
            <AmountInput
              {...props}
              placeholder="e.g. 1,000"
              value={values.dutyPaid}
              onChange={(value) => setField('dutyPaid', value)}
            />
          )}
        </Field>

        <Field
          label="Date of execution"
          required
          hint="Months are counted from this date, including the day itself."
        >
          {(props) => <input {...props} type="date" className="input" {...bind('executionDate')} />}
        </Field>
      </div>

      {error && (
        <p className="instrument-form__error" role="alert">
          {error}
        </p>
      )}

      <details className="instrument-form__section">
        <summary>Calculation options</summary>
        <div className="instrument-form__fields instrument-form__fields--two">
          <Field label="Stamp duty rate (%)" hint="Applied to market value">
            {(props) => (
              <input
                {...props}
                type="number"
                inputMode="decimal"
                min="0"
                max="100"
                step="0.01"
                className="input"
                {...bind('dutyRate')}
              />
            )}
          </Field>
          <Field label="Date of calculation / payment" hint="Defaults to today">
            {(props) => (
              <input {...props} type="date" className="input" {...bind('calculationDate')} />
            )}
          </Field>
        </div>
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
        <Button variant="secondary" size="sm" icon="refresh" onClick={onReset}>
          Reset
        </Button>
        <Button variant="ghost" size="sm" icon="sparkle" onClick={onLoadExample}>
          Load example
        </Button>
      </div>
    </Card>
  );
}
