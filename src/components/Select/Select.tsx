import React from 'react';

const caret = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6' fill='none'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%235A4F45' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")";

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
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-sans)',
      fontSize: 'var(--body-xs)', color: 'var(--text-muted)', ...style }}>
      {label}
      <select value={value} onChange={onChange}
        style={{ appearance: 'none', WebkitAppearance: 'none', fontFamily: 'var(--font-sans)', fontSize: 'var(--body-xs)',
          fontWeight: 500, color: 'var(--text-strong)', padding: '7px 32px 7px 12px', cursor: 'pointer',
          borderRadius: 'var(--radius-pill)', border: '1px solid var(--line-hairline)', background: 'var(--surface-card)',
          backgroundImage: caret, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}
