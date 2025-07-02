import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  ArrowLeft, 
  Clock, 
  Star, 
  CheckCircle, 
  Tag,
  Award
} from 'lucide-react';
import { RootState } from '../store';
import { fetchServiceById, clearCurrentService } from '../store/slices/servicesSlice';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ContactForm from '../components/Forms/ContactForm';

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { currentService, isLoading } = useSelector((state: RootState) => state.services);

  useEffect(() => {
    if (id) {
      dispatch(fetchServiceById(parseInt(id)) as any);
    }
    
    return () => {
      dispatch(clearCurrentService());
    };
  }, [dispatch, id]);

  if (isLoading) {
    return <LoadingSpinner message="Loading service details..." />;
  }

  if (!currentService) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Service not found
          </h1>
          <Link
            to="/services"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const features = [
    'Tailored approach',
    'Data-driven decisions',
    'Clear deliverables',
    'Collaborative workflow',
    'Documentation & reporting',
    'Scalable solutions',
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            to="/services"
            className="inline-flex items-center space-x-2 text-blue-100 hover:text-white mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Services</span>
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4">
                <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentService.category}
                </span>
                {currentService.featured && (
                  <span className="ml-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                {currentService.title}
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                {currentService.description}
              </p>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold">
                    €{currentService.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-300" />
                  <span>{currentService.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-300 fill-current" />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
              
              <a
                href="#contact"
                className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
              >
                <span>Get started</span>
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </a>
            </div>
            
            <div className="relative">
              <img
                src={currentService.image}
                alt={currentService.title}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Service overview
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {currentService.fullDescription}
                </p>
              </div>
            </section>

            {/* Features */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                What's included
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Technologies */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Tags
              </h2>
              <div className="flex flex-wrap gap-3">
                {currentService.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2"
                  >
                    <Tag className="w-4 h-4" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Service Summary */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Service details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Price</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      €{currentService.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Duration</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {currentService.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Category</span>
                    <span className="font-semibold text-gray-900 dark:text-white capitalize">
                      {currentService.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold text-gray-900 dark:text-white">4.9</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <Award className="w-5 h-5 text-green-600" />
                  <span>My Guarantee</span>
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>100% guaranteed result</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>24/7 included support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Money-back if goals not met</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section id="contact" className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Fill out the form below and I'll get back to you within 24 hours.
            </p>
          </div>
          <ContactForm serviceType={currentService.title} />
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;