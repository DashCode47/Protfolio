import React, { useState, useEffect, useRef } from 'react';
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
  const carouselRef = useRef(null);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, projects.length - itemsPerView);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  // Touch handlers for swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrev();
    }
  };

  return (
    <section id="proyectos">
      <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        {t.projects.title}
      </h2>
      
      <div className="relative p-4">
        {/* Carousel Container */}
        <div
          className="relative overflow-hidden rounded-lg"
          ref={carouselRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="flex flex-col gap-4 rounded-lg border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#192633] p-4 overflow-hidden h-full">
                  <div className="w-full aspect-video bg-cover bg-center rounded overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-gray-900 dark:text-white text-lg font-bold">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {t.projects.descriptions[project.title] || project.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/20 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {((project.liveUrl && project.liveUrl !== '#') ||
                    (project.codeUrl &&
                      project.codeUrl !== '#' &&
                      project.codeUrl !== null) ||
                    project.privateRepo) && (
                    <div className="flex gap-4 mt-2 flex-wrap">
                      {project.liveUrl && project.liveUrl !== '#' && (
                        <a
                          className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t.projects.verEnVivo}{' '}
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: '16px' }}
                          >
                            open_in_new
                          </span>
                        </a>
                      )}
                      {project.codeUrl &&
                        project.codeUrl !== '#' &&
                        project.codeUrl !== null && (
                          <a
                            className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                            href={project.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {t.projects.codigoFuente}{' '}
                            <span
                              className="material-symbols-outlined"
                              style={{ fontSize: '16px' }}
                            >
                              code
                            </span>
                          </a>
                        )}
                      {project.privateRepo && (
                        <span className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                          {t.projects.repositorioPrivado}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {projects.length > itemsPerView && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-[#192633] border border-gray-200 dark:border-[#324d67] rounded-full p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-[#233648] transition-colors active:scale-95"
              aria-label={t.projects.proyectoAnterior}
            >
              <span className="material-symbols-outlined text-gray-700 dark:text-gray-300 text-xl">
                chevron_left
              </span>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-[#192633] border border-gray-200 dark:border-[#324d67] rounded-full p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-[#233648] transition-colors active:scale-95"
              aria-label={t.projects.siguienteProyecto}
            >
              <span className="material-symbols-outlined text-gray-700 dark:text-gray-300 text-xl">
                chevron_right
              </span>
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {projects.length > itemsPerView && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index
                    ? 'bg-primary w-8'
                    : 'bg-gray-300 dark:bg-gray-600 w-2 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`${t.projects.irAlSlide} ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectCarousel;

