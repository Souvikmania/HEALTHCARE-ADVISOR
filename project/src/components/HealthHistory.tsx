import React from 'react';
import { Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useUserData } from '../context/UserDataContext';

interface HealthHistoryProps {
  isCompact?: boolean;
}

export const HealthHistory: React.FC<HealthHistoryProps> = ({ isCompact = false }) => {
  const { symptomHistory } = useUserData();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'ongoing':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'follow-up-needed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe':
        return 'text-red-600 bg-red-100';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-100';
      case 'mild':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (symptomHistory.length === 0) {
    return (
      <div className={`${isCompact ? '' : 'bg-white rounded-xl shadow-lg p-8'}`}>
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No Health History Yet</h3>
          <p className="text-gray-500">
            Your symptom checks and health assessments will appear here.
          </p>
        </div>
      </div>
    );
  }

  const displayHistory = isCompact ? symptomHistory.slice(0, 3) : symptomHistory;

  return (
    <div className={`${isCompact ? '' : 'bg-white rounded-xl shadow-lg p-8'}`}>
      {!isCompact && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Health History</h2>
          <p className="text-gray-600">Track your symptoms and health assessments over time</p>
        </div>
      )}

      <div className="space-y-4">
        {displayHistory.map((entry) => (
          <div key={entry.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{entry.date}</span>
                {getStatusIcon(entry.status)}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(entry.severity)}`}>
                  {entry.severity}
                </span>
              </div>
            </div>
            
            <div className="mb-3">
              <h4 className="font-medium text-gray-800 mb-2">Symptoms:</h4>
              <div className="flex flex-wrap gap-1">
                {entry.symptoms.map((symptom, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {symptom}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-1">Recommendation:</h4>
              <p className="text-gray-600 text-sm">{entry.recommendation}</p>
            </div>
          </div>
        ))}
      </div>

      {isCompact && symptomHistory.length > 3 && (
        <div className="mt-4 text-center">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All History ({symptomHistory.length} entries)
          </button>
        </div>
      )}
    </div>
  );
};