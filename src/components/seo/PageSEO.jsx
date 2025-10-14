import { Helmet } from 'react-helmet-async';
import EventVenueSchema from './EventVenueSchema';

const PageSEO = ({
  title,
  description,
  canonical,
  ogImage,
  pageType = 'website',
  schemaProps = {}
}) => {
  const siteUrl = window.location.origin;
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : window.location.href;
  const fullOgImage = ogImage ? `${siteUrl}${ogImage}` : `${siteUrl}/_og/default.jpg`;

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={fullCanonical} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={pageType} />
        <meta property="og:url" content={fullCanonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={fullOgImage} />
        <meta property="og:site_name" content="The White Barn FL" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={fullCanonical} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={fullOgImage} />
        
        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en-US" />
        
        {/* Local Business Meta */}
        <meta name="geo.region" content="US-FL" />
        <meta name="geo.placename" content="Fort Lauderdale" />
        <meta name="geo.position" content="26.1224;-80.1373" />
        <meta name="ICBM" content="26.1224, -80.1373" />
      </Helmet>
      
      {/* Event Venue Schema */}
      <EventVenueSchema url={fullCanonical} {...schemaProps} />
    </>
  );
};

export default PageSEO;
