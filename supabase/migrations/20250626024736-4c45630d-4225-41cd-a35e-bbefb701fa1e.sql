
-- Создаем таблицу для статей блога
CREATE TABLE public.articles (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  category TEXT NOT NULL,
  read_time TEXT NOT NULL,
  image TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  language TEXT NOT NULL DEFAULT 'ru',
  slug TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(slug, language)
);

-- Создаем таблицу для профилей пользователей
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  wallet_address TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включаем RLS для безопасности
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Политики для статей (публично доступны для чтения)
CREATE POLICY "Articles are viewable by everyone" ON public.articles
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert articles" ON public.articles
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Only admins can update articles" ON public.articles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Политики для профилей
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Функция для автоматического создания профиля при регистрации
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  admin_wallet TEXT := '0xB2F8234571eEF9B222DEca1307A03c6c2E376b73';
  wallet_from_meta TEXT;
BEGIN
  -- Извлекаем wallet_address из метаданных пользователя
  wallet_from_meta := NEW.raw_user_meta_data ->> 'wallet_address';
  
  INSERT INTO public.profiles (
    id, 
    first_name, 
    last_name, 
    email, 
    wallet_address,
    is_admin
  )
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    NEW.email,
    wallet_from_meta,
    CASE 
      WHEN LOWER(wallet_from_meta) = LOWER(admin_wallet) THEN true 
      ELSE false 
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Триггер для автоматического создания профиля
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Функция для генерации SEO-оптимизированного контента статей
CREATE OR REPLACE FUNCTION public.generate_seo_articles()
RETURNS void AS $$
DECLARE
  article_count INTEGER := 0;
  lang TEXT;
  category_names TEXT[] := ARRAY['SEO', 'Дизайн', 'Разработка', 'Маркетинг', 'Производительность'];
  category_names_en TEXT[] := ARRAY['SEO', 'Design', 'Development', 'Marketing', 'Performance'];
  category_names_es TEXT[] := ARRAY['SEO', 'Diseño', 'Desarrollo', 'Marketing', 'Rendimiento'];
  authors_ru TEXT[] := ARRAY['Михаил Петров', 'Елена Волкова', 'Анна Смирнова', 'Дмитрий Козлов', 'Ольга Иванова'];
  authors_en TEXT[] := ARRAY['Michael Johnson', 'Sarah Wilson', 'Anna Smith', 'David Brown', 'Lisa Taylor'];
  authors_es TEXT[] := ARRAY['Miguel García', 'Elena López', 'Ana Martínez', 'David Rodríguez', 'Olga Fernández'];
  images TEXT[] := ARRAY[
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500'
  ];
