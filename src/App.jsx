import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import CostCalculator from './components/CostCalculator';
import PricingInfo from './components/PricingInfo';
import ComparisonTool from './components/ComparisonTool';
import OnboardingModal from './components/OnboardingModal';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if user is visiting for the first time
    const hasVisited = localStorage.getItem('fabric-calculator-visited');
    if (!hasVisited) {
      setShowOnboarding(true);
      localStorage.setItem('fabric-calculator-visited', 'true');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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
          className="container mx-auto px-4 py-8"
        >
          <Routes>
            <Route path="/" element={<CostCalculator darkMode={darkMode} />} />
            <Route path="/pricing" element={<PricingInfo darkMode={darkMode} />} />
            <Route path="/compare" element={<ComparisonTool darkMode={darkMode} />} />
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