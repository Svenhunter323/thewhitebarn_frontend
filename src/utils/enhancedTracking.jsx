// Enhanced tracking utility for The White Barn FL
// Supports GTM, GA4, Meta Pixel, TikTok Pixel, and LinkedIn Insight Tag

// Initialize Google Tag Manager
export const initGTM = (gtmId) => {
  if (!gtmId) return;
  if (window.dataLayer) return; // avoid double inject

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);
};

// GTM NoScript fallback
export const GTMNoScript = ({ gtmId }) => {
  if (!gtmId) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="gtm"
      />
    </noscript>
  );
};

// Initialize Meta Pixel
export const initMetaPixel = (pixelId) => {
  if (!pixelId || window.fbq) return;

  window.fbq = function() {
    window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments);
  };
  if (!window._fbq) window._fbq = window.fbq;
  window.fbq.push = window.fbq;
  window.fbq.loaded = true;
  window.fbq.version = '2.0';
  window.fbq.queue = [];

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');
};

// Initialize TikTok Pixel
export const initTikTokPixel = (pixelId) => {
  if (!pixelId || window.ttq) return;

  window.ttq = window.ttq || [];
  window.ttq.methods = ['track', 'page', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie'];
  window.ttq.setAndDefer = function(t, e) {
    t[e] = function() {
      t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
    };
  };
  
  for (let i = 0; i < window.ttq.methods.length; i++) {
    window.ttq.setAndDefer(window.ttq, window.ttq.methods[i]);
  }

  window.ttq.instance = function(t) {
    for (let e = window.ttq._i[t] || [], n = 0; n < window.ttq.methods.length; n++) {
      window.ttq.setAndDefer(e, window.ttq.methods[n]);
    }
    return e;
  };

  window.ttq.load = function(e, n) {
    const i = 'https://analytics.tiktok.com/i18n/pixel/events.js';
    window.ttq._i = window.ttq._i || {};
    window.ttq._i[e] = [];
    window.ttq._i[e]._u = i;
    window.ttq._t = window.ttq._t || {};
    window.ttq._t[e] = +new Date();
    window.ttq._o = window.ttq._o || {};
    window.ttq._o[e] = n || {};
    
    const o = document.createElement('script');
    o.type = 'text/javascript';
    o.async = true;
    o.src = i + '?sdkid=' + e + '&lib=' + window.ttq.lib;
    const a = document.getElementsByTagName('script')[0];
    a.parentNode.insertBefore(o, a);
  };

  window.ttq.load(pixelId);
  window.ttq.page();
};

// Initialize LinkedIn Insight Tag
export const initLinkedInPixel = (partnerId) => {
  if (!partnerId || window._linkedin_data_partner_ids) return;

  window._linkedin_partner_id = partnerId;
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  window._linkedin_data_partner_ids.push(window._linkedin_partner_id);

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
  document.head.appendChild(script);
};

// Initialize all tracking pixels
export const initAllTracking = () => {
  const gtmId = import.meta.env.VITE_GTM_ID;
  const metaPixelId = import.meta.env.VITE_META_PIXEL_ID;
  const tiktokPixelId = import.meta.env.VITE_TIKTOK_PIXEL_ID;
  const linkedinPartnerId = import.meta.env.VITE_LINKEDIN_PARTNER_ID;

  if (gtmId) initGTM(gtmId);
  if (metaPixelId) initMetaPixel(metaPixelId);
  if (tiktokPixelId) initTikTokPixel(tiktokPixelId);
  if (linkedinPartnerId) initLinkedInPixel(linkedinPartnerId);
};

// Enhanced tracking function with multiple platform support
export const track = (event, params = {}) => {
  // GTM/GA4 tracking
  if (window.dataLayer) {
    window.dataLayer.push({ event, ...params });
  }

  // Meta Pixel tracking
  if (window.fbq) {
    const metaEvent = mapToMetaEvent(event);
    if (metaEvent) {
      window.fbq('track', metaEvent, params);
    }
  }

  // TikTok Pixel tracking
  if (window.ttq) {
    const tiktokEvent = mapToTikTokEvent(event);
    if (tiktokEvent) {
      window.ttq.track(tiktokEvent, params);
    }
  }

  // LinkedIn tracking (conversion events)
  if (window.lintrk && isConversionEvent(event)) {
    window.lintrk('track', { conversion_id: getLinkedInConversionId(event) });
  }
};

// Map custom events to Meta Pixel events
const mapToMetaEvent = (event) => {
  const eventMap = {
    'lead_submit': 'Lead',
    'phone_click': 'Contact',
    'whatsapp_click': 'Contact',
    'book_tour': 'Schedule',
    'page_view': 'PageView',
    'view_content': 'ViewContent'
  };
  return eventMap[event] || null;
};

// Map custom events to TikTok Pixel events
const mapToTikTokEvent = (event) => {
  const eventMap = {
    'lead_submit': 'SubmitForm',
    'phone_click': 'Contact',
    'whatsapp_click': 'Contact',
    'book_tour': 'Contact',
    'page_view': 'ViewContent',
    'view_content': 'ViewContent'
  };
  return eventMap[event] || null;
};

// Check if event is a conversion event for LinkedIn
const isConversionEvent = (event) => {
  return ['lead_submit', 'phone_click', 'whatsapp_click', 'book_tour'].includes(event);
};

// Get LinkedIn conversion ID based on event type
const getLinkedInConversionId = (event) => {
  // These would be configured in LinkedIn Campaign Manager
  const conversionMap = {
    'lead_submit': 'lead_conversion_id',
    'phone_click': 'phone_conversion_id',
    'whatsapp_click': 'whatsapp_conversion_id',
    'book_tour': 'booking_conversion_id'
  };
  return conversionMap[event] || 'default_conversion_id';
};

// Specific tracking functions for common events
export const trackLeadSubmit = (formData = {}) => {
  track('lead_submit', {
    event_category: 'Lead Generation',
    event_label: 'Contact Form',
    value: 1,
    ...formData
  });
};

export const trackPhoneClick = (phoneNumber) => {
  track('phone_click', {
    event_category: 'Contact',
    event_label: 'Phone Click',
    phone_number: phoneNumber,
    value: 1
  });
};

export const trackWhatsAppClick = () => {
  track('whatsapp_click', {
    event_category: 'Contact',
    event_label: 'WhatsApp Click',
    value: 1
  });
};

export const trackBookTour = (tourType = 'general') => {
  track('book_tour', {
    event_category: 'Booking',
    event_label: 'Schedule Tour',
    tour_type: tourType,
    value: 1
  });
};

// WhatsApp utility function
export const getWhatsAppLink = (message = '') => {
  const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
  const defaultMessage = import.meta.env.VITE_WHATSAPP_MESSAGE || 'Hi! I\'m interested in learning more about The White Barn FL.';
  const finalMessage = message || defaultMessage;
  
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;
};

// UTM parameter utilities
export const getUTMParameters = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source'),
    utm_medium: urlParams.get('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign'),
    utm_content: urlParams.get('utm_content'),
    utm_term: urlParams.get('utm_term')
  };
};

