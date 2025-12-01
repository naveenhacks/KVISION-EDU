import React from 'react';

interface LogoProps {
  className?: string;
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10", animated = false }) => {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_15px_rgba(112,0,255,0.6)]">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7000ff" />
            <stop offset="50%" stopColor="#00f3ff" />
            <stop offset="100%" stopColor="#ff00aa" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Rotating Outer Hexagon Ring */}
        <g className={animated ? "animate-[spin_10s_linear_infinite]" : ""} style={{ transformOrigin: '50px 50px' }}>
          <path 
            d="M50 5 L89 27.5 L89 72.5 L50 95 L11 72.5 L11 27.5 Z" 
            stroke="url(#logoGradient)" 
            strokeWidth="2" 
            strokeDasharray="10 5"
            fill="none"
            opacity="0.6"
          />
        </g>

        {/* Inner Solid Hexagon Background */}
        <path 
          d="M50 15 L80 32.5 V67.5 L50 85 L20 67.5 V32.5 Z" 
          fill="rgba(3, 0, 20, 0.8)"
          stroke="#7000ff"
          strokeWidth="1"
        />

        {/* Tech Accents */}
        <circle cx="50" cy="15" r="2" fill="#00f3ff" className="animate-pulse" />
        <circle cx="50" cy="85" r="2" fill="#ff00aa" className="animate-pulse" style={{ animationDelay: '1s' }} />

        {/* The Stylized 'K' */}
        <path 
          d="M38 35 V65 M38 50 L62 35 M38 50 L62 65" 
          stroke="white" 
          strokeWidth="5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          filter="url(#glow)"
        />

        {/* The 'Vision' Dot */}
        <circle cx="62" cy="50" r="3" fill="#00f3ff" filter="url(#glow)">
          <animate attributeName="opacity" values="0.5;1;0.5" duration="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
};

export default Logo;