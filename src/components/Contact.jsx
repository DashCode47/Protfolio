import React, { useState, useEffect, useRef } from 'react';
import { animate as anime, stagger } from 'animejs';
import { personalInfo, socialLinks } from '../data/personalInfo';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Animate out the form then show success
    if (formRef.current) {
      anime(formRef.current, {
        opacity: [1, 0],
        translateY: [0, -10],
        duration: 400,
        easing: 'easeInExpo',
        complete: () => setSubmitted(true),
      });
    } else {
      setSubmitted(true);
    }
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // Animate in success state
  useEffect(() => {
    if (!submitted || !sectionRef.current) return;
    const success = sectionRef.current.querySelector('.ct-success');
    if (success) {
      anime(success, {
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 600,
        easing: 'easeOutExpo',
      });
    }
  }, [submitted]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;

    // Title clip-reveal
    const titleObs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        anime(el.querySelector('.ct-title'), {
          translateY: ['108%', '0%'],
          duration: 900,
          easing: 'easeOutExpo',
          delay: 100,
        });
        anime(el.querySelector('.ct-rule'), {
          scaleX: [0, 1],
          duration: 800,
          easing: 'easeOutExpo',
          delay: 600,
        });
        titleObs.disconnect();
      },
      { threshold: 0.3 }
    );
    titleObs.observe(el.querySelector('.ct-title-wrap'));

    // Form fields
    const formObs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const fields = entry.target.querySelectorAll('.ct-field');
        anime(fields, {
          opacity: [0, 1],
          translateY: [12, 0],
          duration: 500,
          easing: 'easeOutExpo',
          delay: stagger(80, { start: 200 }),
        });
        formObs.disconnect();
      },
      { threshold: 0.2 }
    );
    if (formRef.current) formObs.observe(formRef.current);

    // Social icons
    const iconsObs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        anime(entry.target.querySelectorAll('a'), {
          opacity: [0, 1],
          translateY: [8, 0],
          duration: 400,
          easing: 'easeOutExpo',
          delay: stagger(70, { start: 300 }),
        });
        iconsObs.disconnect();
      },
      { threshold: 0.2 }
    );
    const icons = el.querySelector('.ct-socials');
    if (icons) iconsObs.observe(icons);

    return () => {
      titleObs.disconnect();
      formObs.disconnect();
      iconsObs.disconnect();
    };
  }, []);

  const inputClass =
    'ct-field w-full px-4 py-3 rounded text-sm font-light text-gray-800 dark:text-gray-200 bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-700/60 focus:outline-none focus:border-violet-500/60 dark:focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 placeholder:text-gray-400 dark:placeholder:text-gray-600 transition-all duration-200 opacity-0';

  return (
    <section id="contacto" ref={sectionRef} className="relative max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-24 overflow-hidden">

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 70%, rgba(99,60,220,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-lg mx-auto">

        {/* Section header — centered for contact */}
        <div className="ct-title-wrap mb-12 text-center">
          <div className="overflow-hidden leading-none">
            <h2
              className="ct-title font-extralight text-gray-900 dark:text-white uppercase"
              style={{
                fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                letterSpacing: '0.1em',
                lineHeight: 1,
                transform: 'translateY(110%)',
              }}
            >
              {t.contact.title}
            </h2>
          </div>
          <div className="flex justify-center mt-4">
            <div
              className="ct-rule h-px w-14"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(139,92,246,0.9), rgba(99,102,241,0.5), transparent)',
                transformOrigin: 'center',
                transform: 'scaleX(0)',
              }}
            />
          </div>
          <p className="mt-6 text-sm font-light text-gray-500 dark:text-gray-500 leading-relaxed">
            {t.contact.description}
          </p>
        </div>

        {/* Form or success state */}
        {!submitted ? (
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              className={inputClass}
              id="name"
              name="name"
              type="text"
              placeholder={t.contact.name}
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              className={inputClass}
              id="email"
              name="email"
              type="email"
              placeholder={t.contact.email}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              className={inputClass}
              id="message"
              name="message"
              placeholder={t.contact.message}
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="ct-field opacity-0 w-full h-11 rounded text-sm font-medium tracking-[0.04em] text-white transition-all duration-200 hover:-translate-y-px hover:brightness-110 active:translate-y-0"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
                boxShadow: '0 4px 24px rgba(124,58,237,0.25)',
              }}
            >
              {t.contact.sendButton}
            </button>
          </form>
        ) : (
          <div className="ct-success opacity-0 flex flex-col items-center gap-4 py-12 text-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.3)' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10l4.5 4.5L16 6" stroke="rgba(139,92,246,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-base font-light text-gray-900 dark:text-white">{t.contact.successMessage}</p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs tracking-[0.15em] uppercase text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              ← {t.contact.sendAnother || 'Send another'}
            </button>
          </div>
        )}

        {/* Social links */}
        <div className="ct-socials flex justify-center gap-6 mt-10">
          {socialLinks.linkedin && (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="opacity-0 text-gray-400 dark:text-gray-600 hover:text-violet-500 dark:hover:text-violet-400 transition-colors duration-200 hover:-translate-y-0.5 inline-block"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
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
              className="opacity-0 text-gray-400 dark:text-gray-600 hover:text-violet-500 dark:hover:text-violet-400 transition-colors duration-200 hover:-translate-y-0.5 inline-block"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
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
              className="opacity-0 text-gray-400 dark:text-gray-600 hover:text-violet-500 dark:hover:text-violet-400 transition-colors duration-200 hover:-translate-y-0.5 inline-block"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          )}
          <a
            href={`mailto:${personalInfo.email}`}
            aria-label="Email"
            className="opacity-0 text-gray-400 dark:text-gray-600 hover:text-violet-500 dark:hover:text-violet-400 transition-colors duration-200 hover:-translate-y-0.5 inline-block"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
