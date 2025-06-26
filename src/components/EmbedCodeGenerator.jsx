import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCode, FiCopy, FiCheck, FiMonitor, FiTablet, FiSmartphone } = FiIcons;

const EmbedCodeGenerator = ({ darkMode }) => {
  const [copied, setCopied] = useState(false);
  const [embedType, setEmbedType] = useState('full');
  const [embedSize, setEmbedSize] = useState('large');

  // Dynamic URL detection
  const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.protocol}//${window.location.host}`;
    }
    return '';
  };

  const embedConfigs = {
    widescreen: {
      name: 'Widescreen Calculator',
      description: '16:9 layout with simplified interface',
      path: '/#/embed/widescreen',
      sizes: {
        small: { width: 640, height: 360 },
        medium: { width: 854, height: 480 },
        large: { width: 1280, height: 720 }
      }
    },
    full: {
      name: 'Full Calculator',
      description: 'Complete calculator with all features',
      path: '/#/embed/full',
      sizes: {
        small: { width: 800, height: 600 },
        medium: { width: 1000, height: 800 },
        large: { width: 1200, height: 900 }
      }
    }
  };

  const currentConfig = embedConfigs[embedType];
  const currentSize = currentConfig.sizes[embedSize];
  const embedUrl = `${getBaseUrl()}${currentConfig.path}`;

  const generateEmbedCode = () => {
    return `<iframe src="${embedUrl}" width="${currentSize.width}" height="${currentSize.height}" frameborder="0" allowfullscreen style="border-radius: 8px;box-shadow: 0 4px 12px rgba(0,0,0,0.1);max-width: 100%;">
</iframe>`;
  };

  const generateResponsiveCode = () => {
    const aspectRatio = (currentSize.height / currentSize.width * 100).toFixed(2);
    return `<div style="position: relative;width: 100%;height: 0;padding-bottom: ${aspectRatio}%;overflow: hidden;">
  <iframe src="${embedUrl}" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;border: none;border-radius: 8px;box-shadow: 0 4px 12px rgba(0,0,0,0.1);" allowfullscreen>
  </iframe>
</div>`;
  };

  const copyEmbedCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      const textArea = document.createElement('textarea');
      textArea.value = code;
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
      transition={{ duration: 0.5 }}
      className={`rounded-xl p-6 shadow-lg ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className={`p-3 rounded-lg ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
          <SafeIcon icon={FiCode} className="text-purple-600 text-xl" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Embed Code Generator</h2>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Generate custom embed codes for your website
          </p>
        </div>
      </div>

      {/* Embed Type Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Choose Embed Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(embedConfigs).map(([key, config]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setEmbedType(key)}
              className={`p-4 rounded-lg border text-left transition-all ${
                embedType === key
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                  : darkMode
                  ? 'border-gray-600 hover:border-gray-500'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="font-medium">{config.name}</div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {config.description}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Select Size</h3>
        <div className="flex flex-wrap gap-3">
          {Object.entries(currentConfig.sizes).map(([sizeKey, size]) => {
            const icons = { small: FiSmartphone, medium: FiTablet, large: FiMonitor };
            const IconComponent = icons[sizeKey];
            return (
              <motion.button
                key={sizeKey}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setEmbedSize(sizeKey)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
                  embedSize === sizeKey
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                    : darkMode
                    ? 'border-gray-600 hover:border-gray-500 text-gray-300'
                    : 'border-gray-300 hover:border-gray-400 text-gray-700'
                }`}
              >
                <SafeIcon icon={IconComponent} />
                <span className="capitalize font-medium">{sizeKey}</span>
                <span className="text-sm opacity-75">
                  {size.width}×{size.height}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Generated Code */}
      <div className="space-y-4">
        {/* Standard Embed Code */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Standard Embed Code</h4>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => copyEmbedCode(generateEmbedCode())}
              className={`flex items-center space-x-2 px-3 py-1 rounded transition-colors text-sm ${
                copied
                  ? 'bg-green-600 text-white'
                  : darkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <SafeIcon icon={copied ? FiCheck : FiCopy} />
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </motion.button>
          </div>
          <div className={`relative p-4 rounded-lg font-mono text-xs overflow-x-auto ${
            darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-700'
          }`}>
            <pre>{generateEmbedCode()}</pre>
          </div>
        </div>

        {/* Responsive Embed Code */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Responsive Embed Code</h4>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => copyEmbedCode(generateResponsiveCode())}
              className={`flex items-center space-x-2 px-3 py-1 rounded transition-colors text-sm ${
                copied
                  ? 'bg-green-600 text-white'
                  : darkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <SafeIcon icon={copied ? FiCheck : FiCopy} />
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </motion.button>
          </div>
          <div className={`relative p-4 rounded-lg font-mono text-xs overflow-x-auto ${
            darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-700'
          }`}>
            <pre>{generateResponsiveCode()}</pre>
          </div>
        </div>
      </div>

      {/* Usage Tips */}
      <div className={`mt-6 p-4 rounded-lg ${
        darkMode ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'
      }`}>
        <h4 className="font-medium text-green-600 mb-2">💡 Embedding Tips</h4>
        <ul className="text-sm space-y-1">
          <li>• Use responsive code for mobile-friendly websites</li>
          <li>• Widescreen format works great in blog posts and articles</li>
          <li>• Full format includes all calculator features</li>
          <li>• All embeds include dark mode support</li>
          <li>• URLs automatically adapt to your domain</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default EmbedCodeGenerator;