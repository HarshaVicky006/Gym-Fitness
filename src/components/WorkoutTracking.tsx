import React from 'react';
import { motion } from 'motion/react';
import { Camera, CameraOff, CheckCircle2, ArrowRight } from 'lucide-react';
import { UserState } from '../types';

interface WorkoutTrackingProps {
  userState: UserState;
  onComplete: (id: string, usedCamera: boolean) => void;
  isDarkMode: boolean;
  useCamera: boolean;
  setUseCamera: (val: boolean) => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

const WorkoutTracking: React.FC<WorkoutTrackingProps> = ({ 
  userState, 
  onComplete, 
  useCamera, 
  setUseCamera, 
  videoRef 
}) => {
  return (
    <motion.div
      key="workout"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6 px-4"
    >
      {!userState.activeWorkouts[0].completed && (
        <div className="glass overflow-hidden relative group aspect-video bg-black flex items-center justify-center rounded-3xl">
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

          <div className="absolute top-4 left-4 bg-aura-gold/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-[#1a1a1a] uppercase tracking-tighter z-20">
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
            onClick={() => onComplete('w1', useCamera)}
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
  );
};

export default WorkoutTracking;
