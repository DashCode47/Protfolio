import { useEffect, useRef } from 'react';
import { animate as anime, stagger } from 'animejs';

/**
 * Custom hook for scroll-triggered animations using Anime.js
 * @param {Object} options - Animation options
 * @param {string} options.selector - CSS selector for elements to animate
 * @param {Object} options.animation - Anime.js animation properties
 * @param {number} options.threshold - Intersection Observer threshold (0-1)
 * @param {boolean} options.once - Whether to animate only once
 */
export const useAnimateOnScroll = ({
  selector,
  animation = {},
  threshold = 0.1,
  once = true,
}) => {
  const hasAnimated = useRef(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return;

    const defaultAnimation = {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      easing: 'easeOutExpo',
      delay: stagger(100),
      ...animation,
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (once && hasAnimated.current) return;
            
            anime(entry.target, {
              ...defaultAnimation,
            });

            if (once) {
              hasAnimated.current = true;
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold }
    );

    elements.forEach((el) => observer.observe(el));
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        elements.forEach((el) => observerRef.current.unobserve(el));
      }
    };
  }, [selector, threshold, once, animation]);
};

/**
 * Hook for animating a single element on scroll
 */
export const useAnimateElement = (ref, options = {}) => {
  useEffect(() => {
    if (!ref.current) return;

    const defaultOptions = {
      threshold: 0.1,
      once: true,
      animation: {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutExpo',
      },
      ...options,
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime(entry.target, {
              ...defaultOptions.animation,
            });

            if (defaultOptions.once) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: defaultOptions.threshold }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);
};

