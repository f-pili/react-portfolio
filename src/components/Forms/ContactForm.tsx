import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Send, CheckCircle, Clock, Mail, Phone } from 'lucide-react';
import { Service } from '../../types';

interface ContactFormProps {
  serviceType?: string;
}

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
    .required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  serviceType: Yup.string()
    .required('Please select a service type'),
  message: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
    .required('Message is required'),
});

const ContactForm: React.FC<ContactFormProps> = ({ serviceType = '' }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  // Fetch services from the database
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:3001/services');
        if (response.ok) {
          const servicesData = await response.json();
          setServices(servicesData);
        } else {
          console.error('Failed to fetch services');
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setServicesLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleSubmit = async (
    values: any, 
    { setSubmitting, setStatus }: any
  ) => {
    try {
      setStatus(null);
      console.log('Submitting form with values:', values);
      
      // Submit to JSON server
      const response = await fetch('http://localhost:3001/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          status: 'pending',
          createdAt: new Date().toISOString(),
        }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Success! Response:', result);
      
      // Set success status with submitted data
      setStatus({ 
        type: 'success', 
        submittedData: values
      });
      
      // Don't reset form immediately - let user see success message
      // resetForm();
    } catch (error) {
      console.error('Contact form submission error:', error);
      setStatus({ 
        type: 'error', 
        message: 'Sorry, there was an error sending your message. Please try again or contact us directly.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Custom error display component with proper accessibility
  const FieldError: React.FC<{ name: string; id: string }> = ({ name, id }) => (
    <ErrorMessage name={name}>
      {(msg) => (
        <div 
          className="mt-1 text-sm text-red-600 dark:text-red-400" 
          id={id}
          role="alert"
          aria-live="polite"
        >
          {msg}
        </div>
      )}
    </ErrorMessage>
  );

  // Success Message Component
  const SuccessMessage: React.FC<{ submittedData: any; onSendAnother: () => void }> = ({ submittedData, onSendAnother }) => (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center">
      <div className="flex justify-center mb-6">
        <div className="bg-green-100 dark:bg-green-800 rounded-full p-4">
          <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-4">
        Message sent successfully!
      </h3>
      
      <p className="text-green-700 dark:text-green-300 mb-6 text-lg">
        Thank you, <span className="font-semibold">{submittedData.name}</span>! 
        I've received your inquiry about <span className="font-semibold">{submittedData.serviceType}</span>.
      </p>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 border border-green-200 dark:border-green-700">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">What happens next?</h4>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mt-1">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-white">Quick response</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                I'll review your message and respond within 24 hours
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-2 mt-1">
              <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-white">Email confirmation</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Check your inbox at <span className="font-medium">{submittedData.email}</span> for confirmation
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-orange-100 dark:bg-orange-900 rounded-full p-2 mt-1">
              <Phone className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-white">Personal consultation</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                I'll schedule a call to discuss your project in detail
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 mb-6">
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          <strong>Need immediate assistance?</strong><br />
          Call me at <span className="font-semibold">+39 388 77 66 555</span> or email 
          <span className="font-semibold"> hello@fpili.me</span>
        </p>
      </div>
      
      <button
        onClick={onSendAnother}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      >
        Send another message
      </button>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <Formik
        initialValues={{
          name: '',
          email: '',
          serviceType: serviceType,
          message: '',
        }}
        validationSchema={ContactSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ isSubmitting, status, errors, touched, resetForm, setStatus }) => {
          console.log('Current status:', status);
          
          return (
            <>
              {status?.type === 'success' ? (
                <SuccessMessage 
                  submittedData={status.submittedData} 
                  onSendAnother={() => {
                    setStatus(null);
                    resetForm();
                  }}
                />
              ) : (
                <Form className="space-y-6" noValidate>
                  {status?.type === 'error' && (
                    <div
                      className="p-4 rounded-lg border bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-200 border-red-200 dark:border-red-800"
                      role="alert"
                      aria-live="polite"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="bg-red-100 dark:bg-red-800 rounded-full p-1">
                          <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="font-medium">Error sending message</span>
                      </div>
                      <p className="mt-2">{status.message}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 ${
                          errors.name && touched.name
                            ? 'border-red-500 dark:border-red-400'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="Enter your full name"
                        aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
                        aria-invalid={errors.name && touched.name ? 'true' : 'false'}
                      />
                      <FieldError name="name" id="name-error" />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 ${
                          errors.email && touched.email
                            ? 'border-red-500 dark:border-red-400'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="Enter your email address"
                        aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                        aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                      />
                      <FieldError name="email" id="email-error" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Service Type *
                    </label>
                    <Field
                      as="select"
                      id="serviceType"
                      name="serviceType"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 ${
                        errors.serviceType && touched.serviceType
                          ? 'border-red-500 dark:border-red-400'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                      aria-describedby={errors.serviceType && touched.serviceType ? 'serviceType-error' : undefined}
                      aria-invalid={errors.serviceType && touched.serviceType ? 'true' : 'false'}
                      disabled={servicesLoading}
                    >
                      <option value="">
                        {servicesLoading ? 'Loading services...' : 'Select a service'}
                      </option>
                      {services.map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                      <option value="Consultation">Consultation</option>
                      <option value="Other">Other</option>
                    </Field>
                    <FieldError name="serviceType" id="serviceType-error" />
                    {servicesLoading && (
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Loading available services...
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <Field
                      as="textarea"
                      id="message"
                      name="message"
                      rows={5}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none transition-colors duration-200 ${
                        errors.message && touched.message
                          ? 'border-red-500 dark:border-red-400'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Tell me about your project requirements, timeline, and any specific details..."
                      aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
                      aria-invalid={errors.message && touched.message ? 'true' : 'false'}
                    />
                    <FieldError name="message" id="message-error" />
                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Minimum 10 characters, maximum 1000 characters
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || servicesLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:scale-105"
                    aria-describedby="submit-button-description"
                  >
                    <Send className="w-5 h-5" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                  <div id="submit-button-description" className="sr-only">
                    Submit the contact form to send your message
                  </div>
                </Form>
              )}
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default ContactForm;