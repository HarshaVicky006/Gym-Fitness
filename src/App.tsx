import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  ShieldCheck, 
  UserCheck, 
  User as UserIcon,
  LayoutDashboard,
  Dumbbell,
  Utensils,
  BookOpen,
  Award,
  LogOut,
  Sun,
  Moon,
  CheckCircle2,
  ArrowRight,
  Camera,
  CameraOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { 
  UserRole, 
  UserState, 
  Reward
} from './types';
import { MOCK_REWARDS, MOCK_CLASSES, MOCK_USERS, MOCK_EQUIPMENT } from './data/mockData';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Notification from './components/Notification';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import WorkoutTracking from './components/WorkoutTracking';
import DietLogging from './components/DietLogging';
import EquipmentLibrary from './components/EquipmentLibrary';
import Shop from './components/Shop';
import AdminDashboard from './components/AdminDashboard';
import CoachPortal from './components/CoachPortal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dash' | 'workout' | 'diet' | 'equip' | 'shop' | 'admin' | 'coach'>('dash');
  const [userRole, setUserRole] = useState<UserRole | null>(() => {
    const saved = localStorage.getItem('muscle_power_role');
    return (saved as UserRole) || null;
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [useCamera, setUseCamera] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  
  const [userState, setUserState] = useState<UserState>({
    points: 2450,
    level: 4,
    activeWorkouts: [
      {
        id: 'w1',
        date: new Date().toISOString(),
        title: 'Push Day - Hypertrophy',
        completed: false,
        exercises: [
          { id: 'ex1', name: 'Barbell Squat', category: 'Strength', sets: 4, reps: 12, weight: 60 },
          { id: 'ex2', name: 'Lat Pull-down', category: 'Strength', sets: 3, reps: 12, weight: 35 },
          { id: 'ex3', name: 'Bench Press', category: 'Strength', sets: 4, reps: 10, weight: 50 }
        ]
      }
    ],
    meals: [
      { id: 'm1', name: 'Grilled Salmon & Quinoa', calories: 480, protein: 42, carbs: 45, fats: 14, time: '13:00' },
      { id: 'm2', name: 'Post-Workout Shake', calories: 210, protein: 30, carbs: 10, fats: 5, time: '16:30' }
    ],
    completedEquipmentTasks: []
  });

  const [notifications, setNotifications] = useState<string[]>([]);
  const [loginStep, setLoginStep] = useState<UserRole | null>(null);
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [isResetMode, setIsResetMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const VALID_CREDENTIALS: Record<UserRole, { id: string, pass: string }> = {
    admin: { id: 'admin123', pass: 'adminpass' },
    coach: { id: 'coach123', pass: 'coachpass' },
    user: { id: 'user123', pass: 'userpass' }
  };

  const handleLogin = () => {
    if (!loginStep) return;
    const valid = VALID_CREDENTIALS[loginStep];
    if (credentials.id === valid.id && credentials.password === valid.pass) {
      setUserRole(loginStep);
      setLoginStep(null);
      setCredentials({ id: '', password: '' });
      addNotification(`Welcome back, ${loginStep}!`);
    } else {
      addNotification("Invalid ID or Password");
    }
  };

  const handlePasswordReset = () => {
    if (!loginStep) return;
    const oldPass = VALID_CREDENTIALS[loginStep].pass;
    
    // Alphanumeric + Special Character Regex
    const hasAlpha = /[a-zA-Z]/.test(newPassword);
    const hasNum = /[0-9]/.test(newPassword);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    
    if (newPassword === oldPass) {
      addNotification("New password cannot be the same as old password");
      return;
    }

    if (!hasAlpha || !hasNum || !hasSpecial || newPassword.length < 6) {
      addNotification("Password must be 6+ chars and contain letters, numbers, and special characters.");
      return;
    }

    // Update the local "database" of credentials for this session
    VALID_CREDENTIALS[loginStep].pass = newPassword;
    
    setIsResetMode(false);
    setNewPassword('');
    addNotification("Password reset successful! Please login.");
    playSound('success');
  };

  const playSound = (type: 'success' | 'points' | 'redeem') => {
    const urls = {
      success: 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3', // Win/Success
      points: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3',  // Ding
      redeem: 'https://assets.mixkit.co/active_storage/sfx/2010/2010-preview.mp3'   // Soft click/unlock
    };
    const audio = new Audio(urls[type]);
    audio.volume = 0.3;
    audio.play().catch(e => console.log("Audio play blocked", e));
  };

  const addNotification = (msg: string) => {
    setNotifications(prev => [...prev, msg]);
    setTimeout(() => setNotifications(prev => prev.slice(1)), 3000);
  };

  useEffect(() => {
    if (userRole) {
      localStorage.setItem('muscle_power_role', userRole);
      // Reset active tab for new roles
      if (userRole === 'admin') setActiveTab('admin');
      else if (userRole === 'coach') setActiveTab('coach');
      else setActiveTab('dash');
    } else {
      localStorage.removeItem('rodgold_role');
    }
  }, [userRole]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    let stream: MediaStream | null = null;
    
    async function startCamera() {
      if (useCamera && videoRef.current) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
          videoRef.current.srcObject = stream;
        } catch (err) {
          console.error("Camera access denied", err);
          setUseCamera(false);
        }
      }
    }

    if (useCamera) {
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [useCamera, activeTab]);

  const handleCompleteWorkout = (id: string) => {
    setUserState(prev => {
      const updatedWorkouts = prev.activeWorkouts.map(w => 
        w.id === id ? { ...w, completed: true } : w
      );
      const bonusPoints = useCamera ? 150 : 100;
      addNotification(`Workout complete! +${bonusPoints} Points`);
      if (useCamera) addNotification("Bonus: 50pts for Form Analysis!");
      
      playSound('success');
      setUseCamera(false);
      return {
        ...prev,
        activeWorkouts: updatedWorkouts,
        points: prev.points + bonusPoints
      };
    });
  };

  const handleLogEquipmentTask = (id: string) => {
    if (userState.completedEquipmentTasks.includes(id)) return;
    setUserState(prev => {
      addNotification("Equip task logged! +50 Points");
      playSound('points');
      return {
        ...prev,
        completedEquipmentTasks: [...prev.completedEquipmentTasks, id],
        points: prev.points + 50
      };
    });
  };

  const redeemReward = (reward: Reward) => {
    if (userState.points < reward.points) return;
    setUserState(prev => {
      addNotification(`Unlocked: ${reward.name}!`);
      playSound('redeem');
      return {
        ...prev,
        points: prev.points - reward.points
      };
    });
  };

  const logout = () => {
    setUserRole(null);
    localStorage.removeItem('muscle_power_role');
  };

  if (!userRole) {
    return (
      <div className="flex flex-col min-h-screen max-w-md mx-auto relative overflow-hidden px-8 py-12 justify-center items-center text-center">
        {loginStep && (
          <div className="absolute top-6 left-6 z-20">
            <button 
              onClick={() => { setLoginStep(null); setIsResetMode(false); }} 
              className="text-power-orange font-bold text-[10px] tracking-widest p-2 hover:bg-power-orange/5 rounded-lg flex items-center gap-2"
            >
              ← BACK
            </button>
          </div>
        )}
        <div className="w-16 h-16 bg-power-orange rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-power-orange/20">
          <Activity className="w-8 h-8 text-[#1a1a1a]" />
        </div>
        <h1 className="text-2xl font-black tracking-tighter mb-1 uppercase text-charcoal">Muscle Power Workout</h1>
        
        <AnimatePresence mode="wait">
          {!loginStep ? (
            <motion.div 
              key="role-select"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full space-y-3"
            >
              <p className="text-sm opacity-60 mb-8">Select your role to continue</p>
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
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black uppercase tracking-widest opacity-60">
                    {isResetMode ? `Reset ${loginStep} Password` : `Login as ${loginStep}`}
                  </span>
                </div>
                {!isResetMode && (
                  <button 
                    onClick={() => setIsResetMode(true)}
                    className="w-8 h-8 rounded-full glass flex items-center justify-center text-power-orange hover:bg-power-orange hover:text-[#1a1a1a] transition-colors"
                    title="Forgot Password?"
                  >
                    <span className="font-bold">?</span>
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {!isResetMode ? (
                  <>
                    <div className="glass !rounded-2xl p-1 px-4 border-power-orange/20">
                      <input 
                        type="text" 
                        placeholder="ID"
                        value={credentials.id}
                        onChange={(e) => setCredentials(prev => ({ ...prev, id: e.target.value }))}
                        className="w-full bg-transparent border-0 focus:ring-0 py-3 text-sm font-medium placeholder:text-charcoal/20"
                      />
                    </div>
                    <div className="glass !rounded-2xl p-1 px-4 border-power-orange/20">
                      <input 
                        type="password" 
                        placeholder="Password"
                        value={credentials.password}
                        onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                        className="w-full bg-transparent border-0 focus:ring-0 py-3 text-sm font-medium placeholder:text-charcoal/20"
                      />
                    </div>
                  </>
                ) : (
                  <div className="glass !rounded-2xl p-1 px-4 border-power-orange/20">
                    <input 
                      type="password" 
                      placeholder="New Secure Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-transparent border-0 focus:ring-0 py-3 text-sm font-medium placeholder:text-charcoal/20"
                    />
                  </div>
                )}
              </div>

              <button 
                onClick={isResetMode ? handlePasswordReset : handleLogin}
                className="w-full bg-power-orange text-[#1a1a1a] font-black uppercase tracking-widest py-4 rounded-2xl shadow-lg shadow-power-orange/20 active:scale-95 transition-transform"
              >
                {isResetMode ? 'RESET PASSWORD' : 'LOGIN'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative overflow-hidden px-4 py-8">
      {/* Header */}
      <header className="glass p-4 mb-6 flex justify-between items-center z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-power-orange to-orange-600 flex items-center justify-center text-sm font-black border border-white/20 text-[#1a1a1a] shadow-inner">
            {userRole === 'admin' ? 'AD' : userRole === 'coach' ? 'CH' : 'MP'}
          </div>
          <div className="hidden sm:block">
            <div className="font-semibold text-sm capitalize">{userRole} View</div>
            <div className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Muscle Power Workout</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 glass !rounded-full text-power-orange hover:scale-110 active:scale-95 transition-transform"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          {userRole === 'user' && (
            <div className="badge-amber flex items-center gap-2">
              <span>⭐</span>
              <span>{userState.points} PTS</span>
            </div>
          )}

          <button 
            onClick={logout}
            className="p-2 glass !rounded-full text-aura-red hover:scale-110 active:scale-95 transition-transform"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 z-10 overflow-y-auto space-y-6 scrollbar-hide">
        <AnimatePresence mode="wait">
          {activeTab === 'dash' && (
            <motion.div
              key="dash"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="space-y-6"
            >
              <div className="glass p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="section-title">DAILY NUTRITION</h3>
                    <h2 className="text-3xl font-light tracking-tight">1,840 <span className="text-base opacity-40">/ 2,400 kcal</span></h2>
                  </div>
                  <button className="bg-power-orange text-[#1a1a1a] px-4 py-2 rounded-xl font-bold text-[10px] uppercase shadow-md active:scale-95 transition-transform">ADD MEAL</button>
                </div>
                
                {/* Progress Ring Simulation */}
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
                     <div key={meal.id} className="bg-power-orange/5 p-3 rounded-xl border border-power-orange/5 flex justify-between items-center text-sm">
                       <span className="font-semibold opacity-80">{meal.name}</span>
                       <span className="opacity-40 font-medium">{meal.calories} kcal</span>
                     </div>
                   ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'workout' && (
            <motion.div
              key="workout"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {!userState.activeWorkouts[0].completed && (
                <div className="glass overflow-hidden relative group aspect-video bg-charcoal flex items-center justify-center">
                  {useCamera ? (
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      muted 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-6">
                      <Camera className="w-10 h-10 text-white/20 mx-auto mb-3" />
                      <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Enable AI Form Check</p>
                    </div>
                  )}
                  
                  <button 
                    onClick={() => setUseCamera(!useCamera)}
                    className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/20 hover:bg-white/40 transition-all z-20"
                  >
                    {useCamera ? <CameraOff className="w-5 h-5 text-white" /> : <Camera className="w-5 h-5 text-white" />}
                  </button>

                  <div className="absolute top-4 left-4 bg-power-orange/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-[#1a1a1a] uppercase tracking-tighter z-20">
                    Live Form Analysis
                  </div>
                </div>
              )}

              <div className="glass p-6 min-h-[400px] flex flex-col">
                <h3 className="section-title">CURRENT SESSION</h3>
                
                <div className="space-y-4">
                  {userState.activeWorkouts[0].exercises.map((ex, idx) => (
                    <div key={ex.id} className="bg-power-orange/5 p-4 rounded-2xl border border-power-orange/5">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-bold text-sm tracking-tight">{ex.name}</div>
                          <div className="text-[10px] opacity-50 font-medium tracking-wide">Set {idx + 1} of 4 • {ex.reps} Reps</div>
                        </div>
                        {ex.completed ? <CheckCircle2 className="w-4 h-4 text-aura-green" /> : <div className="w-4 h-4 rounded-full border border-power-orange/20" />}
                      </div>
                      
                      {idx === 0 && (
                        <div className="border-l-2 border-power-orange pl-3 mt-3">
                          <span className="text-[9px] bg-power-orange/20 text-power-orange px-2 py-0.5 rounded font-black uppercase mb-2 inline-block tracking-tighter shadow-xs">EQUIPMENT: POWER RACK</span>
                          <p className="text-[10px] leading-relaxed opacity-60 font-medium">Keep chest up and heels flat. Ensure safety bars are correctly aligned at hip height.</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {!userState.activeWorkouts[0].completed ? (
                  <button 
                    onClick={() => handleCompleteWorkout('w1')}
                    className="w-full bg-power-orange text-[#1a1a1a] font-black uppercase tracking-widest py-4 rounded-2xl mt-8 shadow-lg shadow-power-orange/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                  >
                    COMPLETE SESSION <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="mt-auto bg-aura-red/10 border border-aura-red/20 p-4 rounded-xl flex items-center gap-3 text-[11px] text-aura-red/80 font-medium leading-tight">
                    <span className="text-sm">⚠️</span>
                    <div>
                      <strong>IMPORTANT:</strong> Please return all plates and wipe down the bench after use.
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'equip' && (
            <motion.div
              key="equip"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <h2 className="section-title px-2">EQUIPMENT LIBRARY</h2>
              {MOCK_EQUIPMENT.map(equip => (
                <div key={equip.id} className="glass p-6 space-y-4 border border-white/5">
                   <div className="flex justify-between items-start">
                    <h3 className="font-bold tracking-tight">{equip.name}</h3>
                    <span className="text-[9px] bg-power-orange/10 text-power-orange px-2 py-1 rounded font-black tracking-widest">{equip.difficulty}</span>
                   </div>
                   <p className="text-xs opacity-60 font-medium leading-relaxed">{equip.properUse}</p>
                   <button 
                    onClick={() => handleLogEquipmentTask(equip.id)}
                    className="w-full py-2 bg-power-orange/5 border border-power-orange/10 rounded-xl text-[10px] font-bold uppercase opacity-60 hover:bg-power-orange hover:text-[#1a1a1a] transition-all duration-300"
                   >
                     {userState.completedEquipmentTasks.includes(equip.id) ? "TASK COMPLETE +50" : "LOG EQUIPMENT SAFETY"}
                   </button>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'shop' && userRole === 'user' && (
            <motion.div
              key="shop"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="glass p-6">
                <h3 className="section-title">REDEEM REWARDS</h3>
                <div className="space-y-3">
                  {MOCK_REWARDS.map(reward => (
                    <div key={reward.id} className="bg-power-orange/5 p-4 rounded-xl flex justify-between items-center text-sm border border-power-orange/5 shadow-sm">
                      <div className="flex flex-col">
                        <span className="font-semibold opacity-80">{reward.name}</span>
                        <span className="text-[10px] opacity-40 font-medium">{reward.description}</span>
                      </div>
                      <button 
                        onClick={() => redeemReward(reward)}
                        disabled={userState.points < reward.points}
                        className={cn(
                          "px-4 py-2 rounded-lg font-black text-[10px] uppercase transition-all",
                          userState.points >= reward.points 
                            ? "bg-power-orange text-[#1a1a1a] shadow-lg shadow-power-orange/20 active:scale-95" 
                            : "bg-charcoal/10 text-charcoal/30 cursor-not-allowed opacity-50"
                        )}
                      >
                        {reward.points} PTS
                      </button>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 bg-transparent border border-power-orange/20 rounded-xl text-[10px] font-bold uppercase opacity-40 hover:opacity-100 transition-opacity">VIEW ALL REWARDS</button>
              </div>

              <div className="glass p-6">
                <h3 className="section-title">ONLINE CLASSES</h3>
                <div className="space-y-3">
                   {MOCK_CLASSES.map(cls => (
                     <div key={cls.id} className="bg-aura-green/10 border border-aura-green/20 p-4 rounded-2xl">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-sm tracking-tight text-aura-green/90">{cls.title}</span>
                          <span className="text-aura-green font-black text-xs">-{cls.discountPercentage}%</span>
                        </div>
                        <div className="text-[10px] opacity-60 uppercase tracking-widest font-bold italic">Coach {cls.coach} · {cls.duration}</div>
                     </div>
                   ))}
                </div>
                <button className="w-full mt-6 bg-power-orange text-[#1a1a1a] py-3 rounded-2xl font-bold uppercase text-xs shadow-lg shadow-power-orange/20 hover:scale-[1.02] transition-transform">EXPLORE CLASSES</button>
              </div>
            </motion.div>
          )}

          {activeTab === 'admin' && userRole === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="glass p-6">
                <h3 className="section-title text-power-orange">GYM MONITORING</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-power-orange/5 p-4 rounded-2xl border border-power-orange/10">
                    <div className="text-[32px] font-black text-power-orange">{MOCK_USERS.filter(u => u.isOnline).length}</div>
                    <div className="text-[10px] opacity-50 uppercase font-black tracking-widest">Active Now</div>
                  </div>
                  <div className="bg-power-orange/5 p-4 rounded-2xl border border-power-orange/10">
                    <div className="text-[32px] font-black">5</div>
                    <div className="text-[10px] opacity-50 uppercase font-black tracking-widest">Total Today</div>
                  </div>
                </div>
                
                <h3 className="section-title">CURRENTLY IN GYM</h3>
                <div className="space-y-3">
                  {MOCK_USERS.filter(u => u.isOnline).map(u => (
                    <div key={u.id} className="bg-white/5 p-4 rounded-xl flex justify-between items-center border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-power-orange flex items-center justify-center text-[10px] font-black text-[#1a1a1a]">
                          {u.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-sm">{u.name}</div>
                          <div className="text-[9px] opacity-50 uppercase font-bold tracking-wider">{u.email}</div>
                        </div>
                      </div>
                      <div className="text-[10px] font-black text-power-orange">TRAINING</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass p-6">
                <h3 className="section-title">ALL REGISTERED USERS</h3>
                <div className="space-y-2">
                  {MOCK_USERS.map(u => (
                    <div key={u.id} className="p-3 flex justify-between items-center border-b border-charcoal/5 last:border-0">
                      <div className="text-sm font-semibold">{u.name}</div>
                      <div className="text-xs opacity-40">{u.points} PTS</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'coach' && userRole === 'coach' && (
            <motion.div
              key="coach"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="glass p-6">
                <h3 className="section-title">MY TRAINEES</h3>
                <div className="space-y-4">
                  {MOCK_USERS.filter(u => u.assignedCoachId === 'c1').map(u => (
                    <div key={u.id} className="glass !bg-white/5 p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="font-bold">{u.name}</div>
                        <div className={cn("text-[8px] px-2 py-1 rounded-full font-black uppercase tracking-widest", u.isOnline ? "bg-aura-green/20 text-aura-green" : "bg-charcoal/10 text-charcoal/40")}>
                          {u.isOnline ? 'Online' : 'Offline'}
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase text-charcoal/50">
                        <span>Daily Goal</span>
                        <span>85%</span>
                      </div>
                      <div className="w-full h-1.5 bg-charcoal/5 rounded-full overflow-hidden">
                        <div className="h-full bg-power-orange w-[85%]" />
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 bg-power-orange text-[#1a1a1a] rounded-lg text-[9px] font-black uppercase shadow-lg shadow-power-orange/20 hover:scale-[1.02] transition-transform">Send Program</button>
                        <button className="flex-1 py-2 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black uppercase hover:bg-white/10 transition-colors">Chat</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation */}
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
              onClick={() => setActiveTab(item.id as any)}
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
            className="flex-1 flex flex-col items-center justify-center gap-1.5 h-full rounded-xl transition-all relative text-power-orange bg-power-orange/5"
          >
            <ShieldCheck className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Admin Dashboard</span>
          </button>
        ) : (
          <button
            onClick={() => setActiveTab('coach')}
            className="flex-1 flex flex-col items-center justify-center gap-1.5 h-full rounded-xl transition-all relative text-power-orange bg-power-orange/5"
          >
            <UserCheck className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Coach Portal</span>
          </button>
        )}
      </nav>

      {/* Simplified Notification */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] pointer-events-none w-full px-8">
        <AnimatePresence>
          {notifications.map((note, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="glass px-6 py-3 text-[#1a1a1a] bg-aura-amber font-bold text-xs uppercase tracking-widest text-center shadow-2xl rounded-full"
             >
               {note}
             </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
