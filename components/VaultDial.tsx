import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';

const VaultDial: React.FC = () => {
  const [stage, setStage] = useState<0 | 1 | 2>(0); // 0: Lock 1, 1: Lock 2, 2: Open
  const [currentDeg, setCurrentDeg] = useState(0);
  const [flash, setFlash] = useState(false); // Visual cue trigger
  
  const rotation = useMotionValue(0);
  
  const LOCK_1_TARGET = 120;
  const LOCK_2_TARGET = 300;
  const TOLERANCE = 15;

  const currentTarget = stage === 0 ? LOCK_1_TARGET : LOCK_2_TARGET;

  const borderColor = useTransform(
    rotation,
    (v) => {
        if (stage === 2) return "#00ff00";
        if (flash) return "#00ff00";
        const norm = v % 360;
        const absNorm = norm < 0 ? 360 + norm : norm;
        const dist = Math.abs(absNorm - currentTarget);
        if (dist < TOLERANCE) return "#00ff00"; 
        if (dist < 50) return "#D4AF37"; 
        return "#333333"; 
    }
  );

  const handleDrag = (_: any, info: any) => {
    if (stage === 2) return;
    const current = rotation.get();
    const next = current + info.delta.x * 0.5;
    rotation.set(next);
    
    let norm = next % 360;
    if (norm < 0) norm += 360;
    setCurrentDeg(Math.floor(norm));
  };

  const handleDragEnd = () => {
    if (stage === 2) return;
    let norm = rotation.get() % 360;
    if (norm < 0) norm += 360;

    if (Math.abs(norm - currentTarget) < TOLERANCE) {
       if (stage === 0) {
           setStage(1);
           setFlash(true);
           setTimeout(() => setFlash(false), 600);
           animate(rotation, norm + 20, { type: "spring", stiffness: 300, damping: 20 }); 
       } else {
           setStage(2);
           setFlash(true);
           setTimeout(() => setFlash(false), 600);
           animate(rotation, norm, { type: "spring", stiffness: 300, damping: 20 });
       }
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#050505] flex flex-col items-center justify-center overflow-hidden border-t border-white/10" style={{ perspective: "1500px" }}>
      
      {/* Treasure Background (Hidden initially) */}
      <div className={`absolute inset-0 transition-opacity duration-1000 delay-500 ${stage === 2 ? 'opacity-100' : 'opacity-0'}`}>
         <img src="https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-60" alt="Vault Content" />
         <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Header - Fade out when unlocked */}
      <motion.div 
         animate={{ opacity: stage === 2 ? 0 : 1, y: stage === 2 ? -100 : 0 }}
         transition={{ duration: 1 }}
         className="relative z-10 text-center mb-12 pointer-events-none select-none"
      >
        <h2 className="text-[#BF0904] text-6xl mb-2 font-black tracking-tighter uppercase">The Vault</h2>
        <div className="flex items-center justify-center gap-4 text-xs font-mono text-gray-400">
            <span>SEQUENCE: {stage === 0 ? '1/2' : stage === 1 ? '2/2' : 'COMPLETE'}</span>
            <span>///</span>
            <span>TARGET: {stage === 2 ? 'UNLOCKED' : 'CLASSIFIED'}</span>
        </div>
      </motion.div>

      {/* The Dial / Door */}
      <motion.div
        animate={stage === 2 ? { 
            rotateY: -100, 
            x: -200,
            transition: { duration: 2.5, ease: "easeInOut", delay: 0.5 } 
        } : { rotateY: 0, x: 0 }}
        style={{ transformStyle: "preserve-3d", transformOrigin: "left center" }}
        className="relative z-20"
      >
          {/* Top Marker */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-red-600 text-3xl z-20 transition-opacity" style={{ opacity: stage === 2 ? 0 : 1 }}>▼</div>

          <motion.div
            style={{ borderColor }}
            className="relative w-80 h-80 md:w-[500px] md:h-[500px] rounded-full border-8 flex items-center justify-center bg-[#0a0a0a] shadow-[0_0_100px_rgba(0,0,0,0.9)] cursor-grab active:cursor-grabbing touch-none transition-colors duration-200"
          >
             {/* Success Ripple Effect */}
             <AnimatePresence>
                {flash && (
                    <motion.div 
                        initial={{ scale: 1, opacity: 0.8, borderColor: "#00ff00" }}
                        animate={{ scale: 1.4, opacity: 0, borderColor: "#00ff00" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 rounded-full border-4 pointer-events-none"
                    />
                )}
             </AnimatePresence>

            {/* Massive Steel Door Texture */}
            <div className="absolute inset-0 rounded-full opacity-60" 
                 style={{backgroundImage: 'radial-gradient(circle, #333 0%, #000 90%)'}}></div>

            {/* Rotating Mechanism */}
            <motion.div
                style={{ rotate: rotation }}
                className="w-full h-full rounded-full relative"
                drag={stage !== 2 ? "x" : false} 
                dragConstraints={{ left: 0, right: 0 }} 
                dragElastic={0}
                dragMomentum={false} 
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
            >
                {/* Ticks */}
                {Array.from({ length: 60 }).map((_, i) => {
                    const isMajor = i % 5 === 0;
                    return (
                        <div
                            key={i}
                            className={`absolute top-0 left-1/2 -translate-x-1/2 origin-bottom ${isMajor ? 'bg-white/60 w-1.5 h-8' : 'bg-white/20 w-0.5 h-4'}`}
                            style={{ 
                                transform: `rotate(${i * 6}deg) translateY(10px)`, 
                                transformOrigin: "center 240px" 
                            }} 
                        />
                    );
                })}
                
                {/* Center Handle */}
                <div className="absolute inset-0 m-auto w-64 h-64 rounded-full border-8 border-[#222] bg-[#111] shadow-[inset_0_0_30px_black] flex items-center justify-center">
                    {/* Metal Bar */}
                    <motion.div 
                        animate={stage === 2 ? { rotate: 360 } : { rotate: 90 }}
                        transition={{ duration: 1, delay: 0 }}
                        className="w-64 h-12 bg-gradient-to-r from-[#222] via-[#555] to-[#222] rounded shadow-lg absolute"
                    ></motion.div>
                    
                    <div className="w-40 h-40 bg-gradient-to-br from-gray-800 to-black rounded-full shadow-[0_10px_20px_black] relative z-10 flex flex-col items-center justify-center border-4 border-[#333]">
                         <span className={`font-mono text-3xl tracking-widest font-bold transition-colors duration-300 ${stage === 2 || flash ? 'text-[#00ff00]' : 'text-[#D4AF37]'}`}>
                             {currentDeg}°
                         </span>
                         <span className="text-[10px] text-gray-600 mt-1">
                             {stage === 2 ? 'OPEN' : `LOCK ${stage + 1}`}
                         </span>
                    </div>
                </div>

                {/* Red Indicator */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-600 rounded-full shadow-[0_0_15px_red]"></div>

            </motion.div>
          </motion.div>
      </motion.div>

      {/* REWARD MODAL (Delayed) */}
      <AnimatePresence>
        {stage === 2 && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.5 }} // Wait for door to fully open
                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/40 pointer-events-none"
            >
                <motion.div 
                    initial={{ scale: 0.5, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="relative z-10 text-center p-8 border-4 border-[#D4AF37] bg-black/80 backdrop-blur-md max-w-2xl mx-4 pointer-events-auto shadow-[0_0_50px_rgba(212,175,55,0.2)]"
                >
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-4 italic uppercase text-shadow-lg">Bella Ciao!</h1>
                    <p className="text-[#D4AF37] text-xl font-mono mb-8">2.4 BILLION EUROS SECURED</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-[#BF0904] text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-white hover:text-[#BF0904] transition-colors"
                    >
                        Escape The Mint
                    </button>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VaultDial;