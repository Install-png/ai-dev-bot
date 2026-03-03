javascript
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassmorphismCard from '../components/ui/GlassmorphismCard';
import EventDynamicsChart from '../components/analytics/EventDynamicsChart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

const AnalyticsPage = () => {
  const [timeframe, setTimeframe] = useState('доба'); // 'доба', 'тиждень', 'місяць'

  // Mock data for other charts
  const regionalData = [
    { name: 'Київська', events: 120, threats: 35 },
    { name: 'Львівська', events: 90, threats: 20 },
    { name: 'Одеська', events: 80, threats: 25 },
    { name: 'Харківська', events: 70, threats: 15 },
    { name: 'Дніпропетровська', events: 60, threats: 10 },
    { name: 'Інші', events: 150, threats: 30 },
  ];

  const threatLevelData = [
    { name: 'Низький', value: 60 },
    { name: 'Середній', value: 30 },
    { name: 'Високий', value: 10 },
  ];
  const PIE_COLORS = ['#10B981', '#FBBF24', '#DC2626']; // Success, Warning, Danger

  const forecastData = [
    { name: 'День 1', events: 250, forecast: 260 },
    { name: 'День 2', events: 230, forecast: 245 },
    { name: 'День 3', events: 270, forecast: 280 },
    { name: 'День 4', events: 260, forecast: 270 },
    { name: 'День 5', events: 290, forecast: 300 },
    { name: 'День 6', events: 280, forecast: 295 },
    { name: 'День 7', events: 310, forecast: 320 },
  ];


  const handleTimeframeChange = (e) => {
    setTimeframe(e.target.value);
    // In a real app, this would trigger a data fetch for charts
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-3xl font-bold text-textLight mb-6">Модуль Аналітики</h2>

      <div className="mb-6 flex items-center space-x-4">
        <label htmlFor="timeframe-select" className="text-textLight text-lg">Період:</label>
        <select
          id="timeframe-select"
          value={timeframe}
          onChange={handleTimeframeChange}
          className="bg-primary border border-secondary text-textLight rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-accent"
        >
          <option value="доба">Доба</option>
          <option value="тиждень">Тиждень</option>
          <option value="місяць">Місяць</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
        <EventDynamicsChart timeframe={timeframe} />

        <GlassmorphismCard className="p-4 flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Теплова карта регіонів (події)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="name" stroke="#BFDBFE" />
              <YAxis stroke="#BFDBFE" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1A3A5B', border: 'none', borderRadius: '8px' }}
                itemStyle={{ color: '#E0E7FF' }}
                labelStyle={{ color: '#00BFFF' }}
              />
              <Legend wrapperStyle={{ color: '#E0E7FF' }} />
              <Bar dataKey="events" fill="#00BFFF" name="Кількість подій" />
              <Bar dataKey="threats" fill="#FBBF24" name="Рівень загроз" />
            </BarChart>
          </ResponsiveContainer>
        </GlassmorphismCard>

        <GlassmorphismCard className="p-4 flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Рівень загроз</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={threatLevelData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {threatLevelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1A3A5B', border: 'none', borderRadius: '8px' }}
                itemStyle={{ color: '#E0E7FF' }}
                labelStyle={{ color: '#00BFFF' }}
              />
              <Legend wrapperStyle={{ color: '#E0E7FF' }} />
            </PieChart>
          </ResponsiveContainer>
        </GlassmorphismCard>

        <GlassmorphismCard className="p-4 flex flex-col lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Прогнозування кількості подій (7 днів)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={forecastData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="name" stroke="#BFDBFE" />
              <YAxis stroke="#BFDBFE" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1A3A5B', border: 'none', borderRadius: '8px' }}
                itemStyle={{ color: '#E0E7FF' }}
                labelStyle={{ color: '#00BFFF' }}
              />
              <Legend wrapperStyle={{ color: '#E0E7FF' }} />
              <Line type="monotone" dataKey="events" stroke="#00BFFF" name="Фактичні події" strokeWidth={2} />
              <Line type="monotone" dataKey="forecast" stroke="#10B981" name="Прогноз" strokeDasharray="5 5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-textDark">
            <p><strong>AI-аналітика:</strong> Система прогнозує збільшення кримінальних подій на 5% наступного тижня.</p>
            <p><strong>Виявлення аномалій:</strong> Виявлено незвичайне зростання пожеж у східних регіонах, потрібна додаткова перевірка.</p>
          </div>
        </GlassmorphismCard>

        {/* Placeholder for Personnel Load or other charts */}
        <GlassmorphismCard className="p-4 flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Завантаженість особового складу</h3>
          <p className="text-center text-xl text-info mt-8">75% (висока)</p>
          <div className="w-full bg-primary rounded-full h-4 mt-4">
            <div
              className="bg-info h-4 rounded-full"
              style={{ width: '75%' }}
            ></div>
          </div>
          <p className="text-xs text-textDark mt-2">Рекомендовано перерозподіл ресурсів для зниження навантаження.</p>
        </GlassmorphismCard>

      </div>
    </div>
  );
};

export default AnalyticsPage;