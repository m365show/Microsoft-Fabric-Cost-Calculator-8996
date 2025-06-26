import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import CostCalculator from './components/CostCalculator';
import PricingInfo from './components/PricingInfo';
import ComparisonTool from './components/ComparisonTool';
import HelpPage from './components/HelpPage';
import CompactEstimator from './components/CompactEstimator';
import WidescreenCalculator from './components/WidescreenCalculator';
import MultiStepCalculator from './components/MultiStepCalculator';
import OnboardingModal from './components/OnboardingModal';
import EmbedCodeGenerator from './components/EmbedCodeGenerator';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if user is visiting for the first time
    const hasVisited = localStorage.getItem('fabric-calculator-visited');
    if (!hasVisited) {
      setShowOnboarding(true);
      localStorage.setItem('fabric-calculator-visited', 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Check if this is an embed route
  const isEmbedRoute = window.location.hash.startsWith('#/embed');

  if (isEmbedRoute) {
    const embedType = window.location.hash.split('/')[2];
    
    // Parse URL parameters for multi-step embed
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const configFromUrl = urlParams.get('capacity') ? {
      capacity: urlParams.get('capacity'),
      region: urlParams.get('region'),
      workloads: JSON.parse(urlParams.get('workloads') || '{}')
    } : null;

    return (
      <div className={`min-h-screen ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        {embedType === 'compact' && (
          <div className="p-4">
            <CompactEstimator darkMode={darkMode} />
          </div>
        )}
        
        {embedType === 'widescreen' && (
          <div className="w-full h-screen">
            <WidescreenCalculator darkMode={darkMode} />
          </div>
        )}
        
        {embedType === 'multi-step' && (
          <div className="w-full h-screen p-4">
            <MultiStepCalculator 
              darkMode={darkMode} 
              embedded={true}
              initialConfig={configFromUrl}
            />
          </div>
        )}
        
        {embedType === 'full' && (
          <div className="p-4">
            <CostCalculator darkMode={darkMode} />
          </div>
        )}
        
        {!embedType && (
          <div className="p-4">
            <MultiStepCalculator darkMode={darkMode} embedded={true} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <Router>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-6 md:py-8"
        >
          <Routes>
            <Route 
              path="/" 
              element={<CostCalculator darkMode={darkMode} />} 
            />
            <Route 
              path="/pricing" 
              element={<PricingInfo darkMode={darkMode} />} 
            />
            <Route 
              path="/compare" 
              element={<ComparisonTool darkMode={darkMode} />} 
            />
            <Route 
              path="/help" 
              element={<HelpPage darkMode={darkMode} />} 
            />
            <Route 
              path="/embed" 
              element={<EmbedCodeGenerator darkMode={darkMode} />} 
            />
          </Routes>
        </motion.main>

        {/* First-time visitor onboarding */}
        <OnboardingModal
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
          darkMode={darkMode}
        />
      </Router>
    </div>
  );
}

export default App;