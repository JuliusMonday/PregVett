import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Appointments = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('calendar');
  const [appointments, setAppointments] = useState([]);
  const [appointmentStats, setAppointmentStats] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    type: 'anc',
    title: '',
    description: '',
    scheduledDate: '',
    scheduledTime: '10:00',
    duration: 30,
    location: {
      name: '',
      address: '',
      phone: ''
    },
    doctorId: '',
    notes: {
      preAppointment: ''
    }
  });

  const appointmentTypes = [
    { value: 'anc', label: 'ANC Check-up', color: 'bg-[#7AC2D5]' },
    { value: 'ultrasound', label: 'Ultrasound Scan', color: 'bg-[#BEE7C4]' },
    { value: 'blood-test', label: 'Blood Test', color: 'bg-[#F4A497]' },
    { value: 'consultation', label: 'Consultation', color: 'bg-[#7AC2D5]' },
    { value: 'emergency', label: 'Emergency', color: 'bg-red-500' },
    { value: 'delivery', label: 'Delivery', color: 'bg-[#BEE7C4]' },
    { value: 'postnatal', label: 'Postnatal', color: 'bg-[#F4A497]' }
  ];

  useEffect(() => {
    fetchAppointments();
    fetchAppointmentStats();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointmentStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/appointments/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAppointmentStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching appointment stats:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLocationChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const appointmentData = {
        ...formData,
        scheduledDate: `${formData.scheduledDate}T${formData.scheduledTime}:00`
      };

      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(appointmentData)
      });

      if (response.ok) {
        setShowForm(false);
        setFormData({
          type: 'anc',
          title: '',
          description: '',
          scheduledDate: '',
          scheduledTime: '10:00',
          duration: 30,
          location: {
            name: '',
            address: '',
            phone: ''
          },
          doctorId: '',
          notes: {
            preAppointment: ''
          }
        });
        fetchAppointments();
        fetchAppointmentStats();
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${appointmentId}/cancel`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        fetchAppointments();
        fetchAppointmentStats();
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  const handleCompleteAppointment = async (appointmentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${appointmentId}/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          notes: {
            postAppointment: 'Appointment completed successfully'
          }
        })
      });

      if (response.ok) {
        fetchAppointments();
        fetchAppointmentStats();
      }
    } catch (error) {
      console.error('Error completing appointment:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      case 'missed': return 'text-red-600 bg-red-100';
      case 'cancelled': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type) => {
    const typeObj = appointmentTypes.find(t => t.value === type);
    return typeObj ? typeObj.color : 'bg-gray-500';
  };

  const getAppointmentsByDate = () => {
    const grouped = {};
    appointments.forEach(appointment => {
      const date = new Date(appointment.scheduledDate).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(appointment);
    });
    return grouped;
  };

  const getUpcomingAppointments = () => {
    return appointments
      .filter(apt => apt.status === 'scheduled' || apt.status === 'confirmed')
      .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))
      .slice(0, 5);
  };

  const renderCalendar = () => (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#2C3E50]">Appointment Calendar</h2>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            <i className="fas fa-plus mr-2"></i>
            New Appointment
          </button>
        </div>

        {/* Next Appointment Card */}
        {appointmentStats?.nextAppointment && (
          <div className="bg-gradient-to-r from-[#7AC2D5] to-[#BEE7C4] p-6 rounded-xl text-white mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Next Appointment</h3>
                <p className="text-xl font-bold mb-1">{appointmentStats.nextAppointment.title}</p>
                <p className="text-sm opacity-90">
                  {new Date(appointmentStats.nextAppointment.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} at {new Date(appointmentStats.nextAppointment.date).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                <p className="text-sm opacity-90 mt-1">
                  <i className="fas fa-map-marker-alt mr-1"></i>
                  {appointmentStats.nextAppointment.location?.name}
                </p>
              </div>
              <div className="text-right">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-2">
                  <i className="fas fa-calendar-check text-white text-2xl"></i>
                </div>
                <span className="text-sm">In {Math.ceil((new Date(appointmentStats.nextAppointment.date) - new Date()) / (1000 * 60 * 60 * 24))} days</span>
              </div>
            </div>
          </div>
        )}

        {/* Appointments by Date */}
        <div className="space-y-4">
          {Object.entries(getAppointmentsByDate()).map(([date, dayAppointments]) => (
            <div key={date} className="bg-[#F5F5F5] p-4 rounded-lg">
              <h3 className="font-semibold text-[#2C3E50] mb-3">
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </h3>
              <div className="space-y-3">
                {dayAppointments.map((appointment) => (
                  <div key={appointment._id} className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`w-3 h-3 rounded-full ${getTypeColor(appointment.type)}`}></div>
                          <h4 className="font-semibold text-[#2C3E50]">{appointment.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        <p className="text-sm text-[#888888] mb-2">{appointment.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-[#888888]">
                          <span>
                            <i className="fas fa-clock mr-1"></i>
                            {new Date(appointment.scheduledDate).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                          <span>
                            <i className="fas fa-hourglass-half mr-1"></i>
                            {appointment.duration} minutes
                          </span>
                          {appointment.location?.name && (
                            <span>
                              <i className="fas fa-map-marker-alt mr-1"></i>
                              {appointment.location.name}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="ml-4 flex space-x-2">
                        <button
                          onClick={() => setSelectedAppointment(appointment)}
                          className="text-[#7AC2D5] hover:text-[#6ab0c3]"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        {(appointment.status === 'scheduled' || appointment.status === 'confirmed') && (
                          <>
                            <button
                              onClick={() => handleCompleteAppointment(appointment._id)}
                              className="text-[#BEE7C4] hover:text-[#aed6b4]"
                            >
                              <i className="fas fa-check"></i>
                            </button>
                            <button
                              onClick={() => handleCancelAppointment(appointment._id)}
                              className="text-[#F4A497] hover:text-[#e29487]"
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {appointments.length === 0 && (
          <div className="text-center py-8">
            <i className="fas fa-calendar-times text-4xl text-[#888888] mb-4"></i>
            <p className="text-[#888888]">No appointments scheduled</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderList = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#2C3E50]">All Appointments</h2>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            <i className="fas fa-plus mr-2"></i>
            New Appointment
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-[#2C3E50]">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-[#2C3E50]">Title</th>
                <th className="text-left py-3 px-4 font-semibold text-[#2C3E50]">Date & Time</th>
                <th className="text-left py-3 px-4 font-semibold text-[#2C3E50]">Location</th>
                <th className="text-left py-3 px-4 font-semibold text-[#2C3E50]">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-[#2C3E50]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getTypeColor(appointment.type)}`}></div>
                      <span className="text-sm capitalize">
                        {appointment.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-[#2C3E50]">{appointment.title}</div>
                    {appointment.description && (
                      <div className="text-sm text-[#888888]">{appointment.description}</div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">
                      {new Date(appointment.scheduledDate).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-[#888888]">
                      {new Date(appointment.scheduledDate).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-[#2C3E50]">
                      {appointment.location?.name || 'N/A'}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedAppointment(appointment)}
                        className="text-[#7AC2D5] hover:text-[#6ab0c3]"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      {(appointment.status === 'scheduled' || appointment.status === 'confirmed') && (
                        <>
                          <button
                            onClick={() => handleCompleteAppointment(appointment._id)}
                            className="text-[#BEE7C4] hover:text-[#aed6b4]"
                          >
                            <i className="fas fa-check"></i>
                          </button>
                          <button
                            onClick={() => handleCancelAppointment(appointment._id)}
                            className="text-[#F4A497] hover:text-[#e29487]"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {appointments.length === 0 && (
          <div className="text-center py-8">
            <i className="fas fa-calendar-times text-4xl text-[#888888] mb-4"></i>
            <p className="text-[#888888]">No appointments found</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderReminders = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Appointment Reminders</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <div>
            <h3 className="font-semibold text-[#2C3E50] mb-4">Upcoming Appointments</h3>
            <div className="space-y-3">
              {getUpcomingAppointments().map((appointment) => (
                <div key={appointment._id} className="bg-[#F5F5F5] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-[#2C3E50]">{appointment.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                  <p className="text-sm text-[#888888] mb-2">
                    {new Date(appointment.scheduledDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric'
                    })} at {new Date(appointment.scheduledDate).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#888888]">
                      {appointment.location?.name}
                    </span>
                    <button className="text-xs text-[#7AC2D5] hover:text-[#6ab0c3]">
                      Set Reminder
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reminder Settings */}
          <div>
            <h3 className="font-semibold text-[#2C3E50] mb-4">Reminder Settings</h3>
            <div className="space-y-4">
              <div className="bg-[#F5F5F5] p-4 rounded-lg">
                <h4 className="font-medium text-[#2C3E50] mb-3">Notification Preferences</h4>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" defaultChecked />
                    <span className="text-sm">Push notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" defaultChecked />
                    <span className="text-sm">SMS reminders</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-sm">Email reminders</span>
                  </label>
                </div>
              </div>

              <div className="bg-[#F5F5F5] p-4 rounded-lg">
                <h4 className="font-medium text-[#2C3E50] mb-3">Reminder Timing</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" defaultChecked />
                    <span className="text-sm">1 day before</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" defaultChecked />
                    <span className="text-sm">1 hour before</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-sm">15 minutes before</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#2C3E50]">Appointments</h1>
        <div className="flex items-center space-x-2">
          {appointmentStats?.nextAppointment && (
            <span className="text-sm text-[#888888]">
              Next: {new Date(appointmentStats.nextAppointment.date).toLocaleDateString()}
            </span>
          )}
          <div className="w-8 h-8 bg-[#7AC2D5] rounded-full flex items-center justify-center">
            <i className="fas fa-calendar-alt text-white text-sm"></i>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'calendar', label: 'Calendar', icon: 'fas fa-calendar' },
          { id: 'list', label: 'List View', icon: 'fas fa-list' },
          { id: 'reminders', label: 'Reminders', icon: 'fas fa-bell' }
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
          {activeTab === 'calendar' && renderCalendar()}
          {activeTab === 'list' && renderList()}
          {activeTab === 'reminders' && renderReminders()}
        </>
      )}

      {/* New Appointment Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#2C3E50]">New Appointment</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                      Appointment Type *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="input-field"
                      required
                    >
                      {appointmentTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                      className="input-field"
                      min="15"
                      max="180"
                      step="15"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field"
                    placeholder="Appointment title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="input-field"
                    rows={3}
                    placeholder="Additional details about the appointment"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={formData.scheduledDate}
                      onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
                      className="input-field"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                      Time *
                    </label>
                    <input
                      type="time"
                      value={formData.scheduledTime}
                      onChange={(e) => handleInputChange('scheduledTime', e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-[#2C3E50]">Location</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                        Facility Name *
                      </label>
                      <input
                        type="text"
                        value={formData.location.name}
                        onChange={(e) => handleLocationChange('name', e.target.value)}
                        className="input-field"
                        placeholder="Hospital or clinic name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.location.phone}
                        onChange={(e) => handleLocationChange('phone', e.target.value)}
                        className="input-field"
                        placeholder="Contact number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                      Address
                    </label>
                    <textarea
                      value={formData.location.address}
                      onChange={(e) => handleLocationChange('address', e.target.value)}
                      className="input-field"
                      rows={2}
                      placeholder="Full address"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                    Notes for Appointment
                  </label>
                  <textarea
                    value={formData.notes.preAppointment}
                    onChange={(e) => handleInputChange('notes', { ...formData.notes, preAppointment: e.target.value })}
                    className="input-field"
                    rows={3}
                    placeholder="Any questions or concerns to discuss"
                  />
                </div>

                <div className="flex space-x-3">
                  <button type="submit" className="flex-1 btn-primary">
                    <i className="fas fa-save mr-2"></i>
                    Schedule Appointment
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
          </div>
        </div>
      )}

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#2C3E50]">{selectedAppointment.title}</h2>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-[#2C3E50] mb-2">Type</h3>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getTypeColor(selectedAppointment.type)}`}></div>
                      <span className="capitalize">
                        {selectedAppointment.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2C3E50] mb-2">Status</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedAppointment.status)}`}>
                      {selectedAppointment.status}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-[#2C3E50] mb-2">Date & Time</h3>
                  <p className="text-[#888888]">
                    {new Date(selectedAppointment.scheduledDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} at {new Date(selectedAppointment.scheduledDate).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  <p className="text-sm text-[#888888] mt-1">
                    Duration: {selectedAppointment.duration} minutes
                  </p>
                </div>

                {selectedAppointment.description && (
                  <div>
                    <h3 className="font-semibold text-[#2C3E50] mb-2">Description</h3>
                    <p className="text-[#888888]">{selectedAppointment.description}</p>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-[#2C3E50] mb-2">Location</h3>
                  <div className="bg-[#F5F5F5] p-3 rounded-lg">
                    <p className="font-medium text-[#2C3E50]">{selectedAppointment.location?.name}</p>
                    {selectedAppointment.location?.address && (
                      <p className="text-sm text-[#888888]">{selectedAppointment.location.address}</p>
                    )}
                    {selectedAppointment.location?.phone && (
                      <p className="text-sm text-[#888888]">
                        <i className="fas fa-phone mr-1"></i>
                        {selectedAppointment.location.phone}
                      </p>
                    )}
                  </div>
                </div>

                {selectedAppointment.notes?.preAppointment && (
                  <div>
                    <h3 className="font-semibold text-[#2C3E50] mb-2">Notes</h3>
                    <p className="text-[#888888]">{selectedAppointment.notes.preAppointment}</p>
                  </div>
                )}

                <div className="flex space-x-3">
                  {(selectedAppointment.status === 'scheduled' || selectedAppointment.status === 'confirmed') && (
                    <>
                      <button
                        onClick={() => {
                          handleCompleteAppointment(selectedAppointment._id);
                          setSelectedAppointment(null);
                        }}
                        className="flex-1 btn-primary"
                      >
                        Mark as Completed
                      </button>
                      <button
                        onClick={() => {
                          handleCancelAppointment(selectedAppointment._id);
                          setSelectedAppointment(null);
                        }}
                        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setSelectedAppointment(null)}
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

export default Appointments;