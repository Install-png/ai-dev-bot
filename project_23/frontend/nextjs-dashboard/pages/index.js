javascript
import React from 'react';
import { motion } from 'framer-motion';
import LiveKPIS from '../components/dashboard/LiveKPIS';
import EventMap from '../components/dashboard/EventMap';
import LiveEventFeed from '../components/dashboard/LiveEventFeed';
import EventDynamicsChart from '../components/analytics/EventDynamicsChart';

const DashboardOverview = () => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-3xl font-bold text-textLight mb-6">Головний Дашборд</h2>

      <LiveKPIS />

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 flex-1">
        <div className="lg:col-span-2 xl:col-span-3">
          <EventMap />
        </div>
        <div className="lg:col-span-1 xl:col-span-1 flex flex-col space-y-6">
          <LiveEventFeed />
          <EventDynamicsChart timeframe="доба" /> {/* Example chart */}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;