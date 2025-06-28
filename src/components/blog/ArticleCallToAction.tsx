
import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCallToAction: React.FC = () => {
  return (
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
  );
};

export default ArticleCallToAction;
