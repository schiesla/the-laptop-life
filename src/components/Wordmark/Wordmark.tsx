import React from 'react';
import './Wordmark.css';

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
  const px = size === 'l' ? 28 : size === 's' ? 18 : 22;
  return (
    <span className={`wordmark wordmark-${size}${inverse ? ' wordmark-inverse' : ''}`} style={style}>
      {markSrc ? <img src={markSrc} alt="" width={px} height={px} className="wordmark-mark" /> : null}
      <span className="wordmark-text">
        The Laptop <em className="wordmark-life">Life</em>
      </span>
    </span>
  );
}
