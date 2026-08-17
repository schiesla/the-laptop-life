import { useState, useEffect } from 'react';
import { getClient } from '../lib/client';
import type { Schema } from '../../amplify/data/resource';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  affiliateUrl: string;
  badge?: string;
  published: boolean;
  sortOrder: number;
}

function normalize(p: Schema['Product']['type']): Product {
  return {
    id: p.id,
    name: p.name,
    category: p.category ?? '',
    price: p.price ?? '',
    description: p.description ?? '',
    affiliateUrl: p.affiliateUrl ?? '',
    badge: p.badge ?? undefined,
    published: p.published ?? true,
    sortOrder: p.sortOrder ?? 0,
  };
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getClient().models.Product.list({ filter: { published: { eq: true } } })
      .then(({ data }) => {
        const sorted = data.map(normalize).sort((a, b) => a.sortOrder - b.sortOrder);
        setProducts(sorted);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}
