
import { supabase, isSupabaseConfigured } from '../integrations/supabase/client';

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

export const getArticleById = async (id: string) => {
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
