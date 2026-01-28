import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb, ClipboardList, Database, BarChart3, Search, Microscope, Code, ArrowRight } from 'lucide-react';

// 1. DATA STRUCTURE (Restored names and affiliations)
const CONTRIBUTORS = [
  { id: 'mm', name: 'Mike Morrison', affs: [1], roles: ['conceptualization', 'investigation', 'methodology'], corr: true },
  { id: 'ml', name: 'Michael Lai', affs: [1], roles: ['conceptualization', 'project-admin', 'data-curation', 'formal-analysis', 'investigation', 'methodology'], corr: true },
  { id: 'rs', name: 'Rieke Schäfer', affs: [1], roles: ['conceptualization', 'data-curation', 'formal-analysis', 'investigation', 'methodology'], corr: true },
  { id: 'as', name: 'Acorn Steed', affs: [2], roles: ['conceptualization'] },
  { id: 'am', name: 'Adithya Mana', affs: [2], roles: ['conceptualization', 'software'] },
  { id: 'bp', name: 'Barry Prendergast', affs: [2], roles: ['conceptualization'] },
  { id: 'bb', name: 'Brian Blais', affs: [2], roles: ['conceptualization'] },
  { id: 'cj', name: 'Celso Júnior', affs: [2], roles: ['conceptualization'] },
  { id: 'dg', name: 'David Green', affs: [2], roles: ['conceptualization'] },
  { id: 'dk', name: 'Divya Koppikar', affs: [2], roles: ['conceptualization'] },
  { id: 'jp', name: 'Jay Patel', affs: [3], roles: ['conceptualization'] },
  { id: 'lg', name: 'Lloyd Gwishiri', affs: [3], roles: ['conceptualization'] },
  { id: 'nm', name: 'Nafisa Mohamed', affs: [3], roles: ['conceptualization'] },
  { id: 'pk', name: 'Philipp Koellinger', affs: [3], roles: ['conceptualization'] },
  { id: 'rc', name: 'Rowan Cockett', affs: [3], roles: ['conceptualization'] },
  { id: 'rm', name: 'Ryan Molen', affs: [3], roles: ['conceptualization'] },
  { id: 'sm', name: 'Samir Mamdouh', affs: [3], roles: ['conceptualization'] },
  { id: 'sp', name: 'Steve Purves', affs: [3], roles: ['conceptualization'] },
  { id: 'sr', name: 'Swetha Ramaswamy', affs: [3], roles: ['conceptualization', 'methodology'] },
  { id: 'th', name: 'Thurstan Hethorn', affs: [3], roles: ['conceptualization', 'methodology'] },
];

const AFFILIATIONS = {
  1: "University of Metascience, Department of User Research, Utrecht, The Netherlands",
  2: "Institute for Open Science, Berlin, Germany",
  3: "Center for Scientific Reform, Stanford University, CA, USA"
};

const ROLE_DEFS = [
  { id: 'conceptualization', title: 'Conceptualization', icon: Lightbulb },
  { id: 'project-admin', title: 'Project Administration', icon: ClipboardList },
  { id: 'data-curation', title: 'Data Curation', icon: Database },
  { id: 'formal-analysis', title: 'Formal Analysis', icon: BarChart3 },
  { id: 'investigation', title: 'Investigation', icon: Search },
  { id: 'methodology', title: 'Methodology', icon: Microscope },
  { id: 'software', title: 'Software', icon: Code },
];

