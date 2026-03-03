import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Plus, Video, Phone, Check, Activity, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Appointments: React.FC = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const upcomingAppointments = [
    {
      id: 1,
      date: '2025-01-15',
      time: '10:00 AM',
      duration: '30 min',
      doctor: 'Dr. Sarah Wilson',
      specialty: 'General Practice',
      type: 'In-Person',
      location: 'Medical Center - Room 205',
      reason: 'Annual Physical Exam'
    },
    {
      id: 2,
      date: '2025-01-22',
      time: '2:30 PM',
      duration: '45 min',
      doctor: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      type: 'Telemedicine',
      location: 'Video Call',
      reason: 'Follow-up Consultation'
    },
    {
      id: 3,
      date: '2025-02-05',
      time: '9:15 AM',
      duration: '20 min',
      doctor: 'Dr. Emily Rodriguez',
      specialty: 'Dermatology',
      type: 'In-Person',
      location: 'Skin Care Clinic - Suite 301',
      reason: 'Skin Check'
    }
  ];

  const pastAppointments = [
    {
      id: 4,
      date: '2024-12-20',
      time: '11:00 AM',
      doctor: 'Dr. Sarah Wilson',
      specialty: 'General Practice',
      reason: 'Flu Shot',
      status: 'Completed'
    },
    {
      id: 5,
      date: '2024-12-10',
      time: '3:00 PM',
      doctor: 'Dr. James Martinez',
      specialty: 'Orthopedics',
      reason: 'Knee Pain Consultation',
      status: 'Completed'
    }
  ];

  const availableTimes = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'
  ];

  const appointmentTypes = [
    { value: 'general', label: 'General Checkup' },
    { value: 'followup', label: 'Follow-up' },
    { value: 'consultation', label: 'Consultation' },
    { value: 'emergency', label: 'Urgent Care' }
  ];

  const handleBookAppointment = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);

      // Close modal after success animation
      setTimeout(() => {
        setShowSuccess(false);
        setShowBookingForm(false);
        setSelectedDate('');
        setSelectedTime('');
        setAppointmentType('');
      }, 2000);
    }, 1500);
  };

  const getAppointmentIcon = (type: string) => {
    switch (type) {
      case 'Telemedicine':
        return <Video className="w-4 h-4 text-blue-500" />;
      case 'Phone':
        return <Phone className="w-4 h-4 text-green-500" />;
      default:
        return <MapPin className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-4">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Appointments</h2>
          </div>
          <button
            onClick={() => setShowBookingForm(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Book Appointment
          </button>
        </div>

        {/* Booking Form Modal */}
        <AnimatePresence>
          {showBookingForm && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Book New Appointment</h3>
                  <button onClick={() => setShowBookingForm(false)} className="text-gray-400 hover:bg-gray-100 hover:text-gray-600 p-2 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {showSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center space-y-4 py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">Booking Confirmed!</h4>
                    <p className="text-gray-500 text-center">Your appointment has been successfully scheduled.</p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type</label>
                      <select
                        value={appointmentType}
                        onChange={(e) => setAppointmentType(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select type...</option>
                        {appointmentTypes.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select time...</option>
                        {availableTimes.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-8">
                      <button
                        onClick={handleBookAppointment}
                        disabled={!appointmentType || !selectedDate || !selectedTime || isSubmitting}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center h-12"
                      >
                        {isSubmitting ? <Activity className="w-5 h-5 animate-spin" /> : 'Confirm Booking'}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Appointments */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Upcoming Appointments</h3>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{appointment.doctor}</h4>
                      <p className="text-sm text-blue-600">{appointment.specialty}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Upcoming
                    </span>
                  </div>

                  <p className="text-gray-700 mb-3">{appointment.reason}</p>

                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {appointment.time} ({appointment.duration})
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    {getAppointmentIcon(appointment.type)}
                    <span className="ml-1">{appointment.location}</span>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                      Reschedule
                    </button>
                    <span className="text-gray-300">•</span>
                    <button className="text-red-500 hover:text-red-700 text-sm font-medium">
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Appointments */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent Appointments</h3>
            <div className="space-y-4">
              {pastAppointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{appointment.doctor}</h4>
                      <p className="text-sm text-blue-600">{appointment.specialty}</p>
                    </div>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                      {appointment.status}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-3">{appointment.reason}</p>

                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {appointment.time}
                    </div>
                  </div>

                  <div className="mt-4">
                    <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};