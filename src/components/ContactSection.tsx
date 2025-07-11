
import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="section-padding bg-black">
      <div className="container-custom">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
            КОНТАКТЫ
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">
            Обсудим ваш проект
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="text-white/60 mt-1">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">ТЕЛЕФОН</p>
                  <p className="text-white font-medium">+7 (999) 123-45-67</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-white/60 mt-1">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">EMAIL</p>
                  <p className="text-white font-medium">info@cosmo-lab.space</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-white/60 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">АДРЕС</p>
                  <p className="text-white font-medium">Москва, Россия</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-white/60 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">РЕЖИМ РАБОТЫ</p>
                  <p className="text-white font-medium">Пн-Пт: 9:00 - 19:00</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h4 className="text-xl font-bold text-white mb-4">БЫСТРЫЙ СТАРТ</h4>
              <p className="text-white/70 mb-4">Получите консультацию и техническое задание бесплатно</p>
              <div className="flex items-center space-x-2 text-white/60">
                <Clock className="w-5 h-5" />
                <span>Ответим в течение 30 минут</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                    ИМЯ *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-white/40 focus:outline-none transition-all duration-200"
                    placeholder="Иван Иванов"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                    ТЕЛЕФОН *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-white/40 focus:outline-none transition-all duration-200"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  EMAIL *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-white/40 focus:outline-none transition-all duration-200"
                  placeholder="ivan@example.com"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-white/80 mb-2">
                  УСЛУГА
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-white/40 focus:outline-none transition-all duration-200"
                >
                  <option value="">Выберите услугу</option>
                  <option value="landing">Лендинг-страница</option>
                  <option value="corporate">Корпоративный сайт</option>
                  <option value="ecommerce">Интернет-магазин</option>
                  <option value="web-app">Веб-приложение</option>
                  <option value="redesign">Редизайн</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                  СООБЩЕНИЕ *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-white/40 focus:outline-none transition-all duration-200 resize-none"
                  placeholder="Расскажите о вашем проекте..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>ОТПРАВИТЬ</span>
              </button>

              <p className="text-sm text-white/60 text-center">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
