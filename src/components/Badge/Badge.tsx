import React from 'react';

/** Small mono label that marks status on a card — "Editor's Pick", "New", "Deal". */
export interface BadgeProps {
  tone?: 'accent' | 'clay' | 'moss' | 'quiet';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const tones = {
  accent: { background: 'var(--ember-500)', color: 'var(--text-on-accent)', border: '1px solid var(--ember-500)' },
  clay: { background: 'var(--clay-500)', color: 'var(--paper-100)', border: '1px solid var(--clay-500)' },
  moss: { background: 'var(--moss-100)', color: 'var(--moss-600)', border: '1px solid var(--moss-400)' },
  quiet: { background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--line-hairline)' },
};

export function Badge({ tone = 'accent', children, style }: BadgeProps) {
  return (
    <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: 'var(--mono-s)',
      fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 7px',
      borderRadius: 'var(--radius-xs)', ...tones[tone], ...style }}>{children}</span>
  );
}
