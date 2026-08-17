import React from 'react';


/**
 * The brand lockup: laptop mark + "The Laptop Life" set in Newsreader, with "Life" in ember italic.
 * Intentional addition — the source repo styles this inline in Navbar/Footer rather than as a component.
 */
export interface WordmarkProps {
  inverse?: boolean;
  size?: 's' | 'm' | 'l';
  /** Path to assets/mark-ink.svg or assets/mark-bone.svg. Omit for type only. */
  markSrc?: string;
  style?: React.CSSProperties;
}

export function Wordmark({ inverse, size = 'm', markSrc, style }: WordmarkProps) {
  const fs = size === 'l' ? '1.5rem' : size === 's' ? '1rem' : '1.1875rem';
  const px = size === 'l' ? 28 : size === 's' ? 18 : 22;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', ...style }}>
      {markSrc ? <img src={markSrc} alt="" width={px} height={px} style={{ display: 'block' }} /> : null}
      <span style={{ fontFamily: 'var(--font-display)', fontSize: fs, fontWeight: 400, letterSpacing: '-0.02em',
        color: inverse ? 'var(--text-on-inverse)' : 'var(--text-strong)' }}>
        The Laptop <em style={{ fontStyle: 'italic', color: 'var(--ember-500)' }}>Life</em>
      </span>
    </span>
  );
}
