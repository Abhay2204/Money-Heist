import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DIALOGUE = [
    { speaker: 'INSPECTOR', text: "Professor. Can you hear me?" },
    { speaker: 'PROFESSOR', text: "Loud and clear, Inspector. Are you wearing the red suit I sent you?" },
    { speaker: 'INSPECTOR', text: "Listen to me. You are surrounded. There is no way out." },
    { speaker: 'PROFESSOR', text: "There is always a way out, Inspector. It depends on your perspective." },
    { speaker: 'INSPECTOR', text: "Release the hostages. We can talk about a deal." },
    { speaker: 'PROFESSOR', text: "I don't want a deal. I want time. And right now... I am buying it." },
];

const NegotiationTerminal: React.FC = () => {
  const [lines, setLines] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setLines(prev => prev < DIALOGUE.length ? prev + 1 : prev);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-[50vh] bg-[#050505] flex items-center justify-center py-24 px-6 font-mono border-t border-[#222]">
        <div className="w-full max-w-3xl border border-[#333] bg-[#000] p-8 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-8 bg-[#111] border-b border-[#333] flex items-center px-4 justify-between">
                <span className="text-[10px] text-gray-500">SECURE_CHANNEL_v9.2</span>
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500"></div>
                </div>
            </div>

            <div className="mt-8 space-y-6">
                {DIALOGUE.slice(0, lines).map((line, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex flex-col ${line.speaker === 'PROFESSOR' ? 'items-end text-right' : 'items-start'}`}
                    >
                        <span className={`text-[10px] font-bold mb-1 ${line.speaker === 'PROFESSOR' ? 'text-red-500' : 'text-blue-500'}`}>
                            {line.speaker === 'PROFESSOR' ? 'Unknown Caller (The Professor)' : 'Inspector Murillo'}
                        </span>
                        <div className={`p-3 max-w-[80%] ${line.speaker === 'PROFESSOR' ? 'bg-[#1a0505] border-l-2 border-red-500 text-red-100' : 'bg-[#051a25] border-l-2 border-blue-500 text-blue-100'}`}>
                            <p className="text-sm md:text-base leading-relaxed">{line.text}</p>
                        </div>
                    </motion.div>
                ))}
                {lines < DIALOGUE.length && (
                    <div className="text-gray-500 text-xs animate-pulse">
                        Typing...
                    </div>
                )}
            </div>
            
            <div className="absolute -bottom-10 right-0 text-[#BF0904] text-[10px] tracking-widest opacity-50">
                AUDIO TRACE: FAILED
            </div>
        </div>
    </div>
  );
};

export default NegotiationTerminal;