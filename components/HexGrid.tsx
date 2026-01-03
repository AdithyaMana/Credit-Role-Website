import React from 'react';
import Hexagon from './Hexagon';
import { CreditRole, CategoryType } from '../types';
import { creditRoles } from '../data/roles';
import clsx from 'clsx';

interface HexGridProps {
  selectedId: string | null;
  onSelect: (role: CreditRole) => void;
  onHover: (role: CreditRole) => void;
}

// Reusable Label Component with Connector Line
const ConnectorLabel: React.FC<{ 
  text: string; 
  position: string; 
  colorClass: string; 
  lineType: 'top-down' | 'bottom-up' | 'left-right' | 'right-left';
}> = ({ text, position, colorClass, lineType }) => {
  
  // Define SVG paths for different connector types
  const renderLine = () => {
    // Increased opacity slightly for visibility of pastel lines
    const strokeClass = `stroke-current ${colorClass} opacity-40`;
    switch(lineType) {
      case 'top-down':
        return (
          <svg className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-[1px] h-8 overflow-visible">
            <line x1="0" y1="0" x2="0" y2="100%" strokeWidth="1" className={strokeClass} />
            <circle cx="0" cy="100%" r="2" className={`fill-current ${colorClass} opacity-60`} />
          </svg>
        );
      case 'bottom-up':
        return (
          <svg className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 w-[1px] h-8 overflow-visible">
            <line x1="0" y1="100%" x2="0" y2="0" strokeWidth="1" className={strokeClass} />
            <circle cx="0" cy="0" r="2" className={`fill-current ${colorClass} opacity-60`} />
          </svg>
        );
      case 'right-left':
        return (
          <svg className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-8 h-[1px] overflow-visible">
            <line x1="0" y1="0" x2="100%" y2="0" strokeWidth="1" className={strokeClass} />
            <circle cx="0" cy="0" r="2" className={`fill-current ${colorClass} opacity-60`} />
          </svg>
        );
      case 'left-right':
        return (
          <svg className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-8 h-[1px] overflow-visible">
            <line x1="0" y1="0" x2="100%" y2="0" strokeWidth="1" className={strokeClass} />
            <circle cx="100%" cy="0" r="2" className={`fill-current ${colorClass} opacity-60`} />
          </svg>
        );
    }
  };

  return (
    <div className={clsx(
      "absolute flex flex-col items-center justify-center pointer-events-none z-0",
      position
    )}>
      <span className={clsx(
        "text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] whitespace-nowrap bg-white/50 backdrop-blur-sm px-1 py-0.5 rounded", 
        colorClass
      )}>
        {text}
      </span>
      {renderLine()}
    </div>
  );
};

const HexGrid: React.FC<HexGridProps> = ({ selectedId, onSelect, onHover }) => {
  const sortedRoles = [
    ...creditRoles.filter(r => r.category === CategoryType.STRATEGY),
    ...creditRoles.filter(r => r.category === CategoryType.INVESTIGATION),
    ...creditRoles.filter(r => r.category === CategoryType.INFRASTRUCTURE),
    ...creditRoles.filter(r => r.category === CategoryType.DISSEMINATION),
  ];

  const hexWidth = 110; 
  const marginBottom = -32; 
  
  const row1 = sortedRoles.slice(0, 2);   
  const row2 = sortedRoles.slice(2, 5);   
  const row3 = sortedRoles.slice(5, 9);   
  const row4 = sortedRoles.slice(9, 12);  
  const row5 = sortedRoles.slice(12, 14); 

  return (
    <div className="relative flex flex-col items-center justify-center py-20 px-4 select-none">
      
      {/* Strategy: Top Center (Row 1) */}
      <ConnectorLabel 
        text="Strategy & Leadership" 
        position="top-6 left-1/2 -translate-x-1/2"
        colorClass="text-indigo-500"
        lineType="top-down"
      />
      
      {/* Investigation: Right Side (Row 3 - Middle) */}
      <ConnectorLabel 
        text="Investigation" 
        position="top-1/2 right-2 md:-right-12 translate-x-full -translate-y-1/2"
        colorClass="text-teal-500"
        lineType="right-left"
      />

      {/* Infrastructure: Left Side (Row 4) 
          Positioned relative to center to hug the narrower row perfectly.
          Row 4 vertical center is approx 64% down the container.
      */}
      <ConnectorLabel 
        text="Infrastructure" 
        position="top-[64%] left-[calc(50%-210px)] -translate-x-full -translate-y-1/2"
        colorClass="text-slate-500"
        lineType="left-right"
      />

       {/* Dissemination: Bottom Center (Row 5) */}
       <ConnectorLabel 
        text="Dissemination" 
        position="bottom-6 left-1/2 -translate-x-1/2"
        colorClass="text-orange-500"
        lineType="bottom-up"
      />

      <div className="flex gap-1.5" style={{ marginBottom }}>
        {row1.map(role => (
          <Hexagon key={role.id} role={role} isActive={selectedId === role.id} onClick={onSelect} onHover={onHover} width={hexWidth} />
        ))}
      </div>

      <div className="flex gap-1.5" style={{ marginBottom }}>
        {row2.map(role => (
          <Hexagon key={role.id} role={role} isActive={selectedId === role.id} onClick={onSelect} onHover={onHover} width={hexWidth} />
        ))}
      </div>

      <div className="flex gap-1.5" style={{ marginBottom }}>
        {row3.map(role => (
          <Hexagon key={role.id} role={role} isActive={selectedId === role.id} onClick={onSelect} onHover={onHover} width={hexWidth} />
        ))}
      </div>

      <div className="flex gap-1.5" style={{ marginBottom }}>
        {row4.map(role => (
          <Hexagon key={role.id} role={role} isActive={selectedId === role.id} onClick={onSelect} onHover={onHover} width={hexWidth} />
        ))}
      </div>

       <div className="flex gap-1.5">
        {row5.map(role => (
          <Hexagon key={role.id} role={role} isActive={selectedId === role.id} onClick={onSelect} onHover={onHover} width={hexWidth} />
        ))}
      </div>
      
    </div>
  );
};

export default HexGrid;