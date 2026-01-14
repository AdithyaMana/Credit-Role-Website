import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { creditRoles } from '../data/roles';
import { CreditRole } from '../types';

interface ShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Master Order of authors
const AUTHOR_ORDER = [
  'Mike Morrison', 'Michael Lai', 'Rieke Schäfer', 'Acorn Steed', 
  'Adithya Mana', 'Barry Prendergast', 'Brian Blais', 'Celso Júnior', 
  'David Green', 'Divya Koppikar', 'Jay Patel', 'Lloyd Gwishiri', 
  'Nafisa Mohamed', 'Philipp Koellinger', 'Rowan Cockett', 'Ryan Molen', 
  'Samir Mamdouh', 'Steve Purves', 'Swetha Ramaswamy', 'Thurstan Hethorn'
];

// Fake affiliations for realism
const AFFILIATIONS = {
  1: "University of Metascience, Department of User Research, Utrecht, The Netherlands",
  2: "Institute for Open Science, Berlin, Germany",
  3: "Center for Scientific Reform, Stanford University, CA, USA"
};

const GET_AFFILIATION = (index: number) => {
  if (index < 3) return "1, *";
  if (index < 10) return "2";
  return "3";
};

const PROJECT_CONTRIBUTORS: Record<string, string[]> = {
  'conceptualization': [
    'Mike Morrison', 'Michael Lai', 'Acorn Steed', 'Adithya Mana', 
    'Barry Prendergast', 'Brian Blais', 'Celso Júnior', 'David Green', 
    'Divya Koppikar', 'Jay Patel', 'Lloyd Gwishiri', 'Nafisa Mohamed', 
    'Philipp Koellinger', 'Rieke Schäfer', 'Rowan Cockett', 'Ryan Molen', 
    'Samir Mamdouh', 'Steve Purves', 'Swetha Ramaswamy', 'Thurstan Hethorn'
  ],
  'data-curation': ['Michael Lai', 'Rieke Schäfer'],
  'formal-analysis': ['Michael Lai', 'Rieke Schäfer'],
  'funding-acquisition': [], 
  'investigation': ['Mike Morrison', 'Michael Lai', 'Rieke Schäfer'],
  'methodology': ['Mike Morrison', 'Michael Lai', 'Swetha Ramaswamy', 'Rieke Schäfer', 'Thurstan Hethorn'],
  'project-admin': ['Michael Lai'],
  'resources': [], 
  'software': ['Adithya Mana'],
  'supervision': [], 
  'validation': [], 
  'visualization': [], 
  'writing-original': [], 
  'writing-review': [] 
};

// Filter roles
const ACTIVE_ROLES = creditRoles.filter(role => 
  PROJECT_CONTRIBUTORS[role.id] && PROJECT_CONTRIBUTORS[role.id].length > 0
);

