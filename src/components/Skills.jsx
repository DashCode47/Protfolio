import React from 'react';
import { skills } from '../data/personalInfo';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

const Skills = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="habilidades">
      <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        {t.skills.title}
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {skills.map((skill, index) => (
          <div 
            key={index}
            className="flex flex-1 gap-3 rounded-lg border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#192633] p-4 flex-col items-center text-center"
          >
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '32px' }}>
              {skill.icon}
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-gray-900 dark:text-white text-base font-bold leading-tight">{skill.name}</h3>
              <p className="text-gray-500 dark:text-[#92adc9] text-sm font-normal leading-normal">
                {t.skills.categories[skill.category] || skill.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;

