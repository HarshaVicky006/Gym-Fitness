import React from 'react';
import { motion } from 'motion/react';
import { UserState } from '../types';

interface DashboardProps {
  userState: UserState;
}

const Dashboard: React.FC<DashboardProps> = ({ userState }) => {
  return (
    <motion.div
      key="dash"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6 px-4"
    >
      <div className="glass p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="section-title">DAILY NUTRITION</h3>
            <h2 className="text-3xl font-light tracking-tight">1,840 <span className="text-base opacity-40">/ 2,400 kcal</span></h2>
          </div>
          <button className="bg-power-orange text-[#1a1a1a] px-4 py-2 rounded-xl font-bold text-[10px] uppercase shadow-md active:scale-95 transition-transform">ADD MEAL</button>
        </div>
        
        <div className="w-32 h-32 mx-auto my-8 rounded-full border-8 border-power-orange/5 border-t-power-orange flex items-center justify-center text-3xl font-bold shadow-inner">
          76%
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4 text-center">
          <div className="bg-power-orange/5 p-4 rounded-2xl border border-power-orange/5">
            <div className="text-[10px] opacity-40 uppercase mb-1 font-bold">PROTEIN</div>
            <div className="text-xl font-bold text-power-orange">142g</div>
          </div>
          <div className="bg-power-orange/5 p-4 rounded-2xl border border-power-orange/5">
            <div className="text-[10px] opacity-40 uppercase mb-1 font-bold">CARBS</div>
            <div className="text-xl font-bold text-aura-red">185g</div>
          </div>
        </div>
      </div>

      <div className="glass p-6">
        <h3 className="section-title">RECENT LOGS</h3>
        <div className="space-y-2">
           {userState.meals.map(meal => (
             <div key={meal.id} className="bg-power-orange/5 p-3 rounded-xl border border-power-orange/5 flex justify-between items-center text-sm font-medium">
               <span className="opacity-80 tracking-tight">{meal.name}</span>
               <span className="opacity-40 font-bold">{meal.calories} kcal</span>
             </div>
           ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
