
import React from 'react';
import { ExternalLink } from 'lucide-react';

const CasesSection: React.FC = () => {
  const cases = [
    {
      id: 1,
      title: 'Интернет-магазин одежды',
      category: 'E-commerce',
      image: '/placeholder.svg',
      description: 'Современный интернет-магазин с системой оплаты и доставки',
      technologies: ['React', 'Node.js', 'PostgreSQL'],
      result: '+150% продаж за первый месяц'
    },
    {
      id: 2,
      title: 'Корпоративный сайт IT-компании',
      category: 'Корпоративный',
      image: '/placeholder.svg',
      description: 'Презентационный сайт с системой управления контентом',
      technologies: ['React', 'TypeScript', 'Strapi'],
      result: '+200% заявок с сайта'
    },
    {
      id: 3,
      title: 'Платформа онлайн-обучения',
      category: 'EdTech',
      image: '/placeholder.svg',
      description: 'Образовательная платформа с видеоуроками и тестами',
      technologies: ['React', 'Python', 'MongoDB'],
      result: '10K+ активных пользователей'
    }
  ];

  return (
    <section id="cases" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Наши кейсы
          </h2>
          <p className="text-xl text-gray-600">
            Реальные проекты и достигнутые результаты
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((case_) => (
            <div key={case_.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={case_.image} 
                alt={case_.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-blue-600 font-medium mb-2">
                  {case_.category}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {case_.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {case_.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {case_.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="text-green-600 font-medium mb-4">
                  Результат: {case_.result}
                </div>

                <button className="flex items-center text-blue-600 hover:text-blue-700">
                  <span>Подробнее</span>
                  <ExternalLink className="ml-1 w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
