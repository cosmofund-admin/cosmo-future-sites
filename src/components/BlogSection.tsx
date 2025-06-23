
import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogSection: React.FC = () => {
  const articles = [
    {
      id: 1,
      title: 'Топ-10 трендов веб-дизайна в 2024 году',
      excerpt: 'Какие тенденции будут определять веб-дизайн в ближайшем будущем',
      author: 'Анна Смирнова',
      date: '15 января 2024',
      category: 'Дизайн',
      readTime: '5 мин',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'SEO-оптимизация: полное руководство для начинающих',
      excerpt: 'Как правильно оптимизировать сайт для поисковых систем',
      author: 'Михаил Петров',
      date: '12 января 2024',
      category: 'SEO',
      readTime: '8 мин',
      image: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'Почему скорость загрузки сайта критично важна',
      excerpt: 'Влияние производительности на конверсию и ранжирование',
      author: 'Елена Волкова',
      date: '10 января 2024',
      category: 'Производительность',
      readTime: '6 мин',
      image: '/placeholder.svg'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Блог
          </h2>
          <p className="text-xl text-gray-600">
            Полезные статьи о веб-разработке и digital-маркетинге
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {articles.map((article) => (
            <article key={article.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
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
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
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
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/blog" 
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Все статьи
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
