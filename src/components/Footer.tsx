
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, Globe, Zap } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: '#', color: 'hover:text-neon-blue' },
    { icon: Twitter, href: '#', color: 'hover:text-neon-purple' },
    { icon: Linkedin, href: '#', color: 'hover:text-neon-pink' },
    { icon: Mail, href: 'mailto:info@cosmolab.space', color: 'hover:text-neon-green' },
  ];

  const footerLinks = [
    {
      title: 'Услуги',
      links: [
        { name: 'Лендинг страницы', href: '#' },
        { name: 'Корпоративные сайты', href: '#' },
        { name: 'Интернет-магазины', href: '#' },
        { name: 'Веб-приложения', href: '#' },
      ]
    },
    {
      title: 'Компания',
      links: [
        { name: 'О нас', href: '#about' },
        { name: 'Кейсы', href: '#cases' },
        { name: 'Блог', href: '#blog' },
        { name: 'Карьера', href: '#' },
      ]
    },
    {
      title: 'Поддержка',
      links: [
        { name: 'Документация', href: '#' },
        { name: 'FAQ', href: '#' },
        { name: 'Техподдержка', href: '#' },
        { name: 'Статус системы', href: '#' },
      ]
    }
  ];

  return (
    <footer className="relative overflow-hidden bg-cosmic-50 border-t border-cosmic-300/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 via-transparent to-neon-purple/20"></div>
      </div>

      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-bold cosmic-text">CosmoLab</span>
              </div>
              
              <p className="text-gray-400 leading-relaxed max-w-md">
                Мы создаем веб-проекты будущего с ультрасовременным дизайном, 
                молниеносной скоростью и тысячами SEO-оптимизированных статей.
              </p>

              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-lg bg-cosmic-200/50 hover:bg-cosmic-300/50 flex items-center justify-center transition-all duration-300 text-gray-400 ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold text-white mb-6">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-neon-blue transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-morphism p-6 rounded-xl border border-cosmic-300/30 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Получайте новости и советы</h3>
              <p className="text-gray-400">Подпишитесь на нашу рассылку для получения последних обновлений</p>
            </div>
            <div className="flex space-x-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 md:w-64 px-4 py-3 rounded-lg bg-cosmic-200/50 border border-cosmic-300/50 text-white placeholder-gray-400 focus:border-neon-blue focus:outline-none transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300"
              >
                Подписаться
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-cosmic-300/30 pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
        >
          <div className="text-gray-400 text-sm">
            © {currentYear} CosmoLab. Все права защищены.
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-neon-blue transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-neon-blue transition-colors">Условия использования</a>
            <a href="#" className="hover:text-neon-blue transition-colors">Cookie</a>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-10 right-10 w-16 h-16 rounded-full bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 blur-xl"
        />
      </div>
    </footer>
  );
};

export default Footer;
