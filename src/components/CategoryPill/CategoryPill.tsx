import React, { useState } from 'react';

/** Filter chip for the gear index category row. Selected state is ink-filled, not ember. */
export interface CategoryPillProps {
  active?: boolean;
  onClick?: React.MouseEventHandler;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function CategoryPill({ active, onClick, children, style }: CategoryPillProps) {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 500, cursor: 'pointer',
        padding: '7px 14px', borderRadius: 'var(--radius-pill)',
        border: '1px solid ' + (active ? 'var(--ink-900)' : 'var(--line-hairline)'),
        background: active ? 'var(--ink-900)' : hover ? 'var(--paper-200)' : 'transparent',
        color: active ? 'var(--paper-100)' : 'var(--text-body)',
        transition: 'all var(--dur-fast) var(--ease-out)', ...style }}>{children}</button>
  );
}
