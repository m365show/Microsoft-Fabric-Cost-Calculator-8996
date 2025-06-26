import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiServer, FiGlobe, FiSettings, FiDollarSign, FiChevronRight, FiChevronLeft, FiCheck, FiDownload, FiShare2, FiCopy } = FiIcons;

// Fallback pricing data in case import fails
const fallbackPricing = {
  capacity: {
    F2: 263,
    F4: 526,
    F8: 1052,
    F16: 2104,
    F32: 4208,
    F64: 8416,
    F128: 16832,
    F256: 33664,
    F512: 67328
  },
  workloads: {
    dataFactory: {
      name: 'Data Factory',
      baseRate: 0.50,
      unit: 'per pipeline run',
      description: 'ETL/ELT data integration and transformation pipelines'
    },
    synapse: {
      name: 'Synapse Analytics',
      baseRate: 2.00,
      unit: 'per compute hour',
      description: 'Data warehousing and big data analytics platform'
    },
    powerBI: {
      name: 'Power BI Premium',
      baseRate: 10.00,
      unit: 'per user per month',
      description: 'Advanced business intelligence and reporting capabilities'
    },
    dataActivator: {
      name: 'Data Activator',
      baseRate: 0.10,
      unit: 'per 1,000 events',
      description: 'Real-time data monitoring and automated alerting'
    },
    realTimeAnalytics: {
      name: 'Real-Time Analytics',
      baseRate: 1.50,
      unit: 'per processing hour',
      description: 'Stream processing and real-time data analytics'
    }
  }
};

