import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const BirthDefectPrevention = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('timeline');
  const [currentWeek, setCurrentWeek] = useState(12);
  const [preventionTips, setPreventionTips] = useState([]);
  const [environmentalHazards, setEnvironmentalHazards] = useState([]);
  const [medications, setMedications] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null);

  useEffect(() => {
    fetchPreventionTips();
    fetchEnvironmentalHazards();
    fetchMedications();
  }, []);

  const fetchPreventionTips = async () => {
    // Mock prevention tips data
    setPreventionTips([
      {
        id: 1,
        week: 4,
        title: 'Start Folic Acid',
        description: 'Begin taking 400-800mcg of folic acid daily to prevent neural tube defects.',
        category: 'nutrition',
        priority: 'high',
        completed: true
      },
      {
        id: 2,
        week: 8,
        title: 'Avoid Harmful Substances',
        description: 'Stop alcohol, smoking, and limit caffeine to 200mg per day.',
        category: 'lifestyle',
        priority: 'high',
        completed: true
      },
      {
        id: 3,
        week: 12,
        title: 'First Trimester Screening',
        description: 'Schedule your first trimester screening for chromosomal abnormalities.',
        category: 'medical',
        priority: 'medium',
        completed: false
      },
      {
        id: 4,
        week: 16,
        title: 'Anatomy Scan',
        description: 'Get detailed anatomy scan to check for structural abnormalities.',
        category: 'medical',
        priority: 'high',
        completed: false
      },
      {
        id: 5,
        week: 20,
        title: 'Gestational Diabetes Test',
        description: 'Screen for gestational diabetes between 24-28 weeks.',
        category: 'medical',
        priority: 'medium',
        completed: false
      }
    ]);
  };

  const fetchEnvironmentalHazards = async () => {
    // Mock environmental hazards data
    setEnvironmentalHazards([
      {
        id: 1,
        name: 'Pesticides',
        risk: 'High',
        description: 'Exposure to certain pesticides may increase risk of birth defects.',
        prevention: 'Avoid direct contact, wear protective gear, choose organic produce when possible.',
        trimester: 'all'
      },
      {
        id: 2,
        name: 'Lead',
        risk: 'High',
        description: 'Lead exposure can cause developmental delays and birth defects.',
        prevention: 'Test old paint, avoid contaminated water, be cautious with imported ceramics.',
        trimester: 'all'
      },
      {
        id: 3,
        name: 'Mercury',
        risk: 'High',
        description: 'Mercury can damage baby\'s developing brain and nervous system.',
        prevention: 'Avoid high-mercury fish, limit tuna consumption, check fish advisories.',
        trimester: 'all'
      },
      {
        id: 4,
        name: 'Radiation',
        risk: 'Medium',
        description: 'High levels of radiation exposure can cause birth defects.',
        prevention: 'Avoid unnecessary X-rays, tell healthcare providers you\'re pregnant.',
        trimester: 'all'
      },
      {
        id: 5,
        name: 'Air Pollution',
        risk: 'Medium',
        description: 'Poor air quality may increase risk of premature birth and low birth weight.',
        prevention: 'Monitor air quality, use air purifiers, limit outdoor activities on poor air days.',
        trimester: 'all'
      }
    ]);
  };

  const fetchMedications = async () => {
    // Mock medications data
    setMedications([
      {
        id: 1,
        name: 'Isotretinoin (Accutane)',
        category: 'Acne Medication',
        risk: 'High',
        description: 'Known to cause severe birth defects including brain, heart, and facial abnormalities.',
        alternatives: 'Topical treatments, antibiotics, benzoyl peroxide',
        safeAlternatives: true
      },
      {
        id: 2,
        name: 'Warfarin',
        category: 'Blood Thinner',
        risk: 'High',
        description: 'Can cause fetal warfarin syndrome with nasal hypoplasia and skeletal abnormalities.',
        alternatives: 'Heparin or low molecular weight heparin',
        safeAlternatives: true
      },
      {
        id: 3,
        name: 'Valproic Acid',
        category: 'Anti-seizure',
        risk: 'High',
        description: 'Associated with neural tube defects and facial abnormalities.',
        alternatives: 'Lamotrigine, levetiracetam (consult doctor)',
        safeAlternatives: true
      },
      {
        id: 4,
        name: 'ACE Inhibitors',
        category: 'Blood Pressure',
        risk: 'Medium',
        description: 'May cause fetal kidney problems and low amniotic fluid.',
        alternatives: 'Methyldopa, labetalol, nifedipine',
        safeAlternatives: true
      },
      {
        id: 5,
        name: 'NSAIDs (after 20 weeks)',
        category: 'Pain Relief',
        risk: 'Medium',
        description: 'May cause premature closure of fetal ductus arteriosus.',
        alternatives: 'Acetaminophen (Tylenol)',
        safeAlternatives: true
      }
    ]);
  };

  const getCriticalPeriods = () => [
    { week: 3-4, name: 'Neural Tube Formation', description: 'Critical for brain and spinal cord development' },
    { week: 4-8, name: 'Organogenesis', description: 'Major organs and systems form' },
    { week: 9-12, name: 'Facial Development', description: 'Facial features and palate develop' },
    { week: 13-16, name: 'Skeletal Growth', description: 'Bone development and mineralization' },
    { week: 17-20, name: 'Sensory Development', description: 'Hearing and vision develop' },
    { week: 21-24, name: 'Lung Development', description: 'Lungs prepare for breathing air' },
    { week: 25-28, name: 'Brain Growth', description: 'Rapid brain development occurs' },
    { week: 29-32, name: 'Immune System', description: 'Immune system develops' },
    { week: 33-36, name: 'Final Growth', description: 'Weight gain and maturation' },
    { week: 37-40, name: 'Preparation for Birth', description: 'Final development and positioning' }
  ];

  const getWeekInfo = (week) => {
    const weekData = {
      developments: [],
      preventionFocus: [],
      risks: [],
      recommendations: []
    };

    if (week <= 4) {
      weekData.developments = ['Neural tube formation', 'Heart begins to beat', 'Brain development starts'];
      weekData.preventionFocus = ['Folic acid supplementation', 'Avoid harmful substances'];
      weekData.risks = ['Neural tube defects', 'Heart abnormalities'];
      weekData.recommendations = ['Take 400-800mcg folic acid daily', 'Avoid alcohol and smoking'];
    } else if (week <= 8) {
      weekData.developments = ['Major organs form', 'Facial features develop', 'Limbs begin to form'];
      weekData.preventionFocus = ['Prenatal vitamins', 'Avoid infections', 'Medication safety'];
      weekData.risks = ['Organ defects', 'Miscarriage risk'];
      weekData.recommendations = ['Continue prenatal vitamins', 'Avoid certain medications', 'Practice good hygiene'];
    } else if (week <= 12) {
      weekData.developments = ['Fetal movement begins', 'External genitalia form', 'Fingernails develop'];
      weekData.preventionFocus = ['First trimester screening', 'Nutrition optimization'];
      weekData.risks = ['Chromosomal abnormalities', 'Nutritional deficiencies'];
      weekData.recommendations = ['Schedule first trimester screening', 'Eat balanced diet', 'Stay hydrated'];
    } else if (week <= 16) {
      weekData.developments = ['Skeleton hardens', 'Baby can hear', 'Facial expressions develop'];
      weekData.preventionFocus = ['Anatomy scan', 'Continue healthy lifestyle'];
      weekData.risks = ['Structural abnormalities', 'Hearing impairments'];
      weekData.recommendations = ['Get anatomy scan', 'Talk to baby', 'Continue exercise'];
    } else if (week <= 20) {
      weekData.developments = ['Baby is more active', 'Skin is covered in vernix', 'Gender can be determined'];
      weekData.preventionFocus = ['Mid-pregnancy check-up', 'Gestational diabetes screening'];
      weekData.risks = ['Gestational diabetes', 'Preterm labor'];
      weekData.recommendations = ['Attend regular check-ups', 'Monitor weight gain', 'Watch for warning signs'];
    } else if (week <= 24) {
      weekData.developments = ['Lungs develop air sacs', 'Baby responds to sound', 'Taste buds develop'];
      weekData.preventionFocus = ['Gestational diabetes test', 'Nutrition monitoring'];
      weekData.risks = ['Respiratory problems', 'Nutritional deficiencies'];
      weekData.recommendations = ['Get glucose screening test', 'Eat iron-rich foods', 'Rest when needed'];
    } else if (week <= 28) {
      weekData.developments = ['Brain develops rapidly', 'Baby opens eyes', 'Regular breathing movements'];
      weekData.preventionFocus = ['Third trimester care', 'Kick counting'];
      weekData.risks = ['Preterm birth', 'Growth restriction'];
      weekData.recommendations = ['Start kick counting', 'Monitor fetal movement', 'Prepare for baby'];
    } else if (week <= 32) {
      weekData.developments = ['Baby practices breathing', 'Bones are fully formed', 'Baby gains weight'];
      weekData.preventionFocus = ['Fetal growth monitoring', 'Preterm labor prevention'];
      weekData.risks = ['Preterm birth', 'Low birth weight'];
      weekData.recommendations = ['Attend regular check-ups', 'Watch for contractions', 'Rest frequently'];
    } else if (week <= 36) {
      weekData.developments = ['Baby moves into position', 'Lungs are nearly mature', 'Immune system develops'];
      weekData.preventionFocus = ['Birth preparation', 'Final growth monitoring'];
      weekData.risks = ['Breech position', 'Post-term pregnancy'];
      weekData.recommendations = ['Prepare birth plan', 'Pack hospital bag', 'Practice breathing exercises'];
    } else {
      weekData.developments = ['Baby is fully developed', 'Baby drops into pelvis', 'Final weight gain'];
      weekData.preventionFocus = ['Labor preparation', 'Signs of labor'];
      weekData.risks = ['Post-term pregnancy', 'Labor complications'];
      weekData.recommendations = ['Know labor signs', 'Have emergency contacts ready', 'Final prenatal visit'];
    }

    return weekData;
  };

  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderTimeline = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Critical Development Timeline</h2>
        
        {/* Week Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#2C3E50] mb-2">
            Select Week: {currentWeek}
          </label>
          <input
            type="range"
            min="1"
            max="40"
            value={currentWeek}
            onChange={(e) => setCurrentWeek(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-[#888888] mt-1">
            <span>Week 1</span>
            <span>Week 20</span>
            <span>Week 40</span>
          </div>
        </div>

        {/* Week Information */}
        {selectedWeek && (
          <div className="bg-[#F5F5F5] p-6 rounded-lg mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#2C3E50]">Week {selectedWeek}</h3>
              <span className="px-3 py-1 bg-[#7AC2D5] text-white rounded-full text-sm">
                {selectedWeek <= 13 ? 'First Trimester' : 
                 selectedWeek <= 26 ? 'Second Trimester' : 'Third Trimester'}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-[#2C3E50] mb-3">Key Developments</h4>
                <ul className="space-y-2">
                  {selectedWeek.developments.map((development, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <i className="fas fa-check-circle text-[#BEE7C4] mt-1"></i>
                      <span className="text-sm text-[#888888]">{development}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-[#2C3E50] mb-3">Prevention Focus</h4>
                <ul className="space-y-2">
                  {selectedWeek.preventionFocus.map((focus, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <i className="fas fa-shield-alt text-[#F4A497] mt-1"></i>
                      <span className="text-sm text-[#888888]">{focus}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <h4 className="font-semibold text-[#2C3E50] mb-3">Recommendations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedWeek.recommendations.map((recommendation, index) => (
                  <div key={index} className="bg-white p-3 rounded border border-gray-200">
                    <span className="text-sm text-[#888888]">{recommendation}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Critical Periods Timeline */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#2C3E50]">Critical Development Periods</h3>
          <div className="space-y-3">
            {getCriticalPeriods().map((period, index) => {
              const isCurrent = currentWeek >= period.week.split('-')[0] && currentWeek <= period.week.split('-')[1];
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    isCurrent ? 'border-[#7AC2D5] bg-[#7AC2D5] bg-opacity-10' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-[#2C3E50]">{period.name}</h4>
                    <span className="text-sm text-[#888888]">Weeks {period.week}</span>
                  </div>
                  <p className="text-sm text-[#888888]">{period.description}</p>
                  {isCurrent && (
                    <div className="mt-2">
                      <span className="inline-block px-2 py-1 bg-[#7AC2D5] text-white text-xs rounded-full">
                        Current Period
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreventionTips = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Daily Prevention Tips</h2>
        
        <div className="space-y-4">
          {preventionTips.map((tip) => (
            <div key={tip.id} className="bg-[#F5F5F5] p-4 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-2 py-1 bg-[#7AC2D5] text-white text-xs rounded-full">
                      Week {tip.week}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(tip.priority)}`}>
                      {tip.priority} Priority
                    </span>
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                      {tip.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#2C3E50] mb-2">{tip.title}</h3>
                  <p className="text-sm text-[#888888]">{tip.description}</p>
                </div>
                <div className="ml-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    tip.completed ? 'bg-[#BEE7C4]' : 'bg-gray-200'
                  }`}>
                    {tip.completed ? (
                      <i className="fas fa-check text-white text-sm"></i>
                    ) : (
                      <i className="fas fa-clock text-gray-500 text-sm"></i>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEnvironmentalHazards = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Environmental Hazards</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {environmentalHazards.map((hazard) => (
            <div key={hazard.id} className="bg-[#F5F5F5] p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-[#2C3E50]">{hazard.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(hazard.risk)}`}>
                  {hazard.risk} Risk
                </span>
              </div>
              <p className="text-sm text-[#888888] mb-3">{hazard.description}</p>
              <div className="bg-white p-3 rounded border border-gray-200">
                <h4 className="font-medium text-[#2C3E50] text-sm mb-1">Prevention:</h4>
                <p className="text-xs text-[#888888]">{hazard.prevention}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMedicationSafety = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Medication Safety</h2>
        
        <div className="mb-6 bg-red-50 border border-red-200 p-4 rounded-lg">
          <h3 className="font-semibold text-red-800 mb-2">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            Important Notice
          </h3>
          <p className="text-sm text-red-700">
            Always consult with your healthcare provider before taking any medication during pregnancy. 
            This information is for educational purposes only and should not replace professional medical advice.
          </p>
        </div>

        <div className="space-y-4">
          {medications.map((medication) => (
            <div key={medication.id} className="bg-[#F5F5F5] p-4 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-[#2C3E50]">{medication.name}</h3>
                    <span className="text-sm text-[#888888]">({medication.category})</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(medication.risk)}`}>
                      {medication.risk} Risk
                    </span>
                  </div>
                  <p className="text-sm text-[#888888] mb-3">{medication.description}</p>
                  
                  {medication.safeAlternatives && (
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h4 className="font-medium text-[#2C3E50] text-sm mb-1">Safer Alternatives:</h4>
                      <p className="text-xs text-[#888888]">{medication.alternatives}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPartnerEducation = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Partner Education</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-[#F5F5F5] p-4 rounded-lg">
              <h3 className="font-semibold text-[#2C3E50] mb-3">
                <i className="fas fa-heart text-[#F4A497] mr-2"></i>
                Emotional Support
              </h3>
              <ul className="space-y-2 text-sm text-[#888888]">
                <li>• Be patient with mood changes</li>
                <li>• Attend prenatal appointments together</li>
                <li>• Listen to her concerns and fears</li>
                <li>• Offer help with daily tasks</li>
                <li>• Encourage rest and self-care</li>
              </ul>
            </div>

            <div className="bg-[#F5F5F5] p-4 rounded-lg">
              <h3 className="font-semibold text-[#2C3E50] mb-3">
                <i className="fas fa-home text-[#7AC2D5] mr-2"></i>
                Home Environment
              </h3>
              <ul className="space-y-2 text-sm text-[#888888]">
                <li>• Create a smoke-free home</li>
                <li>• Ensure proper ventilation</li>
                <li>• Handle cleaning products safely</li>
                <li>• Avoid exposure to chemicals</li>
                <li>• Maintain a peaceful atmosphere</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-[#F5F5F5] p-4 rounded-lg">
              <h3 className="font-semibold text-[#2C3E50] mb-3">
                <i className="fas fa-utensils text-[#BEE7C4] mr-2"></i>
                Nutrition Support
              </h3>
              <ul className="space-y-2 text-sm text-[#888888]">
                <li>• Help prepare healthy meals</li>
                <li>• Encourage regular meals</li>
                <li>• Shop for nutritious foods</li>
                <li>• Remind about prenatal vitamins</li>
                <li>• Stay hydrated together</li>
              </ul>
            </div>

            <div className="bg-[#F5F5F5] p-4 rounded-lg">
              <h3 className="font-semibold text-[#2C3E50] mb-3">
                <i className="fas fa-shield-alt text-[#F4A497] mr-2"></i>
                Emergency Preparedness
              </h3>
              <ul className="space-y-2 text-sm text-[#888888]">
                <li>• Know emergency contact numbers</li>
                <li>• Learn the signs of labor</li>
                <li>• Plan transportation to hospital</li>
                <li>• Pack hospital bag together</li>
                <li>• Know the route to the hospital</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">
            <i className="fas fa-info-circle mr-2"></i>
            Your Role is Crucial
          </h3>
          <p className="text-sm text-blue-700">
            As a partner, your support and involvement significantly contribute to a healthy pregnancy. 
            Your emotional support, practical help, and shared responsibility in prevention efforts 
            can help reduce stress and improve outcomes for both mother and baby.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#2C3E50]">Birth Defect Prevention</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-[#888888]">Week {currentWeek}</span>
          <div className="w-8 h-8 bg-[#F4A497] rounded-full flex items-center justify-center">
            <i className="fas fa-shield-alt text-white text-sm"></i>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'timeline', label: 'Timeline', icon: 'fas fa-clock' },
          { id: 'tips', label: 'Prevention Tips', icon: 'fas fa-lightbulb' },
          { id: 'hazards', label: 'Hazards', icon: 'fas fa-exclamation-triangle' },
          { id: 'medications', label: 'Medications', icon: 'fas fa-pills' },
          { id: 'partner', label: 'Partner Guide', icon: 'fas fa-users' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-[#7AC2D5] shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <i className={tab.icon}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'timeline' && (
        <>
          {renderTimeline()}
          <button
            onClick={() => setSelectedWeek(getWeekInfo(currentWeek))}
            className="btn-primary mt-4"
          >
            View Week {currentWeek} Details
          </button>
        </>
      )}
      {activeTab === 'tips' && renderPreventionTips()}
      {activeTab === 'hazards' && renderEnvironmentalHazards()}
      {activeTab === 'medications' && renderMedicationSafety()}
      {activeTab === 'partner' && renderPartnerEducation()}

      {/* Week Detail Modal */}
      {selectedWeek && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#2C3E50]">Week {currentWeek} Details</h2>
                <button
                  onClick={() => setSelectedWeek(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-[#2C3E50] mb-3">Key Developments</h3>
                  <div className="space-y-2">
                    {selectedWeek.developments.map((development, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <i className="fas fa-check-circle text-[#BEE7C4] mt-1"></i>
                        <span className="text-sm text-[#888888]">{development}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-[#2C3E50] mb-3">Potential Risks</h3>
                  <div className="space-y-2">
                    {selectedWeek.risks.map((risk, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <i className="fas fa-exclamation-triangle text-[#F4A497] mt-1"></i>
                        <span className="text-sm text-[#888888]">{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-[#2C3E50] mb-3">Prevention Recommendations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedWeek.recommendations.map((recommendation, index) => (
                    <div key={index} className="bg-[#F5F5F5] p-3 rounded-lg">
                      <span className="text-sm text-[#888888]">{recommendation}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <button
                  onClick={() => setSelectedWeek(null)}
                  className="btn-primary w-full"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BirthDefectPrevention;