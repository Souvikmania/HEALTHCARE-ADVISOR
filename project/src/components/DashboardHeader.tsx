import React from 'react';
import { 
  Heart, 
  Activity, 
  FileText, 
  Calendar, 
  User, 
  LogOut,
  Home
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DashboardView } from '../pages/Dashboard';
import { Logo } from './Logo';

interface DashboardHeaderProps {
  currentView: DashboardView;
  onViewChange: (view: DashboardView) => void;
  onNavigate: (page: 'landing' | 'login' | 'dashboard') => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  currentView, 
  onViewChange, 
  onNavigate 
}) => {
  const { user, logout } = useAuth();

  const navigationItems = [
    { id: 'overview' as DashboardView, label: 'Overview', icon: Home },
    { id: 'symptoms' as DashboardView, label: 'Symptom Checker', icon: Activity },
    { id: 'history' as DashboardView, label: 'Health History', icon: FileText },
    { id: 'appointments' as DashboardView, label: 'Appointments', icon: Calendar },
    { id: 'profile' as DashboardView, label: 'Profile', icon: User }
  ];

  const handleLogout = () => {
    logout();
    onNavigate('landing');
  };

  return (
    <header className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('landing')}>
            <Logo iconClassName="w-9 h-9" textClassName="text-xl" />
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
        
        <nav className="pb-4">
          <div className="flex space-x-1 overflow-x-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                    currentView === item.id
                      ? 'bg-blue-600 text-white shadow-md'
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