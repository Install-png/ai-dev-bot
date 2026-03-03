javascript
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import GlassmorphismCard from '../ui/GlassmorphismCard';
import { motion } from 'framer-motion';

const data = [
  { name: '01.03', Кримінальні: 4000, Пожежі: 2400, Заворушення: 2400 },
  { name: '02.03', Кримінальні: 3000, Пожежі: 1398, Заворушення: 2210 },
  { name: '03.03', Кримінальні: 2000, Пожежі: 9800, Заворушення: 2290 },
  { name: '04.03', Кримінальні: 2780, Пожежі: 3908, Заворушення: 2000 },
  { name: '05.03', Кримінальні: 1890, Пожежі: 4800, Заворушення: 2181 },
  { name: '06.03', Кримінальні: 2390, Пожежі: 3800, Заворушення: 2500 },
  { name: '07.03', Кримінальні: 3490, Пожежі: 4300, Заворушення: 2100 },
];

const EventDynamicsChart = ({ timeframe = 'доба' }) => {
  // In a real app, `data` would be fetched based on `timeframe`
  return (
    <GlassmorphismCard className="p-4 flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Динаміка подій ({timeframe})</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
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
          <Line type="monotone" dataKey="Кримінальні" stroke="#FBBF24" activeDot={{ r: 8 }} strokeWidth={2} />
          <Line type="monotone" dataKey="Пожежі" stroke="#DC2626" activeDot={{ r: 8 }} strokeWidth={2} />
          <Line type="monotone" dataKey="Заворушення" stroke="#3B82F6" activeDot={{ r: 8 }} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </GlassmorphismCard>
  );
};

export default EventDynamicsChart;