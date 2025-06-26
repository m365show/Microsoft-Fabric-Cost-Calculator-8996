import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { 
  FiBook, FiServer, FiGlobe, FiSettings, FiDollarSign, FiTrendingUp, 
  FiInfo, FiChevronRight, FiPlay, FiCheck, FiCalculator, FiBarChart3 
} = FiIcons;

const HelpPage = ({ darkMode }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const helpSections = [
    {
      id: 'overview',
      title: 'Getting Started',
      icon: FiPlay,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Welcome to Microsoft Fabric Cost Calculator</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This comprehensive tool helps you estimate costs for Microsoft Fabric, Microsoft's unified analytics platform. 
              Whether you're planning a new implementation or optimizing existing workloads, this calculator provides accurate 
              cost projections based on your specific requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg border ${
              darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
            }`}>
              <SafeIcon icon={FiCalculator} className="text-blue-600 text-xl mb-2" />
              <h4 className="font-medium mb-2">Cost Calculator</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Main calculator with detailed workload configuration
              </p>
            </div>
            
            <div className={`p-4 rounded-lg border ${
              darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
            }`}>
              <SafeIcon icon={FiBarChart3} className="text-purple-600 text-xl mb-2" />
              <h4 className="font-medium mb-2">Compare Scenarios</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Side-by-side comparison of different configurations
              </p>
            </div>
            
            <div className={`p-4 rounded-lg border ${
              darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
            }`}>
              <SafeIcon icon={FiInfo} className="text-green-600 text-xl mb-2" />
              <h4 className="font-medium mb-2">Pricing Details</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Comprehensive pricing information and tier details
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'capacity',
      title: 'Understanding Fabric Capacity',
      icon: FiServer,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">What is Microsoft Fabric Capacity?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Fabric Capacity is the foundational compute resource that powers all Microsoft Fabric workloads. 
              Think of it as the "engine" that drives your data analytics platform. The capacity you choose 
              determines how much computing power is available for all your data operations.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-medium">Capacity Tiers Explained</h4>
            
            <div className="space-y-3">
              <div className={`p-4 rounded-lg border-l-4 border-green-500 ${
                darkMode ? 'bg-green-900/20' : 'bg-green-50'
              }`}>
                <h5 className="font-medium text-green-700 dark:text-green-300">F2 - F4: Small Teams</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Perfect for small teams (5-20 users) with basic analytics needs. Suitable for departmental reporting, 
                  simple data integration, and exploratory analytics.
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 list-disc list-inside">
                  <li>Basic data transformations</li>
                  <li>Small datasets (less than 1TB)</li>
                  <li>Limited concurrent users</li>
                </ul>
              </div>

              <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${
                darkMode ? 'bg-blue-900/20' : 'bg-blue-50'
              }`}>
                <h5 className="font-medium text-blue-700 dark:text-blue-300">F8 - F16: Medium Teams</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Ideal for medium-sized organizations (20-100 users) with regular reporting and analytics requirements. 
                  Supports more complex data operations and higher user concurrency.
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 list-disc list-inside">
                  <li>Complex data pipelines</li>
                  <li>Medium datasets (1-10TB)</li>
                  <li>Multiple concurrent workloads</li>
                </ul>
              </div>

              <div className={`p-4 rounded-lg border-l-4 border-purple-500 ${
                darkMode ? 'bg-purple-900/20' : 'bg-purple-50'
              }`}>
                <h5 className="font-medium text-purple-700 dark:text-purple-300">F32+: Large Teams & Enterprise</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Enterprise-grade capacity for large organizations (100+ users) with heavy data processing requirements. 
                  Supports mission-critical workloads and complex analytics scenarios.
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 list-disc list-inside">
                  <li>Real-time data processing</li>
                  <li>Large datasets (10TB+)</li>
                  <li>High-performance computing</li>
                </ul>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${
            darkMode ? 'bg-yellow-900/20 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'
          }`}>
            <h5 className="font-medium text-yellow-700 dark:text-yellow-300 mb-2">💡 Capacity Selection Tips</h5>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>• Start with a smaller capacity and scale up based on actual usage</li>
              <li>• Consider peak usage times when selecting capacity</li>
              <li>• Monitor utilization to optimize costs</li>
              <li>• Higher capacity tiers offer better performance and concurrency</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'regions',
      title: 'Regional Pricing',
      icon: FiGlobe,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Understanding Regional Pricing</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Microsoft Fabric pricing varies by geographic region due to local infrastructure costs, 
              regulatory requirements, and market conditions. Understanding these differences helps 
              you make informed decisions about deployment locations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${
              darkMode ? 'bg-gray-700' : 'bg-white'
            } border`}>
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-2xl">🇺🇸</span>
                <h4 className="font-medium">United States</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>US East (Virginia)</span>
                  <span className="text-green-600 font-medium">Base (1.0x)</span>
                </div>
                <div className="flex justify-between">
                  <span>US West (California)</span>
                  <span className="text-green-600 font-medium">Base (1.0x)</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Lowest pricing globally due to scale and infrastructure maturity.
              </p>
            </div>

            <div className={`p-4 rounded-lg ${
              darkMode ? 'bg-gray-700' : 'bg-white'
            } border`}>
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-2xl">🇪🇺</span>
                <h4 className="font-medium">Europe</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>West Europe</span>
                  <span className="text-orange-600 font-medium">+10% (1.1x)</span>
                </div>
                <div className="flex justify-between">
                  <span>North Europe</span>
                  <span className="text-orange-600 font-medium">+10% (1.1x)</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Moderate premium due to regulatory compliance and infrastructure costs.
              </p>
            </div>

            <div className={`p-4 rounded-lg ${
              darkMode ? 'bg-gray-700' : 'bg-white'
            } border`}>
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-2xl">🌏</span>
                <h4 className="font-medium">Asia Pacific</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Southeast Asia</span>
                  <span className="text-red-600 font-medium">+20% (1.2x)</span>
                </div>
                <div className="flex justify-between">
                  <span>East Asia</span>
                  <span className="text-red-600 font-medium">+20% (1.2x)</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Highest premium due to infrastructure investments and market dynamics.
              </p>
            </div>

            <div className={`p-4 rounded-lg ${
              darkMode ? 'bg-gray-700' : 'bg-white'
            } border`}>
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-2xl">🌍</span>
                <h4 className="font-medium">Other Regions</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Canada</span>
                  <span className="text-green-600 font-medium">Base (1.0x)</span>
                </div>
                <div className="flex justify-between">
                  <span>Australia</span>
                  <span className="text-orange-600 font-medium">+15% (1.15x)</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Pricing varies by specific region and local market conditions.
              </p>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${
            darkMode ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'
          }`}>
            <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">🌐 Region Selection Best Practices</h5>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Choose regions closest to your users for optimal performance</li>
              <li>• Consider data residency and compliance requirements</li>
              <li>• Factor in regional pricing when budgeting</li>
              <li>• Some features may be available in specific regions first</li>
              <li>• Cross-region data transfer may incur additional costs</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'workloads',
      title: 'Configuring Workloads',
      icon: FiSettings,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Microsoft Fabric Workloads</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Microsoft Fabric includes multiple integrated workloads that work together seamlessly. 
              Each workload serves specific analytics needs and has its own pricing model based on usage.
            </p>
          </div>

          <div className="space-y-6">
            <div className={`p-5 rounded-lg border ${
              darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-white'
            }`}>
              <div className="flex items-center space-x-3 mb-3">
                <SafeIcon icon={FiSettings} className="text-blue-600 text-xl" />
                <h4 className="text-lg font-medium">Data Factory</h4>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">$0.50 per pipeline run</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                ETL/ELT data integration and transformation service for moving and processing data from various sources.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-2">Use Cases:</h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Data migration and synchronization</li>
                    <li>• ETL pipeline automation</li>
                    <li>• Real-time data streaming</li>
                    <li>• Data quality and validation</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Usage Examples:</h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Daily batch jobs: 30 runs/month</li>
                    <li>• Hourly incremental: 720 runs/month</li>
                    <li>• Weekly reports: 4 runs/month</li>
                    <li>• Real-time streaming: 2,000+ runs/month</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={`p-5 rounded-lg border ${
              darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-white'
            }`}>
              <div className="flex items-center space-x-3 mb-3">
                <SafeIcon icon={FiTrendingUp} className="text-purple-600 text-xl" />
                <h4 className="text-lg font-medium">Synapse Analytics</h4>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">$2.00 per compute hour</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Enterprise data warehousing and big data analytics platform for complex queries and large-scale data processing.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-2">Use Cases:</h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Data warehousing</li>
                    <li>• Complex analytical queries</li>
                    <li>• Machine learning workflows</li>
                    <li>• Historical data analysis</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Usage Examples:</h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Small team: 50-100 hours/month</li>
                    <li>• Medium team: 200-500 hours/month</li>
                    <li>• Large team: 1,000+ hours/month</li>
                    <li>• 24/7 operations: 720 hours/month</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={`p-5 rounded-lg border ${
              darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-white'
            }`}>
              <div className="flex items-center space-x-3 mb-3">
                <SafeIcon icon={FiDollarSign} className="text-green-600 text-xl" />
                <h4 className="text-lg font-medium">Power BI Premium</h4>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">$10.00 per user/month</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Advanced business intelligence platform for creating interactive reports, dashboards, and data visualizations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-2">Use Cases:</h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Executive dashboards</li>
                    <li>• Self-service analytics</li>
                    <li>• Embedded analytics</li>
                    <li>• Mobile reporting</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">User Count Examples:</h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Small team: 5-25 users</li>
                    <li>• Department: 25-100 users</li>
                    <li>• Division: 100-500 users</li>
                    <li>• Enterprise: 500+ users</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'calculator',
      title: 'Using the Calculator',
      icon: FiCalculator,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Step-by-Step Calculator Guide</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Follow this comprehensive guide to get accurate cost estimates for your Microsoft Fabric deployment.
            </p>
          </div>

          <div className="space-y-4">
            <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${
              darkMode ? 'bg-blue-900/20' : 'bg-blue-50'
            }`}>
              <div className="flex items-center space-x-3 mb-2">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <h4 className="font-medium">Select Your Fabric Capacity</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Choose the capacity tier based on your team size and data processing requirements.
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
                <li>Consider your current team size and expected growth</li>
                <li>Evaluate your data processing volume</li>
                <li>Factor in peak usage periods</li>
                <li>Start conservative - you can always scale up</li>
              </ul>
            </div>

            <div className={`p-4 rounded-lg border-l-4 border-purple-500 ${
              darkMode ? 'bg-purple-900/20' : 'bg-purple-50'
            }`}>
              <div className="flex items-center space-x-3 mb-2">
                <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <h4 className="font-medium">Choose Your Deployment Region</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Select the geographic region closest to your users or based on compliance requirements.
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
                <li>Prioritize user proximity for performance</li>
                <li>Consider data residency requirements</li>
                <li>Factor in regional pricing differences</li>
                <li>Check feature availability by region</li>
              </ul>
            </div>

            <div className={`p-4 rounded-lg border-l-4 border-green-500 ${
              darkMode ? 'bg-green-900/20' : 'bg-green-50'
            }`}>
              <div className="flex items-center space-x-3 mb-2">
                <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <h4 className="font-medium">Configure Your Workloads</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Enable and configure only the workloads you actually plan to use.
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
                <li>Start with your immediate needs</li>
                <li>Use realistic usage estimates</li>
                <li>Consider usage patterns and seasonality</li>
                <li>Plan for gradual adoption</li>
              </ul>
            </div>

            <div className={`p-4 rounded-lg border-l-4 border-orange-500 ${
              darkMode ? 'bg-orange-900/20' : 'bg-orange-50'
            }`}>
              <div className="flex items-center space-x-3 mb-2">
                <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <h4 className="font-medium">Review and Export Results</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Analyze your cost breakdown and save estimates for planning and approval processes.
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
                <li>Review the cost breakdown by component</li>
                <li>Export estimates as PDF or JSON</li>
                <li>Share with stakeholders for approval</li>
                <li>Create multiple scenarios for comparison</li>
              </ul>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${
            darkMode ? 'bg-yellow-900/20 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'
          }`}>
            <h5 className="font-medium text-yellow-700 dark:text-yellow-300 mb-2">💡 Pro Tips for Accurate Estimates</h5>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>• Base estimates on current data volumes and user counts</li>
              <li>• Add 20-30% buffer for growth and unexpected usage</li>
              <li>• Consider seasonal variations in data processing</li>
              <li>• Use the comparison tool to evaluate different approaches</li>
              <li>• Regularly review and adjust estimates based on actual usage</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'costs',
      title: 'Understanding Costs',
      icon: FiDollarSign,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Microsoft Fabric Cost Structure</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Understanding how Microsoft Fabric pricing works helps you optimize costs and make informed decisions 
              about your analytics platform investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-5 rounded-lg border ${
              darkMode ? 'border-blue-600 bg-blue-900/20' : 'border-blue-200 bg-blue-50'
            }`}>
              <h4 className="text-lg font-medium text-blue-600 mb-3">Capacity Costs (Fixed)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Your primary monthly expense - a fixed cost regardless of usage.
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex justify-between">
                  <span>F2 Capacity</span>
                  <span className="font-medium">$263/month</span>
                </li>
                <li className="flex justify-between">
                  <span>F4 Capacity</span>
                  <span className="font-medium">$526/month</span>
                </li>
                <li className="flex justify-between">
                  <span>F8 Capacity</span>
                  <span className="font-medium">$1,052/month</span>
                </li>
                <li className="text-xs text-gray-500 dark:text-gray-400">
                  + Regional multipliers apply
                </li>
              </ul>
            </div>

            <div className={`p-5 rounded-lg border ${
              darkMode ? 'border-purple-600 bg-purple-900/20' : 'border-purple-200 bg-purple-50'
            }`}>
              <h4 className="text-lg font-medium text-purple-600 mb-3">Workload Costs (Variable)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Usage-based charges that vary with your actual consumption.
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex justify-between">
                  <span>Data Factory</span>
                  <span className="font-medium">$0.50/pipeline</span>
                </li>
                <li className="flex justify-between">
                  <span>Synapse Analytics</span>
                  <span className="font-medium">$2.00/hour</span>
                </li>
                <li className="flex justify-between">
                  <span>Power BI Premium</span>
                  <span className="font-medium">$10.00/user</span>
                </li>
                <li className="text-xs text-gray-500 dark:text-gray-400">
                  + Regional multipliers apply
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Cost Optimization Strategies</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-white'
              } border`}>
                <h5 className="font-medium mb-2">Capacity Optimization</h5>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Start with smaller capacity and scale up</li>
                  <li>• Monitor utilization metrics regularly</li>
                  <li>• Consider usage patterns and peaks</li>
                  <li>• Implement auto-scaling where possible</li>
                </ul>
              </div>

              <div className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-white'
              } border`}>
                <h5 className="font-medium mb-2">Workload Optimization</h5>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Enable only needed workloads</li>
                  <li>• Optimize data pipeline efficiency</li>
                  <li>• Use appropriate user licensing</li>
                  <li>• Implement cost monitoring and alerts</li>
                </ul>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${
            darkMode ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'
          }`}>
            <h5 className="font-medium text-green-700 dark:text-green-300 mb-2">💰 Cost Management Best Practices</h5>
            <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
              <li>• Set up cost alerts and budgets</li>
              <li>• Regularly review and optimize resource usage</li>
              <li>• Implement governance policies for resource creation</li>
              <li>• Use Azure Cost Management tools for monitoring</li>
              <li>• Consider reserved capacity for predictable workloads</li>
              <li>• Implement automated start/stop schedules where appropriate</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Help & Documentation
        </h1>
        <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Complete guide to using the Microsoft Fabric Cost Calculator
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`lg:w-1/4 ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          } rounded-xl p-4 h-fit lg:sticky lg:top-24`}
        >
          <h3 className="font-semibold mb-4 flex items-center space-x-2">
            <SafeIcon icon={FiBook} className="text-blue-600" />
            <span>Table of Contents</span>
          </h3>
          
          <nav className="space-y-2">
            {helpSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                  activeSection === section.id
                    ? darkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-100 text-blue-700'
                    : darkMode
                      ? 'hover:bg-gray-700 text-gray-300'
                      : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <SafeIcon icon={section.icon} />
                <span className="text-sm font-medium">{section.title}</span>
                {activeSection === section.id && (
                  <SafeIcon icon={FiChevronRight} className="ml-auto" />
                )}
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`flex-1 ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          } rounded-xl p-6 md:p-8`}
        >
          {helpSections.find(section => section.id === activeSection)?.content}
        </motion.div>
      </div>

      {/* Quick Links Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`rounded-xl p-6 ${
          darkMode ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'
        }`}
      >
        <h3 className="font-semibold mb-4 text-blue-600">Quick Access Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/"
            className={`p-3 rounded-lg border transition-colors ${
              darkMode 
                ? 'border-gray-600 hover:border-blue-500 bg-gray-700' 
                : 'border-gray-200 hover:border-blue-300 bg-white'
            }`}
          >
            <SafeIcon icon={FiCalculator} className="text-blue-600 mb-2" />
            <h4 className="font-medium">Cost Calculator</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Start calculating your Fabric costs
            </p>
          </a>
          
          <a
            href="/compare"
            className={`p-3 rounded-lg border transition-colors ${
              darkMode 
                ? 'border-gray-600 hover:border-purple-500 bg-gray-700' 
                : 'border-gray-200 hover:border-purple-300 bg-white'
            }`}
          >
            <SafeIcon icon={FiBarChart3} className="text-purple-600 mb-2" />
            <h4 className="font-medium">Compare Scenarios</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Compare different configurations
            </p>
          </a>
          
          <a
            href="/pricing"
            className={`p-3 rounded-lg border transition-colors ${
              darkMode 
                ? 'border-gray-600 hover:border-green-500 bg-gray-700' 
                : 'border-gray-200 hover:border-green-300 bg-white'
            }`}
          >
            <SafeIcon icon={FiInfo} className="text-green-600 mb-2" />
            <h4 className="font-medium">Pricing Details</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              View detailed pricing information
            </p>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default HelpPage;