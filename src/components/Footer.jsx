import React, { useEffect, useRef } from 'react';
import { animate as anime, stagger } from 'animejs';
import { personalInfo, socialLinks } from '../data/personalInfo';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const items = entry.target.querySelectorAll('.ft-item');
        anime(items, {
          opacity: [0, 1],
          translateY: [8, 0],
          duration: 500,
          easing: 'easeOutExpo',
          delay: stagger(60, { start: 100 }),
        });
        obs.disconnect();
      },
      { threshold: 0.3 }
    );
    obs.observe(footerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="relative mt-24">
      {/* Top gradient rule — mirrors the header */}
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.25) 30%, rgba(129,140,248,0.5) 50%, rgba(139,92,246,0.25) 70%, transparent 100%)',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Left — brand */}
          <div className="ft-item opacity-0 flex items-center gap-3">
            <div className="relative flex items-center justify-center w-7 h-7 rounded border border-gray-200 dark:border-gray-700/60">
              <span className="text-[0.55rem] font-semibold tracking-wider text-gray-700 dark:text-gray-400 select-none">
                DL
              </span>
              <span className="absolute top-0.5 right-0.5 w-[3px] h-[3px] rounded-full bg-violet-500/70" />
            </div>
            <span className="text-xs font-light tracking-[0.12em] uppercase text-gray-500 dark:text-gray-500">
              {personalInfo.name}
            </span>
          </div>

          {/* Center — copyright */}
          <p className="ft-item opacity-0 text-[0.65rem] tracking-[0.1em] text-gray-400 dark:text-gray-600 text-center">
            © {currentYear} · {t.footer.rights}
          </p>

          {/* Right — social icons */}
          <div className="ft-item opacity-0 flex items-center gap-4">
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-400 dark:text-gray-600 hover:text-violet-500 dark:hover:text-violet-400 transition-colors duration-200 hover:-translate-y-0.5 inline-block"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            )}
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-gray-400 dark:text-gray-600 hover:text-violet-500 dark:hover:text-violet-400 transition-colors duration-200 hover:-translate-y-0.5 inline-block"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
            )}
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 dark:text-gray-600 hover:text-violet-500 dark:hover:text-violet-400 transition-colors duration-200 hover:-translate-y-0.5 inline-block"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
