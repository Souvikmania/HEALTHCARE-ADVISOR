import React, { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserDataProvider } from './context/UserDataContext';

import { FloatingChat } from './components/FloatingChat';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'dashboard'>('landing');

  const handleNavigate = (page: 'landing' | 'login' | 'dashboard') => {
    setCurrentPage(page);
  };

  // Move the authentication check to useEffect to avoid render issues
  useEffect(() => {
    if (!isAuthenticated && currentPage === 'dashboard') {
      setCurrentPage('login');
    }
  }, [isAuthenticated, currentPage]);

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