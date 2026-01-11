import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroSplashProps {
  onComplete: () => void;
}

const IntroSplash: React.FC<IntroSplashProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Aggressive, fast-paced timeline
    const t1 = setTimeout(() => setStep(1), 800);
    const t2 = setTimeout(() => setStep(2), 2200);
    const t3 = setTimeout(() => setStep(3), 3500);
    const t4 = setTimeout(() => onComplete(), 4000);

    return () => {
        clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#090909] flex items-center justify-center overflow-hidden font-mono"
      initial={{ opacity: 1 }}
      animate={step === 3 ? { opacity: 0, pointerEvents: 'none' } : { opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")'}}></div>
      
      <AnimatePresence mode='wait'>
        {step === 0 && (
          <motion.div
            key="load"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-[#BF0904] text-xs tracking-widest"
          >
            ESTABLISHING SECURE CONNECTION...
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="mask"
            className="relative flex flex-col items-center"
          >
             {/* Abstract Mask Shape drawing */}
             <svg width="100" height="150" viewBox="0 0 100 150" className="fill-transparent stroke-[#BF0904] stroke-[2px]">
                <motion.path 
                    d="M50 10 Q80 10 90 40 Q100 80 50 140 Q0 80 10 40 Q20 10 50 10"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />
             </svg>
             <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-white text-3xl font-black uppercase tracking-tighter"
             >
                La Casa De Papel
             </motion.div>
          </motion.div>
        )}

        {step === 2 && (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
             <motion.div
                initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                exit={{ scale: 1.2, opacity: 0 }}
                className="text-center"
             >
                 <h1 className="text-6xl md:text-9xl font-black text-white uppercase italic leading-none mix-blend-difference">
                    Join The<br/>
                    <span className="text-[#BF0904]">Resistance</span>
                 </h1>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Progress Bar */}
      <motion.div 
        className="absolute bottom-10 left-10 right-10 h-1 bg-[#222]"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      >
        <motion.div 
            className="h-full bg-[#BF0904]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.5, ease: "linear" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default IntroSplash;