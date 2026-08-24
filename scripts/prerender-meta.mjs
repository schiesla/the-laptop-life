/**
 * Bakes per-route <title>/meta tags into static index.html copies under dist/,
 * so crawlers that don't execute JS (Pinterest, Facebook, Twitter, iMessage,
 * etc.) see the real page content instead of the generic homepage tags that
 * react-helmet-async only injects client-side after hydration.
 *
 * Runs after `vite build` (see package.json) using dist/index.html as the
 * template — real users still get the same SPA bundle either way, this only
 * changes what's in the initial HTML response.
 *
 * Values here must stay in sync with src/components/SEO/SEO.tsx (the
 * client-side equivalent) and each page's <SEO ... /> props.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { publishedPosts } from '../src/data/published.ts';

const SITE = 'The Laptop Life';
const DOMAIN = 'https://www.the-laptop-life.com';
const DEFAULT_DESC = 'Honest gear reviews and buying guides for laptops, stands, chargers, and everything the modern remote worker needs to be productive anywhere.';

const distDir = fileURLToPath(new URL('../dist', import.meta.url));
const template = readFileSync(`${distDir}/index.html`, 'utf-8');

function escapeAttr(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function render({ title, description, path, type = 'website', image, datePublished, jsonLd }) {
  const fullTitle = title ? `${title} | ${SITE}` : `${SITE} — When anywhere is your office`;
  const desc = escapeAttr(description || DEFAULT_DESC);
  const canonical = `${DOMAIN}${path}`;
  const safeTitle = escapeAttr(fullTitle);

  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${safeTitle}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${desc}" />`)
    .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${safeTitle}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${desc}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta property="og:type" content=".*?" \/>/, `<meta property="og:type" content="${type}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${safeTitle}" />`)
    .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${desc}" />`);

  if (image) {
    const safeImage = escapeAttr(image);
    html = html
      // article images come from Unsplash at arbitrary sizes — the default
      // og:image:width/height (1200x630) no longer applies, so drop them
      // rather than ship a mismatched hint.
      .replace(/\s*<meta property="og:image:width" content=".*?">\n/, '\n')
      .replace(/\s*<meta property="og:image:height" content=".*?">\n/, '\n')
      .replace(/<meta property="og:image" content=".*?">/, `<meta property="og:image" content="${safeImage}">`)
      .replace(
        /<meta name="twitter:card" content="summary_large_image" \/>/,
        `<meta name="twitter:card" content="summary_large_image" />\n    <meta name="twitter:image" content="${safeImage}" />`
      );
  }

  if (datePublished) {
    const iso = new Date(datePublished).toISOString();
    html = html.replace('</head>', `    <meta property="article:published_time" content="${iso}" />\n  </head>`);
  }

  if (jsonLd) {
    html = html.replace('</head>', `    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n  </head>`);
  }

  return html;
}

function writeRoute(path, html) {
  const dir = path === '/' ? distDir : `${distDir}${path}`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/index.html`, html);
}

const staticPages = [
  { path: '/gear', title: 'Best Mobile Work Gear', description: 'Hand-picked laptops, stands, chargers, keyboards, and accessories for remote workers who work from anywhere.' },
  { path: '/blog', title: 'Gear Guides & Reviews', description: 'In-depth buying guides, setup walkthroughs, and honest gear reviews for remote workers who work from coffee shops, co-working spaces, and beyond.' },
  { path: '/about', title: 'About', description: 'The Laptop Life is built for remote workers, curating gear for coffee shops, co-working spaces, and life on the go based on specs, research, and real user feedback.' },
];

let count = 0;
for (const page of staticPages) {
  writeRoute(page.path, render(page));
  count += 1;
}

for (const post of publishedPosts.filter((p) => p.published)) {
  const canonical = `${DOMAIN}/blog/${post.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    ...(post.image && { image: [post.image] }),
    datePublished: new Date(post.date).toISOString(),
    author: { '@type': 'Organization', name: SITE, url: DOMAIN },
    publisher: {
      '@type': 'Organization',
      name: SITE,
      logo: { '@type': 'ImageObject', url: `${DOMAIN}/favicon-512.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  };

  writeRoute(
    `/blog/${post.slug}`,
    render({
      title: post.title,
      description: post.excerpt,
      path: `/blog/${post.slug}`,
      type: 'article',
      image: post.image ?? undefined,
      datePublished: post.date,
      jsonLd,
    })
  );
  count += 1;
}

console.log(`Prerendered meta tags for ${count} routes`);
