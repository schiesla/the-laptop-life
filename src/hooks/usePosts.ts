import { useState, useEffect } from 'react';
import { getClient } from '../lib/client';
import type { Schema } from '../../amplify/data/resource';

type Post = Schema['Post']['type'];

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getClient().models.Post.list({ filter: { published: { eq: true } } })
      .then(({ data }) => {
        const sorted = [...data].sort((a, b) => (b.sortOrder ?? 0) - (a.sortOrder ?? 0));
        setPosts(sorted);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading, error };
}

export function usePost(slug: string | undefined) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) return;
    getClient().models.Post.list({ filter: { slug: { eq: slug } } })
      .then(({ data }) => setPost(data[0] ?? null))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [slug]);

  return { post, loading, error };
}
