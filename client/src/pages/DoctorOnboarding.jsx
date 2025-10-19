
// src/components/DoctorOnboarding.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DoctorOnboarding = () => {
  const { user, updateUser, completeOnboarding } = useAuth();
  const navigate = useNavigate();

  // Redirect non-doctors away
  useEffect(() => {
    if (user && user.role !== 'doctor') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Professional Info
    licenseNumber: '',
    specialty: '',
    yearsOfExperience: '',
    hospitalAffiliation: '',
    // Step 2: Location & Contact
    location: { state: '', lga: '' },
    consultationPhone: '',
    consultationEmail: '',
    // Step 3: Preferences & Consent
    notifications: true,
    consent: false,
  });

  const steps = [
    { id: 1, title: 'Professional Info', icon: 'fas fa-stethoscope' },
    { id: 2, title: 'Practice Details', icon: 'fas fa-hospital' },
    { id: 3, title: 'Safety & Consent', icon: 'fas fa-shield-alt' },
  ];

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  const specialties = [
    'Obstetrics & Gynecology',
    'General Practice',
    'Pediatrics',
    'Internal Medicine',
    'Surgery',
    'Radiology',
    'Anesthesia',
    'Public Health',
    'Other'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({ ...prev, [parent]: { ...prev[parent], [field]: value } }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.licenseNumber && formData.specialty && formData.yearsOfExperience && formData.hospitalAffiliation;
      case 2:
        return formData.location.state && formData.location.lga && formData.consultationPhone;
      case 3:
        return formData.consent;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length && validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    try {
      const profileData = {
        profile: {
          licenseNumber: formData.licenseNumber,
          specialty: formData.specialty,
          yearsOfExperience: parseInt(formData.yearsOfExperience, 10),
          hospitalAffiliation: formData.hospitalAffiliation,
          location: formData.location,
          consultationPhone: formData.consultationPhone,
          consultationEmail: formData.consultationEmail || user?.email,
          preferences: { notifications: formData.notifications },
        }
      };

      await updateUser(profileData);
      const result = await completeOnboarding();
      if (!result.success) {
        throw new Error(result.message || 'Onboarding completion failed');
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Onboarding error:', error);
      alert(`Failed to complete onboarding: ${error.message}`);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#2C3E50]">Professional Information</h3>
            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-2">Medical License Number</label>
              <input
                type="text"
                value={formData.licenseNumber}
                onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                className="input-field w-full border p-2 rounded"
                placeholder="e.g., MDCN/12345"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-2">Specialty</label>
              <select
                value={formData.specialty}
                onChange={(e) => handleInputChange('specialty', e.target.value)}
                className="input-field w-full border p-2 rounded"
              >
                <option value="">Select specialty</option>
                {specialties.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-2">Years of Experience</label>
              <input
                type="number"
                min="1"
                max="50"
                value={formData.yearsOfExperience}
                onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                className="input-field w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-2">Hospital / Clinic Affiliation</label>
              <input
                type="text"
                value={formData.hospitalAffiliation}
                onChange={(e) => handleInputChange('hospitalAffiliation', e.target.value)}
                className="input-field w-full border p-2 rounded"
                placeholder="e.g., General Hospital Lagos"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#2C3E50]">Practice Location</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-2">State</label>
                <select
                  value={formData.location.state}
                  onChange={(e) => handleNestedChange('location', 'state', e.target.value)}
                  className="input-field w-full border p-2 rounded"
                >
                  <option value="">Select state</option>
                  {nigerianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-2">LGA</label>
                <input
                  type="text"
                  placeholder="Enter LGA"
                  value={formData.location.lga}
                  onChange={(e) => handleNestedChange('location', 'lga', e.target.value)}
                  className="input-field w-full border p-2 rounded"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-2">Consultation Phone</label>
              <input
                type="tel"
                value={formData.consultationPhone}
                onChange={(e) => handleInputChange('consultationPhone', e.target.value)}
                className="input-field w-full border p-2 rounded"
                placeholder="+234..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-2">Consultation Email (Optional)</label>
              <input
                type="email"
                value={formData.consultationEmail}
                onChange={(e) => handleInputChange('consultationEmail', e.target.value)}
                className="input-field w-full border p-2 rounded"
                placeholder="e.g., dr@example.com"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#2C3E50]">Safety & Consent</h3>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.notifications}
                onChange={(e) => handleInputChange('notifications', e.target.checked)}
                className="accent-[#7AC2D5]"
              />
              <span className="text-sm text-[#2C3E50]">
                Send me appointment reminders and system notifications
              </span>
            </label>
            <label className="flex items-start gap-2 mt-4">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => handleInputChange('consent', e.target.checked)}
                className="accent-[#7AC2D5] mt-1"
              />
              <span className="text-sm text-[#2C3E50]">
                I confirm that I am a licensed healthcare provider and consent to the use of my professional data to deliver PregVett services. I understand that patient data will be handled confidentially.
              </span>
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] to-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-[#7AC2D5] rounded-full flex items-center justify-center">
              <i className="fas fa-user-md text-white text-2xl"></i>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#2C3E50] mb-2">Welcome, Doctor!</h1>
          <p className="text-[#888888]">Let's set up your professional profile</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= step.id ? 'bg-[#7AC2D5] text-white' : 'bg-gray-200 text-gray-500'}`}>
                  <i className={step.icon}></i>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-16 h-1 ${currentStep > step.id ? 'bg-[#7AC2D5]' : 'bg-gray-200'}`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm font-medium">
            {steps.map(step => (
              <span key={step.id} className={currentStep >= step.id ? 'text-[#7AC2D5]' : 'text-gray-500'}>
                {step.title}
              </span>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-medium ${
              currentStep === 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            Previous
          </button>
          {currentStep < steps.length ? (
            <button
              onClick={handleNext}
              disabled={!validateStep(currentStep)}
              className={`px-6 py-3 rounded-lg font-medium text-white ${
                validateStep(currentStep)
                  ? 'bg-[#7AC2D5] hover:bg-[#6ab0c3]'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!validateStep(currentStep)}
              className={`px-6 py-3 rounded-lg font-medium text-white ${
                validateStep(currentStep)
                  ? 'bg-[#7AC2D5] hover:bg-[#6ab0c3]'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Complete Setup
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorOnboarding;