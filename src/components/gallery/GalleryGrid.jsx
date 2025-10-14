import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import LoadingSpinner from '../common/LoadingSpinner';
import AnimatedButton from '../ui/AnimatedButton';
import ApiService from '../../services/api';
import { track } from '../../utils/enhancedTracking';

// Cache for API responses to prevent duplicate requests
const apiCache = new Map();

const GalleryGrid = ({ 
  categories = [], 
  onImageClick, 
  category = 'all',
  fallbackImages = []
}) => {
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [filteredImages, setFilteredImages] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(false);
  const [apiImages, setApiImages] = useState([]);
  const fetchTimeoutRef = useRef(null);

  // Stable reference to fallback images
  const fallbackImagesRef = useRef(fallbackImages);
  useEffect(() => {
    fallbackImagesRef.current = fallbackImages;
  }, [fallbackImages]);

  // Update selected category when prop changes
  useEffect(() => {
    setSelectedCategory(category);
  }, [category]);

  // Fetch images from API with fallback
  useEffect(() => {
    const cacheKey = category || 'all';
    
    // Check if we already have this data cached
    if (apiCache.has(cacheKey)) {
      setApiImages(apiCache.get(cacheKey));
      return;
    }

    // Clear any existing timeout
    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current);
    }

    // Set a timeout to debounce the API call
    fetchTimeoutRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await ApiService.getGallery({ 
          category: category !== 'all' ? category : undefined 
        });
        
        if (response && response.images && response.images.length > 0) {
          // Cache the response
          apiCache.set(cacheKey, response.images);
          setApiImages(response.images);
        } else {
          // Fallback to local images if API returns empty
          const currentFallback = fallbackImagesRef.current;
          apiCache.set(cacheKey, currentFallback);
          setApiImages(currentFallback);
        }
      } catch (error) {
        console.warn('Gallery API failed, using fallback images:', error);
        // Cache fallback images to prevent retries
        const currentFallback = fallbackImagesRef.current;
        apiCache.set(cacheKey, currentFallback);
        setApiImages(currentFallback);
      } finally {
        setLoading(false);
      }
    }, 300); // 300ms debounce

    // Cleanup timeout on unmount
    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
    };
  }, [category]);

  // Filter API images by category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredImages(apiImages);
    } else {
      setFilteredImages(apiImages.filter(img => img.category === selectedCategory));
    }
    setVisibleCount(12); // Reset visible count when category changes
  }, [selectedCategory, apiImages]);

  const loadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  const handleImageClick = (image, index) => {
    // Track gallery image view
    track('gallery_image_view', {
      category: category,
      image_id: image._id || image.id,
      image_title: image.title,
      position: index
    });

    // Call the original onImageClick if provided
    if (onImageClick) {
      onImageClick(image, index, filteredImages);
    }
  };

  const visibleImages = filteredImages.slice(0, visibleCount);
  const hasMore = visibleCount < filteredImages.length;

  return (
    <div className="space-y-8">
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {/* Category Filter */}
      {!loading && categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3">
          <AnimatedButton
            variant={selectedCategory === 'all' ? 'primary' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            className="capitalize"
          >
            All ({filteredImages.length})
          </AnimatedButton>
          {categories.map((category) => {
            const count = filteredImages.filter(img => img.category === category.slug).length;
            return (
              <AnimatedButton
                key={category.slug}
                variant={selectedCategory === category.slug ? 'primary' : 'outline'}
                onClick={() => setSelectedCategory(category.slug)}
                className="capitalize"
              >
                {category.name} ({count})
              </AnimatedButton>
            );
          })}
        </div>
      )}

      {/* Gallery Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {visibleImages.map((image, index) => (
              <GalleryItem
                key={`${image._id || image.id}-${selectedCategory}`}
                image={image}
                index={index}
                onClick={() => handleImageClick(image, index)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center">
          <AnimatedButton
            onClick={loadMore}
            variant="outline"
            size="lg"
            className="px-8"
          >
            Load More Images
          </AnimatedButton>
        </div>
      )}

      {/* No Images Message */}
      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
          <p className="text-gray-500">
            {selectedCategory === 'all' 
              ? 'No images available in the gallery.' 
              : `No images found in the "${categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}" category.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

const GalleryItem = ({ image, index, onClick }) => {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  return (
    <motion.div
      ref={elementRef}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ 
        duration: 0.4,
        delay: index * 0.05,
        layout: { duration: 0.3 }
      }}
      className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      {hasIntersected ? (
        <>
          <img
            src={image.url}
            alt={image.title || `Gallery image ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Image Info */}
          {image.title && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h4 className="text-white font-medium text-sm truncate">{image.title}</h4>
              {image.description && (
                <p className="text-white/80 text-xs mt-1 line-clamp-2">{image.description}</p>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <LoadingSpinner size="sm" />
        </div>
      )}
    </motion.div>
  );
};

export default GalleryGrid;
