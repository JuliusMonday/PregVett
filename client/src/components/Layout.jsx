import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const Layout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Header */}
            <header className="flex items-center justify-between bg-white shadow px-6 py-4">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <img src="/images/PregVettLogoSVG.svg" alt="PregVett Logo" className="h-10 w-10" />
                    <span className="text-xl font-bold text-[#2C3E50]">PregVett</span>
                </div>

                {/* Navigation */}
                <nav className="flex items-center space-x-6">
                    <Link to="/" className="text-gray-600 hover:text-[#7AC2D5] transition-colors">Home</Link>
                    <Link to="/about" className="text-gray-600 hover:text-[#7AC2D5] transition-colors">About</Link>
                    <Link to="/dashboard" className="text-gray-600 hover:text-[#7AC2D5] transition-colors">Dashboard</Link>
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="text-red-600 hover:text-red-800 transition-colors"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-gray-600 hover:text-[#7AC2D5] transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-[#7AC2D5] hover:bg-[#6ab0c3] text-white py-2 px-4 rounded-lg transition-colors duration-200"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-[#2C3E50] text-white py-12 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Brand */}
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <img src="/images/PregVettLogoSVG.svg" alt="PregVett Logo" className="h-12 w-auto" />
                                <span className="text-xl font-bold">PregVett</span>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Nigeria's leading maternal health platform providing comprehensive care for pregnant women.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-300">
                                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            </ul>
                        </div>

                        {/* Socials */}
                        <div>
                            <h4 className="font-bold mb-4">Connect With Us</h4>
                            <div className="flex space-x-4 mb-4">
                                <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-facebook text-xl"></i></a>
                                <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-twitter text-xl"></i></a>
                                <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-instagram text-xl"></i></a>
                                <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-whatsapp text-xl"></i></a>
                            </div>
                            <p className="text-gray-300 text-sm">Download our mobile app</p>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                        <p className="text-sm">&copy; {new Date().getFullYear()} PregVett. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
