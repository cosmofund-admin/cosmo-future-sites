
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, Tag, Share2, BookOpen } from 'lucide-react';
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
  const [readingTime, setReadingTime] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      console.log('Fetching article with ID:', numericId);
      const articleData = await getArticleById(numericId);
      console.log('Article data received:', articleData);
      
      if (articleData) {
        setArticle(articleData);
        
        // Вычисляем время чтения на основе количества слов
        const wordCount = articleData.content.split(' ').length;
        const readingTimeMinutes = Math.ceil(wordCount / 200); // 200 слов в минуту
        setReadingTime(`${readingTimeMinutes} мин чтения`);
        
        // Обновляем мета-теги для SEO
        if (articleData.meta_title) {
          document.title = articleData.meta_title;
        } else {
          document.title = `${articleData.title} | CosmoLab`;
        }
        
        // Обновляем meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && articleData.meta_description) {
          metaDescription.setAttribute('content', articleData.meta_description);
        }
        
        // Добавляем структурированные данные
        const structuredData = {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": articleData.title,
          "description": articleData.excerpt,
          "author": {
            "@type": "Person",
            "name": articleData.author
          },
          "datePublished": articleData.date,
          "dateModified": articleData.updated_at || articleData.date,
          "publisher": {
            "@type": "Organization",
            "name": "CosmoLab",
            "logo": {
              "@type": "ImageObject",
              "url": "/favicon.ico"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": window.location.href
          },
          "image": articleData.image,
          "keywords": articleData.tags.join(", ")
        };
        
        // Добавляем JSON-LD
        let jsonLdScript = document.querySelector('script[type="application/ld+json"]');
        if (!jsonLdScript) {
          jsonLdScript = document.createElement('script');
          jsonLdScript.type = 'application/ld+json';
          document.head.appendChild(jsonLdScript);
        }
        jsonLdScript.textContent = JSON.stringify(structuredData);
      } else {
        setNotFound(true);
      }
      
      setLoading(false);
    };

    fetchArticle();
  }, [id]);

  const shareArticle = () => {
    if (navigator.share && article) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else if (article) {
      // Fallback: копируем URL в буфер обмена
      navigator.clipboard.writeText(window.location.href);
      alert('Ссылка скопирована в буфер обмена!');
    }
  };

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
          <p className="text-gray-600 mb-8">К сожалению, запрашиваемая статья не существует или была удалена.</p>
          <Link 
            to="/blog" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Вернуться к блогу
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Разбиваем контент на параграфы для лучшего отображения
  const formatContent = (content: string) => {
    const paragraphs = content.split('\n\n');
    return paragraphs.map((paragraph, index) => {
      // Обработка заголовков
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        const title = paragraph.replace(/\*\*/g, '');
        return (
          <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            {title}
          </h2>
        );
      }
      
      // Обработка подзаголовков
      if (paragraph.startsWith('*') && paragraph.endsWith('*') && !paragraph.includes('- ')) {
        const subtitle = paragraph.replace(/\*/g, '');
        return (
          <h3 key={index} className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            {subtitle}
          </h3>
        );
      }
      
      // Обработка списков
      if (paragraph.includes('- ')) {
        const listItems = paragraph.split('\n').filter(item => item.trim().startsWith('- '));
        return (
          <ul key={index} className="list-disc pl-6 mb-6 space-y-2">
            {listItems.map((item, itemIndex) => (
              <li key={itemIndex} className="text-gray-700 leading-relaxed">
                {item.replace('- ', '')}
              </li>
            ))}
          </ul>
        );
      }
      
      // Обычные параграфы
      if (paragraph.trim()) {
        return (
          <p key={index} className="text-gray-700 leading-relaxed mb-6">
            {paragraph}
          </p>
        );
      }
      
      return null;
    }).filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <article className="max-w-4xl mx-auto px-4 py-16">
        {/* Навигация назад */}
        <Link 
          to="/blog" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('blog.all')}
        </Link>

        {/* Заголовок и метаданные */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
              {article.category}
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(article.date).toLocaleDateString('ru-RU')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{readingTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{article.content.split(' ').length} слов</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-medium">{article.author}</span>
              </div>
            </div>
            
            <button
              onClick={shareArticle}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span>Поделиться</span>
            </button>
          </div>
        </div>

        {/* Изображение статьи */}
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-64 md:h-96 object-cover rounded-lg mb-8 shadow-lg"
        />

        {/* Вводный текст */}
        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-xl text-gray-600 leading-relaxed font-medium bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
            {article.excerpt}
          </p>
        </div>

        {/* Основной контент */}
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-800 leading-relaxed">
            {formatContent(article.content)}
          </div>
        </div>

        {/* Теги */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Теги:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <span 
                key={`${tag}-${index}`}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Призыв к действию */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Нужна помощь с SEO?
          </h3>
          <p className="text-gray-600 mb-6">
            Команда CosmoLab поможет вам создать SEO-оптимизированный сайт и достичь топовых позиций в поисковых системах.
          </p>
          <Link
            to="/#contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Получить консультацию
          </Link>
        </div>
      </article>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
