import { Helmet } from 'react-helmet-async';

export const MetaTags = ({
  title,
  description,
  keywords,
  url,
  image,
  type = 'website',
  siteName = 'The White Barn FL',
  twitterHandle = '@thewhitebarnfl'
}) => {
  const defaultTitle = 'The White Barn FL - Premier Wedding & Event Venue in SW Ranches, Florida';
  const defaultDescription = 'The White Barn FL offers a stunning wedding and event venue in SW Ranches with beautiful gardens, elegant spaces, and exceptional service for your special day.';
  const defaultImage = 'https://thewhitebarnfl.com/images/og-image.jpg';
  const defaultUrl = 'https://thewhitebarnfl.com';

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image || defaultImage;
  const finalUrl = url || defaultUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="The White Barn FL" />
      <link rel="canonical" href={finalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={finalUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Structured Data for Events/Venue */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EventVenue",
          "name": "The White Barn FL",
          "description": finalDescription,
          "url": finalUrl,
          "image": finalImage,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "SW Ranches",
            "addressLocality": "SW Ranches",
            "addressRegion": "FL",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "26.0618",
            "longitude": "-80.3081"
          },
          "telephone": "(954) XXX-XXXX",
          "priceRange": "$$$$",
          "amenityFeature": [
            {
              "@type": "LocationFeatureSpecification",
              "name": "Indoor Climate Controlled Space"
            },
            {
              "@type": "LocationFeatureSpecification", 
              "name": "Outdoor Garden Ceremony Area"
            },
            {
              "@type": "LocationFeatureSpecification",
              "name": "Professional Event Coordination"
            },
            {
              "@type": "LocationFeatureSpecification",
              "name": "Bridal Suite"
            },
            {
              "@type": "LocationFeatureSpecification",
              "name": "Parking Available"
            }
          ],
          "sameAs": [
            "https://www.instagram.com/thewhitebarnfl",
            "https://www.facebook.com/thewhitebarnfl"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default MetaTags;
