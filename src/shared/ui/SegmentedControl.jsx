import './SegmentedControl.css';

/** @param {{ value: string, label: string, lang?: string }[]} options */
export default function SegmentedControl({ options, value, onChange, label }) {
  return (
    <div className="segmented" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          lang={option.lang}
          aria-pressed={option.value === value}
          className={`segmented__option ${option.value === value ? 'is-active' : ''}`.trim()}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
