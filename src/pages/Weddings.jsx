import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaCar, FaLeaf, FaSnowflake, FaChevronDown, FaChevronUp, FaArrowRight, FaBuilding, FaHeart } from 'react-icons/fa';
import ContactForm from '../components/forms/ContactForm';
import GalleryGrid from '../components/gallery/GalleryGrid';
import Lightbox from '../components/gallery/Lightbox';
import Map from '../components/map/Map';
import PageSEO from '../components/seo/PageSEO';
import ApiService from '../services/api';
import { track, getUTMParameters } from '../utils/enhancedTracking';

const Weddings = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]); // For lightbox

  // Track page view on mount
  useEffect(() => {
    track('page_view', {
      page: 'weddings',
      page_category: 'services',
      ...getUTMParameters()
    });
    
  }, []);

  // Gallery images will be handled by GalleryGrid component

  // Fetch testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await ApiService.getReviews({ 
          status: 'approved', 
          limit: 3, 
          eventType: 'wedding' 
        });
        if (response.reviews && response.reviews.length > 0) {
          setTestimonials(response.reviews);
        } else {
          // Fallback testimonials
          setTestimonials([
            {
              _id: '1',
              clientName: 'Sarah & Michael',
              review: 'The White Barn FL exceeded all our expectations! The indoor A/C was a lifesaver during our summer wedding, and the rustic charm was absolutely perfect.',
              rating: 5,
              eventType: 'wedding'
            },
            {
              _id: '2',
              clientName: 'Jessica & David',
              review: 'From the moment we walked in, we knew this was our venue. The staff was incredible and the space was exactly what we dreamed of.',
              rating: 5,
              eventType: 'wedding'
            },
            {
              _id: '3',
              clientName: 'Amanda & Chris',
              review: 'Perfect venue for our intimate wedding. The combination of indoor comfort and outdoor beauty made our day magical.',
              rating: 5,
              eventType: 'wedding'
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
      page: 'weddings'
    });
    
    // Scroll to contact form
    const element = document.getElementById('book-tour');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleImageClick = (image, index, allImages) => {
    setGalleryImages(allImages || []); // Update images for lightbox
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const benefits = [
    {
      icon: FaSnowflake,
      title: 'Indoor A/C Comfort',
      description: 'Climate-controlled indoor space ensures your guests stay comfortable year-round, regardless of Florida weather.'
    },
    {
      icon: FaLeaf,
      title: 'Garden + Barn Elegance',
      description: 'Beautiful combination of rustic barn charm with lush garden views for the perfect wedding atmosphere.'
    },
    {
      icon: FaCheck,
      title: 'One Event Per Day',
      description: 'Your wedding is our only focus. Exclusive use of the venue ensures personalized attention and privacy.'
    },
    {
      icon: FaCar,
      title: 'Easy Parking',
      description: 'Ample on-site parking for all your guests, making arrival and departure stress-free.'
    }
  ];

  const faqs = [
    {
      question: 'What is the capacity of your venue?',
      answer: 'Our venue can accommodate up to 150 guests for seated dinners and up to 200 for cocktail-style receptions. We offer flexible seating arrangements to match your vision.'
    },
    {
      question: 'Do you have both indoor and outdoor options?',
      answer: 'Yes! We offer a climate-controlled indoor barn with rustic charm, plus beautiful garden areas for outdoor ceremonies. You can have the best of both worlds with our indoor/outdoor flow.'
    },
    {
      question: 'What catering options are available?',
      answer: 'We work with preferred catering partners who know our venue well, or you can bring your own caterer. Our kitchen facilities can accommodate various catering needs and styles.'
    },
    {
      question: 'What happens if there\'s bad weather?',
      answer: 'Our indoor barn provides a beautiful backup plan for any weather concerns. The space is fully climate-controlled and can accommodate your entire event indoors if needed.'
    },
    {
      question: 'What\'s included in the venue rental?',
      answer: 'Rental includes tables, chairs, basic lighting, sound system, bridal suite, groom\'s area, and exclusive use of the venue for your event day. Linens, decorations, and catering are additional.'
    }
  ];

  return (
    <>
      <PageSEO
        title="Wedding Venue in Fort Lauderdale | Indoor A/C + Garden Barn"
        description="Elegant indoor A/C barn + gardens near Miami & Broward. Private tours, flexible packages."
        canonical="/weddings"
        ogImage="/_og/weddings.jpg"
        schemaProps={{
          name: "The White Barn FL - Wedding Venue",
          description: "Elegant indoor A/C barn + gardens near Miami & Broward. Private tours, flexible packages.",
          address: {
            streetAddress: "4680 SW 148th Ave",
            addressLocality: "Fort Lauderdale",
            addressRegion: "FL",
            postalCode: "33330",
            addressCountry: "US"
          },
          amenityFeatures: [
            "Air Conditioning",
            "Parking Available",
            "Garden Views",
            "Bridal Suite",
            "Audio/Visual Equipment",
            "Indoor Venue"
          ]
        }}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
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
              Your Dream Wedding
            </motion.h1>
            {/* <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            >
              Elegant indoor A/C barn with beautiful gardens in the heart of Fort Lauderdale
            </motion.p> */}
            <motion.nav
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center items-center space-x-2 text-lg"
            >
              <a href="/" className="hover:text-red-500 transition-colors">Home</a>
              <span>/</span>
              <span>Wedding</span>
            </motion.nav>
            {/* <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={handleBookTourClick}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Schedule Your Tour
            </motion.button> */}
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
                Why Choose The White Barn FL
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experience the perfect blend of rustic charm and modern comfort for your special day
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
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-amber-600" />
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
                Wedding Gallery
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See how beautiful your wedding can be at The White Barn FL
              </p>
            </motion.div>

            <GalleryGrid 
              onImageClick={handleImageClick}
              category="wedding"
              fallbackImages={[
                { _id: '1', url: '/images/gallery/gallery1.jpg', title: 'Ceremony Setup', category: 'wedding' },
                { _id: '2', url: '/images/gallery/gallery2.jpg', title: 'Reception Hall', category: 'wedding' },
                { _id: '3', url: '/images/gallery/gallery3.jpg', title: 'Garden Views', category: 'wedding' },
                { _id: '4', url: '/images/gallery/gallery4.jpg', title: 'Bridal Suite', category: 'wedding' },
                { _id: '5', url: '/images/gallery/gallery5.jpg', title: 'Dance Floor', category: 'wedding' },
                { _id: '6', url: '/images/gallery/gallery6.jpg', title: 'Outdoor Ceremony', category: 'wedding' }
              ]}
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
                What Our Couples Say
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real experiences from couples who celebrated their special day with us
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
                Everything you need to know about planning your wedding at The White Barn FL
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
                Visit Our Venue
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Conveniently located in Fort Lauderdale, easily accessible from Miami and Broward County
              </p>
            </motion.div>

            <div className="rounded-lg overflow-hidden shadow-lg h-96">
              <Map address="4680 SW 148th Ave, Fort Lauderdale, FL 33330" />
            </div>
          </div>
        </section>

        {/* Related Services Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                Explore Our Other Services
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover more ways The White Barn FL can host your special events
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-center">
                  <FaSnowflake className="text-4xl text-primary-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Indoor A/C Venue</h3>
                  <p className="text-gray-600 mb-4">
                    Climate-controlled comfort year-round with beautiful garden views
                  </p>
                  <a 
                    href="/indoor-ac" 
                    className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium"
                  >
                    Learn More <FaArrowRight className="ml-2" />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-center">
                  <FaBuilding className="text-4xl text-primary-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Corporate Events</h3>
                  <p className="text-gray-600 mb-4">
                    Professional venue for meetings, parties, and corporate gatherings
                  </p>
                  <a 
                    href="/corporate" 
                    className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium"
                  >
                    Learn More <FaArrowRight className="ml-2" />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-center">
                  <FaHeart className="text-4xl text-primary-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Showers & Family Events</h3>
                  <p className="text-gray-600 mb-4">
                    Perfect intimate setting for baby showers, bridal showers, and celebrations
                  </p>
                  <a 
                    href="/showers-family" 
                    className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium"
                  >
                    Learn More <FaArrowRight className="ml-2" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="book-tour" className="py-16 px-4 bg-amber-50">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Schedule Your Private Tour
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Ready to see your dream wedding venue? Contact us to schedule a private tour and discuss your special day
              </p>
            </motion.div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <ContactForm 
                source="weddings" 
                isFooter={false}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Weddings;
