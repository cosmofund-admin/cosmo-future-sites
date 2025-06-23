
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

export const languages: Language[] = [
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

const translations = {
  ru: {
    'nav.home': 'Главная',
    'nav.services': 'Услуги',
    'nav.pricing': 'Цены',
    'nav.cases': 'Кейсы',
    'nav.blog': 'Блог',
    'nav.about': 'О нас',
    'nav.contact': 'Контакты',
    'hero.title': 'Лаборатория сайтов будущего',
    'hero.subtitle': 'Создаём веб-проекты с ультрасовременным дизайном за 24 часа',
    'hero.cta': 'Заказать сайт',
    'why.speed': 'Молниеносная скорость',
    'why.price': 'Честные цены',
    'why.quality': 'Высокое качество',
    'why.seo': 'SEO-готовность',
    'services.title': 'Наши услуги',
    'services.landing': 'Лендинг',
    'services.landing.price': '$95',
    'services.simple': 'Простой сайт',
    'services.simple.price': '$195',
    'services.cabinet': 'Сайт с кабинетом',
    'services.cabinet.price': '$295',
    'services.custom': 'Индивидуальный проект',
    'contact.title': 'Свяжитесь с нами',
    'contact.name': 'Имя',
    'contact.email': 'Email',
    'contact.message': 'Сообщение',
    'contact.send': 'Отправить',
  },
  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.pricing': 'Pricing',
    'nav.cases': 'Cases',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'hero.title': 'Future Website Laboratory',
    'hero.subtitle': 'Creating ultra-modern web projects in 24 hours',
    'hero.cta': 'Order Website',
    'why.speed': 'Lightning Speed',
    'why.price': 'Fair Pricing',
    'why.quality': 'High Quality',
    'why.seo': 'SEO Ready',
    'services.title': 'Our Services',
    'services.landing': 'Landing Page',
    'services.landing.price': '$95',
    'services.simple': 'Simple Website',
    'services.simple.price': '$195',
    'services.cabinet': 'Website with Dashboard',
    'services.cabinet.price': '$295',
    'services.custom': 'Custom Project',
    'contact.title': 'Contact Us',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send',
  }
};

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('ru');

  const setLanguage = (language: string) => {
    setCurrentLanguage(language);
  };

  const t = (key: string): string => {
    const translation = translations[currentLanguage as keyof typeof translations] || translations.ru;
    return translation[key as keyof typeof translation] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
