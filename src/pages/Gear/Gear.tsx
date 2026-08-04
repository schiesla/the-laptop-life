import { useState } from 'react';
import SEO from '../../components/SEO/SEO';
import { useProducts } from '../../hooks/useProducts';
import './Gear.css';

type SortOption = 'featured' | 'name' | 'price-asc' | 'price-desc';

function parsePrice(price: string | null | undefined): number {
  if (!price) return 0;
  const n = parseFloat(price.replace(/[^0-9.]/g, ''));
  return Number.isNaN(n) ? 0 : n;
}

export default function Gear() {
  const { products, loading } = useProducts();
  const [active, setActive] = useState('All');
  const [sort, setSort] = useState<SortOption>('featured');
  const categories = ['All', ...new Set(products.map((p) => p.category).filter((c): c is string => c != null))];
  const filtered = active === 'All' ? products : products.filter((p) => p.category === active);

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-asc':
        return parsePrice(a.price) - parsePrice(b.price);
      case 'price-desc':
        return parsePrice(b.price) - parsePrice(a.price);
      default: {
        const aPick = a.badge === "Editor's Pick" ? 0 : 1;
        const bPick = b.badge === "Editor's Pick" ? 0 : 1;
        return aPick - bPick;
      }
    }
  });

  return (
    <div>
      <SEO
        title="Best Mobile Work Gear"
        description="Hand-picked laptops, stands, chargers, keyboards, and accessories for remote workers who work from anywhere."
        path="/gear"
      />
      {/* Page header */}
      <div className="gear-header">
        <div className="container">
          <p className="section-label">Hand-picked gear</p>
          <h1 className="section-title">The Mobile Worker's Toolkit</h1>
          <p className="gear-header-sub">
            Everything here is chosen for people working from cafes, co-working spaces, and living rooms.
            Affiliate links help us keep the lights on — at no extra cost to you.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Category filter + sort */}
          <div className="gear-controls">
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
            <label className="sort-select-label">
              Sort by
              <select
                id={"sort-select"}
                className="sort-select"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
              >
                <option value="featured">Editor's Picks</option>
                <option value="name">Name (A–Z)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </label>
          </div>

          {loading ? (
            <div className="grid-3">
              {[1, 2, 3, 4, 5, 6].map((n) => <div key={n} className="product-card skeleton" style={{ minHeight: 320 }} />)}
            </div>
          ) : (
          <div className="grid-3">
            {sorted.map((p) => (
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
                      href={p.affiliateUrl ?? undefined}
                      className="btn btn-primary btn-sm"
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
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
