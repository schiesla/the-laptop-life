import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../../components/SEO/SEO';
import EmailSignup from '../../components/EmailSignup/EmailSignup';
import { usePost } from '../../hooks/usePosts';
import useEnvVariables from '../../hooks/useEnvVariables';
import './BlogPost.css';

export default function BlogPost() {
  const { slug } = useParams();
  const { post, loading, error } = usePost(slug);
  const { ENABLE_NEWSLETTER } = useEnvVariables();

  if (loading) {
    return (
      <div style={{ maxWidth: 740, margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div className="skeleton" style={{ height: 40, marginBottom: '1rem', borderRadius: 8 }} />
        <div className="skeleton" style={{ height: 20, width: '60%', marginBottom: '2rem', borderRadius: 8 }} />
        <div className="skeleton" style={{ height: 200, borderRadius: 8 }} />
      </div>
    );
  }

  if (error || !post) return <Navigate to="/blog" replace />;

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt ?? undefined}
        path={`/blog/${post.slug}`}
        type="article"
        image={post.image ?? undefined}
        datePublished={post.date ?? undefined}
      />
      <div className="post-header">
        <div className="container">
          <Link to="/blog" className="post-back-link">← Back to Blog</Link>
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

        {ENABLE_NEWSLETTER && (
          <div className="post-cta">
            <p className="post-cta-title">Want more guides like this?</p>
            <p className="post-cta-sub">Join our list and get the best mobile work gear drops straight to your inbox.</p>
            <EmailSignup source="blog-post" />
          </div>
        )}
      </article>
    </>
  );
}
