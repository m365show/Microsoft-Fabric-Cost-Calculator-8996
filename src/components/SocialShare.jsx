import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiShare2, FiLinkedin, FiTwitter, FiFacebook, FiLink, FiCheck } = FiIcons;

const SocialShare = ({ darkMode }) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = window.location.href;
  const shareTitle = "Check out this Microsoft Fabric Cost Calculator!";
  const shareDescription = "I just used this amazing tool to estimate Microsoft Fabric costs. It's free and super helpful for planning data analytics budgets.";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}&summary=${encodeURIComponent(shareDescription)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    const text = `${shareTitle}\n\n${shareDescription}\n\n${shareUrl}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareDescription)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className={`rounded-xl p-6 shadow-lg ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}
    >
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <SafeIcon icon={FiShare2} className="text-blue-600 text-xl" />
          <h3 className="text-xl font-semibold">Share This Tool</h3>
        </div>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
          Help others discover this free Microsoft Fabric cost estimation tool!
        </p>
      </div>

      {/* Social Share Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={shareOnLinkedIn}
          className="flex items-center space-x-2 px-4 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200"
        >
          <SafeIcon icon={FiLinkedin} />
          <span>LinkedIn</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={shareOnTwitter}
          className="flex items-center space-x-2 px-4 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors duration-200"
        >
          <SafeIcon icon={FiTwitter} />
          <span>Twitter</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={shareOnFacebook}
          className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <SafeIcon icon={FiFacebook} />
          <span>Facebook</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyToClipboard}
          className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors duration-200 ${
            copied 
              ? 'bg-green-600 text-white' 
              : darkMode 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <SafeIcon icon={copied ? FiCheck : FiLink} />
          <span>{copied ? 'Copied!' : 'Copy Link'}</span>
        </motion.button>
      </div>

      <div className={`text-center text-xs mt-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
        <p>💡 Share your estimates with your team to discuss Microsoft Fabric adoption!</p>
      </div>
    </motion.div>
  );
};

export default SocialShare;