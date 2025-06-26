import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { fabricPricing } from '../data/pricingData';

const { FiDollarSign, FiChevronRight, FiChevronLeft, FiCheck } = FiIcons;

const EmbedCompactCalculator = ({ darkMode }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [config, setConfig] = useState({
    capacity: 'F2',
    region: 'us-east',
    workloads: {}
  });

  const steps = [
    {
      title: 'Select Capacity',
      key: 'capacity',
      content: (
        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Choose your Microsoft Fabric capacity tier:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(fabricPricing.capacity).slice(0, 6).map(([tier, price]) => (
              <motion.button
                key={tier}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setConfig({ ...config, capacity: tier })}
                className={`p-3 rounded-lg border text-left transition-all ${
                  config.capacity === tier
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : darkMode
                      ? 'border-gray-600 hover:border-gray-500'
                      : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="font-medium text-sm">{tier}</div>
                <div className="text-xs text-gray-500">${price}/month</div>
              </motion.button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'Choose Region',
      key: 'region',
      content: (
        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Select your deployment region:
          </p>
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
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : darkMode
                      ? 'border-gray-600 hover:border-gray-500'
                      : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">{region.label}</span>
                  <span className="text-xs text-gray-500">{region.multiplier}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'Configure Workloads',
      key: 'workloads',
      content: (
        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enable and configure your workloads:
          </p>
          <div className="space-y-3">
            {Object.entries(fabricPricing.workloads).map(([key, pricing]) => {
              const workload = config.workloads[key] || { enabled: false, usage: 0 };
              const displayName = pricing.name;
              return (
                <div
                  key={key}
                  className={`p-3 rounded-lg border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={workload.enabled}
                        onChange={(e) => setConfig({
                          ...config,
                          workloads: {
                            ...config.workloads,
                            [key]: { ...workload, enabled: e.target.checked }
                          }
                        })}
                        className="rounded"
                      />
                      <span className="text-sm font-medium">{displayName}</span>
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
                        onChange={(e) => setConfig({
                          ...config,
                          workloads: {
                            ...config.workloads,
                            [key]: { ...workload, usage: parseFloat(e.target.value) || 0 }
                          }
                        })}
                        placeholder={`Enter usage (${pricing.unit})`}
                        className={`w-full p-2 text-sm rounded border ${
                          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                        }`}
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        ${pricing.baseRate} {pricing.unit}
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )
    },
    {
      title: 'Your Estimate',
      key: 'result',
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              ${calculateTotalCost().toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Estimated monthly cost
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Capacity ({config.capacity})</span>
              <span>${getCapacityCost().toLocaleString()}</span>
            </div>
            {Object.entries(config.workloads)
              .filter(([_, workload]) => workload.enabled && workload.usage > 0)
              .map(([key, workload]) => {
                const cost = calculateWorkloadCost(key, workload);
                const displayName = fabricPricing.workloads[key]?.name || key;
                return (
                  <div key={key} className="flex justify-between text-sm">
                    <span>{displayName}</span>
                    <span>${cost.toLocaleString()}</span>
                  </div>
                );
              })}
          </div>
          <div className={`p-3 rounded-lg text-center ${
            darkMode ? 'bg-green-900/20' : 'bg-green-50'
          }`}>
            <div className="text-sm text-green-700 dark:text-green-300">
              ✅ Your estimate is ready!
            </div>
          </div>
        </div>
      )
    }
  ];

  const calculateWorkloadCost = (key, workload) => {
    const pricing = fabricPricing.workloads[key];
    if (!pricing || !workload.enabled) return 0;
    const regionMultiplier = config.region === 'europe' ? 1.1 : config.region === 'asia' ? 1.2 : 1.0;
    return pricing.baseRate * workload.usage * regionMultiplier;
  };

  const getCapacityCost = () => {
    const regionMultiplier = config.region === 'europe' ? 1.1 : config.region === 'asia' ? 1.2 : 1.0;
    return fabricPricing.capacity[config.capacity] * regionMultiplier;
  };

  const calculateTotalCost = () => {
    const capacityCost = getCapacityCost();
    const workloadCosts = Object.entries(config.workloads)
      .reduce((sum, [key, workload]) => sum + calculateWorkloadCost(key, workload), 0);
    return capacityCost + workloadCosts;
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className={`max-w-md mx-auto ${
      darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    } rounded-xl shadow-lg overflow-hidden`}>
      {/* Header */}
      <div className={`p-4 border-b ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
        <h2 className="text-lg font-semibold text-center">
          Microsoft Fabric Cost Estimator
        </h2>
        <div className="flex justify-center mt-2">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep
                    ? 'bg-blue-600'
                    : index < currentStep
                      ? 'bg-green-600'
                      : darkMode
                        ? 'bg-gray-600'
                        : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4" style={{ minHeight: '300px' }}>
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-medium mb-4">{steps[currentStep].title}</h3>
          {steps[currentStep].content}
        </motion.div>
      </div>

      {/* Navigation */}
      <div className={`p-4 border-t flex justify-between ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            currentStep === 0
              ? 'opacity-50 cursor-not-allowed'
              : darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
          }`}
        >
          <SafeIcon icon={FiChevronLeft} />
          <span>Back</span>
        </button>

        {currentStep === steps.length - 1 ? (
          <button
            onClick={() => setCurrentStep(0)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <SafeIcon icon={FiCheck} />
            <span>Start Over</span>
          </button>
        ) : (
          <button
            onClick={nextStep}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>Next</span>
            <SafeIcon icon={FiChevronRight} />
          </button>
        )}
      </div>
    </div>
  );
};

export default EmbedCompactCalculator;