
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Layers, Users, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ServicesSection: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Globe,
      titleKey: 'services.landing',
      priceKey: 'services.landing.price',
      features: [
        'Адаптивный дизайн',
        'SEO-оптимизация',
        'Домен в подарок',
        'Поддержка 30 дней'
      ],
      popular: false,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Layers,
      titleKey: 'services.simple',
      priceKey: 'services.simple.price',
      features: [
        'До 10 страниц',
        'CMS система',
        'Аналитика',
        'Поддержка 60 дней'
      ],
      popular: true,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      titleKey: 'services.cabinet',
      priceKey: 'services.cabinet.price',
      features: [
        'Личный кабинет',
        'Авторизация',
        'База данных',
        'Поддержка 90 дней'
      ],
      popular: false,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Sparkles,
      titleKey: 'services.custom',
      priceKey: 'Договорная',
      features: [
        'Индивидуальный дизайн',
        'Сложная логика',
        'Интеграции',
        'Полное сопровождение'
      ],
      popular: false,
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold cosmic-text mb-6">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            От простых лендингов до сложных веб-приложений — мы создаем сайты для любых задач
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.titleKey}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-neon-blue to-neon-purple px-4 py-1 rounded-full text-sm font-bold text-white">
                    Популярный
                  </span>
                </div>
              )}

              <div className={`glass-morphism rounded-xl p-6 h-full border-2 transition-all duration-300 ${
                service.popular 
                  ? 'border-neon-blue/50 shadow-lg shadow-neon-blue/20' 
                  : 'border-cosmic-300/30 hover:border-neon-purple/50'
              }`}>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-6 mx-auto`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-2 text-center">
                  {t(service.titleKey)}
                </h3>

                <div className="text-center mb-6">
                  <span className="text-3xl font-bold cosmic-text">
                    {service.priceKey === 'Договорная' ? service.priceKey : t(service.priceKey)}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 rounded-full bg-neon-blue mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    service.popular
                      ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white'
                      : 'neon-border text-white hover:bg-cosmic-300/20'
                  }`}
                >
                  <span>Заказать</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technologies Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold cosmic-text mb-8">Технологии которые мы используем</h3>
          
          <div className="flex flex-wrap justify-center gap-6">
            {['React', 'Next.js', 'Three.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Supabase', 'Vercel'].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="glass-morphism px-6 py-3 rounded-full border border-neon-blue/30 hover:border-neon-blue/60 transition-all duration-300"
              >
                <span className="text-white font-medium">{tech}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
