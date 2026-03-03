import React, { useState } from 'react';
import { DashboardHeader } from '../components/DashboardHeader';
import { SymptomChecker } from '../components/SymptomChecker';
import { HealthHistory } from '../components/HealthHistory';
import { AppointmentsList } from '../components/AppointmentsList';
import { HealthProfile } from '../components/HealthProfile';
import { WelcomeSection } from '../components/WelcomeSection';

interface DashboardProps {
  onNavigate: (page: 'landing' | 'login' | 'dashboard') => void;
}

export type DashboardView = 'overview' | 'symptoms' | 'history' | 'appointments' | 'profile';

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [currentView, setCurrentView] = useState<DashboardView>('overview');

  const renderContent = () => {
    switch (currentView) {
      case 'overview':
        return (
          <div className="space-y-8">
            <WelcomeSection />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Symptom Check</h2>
                <SymptomChecker isCompact={true} />
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent History</h2>
                  <HealthHistory isCompact={true} />
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
                  <AppointmentsList isCompact={true} />
                </div>
              </div>
            </div>
          </div>
        );
      case 'symptoms':
        return <SymptomChecker />;
      case 'history':
        return <HealthHistory />;
      case 'appointments':
        return <AppointmentsList />;
      case 'profile':
        return <HealthProfile />;
      default:
        return <WelcomeSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        currentView={currentView} 
        onViewChange={setCurrentView}
        onNavigate={onNavigate}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};