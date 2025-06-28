
import React from 'react';

interface ArticleContentProps {
  content: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
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
    <div className="prose prose-lg max-w-none">
      <div className="text-gray-800 leading-relaxed">
        {formatContent(content)}
      </div>
    </div>
  );
};

export default ArticleContent;
