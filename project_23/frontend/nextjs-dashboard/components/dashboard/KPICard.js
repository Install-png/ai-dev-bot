javascript
import React from 'react';
import { motion } from 'framer-motion';
import GlassmorphismCard from '../ui/GlassmorphismCard';

const KPICard = ({ title, value, unit = '', icon: Icon, colorClass = 'text-accent' }) => {
  return (
    <GlassmorphismCard className="flex flex-col items-center justify-center p-4">
      {Icon && <Icon className={`h-10 w-10 mb-2 ${colorClass}`} />}
      <p className="text-lg font-medium text-textDark">{title}</p>
      <motion.div
        key={value} // Key for re-animating when value changes
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`text-4xl font-bold mt-1 ${colorClass}`}
      >
        {value}
        {unit && <span className="text-xl ml-1">{unit}</span>}
      </motion.div>
    </GlassmorphismCard>
  );
};

export default KPICard;