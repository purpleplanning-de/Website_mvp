import { Helmet } from 'react-helmet-async';

export default function SEO({
  title = 'Purple Planning - Handgefertigte Planer & Journale',
  description = 'Entdecke liebevoll handgefertigte Planer, Journale und Organizer. Minimalistisches Design trifft auf höchste Qualität. Made with 💜',
  keywords = 'planer, journal, handgefertigt, organizer, bullet journal, produktivität, zeitmanagement, notizbuch',
  image = '/og-image.jpg',
  url = typeof window !== 'undefined' ? window.location.href : 'https://purpleplanning.de',
  type = 'website',
}) {
  const siteName = 'Purple Planning';
  const twitterHandle = '@purpleplanning';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="de_DE" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content={twitterHandle} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="German" />
      <meta name="author" content="Purple Planning" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