BEGIN
  -- Очищаем существующие статьи
  DELETE FROM public.articles;
  
  -- Генерируем статьи для каждого языка
  FOREACH lang IN ARRAY ARRAY['ru', 'en', 'es']
  LOOP
    FOR i IN 1..3334 LOOP -- ~10k статей общего
      article_count := article_count + 1;
      
      INSERT INTO public.articles (
        title,
        excerpt,
        content,
        author,
        date,
        category,
        read_time,
        image,
        tags,
        language,
        slug,
        meta_title,
        meta_description,
        meta_keywords
      ) VALUES (
        CASE lang
          WHEN 'ru' THEN 'SEO продвижение сайтов 2024: полное руководство #' || article_count
          WHEN 'en' THEN 'SEO Website Promotion 2024: Complete Guide #' || article_count
          WHEN 'es' THEN 'Promoción SEO de sitios web 2024: Guía completa #' || article_count
        END,
        CASE lang
          WHEN 'ru' THEN 'Узнайте, как правильно оптимизировать сайт для поисковых систем. Ключевые слова, мета-теги, структура и внутренняя перелинковка для достижения топовых позиций.'
          WHEN 'en' THEN 'Learn how to properly optimize your website for search engines. Keywords, meta tags, structure and internal linking to achieve top rankings.'
          WHEN 'es' THEN 'Aprende cómo optimizar adecuadamente tu sitio web para motores de búsqueda. Palabras clave, meta tags, estructura y enlaces internos para lograr rankings superiores.'
        END,
        CASE lang
          WHEN 'ru' THEN 'Подробное руководство по SEO-оптимизации включает анализ ключевых слов, техническую оптимизацию, создание качественного контента и построение ссылочной массы. Современные алгоритмы поисковых систем требуют комплексного подхода к продвижению. Важными факторами являются: скорость загрузки страниц, мобильная адаптация, структурированные данные, качественный контент, пользовательский опыт. Наша команда CosmoLab имеет многолетний опыт в области SEO и готова помочь вашему бизнесу достичь топовых позиций в поисковой выдаче.'
          WHEN 'en' THEN 'Comprehensive SEO guide covers keyword analysis, technical optimization, quality content creation and link building. Modern search engine algorithms require a comprehensive approach to promotion. Important factors include: page loading speed, mobile adaptation, structured data, quality content, user experience. Our CosmoLab team has years of experience in SEO and is ready to help your business achieve top positions in search results.'
          WHEN 'es' THEN 'La guía completa de SEO cubre análisis de palabras clave, optimización técnica, creación de contenido de calidad y construcción de enlaces. Los algoritmos modernos de motores de búsqueda requieren un enfoque integral para la promoción. Los factores importantes incluyen: velocidad de carga de páginas, adaptación móvil, datos estructurados, contenido de calidad, experiencia del usuario. Nuestro equipo CosmoLab tiene años de experiencia en SEO y está listo para ayudar a su negocio a alcanzar posiciones superiores en los resultados de búsqueda.'
        END,
        CASE lang
          WHEN 'ru' THEN authors_ru[1 + (i % 5)]
          WHEN 'en' THEN authors_en[1 + (i % 5)]
          WHEN 'es' THEN authors_es[1 + (i % 5)]
        END,
        CURRENT_DATE - (random() * 365)::INTEGER,
        CASE lang
          WHEN 'ru' THEN category_names[1 + (i % 5)]
          WHEN 'en' THEN category_names_en[1 + (i % 5)]
          WHEN 'es' THEN category_names_es[1 + (i % 5)]
        END,
        (5 + (random() * 15)::INTEGER) || ' мин',
        images[1 + (i % 5)],
        CASE lang
          WHEN 'ru' THEN ARRAY['SEO', 'поисковая оптимизация', 'Google', 'Яндекс', 'ранжирование']
          WHEN 'en' THEN ARRAY['SEO', 'search optimization', 'Google', 'ranking', 'optimization']
          WHEN 'es' THEN ARRAY['SEO', 'optimización', 'Google', 'posicionamiento', 'búsqueda']
        END,
        lang,
        'seo-guide-' || article_count || '-' || lang,
        CASE lang
          WHEN 'ru' THEN 'SEO продвижение сайтов 2024: полное руководство #' || article_count || ' | CosmoLab'
          WHEN 'en' THEN 'SEO Website Promotion 2024: Complete Guide #' || article_count || ' | CosmoLab'
          WHEN 'es' THEN 'Promoción SEO de sitios web 2024: Guía completa #' || article_count || ' | CosmoLab'
        END,
        CASE lang
          WHEN 'ru' THEN 'Полное руководство по SEO продвижению сайтов в 2024 году. Ключевые слова, техническая оптимизация, контент-маркетинг и ссылочная масса.'
          WHEN 'en' THEN 'Complete guide to SEO website promotion in 2024. Keywords, technical optimization, content marketing and link building.'
          WHEN 'es' THEN 'Guía completa para la promoción SEO de sitios web en 2024. Palabras clave, optimización técnica, marketing de contenidos y construcción de enlaces.'
        END,
        CASE lang
          WHEN 'ru' THEN ARRAY['SEO', 'продвижение сайтов', 'поисковая оптимизация', 'Google', 'Яндекс']
          WHEN 'en' THEN ARRAY['SEO', 'website promotion', 'search optimization', 'Google', 'ranking']
          WHEN 'es' THEN ARRAY['SEO', 'promoción web', 'optimización búsqueda', 'Google', 'posicionamiento']
        END
      );
    END LOOP;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Запускаем генерацию статей
SELECT public.generate_seo_articles();

-- Создаем индексы для оптимизации
CREATE INDEX idx_articles_language ON public.articles(language);
CREATE INDEX idx_articles_category ON public.articles(category);
CREATE INDEX idx_articles_slug ON public.articles(slug);
CREATE INDEX idx_articles_created_at ON public.articles(created_at);
CREATE INDEX idx_profiles_wallet_address ON public.profiles(wallet_address);
CREATE INDEX idx_profiles_is_admin ON public.profiles(is_admin);
