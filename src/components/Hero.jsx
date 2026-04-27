import React, { useEffect, useRef } from 'react';
import { animate as anime, stagger } from 'animejs';
import { personalInfo } from '../data/personalInfo';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';
import cvPdf from '../assets/cv.pdf';

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const heroRef = useRef(null);
  const imageWrapRef = useRef(null);

  // Entrance sequence
  useEffect(() => {
    if (!heroRef.current) return;
    const el = heroRef.current;

    anime(el.querySelector('.h-overline'), {
      opacity: [0, 1],
      translateY: [8, 0],
      duration: 600,
      easing: 'easeOutExpo',
      delay: 300,
    });

    anime(el.querySelector('.h-name'), {
      translateY: ['108%', '0%'],
      duration: 1100,
      easing: 'easeOutExpo',
      delay: 500,
    });

    anime(el.querySelector('.h-rule'), {
      scaleX: [0, 1],
      duration: 900,
      easing: 'easeOutExpo',
      delay: 1000,
    });

    anime(el.querySelector('.h-subtitle'), {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 700,
      easing: 'easeOutExpo',
      delay: 1050,
    });

    anime(el.querySelector('.h-description'), {
      opacity: [0, 1],
      translateY: [8, 0],
      duration: 700,
      easing: 'easeOutExpo',
      delay: 1250,
    });

    const btns = el.querySelectorAll('.h-btn');
    anime(btns, {
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 600,
      easing: 'easeOutExpo',
      delay: stagger(110, { start: 1450 }),
    });

    // Image entrance
    if (imageWrapRef.current) {
      anime(imageWrapRef.current, {
        opacity: [0, 1],
        scale: [0.92, 1],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 700,
      });

      // Single clean float — no competing animations
      setTimeout(() => {
        anime({
          targets: imageWrapRef.current,
          translateY: [0, -14],
          duration: 3800,
          easing: 'easeInOutSine',
          direction: 'alternate',
          loop: true,
        });
      }, 1800);
    }
  }, []);

  // Subtle mouse-parallax on the image glow
  useEffect(() => {
    const img = imageWrapRef.current;
    if (!img) return;

    const ring = img.querySelector('.img-ring');

    const onMove = (e) => {
      const { left, top, width, height } = img.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * 2;   // -1 to 1
      const y = ((e.clientY - top) / height - 0.5) * 2;
      const angle = Math.atan2(y, x) * (180 / Math.PI);
      if (ring) {
        ring.style.background = `conic-gradient(from ${angle}deg,
          rgba(139,92,246,0.8),
          rgba(99,102,241,0.5),
          rgba(59,130,246,0.3),
          rgba(139,92,246,0.1),
          rgba(139,92,246,0.8))`;
      }
    };

    const onLeave = () => {
      if (ring) {
        ring.style.background = `conic-gradient(from 200deg,
          rgba(139,92,246,0.7),
          rgba(99,102,241,0.4),
          rgba(59,130,246,0.25),
          rgba(139,92,246,0.1),
          rgba(139,92,246,0.7))`;
      }
    };

    img.addEventListener('mousemove', onMove);
    img.addEventListener('mouseleave', onLeave);
    return () => {
      img.removeEventListener('mousemove', onMove);
      img.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section ref={heroRef} id="inicio" className="@container">
      <div className="max-w-5xl mx-auto flex flex-col gap-10 px-4 md:px-6 py-16 md:py-24 @[864px]:flex-row @[864px]:items-center @[864px]:gap-16">

        {/* ── Text ── */}
        <div className="flex flex-col gap-5 text-center @[864px]:text-left @[864px]:flex-1">

          {/* Overline */}
          <div className="h-overline opacity-0 flex items-center gap-2 justify-center @[864px]:justify-start">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
            <span className="text-[0.62rem] tracking-[0.32em] uppercase text-violet-400 font-light">
              {personalInfo.title}
            </span>
          </div>

          {/* Name — clip reveal */}
          <div className="overflow-hidden leading-none">
            <h1
              className="h-name font-extralight text-gray-900 dark:text-white uppercase"
              style={{
                fontSize: 'clamp(2.6rem, 7.5vw, 5rem)',
                letterSpacing: '0.09em',
                lineHeight: 1.05,
                transform: 'translateY(110%)',
              }}
            >
              {personalInfo.name}
            </h1>
          </div>

          {/* Accent rule */}
          <div
            className="h-rule w-14 h-px self-center @[864px]:self-start"
            style={{
              background:
                'linear-gradient(90deg, rgba(139,92,246,0.9), rgba(99,102,241,0.5), transparent)',
              transformOrigin: 'left center',
              transform: 'scaleX(0)',
            }}
          />

          {/* Subtitle */}
          <p className="h-subtitle opacity-0 text-base md:text-lg font-light text-gray-600 dark:text-gray-400">
            {t.hero.subtitle}
          </p>

          {/* Description */}
          <p className="h-description opacity-0 text-sm text-gray-500 dark:text-gray-500 leading-relaxed max-w-lg mx-auto @[864px]:mx-0">
            {t.hero.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mt-1 mx-auto @[864px]:mx-0">
            <a
              href="#contacto"
              className="h-btn opacity-0 inline-flex items-center justify-center gap-2 h-11 px-7 rounded text-sm font-medium tracking-[0.04em] text-white transition-all duration-200 hover:-translate-y-px hover:brightness-110 active:translate-y-0"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
                boxShadow: '0 4px 24px rgba(124,58,237,0.3)',
              }}
            >
              {t.hero.contactButton}
            </a>
            <a
              href={cvPdf}
              download="David-Lozada-CV.pdf"
              className="h-btn opacity-0 inline-flex items-center justify-center gap-2 h-11 px-7 rounded text-sm font-medium tracking-[0.04em] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700/80 hover:border-violet-500/60 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-200 hover:-translate-y-px active:translate-y-0"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>download</span>
              {t.hero.downloadCV}
            </a>
          </div>
        </div>

        {/* ── Image ── */}
        <div className="flex justify-center flex-shrink-0 @[864px]:justify-end">
          <div
            ref={imageWrapRef}
            className="relative opacity-0"
            style={{ width: 'clamp(200px, 28vw, 288px)', height: 'clamp(200px, 28vw, 288px)' }}
          >
            {/* Gradient conic ring — reacts to mouse */}
            <div
              className="img-ring absolute inset-0 rounded-full p-[2px] transition-[background] duration-500"
              style={{
                background: `conic-gradient(from 200deg,
                  rgba(139,92,246,0.7),
                  rgba(99,102,241,0.4),
                  rgba(59,130,246,0.25),
                  rgba(139,92,246,0.1),
                  rgba(139,92,246,0.7))`,
              }}
            >
              {/* Blurred outer glow */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'inherit',
                  filter: 'blur(10px)',
                  opacity: 0.5,
                  transform: 'scale(1.05)',
                }}
              />
              {/* Solid bg mask so ring stays crisp */}
              <div className="relative w-full h-full rounded-full overflow-hidden bg-background-light dark:bg-background-dark">
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center calc(50% + 70px)' }}
                />
              </div>
            </div>

            {/* Outer faint ring */}
            <div
              className="absolute rounded-full border border-violet-500/10 dark:border-violet-500/15 pointer-events-none"
              style={{ inset: '-10px' }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
