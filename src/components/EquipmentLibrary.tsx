import React from 'react';
import { motion } from 'motion/react';
import { BookOpen } from 'lucide-react';
import { Equipment, UserState } from '../types';

interface EquipmentLibraryProps {
  userState: UserState;
  onLog: (id: string) => void;
  equipment: Equipment[];
}

const EquipmentLibrary: React.FC<EquipmentLibraryProps> = ({ userState, onLog, equipment }) => {
  return (
    <motion.div
      key="equip"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 px-4"
    >
      <h2 className="section-title px-2">EQUIPMENT LIBRARY</h2>
      {equipment.map(equip => (
        <div key={equip.id} className="glass p-6 space-y-4">
           <div className="flex justify-between items-start">
            <h3 className="font-bold tracking-tight">{equip.name}</h3>
            <span className="text-[9px] bg-power-orange/10 text-power-orange px-2 py-1 rounded font-black tracking-widest">{equip.difficulty}</span>
           </div>
           <p className="text-xs opacity-60 font-medium leading-relaxed">{equip.properUse}</p>
           <button 
            onClick={() => onLog(equip.id)}
            className="w-full py-2 bg-power-orange/5 border border-power-orange/10 rounded-xl text-[10px] font-bold uppercase opacity-60 hover:bg-power-orange hover:text-[#1a1a1a] transition-all duration-300"
           >
             {userState.completedEquipmentTasks.includes(equip.id) ? "TASK COMPLETE +50" : "LOG EQUIPMENT SAFETY"}
           </button>
        </div>
      ))}
    </motion.div>
  );
};

export default EquipmentLibrary;
