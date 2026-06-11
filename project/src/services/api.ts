const API_BASE_URL = 'http://localhost:5000/api';

// Token Management helpers
export const setAuthToken = (token: string) => {
  localStorage.setItem('health_advisor_token', token);
};

export const getAuthToken = () => {
  return localStorage.getItem('health_advisor_token');
};

export const removeAuthToken = () => {
  localStorage.removeItem('health_advisor_token');
};

// Generic fetch wrapper with auth header injection
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  if (options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

// Authentication API
export const authApi = {
  async register(name: string, email: string, password: string) {
    const data = await apiRequest<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    setAuthToken(data.token);
    return data.user;
  },

  async login(email: string, password: string) {
    const data = await apiRequest<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setAuthToken(data.token);
    return data.user;
  },

  async getMe() {
    return apiRequest<any>('/auth/me');
  },
};

// Health Profile API
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

export const profileApi = {
  async getProfile() {
    return apiRequest<HealthProfile | null>('/profile');
  },

  async updateProfile(profile: HealthProfile) {
    return apiRequest<{ message: string }>('/profile', {
      method: 'PUT',
      body: JSON.stringify(profile),
    });
  },
};

// Symptom Checker API
export interface SymptomEntry {
  id: string;
  date: string;
  symptoms: string[];
  severity: 'mild' | 'moderate' | 'severe';
  recommendation: string;
  status: 'resolved' | 'ongoing' | 'follow-up-needed';
}

export const symptomsApi = {
  async getSymptoms() {
    return apiRequest<SymptomEntry[]>('/symptoms');
  },

  async addSymptom(entry: Omit<SymptomEntry, 'id'>) {
    return apiRequest<SymptomEntry>('/symptoms', {
      method: 'POST',
      body: JSON.stringify(entry),
    });
  },
};

// Appointments API
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

export const appointmentsApi = {
  async getAppointments() {
    return apiRequest<Appointment[]>('/appointments');
  },

  async addAppointment(appointment: Omit<Appointment, 'id'>) {
    return apiRequest<Appointment>('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointment),
    });
  },

  async updateAppointment(id: string, updates: Partial<Appointment>) {
    return apiRequest<{ message: string }>(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },
};

// AI Chatbot API
export const chatApi = {
  async sendMessage(message: string, history: Array<{ text: string; sender: 'user' | 'bot' }>) {
    return apiRequest<{ reply: string }>('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, history }),
    });
  },
};
