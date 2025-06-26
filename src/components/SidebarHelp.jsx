import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHelpCircle, FiX, FiServer, FiGlobe, FiSettings, FiDollarSign, FiInfo } = FiIcons;

const SidebarHelp = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const helpSections = [
    {
      id: 'capacity',
      title: 'Fabric Capacity',
      icon: FiServer,
      content: (
        <div className="space-y-3">
          <p className="text-sm">Choose your compute capacity tier:</p>
          <div className="space-y-2 text-xs">
            <div className="p-2 rounded bg-green-50 dark:bg-green-900/20 border-l-3 border-green-500">
              <strong>F2-F4:</strong> Small teams, basic analytics
            </div>
            <div className="p-2 rounded bg-blue-50 dark:bg-blue-900/20 border-l-3 border-blue-500">
              <strong>F8-F16:</strong> Medium teams, regular reporting
            </div>
            <div className="p-2 rounded bg-purple-50 dark:bg-purple-900/20 border-l-3 border-purple-500">
              <strong>F32+:</strong> Large teams, heavy processing
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'region',
      title: 'Region Selection',
      icon: FiGlobe,
      content: (
        <div className="space-y-3">
          <p className="text-sm">Pricing varies by region:</p>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>🇺🇸 US East/West</span>
              <span className="text-green-600">Base (1.0x)</span>
            </div>
            <div className="flex justify-between">
              <span>🇪🇺 Europe</span>
              <span className="text-orange-600">+10% (1.1x)</span>
            </div>
            <div className="flex justify-between">
              <span>🌏 Asia Pacific</span>
              <span className="text-red-600">+20% (1.2x)</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'workloads',
      title: 'Workloads',
      icon: FiSettings,
      content: (
        <div className="space-y-3">
          <p className="text-sm">Enable only what you need:</p>
          <div className="space-y-2 text-xs">
            <div>
              <strong>📊 Data Factory:</strong> ETL/ELT pipelines<br/>
              <em>Example: 500 pipelines/month</em>
            </div>
            <div>
              <strong>🏢 Synapse:</strong> Data warehousing<br/>
              <em>Example: 100 compute hours/month</em>
            </div>
            <div>
              <strong>📈 Power BI:</strong> Business intelligence<br/>
              <em>Example: 25 users</em>
            </div>
            <div>
              <strong>🔔 Data Activator:</strong> Real-time alerts<br/>
              <em>Example: 1000 (thousands of events)</em>
            </div>
            <div>
              <strong>⚡ Real-Time Analytics:</strong> Stream processing<br/>
              <em>Example: 50 processing hours/month</em>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'costs',
      title: 'Understanding Costs',
      icon: FiDollarSign,
      content: (
        <div className="space-y-3">
          <p className="text-sm">Your total cost includes:</p>
          <div className="space-y-2 text-xs">
            <div className="p-2 rounded bg-blue-50 dark:bg-blue-900/20">
              <strong>Capacity Cost:</strong> Fixed monthly fee for your chosen tier
            </div>
            <div className="p-2 rounded bg-purple-50 dark:bg-purple-900/20">
              <strong>Workload Costs:</strong> Usage-based charges for each service
            </div>
            <div className="p-2 rounded bg-green-50 dark:bg-green-900/20">
              <strong>Regional Multiplier:</strong> Applied to both capacity and workload costs
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'tips',
      title: 'Pro Tips',
      icon: FiInfo,
      content: (
        <div className="space-y-3">
          <p className="text-sm">Get accurate estimates:</p>
          <ul className="text-xs space-y-1 list-disc list-inside">
            <li>Start with current data volumes</li>
            <li>Consider seasonal peaks</li>
            <li>Plan for 20-30% growth</li>
            <li>Use comparison tool for scenarios</li>
            <li>Save estimates as PDF/JSON</li>
            <li>Share with your team for review</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <>
      {/* Help Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-40 p-3 rounded-full shadow-lg transition-colors duration-200 ${
          darkMode
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600'
        }`}
        title="Quick Help"
      >
        <SafeIcon icon={FiHelpCircle} className="text-xl" />
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed right-0 top-0 h-full w-80 md:w-96 z-50 shadow-2xl overflow-y-auto ${
                darkMode ? 'bg-gray-800 border-l border-gray-700' : 'bg-white border-l border-gray-200'
              }`}
            >
              {/* Header */}
              <div className={`sticky top-0 p-4 border-b ${
                darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
              }`}>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Quick Help</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <SafeIcon icon={FiX} className="text-xl" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-6">
                {helpSections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-4 rounded-lg ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 rounded-lg ${
                        darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
                      }`}>
                        <SafeIcon icon={section.icon} className="text-blue-600" />
                      </div>
                      <h3 className="font-medium">{section.title}</h3>
                    </div>
                    {section.content}
                  </motion.div>
                ))}

                {/* Contact */}
                <div className={`p-4 rounded-lg border ${
                  darkMode 
                    ? 'bg-blue-900/20 border-blue-700' 
                    : 'bg-blue-50 border-blue-200'
                }`}>
                  <h3 className="font-medium mb-2 text-blue-600">Need More Help?</h3>
                  <p className="text-sm mb-3">
                    This tool provides estimates based on Microsoft's published pricing. 
                    For exact quotes and enterprise pricing, consult Microsoft directly.
                  </p>
                  <a
                    href="https://linkedin.com/in/your-profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <SafeIcon icon={FiInfo} />
                    <span>Connect with the developer</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidebarHelp;