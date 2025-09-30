import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const team = [
    {
      name: 'Dr. Aisha Bello',
      role: 'Founder & CEO',
      bio: 'Obstetrician with 15+ years experience in maternal health',
      avatar: 'AB'
    },
    {
      name: 'Engr. Tunde Adekunle',
      role: 'CTO',
      bio: 'Software engineer passionate about healthcare technology',
      avatar: 'TA'
    },
    {
      name: 'Ngozi Okafor',
      role: 'Head of Operations',
      bio: 'Public health expert specializing in maternal care',
      avatar: 'NO'
    },
    {
      name: 'Dr. Fatima Ibrahim',
      role: 'Medical Director',
      bio: 'Gynecologist with expertise in high-risk pregnancies',
      avatar: 'FI'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Founded',
      description: 'PregVett was founded with a mission to reduce maternal mortality in Nigeria'
    },
    {
      year: '2021',
      title: 'First Launch',
      description: 'Launched our mobile app with basic pregnancy tracking features'
    },
    {
      year: '2022',
      title: 'Expansion',
      description: 'Added AI-powered symptom checker and nutrition coach'
    },
    {
      year: '2023',
      title: 'Partnerships',
      description: 'Partnered with 50+ hospitals and clinics across Nigeria'
    },
    {
      year: '2024',
      title: 'National Impact',
      description: 'Reached 50,000+ mothers and significantly improved pregnancy outcomes'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#7AC2D5] to-[#BEE7C4] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            About PregVett
          </h1>
          <p className="text-xl text-white opacity-90 max-w-3xl mx-auto">
            We are dedicated to revolutionizing maternal healthcare in Nigeria through technology, 
            education, and community support.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-[#F8FBFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#2C3E50] mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-[#666666] mb-6 leading-relaxed">
                At PregVett, we believe every Nigerian mother deserves access to quality maternal healthcare. 
                Our mission is to leverage technology to provide comprehensive, culturally appropriate, 
                and affordable maternal health services to women across Nigeria.
              </p>
              <p className="text-lg text-[#666666] mb-6 leading-relaxed">
                We are committed to reducing maternal and infant mortality rates through education, 
                early intervention, and continuous support throughout the pregnancy journey.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#7AC2D5] mb-2">50K+</div>
                  <div className="text-sm text-[#666666]">Mothers Served</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#BEE7C4] mb-2">95%</div>
                  <div className="text-sm text-[#666666]">Success Rate</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-[#2C3E50] mb-6">Our Values</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#7AC2D5] rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-heart text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2C3E50]">Compassion</h4>
                    <p className="text-[#666666]">We approach every mother with empathy and understanding</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#BEE7C4] rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-shield-alt text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2C3E50]">Excellence</h4>
                    <p className="text-[#666666]">We maintain the highest standards in healthcare delivery</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#F4A497] rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-users text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2C3E50]">Community</h4>
                    <p className="text-[#666666]">We build supportive communities for mothers</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#7AC2D5] rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-lightbulb text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2C3E50]">Innovation</h4>
                    <p className="text-[#666666]">We continuously improve through technology and research</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Impact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">
              Building Stronger Communities
            </h2>
            <p className="text-xl text-[#666666] max-w-3xl mx-auto">
              Together, we're creating a network of support that empowers mothers across Nigeria
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-[#F8FBFC] rounded-xl p-6 border border-gray-100">
              <div className="text-4xl font-bold text-[#7AC2D5] mb-4">500+</div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-2">Support Groups</h3>
              <p className="text-[#666666]">Active community groups across Nigeria</p>
            </div>
            <div className="bg-[#F8FBFC] rounded-xl p-6 border border-gray-100">
              <div className="text-4xl font-bold text-[#BEE7C4] mb-4">1000+</div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-2">Healthcare Partners</h3>
              <p className="text-[#666666]">Doctors and clinics in our network</p>
            </div>
            <div className="bg-[#F8FBFC] rounded-xl p-6 border border-gray-100">
              <div className="text-4xl font-bold text-[#F4A497] mb-4">24/7</div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-2">Support Available</h3>
              <p className="text-[#666666]">Round-the-clock assistance for mothers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-[#F8FBFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-[#666666]">
              Key milestones in our mission to improve maternal health
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#7AC2D5]"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 pr-8">
                    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
                      <div className="text-2xl font-bold text-[#7AC2D5] mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-[#2C3E50] mb-2">{milestone.title}</h3>
                      <p className="text-[#666666]">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-[#7AC2D5] rounded-full flex items-center justify-center z-10">
                    <i className="fas fa-star text-white"></i>
                  </div>
                  <div className="w-1/2 pl-8"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-[#666666]">
              Dedicated professionals committed to maternal health
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-[#F8FBFC] rounded-xl p-6 text-center border border-gray-100">
                <div className="w-20 h-20 bg-[#7AC2D5] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="text-xl font-bold text-[#2C3E50] mb-2">{member.name}</h3>
                <p className="text-[#7AC2D5] font-medium mb-3">{member.role}</p>
                <p className="text-[#666666] text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#7AC2D5] to-[#BEE7C4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Us in Our Mission
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Be part of the movement to improve maternal health in Nigeria
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white hover:bg-gray-100 text-[#7AC2D5] font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-center text-lg"
            >
              Get Started
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-[#7AC2D5] font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-center text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;