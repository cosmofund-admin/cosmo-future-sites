
import { useState, useEffect } from 'react';
import { getArticleById, type Article } from '../utils/supabaseQueries';

export const useArticle = (id: string | undefined) => {
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
        let jsonLdScript = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
        if (!jsonLdScript) {
          jsonLdScript = document.createElement('script') as HTMLScriptElement;
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

  return { article, loading, notFound, readingTime };
};
