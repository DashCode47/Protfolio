import React, { useEffect, useState, useRef } from "react";
import { animate as anime } from "animejs";
import { personalInfo } from "../data/personalInfo";

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const splashRef = useRef(null);

  useEffect(() => {
    if (!splashRef.current) return;
    const el = splashRef.current;

    anime(el, {
      opacity: [0, 1],
      duration: 500,
      easing: "easeOutSine",
    });

    anime(el.querySelectorAll(".s-rule"), {
      scaleX: [0, 1],
      duration: 1000,
      easing: "easeInOutExpo",
      delay: 250,
    });

    anime(el.querySelector(".s-name"), {
      translateY: ["105%", "0%"],
      duration: 1100,
      easing: "easeOutExpo",
      delay: 700,
    });

    anime(el.querySelector(".s-subtitle"), {
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 700,
      easing: "easeOutExpo",
      delay: 1350,
    });

    anime(el.querySelector(".s-meta"), {
      opacity: [0, 1],
      translateY: [8, 0],
      duration: 600,
      easing: "easeOutExpo",
      delay: 1700,
    });

    const exitTimer = setTimeout(() => {
      anime(el, {
        opacity: [1, 0],
        duration: 800,
        easing: "easeInCubic",
        complete: () => {
          setIsVisible(false);
          onComplete?.();
        },
      });
    }, 3800);

    return () => clearTimeout(exitTimer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: "#06060b", opacity: 0 }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 35% at 50% 50%, rgba(99,60,220,0.14) 0%, transparent 70%)",
        }}
      />

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(139,92,246,0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.5,
        }}
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center select-none px-6">
        {/* Top rule */}
        <div
          className="s-rule w-72 md:w-[26rem] h-px mb-7"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.35) 25%, rgba(129,140,248,0.75) 50%, rgba(139,92,246,0.35) 75%, transparent 100%)",
            transformOrigin: "center",
            transform: "scaleX(0)",
          }}
        />

        {/* Name — overflow:hidden acts as clip mask for the reveal */}
        <div className="overflow-hidden pb-1">
          <h1
            className="s-name font-extralight text-white uppercase"
            style={{
              fontSize: "clamp(2.8rem, 9vw, 6rem)",
              letterSpacing: "0.15em",
              transform: "translateY(110%)",
              lineHeight: 1,
            }}
          >
            {personalInfo.name}
          </h1>
        </div>

        {/* Bottom rule */}
        <div
          className="s-rule w-72 md:w-[26rem] h-px mt-7"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.35) 25%, rgba(129,140,248,0.75) 50%, rgba(139,92,246,0.35) 75%, transparent 100%)",
            transformOrigin: "center",
            transform: "scaleX(0)",
          }}
        />

        {/* Role */}
        <p
          className="s-subtitle mt-8 text-[0.65rem] md:text-[0.7rem] tracking-[0.35em] text-indigo-300/70 uppercase font-light"
          style={{ opacity: 0 }}
        >
          <span className="mx-3 opacity-40">·</span>
          Software Developer
        </p>

        {/* Location */}
        <p
          className="s-meta mt-3 text-[0.6rem] tracking-[0.3em] text-gray-600 uppercase"
          style={{ opacity: 0 }}
        >
          {personalInfo.location}
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
