import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 rounded border border-gray-200 dark:border-gray-700/60 overflow-hidden">
      {['es', 'en'].map((lang) => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className={`px-2.5 py-1 text-[0.65rem] tracking-[0.15em] uppercase font-medium transition-all duration-200 ${
            language === lang
              ? 'bg-violet-500/10 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400'
              : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          aria-label={`Switch to ${lang === 'es' ? 'Spanish' : 'English'}`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
