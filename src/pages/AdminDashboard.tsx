import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Calendar,
  Eye
} from 'lucide-react';
import { RootState } from '../store';
import { fetchStats, fetchRequests, updateRequestStatus } from '../store/slices/adminSlice';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import RequestDetailsModal from '../components/Admin/RequestDetailsModal';

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { stats, requests, isLoading } = useSelector((state: RootState) => state.admin);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchStats() as any);
    dispatch(fetchRequests() as any);
  }, [dispatch]);

  const handleViewRequest = (request: any) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      await dispatch(updateRequestStatus({ id, status }) as any);
      // Refresh requests after update
      dispatch(fetchRequests() as any);
      dispatch(fetchStats() as any);
    } catch (error) {
      console.error('Failed to update request status:', error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  const statCards = [
    {
      title: 'Total services',
      value: stats.totalServices,
      icon: Briefcase,
      color: 'bg-blue-500',
    },
    {
      title: 'Blog posts',
      value: stats.totalPosts,
      icon: FileText,
      color: 'bg-green-500',
    },
    {
      title: 'Total users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      title: 'Pending requests',
      value: stats.pendingRequests,
      icon: MessageSquare,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Easily manage services, posts, users and requests.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Requests */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Recent service requests
              </h2>
            </div>
            
            <div className="space-y-4">
              {requests.slice(0, 5).map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {request.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {request.serviceType}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-500 text-xs">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : request.status === 'approved'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}
                    >
                      {request.status}
                    </span>
                    <button 
                      onClick={() => handleViewRequest(request)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                      title="View request details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Quick actions
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/admin/services"
                className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors duration-200"
              >
                <Briefcase className="w-8 h-8 text-blue-600 mb-2" />
                <span className="text-blue-600 font-medium">Manage services</span>
              </Link>
              
              <button className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900 rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors duration-200">
                <FileText className="w-8 h-8 text-green-600 mb-2" />
                <span className="text-green-600 font-medium">New post</span>
              </button>
              
              <button className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors duration-200">
                <Users className="w-8 h-8 text-purple-600 mb-2" />
                <span className="text-purple-600 font-medium">Manage users</span>
              </button>
              
              <button className="flex flex-col items-center p-4 bg-orange-50 dark:bg-orange-900 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-800 transition-colors duration-200">
                <MessageSquare className="w-8 h-8 text-orange-600 mb-2" />
                <span className="text-orange-600 font-medium">View requests</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Request Details Modal */}
      {selectedRequest && (
        <RequestDetailsModal
          request={selectedRequest}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
};

export default AdminDashboard;