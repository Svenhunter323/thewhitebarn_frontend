import { useState, useEffect } from 'react';
import { 
  FaHome, 
  FaInfoCircle, 
  FaPhone, 
  FaSave, 
  FaUndo,
  FaBuilding,
  FaShare,
  FaPlus,
  FaTrash
} from 'react-icons/fa';
import AnimatedButton from '../../components/ui/AnimatedButton';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import apiService from '../../services/api';
import toast from 'react-hot-toast';

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const tabs = [
    { id: 'home', label: 'Homepage', icon: FaHome },
    { id: 'about', label: 'About Us', icon: FaInfoCircle },
    { id: 'contact', label: 'Contact Info', icon: FaPhone },
    { id: 'property', label: 'Property Details', icon: FaBuilding },
    { id: 'social', label: 'Social Links', icon: FaShare }
  ];

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await apiService.request('/content/admin/all', {
        method: 'GET'
      });
      // console.log("content data:\n", response)
      setContent(response.data.content || {});
    } catch (error) {
      console.error('Error fetching content:', error);
      toast.error('Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save each content section individually using existing endpoints
      const savePromises = [];
      
      if (content.contactDetails) {
        // Remove MongoDB-specific fields before saving
        const { _id, __v, createdAt: _createdAt, updatedAt: _updatedAt, ...cleanContactData } = content.contactDetails;
        savePromises.push(
          apiService.request('/content/contact-details', {
            method: 'POST',
            body: JSON.stringify(cleanContactData)
          })
        );
      }
      
      if (content.aboutDetails) {
        // Remove MongoDB-specific fields before saving
        const { _id, __v, createdAt: _createdAt, updatedAt: _updatedAt, ...cleanAboutData } = content.aboutDetails;
        // Clean team members array
        if (cleanAboutData.teamMembers) {
          cleanAboutData.teamMembers = cleanAboutData.teamMembers.map(member => {
            const { _id, ...cleanMember } = member;
            return cleanMember;
          });
        }
        savePromises.push(
          apiService.request('/content/about-details', {
            method: 'POST',
            body: JSON.stringify(cleanAboutData)
          })
        );
      }
      
      if (content.homeDetails) {
        // Remove MongoDB-specific fields before saving
        const { _id, __v, createdAt: _createdAt, updatedAt: _updatedAt, ...cleanHomeData } = content.homeDetails;
        savePromises.push(
          apiService.request('/content/home-details', {
            method: 'POST',
            body: JSON.stringify(cleanHomeData)
          })
        );
      }
      
      if (content.propertyDetails) {
        // Remove MongoDB-specific fields before saving
        const { _id, __v, createdAt: _createdAt, updatedAt: _updatedAt, ...cleanPropertyData } = content.propertyDetails;
        // Clean images array
        if (cleanPropertyData.images) {
          cleanPropertyData.images = cleanPropertyData.images.map(image => {
            const { _id, ...cleanImage } = image;
            return cleanImage;
          });
        }
        savePromises.push(
          apiService.request('/content/property-details', {
            method: 'POST',
            body: JSON.stringify(cleanPropertyData)
          })
        );
      }
      
      // Note: Social links are managed separately through social links endpoints
      // Property details saving is handled above
      
      // Execute all save operations
      await Promise.all(savePromises);
      
      toast.success('Content saved successfully');
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const updateContent = (section, field, value) => {
    // Map section names to API property names
    const sectionMap = {
      'home': 'homeDetails',
      'about': 'aboutDetails', 
      'contact': 'contactDetails',
      'property': 'propertyDetails',
      'social': 'socialLinks'
    };
    
    const apiSection = sectionMap[section] || section;
    
    setContent(prev => {
      // Handle social links as array
      if (section === 'social' && field === 'socialLinks') {
        return {
          ...prev,
          [apiSection]: value
        };
      }
      
      // Handle other sections as objects
      return {
        ...prev,
        [apiSection]: {
          ...prev[apiSection],
          [field]: value
        }
      };
    });
    setHasChanges(true);
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading content..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600">Manage your website content and information</p>
        </div>
        <div className="flex gap-3">
          {hasChanges && (
            <AnimatedButton
              className="btn-primary relative overflow-hidden group"
              variant="primary"
              hoverEffect={true}
              fullWidth={false}
              onClick={() => {
                fetchContent();
                setHasChanges(false);
              }}
            >
              <FaUndo className="w-4 h-4" />
              <span className="relative z-10">Reset Changes</span>
            </AnimatedButton>
          )}
          <AnimatedButton
            onClick={handleSave}
            loading={saving}
            disabled={!hasChanges}
            variant="primary"
            className="btn-primary relative overflow-hidden group"
          >
            <FaSave className="w-4 h-4" />
            <span className="relative z-10">Save Changes</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Forms */}
      <div className="space-y-6">
        {activeTab === 'home' && (
          <HomeContentForm
            content={content.homeDetails || {}}
            onChange={(field, value) => updateContent('home', field, value)}
          />
        )}
        
        {activeTab === 'about' && (
          <AboutContentForm
            content={content.aboutDetails || {}}
            onChange={(field, value) => updateContent('about', field, value)}
          />
        )}
        
        {activeTab === 'contact' && (
          <ContactContentForm
            content={content.contactDetails || {}}
            onChange={(field, value) => updateContent('contact', field, value)}
          />
        )}
        
        {activeTab === 'property' && (
          <PropertyContentForm
            content={content.propertyDetails || {}}
            onChange={(field, value) => updateContent('property', field, value)}
          />
        )}
        
        {activeTab === 'social' && (
          <SocialLinksForm
            content={content.socialLinks || []}
            onChange={(field, value) => updateContent('social', field, value)}
          />
        )}
      </div>
    </div>
  );
};

