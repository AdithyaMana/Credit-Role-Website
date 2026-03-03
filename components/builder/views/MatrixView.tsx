import React, { useState, useEffect } from 'react';
import { Contributor, CategoryType } from '../../../types';
import { creditRoles } from '../../../data/roles';
import clsx from 'clsx';
import { ArrowRightLeft, Trash2 } from 'lucide-react';

interface MatrixViewProps {
    contributors: Contributor[];
    onUpdateName: (id: string, name: string) => void;
    onToggleRole: (contributorId: string, roleId: string) => void;
    onRemove: (id: string) => void;
}

const getCategoryColorText = (category: CategoryType) => {
    switch (category) {
        case CategoryType.STRATEGY: return 'text-indigo-600';
        case CategoryType.RESEARCH: return 'text-teal-600';
        case CategoryType.INFRASTRUCTURE: return 'text-slate-600';
        case CategoryType.DISSEMINATION: return 'text-orange-600';
        default: return 'text-slate-600';
    }
};

export const MatrixView: React.FC<MatrixViewProps> = ({ contributors, onUpdateName, onToggleRole, onRemove }) => {
    const [isTransposed, setIsTransposed] = useState(false);

    // State for drag-to-paint functionality
    const [dragState, setDragState] = useState<{ active: boolean, action: 'ADD' | 'REMOVE' | null }>({ active: false, action: null });

    useEffect(() => {
        const handleMouseUp = () => setDragState({ active: false, action: null });
        window.addEventListener('mouseup', handleMouseUp);
        return () => window.removeEventListener('mouseup', handleMouseUp);
    }, []);

    const handleMouseDown = (contributorId: string, roleId: string, currentlyHasRole: boolean) => {
        const newAction = currentlyHasRole ? 'REMOVE' : 'ADD';
        setDragState({ active: true, action: newAction });
        onToggleRole(contributorId, roleId);
    };

    const handleMouseEnter = (contributorId: string, roleId: string, currentlyHasRole: boolean) => {
        if (!dragState.active || !dragState.action) return;

        if (dragState.action === 'ADD' && !currentlyHasRole) {
            onToggleRole(contributorId, roleId);
        } else if (dragState.action === 'REMOVE' && currentlyHasRole) {
            onToggleRole(contributorId, roleId);
        }
    };

    return (
        <div className="w-full space-y-4 select-none">
            <div className="flex justify-end pr-1">
                <button
                    onClick={() => setIsTransposed(!isTransposed)}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors uppercase tracking-wider"
                >
                    <ArrowRightLeft size={14} />
                    <span>Swap Rows/Cols</span>
                </button>
            </div>

            <div className="w-full max-h-[65vh] overflow-x-auto overflow-y-auto shadow-sm border border-slate-200 rounded-xl bg-white custom-scrollbar pb-0 relative">
                <table className="min-w-full divide-y divide-slate-200 border-collapse">
                    <thead className="bg-slate-50 sticky top-0 z-30 shadow-sm">
                        {!isTransposed ? (
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider sticky top-0 left-0 z-40 bg-slate-50 border-r border-b border-slate-200 shadow-[1px_0_0_0_#e2e8f0]">
                                    Contributor
                                </th>
                                {creditRoles.map(role => {
                                    const Icon = role.icon;
                                    return (
                                        <th key={role.id} scope="col" className="px-3 py-4 text-center min-w-[70px] bg-slate-50 sticky top-0 z-30 border-b border-slate-200">
                                            <div className="flex flex-col items-center gap-2 group relative" title={role.title}>
                                                <Icon size={20} className={getCategoryColorText(role.category)} strokeWidth={2} />
                                                <span className="hidden opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 bg-slate-800 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded transition-opacity whitespace-nowrap z-30">
                                                    {role.title}
                                                </span>
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        ) : (
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider sticky top-0 left-0 z-40 bg-slate-50 border-r border-b border-slate-200 shadow-[1px_0_0_0_#e2e8f0]">
                                    Role
                                </th>
                                {contributors.map(contributor => (
                                    <th key={contributor.id} scope="col" className="px-3 py-4 text-center min-w-[140px] bg-slate-50 sticky top-0 z-30 border-b border-slate-200 group">
                                        <div className="flex items-center justify-center gap-1 relative w-full h-full">
                                            <input
                                                type="text"
                                                value={contributor.name}
                                                onChange={(e) => onUpdateName(contributor.id, e.target.value)}
                                                placeholder="Name..."
                                                className="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:ring-0 px-1 py-1 w-full text-center outline-none font-bold text-sm text-slate-700 transition-colors"
                                            />
                                            <button
                                                onClick={() => onRemove(contributor.id)}
                                                className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-slate-300 hover:text-red-500 rounded transition-colors opacity-0 group-hover:opacity-100 bg-slate-50/80"
                                                title="Remove"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        )}
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100 font-sans">
                        {!isTransposed ? (
                            contributors.map(contributor => (
                                <tr key={contributor.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-slate-800 sticky left-0 z-20 bg-white border-r border-slate-100 group-hover:bg-slate-50 transition-colors shadow-[1px_0_0_0_#f1f5f9]">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={contributor.name}
                                                onChange={(e) => onUpdateName(contributor.id, e.target.value)}
                                                placeholder="Name..."
                                                className="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:ring-0 px-1 py-1 w-32 outline-none font-semibold transition-colors"
                                            />
                                            <button
                                                onClick={() => onRemove(contributor.id)}
                                                className="p-1 text-slate-300 hover:text-red-500 rounded transition-colors opacity-0 group-hover:opacity-100"
                                                title="Remove"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                    {creditRoles.map(role => {
                                        const Icon = role.icon;
                                        const hasRole = contributor.roles.includes(role.id);
                                        return (
                                            <td
                                                key={role.id}
                                                className="px-3 py-4 whitespace-nowrap text-center cursor-pointer hover:bg-indigo-50/50 transition-colors"
                                                onMouseDown={() => handleMouseDown(contributor.id, role.id, hasRole)}
                                                onMouseEnter={() => handleMouseEnter(contributor.id, role.id, hasRole)}
                                            >
                                                {hasRole ? (
                                                    <div className="w-full flex justify-center pointer-events-none">
                                                        <div className="w-6 h-6 rounded bg-slate-50 flex items-center justify-center border border-slate-200 shadow-sm scale-110 transition-transform">
                                                            <Icon size={14} className={getCategoryColorText(role.category)} strokeWidth={3} />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-slate-200/50 block group-hover:text-slate-300 pointer-events-none">—</span>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))
                        ) : (
                            creditRoles.map(role => {
                                const Icon = role.icon;
                                return (
                                    <tr key={role.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-slate-800 sticky left-0 z-20 bg-white border-r border-slate-100 group-hover:bg-slate-50 transition-colors shadow-[1px_0_0_0_#f1f5f9]">
                                            <div className="flex items-center gap-3">
                                                <Icon size={16} className={getCategoryColorText(role.category)} strokeWidth={2} />
                                                <span>{role.title}</span>
                                            </div>
                                        </td>
                                        {contributors.map(contributor => {
                                            const hasRole = contributor.roles.includes(role.id);
                                            return (
                                                <td
                                                    key={contributor.id}
                                                    className="px-3 py-4 whitespace-nowrap text-center cursor-pointer hover:bg-indigo-50/50 transition-colors"
                                                    onMouseDown={() => handleMouseDown(contributor.id, role.id, hasRole)}
                                                    onMouseEnter={() => handleMouseEnter(contributor.id, role.id, hasRole)}
                                                >
                                                    {hasRole ? (
                                                        <div className="w-full flex justify-center pointer-events-none">
                                                            <div className="w-6 h-6 rounded bg-slate-50 flex items-center justify-center border border-slate-200 shadow-sm scale-110 transition-transform">
                                                                <Icon size={14} className={getCategoryColorText(role.category)} strokeWidth={3} />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-slate-200/50 block group-hover:text-slate-300 pointer-events-none">—</span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
