import React from 'react';
import { LayoutDashboard, Dumbbell, Utensils, BookOpen, Award, ShieldCheck, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { UserRole } from '../types';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  userRole: UserRole | null;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, userRole }) => {
  if (!userRole) return null;

  return (
    <nav className="fixed bottom-8 left-6 right-6 h-20 glass p-2 flex justify-between items-center z-50">
      {userRole === 'user' ? (
        [
          { id: 'dash', icon: LayoutDashboard, label: 'Dash' },
          { id: 'workout', icon: Dumbbell, label: 'Workouts' },
          { id: 'diet', icon: Utensils, label: 'Diet' },
          { id: 'equip', icon: BookOpen, label: 'Equip' },
          { id: 'shop', icon: Award, label: 'Store' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-1.5 h-full rounded-xl transition-all relative",
              activeTab === item.id ? "text-power-orange" : "text-charcoal/30 hover:text-charcoal/50"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
            {activeTab === item.id && (
              <motion.div 
                layoutId="nav-glow" 
                className="absolute inset-0 bg-power-orange/5 rounded-xl border border-power-orange/10 shadow-inner"
              />
            )}
          </button>
        ))
      ) : userRole === 'admin' ? (
        <button
          onClick={() => setActiveTab('admin')}
          className={cn(
            "flex-1 flex flex-col items-center justify-center gap-1.5 h-full rounded-xl transition-all relative text-power-orange",
            activeTab === 'admin' ? "bg-power-orange/5" : ""
          )}
        >
          <ShieldCheck className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Admin Dashboard</span>
        </button>
      ) : (
        <button
          onClick={() => setActiveTab('coach')}
          className={cn(
            "flex-1 flex flex-col items-center justify-center gap-1.5 h-full rounded-xl transition-all relative text-power-orange",
            activeTab === 'coach' ? "bg-power-orange/5" : ""
          )}
        >
          <UserCheck className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Coach Portal</span>
        </button>
      )}
    </nav>
  );
};

export default Navigation;
