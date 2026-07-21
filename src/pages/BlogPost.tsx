import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { posts } from '../data/posts';
import EmailSignup from '../components/EmailSignup';

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
      />
      <div style={{ background: 'var(--black)', color: 'var(--white)', padding: '3rem 0 2rem' }}>
        <div className="container">
          <Link to="/blog" style={{ color: 'var(--gray-400)', fontSize: '0.85rem', fontWeight: 600 }}>
            ← Back to Blog
          </Link>
        </div>
      </div>

      <article className="blog-post">
        <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent)', marginBottom: '0.75rem' }}>
          {post.category}
        </p>
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>

        <div
          className="post-body"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        {/* In-article email capture */}
        <div style={{
          background: 'var(--black)',
          color: 'var(--white)',
          borderRadius: 12,
          padding: '2rem',
          marginTop: '3rem',
          textAlign: 'center',
        }}>
          <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            Want more guides like this?
          </p>
          <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Join our list and get the best mobile work gear drops straight to your inbox.
          </p>
          <EmailSignup source="blog-post" />
        </div>
      </article>
    </>
  );
}
