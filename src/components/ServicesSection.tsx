
import React, { useState } from 'react';
import { Check, Zap, Shield, Award, Code, Palette, Search, Smartphone } from 'lucide-react';
import OrderModal from './OrderModal';

const ServicesSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const services = [
    {
      name: 'Лендинг',
      price: '95',
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
      name: 'Сайт',
      price: '195',
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
      name: 'Сайт с кабинетом',
      price: '295',
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

  const handleOrderClick = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Наши <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Услуги</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Профессиональная разработка сайтов с использованием современных технологий
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {technologies.map((tech) => (
              <div key={tech.name} className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-200/50">
                <div className="text-blue-600">{tech.icon}</div>
                <span className="text-sm font-medium text-gray-700">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className={`relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${service.popular ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}>
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Award className="w-4 h-4" />
                    <span>Хит продаж</span>
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl mb-4">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 text-sm mb-6">{service.description}</p>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  от ${service.price}
                </div>
                <p className="text-gray-500 text-sm">за проект</p>
              </div>

              <ul className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleOrderClick(service.name)}
                className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
              >
                Заказать сейчас
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
