import React, { useEffect, useRef } from 'react';
import { animate as anime, stagger } from 'animejs';
import { personalInfo } from '../data/personalInfo';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';
import cvPdf from '../assets/cv.pdf';

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    // Animate profile image with stunning entrance
    if (imageRef.current) {
      const imageContainer = imageRef.current;
      const image = imageContainer.querySelector('img');
      const gradientBorder = imageContainer.parentElement?.querySelector('.hero-gradient-border');
      
      // Animate gradient border fade in
      if (gradientBorder) {
        anime(gradientBorder, {
          opacity: [0, 0.6],
          scale: [0.8, 1],
          duration: 1000,
          easing: 'easeOutExpo',
          delay: 400,
        });
      }

      // Initial entrance animation - dramatic and eye-catching
      anime(imageContainer, {
        opacity: [0, 1],
        scale: [0.5, 1.1, 1],
        rotate: [-15, 5, 0],
        duration: 1200,
        easing: 'easeOutBack',
        delay: 200,
      });

      // Animate the image itself with a subtle zoom
      if (image) {
        anime(image, {
          scale: [1.2, 1],
          duration: 1500,
          easing: 'easeOutExpo',
          delay: 400,
        });
      }

      // Continuous floating animation - smooth and mesmerizing
      setTimeout(() => {
        anime({
          targets: imageContainer,
          translateY: [0, -15],
          duration: 3000,
          easing: 'easeInOutSine',
          direction: 'alternate',
          loop: true,
        });
      }, 1500);

      // Subtle rotation animation for depth
      setTimeout(() => {
        anime({
          targets: imageContainer,
          rotate: [0, 2, -2, 0],
          duration: 4000,
          easing: 'easeInOutSine',
          direction: 'alternate',
          loop: true,
        });
      }, 2000);

      // Pulse/glow effect
      setTimeout(() => {
        anime({
          targets: imageContainer,
          scale: [1, 1.02, 1],
          duration: 2500,
          easing: 'easeInOutSine',
          direction: 'alternate',
          loop: true,
        });
      }, 2500);
    }

    // Animate title with slide up and fade
    if (titleRef.current) {
      anime(titleRef.current, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutExpo',
        delay: 400,
      });
    }

    // Animate description
    if (descriptionRef.current) {
      anime(descriptionRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        easing: 'easeOutExpo',
        delay: 600,
      });
    }

    // Animate buttons with stagger
    if (buttonsRef.current) {
      const buttons = buttonsRef.current.children;
      anime(buttons, {
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.9, 1],
        duration: 600,
        easing: 'easeOutExpo',
        delay: stagger(100, { start: 800 }),
      });
    }
  }, []);

  return (
    <section className="@container pt-10" id="inicio">
      <div className="flex flex-col gap-6 px-4 py-10 @[480px]:gap-8 @[864px]:flex-row-reverse @[864px]:items-center">
        <div className="w-full max-w-xs mx-auto @[864px]:w-1/3">
          <div className="relative inline-block w-full" style={{ padding: '4px' }}>
            {/* Rotating gradient border */}
            <div 
              className="absolute inset-0 rounded-full hero-gradient-border"
              style={{
                background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #3b82f6)',
                backgroundSize: '400% 400%',
                borderRadius: '50%',
                filter: 'blur(2px)',
                zIndex: 0,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
            {/* Main image container */}
            <div 
              ref={imageRef}
              className="relative aspect-square bg-center bg-no-repeat bg-cover rounded-full overflow-hidden opacity-0 hero-image-container"
              data-alt="Foto de perfil profesional de David Lozada"
              style={{
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.2)',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {/* Shimmer overlay */}
              <div 
                className="absolute inset-0 hero-shimmer"
                style={{
                  background: 'linear-gradient(110deg, transparent 40%, rgba(255, 255, 255, 0.3) 50%, transparent 60%)',
                  backgroundSize: '200% 100%',
                  pointerEvents: 'none',
                  zIndex: 2,
                  borderRadius: '50%',
                }}
              />
              <img 
                src={personalInfo.profileImage} 
                alt="David Lozada"
                className="w-full h-full object-cover relative"
                style={{ objectPosition: 'center calc(50% + 70px)', zIndex: 1 }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 text-center @[864px]:text-left @[864px]:w-2/3 @[480px]:gap-8">
          <div className="flex flex-col gap-2">
            <h1 
              ref={titleRef}
              className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] opacity-0"
            >
              {t.hero.subtitle}
            </h1>
            <h2 
              ref={descriptionRef}
              className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal @[480px]:text-lg @[480px]:font-normal @[480px]:leading-relaxed opacity-0"
            >
              {t.hero.description}
            </h2>
          </div>
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3 mx-auto @[864px]:mx-0">
            <a 
              className="flex min-w-[84px] max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] opacity-0 hover:scale-105 transition-transform" 
              href="#contacto"
            >
              <span className="truncate">{t.hero.contactButton}</span>
            </a>
            <a 
              className="flex min-w-[84px] max-w-xs cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] transition-colors opacity-0 hover:scale-105 transition-transform" 
              href={cvPdf}
              download="David-Lozada-CV.pdf"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>download</span>
              <span className="truncate">{t.hero.downloadCV}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

