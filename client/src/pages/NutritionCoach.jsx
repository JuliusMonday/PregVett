import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const NutritionCoach = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [foods, setFoods] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [dailyIntake, setDailyIntake] = useState({
    calories: 0,
    protein: 0,
    folate: 0,
    iron: 0,
    calcium: 0
  });
  const [selectedFood, setSelectedFood] = useState(null);
  const [mealPlan, setMealPlan] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    'all', 'grains', 'proteins', 'vegetables', 'fruits', 'dairy', 'fats', 'others'
  ];

  useEffect(() => {
    fetchFoods();
    fetchRecommendations();
    fetchMealPlan();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/foods', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setFoods(data.foods);
      }
    } catch (error) {
      console.error('Error fetching foods:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/foods/recommendations', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setRecommendations(data.recommendations);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const fetchMealPlan = async () => {
    // Mock meal plan data
    setMealPlan([
      {
        meal: 'Breakfast',
        foods: [
          { name: 'Oat Porridge', calories: 150, protein: 5 },
          { name: 'Banana', calories: 105, protein: 1 }
        ]
      },
      {
        meal: 'Lunch',
        foods: [
          { name: 'Jollof Rice', calories: 350, protein: 8 },
          { name: 'Moi Moi', calories: 180, protein: 12 },
          { name: 'Vegetable Soup', calories: 120, protein: 4 }
        ]
      },
      {
        meal: 'Dinner',
        foods: [
          { name: 'Efo Riro', calories: 200, protein: 15 },
          { name: 'Pounded Yam', calories: 250, protein: 3 }
        ]
      }
    ]);
  };

  const filteredFoods = foods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         food.localName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getNutrientProgress = (nutrient, current, target) => {
    const percentage = Math.min((current / target) * 100, 100);
    return {
      percentage,
      status: percentage >= 100 ? 'optimal' : percentage >= 70 ? 'good' : 'low'
    };
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'none': return 'text-green-600 bg-green-100';
      case 'low': return 'text-yellow-600 bg-yellow-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const addFoodToMeal = (food) => {
    // This would add food to the current meal plan
    alert(`Added ${food.name} to your meal plan!`);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Nutrition Score Card */}
      <div className="card">
        <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Today's Nutrition Score</h2>
        
        {recommendations && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(recommendations).slice(0, 6).map(([nutrient, data]) => {
              if (nutrient === 'calories') {
                const progress = getNutrientProgress(nutrient, dailyIntake.calories, data.max);
                return (
                  <div key={nutrient} className="bg-[#F5F5F5] p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-[#2C3E50] capitalize">{nutrient}</span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        progress.status === 'optimal' ? 'bg-green-100 text-green-600' :
                        progress.status === 'good' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {progress.status}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-[#7AC2D5] mb-2">
                      {Math.round(progress.percentage)}%
                    </div>
                    <div className="text-sm text-[#888888]">
                      {dailyIntake[nutrient] || 0} / {data.max} {data.unit || ''}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className={`progress-bar h-2 rounded-full ${
                          progress.status === 'optimal' ? 'bg-green-500' :
                          progress.status === 'good' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${progress.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>

      {/* Today's Meal Plan */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#2C3E50]">Today's Meal Plan</h2>
          <button className="btn-primary">
            <i className="fas fa-plus mr-2"></i>
            Customize Plan
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mealPlan.map((meal, index) => (
            <div key={index} className="bg-[#F5F5F5] p-4 rounded-lg">
              <h3 className="font-semibold text-[#2C3E50] mb-3">{meal.meal}</h3>
              <div className="space-y-2">
                {meal.foods.map((food, foodIndex) => (
                  <div key={foodIndex} className="flex justify-between items-center">
                    <span className="text-sm text-[#888888]">{food.name}</span>
                    <span className="text-sm font-medium text-[#2C3E50]">{food.calories} cal</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-[#2C3E50]">Total</span>
                  <span className="text-sm font-bold text-[#7AC2D5]">
                    {meal.foods.reduce((sum, food) => sum + food.calories, 0)} cal
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center p-6">
          <div className="w-16 h-16 bg-[#BEE7C4] rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-utensils text-white text-2xl"></i>
          </div>
          <h3 className="font-semibold text-[#2C3E50] mb-2">Meal Planner</h3>
          <p className="text-sm text-[#888888] mb-4">Create custom meal plans</p>
          <button className="btn-secondary text-sm">Start Planning</button>
        </div>

        <div className="card text-center p-6">
          <div className="w-16 h-16 bg-[#F4A497] rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-shopping-cart text-white text-2xl"></i>
          </div>
          <h3 className="font-semibold text-[#2C3E50] mb-2">Shopping List</h3>
          <p className="text-sm text-[#888888] mb-4">Generate shopping lists</p>
          <button className="btn-accent text-sm">Create List</button>
        </div>

        <div className="card text-center p-6">
          <div className="w-16 h-16 bg-[#7AC2D5] rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-chart-line text-white text-2xl"></i>
          </div>
          <h3 className="font-semibold text-[#2C3E50] mb-2">Nutrition Report</h3>
          <p className="text-sm text-[#888888] mb-4">View weekly nutrition</p>
          <button className="btn-primary text-sm">View Report</button>
        </div>
      </div>
    </div>
  );

  const renderFoodDatabase = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-2">Search Foods</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
                placeholder="Search by name or local name..."
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.map(food => (
          <div key={food._id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-[#2C3E50]">{food.name}</h3>
                {food.localName && (
                  <p className="text-sm text-[#888888]">{food.localName}</p>
                )}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(food.pregnancySafety.riskLevel)}`}>
                {food.pregnancySafety.riskLevel}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-[#7AC2D5]">{food.nutrition.calories || 0}</div>
                <div className="text-xs text-[#888888]">Calories</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-[#BEE7C4]">{food.nutrition.protein || 0}g</div>
                <div className="text-xs text-[#888888]">Protein</div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#888888]">Folate</span>
                <span className="font-medium">{food.nutrition.folate || 0}mcg</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#888888]">Iron</span>
                <span className="font-medium">{food.nutrition.iron || 0}mg</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#888888]">Calcium</span>
                <span className="font-medium">{food.nutrition.calcium || 0}mg</span>
              </div>
            </div>

            {food.pregnancySafety.warnings.length > 0 && (
              <div className="bg-yellow-50 p-2 rounded mb-4">
                <p className="text-xs text-yellow-800">
                  <i className="fas fa-exclamation-triangle mr-1"></i>
                  {food.pregnancySafety.warnings[0]}
                </p>
              </div>
            )}

            <div className="flex space-x-2">
              <button
                onClick={() => addFoodToMeal(food)}
                className="flex-1 btn-primary text-sm py-2"
              >
                <i className="fas fa-plus mr-1"></i>
                Add to Meal
              </button>
              <button
                onClick={() => setSelectedFood(food)}
                className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
              >
                <i className="fas fa-info-circle"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMealPlanner = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Meal Planner</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Meal Plan Form */}
          <div>
            <h3 className="font-semibold text-[#2C3E50] mb-4">Create New Meal Plan</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                  Plan Name
                </label>
                <input type="text" className="input-field" placeholder="e.g., Week 12 Nutrition Plan" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                  Duration
                </label>
                <select className="input-field">
                  <option>1 Day</option>
                  <option>3 Days</option>
                  <option>1 Week</option>
                  <option>2 Weeks</option>
                  <option>1 Month</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                  Nutrition Goals
                </label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#888888]">Calories</span>
                    <input type="number" className="w-20 px-2 py-1 border rounded" defaultValue="2200" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#888888]">Protein</span>
                    <input type="number" className="w-20 px-2 py-1 border rounded" defaultValue="71" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#888888]">Folate</span>
                    <input type="number" className="w-20 px-2 py-1 border rounded" defaultValue="600" />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full">
                Create Meal Plan
              </button>
            </form>
          </div>

          {/* Sample Meal Plan */}
          <div>
            <h3 className="font-semibold text-[#2C3E50] mb-4">Sample Weekly Plan</h3>
            <div className="space-y-3">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                <div key={day} className="bg-[#F5F5F5] p-4 rounded-lg">
                  <h4 className="font-medium text-[#2C3E50] mb-2">{day}</h4>
                  <div className="space-y-1">
                    <div className="text-sm">
                      <span className="font-medium">Breakfast:</span> Oat porridge with fruits
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Lunch:</span> Jollof rice with moi moi
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Dinner:</span> Efo riro with pounded yam
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-[#888888]">
                    Total: ~1,200 calories
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSafetyAlerts = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Food Safety Alerts</h2>
        
        <div className="space-y-4">
          {/* High Risk Foods */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-800 mb-3">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              High Risk Foods - Avoid Completely
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Unpasteurized Dairy', risk: 'Listeria infection' },
                { name: 'Raw/Undercooked Meat', risk: 'Toxoplasmosis' },
                { name: 'Raw Eggs', risk: 'Salmonella' },
                { name: 'High Mercury Fish', risk: 'Mercury poisoning' },
                { name: 'Unwashed Produce', risk: 'Parasites' },
                { name: 'Alcohol', risk: 'Fetal alcohol syndrome' }
              ].map((food, index) => (
                <div key={index} className="bg-white p-3 rounded border border-red-200">
                  <div className="font-medium text-red-700">{food.name}</div>
                  <div className="text-sm text-red-600">{food.risk}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Medium Risk Foods */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-3">
              <i className="fas fa-exclamation-circle mr-2"></i>
              Medium Risk Foods - Consume with Caution
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Caffeine', advice: 'Limit to 200mg per day' },
                { name: 'Processed Foods', advice: 'High in sodium and preservatives' },
                { name: 'Artificial Sweeteners', advice: 'Some may not be safe during pregnancy' },
                { name: 'Certain Herbs', advice: 'Consult healthcare provider first' }
              ].map((food, index) => (
                <div key={index} className="bg-white p-3 rounded border border-yellow-200">
                  <div className="font-medium text-yellow-700">{food.name}</div>
                  <div className="text-sm text-yellow-600">{food.advice}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trimester-Specific Guidelines */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-3">
              <i className="fas fa-info-circle mr-2"></i>
              Trimester-Specific Guidelines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded border border-blue-200">
                <h4 className="font-medium text-blue-700 mb-2">First Trimester</h4>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Focus on folate-rich foods</li>
                  <li>• Avoid strong-smelling foods if nauseous</li>
                  <li>• Small, frequent meals</li>
                  <li>• Stay hydrated</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded border border-blue-200">
                <h4 className="font-medium text-blue-700 mb-2">Second Trimester</h4>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Increase protein intake</li>
                  <li>• Add calcium-rich foods</li>
                  <li>• Iron-rich foods for blood volume</li>
                  <li>• Balanced meals with all food groups</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded border border-blue-200">
                <h4 className="font-medium text-blue-700 mb-2">Third Trimester</h4>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Smaller, more frequent meals</li>
                  <li>• Focus on vitamin K rich foods</li>
                  <li>• Continue iron and calcium</li>
                  <li>• Avoid heavy, greasy foods</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#2C3E50]">Nutrition Coach</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-[#888888]">Week 12</span>
          <div className="w-8 h-8 bg-[#BEE7C4] rounded-full flex items-center justify-center">
            <i className="fas fa-leaf text-white text-sm"></i>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-home' },
          { id: 'foods', label: 'Food Database', icon: 'fas fa-database' },
          { id: 'planner', label: 'Meal Planner', icon: 'fas fa-utensils' },
          { id: 'safety', label: 'Safety Alerts', icon: 'fas fa-shield-alt' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-[#7AC2D5] shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <i className={tab.icon}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7AC2D5]"></div>
        </div>
      ) : (
        <>
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'foods' && renderFoodDatabase()}
          {activeTab === 'planner' && renderMealPlanner()}
          {activeTab === 'safety' && renderSafetyAlerts()}
        </>
      )}

      {/* Food Detail Modal */}
      {selectedFood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-[#2C3E50]">{selectedFood.name}</h2>
                <button
                  onClick={() => setSelectedFood(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              {selectedFood.localName && (
                <p className="text-[#888888] mb-4">Local Name: {selectedFood.localName}</p>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#7AC2D5]">{selectedFood.nutrition.calories || 0}</div>
                  <div className="text-sm text-[#888888]">Calories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#BEE7C4]">{selectedFood.nutrition.protein || 0}g</div>
                  <div className="text-sm text-[#888888]">Protein</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#F4A497]">{selectedFood.nutrition.folate || 0}mcg</div>
                  <div className="text-sm text-[#888888]">Folate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#7AC2D5]">{selectedFood.nutrition.iron || 0}mg</div>
                  <div className="text-sm text-[#888888]">Iron</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-[#2C3E50] mb-2">Pregnancy Safety</h3>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(selectedFood.pregnancySafety.riskLevel)}`}>
                  {selectedFood.pregnancySafety.riskLevel.charAt(0).toUpperCase() + selectedFood.pregnancySafety.riskLevel.slice(1)} Risk
                </div>
                
                {selectedFood.pregnancySafety.warnings.length > 0 && (
                  <div className="mt-3">
                    <h4 className="font-medium text-[#2C3E50] mb-2">Warnings:</h4>
                    <ul className="list-disc list-inside text-sm text-[#888888] space-y-1">
                      {selectedFood.pregnancySafety.warnings.map((warning, index) => (
                        <li key={index}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {selectedFood.benefits.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-[#2C3E50] mb-2">Health Benefits</h3>
                  <ul className="list-disc list-inside text-sm text-[#888888] space-y-1">
                    {selectedFood.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => addFoodToMeal(selectedFood)}
                  className="flex-1 btn-primary"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Add to Meal Plan
                </button>
                <button
                  onClick={() => setSelectedFood(null)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionCoach;