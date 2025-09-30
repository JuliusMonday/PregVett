import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Head Office',
      details: [
        '123 Victoria Island, Lagos',
        'Nigeria'
      ]
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone Numbers',
      details: [
        '+234 801 234 5678',
        '+234 908 765 4321'
      ]
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email Addresses',
      details: [
        'info@pregvett.com',
        'support@pregvett.com'
      ]
    },
    {
      icon: 'fas fa-clock',
      title: 'Business Hours',
      details: [
        'Monday - Friday: 9AM - 6PM',
        'Saturday: 10AM - 4PM',
        'Sunday: Closed'
      ]
    }
  ];

  const offices = [
    {
      city: 'Lagos',
      address: '123 Victoria Island, Lagos',
      phone: '+234 801 234 5678',
      email: 'lagos@pregvett.com'
    },
    {
      city: 'Abuja',
      address: '456 Maitama, Abuja',
      phone: '+234 809 876 5432',
      email: 'abuja@pregvett.com'
    },
    {
      city: 'Port Harcourt',
      address: '789 GRA Phase 2, Port Harcourt',
      phone: '+234 803 456 7890',
      email: 'portharcourt@pregvett.com'
    },
    {
      city: 'Kano',
      address: '321 Nassarawa, Kano',
      phone: '+234 806 543 2109',
      email: 'kano@pregvett.com'
    }
  ];

  const faqs = [
    {
      question: 'How quickly do you respond to inquiries?',
      answer: 'We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our emergency support line.'
    },
    {
      question: 'Do you provide services outside Lagos?',
      answer: 'Yes! We have offices in Lagos, Abuja, Port Harcourt, and Kano. We also provide virtual services to mothers across Nigeria.'
    },
    {
      question: 'How can I partner with PregVett?',
      answer: 'We welcome partnerships with hospitals, clinics, NGOs, and healthcare professionals. Please contact our partnerships team at partnerships@pregvett.com.'
    },
    {
      question: 'Is PregVett really free?',
      answer: 'Yes! Our basic services are completely free for all mothers. We also offer premium features for healthcare providers and institutions.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#7AC2D5] to-[#BEE7C4] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-white opacity-90 max-w-3xl mx-auto">
            We're here to help! Get in touch with our team for support, partnerships, or general inquiries
          </p>
        </div>
      </section>

      {/* Office Welcome Section */}
      <section className="py-20 bg-[#F8FBFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">
              Visit Our Modern Facilities
            </h2>
            <p className="text-xl text-[#666666] max-w-3xl mx-auto">
              Experience our welcoming environment designed to make you feel comfortable and cared for
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="text-4xl font-bold text-[#7AC2D5] mb-4">4</div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-2">Major Cities</h3>
              <p className="text-[#666666]">Offices across Nigeria</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="text-4xl font-bold text-[#BEE7C4] mb-4">24/7</div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-2">Support Available</h3>
              <p className="text-[#666666]">Round-the-clock assistance</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="text-4xl font-bold text-[#F4A497] mb-4">100+</div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-2">Healthcare Staff</h3>
              <p className="text-[#666666]">Dedicated professionals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-[#F8FBFC] rounded-xl p-6 text-center border border-gray-100">
                <div className="w-16 h-16 bg-[#7AC2D5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${info.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-[#2C3E50] mb-3">{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-[#666666]">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-[#2C3E50] mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7AC2D5] focus:border-transparent outline-none transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7AC2D5] focus:border-transparent outline-none transition-all duration-200"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7AC2D5] focus:border-transparent outline-none transition-all duration-200"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7AC2D5] focus:border-transparent outline-none transition-all duration-200"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7AC2D5] focus:border-transparent outline-none transition-all duration-200"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#7AC2D5] hover:bg-[#6ab0c3] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Office Locations */}
            <div>
              <h2 className="text-3xl font-bold text-[#2C3E50] mb-6">Our Offices</h2>
              <div className="space-y-6">
                {offices.map((office, index) => (
                  <div key={index} className="bg-[#F8FBFC] rounded-lg p-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-[#7AC2D5] mb-3">{office.city}</h3>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-3">
                        <i className="fas fa-map-marker-alt text-[#7AC2D5] mt-1"></i>
                        <span className="text-[#666666]">{office.address}</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <i className="fas fa-phone text-[#7AC2D5] mt-1"></i>
                        <span className="text-[#666666]">{office.phone}</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <i className="fas fa-envelope text-[#7AC2D5] mt-1"></i>
                        <span className="text-[#666666]">{office.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Emergency Contact */}
              <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-600 mb-3">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  Emergency Support
                </h3>
                <p className="text-red-700 mb-4">
                  For pregnancy-related emergencies, please call our 24/7 emergency line:
                </p>
                <div className="text-2xl font-bold text-red-600">
                  +234 800 123 4567
                </div>
                <p className="text-red-600 text-sm mt-2">
                  Available 24 hours a day, 7 days a week
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#F8FBFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-[#666666]">
              Quick answers to common questions about PregVett
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-[#2C3E50] mb-3">{faq.question}</h3>
                <p className="text-[#666666] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">
              Find Us
            </h2>
            <p className="text-xl text-[#666666]">
              Visit our head office in Victoria Island, Lagos
            </p>
          </div>

          <div className="bg-[#F8FBFC] rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <i className="fas fa-map-marked-alt text-6xl text-[#7AC2D5] mb-4"></i>
                <p className="text-xl text-[#666666]">Interactive Map</p>
                <p className="text-sm text-[#666666] mt-2">
                  123 Victoria Island, Lagos, Nigeria
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#7AC2D5] to-[#BEE7C4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Join thousands of Nigerian mothers who trust PregVett for their maternal healthcare needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white hover:bg-gray-100 text-[#7AC2D5] font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-center text-lg"
            >
              Create Account
            </Link>
            <Link
              to="/emergency"
              className="border-2 border-white text-white hover:bg-white hover:text-red-600 font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-center text-lg"
            >
              Emergency Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;