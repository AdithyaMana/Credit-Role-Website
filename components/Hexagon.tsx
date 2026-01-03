import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditRole, CategoryType } from '../types';
import clsx from 'clsx';

interface HexagonProps {
  role: CreditRole;
  isActive: boolean;
  onClick: (role: CreditRole) => void;
  onHover: (role: CreditRole) => void;
  width?: number;
}

// Pastel Palette (Idle Backgrounds)
const CATEGORY_COLORS = {
  [CategoryType.STRATEGY]: '#A5B4FC', // Indigo 300
  [CategoryType.INVESTIGATION]: '#5EEAD4', // Teal 300
  [CategoryType.INFRASTRUCTURE]: '#CBD5E1', // Slate 300
  [CategoryType.DISSEMINATION]: '#FDBA74', // Orange 300
};

// Bold Palette (Hover/Active Backgrounds - 400 versions)
const CATEGORY_BOLD_COLORS = {
  [CategoryType.STRATEGY]: '#818CF8',      // Indigo 400
  [CategoryType.INVESTIGATION]: '#2DD4BF', // Teal 400
  [CategoryType.INFRASTRUCTURE]: '#94A3B8',// Slate 400
  [CategoryType.DISSEMINATION]: '#FB923C', // Orange 400
};

const Hexagon: React.FC<HexagonProps> = ({ role, isActive, onClick, onHover, width = 120 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = role.icon;
  
  const baseColor = CATEGORY_COLORS[role.category];
  const boldColor = CATEGORY_BOLD_COLORS[role.category];
  
  // Height based on aspect ratio of the viewbox (100:115)
  const height = width * 1.15;

  // Show label logic: only when hovered or active
  const showLabel = isActive || isHovered;
  
  // Design Logic:
  // Idle: Pastel Grid (Category Color Tint). Text is Slate-500.
  // Active/Hover: Bold Color Fill. Text is White.
  
  const contentColorClass = (isActive || isHovered) ? "text-white font-medium" : "text-slate-500";

  const pathVariants = {
    idle: { 
      fill: baseColor,
      fillOpacity: 0.25, // Visible pastel tint
      stroke: baseColor, 
      strokeWidth: 1.5, 
      strokeOpacity: 0.8
    },
    hover: { 
      fill: boldColor,
      fillOpacity: 1, 
      stroke: boldColor, 
      strokeWidth: 0,
      strokeOpacity: 1
    },
    active: { 
      fill: boldColor,
      fillOpacity: 1, 
      stroke: boldColor, 
      strokeWidth: 0, 
      strokeOpacity: 1
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(role);
    }
  };

  return (
    <motion.div
      className="relative flex items-center justify-center cursor-pointer select-none group outline-none focus:ring-4 focus:ring-indigo-500/50 rounded-full"
      style={{ width: width, height: height }}
      onClick={() => onClick(role)}
      onMouseEnter={() => { setIsHovered(true); onHover(role); }}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => { setIsHovered(true); onHover(role); }}
      onBlur={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${role.title} - ${role.category}`}
      aria-pressed={isActive}
      whileHover={{ scale: 1.05, zIndex: 30 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: isActive ? 1.05 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Active State Outer Ring - Subtle Expansion */}
      {isActive && (
         <motion.div 
           layoutId="active-ring"
           className="absolute inset-0 z-0"
           initial={{ opacity: 0, scale: 1 }}
           animate={{ opacity: 1, scale: 1.1 }}
           transition={{ duration: 0.2 }}
         >
           <svg viewBox="0 0 100 115" className="w-full h-full overflow-visible">
             <path 
               transform="translate(0, 7.5)"
               d="M50 0 L93.3 25 V75 L50 100 L6.7 75 V25 Z" 
               fill="none" 
               stroke={boldColor} 
               strokeWidth="2" 
               strokeOpacity="0.3"
             />
           </svg>
         </motion.div>
      )}

      <svg
        viewBox="0 0 100 115"
        className="absolute inset-0 w-full h-full overflow-visible z-10"
      >
        {/* Centered Hexagon Path */}
        <motion.path
          transform="translate(0, 7.5)"
          d="M50 0 L93.3 25 V75 L50 100 L6.7 75 V25 Z"
          variants={pathVariants}
          initial="idle"
          animate={isActive ? "active" : isHovered ? "hover" : "idle"}
          transition={{ duration: 0.2 }}
        />
      </svg>
      
      {/* Content Container */}
      <div className={clsx(
        "absolute inset-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none transition-colors duration-200",
        contentColorClass
      )}
      >
        {/* Icon */}
        <motion.div
           animate={{ y: showLabel ? -8 : 0, scale: showLabel ? 1 : 1 }}
           transition={{ type: "spring", stiffness: 300, damping: 30 }}
           className="relative z-10"
        >
          <Icon 
            size={width * 0.32} 
            strokeWidth={isActive || isHovered ? 2 : 1.5} 
            className="transition-colors duration-200"
          />
        </motion.div>
        
        {/* Title */}
        <motion.div
           className="absolute left-0 right-0 flex justify-center items-center px-4"
           style={{ top: '55%' }} 
           initial={{ opacity: 0, y: 5 }}
           animate={{ 
             opacity: showLabel ? 1 : 0, 
             y: showLabel ? 10 : 5,
           }}
           transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <span className={clsx(
            "uppercase font-sans font-bold transition-colors duration-200 break-words hyphens-auto leading-[1.1] text-[8px]",
            contentColorClass
          )}>
            {role.title}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hexagon;