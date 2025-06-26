import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import WorkloadCard from './WorkloadCard';
import CostSummary from './CostSummary';
import { fabricPricing } from '../data/pricingData';

const { FiSettings, FiDollarSign, FiTrendingUp, FiInfo } = FiIcons;

const CostCalculator = ({ darkMode }) => {
  const [selectedCapacity, setSelectedCapacity] = useState('F2');
  const [workloads, setWorkloads] = useState({
    dataFactory: { enabled: false, usage: 0, unit: 'pipelines' },
    synapse: { enabled: false, usage: 0, unit: 'hours' },
    powerBI: { enabled: false, usage: 0, unit: 'users' },
    dataActivator: { enabled: false, usage: 0, unit: 'events' },
    realTimeAnalytics: { enabled: false, usage: 0, unit: 'hours' }
  });
  const [totalCost, setTotalCost] = useState(0);
  const [region, setRegion] = useState('us-east');

  const capacityOptions = Object.keys(fabricPricing.capacity);
  const regionOptions = [
    { value: 'us-east', label: 'US East', multiplier: 1.0 },
    { value: 'us-west', label: 'US West', multiplier: 1.0 },
    { value: 'europe', label: 'Europe', multiplier: 1.1 },
    { value: 'asia', label: 'Asia Pacific', multiplier: 1.2 }
  ];

  const workloadInfo = {
    dataFactory: {
      title: 'Data Factory',
      description: 'ETL/ELT pipelines and data integration',
      icon: FiSettings,
      unitLabel: 'Pipeline runs per month'
    },
    synapse: {
      title: 'Synapse Analytics',
      description: 'Data warehousing and big data analytics',
      icon: FiTrendingUp,
      unitLabel: 'Compute hours per month'
    },
    powerBI: {
      title: 'Power BI Premium',
      description: 'Business intelligence and reporting',
      icon: FiDollarSign,
      unitLabel: 'Active users'
    },
    dataActivator: {
      title: 'Data Activator',
      description: 'Real-time data monitoring and alerting',
      icon: FiInfo,
      unitLabel: 'Events per month (thousands)'
    },
    realTimeAnalytics: {
      title: 'Real-Time Analytics',
      description: 'Stream processing and real-time insights',
      icon: FiTrendingUp,
      unitLabel: 'Processing hours per month'
    }
  };

  useEffect(() => {
    calculateTotalCost();
  }, [selectedCapacity, workloads, region]);

  const calculateTotalCost = () => {
    const regionMultiplier = regionOptions.find(r => r.value === region)?.multiplier || 1.0;
    const capacityCost = fabricPricing.capacity[selectedCapacity] * regionMultiplier;
    
    let workloadCosts = 0;
    Object.entries(workloads).forEach(([key, workload]) => {
      if (workload.enabled && workload.usage > 0) {
        const pricing = fabricPricing.workloads[key];
        if (pricing) {
          workloadCosts += pricing.baseRate * workload.usage * regionMultiplier;
        }
      }
    });

    setTotalCost(capacityCost + workloadCosts);
  };

  const updateWorkload = (workloadKey, updates) => {
    setWorkloads(prev => ({
      ...prev,
      [workloadKey]: { ...prev[workloadKey], ...updates }
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Microsoft Fabric Cost Calculator
        </h1>
        <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Estimate your Microsoft Fabric costs across different workloads and capacity tiers
        </p>
      </motion.div>

      {/* Configuration Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`rounded-2xl p-6 shadow-lg ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}
      >
        <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
          <SafeIcon icon={FiSettings} className="text-blue-600" />
          <span>Configuration</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Capacity Selection */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Fabric Capacity
            </label>
            <select
              value={selectedCapacity}
              onChange={(e) => setSelectedCapacity(e.target.value)}
              className={`w-full p-3 rounded-lg border transition-colors duration-200 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            >
              {capacityOptions.map((capacity) => (
                <option key={capacity} value={capacity}>
                  {capacity} - ${fabricPricing.capacity[capacity]}/month
                </option>
              ))}
            </select>
          </div>

          {/* Region Selection */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Region
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className={`w-full p-3 rounded-lg border transition-colors duration-200 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            >
              {regionOptions.map((region) => (
                <option key={region.value} value={region.value}>
                  {region.label} {region.multiplier !== 1.0 && `(${region.multiplier}x)`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Workload Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(workloadInfo).map(([key, info], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            <WorkloadCard
              workloadKey={key}
              workload={workloads[key]}
              info={info}
              darkMode={darkMode}
              onUpdate={updateWorkload}
            />
          </motion.div>
        ))}
      </div>

      {/* Cost Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <CostSummary
          totalCost={totalCost}
          selectedCapacity={selectedCapacity}
          workloads={workloads}
          region={region}
          darkMode={darkMode}
        />
      </motion.div>
    </div>
  );
};

export default CostCalculator;