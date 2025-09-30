const Food = require('../models/Food');

const getAllFoods = async (req, res) => {
  try {
    const { category, origin, search } = req.query;
    const filter = { isActive: true };
    
    if (category) filter.category = category;
    if (origin) filter.origin = origin;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { localName: { $regex: search, $options: 'i' } }
      ];
    }

    const foods = await Food.find(filter).sort({ name: 1 });
    
    res.json({
      success: true,
      foods
    });
  } catch (error) {
    console.error('Get foods error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    res.json({
      success: true,
      food
    });
  } catch (error) {
    console.error('Get food error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getFoodsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const foods = await Food.find({ category, isActive: true }).sort({ name: 1 });
    
    res.json({
      success: true,
      foods
    });
  } catch (error) {
    console.error('Get foods by category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getSafeFoods = async (req, res) => {
  try {
    const { trimester } = req.query;
    const foods = await Food.find({ 
      'pregnancySafety.safe': true,
      isActive: true 
    });

    // Filter by trimester if specified
    let filteredFoods = foods;
    if (trimester) {
      filteredFoods = foods.filter(food => {
        const trimesterNotes = food.pregnancySafety.trimesterNotes;
        return !trimesterNotes[trimester] || 
               !trimesterNotes[trimester].toLowerCase().includes('avoid');
      });
    }

    res.json({
      success: true,
      foods: filteredFoods
    });
  } catch (error) {
    console.error('Get safe foods error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getNutritionRecommendations = async (req, res) => {
  try {
    const { week } = req.query;
    
    // Base recommendations for pregnancy
    const recommendations = {
      calories: { min: 2200, max: 2900, current: 0 },
      protein: { min: 71, max: 100, current: 0, unit: 'g' },
      folate: { min: 600, max: 800, current: 0, unit: 'mcg' },
      iron: { min: 27, max: 30, current: 0, unit: 'mg' },
      calcium: { min: 1000, max: 1300, current: 0, unit: 'mg' },
      vitaminA: { min: 770, max: 1300, current: 0, unit: 'mcg' },
      vitaminC: { min: 85, max: 120, current: 0, unit: 'mg' },
      fiber: { min: 28, max: 35, current: 0, unit: 'g' }
    };

    // Adjust based on trimester
    if (week) {
      const weekNum = parseInt(week);
      if (weekNum <= 13) {
        // First trimester - focus on folate
        recommendations.folate.min = 800;
        recommendations.calories.min = 2000;
      } else if (weekNum <= 26) {
        // Second trimester - increased protein and calcium
        recommendations.protein.min = 85;
        recommendations.calcium.min = 1200;
        recommendations.calories.min = 2400;
      } else {
        // Third trimester - maximum nutrition
        recommendations.calories.min = 2600;
        recommendations.protein.min = 100;
        recommendations.iron.min = 30;
      }
    }

    res.json({
      success: true,
      recommendations
    });
  } catch (error) {
    console.error('Get nutrition recommendations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const searchFoods = async (req, res) => {
  try {
    const { query, nutrients } = req.body;
    
    let searchFilter = { isActive: true };
    
    if (query) {
      searchFilter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { localName: { $regex: query, $options: 'i' } },
        { benefits: { $regex: query, $options: 'i' } }
      ];
    }

    let foods = await Food.find(searchFilter);

    // Filter by nutrients if specified
    if (nutrients && nutrients.length > 0) {
      foods = foods.filter(food => {
        return nutrients.some(nutrient => {
          const value = food.nutrition[nutrient.toLowerCase()];
          return value && value > 0;
        });
      });
    }

    res.json({
      success: true,
      foods
    });
  } catch (error) {
    console.error('Search foods error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getFoodSafetyAlerts = async (req, res) => {
  try {
    const { trimester } = req.query;
    
    const unsafeFoods = await Food.find({
      'pregnancySafety.safe': false,
      isActive: true
    });

    const alerts = unsafeFoods.map(food => ({
      food: food.name,
      riskLevel: food.pregnancySafety.riskLevel,
      warnings: food.pregnancySafety.warnings,
      trimesterSpecific: trimester ? food.pregnancySafety.trimesterNotes[trimester] : null
    }));

    res.json({
      success: true,
      alerts
    });
  } catch (error) {
    console.error('Get food safety alerts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createMealPlan = async (req, res) => {
  try {
    const { name, meals, targetNutrients, duration } = req.body;
    
    // This would typically create a meal plan in the database
    // For now, we'll return a success response
    res.status(201).json({
      success: true,
      message: 'Meal plan created successfully',
      mealPlan: {
        id: Date.now(),
        name,
        meals,
        targetNutrients,
        duration,
        createdAt: new Date()
      }
    });
  } catch (error) {
    console.error('Create meal plan error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllFoods,
  getFoodById,
  getFoodsByCategory,
  getSafeFoods,
  getNutritionRecommendations,
  searchFoods,
  getFoodSafetyAlerts,
  createMealPlan
};