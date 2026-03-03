javascript
import React, { useContext, useEffect, useState } from 'react';
import { UsersIcon, MapPinIcon, FireIcon, ShieldExclamationIcon, CurrencyEuroIcon, UserGroupIcon, HomeModernIcon } from '@heroicons/react/24/outline';
import KPICard from './KPICard';
import { motion } from 'framer-motion';
import { SocketContext } from '../../context/SocketContext';

const LiveKPIS = () => {
  const { lastJsonMessage } = useContext(SocketContext);
  const [kpiData, setKpiData] = useState({
    totalEvents: 0,
    activeEvents: 0,
    personnelInvolved: 0,
    equipmentInvolved: 0,
    estimatedDamages: 0,
    casualties: 0,
    evacuated: 0,
  });

  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.type === 'kpi_update') {
      setKpiData(prevData => ({ ...prevData, ...lastJsonMessage.data }));
    }
  }, [lastJsonMessage]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6 mt-6"
    >
      <KPICard title="Всього подій" value={kpiData.totalEvents} icon={MapPinIcon} colorClass="text-accent" />
      <KPICard title="Активні події" value={kpiData.activeEvents} icon={FireIcon} colorClass="text-danger" />
      <KPICard title="Особовий склад" value={kpiData.personnelInvolved} icon={UsersIcon} colorClass="text-info" />
      <KPICard title="Техніка" value={kpiData.equipmentInvolved} icon={ShieldExclamationIcon} colorClass="text-warning" />
      <KPICard title="Орієнт. збитки" value={kpiData.estimatedDamages.toLocaleString('uk-UA')} unit="грн" icon={CurrencyEuroIcon} colorClass="text-success" />
      <KPICard title="Постраждалі" value={kpiData.casualties} icon={UserGroupIcon} colorClass="text-danger" />
      <KPICard title="Евакуйовані" value={kpiData.evacuated} icon={HomeModernIcon} colorClass="text-info" />
    </motion.div>
  );
};

export default LiveKPIS;