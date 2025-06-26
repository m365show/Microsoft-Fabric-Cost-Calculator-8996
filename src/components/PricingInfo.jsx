import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { fabricPricing } from '../data/pricingData';

const { FiInfo, FiDollarSign, FiTrendingUp, FiServer, FiZap } = FiIcons;

const PricingInfo = ({ darkMode }) => {
  const capacityTiers = Object.entries(fabricPricing.capacity).map(([tier, price]) => ({
    tier,
    price,
    features: fabricPricing.capacityFeatures[tier] || []
  }));

  const workloadPricing = Object.entries(fabricPricing.workloads).map(([key, pricing]) => ({
    key,
    ...pricing
  }));

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Microsoft Fabric Pricing
        </h1>
        <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Comprehensive pricing information for Microsoft Fabric services
        </p>
      </motion.div>

      {/* Capacity Pricing */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
          <SafeIcon icon={FiServer} className="text-blue-600" />
          <span>Fabric Capacity Tiers</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capacityTiers.map((tier, index) => (
            <motion.div
              key={tier.tier}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`rounded-xl p-6 shadow-lg ${
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{tier.tier}</h3>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">
                    ${tier.price.toLocaleString()}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    per month
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                {tier.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <SafeIcon icon={FiZap} className="text-green-500 text-sm" />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Workload Pricing */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
          <SafeIcon icon={FiTrendingUp} className="text-purple-600" />
          <span>Workload Pricing</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {workloadPricing.map((workload, index) => (
            <motion.div
              key={workload.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className={`rounded-xl p-6 shadow-lg ${
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold capitalize">
                  {workload.name}
                </h3>
                <div className="text-right">
                  <p className="text-xl font-bold text-purple-600">
                    ${workload.baseRate}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {workload.unit}
                  </p>
                </div>
              </div>
              
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                {workload.description}
              </p>
              
              {workload.tiers && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Pricing Tiers:</h4>
                  {workload.tiers.map((tier, idx) => (
                    <div key={idx} className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {tier.range}: ${tier.rate}/{workload.unit}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Pricing Notes */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={`rounded-xl p-6 ${
          darkMode ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'
        }`}
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <SafeIcon icon={FiInfo} className="text-blue-600" />
          <span>Important Pricing Notes</span>
        </h3>
        
        <div className="space-y-3 text-sm">
          <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
            • Prices shown are estimates and may vary by region and usage patterns
          </p>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
            • Fabric capacity provides shared compute resources across all workloads
          </p>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
            • Additional charges may apply for data storage and egress
          </p>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
            • Enterprise features and support may require additional licensing
          </p>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
            • Consult official Microsoft documentation for the most current pricing
          </p>
        </div>
      </motion.section>
    </div>
  );
};

export default PricingInfo;