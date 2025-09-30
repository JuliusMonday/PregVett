import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('patients');
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
    fetchAppointments();
    fetchStats();
  }, []);

  const fetchPatients = async () => {
    // Mock data - would be replaced with actual API call
    setPatients([
      {
        id: 1,
        name: 'Aisha Bello',
        week: 24,
        riskLevel: 'low',
        lastVisit: '2024-01-10',
        nextAppointment: '2024-01-24',
        contact: '+2348012345678'
      },
      {
        id: 2,
        name: 'Ngozi Okafor',
        week: 16,
        riskLevel: 'medium',
        lastVisit: '2024-01-08',
        nextAppointment: '2024-01-22',
        contact: '+2348098765432'
      },
      {
        id: 3,
        name: 'Fatima Ibrahim',
        week: 32,
        riskLevel: 'high',
        lastVisit: '2024-01-12',
        nextAppointment: '2024-01-19',
        contact: '+2348011223344'
      }
    ]);
  };

  const fetchAppointments = async () => {
    // Mock data - would be replaced with actual API call
    setAppointments([
      {
        id: 1,
        patientName: 'Aisha Bello',
        type: 'anc',
        date: '2024-01-19',
        time: '10:00',
        status: 'scheduled'
      },
      {
        id: 2,
        patientName: 'Fatima Ibrahim',
        type: 'consultation',
        date: '2024-01-19',
        time: '14:00',
        status: 'confirmed'
      },
      {
        id: 3,
        patientName: 'Ngozi Okafor',
        type: 'ultrasound',
        date: '2024-01-20',
        time: '11:00',
        status: 'scheduled'
      }
    ]);
  };

  const fetchStats = async () => {
    // Mock data - would be replaced with actual API call
    setStats({
      totalPatients: 45,
      highRiskPatients: 8,
      appointmentsToday: 5,
      pendingResults: 3
    });
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderPatients = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#2C3E50]">My Patients</h2>
          <button className="btn-primary">
            <i className="fas fa-user-plus mr-2"></i>
            Add Patient
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-[#2C3E50]">Patient</th>
                <th className="text-left py-3 px-4 font-semibold text-[#2C3E50]">Week</th>
                <th className="text-left py-3 px-4 font-semibold text-[#2C3E50]">Risk Level</th>
                <th className="text-left py-3 px-4 font-semibold text-[#2C3E50]">Last Visit</th>
                <th className="text-left py-3 px-4 font-semibold text-[#2C3E50]">Next Appointment</th>
                <th className="text-left py-3 px-4 font-semibold text-[#2C3E50]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-[#2C3E50]">{patient.name}</div>
                    <div className="text-sm text-[#888888]">{patient.contact}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium">Week {patient.week}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(patient.riskLevel)}`}>
                      {patient.riskLevel}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">{patient.lastVisit}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm font-medium">{patient.nextAppointment}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-[#7AC2D5] hover:text-[#6ab0c3]">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="text-[#BEE7C4] hover:text-[#aed6b4]">
                        <i className="fas fa-comment-medical"></i>
                      </button>
                      <button className="text-[#F4A497] hover:text-[#e29487]">
                        <i className="fas fa-file-medical"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#2C3E50]">Today's Appointments</h2>
          <button className="btn-primary">
            <i className="fas fa-calendar-plus mr-2"></i>
            Schedule
          </button>
        </div>

        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="bg-[#F5F5F5] p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#7AC2D5] rounded-full flex items-center justify-center">
                    <i className="fas fa-user text-white"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2C3E50]">{appointment.patientName}</h3>
                    <p className="text-sm text-[#888888]">
                      {appointment.type.toUpperCase()} • {appointment.date} at {appointment.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    appointment.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                    appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {appointment.status}
                  </span>
                  <button className="btn-primary text-sm">
                    Start Consultation
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#2C3E50]">Doctor Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-[#888888]">Dr. {user?.name}</span>
          <div className="w-8 h-8 bg-[#7AC2D5] rounded-full flex items-center justify-center">
            <i className="fas fa-user-md text-white text-sm"></i>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-[#888888] mb-1">Total Patients</div>
                <div className="text-2xl font-bold text-[#7AC2D5]">{stats.totalPatients}</div>
              </div>
              <div className="w-12 h-12 bg-[#7AC2D5] rounded-full flex items-center justify-center">
                <i className="fas fa-users text-white"></i>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-[#888888] mb-1">High Risk</div>
                <div className="text-2xl font-bold text-[#F4A497]">{stats.highRiskPatients}</div>
              </div>
              <div className="w-12 h-12 bg-[#F4A497] rounded-full flex items-center justify-center">
                <i className="fas fa-exclamation-triangle text-white"></i>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-[#888888] mb-1">Today's Appointments</div>
                <div className="text-2xl font-bold text-[#BEE7C4]">{stats.appointmentsToday}</div>
              </div>
              <div className="w-12 h-12 bg-[#BEE7C4] rounded-full flex items-center justify-center">
                <i className="fas fa-calendar-check text-white"></i>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-[#888888] mb-1">Pending Results</div>
                <div className="text-2xl font-bold text-[#F4A497]">{stats.pendingResults}</div>
              </div>
              <div className="w-12 h-12 bg-[#F4A497] rounded-full flex items-center justify-center">
                <i className="fas fa-flask text-white"></i>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'patients', label: 'Patients', icon: 'fas fa-users' },
          { id: 'appointments', label: 'Appointments', icon: 'fas fa-calendar' },
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
          {activeTab === 'patients' && renderPatients()}
          {activeTab === 'appointments' && renderAppointments()}
          {activeTab === 'analytics' && (
            <div className="card">
              <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Analytics Dashboard</h2>
              <p className="text-[#888888]">Analytics features coming soon...</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DoctorDashboard;