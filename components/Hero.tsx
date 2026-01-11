import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion';

// --- Sub-components ---

const MoneyParticle: React.FC<{ depth: number }> = ({ depth }) => {
  const y = useMotionValue(Math.random() * 100);
  const rotate = useMotionValue(Math.random() * 360);
  
  // Random speed based on depth
  const speed = (Math.random() * 0.5 + 0.2) * (depth === 1 ? 1 : 0.5);

  useAnimationFrame(() => {
    let newY = y.get() + speed;
    if (newY > 120) newY = -20; // Reset to top
    y.set(newY);
    rotate.set(rotate.get() + speed * 0.5);
  });

  const size = depth === 1 ? 'w-24 h-12' : 'w-12 h-6';
  const blur = depth === 1 ? 'blur-none' : 'blur-[2px]';
  const opacity = depth === 1 ? 'opacity-80' : 'opacity-30';
  const zIndex = depth === 1 ? 20 : 0;

  return (
    <motion.div 
      style={{ y: useTransform(y, v => `${v}vh`), rotate }}
      className={`absolute ${size} ${blur} ${opacity} z-${zIndex} pointer-events-none`}
      initial={{ x: `${Math.random() * 100}vw` }}
    >
      <div className="w-full h-full bg-[#3a4a3a] border border-[#5a7a5a] relative overflow-hidden shadow-lg">
         <div className="absolute inset-0 border-2 border-white/10 m-1"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-8 h-8 border border-white/10"></div>
      </div>
    </motion.div>
  );
};

const GlitchText = ({ text }: { text: string }) => {
  return (
    <div className="relative inline-block group">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-600 opacity-0 group-hover:opacity-70 animate-glitch-1">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-blue-600 opacity-0 group-hover:opacity-70 animate-glitch-2">{text}</span>
    </div>
  );
};