const EmbedMultiStepCalculator = ({ darkMode = false }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [pricingData, setPricingData] = useState(fallbackPricing);
  const [config, setConfig] = useState({
    capacity: 'F2',
    region: 'us-east',
    workloads: {
      dataFactory: { enabled: false, usage: 0 },
      synapse: { enabled: false, usage: 0 },
      powerBI: { enabled: false, usage: 0 },
      dataActivator: { enabled: false, usage: 0 },
      realTimeAnalytics: { enabled: false, usage: 0 }
    }
  });

  // Load pricing data with fallback
  useEffect(() => {
    const loadPricingData = async () => {
      try {
        const { fabricPricing } = await import('../data/pricingData');
        if (fabricPricing && fabricPricing.capacity && fabricPricing.workloads) {
          setPricingData(fabricPricing);
        }
      } catch (error) {
        console.warn('Using fallback pricing data:', error);
        setPricingData(fallbackPricing);
      }
    };

    loadPricingData();
  }, []);

  // Initialize from URL parameters if available
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const capacityParam = urlParams.get('capacity');
      const regionParam = urlParams.get('region');
      const workloadsParam = urlParams.get('workloads');

      if (capacityParam || regionParam || workloadsParam) {
        setConfig(prev => ({
          ...prev,
          ...(capacityParam && { capacity: capacityParam }),
          ...(regionParam && { region: regionParam }),
          ...(workloadsParam && { 
            workloads: { 
              ...prev.workloads, 
              ...JSON.parse(workloadsParam) 
            } 
          })
        }));
      }
    } catch (error) {
      console.warn('Failed to parse URL parameters:', error);
    }
  }, []);

  const steps = [
    {
      id: 'capacity',
      title: 'Select Fabric Capacity',
      description: 'Choose your Microsoft Fabric capacity tier',
      icon: FiServer,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Select the capacity tier that matches your team size and data processing needs:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            {Object.entries(pricingData.capacity).map(([tier, price]) => (
              <motion.button
                key={tier}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setConfig({ ...config, capacity: tier })}
                className={`p-4 rounded-lg border text-left transition-all ${
                  config.capacity === tier
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : darkMode
                    ? 'border-gray-600 hover:border-gray-500'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-lg">{tier}</div>
                    <div className="text-sm text-gray-500">
                      {tier === 'F2' || tier === 'F4' ? 'Small Teams' :
                       tier === 'F8' || tier === 'F16' ? 'Medium Teams' : 'Enterprise'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">${price.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">per month</div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'region',
      title: 'Choose Region',
      description: 'Select your deployment region',
      icon: FiGlobe,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Choose the region closest to your users for optimal performance:
          </p>
          <div className="space-y-3">
            {[
              { value: 'us-east', label: 'US East (Virginia)', flag: '🇺🇸', multiplier: '1.0x', description: 'Lowest pricing' },
              { value: 'us-west', label: 'US West (California)', flag: '🇺🇸', multiplier: '1.0x', description: 'Base pricing' },
              { value: 'europe', label: 'Europe (West)', flag: '🇪🇺', multiplier: '1.1x', description: '+10% premium' },
              { value: 'asia', label: 'Asia Pacific', flag: '🌏', multiplier: '1.2x', description: '+20% premium' }
            ].map((region) => (
              <motion.button
                key={region.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setConfig({ ...config, region: region.value })}
                className={`w-full p-4 rounded-lg border text-left transition-all ${
                  config.region === region.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : darkMode
                    ? 'border-gray-600 hover:border-gray-500'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{region.flag}</span>
                    <div>
                      <div className="font-medium">{region.label}</div>
                      <div className="text-sm text-gray-500">{region.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-blue-600">{region.multiplier}</div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'workloads',
      title: 'Configure Workloads',
      description: 'Enable and configure your data workloads',
      icon: FiSettings,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Select and configure the workloads you need:
          </p>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {Object.entries(pricingData.workloads).map(([key, pricing]) => {
              const workload = config.workloads[key] || { enabled: false, usage: 0 };
              return (
                <div key={key} className={`p-4 rounded-lg border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
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
                        <div>
                          <span className="font-medium">{pricing.name}</span>
                          <div className="text-sm text-gray-500">${pricing.baseRate} {pricing.unit}</div>
                        </div>
                      </label>
                    </div>
                  </div>
                  {workload.enabled && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-3"
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
                        className={`w-full p-3 rounded border ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300'
                        }`}
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        {pricing.description}
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
      id: 'results',
      title: 'Your Cost Estimate',
      description: 'Review and share your results',
      icon: FiDollarSign,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              ${calculateTotalCost().toLocaleString()}
            </div>
            <div className="text-lg text-gray-600 dark:text-gray-400">
              Estimated monthly cost
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="space-y-3">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex justify-between items-center">
                <span className="font-medium">Capacity ({config.capacity})</span>
                <span className="text-lg font-bold text-blue-600">
                  ${getCapacityCost().toLocaleString()}
                </span>
              </div>
            </div>

            {Object.entries(config.workloads)
              .filter(([_, workload]) => workload.enabled && workload.usage > 0)
              .map(([key, workload]) => {
                const cost = calculateWorkloadCost(key, workload);
                const pricing = pricingData.workloads[key];
                return (
                  <div key={key} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{pricing.name}</span>
                        <div className="text-sm text-gray-500">
                          {workload.usage.toLocaleString()} {pricing.unit}
                        </div>
                      </div>
                      <span className="text-lg font-bold text-purple-600">
                        ${cost.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Export Options */}
          <div className="space-y-3">
            <h4 className="font-medium">Export & Share</h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={exportJSON}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                <SafeIcon icon={FiDownload} />
                <span>JSON</span>
              </button>
              <button
                onClick={shareResults}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <SafeIcon icon={FiShare2} />
                <span>Share</span>
              </button>
              <button
                onClick={copyEmbedCode}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-sm ${
                  copied ? 'bg-green-600 text-white' : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                <SafeIcon icon={copied ? FiCheck : FiCopy} />
                <span>{copied ? 'Copied!' : 'Embed Code'}</span>
              </button>
            </div>
          </div>
        </div>
      )
    }
  ];

  const calculateWorkloadCost = (key, workload) => {
    const pricing = pricingData.workloads[key];
    if (!pricing || !workload.enabled) return 0;

    const regionMultiplier = config.region === 'europe' ? 1.1 : config.region === 'asia' ? 1.2 : 1.0;
    return pricing.baseRate * workload.usage * regionMultiplier;
  };

  const getCapacityCost = () => {
    const regionMultiplier = config.region === 'europe' ? 1.1 : config.region === 'asia' ? 1.2 : 1.0;
    return pricingData.capacity[config.capacity] * regionMultiplier;
  };

  const calculateTotalCost = () => {
    const capacityCost = getCapacityCost();
    const workloadCosts = Object.entries(config.workloads)
      .reduce((sum, [key, workload]) => sum + calculateWorkloadCost(key, workload), 0);
    return capacityCost + workloadCosts;
  };

  const copyEmbedCode = async () => {
    const embedCode = `<iframe src="${window.location.href}" width="100%" height="700" frameborder="0" style="border-radius: 8px;box-shadow: 0 4px 12px rgba(0,0,0,0.1);"></iframe>`;
    
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy embed code:', error);
    }
  };

  const exportJSON = () => {
    const data = {
      configuration: config,
      costs: {
        capacity: getCapacityCost(),
        workloads: Object.entries(config.workloads)
          .filter(([_, workload]) => workload.enabled)
          .map(([key, workload]) => ({
            name: key,
            cost: calculateWorkloadCost(key, workload),
            usage: workload.usage
          })),
        total: calculateTotalCost()
      },
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fabric-cost-estimate-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareResults = async () => {
    const shareData = {
      title: 'Microsoft Fabric Cost Estimate',
      text: `My Microsoft Fabric estimate: $${calculateTotalCost().toLocaleString()}/month`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Share URL copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy URL:', error);
      }
    }
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
    <div className={`w-full min-h-screen flex items-center justify-center p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`w-full max-w-4xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-xl shadow-lg`}>
        {/* Header */}
        <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">
              Microsoft Fabric Cost Calculator
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {steps[currentStep].description}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(((currentStep + 1) / steps.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
                className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
              />
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
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

        {/* Content */}
        <div className="p-6" style={{ minHeight: '400px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                  <SafeIcon icon={steps[currentStep].icon} className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold">{steps[currentStep].title}</h3>
              </div>
              {steps[currentStep].content}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className={`p-6 border-t flex justify-between ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
              currentStep === 0
                ? 'opacity-50 cursor-not-allowed'
                : darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            <SafeIcon icon={FiChevronLeft} />
            <span>Previous</span>
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(0)}
              className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <SafeIcon icon={FiCheck} />
              <span>Start Over</span>
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span>Next</span>
              <SafeIcon icon={FiChevronRight} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmbedMultiStepCalculator;