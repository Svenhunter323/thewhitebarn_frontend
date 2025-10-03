import React from 'react';

const GoogleMap = ({ address = "4680 SW 148th Ave, Fort Lauderdale, FL 33330" }) => {
  // Create Google Maps embed URL
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'demo'}&q=${encodeURIComponent(address)}&zoom=15&maptype=roadmap`;
  
  // Fallback to Google Maps search if no API key
  const fallbackSrc = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const handleDirectionsClick = () => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    window.open(directionsUrl, '_blank');
  };

  return (
    <div className="relative">
      <div className="rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? mapSrc : fallbackSrc}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="The White Barn FL Location"
          className="w-full"
        />
      </div>
      
      {/* Address and Directions Button */}
      <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Our Location</h4>
            <p className="text-gray-600">{address}</p>
          </div>
          <button
            onClick={handleDirectionsClick}
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Get Directions
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;
