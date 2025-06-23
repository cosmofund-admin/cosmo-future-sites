
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, FileText, Briefcase, Settings, LogOut } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const myProjects = [
    { id: 1, title: 'Мой интернет-магазин', status: 'В разработке', progress: 75 },
    { id: 2, title: 'Корпоративный сайт', status: 'Завершен', progress: 100 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">CosmoLab</Link>
            <div className="flex items-center space-x-4">
              <Link to="/admin" className="text-gray-600 hover:text-blue-600">Админ панель</Link>
              <button className="flex items-center text-gray-600 hover:text-blue-600">
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
                <h3 className="text-lg font-semibold">Иван Петров</h3>
                <p className="text-gray-600">ivan@email.com</p>
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
                      <input type="text" defaultValue="Иван" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Фамилия</label>
                      <input type="text" defaultValue="Петров" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input type="email" defaultValue="ivan@email.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                      <input type="tel" defaultValue="+7 999 123-45-67" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                  </div>
                  <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg">Сохранить</button>
                </div>
              )}

              {activeTab === 'projects' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Мои проекты</h2>
                  <div className="space-y-4">
                    {myProjects.map((project) => (
                      <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-medium">{project.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs ${project.status === 'Завершен' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                            {project.status}
                          </span>
                        </div>
                        <div className="mb-3">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Прогресс</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm">Подробнее</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">История заказов</h2>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium">Заказ #001</h3>
                          <p className="text-gray-600">Лендинг страница</p>
                          <p className="text-sm text-gray-500">15 января 2024</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">25 000 ₽</p>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Оплачен</span>
                        </div>
                      </div>
                    </div>
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
