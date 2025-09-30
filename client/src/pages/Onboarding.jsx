import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const { updateUser, completeOnboarding } = useAuth();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Core Pregnancy Setup
    lmp: '',
    dueDate: '',
    language: 'English',
    
    // Step 2: Personal & Health Profile
    age: '',
    location: {
      state: '',
      lga: ''
    },
    obstetricHistory: {
      isFirstPregnancy: true,
      previousLiveBirths: 0,
      previousComplications: []
    },
    preExistingConditions: [],
    
    // Step 3: Safety and Engagement Setup
    emergencyContacts: [{
      name: '',
      phone: '',
      relationship: ''
    }],
    notifications: true,
    consent: false
  });

  const steps = [
    { id: 1, title: 'Pregnancy Setup', icon: 'fas fa-baby' },
    { id: 2, title: 'Health Profile', icon: 'fas fa-user-md' },
    { id: 3, title: 'Safety Setup', icon: 'fas fa-shield-alt' }
  ];

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  const languages = ['English', 'Hausa', 'Yoruba', 'Igbo', 'Pidgin'];
  
  const conditions = [
    'Hypertension', 'Diabetes', 'Anemia', 'HIV', 'Sickle Cell', 'Asthma', 'Thyroid', 'Other'
  ];

  const complications = [
    'Miscarriage', 'Pre-eclampsia', 'Gestational Diabetes', 'C-section', 'Preterm Birth', 'Other'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleEmergencyContactChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.map((contact, i) => 
        i === index ? { ...contact, [field]: value } : contact
      )
    }));
  };

  const addEmergencyContact = () => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, { name: '', phone: '', relationship: '' }]
    }));
  };

  const removeEmergencyContact = (index) => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.filter((_, i) => i !== index)
    }));
  };

  const calculateDueDate = (lmp) => {
    if (!lmp) return '';
    const lmpDate = new Date(lmp);
    const dueDate = new Date(lmpDate.getTime() + (280 * 24 * 60 * 60 * 1000));
    return dueDate.toISOString().split('T')[0];
  };

  const handleLMPChange = (lmp) => {
    const dueDate = calculateDueDate(lmp);
    setFormData(prev => ({
      ...prev,
      lmp,
      dueDate
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.lmp && formData.dueDate && formData.language;
      case 2:
        return formData.age && formData.location.state && formData.location.lga;
      case 3:
        return formData.emergencyContacts[0].name && formData.emergencyContacts[0].phone && formData.consent;
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
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Update user profile
      const profileData = {
        profile: {
          age: parseInt(formData.age),
          location: formData.location,
          emergencyContacts: formData.emergencyContacts,
          language: formData.language,
          preferences: {
            notifications: formData.notifications
          }
        },
        medicalHistory: {
          obstetricHistory: formData.obstetricHistory,
          preExistingConditions: formData.preExistingConditions
        }
      };

      await updateUser(profileData);
      
      // Create pregnancy record
      const pregnancyData = {
        lmp: formData.lmp,
        dueDate: formData.dueDate,
        currentWeek: 1,
        status: 'active',
        riskLevel: 'low'
      };

      // Submit pregnancy data to backend
      const response = await fetch('http://localhost:5000/api/pregnancies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(pregnancyData)
      });

      if (response.ok) {
        await completeOnboarding();
        navigate('/dashboard');
      } else {
        console.error('Failed to create pregnancy record');
      }
    } catch (error) {
      console.error('Onboarding submission error:', error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#2C3E50] mb-6">Let's set up your pregnancy journey</h3>
            
            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                Last Menstrual Period (LMP)
              </label>
              <input
                type="date"
                value={formData.lmp}
                onChange={(e) => handleLMPChange(e.target.value)}
                className="input-field"
                max={new Date().toISOString().split('T')[0]}
              />
              <p className="text-xs text-[#888888] mt-1">
                This helps us calculate your due date and track your pregnancy progress
              </p>
            </div>

            {formData.dueDate && (
              <div className="bg-[#BEE7C4] p-4 rounded-lg">
                <p className="text-sm font-medium text-[#2C3E50]">
                  <i className="fas fa-calendar-alt mr-2"></i>
                  Your estimated due date: {new Date(formData.dueDate).toLocaleDateString()}
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                Preferred Language
              </label>
              <select
                value={formData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className="input-field"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">
                <i className="fas fa-info-circle mr-2"></i>
                Why this information matters
              </h4>
              <p className="text-sm text-blue-700">
                Your LMP helps us provide accurate week-by-week guidance and track your baby's development. 
                Language preference ensures you receive content in your preferred language.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#2C3E50] mb-6">Tell us about yourself</h3>
            
            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                Age
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="input-field"
                min="12"
                max="50"
                placeholder="Enter your age"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                  State
                </label>
                <select
                  value={formData.location.state}
                  onChange={(e) => handleNestedChange('location', 'state', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select your state</option>
                  {nigerianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                  Local Government Area (LGA)
                </label>
                <input
                  type="text"
                  value={formData.location.lga}
                  onChange={(e) => handleNestedChange('location', 'lga', e.target.value)}
                  className="input-field"
                  placeholder="Enter your LGA"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                Is this your first pregnancy?
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="isFirstPregnancy"
                    checked={formData.obstetricHistory.isFirstPregnancy}
                    onChange={() => handleNestedChange('obstetricHistory', 'isFirstPregnancy', true)}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="isFirstPregnancy"
                    checked={!formData.obstetricHistory.isFirstPregnancy}
                    onChange={() => handleNestedChange('obstetricHistory', 'isFirstPregnancy', false)}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {!formData.obstetricHistory.isFirstPregnancy && (
              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                  Number of previous live births
                </label>
                <input
                  type="number"
                  value={formData.obstetricHistory.previousLiveBirths}
                  onChange={(e) => handleNestedChange('obstetricHistory', 'previousLiveBirths', parseInt(e.target.value))}
                  className="input-field"
                  min="0"
                  max="20"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                Previous pregnancy complications (if any)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {complications.map(complication => (
                  <label key={complication} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.obstetricHistory.previousComplications.includes(complication)}
                      onChange={() => handleArrayChange('obstetricHistory.previousComplications', complication)}
                      className="mr-2"
                    />
                    <span className="text-sm">{complication}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                Pre-existing medical conditions
              </label>
              <div className="grid grid-cols-2 gap-2">
                {conditions.map(condition => (
                  <label key={condition} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.preExistingConditions.includes(condition)}
                      onChange={() => handleArrayChange('preExistingConditions', condition)}
                      className="mr-2"
                    />
                    <span className="text-sm">{condition}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#2C3E50] mb-6">Your safety is our priority</h3>
            
            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-4">
                Emergency Contacts
              </label>
              
              {formData.emergencyContacts.map((contact, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-[#2C3E50]">Contact {index + 1}</h4>
                    {formData.emergencyContacts.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEmergencyContact(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={contact.name}
                      onChange={(e) => handleEmergencyContactChange(index, 'name', e.target.value)}
                      className="input-field"
                      placeholder="Name"
                    />
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => handleEmergencyContactChange(index, 'phone', e.target.value)}
                      className="input-field"
                      placeholder="Phone number"
                    />
                    <input
                      type="text"
                      value={contact.relationship}
                      onChange={(e) => handleEmergencyContactChange(index, 'relationship', e.target.value)}
                      className="input-field"
                      placeholder="Relationship"
                    />
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addEmergencyContact}
                className="text-[#7AC2D5] hover:text-[#6ab0c3] font-medium"
              >
                <i className="fas fa-plus mr-2"></i>
                Add another emergency contact
              </button>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.notifications}
                  onChange={(e) => handleInputChange('notifications', e.target.checked)}
                  className="mr-3"
                />
                <span className="text-sm font-medium text-[#2C3E50]">
                  Send me important notifications and reminders
                </span>
              </label>
              <p className="text-xs text-[#888888] mt-1 ml-6">
                We'll send you appointment reminders, health tips, and important alerts
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-medium text-red-900 mb-2">
                <i className="fas fa-shield-alt mr-2"></i>
                Data Privacy & Consent
              </h4>
              <p className="text-sm text-red-700 mb-3">
                Your health data is confidential and will only be used to provide you with personalized care. 
                We comply with Nigerian data protection regulations and will never share your information without your consent.
              </p>
              
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => handleInputChange('consent', e.target.checked)}
                  className="mr-3 mt-1"
                />
                <span className="text-sm text-red-700">
                  I consent to the collection and use of my health data for the purpose of providing 
                  maternal health services through PregVett. I understand that my data will be kept 
                  confidential and secure.
                </span>
              </label>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">
                <i className="fas fa-check-circle mr-2"></i>
                You're almost ready!
              </h4>
              <p className="text-sm text-green-700">
                Once you complete this step, you'll have access to your personalized dashboard, 
                pregnancy tracking, nutrition guidance, and all the features PregVett offers.
              </p>
            </div>
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
              <i className="fas fa-baby text-white text-2xl"></i>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#2C3E50] mb-2">Welcome to PregVett</h1>
          <p className="text-[#888888]">Let's get your profile set up for a healthy pregnancy journey</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step.id ? 'bg-[#7AC2D5] text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  <i className={step.icon}></i>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 ${
                    currentStep > step.id ? 'bg-[#7AC2D5]' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            {steps.map(step => (
              <span key={step.id} className={`text-sm font-medium ${
                currentStep >= step.id ? 'text-[#7AC2D5]' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
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

export default Onboarding;