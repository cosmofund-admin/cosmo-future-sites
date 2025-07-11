
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container-custom">
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 border border-white/30 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <span className="text-2xl font-bold text-white">CosmoLab</span>
              </Link>
              
              <p className="text-white/60 leading-relaxed font-light">
                Минималистичные веб-решения для максимального результата
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-white/60">
                  <Phone className="w-4 h-4" />
                  <span>+7 (999) 123-45-67</span>
                </div>
                <div className="flex items-center space-x-3 text-white/60">
                  <Mail className="w-4 h-4" />
                  <span>info@cosmo-lab.space</span>
                </div>
                <div className="flex items-center space-x-3 text-white/60">
                  <MapPin className="w-4 h-4" />
                  <span>Москва, Россия</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-medium mb-6 text-sm tracking-wider">УСЛУГИ</h3>
              <ul className="space-y-3">
                <li><a href="#services" className="text-white/60 hover:text-white transition-colors text-sm">Лендинг-страницы</a></li>
                <li><a href="#services" className="text-white/60 hover:text-white transition-colors text-sm">Корпоративные сайты</a></li>
                <li><a href="#services" className="text-white/60 hover:text-white transition-colors text-sm">Интернет-магазины</a></li>
                <li><a href="#services" className="text-white/60 hover:text-white transition-colors text-sm">Веб-приложения</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-medium mb-6 text-sm tracking-wider">КОМПАНИЯ</h3>
              <ul className="space-y-3">
                <li><a href="#cases" className="text-white/60 hover:text-white transition-colors text-sm">Кейсы</a></li>
                <li><Link to="/blog" className="text-white/60 hover:text-white transition-colors text-sm">Блог</Link></li>
                <li><a href="#contact" className="text-white/60 hover:text-white transition-colors text-sm">Контакты</a></li>
                <li><Link to="/dashboard" className="text-white/60 hover:text-white transition-colors text-sm">Личный кабинет</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-medium mb-6 text-sm tracking-wider">СВЯЗЬ</h3>
              <p className="text-white/60 mb-6 text-sm">
                Обсудим ваш проект
              </p>
              <button className="w-full py-3 px-6 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-all duration-300 text-sm">
                НАПИСАТЬ
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © 2024 CosmoLab
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="/privacy" className="text-white/60 hover:text-white text-sm transition-colors">
                Политика
              </a>
              <a href="/terms" className="text-white/60 hover:text-white text-sm transition-colors">
                Условия
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-200"
            >
              <ArrowUp className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
