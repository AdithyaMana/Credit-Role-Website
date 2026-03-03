import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { UserPlus, Trash, FileDown, LayoutGrid, Table, AlignLeft, Users, Copy, Check } from 'lucide-react';
import { useBuilderState } from '../../hooks/useBuilderState';
import { MatrixView, TableView, InlineMatrixView, AuthorListView, RoleListView } from './views';
import { downloadAsJson, copyToClipboard } from '../../lib/exportUtils';

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
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        const success = await copyToClipboard(contributors);
        if (success) {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    return (
        <div className="w-full h-full flex flex-col pt-24 pb-12 overflow-y-auto custom-scrollbar">
            <div className="max-w-7xl mx-auto w-full px-4 md:px-8 space-y-8 pb-32">
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

                        <div className="flex bg-slate-100 rounded-lg p-1 border border-slate-200">
                            <button
                                onClick={handleCopy}
                                disabled={contributors.length === 0}
                                className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-md text-slate-600 hover:bg-white hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase tracking-wider tooltip-trigger"
                                title="Copy JSON"
                            >
                                {isCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                <span className="hidden sm:inline">{isCopied ? 'Copied' : 'Copy'}</span>
                            </button>
                            <div className="w-px bg-slate-200 mx-1 my-1"></div>
                            <button
                                onClick={() => downloadAsJson(contributors)}
                                disabled={contributors.length === 0}
                                className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-md bg-white text-indigo-600 hover:bg-slate-50 hover:text-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm uppercase tracking-wider"
                                title="Download JSON"
                            >
                                <FileDown size={14} />
                                <span className="hidden sm:inline">JSON</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Matrix Views Section */}
                <div className="pt-8 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                        <div className="flex bg-slate-100/80 p-1.5 rounded-xl shadow-inner border border-slate-200 gap-1 overflow-x-auto custom-scrollbar w-full md:w-auto">
                            <button onClick={() => setViewMode('MATRIX')} className={`flex flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${viewMode === 'MATRIX' ? 'bg-white text-indigo-600 shadow-md ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`}>
                                <LayoutGrid size={16} /> Matrix Grid
                            </button>
                            <button onClick={() => setViewMode('TABLE')} className={`flex flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${viewMode === 'TABLE' ? 'bg-white text-indigo-600 shadow-md ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`}>
                                <Table size={16} /> Standard Table
                            </button>
                            <button onClick={() => setViewMode('INLINE_MATRIX')} className={`flex flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${viewMode === 'INLINE_MATRIX' ? 'bg-white text-red-600 shadow-md ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`}>
                                <AlignLeft size={16} /> Heatmap
                            </button>
                            <div className="w-px bg-slate-200 mx-2 my-1"></div>
                            <button onClick={() => setViewMode('AUTHOR_LIST')} className={`flex flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${viewMode === 'AUTHOR_LIST' ? 'bg-white text-slate-800 shadow-md ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`} title="View by Author">
                                <Users size={16} /> By Author
                            </button>
                            <button onClick={() => setViewMode('ROLE_LIST')} className={`flex flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${viewMode === 'ROLE_LIST' ? 'bg-white text-slate-800 shadow-md ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`} title="View by Role">
                                <AlignLeft size={16} /> By Role
                            </button>
                        </div>
                    </div>

                    <div className="w-full relative min-h-[300px] flex flex-col gap-4">
                        {viewMode === 'MATRIX' && <MatrixView contributors={contributors} onUpdateName={updateContributorName} onToggleRole={toggleContributorRole} onRemove={removeContributor} />}
                        {viewMode === 'TABLE' && <TableView contributors={contributors} />}
                        {viewMode === 'INLINE_MATRIX' && <InlineMatrixView contributors={contributors} />}
                        {viewMode === 'AUTHOR_LIST' && <AuthorListView contributors={contributors} />}
                        {viewMode === 'ROLE_LIST' && <RoleListView contributors={contributors} />}

                        {contributors.length === 0 ? (
                            <div className="pt-6">
                                <button
                                    onClick={() => {
                                        setViewMode('MATRIX');
                                        addContributor();
                                    }}
                                    className="w-full bg-indigo-50/50 border-2 border-dashed border-indigo-200 hover:border-indigo-400 hover:bg-indigo-100/50 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-indigo-400 hover:text-indigo-600 transition-all group shadow-sm"
                                >
                                    <div className="p-4 bg-white rounded-full shadow-md group-hover:scale-110 group-hover:-translate-y-1 transition-all">
                                        <UserPlus size={32} />
                                    </div>
                                    <div className="text-center">
                                        <span className="font-bold font-sans tracking-wide text-lg sm:text-xl block text-indigo-700 mb-1">Add First Contributor</span>
                                        <span className="text-sm font-medium text-indigo-500/80">Start building your CRediT matrix</span>
                                    </div>
                                </button>
                            </div>
                        ) : viewMode === 'MATRIX' ? (
                            <div className="pt-2">
                                <button
                                    onClick={addContributor}
                                    className="w-full bg-slate-50/50 border border-dashed border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/30 rounded-lg p-3 flex items-center justify-center gap-2 text-slate-500 hover:text-indigo-600 transition-all group shadow-sm"
                                >
                                    <UserPlus size={16} />
                                    <span className="font-semibold font-sans tracking-wide text-sm">Add Contributor Row</span>
                                </button>
                            </div>
                        ) : (
                            <div className="pt-6 pb-2 text-center text-slate-400 text-sm italic">
                                Note: You can only add authors and edit roles in the Matrix Grid view.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
