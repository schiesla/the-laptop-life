import React from 'react';
import './CategoryPill.css';

/** Filter chip for the gear index category row. Selected state is ink-filled, not ember. */
export interface CategoryPillProps {
  active?: boolean;
  onClick?: React.MouseEventHandler;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function CategoryPill({ active, onClick, children, style }: CategoryPillProps) {
  return (
    <button onClick={onClick} className={`category-pill${active ? ' is-active' : ''}`} style={style}>{children}</button>
  );
}
