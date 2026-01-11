import React from 'react';
import { motion } from 'framer-motion';

// Redesigned Data Structure - No Images
const CREW_DATA = [
  { id: '1', codename: 'TOKYO', role: 'NARRATOR / ASSAULT', location: 'UNKNOWN', status: 'K.I.A', skills: ['CQC', 'Infiltration'] },
  { id: '2', codename: 'BERLIN', role: 'FIELD COMMAND', location: 'ROYAL MINT', status: 'K.I.A', skills: ['Strategy', 'Psychology'] },
  { id: '3', codename: 'PROFESSOR', role: 'MASTERMIND', location: 'HANGAR', status: 'ACTIVE', skills: ['Intelligence', 'Negotiation'] },
  { id: '4', codename: 'NAIROBI', role: 'COUNTERFEITING', location: 'PRODUCTION', status: 'K.I.A', skills: ['Quality Control', 'Leadership'] },
  { id: '5', codename: 'RIO', role: 'CYBER SECURITY', location: 'COMMS', status: 'ACTIVE', skills: ['Hacking', 'Encryption'] },
  { id: '6', codename: 'DENVER', role: 'ENFORCER', location: 'LOBBY', status: 'ACTIVE', skills: ['Combat', 'Intimidation'] },
  { id: '7', codename: 'HELSINKI', role: 'HEAVY WEAPONS', location: 'PERIMETER', status: 'ACTIVE', skills: ['Defense', 'Demolition'] },
  { id: '8', codename: 'LISBON', role: 'NEGOTIATOR', location: 'COMMAND', status: 'ACTIVE', skills: ['Police Protocol', 'Tactics'] },
];

const CrewFile: React.FC<{ data: typeof CREW_DATA[0]; index: number }> = ({ data, index }) => {
  return (
    <motion.div 
        className="group relative bg-[#111] border border-[#222] hover:border-[#BF0904] p-6 transition-colors duration-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
    >
        {/* Top Label */}
        <div className="flex justify-between items-start mb-6">
            <span className="font-mono text-[10px] text-gray-600">FILE_ID: 00{index + 1}_AX</span>
            <div className={`text-[10px] font-bold px-2 py-1 border ${data.status === 'K.I.A' ? 'border-red-900 text-red-900' : 'border-green-900 text-green-900'}`}>
                {data.status}
            </div>
        </div>

        {/* Codename */}
        <h3 className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter group-hover:translate-x-2 transition-transform duration-300">
            {data.codename}
        </h3>
        
        <div className="w-full h-[1px] bg-[#BF0904] opacity-50 mb-6 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 font-mono text-xs">
            <div>
                <p className="text-gray-500 mb-1">ROLE</p>
                <p className="text-white font-bold">{data.role}</p>
            </div>
            <div>
                <p className="text-gray-500 mb-1">LAST KNOWN LOC</p>
                <p className="text-white font-bold tracking-widest">{data.location}</p>
            </div>
            <div className="col-span-2">
                <p className="text-gray-500 mb-2">SPECIALTIES</p>
                <div className="flex gap-2">
                    {data.skills.map(skill => (
                        <span key={skill} className="bg-[#222] text-gray-300 px-2 py-1">{skill}</span>
                    ))}
                </div>
            </div>
        </div>

        {/* Decorative Stamp */}
        <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
            <div className="w-24 h-24 border-4 border-white rounded-full flex items-center justify-center transform -rotate-12">
                <span className="font-black text-xl">WANTED</span>
            </div>
        </div>
    </motion.div>
  );
};

const CrewGrid: React.FC = () => {
  return (
    <div className="w-full bg-[#050505] py-32 px-4 md:px-12 border-t border-[#222]">
      <div className="max-w-7xl mx-auto">
          <div className="mb-16 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-end">
             <div>
                <span className="text-[#BF0904] font-mono text-xs tracking-[0.3em] block mb-2">INTERPOL RED NOTICES</span>
                <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
                    The Gang
                </h2>
             </div>
             <p className="font-mono text-gray-500 text-xs max-w-sm mt-4 md:mt-0">
                 WARNING: ALL SUBJECTS CONSIDERED ARMED AND EXTREMELY DANGEROUS. DO NOT APPROACH.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {CREW_DATA.map((member, index) => (
                <CrewFile key={member.id} data={member} index={index} />
            ))}
          </div>
      </div>
    </div>
  );
};

export default CrewGrid;