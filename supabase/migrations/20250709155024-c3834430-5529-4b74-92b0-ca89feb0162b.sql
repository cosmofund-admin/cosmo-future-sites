
-- Обновляем таблицу orders для поддержки оплаты
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS price DECIMAL(10,2);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'USD';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Создаем таблицу payments для хранения информации об оплатах
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  payment_method TEXT NOT NULL, -- 'yoomoney', 'usdt', 'metamask'
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL,
  transaction_hash TEXT,
  screenshot_url TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'failed'
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Включаем RLS для payments
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Политики для payments
CREATE POLICY "Users can view their own payments" ON public.payments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own payments" ON public.payments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own payments" ON public.payments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all payments" ON public.payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can update all payments" ON public.payments
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Обновляем политики orders для поддержки пользователей
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" ON public.orders
  FOR UPDATE USING (auth.uid() = user_id);

-- Создаем таблицу site_settings для админки
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(section, key)
);

-- Включаем RLS для site_settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Политики для site_settings
CREATE POLICY "Everyone can view site settings" ON public.site_settings
  FOR SELECT USING (true);

CREATE POLICY "Only admins can modify site settings" ON public.site_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Устанавливаем главного админа
UPDATE public.profiles 
SET is_admin = true 
WHERE email = 'yunalexandr27@gmail.com';

-- Если профиль не существует, создаем запись для админа
INSERT INTO public.profiles (id, email, is_admin)
SELECT auth.uid(), 'yunalexandr27@gmail.com', true
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles WHERE email = 'yunalexandr27@gmail.com'
);

-- Создаем storage bucket для скриншотов платежей
INSERT INTO storage.buckets (id, name, public) 
VALUES ('payment-screenshots', 'payment-screenshots', false)
ON CONFLICT (id) DO NOTHING;

-- Политики для storage bucket
CREATE POLICY "Users can upload their payment screenshots" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'payment-screenshots' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their payment screenshots" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'payment-screenshots' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Admins can view all payment screenshots" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'payment-screenshots' AND
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Вставляем начальные настройки сайта
INSERT INTO public.site_settings (section, key, value) VALUES
('hero', 'title', '"Создаём сайты за 24 часа"'),
('hero', 'subtitle', '"Профессиональная веб-разработка под ключ"'),
('hero', 'description', '"Полный цикл создания сайтов от дизайна до запуска. Быстро, качественно, с гарантией результата."'),
('services', 'title', '"Наши услуги"'),
('contact', 'title', '"Связаться с нами"'),
('contact', 'phone', '"+7 (999) 123-45-67"'),
('contact', 'email', '"info@cosmolab.ru"'),
('payment', 'yoomoney_link', '"https://yoomoney.ru/to/410019220622751/50000"'),
('payment', 'usdt_address', '"0x9e00d62d50ef12d41394082d63aee3abf286d0c5"')
ON CONFLICT (section, key) DO NOTHING;
