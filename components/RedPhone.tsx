import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MESSAGES = [
    "Professor: Stick to the plan. No deviations.",
    "Professor: The police are listening. Stay calm.",
    "Professor: Initiate Protocol 'Valencia'.",
    "Professor: Are you watching the cameras? Good.",
    "Professor: Time is money. Literally."
];

const RedPhone: React.FC = () => {
    const [ringing, setRinging] = useState(false);
    const [active, setActive] = useState(false);
    const [message, setMessage] = useState("");

    // Random ringing effect
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!active) setRinging(true);
        }, 5000 + Math.random() * 10000);
        return () => clearTimeout(timeout);
    }, [active, ringing]);

    const handleAnswer = () => {
        setRinging(false);
        setActive(true);
        setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
        
        // Auto hangup
        setTimeout(() => {
            setActive(false);
        }, 4000);
    };

    return (
        <div className="fixed bottom-8 left-8 z-50">
            <AnimatePresence>
                {active && (
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="absolute bottom-20 left-0 w-64 bg-[#090909] border border-[#BF0904] p-4 rounded-tr-xl shadow-2xl"
                    >
                        <div className="flex items-center gap-2 mb-2">
                             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                             <span className="text-xs font-mono text-gray-500">ENCRYPTED LINE // UNKNOWN ID</span>
                        </div>
                        <p className="font-mono text-sm text-white">{message}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <button 
                onClick={handleAnswer}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${ringing ? 'bg-[#BF0904] animate-shake' : 'bg-[#222] hover:bg-[#333]'}`}
            >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.057 15.057 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1.01A11.36 11.36 0 018.59 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM12 3v10l3-3h6V3h-9z"/>
                </svg>
            </button>
            <style>{`
                @keyframes shake {
                    0% { transform: translate(1px, 1px) rotate(0deg); }
                    10% { transform: translate(-1px, -2px) rotate(-1deg); }
                    20% { transform: translate(-3px, 0px) rotate(1deg); }
                    30% { transform: translate(3px, 2px) rotate(0deg); }
                    40% { transform: translate(1px, -1px) rotate(1deg); }
                    50% { transform: translate(-1px, 2px) rotate(-1deg); }
                    60% { transform: translate(-3px, 1px) rotate(0deg); }
                    70% { transform: translate(3px, 1px) rotate(-1deg); }
                    80% { transform: translate(-1px, -1px) rotate(1deg); }
                    90% { transform: translate(1px, 2px) rotate(0deg); }
                    100% { transform: translate(1px, -2px) rotate(-1deg); }
                }
                .animate-shake {
                    animation: shake 0.5s infinite;
                }
            `}</style>
        </div>
    );
};

export default RedPhone;