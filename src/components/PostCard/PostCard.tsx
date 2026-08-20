import React from 'react';
import './PostCard.css';
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
  const row = layout === 'row';
  return (
    <a href={href} onClick={onClick} className={`post-card${row ? ' post-card-row' : ''}`} style={style} {...rest}>
      <div className="post-card-media">
        {image
          ? <img src={image} alt="" />
          : <span className="post-card-media-fallback">{category}</span>}
      </div>
      <div className="post-card-body">
        <div className="post-card-meta">
          <span className="post-card-meta-category">{category}</span>
          {date ? <span>{date}</span> : null}
          {readTime ? <span>{readTime}</span> : null}
        </div>
        <h3 className="post-card-title">{title}</h3>
        <p className="post-card-excerpt">{excerpt}</p>
        <span className="post-card-cta">Read article →</span>
      </div>
    </a>
  );
}
