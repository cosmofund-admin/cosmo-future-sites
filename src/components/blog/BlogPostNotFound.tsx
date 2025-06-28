
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';

const BlogPostNotFound: React.FC = () => {
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
};

export default BlogPostNotFound;
