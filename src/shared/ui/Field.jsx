import { useId } from 'react';
import './Field.css';
import './Input.css';

/**
 * Label + control + hint/error wrapper. `children` is a render function that
 * receives the generated id and aria props for the control.
 */
export default function Field({ label, hint, error, required, children }) {
  const id = useId();
  const hintId = `${id}-hint`;
  const describedBy = error || hint ? hintId : undefined;

  return (
    <div className={`field ${error ? 'field--invalid' : ''}`.trim()}>
      <label htmlFor={id} className="field__label">
        {label}
        {required && (
          <span className="field__required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children({ id, 'aria-describedby': describedBy, 'aria-invalid': Boolean(error) })}
      {(error || hint) && (
        <p id={hintId} className={error ? 'field__error' : 'field__hint'}>
          {error || hint}
        </p>
      )}
    </div>
  );
}