// --- Main Component ---

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  const xSpring = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const ySpring = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const bgMoveX = useTransform(xSpring, [-0.5, 0.5], ['5%', '-5%']);
  const bgMoveY = useTransform(ySpring, [-0.5, 0.5], ['5%', '-5%']);
  
  const textMoveX = useTransform(xSpring, [-0.5, 0.5], ['-20px', '20px']);
  const textMoveY = useTransform(ySpring, [-0.5, 0.5], ['-20px', '20px']);

  const maskScale = useTransform(scrollY, [0, 500], [1, 15]);
  const maskOpacity = useTransform(scrollY, [0, 300], [0.1, 0]);

  // BLUEPRINT TRANSITION LOGIC
  // Maps scroll 0-600 to Opacity 0-1
  const blueprintOpacity = useTransform(scrollY, [0, 400], [0, 1]);
  const textScale = useTransform(scrollY, [0, 400], [1, 0.8]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-[#050505] flex flex-col items-center justify-center cursor-crosshair"
      onMouseMove={handleMouseMove}
    >
      
      {/* 1. Dynamic Background Texture (THE VOID) */}
      <motion.div 
        style={{ x: bgMoveX, y: bgMoveY, scale: 1.1 }}
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
      >
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wall-4-light.png')] mix-blend-overlay"></div>
         <div className="absolute inset-0 bg-gradient-to-br from-[#1a0505] via-[#000] to-[#050505]"></div>
      </motion.div>

      {/* 1.5 BLUEPRINT OVERLAY (THE PLAN) */}
      <motion.div 
        style={{ opacity: blueprintOpacity }}
        className="absolute inset-0 z-1 pointer-events-none bg-[#001a33]"
      >
          {/* Grid */}
          <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'linear-gradient(#0066cc 1px, transparent 1px), linear-gradient(90deg, #0066cc 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          </div>
          
          {/* Architectural Elements */}
          <svg className="absolute inset-0 w-full h-full opacity-30 stroke-[#0066cc] stroke-[1px] fill-none">
             <circle cx="50%" cy="50%" r="300" strokeDasharray="10 5" />
             <circle cx="50%" cy="50%" r="400" strokeDasharray="20 10" />
             <line x1="0" y1="50%" x2="100%" y2="50%" />
             <line x1="50%" y1="0" x2="50%" y2="100%" />
             {/* Random Dimensions */}
             <text x="52%" y="52%" className="fill-[#0066cc] text-[10px] font-mono">SEC_SECTOR_01</text>
             <text x="20%" y="20%" className="fill-[#0066cc] text-[10px] font-mono">EXT_PERIMETER</text>
          </svg>
      </motion.div>


      {/* 2. Floating Money (Background Layer) */}
      {Array.from({ length: 12 }).map((_, i) => (
        <MoneyParticle key={`bg-${i}`} depth={0} />
      ))}

      {/* 3. The Giant Dali Mask (Watermark) */}
      <motion.div 
        style={{ scale: maskScale, opacity: maskOpacity, x: textMoveX, y: textMoveY }}
        className="absolute z-10 w-[80vh] h-[120vh] pointer-events-none opacity-10"
      >
         <svg viewBox="0 0 200 300" className="w-full h-full fill-none stroke-[#BF0904] stroke-[0.5]">
             <path d="M100 10C50 10 20 60 20 120C20 200 50 260 100 290C150 260 180 200 180 120C180 60 150 10 100 10Z" />
             <path d="M40 100C40 100 60 250 100 270C140 250 160 100 160 100C160 60 140 40 100 40C60 40 40 60 40 100Z" />
         </svg>
      </motion.div>

      {/* 4. Main Typography Stack */}
      <div className="relative z-20 flex flex-col items-center justify-center mix-blend-normal">
         
         <motion.div style={{ x: textMoveX, y: textMoveY, scale: textScale }} className="flex flex-col items-center leading-none select-none">
            
            {/* Top Text - Hollow */}
            <h1 className="text-[12vw] md:text-[9rem] font-black text-transparent uppercase tracking-tighter"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
                La Casa
            </h1>

            {/* Middle Text - Solid & Glitching */}
            <div className="relative group my-[-2vw] md:my-[-2rem] z-30">
                <h1 className="text-[15vw] md:text-[13rem] font-black text-[#f3f3f3] uppercase tracking-tighter mix-blend-difference relative">
                    <GlitchText text="DE PAPEL" />
                </h1>
                {/* Red Overlay on Hover */}
                <div className="absolute inset-0 bg-[#BF0904] mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-100 transform scale-105 skew-x-12"></div>
            </div>

            {/* Bottom Text - English Title */}
            <h2 className="text-[8vw] md:text-[6rem] font-black text-[#BF0904] uppercase tracking-widest mt-4">
                MONEY HEIST
            </h2>

         </motion.div>

         {/* Status Badge */}
         <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12 flex items-center gap-4 bg-white/5 backdrop-blur-sm px-6 py-3 border border-white/10 rounded-full"
         >
            <div className="flex gap-1">
                <span className="w-1 h-4 bg-[#BF0904] animate-pulse"></span>
                <span className="w-1 h-4 bg-[#BF0904] animate-pulse" style={{ animationDelay: '0.1s'}}></span>
                <span className="w-1 h-4 bg-[#BF0904] animate-pulse" style={{ animationDelay: '0.2s'}}></span>
            </div>
            <span className="font-mono text-xs text-gray-400 tracking-[0.2em]">TARGET LOCKED: ROYAL MINT</span>
         </motion.div>

      </div>

      {/* 5. Floating Money (Foreground Layer - Blurry & Fast) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <MoneyParticle key={`fg-${i}`} depth={1} />
      ))}

      {/* 6. Vignette & Grain */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-30"></div>

      <style>{`
        @keyframes glitch-1 {
          0% { transform: translate(0) }
          20% { transform: translate(-2px, 2px) }
          40% { transform: translate(-2px, -2px) }
          60% { transform: translate(2px, 2px) }
          80% { transform: translate(2px, -2px) }
          100% { transform: translate(0) }
        }
        @keyframes glitch-2 {
          0% { transform: translate(0) }
          20% { transform: translate(2px, -2px) }
          40% { transform: translate(2px, 2px) }
          60% { transform: translate(-2px, -2px) }
          80% { transform: translate(-2px, 2px) }
          100% { transform: translate(0) }
        }
        .animate-glitch-1 { animation: glitch-1 0.4s cubic-bezier(.25, .46, .45, .94) both infinite; }
        .animate-glitch-2 { animation: glitch-2 0.4s cubic-bezier(.25, .46, .45, .94) both infinite; }
      `}</style>

    </div>
  );
};

export default Hero;