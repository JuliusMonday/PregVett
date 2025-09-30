const express = require('express');
const { auth } = require('../middleware/auth');
const {
  updateUserProfile,
  completeOnboarding,
  getUserProfile
} = require('../controllers/UserController');

const router = express.Router();

// Get user profile
router.get('/profile', auth, getUserProfile);

// Update user profile
router.put('/profile', auth, updateUserProfile);

// Complete onboarding
router.patch('/onboarding', auth, completeOnboarding);

module.exports = router;