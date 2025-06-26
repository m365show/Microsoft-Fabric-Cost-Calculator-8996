import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHelpCircle } = FiIcons;

const HelpTooltip = ({ content, darkMode, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  return (
    <div className="relative inline-block">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        className={`p-1 rounded-full transition-colors duration-200 ${
          darkMode 
            ? 'text-gray-400 hover:text-blue-400' 
            : 'text-gray-500 hover:text-blue-600'
        }`}
      >
        <SafeIcon icon={FiHelpCircle} className="text-sm" />
      </motion.button>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 w-64 p-3 text-sm rounded-lg shadow-lg ${positionClasses[position]} ${
              darkMode 
                ? 'bg-gray-800 border border-gray-700 text-gray-200' 
                : 'bg-white border border-gray-200 text-gray-700'
            }`}
          >
            <div className="relative">
              {content}
              {/* Arrow */}
              <div 
                className={`absolute w-2 h-2 transform rotate-45 ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } ${
                  position === 'top' ? 'top-full left-1/2 transform -translate-x-1/2 -mt-1' :
                  position === 'bottom' ? 'bottom-full left-1/2 transform -translate-x-1/2 -mb-1' :
                  position === 'left' ? 'left-full top-1/2 transform -translate-y-1/2 -ml-1' :
                  'right-full top-1/2 transform -translate-y-1/2 -mr-1'
                }`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HelpTooltip;