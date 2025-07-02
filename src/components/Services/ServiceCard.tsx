import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      <div className="relative">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-48 object-cover"
        />
        {service.featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-3">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
            {service.category}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          {service.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {service.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{service.duration}</span>
          </div>
          <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
            <span className="font-semibold">€{service.price.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {service.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
              >
                {tag}
              </span>
            ))}
            {service.tags.length > 3 && (
              <span className="text-gray-500 dark:text-gray-400 text-xs">
                +{service.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <Link
          to={`/services/${service.id}`}
          className="flex items-center justify-center space-x-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          <span>Learn more</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;