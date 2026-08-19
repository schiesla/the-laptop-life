import React from 'react';
import './Button.css';

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

export function Button({ variant = 'primary', size = 'md', href, onClick, disabled, inverse, children, style, ...rest }: ButtonProps) {
  const Tag = href ? 'a' : 'button';
  const classes = ['button', `button-${variant}`, `button-${size}`,
    inverse && variant === 'outline' ? 'button-inverse' : '', disabled ? 'is-disabled' : '']
    .filter(Boolean).join(' ');
  return (
    <Tag href={href} rel="nofollow sponsored noopener noreferrer" onClick={disabled ? undefined : onClick} className={classes} style={style} disabled={Tag === 'button' ? disabled : undefined} {...rest}>{children}</Tag>
  );
}