const ShowcaseModal: React.FC<ShowcaseModalProps> = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<'legacy' | 'modern'>('modern');

  // Helper to sort names based on Master Order
  const sortNames = (names: string[]) => {
    return [...names].sort((a, b) => {
      const idxA = AUTHOR_ORDER.indexOf(a);
      const idxB = AUTHOR_ORDER.indexOf(b);
      return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/70 backdrop-blur-md"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 15 }}
            className="relative w-full max-w-4xl bg-white shadow-2xl flex flex-col max-h-full"
          >
            {/* Journal Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-white z-10">
              <div className="flex items-center gap-4">
                 <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center font-serif font-bold italic text-sm">M</div>
                 <div className="flex flex-col">
                   <span className="font-serif font-bold text-slate-900 text-base tracking-tight leading-none">Journal of Metascience</span>
                   <span className="font-sans text-[10px] font-medium text-slate-500 uppercase tracking-widest leading-none mt-1.5">Volume 12 • Issue 4 • 2026</span>
                 </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-slate-900">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
              <div className="max-w-3xl mx-auto px-8 py-12">
                
                {/* --- 1. METADATA --- */}
                <span className="inline-block px-2 py-1 mb-6 text-[9px] font-bold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-sm">
                  Original Research
                </span>

                {/* --- 2. TITLE --- */}
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-8 leading-[1.15] tracking-tight">
                  Optimizing Scientific Credit: A Visual Taxonomy for Contributor Roles
                </h1>

                {/* --- 3. AUTHOR BYLINE --- */}
                <div className="mb-8 text-lg font-serif leading-relaxed text-slate-800 text-justify">
                   {AUTHOR_ORDER.map((author, i) => (
                     <React.Fragment key={author}>
                       <span className="inline">
                         {author}
                         <sup className="text-xs text-indigo-600 ml-0.5 font-sans font-bold">{GET_AFFILIATION(i)}</sup>
                       </span>
                       {i < AUTHOR_ORDER.length - 1 ? ', ' : ''}
                     </React.Fragment>
                   ))}
                </div>

                 {/* --- 4. AFFILIATIONS --- */}
                 <div className="mb-12 text-[11px] text-slate-500 font-sans space-y-1.5 border-b border-slate-100 pb-8">
                    <p><sup className="mr-1 font-bold text-indigo-600">1</sup>{AFFILIATIONS[1]}</p>
                    <p><sup className="mr-1 font-bold text-indigo-600">2</sup>{AFFILIATIONS[2]}</p>
                    <p><sup className="mr-1 font-bold text-indigo-600">3</sup>{AFFILIATIONS[3]}</p>
                    <p><sup className="mr-1 font-bold text-indigo-600">*</sup>Corresponding Author: mike.morrison@metascience.org</p>
                 </div>

                {/* --- 5. ABSTRACT --- */}
                <div className="mb-16">
                  <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-slate-900 mb-3">Abstract</h3>
                  <p className="text-slate-700 font-serif text-[15px] leading-7 text-justify">
                    Accurate attribution of contributor roles in scientific research is critical for transparency. This study explores the efficacy of visual taxonomies in enhancing the readability of contribution statements, moving beyond simple author lists to granular role definitions. By implementing the CRediT taxonomy (Contributor Roles Taxonomy), we demonstrate a significant reduction in cognitive load for readers assessing individual contributions compared to traditional methods.
                  </p>
                </div>

                {/* --- 6. AUTHOR CONTRIBUTIONS --- */}
                <div>
                  {/* Clean Text-Only Tabs */}
                  <div className="flex items-baseline justify-between mb-8 border-b border-slate-200 pb-2">
                    <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-slate-900">Author Contributions</h3>
                    
                    <div className="flex gap-8">
                       <button
                        onClick={() => setViewMode('legacy')}
                        className={`text-[10px] font-bold uppercase tracking-widest transition-all ${
                          viewMode === 'legacy' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        Standard View
                      </button>
                      <button
                        onClick={() => setViewMode('modern')}
                        className={`text-[10px] font-bold uppercase tracking-widest transition-all ${
                          viewMode === 'modern' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        CRediT View
                      </button>
                    </div>
                  </div>

                  <div className="min-h-[200px] relative">
                    <AnimatePresence mode="wait">
                      {viewMode === 'legacy' ? (
                        <motion.div 
                          key="legacy"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="font-serif text-[13px] leading-6 text-slate-600 text-justify"
                        >
                          {/* STANDARD VIEW: Just the author list, no roles */}
                          {AUTHOR_ORDER.map((author, index) => (
                            <React.Fragment key={author}>
                              {author}
                              {index < AUTHOR_ORDER.length - 1 ? ', ' : '.'}
                            </React.Fragment>
                          ))}
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="modern"
                          initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        >
                          {/* SMART COMPACT GRID (Print-Style)
                             - Mimics a "Contributions" section in a journal sidebar/footer.
                             - Dense, high contrast headers, readable body.
                             - No tooltips. No hover effects on content.
                          */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 border-t border-slate-200 pt-8">
                            {ACTIVE_ROLES.map((role) => {
                              const contributors = sortNames(PROJECT_CONTRIBUTORS[role.id]);
                              // If there are more than 4 contributors, span the full width
                              const isWide = contributors.length > 4;

                              return (
                                <div 
                                  key={role.id} 
                                  className={`flex flex-col gap-1.5 ${isWide ? 'md:col-span-2' : 'md:col-span-1'}`}
                                >
                                  {/* Header: Icon + Title */}
                                  <div className="flex items-center gap-2.5">
                                    <div className="text-slate-400">
                                      <role.icon size={14} strokeWidth={2} />
                                    </div>
                                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-slate-900">
                                      {role.title}
                                    </span>
                                  </div>
                                  
                                  {/* Body: Names */}
                                  <div className="text-[13px] font-serif leading-snug text-slate-600 pl-6">
                                    {contributors.join(', ')}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="mt-12 text-[9px] text-slate-400 font-sans text-center uppercase tracking-wider border-t border-slate-100 pt-6">
                            Source: CRediT Taxonomy
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ShowcaseModal;