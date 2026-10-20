import Icon from './Icon';
import './SearchInput.css';

export default function SearchInput({ label, value, onChange, placeholder, className = '' }) {
  return (
    <label className={`search-input ${className}`.trim()}>
      <Icon name="search" />
      <span className="visually-hidden">{label}</span>
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
