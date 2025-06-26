
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthContextProps {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  connectWallet: () => Promise<void>;
  signInWithMetaMask: () => Promise<void>;
  checkAdminStatus: () => boolean;
}

interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  wallet_address: string | null;
  is_admin: boolean;
  created_at: string | null;
  updated_at: string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.warn('Supabase auth error:', error);
          if (mounted) {
            setLoading(false);
          }
          return;
        }

        if (mounted && session?.user) {
          setUser(session.user);
          await fetchUserProfile(session.user.id);
        }
      } catch (error) {
        console.warn('Auth initialization failed:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Set up auth state listener with error handling
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        if (mounted) {
          setUser(session?.user ?? null);
          
          if (session?.user) {
            await fetchUserProfile(session.user.id);
          } else {
            setProfile(null);
          }
          
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.warn('Error fetching profile:', error);
        return;
      }

      setProfile(data || null);
    } catch (error) {
      console.warn('Profile fetch failed:', error);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        }
      });

      if (error) {
        toast.error(error.message);
      } else {
        setUser(data.user);
        toast.success('Регистрация прошла успешно! Подтвердите ваш email.');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        setUser(data.user);
        await fetchUserProfile(data.user?.id as string);
        toast.success('Вход выполнен!');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
      } else {
        setUser(null);
        setProfile(null);
        toast.success('Вы вышли из системы');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      toast.error('MetaMask не установлен!');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const walletAddress = accounts[0];

      // Check if user exists with this wallet address
      const { data: existingUser, error: userError } = await supabase
        .from('profiles')
        .select('*')
        .eq('wallet_address', walletAddress)
        .single();

      if (userError && userError.code !== 'PGRST116') {
        console.error("Error checking for existing user:", userError);
        toast.error('Ошибка при проверке пользователя.');
        return;
      }

      if (existingUser) {
        // User exists, update auth state
        setUser({ ...user, id: existingUser.id } as User);
        setProfile(existingUser);
        toast.success('Кошелек подключен и вход выполнен!');
        return;
      }

      // No user exists, create a new profile
      const { data: newProfile, error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: user?.id, wallet_address: walletAddress, first_name: 'Новый пользователь' }])
        .select('*')
        .single();

      if (profileError) {
        console.error("Error creating profile:", profileError);
        toast.error('Ошибка при создании профиля.');
        return;
      }

      setUser({ ...user, id: newProfile.id } as User);
      setProfile(newProfile);
      toast.success('Кошелек подключен и создан новый профиль!');
    } catch (error: any) {
      console.error("Wallet connection error:", error);
      toast.error(error.message || 'Не удалось подключить кошелек.');
    }
  };

  const signInWithMetaMask = async () => {
    await connectWallet();
  };

  const checkAdminStatus = (): boolean => {
    return profile?.is_admin === true;
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    connectWallet,
    signInWithMetaMask,
    checkAdminStatus
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
