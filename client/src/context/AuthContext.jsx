// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }, [user]);

    // 🧩 Register function
    const register = async (registrationData) => {
        try {
            const response = await fetch('http://localhost:5001/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registrationData),
            });

            const data = await response.json();

            if (response.ok) {
                const newUser = {
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    phone: data.user.phone,
                    role: data.user.role,
                    onboardingCompleted: data.user.onboardingCompleted,
                    token: data.token,
                };
                setUser(newUser);
                localStorage.setItem('token', data.token);
                return { success: true };
            } else {
                return { success: false, message: data.message || 'Registration failed' };
            }
        } catch (error) {
            return { success: false, message: 'Network error' };
        }
    };

    // 🧩 Login function
    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                const loggedInUser = {
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    phone: data.user.phone,
                    role: data.user.role,
                    onboardingCompleted: data.user.onboardingCompleted,
                    token: data.token,
                };
                setUser(loggedInUser);
                localStorage.setItem('token', data.token);
                return { success: true };
            } else {
                return { success: false, message: data.message || 'Login failed' };
            }
        } catch (error) {
            return { success: false, message: 'Network error' };
        }
    };

    // ✅ FIX 1: Make sure updateUser is accessible everywhere
    const updateUser = (updatedData) => {
        setUser((prev) => {
            const newUser = { ...prev, ...updatedData };
            localStorage.setItem('user', JSON.stringify(newUser));
            return newUser;
        });
    };

    // ✅ FIX 2: Add completeOnboarding function (used in Onboarding.jsx)
    const completeOnboarding = () => {
        setUser((prev) => {
            const updated = { ...prev, onboardingCompleted: true };
            localStorage.setItem('user', JSON.stringify(updated));
            return updated;
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    // ✅ FIX 3: Export all required functions
    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                register,
                login,
                logout,
                updateUser,
                completeOnboarding,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
