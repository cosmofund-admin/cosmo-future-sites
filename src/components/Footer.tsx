
import React from 'react';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <span className="text-2xl font-bold">CosmoLab</span>
              </div>
              
              <p className="text-gray-400 leading-relaxed">
                Создаем премиальные веб-решения с современным дизайном 
                и передовыми технологиями для успешного бизнеса.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400">
                  <Phone className="w-5 h-5" />
                  <span>+7 (999) 123-45-67</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Mail className="w-5 h-5" />
                  <span>hello@cosmolab.dev</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPin className="w-5 h-5" />
                  <span>Москва, Россия</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Услуги</h3>
              <ul className="space-y-3">
                <li><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Лендинг-страницы</span></li>
                <li><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Корпоративные сайты</span></li>
                <li><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Интернет-магазины</span></li>
                <li><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Веб-приложения</span></li>
                <li><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">SEO оптимизация</span></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Компания</h3>
              <ul className="space-y-3">
                <li><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">О нас</span></li>
                <li><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Кейсы</span></li>
                <li><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Блог</span></li>
                <li><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Контакты</span></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Подписка</h3>
              <p className="text-gray-400 mb-4">
                Получайте советы по веб-разработке и дизайну
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 text-white"
                />
                <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Подписаться
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 CosmoLab. Все права защищены.
            </div>
            
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer">
                Политика конфиденциальности
              </span>
              <span className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer">
                Условия использования
              </span>
            </div>

            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center hover:shadow-lg transition-all duration-200"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
