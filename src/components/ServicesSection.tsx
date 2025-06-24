
import React from 'react';
import { Globe, Layers, Users, Sparkles, ArrowRight, Check } from 'lucide-react';

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: Globe,
      title: 'Лендинг страница',
      price: 'от 15 000₽',
      features: [
        'Адаптивный дизайн',
        'SEO-оптимизация',
        'Домен в подарок',
        'Поддержка 30 дней',
        'Аналитика Google',
        'Форма обратной связи'
      ],
      popular: false,
      gradient: 'from-blue-500 to-cyan-500',
      deliveryTime: '1-3 дня'
    },
    {
      icon: Layers,
      title: 'Корпоративный сайт',
      price: 'от 45 000₽',
      features: [
        'До 10 страниц',
        'CMS система',
        'Аналитика и метрики',
        'Поддержка 60 дней',
        'SEO-продвижение',
        'Интеграция с соцсетями'
      ],
      popular: true,
      gradient: 'from-purple-500 to-pink-500',
      deliveryTime: '3-7 дней'
    },
    {
      icon: Users,
      title: 'Интернет-магазин',
      price: 'от 85 000₽',
      features: [
        'Личный кабинет',
        'Система оплаты',
        'База данных товаров',
        'Поддержка 90 дней',
        'Админ панель',
        'Интеграция с 1С'
      ],
      popular: false,
      gradient: 'from-green-500 to-emerald-500',
      deliveryTime: '7-14 дней'
    },
    {
      icon: Sparkles,
      title: 'Индивидуальная разработка',
      price: 'Договорная',
      features: [
        'Уникальный дизайн',
        'Сложная логика',
        'API интеграции',
        'Полное сопровождение',
        'Масштабируемость',
        'Техподдержка 24/7'
      ],
      popular: false,
      gradient: 'from-orange-500 to-red-500',
      deliveryTime: '14-30 дней'
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-blue-700">Наши услуги</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Выберите свой
            <span className="block gradient-text">идеальный пакет</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            От простых лендингов до сложных веб-приложений — мы создаем сайты для любых задач и бюджетов
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`relative group bg-white rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  service.popular 
                    ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                    : 'border-gray-200 hover:border-blue-300'
                } animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Хит продаж
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>

                  <div className="mb-6">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {service.price}
                    </div>
                    <div className="text-sm text-gray-500">
                      Срок: {service.deliveryTime}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={scrollToContact}
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                      service.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105'
                        : 'border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <span>Заказать</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technologies Section */}
        <div className="mt-20 text-center animate-fade-in">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Технологии мирового уровня
          </h3>
          
          <div className="flex flex-wrap justify-center gap-6">
            {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Vercel', 'Figma'].map((tech, index) => (
              <div
                key={tech}
                className="group bg-white border-2 border-gray-200 hover:border-blue-300 px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors duration-200">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
