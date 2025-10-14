import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageSEO from '../components/seo/PageSEO';
import { FaTimes, FaChevronLeft, FaChevronRight, FaSearch, FaHeart, FaCamera } from 'react-icons/fa';
import ApiService from '../services/api';
import { useApi } from '../hooks/useApi';
import AnimatedButton from '../components/ui/AnimatedButton';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch dynamic gallery data from backend
  const { data: galleryData, loading: galleryLoading } = useApi(() => ApiService.getGalleryImages(), []);
  const { data: categoriesData, loading: categoriesLoading } = useApi(() => ApiService.getGalleryCategories(), []);

  // Categories matching original PHP gallery
  const fallbackCategories = [
    { id: 'all', name: 'All Photos', count: 24 },
    { id: 'weddings', name: 'Weddings', count: 8 },
    { id: 'ceremonies', name: 'Ceremonies', count: 6 },
    { id: 'receptions', name: 'Receptions', count: 5 },
    { id: 'venue', name: 'Venue', count: 3 },
    { id: 'gardens', name: 'Gardens', count: 2 }
  ];

  // Gallery images matching original PHP structure
  const fallbackGalleryImages = [
    { id: 1, src: '/images/gallery/gallery1.jpg', category: 'weddings', title: 'Beautiful Wedding Ceremony', description: 'A stunning outdoor wedding ceremony in our botanical garden setting' },
    { id: 2, src: '/images/gallery/gallery2.jpg', category: 'ceremonies', title: 'Outdoor Ceremony Setup', description: 'Elegant ceremony setup with floral arrangements' },
    { id: 3, src: '/images/gallery/gallery3.jpg', category: 'receptions', title: 'Reception Hall', description: 'Our beautifully decorated reception hall' },
    { id: 4, src: '/images/gallery/gallery4.jpg', category: 'venue', title: 'Venue Overview', description: 'Panoramic view of our 4.95-acre venue' },
    { id: 5, src: '/images/gallery/gallery5.jpg', category: 'gardens', title: 'Garden Pathway', description: 'Lush garden pathways perfect for photography' },
    { id: 6, src: '/images/gallery/gallery6.jpg', category: 'weddings', title: 'Wedding Photography', description: 'Professional wedding photography in our gardens' },
    { id: 7, src: '/images/gallery/gallery7.jpg', category: 'ceremonies', title: 'Ceremony Arch', description: 'Beautiful ceremony arch with floral decorations' },
    { id: 8, src: '/images/gallery/gallery8.jpg', category: 'receptions', title: 'Reception Dining', description: 'Elegant dining setup for wedding receptions' },
    { id: 9, src: '/images/gallery/gallery9.jpg', category: 'venue', title: 'Venue Interior', description: 'Interior spaces with natural lighting' },
    { id: 10, src: '/images/gallery/gallery10.jpg', category: 'gardens', title: 'Botanical Gardens', description: 'Our colorful bougainvilleas and bromeliad showroom' },
    { id: 11, src: '/images/banner/banner1.jpg', category: 'venue', title: 'Venue Exterior', description: 'The White Barn FL exterior view' },
    { id: 12, src: '/images/banner/banner2.jpg', category: 'weddings', title: 'Wedding Celebration', description: 'Joyful wedding celebration moments' },
    { id: 13, src: '/images/banner/banner3.jpg', category: 'ceremonies', title: 'Ceremony Moment', description: 'Intimate ceremony moments captured' },
    { id: 14, src: '/images/banner/banner4.jpg', category: 'receptions', title: 'Reception Party', description: 'Lively reception party atmosphere' },
    { id: 15, src: '/images/banner/banner5.jpg', category: 'gardens', title: 'Garden Views', description: 'Scenic garden views throughout the property' },
    { id: 16, src: '/images/banner/banner6.jpg', category: 'venue', title: 'Venue Ambiance', description: 'The perfect ambiance for your special day' },
    { id: 17, src: '/images/event-1.jpg', category: 'weddings', title: 'Wedding Event', description: 'Beautiful wedding event setup' },
    { id: 18, src: '/images/event-2.jpg', category: 'ceremonies', title: 'Special Ceremony', description: 'Special ceremony arrangements' },
    { id: 19, src: '/images/frontimg.jpg', category: 'venue', title: 'Front View', description: 'Front view of our beautiful venue' },
    { id: 20, src: '/images/frontimg2.jpg', category: 'venue', title: 'Venue Entrance', description: 'Welcoming entrance to The White Barn FL' }
  ];

  // Process categories data
  let categories = fallbackCategories;
  if (categoriesData && Array.isArray(categoriesData.data)) {
    categories = [
      { id: 'all', name: 'All Photos', count: categoriesData.data.length },
      ...categoriesData.data.map(cat => ({
        id: cat,
        name: typeof cat === 'string' 
          ? cat.charAt(0).toUpperCase() + cat.slice(1) 
          : 'Category',
        count: 0
      }))
    ];
  }

  // Process gallery images
  let galleryImages = fallbackGalleryImages;
  if (galleryData) {
    try {
      const imagesArray = Array.isArray(galleryData) 
        ? galleryData 
        : (galleryData.data || []);
      
      galleryImages = imagesArray.map((img, index) => ({
        id: img.id || index,
        src: img.path || img.url || `/images/gallery/gallery${index + 1}.jpg`,
        category: img.category || 'uncategorized',
        title: img.title || 'Gallery Image',
        description: img.description || '',
        alt: img.alt || img.title || 'Gallery Image'
      }));
    } catch (error) {
      console.error('Error processing gallery images:', error);
    }
  }

  // Filter images based on category and search
  const filteredImages = galleryImages.filter(img => {
    const matchesCategory = selectedCategory === 'all' || img.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Lightbox functions
  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, filteredImages]);

  return (
    <>
      <PageSEO
        title="Gallery - The White Barn FL | Event Photos & Venue Showcase"
        description="Browse our stunning gallery of events at The White Barn FL. See weddings, corporate events, and celebrations in our beautiful SW Ranches venue."
        canonical="/gallery"
        ogImage="/_og/gallery.jpg"
        schemaProps={{
          name: "The White Barn FL - Gallery",
          description: "Stunning photo gallery showcasing weddings, corporate events, and celebrations at our SW Ranches venue.",
          amenityFeatures: [
            "Professional Photography",
            "Event Documentation",
            "Venue Showcase",
            "Wedding Gallery",
            "Corporate Events"
          ]
        }}
      />
      
      <div className="">
      {/* Page Title Section */}
      <section className="relative py-24 text-black overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/images/background/page-title-bg.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent z-100"></div>
        </div>
        
        <div className="container-custom text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-serif font-bold mb-4"
          >
            Photo Gallery
          </motion.h1>
          <motion.nav
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center items-center space-x-2 text-lg"
          >
            <a href="/" className="hover:text-red-500 transition-colors">Home</a>
            <span>/</span>
            <span>Gallery</span>
          </motion.nav>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="heading-secondary mb-4">Beautiful Memories</h2>
            <p className="text-body max-w-3xl mx-auto">
              Explore our stunning venue through these beautiful photographs showcasing 
              weddings, ceremonies, and events held at The White Barn FL. Each image 
              tells a story of love, celebration, and unforgettable moments in our 
              4.95-acre botanical paradise.
            </p>
          </motion.div>

          {/* Search and Filter Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {/* Search Bar */}
            <div className="flex justify-center mb-6">
              <div className="relative max-w-md w-full">
                <input
                  type="text"
                  placeholder="Search photos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-primary-500 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:transform hover:scale-105'
                  }`}
                >
                  {category.name}
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    {category.count || filteredImages.filter(img => 
                      category.id === 'all' || img.category === category.id
                    ).length}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Gallery Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-4 bg-gray-50 px-6 py-3 rounded-full">
              <div className="flex items-center gap-2">
                <FaCamera className="text-primary-500" />
                <span className="text-sm font-medium">
                  Showing {filteredImages.length} of {galleryImages.length} photos
                </span>
              </div>
              {searchTerm && (
                <div className="flex items-center gap-2">
                  <FaSearch className="text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Results for "{searchTerm}"
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group cursor-pointer relative"
                  onClick={() => openLightbox(image)}
                >
                  <div className="aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = '/images/gallery/gallery1.jpg'; // Fallback image
                        e.target.className = 'w-full h-full object-cover opacity-75';
                      }}
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                        <p className="text-sm opacity-90 capitalize mb-2">
                          {image.category.replace('-', ' ')}
                        </p>
                        {image.description && (
                          <p className="text-xs opacity-75 line-clamp-2">
                            {image.description}
                          </p>
                        )}
                      </div>
                      
                      {/* Heart Icon */}
                      <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <FaHeart className="text-white text-sm" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {filteredImages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="max-w-md mx-auto">
                <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No photos found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm 
                    ? `No photos match "${searchTerm}" in the ${selectedCategory === 'all' ? 'gallery' : selectedCategory} category.`
                    : `No photos found in the ${selectedCategory} category.`
                  }
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="text-primary-500 hover:text-primary-600 font-medium"
                >
                  Clear filters
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 z-10 w-12 h-12 bg-black/70 hover:bg-black rounded-full flex items-center justify-center text-white transition-colors"
                aria-label="Close lightbox"
              >
                <FaTimes className="text-xl" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 -ml-4 bg-black/70 hover:bg-black rounded-full flex items-center justify-center text-white transition-colors"
                aria-label="Previous image"
              >
                <FaChevronLeft className="text-xl" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 -mr-4 bg-black/70 hover:bg-black rounded-full flex items-center justify-center text-white transition-colors"
                aria-label="Next image"
              >
                <FaChevronRight className="text-xl" />
              </button>

              {/* Image Container */}
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                  onError={(e) => {
                    e.target.src = '/images/gallery/gallery1.jpg';
                  }}
                />
              </div>

              {/* Image Info */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm px-6 py-3 rounded-full max-w-2xl">
                <h3 className="text-xl font-semibold text-white text-center mb-1">
                  {selectedImage.title}
                </h3>
                <p className="text-sm text-gray-300 text-center capitalize mb-1">
                  {selectedImage.category.replace('-', ' ')}
                </p>
                {selectedImage.description && (
                  <p className="text-sm text-gray-400 text-center">
                    {selectedImage.description}
                  </p>
                )}
              </div>

              {/* Image Counter */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 px-4 py-2 rounded-full">
                <span className="text-white text-sm">
                  {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} of {filteredImages.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
              Ready to Create Your Own Beautiful Memories?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Book a tour of our venue and see how we can make your special day unforgettable. 
              Experience our 4.95-acre botanical paradise in person.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton 
                variant="primary" 
                size="lg"
                className="btn-primary relative overflow-hidden group"
                onClick={() => window.location.href = '/contact'}
              >
                Schedule a Tour
              </AnimatedButton>
              <AnimatedButton 
                variant="outline" 
                size="lg"
                className="btn-primary bg-white relative overflow-hidden group"
                onClick={() => window.location.href = '/contact'}
              >
                Get Quote
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Gallery;
