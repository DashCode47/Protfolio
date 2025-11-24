import React from 'react';
import { personalInfo } from '../data/personalInfo';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="@container pt-10" id="inicio">
      <div className="flex flex-col gap-6 px-4 py-10 @[480px]:gap-8 @[864px]:flex-row-reverse @[864px]:items-center">
        <div className="w-full max-w-xs mx-auto @[864px]:w-1/3">
          <div 
            className="aspect-square bg-center bg-no-repeat bg-cover rounded-full overflow-hidden" 
            data-alt="Foto de perfil profesional de David Lozada"
          >
            <img 
              src={personalInfo.profileImage} 
              alt="David Lozada"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center calc(50% + 70px)' }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 text-center @[864px]:text-left @[864px]:w-2/3 @[480px]:gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
              {t.hero.subtitle}
            </h1>
            <h2 className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal @[480px]:text-lg @[480px]:font-normal @[480px]:leading-relaxed">
              {t.hero.description}
            </h2>
          </div>
          <a 
            className="flex min-w-[84px] max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] mx-auto @[864px]:mx-0" 
            href="#contacto"
          >
            <span className="truncate">{t.hero.contactButton}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

