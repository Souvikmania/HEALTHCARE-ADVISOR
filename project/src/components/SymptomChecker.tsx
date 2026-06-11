import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Clock, Plus, X, Activity } from 'lucide-react';
import { useUserData } from '../context/UserDataContext';
import { motion, AnimatePresence } from 'framer-motion';
interface SymptomCheckerProps {
  isCompact?: boolean;
}

export const SymptomChecker: React.FC<SymptomCheckerProps> = ({ isCompact = false }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [customSymptom, setCustomSymptom] = useState('');
  const [severity, setSeverity] = useState<'mild' | 'moderate' | 'severe'>('mild');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const { addSymptomEntry } = useUserData();

  const commonSymptoms = [
    'Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea', 'Dizziness',
    'Chest Pain', 'Shortness of Breath', 'Sore Throat', 'Body Aches'
  ];

  const addSymptom = (symptom: string) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const removeSymptom = (symptom: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
  };

  const addCustomSymptom = () => {
    if (customSymptom.trim() && !selectedSymptoms.includes(customSymptom.trim())) {
      setSelectedSymptoms([...selectedSymptoms, customSymptom.trim()]);
      setCustomSymptom('');
    }
  };

  const analyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0) return;

    setIsAnalyzing(true);

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));

    const hasEmergencySymptoms = selectedSymptoms.some(s =>
      ['Chest Pain', 'Shortness of Breath', 'Severe Headache'].includes(s)
    );

    const recommendation = hasEmergencySymptoms
      ? 'Seek immediate medical attention'
      : severity === 'severe'
        ? 'Consult a healthcare provider within 24 hours'
        : 'Monitor symptoms and consider self-care measures';

    const analysisResults = {
      urgency: hasEmergencySymptoms ? 'emergency' : severity === 'severe' ? 'high' : 'low',
      recommendation,
      possibleCauses: hasEmergencySymptoms
        ? ['Cardiac event', 'Respiratory emergency']
        : ['Common cold', 'Viral infection', 'Stress'],
      nextSteps: hasEmergencySymptoms
        ? ['Call 911', 'Go to emergency room']
        : ['Rest', 'Stay hydrated', 'Monitor symptoms']
    };

    setResults(analysisResults);
    setIsAnalyzing(false);

    // Save to history
    addSymptomEntry({
      date: new Date().toISOString().split('T')[0],
      symptoms: selectedSymptoms,
      severity,
      recommendation,
      status: 'ongoing'
    });
  };

  if (isCompact) {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {commonSymptoms.slice(0, 6).map(symptom => (
            <button
              key={symptom}
              onClick={() => addSymptom(symptom)}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
            >
              {symptom}
            </button>
          ))}
        </div>

        {selectedSymptoms.length > 0 && (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map(symptom => (
                <span key={symptom} className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm flex items-center">
                  {symptom}
                  <button onClick={() => removeSymptom(symptom)} className="ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <button
              onClick={analyzeSymptoms}
              disabled={isAnalyzing}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-80 flex justify-center items-center"
            >
              {isAnalyzing ? (
                <>
                  <Activity className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Symptoms'
              )}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI-Powered Symptom Checker</h2>
        <p className="text-gray-600">
          Select your symptoms to receive personalized health recommendations
        </p>
      </div>

      {/* Symptom Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Common Symptoms</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {commonSymptoms.map(symptom => (
            <motion.button
              key={symptom}
              whileTap={{ scale: 0.95 }}
              onClick={() => addSymptom(symptom)}
              disabled={selectedSymptoms.includes(symptom)}
              className={`p-3 rounded-lg border text-sm font-medium transition-colors ${selectedSymptoms.includes(symptom)
                ? 'bg-blue-100 border-blue-300 text-blue-700 cursor-not-allowed'
                : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                }`}
            >
              {symptom}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Custom Symptom Input */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Custom Symptom</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={customSymptom}
            onChange={(e) => setCustomSymptom(e.target.value)}
            placeholder="Describe your symptom..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && addCustomSymptom()}
          />
          <button
            onClick={addCustomSymptom}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Selected Symptoms */}
      {selectedSymptoms.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Selected Symptoms</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedSymptoms.map(symptom => (
              <span key={symptom} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm flex items-center">
                {symptom}
                <button onClick={() => removeSymptom(symptom)} className="ml-2">
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>

          {/* Severity Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Severity Level</label>
            <div className="flex gap-4">
              {(['mild', 'moderate', 'severe'] as const).map(level => (
                <label key={level} className="flex items-center">
                  <input
                    type="radio"
                    name="severity"
                    value={level}
                    checked={severity === level}
                    onChange={(e) => setSeverity(e.target.value as any)}
                    className="mr-2"
                  />
                  <span className={`capitalize ${level === 'severe' ? 'text-red-600' :
                    level === 'moderate' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                    {level}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={analyzeSymptoms}
            disabled={isAnalyzing}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-80 flex justify-center items-center w-full sm:w-auto"
          >
            {isAnalyzing ? (
              <>
                <Activity className="w-5 h-5 mr-2 animate-spin" />
                Analyzing Symptoms...
              </>
            ) : (
              'Get AI Analysis'
            )}
          </button>
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-6 rounded-lg border-l-4 ${results.urgency === 'emergency' ? 'bg-red-50 border-red-400' :
              results.urgency === 'high' ? 'bg-yellow-50 border-yellow-400' :
                'bg-green-50 border-green-400'
              }`}
          >
            <div className="flex items-center mb-4">
              {results.urgency === 'emergency' && <AlertCircle className="w-6 h-6 text-red-500 mr-3" />}
              {results.urgency === 'high' && <Clock className="w-6 h-6 text-yellow-500 mr-3" />}
              {results.urgency === 'low' && <CheckCircle className="w-6 h-6 text-green-500 mr-3" />}
              <h3 className="text-xl font-bold text-gray-800">Analysis Results</h3>
            </div>

            <p className="text-gray-700 mb-4 font-medium">{results.recommendation}</p>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Possible Causes:</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {results.possibleCauses.map((cause: string, index: number) => (
                    <li key={index}>{cause}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Next Steps:</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {results.nextSteps.map((step: string, index: number) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};