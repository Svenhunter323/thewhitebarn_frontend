import { Helmet } from 'react-helmet-async';

const EventVenueSchema = ({ 
  name = "The White Barn FL",
  description = "Premier event venue in South Florida offering indoor air-conditioned barn space for weddings, corporate events, and special occasions.",
  url,
  telephone = "+1-954-XXX-XXXX", // Replace with actual phone number
  address = {
    streetAddress: "123 Venue Street", // Replace with actual address
    addressLocality: "Fort Lauderdale",
    addressRegion: "FL",
    postalCode: "33301",
    addressCountry: "US"
  },
  priceRange = "$$$$",
  amenityFeatures = [
    "Air Conditioning",
    "Parking Available", 
    "Audio/Visual Equipment",
    "Indoor Venue",
    "Event Planning Services"
  ]
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    "name": name,
    "description": description,
    "url": url || window.location.origin,
    "telephone": telephone,
    "priceRange": priceRange,
    "address": {
      "@type": "PostalAddress",
      ...address
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "26.1224", // Fort Lauderdale area - replace with actual coordinates
      "longitude": "-80.1373"
    },
    "amenityFeature": amenityFeatures.map(amenity => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "50",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://www.facebook.com/whitebarnfl", // Replace with actual social links
      "https://www.instagram.com/whitebarnfl"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default EventVenueSchema;
