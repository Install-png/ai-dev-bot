javascript
import React, { useState, useEffect, useMemo, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion } from 'framer-motion';
import { SocketContext } from '../../context/SocketContext';
import GlassmorphismCard from '../ui/GlassmorphismCard';
import { PoliceCarIcon, FireTruckIcon, RiotShieldIcon, PassportIcon } from './MapIcons'; // Custom icons
import ReactDOMServer from 'react-dom/server';

// Fix for default Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
  iconUrl: 'leaflet/images/marker-icon.png',
  shadowUrl: 'leaflet/images/marker-shadow.png',
});

// Custom Icons for event types
const createCustomIcon = (iconComponent, color = 'blue') => {
  const svgString = ReactDOMServer.renderToStaticMarkup(iconComponent({ className: `text-${color}-500 w-6 h-6` }));
  return new L.DivIcon({
    className: 'custom-div-icon',
    html: `<div class="p-1 rounded-full bg-secondary shadow-lg border border-white/20 relative">${svgString}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });
};

const iconMap = {
  'Кримінальні': createCustomIcon(PoliceCarIcon, 'yellow'),
  'Пожежі': createCustomIcon(FireTruckIcon, 'red'),
  'Масові заворушення': createCustomIcon(RiotShieldIcon, 'orange'),
  'Міграційні інциденти': createCustomIcon(PassportIcon, 'purple'),
};


const EventMap = () => {
  const { lastJsonMessage } = useContext(SocketContext);
  const [events, setEvents] = useState([]);
  const [filterRegion, setFilterRegion] = useState('Всі регіони'); // Example filter

  useEffect(() => {
    // Simulate initial event load
    const initialEvents = [
      { id: 'e1', type: 'Пожежі', description: 'Пожежа у житловому будинку', lat: 49.842957, lng: 24.031111, region: 'Львівська область', status: 'Активна', personnel: 20 },
      { id: 'e2', type: 'Кримінальні', description: 'Збройне пограбування банку', lat: 50.4501, lng: 30.5234, region: 'Київська область', status: 'Розслідування', personnel: 15 },
      { id: 'e3', type: 'Масові заворушення', description: 'Протести біля адміністрації', lat: 46.4775, lng: 30.7326, region: 'Одеська область', status: 'Контролюється', personnel: 50 },
      { id: 'e4', type: 'Міграційні інциденти', description: 'Затримання нелегалів', lat: 48.3794, lng: 31.1656, region: 'Кіровоградська область', status: 'Вирішено', personnel: 5 },
      { id: 'e5', type: 'Пожежі', description: 'Лісова пожежа', lat: 48.9226, lng: 24.7111, region: 'Івано-Франківська область', status: 'Активна', personnel: 30 },
    ];
    setEvents(initialEvents);
  }, []);

  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.type === 'new_event') {
      setEvents((prevEvents) => [...prevEvents, lastJsonMessage.data]);
    } else if (lastJsonMessage && lastJsonMessage.type === 'event_update') {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === lastJsonMessage.data.id ? { ...event, ...lastJsonMessage.data } : event
        )
      );
    }
  }, [lastJsonMessage]);

  const regions = useMemo(() => {
    const uniqueRegions = new Set(events.map(e => e.region));
    return ['Всі регіони', ...Array.from(uniqueRegions)].sort();
  }, [events]);

  const filteredEvents = useMemo(() => {
    return filterRegion === 'Всі регіони'
      ? events
      : events.filter(event => event.region === filterRegion);
  }, [events, filterRegion]);

  // Map Component needs to be wrapped
  const MapWrapper = useMemo(() => (
    <MapContainer
      center={[49.0, 31.5]} // Center of Ukraine
      zoom={6}
      minZoom={5}
      maxZoom={12}
      className="h-full w-full rounded-xl"
      style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CartoDB</a>'
      />
      {filteredEvents.map((event) => (
        <Marker
          key={event.id}
          position={[event.lat, event.lng]}
          icon={iconMap[event.type] || createCustomIcon(MapPinIcon, 'blue')}
        >
          <Popup>
            <GlassmorphismCard className="p-4 bg-secondary/80 text-textLight border-none shadow-xl min-w-[250px]">
              <h3 className="font-bold text-lg mb-2">{event.type}</h3>
              <p className="text-sm">{event.description}</p>
              <p className="text-xs text-textDark mt-1">Регіон: {event.region}</p>
              <p className="text-xs text-textDark">Статус: <span className={
                event.status === 'Активна' ? 'text-danger' :
                event.status === 'Розслідування' ? 'text-warning' :
                event.status === 'Контролюється' ? 'text-info' : 'text-success'
              }>{event.status}</span></p>
              <p className="text-xs text-textDark">Задіяно: {event.personnel} ос.</p>
              <button
                onClick={() => alert(`Деталі події ${event.id}`)}
                className="mt-3 px-3 py-1 bg-accent text-primary rounded hover:bg-opacity-80 transition-colors duration-200 text-sm"
              >
                Детальніше
              </button>
            </GlassmorphismCard>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  ), [filteredEvents, filterRegion]); // Recreate map only if events or filter change

  return (
    <GlassmorphismCard className="col-span-2 row-span-2 p-0 flex flex-col overflow-hidden">
      <div className="p-4 pb-2 flex items-center justify-between border-b border-white/10">
        <h2 className="text-xl font-semibold">Інтерактивна карта України</h2>
        <select
          value={filterRegion}
          onChange={(e) => setFilterRegion(e.target.value)}
          className="bg-primary border border-secondary text-textLight rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-accent"
        >
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>
      <div className="flex-1 min-h-[500px]">
        {typeof window !== 'undefined' && MapWrapper}
      </div>
    </GlassmorphismCard>
  );
};

export default EventMap;

// Custom Map Icons (can be in a separate file like components/dashboard/MapIcons.js)
export const PoliceCarIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375M12 18.75a1.5 1.5 0 0 1 3 0m-3 0a1.5 1.5 0 0 0 3 0m-3 0h6m-6 0H9.375C6.512 18.75 4.78 17.604 4.78 17.604V14.25A3.375 3.375 0 0 1 10.125 10.875h3.75c1.114 0 2.071.49 2.693 1.25M2.25 10.5h11.75c.627 0 1.125-.572 1.125-1.25V6a2.25 2.25 0 0 0-2.25-2.25H4.5A2.25 2.25 0 0 0 2.25 6v3.25c0 .678.498 1.25 1.125 1.25Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6.75A.75.75 0 0 1 17.25 6h.008v.008H17.25a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 1 .75-.75h.008v.008H18a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 1 .75-.75h.008v.008H19.5a.75.75 0 0 1-.75-.75Z" />
  </svg>
);
export const FireTruckIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
); // Placeholder for fire truck icon, use a more specific one if available in Heroicons
export const RiotShieldIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.01-1.393 1.637-2.325 1.637-.282 0-.53-.016-.757-.037M21 12c0-1.01-1.393-1.637-2.325-1.637-.282 0-.53-.016-.757-.037m7.027 3.274a2.25 2.25 0 0 1-3.67 2.016M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM7.5 14.776V10.25h1.25a1.5 1.5 0 0 1 1.5 1.5v1.026a1.5 1.5 0 0 1-1.5 1.5H7.5Z" />
  </svg>
); // Placeholder for riot shield
export const PassportIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75A3.75 3.75 0 0 1 12.75 11.25h-1.5A3.75 3.75 0 0 1 7.5 7.5V6m12 0-3 3m0 0-3-3m3 3V3m6 18H3a2.25 2.25 0 0 1-2.25-2.25V5.25A2.25 2.25 0 0 1 3 3h15a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 18 21Z" />
  </svg>
);