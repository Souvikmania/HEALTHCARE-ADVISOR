import React, { useState } from 'react';
import { 
  BookOpen, 
  Heart, 
  Activity, 
  Apple, 
  Moon, 
  Brain,
  Shield,
  Droplets,
  Clock,
  Star
} from 'lucide-react';

export const HealthTips: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Tips', icon: BookOpen },
    { id: 'nutrition', name: 'Nutrition', icon: Apple },
    { id: 'exercise', name: 'Exercise', icon: Activity },
    { id: 'mental', name: 'Mental Health', icon: Brain },
    { id: 'sleep', name: 'Sleep', icon: Moon },
    { id: 'prevention', name: 'Prevention', icon: Shield }
  ];

  const healthTips = [
    {
      id: 1,
      title: '10 Minutes of Walking After Meals',
      category: 'exercise',
      readTime: '3 min read',
      image: 'https://images.pexels.com/photos/1300526/pexels-photo-1300526.jpeg?auto=compress&cs=tinysrgb&w=400',
      excerpt: 'A simple post-meal walk can significantly improve digestion and blood sugar control.',
      content: 'Taking a 10-minute walk after meals can help regulate blood sugar levels, improve digestion, and boost your overall energy levels throughout the day.',
      tips: [
        'Start immediately after finishing your meal',
        'Walk at a comfortable, moderate pace',
        'Focus on deep breathing while walking',
        'Make it a family activity for better consistency'
      ],
      rating: 4.8,
      featured: true
    },
    {
      id: 2,
      title: 'The 8-8-8 Sleep Rule for Better Health',
      category: 'sleep',
      readTime: '5 min read',
      image: 'https://images.pexels.com/photos/164573/pexels-photo-164573.jpeg?auto=compress&cs=tinysrgb&w=400',
      excerpt: 'Discover how proper sleep cycles can transform your physical and mental wellbeing.',
      content: 'The 8-8-8 rule suggests 8 hours of work, 8 hours of sleep, and 8 hours for personal activities. Quality sleep is crucial for immune function, mental clarity, and emotional regulation.',
      tips: [
        'Maintain consistent sleep and wake times',
        'Create a relaxing bedtime routine',
        'Limit screen time 1 hour before bed',
        'Keep your bedroom cool and dark'
      ],
      rating: 4.9,
      featured: true
    },
    {
      id: 3,
      title: 'Mindful Eating: Transform Your Relationship with Food',
      category: 'nutrition',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      excerpt: 'Learn how mindful eating can improve digestion, weight management, and overall satisfaction with meals.',
      content: 'Mindful eating involves paying full attention to the experience of eating and drinking. It helps you recognize hunger and satiety cues, leading to better portion control and food choices.',
      tips: [
        'Eat without distractions like TV or phones',
        'Chew slowly and savor each bite',
        'Pay attention to hunger and fullness cues',
        'Express gratitude for your food'
      ],
      rating: 4.7,
      featured: false
    },
    {
      id: 4,
      title: 'Stress Management: 5-Minute Daily Techniques',
      category: 'mental',
      readTime: '4 min read',
      image: 'https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=400',
      excerpt: 'Quick and effective stress management techniques you can practice anywhere.',
      content: 'Chronic stress affects every system in your body. These evidence-based techniques can help you manage stress levels and improve your overall health in just 5 minutes a day.',
      tips: [
        'Practice deep breathing exercises',
        'Try progressive muscle relaxation',
        'Use mindfulness meditation',
        'Write in a gratitude journal'
      ],
      rating: 4.6,
      featured: false
    },
    {
      id: 5,
      title: 'Hydration: More Than Just Water',
      category: 'prevention',
      readTime: '4 min read',
      image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=400',
      excerpt: 'Understanding proper hydration goes beyond drinking 8 glasses of water daily.',
      content: 'Proper hydration supports every bodily function, from temperature regulation to nutrient transport. Learn how to optimize your hydration for better health outcomes.',
      tips: [
        'Monitor urine color as a hydration indicator',
        'Include water-rich foods in your diet',
        'Adjust intake based on activity level',
        'Consider electrolyte balance, not just water'
      ],
      rating: 4.5,
      featured: false
    },
    {
      id: 6,
      title: 'Building Immunity Through Nutrition',
      category: 'prevention',
      readTime: '7 min read',
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
      excerpt: 'Discover foods and nutrients that naturally boost your immune system.',
      content: 'Your immune system is your body\'s defense against illness. Certain nutrients and foods can help strengthen your immune response and keep you healthier year-round.',
      tips: [
        'Include colorful fruits and vegetables',
        'Get adequate vitamin C, D, and zinc',
        'Consume probiotic-rich foods',
        'Maintain a balanced, varied diet'
      ],
      rating: 4.8,
      featured: true
    }
  ];

  const filteredTips = selectedCategory === 'all' 
    ? healthTips 
    : healthTips.filter(tip => tip.category === selectedCategory);

  const featuredTips = healthTips.filter(tip => tip.featured);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-4">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Health Tips & Articles</h2>
            <p className="text-gray-600 mt-2">Evidence-based health advice for better living</p>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Tips */}
      {selectedCategory === 'all' && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center mb-6">
            <Star className="w-6 h-6 text-amber-500 mr-3" />
            <h3 className="text-2xl font-bold text-gray-800">Featured Articles</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTips.map((tip) => (
              <div key={tip.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                      Featured
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-amber-500 mr-1" />
                      <span className="text-sm text-gray-600">{tip.rating}</span>
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">{tip.title}</h4>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{tip.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {tip.readTime}
                    </div>
                    <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Tips */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          {selectedCategory === 'all' ? 'All Health Tips' : `${categories.find(c => c.id === selectedCategory)?.name} Tips`}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTips.map((tip) => (
            <div key={tip.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      tip.category === 'nutrition' ? 'bg-green-100 text-green-700' :
                      tip.category === 'exercise' ? 'bg-blue-100 text-blue-700' :
                      tip.category === 'mental' ? 'bg-purple-100 text-purple-700' :
                      tip.category === 'sleep' ? 'bg-indigo-100 text-indigo-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {categories.find(c => c.id === tip.category)?.name}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-amber-500 mr-1" />
                      <span className="text-sm text-gray-600">{tip.rating}</span>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">{tip.title}</h4>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{tip.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {tip.readTime}
                    </div>
                    <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                      Read Article
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Tips Preview */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Quick Tips:</h5>
                <div className="space-y-1">
                  {tip.tips.slice(0, 2).map((quickTip, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                      {quickTip}
                    </div>
                  ))}
                  {tip.tips.length > 2 && (
                    <div className="text-sm text-blue-500 font-medium">
                      +{tip.tips.length - 2} more tips
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};