import React from 'react';
import './FeatureCard.css';

export interface FeatureCardProps {
  /** 1-based; rendered zero-padded in mono. */
  index?: number;
  title: string;
  description?: string;
  style?: React.CSSProperties;
}

export function FeatureCard({ index, title, description, style }: FeatureCardProps) {
  return (
    <div className="feature-card" style={style}>
      {index != null ? <span className="feature-card-index">{String(index).padStart(2, '0')}</span> : null}
      <h3 className="feature-card-title">{title}</h3>
      <p className="feature-card-description">{description}</p>
    </div>
  );
}
