# Content Roadmap — The Laptop Life

Affiliate site for mobile remote-work gear. Tagline: "When anywhere is your office."

This file is the source of truth for what to write next. If you're an agent picking this
up (e.g. from the Claude mobile app via GitHub), read this whole file before writing
anything — it covers what to write, the copy rules that apply to every post, and exactly
where the output goes.

## Copy rules — apply to every post, no exceptions

The site owner has **not personally tested any affiliate products**. Never imply
hands-on use. Banned phrasing: "we tested," "we carry," "hands-on," "field-tested,"
"we use," "genuinely," "the only X that truly...". Instead frame everything as
research/spec/review-based curation: "rated," "reviewers praise," "chosen for,"
"well-reviewed."

Every post must open with the affiliate disclosure paragraph (copy the exact markup
from an existing post's `body` field, class `post-disclosure`).

## Where output goes

New articles go into **`src/data/drafts.ts`**, appended to the `draftPosts` array —
**never write directly into `published.ts`**, that file is the permanent seed record
and only the site owner moves entries into it after reviewing a live preview.

Each entry must satisfy the `ContentPost` interface in `src/data/contentTypes.ts`:

```ts
export interface ContentPost {
  slug: string;        // kebab-case, matches the article topic
  title: string;
  excerpt: string;      // 1-2 sentences, used as the card teaser
  category: string;      // e.g. 'Power', 'Ergonomics', 'Connectivity'
  date: string;          // e.g. 'August 10, 2026'
  readTime: string;      // e.g. '7 min read'
  emoji: string;         // used as a visual icon on cards
  image?: string;         // leave unset unless you have a real, non-product-specific
                           // Unsplash photo URL — see image rules below
  imageAlt?: string;
  published: boolean;    // always false for drafts
  sortOrder: number;      // increment from the highest existing sortOrder
  body: string;           // HTML string, see style reference below
}
```

For body markup/style, use `src/data/published.ts`'s two existing posts as the
reference — same heading structure (`<h2>` with an emoji prefix), `post-table` class
for comparison tables, internal links to related posts where relevant.

## Image rules

Never use real Amazon product photos (Operating Agreement violation — see
`fast-charging-explained-how-to-choose-a-brick` commit history for the full reasoning
if needed). For generic, non-product-specific blog imagery only, hotlinked
`images.unsplash.com/photo-...` URLs are fine. If unsure, leave `image`/`imageAlt`
unset rather than guess.

## Committing

After adding an entry to `draftPosts`, commit directly with a clear message
(`Add draft: <slug>`). Do not touch `published.ts`, `scripts/seed.mjs`, or any
Amplify/backend files — publishing is a separate manual step the site owner runs
locally (preview → move to `published.ts` → reseed).

## Status

### Phase 1 — charging category (no product photos needed)
- [x] `fast-charging-explained-how-to-choose-a-brick` — published
- [x] `power-bank-capacity-explained-mah-vs-wh` — published
- [ ] MagSafe vs Qi2 vs standard wireless charging
- [ ] USB-C cable ratings explained (why the cable matters as much as the charger)
- [ ] Does fast charging damage batteries — myth-busting
- [ ] Coffee shop power setup — use-case hub tying the above four posts together

### Phase 2 — product roundups (on hold, needs real photography)
Held until the site has Amazon Creators API access (needs 3 qualifying sales to
apply) or owned/licensed product photography. Do not draft these yet.
- Best Anker Power Banks
- Best MagSafe Chargers
