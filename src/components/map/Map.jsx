import React from 'react';
import GoogleMap from './GoogleMap';
import LeafletMap from './LeafletMap';

const Map = ({ address = "4680 SW 148th Ave, Fort Lauderdale, FL 33330" }) => {
  // Get map mode from environment variable
  // Options: 'google', 'leaflet', 'auto'
  const mapMode = import.meta.env.VITE_MAP_MODE || 'auto';
  
  const renderMap = () => {
    switch (mapMode.toLowerCase()) {
      case 'google':
        return <GoogleMap address={address} />;
      
      case 'leaflet':
        return <LeafletMap address={address} />;
      
      case 'auto':
      default: {
        // Auto mode: Use Google Maps if API key is available, otherwise use Leaflet
        const hasGoogleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY && 
                                import.meta.env.VITE_GOOGLE_MAPS_API_KEY !== 'your_google_maps_api_key_here';
        
        if (hasGoogleApiKey) {
          return <GoogleMap address={address} />;
        } else {
          return <LeafletMap address={address} />;
        }
      }
    }
  };

  return (
    <div className="relative">
      {renderMap()}
      
      {/* Map Mode Indicator (only in development) */}
      {import.meta.env.DEV && (
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-10">
          {mapMode === 'auto' 
            ? (import.meta.env.VITE_GOOGLE_MAPS_API_KEY && 
               import.meta.env.VITE_GOOGLE_MAPS_API_KEY !== 'your_google_maps_api_key_here' 
               ? 'Google Maps (Auto)' 
               : 'Leaflet (Auto)')
            : mapMode === 'google' 
            ? 'Google Maps' 
            : 'Leaflet'
          }
        </div>
      )}
    </div>
  );
};

export default Map;
