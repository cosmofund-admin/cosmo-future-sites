
import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Создаем сайты
            <span className="block text-blue-600">за 24 часа</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Профессиональная веб-разработка с современным дизайном, 
            быстрой загрузкой и SEO-оптимизацией
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
              Заказать сайт
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              Посмотреть портфолио
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600">Выполненных проектов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">24ч</div>
              <div className="text-gray-600">Средний срок разработки</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">98%</div>
              <div className="text-gray-600">Довольных клиентов</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
