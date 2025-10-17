import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import ApiService from '../../services/api';
import { useApiMutation } from '../../hooks/useApi';
import { trackLeadSubmit, getUTMParameters } from '../../utils/enhancedTracking.jsx';
import { useReferral } from '../../hooks/useReferral';

const ContactForm = ({ isFooter = true, source }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { mutate, loading: isSubmitting } = useApiMutation();
  const { getReferralFormData, trackReferralConversion, getPartnerInfo } = useReferral();

  const onSubmit = async (data) => {
    try {
      // Collect UTM parameters and referral data
      const utmData = getUTMParameters();
      const referralData = getReferralFormData();
      const formSource = source || 'contact_form';
      
      // Merge form data with referral tracking
      const submissionData = {
        ...data,
        ...referralData,
        eventType: data.eventType || 'other'
      };
      
      await mutate(() => ApiService.submitContactForm(submissionData));
      
      // Track successful lead submission with enhanced tracking
      trackLeadSubmit({
        event_type: data.eventType || 'general_inquiry',
        lead_source: formSource,
        form_type: isFooter ? 'footer' : 'contact_page',
        name: data.name,
        email: data.email,
        subject: data.subject,
        ref_code: referralData.refCode || null,
        partner_type: referralData.refSource || null,
        ...utmData,
        ...referralData
      });
      
      // Track referral conversion if this is a partner referral
      if (referralData.refCode) {
        trackReferralConversion('contact_form_submit', {
          event_type: data.eventType || 'general_inquiry',
          form_source: formSource
        });
      }
      
      // Push lead_submit event to dataLayer for GTM
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'lead_submit',
          form_source: formSource,
          event_type: data.eventType || 'general_inquiry',
          ref_code: referralData.refCode || null,
          partner_type: referralData.refSource || null,
          ...utmData
        });
      }
      
      // Show success message with partner acknowledgment if applicable
      const partnerInfo = getPartnerInfo();
      const successMessage = partnerInfo 
        ? `Thank you! Your message has been sent. We appreciate the referral from ${partnerInfo.name}!`
        : 'Message sent successfully! We will get back to you soon.';
      
      toast.success(successMessage);
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Contact form error:', error);
    }
  };

  const inputClasses = `w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
    isFooter ? 'bg-white/10 border-gray-600 text-white placeholder-gray-300' : 'bg-white'
  }`;

  const labelClasses = `block text-sm font-medium mb-2 ${
    isFooter ? 'text-gray-300' : 'text-gray-700'
  }`;

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>
            Full Name *
          </label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className={inputClasses}
            placeholder="Enter your full name"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className={labelClasses}>
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
            className={inputClasses}
            placeholder="Enter your email"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className={labelClasses}>
          Subject *
        </label>
        <input
          type="text"
          {...register('subject', { required: 'Subject is required' })}
          className={inputClasses}
          placeholder="What is your inquiry about?"
          aria-invalid={errors.subject ? 'true' : 'false'}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
        />
        {errors.subject && (
          <p id="subject-error" className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
        )}
      </div>

      {!isFooter && (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>
                Event Type
              </label>
              <select
                {...register('eventType')}
                className={inputClasses}
              >
                <option value="other">General Inquiry</option>
                <option value="wedding">Wedding</option>
                <option value="corporate">Corporate Event</option>
                <option value="shower">Shower/Celebration</option>
                <option value="family">Family Event</option>
              </select>
            </div>

            <div>
              <label className={labelClasses}>
                Event Date
              </label>
              <input
                type="date"
                {...register('eventDate')}
                className={inputClasses}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>
                Phone Number
              </label>
              <input
                type="tel"
                {...register('phone')}
                className={inputClasses}
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className={labelClasses}>
                Expected Guest Count
              </label>
              <input
                type="number"
                {...register('guestCount', { min: 1 })}
                className={inputClasses}
                placeholder="Number of guests"
                min="1"
              />
            </div>
          </div>

          <div>
            <label className={labelClasses}>
              Budget Range
            </label>
            <select
              {...register('budget')}
              className={inputClasses}
            >
              <option value="not-specified">Prefer not to specify</option>
              <option value="under-5k">Under $5,000</option>
              <option value="5k-10k">$5,000 - $10,000</option>
              <option value="10k-15k">$10,000 - $15,000</option>
              <option value="15k-25k">$15,000 - $25,000</option>
              <option value="25k-plus">$25,000+</option>
            </select>
          </div>
        </>
      )}

      <div>
        <label className={labelClasses}>
          Message *
        </label>
        <textarea
          {...register('message', { required: 'Message is required' })}
          rows={5}
          className={inputClasses}
          placeholder="Tell us about your event..."
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`btn-primary relative overflow-hidden group ${
          isFooter 
            ? 'bg-primary-500 hover:bg-primary-600 text-white' 
            : 'btn-primary'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Sending...</span>
          </div>
        ) : (
          'Send Message'
        )}
      </motion.button>
    </motion.form>
  );
};

export default ContactForm;
