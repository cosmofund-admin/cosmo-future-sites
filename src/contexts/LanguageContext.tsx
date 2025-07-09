
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Language {
  code: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
}

export const languages: Language[] = [
  { code: 'ru', name: 'Русский', flag: '🇷🇺', currency: 'RUB', currencySymbol: '₽' },
  { code: 'en', name: 'English', flag: '🇺🇸', currency: 'USD', currencySymbol: '$' },
  { code: 'es', name: 'Español', flag: '🇪🇸', currency: 'EUR', currencySymbol: '€' },
  { code: 'pt', name: 'Português', flag: '🇵🇹', currency: 'EUR', currencySymbol: '€' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', currency: 'EUR', currencySymbol: '€' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', currency: 'EUR', currencySymbol: '€' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', currency: 'EUR', currencySymbol: '€' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', currency: 'JPY', currencySymbol: '¥' },
  { code: 'ko', name: '한국어', flag: '🇰🇷', currency: 'KRW', currencySymbol: '₩' },
  { code: 'zh', name: '中文', flag: '🇨🇳', currency: 'CNY', currencySymbol: '¥' },
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
    'services.title': 'Наши услуги',
    'services.landing': 'Лендинг',
    'services.landing.price': '15000',
    'services.simple': 'Простой сайт',
    'services.simple.price': '30000',
    'services.cabinet': 'Сайт с кабинетом',
    'services.cabinet.price': '45000',
    'services.custom': 'Индивидуальный проект',
    'contact.title': 'Свяжитесь с нами',
    'contact.name': 'Имя',
    'contact.email': 'Email',
    'contact.message': 'Сообщение',
    'contact.send': 'Отправить',
    'blog.title': 'Полезные статьи',
    'blog.subtitle': 'Экспертные материалы о веб-разработке, дизайне и цифровом маркетинге',
    'blog.all': 'Все статьи',
    'blog.read': 'Читать далее',
    'blog.search': 'Поиск статей...',
    'blog.category.all': 'Все',
    'blog.category.seo': 'SEO',
    'blog.category.design': 'Дизайн',
    'blog.category.development': 'Разработка',
    'blog.category.marketing': 'Маркетинг',
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
    'services.title': 'Our Services',
    'services.landing': 'Landing Page',
    'services.landing.price': '190',
    'services.simple': 'Simple Website',
    'services.simple.price': '390',
    'services.cabinet': 'Website with Dashboard',
    'services.cabinet.price': '590',
    'services.custom': 'Custom Project',
    'contact.title': 'Contact Us',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send',
    'blog.title': 'Useful Articles',
    'blog.subtitle': 'Expert materials on web development, design and digital marketing',
    'blog.all': 'All Articles',
    'blog.read': 'Read More',
    'blog.search': 'Search articles...',
    'blog.category.all': 'All',
    'blog.category.seo': 'SEO',
    'blog.category.design': 'Design',
    'blog.category.development': 'Development',
    'blog.category.marketing': 'Marketing',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.pricing': 'Precios',
    'nav.cases': 'Casos',
    'nav.blog': 'Blog',
    'nav.about': 'Acerca de',
    'nav.contact': 'Contacto',
    'hero.title': 'Laboratorio de Sitios Web del Futuro',
    'hero.subtitle': 'Creamos proyectos web ultramodernos en 24 horas',
    'hero.cta': 'Solicitar Sitio Web',
    'services.title': 'Nuestros Servicios',
    'services.landing': 'Página de Aterrizaje',
    'services.landing.price': '190',
    'services.simple': 'Sitio Web Simple',
    'services.simple.price': '390',
    'services.cabinet': 'Sitio Web con Panel',
    'services.cabinet.price': '590',
    'services.custom': 'Proyecto Personalizado',
    'contact.title': 'Contáctanos',
    'contact.name': 'Nombre',
    'contact.email': 'Email',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar',
    'blog.title': 'Artículos Útiles',
    'blog.subtitle': 'Materiales expertos sobre desarrollo web, diseño y marketing digital',
    'blog.all': 'Todos los Artículos',
    'blog.read': 'Leer Más',
    'blog.search': 'Buscar artículos...',
    'blog.category.all': 'Todos',
    'blog.category.seo': 'SEO',
    'blog.category.design': 'Diseño',
    'blog.category.development': 'Desarrollo',
    'blog.category.marketing': 'Marketing',
  }
};

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
  getCurrentCurrency: () => { currency: string; symbol: string };
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

  const getCurrentCurrency = () => {
    const lang = languages.find(l => l.code === currentLanguage) || languages[0];
    return { currency: lang.currency, symbol: lang.currencySymbol };
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, getCurrentCurrency }}>
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
