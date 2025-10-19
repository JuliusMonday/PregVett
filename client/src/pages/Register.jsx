import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        role: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  if (formData.password !== formData.confirmPassword) {
    setError('Passwords do not match');
    return;
  }
  setLoading(true);
  const { confirmPassword, ...registrationData } = formData;
  const result = await register(registrationData);
  setLoading(false);
  if (result.success) {
    // Redirect based on role
    switch (formData.role) {
      case 'user':
        navigate('/onboarding');
        break;
      case 'doctor':
        navigate('/onboarding-doctor');
        break;
      case 'midwife':
        navigate('/onboarding-doctor'); // Create this later
        break;
      case 'admin':
        // Admins skip onboarding - ensure backend sets onboardingCompleted: true
        navigate('/dashboard');
        break;
      default:
        navigate('/dashboard');
    }
  } else {
    setError(result.message);
  }
};

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#7AC2D5] to-[#BEE7C4] p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-center mb-4 text-[#7AC2D5]">Join PregVett</h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field w-full"
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field w-full"
                    />
                    <input
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input-field w-full"
                    />
                    <select name="role" value={formData.role} onChange={handleChange} className="input-field w-full">
                        <option value="user">Pregnant Mother</option>
                        <option value="doctor">Healthcare Provider (Doctor)</option>
                        <option value="midwife">Midwife</option>
                        <option value="admin">Administrator</option>
                    </select>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input-field w-full"
                    />
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="input-field w-full"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full flex items-center justify-center"
                    >
                        {loading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-500">
                    Already have an account?{' '}
                    <Link to="/login" className="text-[#7AC2D5] font-medium">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
