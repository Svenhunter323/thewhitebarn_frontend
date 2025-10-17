import { useEffect, useState } from 'react';
import { track } from '../utils/enhancedTracking';

const REFERRAL_STORAGE_KEY = 'whitebarn_referral';
const PARTNER_VISIT_PREFIX = 'partner_visit_';
const REFERRAL_EXPIRY_DAYS = 90;

export const useReferral = () => {
  const [referralData, setReferralData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const captureReferralData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const refCode = urlParams.get('ref');
        
        // Check if we have a referral code in the URL
        if (refCode) {
          const utmData = {
            source: urlParams.get('utm_source'),
            medium: urlParams.get('utm_medium'),
            campaign: urlParams.get('utm_campaign'),
            content: urlParams.get('utm_content'),
            term: urlParams.get('utm_term')
          };
          
          const referralInfo = {
            refCode: refCode.toUpperCase(),
            utm: utmData,
            timestamp: Date.now(),
            page: window.location.pathname
          };
          
          // Verify partner exists (optional - for better UX)
          try {
            const response = await fetch(`/api/partners/lookup/${refCode}`);
            if (response.ok) {
              const data = await response.json();
              referralInfo.partnerName = data.data.partner.name;
              referralInfo.partnerType = data.data.partner.type;
            }
          } catch (error) {
            console.warn('Could not verify partner:', error);
            // Continue anyway - partner verification is optional
          }
          
          // Store in sessionStorage for current session
          sessionStorage.setItem(REFERRAL_STORAGE_KEY, JSON.stringify(referralInfo));
          
          // Also store in localStorage as backup with expiry
          const backupData = {
            ...referralInfo,
            expiresAt: Date.now() + (REFERRAL_EXPIRY_DAYS * 24 * 60 * 60 * 1000)
          };
          localStorage.setItem(REFERRAL_STORAGE_KEY, JSON.stringify(backupData));
          
          setReferralData(referralInfo);
          
          // Fire GA4 tracking event (once per session per partner)
          const sessionKey = `${PARTNER_VISIT_PREFIX}${refCode}`;
          if (!sessionStorage.getItem(sessionKey)) {
            trackPartnerVisit(referralInfo);
            sessionStorage.setItem(sessionKey, 'tracked');
          }
        } else {
          // Check for existing referral data in storage
          const existingData = getReferralFromStorage();
          if (existingData) {
            setReferralData(existingData);
          }
        }
      } catch (error) {
        console.error('Error capturing referral data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    captureReferralData();
  }, []);

  const getReferralFromStorage = () => {
    try {
      // First try sessionStorage (current session)
      let stored = sessionStorage.getItem(REFERRAL_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      
      // Fallback to localStorage with expiry check
      stored = localStorage.getItem(REFERRAL_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        if (data.expiresAt && Date.now() < data.expiresAt) {
          // Copy to sessionStorage for current session
          const sessionData = { ...data };
          delete sessionData.expiresAt;
          sessionStorage.setItem(REFERRAL_STORAGE_KEY, JSON.stringify(sessionData));
          return sessionData;
        } else {
          // Expired - remove from localStorage
          localStorage.removeItem(REFERRAL_STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error('Error reading referral data from storage:', error);
    }
    return null;
  };

  const trackPartnerVisit = (referralInfo) => {
    try {
      // Track with enhanced tracking utility
      track('partner_visit', {
        event_category: 'Referral',
        event_label: referralInfo.refCode,
        ref_code: referralInfo.refCode,
        partner_type: referralInfo.partnerType || 'unknown',
        utm_source: referralInfo.utm.source || 'direct',
        utm_medium: referralInfo.utm.medium || 'referral',
        utm_campaign: referralInfo.utm.campaign || '',
        page_location: window.location.href,
        page_title: document.title
      });

      // Facebook Pixel tracking
      if (window.fbq) {
        window.fbq('trackCustom', 'PartnerVisit', {
          ref_code: referralInfo.refCode,
          partner_type: referralInfo.partnerType,
          utm_source: referralInfo.utm.source
        });
      }

      // TikTok Pixel tracking
      if (window.ttq) {
        window.ttq.track('ClickButton', {
          content_type: 'partner_referral',
          content_id: referralInfo.refCode,
          content_name: referralInfo.partnerName || referralInfo.refCode
        });
      }

      console.log('Partner visit tracked:', referralInfo.refCode);
    } catch (error) {
      console.error('Error tracking partner visit:', error);
    }
  };

  const getReferralFormData = () => {
    const data = referralData || getReferralFromStorage();
    
    if (!data) {
      return {};
    }

    return {
      refCode: data.refCode,
      refSource: data.partnerType || null,
      utmSource: data.utm.source,
      utmMedium: data.utm.medium,
      utmCampaign: data.utm.campaign,
      utmContent: data.utm.content,
      utmTerm: data.utm.term
    };
  };

  const trackReferralConversion = (eventType, additionalData = {}) => {
    const data = referralData || getReferralFromStorage();
    
    if (!data) {
      return;
    }

    try {
      track('partner_conversion', {
        event_category: 'Referral',
        event_label: data.refCode,
        ref_code: data.refCode,
        partner_type: data.partnerType || 'unknown',
        conversion_type: eventType,
        utm_source: data.utm.source || 'direct',
        utm_campaign: data.utm.campaign || '',
        value: 1,
        ...additionalData
      });

      // Facebook Pixel conversion tracking
      if (window.fbq) {
        window.fbq('track', 'Lead', {
          ref_code: data.refCode,
          content_name: eventType,
          content_category: 'referral_conversion'
        });
      }

      // TikTok Pixel conversion tracking
      if (window.ttq) {
        window.ttq.track('CompleteRegistration', {
          content_type: 'referral_conversion',
          content_id: data.refCode,
          description: eventType
        });
      }

      console.log('Referral conversion tracked:', eventType, data.refCode);
    } catch (error) {
      console.error('Error tracking referral conversion:', error);
    }
  };

  const clearReferralData = () => {
    try {
      sessionStorage.removeItem(REFERRAL_STORAGE_KEY);
      localStorage.removeItem(REFERRAL_STORAGE_KEY);
      setReferralData(null);
      
      // Clear partner visit tracking flags
      Object.keys(sessionStorage).forEach(key => {
        if (key.startsWith(PARTNER_VISIT_PREFIX)) {
          sessionStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing referral data:', error);
    }
  };

  const hasActiveReferral = () => {
    return !!(referralData || getReferralFromStorage());
  };

  const getReferralCode = () => {
    const data = referralData || getReferralFromStorage();
    return data?.refCode || null;
  };

  const getPartnerInfo = () => {
    const data = referralData || getReferralFromStorage();
    if (!data) return null;
    
    return {
      code: data.refCode,
      name: data.partnerName,
      type: data.partnerType
    };
  };

  return {
    referralData,
    isLoading,
    getReferralFormData,
    trackReferralConversion,
    clearReferralData,
    hasActiveReferral,
    getReferralCode,
    getPartnerInfo
  };
};

// Utility function for components that just need form data
export const getReferralFormData = () => {
  try {
    // Try sessionStorage first
    let stored = sessionStorage.getItem(REFERRAL_STORAGE_KEY);
    if (!stored) {
      // Try localStorage with expiry check
      stored = localStorage.getItem(REFERRAL_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        if (!data.expiresAt || Date.now() >= data.expiresAt) {
          localStorage.removeItem(REFERRAL_STORAGE_KEY);
          return {};
        }
      }
    }
    
    if (stored) {
      const data = JSON.parse(stored);
      return {
        refCode: data.refCode,
        refSource: data.partnerType || null,
        utmSource: data.utm?.source,
        utmMedium: data.utm?.medium,
        utmCampaign: data.utm?.campaign,
        utmContent: data.utm?.content,
        utmTerm: data.utm?.term
      };
    }
  } catch (error) {
    console.error('Error getting referral form data:', error);
  }
  
  return {};
};

export default useReferral;
