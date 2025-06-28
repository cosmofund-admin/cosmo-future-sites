
import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

const BlogPostLoading: React.FC = () => {
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
};

export default BlogPostLoading;
