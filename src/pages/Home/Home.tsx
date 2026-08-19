import { Link, useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO/SEO';
import EmailSignup from '../../components/EmailSignup/EmailSignup';
import { usePosts } from '../../hooks/usePosts';
import { useProducts } from '../../hooks/useProducts';
import useEnvVariables from '../../hooks/useEnvVariables';
import './Home.css';
import { FeatureCard } from '../../components/FeatureCard/FeatureCard';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { PostCard } from '../../components/PostCard/PostCard';
import { Eyebrow } from '../../components/Eyebrow/Eyebrow';
import { Skeleton } from '../../components/Skeleton/Skeleton';

const features = [
  { title: 'Coffee Shop Ready', description: 'Picks chosen for real cafe conditions, not just spec sheets.' },
  { title: 'Power Independent', description: 'Never hunt for an outlet again. We obsess over battery life and portable charging.' },
  { title: 'One-Bag Setups', description: "Full productivity that fits in the bag you're already carrying." },
  { title: 'Honest Affiliate Reviews', description: 'We only recommend gear we’d stand behind. Affiliate links disclosed, always.' },
];

export default function Home() {
  const { ENABLE_NEWSLETTER } = useEnvVariables();
  const { posts, loading: postsLoading } = usePosts();
  const { products, loading: productsLoading } = useProducts();
  const navigate = useNavigate();
  const featuredProducts = products.slice(0, 3);
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      <SEO path="/" />
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <Eyebrow tone='inverse' as='span'>When anywhere is your office</Eyebrow>
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
          <Eyebrow style={{marginBottom:16}}>Why The Laptop Life</Eyebrow>
          <h2 className="section-title">Built by remote workers,<br />for remote workers</h2>
          <p className="section-sub">
            No fluff, no paid placements. Just honest takes on the gear that actually makes
            mobile work better.
          </p>
          <div className="grid-3 features-grid">
            {features.map((f, i) => (
                <FeatureCard key={f.title} index={i + 1} title={f.title} description={f.description} />
              ))}
          </div>
        </div>
      </section>

      {/* Featured gear */}
      <section className="section section-alt">
        <div className="container">
          <Eyebrow style={{marginBottom:16}}>Editor's Picks</Eyebrow>
          <h2 className="section-title">Gear worth a look</h2>
          {productsLoading ? (
            <div className="grid-3">
              {[1, 2, 3].map((n) => <Skeleton key={n} height={280} style={{ borderRadius: 'var(--radius-m)' }} />)}
            </div>
          ) : (
            <div className="grid-3">
              {featuredProducts.map((p) => (
                <ProductCard
                    key={p.id}
                    name={p.name}
                    category={p.category}
                    price={p.price}
                    description={p.description}
                    badge={p.badge}
                    href={p.affiliateUrl ?? undefined}
                  />
              ))}
            </div>
          )}
          <div className="gear-cta">
            <Link to="/gear" className="btn btn-outline">See All Gear</Link>
          </div>
        </div>
      </section>

      {/* Latest posts */}
      <section className="section">
        <div className="container">
          <Eyebrow style={{marginBottom:16}}>From the Blog</Eyebrow>
          <h2 className="section-title">Guides worth reading</h2>
          {postsLoading ? (
            <div className="grid-2">
              {[1, 2, 3].map((n) => <Skeleton key={n} height={280} style={{ borderRadius: 'var(--radius-m)' }} />)}            </div>
          ) : (
            <div className="grid-2">
              {latestPosts.map((post) => (
                <PostCard
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                    e.preventDefault();
                    navigate(`/blog/${post.slug}`);
                  }}
                  title={post.title}
                  excerpt={post.excerpt}
                  category={post.category}
                  date={post.date}
                  readTime={post.readTime}
                  image={post.image}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {ENABLE_NEWSLETTER && (
        <section className="newsletter-band">
          <div className="container">
            <h2>Get the best gear guides first.</h2>
            <p>Join 2,000+ remote workers getting weekly recommendations, deals, and setup inspiration.</p>
            <EmailSignup source="newsletter-band" />
          </div>
        </section>
      )}
    </>
  );
}
