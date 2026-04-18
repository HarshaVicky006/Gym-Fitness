import React from 'react';
import { motion } from 'motion/react';
import { UserAccount } from '../types';
import { cn } from '../lib/utils';

interface AdminDashboardProps {
  users: UserAccount[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ users }) => {
  return (
    <motion.div
      key="admin"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 px-4"
    >
      <div className="glass p-6">
        <h3 className="section-title text-power-orange">GYM MONITORING</h3>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-power-orange/5 p-4 rounded-2xl border border-power-orange/10">
            <div className="text-[10px] opacity-50 uppercase font-black tracking-widest mb-1">Users Online</div>
            <div className="text-2xl font-black text-power-orange">
              {users.filter(u => u.isOnline).length}
            </div>
          </div>
          <div className="bg-power-orange/5 p-4 rounded-2xl border border-power-orange/10">
            <div className="text-[10px] opacity-50 uppercase font-black tracking-widest mb-1">Total Check-ins</div>
            <div className="text-2xl font-black">128</div>
          </div>
        </div>

        <h3 className="section-title">ALL REGISTERED USERS</h3>
        <div className="space-y-3">
          {users.map(u => (
            <div key={u.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-power-orange flex items-center justify-center text-[10px] font-black text-[#1a1a1a]">
                  {u.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-sm font-bold tracking-tight">{u.name}</div>
                  <div className="text-[9px] opacity-40 uppercase font-black">{u.email}</div>
                </div>
              </div>
              <div className={cn("text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest", u.isOnline ? "bg-aura-green text-white" : "bg-charcoal/10 text-charcoal/40")}>
                {u.isOnline ? 'Online' : 'Offline'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
