import React from 'react';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      category: 'Pregnancy Tracking',
      icon: 'fas fa-baby',
      color: 'bg-[#7AC2D5]',
      items: [
        {
          title: 'Week-by-Week Development',
          description: 'Track your baby\'s growth with detailed weekly updates and developmental milestones.',
          features: ['Fetal size comparisons', 'Developmental milestones', '3D visualization', 'Personalized tips']
        },
        {
          title: 'Smart Due Date Calculator',
          description: 'Accurate due date calculation with personalized timeline and reminders.',
          features: ['Multiple calculation methods', 'Gestational age tracking', 'Milestone reminders', 'Countdown timer']
        },
        {
          title: 'Weight Gain Tracker',
          description: 'Monitor healthy weight gain throughout your pregnancy with personalized recommendations.',
          features: ['BMI tracking', 'Weekly weight goals', 'Growth charts', 'Health alerts']
        }
      ]
    },
    {
      category: 'Nutrition & Wellness',
      icon: 'fas fa-apple-alt',
      color: 'bg-[#BEE7C4]',
      items: [
        {
          title: 'Nigerian Food Database',
          description: 'Comprehensive database of 500+ Nigerian foods with nutritional analysis.',
          features: ['Local food database', 'Nutritional breakdown', 'Traditional recipes', 'Seasonal availability']
        },
        {
          title: 'Personalized Meal Plans',
          description: 'Custom meal plans tailored to your pregnancy stage and dietary preferences.',
          features: ['Trimester-specific plans', 'Dietary restrictions', 'Budget-friendly options', 'Shopping lists']
        },
        {
          title: 'Nutrient Tracking',
          description: 'Track essential nutrients and get alerts for deficiencies or excesses.',
          features: ['Folic acid tracking', 'Iron monitoring', 'Calcium intake', 'Vitamin D levels']
        }
      ]
    },
    {
      category: 'Health Monitoring',
      icon: 'fas fa-heartbeat',
      color: 'bg-[#F4A497]',
      items: [
        {
          title: 'Symptom Checker',
          description: 'AI-powered symptom analysis with personalized recommendations.',
          features: ['Severity assessment', 'Home remedies', 'When to seek help', 'Doctor consultation']
        },
        {
          title: 'Blood Pressure Monitoring',
          description: 'Track and monitor blood pressure with alerts for concerning readings.',
          features: ['Daily tracking', 'Trend analysis', 'Preeclampsia risk', 'Doctor alerts']
        },
        {
          title: 'Glucose Monitoring',
          description: 'Blood sugar tracking for gestational diabetes management.',
          features: ['Glucose logs', 'Meal impact analysis', 'Insulin tracking', 'Doctor reports']
        }
      ]
    },
    {
      category: 'Medical Care',
      icon: 'fas fa-stethoscope',
      color: 'bg-[#7AC2D5]',
      items: [
        {
          title: 'Appointment Management',
          description: 'Never miss important medical appointments with smart reminders.',
          features: ['Calendar integration', 'SMS/WhatsApp reminders', 'Doctor notes', 'Visit history']
        },
        {
          title: 'Medical Records',
          description: 'Secure storage and easy access to all your medical information.',
          features: ['Test results', 'Prescription history', 'Vaccination records', 'Doctor notes']
        },
        {
          title: 'Doctor Directory',
          description: 'Find and connect with qualified healthcare professionals near you.',
          features: ['Location-based search', 'Specialty filtering', 'Reviews & ratings', 'Appointment booking']
        }
      ]
    },
    {
      category: 'Emergency Support',
      icon: 'fas fa-exclamation-triangle',
      color: 'bg-[#BEE7C4]',
      items: [
        {
          title: 'Emergency Button',
          description: 'One-touch emergency assistance with location sharing.',
          features: ['GPS location sharing', 'Emergency contacts', 'Nearby hospitals', 'Ambulance dispatch']
        },
        {
          title: 'Emergency Guidance',
          description: 'Step-by-step instructions for common pregnancy emergencies.',
          features: ['First aid instructions', 'Emergency protocols', 'Hospital finder', 'Contact information']
        },
        {
          title: '24/7 Support',
          description: 'Round-the-clock access to healthcare professionals.',
          features: ['Live chat support', 'Phone consultations', 'Video calls', 'Crisis intervention']
        }
      ]
    },
    {
      category: 'Community & Education',
      icon: 'fas fa-users',
      color: 'bg-[#F4A497]',
      items: [
        {
          title: 'Mother Community',
          description: 'Connect with other mothers for support and shared experiences.',
          features: ['Forums by trimester', 'Private groups', 'Success stories', 'Peer support']
        },
        {
          title: 'Educational Content',
          description: 'Comprehensive library of pregnancy-related articles and videos.',
          features: ['Expert articles', 'Video tutorials', 'Downloadable guides', 'Webinars']
        },
        {
          title: 'Expert Q&A',
          description: 'Get answers from healthcare professionals and experienced mothers.',
          features: ['Doctor responses', 'Expert panels', 'Live sessions', 'Archived Q&A']
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#7AC2D5] to-[#BEE7C4] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Comprehensive Features
          </h1>
          <p className="text-xl text-white opacity-90 max-w-3xl mx-auto">
            Discover all the powerful features designed to support you throughout your pregnancy journey
          </p>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 bg-[#F8FBFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">
              Everything You Need for a Healthy Pregnancy
            </h2>
            <p className="text-xl text-[#666666] max-w-3xl mx-auto">
              From conception to delivery, PregVett provides comprehensive tools and support for every stage of your journey
            </p>
          </div>

          {/* App Usage Showcase */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-3xl font-bold text-[#2C3E50] mb-6">
                  Modern Technology for Maternal Health
                </h3>
                <p className="text-lg text-[#666666] mb-6 leading-relaxed">
                  Experience the future of maternal healthcare with our cutting-edge mobile application. 
                  Designed specifically for Nigerian mothers, our app combines advanced technology with 
                  cultural understanding to provide the best possible care.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#7AC2D5] mb-2">24/7</div>
                    <div className="text-sm text-[#666666]">Health Monitoring</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#BEE7C4] mb-2">500+</div>
                    <div className="text-sm text-[#666666]">Nigerian Foods</div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="/images/app-usage.jpg" 
                    alt="Pregnant woman using PregVett app for health tracking" 
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-16">
            {features.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className={`${category.color} p-8 text-white`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <i className={`${category.icon} text-3xl`}></i>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold">{category.category}</h3>
                      <p className="text-lg opacity-90">
                        {category.items.length} specialized features
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="bg-[#F8FBFC] rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                        <h4 className="text-xl font-bold text-[#2C3E50] mb-3">
                          {item.title}
                        </h4>
                        <p className="text-[#666666] mb-4 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="space-y-2">
                          <h5 className="font-semibold text-[#2C3E50] text-sm">Key Features:</h5>
                          <ul className="space-y-1">
                            {item.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center space-x-2 text-sm text-[#666666]">
                                <i className="fas fa-check text-[#7AC2D5] text-xs"></i>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Nutrition Showcase */}
          <div className="mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="/images/healthy-food.jpg" 
                    alt="Colorful fresh Nigerian fruits and vegetables for healthy pregnancy nutrition" 
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#2C3E50] mb-6">
                  Nigerian Nutrition Made Simple
                </h3>
                <p className="text-lg text-[#666666] mb-6 leading-relaxed">
                  Our comprehensive Nigerian food database makes healthy eating during pregnancy easy and enjoyable. 
                  From traditional recipes to modern nutritional analysis, we've got you covered.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-[#7AC2D5] mt-1"></i>
                    <div>
                      <h4 className="font-semibold text-[#2C3E50]">500+ Nigerian Foods</h4>
                      <p className="text-[#666666] text-sm">Comprehensive database of local ingredients</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-[#BEE7C4] mt-1"></i>
                    <div>
                      <h4 className="font-semibold text-[#2C3E50]">Personalized Meal Plans</h4>
                      <p className="text-[#666666] text-sm">Tailored to your pregnancy stage and preferences</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-[#F4A497] mt-1"></i>
                    <div>
                      <h4 className="font-semibold text-[#2C3E50]">Nutrient Tracking</h4>
                      <p className="text-[#666666] text-sm">Monitor essential vitamins and minerals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">
              Why Choose PregVett?
            </h2>
            <p className="text-xl text-[#666666]">
              See how we compare to other maternal health solutions
            </p>
          </div>

          <div className="bg-[#F8FBFC] rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#7AC2D5] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Features</th>
                    <th className="px-6 py-4 text-center">PregVett</th>
                    <th className="px-6 py-4 text-center">Other Apps</th>
                    <th className="px-6 py-4 text-center">Traditional Care</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-medium">Nigerian Food Database</td>
                    <td className="px-6 py-4 text-center">
                      <i className="fas fa-check text-green-500"></i>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <i className="fas fa-times text-red-500"></i>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <i className="fas fa-check text-green-500"></i>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium">AI Symptom Checker</td>
                    <td className="px-6 py-4 text-center">
                      <i className="fas fa-check text-green-500"></i>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <i className="fas fa-minus text-yellow-500"></i>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <i className="fas fa-times text-red-500"></i>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">24/7 Emergency Support</td>
                    <td className="px-6 py-4 text-center">
                      <i className="fas fa-check text-green-500"></i>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <i className="fas fa-times text-red-500"></i>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <i className="fas fa-check text-green-500"></i>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium">Community Support</td>
                    <td className="px-6 py-4 text-center">
                      <i className="fas fa-check text-green-500"></i>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <i className="fas fa-minus text-yellow-500"></i>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <i className="fas fa-check text-green-500"></i>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Cost</td>
                    <td className="px-6 py-4 text-center">Free</td>
                    <td className="px-6 py-4 text-center">Paid</td>
                    <td className="px-6 py-4 text-center">Expensive</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#7AC2D5] to-[#BEE7C4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience All These Features?
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Join thousands of Nigerian mothers who are already benefiting from PregVett
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white hover:bg-gray-100 text-[#7AC2D5] font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-center text-lg"
            >
              Get Started Free
            </Link>
            <Link
              to="/dashboard"
              className="border-2 border-white text-white hover:bg-white hover:text-[#7AC2D5] font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-center text-lg"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;