
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { useArticle } from '../hooks/useArticle';
import BlogPostLoading from '../components/blog/BlogPostLoading';
import BlogPostNotFound from '../components/blog/BlogPostNotFound';
import ArticleMetadata from '../components/blog/ArticleMetadata';
import ArticleContent from '../components/blog/ArticleContent';
import ArticleTags from '../components/blog/ArticleTags';
import ArticleCallToAction from '../components/blog/ArticleCallToAction';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const { article, loading, notFound, readingTime } = useArticle(id);

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
    return <BlogPostLoading />;
  }

  if (notFound || !article) {
    return <BlogPostNotFound />;
  }

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
        <ArticleMetadata 
          article={article} 
          readingTime={readingTime} 
          onShare={shareArticle} 
        />

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
        <ArticleContent content={article.content} />

        {/* Теги */}
        <ArticleTags tags={article.tags} />

        {/* Призыв к действию */}
        <ArticleCallToAction />
      </article>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
