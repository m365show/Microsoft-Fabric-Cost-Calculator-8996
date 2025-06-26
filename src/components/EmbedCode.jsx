import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCode, FiCopy, FiCheck, FiExternalLink } = FiIcons;

const EmbedCode = ({ darkMode }) => {
  const [copied, setCopied] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);

  const currentUrl = window.location.origin + window.location.pathname;
  const embedCode = `<iframe 
  src="${currentUrl}/embed" 
  width="100%" 
  height="600" 
  frameborder="0" 
  style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
</iframe>`;

  const copyEmbedCode = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = embedCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className={`rounded-xl p-4 md:p-6 shadow-lg ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}
    >
      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowEmbed(!showEmbed)}
          className="flex items-center space-x-2 mx-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 mb-4"
        >
          <SafeIcon icon={FiCode} />
          <span>Embed This Tool</span>
        </motion.button>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: showEmbed ? 'auto' : 0, 
            opacity: showEmbed ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="space-y-4 text-left">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Embed this Microsoft Fabric Cost Calculator on your website or blog:
            </p>

            <div className={`relative p-4 rounded-lg ${
              darkMode ? 'bg-gray-900' : 'bg-gray-50'
            }`}>
              <pre className={`text-xs font-mono overflow-x-auto ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {embedCode}
              </pre>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={copyEmbedCode}
                className={`absolute top-2 right-2 p-2 rounded transition-colors ${
                  copied
                    ? 'bg-green-600 text-white'
                    : darkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      : 'bg-white hover:bg-gray-100 text-gray-600'
                }`}
                title={copied ? 'Copied!' : 'Copy code'}
              >
                <SafeIcon icon={copied ? FiCheck : FiCopy} className="text-sm" />
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-3 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-blue-50'
              }`}>
                <h4 className="font-medium text-sm mb-2">Features:</h4>
                <ul className="text-xs space-y-1">
                  <li>• Responsive design</li>
                  <li>• Dark/light mode</li>
                  <li>• Real-time calculations</li>
                  <li>• PDF export capability</li>
                </ul>
              </div>

              <div className={`p-3 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-green-50'
              }`}>
                <h4 className="font-medium text-sm mb-2">Perfect for:</h4>
                <ul className="text-xs space-y-1">
                  <li>• Technology blogs</li>
                  <li>• Consulting websites</li>
                  <li>• Internal portals</li>
                  <li>• Training materials</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <a
                href="/embed"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-sm ${
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                <SafeIcon icon={FiExternalLink} />
                <span>Preview Embed</span>
              </a>
            </div>

            <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'} text-center`}>
              <p>📋 The embedded version includes all core functionality with a compact layout</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EmbedCode;