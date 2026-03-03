import React from 'react';
import { NavigationItem } from '../App';
import { 
  Heart, 
  Activity, 
  User, 
  FileText, 
  Calendar, 
  BookOpen, 
  Phone 
} from 'lucide-react';

interface HeaderProps {
  activeTab: NavigationItem;
  setActiveTab: (tab: NavigationItem) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard' as NavigationItem, label: 'Dashboard', icon: Heart },
    { id: 'symptoms' as NavigationItem, label: 'Symptoms', icon: Activity },
    { id: 'profile' as NavigationItem, label: 'Profile', icon: User },
    { id: 'history' as NavigationItem, label: 'History', icon: FileText },
    { id: 'appointments' as NavigationItem, label: 'Appointments', icon: Calendar },
    { id: 'tips' as NavigationItem, label: 'Health Tips', icon: BookOpen },
    { id: 'emergency' as NavigationItem, label: 'Emergency', icon: Phone }
  ];

  return (
    <header className="bg-white shadow-lg border-b-4 border-blue-500">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">HealthAdviser</h1>
          </div>
        </div>
        
        <nav className="pb-4">
          <div className="flex space-x-1 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                    activeTab === item.id
                      ? 'bg-blue-500 text-white shadow-md transform scale-105'
                      : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
};