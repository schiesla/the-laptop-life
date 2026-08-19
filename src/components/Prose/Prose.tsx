import React from 'react';

/** Long-form article body styling: 680px measure, sans body, Newsreader subheads, ember links. */
export interface ProseProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Prose({ children, style }: ProseProps) {
  return (
    <div style={{ maxWidth: 'var(--max-w-prose)', fontFamily: 'var(--font-sans)', fontSize: 'var(--body-m)',
      lineHeight: 'var(--body-leading)', color: 'var(--text-body)', ...style }}>
      <style>{`
        .tll-prose h2{font-family:var(--font-display);font-weight:400;font-size:1.75rem;line-height:1.15;letter-spacing:-0.02em;color:var(--text-strong);margin:44px 0 12px}
        .tll-prose h3{font-family:var(--font-sans);font-weight:600;font-size:1.0625rem;color:var(--text-strong);margin:32px 0 8px}
        .tll-prose p{margin:0 0 20px;text-wrap:pretty}
        .tll-prose ul,.tll-prose ol{margin:0 0 20px 20px}
        .tll-prose li{margin-bottom:6px}
        .tll-prose a{color:var(--text-link);text-decoration:underline;text-underline-offset:2px}
        .tll-prose a:hover{color:var(--text-link-hover)}
        .tll-prose strong{color:var(--text-strong);font-weight:600}
        .tll-prose blockquote{margin:32px 0;padding-left:20px;border-left:1px solid var(--line-strong);font-family:var(--font-display);font-size:1.3125rem;line-height:1.35;color:var(--text-strong)}

        .tll-prose .post-table{width:100%;border-collapse:collapse;font-size:var(--body-s);margin:0 0 28px}
        .tll-prose .post-table th{text-align:left;padding:10px 14px;background:var(--surface-sunken);border-bottom:1px solid var(--line-strong);font-family:var(--font-mono);font-size:var(--mono-s);font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--text-strong)}
        .tll-prose .post-table td{padding:11px 14px;border-bottom:var(--border-hairline);color:var(--text-body);font-family:var(--font-mono);font-size:var(--mono-m)}
        .tll-prose .post-table td:first-child{font-family:var(--font-sans);font-weight:600;color:var(--text-strong);font-size:var(--body-s)}

        .tll-prose .affiliate-box{background:var(--surface-sunken);border:var(--border-hairline);border-left:var(--border-hairline);border-radius:var(--radius-m);padding:22px 24px;margin:36px 0}
        .tll-prose .affiliate-box strong{display:block;font-family:var(--font-display);font-size:1.125rem;font-weight:500;color:var(--text-strong);margin-bottom:6px}
        .tll-prose .affiliate-box a{color:var(--text-link);font-weight:600}

        .tll-prose .post-disclosure{font-size:var(--body-xs);color:var(--text-muted);margin-bottom:28px}
      `}</style>
      <div className="tll-prose">{children}</div>
    </div>
  );
}
