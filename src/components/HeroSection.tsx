
import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, Star, Users, Award, Zap } from 'lucide-react';
import Logo3D from './Logo3D';

const HeroSection: React.FC = () => {
  const [currentStat, setCurrentStat] = useState(0);
  
  const stats = [
    { number: 500, label: 'Проектов', icon: Award },
    { number: 24, label: 'Часа на разработку', icon: Zap },
    { number: 98, label: '% довольных клиентов', icon: Star },
    { number: 150, label: 'Счастливых клиентов', icon: Users }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full filter blur-xl opacity-50 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-white/3 rounded-full filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-white/5 rounded-full filter blur-xl opacity-40 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative pt-32 pb-20 container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-white">Доступны для новых проектов</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                РАСКРЫВАЕМ И УПАКОВЫВАЕМ
                <span className="block text-white">СМЫСЛЫ БИЗНЕСА</span>
                <span className="text-3xl lg:text-4xl text-white/80 font-normal">через дизайн и разработку</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-white/70 leading-relaxed max-w-2xl font-light">
                Никаких технических заданий и сложных брифов — 
                наш project менеджер всё сделает за вас
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('contact')}
                className="btn-premium flex items-center justify-center space-x-2 text-lg"
              >
                <span>ОБСУДИТЬ ПРОЕКТ</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => scrollToSection('cases')}
                className="btn-outline flex items-center justify-center space-x-2 text-lg"
              >
                <span>ПОСМОТРЕТЬ КЕЙСЫ</span>
              </button>
            </div>

            {/* Animated stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={index}
                    className={`text-center transform transition-all duration-500 ${
                      index === currentStat ? 'scale-110' : 'scale-100'
                    }`}
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-2 transition-colors duration-500 ${
                      index === currentStat 
                        ? 'bg-white/20 text-white border border-white/30' 
                        : 'bg-white/10 text-white/60 border border-white/20'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className={`text-3xl font-bold transition-colors duration-500 ${
                      index === currentStat ? 'text-white' : 'text-white/60'
                    }`}>
                      {stat.number}+
                    </div>
                    <div className="text-sm text-white/70 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column - 3D Visual element */}
          <div className="relative animate-fade-in animation-delay-500">
            <Logo3D />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
