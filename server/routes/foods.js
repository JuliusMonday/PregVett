const express = require('express');
const { auth } = require('../middleware/auth');
const {
  getAllFoods,
  getFoodById,
  getFoodsByCategory,
  getSafeFoods,
  getNutritionRecommendations,
  searchFoods,
  getFoodSafetyAlerts,
  createMealPlan
} = require('../controllers/foodController');

const router = express.Router();

router.get('/', auth, getAllFoods);
router.get('/safe', auth, getSafeFoods);
router.get('/recommendations', auth, getNutritionRecommendations);
router.get('/safety-alerts', auth, getFoodSafetyAlerts);
router.get('/category/:category', auth, getFoodsByCategory);
router.get('/:id', auth, getFoodById);
router.post('/search', auth, searchFoods);
router.post('/meal-plan', auth, createMealPlan);

module.exports = router;