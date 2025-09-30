import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: 'fas fa-home' },
    { name: 'Nutrition Coach', href: '/nutrition', icon: 'fas fa-apple-alt' },
    { name: 'Birth Defect Prevention', href: '/birth-defect-prevention', icon: 'fas fa-shield-alt' },
    { name: 'Symptom Checker', href: '/symptom-checker', icon: 'fas fa-stethoscope' },
    { name: 'Appointments', href: '/appointments', icon: 'fas fa-calendar-alt' },
    { name: 'Community', href: '/community', icon: 'fas fa-users' },
    { name: 'Education', href: '/education', icon: 'fas fa-graduation-cap' },
    { name: 'Health Tracking', href: '/health-tracking', icon: 'fas fa-heartbeat' },
  ];

  if (user?.role === 'doctor') {
    navigation.push({ name: 'Doctor Dashboard', href: '/doctor-dashboard', icon: 'fas fa-user-md' });
  }

  if (user?.role === 'admin') {
    navigation.push({ name: 'Admin Dashboard', href: '/admin-dashboard', icon: 'fas fa-cog' });
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#7AC2D5] rounded-full flex items-center justify-center">
                <i className="fas fa-baby text-white"></i>
              </div>
              <span className="text-xl font-bold text-[#2C3E50]">PregVett</span>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  location.pathname === item.href
                    ? 'bg-[#7AC2D5] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className={item.icon}></i>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#BEE7C4] rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-[#2C3E50]"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2C3E50]">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.role}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800"
              >
                <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
                <span>{darkMode ? 'Light' : 'Dark'}</span>
              </button>
              
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-800"
              >
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-800"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <i className="fas fa-bell"></i>
                <span>Notifications</span>
              </div>
              
              <Link
                to="/emergency"
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
              >
                <i className="fas fa-exclamation-triangle"></i>
                <span>Emergency</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex justify-around py-2">
          {navigation.slice(0, 4).map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center p-2 ${
                location.pathname === item.href ? 'text-[#7AC2D5]' : 'text-gray-600'
              }`}
            >
              <i className={`${item.icon} text-lg`}></i>
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Layout;