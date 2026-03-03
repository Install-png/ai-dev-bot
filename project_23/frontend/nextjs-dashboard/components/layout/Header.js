javascript
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { ArrowPathIcon, DocumentTextIcon, Cog6ToothIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import ThreatLevelIndicator from '../ui/ThreatLevelIndicator';

const Header = ({ threatLevel, lastUpdate, onRefresh }) => {
  const router = useRouter();

  const handleExport = () => {
    alert('Експорт звіту до PDF...');
    // Implement actual PDF export logic here
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-primary border-b border-secondary p-4 flex items-center justify-between shadow-xl z-10 sticky top-0"
    >
      <div className="flex items-center">
        <Image src="/mvs_logo.svg" alt="МВС України Лого" width={40} height={40} className="mr-3" />
        <h1 className="text-xl font-bold text-textLight">Ситуаційний центр МВС України</h1>
      </div>

      <div className="flex items-center space-x-6">
        <ThreatLevelIndicator level={threatLevel} />

        <div className="text-textDark text-sm">
          Оновлено: {lastUpdate}
        </div>

        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onRefresh}
            className="p-2 rounded-full bg-secondary hover:bg-accent text-textLight transition-colors duration-200"
            title="Оновити дані"
          >
            <ArrowPathIcon className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleExport}
            className="p-2 rounded-full bg-secondary hover:bg-accent text-textLight transition-colors duration-200"
            title="Експорт звіту (PDF)"
          >
            <DocumentTextIcon className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.push('/settings')}
            className="p-2 rounded-full bg-secondary hover:bg-accent text-textLight transition-colors duration-200"
            title="Налаштування"
          >
            <Cog6ToothIcon className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.push('/profile')}
            className="p-2 rounded-full bg-secondary hover:bg-accent text-textLight transition-colors duration-200"
            title="Профіль"
          >
            <UserCircleIcon className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;