export const trackWithUTM = (event, params = {}) => {
  const utmParams = getUTMParameters();
  track(event, { ...params, ...utmParams });
};

// Partner-specific tracking functions
export const trackPartnerVisit = (partnerData = {}) => {
  track('partner_visit', {
    event_category: 'Referral',
    event_label: 'Partner Visit',
    ref_code: partnerData.refCode,
    partner_type: partnerData.partnerType,
    utm_source: partnerData.utm?.source || 'direct',
    utm_medium: partnerData.utm?.medium || 'referral',
    utm_campaign: partnerData.utm?.campaign || '',
    page_location: window.location.href,
    page_title: document.title,
    value: 1,
    ...partnerData
  });

  // Facebook Pixel tracking
  if (window.fbq) {
    window.fbq('trackCustom', 'PartnerVisit', {
      ref_code: partnerData.refCode,
      partner_type: partnerData.partnerType,
      utm_source: partnerData.utm?.source
    });
  }

  // TikTok Pixel tracking
  if (window.ttq) {
    window.ttq.track('ClickButton', {
      content_type: 'partner_referral',
      content_id: partnerData.refCode,
      content_name: partnerData.partnerName || partnerData.refCode
    });
  }
};

export const trackPartnerConversion = (conversionType, partnerData = {}, additionalData = {}) => {
  track('partner_conversion', {
    event_category: 'Referral',
    event_label: 'Partner Conversion',
    conversion_type: conversionType,
    ref_code: partnerData.refCode,
    partner_type: partnerData.partnerType,
    utm_source: partnerData.utm?.source || 'direct',
    utm_campaign: partnerData.utm?.campaign || '',
    value: 1,
    ...partnerData,
    ...additionalData
  });

  // Facebook Pixel conversion tracking
  if (window.fbq) {
    window.fbq('track', 'Lead', {
      ref_code: partnerData.refCode,
      content_name: conversionType,
      content_category: 'referral_conversion'
    });
  }

  // TikTok Pixel conversion tracking
  if (window.ttq) {
    window.ttq.track('CompleteRegistration', {
      content_type: 'referral_conversion',
      content_id: partnerData.refCode,
      description: conversionType
    });
  }
};

export const trackPartnerApplication = (applicationData = {}) => {
  track('partner_application_submit', {
    event_category: 'Partnership',
    event_label: 'Partner Application',
    partner_type: applicationData.type,
    application_source: 'website',
    value: 1,
    ...applicationData
  });

  // Facebook Pixel
  if (window.fbq) {
    window.fbq('track', 'SubmitApplication', {
      content_name: 'Partner Application',
      content_category: applicationData.type
    });
  }

  // TikTok Pixel
  if (window.ttq) {
    window.ttq.track('SubmitForm', {
      content_type: 'partner_application',
      form_type: applicationData.type
    });
  }
};
