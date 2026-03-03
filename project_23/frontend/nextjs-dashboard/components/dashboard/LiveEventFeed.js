javascript
import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassmorphismCard from '../ui/GlassmorphismCard';
import { SocketContext } from '../../context/SocketContext';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';

const eventTypeColors = {
  'Кримінальні': 'text-yellow-400',
  'Пожежі': 'text-red-500',
  'Масові заворушення': 'text-orange-400',
  'Міграційні інциденти': 'text-purple-400',
};

const LiveEventFeed = () => {
  const { lastJsonMessage } = useContext(SocketContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Simulate initial load of some recent events
    const initialFeed = [
      { id: 'f1', type: 'Кримінальні', message: 'Повідомлення про крадіжку, м. Київ', time: '10:00:15' },
      { id: 'f2', type: 'Пожежі', message: 'Виїзд на пожежу, м. Львів', time: '10:01:30' },
      { id: 'f3', type: 'Масові заворушення', message: 'Збір групи реагування, м. Одеса', time: '10:02:45' },
    ];
    setEvents(initialFeed);
  }, []);

  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.type === 'live_feed_event') {
      const newEvent = {
        id: lastJsonMessage.data.id,
        type: lastJsonMessage.data.type,
        message: lastJsonMessage.data.message,
        time: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      };
      setEvents((prevEvents) => [newEvent, ...prevEvents.slice(0, 9)]); // Keep last 10 events
    }
  }, [lastJsonMessage]);

  return (
    <GlassmorphismCard className="p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-4 border-b border-white/10 pb-2">
        <ChevronDoubleRightIcon className="inline-block h-5 w-5 mr-2 text-accent" />
        Live-стрічка подій
      </h2>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <AnimatePresence initial={false}>
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-start text-sm mb-3 last:mb-0 border-b border-white/5 pb-2 last:border-b-0"
            >
              <span className={`inline-block mr-2 font-bold ${eventTypeColors[event.type] || 'text-gray-400'}`}>
                [{event.time}]
              </span>
              <span className="flex-1">{event.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </GlassmorphismCard>
  );
};

export default LiveEventFeed;