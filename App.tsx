import React, { useState } from 'react';
import HexGrid from './components/HexGrid';
import DetailPanel from './components/DetailPanel';
import { MobileLayout } from './components/MobileLayout';
import ShowcaseModal from './components/ShowcaseModal';
import AboutModal from './components/AboutModal';
import { CreditRole } from './types';
import { creditRoles } from './data/roles';
import { Eye, Info, Download } from 'lucide-react';

const App: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<CreditRole | null>(creditRoles[0]);
  const [lockedRole, setLockedRole] = useState<CreditRole | null>(null);
  const [isShowcaseOpen, setIsShowcaseOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] font-sans selection:bg-slate-200 selection:text-slate-900 overflow-hidden relative">

      {/* Background Depth: Dots + Mesh Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: 'radial-gradient(#e2e8f0 1.5px, transparent 1.5px)',
            backgroundSize: '40px 40px'
          }} />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-100/30 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[20%] w-[30%] h-[40%] rounded-full bg-teal-50/40 blur-[100px]" />
      </div>

      <ShowcaseModal isOpen={isShowcaseOpen} onClose={() => setIsShowcaseOpen(false)} />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

      {/* --- DESKTOP VIEW --- */}
      <div className="hidden lg:flex lg:flex-row h-screen w-full overflow-hidden relative z-10">
        <main className="flex-1 relative flex flex-col h-full min-w-0">

          <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-8 pointer-events-none">
            <div className="flex items-center gap-4">
              <img src="/scienceux-logo.png" alt="ScienceUX Logo" className="h-10 w-auto opacity-100" />
            </div>

            <div className="flex items-center gap-3 pointer-events-auto">
              <a
                href="/icon-spreadsheet.png"
                download="icon-spreadsheet.png"
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50/80 backdrop-blur-md border border-indigo-100 rounded-full shadow-sm text-[11px] font-bold uppercase tracking-wider text-indigo-600 hover:bg-indigo-100 transition-all group"
              >
                <Download size={16} className="text-indigo-400 group-hover:text-indigo-600 transition-colors" />
                <span>Spreadsheet</span>
              </a>

              <button
                onClick={() => setIsShowcaseOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full shadow-sm text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-indigo-600 transition-all group"
              >
                <Eye size={16} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                <span>View Project Roles</span>
              </button>

              <button
                onClick={() => setIsAboutOpen(true)}
                className="flex items-center justify-center w-9 h-9 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full shadow-sm text-slate-300 hover:text-indigo-600 transition-all"
              >
                <Info size={18} />
              </button>
            </div>
          </header>

          <div className="flex-1 w-full h-full flex flex-col items-center justify-center pt-24 pb-12">
            <div className="text-center z-10 flex-shrink-0 animate-in fade-in zoom-in duration-700 px-4">
              {/* Smaller Desktop Title */}
              <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                CRediT Role Icons
              </h1>
              <p className="text-[10px] xl:text-[11px] text-slate-400 font-bold tracking-[0.25em] uppercase mt-2">
                Contributor Roles Taxonomy
              </p>
            </div>

            <div className="flex-1 w-full flex items-center justify-center overflow-hidden min-h-0">
              <div className="transform transition-transform duration-500 ease-out origin-center scale-[0.60] lg:scale-[0.65] xl:scale-[0.80] 2xl:scale-100">
                <HexGrid
                  selectedId={selectedRole?.id || null}
                  lockedId={lockedRole?.id || null}
                  onSelect={(role) => {
                    if (lockedRole?.id === role.id) {
                      setLockedRole(null);
                    } else {
                      setLockedRole(role);
                      setSelectedRole(role);
                    }
                  }}
                  onHover={(role) => {
                    if (!lockedRole) setSelectedRole(role);
                  }}
                />
              </div>
            </div>
          </div>
        </main>

        <aside className="shrink-0 w-[400px] xl:w-[500px] 2xl:w-[600px] h-full z-30 relative shadow-2xl">
          <DetailPanel role={selectedRole} />
        </aside>
      </div>

      <div className="lg:hidden h-full">
        <MobileLayout
          onOpenShowcase={() => setIsShowcaseOpen(true)}
          onOpenAbout={() => setIsAboutOpen(true)}
        />
      </div>

    </div>
  );
};

export default App;