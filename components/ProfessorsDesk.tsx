import React, { useRef, useState, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DossierItem } from '../types';

gsap.registerPlugin(ScrollTrigger);

const ITEMS: DossierItem[] = [
  {
    id: 'mint',
    title: 'THE ROYAL MINT',
    description: 'Target location. 2400 Million Euros.',
    icon: 'origami',
    secretContent: "We are not printing money. We are printing freedom.",
  },
  {
    id: 'professor',
    title: 'THE BRAIN',
    description: 'Sergio Marquina. The architect.',
    icon: 'glasses',
    secretContent: "Everything is prepared. Every variable. Every outcome.",
  },
  {
    id: 'plan',
    title: 'THE ESCAPE',
    description: 'Protocol Chernobyl. Tunnel construction.',
    icon: 'phone',
    secretContent: "When chaos ensues, we vanish.",
  }
];

const ProfessorsDesk: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<DossierItem | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
       // Animate Lines
       gsap.from(".connect-line", {
           strokeDashoffset: 1000,
           duration: 2,
           ease: "power2.out",
           scrollTrigger: {
               trigger: containerRef.current,
               start: "top 50%"
           }
       });

       gsap.from(".evidence-card", {
         y: 50,
         opacity: 0,
         duration: 0.8,
         stagger: 0.2,
         scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%"
         }
       });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#0e0e0e] overflow-hidden flex flex-col items-center justify-center py-24 border-t border-[#222]">
      
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 bg-[#0e0e0e]">
          <div className="absolute inset-0 opacity-10" 
               style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
          </div>
      </div>

      <div className="relative z-10 w-full max-w-6xl px-6">
        <div className="mb-12 border-l-4 border-[#BF0904] pl-6">
            <h2 className="text-5xl md:text-7xl text-white font-black uppercase tracking-tighter">The Masterplan</h2>
            <p className="font-mono text-gray-500 mt-2">STRATEGIC OVERVIEW // CONFIDENTIAL</p>
        </div>

        {/* Interactive Board */}
        <div className="relative w-full aspect-[16/9] md:aspect-[2/1] bg-[#151515] border border-white/10 p-8 rounded-sm shadow-2xl">
            
            {/* SVG Connections */}
            <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                {/* Dashed Lines */}
                <path d="M 20% 30% L 50% 50%" stroke="#333" strokeWidth="2" strokeDasharray="5,5" className="connect-line" strokeDashoffset="0"/>
                <path d="M 80% 30% L 50% 50%" stroke="#333" strokeWidth="2" strokeDasharray="5,5" className="connect-line" strokeDashoffset="0"/>
                <path d="M 50% 50% L 50% 80%" stroke="#BF0904" strokeWidth="2" className="connect-line" strokeDasharray="1000" strokeDashoffset="0"/>
                
                {/* Central Node Circle */}
                <circle cx="50%" cy="50%" r="4" fill="#BF0904" />
            </svg>

            {/* Evidence Nodes */}
            
            {/* 1. Mint */}
            <motion.button 
                className="evidence-card absolute top-[20%] left-[10%] w-64 bg-[#eee] p-1 text-left transform -rotate-2 hover:scale-105 transition-transform z-10 shadow-lg"
                onClick={() => setSelectedItem(ITEMS[0])}
            >
                <div className="bg-[#1a1a1a] p-3 h-full">
                    <span className="text-[9px] font-mono text-red-500 block mb-1">TARGET_LOC_01</span>
                    <h3 className="text-xl font-black text-white uppercase">{ITEMS[0].title}</h3>
                    <div className="w-full h-24 bg-gray-800 mt-2 overflow-hidden relative">
                         <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
                         <div className="absolute bottom-2 left-2 text-[10px] text-white font-mono">MAP DATA...</div>
                    </div>
                </div>
            </motion.button>

            {/* 2. Professor */}
            <motion.button 
                className="evidence-card absolute top-[20%] right-[10%] w-56 bg-[#eee] p-1 text-left transform rotate-2 hover:scale-105 transition-transform z-10 shadow-lg"
                onClick={() => setSelectedItem(ITEMS[1])}
            >
                <div className="bg-[#1a1a1a] p-3 h-full">
                    <span className="text-[9px] font-mono text-blue-500 block mb-1">ASSET_ALPHA</span>
                    <h3 className="text-xl font-black text-white uppercase">{ITEMS[1].title}</h3>
                    <p className="font-mono text-[10px] text-gray-400 mt-2">{ITEMS[1].description}</p>
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
            </motion.button>

            {/* 3. Escape */}
            <motion.button 
                className="evidence-card absolute bottom-[10%] left-[40%] w-72 bg-[#eee] p-1 text-left hover:scale-105 transition-transform z-10 shadow-lg"
                onClick={() => setSelectedItem(ITEMS[2])}
            >
                <div className="bg-[#BF0904] p-3 h-full">
                    <span className="text-[9px] font-mono text-black block mb-1 font-bold">CONTINGENCY</span>
                    <h3 className="text-xl font-black text-white uppercase">{ITEMS[2].title}</h3>
                    <div className="mt-2 border-t border-black/20 pt-2 flex justify-between items-center">
                        <span className="text-[10px] font-bold text-black">TUNNEL STATUS:</span>
                        <span className="text-[10px] font-mono text-white">READY</span>
                    </div>
                </div>
            </motion.button>

        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#111] border border-[#333] p-8 max-w-lg w-full relative shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl text-white font-black uppercase">{selectedItem.title}</h3>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
                
                <p className="text-gray-400 font-mono text-sm mb-8">{selectedItem.description}</p>
                
                <div className="p-4 bg-red-900/10 border-l-2 border-[#BF0904]">
                    <p className="text-white font-serif italic text-lg leading-relaxed">
                        "{selectedItem.secretContent}"
                    </p>
                </div>

                <div className="mt-8 flex justify-end">
                    <button 
                        onClick={() => setSelectedItem(null)}
                        className="text-xs font-mono text-gray-500 hover:text-white transition-colors"
                    >
                        [CLOSE FILE]
                    </button>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfessorsDesk;