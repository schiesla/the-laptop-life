import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import EmailSignup from '../components/EmailSignup';
import { usePost } from '../hooks/usePosts';

export default function BlogPost() {
  const { slug } = useParams();
  const { post, loading, error } = usePost(slug);

  if (loading) {
    return (
      <div style={{ maxWidth: 740, margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div className="skeleton" style={{ height: 40, marginBottom: '1rem', borderRadius: 8 }} />
        <div className="skeleton" style={{ height: 20, width: '60%', marginBottom: '2rem', borderRadius: 8 }} />
        <div className="skeleton" style={{ height: 200, borderRadius: 8 }} />
      </div>
    );
  }

  if (error || (!loading && !post)) return <Navigate to="/blog" replace />;

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

        <div className="post-body" dangerouslySetInnerHTML={{ __html: post.body }} />

        <div style={{
          background: 'var(--black)',
          color: 'var(--white)',
          borderRadius: 12,
          padding: '2rem',
          marginTop: '3rem',
          textAlign: 'center',
        }}>
          <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Want more guides like this?</p>
          <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Join our list and get the best mobile work gear drops straight to your inbox.
          </p>
          <EmailSignup source="blog-post" />
        </div>
      </article>
    </>
  );
}
