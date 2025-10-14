# Google Tag Manager Setup Guide - The White Barn FL

## 🧩 STEP 1: Create & Install GTM ✅ COMPLETED

### What's Already Done:
- ✅ GTM Container ID: `GTM-PMTWNLVB` is configured
- ✅ GTM script is loaded via React tracking utility
- ✅ NoScript fallback is implemented
- ✅ Environment variables are set up

### Verification:
- Check browser console for GTM loading
- Use Google Tag Assistant Chrome extension
- Verify `dataLayer` exists in browser console

---

## 📊 STEP 2: Add GA4 Tag in GTM

### Instructions:
1. **Go to GTM Dashboard** → [tagmanager.google.com](https://tagmanager.google.com)
2. **Select Container**: The White Barn FL (GTM-PMTWNLVB)
3. **Create New Tag**:
   - Click "New" → "Tag Configuration"
   - Choose "Google Analytics: GA4 Configuration"
   - **Measurement ID**: `G-XXXXXXXXXX` (replace with your GA4 ID)
   - **Trigger**: All Pages
4. **Save & Submit**
5. **Test**: Check GA4 Realtime view for active users

### Environment Variable:
```env
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 💬 STEP 3: Add Marketing Pixels in GTM

### Meta Pixel Setup
1. **Create Custom HTML Tag**:
   ```html
   <!-- Meta Pixel Code -->
   <script>
   !function(f,b,e,v,n,t,s)
   {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
   n.callMethod.apply(n,arguments):n.queue.push(arguments)};
   if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
   n.queue=[];t=b.createElement(e);t.async=!0;
   t.src=v;s=b.getElementsByTagName(e)[0];
   s.parentNode.insertBefore(t,s)}(window, document,'script',
   'https://connect.facebook.net/en_US/fbevents.js');
   fbq('init', 'YOUR_PIXEL_ID');
   fbq('track', 'PageView');
   </script>
   ```
2. **Trigger**: All Pages
3. **Replace**: `YOUR_PIXEL_ID` with actual Meta Pixel ID

### TikTok Pixel Setup
1. **Create Custom HTML Tag**:
   ```html
   <!-- TikTok Pixel Code -->
   <script>
   !function (w, d, t) {
     w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
     ttq.load('YOUR_PIXEL_ID');
     ttq.page();
   }(window, document, 'ttq');
   </script>
   ```
2. **Trigger**: All Pages
3. **Replace**: `YOUR_PIXEL_ID` with actual TikTok Pixel ID

### LinkedIn Insight Tag Setup
1. **Create Custom HTML Tag**:
   ```html
   <!-- LinkedIn Insight Tag -->
   <script type="text/javascript">
   _linkedin_partner_id = "YOUR_PARTNER_ID";
   window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
   window._linkedin_data_partner_ids.push(_linkedin_partner_id);
   </script>
   <script type="text/javascript">
   (function(l) {
   if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
   window.lintrk.q=[]}
   var s = document.getElementsByTagName("script")[0];
   var b = document.createElement("script");
   b.type = "text/javascript";b.async = true;
   b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
   s.parentNode.insertBefore(b, s);})(window.lintrk);
   </script>
   ```
2. **Trigger**: All Pages
3. **Replace**: `YOUR_PARTNER_ID` with actual LinkedIn Partner ID

---

## ⚡ STEP 4: Create Conversion Events

### Event Triggers Setup

#### 1. Lead Submit Trigger
- **Trigger Type**: Custom Event
- **Event Name**: `lead_submit`
- **This trigger fires on**: All Custom Events

#### 2. Phone Click Trigger
- **Trigger Type**: Custom Event
- **Event Name**: `phone_click`
- **This trigger fires on**: All Custom Events

#### 3. WhatsApp Click Trigger
- **Trigger Type**: Custom Event
- **Event Name**: `whatsapp_click`
- **This trigger fires on**: All Custom Events

#### 4. Book Tour Trigger
- **Trigger Type**: Custom Event
- **Event Name**: `book_tour`
- **This trigger fires on**: All Custom Events

### Event Tags Setup

#### GA4 Event Tags
For each conversion event, create a GA4 Event tag:

1. **Lead Submit GA4 Event**:
   - **Tag Type**: Google Analytics: GA4 Event
   - **Configuration Tag**: [Your GA4 Configuration Tag]
   - **Event Name**: `generate_lead`
   - **Parameters**:
     - `event_category`: `{{Event - event_category}}`
     - `event_label`: `{{Event - event_label}}`
     - `form_type`: `{{Event - form_type}}`
   - **Trigger**: Lead Submit Trigger

2. **Phone Click GA4 Event**:
   - **Event Name**: `contact_phone`
   - **Parameters**:
     - `event_category`: `Contact`
     - `event_label`: `Phone Click`
     - `phone_number`: `{{Event - phone_number}}`

3. **WhatsApp Click GA4 Event**:
   - **Event Name**: `contact_whatsapp`
   - **Parameters**:
     - `event_category`: `Contact`
     - `event_label`: `WhatsApp Click`

4. **Book Tour GA4 Event**:
   - **Event Name**: `schedule_tour`
   - **Parameters**:
     - `event_category`: `Booking`
     - `event_label`: `Schedule Tour`
     - `tour_type`: `{{Event - tour_type}}`

#### Meta Pixel Event Tags
For each conversion event, create a Custom HTML tag:

1. **Lead Submit Meta Event**:
   ```html
   <script>
   fbq('track', 'Lead', {
     content_category: 'Contact Form',
     content_name: 'Lead Generation'
   });
   </script>
   ```

2. **Phone Click Meta Event**:
   ```html
   <script>
   fbq('track', 'Contact', {
     content_category: 'Phone',
     content_name: 'Phone Click'
   });
   </script>
   ```

3. **WhatsApp Click Meta Event**:
   ```html
   <script>
   fbq('track', 'Contact', {
     content_category: 'WhatsApp',
     content_name: 'WhatsApp Click'
   });
   </script>
   ```

4. **Book Tour Meta Event**:
   ```html
   <script>
   fbq('track', 'Schedule', {
     content_category: 'Booking',
     content_name: 'Tour Booking'
   });
   </script>
   ```

#### TikTok Pixel Event Tags
Similar structure for TikTok events:

1. **Lead Submit TikTok Event**:
   ```html
   <script>
   ttq.track('SubmitForm', {
     content_type: 'contact_form',
     content_name: 'lead_generation'
   });
   </script>
   ```

#### LinkedIn Conversion Tags
For LinkedIn, create conversion tracking tags for each event type.

---

## 🧠 STEP 5: Test & Verify

### Testing Tools:
1. **Google Tag Assistant** (Chrome Extension)
   - Install and activate
   - Navigate to your website
   - Check for GTM and GA4 tags firing

2. **GA4 DebugView**:
   - Go to GA4 → Configure → DebugView
   - Enable debug mode in browser
   - Watch events fire in real-time

3. **Meta Pixel Helper** (Chrome Extension):
   - Install Facebook Pixel Helper
   - Check for pixel fires and events

4. **TikTok Pixel Helper**:
   - Use TikTok Events Manager
   - Test events in real-time

5. **LinkedIn Insight Tag Checker**:
   - Use LinkedIn Campaign Manager
   - Verify tag installation

### Test Scenarios:
- [ ] Page load (PageView events)
- [ ] Contact form submission
- [ ] Phone number clicks
- [ ] WhatsApp button clicks
- [ ] Schedule tour button clicks
- [ ] UTM parameter tracking

---

## 📦 FINAL DELIVERABLES CHECKLIST

### ✅ Completed (React Implementation)
- [x] GTM installed and configured
- [x] Enhanced tracking utility with all pixels
- [x] Contact form lead tracking
- [x] Phone click tracking
- [x] WhatsApp integration and tracking
- [x] Book tour button tracking
- [x] UTM parameter capture and tracking
- [x] Environment variables setup

### 📋 To Complete in GTM Dashboard
- [ ] GA4 Configuration tag with Measurement ID
- [ ] Meta Pixel base code tag
- [ ] TikTok Pixel base code tag
- [ ] LinkedIn Insight Tag
- [ ] 4 conversion event triggers (lead_submit, phone_click, whatsapp_click, book_tour)
- [ ] GA4 event tags for all conversions
- [ ] Meta Pixel event tags for all conversions
- [ ] TikTok Pixel event tags for all conversions
- [ ] LinkedIn conversion tags
- [ ] Test all tags with Tag Assistant
- [ ] Screenshot audit report

### 📊 Analytics Setup
- [ ] Create GA4 property if not exists
- [ ] Set up conversion goals in GA4
- [ ] Configure Meta Events Manager
- [ ] Set up TikTok Events Manager
- [ ] Configure LinkedIn Campaign Manager conversions

---

## 🔧 Environment Variables Required

Update your `.env` file with:
```env
# Google Tag Manager (Already configured)
VITE_GTM_ID=GTM-PMTWNLVB

