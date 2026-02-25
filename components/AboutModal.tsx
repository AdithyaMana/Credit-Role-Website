import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, FlaskConical, Users, LineChart } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-white z-10">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight font-sans">About the Project</h2>
              <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-slate-900">
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-8 space-y-8">

              {/* Intro / Abstract */}
              <section className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0 mt-1">
                    <FlaskConical size={20} />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-bold text-indigo-600 uppercase tracking-[0.15em] mb-2">The Hypothesis</h3>
                    <p className="font-sans text-slate-700 text-[15px] leading-relaxed">
                      The Credit Role Icon Project tests the hypothesis that improving the user experience of implementing the <strong className="font-semibold text-slate-900">Contributor Role Taxonomy (CRediT)</strong> will result in increased uptake and awareness by journal publishers and authors of scientific articles.
                    </p>
                  </div>
                </div>
              </section>

              <hr className="border-slate-100" />

              {/* What is CRediT? */}
              <section className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-3">What are CRediT Roles?</h3>
                <p className="font-sans text-slate-700 text-[14px] leading-relaxed mb-5">
                  CRediT (Contributor Roles Taxonomy) brings structure and usefulness to the block of names associated with a research paper. We did not create these roles; we are designing visual cues to help increase their adoption.
                </p>
                <a
                  href="https://credit.niso.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-widest bg-white px-4 py-2.5 rounded border border-indigo-100 hover:border-indigo-300 transition-all shadow-sm"
                >
                  Visit Official CRediT Roles Website <ExternalLink size={12} />
                </a>
              </section>

              {/* Methodology */}
              <section className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-teal-50 text-teal-600 rounded-lg shrink-0 mt-1">
                    <Users size={20} />
                  </div>
                  <div className="w-full">
                    <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.15em] mb-4">Our Process</h3>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                        <strong className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Background Research</strong>
                        <p className="text-[14px] text-slate-700 font-sans leading-snug">User interviews to understand the problem space and awareness levels.</p>
                      </div>
                      <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                        <strong className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Data Collection</strong>
                        <p className="text-[14px] text-slate-700 font-sans leading-snug mb-3">Surveys involving scientists to select icons that best matched the 14 defined roles.</p>
                        <a
                          href="https://creditsurvey.sciux.org/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[10px] font-bold text-teal-600 hover:text-teal-800 uppercase tracking-widest bg-teal-50 px-3 py-1.5 rounded border border-teal-100 hover:border-teal-300 transition-all"
                        >
                          View Original Survey <ExternalLink size={10} />
                        </a>
                      </div>
                      <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                        <strong className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Continuous Improvement</strong>
                        <p className="text-[14px] text-slate-700 font-sans leading-snug">Publishing findings and embracing uncertainty to reach the next version.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <hr className="border-slate-100" />

              {/* Key Findings */}
              <section className="space-y-4 pb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-50 text-orange-600 rounded-lg shrink-0 mt-1">
                    <LineChart size={20} />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.15em] mb-3">Key Findings</h3>
                    <ul className="space-y-3">
                      <li className="flex gap-2 text-[14px] text-slate-700 font-sans leading-relaxed">
                        <span className="text-orange-400 mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-current" />
                        <span><strong className="text-slate-900 font-semibold">Low Awareness:</strong> Participants are often too busy to explore taxonomies, viewing them as 'nice' but not 'necessary'.</span>
                      </li>
                      <li className="flex gap-2 text-[14px] text-slate-700 font-sans leading-relaxed">
                        <span className="text-orange-400 mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-current" />
                        <span><strong className="text-slate-900 font-semibold">Concept Approval:</strong> High agreement that research contribution needs more transparency.</span>
                      </li>
                      <li className="flex gap-2 text-[14px] text-slate-700 font-sans leading-relaxed">
                        <span className="text-orange-400 mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-current" />
                        <span><strong className="text-slate-900 font-semibold">Consensus:</strong> A majority of the roles matched icon ideas generated during the initial interview phase.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
              <p className="text-[10px] text-slate-400 font-sans font-bold uppercase tracking-[0.2em]">
                A ScienceUX Project • 2026
              </p>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AboutModal;