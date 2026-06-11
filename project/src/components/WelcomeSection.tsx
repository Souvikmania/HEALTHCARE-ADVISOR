import React from 'react';
import { Heart, TrendingUp, Shield, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useUserData } from '../context/UserDataContext';

export const WelcomeSection: React.FC = () => {
  const { user } = useAuth();
  const { healthProfile, symptomHistory, appointments } = useUserData();

  const stats = [
    {
      label: 'Health Checks',
      value: symptomHistory.length.toString(),
      icon: Heart,
      color: 'text-red-500 bg-red-100'
    },
    {
      label: 'Appointments',
      value: appointments.length.toString(),
      icon: Clock,
      color: 'text-blue-500 bg-blue-100'
    },
    {
      label: 'Profile Complete',
      value: healthProfile ? '100%' : '0%',
      icon: Shield,
      color: 'text-green-500 bg-green-100'
    },
    {
      label: 'Health Score',
      value: healthProfile ? '85' : '--',
      icon: TrendingUp,
      color: 'text-purple-500 bg-purple-100'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-blue-100 text-lg">
            Here's your health overview for today
          </p>
        </div>
        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <Heart className="w-8 h-8 text-white" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white bg-opacity-10 rounded-lg p-4">
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-blue-100 text-sm">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {!healthProfile && (
        <div className="mt-6 bg-white bg-opacity-10 rounded-lg p-4">
          <p className="text-blue-100 mb-2">
            Complete your health profile to get personalized recommendations
          </p>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            Complete Profile
          </button>
        </div>
      )}
    </div>
  );
};