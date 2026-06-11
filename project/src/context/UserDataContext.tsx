import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { 
  profileApi, 
  symptomsApi, 
  appointmentsApi, 
  HealthProfile, 
  SymptomEntry, 
  Appointment 
} from '../services/api';

export type { HealthProfile, SymptomEntry, Appointment };

interface UserDataContextType {
  healthProfile: HealthProfile | null;
  symptomHistory: SymptomEntry[];
  appointments: Appointment[];
  updateHealthProfile: (profile: HealthProfile) => Promise<void>;
  addSymptomEntry: (entry: Omit<SymptomEntry, 'id'>) => Promise<void>;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => Promise<void>;
  updateAppointment: (id: string, updates: Partial<Appointment>) => Promise<void>;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};

interface UserDataProviderProps {
  children: ReactNode;
}

export const UserDataProvider: React.FC<UserDataProviderProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [healthProfile, setHealthProfile] = useState<HealthProfile | null>(null);
  const [symptomHistory, setSymptomHistory] = useState<SymptomEntry[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Fetch all user data from backend once authenticated
  useEffect(() => {
    const loadUserData = async () => {
      if (isAuthenticated) {
        try {
          const [profile, symptoms, apts] = await Promise.all([
            profileApi.getProfile(),
            symptomsApi.getSymptoms(),
            appointmentsApi.getAppointments()
          ]);
          setHealthProfile(profile);
          setSymptomHistory(symptoms);
          setAppointments(apts);
        } catch (err) {
          console.error('Failed to load user data from database:', err);
        }
      } else {
        // Clear state on logout
        setHealthProfile(null);
        setSymptomHistory([]);
        setAppointments([]);
      }
    };

    loadUserData();
  }, [isAuthenticated]);

  const updateHealthProfile = async (profile: HealthProfile) => {
    try {
      await profileApi.updateProfile(profile);
      setHealthProfile(profile);
    } catch (err) {
      console.error('Failed to save health profile:', err);
      throw err;
    }
  };

  const addSymptomEntry = async (entry: Omit<SymptomEntry, 'id'>) => {
    try {
      const savedEntry = await symptomsApi.addSymptom(entry);
      setSymptomHistory(prev => [savedEntry, ...prev]);
    } catch (err) {
      console.error('Failed to add symptom entry:', err);
      throw err;
    }
  };

  const addAppointment = async (appointment: Omit<Appointment, 'id'>) => {
    try {
      const savedApt = await appointmentsApi.addAppointment(appointment);
      setAppointments(prev => [savedApt, ...prev]);
    } catch (err) {
      console.error('Failed to add appointment:', err);
      throw err;
    }
  };

  const updateAppointment = async (id: string, updates: Partial<Appointment>) => {
    try {
      await appointmentsApi.updateAppointment(id, updates);
      setAppointments(prev => 
        prev.map(apt => apt.id === id ? { ...apt, ...updates } : apt)
      );
    } catch (err) {
      console.error('Failed to update appointment:', err);
      throw err;
    }
  };

  return (
    <UserDataContext.Provider value={{
      healthProfile,
      symptomHistory,
      appointments,
      updateHealthProfile,
      addSymptomEntry,
      addAppointment,
      updateAppointment
    }}>
      {children}
    </UserDataContext.Provider>
  );
};