
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cosmic-gradient">
      <div className="text-center">
        <h1 className="text-6xl font-bold cosmic-text mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-8">Страница не найдена</p>
        <Link 
          to="/" 
          className="bg-gradient-to-r from-neon-blue to-neon-purple px-8 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
        >
          На главную
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
