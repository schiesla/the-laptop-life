import { Link } from 'react-router-dom';
import SEO from '../../components/SEO/SEO';
import { usePosts } from '../../hooks/usePosts';
import './Blog.css';

export default function Blog() {
  const { posts, loading } = usePosts();

  return (
    <div>
      <SEO
        title="Gear Guides & Reviews"
        description="In-depth buying guides, setup walkthroughs, and honest gear reviews for remote workers who work from coffee shops, co-working spaces, and beyond."
        path="/blog"
      />
      <div className="blog-header">
        <div className="container">
          <p className="section-label">Guides & Reviews</p>
          <h1 className="section-title">The Blog</h1>
          <p className="blog-header-sub">
            In-depth buying guides, setup walkthroughs, and honest gear reviews for the mobile worker.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="grid-2">
              {[1, 2, 3].map((n) => <div key={n} className="blog-card skeleton" style={{ minHeight: 280 }} />)}
            </div>
          ) : (
          <div className="grid-2">
            {posts.map((post) => (
              <Link to={`/blog/${post.slug}`} key={post.id} className="card-link">
                <article className="blog-card">
                  <div className="blog-card-img-placeholder">{post.emoji}</div>
                  <div className="blog-card-body">
                    <div className="blog-meta">
                      <span>{post.category}</span>
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <span className="read-more">Read article →</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          )}
        </div>
      </section>
    </div>
  );
}
