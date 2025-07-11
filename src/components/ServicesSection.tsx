import React, { useState } from 'react';
import { Target, Search, Lightbulb, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import OrderModal from './OrderModal';

const ServicesSection: React.FC = () => {
  const { t, getCurrentCurrency } = useLanguage();
  const { symbol } = getCurrentCurrency();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  return (
    <section id="services" className="section-padding bg-black">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">
            СОБИРАЕМ СМЫСЛЫ
          </h2>
          <p className="text-xl text-white/70 max-w-4xl mx-auto">
            Анализируем, структурируем и упаковываем смыслы вашего бизнеса в понятный для аудитории продукт
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-12">
          {[
            {
              number: "01",
              title: "АНАЛИЗИРУЕМ",
              description: "Собираем и изучаем текущий бизнес контент, анализируем продукт, выявляем боли пользователей и запросы бизнеса",
              process: [
                "Аудит текущего контента",
                "Анализ целевой аудитории", 
                "Исследование пользователей",
                "Изучение бизнес-задач"
              ],
              icon: <Search className="w-8 h-8" />
            },
            {
              number: "02", 
              title: "СТРУКТУРИРУЕМ",
              description: "Анализируем бизнес конкурентов на предмет подачи смыслов целевой аудитории, выявляем ценностное предложение бизнеса",
              process: [
                "Конкурентный анализ",
                "Позиционирование", 
                "Ценностное предложение",
                "Стратегия коммуникации"
              ],
              icon: <Target className="w-8 h-8" />
            },
            {
              number: "03",
              title: "УПАКОВЫВАЕМ", 
              description: "Создаем смысловой прототип проекта — на базе готового фундамента переводим смыслы в визуальный язык",
              process: [
                "Смысловое прототипирование",
                "Визуальная концепция",
                "Дизайн-система", 
                "Финальная реализация"
              ],
              icon: <Zap className="w-8 h-8" />
            }
          ].map((stage, index) => (
            <div 
              key={index} 
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-6 right-6 text-6xl font-bold text-white/10 group-hover:text-white/20 transition-colors">
                {stage.number}
              </div>
              
              <div className="text-white mb-6 relative z-10">
                {stage.icon}
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-white transition-colors relative z-10">
                {stage.title}
              </h3>
              <p className="text-white/70 mb-8 leading-relaxed text-lg relative z-10">
                {stage.description}
              </p>
              <div className="space-y-3 relative z-10 mb-8">
                {stage.process.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center text-white/60">
                    <div className="w-2 h-2 bg-white/40 rounded-full mr-4 flex-shrink-0"></div>
                    <span className="text-base">{item}</span>
                  </div>
                ))}
              </div>

              <button 
                className="w-full py-3 px-6 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-all duration-300 relative z-10"
                onClick={() => {
                  setSelectedService(stage.title);
                  setIsModalOpen(true);
                }}
              >
                НАЙТИ СМЫСЛЫ
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-20 text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12">
            <Lightbulb className="w-16 h-16 text-white mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-6">
              ПОЧЕМУ СМЫСЛЫ ТАК ВАЖНЫ?
            </h3>
            <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed mb-8">
              Перед началом любого проекта особое внимание уделяем смыслам — устраняем хаос в массиве информации 
              и создаем понятный для вашей целевой аудитории digital продукт
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="space-y-4">
                <div className="text-4xl font-bold text-white/20">🎯</div>
                <h4 className="text-xl font-semibold text-white">Четкое позиционирование</h4>
                <p className="text-white/60">Ваш бизнес получает ясную формулировку ценности для клиентов</p>
              </div>
              <div className="space-y-4">
                <div className="text-4xl font-bold text-white/20">💡</div>
                <h4 className="text-xl font-semibold text-white">Понятная коммуникация</h4>
                <p className="text-white/60">Клиенты сразу понимают, зачем им ваш продукт или услуга</p>
              </div>
              <div className="space-y-4">
                <div className="text-4xl font-bold text-white/20">🚀</div>
                <h4 className="text-xl font-semibold text-white">Рост продаж</h4>
                <p className="text-white/60">Правильно упакованные смыслы напрямую влияют на конверсию</p>
              </div>
            </div>
          </div>
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