import React from 'react';
import { 
  Heart, 
  Activity, 
  Calendar, 
  AlertTriangle,
  TrendingUp,
  Shield,
  Thermometer,
  Scale
} from 'lucide-react';

interface UserProfile {
  name: string;
  age: string;
  gender: string;
  conditions: string[];
  allergies: string[];
  medications: string[];
}

interface DashboardProps {
  userProfile: UserProfile;
}

export const Dashboard: React.FC<DashboardProps> = ({ userProfile }) => {
  const healthMetrics = [
    { label: 'Heart Rate', value: '72 BPM', icon: Heart, color: 'text-red-500', status: 'Normal' },
    { label: 'Blood Pressure', value: '120/80', icon: Activity, color: 'text-blue-500', status: 'Optimal' },
    { label: 'Temperature', value: '98.6°F', icon: Thermometer, color: 'text-orange-500', status: 'Normal' },
    { label: 'BMI', value: '22.5', icon: Scale, color: 'text-green-500', status: 'Healthy' }
  ];

  const upcomingAppointments = [
    { date: '2025-01-15', time: '10:00 AM', doctor: 'Dr. Sarah Wilson', type: 'General Checkup' },
    { date: '2025-01-22', time: '2:30 PM', doctor: 'Dr. Michael Chen', type: 'Cardiology' }
  ];

  const healthAlerts = [
    { type: 'medication', message: 'Take your blood pressure medication', time: 'Due in 2 hours' },
    { type: 'appointment', message: 'Annual physical exam reminder', time: 'Schedule within 30 days' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome back{userProfile.name ? `, ${userProfile.name}` : ''}!
            </h2>
            <p className="text-gray-600 text-lg">Here's your health overview for today</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 ${metric.color}`} />
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {metric.status}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{metric.value}</h3>
              <p className="text-gray-600 text-sm">{metric.label}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Health Alerts */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <AlertTriangle className="w-6 h-6 text-amber-500 mr-3" />
            <h3 className="text-xl font-bold text-gray-800">Health Alerts & Reminders</h3>
          </div>
          <div className="space-y-4">
            {healthAlerts.map((alert, index) => (
              <div key={index} className="flex items-center p-4 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{alert.message}</p>
                  <p className="text-sm text-gray-600">{alert.time}</p>
                </div>
                <button className="text-amber-600 hover:text-amber-800 font-medium text-sm">
                  Action
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <Calendar className="w-6 h-6 text-blue-500 mr-3" />
            <h3 className="text-xl font-bold text-gray-800">Upcoming</h3>
          </div>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment, index) => (
              <div key={index} className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <p className="font-medium text-gray-800">{appointment.type}</p>
                <p className="text-sm text-gray-600">{appointment.doctor}</p>
                <p className="text-sm text-blue-600 font-medium">
                  {appointment.date} at {appointment.time}
                </p>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
            View All Appointments
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Check Symptoms', icon: Activity, color: 'bg-red-500' },
            { label: 'Schedule Appointment', icon: Calendar, color: 'bg-blue-500' },
            { label: 'View Health Tips', icon: TrendingUp, color: 'bg-green-500' },
            { label: 'Emergency Help', icon: AlertTriangle, color: 'bg-amber-500' }
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <button key={index} className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};