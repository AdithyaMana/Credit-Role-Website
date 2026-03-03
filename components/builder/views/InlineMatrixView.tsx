import React, { useMemo } from 'react';
import { Contributor, CategoryType } from '../../../types';
import { creditRoles } from '../../../data/roles';

interface InlineMatrixViewProps {
    contributors: Contributor[];
}

const getCategoryBg = (category: CategoryType, hasRole: boolean) => {
    if (!hasRole) return 'bg-slate-50';
    switch (category) {
        case CategoryType.STRATEGY: return 'bg-indigo-500';
        case CategoryType.RESEARCH: return 'bg-teal-500';
        case CategoryType.INFRASTRUCTURE: return 'bg-slate-500';
        case CategoryType.DISSEMINATION: return 'bg-amber-500';
        default: return 'bg-slate-500';
    }
};

const getCategoryHeaderBg = (category: CategoryType) => {
    switch (category) {
        case CategoryType.STRATEGY: return 'text-indigo-700';
        case CategoryType.RESEARCH: return 'text-teal-700';
        case CategoryType.INFRASTRUCTURE: return 'text-slate-700';
        case CategoryType.DISSEMINATION: return 'text-amber-700';
        default: return 'text-slate-700';
    }
};

export const InlineMatrixView: React.FC<InlineMatrixViewProps> = ({ contributors }) => {
    // Only show roles that have been assigned to at least one contributor
    const activeRoles = useMemo(() => {
        const usedRoleIds = new Set(contributors.flatMap(c => c.roles));
        return creditRoles.filter(role => usedRoleIds.has(role.id));
    }, [contributors]);

    // Count how many contributors have each role (for intensity)
    const roleCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        for (const role of activeRoles) {
            counts[role.id] = contributors.filter(c => c.roles.includes(role.id)).length;
        }
        return counts;
    }, [contributors, activeRoles]);

    return (
        <div className="w-full overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-sm custom-scrollbar pb-0 relative">
            <table className="min-w-full border-collapse">
                {/* Header */}
                <thead className="sticky top-0 z-30 bg-slate-50">
                    <tr>
                        <th scope="col" className="px-5 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest sticky left-0 z-40 bg-slate-50 border-r border-b border-slate-200">
                            Contributor
                        </th>
                        {activeRoles.map(role => {
                            const Icon = role.icon;
                            return (
                                <th key={role.id} scope="col" className="px-2 py-3 text-center min-w-[44px] border-b border-slate-200 border-l border-slate-100" title={role.title}>
                                    <div className="flex flex-col items-center gap-1.5">
                                        <Icon size={16} className={getCategoryHeaderBg(role.category)} strokeWidth={1.5} />
                                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider leading-tight max-w-[40px] block">
                                            {role.title.split(' ')[0]}
                                        </span>
                                    </div>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                {/* Body */}
                <tbody className="font-sans">
                    {contributors.map((contributor, rowIdx) => (
                        <tr key={contributor.id} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}>
                            <td className="px-5 py-3 whitespace-nowrap text-sm font-semibold text-slate-800 sticky left-0 z-10 border-r border-slate-200 bg-inherit">
                                {contributor.name || 'Unnamed Author'}
                            </td>
                            {activeRoles.map(role => {
                                const hasRole = contributor.roles.includes(role.id);
                                return (
                                    <td
                                        key={role.id}
                                        className="px-1 py-2 text-center border-l border-slate-100"
                                    >
                                        <div className="flex justify-center">
                                            <div
                                                className={`w-7 h-7 rounded-md transition-all ${getCategoryBg(role.category, hasRole)} ${hasRole ? 'shadow-sm' : ''}`}
                                                title={hasRole ? `${contributor.name}: ${role.title}` : ''}
                                            >
                                                {hasRole && (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                    {/* Summary Row */}
                    {contributors.length > 0 && activeRoles.length > 0 && (
                        <tr className="bg-slate-100 border-t-2 border-slate-300">
                            <td className="px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider sticky left-0 z-10 bg-slate-100 border-r border-slate-200">
                                Total
                            </td>
                            {activeRoles.map(role => (
                                <td key={role.id} className="px-1 py-3 text-center border-l border-slate-100">
                                    <span className="text-xs font-bold text-slate-700">
                                        {roleCounts[role.id]}/{contributors.length}
                                    </span>
                                </td>
                            ))}
                        </tr>
                    )}
                </tbody>
            </table>
            {activeRoles.length === 0 && contributors.length > 0 && (
                <div className="text-center py-8 text-slate-400 text-sm italic">
                    No roles assigned yet. Use the Matrix Grid view to assign roles.
                </div>
            )}
        </div>
    );
};
