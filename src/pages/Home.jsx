import { Link } from 'react-router-dom';
import EmailSignup from '../components/EmailSignup';
import { products } from '../data/products';
import { posts } from '../data/posts';

const features = [
  { icon: '☕', title: 'Coffee Shop Ready', description: 'Gear tested in hundreds of hours at real cafes, not just spec sheets.' },
  { icon: '⚡', title: 'Power Independent', description: 'Never hunt for an outlet again. We obsess over battery life and portable charging.' },
  { icon: '🎒', title: 'One-Bag Setups', description: "Full productivity that fits in the bag you're already carrying." },
  { icon: '💸', title: 'Honest Affiliate Reviews', description: 'We only recommend gear we actually use. Affiliate links disclosed, always.' },
];

export default function Home() {
  const featuredProducts = products.slice(0, 3);
  const latestPosts = posts.slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <span className="hero-tag">When anywhere is your office</span>
          <h1>The gear that makes<br /><span>anywhere work.</span></h1>
          <p>
            Honest reviews and buying guides for laptops, stands, chargers, and everything else
            the modern nomad needs to be productive anywhere.
          </p>
          <div className="hero-cta">
            <Link to="/gear" className="btn btn-primary">Browse Gear</Link>
            <Link to="/blog" className="btn btn-outline">Read Guides</Link>
          </div>
        </div>
      </section>

      {/* Why section */}
      <section className="section">
        <div className="container">
          <p className="section-label">Why The Laptop Life</p>
          <h2 className="section-title">Built by remote workers,<br />for remote workers</h2>
          <p className="section-sub">
            No fluff, no paid placements. Just honest takes on the gear that actually makes
            mobile work better.
          </p>
          <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
            {features.map((f) => (
              <div className="card" key={f.title}>
                <div className="card-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured gear */}
      <section className="section section-alt">
        <div className="container">
          <p className="section-label">Editor's Picks</p>
          <h2 className="section-title">Gear we carry every day</h2>
          <div className="grid-3">
            {featuredProducts.map((p) => (
              <div className="product-card" key={p.id}>
                <div className="product-img-placeholder">{p.emoji}</div>
                <div className="product-body">
                  <p className="product-tag">{p.category}</p>
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <div className="product-footer">
                    <span className="price">{p.price}</span>
                    <a
                      href={p.affiliateUrl}
                      className="btn btn-primary"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                      rel="noopener noreferrer"
                    >
                      View Deal →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/gear" className="btn btn-primary">See All Gear</Link>
          </div>
        </div>
      </section>

      {/* Latest posts */}
      <section className="section">
        <div className="container">
          <p className="section-label">From the Blog</p>
          <h2 className="section-title">Guides worth reading</h2>
          <div className="grid-2">
            {latestPosts.map((post) => (
              <Link to={`/blog/${post.slug}`} key={post.slug} style={{ display: 'contents' }}>
                <article className="blog-card">
                  <div className="blog-card-img-placeholder">{post.emoji}</div>
                  <div className="blog-card-body">
                    <div className="blog-meta">
                      <span>{post.category}</span>
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

      {/* Newsletter */}
      <section className="newsletter-band">
        <div className="container">
          <h2>Get the best gear guides first.</h2>
          <p>Join 2,000+ remote workers getting weekly recommendations, deals, and setup inspiration.</p>
          <EmailSignup source="newsletter-band" />
        </div>
      </section>
    </>
  );
}
