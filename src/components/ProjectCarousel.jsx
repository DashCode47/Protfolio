import React, { useState, useEffect, useRef } from 'react';
import { animate as anime } from 'animejs';
import { projects } from '../data/personalInfo';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

const ProjectCarousel = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const slidesRef = useRef(null);

  useEffect(() => {
    const update = () => setItemsPerView(window.innerWidth >= 768 ? 2 : 1);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;

    // Title clip-reveal
    const titleObs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        anime(el.querySelector('.pr-title'), {
          translateY: ['108%', '0%'],
          duration: 900,
          easing: 'easeOutExpo',
          delay: 100,
        });
        anime(el.querySelector('.pr-rule'), {
          scaleX: [0, 1],
          duration: 800,
          easing: 'easeOutExpo',
          delay: 600,
        });
        titleObs.disconnect();
      },
      { threshold: 0.3 }
    );
    titleObs.observe(el.querySelector('.pr-title-wrap'));

    // Cards entrance
    if (slidesRef.current) {
      const cards = slidesRef.current.querySelectorAll('.project-card');
      const cardObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            anime(entry.target, {
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 700,
              easing: 'easeOutExpo',
            });
            cardObs.unobserve(entry.target);
          });
        },
        { threshold: 0.1 }
      );
      cards.forEach((c) => cardObs.observe(c));
      return () => cardObs.disconnect();
    }
  }, []);

  const maxIndex = Math.max(0, projects.length - itemsPerView);

  const animateSlide = (newIndex) => {
    if (!slidesRef.current) return;
    const cards = slidesRef.current.querySelectorAll('.project-card');
    cards.forEach((card, i) => {
      if (i >= newIndex && i < newIndex + itemsPerView) {
        anime(card, { scale: [0.97, 1], opacity: [0.6, 1], duration: 400, easing: 'easeOutExpo' });
      }
    });
  };

  const goToNext = () =>
    setCurrentIndex((p) => { const n = p >= maxIndex ? 0 : p + 1; animateSlide(n); return n; });
  const goToPrev = () =>
    setCurrentIndex((p) => { const n = p <= 0 ? maxIndex : p - 1; animateSlide(n); return n; });
  const goToSlide = (i) => {
    const t = Math.min(i, maxIndex);
    animateSlide(t);
    setCurrentIndex(t);
  };

  const minSwipe = 50;
  const onTouchStart = (e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const d = touchStart - touchEnd;
    if (d > minSwipe) goToNext();
    if (d < -minSwipe) goToPrev();
  };

  return (
    <section id="proyectos" ref={sectionRef} className="relative max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-24 overflow-hidden">

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 40%, rgba(99,60,220,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Section header */}
      <div className="pr-title-wrap mb-12">
        <div className="overflow-hidden leading-none">
          <h2
            className="pr-title font-extralight text-gray-900 dark:text-white uppercase"
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              letterSpacing: '0.1em',
              lineHeight: 1,
              transform: 'translateY(110%)',
            }}
          >
            {t.projects.title}
          </h2>
        </div>
        <div
          className="pr-rule mt-4 h-px w-14"
          style={{
            background:
              'linear-gradient(90deg, rgba(139,92,246,0.9), rgba(99,102,241,0.5), transparent)',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
          }}
        />
      </div>

      {/* Carousel */}
      <div className="relative">
        <div
          ref={carouselRef}
          className="overflow-hidden rounded"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            ref={slidesRef}
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="project-card group flex flex-col rounded border border-gray-200/80 dark:border-gray-700/50 bg-white dark:bg-white/[0.02] overflow-hidden h-full opacity-0 transition-all duration-300 hover:border-violet-500/30 dark:hover:border-violet-500/25 hover:shadow-xl hover:shadow-violet-500/5">

                  {/* Image */}
                  <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800/50">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Body */}
                  <div className="flex flex-col gap-3 p-5 flex-1">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[0.6rem] font-medium tracking-[0.1em] uppercase px-2 py-0.5 rounded text-violet-500 dark:text-violet-400 border border-violet-500/20 dark:border-violet-400/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-base font-medium text-gray-900 dark:text-white leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-500 leading-relaxed flex-1">
                      {t.projects.descriptions?.[project.title] || project.description}
                    </p>

                    {/* Links */}
                    {(project.liveUrl || project.codeUrl || project.privateRepo) && (
                      <div className="flex gap-4 pt-2 border-t border-gray-100 dark:border-gray-800/60 mt-auto">
                        {project.liveUrl && project.liveUrl !== '#' && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>open_in_new</span>
                            {t.projects.verEnVivo}
                          </a>
                        )}
                        {project.codeUrl && project.codeUrl !== '#' && (
                          <a
                            href={project.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>code</span>
                            {t.projects.codigoFuente}
                          </a>
                        )}
                        {project.privateRepo && (
                          <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-600">
                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>lock</span>
                            {t.projects.repositorioPrivado}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prev / Next */}
        {projects.length > itemsPerView && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 shadow-sm hover:border-violet-500/50 hover:text-violet-600 dark:hover:text-violet-400 text-gray-500 dark:text-gray-400 transition-all duration-200"
              aria-label={t.projects.proyectoAnterior}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 shadow-sm hover:border-violet-500/50 hover:text-violet-600 dark:hover:text-violet-400 text-gray-500 dark:text-gray-400 transition-all duration-200"
              aria-label={t.projects.siguienteProyecto}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {projects.length > itemsPerView && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                currentIndex === i
                  ? 'w-6 h-1.5 bg-violet-500'
                  : 'w-1.5 h-1.5 bg-gray-300 dark:bg-gray-700 hover:bg-violet-400 dark:hover:bg-violet-600'
              }`}
              aria-label={`${t.projects.irAlSlide} ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectCarousel;
