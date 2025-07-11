
import React, { useState } from 'react';
import { Check, Zap, Shield, Award, Code, Palette, Search, Smartphone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import OrderModal from './OrderModal';

const ServicesSection: React.FC = () => {
  const { t, getCurrentCurrency } = useLanguage();
  const { symbol } = getCurrentCurrency();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const services = [
    {
      name: t('services.landing'),
      price: t('services.landing.price'),
      description: 'Эффективная страница для конверсии посетителей в клиентов',
      features: [
        'Адаптивный дизайн',
        'SEO-оптимизация',
        'Форма обратной связи',
        'Интеграция с CRM',
        'Аналитика',
        '30 дней поддержки'
      ],
      popular: false,
      icon: <Zap className="w-8 h-8" />
    },
    {
      name: t('services.simple'),
      price: t('services.simple.price'),
      description: 'Многостраничный сайт для представления вашего бизнеса',
      features: [
        'До 5 страниц',
        'Панель администратора',
        'Блог система',
        'Галерея работ',
        'Контактные формы',
        'SSL сертификат',
        '60 дней поддержки'
      ],
      popular: true,
      icon: <Code className="w-8 h-8" />
    },
    {
      name: t('services.cabinet'),
      price: t('services.cabinet.price'),
      description: 'Сайт с личным кабинетом и расширенным функционалом',
      features: [
        'Личный кабинет пользователей',
        'Система авторизации',
        'База данных',
        'API интеграции',
        'Уведомления',
        'Резервное копирование',
        '90 дней поддержки'
      ],
      popular: false,
      icon: <Shield className="w-8 h-8" />
    }
  ];

  const technologies = [
    { name: 'React', icon: <Code className="w-6 h-6" /> },
    { name: 'TypeScript', icon: <Code className="w-6 h-6" /> },
    { name: 'Tailwind CSS', icon: <Palette className="w-6 h-6" /> },
    { name: 'SEO Ready', icon: <Search className="w-6 h-6" /> },
    { name: 'Mobile First', icon: <Smartphone className="w-6 h-6" /> },
    { name: 'Performance', icon: <Zap className="w-6 h-6" /> }
  ];

  return (
    <section id="services" className="section-padding bg-black">
      <div className="container-custom">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
            УСЛУГИ
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">
            Минималистичные решения для максимального результата
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              {service.popular && (
                <div className="absolute -top-3 left-6">
                  <div className="bg-white text-black px-3 py-1 rounded-full text-sm font-medium">
                    ХИТ
                  </div>
                </div>
              )}
              
              <div className="mb-8">
                <div className="text-white mb-4">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.name}</h3>
                <div className="text-4xl font-bold text-white mb-2">
                  {symbol}{service.price}
                </div>
                <p className="text-white/60 text-sm mb-6">{service.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <div className="w-1 h-1 bg-white rounded-full flex-shrink-0" />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className="w-full py-3 px-6 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-all duration-300"
                onClick={() => {
                  setSelectedService(service.name);
                  setIsModalOpen(true);
                }}
              >
                ЗАКАЗАТЬ
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <OrderModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedService={selectedService}
      />
    </section>
  );
};

export default ServicesSection;
