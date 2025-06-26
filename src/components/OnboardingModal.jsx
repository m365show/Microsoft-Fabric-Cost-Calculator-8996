import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiX, FiChevronLeft, FiChevronRight, FiPlay, FiCheck, FiInfo, FiDollarSign, FiServer, FiTrendingUp } = FiIcons;

const OnboardingModal = ({ isOpen, onClose, darkMode }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Microsoft Fabric Cost Calculator",
      icon: FiPlay,
      content: (
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <SafeIcon icon={FiTrendingUp} className="text-white text-2xl" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Get Started in Minutes!</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This tool helps you estimate Microsoft Fabric costs based on your specific workloads and usage patterns. 
            Let's walk through how to use it effectively.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              💡 <strong>Pro Tip:</strong> Have your current data processing requirements ready for more accurate estimates.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Step 1: Choose Your Fabric Capacity",
      icon: FiServer,
      content: (
        <div>
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiServer} className="text-blue-600 text-xl" />
            </div>
            <h3 className="text-lg font-semibold mb-4">Understanding Fabric Capacity Tiers</h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium mb-2">What is Fabric Capacity?</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Think of capacity as the "engine size" of your data platform. It determines how much computing power you have available.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="bg-white dark:bg-gray-700 p-3 rounded border-l-4 border-green-500">
                  <strong>F2-F4:</strong> Small teams, basic analytics
                </div>
                <div className="bg-white dark:bg-gray-700 p-3 rounded border-l-4 border-blue-500">
                  <strong>F8-F16:</strong> Medium teams, regular reporting
                </div>
                <div className="bg-white dark:bg-gray-700 p-3 rounded border-l-4 border-purple-500">
                  <strong>F32+:</strong> Large teams, heavy data processing
                </div>
                <div className="bg-white dark:bg-gray-700 p-3 rounded border-l-4 border-orange-500">
                  <strong>F64+:</strong> Enterprise, mission-critical workloads
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                <strong>💰 Cost Impact:</strong> This is your biggest cost factor - choose based on your team size and data volume.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Step 2: Select Your Region",
      icon: FiInfo,
      content: (
        <div>
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiInfo} className="text-green-600 text-xl" />
            </div>
            <h3 className="text-lg font-semibold mb-4">Why Region Matters</h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Microsoft Fabric pricing varies by geographic region due to local infrastructure costs and regulations.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded">
                  <span className="font-medium">🇺🇸 US East/West</span>
                  <span className="text-green-600">Base pricing (1.0x)</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded">
                  <span className="font-medium">🇪🇺 Europe</span>
                  <span className="text-orange-600">+10% premium (1.1x)</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded">
                  <span className="font-medium">🌏 Asia Pacific</span>
                  <span className="text-red-600">+20% premium (1.2x)</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>💡 Tip:</strong> Choose the region closest to your users for better performance and potentially lower costs.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Step 3: Configure Your Workloads",
      icon: FiTrendingUp,
      content: (
        <div>
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiTrendingUp} className="text-purple-600 text-xl" />
            </div>
            <h3 className="text-lg font-semibold mb-4">Understanding Workloads</h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Workloads are the specific services you'll use. Only enable what you actually need:
              </p>
              
              <div className="space-y-4">
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h5 className="font-medium mb-2">📊 Data Factory</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    For moving and transforming data (ETL/ELT pipelines)
                  </p>
                  <div className="text-xs text-blue-600 dark:text-blue-400">
                    <strong>Usage Example:</strong> If you run 500 data pipelines per month, enter "500"
                  </div>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h5 className="font-medium mb-2">🏢 Synapse Analytics</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    For data warehousing and complex analytics
                  </p>
                  <div className="text-xs text-blue-600 dark:text-blue-400">
                    <strong>Usage Example:</strong> If you need 100 compute hours per month, enter "100"
                  </div>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h5 className="font-medium mb-2">📈 Power BI Premium</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    For business intelligence and reporting dashboards
                  </p>
                  <div className="text-xs text-blue-600 dark:text-blue-400">
                    <strong>Usage Example:</strong> If you have 25 users viewing reports, enter "25"
                  </div>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h5 className="font-medium mb-2">🔔 Data Activator</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    For real-time monitoring and automated alerts
                  </p>
                  <div className="text-xs text-blue-600 dark:text-blue-400">
                    <strong>Usage Example:</strong> If you process 1 million events per month, enter "1000" (in thousands)
                  </div>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h5 className="font-medium mb-2">⚡ Real-Time Analytics</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    For streaming data and real-time insights
                  </p>
                  <div className="text-xs text-blue-600 dark:text-blue-400">
                    <strong>Usage Example:</strong> If you need 50 processing hours per month, enter "50"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Step 4: Understanding Your Results",
      icon: FiDollarSign,
      content: (
        <div>
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiDollarSign} className="text-green-600 text-xl" />
            </div>
            <h3 className="text-lg font-semibold mb-4">Reading Your Cost Estimate</h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded text-center">
                  <div className="text-blue-600 font-semibold">Capacity Cost</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Fixed monthly fee</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded text-center">
                  <div className="text-purple-600 font-semibold">Workload Costs</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Usage-based fees</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded text-center">
                  <div className="text-green-600 font-semibold">Total Cost</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Your monthly estimate</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <strong>Capacity Cost:</strong> This is your base monthly fee, regardless of usage. It's like a monthly subscription.
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <strong>Workload Costs:</strong> These are additional charges based on how much you actually use each service.
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <strong>Export Options:</strong> Save your estimates as PDF reports or JSON data for sharing with your team.
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">🎯 Getting Accurate Estimates</h4>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• Start with your current data processing volumes</li>
                <li>• Consider seasonal peaks and growth plans</li>
                <li>• Use the comparison tool to evaluate different scenarios</li>
                <li>• Remember: these are estimates - actual costs may vary</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "You're All Set! 🎉",
      icon: FiCheck,
      content: (
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
            <SafeIcon icon={FiCheck} className="text-white text-2xl" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Ready to Calculate Costs!</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You now understand how to use the Microsoft Fabric Cost Calculator effectively. 
            Start by configuring your capacity and workloads to get your first estimate.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <SafeIcon icon={FiTrendingUp} className="text-blue-600 text-xl mx-auto mb-2" />
              <div className="text-sm font-medium">Calculator</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Get cost estimates</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <SafeIcon icon={FiInfo} className="text-purple-600 text-xl mx-auto mb-2" />
              <div className="text-sm font-medium">Pricing Info</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Detailed pricing breakdown</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <SafeIcon icon={FiTrendingUp} className="text-green-600 text-xl mx-auto mb-2" />
              <div className="text-sm font-medium">Compare</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Side-by-side scenarios</div>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Need help?</strong> Click the "Help" button in the header anytime to revisit this guide.
            </p>
          </div>
        </div>
      )
    }
  ];

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

  const closeModal = () => {
    setCurrentStep(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
        onClick={closeModal}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl ${
            darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
              }`}>
                <SafeIcon icon={steps[currentStep].icon} className="text-blue-600 text-lg" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{steps[currentStep].title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Step {currentStep + 1} of {steps.length}
                </p>
              </div>
            </div>
            
            <button
              onClick={closeModal}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <SafeIcon icon={FiX} className="text-xl" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 py-2">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
                className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-96">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {steps[currentStep].content}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentStep === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}
            >
              <SafeIcon icon={FiChevronLeft} />
              <span>Previous</span>
            </button>

            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep
                      ? 'bg-blue-600'
                      : darkMode
                        ? 'bg-gray-600'
                        : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {currentStep === steps.length - 1 ? (
              <button
                onClick={closeModal}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                <SafeIcon icon={FiCheck} />
                <span>Get Started</span>
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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OnboardingModal;