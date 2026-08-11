/**
 * Generates public/sitemap.xml from static routes + published blog posts.
 * Runs automatically as part of `npm run build` (see package.json), so the
 * sitemap always reflects whatever is currently in src/data/published.ts —
 * no manual step to remember when a new post ships.
 *
 * lastmod per URL only advances when that URL's actual content changes
 * (tracked via a content hash cached in sitemap-lastmod-cache.json, checked
 * into the repo). Stamping every URL with today's date on every build makes
 * lastmod a meaningless signal to Google — this keeps it honest.
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';
import { publishedPosts } from '../src/data/published.ts';

const DOMAIN = 'https://www.the-laptop-life.com';
const today = new Date().toISOString().slice(0, 10);

const pkgPath = fileURLToPath(new URL('../package.json', import.meta.url));
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

const cachePath = fileURLToPath(new URL('./sitemap-lastmod-cache.json', import.meta.url));
const cache = existsSync(cachePath) ? JSON.parse(readFileSync(cachePath, 'utf-8')) : {};

function hashOf(value) {
  return createHash('sha256').update(value).digest('hex');
}

function lastmodFor(key, contentHash) {
  const cached = cache[key];
  if (cached && cached.hash === contentHash) {
    return cached.lastmod;
  }
  cache[key] = { hash: contentHash, lastmod: today };
  return today;
}

const staticRoutes = [
  { path: '/', priority: '1.0' },
  { path: '/gear', priority: '0.9' },
  { path: '/blog', priority: '0.8' },
  { path: '/about', priority: '0.5' },
];

// Static pages are code, not data, so there's no per-page content to hash —
// tie their lastmod to the package version instead, which changes when a
// release actually ships.
const staticHash = hashOf(pkg.version);

const urls = [
  ...staticRoutes.map(({ path, priority }) => ({
    path,
    priority,
    lastmod: lastmodFor(`static:${path}`, staticHash),
  })),
  ...publishedPosts
    .filter((p) => p.published)
    .map((p) => ({
      path: `/blog/${p.slug}`,
      priority: '0.7',
      lastmod: lastmodFor(`post:${p.slug}`, hashOf(`${p.title}|${p.excerpt}|${p.body}`)),
    })),
];

const urlsXml = urls
  .map(
    ({ path, priority, lastmod }) => `  <url>
    <loc>${DOMAIN}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>
`;

writeFileSync(fileURLToPath(new URL('../public/sitemap.xml', import.meta.url)), xml);
writeFileSync(cachePath, JSON.stringify(cache, null, 2) + '\n');
console.log(`Wrote sitemap.xml with ${urls.length} URLs`);
