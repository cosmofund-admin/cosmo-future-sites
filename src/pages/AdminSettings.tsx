import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../integrations/supabase/client';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { Save, Users, Settings, FileText, CreditCard, Shield } from 'lucide-react';

const AdminSettings: React.FC = () => {
  const { user, profile, checkAdminStatus } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('content');
  const [loading, setLoading] = useState(false);
  
  // Site content states
  const [siteSettings, setSiteSettings] = useState<any>({});
  const [orders, setOrders] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');

  useEffect(() => {
    if (!checkAdminStatus()) {
      return;
    }
    
    fetchSiteSettings();
    fetchOrders();
    fetchPayments();
    fetchUsers();
  }, []);

  const fetchSiteSettings = async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*');
    
    if (!error && data) {
      const settings: any = {};
      data.forEach(setting => {
        if (!settings[setting.section]) {
          settings[setting.section] = {};
        }
        settings[setting.section][setting.key] = JSON.parse(setting.value as string);
      });
      setSiteSettings(settings);
    }
  };

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setOrders(data);
    }
  };

  const fetchPayments = async () => {
    const { data, error } = await supabase
      .from('payments')
      .select('*, orders(service, name)')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setPayments(data);
    }
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setUsers(data);
    }
  };

  const updateSiteSetting = async (section: string, key: string, value: any) => {
    const { error } = await supabase
      .from('site_settings')
      .upsert({
        section,
        key,
        value: JSON.stringify(value)
      });

    if (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить настройки",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Успешно",
        description: "Настройки сохранены"
      });
    }
  };

  const updatePaymentStatus = async (paymentId: string, status: string) => {
    const { error } = await supabase
      .from('payments')
      .update({ status })
      .eq('id', paymentId);

    if (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить статус",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Успешно",
        description: "Статус обновлен"
      });
      fetchPayments();
    }
  };

  const makeAdmin = async () => {
    if (!newAdminEmail) return;

    const { error } = await supabase
      .from('profiles')
      .update({ is_admin: true })
      .eq('email', newAdminEmail);

    if (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось назначить администратора",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Успешно",
        description: "Администратор назначен"
      });
      setNewAdminEmail('');
      fetchUsers();
    }
  };

  if (!checkAdminStatus()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Доступ запрещен</h1>
          <p className="text-gray-600 mb-4">У вас нет прав администратора</p>
          <Link to="/" className="text-blue-600 hover:underline">
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">Панель администратора</h1>
            <Link to="/" className="text-gray-600 hover:text-blue-600">
              На главную
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Button
                    variant={activeTab === 'content' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('content')}
                    className="w-full justify-start"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Контент сайта
                  </Button>
                  <Button
                    variant={activeTab === 'orders' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('orders')}
                    className="w-full justify-start"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Заказы
                  </Button>
                  <Button
                    variant={activeTab === 'payments' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('payments')}
                    className="w-full justify-start"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Платежи
                  </Button>
                  <Button
                    variant={activeTab === 'users' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('users')}
                    className="w-full justify-start"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Пользователи
                  </Button>
                  <Button
                    variant={activeTab === 'admins' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('admins')}
                    className="w-full justify-start"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Администраторы
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'content' && (
              <Card>
                <CardHeader>
                  <CardTitle>Редактирование контента</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Hero Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Главный экран</h3>
                    <div className="space-y-4">
                      <div>
                        <Label>Заголовок</Label>
                        <Input
                          value={siteSettings.hero?.title || ''}
                          onChange={(e) => {
                            const newSettings = { ...siteSettings };
                            if (!newSettings.hero) newSettings.hero = {};
                            newSettings.hero.title = e.target.value;
                            setSiteSettings(newSettings);
                          }}
                          onBlur={(e) => updateSiteSetting('hero', 'title', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Подзаголовок</Label>
                        <Input
                          value={siteSettings.hero?.subtitle || ''}
                          onChange={(e) => {
                            const newSettings = { ...siteSettings };
                            if (!newSettings.hero) newSettings.hero = {};
                            newSettings.hero.subtitle = e.target.value;
                            setSiteSettings(newSettings);
                          }}
                          onBlur={(e) => updateSiteSetting('hero', 'subtitle', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Описание</Label>
                        <Textarea
                          value={siteSettings.hero?.description || ''}
                          onChange={(e) => {
                            const newSettings = { ...siteSettings };
                            if (!newSettings.hero) newSettings.hero = {};
                            newSettings.hero.description = e.target.value;
                            setSiteSettings(newSettings);
                          }}
                          onBlur={(e) => updateSiteSetting('hero', 'description', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Контакты</h3>
                    <div className="space-y-4">
                      <div>
                        <Label>Телефон</Label>
                        <Input
                          value={siteSettings.contact?.phone || ''}
                          onChange={(e) => {
                            const newSettings = { ...siteSettings };
                            if (!newSettings.contact) newSettings.contact = {};
                            newSettings.contact.phone = e.target.value;
                            setSiteSettings(newSettings);
                          }}
                          onBlur={(e) => updateSiteSetting('contact', 'phone', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input
                          value={siteSettings.contact?.email || ''}
                          onChange={(e) => {
                            const newSettings = { ...siteSettings };
                            if (!newSettings.contact) newSettings.contact = {};
                            newSettings.contact.email = e.target.value;
                            setSiteSettings(newSettings);
                          }}
                          onBlur={(e) => updateSiteSetting('contact', 'email', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Settings */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Настройки оплаты</h3>
                    <div className="space-y-4">
                      <div>
                        <Label>Ссылка Ю.Мани</Label>
                        <Input
                          value={siteSettings.payment?.yoomoney_link || ''}
                          onChange={(e) => {
                            const newSettings = { ...siteSettings };
                            if (!newSettings.payment) newSettings.payment = {};
                            newSettings.payment.yoomoney_link = e.target.value;
                            setSiteSettings(newSettings);
                          }}
                          onBlur={(e) => updateSiteSetting('payment', 'yoomoney_link', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>USDT адрес</Label>
                        <Input
                          value={siteSettings.payment?.usdt_address || ''}
                          onChange={(e) => {
                            const newSettings = { ...siteSettings };
                            if (!newSettings.payment) newSettings.payment = {};
                            newSettings.payment.usdt_address = e.target.value;
                            setSiteSettings(newSettings);
                          }}
                          onBlur={(e) => updateSiteSetting('payment', 'usdt_address', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'orders' && (
              <Card>
                <CardHeader>
                  <CardTitle>Управление заказами</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{order.service}</h4>
                            <p className="text-gray-600">{order.name}</p>
                            <p className="text-sm text-gray-500">{order.email}</p>
                            <p className="text-sm">Цена: ${order.price}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant={order.status === 'completed' ? 'default' : 'outline'}
                              onClick={() => {
                                // Update order status logic here
                              }}
                            >
                              {order.status}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'payments' && (
              <Card>
                <CardHeader>
                  <CardTitle>Управление платежами</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {payments.map((payment) => (
                      <div key={payment.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{payment.orders?.service}</h4>
                            <p className="text-gray-600">Клиент: {payment.orders?.name}</p>
                            <p className="text-sm">Сумма: {payment.amount} {payment.currency}</p>
                            <p className="text-sm">Способ: {payment.payment_method}</p>
                            {payment.transaction_hash && (
                              <p className="text-xs font-mono break-all">
                                Hash: {payment.transaction_hash}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updatePaymentStatus(payment.id, 'confirmed')}
                              disabled={payment.status === 'confirmed'}
                            >
                              Подтвердить
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => updatePaymentStatus(payment.id, 'failed')}
                              disabled={payment.status === 'failed'}
                            >
                              Отклонить
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'users' && (
              <Card>
                <CardHeader>
                  <CardTitle>Пользователи</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div key={user.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold">
                              {user.first_name} {user.last_name}
                            </h4>
                            <p className="text-gray-600">{user.email}</p>
                            {user.wallet_address && (
                              <p className="text-xs font-mono">
                                {user.wallet_address.slice(0, 6)}...{user.wallet_address.slice(-4)}
                              </p>
                            )}
                          </div>
                          <div>
                            {user.is_admin && (
                              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                Админ
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'admins' && (
              <Card>
                <CardHeader>
                  <CardTitle>Управление администраторами</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4">Назначить нового администратора</h4>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Email пользователя"
                          value={newAdminEmail}
                          onChange={(e) => setNewAdminEmail(e.target.value)}
                        />
                        <Button onClick={makeAdmin}>
                          Назначить
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Текущие администраторы</h4>
                      <div className="space-y-2">
                        {users.filter(user => user.is_admin).map((admin) => (
                          <div key={admin.id} className="flex justify-between items-center p-3 border rounded">
                            <div>
                              <p className="font-medium">{admin.first_name} {admin.last_name}</p>
                              <p className="text-sm text-gray-600">{admin.email}</p>
                            </div>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              Администратор
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;