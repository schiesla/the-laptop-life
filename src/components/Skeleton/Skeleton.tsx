import React from 'react';
/** Loading placeholder in paper tones, matching the shape it replaces. */
export interface SkeletonProps {
  height?: number | string;
  width?: number | string;
  radius?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ height = 20, width = '100%', radius = 'var(--radius-m)', style }: SkeletonProps) {
  return (
    <div aria-hidden="true" style={{ height, width, borderRadius: radius,
      background: 'linear-gradient(90deg,var(--paper-200) 25%,var(--paper-300) 50%,var(--paper-200) 75%)',
      backgroundSize: '800px 100%', animation: 'tll-shimmer 1.4s linear infinite', ...style }}>
      <style>{'@keyframes tll-shimmer{from{background-position:-400px 0}to{background-position:400px 0}}'}</style>
    </div>
  );
}
