import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { creditRoles } from '../data/roles';
import { CategoryType, CreditRole } from '../types';
import clsx from 'clsx';
import { X, ChevronRight, Info, CheckCircle, Eye, ArrowRight } from 'lucide-react';
import ShowcaseModal from './ShowcaseModal'; 
import AboutModal from './AboutModal';
import scienceUxLogo from './scienceux-logo.png'; 

// --- Visual Helpers (Keep these as they are) ---
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
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  
  const categories = [CategoryType.STRATEGY, CategoryType.INVESTIGATION, CategoryType.INFRASTRUCTURE, CategoryType.DISSEMINATION];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      
      <ShowcaseModal isOpen={isShowcaseOpen} onClose={() => setIsShowcaseOpen(false)} />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

      {/* --- TRANSPARENT FLOATING HEADER --- */}
      <header className="px-4 py-4 sticky top-0 z-40 flex items-center justify-between pointer-events-none">
         <div className="w-20 shrink-0 pointer-events-auto">
            <img src={scienceUxLogo} alt="ScienceUX" className="w-full h-auto opacity-80" />
         </div>

         <div className="flex gap-2 shrink-0 pointer-events-auto">
            <button 
              onClick={() => setIsAboutOpen(true)}
              className="p-2 bg-white border border-slate-200 text-slate-400 rounded-full hover:text-indigo-600 transition-colors shadow-sm"
              aria-label="About Project"
            >
              <Info size={18} />
            </button>

            <button 
              onClick={() => setIsShowcaseOpen(true)}
              className="p-2 bg-white border border-slate-200 text-slate-400 rounded-full hover:text-indigo-600 transition-colors shadow-sm"
              aria-label="View CRediT Roles"
            >
              <Eye size={18} />
            </button>
         </div>
      </header>

      <main className="flex flex-col">
        
        {/* --- LARGER CENTERED TITLE SECTION --- */}
        <div className="text-center pt-4 pb-12 px-6">
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex flex-col items-center"
           >
             <h1 className="text-4xl font-bold text-slate-900 tracking-tight leading-tight">
               CRediT Role Icons
             </h1>
             <p className="text-[10px] text-slate-400 font-bold tracking-[0.25em] uppercase mt-3">
               Contributor Roles Taxonomy
             </p>
           </motion.div>
        </div>

        {categories.map((cat) => {
          const theme = getTheme(cat);
          const catRoles = creditRoles.filter(r => r.category === cat);
          
          return (
            <div key={cat} className="relative">
              
              {/* Category Header */}
              {/* Sticky top is smaller now since the header has no background height */}
              <div className={clsx(
                "px-5 py-3 flex items-center gap-3 font-bold text-[10px] uppercase tracking-widest transition-all",
                "sticky top-0 z-30 border-y bg-slate-50/95 backdrop-blur-sm",
                theme.header, 
                "border-slate-200"
              )}>
                 <div className={clsx("w-2 h-2 rounded-full", theme.accent)} />
                 {cat}
              </div>

              <div className="grid grid-cols-1 bg-white">
                {catRoles.map((role) => (
                  <motion.div 
                    key={role.id} 
                    onClick={() => setSelectedRole(role)} 
                    whileTap={{ scale: 0.98 }}
                    className="group relative flex items-center gap-4 px-5 py-5 border-b border-slate-100 last:border-0 active:bg-slate-50"
                  >
                    <div className="flex-shrink-0">
                       <ListHexIcon role={role} className="w-10 h-12" /> 
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-800 text-[16px] leading-tight">
                        {role.title}
                      </h3>
                    </div>

                    <ChevronRight size={18} className="text-slate-300" />
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