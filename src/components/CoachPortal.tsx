import React from 'react';
import { motion } from 'motion/react';
import { UserAccount } from '../types';
import { cn } from '../lib/utils';

interface CoachPortalProps {
  trainees: UserAccount[];
}

const CoachPortal: React.FC<CoachPortalProps> = ({ trainees }) => {
  return (
    <motion.div
      key="coach"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 px-4"
    >
      <div className="glass p-6">
        <h3 className="section-title">MY TRAINEES</h3>
        <div className="space-y-4">
          {trainees.map(u => (
            <div key={u.id} className="glass !bg-white/5 p-4 space-y-3 border border-white/10">
              <div className="flex justify-between items-center">
                <div className="font-bold tracking-tight">{u.name}</div>
                <div className={cn("text-[8px] px-2 py-1 rounded-full font-black uppercase tracking-widest", u.isOnline ? "bg-aura-green/20 text-aura-green" : "bg-charcoal/10 text-charcoal/40")}>
                  {u.isOnline ? 'Online' : 'Offline'}
                </div>
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold uppercase text-charcoal/50">
                <span>Daily Goal</span>
                <span>85%</span>
              </div>
              <div className="w-full h-1.5 bg-charcoal/5 rounded-full overflow-hidden">
                <div className="h-full bg-aura-gold w-[85%]" />
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-aura-gold text-[#1a1a1a] rounded-lg text-[9px] font-black uppercase shadow-lg shadow-aura-gold/20 hover:scale-[1.02] transition-transform">Send Program</button>
                <button className="flex-1 py-2 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black uppercase hover:bg-white/10 transition-colors">Chat</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CoachPortal;
