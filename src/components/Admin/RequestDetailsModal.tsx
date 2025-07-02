import React from 'react';
import { X, User, Mail, MessageSquare, Calendar, Tag, Clock } from 'lucide-react';
import { ServiceRequest } from '../../types';

interface RequestDetailsModalProps {
  request: ServiceRequest;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate?: (id: number, status: string) => void;
}

const RequestDetailsModal: React.FC<RequestDetailsModalProps> = ({
  request,
  isOpen,
  onClose,
  onStatusUpdate,
}) => {
  if (!isOpen) return null;

  const handleStatusUpdate = (status: string) => {
    if (onStatusUpdate) {
      onStatusUpdate(request.id, status);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Service request details
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}
            >
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </span>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(request.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>

          {/* Client Information */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Client Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Full name</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{request.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                  <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email address</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{request.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Information */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Service Information
            </h3>
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
                <Tag className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Requested service</p>
                <p className="font-semibold text-gray-900 dark:text-white">{request.serviceType}</p>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>Client message</span>
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {request.message}
              </p>
            </div>
          </div>

          {/* Request Timeline */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Request timeline</span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Request submitted</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(request.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              {request.status !== 'pending' && (
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    request.status === 'approved' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Request {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Status updated by admin
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        {onStatusUpdate && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Update request status
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleStatusUpdate('pending')}
                disabled={request.status === 'pending'}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400 text-white rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed"
              >
                Mark as pending
              </button>
              <button
                onClick={() => handleStatusUpdate('approved')}
                disabled={request.status === 'approved'}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed"
              >
                Approve request
              </button>
              <button
                onClick={() => handleStatusUpdate('rejected')}
                disabled={request.status === 'rejected'}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed"
              >
                Reject request
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestDetailsModal;