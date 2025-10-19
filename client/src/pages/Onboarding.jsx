// src/components/Onboarding.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../api/config';
const Onboarding = () => {
    const { updateUser, completeOnboarding } = useAuth();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        lmp: '',
        dueDate: '',
        language: 'English',
        age: '',
        location: { state: '', lga: '' },
        obstetricHistory: { isFirstPregnancy: true, previousLiveBirths: 0, previousComplications: [] },
        preExistingConditions: [],
        emergencyContacts: [{ name: '', phone: '', relationship: '' }],
        notifications: true,
        consent: false,
    });
    // In Onboarding.jsx
    
useEffect(() => {
  if (user && user.role !== 'user') {
    // Non-pregnant users shouldn't be here
    navigate('/dashboard');
  }
}, [user, navigate]);
    const steps = [
        { id: 1, title: 'Pregnancy Setup', icon: 'fas fa-baby' },
        { id: 2, title: 'Health Profile', icon: 'fas fa-user-md' },
        { id: 3, title: 'Safety Setup', icon: 'fas fa-shield-alt' },
    ];

    const nigerianStates = [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
        'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
        'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
        'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
        'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
    ];

    const languages = ['English', 'Hausa', 'Yoruba', 'Igbo', 'Pidgin'];
    const conditions = ['Hypertension', 'Diabetes', 'Anemia', 'HIV', 'Sickle Cell', 'Asthma', 'Thyroid', 'Other'];
    const complications = ['Miscarriage', 'Pre-eclampsia', 'Gestational Diabetes', 'C-section', 'Preterm Birth', 'Other'];

    // Input handlers
    const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
    const handleNestedChange = (parent, field, value) => setFormData(prev => ({ ...prev, [parent]: { ...prev[parent], [field]: value } }));
    const handleArrayChange = (field, value) => setFormData(prev => ({
        ...prev,
        [field]: prev[field].includes(value) ? prev[field].filter(item => item !== value) : [...prev[field], value]
    }));
    const handleEmergencyContactChange = (index, field, value) => setFormData(prev => ({
        ...prev,
        emergencyContacts: prev.emergencyContacts.map((c, i) => i === index ? { ...c, [field]: value } : c)
    }));

    const addEmergencyContact = () => setFormData(prev => ({
        ...prev,
        emergencyContacts: [...prev.emergencyContacts, { name: '', phone: '', relationship: '' }]
    }));

    const removeEmergencyContact = (index) => setFormData(prev => ({
        ...prev,
        emergencyContacts: prev.emergencyContacts.filter((_, i) => i !== index)
    }));

    const calculateDueDate = (lmp) => {
        if (!lmp) return '';
        const due = new Date(new Date(lmp).getTime() + 280 * 24 * 60 * 60 * 1000);
        return due.toISOString().split('T')[0];
    };

    const handleLMPChange = (lmp) => {
        setFormData(prev => ({ ...prev, lmp, dueDate: calculateDueDate(lmp) }));
    };

    const validateStep = (step) => {
        switch (step) {
            case 1: return formData.lmp && formData.dueDate && formData.language;
            case 2: return formData.age && formData.location.state && formData.location.lga;
            case 3: return formData.emergencyContacts[0].name && formData.emergencyContacts[0].phone && formData.consent;
            default: return false;
        }
    };

    const handleNext = () => { if (currentStep < steps.length && validateStep(currentStep)) setCurrentStep(currentStep + 1); };
    const handlePrevious = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

    // Onboarding submission
    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Authentication token missing.');

            const profileData = {
                profile: {
                    age: parseInt(formData.age),
                    location: formData.location,
                    emergencyContacts: formData.emergencyContacts,
                    language: formData.language,
                    preferences: { notifications: formData.notifications },
                },
                medicalHistory: { obstetricHistory: formData.obstetricHistory, preExistingConditions: formData.preExistingConditions }
            };

            await updateUser(profileData);

            const pregnancyData = { lmp: formData.lmp, dueDate: formData.dueDate, currentWeek: 1, status: 'active', riskLevel: 'low' };
            const response = await fetch(`${API_BASE_URL}/api/pregnancies`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(pregnancyData)
            });

          const result = await completeOnboarding();
    if (!result.success) {
      throw new Error(result.message || 'Onboarding completion failed');
    }

    navigate('/dashboard');
  } catch (error) {
    console.error(error);
    alert(`Failed to complete onboarding. ${error.message}`);
  }
    };

    // Render steps
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-[#2C3E50]">Pregnancy Setup</h3>
                        <div>
                            <label className="block text-sm font-medium text-[#2C3E50] mb-2">Last Menstrual Period (LMP)</label>
                            <input type="date" value={formData.lmp} onChange={(e) => handleLMPChange(e.target.value)} className="input-field w-full border p-2 rounded" max={new Date().toISOString().split('T')[0]} />
                            {formData.dueDate && <p className="mt-2 text-sm text-green-700">Estimated Due Date: {new Date(formData.dueDate).toLocaleDateString()}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#2C3E50] mb-2">Preferred Language</label>
                            <select value={formData.language} onChange={(e) => handleInputChange('language', e.target.value)} className="input-field w-full border p-2 rounded">
                                {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                            </select>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-[#2C3E50]">Health Profile</h3>
                        <div>
                            <label className="block text-sm font-medium text-[#2C3E50] mb-2">Age</label>
                            <input type="number" min="12" max="50" placeholder="Enter your age" value={formData.age} onChange={(e) => handleInputChange('age', e.target.value)} className="input-field w-full border p-2 rounded" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[#2C3E50] mb-2">State</label>
                                <select value={formData.location.state} onChange={(e) => handleNestedChange('location', 'state', e.target.value)} className="input-field w-full border p-2 rounded">
                                    <option value="">Select state</option>
                                    {nigerianStates.map(state => <option key={state} value={state}>{state}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#2C3E50] mb-2">LGA</label>
                                <input type="text" placeholder="Enter LGA" value={formData.location.lga} onChange={(e) => handleNestedChange('location', 'lga', e.target.value)} className="input-field w-full border p-2 rounded" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#2C3E50] mb-2">First Pregnancy?</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input type="radio" checked={formData.obstetricHistory.isFirstPregnancy} onChange={() => handleNestedChange('obstetricHistory', 'isFirstPregnancy', true)} className="accent-[#7AC2D5]" />
                                    Yes
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" checked={!formData.obstetricHistory.isFirstPregnancy} onChange={() => handleNestedChange('obstetricHistory', 'isFirstPregnancy', false)} className="accent-[#7AC2D5]" />
                                    No
                                </label>
                            </div>
                        </div>

                        {!formData.obstetricHistory.isFirstPregnancy && (
                            <div>
                                <label className="block text-sm font-medium text-[#2C3E50] mb-2">Previous Live Births</label>
                                <input type="number" min="0" max="20" value={formData.obstetricHistory.previousLiveBirths} onChange={(e) => handleNestedChange('obstetricHistory', 'previousLiveBirths', parseInt(e.target.value))} className="input-field w-full border p-2 rounded" />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-[#2C3E50] mb-2">Previous Complications</label>
                            <div className="grid md:grid-cols-2 gap-2">
                                {complications.map(comp => (
                                    <label key={comp} className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={formData.obstetricHistory.previousComplications.includes(comp)} onChange={() => {
                                            const arr = formData.obstetricHistory.previousComplications.includes(comp)
                                                ? formData.obstetricHistory.previousComplications.filter(c => c !== comp)
                                                : [...formData.obstetricHistory.previousComplications, comp];
                                            handleNestedChange('obstetricHistory', 'previousComplications', arr);
                                        }} className="accent-[#7AC2D5]" />
                                        <span className="text-sm">{comp}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#2C3E50] mb-2">Pre-existing Conditions</label>
                            <div className="grid md:grid-cols-2 gap-2">
                                {conditions.map(cond => (
                                    <label key={cond} className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={formData.preExistingConditions.includes(cond)} onChange={() => handleArrayChange('preExistingConditions', cond)} className="accent-[#7AC2D5]" />
                                        <span className="text-sm">{cond}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-[#2C3E50]">Safety & Consent</h3>

                        <div>
                            <label className="block text-sm font-medium text-[#2C3E50] mb-2">Emergency Contacts</label>
                            {formData.emergencyContacts.map((c, i) => (
                                <div key={i} className="bg-gray-50 p-4 rounded mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-medium text-[#2C3E50]">Contact {i + 1}</span>
                                        {formData.emergencyContacts.length > 1 && (
                                            <button onClick={() => removeEmergencyContact(i)} className="text-red-500 hover:text-red-700">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        )}
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-2">
                                        <input type="text" placeholder="Name" value={c.name} onChange={(e) => handleEmergencyContactChange(i, 'name', e.target.value)} className="input-field border p-2 rounded" />
                                        <input type="tel" placeholder="Phone" value={c.phone} onChange={(e) => handleEmergencyContactChange(i, 'phone', e.target.value)} className="input-field border p-2 rounded" />
                                        <input type="text" placeholder="Relationship" value={c.relationship} onChange={(e) => handleEmergencyContactChange(i, 'relationship', e.target.value)} className="input-field border p-2 rounded" />
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={addEmergencyContact} className="text-[#7AC2D5] hover:text-[#6ab0c3] font-medium flex items-center gap-2"><i className="fas fa-plus"></i> Add Contact</button>
                        </div>

                        <label className="flex items-center gap-2 mt-4">
                            <input type="checkbox" checked={formData.notifications} onChange={(e) => handleInputChange('notifications', e.target.checked)} className="accent-[#7AC2D5]" />
                            <span className="text-sm text-[#2C3E50]">Send me important notifications</span>
                        </label>

                        <label className="flex items-start gap-2 mt-4">
                            <input type="checkbox" checked={formData.consent} onChange={(e) => handleInputChange('consent', e.target.checked)} className="accent-[#7AC2D5] mt-1" />
                            <span className="text-sm text-[#2C3E50]">
                I consent to the collection and use of my health data for PregVett services. My data will be kept confidential.
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
                            <i className="fas fa-baby text-white text-2xl"></i>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-[#2C3E50] mb-2">Welcome to PregVett</h1>
                    <p className="text-[#888888]">Let's set your profile for a healthy pregnancy journey</p>
                </div>

                {/* Progress */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        {steps.map((step, i) => (
                            <div key={step.id} className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= step.id ? 'bg-[#7AC2D5] text-white' : 'bg-gray-200 text-gray-500'}`}>
                                    <i className={step.icon}></i>
                                </div>
                                {i < steps.length - 1 && <div className={`w-16 h-1 ${currentStep > step.id ? 'bg-[#7AC2D5]' : 'bg-gray-200'}`}></div>}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                        {steps.map(step => <span key={step.id} className={currentStep >= step.id ? 'text-[#7AC2D5]' : 'text-gray-500'}>{step.title}</span>)}
                    </div>
                </div>

                {/* Step content */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">{renderStep()}</div>

                {/* Navigation */}
                <div className="flex justify-between">
                    <button onClick={handlePrevious} disabled={currentStep === 1} className={`px-6 py-3 rounded-lg font-medium ${currentStep === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}>Previous</button>
                    {currentStep < steps.length ? (
                        <button onClick={handleNext} disabled={!validateStep(currentStep)} className={`px-6 py-3 rounded-lg font-medium text-white ${validateStep(currentStep) ? 'bg-[#7AC2D5] hover:bg-[#6ab0c3]' : 'bg-gray-300 cursor-not-allowed'}`}>Next</button>
                    ) : (
                        <button onClick={handleSubmit} disabled={!validateStep(currentStep)} className={`px-6 py-3 rounded-lg font-medium text-white ${validateStep(currentStep) ? 'bg-[#7AC2D5] hover:bg-[#6ab0c3]' : 'bg-gray-300 cursor-not-allowed'}`}>Complete Setup</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