# Google Analytics 4 (Add your Measurement ID)
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Marketing Pixels (Add your IDs)
VITE_META_PIXEL_ID=your_meta_pixel_id
VITE_TIKTOK_PIXEL_ID=your_tiktok_pixel_id
VITE_LINKEDIN_PARTNER_ID=your_linkedin_partner_id

# WhatsApp Business (Already configured)
VITE_WHATSAPP_NUMBER=15613762855
VITE_WHATSAPP_MESSAGE=Hi! I'm interested in learning more about The White Barn FL for my event.
```

---

## 📱 Contact Information for Tracking

### Phone Numbers:
- Primary: (561) 376-2855
- Secondary: 954-324-1474

### WhatsApp:
- Number: +1 (561) 376-2855
- Default Message: "Hi! I'm interested in learning more about The White Barn FL for my event."

### Email:
- Contact: contact@thewhitebarnfl.com
- Info: info@thewhitebarnfl.com

---

## 🚀 Next Steps

1. **Complete GTM Configuration**: Follow steps 2-4 in GTM dashboard
2. **Get Marketing Pixel IDs**: From respective platforms
3. **Update Environment Variables**: Add all pixel IDs
4. **Test Everything**: Use provided testing tools
5. **Take Screenshots**: For audit report
6. **Launch Campaigns**: Using UTM naming convention
