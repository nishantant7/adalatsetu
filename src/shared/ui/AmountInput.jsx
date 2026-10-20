import { formatAmountInput, parseAmount } from '@/shared/lib/currency';
import './Input.css';

/** Rupee amount input that shows Indian digit grouping once the field loses focus. */
export default function AmountInput({ value, onChange, ...rest }) {
  const handleBlur = () => {
    const amount = parseAmount(value);
    if (Number.isFinite(amount)) onChange(formatAmountInput(amount));
  };

  return (
    <div className="input-affix">
      <span className="input-affix__prefix">₹</span>
      <input
        type="text"
        inputMode="decimal"
        autoComplete="off"
        className="input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={handleBlur}
        {...rest}
      />
    </div>
  );
}
