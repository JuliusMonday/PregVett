import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Layout from './components/Layout.jsx';
import PublicLayout from './components/PublicLayout.jsx';

import LandingPage from './pages/LandingPage.jsx';
import About from './pages/About.jsx';
import Features from './pages/Features.jsx';
import Contact from './pages/Contact.jsx';
import Privacy from './pages/Privacy.jsx';

import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Onboarding from './pages/Onboarding.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NutritionCoach from './pages/NutritionCoach.jsx';
import BirthDefectPrevention from './pages/BirthDefectPrevention.jsx';
import SymptomChecker from './pages/SymptomChecker.jsx';
import Appointments from './pages/Appointments.jsx';
import Emergency from './pages/Emergency.jsx';
import Community from './pages/Community.jsx';
import Education from './pages/Education.jsx';
import HealthTracking from './pages/HealthTracking.jsx';
import DoctorDashboard from './pages/DoctorDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="about" element={<About />} />
                <Route path="features" element={<Features />} />
                <Route path="contact" element={<Contact />} />
                <Route path="privacy" element={<Privacy />} />
            </Route>

            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    <Route path="/onboarding" element={<Onboarding />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/nutrition" element={<NutritionCoach />} />
                    <Route path="/birth-defect-prevention" element={<BirthDefectPrevention />} />
                    <Route path="/symptom-checker" element={<SymptomChecker />} />
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="/emergency" element={<Emergency />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/education" element={<Education />} />
                    <Route path="/health-tracking" element={<HealthTracking />} />
                    <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
