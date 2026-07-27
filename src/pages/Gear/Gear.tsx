import { useState } from 'react';
import SEO from '../../components/SEO/SEO';
import { useProducts } from '../../hooks/useProducts';
import './Gear.css';

export default function Gear() {
  const { products, loading } = useProducts();
  const [active, setActive] = useState('All');
  const categories = ['All', ...new Set(products.map((p) => p.category).filter(Boolean))];
  const filtered = active === 'All' ? products : products.filter((p) => p.category === active);

  return (
    <div>
      <SEO
        title="Best Mobile Work Gear"
        description="Hand-picked laptops, stands, chargers, keyboards, and accessories for remote workers who work from anywhere. Tested in real cafes and co-working spaces."
        path="/gear"
      />
      {/* Page header */}
      <div className="gear-header">
        <div className="container">
          <p className="section-label">Hand-picked gear</p>
          <h1 className="section-title">The Mobile Worker's Toolkit</h1>
          <p className="gear-header-sub">
            Everything here has been tested in cafes, co-working spaces, and living rooms.
            Affiliate links help us keep the lights on — at no extra cost to you.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Category filter */}
          <div className="category-filter">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`category-btn${active === cat ? ' active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid-3">
              {[1, 2, 3, 4, 5, 6].map((n) => <div key={n} className="product-card skeleton" style={{ minHeight: 320 }} />)}
            </div>
          ) : (
          <div className="grid-3">
            {filtered.map((p) => (
              <div className="product-card" key={p.id}>
                <div className="product-img-placeholder">{p.emoji}</div>
                <div className="product-body">
                  <p className="product-tag">{p.category}</p>
                  {p.badge && <span className="product-badge">{p.badge}</span>}
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <div className="product-footer">
                    <span className="price">{p.price}</span>
                    <a
                      href={p.affiliateUrl}
                      className="btn btn-primary btn-sm"
                      rel="noopener noreferrer"
                    >
                      View Deal →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>
    </div>
  );
}
