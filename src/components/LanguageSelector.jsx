import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage('es')}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
          language === 'es'
            ? 'bg-primary text-white'
            : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
        }`}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
      <span className="text-gray-400 dark:text-gray-600">|</span>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
          language === 'en'
            ? 'bg-primary text-white'
            : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSelector;

