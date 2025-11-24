import React from 'react';
import { personalInfo } from '../data/personalInfo';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 mt-16 border-t border-gray-200 dark:border-[#233648]">
      <div className="max-w-5xl mx-auto px-4 md:px-10 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>© {currentYear} {personalInfo.name}. {t.footer.rights}</p>
      </div>
    </footer>
  );
};

export default Footer;

