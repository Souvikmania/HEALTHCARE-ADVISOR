import React, { useState } from 'react';
import { Calendar, Clock, Plus, User, Phone } from 'lucide-react';
import { useUserData } from '../context/UserDataContext';

interface AppointmentsListProps {
  isCompact?: boolean;
}

export const AppointmentsList: React.FC<AppointmentsListProps> = ({ isCompact = false }) => {
  const { appointments, addAppointment } = useUserData();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    doctor: '',
    specialty: '',
    type: 'consultation' as const,
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAppointment({
      ...formData,
      status: 'scheduled'
    });
    setFormData({
      date: '',
      time: '',
      doctor: '',
      specialty: '',
      type: 'consultation',
      notes: ''
    });
    setShowBookingForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'text-blue-600 bg-blue-100';
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'emergency':
        return 'text-red-600 bg-red-100';
      case 'follow-up':
        return 'text-yellow-600 bg-yellow-100';
      case 'routine':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  if (appointments.length === 0 && !showBookingForm) {
    return (
      <div className={`${isCompact ? '' : 'bg-white rounded-xl shadow-lg p-8'}`}>
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No Appointments Scheduled</h3>
          <p className="text-gray-500 mb-4">
            Book your first appointment to get started with professional healthcare.
          </p>
          {!isCompact && (
            <button
              onClick={() => setShowBookingForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Book Appointment
            </button>
          )}
        </div>
      </div>
    );
  }

  const displayAppointments = isCompact ? appointments.slice(0, 2) : appointments;

  return (
    <div className={`${isCompact ? '' : 'bg-white rounded-xl shadow-lg p-8'}`}>
      {!isCompact && (
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointments</h2>
            <p className="text-gray-600">Manage your healthcare appointments</p>
          </div>
          <button
            onClick={() => setShowBookingForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Book New
          </button>
        </div>
      )}

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Book New Appointment</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Name</label>
                <input
                  type="text"
                  value={formData.doctor}
                  onChange={(e) => setFormData(prev => ({ ...prev, doctor: e.target.value }))}
                  placeholder="Dr. Smith"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                <input
                  type="text"
                  value={formData.specialty}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialty: e.target.value }))}
                  placeholder="General Practice"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="consultation">Consultation</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="routine">Routine Check</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional notes..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Book Appointment
                </button>
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Appointments List */}
      <div className="space-y-4">
        {displayAppointments.map((appointment) => (
          <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-800 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {appointment.doctor}
                </h4>
                <p className="text-sm text-blue-600">{appointment.specialty}</p>
              </div>
              <div className="flex space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                  {appointment.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(appointment.type)}`}>
                  {appointment.type}
                </span>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 space-x-4 mb-2">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {appointment.date}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {appointment.time}
              </div>
            </div>
            
            {appointment.notes && (
              <p className="text-sm text-gray-600 mt-2">{appointment.notes}</p>
            )}
            
            {appointment.status === 'scheduled' && (
              <div className="flex space-x-2 mt-3">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Reschedule
                </button>
                <span className="text-gray-300">•</span>
                <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isCompact && appointments.length > 2 && (
        <div className="mt-4 text-center">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All Appointments ({appointments.length} total)
          </button>
        </div>
      )}
    </div>
  );
};