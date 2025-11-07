import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSnowflake, FaHeart, FaCar, FaUmbrella, FaChevronDown, FaChevronUp, FaChild } from 'react-icons/fa';
import ContactForm from '../components/forms/ContactForm';
import GalleryGrid from '../components/gallery/GalleryGrid';
import Lightbox from '../components/gallery/Lightbox';
import Map from '../components/map/Map';
import PageSEO from '../components/seo/PageSEO';
import ApiService from '../services/api';
import { track, getUTMParameters } from '../utils/enhancedTracking';

const ShowersFamily = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

  // Track page view on mount
  useEffect(() => {
    track('page_view', {
      page: 'showers_family',
      page_category: 'services',
      ...getUTMParameters()
    });
  }, []);

  // Fetch gallery images
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await ApiService.getGalleryImages('birthday');
        if (response.images && response.images.length > 0) {
          setGalleryImages(response.images);
        } else {
          // Fallback to mixed venue images
          setGalleryImages([
            { _id: '1', url: '/images/gallery/shower-1.jpg', title: 'Baby Shower Setup', category: 'family' },
            { _id: '2', url: '/images/gallery/shower-2.jpg', title: 'Bridal Shower', category: 'family' },
            { _id: '3', url: '/images/gallery/birthday-1.jpg', title: 'Birthday Celebration', category: 'family' },
            { _id: '4', url: '/images/gallery/family-1.jpg', title: 'Family Reunion', category: 'family' },
            { _id: '5', url: '/images/gallery/indoor-1.jpg', title: 'Indoor Setup', category: 'venue' },
            { _id: '6', url: '/images/gallery/outdoor-1.jpg', title: 'Garden Photos', category: 'venue' }
          ]);
        }
      } catch (error) {
        console.error('Error fetching gallery images:', error);
        // Use fallback images on error
        setGalleryImages([
          { _id: '1', url: '/images/gallery/shower-1.jpg', title: 'Baby Shower Setup', category: 'family' },
          { _id: '2', url: '/images/gallery/birthday-1.jpg', title: 'Birthday Celebration', category: 'family' }
        ]);
      }

    };

    fetchGalleryImages();
  }, []);

  // Fetch testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await ApiService.getReviews({ 
          status: 'approved', 
          limit: 3, 
          eventType: 'family' 
        });
        if (response.reviews && response.reviews.length > 0) {
          setTestimonials(response.reviews);
        } else {
          // Fallback testimonials
          setTestimonials([
            {
              _id: '1',
              clientName: 'Maria Rodriguez',
              review: 'Perfect venue for my daughter\'s baby shower! The indoor A/C kept everyone comfortable, and the garden provided beautiful photo opportunities.',
              rating: 5,
              eventType: 'family'
            },
            {
              _id: '2',
              clientName: 'Jennifer Smith',
              review: 'We hosted our family reunion here and it was amazing. The flexible space worked perfectly for both kids and adults.',
              rating: 5,
              eventType: 'family'
            },
            {
              _id: '3',
              clientName: 'Lisa Johnson',
              review: 'The bridal shower was absolutely beautiful. The venue provided the perfect backdrop for our celebration.',
              rating: 5,
              eventType: 'family'
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  const handleBookTourClick = () => {
    track('engagement', {
      engagement_type: 'click',
      element_id: 'book_tour',
      page: 'showers_family'
    });
    
    // Scroll to contact form
    const element = document.getElementById('book-tour');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleImageClick = (image, index, allImages) => {
    setLightboxImages(allImages || []);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const benefits = [
    {
      icon: FaSnowflake,
      title: 'Climate-Controlled Comfort',
      description: 'Indoor A/C ensures your guests of all ages stay comfortable throughout your celebration.'
    },
    {
      icon: FaHeart,
      title: 'Flexible Décor Options',
      description: 'Beautiful neutral space that adapts to any theme, color scheme, or decorative vision you have.'
    },
    {
      icon: FaChild,
      title: 'Family-Friendly Access',
      description: 'Easy accessibility for elderly family members, children, and guests with mobility needs.'
    },
    {
      icon: FaUmbrella,
      title: 'Rain-Safe Indoor Plan',
      description: 'Never worry about weather with our beautiful indoor space as your backup plan.'
    }
  ];

  const faqs = [
    {
      question: 'How long can we use the venue for family events?',
      answer: 'Our standard family event package includes 6 hours of venue access. This typically covers setup, event time, and cleanup. Extended hours can be arranged for an additional fee.'
    },
    {
      question: 'What are the decoration rules and restrictions?',
      answer: 'You can bring your own decorations with some guidelines: no nails or screws in walls, no open flames, and all decorations must be removed after the event. We provide tables, chairs, and basic lighting.'
    },
    {
      question: 'Can we bring our own catering and desserts?',
      answer: 'Absolutely! You can bring your own caterer, order from restaurants, or even do potluck-style. We have a prep kitchen available and can coordinate with your chosen vendors.'
    },
    {
      question: 'Is the venue suitable for children and families?',
      answer: 'Yes! Our venue is very family-friendly with safe indoor and outdoor spaces. The climate-controlled environment is perfect for guests of all ages, and we have ample parking for families.'
    },
    {
      question: 'What\'s included in the venue rental?',
      answer: 'Rental includes tables, chairs, basic lighting, sound system, restrooms, and exclusive use of the venue. You can add linens, decorations, catering, and entertainment as needed.'
    }
  ];

  return (
    <>
      <PageSEO
        title="Baby & Bridal Shower Venue South Florida | Indoor A/C + Garden Photo Spots"
        description="Beautiful indoor/outdoor spaces for showers, birthdays & family events. Easy parking. Flexible packages."
        canonical="/showers-family"
        ogImage="/_og/showers-family.jpg"
        schemaProps={{
          name: "The White Barn FL - Shower & Family Event Venue",
          description: "Beautiful indoor/outdoor spaces for showers, birthdays & family events. Easy parking. Flexible packages.",
          amenityFeatures: [
            "Air Conditioning",
            "Indoor/Outdoor Spaces",
            "Garden Photo Spots",
            "Parking Available",
            "Family-Friendly",
            "Flexible Packages"
          ]
        }}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        {/* <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url("/images/hero/family-hero.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6"
            >
              Celebrate Life's Precious Moments
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            >
              Cozy and photogenic spaces perfect for baby showers, bridal showers, birthdays, and family gatherings
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onClick={handleBookTourClick}
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Plan Your Celebration
            </motion.button>
          </div>
        </section> */}
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
              Celebrate Life's Precious Moments
            </motion.h1>
            <motion.nav
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center items-center space-x-2 text-lg"
            >
              <a href="/" className="hover:text-red-500 transition-colors">Home</a>
              <span>/</span>
              <span>Showers & Family</span>
            </motion.nav>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Perfect for Family Celebrations
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Create lasting memories in a comfortable, beautiful setting designed for intimate gatherings
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                  className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Family Event Gallery
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See how we've helped families celebrate their special moments
              </p>
            </motion.div>

            <GalleryGrid 
              fallbackImages={galleryImages}
              onImageClick={handleImageClick}
              category="family"
            />

            <Lightbox
              images={lightboxImages}
              currentIndex={currentImageIndex}
              isOpen={lightboxOpen}
              onClose={() => setLightboxOpen(false)}
              onNext={(index) => setCurrentImageIndex(index)}
              onPrev={(index) => setCurrentImageIndex(index)}
            />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                What Families Say
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real experiences from families who celebrated with us
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                  className="bg-gray-50 p-6 rounded-lg"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "{testimonial.review}"
                  </p>
                  <p className="font-semibold text-gray-900">
                    {testimonial.clientName}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about hosting your family event
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white rounded-lg shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    {openFaq === index ? (
                      <FaChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <FaChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Easy to Find & Access
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Convenient location with plenty of parking for your family and friends
              </p>
            </motion.div>

            <div className="rounded-lg overflow-hidden shadow-lg h-96">
              <Map address="4680 SW 148th Ave, Fort Lauderdale, FL 33330" />
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="book-tour" className="py-16 px-4 bg-pink-50">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Plan Your Family Celebration
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Ready to create beautiful memories? Contact us to schedule a tour and discuss your special event
              </p>
            </motion.div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <ContactForm 
                source="showers_family" 
                isFooter={false}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ShowersFamily;
