
import React from 'react';
import { Calendar, User, Clock, Share2, BookOpen } from 'lucide-react';
import { Article } from '../../utils/supabaseQueries';

interface ArticleMetadataProps {
  article: Article;
  readingTime: string;
  onShare: () => void;
}

const ArticleMetadata: React.FC<ArticleMetadataProps> = ({ article, readingTime, onShare }) => {
  return (
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
          onClick={onShare}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Share2 className="w-5 h-5" />
          <span>Поделиться</span>
        </button>
      </div>
    </div>
  );
};

export default ArticleMetadata;
