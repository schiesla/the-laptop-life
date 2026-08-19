import React from 'react';
import './Prose.css';

/** Long-form article body styling: 680px measure, sans body, Newsreader subheads, ember links. */
export interface ProseProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Prose({ children, style }: ProseProps) {
  return <div className="prose" style={style}>{children}</div>;
}
