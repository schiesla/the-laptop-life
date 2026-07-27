import { useState, useEffect } from 'react';
import { client } from '../lib/client';

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    client.models.Post.list({ filter: { published: { eq: true } } })
      .then(({ data }) => {
        const sorted = [...data].sort((a, b) => (b.sortOrder ?? 0) - (a.sortOrder ?? 0));
        setPosts(sorted);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading, error };
}

export function usePost(slug) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    client.models.Post.list({ filter: { slug: { eq: slug } } })
      .then(({ data }) => setPost(data[0] ?? null))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [slug]);

  return { post, loading, error };
}
