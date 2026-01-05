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
  const borderContainerRef = useRef(null);
  const heroSectionRef = useRef(null);

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

    // Animate description with stunning word-by-word reveal
    if (descriptionRef.current) {
      const description = descriptionRef.current;
      
      // Store original text to restore if needed
      const originalText = t.hero.description;
      
      // Split text into words and wrap each word in a span
      const words = originalText.split(' ');
      description.innerHTML = words.map((word) => 
        `<span class="hero-word" style="opacity: 0; display: inline-block;">${word}</span>`
      ).join(' ');

      // Animate each word with stagger - eye-catching reveal
      const wordElements = description.querySelectorAll('.hero-word');
      anime(wordElements, {
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.8, 1],
        duration: 600,
        easing: 'easeOutExpo',
        delay: stagger(30, { start: 700 }),
      });

      // Add continuous subtle animation after initial reveal
      setTimeout(() => {
        // Subtle fade pulse effect on random words for dynamic feel
        const randomWords = Array.from(wordElements).sort(() => 0.5 - Math.random()).slice(0, Math.floor(wordElements.length / 4));
        
        anime({
          targets: randomWords,
          opacity: [1, 0.7, 1],
          scale: [1, 1.05, 1],
          duration: 2000,
          easing: 'easeInOutSine',
          direction: 'alternate',
          loop: true,
          delay: stagger(200),
        });
      }, 2000);
    }
  }, [language, t.hero.description]);

  // Mouse tracking effect for gradient border - Interactive and fluid (works even outside container)
  useEffect(() => {
    if (borderContainerRef.current && heroSectionRef.current) {
      const borderContainer = borderContainerRef.current;
      const gradientBorder = borderContainer.querySelector('.hero-gradient-border');
      const section = heroSectionRef.current;
      
      if (gradientBorder) {
        let currentX = 50;
        let currentY = 50;
        let targetX = 50;
        let targetY = 50;
        let animationId = null;
        let isActive = false;

        const updateGradient = () => {
          // Smooth interpolation for fluid movement
          currentX += (targetX - currentX) * 0.2;
          currentY += (targetY - currentY) * 0.2;
          
          // Check if we need to continue animating
          const diffX = Math.abs(targetX - currentX);
          const diffY = Math.abs(targetY - currentY);
          
          // Calculate dynamic colors based on mouse position
          const hue = (currentX / 100) * 360;
          const saturation = 70 + (currentY / 100) * 20;
          const lightness = 55 + Math.sin(currentX / 25) * 10;
          
          // Create vibrant gradient colors that change with position
          const color1 = `hsl(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(lightness)}%)`;
          const color2 = `hsl(${Math.round((hue + 90) % 360)}, ${Math.round(saturation + 15)}%, ${Math.round(lightness + 8)}%)`;
          const color3 = `hsl(${Math.round((hue + 180) % 360)}, ${Math.round(saturation)}%, ${Math.round(lightness)}%)`;
          const color4 = `hsl(${Math.round((hue + 270) % 360)}, ${Math.round(saturation - 10)}%, ${Math.round(lightness - 8)}%)`;
          
          // Calculate angle based on mouse position for dynamic rotation
          const angle = Math.atan2(currentY - 50, currentX - 50) * (180 / Math.PI) + 90;
          
          // Update gradient directly for immediate visual feedback
          const gradientString = `linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3}, ${color4})`;
          gradientBorder.style.background = gradientString;
          gradientBorder.style.backgroundPosition = `${currentX}% ${currentY}%`;
          
          // Continue animation if still moving or active
          if ((diffX > 0.5 || diffY > 0.5) && isActive) {
            animationId = requestAnimationFrame(updateGradient);
          } else {
            animationId = null;
          }
        };

        const handleMouseMove = (e) => {
          const borderRect = borderContainer.getBoundingClientRect();
          const sectionRect = section.getBoundingClientRect();
          
          // Calculate mouse position relative to border container (even if outside)
          const mouseX = e.clientX - borderRect.left;
          const mouseY = e.clientY - borderRect.top;
          
          // Calculate position as percentage (0-100), allow values outside 0-100 for extended effect
          let calculatedX = (mouseX / borderRect.width) * 100;
          let calculatedY = (mouseY / borderRect.height) * 100;
          
          // Check if mouse is within section bounds
          const isInSection = 
            e.clientX >= sectionRect.left && 
            e.clientX <= sectionRect.right &&
            e.clientY >= sectionRect.top && 
            e.clientY <= sectionRect.bottom;
          
          if (isInSection) {
            isActive = true;
            // Map to 0-100 range but allow some extension beyond bounds for smoother effect
            targetX = Math.max(-20, Math.min(120, calculatedX));
            targetY = Math.max(-20, Math.min(120, calculatedY));
            
            // Start animation loop if not already running
            if (!animationId) {
              updateGradient();
            }
          }
        };

        const handleMouseLeave = () => {
          isActive = false;
          // Smoothly return to center and default colors
          targetX = 50;
          targetY = 50;
          
          // Continue animation to return to center
          if (!animationId) {
            const returnToCenter = () => {
              currentX += (targetX - currentX) * 0.1;
              currentY += (targetY - currentY) * 0.1;
              
              const diffX = Math.abs(targetX - currentX);
              const diffY = Math.abs(targetY - currentY);
              
              // Gradually return to default gradient
              const defaultGradient = 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #3b82f6)';
              
              if (diffX > 1 || diffY > 1) {
                gradientBorder.style.background = defaultGradient;
                gradientBorder.style.backgroundPosition = `${currentX}% ${currentY}%`;
                animationId = requestAnimationFrame(returnToCenter);
              } else {
                gradientBorder.style.background = defaultGradient;
                gradientBorder.style.backgroundPosition = '50% 50%';
                animationId = null;
              }
            };
            returnToCenter();
          }
        };

        // Listen to mouse movement on the entire section, not just the container
        section.addEventListener('mousemove', handleMouseMove);
        section.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          section.removeEventListener('mousemove', handleMouseMove);
          section.removeEventListener('mouseleave', handleMouseLeave);
          if (animationId) {
            cancelAnimationFrame(animationId);
          }
        };
      }
    }
  }, []);

  // Animate buttons with stagger
  useEffect(() => {
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
    <section ref={heroSectionRef} className="@container pt-10" id="inicio">
      <div className="flex flex-col gap-6 px-4 py-10 @[480px]:gap-8 @[864px]:flex-row-reverse @[864px]:items-center">
        <div className="w-full max-w-xs mx-auto @[864px]:w-1/3">
          <div 
            ref={borderContainerRef}
            className="relative inline-block w-full" 
            style={{ padding: '4px', cursor: 'pointer' }}
          >
            {/* Rotating gradient border - follows mouse */}
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
                transition: 'background 0.3s ease',
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
              className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal @[480px]:text-lg @[480px]:font-normal @[480px]:leading-relaxed hero-description"
              style={{
                textShadow: '0 0 0px rgba(59, 130, 246, 0)',
              }}
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

