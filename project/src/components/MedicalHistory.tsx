import React, { useState } from 'react';
import { FileText, Calendar, Download, Plus, Search } from 'lucide-react';

export const MedicalHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const medicalRecords = [
    {
      id: 1,
      date: '2025-01-10',
      type: 'Lab Results',
      title: 'Complete Blood Count',
      doctor: 'Dr. Sarah Wilson',
      category: 'lab',
      status: 'Normal',
      description: 'Annual blood work showing all values within normal ranges'
    },
    {
      id: 2,
      date: '2025-01-05',
      type: 'Prescription',
      title: 'Blood Pressure Medication',
      doctor: 'Dr. Michael Chen',
      category: 'prescription',
      status: 'Active',
      description: 'Lisinopril 10mg daily for hypertension management'
    },
    {
      id: 3,
      date: '2024-12-20',
      type: 'Visit Report',
      title: 'Annual Physical Exam',
      doctor: 'Dr. Sarah Wilson',
      category: 'visit',
      status: 'Completed',
      description: 'Comprehensive physical examination with recommendations'
    },
    {
      id: 4,
      date: '2024-12-15',
      type: 'Imaging',
      title: 'Chest X-Ray',
      doctor: 'Dr. James Rodriguez',
      category: 'imaging',
      status: 'Normal',
      description: 'Chest X-ray for routine screening - no abnormalities found'
    },
    {
      id: 5,
      date: '2024-11-30',
      type: 'Lab Results',
      title: 'Lipid Panel',
      doctor: 'Dr. Sarah Wilson',
      category: 'lab',
      status: 'Needs Follow-up',
      description: 'Cholesterol levels slightly elevated - dietary changes recommended'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Records' },
    { value: 'lab', label: 'Lab Results' },
    { value: 'visit', label: 'Doctor Visits' },
    { value: 'prescription', label: 'Prescriptions' },
    { value: 'imaging', label: 'Imaging' }
  ];

  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || record.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'normal': return 'text-green-600 bg-green-100';
      case 'active': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      case 'needs follow-up': return 'text-amber-600 bg-amber-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Medical History</h2>
          </div>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            <Plus className="w-4 h-4 inline mr-2" />
            Add Record
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search medical records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Records List */}
        <div className="space-y-4">
          {filteredRecords.map((record) => (
            <div key={record.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{record.date}</span>
                  </div>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm font-medium text-blue-600">{record.type}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                    {record.status}
                  </span>
                </div>
                <button className="text-blue-500 hover:text-blue-700">
                  <Download className="w-5 h-5" />
                </button>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{record.title}</h3>
              <p className="text-gray-600 mb-3">{record.description}</p>
              
              <div className="flex items-center text-sm text-gray-500">
                <span>Provider: {record.doctor}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No records found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};