
import { supabase } from '@/integrations/supabase/client';

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  read_time: string;
  image: string;
  tags: string[];
  language: string;
  slug: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
}

export const getArticles = async (language: string = 'ru', limit: number = 50, offset: number = 0): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('language', language)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }

  return data || [];
};

export const getArticleById = async (id: number): Promise<Article | null> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching article:', error);
    return null;
  }

  return data;
};

export const searchArticles = async (
  query: string, 
  category: string = '', 
  language: string = 'ru',
  limit: number = 50
): Promise<Article[]> => {
  let queryBuilder = supabase
    .from('articles')
    .select('*')
    .eq('language', language);

  if (query) {
    queryBuilder = queryBuilder.or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,tags.cs.{${query}}`);
  }

  if (category && category !== 'Все' && category !== 'All' && category !== 'Todos') {
    queryBuilder = queryBuilder.eq('category', category);
  }

  const { data, error } = await queryBuilder
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error searching articles:', error);
    return [];
  }

  return data || [];
};

export const getTotalArticlesCount = async (language: string = 'ru'): Promise<number> => {
  const { count, error } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true })
    .eq('language', language);

  if (error) {
    console.error('Error counting articles:', error);
    return 0;
  }

  return count || 0;
};
