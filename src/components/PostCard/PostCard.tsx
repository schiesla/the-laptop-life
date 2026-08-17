import React, { useState } from 'react';
/**
 * Article teaser for the blog index and the home "Guides worth reading" band.
 * @startingPoint section="Cards" subtitle="Article teaser, stacked or row" viewport="700x360"
 */
export interface PostCardProps {
  title: string;
  excerpt?: string;
  category: string;
  date?: string;
  readTime?: string;
  image?: string;
  href?: string;
  onClick?: React.MouseEventHandler;
  /** 'stacked' for grids, 'row' for a wide featured slot. */
  layout?: 'stacked' | 'row';
  style?: React.CSSProperties;
}

export function PostCard({ title, excerpt, category, date, readTime, image, href, onClick, layout = 'stacked', style, ...rest }: PostCardProps) {
  const [hover, setHover] = useState(false);
  const row = layout === 'row';
  return (
    <a href={href} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', flexDirection: row ? 'row' : 'column', textDecoration: 'none',
        background: 'var(--surface-card)', border: 'var(--border-hairline)', borderRadius: 'var(--radius-m)',
        overflow: 'hidden', borderColor: hover ? 'var(--paper-400)' : 'var(--line-hairline)',
        boxShadow: hover ? 'var(--shadow-card-hover)' : 'none',
        transition: 'box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)', ...style }} {...rest}>
      <div style={{ aspectRatio: row ? undefined : '16 / 9', width: row ? '38%' : '100%', flexShrink: 0,
        background: 'var(--ink-800)', overflow: 'hidden' }}>
        {image ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover',
  filter: 'saturate(0.9)', transform: hover ? 'scale(1.02)' : 'none',
  transition: 'transform var(--dur-slow) var(--ease-out)' }} />
  : <span style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center',
      justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 'var(--mono-s)',
      letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-400)' }}>{category}</span>}
      </div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        <div style={{ display: 'flex', gap: '14px', fontFamily: 'var(--font-mono)', fontSize: 'var(--mono-s)',
          letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          <span style={{ color: 'var(--text-accent)' }}>{category}</span>
          {date ? <span>{date}</span> : null}
          {readTime ? <span>{readTime}</span> : null}
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 400, lineHeight: 1.15,
          letterSpacing: '-0.015em', color: 'var(--text-strong)', margin: 0, textWrap: 'balance' }}>{title}</h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--body-s)', lineHeight: 1.6,
          color: 'var(--text-body)', margin: 0, flex: 1, textWrap: 'pretty' }}>{excerpt}</p>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--body-xs)', fontWeight: 600,
          color: 'var(--text-link)', borderBottom: '1px solid currentColor', alignSelf: 'flex-start',
          paddingBottom: '1px' }}>Read article →</span>
      </div>
    </a>
  );
}
