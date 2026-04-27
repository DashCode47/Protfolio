import React, { useEffect, useRef } from 'react';
import { animate as anime, stagger } from 'animejs';
import { skills } from '../data/personalInfo';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

const CATEGORY_ORDER = ['Language', 'Framework', 'Backend', 'Herramientas', 'Cloud'];

const CATEGORY_EN = {
  Language: 'Language',
  Framework: 'Framework',
  Backend: 'Backend',
  Herramientas: 'Tools',
  Cloud: 'Cloud',
};

const Skills = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const sectionRef = useRef(null);

  const getCategoryLabel = (cat) =>
    t.skills.categories[cat] ?? CATEGORY_EN[cat] ?? cat;

  const grouped = CATEGORY_ORDER.reduce((acc, cat) => {
    const items = skills.filter((s) => s.category === cat);
    if (items.length) acc.push({ category: cat, items });
    return acc;
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;

    // Section title clip-reveal
    const titleWrap = el.querySelector('.sk-title-wrap');
    const titleObs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        anime(el.querySelector('.sk-title'), {
          translateY: ['108%', '0%'],
          duration: 900,
          easing: 'easeOutExpo',
          delay: 100,
        });
        anime(el.querySelector('.sk-rule'), {
          scaleX: [0, 1],
          duration: 800,
          easing: 'easeOutExpo',
          delay: 600,
        });
        titleObs.disconnect();
      },
      { threshold: 0.3 }
    );
    titleObs.observe(titleWrap);

    // Row entrance — stagger each row as it enters viewport
    const rows = el.querySelectorAll('.sk-row');
    const rowObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const label = entry.target.querySelector('.sk-label');
          const count = entry.target.querySelector('.sk-count');
          const pills = entry.target.querySelectorAll('.sk-pill');

          anime(label, {
            opacity: [0, 1],
            translateX: [-8, 0],
            duration: 500,
            easing: 'easeOutExpo',
          });

          if (count) {
            anime(count, {
              opacity: [0, 1],
              duration: 400,
              easing: 'easeOutExpo',
              delay: 150,
            });
          }

          anime(pills, {
            opacity: [0, 1],
            translateY: [20, 0],
            scale: [0.9, 1],
            rotateX: [15, 0],
            duration: 600,
            easing: 'easeOutElastic(1, .8)',
            delay: stagger(60, { start: 150 }),
          });

          rowObs.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    rows.forEach((r) => rowObs.observe(r));

    return () => {
      titleObs.disconnect();
      rowObs.disconnect();
    };
  }, []);

  return (
    <section id="habilidades" ref={sectionRef} className="relative max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-24 overflow-hidden">

      {/* Ambient glow — matches Hero/Splash depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(99,60,220,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Section header */}
      <div className="sk-title-wrap mb-14">
        <div className="overflow-hidden leading-none">
          <h2
            className="sk-title font-extralight text-gray-900 dark:text-white uppercase"
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              letterSpacing: '0.1em',
              lineHeight: 1,
              transform: 'translateY(110%)',
            }}
          >
            {t.skills.title}
          </h2>
        </div>
        <div
          className="sk-rule mt-4 h-px w-14"
          style={{
            background:
              'linear-gradient(90deg, rgba(139,92,246,0.9), rgba(99,102,241,0.5), transparent)',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
          }}
        />
      </div>

      {/* Category rows */}
      <div className="flex flex-col">
        {grouped.map(({ category, items }, index) => (
          <React.Fragment key={category}>
            {index > 0 && (
              <div
                className="h-px mx-0"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(156,163,175,0.18) 20%, rgba(156,163,175,0.18) 80%, transparent)',
                }}
              />
            )}
            <div
              className="sk-row flex flex-col md:flex-row md:items-start gap-4 md:gap-10 py-7"
            >
            {/* Label + count */}
            <div className="flex-shrink-0 md:w-28 flex md:flex-col items-start gap-2 md:gap-1.5 pt-0.5">
              <div className="sk-label opacity-0 flex items-center gap-1.5">
                <span className="w-[5px] h-[5px] rounded-full bg-violet-500/50 flex-shrink-0" />
                <span className="text-[0.65rem] tracking-[0.25em] uppercase text-gray-400 dark:text-gray-500 font-light">
                  {getCategoryLabel(category)}
                </span>
              </div>
              <span className="sk-count opacity-0 text-[0.58rem] text-gray-300 dark:text-gray-700 font-light tabular-nums pl-[13px]">
                {String(items.length).padStart(2, '0')}
              </span>
            </div>

            {/* Pills — perspective enables the rotateX entrance */}
            <div className="flex flex-wrap gap-2" style={{ perspective: '800px' }}>
              {items.map((skill) => (
                <div
                  key={skill.name}
                  className="sk-pill group opacity-0 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[0.85rem] font-medium tracking-wide text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-white/[0.03] backdrop-blur-sm border border-gray-200/50 dark:border-white/10 hover:border-violet-500/50 dark:hover:border-violet-400/30 hover:bg-white/80 dark:hover:bg-white/[0.07] hover:text-violet-600 dark:hover:text-violet-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300 cursor-default select-none"
                >
                  <span className="material-symbols-outlined text-[1.1rem] opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 text-violet-500 dark:text-violet-400">
                    {skill.icon || 'star'}
                  </span>
                  {skill.name}
                </div>
              ))}
            </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Skills;
