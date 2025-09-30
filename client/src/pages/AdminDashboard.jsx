import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchContent();
  }, []);

  const fetchStats = async () => {
    // Mock data - would be replaced with actual API call
    setStats({
      totalUsers: 15420,
      activeUsers: 12450,
      totalPregnancies: 8750,
      highRiskPregnancies: 1250,
      totalAppointments: 45600,
      completedAppointments: 38900,
      emergencyAlerts: 450,
      resolvedEmergencies: 420
    });
  };

  const fetchUsers = async () => {
    // Mock data - would be replaced with actual API call
    setUsers([
      {
        id: 1,
        name: 'Aisha Bello',
        email: 'aisha@example.com',
        role: 'user',
        status: 'active',
        joinDate: '2024-01-10',
        lastLogin: '2024-01-15'
      },
      {
        id: 2,
        name: 'Dr. Ahmed Ibrahim',
        email: 'ahmed@hospital.com',
        role: 'doctor',
        status: 'active',
        joinDate: '2024-01-05',
        lastLogin: '2024-01-15'
      },
      {
        id: 3,
        name: 'Admin User',
        email: 'admin@pregvett.com',
        role: 'admin',
        status: 'active',
        joinDate: '2024-01-01',
        lastLogin: '2024-01-15'
      }
    ]);
  };

  const fetchContent = async () => {
    // Mock data - would be replaced with actual API call
    setContent([
      {
        id: 1,
        title: 'Understanding Your First Trimester',
        type: 'article',
        status: 'published',
        views: 15420,
        author: 'Medical Team'
      },
      {
        id: 2,
        title: 'Prenatal Yoga Exercises',
        type: 'video',
        status: 'published',
        views: 23150,
        author: 'Dr. Sarah Johnson'
      },
      {
        id: 3,
        title: 'Nigerian Foods for Pregnancy',
        type: 'article',
        status: 'draft',
        views: 0,
        author: 'Nutrition Team'
      }
    ]);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[#888888] mb-1">Total Users</div>
              <div className="text-2xl font-bold text-[#7AC2D5]">{stats?.totalUsers.toLocaleString()}</div>
              <div className="text-sm text-[#888888]">
                {stats?.activeUsers.toLocaleString()} active
              </div>
            </div>
            <div className="w-12 h-12 bg-[#7AC2D5] rounded-full flex items-center justify-center">
              <i className="fas fa-users text-white"></i>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[#888888] mb-1">Pregnancies</div>
              <div className="text-2xl font-bold text-[#BEE7C4]">{stats?.totalPregnancies.toLocaleString()}</div>
              <div className="text-sm text-red-600">
                {stats?.highRiskPregnancies.toLocaleString()} high risk
              </div>
            </div>
            <div className="w-12 h-12 bg-[#BEE7C4] rounded-full flex items-center justify-center">
              <i className="fas fa-baby text-white"></i>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[#888888] mb-1">Appointments</div>
              <div className="text-2xl font-bold text-[#F4A497]">{stats?.totalAppointments.toLocaleString()}</div>
              <div className="text-sm text-green-600">
                {stats?.completedAppointments.toLocaleString()} completed
              </div>
            </div>
            <div className="w-12 h-12 bg-[#F4A497] rounded-full flex items-center justify-center">
              <i className="fas fa-calendar-check text-white"></i>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[#888888] mb-1">Emergency Alerts</div>
              <div className="text-2xl font-bold text-red-500">{stats?.emergencyAlerts}</div>
              <div className="text-sm text-green-600">
                {stats?.resolvedEmergencies} resolved
              </div>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <i className="fas fa-exclamation-triangle text-white"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">Recent User Registrations</h3>
          <div className="space-y-3">
            {users.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-[#F5F5F5] rounded">
                <div>
                  <div className="font-medium text-[#2C3E50]">{user.name}</div>
                  <div className="text-sm text-[#888888]">{user.email}</div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {user.status}
                  </span>
                  <div className="text-xs text-[#888888] mt-1">{user.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">Content Performance</h3>
          <div className="space-y-3">
            {content.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-[#F5F5F5] rounded">
                <div>
                  <div className="font-medium text-[#2C3E50]">{item.title}</div>
                  <div className="text-sm text-[#888888]">by {item.author}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-[#2C3E50]">{item.views.toLocaleString()} views</div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#2C3E50]">User Management</h2>
          <button className="btn-primary">
            <i className="fas fa-user-plus mr-2"></i>
            Add User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-[#2C3E50]">User</th>
                <th className="text-left py-3 px-4 font-semibold text-[#2C3E50]">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-[#2C3E50]">Role</th>
                <th className="text-left py-3 px-4 font-semibold text-[#2C3E50]">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-[#2C3E50]">Join Date</th>
                <th className="text-left py-3 px-4 font-semibold text-[#2C3E50]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-[#2C3E50]">{user.name}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-[#888888]">{user.email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-[#888888]">{user.joinDate}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-[#7AC2D5] hover:text-[#6ab0c3]">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="text-[#F4A497] hover:text-[#e29487]">
                        <i className="fas fa-trash"></i>
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

  const renderContentManagement = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#2C3E50]">Content Management</h2>
          <button className="btn-primary">
            <i className="fas fa-plus mr-2"></i>
            Create Content
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item) => (
            <div key={item.id} className="bg-[#F5F5F5] p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                  {item.type}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  item.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {item.status}
                </span>
              </div>
              
              <h3 className="font-semibold text-[#2C3E50] mb-2">{item.title}</h3>
              <p className="text-sm text-[#888888] mb-4">by {item.author}</p>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-[#888888]">
                  <i className="fas fa-eye mr-1"></i>
                  {item.views.toLocaleString()} views
                </span>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 btn-secondary text-sm">
                  <i className="fas fa-edit mr-1"></i>
                  Edit
                </button>
                <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-300">
                  <i className="fas fa-chart-line mr-1"></i>
                  Stats
                </button>
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
        <h1 className="text-3xl font-bold text-[#2C3E50]">Admin Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-[#888888]">Administrator</span>
          <div className="w-8 h-8 bg-[#2C3E50] rounded-full flex items-center justify-center">
            <i className="fas fa-cog text-white text-sm"></i>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: 'fas fa-chart-pie' },
          { id: 'users', label: 'Users', icon: 'fas fa-users' },
          { id: 'content', label: 'Content', icon: 'fas fa-file-alt' },
          { id: 'settings', label: 'Settings', icon: 'fas fa-cog' }
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
          {activeTab === 'users' && renderUserManagement()}
          {activeTab === 'content' && renderContentManagement()}
          {activeTab === 'settings' && (
            <div className="card">
              <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">System Settings</h2>
              <p className="text-[#888888]">System settings configuration coming soon...</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;