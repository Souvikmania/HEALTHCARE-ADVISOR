import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface HealthProfile {
  age: string;
  gender: string;
  height: string;
  weight: string;
  bloodType: string;
  conditions: string[];
  allergies: string[];
  medications: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface SymptomEntry {
  id: string;
  date: string;
  symptoms: string[];
  severity: 'mild' | 'moderate' | 'severe';
  recommendation: string;
  status: 'resolved' | 'ongoing' | 'follow-up-needed';
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  specialty: string;
  type: 'consultation' | 'follow-up' | 'emergency' | 'routine';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

interface UserDataContextType {
  healthProfile: HealthProfile | null;
  symptomHistory: SymptomEntry[];
  appointments: Appointment[];
  updateHealthProfile: (profile: HealthProfile) => void;
  addSymptomEntry: (entry: Omit<SymptomEntry, 'id'>) => void;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
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
  const [healthProfile, setHealthProfile] = useState<HealthProfile | null>(null);
  const [symptomHistory, setSymptomHistory] = useState<SymptomEntry[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const updateHealthProfile = (profile: HealthProfile) => {
    setHealthProfile(profile);
  };

  const addSymptomEntry = (entry: Omit<SymptomEntry, 'id'>) => {
    const newEntry: SymptomEntry = {
      ...entry,
      id: Date.now().toString()
    };
    setSymptomHistory(prev => [newEntry, ...prev]);
  };

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString()
    };
    setAppointments(prev => [newAppointment, ...prev]);
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments(prev => 
      prev.map(apt => apt.id === id ? { ...apt, ...updates } : apt)
    );
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