import React, { useEffect, useRef } from 'react';
import { animate as anime } from 'animejs';
import { skills } from '../data/personalInfo';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

const Skills = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate title
    if (titleRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              anime(entry.target, {
                opacity: [0, 1],
                translateX: [-30, 0],
                duration: 600,
                easing: 'easeOutExpo',
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(titleRef.current);
    }

    // Animate skill cards on scroll
    const skillCards = sectionRef.current.querySelectorAll('.skill-card');
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime(entry.target, {
              opacity: [0, 1],
              scale: [0.8, 1],
              translateY: [30, 0],
              duration: 600,
              easing: 'easeOutExpo',
            });
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    skillCards.forEach((card) => cardObserver.observe(card));

    return () => {
      skillCards.forEach((card) => cardObserver.unobserve(card));
    };
  }, []);

  return (
    <section id="habilidades" ref={sectionRef}>
      <h2 
        ref={titleRef}
        className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 opacity-0"
      >
        {t.skills.title}
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {skills.map((skill, index) => (
          <div 
            key={index}
            className="skill-card flex flex-1 gap-3 rounded-lg border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#192633] p-4 flex-col items-center text-center opacity-0 hover:scale-105 transition-transform cursor-pointer"
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

