import React from 'react';

export interface FeatureCardProps {
  /** 1-based; rendered zero-padded in mono. */
  index?: number;
  title: string;
  description?: string;
  style?: React.CSSProperties;
}

export function FeatureCard({ index, title, description, style }: FeatureCardProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '28px 0 0',
      borderTop: '1px solid var(--line-strong)', ...style }}>
      {index != null ? <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--mono-s)',
        letterSpacing: '0.14em', color: 'var(--text-accent)' }}>{String(index).padStart(2, '0')}</span> : null}
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 400, lineHeight: 1.2,
        letterSpacing: '-0.015em', color: 'var(--text-strong)', margin: 0 }}>{title}</h3>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--body-s)', lineHeight: 1.6,
        color: 'var(--text-body)', margin: 0, textWrap: 'pretty' }}>{description}</p>
    </div>
  );
}
