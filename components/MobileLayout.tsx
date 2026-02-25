import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { creditRoles } from '../data/roles';
import { CategoryType, CreditRole } from '../types';
import clsx from 'clsx';
import { X, ChevronRight, Info, CheckCircle, Eye, ArrowRight, Download } from 'lucide-react';
import scienceUXLogoUrl from '../assets/scienceux-logo.png';
import spreadsheetUrl from '../assets/icon-spreadsheet.png';

// --- Theme and Icon Helpers ---
const getTheme = (category: CategoryType) => {
  switch (category) {
    case CategoryType.STRATEGY:
      return { text: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-200', header: 'text-indigo-900', hexFill: '#EEF2FF', hexStroke: '#818CF8', accent: 'bg-indigo-500', bullet: 'bg-indigo-400' };
    case CategoryType.RESEARCH:
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

const ICON_URLS: Record<string, string> = {
  'conceptualization': 'https://lucide.dev/icons/lightbulb',
  'funding-acquisition': 'https://lucide.dev/icons/dollar-sign',
  'project-admin': 'https://lucide.dev/icons/folder-tree',
  'supervision': 'https://lucide.dev/icons/eye',
  'data-curation': 'https://lucide.dev/icons/database',
  'formal-analysis': 'https://lucide.dev/icons/calculator',
  'investigation': 'https://lucide.dev/icons/microscope',
  'methodology': 'https://lucide.dev/icons/git-compare-arrows',
  'validation': 'https://lucide.dev/icons/circle-check',
  'resources': 'https://lucide.dev/icons/box',
  'software': 'https://lucide.dev/icons/code',
  'visualization': 'https://lucide.dev/icons/chart-bar',
  'writing-original': 'https://lucide.dev/icons/pencil',
  'writing-review': 'https://lucide.dev/icons/message-square-text'
};

// --- Mobile Drawer Components ---

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

  const theme = role ? getTheme(role.category) : null;

  return (
    <AnimatePresence>
      {role && theme && (
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

                {role.id && ICON_URLS[role.id] && (
                  <div className="w-full mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Iconography</span>
                      <span className="text-sm font-sans text-slate-600 mt-0.5 leading-snug">Get this icon from Lucide</span>
                    </div>
                    <a
                      href={ICON_URLS[role.id]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={clsx(
                        "flex items-center gap-2 px-4 py-2.5 rounded-full transition-colors text-xs font-bold uppercase tracking-wider",
                        theme.bg,
                        theme.text,
                        "border",
                        theme.border
                      )}
                    >
                      <Download size={16} />
                      Get Icon
                    </a>
                  </div>
                )}

                <div className={clsx("w-full h-1.5 mt-8 rounded-full opacity-20", theme.accent)} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main Layout ---

interface MobileLayoutProps {
  onOpenShowcase: () => void;
  onOpenAbout: () => void;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ onOpenShowcase, onOpenAbout }) => {
  const [selectedRole, setSelectedRole] = useState<CreditRole | null>(null);

  const categories = [CategoryType.STRATEGY, CategoryType.RESEARCH, CategoryType.INFRASTRUCTURE, CategoryType.DISSEMINATION];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      {/* --- RESPONSIVE HEADER --- */}
      <header className="px-6 py-6 md:py-8 sticky top-0 z-40 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <a href="https://scienceux.org/" target="_blank" rel="noopener noreferrer">
            <img src={scienceUXLogoUrl} alt="ScienceUX Logo" className="h-8 md:h-10 w-auto drop-shadow-sm object-contain" />
          </a>
        </div>

        <div className="flex gap-2 shrink-0 pointer-events-auto">
          <a
            href={spreadsheetUrl}
            download="Credit-Role-Icons-Spreadsheet.png"
            className="p-3 bg-indigo-50/80 backdrop-blur border border-indigo-100 text-indigo-500 rounded-full hover:bg-indigo-100 hover:text-indigo-600 transition-all shadow-sm"
            aria-label="Download Spreadsheet"
          >
            <Download size={20} />
          </a>
          <button
            onClick={onOpenAbout}
            className="p-3 bg-white/80 backdrop-blur border border-slate-200 text-slate-500 rounded-full hover:text-indigo-600 transition-all shadow-sm"
            aria-label="About Project"
          >
            <Info size={20} />
          </button>
          <button
            onClick={onOpenShowcase}
            className="p-3 bg-white/80 backdrop-blur border border-slate-200 text-slate-500 rounded-full hover:text-indigo-600 transition-all shadow-sm"
            aria-label="View CRediT Roles"
          >
            <Eye size={20} />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-0 md:px-6">

        {/* --- TITLE SECTION --- */}
        <div className="text-center pt-2 pb-10 md:pb-16 px-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
              CRediT Role Icons
            </h1>
            <p className="text-[10px] md:text-xs text-slate-400 font-bold tracking-[0.3em] uppercase mt-4">
              Contributor Roles Taxonomy
            </p>
          </motion.div>
        </div>

        {categories.map((cat) => {
          const theme = getTheme(cat);
          const catRoles = creditRoles.filter(r => r.category === cat);

          return (
            <section key={cat} className="mb-8 md:mb-16">
              <div className={clsx(
                "px-6 py-4 flex items-center gap-3 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all",
                "sticky top-0 md:static z-30 border-y md:border-none bg-slate-50/95 backdrop-blur-sm md:bg-transparent",
                theme.header
              )}>
                <div className={clsx("w-2.5 h-2.5 rounded-full shadow-sm", theme.accent)} />
                {cat}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-4 bg-white md:bg-transparent">
                {catRoles.map((role) => (
                  <motion.div
                    key={role.id}
                    onClick={() => setSelectedRole(role)}
                    whileTap={{ scale: 0.98 }}
                    className={clsx(
                      "group relative flex items-center gap-5 cursor-pointer transition-all",
                      "px-6 py-6 border-b border-slate-100 last:border-0 active:bg-slate-50",
                      "md:border md:border-slate-200 md:rounded-3xl md:bg-white md:shadow-sm md:hover:shadow-md md:hover:border-slate-300 md:mb-0"
                    )}
                  >
                    <div className="flex-shrink-0">
                      <ListHexIcon role={role} className="w-12 h-14" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-indigo-600 transition-colors">
                        {role.title}
                      </h3>
                      <p className="hidden md:block text-slate-500 text-sm mt-1 line-clamp-1 opacity-70">
                        {role.description}
                      </p>
                    </div>

                    <ChevronRight size={20} className="text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  </motion.div>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {/* --- DRAWER FOR MOBILE DETAIL VIEW --- */}
      <DetailDrawer role={selectedRole} onClose={() => setSelectedRole(null)} />
    </div>
  );
};
