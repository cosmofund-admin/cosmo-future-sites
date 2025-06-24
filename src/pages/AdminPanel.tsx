import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash, Users, FileText, Briefcase, Settings, Search, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { generateArticles, searchArticles } from '../utils/articleGenerator';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('articles');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedLanguage, setSelectedLanguage] = useState('ru');
  const { t, currentLanguage } = useLanguage();

  const categories = ['Все', 'SEO', 'Дизайн', 'Разработка', 'Маркетинг', 'Производительность'];
  const languages = ['ru', 'en', 'es', 'pt', 'fr', 'de', 'it', 'ja', 'ko', 'zh'];
  
  const articles = searchArticles(searchTerm, selectedCategory, selectedLanguage).slice(0, 20);

  const cases = [
    { id: 1, title: 'Интернет-магазин одежды', client: 'Fashion Store', status: 'Завершен' },
    { id: 2, title: 'Корпоративный сайт', client: 'IT Company', status: 'В работе' }
  ];

  const users = [
    { id: 1, name: 'Иван Петров', email: 'ivan@email.com', role: 'Клиент' },
    { id: 2, name: 'Анна Смирнова', email: 'anna@email.com', role: 'Админ' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">CosmoLab Admin</Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">Личный кабинет</Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Панель администратора</h1>

        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('articles')}
                className={`px-6 py-3 font-medium ${activeTab === 'articles' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              >
                <FileText className="w-5 h-5 inline mr-2" />
                Статьи блога ({generateArticles(selectedLanguage).length})
              </button>
              <button
                onClick={() => setActiveTab('cases')}
                className={`px-6 py-3 font-medium ${activeTab === 'cases' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              >
                <Briefcase className="w-5 h-5 inline mr-2" />
                Кейсы
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-6 py-3 font-medium ${activeTab === 'users' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              >
                <Users className="w-5 h-5 inline mr-2" />
                Пользователи
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-6 py-3 font-medium ${activeTab === 'settings' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              >
                <Settings className="w-5 h-5 inline mr-2" />
                Настройки
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'articles' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Управление статьями</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить статью
                  </button>
                </div>

                {/* Фильтры для статей */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Поиск статей..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>

                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {languages.map(lang => (
                        <option key={lang} value={lang}>
                          {lang.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left">ID</th>
                        <th className="px-4 py-3 text-left">Название</th>
                        <th className="px-4 py-3 text-left">Категория</th>
                        <th className="px-4 py-3 text-left">Автор</th>
                        <th className="px-4 py-3 text-left">Язык</th>
                        <th className="px-4 py-3 text-left">Дата</th>
                        <th className="px-4 py-3 text-left">Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.map((article) => (
                        <tr key={article.id} className="border-t hover:bg-gray-50">
                          <td className="px-4 py-3 font-mono text-sm">{article.id}</td>
                          <td className="px-4 py-3 max-w-xs truncate" title={article.title}>
                            {article.title}
                          </td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                              {article.category}
                            </span>
                          </td>
                          <td className="px-4 py-3">{article.author}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 rounded bg-gray-100 text-xs font-mono">
                              {article.language.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">{article.date}</td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800 transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-800 transition-colors">
                                <Trash className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 text-sm text-gray-500 text-center">
                  Показано {articles.length} из {generateArticles(selectedLanguage).length} статей
                </div>
              </div>
            )}

            {activeTab === 'cases' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Управление кейсами</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить кейс
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left">Название</th>
                        <th className="px-4 py-3 text-left">Клиент</th>
                        <th className="px-4 py-3 text-left">Статус</th>
                        <th className="px-4 py-3 text-left">Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cases.map((case_) => (
                        <tr key={case_.id} className="border-t">
                          <td className="px-4 py-3">{case_.title}</td>
                          <td className="px-4 py-3">{case_.client}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${case_.status === 'Завершен' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                              {case_.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-800">
                                <Trash className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Управление пользователями</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left">Имя</th>
                        <th className="px-4 py-3 text-left">Email</th>
                        <th className="px-4 py-3 text-left">Роль</th>
                        <th className="px-4 py-3 text-left">Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-t">
                          <td className="px-4 py-3">{user.name}</td>
                          <td className="px-4 py-3">{user.email}</td>
                          <td className="px-4 py-3">{user.role}</td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-800">
                                <Trash className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Настройки сайта</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Название сайта</label>
                    <input type="text" defaultValue="CosmoLab" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Описание сайта</label>
                    <textarea defaultValue="Создаем сайты за 24 часа" className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows={3}></textarea>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">Сохранить</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
