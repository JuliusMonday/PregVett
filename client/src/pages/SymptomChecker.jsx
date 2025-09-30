import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const SymptomChecker = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('checker');
  const [symptoms, setSymptoms] = useState([]);
  const [symptomStats, setSymptomStats] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    type: '',
    description: '',
    severity: 'mild',
    duration: { amount: '', unit: 'hours' },
    triggers: [],
    location: '',
    imageUrl: ''
  });

  const symptomTypes = [
    'nausea', 'fatigue', 'headache', 'back-pain', 'swelling', 
    'cramping', 'contractions', 'bleeding', 'dizziness', 'other'
  ];

  const severityLevels = ['mild', 'moderate', 'severe'];

  const commonTriggers = [
    'stress', 'certain foods', 'physical activity', 'lack of sleep', 
    'dehydration', 'hormonal changes', 'environmental factors'
  ];

  useEffect(() => {
    fetchSymptoms();
    fetchSymptomStats();
  }, []);

  const fetchSymptoms = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/symptoms', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSymptoms(data.symptoms);
      }
    } catch (error) {
      console.error('Error fetching symptoms:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSymptomStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/symptoms/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSymptomStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching symptom stats:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDurationChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      duration: {
        ...prev.duration,
        [field]: value
      }
    }));
  };

  const handleTriggerToggle = (trigger) => {
    setFormData(prev => ({
      ...prev,
      triggers: prev.triggers.includes(trigger)
        ? prev.triggers.filter(t => t !== trigger)
        : [...prev.triggers, trigger]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedSymptom(data.symptom);
        setShowForm(false);
        setFormData({
          type: '',
          description: '',
          severity: 'mild',
          duration: { amount: '', unit: 'hours' },
          triggers: [],
          location: '',
          imageUrl: ''
        });
        fetchSymptoms();
        fetchSymptomStats();
      }
    } catch (error) {
      console.error('Error logging symptom:', error);
    }
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'severe': return 'text-red-600 bg-red-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'mild': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderSymptomChecker = () => (
    <div className="space-y-6">
      {showForm ? (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#2C3E50]">Log New Symptom</h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                Symptom Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="input-field"
                required
              >
                <option value="">Select symptom type</option>
                {symptomTypes.map(type => (
                  <option key={type} value={type}>
                    {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="input-field"
                rows={3}
                placeholder="Describe your symptoms in detail..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                Severity *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {severityLevels.map(level => (
                  <label key={level} className="flex items-center">
                    <input
                      type="radio"
                      name="severity"
                      value={level}
                      checked={formData.severity === level}
                      onChange={() => handleInputChange('severity', level)}
                      className="mr-2"
                    />
                    <span className="capitalize">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                Duration
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  value={formData.duration.amount}
                  onChange={(e) => handleDurationChange('amount', e.target.value)}
                  className="input-field"
                  placeholder="Amount"
                />
                <select
                  value={formData.duration.unit}
                  onChange={(e) => handleDurationChange('unit', e.target.value)}
                  className="input-field"
                >
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                Location (if applicable)
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="input-field"
                placeholder="e.g., lower abdomen, head, back"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                Possible Triggers
              </label>
              <div className="grid grid-cols-2 gap-2">
                {commonTriggers.map(trigger => (
                  <label key={trigger} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.triggers.includes(trigger)}
                      onChange={() => handleTriggerToggle(trigger)}
                      className="mr-2"
                    />
                    <span className="text-sm capitalize">{trigger}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button type="submit" className="flex-1 btn-primary">
                <i className="fas fa-save mr-2"></i>
                Log Symptom
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="card">
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-[#F4A497] rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-stethoscope text-white text-3xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">Symptom Checker</h2>
            <p className="text-[#888888] mb-8 max-w-md mx-auto">
              Log your symptoms and get AI-powered assessment with personalized recommendations for your pregnancy journey.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              <i className="fas fa-plus mr-2"></i>
              Log New Symptom
            </button>
          </div>
        </div>
      )}

      {/* Quick Symptom Guide */}
      <div className="card">
        <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">When to Seek Immediate Care</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              Emergency Symptoms
            </h4>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Vaginal bleeding or spotting</li>
              <li>• Severe abdominal pain</li>
              <li>• Reduced fetal movement</li>
              <li>• Severe headaches with vision changes</li>
              <li>• Sudden swelling in face/hands</li>
            </ul>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">
              <i className="fas fa-clock mr-2"></i>
              Contact Your Doctor Within 24 Hours
            </h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Fever over 100.4°F</li>
              <li>• Persistent vomiting</li>
              <li>• Painful urination</li>
              <li>• Moderate contractions before 37 weeks</li>
              <li>• Severe back pain</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSymptomHistory = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#2C3E50]">Symptom History</h2>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            <i className="fas fa-plus mr-2"></i>
            New Symptom
          </button>
        </div>

        {symptoms.length === 0 ? (
          <div className="text-center py-8">
            <i className="fas fa-clipboard-list text-4xl text-[#888888] mb-4"></i>
            <p className="text-[#888888]">No symptoms logged yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {symptoms.map((symptom) => (
              <div key={symptom._id} className="bg-[#F5F5F5] p-4 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-[#2C3E50] capitalize">
                        {symptom.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(symptom.severity)}`}>
                        {symptom.severity}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(symptom.aiAssessment?.riskLevel)}`}>
                        {symptom.aiAssessment?.riskLevel || 'unknown'} risk
                      </span>
                    </div>
                    <p className="text-sm text-[#888888] mb-2">{symptom.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-[#888888]">
                      <span>
                        <i className="fas fa-calendar mr-1"></i>
                        {new Date(symptom.createdAt).toLocaleDateString()}
                      </span>
                      {symptom.duration.amount && (
                        <span>
                          <i className="fas fa-clock mr-1"></i>
                          {symptom.duration.amount} {symptom.duration.unit}
                        </span>
                      )}
                      {symptom.location && (
                        <span>
                          <i className="fas fa-map-marker-alt mr-1"></i>
                          {symptom.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    {symptom.resolved ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Resolved
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                </div>

                {symptom.aiAssessment && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <h4 className="font-medium text-[#2C3E50] text-sm mb-2">AI Assessment:</h4>
                    <div className="space-y-1">
                      {symptom.aiAssessment.recommendations.slice(0, 2).map((rec, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <i className="fas fa-lightbulb text-[#F4A497] text-xs mt-0.5"></i>
                          <span className="text-xs text-[#888888]">{rec}</span>
                        </div>
                      ))}
                    </div>
                    {symptom.aiAssessment.seekImmediateCare && (
                      <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                        <p className="text-xs text-red-700">
                          <i className="fas fa-exclamation-triangle mr-1"></i>
                          Seek immediate medical attention
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedSymptom(symptom)}
                      className="text-xs text-[#7AC2D5] hover:text-[#6ab0c3]"
                    >
                      View Details
                    </button>
                    {!symptom.resolved && (
                      <button
                        onClick={() => handleResolveSymptom(symptom._id)}
                        className="text-xs text-[#BEE7C4] hover:text-[#aed6b4]"
                      >
                        Mark Resolved
                      </button>
                    )}
                  </div>
                  <span className="text-xs text-[#888888]">
                    Confidence: {Math.round((symptom.aiAssessment?.confidence || 0) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {symptomStats && (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-[#888888] mb-1">Total Symptoms</div>
                  <div className="text-2xl font-bold text-[#7AC2D5]">{symptomStats.total}</div>
                </div>
                <div className="w-12 h-12 bg-[#7AC2D5] rounded-full flex items-center justify-center">
                  <i className="fas fa-clipboard-list text-white"></i>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-[#888888] mb-1">Active</div>
                  <div className="text-2xl font-bold text-[#F4A497]">{symptomStats.active}</div>
                </div>
                <div className="w-12 h-12 bg-[#F4A497] rounded-full flex items-center justify-center">
                  <i className="fas fa-exclamation-circle text-white"></i>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-[#888888] mb-1">Resolved</div>
                  <div className="text-2xl font-bold text-[#BEE7C4]">{symptomStats.resolved}</div>
                </div>
                <div className="w-12 h-12 bg-[#BEE7C4] rounded-full flex items-center justify-center">
                  <i className="fas fa-check-circle text-white"></i>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-[#888888] mb-1">High Risk</div>
                  <div className="text-2xl font-bold text-red-500">
                    {symptomStats.byRiskLevel.high || 0}
                  </div>
                </div>
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-exclamation-triangle text-white"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Symptoms by Type */}
            <div className="card">
              <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">Symptoms by Type</h3>
              <div className="space-y-3">
                {Object.entries(symptomStats.byType).map(([type, count]) => (
                  <div key={type}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize">
                        {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                      <span className="font-medium">{count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="progress-bar h-2 rounded-full"
                        style={{ width: `${(count / symptomStats.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Level Distribution */}
            <div className="card">
              <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">Risk Level Distribution</h3>
              <div className="space-y-3">
                {Object.entries(symptomStats.byRiskLevel).map(([level, count]) => {
                  const colors = {
                    critical: 'bg-red-500',
                    high: 'bg-orange-500',
                    medium: 'bg-yellow-500',
                    low: 'bg-green-500',
                    unknown: 'bg-gray-500'
                  };
                  return (
                    <div key={level}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="capitalize">{level}</span>
                        <span className="font-medium">{count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${colors[level] || colors.unknown} h-2 rounded-full`}
                          style={{ width: `${(count / symptomStats.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const handleResolveSymptom = async (symptomId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/symptoms/${symptomId}/resolve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          actionTaken: {
            homeRemedies: ['Rest', 'Hydration'],
            consultedDoctor: false
          }
        })
      });

      if (response.ok) {
        fetchSymptoms();
        fetchSymptomStats();
      }
    } catch (error) {
      console.error('Error resolving symptom:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#2C3E50]">Symptom Checker</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-[#888888]">AI-Powered Assessment</span>
          <div className="w-8 h-8 bg-[#F4A497] rounded-full flex items-center justify-center">
            <i className="fas fa-brain text-white text-sm"></i>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'checker', label: 'Symptom Checker', icon: 'fas fa-stethoscope' },
          { id: 'history', label: 'History', icon: 'fas fa-history' },
          { id: 'analytics', label: 'Analytics', icon: 'fas fa-chart-bar' }
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
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7AC2D5]"></div>
        </div>
      ) : (
        <>
          {activeTab === 'checker' && renderSymptomChecker()}
          {activeTab === 'history' && renderSymptomHistory()}
          {activeTab === 'analytics' && renderAnalytics()}
        </>
      )}

      {/* Symptom Detail Modal */}
      {selectedSymptom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-[#2C3E50] capitalize">
                  {selectedSymptom.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </h2>
                <button
                  onClick={() => setSelectedSymptom(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#2C3E50] mb-2">Description</h3>
                  <p className="text-[#888888]">{selectedSymptom.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-[#2C3E50] mb-2">Severity</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(selectedSymptom.severity)}`}>
                      {selectedSymptom.severity}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2C3E50] mb-2">Risk Level</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(selectedSymptom.aiAssessment?.riskLevel)}`}>
                      {selectedSymptom.aiAssessment?.riskLevel || 'unknown'}
                    </span>
                  </div>
                </div>

                {selectedSymptom.aiAssessment && (
                  <div>
                    <h3 className="font-semibold text-[#2C3E50] mb-2">AI Recommendations</h3>
                    <div className="bg-[#F5F5F5] p-4 rounded-lg">
                      <ul className="space-y-2">
                        {selectedSymptom.aiAssessment.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <i className="fas fa-lightbulb text-[#F4A497] mt-1"></i>
                            <span className="text-sm text-[#888888]">{rec}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {selectedSymptom.aiAssessment.seekImmediateCare && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
                          <p className="text-sm text-red-700 font-medium">
                            <i className="fas fa-exclamation-triangle mr-2"></i>
                            Seek immediate medical attention
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex space-x-3">
                  {!selectedSymptom.resolved && (
                    <button
                      onClick={() => {
                        handleResolveSymptom(selectedSymptom._id);
                        setSelectedSymptom(null);
                      }}
                      className="flex-1 btn-primary"
                    >
                      Mark as Resolved
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedSymptom(null)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;