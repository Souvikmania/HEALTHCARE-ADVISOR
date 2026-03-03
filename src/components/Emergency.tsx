import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Heart, 
  Activity,
  Shield,
  Navigation,
  Star
} from 'lucide-react';

export const Emergency: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  const emergencyContacts = [
    {
      name: 'Emergency Services',
      number: '911',
      type: 'Emergency',
      description: 'Life-threatening emergencies',
      color: 'bg-red-500'
    },
    {
      name: 'Poison Control',
      number: '1-800-222-1222',
      type: 'Poison',
      description: 'Poisoning emergencies',
      color: 'bg-orange-500'
    },
    {
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      type: 'Mental Health',
      description: 'Mental health crisis support',
      color: 'bg-blue-500'
    },
    {
      name: 'Dr. Sarah Wilson',
      number: '(555) 123-4567',
      type: 'Primary Care',
      description: 'Your primary care physician',
      color: 'bg-green-500'
    }
  ];

  const nearbyFacilities = [
    {
      name: 'City General Hospital',
      address: '123 Medical Center Dr',
      distance: '2.1 miles',
      type: 'Emergency Room',
      waitTime: '45 min',
      phone: '(555) 123-0001',
      rating: 4.5,
      specialties: ['Emergency Medicine', 'Trauma', 'Cardiology']
    },
    {
      name: 'Urgent Care Plus',
      address: '456 Health Way',
      distance: '1.3 miles',
      type: 'Urgent Care',
      waitTime: '15 min',
      phone: '(555) 123-0002',
      rating: 4.2,
      specialties: ['Urgent Care', 'Minor Injuries', 'X-Ray']
    },
    {
      name: 'MedExpress Clinic',
      address: '789 Care Blvd',
      distance: '3.5 miles',
      type: 'Walk-in Clinic',
      waitTime: '25 min',
      phone: '(555) 123-0003',
      rating: 4.0,
      specialties: ['Primary Care', 'Immunizations', 'Lab Tests']
    }
  ];

  const emergencyInfo = [
    {
      title: 'When to Call 911',
      icon: AlertTriangle,
      color: 'text-red-500',
      items: [
        'Chest pain or difficulty breathing',
        'Severe bleeding or head injury',
        'Loss of consciousness',
        'Severe allergic reactions',
        'Signs of stroke or heart attack'
      ]
    },
    {
      title: 'Heart Attack Signs',
      icon: Heart,
      color: 'text-red-500',
      items: [
        'Chest pain or pressure',
        'Pain in arms, neck, or jaw',
        'Shortness of breath',
        'Nausea or lightheadedness',
        'Cold sweats'
      ]
    },
    {
      title: 'Stroke Signs (FAST)',
      icon: Activity,
      color: 'text-orange-500',
      items: [
        'Face drooping on one side',
        'Arm weakness or numbness',
        'Speech difficulty or slurred',
        'Time to call 911 immediately'
      ]
    }
  ];

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Emergency Alert */}
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-8 h-8 text-red-500 mr-3" />
          <h2 className="text-2xl font-bold text-red-800">Emergency Resources</h2>
        </div>
        <div className="bg-red-100 rounded-lg p-4">
          <p className="text-red-800 font-semibold mb-2">
            If you are experiencing a life-threatening emergency, call 911 immediately!
          </p>
          <p className="text-red-700 text-sm">
            This page provides quick access to emergency contacts, nearby medical facilities, and important health emergency information.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Emergency Contacts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Phone className="w-6 h-6 mr-3 text-blue-500" />
              Emergency Contacts
            </h3>
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 ${contact.color} rounded-full flex items-center justify-center mr-4`}>
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{contact.name}</h4>
                    <p className="text-sm text-gray-600">{contact.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{contact.type}</p>
                  </div>
                  <a
                    href={`tel:${contact.number.replace(/\D/g, '')}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                  >
                    {contact.number}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Medical Facilities */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <MapPin className="w-6 h-6 mr-3 text-green-500" />
                Nearby Medical Facilities
              </h3>
              <button
                onClick={getCurrentLocation}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                <Navigation className="w-4 h-4 inline mr-2" />
                Use My Location
              </button>
            </div>
            
            <div className="space-y-4">
              {nearbyFacilities.map((facility, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{facility.name}</h4>
                      <p className="text-sm text-blue-600">{facility.type}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-amber-500 mr-1" />
                      <span className="text-sm text-gray-600">{facility.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{facility.address} • {facility.distance}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Est. wait time: {facility.waitTime}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {facility.specialties.map((specialty, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    <a
                      href={`tel:${facility.phone}`}
                      className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium flex-1 text-center"
                    >
                      Call Now
                    </a>
                    <button className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium flex-1">
                      Get Directions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Information */}
        <div className="space-y-6">
          {emergencyInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center mb-4">
                  <Icon className={`w-6 h-6 ${info.color} mr-3`} />
                  <h3 className="text-lg font-bold text-gray-800">{info.title}</h3>
                </div>
                <ul className="space-y-2">
                  {info.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-3 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <Shield className="w-6 h-6 mr-3 text-blue-500" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors font-semibold">
                <Phone className="w-5 h-5 inline mr-2" />
                Call 911
              </button>
              <button className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold">
                Share Location
              </button>
              <button className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
                Medical ID
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};