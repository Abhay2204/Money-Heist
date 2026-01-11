import React from 'react';

const NoiseOverlay: React.FC = () => {
  return (
    <>
      <div className="noise-bg" />
      <div className="scanline" />
      <div className="fixed top-4 left-4 z-50 text-[10px] text-[#BF0904] opacity-70 font-mono">
        REC [●] {new Date().toLocaleTimeString()}
      </div>
      <div className="fixed bottom-4 right-4 z-50 text-[10px] text-[#D4AF37] opacity-70 font-mono">
        ROYAL MINT OF SPAIN /// SECURITY LEVEL: MAX
      </div>
    </>
  );
};

export default NoiseOverlay;