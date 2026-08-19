import { useState } from 'react';
import SEO from '../../components/SEO/SEO';
import { useProducts } from '../../hooks/useProducts';
import './Gear.css';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { CategoryPill } from '../../components/CategoryPill/CategoryPill';
import { Eyebrow } from '../../components/Eyebrow/Eyebrow';
import { Select } from '../../components/Select/Select';
import { Skeleton } from '../../components/Skeleton/Skeleton';

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
          <Eyebrow tone='inverse' style={{marginBottom:16}}>Hand-picked gear</Eyebrow>
          <h1>The Mobile Worker's Toolkit</h1>
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
                <CategoryPill key={cat} active={active === cat} onClick={() => setActive(cat)}>{cat}</CategoryPill>
              ))}
            </div>
            <Select label='Sort by' value={sort} onChange={(e) => setSort(e.target.value as SortOption)} options={[
              { value: "featured", label: "Editor's Picks" },
              { value: "name", label: "Name (A–Z)" },
              { value: "price-asc", label: "Price: Low to High" },
              { value: "price-desc", label: "Price: High to Low" }
            ]}/>
          </div>

          {loading ? (
            <div className="grid-3">
              {[1, 2, 3, 4, 5, 6].map((n) => <Skeleton key={n} height={320} />)}
            </div>
          ) : (
          <div className="grid-3">
            {sorted.map((p) => (
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
        </div>
      </section>
    </div>
  );
}
