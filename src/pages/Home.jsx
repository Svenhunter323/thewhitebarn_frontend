import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight, FaTimes, FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ApiService from '../services/api';
import { useApi } from '../hooks/useApi';
import FlowerAnimation from '../components/ui/FlowerAnimation';
import AnimatedButton from '../components/ui/AnimatedButton';

const Home = () => {
  // State for image viewer
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch dynamic content from backend
  const { data: homeDetails, loading: homeLoading } = useApi(() => ApiService.getHomeDetails(), []);
  const { data: apiGalleryImages, loading: galleryLoading } = useApi(() => ApiService.getGalleryImages(), []);
  const { data: contactDetails, loading: contactLoading } = useApi(() => ApiService.getContactDetails(), []);

  // Fallback banner images if API fails
  const fallbackBannerImages = [
    '/images/banner/banner1.jpg',
    '/images/banner/banner2.jpg',
    '/images/banner/banner3.jpg',
    '/images/banner/banner4.jpg',
    '/images/banner/banner5.jpg',
    '/images/banner/banner6.jpg'
  ];

  // Use API data or fallback
  const bannerImages = Array.isArray(apiGalleryImages) 
    ? apiGalleryImages.slice(0, 6).map(img => img.src || img.imageUrl) 
    : fallbackBannerImages;

  const services = [
    {
      title: 'Wedding Receptions',
      description: 'Celebrate your love in an elegant setting, with our spacious venue perfect for a beautiful reception.',
      image: '/images/service4-1.jpg'
    },
    {
      title: 'Corporate Events',
      description: 'Host your next business gathering in style, whether it\'s a meeting, seminar, or team-building event.'
    },
    {
      title: 'Private Parties',
      description: 'From birthday parties to anniversaries, our venue provides the ideal backdrop for intimate gatherings.'
    },
    {
      title: 'Social Gatherings',
      description: 'Whether it\'s a family reunion, baby shower, or bridal shower, we offer a warm and welcoming space.',
      image: '/images/service4-2.jpg'
    }
  ];

  // Fallback gallery images for preview section
  const fallbackGalleryImages = [
    '/images/gallery/gallery1.jpg',
    '/images/gallery/gallery2.jpg',
    '/images/gallery/gallery3.jpg',
    '/images/gallery/gallery4.jpg',
    '/images/gallery/gallery5.jpg',
    '/images/gallery/gallery6.jpg'
  ];

  // Use API data or fallback for gallery preview
  const galleryPreviewImages = apiGalleryImages?.data?.images?.slice(6, 12).map(img => img.imageUrl) || fallbackGalleryImages;

  const marqueeItems = ['Wedding', 'Party', 'Decoration', 'Catering'];

  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative min-h-[calc(30vh-6rem)] pt-24 md:pt-32 flex items-center overflow-hidden bg-cover bg-center" 
        style={{ backgroundImage: 'url("/images/backgrounds/hero-bg.jpg")' }}>
        {/* Flower Animations */}
        <div className="absolute inset-0 overflow-hidden">
          <FlowerAnimation />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-cinzel font-semibold text-gray-900 mb-6"
              style={{
                fontFamily: "'Cinzel', serif",
                fontWeight: 600,
                lineHeight: 1.2,
                letterSpacing: '0.5px'
              }}
            >
              {homeDetails?.data?.heroTitle || "Welcome to The White Barn FL"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 500,
                lineHeight: 1.7,
                letterSpacing: '0.3px'
              }}
            >
              {homeDetails?.data?.heroDescription || "No matter your dreams, we are here to help you create the perfect event at our venue."}
            </motion.p>
            
            {/* Flower decorations */}
            <div className="relative w-full h-40 mt-8">
              {/* Centered zooming flower */}
              <div className="absolute left-1/2 -translate-x-1/2">
                <motion.div 
                  className="relative w-[376px] h-[97px] z-0"
                  variants={{
                    animate: {
                      scale: [0.9, 1.1],
                      transition: {
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: "easeInOut"
                      }
                    }
                  }}
                  animate="animate"
                >
                  <img 
                    src="/images/icons/icon-flower-26.png" 
                    alt="Floral decoration" 
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </div>
              
              {/* Right flower with rotation animation */}
              <motion.div 
                className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[100px] h-[100px] z-0"
                initial={{ opacity: 0, x: 50 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ 
                  x: { duration: 0.8, ease: "easeOut" },
                  rotate: { 
                    duration: 15, 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    ease: "easeInOut" 
                  }
                }}
              >
                <img 
                  src="/images/icons/icon-flower-27.png" 
                  alt="Floral decoration" 
                  className="w-full h-full object-contain"
                  style={{ transform: 'scaleX(-1)' }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Slider Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                prevEl: '.swiper-button-prev-custom',
                nextEl: '.swiper-button-next-custom',
              }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000 }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 }
              }}
              className="gallery-swiper"
            >
              {bannerImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="aspect-[4/3] overflow-hidden group cursor-pointer"
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setIsViewerOpen(true);
                    }}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      <img
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation */}
            <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
              <FaChevronLeft className="text-primary-500" />
            </button>
            <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
              <FaChevronRight className="text-primary-500" />
            </button>
          </div>
        </div>
      </section>

      {/* Fullscreen Image Viewer */}
      {isViewerOpen && (
        <div className="fixed inset-0 z-50">
          {/* Clickable mask - full screen with semi-transparent background */}
          <div 
            className="fixed inset-0 bg-black/80 z-40"
            onClick={() => setIsViewerOpen(false)}
            aria-label="Close image viewer"
          />
          
          {/* Close button - positioned above the mask */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsViewerOpen(false);
            }}
            className="absolute top-4 right-4 text-white text-2xl hover:text-primary-500 transition-colors z-50"
            aria-label="Close"
          >
            <FaTimes />
          </button>
          
          {/* Image container - centered with max dimensions */}
          <div 
            className="relative w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-w-full max-h-full z-50">
              <img
                src={bannerImages[currentImageIndex]}
                alt={`Gallery ${currentImageIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain"
              />
              
              {/* Navigation Arrows - only show if multiple images */}
              {bannerImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) => (prev === 0 ? bannerImages.length - 1 : prev - 1));
                    }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white text-4xl transition-colors -translate-x-12"
                    aria-label="Previous image"
                  >
                    <FaChevronCircleLeft />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1));
                    }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white text-4xl transition-colors translate-x-12"
                    aria-label="Next image"
                  >
                    <FaChevronCircleRight />
                  </button>
                </>
              )}
              
              {/* Image counter */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-1 rounded-full text-sm mb-4">
                {currentImageIndex + 1} / {bannerImages.length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary-500 font-medium uppercase tracking-wider text-sm">
                {homeDetails?.data?.aboutSection?.subtitle || "WELCOME TO THE WHITE BARN FL"}
              </span>
              <h2 className="heading-secondary mt-4 mb-6">
                {homeDetails?.data?.aboutSection?.title || "Host Your Beautiful Event with Us"}
              </h2>
              <p className="text-body mb-8">
                {homeDetails?.data?.aboutSection?.description || "A family-owned business with 4.95 acres of botanical paradise immersed with colorful gardens with lush beautiful flowers and trees, in the heart of the equestrian town of sw ranches. This upscale and unique nursery specializes in an assortment of colorful bougainvilleas, and in addition, includes the indoor plant showroom for an assortment of bromeliads."}
              </p>
              
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h4 className="text-xl font-semibold mb-3 text-gray-900">Venue:</h4>
                <p className="text-gray-600">
                  Venue involves the coordination of every detail of events such as meetings, conventions, 
                  trade shows, ceremony, retreats, or parties.
                </p>
              </div>

              <AnimatedButton
                className="btn-primary relative overflow-hidden group"
                variant="primary"
                size="lg"
                hoverEffect={true}
                fullWidth={false}
              >
                <span className="relative z-10">Book an Appointment</span>
              </AnimatedButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/images/frontimg.jpg"
                  alt="Venue"
                  className="shadow-lg"
                />
                <img
                  src="/images/frontimg2.jpg"
                  alt="Venue"
                  className="shadow-lg mt-8"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-primary-500 font-medium uppercase tracking-wider text-sm">
              {homeDetails?.data?.servicesSection?.subtitle || "WEDDING SERVICES FOR YOU"}
            </span>
            <h2 
              className="text-4xl md:text-4xl font-semibold text-gray-900 mt-4"
              style={{
                fontFamily: "'Cinzel', serif",
                fontWeight: 600,
                lineHeight: 1.2,
                letterSpacing: '0.5px'
              }}
            >
              {homeDetails?.data?.servicesSection?.title || "Create Unforgettable Moments at Our Venue"}
            </h2>
            <p 
              className="text-4xl md:text-4xl font-semibold text-gray-900 mb-6"
              style={{
                fontFamily: "'Cinzel', serif",
                fontWeight: 600,
                lineHeight: 1.7,
                letterSpacing: '0.3px'
              }}
            >
              {homeDetails?.data?.servicesSection?.description || "Your Perfect Day, Our Beautiful Space"}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`${service.image ? 'lg:col-span-1' : ''}`}
              >
                {service.image ? (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="bg-gray-50 p-8 rounded-lg h-full flex flex-col justify-center border border-solid border-gray-400">
                    <h4 
                      className="text-xl font-semibold mb-4 text-gray-900"
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontWeight: 700,
                        lineHeight: 1.7,
                        letterSpacing: '0.3px'
                      }}
                    >
                      {service.title}
                    </h4>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-12 bg-white overflow-hidden border-t border-b border-solid border-gray-300">
        <div className="marquee-container">
          <div className="marquee-content">
            {[...Array(3)].map((_, groupIndex) => (
              <div key={groupIndex} className="marquee-group">
                {marqueeItems.map((item, index) => (
                  <div key={index} className="marquee-item">
                    <span className="marquee-text">{item}</span>
                    <span className="marquee-divider"></span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -z-10"></div>
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row">
            {/* Contact Information */}
            <div className="lg:w-1/3 mb-12 lg:mb-0 lg:pr-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <span className="text-sm font-medium text-primary-500 uppercase tracking-wider">
                  Need any help?
                </span>
                <h2 className="text-4xl font-serif font-bold mt-2 mb-6">
                  Get in touch with us
                </h2>
                <p className="text-gray-600 mb-8">
                  The White Barn FL is a charming, family-owned botanical venue in Southwest Ranches, Florida. 
                  Set on 5 scenic acres, it offers a rustic yet refined space for weddings, events, and celebrations.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary-50 p-3 rounded-full text-primary-500 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Email Us</h4>
                      <a href="mailto:contact@thewhitebarnfl.com" className="text-gray-600 hover:text-primary-500 transition-colors">
                        contact@thewhitebarnfl.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary-50 p-3 rounded-full text-primary-500 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Call Us</h4>
                      <a href="tel:+15613762855" className="text-gray-600 hover:text-primary-500 transition-colors">
                        (561) 376-2855
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary-50 p-3 rounded-full text-primary-500 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Our Location</h4>
                      <p className="text-gray-600">4680 SW 148th Ave. Fort Lauderdale, FL 33330</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:w-2/3 bg-white p-8 lg:p-12 shadow-lg rounded-lg">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h3>
                <p className="text-gray-600 mb-8">Ready to plan your perfect event? Send us a message and we'll get back to you within 24 hours.</p>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="event-type" className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                    <select
                      id="event-type"
                      name="event-type"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white"
                    >
                      <option value="">Select an event type</option>
                      <option value="wedding">Wedding</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="birthday">Birthday Party</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Tell us about your event..."
                      required
                    ></textarea>
                  </div>
                  
                  <motion.div className="w-full">
                    <motion.button
                      type="submit"
                      className="btn-primary relative overflow-hidden group"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                      }}
                      whileTap={{ 
                        scale: 0.98,
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 10
                      }}
                    >
                      <span className="relative z-10">Send Message</span>
                      <motion.span 
                        className="absolute inset-0 bg-white/20 -left-full group-hover:left-0 transition-all duration-700 ease-in-out z-0"
                        initial={{ left: '-100%' }}
                      />
                    </motion.button>
                  </motion.div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
