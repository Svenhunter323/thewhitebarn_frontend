// Helper function to get full image URL from backend
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath;
  // Otherwise, prepend the backend base URL
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  return `${baseUrl.replace('/api', '')}${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`;
};

// Placeholder image URL for missing images
export const getPlaceholderUrl = () => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  return `${baseUrl.replace('/api', '')}/uploads/gallery/placeholder.svg`;
};

// Helper function to get thumbnail URL with fallback
export const getThumbnailUrl = (image) => {
  return getImageUrl(image.thumbnail || image.path || image.url);
};

// Helper function to get full resolution image URL
export const getFullImageUrl = (image) => {
  return getImageUrl(image.path || image.url);
};
