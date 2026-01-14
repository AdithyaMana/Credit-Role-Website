import React, { useState } from 'react';
import HexGrid from './components/HexGrid';
import DetailPanel from './components/DetailPanel';
import { MobileLayout } from './components/MobileLayout';
import ShowcaseModal from './components/ShowcaseModal';
import { CreditRole } from './types';
import { creditRoles } from './data/roles';
import { Eye } from 'lucide-react';
import scienceUxLogo from './components/scienceux-logo.png'; // IMPORT HERE

const App: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<CreditRole | null>(creditRoles[0]);
  const [isShowcaseOpen, setIsShowcaseOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] font-sans selection:bg-slate-200 selection:text-slate-900 overflow-hidden">
      
      <ShowcaseModal isOpen={isShowcaseOpen} onClose={() => setIsShowcaseOpen(false)} />

      {/* --- DESKTOP VIEW (Visible on lg+) --- */}
      <div className="hidden lg:flex lg:flex-row h-screen w-full overflow-hidden">
        
        {/* Left/Top Section: Grid Container */}
        <main className="flex-1 relative flex flex-col h-full min-w-0">
          
          {/* Background Elements */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.4]" 
               style={{ 
                 backgroundImage: 'radial-gradient(#e2e8f0 1.5px, transparent 1.5px)', 
                 backgroundSize: '40px 40px' 
               }}>
          </div>
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(250,250,250,0.8)_100%)] pointer-events-none" />

          {/* Header */}
          <header className="absolute top-6 left-8 z-20 flex flex-col gap-5 items-start">
             <div>
                {/* USE VARIABLE HERE */}
                <img src={scienceUxLogo} alt="ScienceUX" className="h-10 xl:h-12 w-auto" />
             </div>
             
            <div className="flex flex-col border-l-4 border-indigo-600 pl-4 py-1">
              <h1 className="text-2xl xl:text-3xl font-bold text-slate-900 tracking-tight leading-none">CRediT Role Icons</h1>
              <p className="text-[10px] text-slate-600 font-bold tracking-[0.2em] uppercase mt-1.5">Contributor Roles Taxonomy</p>
            </div>

            <button 
              onClick={() => setIsShowcaseOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full shadow-sm text-[10px] xl:text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-md transition-all group"
            >
              <Eye size={14} className="group-hover:scale-110 transition-transform" />
              View Project Roles
            </button>
          </header>

          {/* Visualizer - Centered with Responsive Scaling */}
          <div className="flex-1 w-full h-full flex items-center justify-center overflow-hidden">
            {/* Scaling Logic:
                lg (1024px): Scale 0.70 to fit 1024-400=624px space
                xl (1280px): Scale 0.85
                2xl (1536px): Scale 1.0 
            */}
            <div className="transform transition-transform duration-500 ease-out origin-center scale-[0.65] lg:scale-[0.70] xl:scale-[0.85] 2xl:scale-100">
              <HexGrid 
                selectedId={selectedRole?.id || null} 
                onSelect={setSelectedRole}
                onHover={setSelectedRole} 
              />
            </div>
          </div>
        </main>

        {/* Right Section: Detail Panel */}
        {/* Width Logic: smaller on lg to give space to grid, larger on xl+ */}
        <aside className="shrink-0 w-[400px] xl:w-[500px] 2xl:w-[600px] h-full z-30 relative shadow-2xl transition-[width] duration-300 ease-in-out">
          <DetailPanel role={selectedRole} />
        </aside>
      </div>

      {/* --- MOBILE/TABLET VIEW (Visible < lg) --- */}
      <div className="lg:hidden h-full">
        <MobileLayout />
      </div>

    </div>
  );
};

export default App;