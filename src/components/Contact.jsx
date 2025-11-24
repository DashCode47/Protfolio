import React, { useState } from 'react';
import { socialLinks } from '../data/personalInfo';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add email sending logic here
    alert(t.contact.successMessage);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="text-center p-4" id="contacto">
      <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">
        {t.contact.title}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
        {t.contact.description}
      </p>
      <div className="max-w-md mx-auto bg-white dark:bg-[#192633] p-6 rounded-lg border border-gray-200 dark:border-[#324d67]">
        <form action="#" className="space-y-4" method="POST" onSubmit={handleSubmit}>
          <div>
            <label className="sr-only" htmlFor="name">{t.contact.name}</label>
            <input 
              className="w-full rounded border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary px-3 py-2" 
              id="name" 
              name="name" 
              placeholder={t.contact.name} 
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="email">{t.contact.email}</label>
            <input 
              className="w-full rounded border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary px-3 py-2" 
              id="email" 
              name="email" 
              placeholder={t.contact.email} 
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="message">{t.contact.message}</label>
            <textarea 
              className="w-full rounded border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary px-3 py-2" 
              id="message" 
              name="message" 
              placeholder={t.contact.message} 
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button 
            className="w-full flex items-center justify-center rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors" 
            type="submit"
          >
            <span className="truncate">{t.contact.sendButton}</span>
          </button>
        </form>
      </div>
      <div className="flex justify-center gap-6 mt-8">
        {socialLinks.linkedin && socialLinks.linkedin !== '#' && (
          <a 
            className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors" 
            aria-label="Perfil de LinkedIn" 
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect height="12" width="4" x="2" y="9"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        )}
        {socialLinks.instagram && socialLinks.instagram !== '#' && (
          <a 
            className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors" 
            aria-label="Perfil de Instagram" 
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
            </svg>
          </a>
        )}
        {socialLinks.github && socialLinks.github !== '#' && (
          <a 
            className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors" 
            aria-label="Perfil de GitHub" 
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        )}
      </div>
    </section>
  );
};

export default Contact;

