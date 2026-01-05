import React, { useEffect, useRef } from 'react';
import { animate as anime, stagger } from 'animejs';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();
  const selectorRef = useRef(null);

  useEffect(() => {
    if (selectorRef.current) {
      const buttons = selectorRef.current.querySelectorAll('button');
      anime(buttons, {
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 400,
        easing: 'easeOutExpo',
        delay: stagger(50, { start: 500 }),
      });
    }
  }, []);

  const handleLanguageChange = (lang) => {
    if (selectorRef.current) {
      const buttons = selectorRef.current.querySelectorAll('button');
      anime(buttons, {
        scale: [1, 0.9, 1],
        duration: 300,
        easing: 'easeOutExpo',
      });
    }
    changeLanguage(lang);
  };

  return (
    <div ref={selectorRef} className="flex items-center gap-2">
      <button
        onClick={() => handleLanguageChange('es')}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-all hover:scale-110 ${
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
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-all hover:scale-110 ${
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

