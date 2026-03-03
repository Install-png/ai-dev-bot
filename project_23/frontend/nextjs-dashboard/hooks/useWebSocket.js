javascript
import { useState, useEffect, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const useWebSocket = (url, topic) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const [lastJsonMessage, setLastJsonMessage] = useState(null);
  const stompClient = useRef(null);
  const subscription = useRef(null);

  const connect = useCallback(() => {
    if (stompClient.current && stompClient.current.connected) {
      console.log('Already connected to WebSocket.');
      setIsConnected(true);
      return;
    }

    console.log(`Attempting to connect to WebSocket at ${url}...`);
    const socket = new SockJS(url);
    stompClient.current = Stomp.over(socket);
    stompClient.current.debug = null; // Disable STOMP debug logs

    stompClient.current.connect({}, (frame) => {
      console.log('Connected to WebSocket:', frame);
      setIsConnected(true);

      if (topic) {
        subscription.current = stompClient.current.subscribe(topic, (message) => {
          console.log('Received message:', message);
          setLastMessage(message.body);
          try {
            setLastJsonMessage(JSON.parse(message.body));
          } catch (e) {
            console.error('Failed to parse JSON message:', e);
            setLastJsonMessage(null);
          }
        }, { /* headers for subscription if needed */ });
        console.log(`Subscribed to topic: ${topic}`);
      }
    }, (error) => {
      console.error('WebSocket connection error:', error);
      setIsConnected(false);
      // Attempt to reconnect after a delay
      setTimeout(connect, 5000);
    });
  }, [url, topic]);

  const disconnect = useCallback(() => {
    if (subscription.current) {
      subscription.current.unsubscribe();
      console.log('Unsubscribed from topic.');
    }
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.disconnect(() => {
        console.log('Disconnected from WebSocket.');
        setIsConnected(false);
      });
    }
  }, []);

  const sendMessage = useCallback((destination, body, headers = {}) => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.send(destination, headers, body);
    } else {
      console.warn('Cannot send message: WebSocket not connected.');
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return { isConnected, lastMessage, lastJsonMessage, sendMessage, connect, disconnect };
};

export default useWebSocket;