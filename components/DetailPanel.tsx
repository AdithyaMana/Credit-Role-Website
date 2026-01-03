import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditRole, CategoryType } from '../types';
import clsx from 'clsx';
import { Info, Hexagon as HexIcon, CheckCircle } from 'lucide-react';

interface DetailPanelProps {
  role: CreditRole | null;
}

const getCategoryColorText = (category: CategoryType) => {
  // Using 500/600 scale for text to match pastel vibe but keep readability
  switch (category) {
    case CategoryType.STRATEGY: return 'text-indigo-500';
    case CategoryType.INVESTIGATION: return 'text-teal-500';
    case CategoryType.INFRASTRUCTURE: return 'text-slate-500';
    case CategoryType.DISSEMINATION: return 'text-orange-500';
    default: return 'text-slate-500';
  }
};

const getHexStyles = (category: CategoryType) => {
  // Softer fills and strokes
  switch (category) {
    case CategoryType.STRATEGY: 
      return { fill: 'fill-indigo-50', stroke: 'stroke-indigo-200', text: 'text-indigo-500', marker: 'text-indigo-400' };
    case CategoryType.INVESTIGATION: 
      return { fill: 'fill-teal-50', stroke: 'stroke-teal-200', text: 'text-teal-500', marker: 'text-teal-400' };
    case CategoryType.INFRASTRUCTURE: 
      return { fill: 'fill-slate-100', stroke: 'stroke-slate-300', text: 'text-slate-500', marker: 'text-slate-400' };
    case CategoryType.DISSEMINATION: 
      return { fill: 'fill-orange-50', stroke: 'stroke-orange-200', text: 'text-orange-500', marker: 'text-orange-400' };
    default: 
      return { fill: 'fill-slate-50', stroke: 'stroke-slate-200', text: 'text-slate-500', marker: 'text-slate-400' };
  }
};

const DetailPanel: React.FC<DetailPanelProps> = ({ role }) => {
  const hexStyles = role ? getHexStyles(role.category) : null;

  return (
    <div className="h-full w-full flex flex-col relative bg-white border-l border-slate-200/60 z-40 shadow-[0_0_40px_rgba(0,0,0,0.05)]">
      
      {/* Decorative Top Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-slate-200 via-slate-100 to-white opacity-50" />

      <div className="flex-1 flex flex-col p-8 lg:p-12 xl:p-16 overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="wait">
          {role && hexStyles ? (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col items-start text-left gap-8 max-w-lg mx-auto lg:mx-0 my-auto"
            >
              {/* Header Badge Group */}
              <div className="flex flex-col items-start gap-6 w-full">
                 <div className="flex items-center gap-3">
                   {/* Category Pill */}
                   <span className={clsx(
                     "px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-[0.15em] border bg-white shadow-sm",
                     getCategoryColorText(role.category).replace('text-', 'border-').replace('500', '200'),
                     getCategoryColorText(role.category)
                   )}>
                     {role.category}
                   </span>
                 </div>

                 {/* Icon Container - Hexagon Shape */}
                 <div className={clsx(
                   "relative flex items-center justify-center w-28 h-32 flex-shrink-0 transition-colors duration-300",
                   hexStyles.text
                 )}>
                    <svg viewBox="0 0 100 115" className="absolute inset-0 w-full h-full overflow-visible">
                        <path 
                          transform="translate(0, 7.5)"
                          d="M50 0 L93.3 25 V75 L50 100 L6.7 75 V25 Z" 
                          className={clsx(
                            "transition-colors duration-300",
                            hexStyles.fill,
                            hexStyles.stroke
                          )}
                          strokeWidth="2"
                        />
                    </svg>
                    <role.icon 
                      size={48} 
                      strokeWidth={1.5}
                      className="relative z-10 text-slate-500"
                    />
                 </div>
              </div>

              {/* Title */}
              <h2 className="text-3xl lg:text-4xl font-bold font-sans text-slate-800 tracking-tight leading-none">
                {role.title}
              </h2>

              {/* Divider */}
              <div className="w-12 h-1 bg-slate-100 rounded-full"></div>

              {/* Description */}
              <div className="space-y-3 w-full">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Info size={12} />
                  Role Definition
                </h3>
                <p className="text-xl md:text-2xl font-serif leading-relaxed text-slate-600 antialiased">
                  {role.description}
                </p>
              </div>

              {/* Examples Section */}
              {role.examples && role.examples.length > 0 && (
                <div className="space-y-4 w-full pt-4 border-t border-slate-50">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <CheckCircle size={12} />
                    Key Activities
                  </h3>
                  <ul className="space-y-3">
                    {role.examples.map((example, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-600 font-serif text-lg leading-snug">
                         <span className={clsx("mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0", hexStyles.marker.replace('text-', 'bg-'))} />
                         <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center h-full text-slate-400 gap-6"
            >
              <div className="bg-slate-50 p-8 rounded-full border border-slate-100">
                <HexIcon size={48} strokeWidth={1} className="text-slate-300" />
              </div>
              <div className="space-y-2">
                <p className="font-serif text-2xl italic text-slate-400">Contributor Roles Taxonomy</p>
                <p className="text-xs font-sans text-slate-400 uppercase tracking-widest">Select a node to explore</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DetailPanel;