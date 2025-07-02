import React from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import ContactForm from '../components/Forms/ContactForm';

const ContactPage: React.FC = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'hello@fpili.me',
      description: 'Send me an email anytime!',
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+39 388 77 66 555',
      description: 'Mon-Fri from 08:00 to 18:00.',
    },
    {
      icon: MapPin,
      title: 'Office',
      details: 'Via Istria, Decimomannu (CA)',
      description: 'Come say hello at my office.',
    },
    {
      icon: Clock,
      title: 'Working hours',
      details: 'Mon-Fri: 08:00 - 18:00',
      description: 'When work gets done.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Let's get in touch
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
            Ready to start your project? I'd love to hear from you. 
            Send me a message and I'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-900 dark:text-white font-medium mb-1">
                  {info.details}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {info.description}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Form and Additional Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Send me a message
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Fill out the form below and I'll get back to you within 24 hours.
                </p>
              </div>
              <ContactForm />
            </div>

            {/* Why Work With Us */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Why work with me?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                    <Send className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Quick response
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      I respond to all inquiries within 24 hours, often much sooner.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                    <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Expert consultation
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Free consultation to understand your needs and provide the best solution.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Local & Remote
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      I work with clients locally and remotely, ensuring seamless communication.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-lg">
                    <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Flexible schedule
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      I adapt to your timeline and work around your business needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;