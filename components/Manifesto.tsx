import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Manifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray('.manifesto-line');
      
      gsap.fromTo(lines, 
        { 
          y: 100, 
          opacity: 0,
          rotateX: 45
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full py-32 bg-[#f3f3f3] text-[#090909] flex flex-col items-center justify-center overflow-hidden">
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply" 
             style={{backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")`}}>
        </div>

        <div ref={textRef} className="relative z-10 max-w-5xl px-6 text-center">
            <h2 className="manifesto-line text-2xl md:text-4xl font-bold mb-4 text-[#BF0904] uppercase tracking-widest">The Manifesto</h2>
            
            <div className="space-y-2 md:space-y-6">
                <p className="manifesto-line text-4xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter">
                    We are not stealing
                </p>
                <p className="manifesto-line text-4xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter text-transparent" style={{ WebkitTextStroke: '2px #090909'}}>
                    from anyone.
                </p>
                <p className="manifesto-line text-2xl md:text-4xl font-mono mt-8 bg-black text-white inline-block px-4 py-2">
                    We are taking back what is ours.
                </p>
                <p className="manifesto-line text-xl md:text-2xl font-serif italic mt-8 max-w-2xl mx-auto text-gray-600">
                    "In the year 2011, the European Central Bank made 171 billion euros out of nowhere. Just like we are doing. Only bigger."
                </p>
            </div>

            <div className="manifesto-line mt-16 flex justify-center">
                 <div className="w-16 h-16 border-4 border-[#BF0904] rounded-full flex items-center justify-center animate-spin-slow">
                    <span className="text-[#BF0904] font-black text-xl">X</span>
                 </div>
            </div>
        </div>
    </div>
  );
};

export default Manifesto;