import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicLayout = () => {
    const { user, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const publicNavigation = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Features', href: '/features' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2">
                            <img src="/images/PregVettLogoSVG.svg" alt="PregVett Logo" className="h-10 w-auto" />
                            <span className="text-xl font-bold text-[#2C3E50]">PregVett</span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center space-x-8">
                            {publicNavigation.map(item => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`text-sm font-medium transition-colors duration-200 ${
                                        location.pathname === item.href ? 'text-[#7AC2D5]' : 'text-[#2C3E50] hover:text-[#7AC2D5]'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* Auth Actions */}
                        <div className="hidden md:flex items-center space-x-4">
                            {user ? (
                                <>
                                    <Link to="/dashboard" className="text-sm font-medium text-[#2C3E50] hover:text-[#7AC2D5]">Dashboard</Link>
                                    <button onClick={logout} className="text-sm font-medium text-red-600 hover:text-red-800">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-sm font-medium text-[#2C3E50] hover:text-[#7AC2D5]">Login</Link>
                                    <Link to="/register" className="bg-[#7AC2D5] hover:bg-[#6ab0c3] text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                            >
                                <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-200">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {publicNavigation.map(item => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                                        location.pathname === item.href ? 'bg-[#7AC2D5] text-white' : 'text-[#2C3E50] hover:bg-gray-100'
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <div className="border-t border-gray-200 pt-4 mt-4">
                                {user ? (
                                    <>
                                        <Link
                                            to="/dashboard"
                                            className="block px-3 py-2 rounded-md text-base font-medium text-[#2C3E50] hover:bg-gray-100"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={() => { logout(); setMobileMenuOpen(false); }}
                                            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="block px-3 py-2 rounded-md text-base font-medium text-[#2C3E50] hover:bg-gray-100"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="block px-3 py-2 rounded-md text-base font-medium bg-[#7AC2D5] text-white hover:bg-[#6ab0c3]"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main>
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-[#2C3E50] text-white py-12 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <img src="/images/PregVettLogoSVG.svg" alt="PregVett Logo" className="h-12 w-auto" />
                                <span className="text-xl font-bold">PregVett</span>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Nigeria's leading maternal health platform providing comprehensive care for pregnant women.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-300">
                                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            </ul>
                        </div>
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

export default PublicLayout;
