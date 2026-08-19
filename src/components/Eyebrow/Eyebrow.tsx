import * as React from 'react';

/** Mono, uppercase, wide-tracked kicker that sits above a display heading. */
export interface EyebrowProps {
  tone?: 'accent' | 'muted' | 'inverse';
  as?: keyof React.JSX.IntrinsicElements
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Eyebrow({ children, tone = 'accent', as: Tag = 'p', style }: EyebrowProps) {
  const color = tone === 'accent' ? 'var(--text-accent)' : tone === 'inverse' ? 'var(--ember-500)' : 'var(--text-muted)';
  return (
    <Tag style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--eyebrow-size)', fontWeight: 500,
      letterSpacing: 'var(--eyebrow-tracking)', textTransform: 'uppercase', color, margin: 0, ...style }}>{children}</Tag>
  );
}
