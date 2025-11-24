import React from 'react';
import { experience } from '../data/personalInfo';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

const Experience = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="experiencia">
      <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        {t.experience.title}
      </h2>
      <div className="relative p-4">
        <div className="absolute left-6 md:left-1/2 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
        {experience.map((item, index) => (
          <div key={index} className="relative mb-8 flex flex-col md:flex-row items-start">
            <div className="absolute left-6 md:left-1/2 top-1.5 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background-light dark:border-background-dark"></div>
            <div className="md:w-1/2 md:pr-8 md:text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{item.date}</p>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {t.experience.items[item.company]?.title || item.title}
              </h3>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {item.company}
                {item.location && ` • ${item.location}`}
              </p>
            </div>
            <div className="md:w-1/2 md:pl-8 mt-2 md:mt-0 ml-10 md:ml-0">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t.experience.items[item.company]?.description || item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;

