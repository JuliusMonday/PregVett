import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Education = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('weekly');
  const [weeklyContent, setWeeklyContent] = useState([]);
  const [videos, setVideos] = useState([]);
  const [articles, setArticles] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(12);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeeklyContent();
    fetchVideos();
    fetchArticles();
  }, []);

  const fetchWeeklyContent = async () => {
    // Mock data - would be replaced with actual API call
    setWeeklyContent([
      {
        week: 12,
        title: 'Baby\'s Development at 12 Weeks',
        content: [
          'Your baby is now about the size of a lime!',
          'All vital organs are formed and beginning to function',
          'Baby can make small movements and reflexes',
          'Facial features are becoming more defined'
        ],
        tips: [
          'Continue taking prenatal vitamins',
          'Stay hydrated and eat nutritious foods',
          'Get plenty of rest and avoid stress',
          'Start thinking about sharing your news'
        ],
        size: '2.1 inches',
        weight: '0.5 ounces'
      }
    ]);
  };

  const fetchVideos = async () => {
    // Mock data - would be replaced with actual API call
    setVideos([
      {
        id: 1,
        title: 'Prenatal Yoga for Beginners',
        duration: '15:30',
        category: 'exercise',
        thumbnail: 'yoga',
        views: 15420,
        description: 'Safe yoga exercises for pregnant women'
      },
      {
        id: 2,
        title: 'Healthy Eating During Pregnancy',
        duration: '12:45',
        category: 'nutrition',
        thumbnail: 'nutrition',
        views: 23150,
        description: 'Nutrition tips for a healthy pregnancy'
      },
      {
        id: 3,
        title: 'Preparing for Labor and Delivery',
        duration: '20:15',
        category: 'preparation',
        thumbnail: 'labor',
        views: 18990,
        description: 'Everything you need to know about labor'
      }
    ]);
  };

  const fetchArticles = async () => {
    // Mock data - would be replaced with actual API call
    setArticles([
      {
        id: 1,
        title: 'Understanding Your Trimesters',
        category: 'general',
        readTime: '5 min',
        content: 'Learn about the three trimesters of pregnancy...',
        excerpt: 'A comprehensive guide to understanding each stage of pregnancy'
      },
      {
        id: 2,
        title: 'Managing Morning Sickness Naturally',
        category: 'wellness',
        readTime: '7 min',
        content: 'Natural remedies for managing morning sickness...',
        excerpt: 'Safe and effective ways to cope with nausea during pregnancy'
      },
      {
        id: 3,
        title: 'Exercise Guidelines for Pregnant Women',
        category: 'fitness',
        readTime: '6 min',
        content: 'Safe exercises during each trimester...',
        excerpt: 'Stay fit and healthy with these pregnancy-safe exercises'
      }
    ]);
  };

  const renderWeeklyGuide = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#2C3E50]">Weekly Pregnancy Guide</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[#888888]">Week:</span>
            <input
              type="number"
              min="1"
              max="40"
              value={currentWeek}
              onChange={(e) => setCurrentWeek(parseInt(e.target.value))}
              className="w-16 px-2 py-1 border rounded"
            />
          </div>
        </div>

        {weeklyContent.map((content) => (
          <div key={content.week} className="bg-[#F5F5F5] p-6 rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold text-[#2C3E50] mb-4">{content.title}</h3>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-[#2C3E50] mb-3">Baby\'s Development:</h4>
                  <ul className="space-y-2">
                    {content.content.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <i className="fas fa-check-circle text-[#BEE7C4] mt-1"></i>
                        <span className="text-[#888888]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-[#2C3E50] mb-3">Weekly Tips:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {content.tips.map((tip, index) => (
                      <div key={index} className="bg-white p-3 rounded border border-gray-200">
                        <span className="text-sm text-[#888888]">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-[#7AC2D5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-baby text-white text-4xl"></i>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-[#2C3E50] mb-2">Baby Size</h4>
                  <div className="text-lg font-bold text-[#7AC2D5] mb-1">{content.size}</div>
                  <div className="text-sm text-[#888888]">{content.weight}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderVideoLibrary = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Video Library</h2>
        
        {/* Category Filters */}
        <div className="flex space-x-2 mb-6">
          {['all', 'exercise', 'nutrition', 'preparation', 'wellness'].map(category => (
            <button
              key={category}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-[#F5F5F5] rounded-lg overflow-hidden">
              <div className="h-48 bg-[#7AC2D5] flex items-center justify-center relative">
                <i className="fas fa-play-circle text-white text-5xl opacity-80"></i>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[#2C3E50] mb-2">{video.title}</h3>
                <p className="text-sm text-[#888888] mb-3">{video.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#888888]">
                    <i className="fas fa-eye mr-1"></i>
                    {video.views.toLocaleString()} views
                  </span>
                  <button className="text-[#7AC2D5] hover:text-[#6ab0c3] text-sm">
                    Watch Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderArticles = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Educational Articles</h2>
        
        {/* Category Filters */}
        <div className="flex space-x-2 mb-6">
          {['all', 'general', 'wellness', 'fitness', 'nutrition'].map(category => (
            <button
              key={category}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {articles.map((article) => (
            <div key={article.id} className="bg-[#F5F5F5] p-6 rounded-lg">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-[#BEE7C4] rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-file-alt text-white text-2xl"></i>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-[#2C3E50]">{article.title}</h3>
                    <span className="text-sm text-[#888888]">{article.readTime}</span>
                  </div>
                  <p className="text-[#888888] mb-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-[#F5F5F5] text-[#888888] rounded-full text-xs">
                      {article.category}
                    </span>
                    <button className="text-[#7AC2D5] hover:text-[#6ab0c3] text-sm">
                      Read Article
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#2C3E50]">Education</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-[#888888]">Learn & Grow</span>
          <div className="w-8 h-8 bg-[#F4A497] rounded-full flex items-center justify-center">
            <i className="fas fa-graduation-cap text-white text-sm"></i>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'weekly', label: 'Weekly Guide', icon: 'fas fa-calendar-week' },
          { id: 'videos', label: 'Videos', icon: 'fas fa-video' },
          { id: 'articles', label: 'Articles', icon: 'fas fa-newspaper' }
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
          {activeTab === 'weekly' && renderWeeklyGuide()}
          {activeTab === 'videos' && renderVideoLibrary()}
          {activeTab === 'articles' && renderArticles()}
        </>
      )}
    </div>
  );
};

export default Education;