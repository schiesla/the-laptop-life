/**
 * Generates public/sitemap.xml from static routes + published blog posts.
 * Runs automatically as part of `npm run build` (see package.json), so the
 * sitemap always reflects whatever is currently in src/data/published.ts —
 * no manual step to remember when a new post ships.
 */
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { publishedPosts } from '../src/data/published.ts';

const DOMAIN = 'https://www.the-laptop-life.com';
const today = new Date().toISOString().slice(0, 10);

const staticRoutes = [
  { path: '/', priority: '1.0' },
  { path: '/gear', priority: '0.9' },
  { path: '/blog', priority: '0.8' },
  { path: '/about', priority: '0.5' },
];

const postRoutes = publishedPosts
  .filter((p) => p.published)
  .map((p) => ({ path: `/blog/${p.slug}`, priority: '0.7' }));

const urls = [...staticRoutes, ...postRoutes]
  .map(
    ({ path, priority }) => `  <url>
    <loc>${DOMAIN}${path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const outPath = fileURLToPath(new URL('../public/sitemap.xml', import.meta.url));
writeFileSync(outPath, xml);
console.log(`Wrote sitemap.xml with ${staticRoutes.length + postRoutes.length} URLs`);
