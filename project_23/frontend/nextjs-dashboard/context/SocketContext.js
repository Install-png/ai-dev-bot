javascript
import React, { createContext, useContext } from 'react';
import useWebSocket from '../hooks/useWebSocket';
import { API_BASE_URL, WS_BASE_URL } from '../lib/constants'; // Assuming constants file

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  // Use a relative path if WebSocket server is served from the same domain
  // For Docker/development, specify full URL
  const wsUrl = WS_BASE_URL || (typeof window !== 'undefined' ? `ws://${window.location.hostname}:8000/ws` : 'ws://localhost:8000/ws');
  const topic = '/topic/dashboard_updates'; // Backend broadcasts to this topic

  const { isConnected, lastMessage, lastJsonMessage, sendMessage } = useWebSocket(wsUrl, topic);

  return (
    <SocketContext.Provider value={{ isConnected, lastMessage, lastJsonMessage, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);