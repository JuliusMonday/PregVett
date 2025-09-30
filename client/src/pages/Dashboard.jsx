import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [pregnancyStats, setPregnancyStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [todayMeal, setTodayMeal] = useState(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [nutritionScore, setNutritionScore] = useState(0);

  useEffect(() => {
    fetchPregnancyStats();
    fetchTodayMeal();
    fetchUpcomingAppointments();
    fetchNutritionScore();
  }, []);

  const fetchPregnancyStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pregnancies/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setPregnancyStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching pregnancy stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTodayMeal = async () => {
    // Mock data - would be replaced with actual API call
    setTodayMeal({
      name: 'Jollof Rice with Vegetables',
      description: 'Rich in carbohydrates and vitamins',
      calories: 450,
      protein: '12g',
      iron: '3.2mg',
      folate: '85mcg'
    });
  };

  const fetchUpcomingAppointments = async () => {
    // Mock data - would be replaced with actual API call
    setUpcomingAppointments([
      {
        id: 1,
        title: 'ANC Check-up',
        date: '2024-01-15',
        time: '10:00 AM',
        type: 'anc',
        location: 'General Hospital'
      },
      {
        id: 2,
        title: 'Ultrasound Scan',
        date: '2024-01-22',
        time: '2:00 PM',
        type: 'ultrasound',
        location: 'Diagnostic Center'
      }
    ]);
  };

  const fetchNutritionScore = async () => {
    // Mock data - would be replaced with actual API call
    setNutritionScore(85);
  };

  const getTrimesterInfo = (week) => {
    if (week <= 13) return { name: 'First Trimester', color: 'bg-[#F4A497]' };
    if (week <= 26) return { name: 'Second Trimester', color: 'bg-[#7AC2D5]' };
    return { name: 'Third Trimester', color: 'bg-[#BEE7C4]' };
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getWeekInfo = (week) => {
    const weekData = {
      size: 'size of a lime',
      weight: '0.5 ounces',
      developments: [
        'Baby\'s fingers and toes are fully formed',
        'Facial features are becoming more defined',
        'Baby can make small movements'
      ],
      tips: [
        'Continue taking prenatal vitamins',
        'Stay hydrated and eat nutritious foods',
        'Get plenty of rest and avoid stress'
      ]
    };

    // Customize based on trimester
    if (week <= 13) {
      weekData.developments = [
        'Baby\'s major organs are forming',
        'Heart is beating regularly',
        'Facial features are developing'
      ];
      weekData.tips = [
        'Take folic acid supplements',
        'Avoid harmful substances',
        'Get early prenatal care'
      ];
    } else if (week <= 26) {
      weekData.developments = [
        'Baby can hear sounds',
        'Skin is becoming less transparent',
        'Baby is more active'
      ];
      weekData.tips = [
        'Start feeling baby movements',
        'Monitor weight gain',
        'Consider prenatal testing'
      ];
    } else {
      weekData.developments = [
        'Baby is gaining weight rapidly',
        'Lungs are maturing',
        'Baby is getting into position for birth'
      ];
      weekData.tips = [
        'Monitor for signs of labor',
        'Prepare for delivery',
        'Attend regular check-ups'
      ];
    }

    return weekData;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#7AC2D5]"></div>
      </div>
    );
  }

  if (!pregnancyStats) {
    return (
      <div className="p-6">
        <div className="card text-center">
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">No Active Pregnancy</h2>
          <p className="text-[#888888] mb-6">Please complete your onboarding to start tracking your pregnancy.</p>
          <Link to="/onboarding" className="btn-primary">
            Complete Onboarding
          </Link>
        </div>
      </div>
    );
  }

  const trimesterInfo = getTrimesterInfo(pregnancyStats.currentWeek);
  const weekInfo = getWeekInfo(pregnancyStats.currentWeek);
  const riskColor = getRiskColor(pregnancyStats.riskLevel);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C3E50]">Welcome back, {user?.name}!</h1>
          <p className="text-[#888888]">Here's your pregnancy update for today</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-[#888888]">Today</div>
          <div className="text-lg font-semibold text-[#2C3E50]">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Main Pregnancy Progress Card */}
      <div className="card">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Week Information */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-[#2C3E50]">
                Week {pregnancyStats.currentWeek}
              </h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${trimesterInfo.color} text-white`}>
                {trimesterInfo.name}
              </span>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm text-[#888888] mb-2">
                <span>Pregnancy Progress</span>
                <span>{pregnancyStats.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="progress-bar h-3 rounded-full"
                  style={{ width: `${pregnancyStats.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#F5F5F5] p-4 rounded-lg">
                <div className="text-sm text-[#888888] mb-1">Due Date</div>
                <div className="text-lg font-semibold text-[#2C3E50]">
                  {new Date(pregnancyStats.dueDate).toLocaleDateString()}
                </div>
              </div>
              <div className="bg-[#F5F5F5] p-4 rounded-lg">
                <div className="text-sm text-[#888888] mb-1">Days Remaining</div>
                <div className="text-lg font-semibold text-[#2C3E50]">
                  {pregnancyStats.daysRemaining} days
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-[#888888]">Risk Level:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${riskColor}`}>
                {pregnancyStats.riskLevel.charAt(0).toUpperCase() + pregnancyStats.riskLevel.slice(1)}
              </span>
            </div>
          </div>

          {/* Baby Development */}
          <div className="bg-[#F5F5F5] p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">Baby's Development</h3>
            <div className="text-center mb-4">
              <div className="w-20 h-20 bg-[#7AC2D5] rounded-full mx-auto mb-3 flex items-center justify-center">
                <i className="fas fa-baby text-white text-2xl"></i>
              </div>
              <div className="text-sm text-[#888888]">Size: {weekInfo.size}</div>
              <div className="text-sm text-[#888888]">Weight: {weekInfo.weight}</div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-[#2C3E50] text-sm">This week:</h4>
              {weekInfo.developments.slice(0, 2).map((development, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <i className="fas fa-check-circle text-[#BEE7C4] text-sm mt-0.5"></i>
                  <span className="text-sm text-[#888888]">{development}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[#888888] mb-1">Nutrition Score</div>
              <div className="text-2xl font-bold text-[#BEE7C4]">{nutritionScore}%</div>
            </div>
            <div className="w-12 h-12 bg-[#BEE7C4] rounded-full flex items-center justify-center">
              <i className="fas fa-apple-alt text-white"></i>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[#888888] mb-1">Next Appointment</div>
              <div className="text-lg font-bold text-[#F4A497]">
                {upcomingAppointments[0] ? 
                  new Date(upcomingAppointments[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) 
                  : 'None'
                }
              </div>
            </div>
            <div className="w-12 h-12 bg-[#F4A497] rounded-full flex items-center justify-center">
              <i className="fas fa-calendar-alt text-white"></i>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[#888888] mb-1">Weight Gain</div>
              <div className="text-2xl font-bold text-[#7AC2D5]">+2.5 kg</div>
            </div>
            <div className="w-12 h-12 bg-[#7AC2D5] rounded-full flex items-center justify-center">
              <i className="fas fa-weight text-white"></i>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[#888888] mb-1">Symptoms</div>
              <div className="text-2xl font-bold text-[#F4A497]">3</div>
            </div>
            <div className="w-12 h-12 bg-[#F4A497] rounded-full flex items-center justify-center">
              <i className="fas fa-stethoscope text-white"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Meal */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#2C3E50]">Today's Meal Recommendation</h3>
            <Link to="/nutrition" className="text-[#7AC2D5] hover:text-[#6ab0c3] text-sm">
              View All →
            </Link>
          </div>
          
          {todayMeal && (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-[#BEE7C4] rounded-lg flex items-center justify-center">
                  <i className="fas fa-utensils text-white text-xl"></i>
                </div>
                <div>
                  <h4 className="font-medium text-[#2C3E50]">{todayMeal.name}</h4>
                  <p className="text-sm text-[#888888]">{todayMeal.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 pt-3 border-t">
                <div className="text-center">
                  <div className="text-lg font-semibold text-[#7AC2D5]">{todayMeal.calories}</div>
                  <div className="text-xs text-[#888888]">Calories</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-[#BEE7C4]">{todayMeal.protein}</div>
                  <div className="text-xs text-[#888888]">Protein</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-[#F4A497]">{todayMeal.iron}</div>
                  <div className="text-xs text-[#888888]">Iron</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Daily Tips */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#2C3E50]">Daily Tips for Week {pregnancyStats.currentWeek}</h3>
            <Link to="/education" className="text-[#7AC2D5] hover:text-[#6ab0c3] text-sm">
              More Tips →
            </Link>
          </div>
          
          <div className="space-y-3">
            {weekInfo.tips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-[#7AC2D5] rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-lightbulb text-white text-sm"></i>
                </div>
                <p className="text-sm text-[#888888]">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#2C3E50]">Upcoming Appointments</h3>
          <Link to="/appointments" className="text-[#7AC2D5] hover:text-[#6ab0c3] text-sm">
            View All →
          </Link>
        </div>
        
        {upcomingAppointments.length > 0 ? (
          <div className="space-y-3">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 bg-[#F5F5F5] rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#7AC2D5] rounded-full flex items-center justify-center">
                    <i className="fas fa-calendar-check text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#2C3E50]">{appointment.title}</h4>
                    <p className="text-sm text-[#888888]">{appointment.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-[#2C3E50]">
                    {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  <div className="text-sm text-[#888888]">{appointment.time}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#888888] text-center py-4">No upcoming appointments scheduled</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link to="/symptom-checker" className="card text-center p-4 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-[#F4A497] rounded-full flex items-center justify-center mx-auto mb-2">
            <i className="fas fa-stethoscope text-white"></i>
          </div>
          <div className="text-sm font-medium text-[#2C3E50]">Check Symptoms</div>
        </Link>

        <Link to="/nutrition" className="card text-center p-4 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-[#BEE7C4] rounded-full flex items-center justify-center mx-auto mb-2">
            <i className="fas fa-apple-alt text-white"></i>
          </div>
          <div className="text-sm font-medium text-[#2C3E50]">Nutrition</div>
        </Link>

        <Link to="/health-tracking" className="card text-center p-4 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-[#7AC2D5] rounded-full flex items-center justify-center mx-auto mb-2">
            <i className="fas fa-heartbeat text-white"></i>
          </div>
          <div className="text-sm font-medium text-[#2C3E50]">Health Track</div>
        </Link>

        <Link to="/emergency" className="card text-center p-4 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
            <i className="fas fa-exclamation-triangle text-white"></i>
          </div>
          <div className="text-sm font-medium text-[#2C3E50]">Emergency</div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;