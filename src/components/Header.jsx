import React, { useEffect, useRef } from 'react';
import { animate as anime, stagger } from 'animejs';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const headerRef = useRef(null);
  const navLinksRef = useRef(null);

  useEffect(() => {
    // Slide down animation for header
    if (headerRef.current) {
      anime(headerRef.current, {
        translateY: [-100, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo',
      });
    }

    // Stagger animation for nav links
    if (navLinksRef.current) {
      const links = navLinksRef.current.querySelectorAll('a');
      anime(links, {
        opacity: [0, 1],
        translateY: [-10, 0],
        duration: 600,
        easing: 'easeOutExpo',
        delay: stagger(80, { start: 300 }),
      });
    }
  }, []);

  return (
    <header 
      ref={headerRef}
      className="sticky top-0 z-50 flex items-center justify-center whitespace-nowrap bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-solid border-gray-200 dark:border-b-[#233648] px-4 md:px-10 py-3 opacity-0"
    >
      <div className="w-full max-w-5xl flex items-center justify-between">
        <div className="flex items-center gap-4 text-gray-900 dark:text-white">
          <div className="size-5 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">David Lozada</h2>
        </div>
        <div className="hidden md:flex flex-1 justify-end gap-8">
          <div ref={navLinksRef} className="flex items-center gap-9">
            <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors hover:scale-105 inline-block" href="#inicio">{t.nav.inicio}</a>
            <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors hover:scale-105 inline-block" href="#proyectos">{t.nav.proyectos}</a>
            <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors hover:scale-105 inline-block" href="#habilidades">{t.nav.habilidades}</a>
            <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors hover:scale-105 inline-block" href="#experiencia">{t.nav.experiencia}</a>
            <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors hover:scale-105 inline-block" href="#contacto">{t.nav.contacto}</a>
          </div>
          <LanguageSelector />
        </div>
        <div className="md:hidden">
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default Header;

