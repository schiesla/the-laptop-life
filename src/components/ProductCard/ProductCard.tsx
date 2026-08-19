import React from 'react';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import './ProductCard.css';

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
  return (
    <article className="product-card" style={style}>
      <div className="product-card-media">
        {image ? <img src={image} alt={name} /> : <span className="product-card-media-fallback">{category}</span>}
      </div>
      <div className="product-card-body">
        <div className="product-card-meta">
          <span className="product-card-category">{category}</span>
          {badge ? <Badge>{badge}</Badge> : null}
        </div>
        <h3 className="product-card-title">{name}</h3>
        <p className="product-card-description">{description}</p>
        <div className="product-card-footer">
          <span className="product-card-price">{price}</span>
          <Button size="sm" href={href} onClick={onView}>View deal →</Button>
        </div>
      </div>
    </article>
  );
}
