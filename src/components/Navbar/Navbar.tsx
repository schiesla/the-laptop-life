import React from 'react';
import { Wordmark } from '../Wordmark/Wordmark';


/**
 * Sticky ink header with the wordmark left and four text links right. Active link is bone with an ember underline.
 * @startingPoint section="Navigation" subtitle="Sticky site header" viewport="700x120"
 */
export interface NavbarProps {
  active?: string;
  links?: string[];
  onNavigate?: (label: string) => void;
  markSrc?: string;
  style?: React.CSSProperties;
}

export function Navbar({ active = 'Home', links = ['Home', 'Gear', 'Blog', 'About'], onNavigate, markSrc, style }: NavbarProps) {
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'var(--surface-inverse)',
      borderBottom: '1px solid var(--line-inverse)', ...style }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--gutter)', height: '68px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('Home'); }} style={{ textDecoration: 'none' }}>
          <Wordmark inverse markSrc={markSrc} />
        </a>
        <ul style={{ display: 'flex', gap: '28px', listStyle: 'none', margin: 0, padding: 0 }}>
          {links.map((l) => (
            <li key={l}>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(l); }}
                style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--body-s)', fontWeight: 500, textDecoration: 'none',
                  color: l === active ? 'var(--paper-100)' : 'var(--ink-200)', paddingBottom: '3px',
                  borderBottom: '1px solid ' + (l === active ? 'var(--ember-500)' : 'transparent'),
                  transition: 'color var(--dur-fast) var(--ease-out)' }}>{l}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
