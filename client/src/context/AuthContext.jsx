// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { registerUser, loginUser } from "../api/auth";
import { completeOnboardingAPI } from "../api/auth";
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Keep user synced with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user]);

  // 🧠 Register function
  const register = async (registrationData) => {
    const { ok, data } = await registerUser(registrationData);
    if (ok) {
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
      localStorage.setItem("token", data.token);
      return { success: true };
    } else {
      return { success: false, message: data.message || "Registration failed" };
    }
  };

  // 🧠 Login function
  const login = async (email, password) => {
  const { ok, data } = await loginUser(email, password);
  if (ok) {
    // Get existing onboarding status from localStorage if backend doesn't provide it
    const existingUser = JSON.parse(localStorage.getItem("user") || "{}");
    const backendOnboardingStatus = data.user.onboardingCompleted;
    const finalOnboardingStatus = 
      backendOnboardingStatus !== undefined 
        ? backendOnboardingStatus 
        : existingUser.onboardingCompleted || false;

    const loggedInUser = {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      phone: data.user.phone,
      role: data.user.role,
      onboardingCompleted: finalOnboardingStatus, // ← Preserve if backend omits it
      token: data.token,
    };

    setUser(loggedInUser);
    localStorage.setItem("token", data.token);
    return { success: true };
  } else {
    return { success: false, message: data.message || "Login failed" };
  }
};

  // ✅ Update user info
  const updateUser = (updatedData) => {
    setUser((prev) => {
      const newUser = { ...prev, ...updatedData };
      localStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    });
  };

// Inside AuthProvider
const completeOnboarding = async () => {
  // ❌ Don't read from localStorage here
  // const token = localStorage.getItem("token");

  // ✅ Use token from current user in context
  if (!user || !user.token) {
    logout();
    return { success: false, message: "Not authenticated" };
  }

  const { ok, data } = await completeOnboardingAPI(user.token); // pass token
  if (ok) {
    setUser(prev => ({ ...prev, onboardingCompleted: true }));
    // No need to save token again — it's already there
    return { success: true };
  } else {
    return { success: false, message: data.message || "Onboarding failed" };
  }
};
  // ✅ Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

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
