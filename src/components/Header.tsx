import React from 'react';
import { Sun, Moon, LogOut } from 'lucide-react';
import { UserRole } from '../types';

interface HeaderProps {
  isAdmin: boolean;
  currentRole: UserRole | null;
  toggleTheme: () => void;
  isDarkMode: boolean;
  onLogout: () => void;
  points: number;
}

const Header: React.FC<HeaderProps> = ({ currentRole, toggleTheme, isDarkMode, onLogout, points }) => {
  return (
    <header className="glass p-4 mb-6 flex justify-between items-center z-10 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-power-orange to-amber-600 flex items-center justify-center text-sm font-black border border-white/20 text-[#1a1a1a] shadow-inner">
          {currentRole === 'admin' ? 'AD' : currentRole === 'coach' ? 'CH' : 'MP'}
        </div>
        <div className="hidden sm:block">
          <div className="font-semibold text-sm capitalize">{currentRole} View</div>
          <div className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Muscle Power Workout</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={toggleTheme}
          className="p-2 glass !rounded-full text-power-orange hover:scale-110 active:scale-95 transition-transform"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        
        {currentRole === 'user' && (
          <div className="badge-amber flex items-center gap-2">
            <span>⭐</span>
            <span>{points} PTS</span>
          </div>
        )}

        <button 
          onClick={onLogout}
          className="p-2 glass !rounded-full text-aura-red hover:scale-110 active:scale-95 transition-transform"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default Header;
