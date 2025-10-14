import { motion } from 'framer-motion';
import PageSEO from '../components/seo/PageSEO';
import { Link, useSearchParams } from 'react-router-dom';
import { FaGoogle, FaExternalLinkAlt, FaPrint, FaStar, FaFacebook, FaYelp } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import ReviewQRCode from '../components/common/ReviewQRCode';
import PrivateFeedbackForm from '../components/forms/PrivateFeedbackForm';
import ApiService from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { track, trackLeadSubmit, getUTMParameters } from '../utils/enhancedTracking';

// Enhanced Private Feedback Form with tracking integration
const EnhancedPrivateFeedbackForm = ({ onSubmit, isKioskMode, qrCode }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Call the tracking function
      if (onSubmit) {
        onSubmit(data);
      }

      // Submit to backend - using ContactForm endpoint for consistency
      await ApiService.submitContactForm({
        ...data,
        subject: 'Private Feedback',
        source: 'reviews_feedback',
        qr_code: qrCode,
        kiosk_mode: isKioskMode
      });

      toast.success('Thank you for your feedback! We appreciate your input.');
      reset();
    } catch (error) {
      console.error('Failed to send feedback:', error);
      toast.error('Failed to send feedback. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Name *
        </label>
        <input
          type="text"
          {...register('name', { required: 'Name is required' })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
          placeholder="Your name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email (optional)
        </label>
        <input
          type="email"
          {...register('email', {
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Please enter a valid email address'
            }
          })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Feedback *
        </label>
        <textarea
          {...register('message', { 
            required: 'Please share your feedback',
            minLength: {
              value: 10,
              message: 'Please provide at least 10 characters'
            }
          })}
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 resize-none"
          placeholder="Tell us about your experience at The White Barn FL..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Sending...
          </>
        ) : (
          'Send Feedback'
        )}
      </button>
    </form>
  );
};

