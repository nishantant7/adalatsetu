import './Tabs.css';

/**
 * Controlled tab list. Panels are rendered by the parent based on `value`.
 * @param {{ id: string, label: string }[]} tabs
 */
export default function Tabs({ tabs, value, onChange, label }) {
  return (
    <div className="tabs" role="tablist" aria-label={label}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={tab.id === value}
          className={`tabs__tab ${tab.id === value ? 'is-active' : ''}`.trim()}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
