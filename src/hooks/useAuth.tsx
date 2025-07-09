
import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: any }>;
  signInWithMetaMask: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  checkAdminStatus: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      return null;
    }
  };

  useEffect(() => {
    // Настройка слушателя изменений аутентификации
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Получаем профиль пользователя после изменения состояния
          setTimeout(async () => {
            const profileData = await fetchProfile(session.user.id);
            setProfile(profileData);
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Проверяем существующую сессию
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(async () => {
          const profileData = await fetchProfile(session.user.id);
          setProfile(profileData);
        }, 0);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      toast.error('Ошибка входа: ' + error.message);
    } else {
      toast.success('Успешный вход в систему!');
    }
    
    return { error };
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          first_name: firstName,
          last_name: lastName,
        }
      }
    });
    
    if (error) {
      toast.error('Ошибка регистрации: ' + error.message);
    } else {
      toast.success('Регистрация успешна! Проверьте email для подтверждения.');
    }
    
    return { error };
  };

  const signInWithMetaMask = async () => {
    try {
      if (!window.ethereum) {
        toast.error('MetaMask не установлен!');
        return { error: new Error('MetaMask не установлен') };
      }

      // Переключаем на BSC сеть
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x38' }], // BSC Mainnet
        });
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          // Добавляем BSC сеть если её нет
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x38',
              chainName: 'BNB Smart Chain',
              nativeCurrency: {
                name: 'BNB',
                symbol: 'BNB',
                decimals: 18,
              },
              rpcUrls: ['https://bsc-dataseed.binance.org/'],
              blockExplorerUrls: ['https://bscscan.com/'],
            }],
          });
        }
      }

      // Подключаем кошелек
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      
      const walletAddress = accounts[0];
      
      // Создаем сообщение для подписи
      const message = `Вход в CosmoLab: ${Date.now()}`;
      
      // Подписываем сообщение
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, walletAddress],
      });

      // Используем кошелек как email для Supabase
      const email = `${walletAddress.toLowerCase()}@metamask.local`;
      
      // Пытаемся войти
      let { error } = await supabase.auth.signInWithPassword({
        email,
        password: signature,
      });

      // Если пользователя нет, создаем его
      if (error && error.message.includes('Invalid login credentials')) {
        const signUpResult = await supabase.auth.signUp({
          email,
          password: signature,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              wallet_address: walletAddress,
              first_name: 'MetaMask',
              last_name: 'User',
            }
          }
        });
        
        if (signUpResult.error) {
          toast.error('Ошибка создания аккаунта: ' + signUpResult.error.message);
          return { error: signUpResult.error };
        }
        
        // После регистрации пытаемся войти снова
        const signInResult = await supabase.auth.signInWithPassword({
          email,
          password: signature,
        });
        
        error = signInResult.error;
      }

      if (error) {
        toast.error('Ошибка входа через MetaMask: ' + error.message);
        return { error };
      }

      toast.success('Успешный вход через MetaMask!');
      return { error: null };
      
    } catch (error: any) {
      console.error('MetaMask error:', error);
      toast.error('Ошибка MetaMask: ' + error.message);
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success('Вы вышли из системы');
  };

  const checkAdminStatus = () => {
    return profile?.is_admin === true;
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      loading,
      signIn,
      signUp,
      signInWithMetaMask,
      signOut,
      checkAdminStatus,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
