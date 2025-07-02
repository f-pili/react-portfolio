import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ArrowLeft, Save, X, Upload, Tag, Euro, Clock } from 'lucide-react';
import { RootState } from '../store';
import { createService, updateService, fetchServiceById } from '../store/slices/servicesSlice';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const ServiceSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .required('Title is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Description is required'),
  fullDescription: Yup.string()
    .min(50, 'Full description must be at least 50 characters')
    .required('Full description is required'),
  price: Yup.number()
    .min(0, 'Price must be positive')
    .required('Price is required'),
  category: Yup.string()
    .required('Category is required'),
  duration: Yup.string()
    .required('Duration is required'),
  image: Yup.string()
    .url('Must be a valid URL')
    .required('Image URL is required'),
  tags: Yup.string()
    .required('At least one tag is required'),
});

const AdminServiceForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentService, isLoading } = useSelector((state: RootState) => state.services);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = Boolean(id && id !== 'new');

  useEffect(() => {
    if (isEditing && id) {
      dispatch(fetchServiceById(parseInt(id)) as any);
    }
  }, [dispatch, id, isEditing]);

  const initialValues = {
    title: currentService?.title || '',
    description: currentService?.description || '',
    fullDescription: currentService?.fullDescription || '',
    price: currentService?.price || 0,
    category: currentService?.category || 'development',
    duration: currentService?.duration || '',
    image: currentService?.image || '',
    tags: currentService?.tags?.join(', ') || '',
    featured: currentService?.featured || false,
  };

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      const serviceData = {
        ...values,
        tags: values.tags.split(',').map((tag: string) => tag.trim()),
      };

      if (isEditing && id) {
        await dispatch(updateService({ id: parseInt(id), ...serviceData }) as any);
      } else {
        await dispatch(createService(serviceData) as any);
      }

      navigate('/admin/services');
    } catch (error) {
      console.error('Failed to save service:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading && isEditing) {
    return <LoadingSpinner message="Loading service..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/services')}
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Services</span>
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {isEditing ? 'Edit service' : 'Create new service'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isEditing ? 'Update service information' : 'Add a new service'}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <Formik
            initialValues={initialValues}
            validationSchema={ServiceSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values }) => (
              <Form className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="lg:col-span-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Service title *
                    </label>
                    <Field
                      type="text"
                      id="title"
                      name="title"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter service title"
                    />
                    <ErrorMessage name="title" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category *
                    </label>
                    <Field
                      as="select"
                      id="category"
                      name="category"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="development">Data</option>
                      <option value="design">Finance</option>
                      <option value="marketing">People</option>
                      <option value="consulting">Processes</option>
                    </Field>
                    <ErrorMessage name="category" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Price (EUR) *
                    </label>
                    <div className="relative">
                      <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Field
                        type="number"
                        id="price"
                        name="price"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="0"
                      />
                    </div>
                    <ErrorMessage name="price" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Duration *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Field
                        type="text"
                        id="duration"
                        name="duration"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="e.g., 4-6 weeks"
                      />
                    </div>
                    <ErrorMessage name="duration" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Image URL *
                    </label>
                    <div className="relative">
                      <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Field
                        type="url"
                        id="image"
                        name="image"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <ErrorMessage name="image" component="div" className="mt-1 text-sm text-red-600" />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Short description *
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    placeholder="Brief description for service cards"
                  />
                  <ErrorMessage name="description" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                {/* Full Description */}
                <div>
                  <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full description *
                  </label>
                  <Field
                    as="textarea"
                    id="fullDescription"
                    name="fullDescription"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    placeholder="Detailed description for service detail page"
                  />
                  <ErrorMessage name="fullDescription" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                {/* Tags */}
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tags *
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Field
                      type="text"
                      id="tags"
                      name="tags"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="React, Node.js, MongoDB (comma separated)"
                    />
                  </div>
                  <ErrorMessage name="tags" component="div" className="mt-1 text-sm text-red-600" />
                  <p className="mt-1 text-sm text-gray-500">Separate tags with commas</p>
                </div>

                {/* Featured */}
                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    id="featured"
                    name="featured"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Mark as featured service
                  </label>
                </div>

                {/* Image Preview */}
                {values.image && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Image preview
                    </label>
                    <img
                      src={values.image}
                      alt="Service preview"
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => navigate('/admin/services')}
                    className="flex items-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSubmitting ? 'Saving...' : isEditing ? 'Update service' : 'Create service'}</span>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AdminServiceForm;