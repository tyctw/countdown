import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Achievement } from '../utils/achievements';

interface AchievementToastProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export const AchievementToast: React.FC<AchievementToastProps> = ({ achievement, onClose }) => {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!achievement) return;

    const duration = 1800;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 28, spread: 80, ticks: 70, zIndex: 100000 };

    const burst = () => {
      confetti({ ...defaults, particleCount: 42, origin: { x: 0.5, y: 0.82 }, angle: 90 });
      confetti({ ...defaults, particleCount: 24, origin: { x: 0.28, y: 0.88 }, angle: 65 });
      confetti({ ...defaults, particleCount: 24, origin: { x: 0.72, y: 0.88 }, angle: 115 });
    };

    burst();
    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        window.clearInterval(interval);
        return;
      }

      confetti({
        ...defaults,
        particleCount: Math.max(8, Math.round(20 * (timeLeft / duration))),
        origin: { x: 0.5, y: 0.86 },
        spread: 110,
      });
    }, 320);

    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
    audio.volume = 0.35;
    audio.play().catch(() => {});

    const timer = window.setTimeout(() => {
      onCloseRef.current();
    }, 4200);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timer);
    };
  }, [achievement?.id]);

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          key={achievement.id}
          initial={{ opacity: 0, y: 50, scale: 0.8, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, y: -20, scale: 0.9, filter: 'blur(10px)' }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60000] perspective-[1000px] w-[90%] max-w-sm"
        >
          <div className="bg-white rounded-3xl p-5 shadow-2xl border-2 overflow-hidden relative border-amber-300">
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-amber-300" />
            
            <div className="flex items-center gap-4 relative z-10 w-full">
              <motion.div 
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 20, delay: 0.2 }}
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg text-4xl bg-gradient-to-br from-amber-100 to-amber-200 border border-amber-300 flex-shrink-0"
              >
                {achievement.icon}
              </motion.div>
              
              <div className="flex-1 pr-2 min-w-0">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xs font-bold uppercase tracking-widest mb-1 opacity-80 text-amber-600"
                >
                  🎉 成就解鎖
                </motion.div>
                <motion.h4 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg font-black text-slate-800 tracking-tight truncate leading-tight"
                >
                  {achievement.title}
                </motion.h4>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-slate-500 text-xs font-medium mt-1 pr-1 line-clamp-2"
                >
                  {achievement.description}
                </motion.p>
              </div>
            </div>
            
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear", repeatDelay: 3 }}
              className="absolute inset-0 w-1/2 h-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent z-20 pointer-events-none"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
