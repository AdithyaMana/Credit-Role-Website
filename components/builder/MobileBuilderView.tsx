import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { UserPlus, Trash2, ChevronDown, Copy, Check, FileDown, Download, FileText, Table, Image as ImageIcon } from 'lucide-react';
import { useBuilderState } from '../../hooks/useBuilderState';
import { creditRoles } from '../../data/roles';
import { downloadAsJson, downloadAsCsv, downloadAsMarkdown, copyToClipboard, copyTextToClipboard, generateMarkdownData, generateCsvData } from '../../lib/exportUtils';
import { toPng } from 'html-to-image';

type MobileView = 'edit' | 'table' | 'heatmap' | 'author' | 'role';

export const MobileBuilderView: React.FC = () => {
    const {
        contributors,
        addContributor,
        removeContributor,
        updateContributorName,
        toggleContributorRole,
        clearAll,
    } = useBuilderState();

    const [mobileView, setMobileView] = useState<MobileView>('edit');
    const [expandedContributor, setExpandedContributor] = useState<string | null>(null);
    const [showExportMenu, setShowExportMenu] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [copyLabel, setCopyLabel] = useState('');

    const activeRoles = useMemo(() => {
        const usedRoleIds = new Set(contributors.flatMap(c => c.roles));
        return creditRoles.filter(role => usedRoleIds.has(role.id));
    }, [contributors]);

    const roleCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        for (const role of activeRoles) {
            counts[role.id] = contributors.filter(c => c.roles.includes(role.id)).length;
        }
        return counts;
    }, [contributors, activeRoles]);

    const showCopied = (label: string) => {
        setIsCopied(true);
        setCopyLabel(label);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleDownloadPng = async () => {
        const el = document.getElementById('mobile-export-target');
        if (!el) return;
        try {
            const dataUrl = await toPng(el, { backgroundColor: '#ffffff' });
            const link = document.createElement('a');
            link.download = 'credit-matrix.png';
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Failed to export image', err);
        }
    };

    const viewTabs: { key: MobileView; label: string }[] = [
        { key: 'edit', label: 'Edit' },
        { key: 'table', label: 'Table' },
        { key: 'heatmap', label: 'Heatmap' },
        { key: 'author', label: 'By Author' },
        { key: 'role', label: 'By Role' },
    ];

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">CRediT Builder</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Build your contribution matrix</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={clearAll}
                        disabled={contributors.length === 0}
                        className="p-2 text-slate-400 hover:text-red-500 disabled:opacity-30 transition-colors"
                    >
                        <Trash2 size={18} />
                    </button>
                    <div className="relative">
                        <button
                            onClick={() => setShowExportMenu(!showExportMenu)}
                            disabled={contributors.length === 0}
                            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-indigo-600 text-white disabled:opacity-40 transition-all"
                        >
                            <FileDown size={14} />
                            Export
                            <ChevronDown size={12} className={`transition-transform ${showExportMenu ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {showExportMenu && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setShowExportMenu(false)} />
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                        transition={{ duration: 0.12 }}
                                        className="absolute right-0 top-full mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden"
                                    >
                                        <div className="p-2 space-y-0.5 bg-slate-50 border-b border-slate-100">
                                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">Copy</div>
                                            <button onClick={() => { copyToClipboard(contributors).then(s => s && showCopied('JSON')); setShowExportMenu(false); }} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-slate-700 hover:bg-white rounded-lg"><Copy size={12} /> JSON</button>
                                            <button onClick={() => { copyTextToClipboard(generateMarkdownData(contributors)).then(s => s && showCopied('Markdown')); setShowExportMenu(false); }} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-slate-700 hover:bg-white rounded-lg"><Copy size={12} /> Markdown</button>
                                            <button onClick={() => { copyTextToClipboard(generateCsvData(contributors)).then(s => s && showCopied('CSV')); setShowExportMenu(false); }} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-slate-700 hover:bg-white rounded-lg"><Copy size={12} /> CSV</button>
                                        </div>
                                        <div className="p-2 space-y-0.5">
                                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">Download</div>
                                            <button onClick={() => { handleDownloadPng(); setShowExportMenu(false); }} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg"><ImageIcon size={12} /> PNG</button>
                                            <button onClick={() => { downloadAsCsv(contributors); setShowExportMenu(false); }} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg"><Table size={12} /> CSV</button>
                                            <button onClick={() => { downloadAsMarkdown(contributors); setShowExportMenu(false); }} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg"><FileText size={12} /> Markdown</button>
                                            <button onClick={() => { downloadAsJson(contributors); setShowExportMenu(false); }} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg"><Download size={12} /> JSON</button>
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Copy Toast */}
            <AnimatePresence>
                {isCopied && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2 text-sm font-bold"
                    >
                        <Check size={14} /> Copied {copyLabel}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* View Tabs */}
            <div className="flex overflow-x-auto gap-1 bg-slate-100 rounded-lg p-1 -mx-1 custom-scrollbar">
                {viewTabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setMobileView(tab.key)}
                        className={`flex-shrink-0 px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${mobileView === tab.key
                            ? 'bg-white text-indigo-600 shadow-sm'
                            : 'text-slate-500'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div id="mobile-export-target" className="bg-white rounded-xl">
                {mobileView === 'edit' && (
                    <div className="space-y-3">
                        {contributors.map(contributor => (
                            <div key={contributor.id} className="border border-slate-200 rounded-xl overflow-hidden">
                                {/* Contributor header row */}
                                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border-b border-slate-100">
                                    <input
                                        type="text"
                                        value={contributor.name}
                                        onChange={(e) => updateContributorName(contributor.id, e.target.value)}
                                        placeholder="Name..."
                                        className="flex-1 bg-transparent text-sm font-semibold text-slate-800 outline-none border-b border-transparent focus:border-indigo-400 transition-colors"
                                    />
                                    <button
                                        onClick={() => setExpandedContributor(expandedContributor === contributor.id ? null : contributor.id)}
                                        className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider px-2 py-1"
                                    >
                                        {expandedContributor === contributor.id ? 'Hide' : 'Roles'}
                                    </button>
                                    <button
                                        onClick={() => removeContributor(contributor.id)}
                                        className="p-1 text-slate-300 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>

                                {/* Role assignment: always show assigned, expand to show all */}
                                <AnimatePresence>
                                    {expandedContributor === contributor.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="grid grid-cols-2 gap-1 p-2">
                                                {creditRoles.map(role => {
                                                    const Icon = role.icon;
                                                    const hasRole = contributor.roles.includes(role.id);
                                                    return (
                                                        <button
                                                            key={role.id}
                                                            onClick={() => toggleContributorRole(contributor.id, role.id)}
                                                            className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${hasRole
                                                                ? 'bg-slate-800 text-white'
                                                                : 'bg-slate-50 text-slate-500 border border-slate-200'
                                                                }`}
                                                        >
                                                            <Icon size={14} strokeWidth={1.5} />
                                                            <span className="overflow-hidden whitespace-nowrap">{role.title.split(' ')[0]}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Show assigned role icons in a row */}
                                {expandedContributor !== contributor.id && contributor.roles.length > 0 && (
                                    <div className="flex flex-wrap gap-1 px-3 py-2">
                                        {contributor.roles.map(roleId => {
                                            const role = creditRoles.find(r => r.id === roleId);
                                            if (!role) return null;
                                            const Icon = role.icon;
                                            return (
                                                <div key={roleId} className="w-7 h-7 flex items-center justify-center bg-slate-100 rounded-md" title={role.title}>
                                                    <Icon size={14} className="text-slate-600" strokeWidth={1.5} />
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}

                        <button
                            onClick={addContributor}
                            className="w-full border-2 border-dashed border-slate-200 hover:border-indigo-300 rounded-xl p-4 flex items-center justify-center gap-2 text-slate-400 hover:text-indigo-500 transition-all"
                        >
                            <UserPlus size={18} />
                            <span className="text-sm font-semibold">Add Contributor</span>
                        </button>
                    </div>
                )}

                {mobileView === 'table' && (
                    <div className="overflow-x-auto border-t-2 border-b-2 border-slate-800 rounded-lg">
                        <table className="min-w-full divide-y divide-slate-300">
                            <thead className="bg-white">
                                <tr>
                                    <th className="px-3 py-2.5 text-left text-xs font-bold text-slate-800 uppercase tracking-wider sticky left-0 z-10 bg-white border-b-2 border-slate-800 border-r border-slate-200">Author</th>
                                    {activeRoles.map(role => {
                                        const Icon = role.icon;
                                        return (
                                            <th key={role.id} className="px-2 py-2.5 text-center border-b-2 border-slate-800 border-l border-slate-200 bg-white" title={role.title}>
                                                <Icon size={16} className="text-slate-600 mx-auto" strokeWidth={1.5} />
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {contributors.map(c => (
                                    <tr key={c.id}>
                                        <td className="px-3 py-2 text-sm font-semibold text-slate-800 whitespace-nowrap sticky left-0 bg-white border-r border-slate-200">{c.name || 'Unnamed'}</td>
                                        {activeRoles.map(role => (
                                            <td key={role.id} className="px-2 py-2 text-center border-l border-slate-100 text-slate-800 font-bold">
                                                {c.roles.includes(role.id) ? '•' : ''}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {activeRoles.length === 0 && contributors.length > 0 && (
                            <p className="text-center py-6 text-slate-400 text-sm italic">No roles assigned yet.</p>
                        )}
                    </div>
                )}

                {mobileView === 'heatmap' && (
                    <div className="overflow-x-auto border-t-2 border-b-2 border-slate-800 rounded-lg">
                        <table className="min-w-full divide-y divide-slate-300">
                            <thead className="bg-white">
                                <tr>
                                    <th className="px-3 py-2.5 text-left text-xs font-bold text-slate-800 uppercase tracking-wider sticky left-0 z-10 bg-white border-b-2 border-slate-800 border-r border-slate-200">Author</th>
                                    {activeRoles.map(role => (
                                        <th key={role.id} className="px-2 py-2.5 text-center border-b-2 border-slate-800 border-l border-slate-200 bg-white text-[10px] font-semibold text-slate-700 min-w-[80px]">
                                            {role.title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {contributors.map(c => (
                                    <tr key={c.id}>
                                        <td className="px-3 py-2 text-sm font-semibold text-slate-800 whitespace-nowrap sticky left-0 bg-white border-r border-slate-200">{c.name || 'Unnamed'}</td>
                                        {activeRoles.map(role => (
                                            <td key={role.id} className="px-1 py-1.5 text-center border-l border-slate-100">
                                                {c.roles.includes(role.id) ? (
                                                    <span className="text-slate-800 font-bold">✓</span>
                                                ) : (
                                                    <span className="text-slate-200">—</span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                {contributors.length > 0 && activeRoles.length > 0 && (
                                    <tr className="border-t-2 border-slate-800 bg-slate-50">
                                        <td className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase sticky left-0 bg-slate-50 border-r border-slate-200">Total</td>
                                        {activeRoles.map(role => (
                                            <td key={role.id} className="px-1 py-2 text-center border-l border-slate-100">
                                                <span className="text-[11px] font-bold text-slate-600">{roleCounts[role.id]}/{contributors.length}</span>
                                            </td>
                                        ))}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {activeRoles.length === 0 && contributors.length > 0 && (
                            <p className="text-center py-6 text-slate-400 text-sm italic">No roles assigned yet.</p>
                        )}
                    </div>
                )}

                {mobileView === 'author' && (
                    <div className="p-4 space-y-3">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                            Contributions (by Author)
                        </h3>
                        <div className="space-y-3 text-sm text-slate-800">
                            {contributors.map(c => {
                                const roles = c.roles.map(rid => creditRoles.find(r => r.id === rid)?.title).filter(Boolean);
                                return (
                                    <div key={c.id}>
                                        <strong className="text-slate-900">{c.name || 'Unnamed'}:</strong>{' '}
                                        {roles.length > 0 ? roles.join(', ') + '.' : <em className="text-slate-400">No roles.</em>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {mobileView === 'role' && (
                    <div className="p-4 space-y-3">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                            Contributions (by Role)
                        </h3>
                        <div className="space-y-3 text-sm text-slate-800">
                            {activeRoles.map(role => {
                                const authors = contributors.filter(c => c.roles.includes(role.id)).map(c => c.name || 'Unnamed');
                                if (authors.length === 0) return null;
                                return (
                                    <div key={role.id}>
                                        <strong className="text-slate-900">{role.title}:</strong>{' '}
                                        {authors.join(', ')}.
                                    </div>
                                );
                            })}
                            {activeRoles.length === 0 && (
                                <p className="text-slate-400 italic">No roles assigned yet.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
