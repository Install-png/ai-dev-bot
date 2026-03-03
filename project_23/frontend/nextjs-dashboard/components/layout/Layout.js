javascript
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { SocketProvider } from '../../context/SocketContext';

const Layout = ({ children }) => {
  const [threatLevel, setThreatLevel] = useState('зелений'); // Example, fetch from API
  const [lastUpdate, setLastUpdate] = useState('');

  useEffect(() => {
    // Initial fetch or WebSocket connection for global data like threat level
    const updateTime = () => {
      setLastUpdate(new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000); // Update time every second
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    // Trigger data refresh across the dashboard
    console.log('Refreshing data...');
    setLastUpdate(new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    // Here you would typically re-fetch data for various components
  };

  return (
    <SocketProvider>
      <div className="flex h-screen bg-primary text-textLight">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header threatLevel={threatLevel} lastUpdate={lastUpdate} onRefresh={handleRefresh} />
          <main className="flex-1 p-6 overflow-y-auto custom-scrollbar">
            {children}
          </main>
        </div>
      </div>
    </SocketProvider>
  );
};

export default Layout;