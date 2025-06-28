
import React from 'react';
import { Tag } from 'lucide-react';

interface ArticleTagsProps {
  tags: string[];
}

const ArticleTags: React.FC<ArticleTagsProps> = ({ tags }) => {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Теги:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span 
            key={`${tag}-${index}`}
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ArticleTags;
