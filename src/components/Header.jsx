import React, { useEffect, useRef, useState } from 'react';
import { animate as anime, stagger } from 'animejs';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';
import LanguageSelector from './LanguageSelector';

const NAV_IDS = ['inicio', 'proyectos', 'habilidades', 'experiencia', 'contacto'];

const Header = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const headerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll-aware background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const observers = [];
    NAV_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Entrance animation
  useEffect(() => {
    if (!headerRef.current) return;
    anime(headerRef.current, {
      translateY: [-50, 0],
      opacity: [0, 1],
      duration: 900,
      easing: 'easeOutExpo',
      delay: 200,
    });
    const links = headerRef.current.querySelectorAll('.nav-link');
    anime(links, {
      opacity: [0, 1],
      translateY: [-6, 0],
      duration: 500,
      easing: 'easeOutExpo',
      delay: stagger(55, { start: 500 }),
    });
  }, []);

  const navLinks = NAV_IDS.map((id) => ({ id, label: t.nav[id] }));

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 opacity-0 transition-[background,box-shadow] duration-400 ${
          scrolled
            ? 'bg-background-light/96 dark:bg-background-dark/96 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.04)]'
            : 'bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm'
        }`}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

        <div className="w-full max-w-5xl mx-auto flex items-center justify-between px-4 md:px-6 h-14">

          {/* Logo mark */}
          <a href="#inicio" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative flex items-center justify-center w-8 h-8 rounded border border-gray-200 dark:border-gray-700 group-hover:border-violet-500/60 transition-colors duration-300">
              <span className="text-[0.6rem] font-semibold tracking-wider text-gray-800 dark:text-white select-none">
                DL
              </span>
              {/* corner dot */}
              <span className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-violet-500/80" />
            </div>
            <span className="hidden sm:block text-sm font-light tracking-[0.1em] uppercase text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
              David Lozada
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center">
            {navLinks.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`nav-link relative px-4 py-5 text-[0.7rem] tracking-[0.12em] uppercase opacity-0 transition-colors duration-200 ${
                  activeSection === id
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                {label}
                {/* Active indicator */}
                <span
                  className={`absolute bottom-0 left-3 right-3 h-px transition-all duration-300 ${
                    activeSection === id
                      ? 'opacity-100 scale-x-100'
                      : 'opacity-0 scale-x-0'
                  }`}
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.7), rgba(99,102,241,0.9), rgba(139,92,246,0.7), transparent)',
                    transformOrigin: 'center',
                  }}
                />
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LanguageSelector />

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors p-1.5"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 3L15 15M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? 'max-h-96' : 'max-h-0'
          }`}
        >
          <div className="border-t border-gray-100 dark:border-gray-800/80 bg-background-light/98 dark:bg-background-dark/98 pb-2">
            {navLinks.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-6 py-3.5 text-[0.7rem] tracking-[0.18em] uppercase transition-colors ${
                  activeSection === id
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <span
                  className={`w-1 h-1 rounded-full flex-shrink-0 transition-colors ${
                    activeSection === id ? 'bg-violet-500' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                />
                {label}
              </a>
            ))}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
