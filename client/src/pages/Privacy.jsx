import React from 'react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  const sections = [
    {
      title: 'Information We Collect',
      content: [
        {
          subtitle: 'Personal Information',
          text: 'When you register for PregVett, we collect personal information including your name, email address, phone number, date of birth, and residential address. This information is necessary to create your account and provide personalized services.'
        },
        {
          subtitle: 'Health Information',
          text: 'We collect health-related information including your pregnancy stage, medical history, symptoms, weight, blood pressure, glucose levels, and other health metrics. This information is essential for providing accurate health monitoring and recommendations.'
        },
        {
          subtitle: 'Usage Data',
          text: 'We automatically collect information about your interaction with our app, including IP addresses, device information, browser type, pages visited, and time spent on our platform. This helps us improve our services and user experience.'
        },
        {
          subtitle: 'Location Data',
          text: 'With your explicit consent, we may collect location data to provide location-based services such as finding nearby healthcare facilities and emergency services.'
        }
      ]
    },
    {
      title: 'How We Use Your Information',
      content: [
        {
          subtitle: 'Service Provision',
          text: 'We use your information to provide and maintain our services, including pregnancy tracking, health monitoring, appointment reminders, and personalized recommendations.'
        },
        {
          subtitle: 'Health Monitoring',
          text: 'Your health data is used to monitor your pregnancy progress, identify potential risks, and provide timely alerts and recommendations to ensure your safety and well-being.'
        },
        {
          subtitle: 'Communication',
          text: 'We use your contact information to send important notifications, appointment reminders, health tips, and respond to your inquiries. You can opt out of non-essential communications at any time.'
        },
        {
          subtitle: 'Service Improvement',
          text: 'We analyze usage data and feedback to improve our services, develop new features, and enhance the overall user experience.'
        },
        {
          subtitle: 'Research and Development',
          text: 'Anonymized and aggregated data may be used for research purposes to improve maternal health outcomes in Nigeria. No personally identifiable information is used in research without explicit consent.'
        }
      ]
    },
    {
      title: 'Data Sharing and Disclosure',
      content: [
        {
          subtitle: 'Healthcare Providers',
          text: 'With your explicit consent, we may share your health information with healthcare providers involved in your care to ensure coordinated and effective treatment.'
        },
        {
          subtitle: 'Emergency Services',
          text: 'In emergency situations, we may share necessary information with emergency services and healthcare facilities to ensure your safety and receive prompt medical attention.'
        },
        {
          subtitle: 'Service Providers',
          text: 'We work with third-party service providers who help us operate our platform. These providers have access to only the information necessary to perform their functions and are bound by confidentiality agreements.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose your information if required by law, court order, or to protect our rights, safety, or the safety of others.'
        }
      ]
    },
    {
      title: 'Data Security',
      content: [
        {
          subtitle: 'Encryption',
          text: 'All data transmitted between your device and our servers is encrypted using industry-standard encryption protocols (SSL/TLS).'
        },
        {
          subtitle: 'Secure Storage',
          text: 'Your data is stored on secure servers with multiple layers of protection, including firewalls, intrusion detection systems, and regular security audits.'
        },
        {
          subtitle: 'Access Controls',
          text: 'We implement strict access controls to ensure that only authorized personnel can access your information, and only for legitimate purposes.'
        },
        {
          subtitle: 'Regular Security Updates',
          text: 'We regularly update our security measures and conduct vulnerability assessments to protect against emerging threats.'
        }
      ]
    },
    {
      title: 'Your Rights and Choices',
      content: [
        {
          subtitle: 'Access and Correction',
          text: 'You have the right to access your personal information and request corrections to any inaccurate or incomplete data.'
        },
        {
          subtitle: 'Data Deletion',
          text: 'You can request the deletion of your personal information, subject to legal and regulatory requirements for health data retention.'
        },
        {
          subtitle: 'Consent Withdrawal',
          text: 'You can withdraw your consent for data collection and processing at any time, though this may affect our ability to provide certain services.'
        },
        {
          subtitle: 'Data Portability',
          text: 'You have the right to receive your personal information in a machine-readable format and transfer it to another service provider.'
        },
        {
          subtitle: 'Opt-out',
          text: 'You can opt out of marketing communications and non-essential data collection through your account settings.'
        }
      ]
    },
    {
      title: 'Cookies and Tracking Technologies',
      content: [
        {
          subtitle: 'Essential Cookies',
          text: 'We use essential cookies to provide basic functionality and security features of our platform. These cookies cannot be disabled.'
        },
        {
          subtitle: 'Performance Cookies',
          text: 'We use performance cookies to understand how you interact with our platform and improve our services.'
        },
        {
          subtitle: 'Functional Cookies',
          text: 'We use functional cookies to remember your preferences and provide personalized features.'
        },
        {
          subtitle: 'Advertising Cookies',
          text: 'We may use advertising cookies to show relevant advertisements, but you can opt out of these through your browser settings.'
        }
      ]
    },
    {
      title: 'Third-Party Services',
      content: [
        {
          subtitle: 'Integration Partners',
          text: 'Our platform may integrate with third-party services such as payment processors, analytics tools, and communication platforms. These services have their own privacy policies.'
        },
        {
          subtitle: 'Social Media',
          text: 'You may have the option to share information on social media platforms. These platforms are governed by their own privacy policies.'
        },
        {
          subtitle: 'External Links',
          text: 'Our platform may contain links to external websites. We are not responsible for the privacy practices of these external sites.'
        }
      ]
    },
    {
      title: 'Children\'s Privacy',
      content: [
        {
          subtitle: 'Age Restriction',
          text: 'PregVett is intended for adults aged 18 and above. We do not knowingly collect personal information from children under 18.'
        },
        {
          subtitle: 'Parental Consent',
          text: 'If we discover that we have collected information from a child under 18, we will take steps to delete such information promptly.'
        },
        {
          subtitle: 'Reporting',
          text: 'If you believe we have collected information from a child under 18, please contact us immediately.'
        }
      ]
    },
    {
      title: 'International Data Transfers',
      content: [
        {
          subtitle: 'Data Processing',
          text: 'Your information may be processed and stored on servers located outside Nigeria. We ensure that such transfers comply with applicable data protection laws.'
        },
        {
          subtitle: 'Safeguards',
          text: 'We implement appropriate safeguards to protect your data during international transfers, including standard contractual clauses and other legal mechanisms.'
        }
      ]
    },
    {
      title: 'Changes to This Policy',
      content: [
        {
          subtitle: 'Policy Updates',
          text: 'We may update this privacy policy from time to time to reflect changes in our practices or legal requirements.'
        },
        {
          subtitle: 'Notification',
          text: 'We will notify you of significant changes by email, through our platform, or by other means before the changes take effect.'
        },
        {
          subtitle: 'Review Date',
          text: 'We encourage you to review this privacy policy periodically to stay informed about how we protect your information.'
        }
      ]
    },
    {
      title: 'Contact Information',
      content: [
        {
          subtitle: 'Data Protection Officer',
          text: 'If you have questions or concerns about this privacy policy or our data practices, please contact our Data Protection Officer at privacy@pregvett.com.'
        },
        {
          subtitle: 'Regulatory Authorities',
          text: 'You have the right to lodge a complaint with the appropriate data protection authority if you believe your privacy rights have been violated.'
        },
        {
          subtitle: 'General Inquiries',
          text: 'For general inquiries about our privacy practices, please contact us at info@pregvett.com or call +234 801 234 5678.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#7AC2D5] to-[#BEE7C4] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-white opacity-90 max-w-3xl mx-auto">
            Your privacy is our priority. Learn how we collect, use, and protect your personal information
          </p>
        </div>
      </section>

      {/* Last Updated */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-[#888888]">
              <strong>Last Updated:</strong> September 28, 2024
            </p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <Link to="/contact" className="text-[#7AC2D5] hover:underline">
                Contact Us
              </Link>
              <Link to="/terms" className="text-[#7AC2D5] hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-[#2C3E50] mb-6">
              Our Commitment to Your Privacy
            </h2>
            <p className="text-lg text-[#888888] leading-relaxed mb-6">
              At PregVett, we are deeply committed to protecting your privacy and ensuring the security of your personal and health information. This privacy policy outlines how we collect, use, disclose, and safeguard your data when you use our maternal health platform.
            </p>
            <p className="text-lg text-[#888888] leading-relaxed">
              We understand the sensitive nature of health information and have implemented robust security measures to protect your data. This policy is designed to be transparent and easy to understand, empowering you to make informed decisions about your privacy.
            </p>
          </div>

          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-[#2C3E50] mb-6">{section.title}</h3>
                <div className="space-y-6">
                  {section.content.map((content, contentIndex) => (
                    <div key={contentIndex}>
                      <h4 className="text-xl font-semibold text-[#7AC2D5] mb-3">{content.subtitle}</h4>
                      <p className="text-[#888888] leading-relaxed">{content.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Summary */}
          <div className="mt-12 bg-[#F5F5F5] rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-[#2C3E50] mb-6">Quick Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-[#7AC2D5] mb-2">What We Collect</h4>
                <ul className="space-y-1 text-[#888888]">
                  <li>• Personal and contact information</li>
                  <li>• Health and pregnancy data</li>
                  <li>• Usage and device information</li>
                  <li>• Location data (with consent)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#7AC2D5] mb-2">Your Rights</h4>
                <ul className="space-y-1 text-[#888888]">
                  <li>• Access and correct your data</li>
                  <li>• Request data deletion</li>
                  <li>• Withdraw consent</li>
                  <li>• Data portability</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#7AC2D5] mb-2">How We Protect Data</h4>
                <ul className="space-y-1 text-[#888888]">
                  <li>• End-to-end encryption</li>
                  <li>• Secure servers</li>
                  <li>• Access controls</li>
                  <li>• Regular security audits</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#7AC2D5] mb-2">Contact Us</h4>
                <ul className="space-y-1 text-[#888888]">
                  <li>• Email: privacy@pregvett.com</li>
                  <li>• Phone: +234 801 234 5678</li>
                  <li>• Address: Lagos, Nigeria</li>
                  <li>• 24/7 Support Available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#7AC2D5] to-[#BEE7C4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Questions About Your Privacy?
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Our team is here to help you understand how we protect your information
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-secondary text-center text-lg"
            >
              Contact Privacy Team
            </Link>
            <Link
              to="/register"
              className="bg-white hover:bg-gray-100 text-[#7AC2D5] font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-center text-lg"
            >
              Join PregVett
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;