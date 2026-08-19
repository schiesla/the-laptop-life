import { Helmet } from 'react-helmet-async';
import './SEO.css';

const SITE = 'The Laptop Life';
const DOMAIN = 'https://www.the-laptop-life.com';
const DEFAULT_DESC = 'Honest gear reviews and buying guides for laptops, stands, chargers, and everything the modern remote worker needs to be productive anywhere.';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  type?: string;
  image?: string;
  datePublished?: string;
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE,
  url: DOMAIN,
  logo: `${DOMAIN}/favicon-512.png`,
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE,
  url: DOMAIN,
};

export default function SEO({ title, description, path = '', type = 'website', image, datePublished }: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE}` : `${SITE} — When anywhere is your office`;
  const desc = description || DEFAULT_DESC;
  const canonical = `${DOMAIN}${path}`;

  const articleJsonLd = type === 'article' && title && datePublished ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: desc,
    ...(image && { image: [image] }),
    datePublished: new Date(datePublished).toISOString(),
    author: { '@type': 'Organization', name: SITE, url: DOMAIN },
    publisher: {
      '@type': 'Organization',
      name: SITE,
      logo: { '@type': 'ImageObject', url: `${DOMAIN}/favicon-512.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  } : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      {image && <meta name="twitter:image" content={image} />}
      <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
      {articleJsonLd && <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>}
    </Helmet>
  );
}
