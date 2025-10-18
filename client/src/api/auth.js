// src/api/auth.js
import { API_BASE_URL } from "./config";

// 🧩 Register user
export const registerUser = async (registrationData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registrationData),
    });
    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    return { ok: false, data: { message: "Network error" } };
  }
};

// 🧩 Login user
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    return { ok: false, data: { message: "Network error" } };
  }
};

// src/api/auth.js
export const completeOnboardingAPI = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/onboarding`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // ← uses passed token
    }
  });
    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    return { ok: false, data: { message: error.message } };
  }
};