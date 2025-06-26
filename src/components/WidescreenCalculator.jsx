import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { fabricPricing } from '../data/pricingData';

const { FiDollarSign, FiServer, FiGlobe, FiSettings, FiCheck } = FiIcons;

const WidescreenCalculator = ({ darkMode }) => {
  const [config, setConfig] = useState({
    capacity: 'F2',
    region: 'us-east',
    workloads: {
      dataFactory: { enabled: false, usage: 0 },
      synapse: { enabled: false, usage: 0 },
      powerBI: { enabled: false, usage: 0 }
    }
  });

  const calculateTotalCost = () => {
    const regionMultiplier = config.region === 'europe' ? 1.1 : 
                            config.region === 'asia' ? 1.2 : 1.0;
    
    const capacityCost = fabricPricing.capacity[config.capacity] * regionMultiplier;
    
    const workloadCosts = Object.entries(config.workloads)
      .filter(([_, workload]) => workload.enabled && workload.usage > 0)
      .reduce((sum, [key, workload]) => {
        const pricing = fabricPricing.workloads[key];
        return sum + (pricing ? pricing.baseRate * workload.usage * regionMultiplier : 0);
      }, 0);

    return capacityCost + workloadCosts;
  };

  const updateWorkload = (key, updates) => {
    setConfig(prev => ({
      ...prev,
      workloads: {
        ...prev.workloads,
        [key]: { ...prev.workloads[key], ...updates }
      }
    }));
  };

  return (
    <div className={`w-full h-full flex flex-col ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <div className={`px-6 py-4 border-b ${
        darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Microsoft Fabric Cost Calculator
            </h1>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Quick cost estimation tool
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">
              ${calculateTotalCost().toLocaleString()}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Monthly estimate
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - 16:9 Layout */}
      <div className="flex-1 flex">
        {/* Left Panel - Configuration */}
        <div className={`w-2/3 p-6 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Capacity Selection */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <SafeIcon icon={FiServer} className="text-blue-600" />
                <h3 className="text-lg font-semibold">Capacity</h3>
              </div>
              
              <div className="space-y-2">
                {Object.entries(fabricPricing.capacity).slice(0, 6).map(([tier, price]) => (
                  <motion.button
                    key={tier}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setConfig({ ...config, capacity: tier })}
                    className={`w-full p-3 rounded-lg border text-left transition-all ${
                      config.capacity === tier
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : darkMode
                          ? 'border-gray-600 hover:border-gray-500'
                          : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-medium">{tier}</div>
                    <div className="text-sm text-gray-500">${price}/month</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Region Selection */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <SafeIcon icon={FiGlobe} className="text-purple-600" />
                <h3 className="text-lg font-semibold">Region</h3>
              </div>
              
              <div className="space-y-2">
                {[
                  { value: 'us-east', label: 'US East', multiplier: '1.0x' },
                  { value: 'us-west', label: 'US West', multiplier: '1.0x' },
                  { value: 'europe', label: 'Europe', multiplier: '1.1x' },
                  { value: 'asia', label: 'Asia Pacific', multiplier: '1.2x' }
                ].map((region) => (
                  <motion.button
                    key={region.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setConfig({ ...config, region: region.value })}
                    className={`w-full p-3 rounded-lg border text-left transition-all ${
                      config.region === region.value
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : darkMode
                          ? 'border-gray-600 hover:border-gray-500'
                          : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{region.label}</span>
                      <span className="text-sm text-gray-500">{region.multiplier}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Workloads */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <SafeIcon icon={FiSettings} className="text-green-600" />
                <h3 className="text-lg font-semibold">Workloads</h3>
              </div>
              
              <div className="space-y-3">
                {Object.entries(fabricPricing.workloads).slice(0, 3).map(([key, pricing]) => {
                  const workload = config.workloads[key] || { enabled: false, usage: 0 };
                  
                  return (
                    <div key={key} className={`p-3 rounded-lg border ${
                      darkMode ? 'border-gray-600' : 'border-gray-300'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={workload.enabled}
                            onChange={(e) => updateWorkload(key, { enabled: e.target.checked })}
                            className="rounded"
                          />
                          <span className="text-sm font-medium">{pricing.name}</span>
                        </label>
                      </div>
                      
                      {workload.enabled && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                        >
                          <input
                            type="number"
                            min="0"
                            value={workload.usage}
                            onChange={(e) => updateWorkload(key, { usage: parseFloat(e.target.value) || 0 })}
                            placeholder="Usage"
                            className={`w-full p-2 text-sm rounded border ${
                              darkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300'
                            }`}
                          />
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Cost Summary */}
        <div className={`w-1/3 p-6 border-l ${
          darkMode 
            ? 'bg-gray-700 border-gray-600' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center space-x-2 mb-6">
            <SafeIcon icon={FiDollarSign} className="text-green-600" />
            <h3 className="text-lg font-semibold">Cost Breakdown</h3>
          </div>

          <div className="space-y-4">
            {/* Capacity Cost */}
            <div className={`p-4 rounded-lg ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Capacity ({config.capacity})</span>
                <span className="text-lg font-bold text-blue-600">
                  ${(fabricPricing.capacity[config.capacity] * 
                     (config.region === 'europe' ? 1.1 : config.region === 'asia' ? 1.2 : 1.0)
                   ).toLocaleString()}
                </span>
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Base monthly cost
              </div>
            </div>

            {/* Workload Costs */}
            {Object.entries(config.workloads)
              .filter(([_, workload]) => workload.enabled && workload.usage > 0)
              .map(([key, workload]) => {
                const pricing = fabricPricing.workloads[key];
                const regionMultiplier = config.region === 'europe' ? 1.1 : 
                                        config.region === 'asia' ? 1.2 : 1.0;
                const cost = pricing ? pricing.baseRate * workload.usage * regionMultiplier : 0;
                
                return (
                  <div key={key} className={`p-4 rounded-lg ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{pricing.name}</span>
                      <span className="text-lg font-bold text-purple-600">
                        ${cost.toLocaleString()}
                      </span>
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {workload.usage} {pricing.unit}
                    </div>
                  </div>
                );
              })}

            {/* Total */}
            <div className={`p-4 rounded-lg border-2 border-green-500 ${
              darkMode ? 'bg-green-900/20' : 'bg-green-50'
            }`}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">Total Cost</span>
                <span className="text-2xl font-bold text-green-600">
                  ${calculateTotalCost().toLocaleString()}
                </span>
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Estimated monthly cost
              </div>
            </div>

            {/* Success Message */}
            <div className={`p-3 rounded-lg text-center ${
              darkMode ? 'bg-blue-900/20' : 'bg-blue-50'
            }`}>
              <div className="flex items-center justify-center space-x-2 text-blue-600">
                <SafeIcon icon={FiCheck} />
                <span className="text-sm font-medium">Estimate Ready!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidescreenCalculator;