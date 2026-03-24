import { HiSearch } from 'react-icons/hi';
import './ui.css';

export default function SearchBar({ placeholder = 'Search...', value, onChange, className = '' }) {
  return (
    <div className={`search-bar ${className}`}>
      <HiSearch className="search-bar-icon" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="search-bar-input"
      />
    </div>
  );
}
