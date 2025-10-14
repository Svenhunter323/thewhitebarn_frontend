import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSnowflake, FaThermometerHalf, FaVolumeUp, FaWheelchair, FaChevronDown, FaChevronUp, FaArrowRight, FaCamera, FaMusic } from 'react-icons/fa';
import ContactForm from '../components/forms/ContactForm';
import GalleryGrid from '../components/gallery/GalleryGrid';
import Lightbox from '../components/gallery/Lightbox';
import Map from '../components/map/Map';
import PageSEO from '../components/seo/PageSEO';
import ApiService from '../services/api';
import { track, getUTMParameters } from '../utils/enhancedTracking';

const IndoorAC = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  // Track page view on mount
  useEffect(() => {
    track('page_view', {
      page: 'indoor_ac',
      page_category: 'services',
      ...getUTMParameters()
    });
  }, []);

  // Fetch gallery images - focus on indoor/venue images
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await ApiService.getGalleryImages('indoor');
        if (response.images && response.images.length > 0) {
          setGalleryImages(response.images);
        } else {
          // Fallback to venue/indoor focused images
          setGalleryImages([
            { _id: '1', url: '/images/gallery/indoor-1.jpg', title: 'Main Hall Interior', category: 'indoor' },
            { _id: '2', url: '/images/gallery/indoor-2.jpg', title: 'Climate Control System', category: 'indoor' },
            { _id: '3', url: '/images/gallery/indoor-3.jpg', title: 'Reception Setup', category: 'indoor' },
            { _id: '4', url: '/images/gallery/indoor-4.jpg', title: 'Ceremony Space', category: 'indoor' },
            { _id: '5', url: '/images/gallery/indoor-5.jpg', title: 'Bridal Suite', category: 'indoor' },
            { _id: '6', url: '/images/gallery/venue-1.jpg', title: 'Indoor-Outdoor Flow', category: 'venue' }
          ]);
        }
      } catch (error) {
        console.error('Error fetching gallery images:', error);
        // Use fallback images on error
        setGalleryImages([
          { _id: '1', url: '/images/gallery/indoor-1.jpg', title: 'Main Hall Interior', category: 'indoor' },
          { _id: '2', url: '/images/gallery/indoor-2.jpg', title: 'Climate Control System', category: 'indoor' }
        ]);
      }
    };

    fetchGalleryImages();
  }, []);

  const handleBookTourClick = () => {
    track('engagement', {
      engagement_type: 'click',
      element_id: 'book_tour',
      page: 'indoor_ac'
    });
    
    // Scroll to contact form
    const element = document.getElementById('book-tour');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleImageClick = (image, index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const benefits = [
    {
      icon: FaThermometerHalf,
      title: 'Temperature Control',
      description: 'Maintain perfect comfort year-round with our advanced climate control system, keeping your event at the ideal temperature.'
    },
    {
      icon: FaSnowflake,
      title: 'Weather-Proof Plan',
      description: 'Rain or shine, your event continues seamlessly with our fully enclosed, climate-controlled indoor space.'
    },
    {
      icon: FaWheelchair,
      title: 'Comfort for All Ages',
      description: 'Elderly guests and children stay comfortable in our controlled environment, ensuring everyone enjoys your celebration.'
    },
    {
      icon: FaVolumeUp,
      title: 'Noise Control',
      description: 'Indoor acoustics provide better sound quality for speeches, music, and conversations without weather interference.'
    }
  ];

  const eventFlow = [
    {
      step: 'Ceremony',
      icon: FaMusic,
      description: 'Begin your celebration in our beautiful indoor ceremony space with perfect acoustics and climate control.',
      features: ['Climate-controlled comfort', 'Professional sound system', 'Elegant lighting', 'Flexible seating arrangements']
    },
    {
      step: 'Reception',
      icon: FaArrowRight,
      description: 'Seamlessly transition to the reception area within the same comfortable indoor environment.',
      features: ['Open floor plan', 'Dance floor space', 'Bar area setup', 'Dining configurations']
    },
    {
      step: 'Photos',
      icon: FaCamera,
      description: 'Capture memories both indoors and in our beautiful outdoor garden spaces for variety.',
      features: ['Indoor portrait areas', 'Garden photo opportunities', 'Covered outdoor spaces', 'Natural lighting options']
    }
  ];

  const faqs = [
    {
      question: 'What temperature is maintained in the indoor space?',
      answer: 'We maintain a comfortable 72-75°F (22-24°C) throughout your event. The temperature can be adjusted based on your preferences and the size of your guest list.'
    },
    {
      question: 'What happens if it rains during our event?',
      answer: 'Rain is never a concern! Our entire venue can operate completely indoors. We can move any planned outdoor activities inside while maintaining the same beautiful atmosphere and flow.'
    },
    {
      question: 'Are there noise restrictions for indoor events?',
      answer: 'Our indoor space provides excellent sound control. Music and celebrations can continue at comfortable levels without disturbing neighbors, and our acoustics enhance rather than muffle your event sounds.'
    },
    {
      question: 'Is the venue accessible for guests with mobility needs?',
      answer: 'Yes! Our indoor space is fully ADA compliant with wheelchair accessibility, accessible restrooms, and no steps or barriers. The climate-controlled environment is especially comfortable for elderly guests.'
    },
    {
      question: 'Can we still use outdoor spaces if we book the indoor venue?',
      answer: 'Absolutely! The indoor/outdoor flow is one of our key features. You can use our gardens for photos, cocktail hour, or ceremony while having the indoor space as your main area and backup plan.'
    }
  ];

  return (
    <>
      <PageSEO
        title="Indoor A/C Event Venue | South Florida Barn + Garden"
        description="Stay cool year-round. Climate-controlled barn with outdoor photo gardens. Private tours available."
        canonical="/indoor-ac"
        ogImage="/_og/indoor-ac.jpg"
        schemaProps={{
          name: "The White Barn FL - Indoor A/C Venue",
          description: "Stay cool year-round. Climate-controlled barn with outdoor photo gardens. Private tours available.",
          amenityFeatures: [
            "Air Conditioning",
            "Climate Control",
            "Indoor Venue",
            "Garden Views",
            "Photo Opportunities",
            "Year-Round Availability"
          ]
        }}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        {/* <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url("/images/hero/indoor-hero.jpg")',
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
              Indoor Comfort, Outdoor Beauty
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            >
              Climate-controlled barn with beautiful garden spaces. Perfect for year-round events in South Florida's unpredictable weather.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onClick={handleBookTourClick}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Tour Our Indoor Venue
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
              Indoor Comfort, Outdoor Beauty
            </motion.h1>
            <motion.nav
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center items-center space-x-2 text-lg"
            >
              <a href="/" className="hover:text-red-500 transition-colors">Home</a>
              <span>/</span>
              <span>Indoor & AC</span>
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
                Why Choose Indoor Climate Control
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Enjoy the beauty of a barn venue with the comfort and reliability of modern climate control
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
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-green-600" />
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

        {/* Event Flow Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Your Event Flow
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Seamless transitions from ceremony to reception to photos, all within our climate-controlled comfort
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {eventFlow.map((flow, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <flow.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {flow.step}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {flow.description}
                  </p>
                  <ul className="space-y-2">
                    {flow.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Indoor Venue Gallery
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our climate-controlled interior spaces and see the elegant barn atmosphere
              </p>
            </motion.div>

            <GalleryGrid 
              images={galleryImages}
              onImageClick={handleImageClick}
            />

            <Lightbox
              images={galleryImages}
              currentIndex={currentImageIndex}
              isOpen={lightboxOpen}
              onClose={() => setLightboxOpen(false)}
              onNext={(index) => setCurrentImageIndex(index)}
              onPrev={(index) => setCurrentImageIndex(index)}
            />
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
                Everything you need to know about our indoor climate-controlled venue
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
                Visit Our Climate-Controlled Venue
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experience the comfort and beauty of our indoor venue in person
              </p>
            </motion.div>

            <div className="rounded-lg overflow-hidden shadow-lg h-96">
              <Map address="4680 SW 148th Ave, Fort Lauderdale, FL 33330" />
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="book-tour" className="py-16 px-4 bg-green-50">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Experience Indoor Comfort
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Ready to see how our climate-controlled venue can make your event perfect? Schedule a private tour today.
              </p>
            </motion.div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <ContactForm 
                source="indoor_ac" 
                isFooter={false}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default IndoorAC;
