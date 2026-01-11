import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TimelineEvent } from '../types';

gsap.registerPlugin(ScrollTrigger);

const EVENTS: TimelineEvent[] = [
  { id: '1', phase: 'HOUR 0', title: 'INFILTRATION', description: 'Entry via supply transport. Neutralize security. Seal exits.', time: 'START' },
  { id: '2', phase: 'HOUR 1', title: 'THE HOSTAGES', description: 'Red jumpsuits. Dali masks. Confusion is our primary defense.', time: 'CONTROL' },
  { id: '3', phase: 'HOUR 5', title: 'ANALOG', description: 'Cut landlines. Hack wireless. We go dark. No digital footprint.', time: 'BLACKOUT' },
  { id: '4', phase: 'HOUR 20', title: 'PRINTING', description: 'The machines start. 8 Million Euros per hour. Continuous cycle.', time: 'PRODUCTION' },
  { id: '5', phase: 'DAY 3', title: 'THE PUBLIC', description: 'Win their hearts. We are not thieves, we are the resistance.', time: 'PROPAGANDA' },
  { id: '6', phase: 'DAY 5', title: 'ESCAPE', description: 'The tunnel is ready. 2.4 Billion. Vanish into thin air.', time: 'FREEDOM' },
];

const HeistTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollAmount = () => {
          return -(track.scrollWidth - window.innerWidth);
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden flex flex-col justify-center border-y border-[#222]">
       
       <div className="absolute top-12 left-12 z-20">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 border border-[#BF0904] flex items-center justify-center">
                 <span className="font-mono text-[#BF0904] text-xs">01</span>
             </div>
             <h2 className="text-3xl font-black uppercase tracking-tighter text-white">The Timeline</h2>
          </div>
       </div>

       {/* Horizontal Track */}
       <div ref={trackRef} className="flex h-[70vh] items-center pl-[10vw] pr-[10vw] w-max gap-[10vw]">
          {EVENTS.map((event, i) => (
             <div key={event.id} className="w-[80vw] md:w-[35vw] flex-shrink-0 relative group">
                
                {/* Phase Number Background */}
                <div className="absolute -top-20 -left-10 text-[10rem] font-black text-[#151515] select-none pointer-events-none z-0">
                    {i + 1}
                </div>

                <div className="relative z-10 border-l border-[#BF0904] pl-6 py-4">
                   <div className="inline-block bg-[#BF0904] text-black font-bold font-mono text-xs px-2 py-1 mb-4">
                       {event.phase}
                   </div>
                   
                   <h3 className="text-5xl md:text-6xl font-black uppercase mb-4 leading-[0.9] text-white group-hover:text-red-500 transition-colors duration-300">
                       {event.title}
                   </h3>
                   
                   <div className="bg-[#111] p-6 border border-white/10 max-w-md">
                       <p className="font-mono text-sm text-gray-400 leading-relaxed">
                           {event.description}
                       </p>
                       <div className="mt-4 flex justify-between items-center border-t border-white/5 pt-4">
                           <span className="text-[10px] text-[#555] font-mono">STATUS</span>
                           <span className="text-xs font-bold text-white tracking-widest">{event.time}</span>
                       </div>
                   </div>
                </div>

                {/* Connection Line */}
                <div className="absolute top-1/2 left-full w-[10vw] h-[1px] bg-white/10 -translate-y-1/2"></div>
             </div>
          ))}

          {/* End Cap */}
          <div className="w-[50vw] flex items-center justify-center">
              <div className="text-center p-12 border border-[#BF0904] bg-[#BF0904]/10">
                  <h3 className="text-4xl font-black text-white mb-2">END OF LOG</h3>
                  <p className="font-mono text-xs text-[#BF0904]">RECORDING TERMINATED</p>
              </div>
          </div>
       </div>
    </div>
  );
};

export default HeistTimeline;