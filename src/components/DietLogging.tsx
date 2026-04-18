import React from 'react';
import { motion } from 'motion/react';
import { Utensils } from 'lucide-react';
import { UserState } from '../types';

interface DietLoggingProps {
  userState: UserState;
}

const DietLogging: React.FC<DietLoggingProps> = ({ userState }) => {
  return (
    <motion.div
      key="diet"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6 px-4"
    >
      <div className="glass p-4 border-aura-amber/20 bg-aura-amber/5 text-center">
        <p className="text-xs font-bold text-aura-gold uppercase tracking-widest mb-1">Coach's Directive</p>
        <p className="text-sm font-medium opacity-80 italic">"Please follow the diet plan exactly as instructed by your coach."</p>
      </div>

      <div className="glass p-6">
        <h3 className="section-title">NUTRITION LOG</h3>
        <div className="space-y-4">
          {userState.meals.length > 0 ? (
            userState.meals.map(meal => (
              <div key={meal.id} className="bg-aura-gold/5 p-4 rounded-2xl border border-aura-gold/5">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-sm tracking-tight">{meal.name}</span>
                  <span className="text-xs opacity-40 font-bold">{meal.time}</span>
                </div>
                <div className="flex gap-4 text-[10px] font-bold uppercase tracking-tight">
                  <span className="text-aura-gold">{meal.calories} kcal</span>
                  <span className="opacity-40">P: {meal.protein}g</span>
                  <span className="opacity-40">C: {meal.carbs}g</span>
                  <span className="opacity-40">F: {meal.fats}g</span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 bg-aura-gold/10 rounded-full flex items-center justify-center mx-auto text-aura-gold">
                <Utensils className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <p className="text-sm opacity-60">No meals logged for today.</p>
                <p className="text-xs font-serif italic text-aura-gold px-4">
                  "Treat your body like temple and your body will treat you like God"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DietLogging;
