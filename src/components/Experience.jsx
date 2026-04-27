import React, { useEffect, useRef } from 'react';
import { animate as anime, stagger } from 'animejs';
import { experience } from '../data/personalInfo';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

const Experience = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;

    // Title clip-reveal
    const titleObs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        anime(el.querySelector('.ex-title'), {
          translateY: ['108%', '0%'],
          duration: 900,
          easing: 'easeOutExpo',
          delay: 100,
        });
        anime(el.querySelector('.ex-rule'), {
          scaleX: [0, 1],
          duration: 800,
          easing: 'easeOutExpo',
          delay: 600,
        });
        titleObs.disconnect();
      },
      { threshold: 0.3 }
    );
    titleObs.observe(el.querySelector('.ex-title-wrap'));

    // Timeline line draw
    const lineObs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        anime(el.querySelector('.ex-line'), {
          scaleY: [0, 1],
          duration: 1400,
          easing: 'easeOutExpo',
          delay: 200,
        });
        lineObs.disconnect();
      },
      { threshold: 0.05 }
    );
    lineObs.observe(el.querySelector('.ex-line'));

    // Items stagger in
    const items = el.querySelectorAll('.ex-item');
    const itemObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const dot = entry.target.querySelector('.ex-dot');
          const content = entry.target.querySelector('.ex-content');
          const type = entry.target.querySelector('.ex-type');

          anime(dot, {
            scale: [0, 1],
            opacity: [0, 1],
            duration: 400,
            easing: 'easeOutBack',
            delay: 100,
          });
          anime(type, {
            opacity: [0, 1],
            translateX: [-6, 0],
            duration: 400,
            easing: 'easeOutExpo',
            delay: 150,
          });
          anime(content, {
            opacity: [0, 1],
            translateY: [12, 0],
            duration: 500,
            easing: 'easeOutExpo',
            delay: 200,
          });

          itemObs.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((item) => itemObs.observe(item));

    return () => {
      titleObs.disconnect();
      lineObs.disconnect();
      itemObs.disconnect();
    };
  }, []);

  return (
    <section id="experiencia" ref={sectionRef} className="relative max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-24 overflow-hidden">

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(99,60,220,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Section header */}
      <div className="ex-title-wrap mb-14">
        <div className="overflow-hidden leading-none">
          <h2
            className="ex-title font-extralight text-gray-900 dark:text-white uppercase"
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              letterSpacing: '0.1em',
              lineHeight: 1,
              transform: 'translateY(110%)',
            }}
          >
            {t.experience.title}
          </h2>
        </div>
        <div
          className="ex-rule mt-4 h-px w-14"
          style={{
            background:
              'linear-gradient(90deg, rgba(139,92,246,0.9), rgba(99,102,241,0.5), transparent)',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
          }}
        />
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="ex-line absolute left-[7px] top-0 bottom-0 w-px"
          style={{
            background:
              'linear-gradient(180deg, rgba(139,92,246,0.5), rgba(139,92,246,0.15) 80%, transparent)',
            transformOrigin: 'top',
            transform: 'scaleY(0)',
          }}
        />

        <div className="flex flex-col gap-10 pl-8">
          {experience.map((item, index) => (
            <div key={index} className="ex-item relative">

              {/* Dot on the line */}
              <div
                className="ex-dot absolute -left-8 top-1.5 w-[14px] h-[14px] rounded-full border-2 border-violet-500/70 bg-background-light dark:bg-background-dark flex items-center justify-center opacity-0"
                style={{ transform: 'scale(0)' }}
              >
                <span className="w-[5px] h-[5px] rounded-full bg-violet-500" />
              </div>

              {/* Type badge */}
              <span
                className="ex-type opacity-0 inline-block mb-2 text-[0.58rem] tracking-[0.25em] uppercase font-light px-2 py-0.5 rounded"
                style={{
                  color: item.type === 'education' ? 'rgba(99,102,241,0.8)' : 'rgba(139,92,246,0.8)',
                  background: item.type === 'education' ? 'rgba(99,102,241,0.08)' : 'rgba(139,92,246,0.08)',
                  border: `1px solid ${item.type === 'education' ? 'rgba(99,102,241,0.2)' : 'rgba(139,92,246,0.2)'}`,
                }}
              >
                {item.type === 'education' ? t.experience.education : t.experience.experience}
              </span>

              {/* Content */}
              <div className="ex-content opacity-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                  <h3 className="text-base font-medium text-gray-900 dark:text-white leading-snug">
                    {t.experience.items?.[item.company]?.title || item.title}
                  </h3>
                  <span className="text-[0.65rem] tracking-[0.12em] text-gray-400 dark:text-gray-500 tabular-nums whitespace-nowrap">
                    {item.date}
                  </span>
                </div>
                <p className="text-sm font-light text-violet-500/80 dark:text-violet-400/80 mb-2">
                  {item.company}
                  {item.location && (
                    <span className="text-gray-400 dark:text-gray-500 ml-2">· {item.location}</span>
                  )}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 leading-relaxed">
                  {t.experience.items?.[item.company]?.description || item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
