# Reviews + QR System Setup Guide

## 🎯 Overview

The Reviews + QR System for The White Barn FL provides a comprehensive solution for collecting guest feedback through multiple channels:

- **External Reviews**: Direct links to Google, WeddingWire, and The Knot
- **QR Code Generation**: Downloadable PNG/PDF QR codes
- **Private Feedback**: EmailJS-powered contact form
- **Printable A4 Sign**: Professional signage for events

## 🚀 Features Implemented

✅ `/reviews` route live and responsive  
✅ Functional EmailJS/Formspree feedback form  
✅ QR code generator component (PNG + PDF export)  
✅ Printable A4 sign ready for download/print  
✅ Tested in mobile/tablet kiosk mode  

## 📋 Setup Instructions

### 1. EmailJS Configuration

1. Sign up at [EmailJS.com](https://www.emailjs.com/)
2. Create a new email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{message}}` - Feedback message
   - `{{to_name}}` - Recipient name (The White Barn FL Team)

4. Copy `src/config/emailjs.example.js` to `src/config/emailjs.js`
5. Update the configuration with your credentials:

```javascript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id',
  TEMPLATE_ID: 'your_template_id', 
  PUBLIC_KEY: 'your_public_key'
};
```

6. Update `PrivateFeedbackForm.jsx` to import and use the config:

```javascript
import { EMAILJS_CONFIG } from '../../config/emailjs.js';

// Replace the placeholder values with:
await emailjs.send(
  EMAILJS_CONFIG.SERVICE_ID,
  EMAILJS_CONFIG.TEMPLATE_ID,
  templateParams,
  EMAILJS_CONFIG.PUBLIC_KEY
);
```

### 2. Review Platform URLs

Update the review platform URLs in `src/pages/Reviews.jsx`:

```javascript
const reviewPlatforms = [
  {
    name: 'Google',
    url: 'https://g.page/r/CdXb8t4eX9mWEAI/review', // Update with your Google Business URL
    // ...
  },
  {
    name: 'WeddingWire',
    url: 'https://www.weddingwire.com/review/TheWhiteBarnFL', // Update with your WeddingWire URL
    // ...
  },
  {
    name: 'The Knot',
    url: 'https://www.theknot.com/marketplace/the-white-barn-florida-davie-fl-12345', // Update with your The Knot URL
    // ...
  }
];
```

### 3. QR Code Domain

Update the QR code URL in `ReviewQRCode.jsx`:

```javascript
const ReviewQRCode = ({ 
  url = 'https://thewhitebarnfl.com/reviews', // Update with your actual domain
  // ...
}) => {
```

## 📱 Usage Guide

### For Guests

1. **Mobile Access**: Navigate to `/reviews` on any device
2. **Quick Reviews**: Tap any platform button to leave a review
3. **QR Code**: Scan the QR code to access the review page instantly
4. **Private Feedback**: Use the form at the bottom for confidential feedback

### For Venue Staff

1. **Printable Sign**: Visit `/print-sign` or click "Printable A4 Sign" button
2. **QR Code Downloads**: Download PNG or PDF versions from the reviews page
3. **Print Setup**: Use browser print (Ctrl+P) for the A4 sign

## 🎨 Customization

### Colors & Branding

The system uses The White Barn FL's brand colors:
- **Primary**: Amber/Gold (`amber-600`, `amber-900`)
- **Secondary**: Green accents
- **Platform Colors**: 
  - Google: `bg-red-500`
  - WeddingWire: `bg-blue-500`
  - The Knot: `bg-pink-500`

### Mobile Optimization

- Touch-friendly buttons (min 48px height)
- Responsive QR code sizing
- Optimized for tablet kiosks
- PWA-ready with offline support

## 🖨️ Printing Guide

### A4 Sign Printing

1. Navigate to `/print-sign`
2. Click "Print Sign" or use Ctrl+P
3. Ensure printer settings:
   - Paper: A4 (210mm × 297mm)
   - Orientation: Portrait
   - Margins: None/Minimum
   - Background graphics: Enabled

### QR Code Downloads

- **PNG**: High-resolution for digital displays
- **PDF**: Vector format for professional printing

## 🔧 Technical Details

### Dependencies Added

```json
{
  "qrcode.react": "^3.1.0",
  "html2canvas": "^1.4.1", 
  "jspdf": "^2.5.1",
  "@emailjs/browser": "^3.11.0"
}
```

### File Structure

```
src/
├── components/
│   ├── common/
│   │   ├── ReviewQRCode.jsx
│   │   └── PrintableReviewSign.jsx
│   └── forms/
│       └── PrivateFeedbackForm.jsx
├── pages/
│   ├── Reviews.jsx
│   └── PrintSign.jsx
├── config/
│   └── emailjs.example.js
└── styles/
    └── reviews.css
```

## 🚨 Important Notes

1. **EmailJS Setup**: The feedback form won't work until EmailJS is properly configured
2. **HTTPS Required**: QR codes and external links work best over HTTPS
3. **Mobile Testing**: Test on actual mobile devices for best results
4. **Print Testing**: Test A4 printing on your specific printer model

## 📞 Support

For technical support or customization requests, contact the development team.

---

**The White Barn FL Reviews System** - Making guest feedback effortless! 🎉
