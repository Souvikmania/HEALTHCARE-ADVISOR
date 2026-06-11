import React, { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserDataProvider } from './context/UserDataContext';

import { FloatingChat } from './components/FloatingChat';

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'dashboard'>('landing');

  const handleNavigate = (page: 'landing' | 'login' | 'dashboard') => {
    setCurrentPage(page);
  };

  // Move the authentication check to useEffect to avoid render issues
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated && currentPage === 'dashboard') {
        setCurrentPage('login');
      } else if (isAuthenticated && currentPage === 'login') {
        setCurrentPage('dashboard');
      }
    }
  }, [isAuthenticated, isLoading, currentPage]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="text-gray-500 font-medium animate-pulse">Loading Health Advisor...</p>
        </div>
      </div>
    );
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'dashboard':
        return isAuthenticated ? <Dashboard onNavigate={handleNavigate} /> : <LoginPage onNavigate={handleNavigate} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden relative">
      {renderCurrentPage()}
      <FloatingChat />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <UserDataProvider>
        <AppContent />
      </UserDataProvider>
    </AuthProvider>
  );
}

export default App;