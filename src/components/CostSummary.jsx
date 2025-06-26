import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { fabricPricing } from '../data/pricingData';
import { generateCostReportPDF, generatePDF } from '../utils/pdfExport';

const { FiDollarSign, FiTrendingUp, FiPieChart, FiDownload, FiFileText } = FiIcons;

const CostSummary = ({ totalCost, selectedCapacity, workloads, region, darkMode }) => {
  const regionMultiplier = {
    'us-east': 1.0,
    'us-west': 1.0,
    'europe': 1.1,
    'asia': 1.2
  }[region] || 1.0;

  const capacityCost = fabricPricing.capacity[selectedCapacity] * regionMultiplier;

  const workloadCosts = Object.entries(workloads)
    .filter(([_, workload]) => workload.enabled && workload.usage > 0)
    .map(([key, workload]) => {
      const pricing = fabricPricing.workloads[key];
      const cost = pricing ? pricing.baseRate * workload.usage * regionMultiplier : 0;
      return {
        name: key,
        cost,
        usage: workload.usage
      };
    });

  const totalWorkloadCost = workloadCosts.reduce((sum, w) => sum + w.cost, 0);

  const exportJSON = () => {
    const data = {
      capacity: selectedCapacity,
      region,
      capacityCost,
      workloads: workloadCosts,
      totalCost,
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

  const exportPDF = async () => {
    try {
      const data = {
        capacity: selectedCapacity,
        region,
        capacityCost,
        workloads: workloadCosts,
        totalCost,
        timestamp: new Date().toISOString()
      };
      await generateCostReportPDF(data, darkMode);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      // Fallback to HTML-to-PDF conversion
      try {
        await generatePDF(
          'cost-summary-container',
          `fabric-cost-estimate-${new Date().toISOString().split('T')[0]}.pdf`,
          { darkMode }
        );
      } catch (fallbackError) {
        console.error('PDF generation failed:', fallbackError);
        alert('Failed to generate PDF. Please try again.');
      }
    }
  };

  return (
    <motion.div
      id="cost-summary-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl p-4 md:p-8 shadow-xl ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
        <h2 className="text-xl md:text-2xl font-bold flex items-center space-x-2">
          <SafeIcon icon={FiPieChart} className="text-green-600" />
          <span>Cost Summary</span>
        </h2>
        
        <div className="flex flex-wrap items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exportJSON}
            className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm"
          >
            <SafeIcon icon={FiDownload} />
            <span>JSON</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exportPDF}
            className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
          >
            <SafeIcon icon={FiFileText} />
            <span>Export PDF</span>
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-4 md:p-6 rounded-xl ${
            darkMode ? 'bg-gray-700' : 'bg-blue-50'
          }`}
        >
          <div className="flex items-center space-x-3 mb-2">
            <SafeIcon icon={FiDollarSign} className="text-blue-600 text-lg md:text-xl" />
            <span className="font-medium text-sm md:text-base">Capacity Cost</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-blue-600">
            ${capacityCost.toLocaleString()}
          </p>
          <p className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {selectedCapacity} per month
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-4 md:p-6 rounded-xl ${
            darkMode ? 'bg-gray-700' : 'bg-purple-50'
          }`}
        >
          <div className="flex items-center space-x-3 mb-2">
            <SafeIcon icon={FiTrendingUp} className="text-purple-600 text-lg md:text-xl" />
            <span className="font-medium text-sm md:text-base">Workload Costs</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-purple-600">
            ${totalWorkloadCost.toLocaleString()}
          </p>
          <p className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Additional usage costs
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-4 md:p-6 rounded-xl ${
            darkMode ? 'bg-gray-700' : 'bg-green-50'
          }`}
        >
          <div className="flex items-center space-x-3 mb-2">
            <SafeIcon icon={FiDollarSign} className="text-green-600 text-lg md:text-xl" />
            <span className="font-medium text-sm md:text-base">Total Cost</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-green-600">
            ${totalCost.toLocaleString()}
          </p>
          <p className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Estimated monthly cost
          </p>
        </motion.div>
      </div>

      {workloadCosts.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Workload Breakdown</h3>
          <div className="space-y-3">
            {workloadCosts.map((workload, index) => (
              <motion.div
                key={workload.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                } space-y-2 sm:space-y-0`}
              >
                <div className="flex-1">
                  <span className="font-medium capitalize text-sm md:text-base">
                    {workload.name.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <p className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Usage: {workload.usage.toLocaleString()}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-semibold text-lg">
                    ${workload.cost.toLocaleString()}
                  </p>
                  <p className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {((workload.cost / totalCost) * 100).toFixed(1)}% of total
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CostSummary;