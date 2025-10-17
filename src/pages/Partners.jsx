import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import ApiService from '../services/api';
import { MetaTags } from '../components/seo/MetaTags';
import { track } from '../utils/enhancedTracking';
import { 
  UserGroupIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon,
  ShareIcon,
  QrCodeIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';

const Partners = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await ApiService.post('/partners', data);
      
      if (response.data.status === 'success') {
        setSubmitStatus('success');
        reset();
        
        // Track partner application
        track('partner_application_submit', {
          event_category: 'Partnership',
          event_label: data.type,
          partner_type: data.type,
          value: 1
        });
        
        toast.success('Application submitted successfully! We will review and contact you soon.');
      }
    } catch (error) {
      console.error('Partner application error:', error);
      setSubmitStatus('error');
      
      const errorMessage = error.response?.data?.message || 'Failed to submit application. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: CurrencyDollarIcon,
      title: 'Competitive Commissions',
      description: 'Earn $100-150 for every successful booking you refer to our venue.',
      highlight: '$100-150 per booking'
    },
    {
      icon: QrCodeIcon,
      title: 'Custom QR Codes & Links',
      description: 'Get personalized referral links and QR codes for easy sharing.',
      highlight: 'Unique tracking codes'
    },
    {
      icon: ChartBarIcon,
      title: 'Performance Tracking',
      description: 'Access detailed analytics on your referrals and earnings.',
      highlight: 'Real-time analytics'
    },
    {
      icon: ShareIcon,
      title: 'Marketing Support',
      description: 'Professional photos, videos, and marketing materials provided.',
      highlight: 'Full marketing kit'
    }
  ];

  const partnerTypes = [
    {
      type: 'affiliate',
      title: 'Affiliate Marketers',
      description: 'Digital marketers, bloggers, and content creators who can promote our venue online.',
      commission: '$150 per booking',
      requirements: ['Active online presence', 'Marketing experience', 'Professional communication']
    },
    {
      type: 'influencer',
      title: 'Social Media Influencers',
      description: 'Instagram, TikTok, and other social media personalities with engaged audiences.',
      commission: '$125 per booking',
      requirements: ['1K+ followers', 'Engagement rate >3%', 'Content creation skills']
    },
    {
      type: 'vendor',
      title: 'Wedding Vendors',
      description: 'Photographers, planners, florists, and other wedding professionals.',
      commission: '$100 per booking',
      requirements: ['Active wedding business', 'Professional portfolio', 'Client references']
    }
  ];

  return (
    <>
      <MetaTags 
        title="Partner Program - Join Our Network"
        description="Join The White Barn FL's affiliate and influencer program. Earn competitive commissions by referring clients to our premier event venue in SW Ranches, Florida."
        keywords="affiliate program, influencer partnership, event venue referrals, wedding venue partners, commission program"
        url="https://thewhitebarnfl.com/partners"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <UserPlusIcon className="w-16 h-16 mx-auto mb-6 text-primary-200" />
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Partner Program
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-100">
                Join our network and earn competitive commissions by referring clients to 
                South Florida's premier indoor/outdoor event venue
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-lg">
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <CurrencyDollarIcon className="w-5 h-5 inline mr-2" />
                  Up to $150 per booking
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <UserGroupIcon className="w-5 h-5 inline mr-2" />
                  90-day attribution window
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <ChartBarIcon className="w-5 h-5 inline mr-2" />
                  Real-time tracking
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Partner With Us?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The White Barn FL is SW Ranches' premier event venue, offering both 
                indoor climate-controlled and outdoor garden settings for unforgettable events.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
                >
                  <benefit.icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {benefit.description}
                  </p>
                  <div className="bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold">
                    {benefit.highlight}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Types Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Partner Categories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We work with different types of partners, each with tailored commission 
                structures and requirements.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {partnerTypes.map((partner, index) => (
                <motion.div
                  key={partner.type}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {partner.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {partner.description}
                  </p>
                  <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-lg font-semibold mb-6">
                    {partner.commission}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Requirements:</h4>
                    <ul className="space-y-2">
                      {partner.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Apply to Become a Partner
                </h2>
                <p className="text-xl text-gray-600">
                  Ready to start earning? Fill out the application below and we'll 
                  review your submission within 2-3 business days.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Partner Type *
                    </label>
                    <select
                      {...register('type', { required: 'Partner type is required' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select Partner Type</option>
                      <option value="affiliate">Affiliate Marketer</option>
                      <option value="influencer">Social Media Influencer</option>
                      <option value="vendor">Wedding Vendor</option>
                    </select>
                    {errors.type && (
                      <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Instagram Handle
                      </label>
                      <input
                        {...register('social.instagram')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="@yourusername"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        TikTok Handle
                      </label>
                      <input
                        {...register('social.tiktok')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="@yourusername"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website/Portfolio
                    </label>
                    <input
                      type="url"
                      {...register('social.website')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tell us about yourself and why you'd be a great partner
                    </label>
                    <textarea
                      {...register('notes')}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Describe your experience, audience, and how you plan to promote our venue..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Submitting Application...</span>
                      </div>
                    ) : (
                      'Submit Application'
                    )}
                  </button>

                  {submitStatus === 'success' && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                      <p className="font-semibold">Application Submitted Successfully!</p>
                      <p className="text-sm">We'll review your application and contact you within 2-3 business days.</p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      <p className="font-semibold">Application Failed</p>
                      <p className="text-sm">Please check your information and try again.</p>
                    </div>
                  )}
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Questions About Our Partner Program?
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                We're here to help! Contact us for more information about partnership 
                opportunities and commission structures.
              </p>
              <a
                href="/contact"
                className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Partners;
