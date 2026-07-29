import { Link, useParams, Navigate } from 'react-router-dom';
import { draftPosts } from '../../data/drafts';
import '../BlogPost/BlogPost.css';

export function PreviewIndex() {
  return (
    <div style={{ maxWidth: 740, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1>Draft posts</h1>
      <p>Unpublished content from src/data/drafts.ts — not seeded to the database yet.</p>
      {draftPosts.length === 0 && <p>No drafts.</p>}
      <ul>
        {draftPosts.map((post) => (
          <li key={post.slug}>
            <Link to={`/preview/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Preview() {
  const { slug } = useParams();
  const post = draftPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/preview" replace />;

  return (
    <>
      <div className="post-header">
        <div className="container">
          <Link to="/preview" className="post-back-link">← Back to Drafts</Link>
        </div>
      </div>

      <article className="blog-post">
        <p className="post-category">{post.category}</p>
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>

        {post.image && (
          <img
            src={post.image}
            alt={post.imageAlt ?? post.title}
            className="post-hero-img"
          />
        )}

        <div
          className="post-body"
          dangerouslySetInnerHTML={{ __html: post.body ?? '' }}
        />
      </article>
    </>
  );
}
