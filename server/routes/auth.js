const express = require('express');
const { register, login, getMe, updateProfile, completeOnboarding } = require('../controllers/authController.js');
const { auth } = require('../middleware/auth.js');

const Mirouter = express.Router();

Mirouter.post('/register', register);
Mirouter.post('/login', login);
Mirouter.get('/me', auth, getMe);
Mirouter.put('/profile', auth, updateProfile);
Mirouter.put('/complete-onboarding', auth, completeOnboarding);

module.exports = Mirouter;