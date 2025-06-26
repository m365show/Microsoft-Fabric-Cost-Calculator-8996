import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import OnboardingModal from './OnboardingModal';

const { FiSun, FiMoon, FiTrendingUp, FiInfo, FiBarChart3, FiHelpCircle, FiLinkedin, FiMenu, FiX, FiCode } = FiIcons;

const Header = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Calculator', icon: FiTrendingUp },
    { path: '/pricing', label: 'Pricing', icon: FiInfo },
    { path: '/compare', label: 'Compare', icon: FiBarChart3 },
    { path: '/help', label: 'Help', icon: FiHelpCircle },
    { path: '/embed-generator', label: 'Embed', icon: FiCode }
  ];

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-40 backdrop-blur-lg border-b transition-colors duration-300 ${
          darkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center overflow-hidden bg-white shadow-md">
                <img
                  src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1750769009303-httpssubstack-post-media.s3.amaz.jpg"
                  alt="Logo"
                  className="w-8 h-8 md:w-10 md:h-10 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl items-center justify-center hidden">
                  <SafeIcon icon={FiTrendingUp} className="text-white text-lg" />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Fabric Cost Calculator
                </h1>
                <p className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Microsoft Fabric Pricing Tool
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? darkMode
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-100 text-blue-700'
                      : darkMode
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <SafeIcon icon={item.icon} className="text-sm" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}

              {/* LinkedIn Link */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/school/m365-show/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  darkMode
                    ? 'text-blue-400 hover:text-blue-300 hover:bg-gray-800'
                    : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                }`}
                title="M365 Show on LinkedIn"
              >
                <SafeIcon icon={FiLinkedin} className="text-lg" />
                <span className="text-sm font-medium">M365 Show</span>
              </motion.a>

              {/* Dark Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  darkMode
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title="Toggle Dark Mode"
              >
                <SafeIcon icon={darkMode ? FiSun : FiMoon} className="text-lg" />
              </motion.button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  darkMode
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <SafeIcon icon={darkMode ? FiSun : FiMoon} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  darkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <SafeIcon icon={mobileMenuOpen ? FiX : FiMenu} className="text-lg" />
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: mobileMenuOpen ? 'auto' : 0,
              opacity: mobileMenuOpen ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="pt-4 pb-2 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? darkMode
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-100 text-blue-700'
                      : darkMode
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <SafeIcon icon={item.icon} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}

              <a
                href="https://www.linkedin.com/school/m365-show/"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  darkMode
                    ? 'text-blue-400 hover:text-blue-300 hover:bg-gray-800'
                    : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                }`}
              >
                <SafeIcon icon={FiLinkedin} />
                <span className="font-medium">M365 Show</span>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        darkMode={darkMode}
      />
    </>
  );
};

export default Header;