import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { creditRoles } from '../data/roles';
import { CategoryType, CreditRole } from '../types';
import clsx from 'clsx';
import { X, ChevronRight, Info, CheckCircle, Eye, ArrowRight } from 'lucide-react';
import ShowcaseModal from './ShowcaseModal'; 
import scienceUxLogo from './scienceux-logo.png'; // <--- IMPORT ADDED

// --- Visual Helpers ---
const getTheme = (category: CategoryType) => {
  switch (category) {
    case CategoryType.STRATEGY:
      return { text: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-200', header: 'text-indigo-900', hexFill: '#EEF2FF', hexStroke: '#818CF8', accent: 'bg-indigo-500', bullet: 'bg-indigo-400' };
    case CategoryType.INVESTIGATION:
      return { text: 'text-teal-500', bg: 'bg-teal-50', border: 'border-teal-200', header: 'text-teal-900', hexFill: '#F0FDFA', hexStroke: '#2DD4BF', accent: 'bg-teal-500', bullet: 'bg-teal-400' };
    case CategoryType.INFRASTRUCTURE:
      return { text: 'text-slate-500', bg: 'bg-slate-50', border: 'border-slate-200', header: 'text-slate-900', hexFill: '#F8FAFC', hexStroke: '#94A3B8', accent: 'bg-slate-500', bullet: 'bg-slate-400' };
    case CategoryType.DISSEMINATION:
      return { text: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200', header: 'text-orange-900', hexFill: '#FFF7ED', hexStroke: '#FB923C', accent: 'bg-orange-500', bullet: 'bg-orange-400' };
    default:
      return { text: 'text-gray-500', bg: 'bg-gray-50', border: 'border-gray-200', header: 'text-gray-900', hexFill: '#eee', hexStroke: '#ccc', accent: 'bg-gray-500', bullet: 'bg-gray-400' };
  }
};

const ListHexIcon: React.FC<{ role: CreditRole; className?: string }> = ({ role, className }) => {
  const theme = getTheme(role.category);
  const Icon = role.icon;
  return (
    <div className={clsx("relative flex-shrink-0 flex items-center justify-center", className || "w-10 h-12")}>
       <svg viewBox="0 0 100 115" className="absolute inset-0 w-full h-full overflow-visible">
        <path transform="translate(0, 7.5)" d="M50 0 L93.3 25 V75 L50 100 L6.7 75 V25 Z" fill={theme.hexFill} stroke={theme.hexStroke} strokeWidth="3" />
      </svg>
      <Icon size={18} className="relative z-10 text-slate-500" strokeWidth={2.5} />
    </div>
  );
};

const DrawerHexIcon: React.FC<{ role: CreditRole }> = ({ role }) => {
  const theme = getTheme(role.category);
  const Icon = role.icon;
  return (
    <div className="relative w-24 h-28 flex-shrink-0 flex items-center justify-center mb-4">
       <motion.svg initial={{ rotate: -15, scale: 0.8 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", duration: 0.6 }} viewBox="0 0 100 115" className="absolute inset-0 w-full h-full overflow-visible">
        <path transform="translate(0, 7.5)" d="M50 0 L93.3 25 V75 L50 100 L6.7 75 V25 Z" fill={theme.hexFill} stroke={theme.hexStroke} strokeWidth="2" />
      </motion.svg>
      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Icon size={40} className="relative z-10 text-slate-500" strokeWidth={1.5} />
      </motion.div>
    </div>
  );
};

const DetailDrawer: React.FC<{ role: CreditRole | null; onClose: () => void }> = ({ role, onClose }) => {
  useEffect(() => {
    if (role) { document.body.style.overflow = 'hidden'; } else { document.body.style.overflow = 'unset'; }
    return () => { document.body.style.overflow = 'unset'; };
  }, [role]);

  if (!role) return null;
  const theme = getTheme(role.category);

  return (
    <AnimatePresence>
      {role && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50" />
          <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col max-h-[85vh]">
            <div className="w-full flex justify-center pt-3 pb-1" onClick={onClose}><div className="w-12 h-1.5 bg-slate-200 rounded-full" /></div>
            <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors"><X size={20} /></button>
            <div className="overflow-y-auto px-6 pt-2 pb-12">
              <div className="flex flex-col items-center text-center">
                <DrawerHexIcon role={role} />
                <span className={clsx("px-3 py-1 mb-4 text-[10px] font-bold uppercase tracking-widest rounded-full border", theme.bg, theme.border, theme.text)}>{role.category}</span>
                <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-6 font-sans">{role.title}</h2>
                <div className="w-full h-px bg-slate-100 mb-6" />
                <div className="w-full text-left space-y-3">
                   <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Info size={14} /> Description</h3>
                   <p className="font-serif text-xl text-slate-700 leading-relaxed">{role.description}</p>
                </div>
                {role.examples && role.examples.length > 0 && (
                  <div className="w-full text-left space-y-3 mt-6">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><CheckCircle size={14} /> Key Activities</h3>
                    <ul className="space-y-3">
                      {role.examples.map((example, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-700 font-serif text-lg leading-snug">
                           <span className={clsx("mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0", theme.bullet)} />
                           <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className={clsx("w-full h-1.5 mt-12 rounded-full opacity-20", theme.accent)} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const MobileLayout: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<CreditRole | null>(null);
  const [isShowcaseOpen, setIsShowcaseOpen] = useState(false);
  
  const categories = [CategoryType.STRATEGY, CategoryType.INVESTIGATION, CategoryType.INFRASTRUCTURE, CategoryType.DISSEMINATION];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      
      <ShowcaseModal isOpen={isShowcaseOpen} onClose={() => setIsShowcaseOpen(false)} />

      {/* App Header */}
      <header className="bg-white px-5 py-4 border-b border-slate-200 shadow-sm sticky top-0 z-30 flex flex-col gap-4">
         <div className="w-32">
            {/* USE VARIABLE HERE */}
            <img src={scienceUxLogo} alt="ScienceUX" className="w-full h-auto" />
         </div>
         <div className="flex items-end justify-between">
           <div className="flex flex-col border-l-4 border-indigo-600 pl-3">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">CRediT Role Icons</h1>
              <p className="text-[10px] text-slate-500 font-bold tracking-[0.2em] uppercase mt-1">Contributor Roles Taxonomy</p>
            </div>
            
            <button 
              onClick={() => setIsShowcaseOpen(true)}
              className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
              aria-label="View CRediT Roles"
            >
              <Eye size={20} />
            </button>
          </div>
      </header>

      <main className="flex flex-col md:px-6 md:py-6 md:gap-8">
        {categories.map((cat) => {
          const theme = getTheme(cat);
          const catRoles = creditRoles.filter(r => r.category === cat);
          
          return (
            <div key={cat} className="relative md:rounded-3xl md:bg-white md:p-1 md:shadow-sm md:border md:border-slate-200/60">
              
              {/* Category Header */}
              <div className={clsx(
                "px-5 py-3 flex items-center gap-3 font-bold text-xs uppercase tracking-widest transition-all",
                // Mobile: Sticky Strip with backdrop
                "sticky top-[105px] z-20 border-y md:border-none bg-slate-50/95 backdrop-blur-sm",
                // Tablet: Static, clean header inside the box
                "md:bg-transparent md:static md:z-auto md:text-sm md:mb-2 md:mt-2 md:px-4",
                theme.header, 
                "border-slate-200"
              )}>
                 <div className={clsx("w-2.5 h-2.5 rounded-full ring-2 ring-white shadow-sm", theme.accent)} />
                 {cat}
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-0 md:gap-4 md:px-4 md:pb-4 bg-white md:bg-transparent">
                {catRoles.map((role) => (
                  <motion.div 
                    key={role.id} 
                    onClick={() => setSelectedRole(role)} 
                    whileTap={{ scale: 0.98 }}
                    className={clsx(
                      "group relative flex items-center gap-4 cursor-pointer transition-all duration-200",
                      // Mobile: List item styles
                      "px-5 py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 active:bg-slate-100",
                      // Tablet: Card styles
                      "md:border md:border-slate-200 md:rounded-2xl md:bg-white md:hover:border-indigo-300/50 md:hover:shadow-md md:hover:-translate-y-0.5 md:p-5 md:h-full md:items-start"
                    )}
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0">
                       <ListHexIcon role={role} className="w-10 h-12 md:w-12 md:h-14" /> 
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-800 text-[15px] md:text-lg leading-tight md:mb-2 group-hover:text-indigo-700 transition-colors">
                        {role.title}
                      </h3>
                      
                      {/* Description visible only on Tablet+ */}
                      <p className="hidden md:block text-sm text-slate-500 font-serif leading-relaxed line-clamp-2">
                        {role.description}
                      </p>
                    </div>

                    {/* Chevron (Mobile Only) */}
                    <ChevronRight size={18} className="text-slate-300 md:hidden" />
                    
                    {/* Tablet Hover Indicator (Arrow) */}
                    <div className="hidden md:flex absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all text-indigo-400 group-hover:translate-x-1">
                      <ArrowRight size={18} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </main>

      <DetailDrawer role={selectedRole} onClose={() => setSelectedRole(null)} />
    </div>
  );
};