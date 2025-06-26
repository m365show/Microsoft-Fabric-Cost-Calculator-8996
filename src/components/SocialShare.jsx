import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiShare2, FiLinkedin, FiTwitter, FiFacebook, FiLink, FiCheck, FiCode } = FiIcons;

const SocialShare = ({ darkMode }) => {
  const [copied, setCopied] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);

  const shareUrl = window.location.href;
  const shareTitle = "Check out this Microsoft Fabric Cost Calculator!";
  const shareDescription = "I just used this amazing tool to estimate Microsoft Fabric costs. It's free and super helpful for planning data analytics budgets.";

  const embedUrl = `${window.location.origin}/#/embed/multi-step`;
  const embedCode = `<iframe 
  src="${embedUrl}" 
  width="100%" 
  height="700" 
  frameborder="0" 
  style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
</iframe>`;

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

  const copyEmbedCode = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setEmbedCopied(true);
      setTimeout(() => setEmbedCopied(false), 2000);
    } catch (error) {
      const textArea = document.createElement('textarea');
      textArea.value = embedCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setEmbedCopied(true);
      setTimeout(() => setEmbedCopied(false), 2000);
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
      {/* Share Section - Always Visible */}
      <div className="space-y-6">
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

        {/* Embed Section */}
        <div className={`p-4 rounded-lg border ${
          darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="flex items-center space-x-2 mb-3">
            <SafeIcon icon={FiCode} className="text-purple-600" />
            <h4 className="font-medium">Embed on Your Website</h4>
          </div>
          
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
            Add this calculator to your website with a simple iframe:
          </p>

          <div className={`relative p-3 rounded border font-mono text-xs overflow-x-auto ${
            darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'
          }`}>
            <pre className="whitespace-pre-wrap break-all">{embedCode}</pre>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={copyEmbedCode}
              className={`absolute top-2 right-2 p-2 rounded transition-colors ${
                embedCopied 
                  ? 'bg-green-600 text-white' 
                  : darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                    : 'bg-white hover:bg-gray-100 text-gray-600'
              }`}
              title={embedCopied ? 'Copied!' : 'Copy embed code'}
            >
              <SafeIcon icon={embedCopied ? FiCheck : FiCode} className="text-sm" />
            </motion.button>
          </div>

          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className={`p-3 rounded ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h5 className="font-medium text-sm mb-2 text-blue-600">Features:</h5>
              <ul className="text-xs space-y-1">
                <li>• Multi-step guided process</li>
                <li>• Responsive design</li>
                <li>• Real-time cost calculations</li>
                <li>• Export and share options</li>
              </ul>
            </div>
            
            <div className={`p-3 rounded ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h5 className="font-medium text-sm mb-2 text-green-600">Perfect for:</h5>
              <ul className="text-xs space-y-1">
                <li>• Technology blogs</li>
                <li>• Consulting websites</li>
                <li>• Training materials</li>
                <li>• Internal portals</li>
              </ul>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-center">
            <a
              href={embedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-sm ${
                darkMode 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-purple-100 hover:bg-purple-200 text-purple-700'
              }`}
            >
              <SafeIcon icon={FiLink} />
              <span>Preview Embed</span>
            </a>
          </div>
        </div>

        <div className={`text-center text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          <p>💡 Share your estimates with your team to discuss Microsoft Fabric adoption!</p>
        </div>
      </div>
    </motion.div>
  );
};

export default SocialShare;