const Reviews = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('all');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for kiosk mode and QR code
  const isKioskMode = searchParams.get('kiosk') === '1';
  const qrCode = searchParams.get('qr');

  // Track page view on mount
  useEffect(() => {
    track('page_view', {
      page: 'reviews',
      page_category: 'engagement',
      kiosk_mode: isKioskMode,
      qr_code: qrCode,
      ...getUTMParameters()
    });
  }, [isKioskMode, qrCode]);

  // Fetch live reviews from backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await ApiService.getApprovedReviews();
        setReviews(response.data.reviews || []);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Review platform data with ratings and counts
  const reviewPlatforms = [
    {
      id: 'google',
      name: 'Google',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
      rating: 4.7,
      reviewCount: 293,
      color: '#4285f4',
      starColor: '#fbbc04',
      url: 'https://g.page/r/CZTfUpGjMAt4EBM/review',
      icon: FaGoogle
    },
    {
      id: 'theknot',
      name: 'The Knot',
      logo: '/images/platforms/theknot-logo.png',
      rating: 4.9,
      reviewCount: 153,
      color: '#000000',
      starColor: '#000000',
      url: 'https://www.theknot.com/marketplace/the-white-barn-florida-davie-fl-12345'
    },
    {
      id: 'yelp',
      name: 'Yelp',
      logo: '/images/platforms/yelp-logo.png',
      rating: 4.6,
      reviewCount: 83,
      color: '#d32323',
      starColor: '#d32323',
      url: 'https://www.yelp.com/biz/cielo-farms-nursery-southwest-ranches',
      icon: FaYelp
    },
    {
      id: 'weddingwire',
      name: 'WeddingWire',
      logo: '/images/platforms/weddingwire-logo.png',
      rating: 4.9,
      reviewCount: 222,
      color: '#00a2e8',
      starColor: '#00a2e8',
      url: 'https://www.weddingwire.com/review/TheWhiteBarnFL'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      logo: '/images/platforms/facebook-logo.png',
      rating: 4.8,
      reviewCount: 67,
      color: '#1877f2',
      starColor: '#1877f2',
      url: 'https://www.facebook.com/thewhitebarnfl',
      icon: FaFacebook
    }
  ];

  // Transform live reviews data for display
  const transformedReviews = reviews.map(review => ({
    id: review._id,
    platform: review.source || 'website',
    name: review.clientName,
    avatar: `/images/avatars/avatar${Math.floor(Math.random() * 5) + 1}.jpg`,
    rating: review.rating,
    date: format(new Date(review.createdAt), 'MMM dd, yyyy'),
    text: review.review,
    title: review.title,
    eventType: review.eventType,
    eventDate: review.eventDate,
    verified: review.status === 'approved',
    isFeatured: review.isFeatured
  }));

  // Calculate live statistics
  const liveStats = {
    totalReviews: reviews.length,
    averageRating: reviews.length > 0 ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : 0,
    featuredCount: reviews.filter(review => review.isFeatured).length
  };

  // Update platform data with live counts (you can customize this based on your needs)
  const updatedReviewPlatforms = reviewPlatforms.map(platform => {
    const platformReviews = transformedReviews.filter(review => review.platform === platform.id);
    const platformRating = platformReviews.length > 0 
      ? (platformReviews.reduce((sum, review) => sum + review.rating, 0) / platformReviews.length).toFixed(1)
      : platform.rating;
    
    return {
      ...platform,
      rating: parseFloat(platformRating),
      reviewCount: platformReviews.length || platform.reviewCount // Fallback to original count if no live data
    };
  });

  // Filter reviews based on active tab
  const filteredReviews = activeTab === 'all' ? transformedReviews : transformedReviews.filter(review => review.platform === activeTab);

  // Calculate overall rating from live data
  const overallRating = liveStats.averageRating;

  const renderStars = (rating, color = '#fbbf24') => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            style={{ color: star <= rating ? color : '#d1d5db' }}
          />
        ))}
      </div>
    );
  };


  const handleExternalLink = (url, platformId) => {
    // Track the engagement
    track('engagement', {
      engagement_type: 'click',
      element_id: `review_${platformId}`,
      platform: platformId,
      kiosk_mode: isKioskMode,
      qr_code: qrCode,
      ...getUTMParameters()
    });

    // Open the external link
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Enhanced private feedback form submission handler
  const handlePrivateFeedbackSubmit = (formData) => {
    trackLeadSubmit({
      form_source: 'reviews_feedback',
      event_type: 'private_feedback',
      kiosk_mode: isKioskMode,
      qr_code: qrCode,
      ...getUTMParameters(),
      ...formData
    });
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <>
      <PageSEO
        title="Customer Reviews - The White Barn FL | What Our Clients Say"
        description="Read authentic reviews from couples and event planners who chose The White Barn FL for their special occasions. See why we're SW Ranches' premier venue."
        canonical="/reviews"
        ogImage="/_og/reviews.jpg"
        schemaProps={{
          name: "The White Barn FL - Customer Reviews",
          description: "Authentic customer reviews and testimonials from events at The White Barn FL.",
          amenityFeatures: [
            "Customer Testimonials",
            "Event Reviews",
            "Client Feedback",
            "5-Star Service",
            "Verified Reviews"
          ]
        }}
      />
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </>
    );
  }

  // Show error message if failed to load
  if (error) {
    return (
      <>
      <PageSEO
        title="Customer Reviews - The White Barn FL | What Our Clients Say"
        description="Read authentic reviews from couples and event planners who chose The White Barn FL for their special occasions. See why we're SW Ranches' premier venue."
        canonical="/reviews"
        ogImage="/_og/reviews.jpg"
        schemaProps={{
          name: "The White Barn FL - Customer Reviews",
          description: "Authentic customer reviews and testimonials from events at The White Barn FL.",
          amenityFeatures: [
            "Customer Testimonials",
            "Event Reviews",
            "Client Feedback",
            "5-Star Service",
            "Verified Reviews"
          ]
        }}
      />
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Reviews</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageSEO
        title="Customer Reviews - The White Barn FL | What Our Clients Say"
        description="Read authentic reviews from couples and event planners who chose The White Barn FL for their special occasions. See why we're SW Ranches' premier venue."
        canonical="/reviews"
        ogImage="/_og/reviews.jpg"
        schemaProps={{
          name: "The White Barn FL - Customer Reviews",
          description: "Authentic customer reviews and testimonials from events at The White Barn FL.",
          amenityFeatures: [
            "Customer Testimonials",
            "Event Reviews",
            "Client Feedback",
            "5-Star Service",
            "Verified Reviews"
          ]
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50">
        {/* Hero Section */}
        <section className={`relative py-24 text-black overflow-hidden ${isKioskMode ? 'py-12' : ''}`}>
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
              className={`font-serif font-bold mb-4 ${isKioskMode ? 'text-3xl lg:text-4xl' : 'text-4xl lg:text-5xl'}`}
            >
              Share Your Experience
            </motion.h1>
            {isKioskMode && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-700 mb-4"
              >
                Tap a button to leave a review
              </motion.p>
            )}
            {!isKioskMode && (
              <motion.nav
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center items-center space-x-2 text-lg"
              >
                <a href="/" className="hover:text-red-500 transition-colors">Home</a>
                <span>/</span>
                <span>Review</span>
              </motion.nav>
            )}
          </div>
        </section>

        {/* Disclaimer - Hidden in kiosk mode */}
        {!isKioskMode && (
          <div className="bg-gray-50 py-4">
            <div className="container mx-auto max-w-6xl px-4">
              <p className="text-sm text-gray-600 text-center">
                The reviews below represent an aggregate score from numerous independent third party review sites. 
                The reviews that are shown represent a random sample pulled from these independent 3rd party review sites and not modified or influenced by our website.
              </p>
            </div>
          </div>
        )}

        {/* Platform Ratings Overview - Hidden in kiosk mode */}
        {!isKioskMode && (
          <section className="py-12 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                {updatedReviewPlatforms.map((platform, index) => (
                  <motion.div
                    key={platform.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="text-center"
                  >
                    <div className="mb-4">
                      {platform.icon ? (
                        <platform.icon 
                          className="w-16 h-16 mx-auto mb-2" 
                          style={{ color: platform.color }}
                        />
                      ) : (
                        <div 
                          className="w-16 h-16 mx-auto mb-2 flex items-center justify-center text-2xl font-bold rounded"
                          style={{ backgroundColor: platform.color, color: 'white' }}
                        >
                          {platform.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="mb-2">
                      {renderStars(platform.rating, platform.starColor)}
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      {platform.rating} ({platform.reviewCount} Reviews)
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* What Our Customers Say - Hidden in kiosk mode */}
        {!isKioskMode && (
          <section className="py-8 px-4">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                What our customers say
              </h2>

              {/* Review Tabs */}
              <div className="flex flex-wrap justify-center gap-2 mb-8 border-b">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                    activeTab === 'all'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All Reviews {overallRating}
                </button>
                {updatedReviewPlatforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setActiveTab(platform.id)}
                    className={`px-4 py-2 font-medium border-b-2 transition-colors flex items-center gap-2 ${
                      activeTab === platform.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {platform.icon && (
                      <platform.icon 
                        className="w-4 h-4" 
                        style={{ color: platform.color }}
                      />
                    )}
                    {platform.name} {platform.rating}
                  </button>
                ))}
              </div>

              {/* Reviews Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredReviews.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500 text-lg">
                      {activeTab === 'all' 
                        ? 'No reviews available yet. Be the first to share your experience!' 
                        : `No reviews available for ${updatedReviewPlatforms.find(p => p.id === activeTab)?.name || 'this platform'} yet.`
                      }
                    </p>
                  </div>
                ) : (
                  filteredReviews.map((review, index) => {
                  const platform = updatedReviewPlatforms.find(p => p.id === review.platform);
                  return (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center mb-4">
                        <div className="relative">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=random`;
                            }}
                          />
                          {platform && (
                            <div 
                              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                              style={{ backgroundColor: platform.color }}
                            >
                              {platform.icon ? (
                                <platform.icon className="w-3 h-3" />
                              ) : (
                                platform.name.charAt(0)
                              )}
                            </div>
                          )}
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-900">{review.name}</h4>
                            {review.verified && (
                              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                                ✓
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        {renderStars(review.rating, platform?.starColor)}
                      </div>
                      
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {review.text}
                      </p>
                      
                      <button className="text-blue-600 text-sm mt-2 hover:underline">
                        Read more
                      </button>
                    </motion.div>
                  );
                }))}
              </div>
            </div>
          </section>
        )}

        {/* Leave a Review Section */}
        <section className={`px-4 bg-gray-50 ${isKioskMode ? 'py-8' : 'py-16'}`}>
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className={`font-bold text-gray-900 mb-8 ${isKioskMode ? 'text-2xl' : 'text-3xl'}`}>
              Share Your Experience
            </h2>
            {!isKioskMode && (
              <p className="text-lg text-gray-600 mb-8">
                Help future couples by sharing your experience at The White Barn FL
              </p>
            )}
            <div className={`grid gap-6 ${isKioskMode ? 'grid-cols-1 max-w-md mx-auto' : 'md:grid-cols-3'}`}>
              {updatedReviewPlatforms.slice(0, 3).map((platform, index) => {
                // Map platform IDs for tracking
                const platformTrackingId = platform.id === 'google' ? 'google' : 
                                          platform.id === 'weddingwire' ? 'ww' : 
                                          platform.id === 'theknot' ? 'knot' : platform.id;
                
                return (
                  <motion.button
                    key={platform.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    onClick={() => handleExternalLink(platform.url, platformTrackingId)}
                    className={`bg-white border-2 rounded-lg hover:shadow-lg transition-all duration-300 group relative overflow-hidden ${
                      isKioskMode 
                        ? 'border-gray-300 hover:border-gray-400 p-8 min-h-[80px] text-lg font-semibold' 
                        : 'border-gray-200 p-6'
                    }`}
                    style={{ 
                      minHeight: isKioskMode ? '80px' : 'auto',
                      backgroundColor: isKioskMode ? '#ffffff' : '#ffffff'
                    }}
                  >
                    {/* High contrast background for kiosk mode */}
                    {isKioskMode && (
                      <div 
                        className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity"
                        style={{ backgroundColor: platform.color }}
                      />
                    )}
                    
                    <div className={`relative z-10 ${isKioskMode ? 'flex items-center justify-center space-x-4' : ''}`}>
                      <div className={isKioskMode ? '' : 'mb-4'}>
                        {platform.icon ? (
                          <platform.icon 
                            className={`group-hover:scale-110 transition-transform ${
                              isKioskMode ? 'w-8 h-8' : 'w-12 h-12 mx-auto'
                            }`}
                            style={{ color: platform.color }}
                          />
                        ) : (
                          <div 
                            className={`flex items-center justify-center text-xl font-bold rounded group-hover:scale-110 transition-transform ${
                              isKioskMode ? 'w-8 h-8' : 'w-12 h-12 mx-auto'
                            }`}
                            style={{ backgroundColor: platform.color, color: 'white' }}
                          >
                            {platform.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      
                      <div className={isKioskMode ? 'text-left' : ''}>
                        <h3 className={`font-semibold text-gray-900 ${isKioskMode ? 'text-xl mb-1' : 'mb-2'}`}>
                          {platform.name}
                        </h3>
                        {!isKioskMode && (
                          <>
                            <p className="text-sm text-gray-600 mb-4">
                              Leave a review on {platform.name}
                            </p>
                            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                              <FaExternalLinkAlt className="w-3 h-3" />
                              <span>Open {platform.name}</span>
                            </div>
                          </>
                        )}
                        {isKioskMode && (
                          <p className="text-sm text-gray-600">
                            Tap to leave a review
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        {/* QR Code and Admin Tools Section - Hidden in kiosk mode */}
        {!isKioskMode && (
          <section className="py-16 px-4 bg-gray-50">
            <div className="container mx-auto max-w-4xl">
              {/* QR Code Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg p-8 text-center mb-8"
              >
                <h3 className="text-2xl font-serif text-amber-900 mb-6">
                  QR Code for Easy Access
                </h3>
                <p className="text-gray-600 mb-8">
                  Generate and download QR codes to share this review page
                </p>
                <ReviewQRCode />
              </motion.div>

              {/* Admin Tools */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-amber-50 rounded-xl p-6 text-center mb-8"
              >
                <h3 className="text-xl font-serif text-amber-900 mb-4">
                  Venue Management Tools
                </h3>
                <div className="flex justify-center space-x-4">
                  <Link
                    to="/print-sign"
                    className="flex items-center space-x-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors duration-200"
                  >
                    <FaPrint className="h-4 w-4" />
                    <span>Printable A4 Sign</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Submit Your Own Review Section - Hidden in kiosk mode */}
        {!isKioskMode && (
          <section className="py-16 px-4 bg-white">
            <div className="container mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Submit Your Review
                </h2>
                <p className="text-lg text-gray-600">
                  Share your experience directly with us or leave a public review
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Public Review Form */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="bg-gradient-to-br from-amber-50 to-green-50 p-6 rounded-lg"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Public Review
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Submit a review that will be displayed on our website after approval.
                  </p>
                  <Link
                    to="/submit-review"
                    className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Submit Public Review
                  </Link>
                </motion.div>

                {/* Private Feedback */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="bg-gray-50 p-6 rounded-lg"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Private Feedback
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Send us private feedback that won't be published publicly.
                  </p>
                  <EnhancedPrivateFeedbackForm 
                    onSubmit={handlePrivateFeedbackSubmit}
                    isKioskMode={isKioskMode}
                    qrCode={qrCode}
                  />
                </motion.div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Reviews;
