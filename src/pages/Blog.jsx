import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { posts } from '../data/posts';

export default function Blog() {
  return (
    <div>
      <SEO
        title="Gear Guides & Reviews"
        description="In-depth buying guides, setup walkthroughs, and honest gear reviews for remote workers who work from coffee shops, co-working spaces, and beyond."
        path="/blog"
      />
      <div style={{ background: 'var(--black)', color: 'var(--white)', padding: '4rem 0' }}>
        <div className="container">
          <p className="section-label">Guides & Reviews</p>
          <h1 className="section-title" style={{ color: 'var(--white)' }}>The Blog</h1>
          <p style={{ color: 'var(--gray-400)', fontSize: '1.05rem', maxWidth: 480 }}>
            In-depth buying guides, setup walkthroughs, and honest gear reviews for the mobile worker.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-2">
            {posts.map((post) => (
              <Link to={`/blog/${post.slug}`} key={post.slug} style={{ display: 'contents' }}>
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
        </div>
      </section>
    </div>
  );
}
