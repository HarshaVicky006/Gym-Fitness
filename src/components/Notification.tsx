import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NotificationProps {
  notifications: string[];
}

const Notification: React.FC<NotificationProps> = ({ notifications }) => {
  return (
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
  );
};

export default Notification;
