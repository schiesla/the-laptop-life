import { useState } from 'react';
import { products } from '../data/products';

const categories = ['All', ...new Set(products.map((p) => p.category))];

export default function Gear() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? products : products.filter((p) => p.category === active);

  return (
    <div>
      {/* Page header */}
      <div style={{ background: 'var(--black)', color: 'var(--white)', padding: '4rem 0' }}>
        <div className="container">
          <p className="section-label">Hand-picked gear</p>
          <h1 className="section-title" style={{ color: 'var(--white)' }}>
            The Mobile Worker's Toolkit
          </h1>
          <p style={{ color: 'var(--gray-400)', fontSize: '1.05rem', maxWidth: 520 }}>
            Everything here has been tested in cafes, co-working spaces, and living rooms.
            Affiliate links help us keep the lights on — at no extra cost to you.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Category filter */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  padding: '0.4rem 1rem',
                  borderRadius: '999px',
                  border: '2px solid',
                  borderColor: active === cat ? 'var(--accent)' : 'var(--gray-200)',
                  background: active === cat ? 'var(--accent)' : 'transparent',
                  color: active === cat ? 'var(--black)' : 'var(--gray-600)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid-3">
            {filtered.map((p) => (
              <div className="product-card" key={p.id}>
                <div className="product-img-placeholder">{p.emoji}</div>
                <div className="product-body">
                  <p className="product-tag">{p.category}</p>
                  {p.badge && (
                    <span style={{
                      display: 'inline-block',
                      background: 'var(--accent)',
                      color: 'var(--black)',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px',
                      marginBottom: '0.4rem',
                    }}>
                      {p.badge}
                    </span>
                  )}
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
        </div>
      </section>
    </div>
  );
}
