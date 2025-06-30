
import React from 'react';
import { ArrowRight, Star, Users, Award, Zap } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const stats = [
    { number: 500, label: 'Проектов', icon: Award },
    { number: 24, label: 'Часа на разработку', icon: Zap },
    { number: 98, label: '% довольных клиентов', icon: Star },
    { number: 150, label: 'Счастливых клиентов', icon: Users }
  ];

  return (
    <div id="hero" className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Доступны для новых проектов</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Создаем
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">сайты мечты</span>
                <span className="text-4xl lg:text-5xl text-gray-600">за 24 часа</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                Профессиональная веб-разработка с премиальным дизайном, 
                молниеносной скоростью и SEO-оптимизацией мирового уровня
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('services')}
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
              >
                <span>Заказать сайт</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => scrollToSection('cases')}
                className="flex items-center justify-center space-x-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300 text-lg"
              >
                <span>Смотреть кейсы</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl mb-2 shadow-sm">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      {stat.number}+
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-8 text-white">
                <div className="space-y-4">
                  <div className="w-3/4 h-4 bg-white/30 rounded"></div>
                  <div className="w-1/2 h-4 bg-white/20 rounded"></div>
                  <div className="w-full h-8 bg-white/10 rounded-lg"></div>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <div className="w-full h-3 bg-gray-200 rounded"></div>
                <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
                <div className="w-4/6 h-3 bg-gray-200 rounded"></div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <Star className="w-8 h-8 text-white" />
            </div>
            
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300">
              <Zap className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
