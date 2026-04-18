import React from 'react';
import { motion } from 'motion/react';
import { Reward, OnlineClass } from '../types';

interface ShopProps {
  rewards: Reward[];
  classes: OnlineClass[];
  points: number;
  onRedeem: (reward: Reward) => void;
}

const Shop: React.FC<ShopProps> = ({ rewards, classes, points, onRedeem }) => {
  return (
    <motion.div
      key="shop"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 px-4"
    >
      <div className="glass p-6">
        <h3 className="section-title">REDEEM REWARDS</h3>
          <div className="space-y-3">
          {rewards.map(reward => (
            <div key={reward.id} className="bg-aura-gold/5 p-4 rounded-xl flex justify-between items-center text-sm border border-aura-gold/5">
              <div className="flex flex-col">
                <span className="font-semibold opacity-80">{reward.name}</span>
                <span className="text-[10px] opacity-40">{reward.description}</span>
              </div>
              <button 
                onClick={() => onRedeem(reward)}
                disabled={points < reward.points}
                className={`px-4 py-2 rounded-lg font-black text-[10px] uppercase transition-all ${
                  points >= reward.points 
                    ? "bg-aura-gold text-[#1a1a1a] shadow-lg shadow-aura-gold/20" 
                    : "bg-charcoal/10 text-charcoal/30 cursor-not-allowed"
                }`}
              >
                {reward.points} PTS
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="glass p-6">
        <h3 className="section-title">ONLINE CLASSES</h3>
        <div className="space-y-3">
           {classes.map(cls => (
             <div key={cls.id} className="bg-aura-green/10 border border-aura-green/20 p-4 rounded-2xl">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-sm tracking-tight text-aura-green/90">{cls.title}</span>
                  <span className="text-aura-green font-black text-xs">-{cls.discountPercentage}%</span>
                </div>
                <div className="text-[10px] opacity-60 uppercase tracking-widest font-bold italic">Coach {cls.coach} · {cls.duration}</div>
             </div>
           ))}
        </div>
        <button className="w-full mt-6 bg-aura-gold text-[#1a1a1a] py-3 rounded-2xl font-bold uppercase text-xs shadow-lg shadow-aura-gold/20 hover:scale-[1.02] transition-transform">EXPLORE CLASSES</button>
      </div>
    </motion.div>
  );
};

export default Shop;
