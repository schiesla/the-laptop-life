import React, { useState } from 'react';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';

/**
 * A single affiliate gear recommendation: category, name, blurb, mono price, deal button.
 * @startingPoint section="Cards" subtitle="Affiliate gear card grid" viewport="700x400"
 */
export interface ProductCardProps {
  name: string;
  category: string;
  /** Formatted, with currency symbol — e.g. "$59.99". Always mono. */
  price: string;
  description?: string;
  /** Usually "Editor's Pick". Omit for most cards. */
  badge?: string | null;
  image?: string;
  href?: string;
  onView?: React.MouseEventHandler;
  style?: React.CSSProperties;
}

export function ProductCard({ name, category, price, description, badge, image, href, onView, style }: ProductCardProps) {
  const [hover, setHover] = useState(false);
  return (
    <article onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', flexDirection: 'column', background: 'var(--surface-card)',
        border: 'var(--border-hairline)', borderRadius: 'var(--radius-m)', overflow: 'hidden',
        boxShadow: hover ? 'var(--shadow-card-hover)' : 'none',
        transition: 'box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
        borderColor: hover ? 'var(--paper-400)' : 'var(--line-hairline)', ...style }}>
      <div style={{ aspectRatio: '4 / 3', background: 'var(--surface-sunken)', borderBottom: 'var(--border-hairline)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {image ? <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--mono-s)', letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'var(--ink-200)' }}>{category}</span>}
      </div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--mono-s)', letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--text-muted)' }}>{category}</span>
          {badge ? <Badge>{badge}</Badge> : null}
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 400, lineHeight: 1.15,
          letterSpacing: '-0.015em', color: 'var(--text-strong)', margin: 0 }}>{name}</h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--body-s)', lineHeight: 1.55,
          color: 'var(--text-body)', margin: 0, flex: 1, textWrap: 'pretty' }}>{description}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '12px', paddingTop: '12px', borderTop: 'var(--border-hairline)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 500, color: 'var(--text-strong)' }}>{price}</span>
          <Button size="sm" href={href} onClick={onView}>View deal →</Button>
        </div>
      </div>
    </article>
  );
}
