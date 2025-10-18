
const User = require('../models/User');

const updateUserProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const completeOnboarding = async (req, res) => {
  console.log("Completing onboarding for user ID:", req.user.id);

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { onboardingCompleted: true, updatedAt: Date.now() } },
    { new: true }
  ).select('-password');

  console.log("Updated user:", user); // ← Is this null?

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ success: true, user });
};
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  updateUserProfile,
  completeOnboarding,
  getUserProfile
};