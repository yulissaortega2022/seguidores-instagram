import React, { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  Instagram, 
  Target, 
  Users, 
  Clock, 
  BarChart3, 
  Hash, 
  MessageCircle,
  Sparkles,
  Settings,
  Calendar,
  Bell,
  TrendingUp,
  Shield,
  FileBarChart,
  AlertTriangle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MetricCard {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
}

interface Alert {
  type: 'success' | 'warning' | 'info';
  message: string;
  time: string;
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const metrics: MetricCard[] = [
    { title: 'Seguidores', value: '1,234', icon: <Users className="w-6 h-6" />, trend: '+12% esta semana' },
    { title: 'Engagement Rate', value: '4.8%', icon: <MessageCircle className="w-6 h-6" />, trend: '+0.5% vs ayer' },
    { title: 'Alcance Diario', value: '2,567', icon: <Target className="w-6 h-6" />, trend: '+23% esta semana' },
    { title: 'Conversiones', value: '23', icon: <Sparkles className="w-6 h-6" />, trend: '+5 hoy' },
  ];

  const growthData = [
    { name: 'Lun', seguidores: 1150, engagement: 4.2 },
    { name: 'Mar', seguidores: 1180, engagement: 4.5 },
    { name: 'Mie', seguidores: 1210, engagement: 4.3 },
    { name: 'Jue', seguidores: 1234, engagement: 4.8 },
  ];

  const alerts: Alert[] = [
    { type: 'success', message: '¡Alcanzados 1,200 seguidores!', time: '2h atrás' },
    { type: 'warning', message: 'Límite de likes por hora cerca del máximo', time: '30m atrás' },
    { type: 'info', message: 'Mejor momento para publicar: Próxima hora', time: '5m atrás' },
  ];

  const hashtagCategories = [
    {
      title: 'Locales Chilenos',
      tags: ['#Santiago', '#PerrosChile', '#MascotasChile', '#ChilePerros', '#SantiagoMascotas']
    },
    {
      title: 'Nicho de Mascotas',
      tags: ['#PerrosFelix', '#DogLovers', '#PerrosConEstilo', '#AmantesDePerros', '#PerrosChic']
    },
    {
      title: 'Moda Canina',
      tags: ['#ModaPerruna', '#DogFashion', '#RopaParaPerros', '#EstiloCanino', '#PerrosConRopa']
    },
    {
      title: 'Tendencias',
      tags: ['#PetInfluencer', '#DogStyle', '#PetFashion', '#PerrosFelices', '#DogLife']
    }
  ];

  const contentSchedule = [
    { day: 'Lunes', content: ['Reel: Tips de moda', 'Stories: Behind the scenes'] },
    { day: 'Martes', content: ['Post: Nuevo producto', 'Carrusel: Guía de medidas'] },
    { day: 'Miércoles', content: ['Reel: Cliente feliz', 'Stories: Q&A'] },
    { day: 'Jueves', content: ['Post: Promoción', 'Stories: Encuesta'] },
    { day: 'Viernes', content: ['Reel: Tutorial', 'Post: User Generated'] },
    { day: 'Sábado', content: ['Carrusel: Lookbook', 'Stories: Evento'] },
    { day: 'Domingo', content: ['Post: Motivacional', 'Stories: Resumen semanal'] },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Instagram className="w-8 h-8 text-pink-600" />
              <h1 className="text-2xl font-bold text-gray-900">Crecimiento Instagram</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-pink-600 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Settings className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-pink-600" />
            Alertas y Notificaciones
          </h2>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-lg border ${
                alert.type === 'success' ? 'bg-green-50 border-green-200' :
                alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex justify-between items-center">
                  <span className={`font-medium ${
                    alert.type === 'success' ? 'text-green-800' :
                    alert.type === 'warning' ? 'text-yellow-800' :
                    'text-blue-800'
                  }`}>{alert.message}</span>
                  <span className="text-sm text-gray-500">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                </div>
                <div className="text-pink-600">
                  {metric.icon}
                </div>
              </div>
              {metric.trend && (
                <p className="text-sm text-green-600">{metric.trend}</p>
              )}
            </div>
          ))}
        </div>

        {/* Growth Chart */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-pink-600" />
              Crecimiento y Engagement
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="seguidores" stroke="#EC4899" />
                  <Line yAxisId="right" type="monotone" dataKey="engagement" stroke="#8B5CF6" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Content Calendar */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-pink-600" />
              Calendario de Contenido
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
              {contentSchedule.map((day, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">{day.day}</h3>
                  <ul className="space-y-2">
                    {day.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-gray-600">• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hashtags Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Hash className="w-5 h-5 mr-2 text-pink-600" />
              Hashtags Estratégicos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {hashtagCategories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-medium text-gray-700">{category.title}</h3>
                  <div className="space-y-2">
                    {category.tags.map((tag, tagIndex) => (
                      <div key={tagIndex} className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-sm inline-block mr-2">
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Best Times Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-pink-600" />
              Mejores Horarios (GMT-3 Chile)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700">Lunes a Viernes</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• 9:00 - 10:00</li>
                  <li>• 13:00 - 14:00</li>
                  <li>• 19:00 - 21:00</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700">Sábado</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• 11:00 - 13:00</li>
                  <li>• 16:00 - 18:00</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700">Domingo</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• 12:00 - 14:00</li>
                  <li>• 17:00 - 19:00</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Limits */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-pink-600" />
              Límites de Interacción Diaria
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Interacciones Orgánicas</span>
                <span className="text-gray-900 font-medium">150-200</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Likes por Hora</span>
                <span className="text-gray-900 font-medium">60 máximo</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Comentarios por Hora</span>
                <span className="text-gray-900 font-medium">5 máximo</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Reels Diarios</span>
                <span className="text-gray-900 font-medium">8 máximo</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Stories</span>
                <span className="text-gray-900 font-medium">2 (con 2h separación)</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;