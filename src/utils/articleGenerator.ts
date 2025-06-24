
interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  tags: string[];
  language: string;
}

const authors = {
  ru: ['Михаил Петров', 'Елена Волкова', 'Анна Смирнова', 'Дмитрий Козлов', 'Ольга Иванова'],
  en: ['Michael Johnson', 'Sarah Wilson', 'Anna Smith', 'David Brown', 'Lisa Taylor'],
  es: ['Miguel García', 'Elena López', 'Ana Martínez', 'David Rodríguez', 'Olga Fernández']
};

const categories = {
  ru: ['SEO', 'Дизайн', 'Разработка', 'Маркетинг', 'Производительность'],
  en: ['SEO', 'Design', 'Development', 'Marketing', 'Performance'],
  es: ['SEO', 'Diseño', 'Desarrollo', 'Marketing', 'Rendimiento']
};

const articleTemplates = {
  ru: {
    seo: [
      {
        title: 'SEO оптимизация сайтов: полное руководство {year}',
        excerpt: 'Узнайте, как правильно оптимизировать сайт для поисковых систем. Ключевые слова, мета-теги, структура и внутренняя перелинковка.',
        content: 'Подробное руководство по SEO-оптимизации включает анализ ключевых слов, техническую оптимизацию, создание качественного контента и построение ссылочной массы...',
        tags: ['SEO', 'поисковая оптимизация', 'Google', 'Яндекс']
      },
      {
        title: 'Локальное SEO: как продвинуть бизнес в своем городе',
        excerpt: 'Google My Business, локальные ключевые слова, отзывы клиентов и NAP-данные для продвижения местного бизнеса.',
        content: 'Локальное SEO включает оптимизацию для местных запросов, настройку Google My Business, работу с отзывами и локальными ссылками...',
        tags: ['локальное SEO', 'Google My Business', 'NAP', 'местный бизнес']
      }
    ],
    design: [
      {
        title: 'Тренды веб-дизайна {year}: что будет актуально',
        excerpt: 'Нейроморфизм, темные темы, анимации, градиенты и другие тренды дизайна, которые будут популярны в этом году.',
        content: 'Современные тренды веб-дизайна включают минимализм, анимации, интерактивные элементы и адаптивный дизайн...',
        tags: ['дизайн', 'тренды', 'UI/UX', '2024']
      }
    ]
  },
  en: {
    seo: [
      {
        title: 'Complete SEO Guide for {year}',
        excerpt: 'Learn how to properly optimize your website for search engines. Keywords, meta tags, structure and internal linking.',
        content: 'Comprehensive SEO guide covers keyword analysis, technical optimization, quality content creation and link building...',
        tags: ['SEO', 'search optimization', 'Google', 'ranking']
      }
    ],
    design: [
      {
        title: 'Web Design Trends {year}: What Will Be Relevant',
        excerpt: 'Neumorphism, dark themes, animations, gradients and other design trends that will be popular this year.',
        content: 'Modern web design trends include minimalism, animations, interactive elements and responsive design...',
        tags: ['design', 'trends', 'UI/UX', '2024']
      }
    ]
  },
  es: {
    seo: [
      {
        title: 'Guía completa de SEO para {year}',
        excerpt: 'Aprende cómo optimizar adecuadamente tu sitio web para motores de búsqueda. Palabras clave, meta tags, estructura y enlaces internos.',
        content: 'La guía completa de SEO cubre análisis de palabras clave, optimización técnica, creación de contenido de calidad y construcción de enlaces...',
        tags: ['SEO', 'optimización', 'Google', 'posicionamiento']
      }
    ],
    design: [
      {
        title: 'Tendencias de diseño web {year}: qué será relevante',
        excerpt: 'Neumorfismo, temas oscuros, animaciones, gradientes y otras tendencias de diseño que serán populares este año.',
        content: 'Las tendencias modernas del diseño web incluyen minimalismo, animaciones, elementos interactivos y diseño responsivo...',
        tags: ['diseño', 'tendencias', 'UI/UX', '2024']
      }
    ]
  }
};

const images = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500'
];

export function generateArticles(language: string = 'ru'): Article[] {
  const articles: Article[] = [];
  const currentYear = new Date().getFullYear();
  
  // Генерируем 10000+ статей
  for (let i = 1; i <= 10000; i++) {
    const categoryKeys = Object.keys(articleTemplates[language as keyof typeof articleTemplates] || articleTemplates.ru);
    const randomCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
    const templates = (articleTemplates[language as keyof typeof articleTemplates] || articleTemplates.ru)[randomCategory as keyof typeof articleTemplates.ru];
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    const article: Article = {
      id: i,
      title: template.title.replace('{year}', currentYear.toString()) + ` #${i}`,
      excerpt: template.excerpt,
      content: template.content,
      author: authors[language as keyof typeof authors]?.[Math.floor(Math.random() * 5)] || authors.ru[0],
      date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      category: categories[language as keyof typeof categories]?.[Math.floor(Math.random() * 5)] || categories.ru[0],
      readTime: `${Math.floor(Math.random() * 15) + 5} мин`,
      image: images[Math.floor(Math.random() * images.length)],
      tags: template.tags,
      language
    };
    
    articles.push(article);
  }
  
  return articles;
}

export function getArticleById(id: number, language: string = 'ru'): Article | null {
  const articles = generateArticles(language);
  return articles.find(article => article.id === id) || null;
}

export function searchArticles(query: string, category: string = 'Все', language: string = 'ru'): Article[] {
  const articles = generateArticles(language);
  
  return articles.filter(article => {
    const matchesSearch = !query || 
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
    
    const matchesCategory = category === 'Все' || category === 'All' || category === 'Todos' || 
      article.category === category;
    
    return matchesSearch && matchesCategory;
  }).slice(0, 50); // Ограничиваем результаты для производительности
}
