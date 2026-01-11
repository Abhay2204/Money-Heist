import React, { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import IntroSplash from './components/IntroSplash';
import NoiseOverlay from './components/ui/NoiseOverlay';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto'; 
import HeistTimeline from './components/HeistTimeline'; 
import ProfessorsDesk from './components/ProfessorsDesk';
import CCTVGrid from './components/CCTVGrid';
import CrewGrid from './components/CrewGrid';
import VaultDial from './components/VaultDial';
import RedPhone from './components/RedPhone';
import MoneyPrinter from './components/MoneyPrinter';
import NegotiationTerminal from './components/NegotiationTerminal';

// Register ScrollTrigger 
gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // Correct configuration for Lenis v1
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;
    
    // Ensure we start Lenis regardless, but maybe lock if intro is running
    if (!introComplete) {
      lenisRef.current.stop(); 
    } else {
      lenisRef.current.start();
      // Force a refresh to ensure GSAP knows about new DOM heights
      ScrollTrigger.refresh();
    }
  }, [introComplete]);

  return (
    <div className="relative bg-[#090909] text-white selection:bg-[#BF0904] selection:text-white font-sans min-h-screen overflow-hidden">
      
      {/* Remove the IntroSplash conditional if you want to debug scroll immediately */}
      {!introComplete && <IntroSplash onComplete={() => setIntroComplete(true)} />}
      
      <NoiseOverlay />
      <RedPhone />
      
      <header 
        className={`fixed top-0 left-0 w-full p-6 z-40 flex justify-between items-center mix-blend-difference pointer-events-none transition-opacity duration-1000 ${introComplete ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="text-2xl font-black tracking-tighter pointer-events-auto text-white uppercase">LCDP <span className="text-[#BF0904]">///</span></div>
        <nav className="hidden md:flex gap-8 font-mono text-[10px] tracking-widest pointer-events-auto">
            <button onClick={() => lenisRef.current?.scrollTo('#hero')} className="hover:text-[#BF0904] transition-colors">START</button>
            <button onClick={() => lenisRef.current?.scrollTo('#plan')} className="hover:text-[#BF0904] transition-colors">PLAN</button>
            <button onClick={() => lenisRef.current?.scrollTo('#printer')} className="hover:text-[#BF0904] transition-colors">MINT</button>
            <button onClick={() => lenisRef.current?.scrollTo('#crew')} className="hover:text-[#BF0904] transition-colors">CREW</button>
        </nav>
      </header>

      {/* Main Content Wrapper */}
      <div className={`w-full transition-opacity duration-1000 ${introComplete ? 'opacity-100' : 'opacity-0'}`}>
        
        <section id="hero">
            <Hero />
        </section>

        <section id="manifesto">
            <Manifesto />
        </section>

        <section id="plan" className="relative z-10">
            <HeistTimeline />
        </section>

        {/* New Section: The Negotiation */}
        <section id="negotiation">
            <NegotiationTerminal />
        </section>

        <section id="desk">
            <ProfessorsDesk />
        </section>

        {/* New Section: The Money Printer */}
        <section id="printer">
            <MoneyPrinter />
        </section>

        <section id="surveillance">
            <CCTVGrid />
        </section>

        <section id="crew">
            <CrewGrid />
        </section>

        <section id="vault">
            <VaultDial />
        </section>

        <footer className="w-full py-24 text-center bg-black text-white/40 font-mono text-xs border-t border-white/5 relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center">
                <p className="mb-4 text-[#BF0904] text-xl font-bold italic">"O Bella Ciao, Bella Ciao, Bella Ciao Ciao Ciao"</p>
                <div className="w-12 h-1 bg-[#BF0904] mb-8"></div>
                <p className="tracking-widest opacity-50">LA CASA DE PAPEL</p>
                <p className="mt-2 text-[10px] opacity-30">RESISTANCE GLOBAL NETWORK</p>
            </div>
        </footer>
      </div>
    </div>
  );
};

export default App;