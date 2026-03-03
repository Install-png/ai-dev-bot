javascript
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { HomeIcon, ChartBarIcon, MapIcon, WrenchScrewdriverIcon, ShieldCheckIcon, ArchiveBoxIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Головна', href: '/', icon: HomeIcon },
  { name: 'Аналітика', href: '/analytics', icon: ChartBarIcon },
  { name: 'Оцінка збитків', href: '/damage-assessment', icon: WrenchScrewdriverIcon },
  { name: 'Управління силами', href: '/force-management', icon: ShieldCheckIcon },
  { name: 'Архів подій', href: '/archive', icon: ArchiveBoxIcon },
  { name: 'AI-помічник', href: '/ai-assistant', icon: QuestionMarkCircleIcon },
];

const Sidebar = () => {
  const router = useRouter();

  return (
    <motion.aside
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-64 bg-secondary border-r border-primary flex flex-col p-4 shadow-xl"
    >
      <nav className="flex-1 mt-4">
        <ul>
          {navItems.map((item) => (
            <motion.li
              key={item.name}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(0, 191, 255, 0.2)' }}
              whileTap={{ scale: 0.98 }}
              className="mb-2"
            >
              <Link href={item.href} className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                  router.pathname === item.href ? 'bg-accent text-primary font-semibold' : 'text-textDark hover:text-textLight hover:bg-primary'
                }`}
              >
                <item.icon className="h-6 w-6 mr-3" />
                <span className="text-lg">{item.name}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;