import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [email, setEmail] = useState('');

  const features = [
    {
      icon: 'fas fa-baby',
      title: 'Smart Pregnancy Tracking',
      description: 'Monitor your pregnancy week by week with personalized insights and fetal development updates.',
      color: 'bg-[#7AC2D5]'
    },
    {
      icon: 'fas fa-apple-alt',
      title: 'Nutrition Coach',
      description: 'Get personalized meal plans with Nigerian foods and track your daily nutrient intake.',
      color: 'bg-[#BEE7C4]'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Birth Defect Prevention',
      description: 'Access evidence-based prevention strategies and critical development timeline information.',
      color: 'bg-[#F4A497]'
    },
    {
      icon: 'fas fa-stethoscope',
      title: 'Symptom Intelligence',
      description: 'AI-powered symptom analysis with actionable recommendations and when to seek care.',
      color: 'bg-[#7AC2D5]'
    },
    {
      icon: 'fas fa-calendar-alt',
      title: 'Appointment Management',
      description: 'Never miss important appointments with smart reminders and calendar integration.',
      color: 'bg-[#BEE7C4]'
    },
    {
      icon: 'fas fa-users',
      title: 'Community Support',
      description: 'Connect with other mothers and healthcare professionals in a supportive environment.',
      color: 'bg-[#F4A497]'
    }
  ];

  const testimonials = [
    {
      name: 'Aisha Bello',
      location: 'Lagos',
      text: 'PregVett helped me navigate my first pregnancy with confidence. The nutrition recommendations were perfect for Nigerian meals!',
      avatar: 'AB'
    },
    {
      name: 'Ngozi Okafor',
      location: 'Abuja',
      text: 'The emergency button feature gave me peace of mind throughout my pregnancy. Highly recommend for all Nigerian mothers.',
      avatar: 'NO'
    },
    {
      name: 'Fatima Ibrahim',
      location: 'Kano',
      text: 'As a healthcare worker, I recommend PregVett to all my patients. It\'s comprehensive and culturally appropriate.',
      avatar: 'FI'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#F8FBFC] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-[#2C3E50] leading-tight mb-6">
                Your Journey to
                <span className="text-[#7AC2D5] block">Motherhood</span>
                Starts Here
              </h1>
              <p className="text-xl text-[#666666] mb-8 leading-relaxed max-w-2xl">
                PregVett is Nigeria's leading maternal health platform, providing comprehensive care, 
                guidance, and support for pregnant women throughout their journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/register"
                  className="bg-[#7AC2D5] hover:bg-[#6ab0c3] text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-center text-lg"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-[#7AC2D5] text-[#7AC2D5] hover:bg-[#7AC2D5] hover:text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-center text-lg"
                >
                  Sign In
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 max-w-md mx-auto lg:mx-0">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#7AC2D5]">50K+</div>
                  <div className="text-sm text-[#666666]">Happy Mothers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#BEE7C4]">500+</div>
                  <div className="text-sm text-[#666666]">Nigerian Foods</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#F4A497]">24/7</div>
                  <div className="text-sm text-[#666666]">Support</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-[#2C3E50] mb-6">Join PregVett Today</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7AC2D5] focus:border-transparent outline-none transition-all duration-200"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <Link
                      to="/register"
                      className="w-full bg-[#7AC2D5] hover:bg-[#6ab0c3] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-center block"
                    >
                      Create Account
                    </Link>
                  </form>
                  <p className="text-sm text-[#666666] text-center mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-[#7AC2D5] hover:underline">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#BEE7C4] rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#F4A497] rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#F8FBFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">
              Everything You Need for a Healthy Pregnancy
            </h2>
            <p className="text-xl text-[#666666] max-w-3xl mx-auto">
              Comprehensive maternal health care designed specifically for Nigerian women
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mb-6`}>
                  <i className={`${feature.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-[#2C3E50] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#666666] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">
              What Mothers Say About PregVett
            </h2>
            <p className="text-xl text-[#666666]">
              Real stories from Nigerian mothers who trust PregVett
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-[#F8FBFC] rounded-xl p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#7AC2D5] rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2C3E50]">{testimonial.name}</h4>
                    <p className="text-sm text-[#666666]">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-[#666666] italic mb-4">
                  "{testimonial.text}"
                </p>
                <div className="flex text-[#F4A497]">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#7AC2D5] to-[#BEE7C4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your PregVett Journey?
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Join thousands of Nigerian mothers who are experiencing healthier pregnancies with PregVett
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white hover:bg-gray-100 text-[#7AC2D5] font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-center text-lg"
            >
              Get Started Now
            </Link>
            <Link
              to="/features"
              className="border-2 border-white text-white hover:bg-white hover:text-[#7AC2D5] font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-center text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;