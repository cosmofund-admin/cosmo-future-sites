
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
    <footer className="bg-gray-900 text-white">
      <div className="container-custom">
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <span className="text-2xl font-bold">CosmoLab</span>
              </Link>
              
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

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Услуги</h3>
              <ul className="space-y-3">
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Лендинг-страницы</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Корпоративные сайты</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Интернет-магазины</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Веб-приложения</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">SEO оптимизация</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Компания</h3>
              <ul className="space-y-3">
                <li><a href="#cases" className="text-gray-400 hover:text-white transition-colors">Кейсы</a></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Блог</Link></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Контакты</a></li>
                <li><Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Личный кабинет</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Подписка</h3>
              <p className="text-gray-400 mb-4">
                Получайте советы по веб-разработке и дизайну
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                />
                <button className="w-full btn-premium">
                  Подписаться
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 CosmoLab. Все права защищены.
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Политика конфиденциальности
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Условия использования
              </a>
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
