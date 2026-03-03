javascript
import React from 'react';
import { motion } from 'framer-motion';

const GlassmorphismCard = ({ children, className = '', ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg text-textLight ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassmorphismCard;