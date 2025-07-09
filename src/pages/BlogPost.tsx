
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, Tag } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { getArticleById, type Article } from '../utils/supabaseQueries';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const articleData = await getArticleById(parseInt(id));
      
      if (articleData) {
        setArticle(articleData);
        
        // Обновляем мета-теги для SEO
        if (articleData.meta_title) {
          document.title = articleData.meta_title;
        }
        
        if (articleData.meta_description) {
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute('content', articleData.meta_description);
          }
        }
      } else {
        setNotFound(true);
      }
      
      setLoading(false);
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-32 mb-8"></div>
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-300 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Статья не найдена</h1>
          <Link to="/blog" className="text-blue-600 hover:text-blue-700">
            ← Вернуться к блогу
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <article className="max-w-4xl mx-auto px-4 py-16">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('blog.all')}
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {article.category}
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(article.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{article.read_time}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="font-medium">{article.author}</span>
            </div>
          </div>
        </div>

        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
        />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {article.excerpt}
          </p>
          
          <div className="text-gray-800 leading-relaxed whitespace-pre-line">
            {article.content}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Теги:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span 
                key={tag}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
