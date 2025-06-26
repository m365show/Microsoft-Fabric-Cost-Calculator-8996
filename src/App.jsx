import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import CostCalculator from './components/CostCalculator';
import PricingInfo from './components/PricingInfo';
import ComparisonTool from './components/ComparisonTool';
import HelpPage from './components/HelpPage';
import EmbedMultiStepCalculator from './components/EmbedMultiStepCalculator';
import EmbedCompactCalculator from './components/EmbedCompactCalculator';
import EmbedWidescreenCalculator from './components/EmbedWidescreenCalculator';
import EmbedFullCalculator from './components/EmbedFullCalculator';
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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <Router>
        <Routes>
          {/* Embed Routes - No Header, Full Screen */}
          <Route 
            path="/embed/multi-step" 
            element={
              <div className="w-full h-screen p-4">
                <EmbedMultiStepCalculator darkMode={darkMode} />
              </div>
            } 
          />
          <Route 
            path="/embed/compact" 
            element={
              <div className="w-full h-screen p-4">
                <EmbedCompactCalculator darkMode={darkMode} />
              </div>
            } 
          />
          <Route 
            path="/embed/widescreen" 
            element={
              <div className="w-full h-screen">
                <EmbedWidescreenCalculator darkMode={darkMode} />
              </div>
            } 
          />
          <Route 
            path="/embed/full" 
            element={
              <div className="w-full min-h-screen p-4">
                <EmbedFullCalculator darkMode={darkMode} />
              </div>
            } 
          />
          <Route 
            path="/embed" 
            element={
              <div className="w-full h-screen p-4">
                <EmbedMultiStepCalculator darkMode={darkMode} />
              </div>
            } 
          />

          {/* Main App Routes - With Header */}
          <Route 
            path="/*" 
            element={
              <>
                <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                <motion.main
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="container mx-auto px-4 py-6 md:py-8"
                >
                  <Routes>
                    <Route path="/" element={<CostCalculator darkMode={darkMode} />} />
                    <Route path="/pricing" element={<PricingInfo darkMode={darkMode} />} />
                    <Route path="/compare" element={<ComparisonTool darkMode={darkMode} />} />
                    <Route path="/help" element={<HelpPage darkMode={darkMode} />} />
                    <Route path="/embed-generator" element={<EmbedCodeGenerator darkMode={darkMode} />} />
                  </Routes>
                </motion.main>

                {/* First-time visitor onboarding */}
                <OnboardingModal 
                  isOpen={showOnboarding} 
                  onClose={() => setShowOnboarding(false)} 
                  darkMode={darkMode} 
                />
              </>
            } 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;