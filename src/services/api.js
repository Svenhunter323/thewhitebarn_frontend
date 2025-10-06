import axios from 'axios';
import toast from 'react-hot-toast';
import tokenManager from '../utils/tokenManager';

// Configure axios defaults
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
axios.defaults.baseURL = API_BASE_URL;

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    // Add authorization header if token exists
    const token = tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      tokenManager.removeToken();
      window.location.href = '/admin/login';
    } else if (error.response?.status === 403) {
      toast.error('You do not have permission to perform this action');
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    }
    
    return Promise.reject(error);
  }
);

// =============================================================================
// PUBLIC API - No authentication required
// =============================================================================
export const publicAPI = {
  // Content
  getHomeDetails: () => axios.get('/content/home-details'),
  getAboutDetails: () => axios.get('/content/about-details'),
  getContactDetails: () => axios.get('/content/contact-details'),
  getSocialLinks: () => axios.get('/content/social-links'),
  getPropertyDetails: () => axios.get('/content/property-details'),

  // Gallery
  getGalleryImages: (params = {}) => {
    const { category, limit = 20, skip = 0 } = params;
    const queryParams = new URLSearchParams();
    if (category && category !== 'all') queryParams.append('category', category);
    queryParams.append('limit', limit);
    queryParams.append('skip', skip);
    return axios.get(`/gallery?${queryParams.toString()}`);
  },
  getGalleryCategories: () => axios.get('/gallery/categories'),
  getGalleryImage: (id) => axios.get(`/gallery/${id}`),

  // Reviews
  getReviews: (params = {}) => {
    const queryParams = new URLSearchParams(params);
    return axios.get(`/reviews?${queryParams.toString()}`);
  },
  getApprovedReviews: () => axios.get('/reviews?status=approved'),
  submitReview: (data) => axios.post('/reviews', data),

  // Contact
  submitContactForm: (data) => axios.post('/contact', data),
};

// =============================================================================
// ADMIN API - Requires authentication
// =============================================================================
export const adminAPI = {
  // Dashboard
  getDashboardStats: () => axios.get('/admin/dashboard/stats'),

  // Authentication
  login: (credentials) => axios.post('/auth/login', credentials),
  logout: () => axios.post('/auth/logout'),
  getProfile: () => axios.get('/auth/me'),
  updateProfile: (data) => axios.put('/auth/profile', data),
  changePassword: (data) => axios.put('/auth/change-password', data),

  // Admin Management
  getAllAdmins: (params = {}) => axios.get('/admin/admins', { params }),
  updateAdminStatus: (id, data) => axios.put(`/admin/admins/${id}`, data),
  deleteAdmin: (id) => axios.delete(`/admin/admins/${id}`),

  // Contact Management
  getContacts: (params = {}) => axios.get('/admin/contacts', { params }),
  getContact: (id) => axios.get(`/admin/contacts/${id}`),
  updateContactStatus: (id, data) => axios.put(`/admin/contacts/${id}`, data),
  deleteContact: (id) => axios.delete(`/admin/contacts/${id}`),

  // Content Management
  getAllContent: () => axios.get('/content/admin/all'),
  updateContactDetails: (data) => axios.post('/content/contact-details', data),
  updateAboutDetails: (data) => axios.post('/content/about-details', data),
  updateHomeDetails: (data) => axios.post('/content/home-details', data),
  updatePropertyDetails: (data) => axios.post('/content/property-details', data),
  updateSocialLinks: (data) => axios.put('/admin/social-links', data),

  // Review Management (Updated endpoints)
  getReviews: (params = {}) => axios.get('/reviews/admin/all', { params }),
  getReviewStats: () => axios.get('/reviews/admin/stats'),
  updateReviewStatus: (id, data) => axios.patch(`/reviews/admin/${id}`, data),
  deleteReview: (id) => axios.delete(`/reviews/admin/${id}`),
  bulkUpdateReviews: (data) => axios.patch('/reviews/admin/bulk', data),

  // Gallery Management (Updated endpoints)
  getGalleryImages: (params = {}) => axios.get('/gallery/admin', { params }),
  updateGalleryImage: (id, data) => axios.put(`/gallery/admin/${id}`, data),
  deleteGalleryImage: (id) => axios.delete(`/gallery/admin/${id}`),
  updateGalleryOrder: (data) => axios.put('/gallery/admin/order', data),
  bulkUpdateGalleryImages: (data) => axios.patch('/gallery/admin/bulk', data),

  // File Upload
  uploadGalleryImages: (formData, onProgress) => {
    return axios.post('/upload/gallery', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: onProgress
    });
  },
  uploadAvatar: (formData) => {
    return axios.post('/upload/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  },

  // Analytics
  getAnalytics: (params = {}) => axios.get('/analytics', { params }),
  trackPageView: (data) => axios.post('/analytics/track', data),

  // Settings
  getSettings: (category) => axios.get(`/settings/${category}`),
  updateSettings: (category, data) => axios.put(`/settings/${category}`, data),
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================
export const handleApiError = (error, defaultMessage = 'An error occurred') => {
  const message = error.response?.data?.message || defaultMessage;
  toast.error(message);
  return message;
};

export const handleApiSuccess = (response, defaultMessage = 'Operation successful') => {
  const message = response.data?.message || defaultMessage;
  toast.success(message);
  return message;
};

// File upload utilities
export const uploadFile = async (file, endpoint, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(endpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      if (onProgress) {
        onProgress(percentCompleted);
      }
    }
  });

  return response.data;
};

