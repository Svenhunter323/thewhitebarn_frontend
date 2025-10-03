# Map Configuration Guide

The White Barn FL website supports both Google Maps and Leaflet.js for displaying venue location maps. You can easily switch between map providers using environment variables.

## Map Providers

### 🗺️ **Google Maps**
- **Pros**: High-quality satellite imagery, Street View integration, familiar interface
- **Cons**: Requires API key, usage limits, potential costs for high traffic
- **Best for**: Production sites with Google API budget

### 🌍 **Leaflet.js (OpenStreetMap)**
- **Pros**: Completely free, open-source, no API key required, lightweight
- **Cons**: Basic satellite imagery, no Street View
- **Best for**: Development, cost-conscious deployments, open-source projects

## Configuration

### Environment Variables

Add these to your `.env` file:

```bash
# Map Configuration
VITE_MAP_MODE=auto  # Options: 'google', 'leaflet', 'auto'
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### Map Modes

#### 🔄 **Auto Mode** (Recommended)
```bash
VITE_MAP_MODE=auto
```
- **Smart switching**: Uses Google Maps if API key is valid, otherwise falls back to Leaflet
- **Perfect for development**: No setup required, works immediately
- **Production ready**: Add Google API key when ready

#### 🌐 **Google Maps Mode**
```bash
VITE_MAP_MODE=google
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```
- **Forces Google Maps**: Always uses Google Maps (requires valid API key)
- **Best for production**: When you have Google Maps API setup

#### 🍃 **Leaflet Mode**
```bash
VITE_MAP_MODE=leaflet
```
- **Forces Leaflet**: Always uses Leaflet.js with OpenStreetMap
- **No API key needed**: Completely free and open-source
- **Best for**: Development, cost-sensitive projects

## Quick Setup

### For Development (Free)
```bash
VITE_MAP_MODE=leaflet
# No API key needed!
```

### For Production with Google Maps
1. Get Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable "Maps Embed API"
3. Set environment variables:
```bash
VITE_MAP_MODE=google
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### For Production without Google API (Free)
```bash
VITE_MAP_MODE=leaflet
# No API key needed, completely free!
```

## Features

Both map implementations include:
- ✅ **Interactive maps** with zoom and pan
- ✅ **Venue marker** at exact location
- ✅ **Get Directions** button
- ✅ **Responsive design** for all devices
- ✅ **Professional styling** matching site theme
- ✅ **Address display** below map

## Development Indicator

In development mode, a small indicator shows which map provider is currently active:
- "Google Maps" or "Google Maps (Auto)"
- "Leaflet" or "Leaflet (Auto)"

## Switching Maps

To switch map providers, simply change the environment variable and restart the development server:

```bash
# Switch to Leaflet
VITE_MAP_MODE=leaflet

# Switch to Google Maps
VITE_MAP_MODE=google

# Switch to Auto (recommended)
VITE_MAP_MODE=auto
```

## Troubleshooting

### Map not loading?
1. Check your `.env` file configuration
2. Restart the development server after changing environment variables
3. For Google Maps: Verify API key is valid and Maps Embed API is enabled

### Want to use Leaflet permanently?
Set `VITE_MAP_MODE=leaflet` - no API key required, completely free!

### Want the best of both worlds?
Use `VITE_MAP_MODE=auto` - it automatically chooses the best available option.
