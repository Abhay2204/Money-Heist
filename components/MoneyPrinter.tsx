import React from 'react';
import { motion } from 'framer-motion';

// Optimized Bill Component using CSS animations instead of JS framer-motion for internal leaf nodes
// This significantly reduces main-thread work and prevents lagging.
const MoneyBill = () => {
  // Randomize animation delays via style variables to prevent robotic uniformity
  const style = {
    '--delay': `${Math.random() * -5}s`,
    '--duration-flutter': `${3 + Math.random() * 2}s`,
    '--duration-shimmer': `${2 + Math.random() * 2}s`,
  } as React.CSSProperties;

  return (
    <div 
      className="bill-3d relative w-[300px] h-[140px] bg-[#e6dcc3] overflow-hidden border border-green-900/20 shadow-lg shrink-0 backface-hidden"
      style={style}
    >
         {/* Base Texture */}
         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')] mix-blend-multiply"></div>
         <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-yellow-50/20 pointer-events-none"></div>

         {/* Bill Borders & Content */}
         <div className="absolute inset-2 border-2 border-green-900/30 rounded-sm"></div>
         
         <div className="absolute top-2 right-2 text-3xl font-black text-green-900/80 font-serif tracking-tighter drop-shadow-sm" style={{ textShadow: '1px 1px 0px rgba(255,255,255,0.5)' }}>50</div>
         <div className="absolute bottom-2 left-2 text-3xl font-black text-green-900/80 font-serif tracking-tighter drop-shadow-sm" style={{ textShadow: '1px 1px 0px rgba(255,255,255,0.5)' }}>50</div>
         
         <div className="absolute inset-0 flex items-center justify-center opacity-40 mix-blend-multiply">
             <div className="w-24 h-24 rounded-full border-4 border-green-900/40 border-double flex items-center justify-center relative">
                <div className="absolute inset-0 border-t-2 border-b-2 border-green-800/20 rotate-45"></div>
                <div className="absolute inset-0 border-l-2 border-r-2 border-green-800/20 -rotate-45"></div>
                <span className="font-mono text-[10px] text-green-900 font-bold">50 EURO</span>
             </div>
         </div>

         {/* Holographic Strip (CSS Animation) */}
         <div className="holo-strip absolute right-12 top-0 bottom-0 w-4 bg-gradient-to-b from-transparent via-white/80 to-transparent opacity-50 mix-blend-overlay border-x border-white/40"></div>

         {/* Sheen (CSS Animation) */}
         <div className="bill-sheen absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"></div>
    </div>
  );
};

const MoneySheet = () => (
  <div className="flex gap-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <MoneyBill key={i} />
    ))}
  </div>
);

const MoneyPrinter: React.FC = () => {
  return (
    <div className="relative w-full h-[60vh] bg-[#1a1a1a] overflow-hidden flex flex-col items-center justify-center border-y border-[#333]">
        
        {/* CSS Styles for High Performance Animations */}
        <style>{`
          .bill-3d {
            animation: flutter var(--duration-flutter) ease-in-out infinite;
            animation-delay: var(--delay);
            transform-style: preserve-3d;
            will-change: transform;
          }
          
          .holo-strip {
            background-size: 100% 200%;
            animation: holoScroll 3s linear infinite;
            animation-delay: var(--delay);
          }

          .bill-sheen {
            transform: translateX(-150%);
            animation: sheenPass var(--duration-shimmer) linear infinite;
            animation-delay: var(--delay);
          }

          @keyframes flutter {
            0%, 100% { transform: rotateX(0deg) translateY(0px); }
            50% { transform: rotateX(5deg) translateY(-4px); }
          }

          @keyframes holoScroll {
            0% { background-position: 0% 0%; }
            100% { background-position: 0% 200%; }
          }

          @keyframes sheenPass {
            0% { transform: translateX(-150%) skewX(12deg); }
            40%, 100% { transform: translateX(150%) skewX(12deg); }
          }
        `}</style>

        <div className="absolute top-8 left-8 z-20 pointer-events-none mix-blend-difference">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">The Production</h2>
            <p className="font-mono text-[#50c878] text-sm mt-1">8 MILLION EUROS / HOUR</p>
        </div>

        {/* Moving Belts with 3D Perspective */}
        <div className="flex flex-col gap-12 rotate-[-5deg] scale-110" style={{ perspective: '1000px' }}>
            
            {/* Row 1 */}
            <div className="relative flex overflow-hidden w-[120vw]">
                {/* Gradient Masks for Fade In/Out */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#1a1a1a] to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#1a1a1a] to-transparent z-10"></div>

                {/* Hardware accelerated wrapper */}
                <motion.div 
                    className="flex gap-4 will-change-transform"
                    animate={{ x: [0, -1264] }} // 300px width + 16px gap * 4 items
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                >
                    <MoneySheet /><MoneySheet /><MoneySheet /><MoneySheet />
                </motion.div>
            </div>

            {/* Row 2 (Reverse & Faster) */}
            <div className="relative flex overflow-hidden w-[120vw]">
                 <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#1a1a1a] to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#1a1a1a] to-transparent z-10"></div>

                <motion.div 
                    className="flex gap-4 will-change-transform"
                    animate={{ x: [-1264, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                >
                    <MoneySheet /><MoneySheet /><MoneySheet /><MoneySheet />
                </motion.div>
            </div>
             
             {/* Row 3 (Blurry Depth) */}
             <div className="relative flex overflow-hidden w-[120vw] opacity-40 blur-[2px] scale-90">
                <motion.div 
                    className="flex gap-4 will-change-transform"
                    animate={{ x: [0, -1264] }}
                    transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                >
                    <MoneySheet /><MoneySheet /><MoneySheet /><MoneySheet />
                </motion.div>
            </div>
        </div>
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent,rgba(0,0,0,0.8))] pointer-events-none"></div>
    </div>
  );
};

export default MoneyPrinter;