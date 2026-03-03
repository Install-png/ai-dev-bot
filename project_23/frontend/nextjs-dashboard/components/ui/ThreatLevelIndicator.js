javascript
import React from 'react';
import { motion } from 'framer-motion';

const getLevelClasses = (level) => {
  switch (level.toLowerCase()) {
    case 'зелений':
      return 'bg-success text-white shadow-success/50';
    case 'жовтий':
      return 'bg-warning text-primary shadow-warning/50';
    case 'червоний':
      return 'bg-danger text-white shadow-danger/50 animate-pulse-glow';
    default:
      return 'bg-gray-500 text-white shadow-gray-500/50';
  }
};

const ThreatLevelIndicator = ({ level = 'зелений' }) => {
  const levelClass = getLevelClasses(level);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center justify-center min-w-[120px] ${levelClass}`}
      style={{ boxShadow: `0 0 15px var(--tw-shadow-color)` }} // Tailwind doesn't support custom color for shadow-glow directly, needs inline style or custom plugin
    >
      <span className="mr-2 text-lg">⚠️</span>
      {level}
    </motion.div>
  );
};

export default ThreatLevelIndicator;