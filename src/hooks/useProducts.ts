import { useState, useEffect } from 'react';
import { getClient } from '../lib/client';
import type { Schema } from '../../amplify/data/resource';

type Product = Schema['Product']['type'];

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getClient().models.Product.list({ filter: { published: { eq: true } } })
      .then(({ data }) => {
        const sorted = [...data].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
        setProducts(sorted);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}
