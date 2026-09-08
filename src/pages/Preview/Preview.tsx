import { Link, useParams, Navigate } from 'react-router-dom';
import { draftPosts, draftProducts } from '../../data/drafts';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Prose } from '../../components/Prose/Prose';
import '../BlogPost/BlogPost.css';

export function PreviewIndex() {
  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '3rem 1.5rem' }}>
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

      <h1 style={{ marginTop: '3rem' }}>Draft products</h1>
      <p>Unpublished products from src/data/drafts.ts — not seeded to the database yet.</p>
      {draftProducts.length === 0 && <p>No draft products.</p>}
      <div className="grid-3">
        {draftProducts.map((product) => (
          <ProductCard
            key={product.name}
            name={product.name}
            category={product.category}
            price={product.price}
            description={product.description}
            badge={product.badge}
            href={product.affiliateUrl ?? undefined}
          />
        ))}
      </div>
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

        <Prose style={{ maxWidth: 'none' }}>
          <div dangerouslySetInnerHTML={{ __html: post.body ?? '' }} />
        </Prose>
      </article>
    </>
  );
}
