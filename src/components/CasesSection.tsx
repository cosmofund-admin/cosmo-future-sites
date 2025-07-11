
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
      },
      link: 'https://stylehub-demo.com'
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
      },
      link: 'https://techpro-demo.com'
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
      },
      link: 'https://eduspace-demo.com'
    },
    {
      id: 4,
      title: 'Ресторанная сеть',
      category: 'Ресторанный бизнес',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500',
      description: 'Сайт с онлайн-бронированием столиков, меню и системой доставки',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      result: '+300% онлайн-заказов',
      metrics: {
        bookings: '+250%',
        orders: '+300%',
        rating: '4.9/5'
      },
      link: 'https://restaurant-demo.com'
    },
    {
      id: 5,
      title: 'Медицинская клиника',
      category: 'Медицина',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500',
      description: 'Сайт клиники с записью к врачам, личным кабинетом пациентов и телемедициной',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'WebRTC'],
      result: '+180% записей онлайн',
      metrics: {
        appointments: '+180%',
        satisfaction: '96%',
        efficiency: '+60%'
      },
      link: 'https://healthcare-demo.com'
    },
    {
      id: 6,
      title: 'Агентство недвижимости',
      category: 'Недвижимость',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500',
      description: 'Платформа для поиска и продажи недвижимости с VR-турами и ипотечным калькулятором',
      technologies: ['React', 'Three.js', 'Node.js', 'MongoDB'],
      result: '+220% конверсия в заявки',
      metrics: {
        leads: '+220%',
        viewings: '+150%',
        sales: '+80%'
      },
      link: 'https://primeestate-demo.com'
    }
  ];

  return (
    <section id="cases" className="section-padding bg-black">
      <div className="container-custom">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
            КЕЙСЫ
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">
            Проекты, которые работают на результат
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((case_) => (
            <div key={case_.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <img 
                  src={case_.image} 
                  alt={case_.title}
                  className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    {case_.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  {case_.title}
                </h3>
                
                <p className="text-white/70 mb-4 text-sm">
                  {case_.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {case_.technologies.slice(0, 3).map((tech) => (
                    <span 
                      key={tech}
                      className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="border border-white/20 rounded-lg p-4 mb-4">
                  <div className="text-white font-medium text-sm mb-2">{case_.result}</div>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {Object.entries(case_.metrics).slice(0, 3).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="font-medium text-white">{value}</div>
                        <div className="text-white/60 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full py-2 px-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 text-sm">
                  ПОДРОБНЕЕ
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
