import React, { useEffect, useRef } from 'react';
import { animate as anime, stagger } from 'animejs';
import { experience } from '../data/personalInfo';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

const Experience = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const timelineRef = useRef(null);

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

    // Animate timeline line
    if (timelineRef.current) {
      const lineObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              anime(entry.target, {
                scaleY: [0, 1],
                transformOrigin: 'top',
                duration: 1200,
                easing: 'easeOutExpo',
                delay: 300,
              });
              lineObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      lineObserver.observe(timelineRef.current);
    }

    // Animate timeline items
    const timelineItems = sectionRef.current.querySelectorAll('.timeline-item');
    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const dot = entry.target.querySelector('.timeline-dot');
            const content = entry.target.querySelectorAll('.timeline-content');
            
            // Animate the timeline item container first
            anime(entry.target, {
              opacity: [0, 1],
              duration: 300,
              easing: 'easeOutExpo',
            });

            // Then animate the dot
            if (dot) {
              anime(dot, {
                scale: [0, 1],
                opacity: [0, 1],
                duration: 500,
                easing: 'easeOutExpo',
                delay: 200,
              });
            }

            // Finally animate the content
            if (content && content.length > 0) {
              anime(content, {
                opacity: [0, 1],
                translateX: (el, i) => i === 0 ? [-30, 0] : [30, 0],
                duration: 600,
                easing: 'easeOutExpo',
                delay: stagger(100, { start: 300 }),
              });
            }

            itemObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    timelineItems.forEach((item) => itemObserver.observe(item));

    return () => {
      timelineItems.forEach((item) => itemObserver.unobserve(item));
    };
  }, []);

  return (
    <section id="experiencia" ref={sectionRef}>
      <h2 
        ref={titleRef}
        className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 opacity-0"
      >
        {t.experience.title}
      </h2>
      <div className="relative p-4">
        <div 
          ref={timelineRef}
          className="absolute left-6 md:left-1/2 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"
        ></div>
        {experience.map((item, index) => (
          <div key={index} className="timeline-item relative mb-8 flex flex-col md:flex-row items-start opacity-0">
            <div className="timeline-dot absolute left-6 md:left-1/2 top-1.5 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background-light dark:border-background-dark opacity-0"></div>
            <div className="timeline-content md:w-1/2 md:pr-8 md:text-right opacity-0">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{item.date}</p>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {t.experience.items[item.company]?.title || item.title}
              </h3>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {item.company}
                {item.location && ` • ${item.location}`}
              </p>
            </div>
            <div className="timeline-content md:w-1/2 md:pl-8 mt-2 md:mt-0 ml-10 md:ml-0 opacity-0">
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

