/**
 * Draft posts/products — written but not yet approved. Proofread at /preview
 * (dev only). Once approved, MOVE the entry (don't just delete it) into
 * src/data/published.ts — that's the permanent source scripts/seed.mjs reads
 * from, so it can seed any environment (sandbox, develop, main) at any time.
 */

import type { ContentPost, ContentProduct } from './contentTypes';

export const draftPosts: ContentPost[] = [];

export const draftProducts: ContentProduct[] = [];
