import React, { useEffect, useState, useRef } from "react";
import { animate as anime, stagger } from "animejs";
import { personalInfo, splashScreen } from "../data/personalInfo";

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const splashRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    if (!splashRef.current) return;

    const splash = splashRef.current;
    const name = nameRef.current;
    const title = titleRef.current;
    const particles = particlesRef.current;

    // Create animated background particles
    const createParticles = () => {
      if (!particles) return;

      for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.className = "splash-particle";
        particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 100 + 50}px;
          height: ${Math.random() * 100 + 50}px;
          background: linear-gradient(45deg, 
            rgba(59, 130, 246, ${Math.random() * 0.3}), 
            rgba(139, 92, 246, ${Math.random() * 0.3})
          );
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          opacity: 0;
        `;
        particles.appendChild(particle);
      }

      const particleElements = particles.querySelectorAll(".splash-particle");

      // Animate particles entrance
      anime(particleElements, {
        opacity: [0, 0.6, 0.3],
        scale: [0, 1.2, 1],
        translateX: () => (Math.random() - 0.5) * 200,
        translateY: () => (Math.random() - 0.5) * 200,
        rotate: [0, 360],
        duration: 1500,
        easing: "easeOutExpo",
        delay: stagger(50),
      });
    };

    // Animate name letters
    const animateName = () => {
      if (!name) return;

      // Get the current text content
      const nameText = name.textContent || personalInfo.name;
      const letters = nameText
        .split("")
        .map((letter) => (letter === " " ? "\u00A0" : letter));

      // Clear and set up letter spans
      name.innerHTML = letters
        .map(
          (letter) =>
            `<span class="splash-letter" style="opacity: 0; display: inline-block;">${letter}</span>`
        )
        .join("");

      // Wait a bit to ensure DOM is updated
      setTimeout(() => {
        const letterElements = name.querySelectorAll(".splash-letter");

        if (letterElements.length > 0) {
          anime(letterElements, {
            opacity: [0, 1],
            scale: [0, 1.2, 1],
            translateY: [50, -10, 0],
            rotate: [0, 10, 0],
            duration: 800,
            easing: "easeOutBack",
            delay: stagger(80, { start: 300 }),
          });
        }
      }, 50);
    };

    // Animate title
    const animateTitle = () => {
      if (!title) return;

      anime(title, {
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.9, 1],
        duration: 800,
        easing: "easeOutExpo",
        delay: 1200,
      });
    };

    // Create geometric shapes
    const createShapes = () => {
      const shapes = [];
      for (let i = 0; i < 6; i++) {
        const shape = document.createElement("div");
        shape.className = "splash-shape";
        const size = Math.random() * 150 + 100;
        const angle = (360 / 6) * i;
        shape.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: linear-gradient(${angle}deg, 
            rgba(59, 130, 246, 0.1), 
            rgba(139, 92, 246, 0.1)
          );
          border: 2px solid rgba(59, 130, 246, 0.2);
          border-radius: ${i % 2 === 0 ? "50%" : "20%"};
          left: ${50 + Math.cos((angle * Math.PI) / 180) * 30}%;
          top: ${50 + Math.sin((angle * Math.PI) / 180) * 30}%;
          transform: translate(-50%, -50%);
          opacity: 0;
        `;
        splash.appendChild(shape);
        shapes.push(shape);
      }

      anime(shapes, {
        opacity: [0, 0.4, 0.2],
        scale: [0, 1.5, 1],
        rotate: [0, 180],
        duration: 2000,
        easing: "easeOutExpo",
        delay: stagger(150, { start: 200 }),
      });
    };

    // Animate logo with multiple elements
    const animateLogo = () => {
      const logo = splash.querySelector(".splash-logo");
      if (!logo) return;

      const core = logo.querySelector(".splash-logo-core");
      const ringOuter = logo.querySelector(".splash-logo-ring-outer");
      const ringMiddle = logo.querySelector(".splash-logo-ring-middle");
      const particles = logo.querySelectorAll(".splash-logo-particle");

      // Main logo container
      anime(logo, {
        opacity: [0, 1],
        scale: [0, 1.2, 1],
        duration: 1000,
        easing: "easeOutExpo",
        delay: 100,
      });

      // Core rotation
      if (core) {
        anime(core, {
          rotate: [0, 360],
          scale: [0.8, 1],
          duration: 2000,
          easing: "easeInOutSine",
          delay: 300,
        });
      }

      // Outer ring rotation (counter-clockwise)
      if (ringOuter) {
        anime(ringOuter, {
          rotate: [0, -360],
          scale: [0.9, 1.1, 1],
          duration: 3000,
          easing: "linear",
          delay: 400,
          loop: true,
        });
      }

      // Middle ring pulse
      if (ringMiddle) {
        anime(ringMiddle, {
          scale: [0.8, 1.2, 1],
          opacity: [0.3, 0.7, 0.5],
          duration: 2000,
          easing: "easeInOutSine",
          delay: 500,
          loop: true,
          direction: "alternate",
        });
      }

      // Particles animation
      if (particles && particles.length > 0) {
        particles.forEach((particle, i) => {
          const angle = (i * 90 * Math.PI) / 180;
          const targetX = Math.cos(angle) * 20;
          const targetY = Math.sin(angle) * 20;
          
          anime(particle, {
            opacity: [0, 1, 0.6],
            scale: [0, 1.5, 1],
            translateX: [0, targetX],
            translateY: [0, targetY],
            duration: 1500,
            easing: "easeOutExpo",
            delay: 600 + (i * 100),
          });
        });

        // Continuous floating animation for particles
        setTimeout(() => {
          particles.forEach((particle, i) => {
            const angle = (i * 90 * Math.PI) / 180;
            const baseX = Math.cos(angle) * 20;
            const baseY = Math.sin(angle) * 20;
            
            anime(particle, {
              translateX: [baseX, baseX + Math.cos(angle) * 10, baseX],
              translateY: [baseY, baseY + Math.sin(angle) * 10, baseY],
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
              duration: 2000,
              easing: "easeInOutSine",
              loop: true,
              direction: "alternate",
            });
          });
        }, 2000);
      }
    };

    // Animate loading dots
    const animateDots = () => {
      const dots = splash.querySelectorAll(".splash-dot");
      anime(dots, {
        opacity: [0, 1, 0],
        scale: [0.5, 1, 0.5],
        duration: 1000,
        easing: "easeInOutSine",
        delay: stagger(200, { start: 1500 }),
        loop: true,
      });
    };

    // Start animations in sequence
    animateLogo();
    createParticles();
    animateName();
    animateTitle();
    createShapes();
    animateDots();

    // Fade out and complete after 3 seconds
    const timer = setTimeout(() => {
      try {
        anime(splash, {
          opacity: [1, 0],
          scale: [1, 1.1],
          duration: 800,
          easing: "easeInExpo",
          complete: () => {
            setIsVisible(false);
            if (onComplete) {
              onComplete();
            }
          },
        });
      } catch (error) {
        console.error("Splash screen animation error:", error);
        setIsVisible(false);
        if (onComplete) {
          onComplete();
        }
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background-light dark:bg-background-dark"
      style={{
        opacity: 1,
      }}
    >
      {/* Animated background particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-6">
        {/* Logo/Icon - Animated and interesting */}
        <div className="splash-logo mb-4 relative" style={{ opacity: 0 }}>
          <div className="relative size-24 md:size-32">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 rounded-full border-4 border-primary/30 splash-logo-ring-outer" />
            
            {/* Middle pulsing ring */}
            <div className="absolute inset-2 rounded-full border-3 border-primary/50 splash-logo-ring-middle" />
            
            {/* Inner core with simple code symbol */}
            <div className="absolute inset-4 rounded-full splash-logo-core flex items-center justify-center">
              <svg
                fill="none"
                viewBox="0 0 80 80"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
                
                {/* Simple code brackets - clean and minimal */}
                <path
                  d="M 20 25 L 15 40 L 20 55"
                  stroke="url(#logoGradient)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 60 25 L 65 40 L 60 55"
                  stroke="url(#logoGradient)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Center dot representing code/connection */}
                <circle
                  cx="40"
                  cy="40"
                  r="8"
                  fill="url(#logoGradient)"
                />
              </svg>
            </div>
            
            {/* Floating particles around logo */}
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute splash-logo-particle"
                style={{
                  width: '8px',
                  height: '8px',
                  background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                  borderRadius: '50%',
                  left: `${50 + Math.cos((i * 90 * Math.PI) / 180) * 60}%`,
                  top: `${50 + Math.sin((i * 90 * Math.PI) / 180) * 60}%`,
                  transform: 'translate(-50%, -50%)',
                  opacity: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Name with letter-by-letter animation */}
        <h1
          ref={nameRef}
          className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tight"
        >
          {splashScreen.welcome}
        </h1>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium"
          style={{ opacity: 0 }}
        >
          {personalInfo.name}
        </h1>

        {/* Loading indicator */}
        <div className="splash-loader mt-8">
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="splash-dot w-3 h-3 rounded-full bg-primary"
                style={{ opacity: 0 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
