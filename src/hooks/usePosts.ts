import { useState, useEffect } from 'react';
import { getClient } from '../lib/client';
import type { Schema } from '../../amplify/data/resource';

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  emoji?: string;
  image?: string;
  imageAlt?: string;
  body: string;
  published: boolean;
  sortOrder: number;
}

function normalize(p: Schema['Post']['type']): Post {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? '',
    category: p.category ?? '',
    date: p.date ?? '',
    readTime: p.readTime ?? '',
    emoji: p.emoji ?? undefined,
    image: p.image ?? undefined,
    imageAlt: p.imageAlt ?? undefined,
    body: p.body ?? '',
    published: p.published ?? true,
    sortOrder: p.sortOrder ?? 0,
  };
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getClient().models.Post.list({ filter: { published: { eq: true } } })
      .then(({ data }) => {
        const sorted = data.map(normalize).sort((a, b) => b.sortOrder - a.sortOrder);
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
      .then(({ data }) => setPost(data[0] ? normalize(data[0]) : null))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [slug]);

  return { post, loading, error };
}
