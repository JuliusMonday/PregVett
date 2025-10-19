import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const redirectUrl = new URLSearchParams(location.search).get('redirect') || '/dashboard';

    // Handle post-login redirect based on role AND onboarding status
    useEffect(() => {
        if (user) {
            if (!user.onboardingCompleted) {
                // Redirect to role-specific onboarding
                switch (user.role) {
                    case 'doctor':
                        navigate('/onboarding-doctor');
                        break;
                    case 'midwife':
                        navigate('/onboarding-midwife'); // or '/onboarding-doctor' if shared
                        break;
                    case 'admin':
                        // Admins skip onboarding — mark as complete or go to dashboard
                        navigate('/dashboard');
                        break;
                    case 'user':
                    default:
                        navigate('/onboarding');
                }
            } else {
                navigate(redirectUrl);
            }
        }
    }, [user, navigate, redirectUrl]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await login(formData.email, formData.password);

        if (!result.success) {
            setError(result.message);
        }
        // If successful, useEffect will handle redirect

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#7AC2D5] to-[#BEE7C4] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                            <i className="fas fa-baby text-[#7AC2D5] text-3xl"></i>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome Back to PregVett</h2>
                    <p className="text-white opacity-90">Sign in to continue your maternal health journey</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center">
                                <i className="fas fa-exclamation-circle text-red-500 mr-2"></i>
                                <span className="text-red-700">{error}</span>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#2C3E50] mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#2C3E50] mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full flex items-center justify-center"
                        >
                            {loading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-[#888888]">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-[#7AC2D5] hover:text-[#6ab0c3] font-medium">
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;