const HomeContentForm = ({ content, onChange }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="Main Headline"
            value={content.heroTitle || ''}
            onChange={(e) => onChange('heroTitle', e.target.value)}
            placeholder="Your Perfect Event Starts Here"
          />
          <div className="space-y-2">
            <label className="text-sm font-medium">Hero Description</label>
            <textarea
              value={content.heroDescription || ''}
              onChange={(e) => onChange('heroDescription', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Create unforgettable memories at our beautiful venue..."
            />
          </div>
          <Input
            label="Call-to-Action Button Text"
            value={content.heroCTA || ''}
            onChange={(e) => onChange('heroCTA', e.target.value)}
            placeholder="Book Your Event"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Services Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="Services Title"
            value={content.servicesTitle || ''}
            onChange={(e) => onChange('servicesTitle', e.target.value)}
            placeholder="Our Services"
          />
          <div className="space-y-2">
            <label className="text-sm font-medium">Services Description</label>
            <textarea
              value={content.servicesDescription || ''}
              onChange={(e) => onChange('servicesDescription', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="We offer a variety of services for your special events..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Features Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="Features Title"
            value={content.featuresTitle || ''}
            onChange={(e) => onChange('featuresTitle', e.target.value)}
            placeholder="Why Choose Us"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(num => (
              <div key={num} className="space-y-2">
                <Input
                  label={`Feature ${num} Title`}
                  value={content[`feature${num}Title`] || ''}
                  onChange={(e) => onChange(`feature${num}Title`, e.target.value)}
                  placeholder={`Feature ${num}`}
                />
                <textarea
                  value={content[`feature${num}Description`] || ''}
                  onChange={(e) => onChange(`feature${num}Description`, e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder={`Description for feature ${num}...`}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AboutContentForm = ({ content, onChange }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>About Us Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="Page Title"
            value={content.title || ''}
            onChange={(e) => onChange('title', e.target.value)}
            placeholder="About The White Barn FL"
          />
          <div className="space-y-2">
            <label className="text-sm font-medium">Main Content</label>
            <textarea
              value={content.mainContent || ''}
              onChange={(e) => onChange('mainContent', e.target.value)}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Tell your story here..."
            />
          </div>
          <Input
            label="Mission Statement"
            value={content.mission || ''}
            onChange={(e) => onChange('mission', e.target.value)}
            placeholder="Our mission is to..."
          />
          <div className="space-y-2">
            <label className="text-sm font-medium">Vision Statement</label>
            <textarea
              value={content.vision || ''}
              onChange={(e) => onChange('vision', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Our vision is to..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="Team Section Title"
            value={content.teamTitle || ''}
            onChange={(e) => onChange('teamTitle', e.target.value)}
            placeholder="Meet Our Team"
          />
          <div className="space-y-2">
            <label className="text-sm font-medium">Team Description</label>
            <textarea
              value={content.teamDescription || ''}
              onChange={(e) => onChange('teamDescription', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Our experienced team is dedicated to..."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ContactContentForm = ({ content, onChange }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Business Name"
              value={content.businessName || ''}
              onChange={(e) => onChange('businessName', e.target.value)}
              placeholder="The White Barn FL"
            />
            <Input
              label="Phone Number"
              value={content.phone || ''}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder="(555) 123-4567"
            />
            <Input
              label="Email Address"
              type="email"
              value={content.email || ''}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="info@thewhitebarnfl.com"
            />
            <Input
              label="Website"
              value={content.website || ''}
              onChange={(e) => onChange('website', e.target.value)}
              placeholder="www.thewhitebarnfl.com"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Address</label>
            <textarea
              value={content.address || ''}
              onChange={(e) => onChange('address', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="123 Barn Road, City, State 12345"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Hours</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
          ].map(day => (
            <div key={day} className="grid grid-cols-3 gap-4 items-center">
              <label className="text-sm font-medium">{day}</label>
              <Input
                value={content[`${day.toLowerCase()}Hours`] || ''}
                onChange={(e) => onChange(`${day.toLowerCase()}Hours`, e.target.value)}
                placeholder="9:00 AM - 5:00 PM"
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`${day}-closed`}
                  checked={content[`${day.toLowerCase()}Closed`] || false}
                  onChange={(e) => onChange(`${day.toLowerCase()}Closed`, e.target.checked)}
                  className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor={`${day}-closed`} className="ml-2 text-sm text-gray-600">
                  Closed
                </label>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Facebook URL"
              value={content.facebookUrl || ''}
              onChange={(e) => onChange('facebookUrl', e.target.value)}
              placeholder="https://facebook.com/thewhitebarnfl"
            />
            <Input
              label="Instagram URL"
              value={content.instagramUrl || ''}
              onChange={(e) => onChange('instagramUrl', e.target.value)}
              placeholder="https://instagram.com/thewhitebarnfl"
            />
            <Input
              label="Twitter URL"
              value={content.twitterUrl || ''}
              onChange={(e) => onChange('twitterUrl', e.target.value)}
              placeholder="https://twitter.com/thewhitebarnfl"
            />
            <Input
              label="LinkedIn URL"
              value={content.linkedinUrl || ''}
              onChange={(e) => onChange('linkedinUrl', e.target.value)}
              placeholder="https://linkedin.com/company/thewhitebarnfl"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const PropertyContentForm = ({ content, onChange }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Property Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Property Name"
              value={content.name || ''}
              onChange={(e) => onChange('name', e.target.value)}
              placeholder="The White Barn FL"
            />
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={content.description || ''}
                onChange={(e) => onChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Property description..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Capacity & Pricing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Seated Capacity"
              type="number"
              value={content.capacity?.seated || ''}
              onChange={(e) => onChange('capacity', { ...content.capacity, seated: parseInt(e.target.value) || 0 })}
              placeholder="150"
            />
            <Input
              label="Standing Capacity"
              type="number"
              value={content.capacity?.standing || ''}
              onChange={(e) => onChange('capacity', { ...content.capacity, standing: parseInt(e.target.value) || 0 })}
              placeholder="200"
            />
            <Input
              label="Base Price ($)"
              type="number"
              value={content.pricing?.basePrice || ''}
              onChange={(e) => onChange('pricing', { ...content.pricing, basePrice: parseInt(e.target.value) || 0 })}
              placeholder="3500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Pricing Notes</label>
            <textarea
              value={content.pricing?.pricingNotes || ''}
              onChange={(e) => onChange('pricing', { ...content.pricing, pricingNotes: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Additional pricing information..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Address"
              value={content.location?.address || ''}
              onChange={(e) => onChange('location', { ...content.location, address: e.target.value })}
              placeholder="4680 SW 148th Ave"
            />
            <Input
              label="City"
              value={content.location?.city || ''}
              onChange={(e) => onChange('location', { ...content.location, city: e.target.value })}
              placeholder="Fort Lauderdale"
            />
            <Input
              label="State"
              value={content.location?.state || ''}
              onChange={(e) => onChange('location', { ...content.location, state: e.target.value })}
              placeholder="FL"
            />
            <Input
              label="Zip Code"
              value={content.location?.zipCode || ''}
              onChange={(e) => onChange('location', { ...content.location, zipCode: e.target.value })}
              placeholder="33330"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SocialLinksForm = ({ content, onChange }) => {
  const platforms = ['facebook', 'instagram', 'twitter', 'linkedin', 'youtube', 'tiktok'];
  
  const addSocialLink = () => {
    const newLink = {
      platform: 'facebook',
      url: '',
      isActive: true
    };
    onChange('socialLinks', [...(content || []), newLink]);
  };
  
  const updateSocialLink = (index, field, value) => {
    const updatedLinks = [...(content || [])];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    onChange('socialLinks', updatedLinks);
  };
  
  const removeSocialLink = (index) => {
    const updatedLinks = [...(content || [])];
    updatedLinks.splice(index, 1);
    onChange('socialLinks', updatedLinks);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Social Media Links</CardTitle>
            <AnimatedButton
              onClick={addSocialLink}
              variant="outline"
              size="sm"
            >
              <FaPlus className="w-4 h-4" />
              Add Link
            </AnimatedButton>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {(content || []).map((link, index) => (
            <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Platform</label>
                  <select
                    value={link.platform || 'facebook'}
                    onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {platforms.map(platform => (
                      <option key={platform} value={platform}>
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">URL</label>
                  <Input
                    value={link.url || ''}
                    onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                    placeholder={`https://${link.platform || 'facebook'}.com/thewhitebarnfl`}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`active-${index}`}
                      checked={link.isActive !== false}
                      onChange={(e) => updateSocialLink(index, 'isActive', e.target.checked)}
                      className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                    <label htmlFor={`active-${index}`} className="ml-2 text-sm text-gray-600">
                      Active
                    </label>
                  </div>
                  <AnimatedButton
                    onClick={() => removeSocialLink(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <FaTrash className="w-4 h-4" />
                  </AnimatedButton>
                </div>
              </div>
            </div>
          ))}
          
          {(!content || content.length === 0) && (
            <div className="text-center py-8 text-gray-500">
              <p>No social media links added yet.</p>
              <p className="text-sm">Click "Add Link" to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement;
