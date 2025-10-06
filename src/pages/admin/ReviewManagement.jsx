import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaStar, 
  FaCheck, 
  FaTimes, 
  FaEye, 
  FaTrash,
  FaFilter,
  FaSearch,
  FaDownload,
  FaCalendarAlt,
  FaUser
} from 'react-icons/fa';
import { format } from 'date-fns';
import AnimatedButton from '../../components/ui/AnimatedButton';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import { Alert, AlertDescription } from '../../components/ui/Alert';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import apiService from '../../services/api';

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  // Fetch reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await apiService.getReviews();
        console.log(response)
        setReviews(response.data.reviews);
      } catch (err) {
        setError('Failed to fetch reviews');
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Filter reviews based on search term and status
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && review.status === statusFilter;
  });

  // Handle review status update
  const handleStatusUpdate = async (reviewId, status) => {
    try {
      await apiService.patch(`/reviews/${reviewId}`, { status });
      setReviews(prev => 
        prev.map(review => 
          review._id === reviewId ? { ...review, status } : review
        )
      );
    } catch (err) {
      console.error('Error updating review status:', err);
    }
  };

  // Handle review deletion
  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    
    try {
      await apiService.delete(`/reviews/${reviewId}`);
      setReviews(prev => prev.filter(review => review._id !== reviewId));
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Review Management</h1>
          <p className="text-gray-600">Manage and moderate customer reviews</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search reviews..."
            className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          className="rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredReviews.map((review) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              {/* Review Card Content */}
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <FaUser className="text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{review.clientName}</h3>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-amber-500' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <AnimatedButton
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedReview(review);
                        setShowDetailsModal(true);
                      }}
                    >
                      <FaEye className="w-4 h-4" />
                    </AnimatedButton>
                    <AnimatedButton
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteReview(review._id)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <FaTrash className="w-4 h-4" />
                    </AnimatedButton>
                  </div>
                </div>
                
                <p className="mt-3 text-gray-600">{review.comment}</p>
                <div className="mt-3 text-sm text-gray-500">
                  {format(new Date(review.createdAt), 'MMM d, yyyy')}
                </div>
                
                <div className="mt-3 flex gap-2">
                  <AnimatedButton
                    size="sm"
                    variant={review.status === 'approved' ? 'default' : 'outline'}
                    onClick={() => handleStatusUpdate(review._id, 'approved')}
                  >
                    <FaCheck className="w-3 h-3 mr-1" />
                    Approve
                  </AnimatedButton>
                  <AnimatedButton
                    size="sm"
                    variant={review.status === 'rejected' ? 'destructive' : 'outline'}
                    onClick={() => handleStatusUpdate(review._id, 'rejected')}
                  >
                    <FaTimes className="w-3 h-3 mr-1" />
                    Reject
                  </AnimatedButton>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Review Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Review Details"
      >
        {selectedReview && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-semibold text-gray-700">
                {selectedReview.clientName.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{selectedReview.clientName}</h3>
                <div className="flex items-center gap-1">
                  {renderStars(selectedReview.rating)}
                  <span className="text-sm text-gray-500 ml-1">
                    ({selectedReview.rating}/5)
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <span className="font-medium w-24">Email:</span>
                <a 
                  href={`mailto:${selectedReview.clientEmail}`}
                  className="text-blue-600 hover:underline"
                >
                  {selectedReview.clientEmail}
                </a>
              </div>
              {selectedReview.eventType && (
                <div className="flex items-center gap-2">
                  <span className="font-medium w-24">Event Type:</span>
                  <span className="capitalize">{selectedReview.eventType}</span>
                </div>
              )}
              {selectedReview.eventDate && (
                <div className="flex items-center gap-2">
                  <span className="font-medium w-24">Event Date:</span>
                  <span>{format(new Date(selectedReview.eventDate), 'MMMM dd, yyyy')}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="font-medium w-24">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedReview.status)}`}>
                  {selectedReview.status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium w-24">Submitted:</span>
                <span>{format(new Date(selectedReview.createdAt), 'MMMM dd, yyyy HH:mm')}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <h4 className="font-medium mb-2">Review:</h4>
              <p className="text-gray-700 whitespace-pre-line">
                {selectedReview.review}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              {selectedReview.status !== 'approved' && (
                <AnimatedButton
                  onClick={() => handleApprove(selectedReview._id)}
                  variant="primary"
                  className="flex-1"
                >
                  <FaCheck className="w-4 h-4 mr-2" />
                  Approve Review
                </AnimatedButton>
              )}
              {selectedReview.status !== 'rejected' && (
                <AnimatedButton
                  onClick={() => handleReject(selectedReview._id)}
                  variant="outline"
                  className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
                >
                  <FaTimes className="w-4 h-4 mr-2" />
                  Reject Review
                </AnimatedButton>
              )}
              <AnimatedButton
                variant="outline"
                onClick={() => setShowDetailsModal(false)}
                className="mt-0 sm:mt-0 w-full sm:w-auto"
              >
                Close
              </AnimatedButton>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ReviewManagement;
