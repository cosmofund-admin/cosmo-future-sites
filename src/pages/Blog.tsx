
import React, { useState } from 'react';
import { Calendar, User, Search, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const categories = ['Все', 'SEO', 'Дизайн', 'Производительность', 'React', 'JavaScript', 'Маркетинг'];
  
  const articles = [
    {
      id: 1,
      title: 'SEO-оптимизация в 2024: Полное руководство для начинающих',
      excerpt: 'Узнайте, как правильно оптимизировать сайт для поисковых систем. Ключевые слова, мета-теги, структура, внутренняя перелинковка и технические аспекты SEO.',
      content: 'Подробное руководство по SEO-оптимизации сайтов...',
      author: 'Михаил Петров',
      date: '20 января 2024',
      category: 'SEO',
      readTime: '12 мин',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500',
      tags: ['SEO', 'поисковая оптимизация', 'Google', 'Яндекс']
    },
    {
      id: 2,
      title: 'Как увеличить скорость загрузки сайта: 15 проверенных способов',
      excerpt: 'Оптимизация изображений, минификация CSS/JS, использование CDN, lazy loading и другие методы ускорения сайта для лучшего SEO.',
      content: 'Подробная статья об оптимизации скорости...',
      author: 'Елена Волкова',
      date: '18 января 2024',
      category: 'Производительность',
      readTime: '10 мин',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500',
      tags: ['производительность', 'оптимизация', 'PageSpeed', 'Core Web Vitals']
    },
    {
      id: 3,
      title: 'Семантическая верстка и микроразметка для SEO',
      excerpt: 'Правильная HTML5 семантика, Schema.org разметка, Open Graph и Twitter Cards для улучшения видимости в поисковых системах.',
      content: 'Статья о семантической верстке...',
      author: 'Анна Смирнова',
      date: '15 января 2024',
      category: 'SEO',
      readTime: '8 мин',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500',
      tags: ['HTML5', 'семантика', 'микроразметка', 'Schema.org']
    },
    {
      id: 4,
      title: 'Локальное SEO: Как продвинуть бизнес в своем городе',
      excerpt: 'Google My Business, локальные ключевые слова, отзывы клиентов и NAP-данные для продвижения местного бизнеса.',
      content: 'Руководство по локальному SEO...',
      author: 'Дмитрий Козлов',
      date: '12 января 2024',
      category: 'SEO',
      readTime: '9 мин',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500',
      tags: ['локальное SEO', 'Google My Business', 'NAP', 'местный бизнес']
    },
    {
      id: 5,
      title: 'Тренды веб-дизайна 2024: Что будет актуально',
      excerpt: 'Нейроморфизм, темные темы, анимации, градиенты и другие тренды дизайна, которые будут популярны в 2024 году.',
      content: 'Обзор трендов веб-дизайна...',
      author: 'Анна Смирнова',
      date: '10 января 2024',
      category: 'Дизайн',
      readTime: '7 мин',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500',
      tags: ['дизайн', 'тренды', 'UI/UX', '2024']
    },
    {
      id: 6,
      title: 'Core Web Vitals: Как улучшить показатели сайта',
      excerpt: 'LCP, FID, CLS - разбираем основные метрики Google для оценки пользовательского опыта и их влияние на ранжирование.',
      content: 'Подробный гайд по Core Web Vitals...',
      author: 'Елена Волкова',
      date: '8 января 2024',
      category: 'SEO',
      readTime: '11 мин',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500',
      tags: ['Core Web Vitals', 'UX', 'Google', 'производительность']
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'Все' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              SEO Блог CosmoLab
            </h1>
            <p className="text-xl text-gray-600">
              Экспертные статьи о SEO, веб-разработке и digital-маркетинге
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск статей по SEO, дизайну, производительности..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article key={article.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 group">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <span>{article.readTime}</span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag}
                      className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{article.date}</span>
                  </div>
                </div>

                <button className="mt-4 flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                  Читать полностью
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              По вашему запросу статьи не найдены
            </p>
            <p className="text-gray-400 mt-2">
              Попробуйте изменить поисковый запрос или выберите другую категорию
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
