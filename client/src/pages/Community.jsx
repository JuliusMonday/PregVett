import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Community = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('forums');
  const [posts, setPosts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
    fetchGroups();
    fetchRecipes();
  }, []);

  const fetchPosts = async () => {
    // Mock data - would be replaced with actual API call
    setPosts([
      {
        id: 1,
        author: 'Aisha B.',
        avatar: 'AB',
        content: 'Just entered my second trimester! Any tips for managing morning sickness? I\'ve been struggling with nausea all day.',
        category: 'general',
        likes: 15,
        comments: 8,
        timestamp: '2 hours ago',
        trimester: 2
      },
      {
        id: 2,
        author: 'Ngozi O.',
        avatar: 'NO',
        content: 'Had my anatomy scan today and baby is healthy! So grateful for this journey. Sharing some positive vibes ✨',
        category: 'celebration',
        likes: 32,
        comments: 12,
        timestamp: '5 hours ago',
        trimester: 2
      },
      {
        id: 3,
        author: 'Fatima I.',
        avatar: 'FI',
        content: 'Looking for recommendations for good maternity hospitals in Lagos. Any suggestions?',
        category: 'recommendations',
        likes: 8,
        comments: 15,
        timestamp: '1 day ago',
        trimester: 3
      }
    ]);
  };

  const fetchGroups = async () => {
    // Mock data - would be replaced with actual API call
    setGroups([
      {
        id: 1,
        name: 'First Trimester Support',
        members: 1245,
        description: 'Support and advice for mothers in their first trimester',
        isPrivate: false
      },
      {
        id: 2,
        name: 'Nigerian Recipes for Pregnancy',
        members: 892,
        description: 'Share and discover healthy Nigerian recipes',
        isPrivate: false
      },
      {
        id: 3,
        name: 'High-Risk Pregnancy Support',
        members: 456,
        description: 'Private group for mothers with high-risk pregnancies',
        isPrivate: true
      }
    ]);
  };

  const fetchRecipes = async () => {
    // Mock data - would be replaced with actual API call
    setRecipes([
      {
        id: 1,
        name: 'Moi Moi with Vegetables',
        author: 'Chef Ada',
        image: 'moi-moi',
        prepTime: '30 mins',
        cookTime: '45 mins',
        servings: 4,
        likes: 156,
        description: 'Protein-rich moi moi packed with vegetables for extra nutrition',
        ingredients: ['Beans', 'Pepper', 'Onions', 'Vegetables', 'Palm Oil'],
        nutrition: { protein: '15g', fiber: '8g', iron: '3mg' }
      },
      {
        id: 2,
        name: 'Efo Riro with Pounded Yam',
        author: 'Mama Bisi',
        image: 'efo-riro',
        prepTime: '20 mins',
        cookTime: '40 mins',
        servings: 6,
        likes: 203,
        description: 'Traditional Nigerian soup rich in iron and vitamins',
        ingredients: ['Efo', 'Palm Oil', 'Fish', 'Seasonings'],
        nutrition: { protein: '12g', fiber: '6g', iron: '4mg' }
      }
    ]);
  };

  const renderForums = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#2C3E50]">Community Forums</h2>
          <button className="btn-primary">
            <i className="fas fa-plus mr-2"></i>
            New Post
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex space-x-2 mb-6">
          {['all', 'general', 'celebration', 'recommendations', 'concerns'].map(category => (
            <button
              key={category}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-[#F5F5F5] p-6 rounded-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#7AC2D5] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold">{post.avatar}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-[#2C3E50]">{post.author}</h3>
                      <p className="text-sm text-[#888888]">{post.timestamp} • Trimester {post.trimester}</p>
                    </div>
                    <span className="px-3 py-1 bg-[#BEE7C4] text-[#2C3E50] rounded-full text-xs">
                      {post.category}
                    </span>
                  </div>
                  <p className="text-[#888888] mb-4">{post.content}</p>
                  <div className="flex items-center space-x-6 text-sm text-[#888888]">
                    <button className="flex items-center space-x-1 hover:text-[#7AC2D5]">
                      <i className="fas fa-heart"></i>
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-[#7AC2D5]">
                      <i className="fas fa-comment"></i>
                      <span>{post.comments} comments</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-[#7AC2D5]">
                      <i className="fas fa-share"></i>
                      <span>Share</span>
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

  const renderGroups = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#2C3E50]">Support Groups</h2>
          <button className="btn-primary">
            <i className="fas fa-plus mr-2"></i>
            Create Group
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div key={group.id} className="bg-[#F5F5F5] p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#2C3E50]">{group.name}</h3>
                {group.isPrivate && (
                  <i className="fas fa-lock text-[#888888]"></i>
                )}
              </div>
              <p className="text-sm text-[#888888] mb-4">{group.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#888888]">
                  <i className="fas fa-users mr-1"></i>
                  {group.members.toLocaleString()} members
                </span>
                <button className="btn-primary text-sm py-2 px-4">
                  Join Group
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRecipes = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#2C3E50]">Recipe Sharing</h2>
          <button className="btn-primary">
            <i className="fas fa-plus mr-2"></i>
            Share Recipe
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-[#F5F5F5] rounded-lg overflow-hidden">
              <div className="h-48 bg-[#BEE7C4] flex items-center justify-center">
                <i className="fas fa-utensils text-white text-4xl"></i>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-[#2C3E50]">{recipe.name}</h3>
                  <span className="text-sm text-[#888888]">by {recipe.author}</span>
                </div>
                <p className="text-sm text-[#888888] mb-4">{recipe.description}</p>
                
                <div className="flex items-center justify-between text-sm text-[#888888] mb-4">
                  <span>
                    <i className="fas fa-clock mr-1"></i>
                    Prep: {recipe.prepTime}
                  </span>
                  <span>
                    <i className="fas fa-fire mr-1"></i>
                    Cook: {recipe.cookTime}
                  </span>
                  <span>
                    <i className="fas fa-utensils mr-1"></i>
                    {recipe.servings} servings
                  </span>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-[#2C3E50] text-sm mb-2">Nutrition per serving:</h4>
                  <div className="flex space-x-4 text-sm">
                    {Object.entries(recipe.nutrition).map(([nutrient, value]) => (
                      <span key={nutrient} className="bg-white px-2 py-1 rounded">
                        {nutrient}: {value}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button className="flex items-center space-x-1 text-[#F4A497] hover:text-[#e29487]">
                    <i className="fas fa-heart"></i>
                    <span>{recipe.likes}</span>
                  </button>
                  <button className="btn-secondary text-sm">
                    View Recipe
                  </button>
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
        <h1 className="text-3xl font-bold text-[#2C3E50]">Community</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-[#888888]">Connect & Support</span>
          <div className="w-8 h-8 bg-[#BEE7C4] rounded-full flex items-center justify-center">
            <i className="fas fa-users text-white text-sm"></i>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'forums', label: 'Forums', icon: 'fas fa-comments' },
          { id: 'groups', label: 'Groups', icon: 'fas fa-users' },
          { id: 'recipes', label: 'Recipes', icon: 'fas fa-utensils' }
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
          {activeTab === 'forums' && renderForums()}
          {activeTab === 'groups' && renderGroups()}
          {activeTab === 'recipes' && renderRecipes()}
        </>
      )}
    </div>
  );
};

export default Community;