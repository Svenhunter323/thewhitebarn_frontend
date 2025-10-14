import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import VideoGallery from './pages/VideoGallery';
import Contact from './pages/Contact';
import Licenses from './pages/Licenses';
import Associations from './pages/Associations';
import Weddings from './pages/Weddings';
import Corporate from './pages/Corporate';
import ShowersFamily from './pages/ShowersFamily';
import IndoorAC from './pages/IndoorAC';
import Reviews from './pages/Reviews';
import PrintSign from './pages/PrintSign';
import SubmitReview from './pages/SubmitReview.jsx';

// Admin components
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import ContactManagement from './pages/admin/ContactManagement';
import GalleryManagement from './pages/admin/GalleryManagement';
import ContentManagement from './pages/admin/ContentManagement';
import ReviewManagement from './pages/admin/ReviewManagement';
import UserManagement from './pages/admin/UserManagement';
import Analytics from './pages/admin/Analytics';
import Settings from './pages/admin/Settings';

import { initAllTracking, GTMNoScript, track } from './utils/enhancedTracking.jsx';

const PageViewTracker = () => {
  const location = useLocation()
  useEffect(() => {
    track('page_view', { page_path: location.pathname + location.search })
  }, [location])
  return null
}

initAllTracking()

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <AuthProvider>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <GTMNoScript gtmId={import.meta.env.VITE_GTM_ID} />
          <PageViewTracker />
          <Routes>
            {/* Public Routes with Layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="videos" element={<VideoGallery />} />
              <Route path="contact" element={<Contact />} />
              <Route path="licenses" element={<Licenses />} />
              <Route path="associations" element={<Associations />} />
              <Route path="weddings" element={<Weddings />} />
              <Route path="corporate" element={<Corporate />} />
              <Route path="showers-family" element={<ShowersFamily />} />
              <Route path="indoor-ac" element={<IndoorAC />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="print-sign" element={<PrintSign />} />
              <Route path='submit-review' element={<SubmitReview />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="contacts" element={<ContactManagement />} />
              <Route path="gallery" element={<GalleryManagement />} />
              <Route path="content" element={<ContentManagement />} />
              <Route path="reviews" element={<ReviewManagement />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="admins" element={<UserManagement />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
          </Router>
        </AuthProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
