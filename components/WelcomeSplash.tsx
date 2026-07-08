
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, GraduationCap, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WelcomeSplashProps {
  userName: string;
  onComplete: () => void;
}

const WelcomeSplash: React.FC<WelcomeSplashProps> = ({ userName, onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [welcomeType, setWelcomeType] = useState<'login' | 'signup'>('login');

  const onCompleteRef = React.useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const handleClose = React.useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onCompleteRef.current();
    }, 800); // Wait for exit animation
  }, []);

  useEffect(() => {
    // Check type if stored
    const storedType = sessionStorage.getItem('gsat_welcome_type') as 'login' | 'signup' | null;
    if (storedType) setWelcomeType(storedType);

    // Launch confetti
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 110 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 40 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    const timer = setTimeout(handleClose, 3500);

    return () => {
        clearInterval(interval);
        clearTimeout(timer);
    }
  }, [handleClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
          onClick={handleClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white/90 backdrop-blur-xl cursor-pointer select-none"
        >
          <div className="text-center space-y-8 p-8 max-w-lg w-full">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
              className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-indigo-200"
            >
              <GraduationCap className="w-10 h-10 text-white" />
            </motion.div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em]">
                        {welcomeType === 'signup' ? '註冊成功' : '登入成功'}
                    </span>
                    <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  {welcomeType === 'signup' ? `歡迎加入，${userName}` : `歡迎回來，${userName}`}
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-slate-500 text-lg font-medium px-4"
              >
                {welcomeType === 'signup' 
                  ? '很高興能在這段夢想征途中與你同行！' 
                  : '今天也是充滿希望的一天，讓我們繼續努力吧！'}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col items-center gap-4 pt-4"
            >
               <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-slate-600 text-[11px] font-bold">
                  <PartyPopper className="w-3.5 h-3.5 text-pink-500" />
                  {welcomeType === 'signup' ? '個人空間已建立' : '數據同步已完成'}
               </div>
               
               <div className="text-[10px] text-slate-300 animate-pulse">
                  點擊任意處以跳過
               </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeSplash;
