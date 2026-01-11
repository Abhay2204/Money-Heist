import React from 'react';

interface DaliMaskProps {
    className?: string;
    fill?: string;
    stroke?: string;
}

export const DaliMask: React.FC<DaliMaskProps> = ({ 
    className, 
    fill = "#F3F3F3", 
    stroke = "black" 
}) => (
  <svg viewBox="0 0 200 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Hood/Outline */}
    <path d="M100 10C50 10 20 60 20 120C20 200 50 260 100 290C150 260 180 200 180 120C180 60 150 10 100 10Z" fill="#BF0904" stroke={stroke} strokeWidth="2"/>
    
    {/* Face Shape */}
    <path d="M40 100C40 100 60 250 100 270C140 250 160 100 160 100C160 60 140 40 100 40C60 40 40 60 40 100Z" fill={fill} />
    
    {/* Eyes */}
    <path d="M60 110Q75 100 90 110" stroke={stroke} strokeWidth="3" fill="none"/>
    <path d="M110 110Q125 100 140 110" stroke={stroke} strokeWidth="3" fill="none"/>
    <circle cx="75" cy="115" r="5" fill={stroke}/>
    <circle cx="125" cy="115" r="5" fill={stroke}/>
    
    {/* Mustache */}
    <path d="M50 180 C70 180 90 160 100 160 C110 160 130 180 150 180 C150 170 160 150 170 150" stroke={stroke} strokeWidth="4" fill="none" strokeLinecap="round"/>
    <path d="M30 150 C40 150 50 170 50 180" stroke={stroke} strokeWidth="4" fill="none" strokeLinecap="round"/>

    {/* Nose */}
    <path d="M90 120L95 150L85 155M110 120L105 150L115 155" stroke={stroke} strokeWidth="1"/>
    
    {/* Mouth */}
    <path d="M80 200 Q100 210 120 200" stroke={stroke} strokeWidth="2" fill="none"/>
  </svg>
);