import { Helmet } from 'react-helmet-async';

const SITE = 'The Laptop Life';
const DOMAIN = 'https://www.the-laptop-life.com';
const DEFAULT_DESC = 'Honest gear reviews and buying guides for laptops, stands, chargers, and everything the modern remote worker needs to be productive anywhere.';

export default function SEO({ title, description, path = '', type = 'website' }) {
  const fullTitle = title ? `${title} | ${SITE}` : `${SITE} — When anywhere is your office`;
  const desc = description || DEFAULT_DESC;
  const canonical = `${DOMAIN}${path}`;

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
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  );
}
