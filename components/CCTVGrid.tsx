import React, { useState, useEffect } from 'react';

const CCTVFeed: React.FC<{ label: string; image: string; glitch?: boolean }> = ({ label, image, glitch }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-48 md:h-64 bg-black overflow-hidden border border-[#222] group hover:border-red-900/50 transition-colors">
      {/* Feed Image */}
      <div 
        className={`w-full h-full bg-cover bg-center opacity-60 grayscale contrast-125 group-hover:contrast-100 transition-all duration-300 ${glitch ? 'animate-glitch' : ''}`}
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* CSS Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>

      {/* UI Overlay */}
      <div className="absolute top-2 left-2 flex flex-col z-20">
        <div className="flex items-center gap-1 mb-1">
             <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
             <span className="text-red-600 font-mono text-[9px] font-bold bg-black/80 px-1">REC</span>
        </div>
        <span className="text-white/80 font-mono text-[9px] bg-black/40 px-1">{label}</span>
      </div>
      
      <div className="absolute bottom-2 right-2 text-white/60 font-mono text-[9px] z-20 bg-black/40 px-1">
        {time}
      </div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-pulse pointer-events-none"></div>
    </div>
  );
};

const CCTVGrid: React.FC = () => {
  return (
    <div className="w-full bg-[#080808] py-24 px-4 md:px-12 border-t border-[#222]">
      <div className="flex justify-between items-end mb-12">
         <div>
            <h2 className="text-white text-3xl font-bold uppercase tracking-tight flex items-center gap-3">
                <span className="w-4 h-4 border-2 border-red-600 rounded-full flex items-center justify-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                </span>
                Live Surveillance
            </h2>
            <div className="h-0.5 w-24 bg-red-800 mt-2"></div>
         </div>
         <span className="font-mono text-[10px] text-gray-500 hidden md:block">ROYAL MINT // INTERNAL SERVER ACCESS</span>
      </div>

      {/* Reliable Images from Unsplash Static IDs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 border border-[#222] bg-[#111] p-1">
         <CCTVFeed label="MAIN_LOBBY" image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600" />
         <CCTVFeed label="SERVER_ROOM" image="https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=600" glitch={true} />
         <CCTVFeed label="VAULT_ACCESS" image="https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&q=80&w=600" />
         <CCTVFeed label="ROOF_PERIMETER" image="https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?auto=format&fit=crop&q=80&w=600" />
      </div>
      
      <div className="mt-4 flex justify-between items-center font-mono text-[9px] text-gray-600">
          <span>IP: 192.168.0.X [MASKED]</span>
          <span className="text-red-800 animate-pulse">WARNING: SIGNAL INTERFERENCE DETECTED</span>
      </div>

      <style>{`
        @keyframes glitch {
          0% { transform: translate(0) }
          20% { transform: translate(-2px, 2px) }
          40% { transform: translate(-2px, -2px) }
          60% { transform: translate(2px, 2px) }
          80% { transform: translate(2px, -2px) }
          100% { transform: translate(0) }
        }
        .animate-glitch { animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite; }
      `}</style>
    </div>
  );
};

export default CCTVGrid;