import './Switch.css';

export default function Switch({ checked, onChange, label, hint }) {
  return (
    <label className="switch">
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>
        {label}
        {hint && <span className="switch__hint">{hint}</span>}
      </span>
    </label>
  );
}
