
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, FileText, Briefcase, Settings, LogOut, CreditCard, Eye } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../integrations/supabase/client';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">CosmoLab</Link>
            <div className="flex items-center space-x-4">
              {checkAdminStatus() && (
                <Link to="/admin" className="text-gray-600 hover:text-blue-600">Админ панель</Link>
              )}
              <button 
                onClick={handleSignOut}
                className="flex items-center text-gray-600 hover:text-blue-600"
              >
                <LogOut className="w-5 h-5 mr-1" />
                Выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Личный кабинет</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">
                  {profile?.first_name && profile?.last_name 
                    ? `${profile.first_name} ${profile.last_name}`
                    : 'Пользователь'
                  }
                </h3>
                <p className="text-gray-600">{user?.email}</p>
                {profile?.wallet_address && (
                  <p className="text-xs text-gray-500 mt-1 font-mono">
                    {profile.wallet_address.slice(0, 6)}...{profile.wallet_address.slice(-4)}
                  </p>
                )}
                {checkAdminStatus() && (
                  <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-2">
                    Администратор
                  </span>
                )}
              </div>
              
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <User className="w-5 h-5 mr-3" />
                  Профиль
                </button>
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === 'projects' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <Briefcase className="w-5 h-5 mr-3" />
                  Мои проекты
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <FileText className="w-5 h-5 mr-3" />
                  Заказы
                </button>
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === 'payments' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <CreditCard className="w-5 h-5 mr-3" />
                  Платежи
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Настройки
                </button>
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-6">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Информация о профиле</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Имя</label>
                      <input 
                        type="text" 
                        defaultValue={profile?.first_name || ''} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Фамилия</label>
                      <input 
                        type="text" 
                        defaultValue={profile?.last_name || ''} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input 
                        type="email" 
                        defaultValue={user?.email || ''} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Кошелек</label>
                      <input 
                        type="text" 
                        defaultValue={profile?.wallet_address || ''} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                        disabled
                      />
                    </div>
                  </div>
                  <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg">Сохранить</button>
                </div>
              )}

              {activeTab === 'projects' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Мои заказы</h2>
                  <div className="space-y-4">
                    {orders.length === 0 ? (
                      <p className="text-gray-500">У вас пока нет заказов</p>
                    ) : (
                      orders.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-lg font-medium">{order.service}</h3>
                              <p className="text-gray-600">${order.price}</p>
                            </div>
                            <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                              {order.status === 'pending' ? 'В обработке' : 
                               order.status === 'paid' ? 'Оплачен' : 
                               order.status === 'completed' ? 'Завершен' : order.status}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => navigate(`/payment?orderId=${order.id}`)}
                              disabled={order.status === 'completed'}
                            >
                              Оплатить
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">История заказов</h2>
                  <div className="space-y-4">
                    {orders.length === 0 ? (
                      <p className="text-gray-500">У вас пока нет заказов</p>
                    ) : (
                      orders.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-medium">{order.service}</h3>
                              <p className="text-gray-600">{order.name}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(order.created_at).toLocaleDateString('ru-RU')}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold">${order.price}</p>
                              <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                                {order.status === 'pending' ? 'В обработке' : 
                                 order.status === 'paid' ? 'Оплачен' : 
                                 order.status === 'completed' ? 'Завершен' : order.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'payments' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">История платежей</h2>
                  <div className="space-y-4">
                    {payments.length === 0 ? (
                      <p className="text-gray-500">У вас пока нет платежей</p>
                    ) : (
                      payments.map((payment) => (
                        <div key={payment.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-medium">{payment.orders?.service || 'Заказ'}</h3>
                              <p className="text-gray-600">Способ: {payment.payment_method}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(payment.created_at).toLocaleDateString('ru-RU')}
                              </p>
                              {payment.transaction_hash && (
                                <p className="text-xs font-mono text-gray-500 break-all">
                                  Hash: {payment.transaction_hash}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold">
                                {payment.amount} {payment.currency}
                              </p>
                              <Badge variant={
                                payment.status === 'confirmed' ? 'default' : 
                                payment.status === 'failed' ? 'destructive' : 'secondary'
                              }>
                                {payment.status === 'pending' ? 'Ожидает' : 
                                 payment.status === 'confirmed' ? 'Подтвержден' : 
                                 payment.status === 'failed' ? 'Отклонен' : payment.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Настройки аккаунта</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Уведомления</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-3" />
                          <span>Email уведомления о статусе проекта</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-3" />
                          <span>SMS уведомления</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">Смена пароля</h3>
                      <div className="space-y-4 max-w-md">
                        <input type="password" placeholder="Текущий пароль" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        <input type="password" placeholder="Новый пароль" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        <input type="password" placeholder="Подтвердите пароль" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">Изменить пароль</button>
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
