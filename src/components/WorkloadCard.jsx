import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import HelpTooltip from './HelpTooltip';

const WorkloadCard = ({ workloadKey, workload, info, darkMode, onUpdate }) => {
  const getHelpContent = (workloadKey) => {
    const helpContent = {
      dataFactory: (
        <div>
          <strong>Data Factory Help:</strong>
          <p className="mt-1 mb-2">Used for ETL/ELT data pipelines and integration.</p>
          <div className="text-xs">
            <strong>Examples:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Daily data imports: 30 pipelines/month</li>
              <li>• Hourly sync processes: 720 pipelines/month</li>
              <li>• Weekly reports: 4 pipelines/month</li>
            </ul>
          </div>
        </div>
      ),
      synapse: (
        <div>
          <strong>Synapse Analytics Help:</strong>
          <p className="mt-1 mb-2">Data warehousing and complex analytics platform.</p>
          <div className="text-xs">
            <strong>Usage examples:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Small team: 50-100 hours/month</li>
              <li>• Medium team: 200-500 hours/month</li>
              <li>• Large team: 1000+ hours/month</li>
            </ul>
          </div>
        </div>
      ),
      powerBI: (
        <div>
          <strong>Power BI Premium Help:</strong>
          <p className="mt-1 mb-2">Business intelligence and reporting dashboards.</p>
          <div className="text-xs">
            <strong>User count examples:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Small team: 5-25 users</li>
              <li>• Department: 25-100 users</li>
              <li>• Company-wide: 100+ users</li>
            </ul>
          </div>
        </div>
      ),
      dataActivator: (
        <div>
          <strong>Data Activator Help:</strong>
          <p className="mt-1 mb-2">Real-time monitoring and automated alerts.</p>
          <div className="text-xs">
            <strong>Event volume examples:</strong>
            <ul className="mt-1 space-y-1">
              <li>• IoT sensors: 100-1000k events/month</li>
              <li>• Web analytics: 500-5000k events/month</li>
              <li>• System logs: 1000-10000k events/month</li>
            </ul>
          </div>
        </div>
      ),
      realTimeAnalytics: (
        <div>
          <strong>Real-Time Analytics Help:</strong>
          <p className="mt-1 mb-2">Stream processing and real-time insights.</p>
          <div className="text-xs">
            <strong>Processing hours examples:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Continuous monitoring: 720 hours/month</li>
              <li>• Business hours only: 160 hours/month</li>
              <li>• Peak periods: 50-200 hours/month</li>
            </ul>
          </div>
        </div>
      )
    };

    return helpContent[workloadKey] || <span>No help available for this workload.</span>;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`rounded-xl p-6 shadow-lg transition-all duration-300 ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      } ${workload.enabled ? 'ring-2 ring-blue-500/20' : ''}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            workload.enabled 
              ? 'bg-blue-100 text-blue-600' 
              : darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
          }`}>
            <SafeIcon icon={info.icon} className="text-lg" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-lg">{info.title}</h3>
              <HelpTooltip 
                content={getHelpContent(workloadKey)}
                darkMode={darkMode}
                position="top"
              />
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {info.description}
            </p>
          </div>
        </div>
        
        <motion.label
          whileTap={{ scale: 0.95 }}
          className="relative inline-flex items-center cursor-pointer"
        >
          <input
            type="checkbox"
            checked={workload.enabled}
            onChange={(e) => onUpdate(workloadKey, { enabled: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </motion.label>
      </div>

      {workload.enabled && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <label className={`block text-sm font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {info.unitLabel}
              </label>
              <HelpTooltip 
                content={
                  <div>
                    <strong>Usage Guidelines:</strong>
                    <p className="mt-1 text-xs">
                      Enter your expected monthly usage. If unsure, start with a conservative estimate 
                      and adjust based on actual usage patterns.
                    </p>
                  </div>
                }
                darkMode={darkMode}
                position="right"
              />
            </div>
            <input
              type="number"
              min="0"
              value={workload.usage}
              onChange={(e) => onUpdate(workloadKey, { usage: parseFloat(e.target.value) || 0 })}
              className={`w-full p-3 rounded-lg border transition-colors duration-200 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              placeholder="Enter usage amount"
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default WorkloadCard;