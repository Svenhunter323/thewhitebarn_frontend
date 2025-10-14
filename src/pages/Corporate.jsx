import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMicrophone, FaCar, FaSnowflake, FaChevronDown, FaChevronUp, FaBuilding } from 'react-icons/fa';
import ContactForm from '../components/forms/ContactForm';
import GalleryGrid from '../components/gallery/GalleryGrid';
import PageSEO from '../components/seo/PageSEO';
import Lightbox from '../components/gallery/Lightbox';
import Map from '../components/map/Map';
import ApiService from '../services/api';
import { track, getUTMParameters, trackBookTour } from '../utils/enhancedTracking';

const Corporate = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  // Track page view on mount
  useEffect(() => {
    track('page_view', {
      page: 'corporate',
      page_category: 'services',
      ...getUTMParameters()
    });
  }, []);

  // Fetch gallery images
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await ApiService.getGalleryImages('corporate');
        if (response.images && response.images.length > 0) {
          setGalleryImages(response.images);
        } else {
          // Fallback to local images
          setGalleryImages([
            { _id: '1', url: '/images/gallery/corporate-1.jpg', title: 'Conference Setup', category: 'corporate' },
            { _id: '2', url: '/images/gallery/corporate-2.jpg', title: 'Team Meeting', category: 'corporate' },
            { _id: '3', url: '/images/gallery/corporate-3.jpg', title: 'Holiday Party', category: 'corporate' },
            { _id: '4', url: '/images/gallery/corporate-4.jpg', title: 'Networking Event', category: 'corporate' },
            { _id: '5', url: '/images/gallery/corporate-5.jpg', title: 'Product Launch', category: 'corporate' },
            { _id: '6', url: '/images/gallery/corporate-6.jpg', title: 'Training Session', category: 'corporate' }
          ]);
        }
      } catch (error) {
        console.error('Error fetching gallery images:', error);
        // Use fallback images on error
        setGalleryImages([
          { _id: '1', url: '/images/gallery/corporate-1.jpg', title: 'Conference Setup', category: 'corporate' },
          { _id: '2', url: '/images/gallery/corporate-2.jpg', title: 'Team Meeting', category: 'corporate' }
        ]);
      }
    };

    fetchGalleryImages();
  }, []);

  const handleBookTourClick = (packageType = 'corporate') => {
    trackBookTour(packageType);
    
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
      icon: FaMicrophone,
      title: 'A/V Ready',
      description: 'Professional sound system, microphones, projector, and presentation equipment included for seamless presentations.'
    },
    {
      icon: FaSnowflake,
      title: 'Indoor Comfort',
      description: 'Climate-controlled environment ensures your team stays comfortable and focused throughout your event.'
    },
    {
      icon: FaBuilding,
      title: 'Flexible Layouts',
      description: 'Adaptable space configurations for meetings, training sessions, networking events, and holiday parties.'
    },
    {
      icon: FaCar,
      title: 'Easy Access & Parking',
      description: 'Convenient load-in/load-out access with ample parking for all attendees and vendors.'
    }
  ];

  const packages = [
    {
      title: 'Weekday Offsite',
      description: 'Perfect for team meetings, training sessions, and strategic planning days.',
      features: ['8-hour venue access', 'A/V equipment included', 'Flexible seating arrangements', 'Catering coordination'],
      cta: 'Plan Your Offsite'
    },
    {
      title: 'Evening Mixer',
      description: 'Ideal for networking events, client appreciation, and team celebrations.',
      features: ['4-hour evening access', 'Bar setup available', 'Cocktail-style layout', 'Ambient lighting'],
      cta: 'Book Your Mixer'
    },
    {
      title: 'Holiday Party',
      description: 'Celebrate the season with your team in style and comfort.',
      features: ['Full day access', 'Festive decorations', 'DJ/entertainment space', 'Photo opportunities'],
      cta: 'Plan Holiday Party'
    }
  ];

  const faqs = [
    {
      question: 'What is the capacity for corporate events?',
      answer: 'Our venue can accommodate 50-200 guests depending on the setup. Theater-style seating for 150, classroom setup for 100, or cocktail reception for up to 200 people.'
    },
    {
      question: 'What A/V equipment is included?',
      answer: 'We provide wireless microphones, projector and screen, sound system with wireless connectivity, podium, and basic lighting. Additional equipment can be arranged through our preferred vendors.'
    },
    {
      question: 'How does invoicing and payment work?',
      answer: 'We accept corporate purchase orders, checks, and credit cards. Net 30 payment terms available for established businesses. A 50% deposit secures your date with balance due 7 days before the event.'
    },
    {
      question: 'What is your vendor policy?',
      answer: 'You can bring your own caterer or choose from our preferred vendor list. All vendors must provide insurance certificates. Setup and breakdown times are coordinated to ensure smooth operations.'
    },
    {
      question: 'Do you offer catering services?',
      answer: 'We work with preferred catering partners who specialize in corporate events, from coffee breaks to full meals. We can also accommodate dietary restrictions and special requests.'
    }
  ];

  const clientLogos = [
    { name: 'AutoNation', logo: '/images/clients/autonation-logo.png' },
    { name: 'Citrix Systems', logo: '/images/clients/citrix-registered-tm-logo.svg' },
    { name: 'Spirit Airlines', logo: '/images/clients/spirit-airlines-logo.png' },
    { name: 'Broward College', logo: '/images/clients/bc_logo_blue.png' }
  ];

  return (
    <>
      <PageSEO
        title="Corporate Event Venue Miami–Fort Lauderdale | Indoor A/C, Parking, A/V"
        description="Holiday parties, off-sites, trainings. Indoor A/C barn with easy parking & A/V. Book a private tour."
        canonical="/corporate"
        ogImage="/_og/corporate.jpg"
        schemaProps={{
          name: "The White Barn FL - Corporate Event Venue",
          description: "Holiday parties, off-sites, trainings. Indoor A/C barn with easy parking & A/V. Book a private tour.",
          amenityFeatures: [
            "Air Conditioning",
            "Parking Available",
            "Audio/Visual Equipment",
            "Indoor Venue",
            "Presentation Equipment",
            "Corporate Event Planning"
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
              Corporate Events Done Right
            </motion.h1>
            <motion.nav
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center items-center space-x-2 text-lg"
            >
              <a href="/" className="hover:text-red-500 transition-colors">Home</a>
              <span>/</span>
              <span>Corporate</span>
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
                Why Choose The White Barn FL for Corporate Events
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Professional amenities and flexible space designed for successful business gatherings
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
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-blue-600" />
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
                Corporate Event Gallery
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See how we've hosted successful corporate events for businesses across South Florida
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

        {/* Client Logos Section */}
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                Trusted by Leading Companies
              </h3>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
              {clientLogos.slice(0, 4).map((client, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="text-center"
                >
                  <div className="w-24 h-16 bg-white border border-gray-200 rounded-lg flex items-center justify-center mx-auto hover:border-gray-300 hover:shadow-md transition-all duration-200 group">
                    <div className="flex flex-col items-center justify-center p-2">
                      <img
                        src={client.logo}
                        alt={`${client.name} logo`}
                        className="max-h-8 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                        loading="lazy"
                        onError={(e) => { 
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling.style.display = 'block';
                        }}
                        title={client.name}
                      />
                      <span 
                        className="text-gray-700 font-medium text-xs text-center leading-tight mt-1 hidden group-hover:text-gray-900"
                        style={{ display: 'none' }}
                      >
                        {client.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Corporate Event Packages
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Flexible packages designed for different types of corporate gatherings
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {pkg.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {pkg.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleBookTourClick(pkg.title.toLowerCase().replace(' ', '_'))}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300"
                  >
                    {pkg.cta}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 px-4 bg-white">
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
                Everything you need to know about hosting your corporate event with us
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-gray-50 rounded-lg shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors duration-200"
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
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Convenient Location
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Easily accessible from Miami and Fort Lauderdale with ample parking for your team
              </p>
            </motion.div>

            <div className="rounded-lg overflow-hidden shadow-lg h-96">
              <Map address="4680 SW 148th Ave, Fort Lauderdale, FL 33330" />
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="book-tour" className="py-16 px-4 bg-blue-50">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Schedule Your Site Visit
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Ready to plan your next corporate event? Contact us to schedule a private tour and discuss your requirements
              </p>
            </motion.div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <ContactForm 
                source="corporate" 
                isFooter={false}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Corporate;
