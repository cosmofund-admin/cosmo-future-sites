
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getArticles, type Article } from '../utils/supabaseQueries';

const BlogSection: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const [posts, setPosts] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const articles = await getArticles(currentLanguage, 3);
      setPosts(articles);
      setLoading(false);
    };

    fetchArticles();
  }, [currentLanguage]);

  if (loading) {
    return (
      <section id="blog" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="section-padding bg-black">
      <div className="container-custom">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
            БЛОГ
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">
            Знания и инсайты в мире разработки
          </p>
        </div>

        {posts.length > 0 ? (
          <>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-12">
              {posts.map((post) => (
                <article key={post.id} className="group">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center space-x-4 text-sm text-white/60 mb-3">
                        <span>{post.author}</span>
                        <span>·</span>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span>·</span>
                        <span>{post.read_time}</span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3">
                        {post.title}
                      </h3>
                      
                      <p className="text-white/70 mb-4 text-sm">
                        {post.excerpt}
                      </p>

                      <Link
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center space-x-2 text-white hover:text-white/80 transition-colors text-sm"
                      >
                        <span>ЧИТАТЬ</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/blog"
                className="inline-flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-xl font-medium hover:bg-white/90 transition-all duration-300"
              >
                <span>ВСЕ СТАТЬИ</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">Статьи загружаются...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
