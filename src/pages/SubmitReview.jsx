import { useState } from 'react';
import { motion } from 'framer-motion';
import PageSEO from '../components/seo/PageSEO';
import { FaStar, FaCalendarAlt, FaUser, FaEnvelope, FaComment } from 'react-icons/fa';
import { format } from 'date-fns';
import ApiService from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const SubmitReview = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    eventType: 'wedding',
    eventDate: '',
    rating: 5,
    title: '',
    review: '',
    photos: []
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const eventTypes = [
    { value: 'wedding', label: 'Wedding' },
    { value: 'corporate', label: 'Corporate Event' },
    { value: 'birthday', label: 'Birthday Party' },
    { value: 'anniversary', label: 'Anniversary' },
    { value: 'graduation', label: 'Graduation' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await ApiService.submitReview(formData);
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting review:', err);
      setError(err.response?.data?.message || 'Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (currentRating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(star)}
            className="focus:outline-none"
          >
            <FaStar
              className={`w-6 h-6 transition-colors ${
                star <= currentRating 
                  ? 'text-amber-500 hover:text-amber-600' 
                  : 'text-gray-300 hover:text-gray-400'
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-gray-600">({currentRating}/5)</span>
      </div>
    );
  };

  if (submitted) {
    return (
      <>
        <Helmet>
          <title>Review Submitted - The White Barn FL</title>
          <meta name="description" content="Thank you for submitting your review to The White Barn FL." />
        </Helmet>
        
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-4 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Review Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for sharing your experience. Your review has been submitted and will be reviewed by our team before being published.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.href = '/reviews'}
                className="w-full bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
              >
                View All Reviews
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageSEO
        title="Submit a Review - The White Barn FL | Share Your Experience"
        description="Share your experience at The White Barn FL. Submit a review and help other couples discover our beautiful event venue in SW Ranches, Florida."
        canonical="/submit-review"
        ogImage="/_og/submit-review.jpg"
        schemaProps={{
          name: "The White Barn FL - Submit Review",
          description: "Share your experience and submit a review for The White Barn FL event venue.",
          amenityFeatures: [
            "Review Submission",
            "Customer Feedback",
            "Event Experience",
            "Testimonials",
            "Guest Reviews"
          ]
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50">
        {/* Hero Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-serif text-amber-900 mb-6">
                Submit Your Review
              </h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Share your experience at The White Barn FL and help future couples discover our venue.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Review Form */}
        <section className="pb-24 px-4">
          <div className="container mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaUser className="inline w-4 h-4 mr-2" />
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaEnvelope className="inline w-4 h-4 mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="clientEmail"
                      value={formData.clientEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Event Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Type *
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      {eventTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaCalendarAlt className="inline w-4 h-4 mr-2" />
                      Event Date *
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      required
                      max={format(new Date(), 'yyyy-MM-dd')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Overall Rating *
                  </label>
                  {renderStars(formData.rating)}
                </div>

                {/* Review Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    maxLength={200}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Give your review a title"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.title.length}/200 characters
                  </p>
                </div>

                {/* Review Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaComment className="inline w-4 h-4 mr-2" />
                    Your Review *
                  </label>
                  <textarea
                    name="review"
                    value={formData.review}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    maxLength={2000}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Share your experience at The White Barn FL..."
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.review.length}/2000 characters
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber-600 text-white px-8 py-4 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Submitting Review...
                      </>
                    ) : (
                      'Submit Review'
                    )}
                  </button>
                  <p className="text-sm text-gray-500 text-center mt-3">
                    Your review will be reviewed by our team before being published.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SubmitReview;