export const uploadMultipleFiles = async (files, endpoint, onProgress) => {
  const formData = new FormData();
  
  files.forEach((file) => {
    formData.append('images', file);
  });

  const response = await axios.post(endpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      if (onProgress) {
        onProgress(percentCompleted);
      }
    }
  });

  return response.data;
};

// =============================================================================
// LEGACY COMPATIBILITY - For components still using the old ApiService class
// =============================================================================
class ApiService {
  // Content methods
  async getHomeDetails() {
    const response = await publicAPI.getHomeDetails();
    return response.data;
  }

  async getAboutDetails() {
    const response = await publicAPI.getAboutDetails();
    return response.data;
  }

  async getContactDetails() {
    const response = await publicAPI.getContactDetails();
    return response.data;
  }

  async getSocialLinks() {
    const response = await publicAPI.getSocialLinks();
    return response.data;
  }

  async getPropertyDetails() {
    const response = await publicAPI.getPropertyDetails();
    return response.data;
  }

  // Gallery methods
  async getGalleryImages(category = '') {
    const response = await publicAPI.getGalleryImages({ category });
    return response.data;
  }

  async getGalleryCategories() {
    const response = await publicAPI.getGalleryCategories();
    return response.data;
  }

  // Admin Gallery methods
  async getAdminGalleryImages(params = {}) {
    const response = await adminAPI.getGalleryImages(params);
    return response.data;
  }

  async updateGalleryImage(id, data) {
    const response = await adminAPI.updateGalleryImage(id, data);
    return response.data;
  }

  async deleteGalleryImage(id) {
    const response = await adminAPI.deleteGalleryImage(id);
    return response.data;
  }

  async updateGalleryOrder(data) {
    const response = await adminAPI.updateGalleryOrder(data);
    return response.data;
  }

  // Contact methods
  async submitContactForm(formData) {
    const response = await publicAPI.submitContactForm(formData);
    return response.data;
  }

  // Review methods
  async getReviews(params = {}) {
    const response = await publicAPI.getReviews(params);
    return response.data;
  }

  async getApprovedReviews() {
    const response = await publicAPI.getApprovedReviews();
    return response.data;
  }

  async submitReview(reviewData) {
    const response = await publicAPI.submitReview(reviewData);
    return response.data;
  }

  // Admin Review methods
  async getAdminReviews(params = {}) {
    const response = await adminAPI.getReviews(params);
    return response.data;
  }

  async updateReviewStatus(id, data) {
    const response = await adminAPI.updateReviewStatus(id, data);
    return response.data;
  }

  async deleteReview(id) {
    const response = await adminAPI.deleteReview(id);
    return response.data;
  }

  // Generic request method for backward compatibility
  async request(endpoint, options = {}) {
    const response = await axios({
      url: endpoint,
      ...options,
      data: options.body ? JSON.parse(options.body) : options.data
    });
    return response.data;
  }

  // Token management
  setAuthToken(token) {
    tokenManager.setToken(token);
  }

  getStoredToken() {
    return tokenManager.getToken();
  }
}

// Export both the new API structure and legacy compatibility
export default new ApiService();
export { axios };