const ResearchPaperModal = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState('credit');

  const creditGroups = useMemo(() => {
    return ROLE_DEFS.map(role => ({
      ...role,
      authors: CONTRIBUTORS.filter(c => c.roles.includes(role.id))
    })).filter(group => group.authors.length > 0);
  }, []);

  const AuthorName = ({ author }) => (
    <span className="inline-block">
      {author.name}
      <sup className="text-[9px] text-indigo-500 ml-0.5 font-bold tracking-tighter">
        {author.affs.join(',')}{author.corr && ',*'}
      </sup>
    </span>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="relative w-full max-w-5xl bg-white shadow-2xl flex flex-col max-h-[90vh] overflow-hidden rounded-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-white">
              <div className="flex items-center gap-4">
                 <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center font-serif font-bold italic text-sm">M</div>
                 <div className="flex flex-col">
                   <span className="font-serif font-bold text-slate-900 text-base tracking-tight uppercase">Journal of ScienceUX</span>
                   <span className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1.5">Volume 12 • 2026</span>
                 </div>
              </div>
              <div className="flex items-center gap-6">
                <nav className="hidden md:flex gap-4 border-r border-slate-200 pr-6">
                  {['byline', 'credit'].map((mode) => (
                    <button 
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === mode ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {mode} View
                    </button>
                  ))}
                </nav>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-900 transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-white p-8 md:p-16">
              <div className="max-w-3xl mx-auto">
                <span className="inline-block px-2 py-1 mb-6 text-[9px] font-bold uppercase tracking-[0.2em] text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-sm">
                  Original Research
                </span>

                <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-8 leading-[1.1] tracking-tight">
                  Optimizing Scientific Credit: A Visual Taxonomy for Contributor Roles
                </h1>

                {/* Author Selection UI */}
                <section className="mb-12">
                  <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 border-b border-slate-100 pb-2">
                    Authorship & Contributions
                  </h3>

                  <AnimatePresence mode="wait">
                    {viewMode === 'byline' ? (
                      <motion.div key="byline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-serif text-[16px] leading-relaxed text-slate-800">
                        {CONTRIBUTORS.map((c, i) => (
                          <React.Fragment key={c.id}>
                            <AuthorName author={c} />
                            {i < CONTRIBUTORS.length - 1 ? ', ' : '.'}
                          </React.Fragment>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div key="credit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        {creditGroups.map((group) => (
                          <div key={group.id} className={`flex flex-col gap-2 ${group.authors.length > 5 ? 'md:col-span-2' : ''}`}>
                            <div className="flex items-center gap-2 opacity-60">
                              <group.icon size={14} className="text-slate-900" />
                              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-slate-900">{group.title}</span>
                            </div>
                            <div className="text-[14px] font-serif leading-snug text-slate-700 md:pl-6">
                              {group.authors.map((author, i) => (
                                <React.Fragment key={author.id}>
                                  <AuthorName author={author} />
                                  {i < group.authors.length - 1 ? ', ' : ''}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>

                <hr className="border-slate-100 my-12" />

                {/* Content Sections (Sanitized Findings) */}
                <div className="space-y-12 font-serif text-[17px] leading-relaxed text-slate-800">
                  <section className="bg-slate-50 p-8 rounded-sm border-l-4 border-slate-900">
                    <h2 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900 mb-4">Abstract</h2>
                    <p className="italic">
                      The Credit Role Icon Project investigates how visual taxonomies impact the awareness and adoption of the Contributor Role Taxonomy (CRediT). This study examines user identification with iconography across diverse scientific disciplines.
                    </p>
                  </section>

                  <section>
                    <h2 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Method</h2>
                    <p>
                      The study utilized a multi-phase approach including initial qualitative interviews followed by large-scale quantitative surveys. Participants were asked to map visual symbols to standard contributor role definitions to determine statistical consensus.
                    </p>
                  </section>

                  <section>
                    <h2 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Key Results</h2>
                    <div className="space-y-6">
                      <p>Data analysis indicates distinct patterns in how researchers associate specific visual metaphors with technical and administrative roles. High consensus was achieved for a majority of the taxonomy roles.</p>
                      <ul className="list-none space-y-4 pl-0">
                        <li className="flex gap-3 items-start">
                          <span className="text-slate-300 mt-1.5">•</span>
                          <span>Quantitative validation of specific icon-to-role mappings.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                          <span className="text-slate-300 mt-1.5">•</span>
                          <span>Analysis of discipline-specific visual preferences.</span>
                        </li>
                      </ul>
                    </div>
                  </section>

                  <section className="pb-16">
                    <h2 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Implementation Status</h2>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { version: 'Version 1.0', date: 'Nov 2025', description: 'Initial Taxonomy Release' },
                        { version: 'Version 2.0', date: 'Jan 2026', description: 'Updated Iconography' },
                        { version: 'Version 3.0', date: 'TBD', description: 'Custom Icons' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-6 p-4 border border-slate-100 rounded-sm bg-slate-50/50">
                          <div className="flex flex-col min-w-[120px]">
                            <span className="font-sans text-[11px] font-bold text-slate-900 uppercase tracking-widest">{item.version}</span>
                            <span className="font-serif text-[13px] text-slate-500 italic mt-0.5">{item.date}</span>
                          </div>
                          <div className="h-8 w-px bg-slate-200/60 hidden sm:block"></div>
                          <div className="flex items-center gap-3">
                            <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-1 rounded-sm">
                              {i < 2 ? 'Completed' : 'Planned'}
                            </span>
                            <span className="font-sans text-xs font-medium text-slate-600">{item.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResearchPaperModal;