export interface ContentPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  emoji: string;
  image?: string;
  imageAlt?: string;
  published: boolean;
  sortOrder: number;
  body: string;
}

export interface ContentProduct {
  name: string;
  category: string;
  price: string;
  description: string;
  emoji: string;
  affiliateUrl: string;
  badge: string | null;
  published: boolean;
  sortOrder: number;
}
