import { useState, useEffect } from 'react';
import { client } from '../lib/client';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    client.models.Product.list({ filter: { published: { eq: true } } })
      .then(({ data }) => {
        const sorted = [...data].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
        setProducts(sorted);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}
