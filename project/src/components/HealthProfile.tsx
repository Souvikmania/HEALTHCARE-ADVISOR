import React, { useState } from 'react';
import { User, Save, Plus, X, Heart } from 'lucide-react';
import { useUserData, HealthProfile as HealthProfileType } from '../context/UserDataContext';

export const HealthProfile: React.FC = () => {
  const { healthProfile, updateHealthProfile } = useUserData();
  const [isEditing, setIsEditing] = useState(!healthProfile);
  const [formData, setFormData] = useState<HealthProfileType>(
    healthProfile || {
      age: '',
      gender: '',
      height: '',
      weight: '',
      bloodType: '',
      conditions: [],
      allergies: [],
      medications: [],
      emergencyContact: {
        name: '',
        phone: '',
        relationship: ''
      }
    }
  );

  const [newCondition, setNewCondition] = useState('');
  const [newAllergy, setNewAllergy] = useState('');
  const [newMedication, setNewMedication] = useState('');

  const handleSave = () => {
    updateHealthProfile(formData);
    setIsEditing(false);
  };

  const addItem = (type: 'conditions' | 'allergies' | 'medications', value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [type]: [...prev[type], value.trim()]
      }));
      if (type === 'conditions') setNewCondition('');
      if (type === 'allergies') setNewAllergy('');
      if (type === 'medications') setNewMedication('');
    }
  };

  const removeItem = (type: 'conditions' | 'allergies' | 'medications', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const calculateBMI = () => {
    if (formData.height && formData.weight) {
      const heightInM = parseFloat(formData.height) / 100;
      const weightInKg = parseFloat(formData.weight);
      const bmi = weightInKg / (heightInM * heightInM);
      return bmi.toFixed(1);
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mr-4">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Health Profile</h2>
            <p className="text-gray-600">Manage your personal health information</p>
          </div>
        </div>
        
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Profile
          </button>
        ) : (
          <div className="space-x-3">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="w-4 h-4 inline mr-2" />
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setFormData(healthProfile || formData);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Basic Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Basic Information</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="25"
                />
              ) : (
                <p className="text-gray-800 py-2 px-3 bg-gray-50 rounded-lg">
                  {formData.age || 'Not provided'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              {isEditing ? (
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <p className="text-gray-800 py-2 px-3 bg-gray-50 rounded-lg">
                  {formData.gender || 'Not provided'}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="170"
                />
              ) : (
                <p className="text-gray-800 py-2 px-3 bg-gray-50 rounded-lg">
                  {formData.height ? `${formData.height} cm` : 'Not provided'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="70"
                />
              ) : (
                <p className="text-gray-800 py-2 px-3 bg-gray-50 rounded-lg">
                  {formData.weight ? `${formData.weight} kg` : 'Not provided'}
                </p>
              )}
            </div>
          </div>

          {/* BMI Display */}
          {calculateBMI() && (
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center">
                <Heart className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-blue-800 font-medium">BMI: {calculateBMI()}</span>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
            {isEditing ? (
              <select
                value={formData.bloodType}
                onChange={(e) => setFormData(prev => ({ ...prev, bloodType: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            ) : (
              <p className="text-gray-800 py-2 px-3 bg-gray-50 rounded-lg">
                {formData.bloodType || 'Not provided'}
              </p>
            )}
          </div>
        </div>

        {/* Medical Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Medical Information</h3>

          {/* Medical Conditions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
            <div className="space-y-2">
              {formData.conditions.map((condition, index) => (
                <div key={index} className="flex items-center justify-between bg-red-50 px-3 py-2 rounded-lg">
                  <span className="text-red-800">{condition}</span>
                  {isEditing && (
                    <button
                      onClick={() => removeItem('conditions', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    placeholder="Add medical condition"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => addItem('conditions', newCondition)}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Allergies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
            <div className="space-y-2">
              {formData.allergies.map((allergy, index) => (
                <div key={index} className="flex items-center justify-between bg-yellow-50 px-3 py-2 rounded-lg">
                  <span className="text-yellow-800">{allergy}</span>
                  {isEditing && (
                    <button
                      onClick={() => removeItem('allergies', index)}
                      className="text-yellow-500 hover:text-yellow-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    placeholder="Add allergy"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => addItem('allergies', newAllergy)}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Medications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
            <div className="space-y-2">
              {formData.medications.map((medication, index) => (
                <div key={index} className="flex items-center justify-between bg-green-50 px-3 py-2 rounded-lg">
                  <span className="text-green-800">{medication}</span>
                  {isEditing && (
                    <button
                      onClick={() => removeItem('medications', index)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMedication}
                    onChange={(e) => setNewMedication(e.target.value)}
                    placeholder="Add medication"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => addItem('medications', newMedication)}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Emergency Contact</label>
            <div className="space-y-3">
              <input
                type="text"
                value={formData.emergencyContact.name}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  emergencyContact: { ...prev.emergencyContact, name: e.target.value }
                }))}
                placeholder="Contact Name"
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
              <input
                type="tel"
                value={formData.emergencyContact.phone}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  emergencyContact: { ...prev.emergencyContact, phone: e.target.value }
                }))}
                placeholder="Phone Number"
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
              <input
                type="text"
                value={formData.emergencyContact.relationship}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  emergencyContact: { ...prev.emergencyContact, relationship: e.target.value }
                }))}
                placeholder="Relationship"
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};