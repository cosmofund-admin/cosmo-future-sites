
import React, { useState } from 'react';
import { Calendar, User, Search } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const categories = ['Все', 'Дизайн', 'SEO', 'Производительность', 'React', 'JavaScript'];
  
  const articles = [
    {
      id: 1,
      title: 'Топ-10 трендов веб-дизайна в 2024 году',
      excerpt: 'Какие тенденции будут определять веб-дизайн в ближайшем будущем. Минимализм, темные темы, анимации...',
      content: 'Полный текст статьи о трендах веб-дизайна...',
      author: 'Анна Смирнова',
      date: '15 января 2024',
      category: 'Дизайн',
      readTime: '5 мин',
      image: '/placeholder.svg',
      tags: ['дизайн', 'тренды', 'UI/UX']
    },
    {
      id: 2,
      title: 'SEO-оптимизация: полное руководство для начинающих',
      excerpt: 'Как правильно оптимизировать сайт для поисковых систем. Ключевые слова, мета-теги, структура...',
      content: 'Подробное руководство по SEO-оптимизации...',
      author: 'Михаил Петров',
      date: '12 января 2024',
      category: 'SEO',
      readTime: '8 мин',
      image: '/placeholder.svg',
      tags: ['SEO', 'поисковая оптимизация', 'Google']
    },
    {
      id: 3,
      title: 'Почему скорость загрузки сайта критично важна',
      excerpt: 'Влияние производительности на конверсию и ранжирование. Методы оптимизации и инструменты...',
      content: 'Статья о важности скорости загрузки...',
      author: 'Елена Волкова',
      date: '10 января 2024',
      category: 'Производительность',
      readTime: '6 мин',
      image: '/placeholder.svg',
      tags: ['производительность', 'оптимизация', 'PageSpeed']
    },
    {
      id: 4,
      title: 'React Hooks: лучшие практики и примеры',
      excerpt: 'Как эффективно использовать хуки в React приложениях. useState, useEffect, custom hooks...',
      content: 'Подробный разбор React Hooks...',
      author: 'Дмитрий Козлов',
      date: '8 января 2024',
      category: 'React',
      readTime: '10 мин',
      image: '/placeholder.svg',
      tags: ['React', 'hooks', 'JavaScript']
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
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
              Блог CosmoLab
            </h1>
            <p className="text-xl text-gray-600">
              Экспертные статьи о веб-разработке, дизайне и digital-маркетинге
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск статей..."
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
            <article key={article.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <span>{article.readTime}</span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer">
                  {article.title}
                </h2>
                
                <p className="text-gray-600 mb-4">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
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
              </div>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              По вашему запросу статьи не найдены
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
