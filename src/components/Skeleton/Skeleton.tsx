import React from 'react';
import './Skeleton.css';
/** Loading placeholder in paper tones, matching the shape it replaces. */
export interface SkeletonProps {
  height?: number | string;
  width?: number | string;
  radius?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ height = 20, width = '100%', radius = 'var(--radius-m)', style }: SkeletonProps) {
  return <div aria-hidden="true" className="skeleton" style={{ height, width, borderRadius: radius, ...style }} />;
}
