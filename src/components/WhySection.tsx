
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, DollarSign, Shield, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WhySection: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Zap,
      titleKey: 'why.speed',
      description: 'Загрузка менее 2 секунд, оптимизация производительности, lazy-loading',
      color: 'from-neon-blue to-cyan-400'
    },
    {
      icon: DollarSign,
      titleKey: 'why.price',
      description: 'Фиксированные цены, прозрачная стоимость, никаких скрытых платежей',
      color: 'from-neon-green to-emerald-400'
    },
    {
      icon: Shield,
      titleKey: 'why.quality',
      description: 'Современные технологии, адаптивный дизайн, кроссбраузерность',
      color: 'from-neon-purple to-violet-400'
    },
    {
      icon: Search,
      titleKey: 'why.seo',
      description: 'AI-поиск готовность, мета-теги, структурированные данные',
      color: 'from-neon-pink to-rose-400'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold cosmic-text mb-6">
            Почему выбирают нас?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Мы создаем не просто сайты — мы создаем цифровые решения будущего
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2 }
              }}
              className="group"
            >
              <div className="glass-morphism p-6 rounded-xl border border-cosmic-300/30 hover:border-neon-blue/50 transition-all duration-300 h-full">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 mx-auto`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-4 text-center">
                  {t(feature.titleKey)}
                </h3>

                <p className="text-gray-400 text-center leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover effect lines */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`h-1 bg-gradient-to-r ${feature.color} mt-6 rounded-full origin-left`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional animated elements */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 blur-xl"
        />
        
        <motion.div
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-gradient-to-r from-neon-pink/20 to-neon-green/20 blur-xl"
        />
      </div>
    </section>
  );
};

export default WhySection;
