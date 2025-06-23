
import React, { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useLanguage, languages } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-cosmic-200/50 hover:bg-cosmic-300/50 transition-all duration-300 border border-neon-blue/20 hover:border-neon-blue/40"
      >
        <Globe className="w-4 h-4 text-neon-blue" />
        <span className="text-sm font-medium text-white">{currentLang.flag}</span>
        <ChevronDown className={`w-4 h-4 text-neon-blue transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 w-48 glass-morphism border border-neon-blue/30 rounded-lg shadow-lg z-50"
          >
            <div className="py-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => {
                    setLanguage(language.code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-cosmic-300/30 transition-colors flex items-center space-x-3 ${
                    currentLanguage === language.code ? 'bg-cosmic-300/20 text-neon-blue' : 'text-white'
                  }`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span>{language.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
