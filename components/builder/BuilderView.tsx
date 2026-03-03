import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { UserPlus, Trash, FileDown } from 'lucide-react';
import { useBuilderState } from '../../hooks/useBuilderState';
import { ContributorCard } from './ContributorCard';

export const BuilderView: React.FC = () => {
    const {
        contributors,
        addContributor,
        removeContributor,
        updateContributorName,
        toggleContributorRole,
        clearAll,
    } = useBuilderState();

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
            </div>
        </div>
    );
};
