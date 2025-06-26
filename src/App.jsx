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
    // Check if user is visiting for the first time - but not for embed routes
    const isEmbedRoute = window.location.hash.includes('embed');
    if (!isEmbedRoute) {
      const hasVisited = localStorage.getItem('fabric-calculator-visited');
      if (!hasVisited) {
        setShowOnboarding(true);
        localStorage.setItem('fabric-calculator-visited', 'true');
      }
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

  // Check if current route is an embed route
  const isEmbedRoute = window.location.hash.includes('embed');

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <Router>
        <Routes>
          {/* EMBED ROUTES - These handle URLs like /#/embed/multi-step */}
          <Route 
            path="embed/multi-step" 
            element={<EmbedMultiStepCalculator darkMode={darkMode} />} 
          />
          <Route 
            path="embed/compact" 
            element={<EmbedCompactCalculator darkMode={darkMode} />} 
          />
          <Route 
            path="embed/widescreen" 
            element={<EmbedWidescreenCalculator darkMode={darkMode} />} 
          />
          <Route 
            path="embed/full" 
            element={<EmbedFullCalculator darkMode={darkMode} />} 
          />
          <Route 
            path="embed" 
            element={<EmbedMultiStepCalculator darkMode={darkMode} />} 
          />

          {/* MAIN APP ROUTES */}
          <Route path="pricing" element={
            <>
              <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 py-6 md:py-8"
              >
                <PricingInfo darkMode={darkMode} />
              </motion.main>
              {!isEmbedRoute && (
                <OnboardingModal 
                  isOpen={showOnboarding} 
                  onClose={() => setShowOnboarding(false)} 
                  darkMode={darkMode} 
                />
              )}
            </>
          } />
          
          <Route path="compare" element={
            <>
              <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 py-6 md:py-8"
              >
                <ComparisonTool darkMode={darkMode} />
              </motion.main>
              {!isEmbedRoute && (
                <OnboardingModal 
                  isOpen={showOnboarding} 
                  onClose={() => setShowOnboarding(false)} 
                  darkMode={darkMode} 
                />
              )}
            </>
          } />
          
          <Route path="help" element={
            <>
              <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 py-6 md:py-8"
              >
                <HelpPage darkMode={darkMode} />
              </motion.main>
              {!isEmbedRoute && (
                <OnboardingModal 
                  isOpen={showOnboarding} 
                  onClose={() => setShowOnboarding(false)} 
                  darkMode={darkMode} 
                />
              )}
            </>
          } />
          
          <Route path="embed-generator" element={
            <>
              <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 py-6 md:py-8"
              >
                <EmbedCodeGenerator darkMode={darkMode} />
              </motion.main>
              {!isEmbedRoute && (
                <OnboardingModal 
                  isOpen={showOnboarding} 
                  onClose={() => setShowOnboarding(false)} 
                  darkMode={darkMode} 
                />
              )}
            </>
          } />

          {/* DEFAULT HOME ROUTE */}
          <Route path="/" element={
            <>
              <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 py-6 md:py-8"
              >
                <CostCalculator darkMode={darkMode} />
              </motion.main>
              {!isEmbedRoute && (
                <OnboardingModal 
                  isOpen={showOnboarding} 
                  onClose={() => setShowOnboarding(false)} 
                  darkMode={darkMode} 
                />
              )}
            </>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;