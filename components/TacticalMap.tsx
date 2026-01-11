import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SECTORS = [
    { id: 'lobby', name: 'MAIN HALL', x: 50, y: 75, status: 'SECURE' },
    { id: 'vault', name: 'GOLD VAULT', x: 50, y: 35, status: 'LOCKED' },
    { id: 'print', name: 'PRODUCTION', x: 25, y: 50, status: 'ACTIVE' },
    { id: 'server', name: 'COMMS ROOM', x: 75, y: 50, status: 'OFFLINE' },
];

const TacticalMap: React.FC = () => {
    const [activeSector, setActiveSector] = useState<string | null>(null);

    return (
        <div className="relative w-full min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4 md:p-12 border-b border-[#222]">
            {/* Dark Grid Background */}
            <div className="absolute inset-0 opacity-20" 
                 style={{ backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            <div className="relative z-10 w-full max-w-6xl">
                <div className="mb-8 flex justify-between items-center border-b border-white/10 pb-4">
                    <h2 className="text-3xl text-white font-bold uppercase tracking-tight">Tactical Schematic</h2>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="font-mono text-[10px] text-gray-400">LIVE FEED</span>
                        </div>
                    </div>
                </div>

                {/* The Map Interface */}
                <div className="relative w-full aspect-[16/9] bg-[#080808] border border-white/10 shadow-2xl overflow-hidden rounded-sm">
                    {/* Architectural Floorplan Lines (CSS Art) */}
                    <div className="absolute inset-0 opacity-30">
                        {/* Outer Walls */}
                        <div className="absolute top-[10%] left-[10%] right-[10%] bottom-[10%] border-2 border-blue-500/50"></div>
                        {/* Inner Corridors */}
                        <div className="absolute top-[10%] bottom-[10%] left-[45%] w-[10%] border-x border-blue-500/30"></div>
                        <div className="absolute top-[45%] left-[10%] right-[10%] h-[10%] border-y border-blue-500/30"></div>
                        {/* Vault Circle */}
                        <div className="absolute top-[35%] left-[50%] -translate-x-1/2 w-32 h-32 border-2 border-red-500/50 rounded-full border-dashed animate-spin-slow duration-[20s]"></div>
                    </div>

                    {/* Interactive Points */}
                    {SECTORS.map((sector) => (
                        <motion.button
                            key={sector.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-20"
                            style={{ top: `${sector.y}%`, left: `${sector.x}%` }}
                            onClick={() => setActiveSector(sector.id)}
                            whileHover={{ scale: 1.1 }}
                        >
                            {/* Crosshair */}
                            <div className="relative w-8 h-8 flex items-center justify-center">
                                <div className="absolute w-full h-[1px] bg-white/50"></div>
                                <div className="absolute h-full w-[1px] bg-white/50"></div>
                                <div className={`w-2 h-2 rounded-full ${activeSector === sector.id ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-white'}`}></div>
                            </div>
                            <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 px-2 py-1 border border-white/20 text-[9px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                {sector.name}
                            </div>
                        </motion.button>
                    ))}

                    {/* Data Panel */}
                    <AnimatePresence>
                        {activeSector && (
                            <motion.div 
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 50, opacity: 0 }}
                                className="absolute top-4 right-4 bottom-4 w-72 bg-black/90 border-l border-red-500/50 p-6 backdrop-blur-md flex flex-col justify-center"
                            >
                                {SECTORS.map(s => s.id === activeSector && (
                                    <div key={s.id} className="space-y-6">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-1">{s.name}</h3>
                                            <span className={`font-mono text-xs px-2 py-0.5 ${s.status === 'SECURE' ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'}`}>
                                                STATUS: {s.status}
                                            </span>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <div className="bg-white/5 p-3 rounded border border-white/10">
                                                <div className="text-[10px] text-gray-500 mb-1">OCCUPANCY</div>
                                                <div className="w-full bg-gray-700 h-1"><div className="bg-white h-full" style={{width: '45%'}}></div></div>
                                            </div>
                                            <div className="bg-white/5 p-3 rounded border border-white/10">
                                                <div className="text-[10px] text-gray-500 mb-1">CAMERA FEED</div>
                                                <div className="text-xs font-mono text-red-500 animate-pulse">● RECORDING</div>
                                            </div>
                                        </div>

                                        <p className="font-mono text-[10px] text-gray-400 leading-relaxed">
                                            Sector analysis complete. Structural integrity at 98%. No unauthorized heat signatures detected in immediate vicinity.
                                        </p>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default TacticalMap;