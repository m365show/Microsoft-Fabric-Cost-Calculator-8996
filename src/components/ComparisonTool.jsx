import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { generatePDF } from '../utils/pdfExport';

const { FiBarChart3, FiPlus, FiTrash2, FiCopy, FiFileText } = FiIcons;

const ComparisonTool = ({ darkMode }) => {
  const [scenarios, setScenarios] = useState([
    {
      id: 1,
      name: 'Current Setup',
      capacity: 'F2',
      region: 'us-east',
      workloads: {
        dataFactory: { enabled: true, usage: 100 },
        powerBI: { enabled: true, usage: 50 }
      }
    },
    {
      id: 2,
      name: 'Scaled Setup',
      capacity: 'F4',
      region: 'us-east',
      workloads: {
        dataFactory: { enabled: true, usage: 200 },
        powerBI: { enabled: true, usage: 100 },
        synapse: { enabled: true, usage: 50 }
      }
    }
  ]);

  const capacityPricing = {
    F2: 263,
    F4: 526,
    F8: 1052,
    F16: 2104,
    F32: 4208,
    F64: 8416
  };

  const workloadPricing = {
    dataFactory: 0.5,
    synapse: 2.0,
    powerBI: 10.0,
    dataActivator: 0.1,
    realTimeAnalytics: 1.5
  };

  const calculateScenarioCost = (scenario) => {
    const regionMultiplier = scenario.region === 'europe' ? 1.1 : scenario.region === 'asia' ? 1.2 : 1.0;
    const capacityCost = capacityPricing[scenario.capacity] * regionMultiplier;
    
    const workloadCost = Object.entries(scenario.workloads || {})
      .filter(([_, workload]) => workload.enabled)
      .reduce((sum, [key, workload]) => {
        const rate = workloadPricing[key] || 0;
        return sum + (rate * workload.usage * regionMultiplier);
      }, 0);

    return capacityCost + workloadCost;
  };

  const addScenario = () => {
    const newId = Math.max(...scenarios.map(s => s.id)) + 1;
    setScenarios([...scenarios, {
      id: newId,
      name: `Scenario ${newId}`,
      capacity: 'F2',
      region: 'us-east',
      workloads: {}
    }]);
  };

  const removeScenario = (id) => {
    setScenarios(scenarios.filter(s => s.id !== id));
  };

  const duplicateScenario = (scenario) => {
    const newId = Math.max(...scenarios.map(s => s.id)) + 1;
    setScenarios([...scenarios, {
      ...scenario,
      id: newId,
      name: `${scenario.name} (Copy)`
    }]);
  };

  const updateScenario = (id, updates) => {
    setScenarios(scenarios.map(s => 
      s.id === id ? { ...s, ...updates } : s
    ));
  };

  const exportComparisonPDF = async () => {
    try {
      await generatePDF('comparison-container', `fabric-comparison-${new Date().toISOString().split('T')[0]}.pdf`, { darkMode });
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <div id="comparison-container" className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Cost Comparison Tool
        </h1>
        <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Compare different Microsoft Fabric configurations side by side
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex justify-center space-x-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addScenario}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <SafeIcon icon={FiPlus} />
          <span>Add Scenario</span>
        </motion.button>
        
        {scenarios.length > 1 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exportComparisonPDF}
            className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            <SafeIcon icon={FiFileText} />
            <span>Export PDF</span>
          </motion.button>
        )}
      </motion.div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {scenarios.map((scenario, index) => (
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            className={`rounded-xl p-6 shadow-lg ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            }`}
          >
            {/* Scenario Header */}
            <div className="flex items-center justify-between mb-4">
              <input
                type="text"
                value={scenario.name}
                onChange={(e) => updateScenario(scenario.id, { name: e.target.value })}
                className={`font-semibold text-lg bg-transparent border-none outline-none ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              />
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => duplicateScenario(scenario)}
                  className={`p-2 rounded-lg ${
                    darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <SafeIcon icon={FiCopy} />
                </motion.button>
                {scenarios.length > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeScenario(scenario.id)}
                    className="p-2 rounded-lg hover:bg-red-100 text-red-600"
                  >
                    <SafeIcon icon={FiTrash2} />
                  </motion.button>
                )}
              </div>
            </div>

            {/* Configuration */}
            <div className="space-y-4 mb-6">
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Capacity
                </label>
                <select
                  value={scenario.capacity}
                  onChange={(e) => updateScenario(scenario.id, { capacity: e.target.value })}
                  className={`w-full p-2 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {Object.keys(capacityPricing).map(capacity => (
                    <option key={capacity} value={capacity}>
                      {capacity} - ${capacityPricing[capacity]}/month
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Region
                </label>
                <select
                  value={scenario.region}
                  onChange={(e) => updateScenario(scenario.id, { region: e.target.value })}
                  className={`w-full p-2 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="us-east">US East</option>
                  <option value="us-west">US West</option>
                  <option value="europe">Europe (+10%)</option>
                  <option value="asia">Asia Pacific (+20%)</option>
                </select>
              </div>
            </div>

            {/* Cost Display */}
            <div className={`p-4 rounded-lg ${
              darkMode ? 'bg-gray-700' : 'bg-blue-50'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-medium">Total Monthly Cost</span>
                <span className="text-2xl font-bold text-blue-600">
                  ${calculateScenarioCost(scenario).toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison Chart */}
      {scenarios.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={`rounded-xl p-6 shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}
        >
          <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
            <SafeIcon icon={FiBarChart3} className="text-green-600" />
            <span>Cost Comparison</span>
          </h3>

          <div className="space-y-4">
            {scenarios.map((scenario) => {
              const cost = calculateScenarioCost(scenario);
              const maxCost = Math.max(...scenarios.map(s => calculateScenarioCost(s)));
              const percentage = (cost / maxCost) * 100;

              return (
                <div key={scenario.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{scenario.name}</span>
                    <span className="text-lg font-semibold">
                      ${cost.toLocaleString()}
                    </span>
                  </div>
                  <div className={`w-full h-3 rounded-full ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ComparisonTool;