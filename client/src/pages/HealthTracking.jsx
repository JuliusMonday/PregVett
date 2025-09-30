import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const HealthTracking = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [metrics, setMetrics] = useState([]);
  const [weightData, setWeightData] = useState([]);
  const [bpData, setBpData] = useState([]);
  const [glucoseData, setGlucoseData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
    fetchWeightData();
    fetchBpData();
    fetchGlucoseData();
  }, []);

  const fetchMetrics = async () => {
    // Mock data - would be replaced with actual API call
    setMetrics([
      { type: 'weight', value: 65, unit: 'kg', date: '2024-01-15', withinRange: true },
      { type: 'blood-pressure', value: '120/80', unit: 'mmHg', date: '2024-01-15', withinRange: true },
      { type: 'glucose', value: 95, unit: 'mg/dL', date: '2024-01-15', withinRange: true }
    ]);
  };

  const fetchWeightData = async () => {
    // Mock data - would be replaced with actual API call
    setWeightData([
      { week: 8, weight: 62, targetMin: 60, targetMax: 65 },
      { week: 12, weight: 65, targetMin: 62, targetMax: 67 },
      { week: 16, weight: 68, targetMin: 65, targetMax: 70 },
      { week: 20, weight: 71, targetMin: 68, targetMax: 73 }
    ]);
  };

  const fetchBpData = async () => {
    // Mock data - would be replaced with actual API call
    setBpData([
      { date: '2024-01-10', systolic: 118, diastolic: 75, withinRange: true },
      { date: '2024-01-12', systolic: 122, diastolic: 78, withinRange: true },
      { date: '2024-01-15', systolic: 120, diastolic: 80, withinRange: true }
    ]);
  };

  const fetchGlucoseData = async () => {
    // Mock data - would be replaced with actual API call
    setGlucoseData([
      { date: '2024-01-10', fasting: 85, random: 120, withinRange: true },
      { date: '2024-01-12', fasting: 90, random: 125, withinRange: true },
      { date: '2024-01-15', fasting: 95, random: 130, withinRange: true }
    ]);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Health Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#F5F5F5] p-6 rounded-lg text-center">
            <div className="w-16 h-16 bg-[#7AC2D5] rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-weight text-white text-2xl"></i>
            </div>
            <h3 className="font-semibold text-[#2C3E50] mb-2">Weight</h3>
            <div className="text-2xl font-bold text-[#7AC2D5]">65 kg</div>
            <div className="text-sm text-[#888888]">Within healthy range</div>
          </div>

          <div className="bg-[#F5F5F5] p-6 rounded-lg text-center">
            <div className="w-16 h-16 bg-[#BEE7C4] rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-heartbeat text-white text-2xl"></i>
            </div>
            <h3 className="font-semibold text-[#2C3E50] mb-2">Blood Pressure</h3>
            <div className="text-2xl font-bold text-[#BEE7C4]">120/80</div>
            <div className="text-sm text-[#888888]">Normal range</div>
          </div>

          <div className="bg-[#F5F5F5] p-6 rounded-lg text-center">
            <div className="w-16 h-16 bg-[#F4A497] rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-tint text-white text-2xl"></i>
            </div>
            <h3 className="font-semibold text-[#2C3E50] mb-2">Glucose</h3>
            <div className="text-2xl font-bold text-[#F4A497]">95 mg/dL</div>
            <div className="text-sm text-[#888888]">Normal range</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#F5F5F5] p-6 rounded-lg">
            <h3 className="font-semibold text-[#2C3E50] mb-4">Recent Measurements</h3>
            <div className="space-y-3">
              {metrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded">
                  <div>
                    <div className="font-medium text-[#2C3E50] capitalize">
                      {metric.type.replace('-', ' ')}
                    </div>
                    <div className="text-sm text-[#888888]">{metric.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-[#2C3E50]">
                      {metric.value} {metric.unit}
                    </div>
                    <div className={`text-xs ${
                      metric.withinRange ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.withinRange ? 'Normal' : 'Attention needed'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#F5F5F5] p-6 rounded-lg">
            <h3 className="font-semibold text-[#2C3E50] mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full btn-primary text-left">
                <i className="fas fa-plus mr-3"></i>
                Log Weight
              </button>
              <button className="w-full btn-secondary text-left">
                <i className="fas fa-plus mr-3"></i>
                Log Blood Pressure
              </button>
              <button className="w-full btn-accent text-left">
                <i className="fas fa-plus mr-3"></i>
                Log Glucose
              </button>
              <button className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg text-left hover:bg-gray-300">
                <i className="fas fa-download mr-3"></i>
                Export Health Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWeightTracking = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#2C3E50]">Weight Tracking</h2>
          <button className="btn-primary">
            <i className="fas fa-plus mr-2"></i>
            Log Weight
          </button>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold text-[#2C3E50] mb-4">Weight Progress</h3>
          <div className="bg-[#F5F5F5] p-6 rounded-lg">
            <div className="space-y-4">
              {weightData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-[#2C3E50]">Week {data.week}</span>
                    <div className="text-sm text-[#888888]">
                      Target: {data.targetMin}-{data.targetMax} kg
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${
                      data.weight >= data.targetMin && data.weight <= data.targetMax
                        ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {data.weight} kg
                    </div>
                    <div className="text-xs text-[#888888]">
                      {data.weight >= data.targetMin && data.weight <= data.targetMax
                        ? 'On track' : 'Needs attention'
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#F5F5F5] p-6 rounded-lg">
            <h3 className="font-semibold text-[#2C3E50] mb-4">Weight Gain Guidelines</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Underweight (BMI &lt; 18.5):</span>
                <span className="font-medium">12.5-18 kg</span>
              </div>
              <div className="flex justify-between">
                <span>Normal weight (BMI 18.5-24.9):</span>
                <span className="font-medium">11.5-16 kg</span>
              </div>
              <div className="flex justify-between">
                <span>Overweight (BMI 25-29.9):</span>
                <span className="font-medium">7-11.5 kg</span>
              </div>
              <div className="flex justify-between">
                <span>Obese (BMI ≥ 30):</span>
                <span className="font-medium">5-9 kg</span>
              </div>
            </div>
          </div>

          <div className="bg-[#F5F5F5] p-6 rounded-lg">
            <h3 className="font-semibold text-[#2C3E50] mb-4">Tips for Healthy Weight Gain</h3>
            <ul className="space-y-2 text-sm text-[#888888]">
              <li>• Eat regular, balanced meals</li>
              <li>• Choose nutrient-dense foods</li>
              <li>• Stay physically active</li>
              <li>• Drink plenty of water</li>
              <li>• Get adequate sleep</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVitalSigns = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Vital Signs</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Blood Pressure */}
          <div className="bg-[#F5F5F5] p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#2C3E50]">Blood Pressure</h3>
              <button className="btn-secondary text-sm">
                <i className="fas fa-plus mr-2"></i>
                Add Reading
              </button>
            </div>
            
            <div className="space-y-3">
              {bpData.map((data, index) => (
                <div key={index} className="bg-white p-4 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-[#2C3E50]">{data.date}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      data.withinRange ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {data.withinRange ? 'Normal' : 'High'}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-[#BEE7C4]">
                    {data.systolic}/{data.diastolic} mmHg
                  </div>
                  <div className="text-xs text-[#888888]">
                    Normal: Less than 120/80 mmHg
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Glucose */}
          <div className="bg-[#F5F5F5] p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#2C3E50]">Blood Glucose</h3>
              <button className="btn-secondary text-sm">
                <i className="fas fa-plus mr-2"></i>
                Add Reading
              </button>
            </div>
            
            <div className="space-y-3">
              {glucoseData.map((data, index) => (
                <div key={index} className="bg-white p-4 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-[#2C3E50]">{data.date}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      data.withinRange ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {data.withinRange ? 'Normal' : 'High'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-[#888888]">Fasting</div>
                      <div className="font-bold text-[#F4A497]">{data.fasting} mg/dL</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#888888]">Random</div>
                      <div className="font-bold text-[#F4A497]">{data.random} mg/dL</div>
                    </div>
                  </div>
                  <div className="text-xs text-[#888888] mt-2">
                    Normal: Fasting &lt;95, Random &lt;140 mg/dL
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 p-6 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-3">
            <i className="fas fa-info-circle mr-2"></i>
            Why Monitoring Matters
          </h3>
          <p className="text-blue-700 text-sm">
            Regular monitoring of vital signs helps detect potential complications early. 
            Blood pressure changes can indicate preeclampsia, while glucose monitoring helps 
            manage gestational diabetes. Always consult your healthcare provider about abnormal readings.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#2C3E50]">Health Tracking</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-[#888888]">Monitor Your Health</span>
          <div className="w-8 h-8 bg-[#7AC2D5] rounded-full flex items-center justify-center">
            <i className="fas fa-heartbeat text-white text-sm"></i>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: 'fas fa-chart-line' },
          { id: 'weight', label: 'Weight', icon: 'fas fa-weight' },
          { id: 'vitals', label: 'Vital Signs', icon: 'fas fa-heartbeat' }
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
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'weight' && renderWeightTracking()}
          {activeTab === 'vitals' && renderVitalSigns()}
        </>
      )}
    </div>
  );
};

export default HealthTracking;