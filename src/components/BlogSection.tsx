
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

const BlogSection: React.FC = () => {
  const posts = [
    {
      id: 1,
      title: 'Топ-10 трендов веб-дизайна 2024',
      excerpt: 'Изучаем самые актуальные тенденции в современном веб-дизайне и их влияние на пользовательский опыт.',
      author: 'Анна Смирнова',
      date: '15 декабря 2024',
      readTime: '8 мин',
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop',
      category: 'Дизайн'
    },
    {
      id: 2,
      title: 'React vs Vue: Что выбрать в 2024?',
      excerpt: 'Подробное сравнение популярных JavaScript фреймворков для разработки современных веб-приложений.',
      author: 'Максим Петров',
      date: '12 декабря 2024',
      readTime: '12 мин',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
      category: 'Разработка'
    },
    {
      id: 3,
      title: 'SEO оптимизация: Полное руководство',
      excerpt: 'Комплексный подход к поисковой оптимизации сайтов. Техники и стратегии для топовых позиций.',
      author: 'Елена Козлова',
      date: '10 декабря 2024',
      readTime: '15 мин',
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop',
      category: 'SEO'
    }
  ];

  return (
    <section id="blog" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Полезные <span className="gradient-text">статьи</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Экспертные материалы о веб-разработке, дизайне и цифровом маркетинге
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-12">
          {posts.map((post) => (
            <article key={post.id} className="group">
              <div className="glass rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center space-x-2 text-blue-600 font-semibold hover:text-purple-600 transition-colors"
                  >
                    <span>Читать далее</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/blog"
            className="btn-premium inline-flex items-center space-x-2"
          >
            <span>Все статьи</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
