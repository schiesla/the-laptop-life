# Content Roadmap

The live, editable content roadmap lives in Notion, not here:

**[The Laptop Life — Notion project home](https://app.notion.com/p/3b8f30c1dbb981dc90fcec017fe75758)**

- **Content Roadmap** — what to write next, copy rules, image rules, format reference
- **Drafts** — one page per in-progress article, mirrors `src/data/drafts.ts`
- **Published** — one page per live article, mirrors `src/data/published.ts`

Notion is the working surface (including from the Claude mobile app) and the source of
all new content. **Sync is one-way: Notion → Git, never Git → Notion.** When a draft is
approved, pull its content from Notion into `src/data/drafts.ts`, preview it at
`/preview/:slug`, then move it into `src/data/published.ts` per the existing workflow.
Move its Notion page from **Drafts** to **Published** at the same time. The repo never
writes back into Notion — the Notion "Published" folder was seeded once as a snapshot
(2026-08-10) and isn't kept live-updated from the repo afterward.
