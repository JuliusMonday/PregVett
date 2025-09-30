import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Emergency = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('emergency');
  const [facilities, setFacilities] = useState([]);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [guidelines, setGuidelines] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [alertSent, setAlertSent] = useState(false);

  useEffect(() => {
    fetchEmergencyContacts();
    fetchGuidelines();
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setUserLocation(location);
          fetchNearbyFacilities(location);
        },
        (error) => {
          console.error('Error getting location:', error);
          fetchNearbyFacilities(); // Fetch without location
        }
      );
    } else {
      fetchNearbyFacilities(); // Fetch without location
    }
  };

  const fetchNearbyFacilities = async (location = null) => {
    try {
      let url = 'http://localhost:5000/api/emergency/facilities';
      if (location) {
        url += `?latitude=${location.latitude}&longitude=${location.longitude}`;
      }
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setFacilities(data.facilities);
      }
    } catch (error) {
      console.error('Error fetching facilities:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmergencyContacts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/emergency/contacts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setEmergencyContacts(data.contacts);
      }
    } catch (error) {
      console.error('Error fetching emergency contacts:', error);
    }
  };

  const fetchGuidelines = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/emergency/guidelines', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setGuidelines(data.guidelines);
      }
    } catch (error) {
      console.error('Error fetching guidelines:', error);
    }
  };

  const handleEmergencyAlert = async () => {
    try {
      const alertData = {
        type: 'pregnancy_emergency',
        location: userLocation,
        message: 'Pregnancy emergency assistance needed',
        severity: 'high'
      };

      const response = await fetch('http://localhost:5000/api/emergency/alert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(alertData)
      });

      if (response.ok) {
        const data = await response.json();
        setAlertSent(true);
        setShowConfirmAlert(false);
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => setAlertSent(false), 5000);
      }
    } catch (error) {
      console.error('Error sending emergency alert:', error);
    }
  };

  const callEmergencyService = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  const renderEmergencyButton = () => (
    <div className="text-center py-12">
      <div className="mb-8">
        <div 
          className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 cursor-pointer hover:bg-red-600 transition-colors animate-pulse"
          onClick={() => setShowConfirmAlert(true)}
        >
          <i className="fas fa-exclamation-triangle text-white text-5xl"></i>
        </div>
        <h2 className="text-3xl font-bold text-red-600 mb-4">EMERGENCY ASSISTANCE</h2>
        <p className="text-lg text-[#888888] mb-8 max-w-md mx-auto">
          If you are experiencing a medical emergency, tap the emergency button or call emergency services immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
        <button
          onClick={() => callEmergencyService('112')}
          className="bg-red-500 hover:bg-red-600 text-white p-6 rounded-xl transition-colors"
        >
          <i className="fas fa-phone-alt text-3xl mb-3"></i>
          <div className="font-semibold">Emergency</div>
          <div className="text-sm opacity-90">112</div>
        </button>
        
        <button
          onClick={() => callEmergencyService('122')}
          className="bg-orange-500 hover:bg-orange-600 text-white p-6 rounded-xl transition-colors"
        >
          <i className="fas fa-ambulance text-3xl mb-3"></i>
          <div className="font-semibold">Ambulance</div>
          <div className="text-sm opacity-90">122</div>
        </button>
        
        <button
          onClick={() => setActiveTab('facilities')}
          className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-xl transition-colors"
        >
          <i className="fas fa-hospital text-3xl mb-3"></i>
          <div className="font-semibold">Nearby Hospital</div>
          <div className="text-sm opacity-90">Find Facility</div>
        </button>
      </div>
    </div>
  );

  const renderFacilities = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Nearby Emergency Facilities</h2>
        
        {userLocation && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
            <div className="flex items-center space-x-2">
              <i className="fas fa-map-marker-alt text-blue-600"></i>
              <span className="text-blue-800">Using your current location</span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {facilities.map((facility) => (
            <div key={facility.id} className="bg-[#F5F5F5] p-6 rounded-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#2C3E50] mb-2">{facility.name}</h3>
                  <p className="text-[#888888] mb-2">{facility.address}</p>
                  <div className="flex items-center space-x-4 text-sm text-[#888888]">
                    <span>
                      <i className="fas fa-phone mr-1"></i>
                      {facility.phone}
                    </span>
                    {facility.distance && (
                      <span>
                        <i className="fas fa-route mr-1"></i>
                        {facility.distance.toFixed(1)} km away
                      </span>
                    )}
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <span className="px-3 py-1 bg-[#7AC2D5] text-white rounded-full text-sm">
                    {facility.type}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-[#2C3E50] mb-2">Available Services:</h4>
                <div className="flex flex-wrap gap-2">
                  {facility.services.map((service, index) => (
                    <span key={index} className="px-3 py-1 bg-white text-[#888888] rounded-full text-sm border">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => callEmergencyService(facility.phone)}
                  className="btn-primary"
                >
                  <i className="fas fa-phone mr-2"></i>
                  Call Now
                </button>
                <button
                  onClick={() => {
                    if (facility.coordinates) {
                      window.open(`https://maps.google.com/?q=${facility.coordinates.latitude},${facility.coordinates.longitude}`, '_blank');
                    }
                  }}
                  className="btn-secondary"
                >
                  <i className="fas fa-map-marked-alt mr-2"></i>
                  Get Directions
                </button>
              </div>
            </div>
          ))}
        </div>

        {facilities.length === 0 && (
          <div className="text-center py-8">
            <i className="fas fa-hospital text-4xl text-[#888888] mb-4"></i>
            <p className="text-[#888888]">No emergency facilities found nearby</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderContacts = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Emergency Contacts</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="bg-[#F5F5F5] p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-[#7AC2D5] rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-user text-white text-2xl"></i>
              </div>
              <h3 className="font-semibold text-[#2C3E50] mb-1">{contact.name}</h3>
              <p className="text-sm text-[#888888] mb-3">{contact.relationship}</p>
              <div className="space-y-2">
                <button
                  onClick={() => callEmergencyService(contact.phone)}
                  className="w-full btn-primary"
                >
                  <i className="fas fa-phone mr-2"></i>
                  Call
                </button>
                <button className="w-full btn-secondary">
                  <i className="fas fa-comment mr-2"></i>
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 p-6 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-3">
            <i className="fas fa-info-circle mr-2"></i>
            Important Information
          </h3>
          <p className="text-blue-700 mb-3">
            Make sure your emergency contacts are aware of your pregnancy and know your due date. 
            Share your hospital information and birth plan with them.
          </p>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• Keep emergency contacts updated regularly</li>
            <li>• Ensure they have your healthcare provider's contact information</li>
            <li>• Share your location preferences for delivery</li>
            <li>• Discuss your birth preferences with them</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderGuidelines = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Emergency Guidelines</h2>
        
        <div className="space-y-6">
          {guidelines.map((guideline, index) => (
            <div key={index} className="bg-[#F5F5F5] p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#2C3E50] mb-4">{guideline.title}</h3>
              
              {guideline.conditions && (
                <div className="mb-4">
                  <h4 className="font-semibold text-[#2C3E50] mb-3">Warning Signs:</h4>
                  <ul className="space-y-2">
                    {guideline.conditions.map((condition, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <i className="fas fa-exclamation-circle text-red-500 mt-1"></i>
                        <span className="text-[#888888]">{condition}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {guideline.instructions && (
                <div className="mb-4">
                  <h4 className="font-semibold text-[#2C3E50] mb-3">What to Do:</h4>
                  <ol className="space-y-2 list-decimal list-inside">
                    {guideline.instructions.map((instruction, idx) => (
                      <li key={idx} className="text-[#888888]">{instruction}</li>
                    ))}
                  </ol>
                </div>
              )}
              
              {guideline.numbers && (
                <div>
                  <h4 className="font-semibold text-[#2C3E50] mb-3">Emergency Numbers:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {guideline.numbers.map((number, idx) => (
                      <button
                        key={idx}
                        onClick={() => callEmergencyService(number.number)}
                        className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg text-center transition-colors"
                      >
                        <div className="font-semibold">{number.service}</div>
                        <div className="text-lg">{number.number}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#2C3E50]">Emergency Support</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-[#888888]">24/7 Assistance</span>
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <i className="fas fa-exclamation-triangle text-white text-sm"></i>
          </div>
        </div>
      </div>

      {/* Alert Success Message */}
      {alertSent && (
        <div className="mb-6 bg-green-50 border border-green-200 p-4 rounded-lg">
          <div className="flex items-center">
            <i className="fas fa-check-circle text-green-600 mr-3"></i>
            <div>
              <h3 className="font-semibold text-green-800">Emergency Alert Sent</h3>
              <p className="text-green-700 text-sm">
                Your emergency contacts have been notified. Help is on the way.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'emergency', label: 'Emergency', icon: 'fas fa-exclamation-triangle' },
          { id: 'facilities', label: 'Facilities', icon: 'fas fa-hospital' },
          { id: 'contacts', label: 'Contacts', icon: 'fas fa-address-book' },
          { id: 'guidelines', label: 'Guidelines', icon: 'fas fa-book-medical' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-red-600 shadow-sm'
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
        </div>
      ) : (
        <>
          {activeTab === 'emergency' && renderEmergencyButton()}
          {activeTab === 'facilities' && renderFacilities()}
          {activeTab === 'contacts' && renderContacts()}
          {activeTab === 'guidelines' && renderGuidelines()}
        </>
      )}

      {/* Emergency Alert Confirmation Modal */}
      {showConfirmAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-exclamation-triangle text-white text-3xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-red-600 mb-2">Confirm Emergency Alert</h2>
                <p className="text-[#888888]">
                  This will send emergency alerts to your contacts and nearby healthcare facilities. 
                  Are you sure you want to proceed?
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleEmergencyAlert}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Yes, Send Emergency Alert
                </button>
                <button
                  onClick={() => setShowConfirmAlert(false)}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Emergency;