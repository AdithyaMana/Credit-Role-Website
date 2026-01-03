import React, { useState } from 'react';
import HexGrid from './components/HexGrid';
import DetailPanel from './components/DetailPanel';
import { MobileLayout } from './components/MobileLayout';
import ScienceUXLogo from './components/ScienceUXLogo';
import { CreditRole } from './types';
import { creditRoles } from './data/roles';

const App: React.FC = () => {
  // Default to first role for better initial UX (Desktop State)
  const [selectedRole, setSelectedRole] = useState<CreditRole | null>(creditRoles[0]);

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] font-sans selection:bg-slate-200 selection:text-slate-900">
      
      {/* --- DESKTOP VIEW (Visible on lg+) --- */}
      <div className="hidden lg:flex lg:flex-row h-screen overflow-hidden">
        {/* Left/Top Section: Grid */}
        <main className="flex-1 flex flex-col items-center justify-center relative p-8">
          
          {/* Professional Background: Vignette & Dot Pattern */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.4]" 
               style={{ 
                 backgroundImage: 'radial-gradient(#e2e8f0 1.5px, transparent 1.5px)', 
                 backgroundSize: '40px 40px' 
               }}>
          </div>
          
          {/* Subtle Vignette for focus */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(250,250,250,0.8)_100%)] pointer-events-none" />

          {/* Header Overlay */}
          <header className="absolute top-8 left-8 z-20 flex flex-col gap-8">
             {/* Logo Image */}
             <div>
                <ScienceUXLogo className="h-12 w-auto" />
             </div>
             
             {/* Title Group */}
            <div className="flex flex-col border-l-4 border-indigo-600 pl-4 py-1">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight leading-none">CRediT Role Icons</h1>
              <p className="text-[10px] text-slate-600 font-bold tracking-[0.2em] uppercase mt-1.5">Contributor Roles Taxonomy</p>
            </div>
          </header>

          {/* Visualizer */}
          <div className="w-full max-w-5xl flex flex-col items-center z-10 transition-transform duration-500 ease-out scale-100">
            <HexGrid 
              selectedId={selectedRole?.id || null} 
              onSelect={setSelectedRole}
              onHover={setSelectedRole} 
            />
          </div>
        </main>

        {/* Right/Bottom Section: Detail Panel */}
        <aside className="w-[480px] xl:w-[600px] h-screen z-30 relative shadow-2xl">
          <DetailPanel role={selectedRole} />
        </aside>
      </div>

      {/* --- MOBILE VIEW (Visible on < lg) --- */}
      <div className="lg:hidden">
        <MobileLayout />
      </div>

    </div>
  );
};

export default App;