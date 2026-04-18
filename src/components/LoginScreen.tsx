import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, ShieldCheck, UserCheck, User as UserIcon } from 'lucide-react';
import { UserRole } from '../types';

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [loginStep, setLoginStep] = useState<UserRole | null>(null);
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const VALID_CREDENTIALS: Record<UserRole, { id: string, pass: string }> = {
    admin: { id: 'admin123', pass: 'adminpass' },
    coach: { id: 'coach123', pass: 'coachpass' },
    user: { id: 'user123', pass: 'userpass' }
  };

  const handleAuth = () => {
    if (!loginStep) return;
    const valid = VALID_CREDENTIALS[loginStep];
    if (credentials.id === valid.id && credentials.password === valid.pass) {
      onLogin(loginStep);
    } else {
      setError("Invalid ID or Password");
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative overflow-hidden px-8 py-12 justify-center items-center text-center">
      <div className="w-16 h-16 bg-power-orange rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-power-orange/20">
        <Activity className="w-8 h-8 text-[#1a1a1a]" />
      </div>
      <h1 className="text-2xl font-black tracking-tighter mb-1 uppercase">MUSCLE POWER WORKOUT</h1>

      <AnimatePresence mode="wait">
        {!loginStep ? (
          <motion.div
            key="role-select"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full space-y-3"
          >
            <p className="text-sm opacity-60 mb-8 font-medium">Select your role to continue</p>
            {[
              { id: 'admin', label: 'Admin', desc: 'System Management', icon: ShieldCheck },
              { id: 'coach', label: 'Coach', desc: 'Trainee Oversight', icon: UserCheck },
              { id: 'user', label: 'User', desc: 'Workout Tracking', icon: UserIcon },
            ].map(role => (
              <button
                key={role.id}
                onClick={() => setLoginStep(role.id as UserRole)}
                className="w-full glass p-4 flex items-center gap-4 hover:scale-[1.02] transition-transform text-left group"
              >
                <div className="w-10 h-10 bg-power-orange/10 rounded-xl flex items-center justify-center text-power-orange group-hover:bg-power-orange group-hover:text-white transition-colors">
                  <role.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm tracking-tight">{role.label}</div>
                  <div className="text-[9px] opacity-40 uppercase tracking-widest font-bold">{role.desc}</div>
                </div>
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="login-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full space-y-4"
          >
            <div className="flex items-center gap-2 mb-8">
              <button onClick={() => setLoginStep(null)} className="text-power-orange font-bold text-[10px] p-2 hover:bg-power-orange/5 rounded-lg uppercase tracking-wider">← BACK</button>
              <div className="h-4 w-px bg-charcoal/10 mx-2" />
              <span className="text-xs font-black uppercase tracking-widest opacity-60">Login as {loginStep}</span>
            </div>

            <div className="space-y-3">
              <div className="glass !rounded-2xl p-1 px-4 border-power-orange/20">
                <input
                  type="text"
                  placeholder="ID"
                  value={credentials.id}
                  onChange={(e) => setCredentials(prev => ({ ...prev, id: e.target.value }))}
                  className="w-full bg-transparent border-0 focus:ring-0 py-3 text-sm font-medium placeholder:text-charcoal/20"
                />
              </div>
              <div className="glass !rounded-2xl p-1 px-4 border-power-orange/20 text-left">
                <input
                  type="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full bg-transparent border-0 focus:ring-0 py-3 text-sm font-medium placeholder:text-charcoal/20"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-aura-red text-[10px] font-bold uppercase tracking-widest"
              >
                {error}
              </motion.div>
            )}

            <button
              onClick={handleAuth}
              className="w-full bg-power-orange text-[#1a1a1a] font-black uppercase tracking-widest py-4 rounded-2xl shadow-lg shadow-power-orange/20 active:scale-95 transition-transform"
            >
              LOGIN
            </button>

            <div className="p-4 bg-aura-amber/10 border border-aura-amber/20 rounded-xl text-[10px] text-aura-amber font-bold leading-relaxed">
              HINT: Use {loginStep}123 / {loginStep}pass
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginScreen;
