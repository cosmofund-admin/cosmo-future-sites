
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../hooks/use-toast';

const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    budget: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в течение 24 часов.",
      });
      setFormData({ name: '', email: '', message: '', budget: '' });
      setIsLoading(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold cosmic-text mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Готовы создать сайт мечты? Свяжитесь с нами прямо сейчас!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-morphism p-8 rounded-xl border border-cosmic-300/30"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Оставьте заявку</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-cosmic-200/50 border border-cosmic-300/50 text-white placeholder-gray-400 focus:border-neon-blue focus:outline-none transition-colors"
                  placeholder="Ваше имя"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-cosmic-200/50 border border-cosmic-300/50 text-white placeholder-gray-400 focus:border-neon-blue focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                  Бюджет проекта
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-cosmic-200/50 border border-cosmic-300/50 text-white focus:border-neon-blue focus:outline-none transition-colors"
                >
                  <option value="">Выберите бюджет</option>
                  <option value="95">$95 - Лендинг</option>
                  <option value="195">$195 - Простой сайт</option>
                  <option value="295">$295 - Сайт с кабинетом</option>
                  <option value="custom">Индивидуальный проект</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-cosmic-200/50 border border-cosmic-300/50 text-white placeholder-gray-400 focus:border-neon-blue focus:outline-none transition-colors resize-none"
                  placeholder="Расскажите о вашем проекте..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-neon-blue to-neon-purple px-8 py-4 rounded-lg text-white font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{t('contact.send')}</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="glass-morphism p-6 rounded-xl border border-cosmic-300/30">
              <h3 className="text-xl font-bold text-white mb-6">Контактная информация</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-neon-blue to-cyan-400 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-medium">info@cosmolab.space</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-neon-purple to-violet-400 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Телефон</p>
                    <p className="text-white font-medium">+7 (999) 123-45-67</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-neon-pink to-rose-400 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Мессенджеры</p>
                    <p className="text-white font-medium">WhatsApp / Telegram</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-morphism p-6 rounded-xl border border-cosmic-300/30">
              <h3 className="text-xl font-bold text-white mb-4">Время работы</h3>
              <div className="space-y-2 text-gray-300">
                <p>Пн-Пт: 10:00 - 20:00</p>
                <p>Сб-Вс: 12:00 - 18:00</p>
                <p className="text-neon-blue">Экстренная поддержка: 24/7</p>
              </div>
            </div>

            <div className="glass-morphism p-6 rounded-xl border border-cosmic-300/30">
              <h3 className="text-xl font-bold text-white mb-4">Способы оплаты</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-cosmic-300/20">
                  <p className="text-white font-medium">Stripe</p>
                  <p className="text-gray-400 text-sm">Карты</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-cosmic-300/20">
                  <p className="text-white font-medium">PayPal</p>
                  <p className="text-gray-400 text-sm">Безопасно</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-cosmic-300/20">
                  <p className="text-white font-medium">Crypto</p>
                  <p className="text-gray-400 text-sm">Bitcoin</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-cosmic-300/20">
                  <p className="text-white font-medium">COSMO</p>
                  <p className="text-gray-400 text-sm">-10%</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
