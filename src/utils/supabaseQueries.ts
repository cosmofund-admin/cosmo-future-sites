
import { supabase, isSupabaseConfigured } from '../integrations/supabase/client';

// Export Article type based on database schema
export type Article = {
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
  created_at?: string;
  updated_at?: string;
};

export const getArticles = async (language: string = 'ru', limit: number = 10, offset: number = 0) => {
  // Return empty array if Supabase is not configured
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, returning empty articles array');
    return [];
  }

  try {
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
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

export const getArticleById = async (id: number) => {
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, returning null');
    return null;
  }

  try {
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
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
};

export const createArticle = async (article: any) => {
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, cannot create article');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .insert([article])
      .select()
      .single();

    if (error) {
      console.error('Error creating article:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error creating article:', error);
    return null;
  }
};

export const searchArticles = async (
  searchTerm: string = '', 
  category: string = 'Все', 
  language: string = 'ru', 
  limit: number = 20
): Promise<Article[]> => {
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, returning empty search results');
    return [];
  }

  try {
    let query = supabase
      .from('articles')
      .select('*')
      .eq('language', language)
      .order('created_at', { ascending: false })
      .limit(limit);

    // Add search term filter if provided
    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%`);
    }

    // Add category filter if not "Все"
    if (category !== 'Все') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error searching articles:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error searching articles:', error);
    return [];
  }
};

export const getTotalArticlesCount = async (language: string = 'ru'): Promise<number> => {
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, returning 0 count');
    return 0;
  }

  try {
    const { count, error } = await supabase
      .from('articles')
      .select('*', { count: 'exact', head: true })
      .eq('language', language);

    if (error) {
      console.error('Error getting articles count:', error);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error('Error getting articles count:', error);
    return 0;
  }
};
