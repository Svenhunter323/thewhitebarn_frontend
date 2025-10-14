# UTM Parameter Naming Sheet - The White Barn FL

## UTM Parameter Structure
All URLs should follow this format:
```
https://thewhitebarnfl.com/[page]?utm_source=[source]&utm_medium=[medium]&utm_campaign=[campaign]&utm_content=[content]&utm_term=[term]
```

## UTM Parameters Guide

### utm_source (Traffic Source)
| Source | Description | Example |
|--------|-------------|---------|
| google | Google Ads | google |
| facebook | Facebook/Meta Ads | facebook |
| instagram | Instagram Ads | instagram |
| tiktok | TikTok Ads | tiktok |
| linkedin | LinkedIn Ads | linkedin |
| bing | Bing Ads | bing |
| pinterest | Pinterest Ads | pinterest |
| theknot | The Knot listings | theknot |
| weddingwire | WeddingWire listings | weddingwire |
| zola | Zola listings | zola |
| email | Email campaigns | email |
| direct | Direct mail | direct |
| referral | Referral partners | referral |

### utm_medium (Marketing Medium)
| Medium | Description | Example |
|--------|-------------|---------|
| cpc | Cost Per Click (Paid Search) | cpc |
| social | Organic Social Media | social |
| social_paid | Paid Social Media | social_paid |
| email | Email Marketing | email |
| display | Display Advertising | display |
| video | Video Advertising | video |
| referral | Referral Traffic | referral |
| organic | Organic Search | organic |
| direct_mail | Direct Mail | direct_mail |
| print | Print Advertising | print |
| radio | Radio Advertising | radio |

### utm_campaign (Campaign Name)
| Campaign Type | Naming Convention | Example |
|---------------|-------------------|---------|
| Wedding Campaigns | wedding_[location]_[season] | wedding_fortlauderdale_spring2024 |
| Event Campaigns | event_[type]_[location] | event_corporate_miami |
| Brand Campaigns | brand_[focus]_[month] | brand_awareness_march |
| Seasonal Campaigns | seasonal_[season]_[year] | seasonal_summer_2024 |
| Promotional Campaigns | promo_[offer]_[month] | promo_discount20_april |
| Venue Tour Campaigns | tour_[type]_[location] | tour_virtual_broward |

### utm_content (Ad Content/Variation)
| Content Type | Naming Convention | Example |
|--------------|-------------------|---------|
| Ad Variations | ad[number] | ad1, ad2, ad3 |
| Creative Types | [type]_[description] | video_ceremony, image_reception |
| Call-to-Action | cta_[action] | cta_booktour, cta_contact |
| Audience Segments | audience_[segment] | audience_brides, audience_corporate |
| Landing Pages | lp_[page] | lp_homepage, lp_gallery |

### utm_term (Keywords - Paid Search Only)
| Term Type | Example |
|-----------|---------|
| Branded | white_barn_fl, the_white_barn |
| Generic | wedding_venue_fort_lauderdale |
| Long-tail | outdoor_wedding_venue_south_florida |
| Competitor | [competitor_name]_alternative |

## Campaign Examples

### Google Ads Campaigns
```
# Wedding Venue - Fort Lauderdale
https://thewhitebarnfl.com/?utm_source=google&utm_medium=cpc&utm_campaign=wedding_fortlauderdale_2024&utm_content=ad1&utm_term=wedding_venue_fort_lauderdale

# Corporate Events
https://thewhitebarnfl.com/contact?utm_source=google&utm_medium=cpc&utm_campaign=event_corporate_broward&utm_content=cta_contact&utm_term=corporate_event_venue

# Virtual Tours
https://thewhitebarnfl.com/gallery?utm_source=google&utm_medium=cpc&utm_campaign=tour_virtual_2024&utm_content=video_gallery&utm_term=venue_virtual_tour
```

### Social Media Campaigns
```
# Facebook Wedding Campaign
https://thewhitebarnfl.com/?utm_source=facebook&utm_medium=social_paid&utm_campaign=wedding_spring_2024&utm_content=image_ceremony&utm_term=

# Instagram Stories
https://thewhitebarnfl.com/gallery?utm_source=instagram&utm_medium=social_paid&utm_campaign=brand_awareness_march&utm_content=story_gallery&utm_term=

# TikTok Video Campaign
https://thewhitebarnfl.com/?utm_source=tiktok&utm_medium=video&utm_campaign=wedding_genz_2024&utm_content=video_behind_scenes&utm_term=
```

### Email Campaigns
```
# Newsletter
https://thewhitebarnfl.com/?utm_source=email&utm_medium=email&utm_campaign=newsletter_march2024&utm_content=header_cta&utm_term=

# Promotional Email
https://thewhitebarnfl.com/contact?utm_source=email&utm_medium=email&utm_campaign=promo_spring_discount&utm_content=cta_booknow&utm_term=
```

### Wedding Directory Listings
```
# The Knot
https://thewhitebarnfl.com/?utm_source=theknot&utm_medium=referral&utm_campaign=directory_listing&utm_content=profile_link&utm_term=

# WeddingWire
https://thewhitebarnfl.com/gallery?utm_source=weddingwire&utm_medium=referral&utm_campaign=directory_listing&utm_content=gallery_link&utm_term=
```

## Tracking Events Mapping

### Conversion Events
| Event Name | Trigger | UTM Tracking |
|------------|---------|--------------|
| lead_submit | Contact form submission | All UTM parameters captured |
| phone_click | Phone number clicked | Source and medium tracked |
| whatsapp_click | WhatsApp button clicked | Source and medium tracked |
| book_tour | Schedule tour button | Campaign and content tracked |

### Page Events
| Event Name | Trigger | UTM Tracking |
|------------|---------|--------------|
| page_view | Page load | All UTM parameters captured |
| gallery_view | Gallery page visit | Campaign and content tracked |
| contact_view | Contact page visit | Source and campaign tracked |

## Implementation Checklist

### ✅ Completed
- [x] UTM parameter capture in tracking utility
- [x] Event tracking with UTM data
- [x] Contact form lead tracking
- [x] Phone click tracking
- [x] WhatsApp click tracking
- [x] Book tour button tracking

### 📋 To Implement in GTM
- [ ] GA4 Configuration tag with Measurement ID
- [ ] Meta Pixel base code and events
- [ ] TikTok Pixel base code and events
- [ ] LinkedIn Insight Tag and conversions
- [ ] Custom event triggers for all conversion events
- [ ] UTM parameter variables in GTM

## Testing URLs

### Test Campaign URLs
```
# Test Google Ads
https://thewhitebarnfl.com/?utm_source=google&utm_medium=cpc&utm_campaign=test_campaign&utm_content=test_ad&utm_term=test_keyword

# Test Facebook
https://thewhitebarnfl.com/?utm_source=facebook&utm_medium=social_paid&utm_campaign=test_social&utm_content=test_image

# Test Email
https://thewhitebarnfl.com/?utm_source=email&utm_medium=email&utm_campaign=test_newsletter&utm_content=test_cta
```

## Notes
- All UTM parameters are case-sensitive
- Use lowercase and underscores for consistency
- Avoid spaces in UTM parameters
- Test all URLs before launching campaigns
- Monitor UTM data in GA4 and GTM debug mode
