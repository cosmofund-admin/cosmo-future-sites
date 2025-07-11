import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, FileText, Briefcase, Settings, LogOut, CreditCard, Target, TrendingUp, Zap, Globe } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../integrations/supabase/client';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, profile, signOut, checkAdminStatus } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchOrders();
      fetchPayments();
    }
  }, [user]);

  const fetchOrders = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setOrders(data);
    }
  };

  const fetchPayments = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('payments')
      .select('*, orders(service)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setPayments(data);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'paid': return 'bg-blue-500';
      case 'in_progress': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Анализируем';
      case 'paid': return 'Структурируем';
      case 'in_progress': return 'Упаковываем';
      case 'completed': return 'Готово';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 border border-white/30 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-2xl font-bold text-white">
                CosmoLab
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              {checkAdminStatus() && (
                <Link 
                  to="/admin" 
                  className="text-white/70 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
                >
                  Админ панель
                </Link>
              )}
              <button 
                onClick={handleSignOut}
                className="flex items-center text-white/70 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            ВАШИ СМЫСЛЫ
            <span className="block text-white/80">В РАБОТЕ</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Отслеживайте процесс раскрытия и упаковки смыслов вашего бизнеса. 
            От анализа до финальной реализации — каждый этап под контролем
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              {/* Profile Info */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {profile?.first_name && profile?.last_name 
                    ? `${profile.first_name} ${profile.last_name}`
                    : 'Партнер'
                  }
                </h3>
                <p className="text-white/60 text-sm mb-3">{user?.email}</p>
                {profile?.wallet_address && (
                  <p className="text-xs text-white/40 font-mono bg-white/5 px-3 py-1 rounded-lg">
                    {profile.wallet_address.slice(0, 6)}...{profile.wallet_address.slice(-4)}
                  </p>
                )}
                {checkAdminStatus() && (
                  <span className="inline-block bg-white/20 text-white text-xs px-3 py-1 rounded-full mt-3 font-medium">
                    Администратор
                  </span>
                )}
              </div>
              
              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center transition-all duration-200 ${
                    activeTab === 'overview' 
                      ? 'bg-white/20 text-white border border-white/30' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Target className="w-5 h-5 mr-3" />
                  Обзор проектов
                </button>
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center transition-all duration-200 ${
                    activeTab === 'projects' 
                      ? 'bg-white/20 text-white border border-white/30' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Briefcase className="w-5 h-5 mr-3" />
                  Смыслы в работе
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center transition-all duration-200 ${
                    activeTab === 'orders' 
                      ? 'bg-white/20 text-white border border-white/30' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <FileText className="w-5 h-5 mr-3" />
                  История заказов
                </button>
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center transition-all duration-200 ${
                    activeTab === 'payments' 
                      ? 'bg-white/20 text-white border border-white/30' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mr-3" />
                  Финансы
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center transition-all duration-200 ${
                    activeTab === 'profile' 
                      ? 'bg-white/20 text-white border border-white/30' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Настройки
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-6">Статус ваших смыслов</h2>
                    <p className="text-white/70 text-lg mb-8">
                      Мы работаем над тем, чтобы ваши идеи обрели четкую форму и принесли результат
                    </p>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/10 border border-white/20 rounded-xl p-6 text-center">
                      <TrendingUp className="w-8 h-8 text-white mx-auto mb-3" />
                      <div className="text-3xl font-bold text-white mb-2">{orders.length}</div>
                      <div className="text-white/70">Проектов в работе</div>
                    </div>
                    <div className="bg-white/10 border border-white/20 rounded-xl p-6 text-center">
                      <Zap className="w-8 h-8 text-white mx-auto mb-3" />
                      <div className="text-3xl font-bold text-white mb-2">
                        {orders.filter(o => o.status === 'completed').length}
                      </div>
                      <div className="text-white/70">Смыслов упаковано</div>
                    </div>
                    <div className="bg-white/10 border border-white/20 rounded-xl p-6 text-center">
                      <Globe className="w-8 h-8 text-white mx-auto mb-3" />
                      <div className="text-3xl font-bold text-white mb-2">
                        {orders.filter(o => o.status === 'in_progress').length}
                      </div>
                      <div className="text-white/70">В процессе</div>
                    </div>
                  </div>

                  {/* Recent Projects */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">Последние проекты</h3>
                    <div className="space-y-4">
                      {orders.slice(0, 3).map((order) => (
                        <div key={order.id} className="bg-white/10 border border-white/20 rounded-xl p-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="text-xl font-semibold text-white mb-2">{order.service}</h4>
                              <p className="text-white/70 mb-3">{order.name}</p>
                              <div className="flex items-center space-x-4">
                                <div className={`w-3 h-3 rounded-full ${getStatusColor(order.status)}`}></div>
                                <span className="text-white/80 font-medium">{getStatusText(order.status)}</span>
                                <span className="text-white/60 text-sm">
                                  {new Date(order.created_at).toLocaleDateString('ru-RU')}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-white">${order.price}</div>
                              <div className="text-white/60">{order.currency}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Projects Tab */}
              {activeTab === 'projects' && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Смыслы в работе</h2>
                  <p className="text-white/70 text-lg mb-8">
                    Каждый проект проходит три этапа: анализируем → структурируем → упаковываем
                  </p>
                  
                  <div className="space-y-6">
                    {orders.length === 0 ? (
                      <div className="text-center py-12">
                        <Target className="w-16 h-16 text-white/30 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Смыслов пока нет</h3>
                        <p className="text-white/60 mb-6">Начните свой первый проект с нами</p>
                        <Button 
                          onClick={() => navigate('/#contact')}
                          className="bg-white/20 text-white border border-white/30 hover:bg-white/30"
                        >
                          Обсудить проект
                        </Button>
                      </div>
                    ) : (
                      orders.map((order) => (
                        <div key={order.id} className="bg-white/10 border border-white/20 rounded-xl p-6">
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <h3 className="text-2xl font-semibold text-white mb-2">{order.service}</h3>
                              <p className="text-white/70 text-lg">{order.name}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-white">${order.price}</div>
                              <div className="text-white/60">{order.currency}</div>
                            </div>
                          </div>
                          
                          {/* Progress Indicator */}
                          <div className="mb-6">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-white font-medium">Этап: {getStatusText(order.status)}</span>
                              <span className="text-white/60 text-sm">
                                {new Date(order.created_at).toLocaleDateString('ru-RU')}
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              <div className={`flex-1 h-2 rounded-full ${
                                ['paid', 'in_progress', 'completed'].includes(order.status) 
                                  ? 'bg-white/40' : 'bg-white/10'
                              }`}></div>
                              <div className={`flex-1 h-2 rounded-full ${
                                ['in_progress', 'completed'].includes(order.status) 
                                  ? 'bg-white/40' : 'bg-white/10'
                              }`}></div>
                              <div className={`flex-1 h-2 rounded-full ${
                                order.status === 'completed' 
                                  ? 'bg-white/40' : 'bg-white/10'
                              }`}></div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className={`inline-flex items-center px-4 py-2 rounded-full ${
                              order.status === 'completed' 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : order.status === 'in_progress'
                                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            }`}>
                              <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(order.status)}`}></div>
                              {getStatusText(order.status)}
                            </div>
                            
                            {order.status !== 'completed' && (
                              <Button
                                size="sm"
                                onClick={() => navigate(`/payment?orderId=${order.id}`)}
                                className="bg-white/20 text-white border border-white/30 hover:bg-white/30"
                              >
                                Оплатить следующий этап
                              </Button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">История заказов</h2>
                  <div className="space-y-4">
                    {orders.length === 0 ? (
                      <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-white/30 mx-auto mb-4" />
                        <p className="text-white/60">У вас пока нет заказов</p>
                      </div>
                    ) : (
                      orders.map((order) => (
                        <div key={order.id} className="bg-white/10 border border-white/20 rounded-xl p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-semibold text-white mb-2">{order.service}</h3>
                              <p className="text-white/70 mb-1">{order.name}</p>
                              <p className="text-white/60 text-sm">
                                Создан: {new Date(order.created_at).toLocaleDateString('ru-RU')}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-white">${order.price}</p>
                              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm mt-2 ${
                                order.status === 'completed' 
                                  ? 'bg-green-500/20 text-green-400'
                                  : order.status === 'in_progress'
                                  ? 'bg-yellow-500/20 text-yellow-400'
                                  : 'bg-blue-500/20 text-blue-400'
                              }`}>
                                {getStatusText(order.status)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Payments Tab */}
              {activeTab === 'payments' && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Финансы</h2>
                  <div className="space-y-4">
                    {payments.length === 0 ? (
                      <div className="text-center py-12">
                        <CreditCard className="w-16 h-16 text-white/30 mx-auto mb-4" />
                        <p className="text-white/60">У вас пока нет платежей</p>
                      </div>
                    ) : (
                      payments.map((payment) => (
                        <div key={payment.id} className="bg-white/10 border border-white/20 rounded-xl p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-semibold text-white mb-2">
                                {payment.orders?.service || 'Заказ'}
                              </h3>
                              <p className="text-white/70 mb-1">Способ: {payment.payment_method}</p>
                              <p className="text-white/60 text-sm">
                                {new Date(payment.created_at).toLocaleDateString('ru-RU')}
                              </p>
                              {payment.transaction_hash && (
                                <p className="text-xs font-mono text-white/40 break-all mt-2 bg-white/5 px-3 py-1 rounded">
                                  Hash: {payment.transaction_hash}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-white">
                                {payment.amount} {payment.currency}
                              </p>
                              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm mt-2 ${
                                payment.status === 'confirmed' 
                                  ? 'bg-green-500/20 text-green-400' 
                                  : payment.status === 'failed' 
                                  ? 'bg-red-500/20 text-red-400' 
                                  : 'bg-yellow-500/20 text-yellow-400'
                              }`}>
                                {payment.status === 'pending' ? 'Ожидает' : 
                                 payment.status === 'confirmed' ? 'Подтвержден' : 
                                 payment.status === 'failed' ? 'Отклонен' : payment.status}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Настройки профиля</h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-6">Личная информация</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-white/70 mb-2">Имя</label>
                          <input 
                            type="text" 
                            defaultValue={profile?.first_name || ''} 
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-white/40 focus:outline-none" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white/70 mb-2">Фамилия</label>
                          <input 
                            type="text" 
                            defaultValue={profile?.last_name || ''} 
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-white/40 focus:outline-none" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
                          <input 
                            type="email" 
                            defaultValue={user?.email || ''} 
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 cursor-not-allowed" 
                            disabled
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white/70 mb-2">Кошелек</label>
                          <input 
                            type="text" 
                            defaultValue={profile?.wallet_address || ''} 
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 cursor-not-allowed" 
                            disabled
                          />
                        </div>
                      </div>
                      <button className="mt-6 bg-white/20 text-white px-8 py-3 rounded-xl font-medium hover:bg-white/30 transition-colors border border-white/30">
                        Сохранить изменения
                      </button>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-6">Уведомления</h3>
                      <div className="space-y-4">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-4 w-5 h-5" />
                          <span className="text-white/80">Email уведомления о статусе проекта</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-4 w-5 h-5" />
                          <span className="text-white/80">Уведомления о новых этапах</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-4 w-5 h-5" />
                          <span className="text-white/80">SMS уведомления</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-6">Безопасность</h3>
                      <div className="space-y-4 max-w-md">
                        <input 
                          type="password" 
                          placeholder="Текущий пароль" 
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-white/40 focus:outline-none" 
                        />
                        <input 
                          type="password" 
                          placeholder="Новый пароль" 
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-white/40 focus:outline-none" 
                        />
                        <input 
                          type="password" 
                          placeholder="Подтвердите пароль" 
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-white/40 focus:outline-none" 
                        />
                        <button className="bg-white/20 text-white px-8 py-3 rounded-xl font-medium hover:bg-white/30 transition-colors border border-white/30">
                          Изменить пароль
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;