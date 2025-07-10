
import React, { useState, useEffect } from 'react';
import { Menu, X, User, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Главная', href: '/', isLink: true },
    { name: 'Услуги', href: 'services', isLink: false },
    { name: 'Кейсы', href: 'cases', isLink: false },
    { name: 'Блог', href: '/blog', isLink: true },
    { name: 'Контакты', href: 'contact', isLink: false },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md border-b border-white/10' 
          : 'bg-black/95'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 border border-white/30 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-2xl font-bold text-white">
              CosmoLab
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              item.isLink ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative py-2 px-1 transition-all duration-200 hover:text-white ${
                      location.pathname === item.href 
                        ? 'text-white font-medium' 
                        : 'text-white/70'
                    }`}
                  >
                    {item.name}
                    {location.pathname === item.href && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"></div>
                    )}
                  </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="relative py-2 px-1 text-white/70 hover:text-white transition-colors duration-200"
                >
                  {item.name}
                </button>
              )
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link 
              to="/login" 
              className="hidden sm:flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/10"
            >
              <User className="w-5 h-5" />
              <span>Войти</span>
            </Link>
            
            <Link
              to="/dashboard"
              className="hidden md:block btn-premium text-sm"
            >
              Личный кабинет
            </Link>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2 border-t border-gray-100">
            {navItems.map((item) => (
              item.isLink ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 rounded-lg transition-colors duration-200 ${
                    location.pathname === item.href 
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  {item.name}
                </button>
              )
            ))}
            <div className="pt-2 border-t border-gray-100 mt-2">
              <Link 
                to="/login" 
                className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>Войти</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
