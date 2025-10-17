import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import ApiService from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { 
  UserGroupIcon, 
  ChartBarIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  QrCodeIcon,
  ArrowDownTrayIcon,
  PlusIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const PartnerManagement = () => {
  const [partners, setPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [partnerLeads, setPartnerLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterActive, setFilterActive] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const response = await ApiService.get('/partners', {
        params: {
          search: searchTerm,
          type: filterType !== 'all' ? filterType : undefined,
          active: filterActive !== 'all' ? filterActive === 'active' : undefined
        }
      });
      
      if (response.data.status === 'success') {
        setPartners(response.data.data.partners);
      }
    } catch (error) {
      console.error('Error fetching partners:', error);
      toast.error('Failed to fetch partners');
    } finally {
      setLoading(false);
    }
  };

  const fetchPartnerLeads = async (partnerCode) => {
    try {
      setLeadsLoading(true);
      const response = await ApiService.get(`/admin/contacts/by-partner?code=${partnerCode}`);
      
      if (response.data.status === 'success') {
        setPartnerLeads(response.data.data.contacts);
      }
    } catch (error) {
      console.error('Error fetching partner leads:', error);
      toast.error('Failed to fetch partner leads');
    } finally {
      setLeadsLoading(false);
    }
  };

  const handleViewPartner = async (partner) => {
    setSelectedPartner(partner);
    await fetchPartnerLeads(partner.code);
  };

  const handleTogglePartnerStatus = async (partnerId, currentStatus) => {
    try {
      const response = await ApiService.put(`/partners/${partnerId}`, {
        active: !currentStatus
      });
      
      if (response.data.status === 'success') {
        toast.success(`Partner ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
        fetchPartners();
      }
    } catch (error) {
      console.error('Error updating partner status:', error);
      toast.error('Failed to update partner status');
    }
  };

  const handleDeletePartner = async (partnerId) => {
    if (!confirm('Are you sure you want to deactivate this partner?')) {
      return;
    }

    try {
      const response = await ApiService.delete(`/partners/${partnerId}`);
      
      if (response.data.status === 'success') {
        toast.success('Partner deactivated successfully');
        fetchPartners();
        if (selectedPartner && selectedPartner._id === partnerId) {
          setSelectedPartner(null);
        }
      }
    } catch (error) {
      console.error('Error deleting partner:', error);
      toast.error('Failed to deactivate partner');
    }
  };

  const downloadQRCode = async (partnerCode) => {
    try {
      const response = await fetch(`/api/partners/qr/${partnerCode}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `partner-qr-${partnerCode}.png`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success('QR code downloaded successfully');
      } else {
        throw new Error('Failed to download QR code');
      }
    } catch (error) {
      console.error('Error downloading QR code:', error);
      toast.error('Failed to download QR code');
    }
  };

  const exportPartnerLeads = () => {
    if (!partnerLeads.length) {
      toast.error('No leads to export');
      return;
    }

    const csvData = partnerLeads.map(lead => ({
      Date: new Date(lead.createdAt).toLocaleDateString(),
      Name: lead.name,
      Email: lead.email,
      Phone: lead.phone || '',
      'Event Type': lead.eventType || '',
      'Event Date': lead.eventDate ? new Date(lead.eventDate).toLocaleDateString() : '',
      'Guest Count': lead.guestCount || '',
      Budget: lead.budget || '',
      'UTM Source': lead.utm?.source || '',
      'UTM Campaign': lead.utm?.campaign || '',
      Status: lead.status,
      'Tour Scheduled': lead.tourScheduled ? 'Yes' : 'No',
      Booked: lead.booked ? 'Yes' : 'No'
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `partner-leads-${selectedPartner.code}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    toast.success('Leads exported successfully');
  };

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || partner.type === filterType;
    const matchesActive = filterActive === 'all' || 
                         (filterActive === 'active' && partner.active) ||
                         (filterActive === 'inactive' && !partner.active);
    
    return matchesSearch && matchesType && matchesActive;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Partner Management</h1>
          <p className="text-gray-600 mt-1">Manage affiliate and influencer partnerships</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Partner</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Partners
            </label>
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or code..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Partner Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="affiliate">Affiliate</option>
              <option value="influencer">Influencer</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filterActive}
              onChange={(e) => setFilterActive(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={fetchPartners}
              className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Partners List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Partners ({filteredPartners.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Partner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPartners.map((partner) => (
                <tr key={partner._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {partner.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {partner.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      partner.type === 'affiliate' ? 'bg-blue-100 text-blue-800' :
                      partner.type === 'influencer' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {partner.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                    {partner.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex space-x-4">
                      <span className="text-blue-600">{partner.leadCount || 0} leads</span>
                      <span className="text-green-600">{partner.bookingCount || 0} bookings</span>
                      <span className="text-purple-600">{partner.conversionRate || 0}% conv.</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      partner.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {partner.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewPartner(partner)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => downloadQRCode(partner.code)}
                        className="text-green-600 hover:text-green-900"
                        title="Download QR Code"
                      >
                        <QrCodeIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingPartner(partner)}
                        className="text-yellow-600 hover:text-yellow-900"
                        title="Edit Partner"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleTogglePartnerStatus(partner._id, partner.active)}
                        className={`${partner.active ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                        title={partner.active ? 'Deactivate' : 'Activate'}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredPartners.length === 0 && (
            <div className="text-center py-12">
              <UserGroupIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No partners found matching your criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Partner Details Modal */}
      {selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedPartner.name}
                  </h3>
                  <p className="text-gray-600">{selectedPartner.code}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={exportPartnerLeads}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={() => setSelectedPartner(null)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Partner Stats */}
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {partnerLeads.length}
                  </div>
                  <div className="text-sm text-blue-800">Total Leads</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {partnerLeads.filter(lead => lead.tourScheduled).length}
                  </div>
                  <div className="text-sm text-green-800">Tours Scheduled</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {partnerLeads.filter(lead => lead.booked).length}
                  </div>
                  <div className="text-sm text-purple-800">Bookings</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {partnerLeads.length > 0 
                      ? ((partnerLeads.filter(lead => lead.booked).length / partnerLeads.length) * 100).toFixed(1)
                      : 0}%
                  </div>
                  <div className="text-sm text-yellow-800">Conversion Rate</div>
                </div>
              </div>

              {/* Partner Leads Table */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Leads ({partnerLeads.length})
                </h4>
                
                {leadsLoading ? (
                  <div className="text-center py-8">
                    <LoadingSpinner />
                  </div>
                ) : partnerLeads.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            Date
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            Contact
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            Event
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            UTM Source
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {partnerLeads.slice(0, 10).map((lead) => (
                          <tr key={lead._id}>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              {new Date(lead.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-2">
                              <div className="text-sm font-medium text-gray-900">
                                {lead.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {lead.email}
                              </div>
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              {lead.eventType || 'General'}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              {lead.utm?.source || '-'}
                            </td>
                            <td className="px-4 py-2">
                              <div className="flex space-x-2">
                                {lead.tourScheduled && (
                                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                    Tour
                                  </span>
                                )}
                                {lead.booked && (
                                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                    Booked
                                  </span>
                                )}
                                {!lead.tourScheduled && !lead.booked && (
                                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                    Lead
                                  </span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ChartBarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No leads found for this partner</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerManagement;
