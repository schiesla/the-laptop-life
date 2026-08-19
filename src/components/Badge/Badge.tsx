import React from 'react';
import './Badge.css';

/** Small mono label that marks status on a card — "Editor's Pick", "New", "Deal". */
export interface BadgeProps {
  tone?: 'accent' | 'clay' | 'moss' | 'quiet';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Badge({ tone = 'accent', children, style }: BadgeProps) {
  return <span className={`badge badge-${tone}`} style={style}>{children}</span>;
}
