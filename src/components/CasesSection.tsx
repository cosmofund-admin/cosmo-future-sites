
import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';

const CasesSection: React.FC = () => {
  const cases = [
    {
      id: 1,
      title: 'Интернет-магазин модной одежды',
      category: 'E-commerce',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500',
      description: 'Современный интернет-магазин с системой оплаты, доставки и личным кабинетом пользователя',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      result: '+150% продаж за первый месяц',
      metrics: {
        conversion: '+85%',
        speed: '1.2с загрузка',
        seo: 'ТОП-3 в Google'
      }
    },
    {
      id: 2,
      title: 'Корпоративный сайт IT-компании',
      category: 'Корпоративный',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500',
      description: 'Презентационный сайт с системой управления контентом и интеграцией с CRM',
      technologies: ['React', 'TypeScript', 'Strapi', 'PostgreSQL'],
      result: '+200% заявок с сайта',
      metrics: {
        conversion: '+120%',
        speed: '0.9с загрузка',
        seo: 'ТОП-1 в Яндекс'
      }
    },
    {
      id: 3,
      title: 'Платформа онлайн-обучения',
      category: 'EdTech',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500',
      description: 'Образовательная платформа с видеоуроками, тестами и системой сертификации',
      technologies: ['React', 'Python', 'MongoDB', 'Redis'],
      result: '10K+ активных пользователей',
      metrics: {
        retention: '78%',
        completion: '65%',
        rating: '4.8/5'
      }
    }
  ];

  return (
    <section id="cases" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Наши кейсы
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Реальные проекты и достигнутые результаты. Мы создаем сайты, которые приносят прибыль нашим клиентам
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((case_) => (
            <div key={case_.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group">
              <div className="relative overflow-hidden">
                <img 
                  src={case_.image} 
                  alt={case_.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {case_.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {case_.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {case_.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {case_.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="text-green-800 font-semibold text-sm mb-2">Результат:</div>
                  <div className="text-green-700 font-medium">{case_.result}</div>
                  
                  <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                    {Object.entries(case_.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="font-semibold text-green-800">{value}</div>
                        <div className="text-green-600 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                    <span>Подробнее</span>
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center">
            Посмотреть все кейсы
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
