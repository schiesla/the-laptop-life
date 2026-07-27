import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../../components/SEO/SEO';
import { posts } from '../../data/posts';
import EmailSignup from '../../components/EmailSignup/EmailSignup';
import './BlogPost.css';

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

        <div
          className="post-body"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        {/* In-article email capture */}
        <div className="post-cta">
          <p className="post-cta-title">Want more guides like this?</p>
          <p className="post-cta-sub">Join our list and get the best mobile work gear drops straight to your inbox.</p>
          <EmailSignup source="blog-post" />
        </div>
      </article>
    </>
  );
}
