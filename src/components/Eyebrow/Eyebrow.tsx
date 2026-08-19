import * as React from 'react';
import './Eyebrow.css';

/** Mono, uppercase, wide-tracked kicker that sits above a display heading. */
export interface EyebrowProps {
  tone?: 'accent' | 'muted' | 'inverse';
  as?: keyof React.JSX.IntrinsicElements
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Eyebrow({ children, tone = 'accent', as: Tag = 'p', style }: EyebrowProps) {
  const toneClass = tone !== 'accent' ? ` eyebrow-${tone}` : '';
  return <Tag className={`eyebrow${toneClass}`} style={style}>{children}</Tag>;
}
