import React from 'react';
import './Select.css';

/** Compact labelled dropdown — used for gear sorting. Pill-shaped to match CategoryPill. */
export interface SelectProps {
  label?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  options: { value: string; label: string }[];
  style?: React.CSSProperties;
}

export function Select({ label, value, onChange, options = [], style }: SelectProps) {
  return (
    <label className="select" style={style}>
      {label}
      <select className="select-control" value={value} onChange={onChange}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}
