import React, { useState } from 'react';

/**
 * Primary action control. Ember for the money action, ink for secondary emphasis,
 * outline/ghost for everything else. Square-ish corners (3px) — never pill-shaped.
 * @startingPoint section="Core" subtitle="Buttons in every variant and size" viewport="700x180"
 */
export interface ButtonProps {
  /** Visual weight. Default 'primary'. */
  variant?: 'primary' | 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Renders an <a> instead of a <button>. */
  href?: string;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
  /** Recolours the outline variant for dark (ink) sections. */
  inverse?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const base = {
  fontFamily: 'var(--font-sans)', fontWeight: 600, lineHeight: 1,
  display: 'inline-flex', alignItems: 'center', gap: '8px', justifyContent: 'center',
  borderRadius: 'var(--radius-s)', cursor: 'pointer', textDecoration: 'none',
  border: '1px solid transparent', transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
};
const sizes = {
  sm: { fontSize: '0.8125rem', padding: '8px 14px' },
  md: { fontSize: '0.9375rem', padding: '12px 22px' },
  lg: { fontSize: '1rem', padding: '15px 28px' },
};
const looks = {
  primary: { rest: { background: 'var(--ember-500)', color: 'var(--text-on-accent)', borderColor: 'var(--ember-500)' }, hover: { background: 'var(--ember-400)', borderColor: 'var(--ember-400)' } },
  solid:   { rest: { background: 'var(--ink-900)', color: 'var(--paper-100)', borderColor: 'var(--ink-900)' }, hover: { background: 'var(--ink-700)', borderColor: 'var(--ink-700)' } },
  outline: { rest: { background: 'transparent', color: 'var(--text-strong)', borderColor: 'var(--ink-900)' }, hover: { background: 'var(--ink-900)', color: 'var(--paper-100)' } },
  ghost:   { rest: { background: 'transparent', color: 'var(--text-body)', borderColor: 'transparent' }, hover: { color: 'var(--text-strong)', background: 'var(--paper-200)' } },
};

export function Button({ variant = 'primary', size = 'md', href, onClick, disabled, inverse, children, style, ...rest }: ButtonProps) {
  const [hover, setHover] = useState(false);
  const look = looks[variant] || looks.primary;
  const inv = inverse && variant === 'outline'
    ? { rest: { background: 'transparent', color: 'var(--paper-100)', borderColor: 'var(--ink-500)' }, hover: { background: 'var(--paper-100)', color: 'var(--ink-900)', borderColor: 'var(--paper-100)' } }
    : look;
  const s = { ...base, ...sizes[size], ...inv.rest, ...(hover && !disabled ? inv.hover : null),
    ...(disabled ? { opacity: 0.4, cursor: 'not-allowed' } : null), ...style };
  const Tag = href ? 'a' : 'button';
  return (
    <Tag href={href} rel="nofollow sponsored noopener noreferrer" onClick={disabled ? undefined : onClick} style={s} disabled={Tag === 'button' ? disabled : undefined}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} {...rest}>{children}</Tag>
  );
}
