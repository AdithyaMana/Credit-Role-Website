import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { UserPlus, Trash, FileDown, LayoutGrid, Table, AlignLeft, Users } from 'lucide-react';
import { useBuilderState } from '../../hooks/useBuilderState';
import { ContributorCard } from './ContributorCard';
import { MatrixView, TableView, InlineMatrixView, AuthorListView, RoleListView } from './views';

type ViewMode = 'MATRIX' | 'TABLE' | 'INLINE_MATRIX' | 'AUTHOR_LIST' | 'ROLE_LIST';

export const BuilderView: React.FC = () => {
    const {
        contributors,
        addContributor,
        removeContributor,
        updateContributorName,
        toggleContributorRole,
        clearAll,
    } = useBuilderState();

    const [viewMode, setViewMode] = useState<ViewMode>('MATRIX');

    return (
        <div className="w-full h-full flex flex-col pt-24 pb-12 overflow-y-auto custom-scrollbar">
            <div className="max-w-5xl mx-auto w-full px-4 md:px-8 space-y-8 pb-32">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                            CRediT Builder
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            Add contributors and assign their taxonomy roles.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={clearAll}
                            disabled={contributors.length === 0}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Trash size={16} />
                            <span className="hidden sm:inline">Clear All</span>
                        </button>
                        <button
                            disabled={contributors.length === 0}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                        >
                            <FileDown size={16} />
                            <span className="hidden sm:inline">Export Roles</span>
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {contributors.map(contributor => (
                            <ContributorCard
                                key={contributor.id}
                                contributor={contributor}
                                onUpdateName={updateContributorName}
                                onRemove={removeContributor}
                                onToggleRole={toggleContributorRole}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Add Button Sticky Footer or inline */}
                <div className="pt-4">
                    <button
                        onClick={addContributor}
                        className="w-full bg-transparent border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-indigo-600 transition-all group"
                    >
                        <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 group-active:scale-95 transition-transform border border-slate-100">
                            <UserPlus size={24} />
                        </div>
                        <span className="font-semibold font-sans tracking-wide uppercase text-[10px] md:text-xs">Add Contributor</span>
                    </button>
                </div>

                {/* Output Preview Section */}
                {contributors.length > 0 && (
                    <div className="pt-12 space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Output Preview</h2>
                                <p className="text-sm text-slate-500 mt-1">Select a format to view your taxonomy data.</p>
                            </div>

                            <div className="flex bg-slate-100/80 p-1 rounded-xl shadow-inner border border-slate-200 gap-1 overflow-x-auto custom-scrollbar">
                                <button onClick={() => setViewMode('MATRIX')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${viewMode === 'MATRIX' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}>
                                    <LayoutGrid size={14} /> Matrix
                                </button>
                                <button onClick={() => setViewMode('TABLE')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${viewMode === 'TABLE' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}>
                                    <Table size={14} /> Table
                                </button>
                                <button onClick={() => setViewMode('INLINE_MATRIX')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${viewMode === 'INLINE_MATRIX' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}>
                                    <AlignLeft size={14} /> Inline Matrix
                                </button>
                                <button onClick={() => setViewMode('AUTHOR_LIST')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${viewMode === 'AUTHOR_LIST' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}>
                                    <Users size={14} /> Author List
                                </button>
                                <button onClick={() => setViewMode('ROLE_LIST')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${viewMode === 'ROLE_LIST' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}>
                                    <AlignLeft size={14} /> Role List
                                </button>
                            </div>
                        </div>

                        <div className="w-full relative min-h-[400px]">
                            {viewMode === 'MATRIX' && <MatrixView contributors={contributors} />}
                            {viewMode === 'TABLE' && <TableView contributors={contributors} />}
                            {viewMode === 'INLINE_MATRIX' && <InlineMatrixView contributors={contributors} />}
                            {viewMode === 'AUTHOR_LIST' && <AuthorListView contributors={contributors} />}
                            {viewMode === 'ROLE_LIST' && <RoleListView contributors={contributors} />}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
