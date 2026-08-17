import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO/SEO';
import { usePosts } from '../../hooks/usePosts';
import './Blog.css';
import { PostCard } from '../../components/PostCard/PostCard';

export default function Blog() {
  const { posts, loading } = usePosts();
  const navigate = useNavigate();

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
          <h1>The Blog</h1>
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
    </div>
  );
}
