import React, { useMemo } from 'react';
import { Contributor } from '../../../types';
import { creditRoles } from '../../../data/roles';

interface InlineMatrixViewProps {
    contributors: Contributor[];
}

export const InlineMatrixView: React.FC<InlineMatrixViewProps> = ({ contributors }) => {
    // Only show roles that have been assigned to at least one contributor
    const activeRoles = useMemo(() => {
        const usedRoleIds = new Set(contributors.flatMap(c => c.roles));
        return creditRoles.filter(role => usedRoleIds.has(role.id));
    }, [contributors]);

    // Count how many contributors have each role
    const roleCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        for (const role of activeRoles) {
            counts[role.id] = contributors.filter(c => c.roles.includes(role.id)).length;
        }
        return counts;
    }, [contributors, activeRoles]);

    return (
        <div className="w-full overflow-x-auto border border-slate-200 rounded-lg bg-white shadow-sm custom-scrollbar relative">
            <table className="min-w-full border-collapse">
                <thead className="sticky top-0 z-30">
                    <tr className="border-b-2 border-slate-800">
                        <th scope="col" className="px-5 py-3 text-left text-xs font-bold text-slate-800 uppercase tracking-wider sticky left-0 z-40 bg-white border-r-2 border-slate-800">
                            Contributor
                        </th>
                        {activeRoles.map(role => (
                            <th
                                key={role.id}
                                scope="col"
                                className="px-1 py-3 text-center min-w-[56px] bg-white border-l border-slate-200"
                                title={role.title}
                            >
                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider leading-tight block">
                                    {role.title.length > 12 ? role.title.substring(0, 10) + '.' : role.title}
                                </span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="font-sans">
                    {contributors.map((contributor, rowIdx) => (
                        <tr
                            key={contributor.id}
                            className={`border-b border-slate-100 ${rowIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                        >
                            <td className="px-5 py-2.5 whitespace-nowrap text-sm font-semibold text-slate-800 sticky left-0 z-10 border-r-2 border-slate-800 bg-inherit">
                                {contributor.name || 'Unnamed'}
                            </td>
                            {activeRoles.map(role => {
                                const hasRole = contributor.roles.includes(role.id);
                                return (
                                    <td key={role.id} className="px-1 py-2 text-center border-l border-slate-100">
                                        <div className="flex justify-center">
                                            <div
                                                className={`w-5 h-5 rounded-sm transition-colors ${hasRole
                                                        ? 'bg-slate-800'
                                                        : 'bg-slate-100 border border-slate-200'
                                                    }`}
                                            />
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                    {/* Summary Row */}
                    {contributors.length > 0 && activeRoles.length > 0 && (
                        <tr className="border-t-2 border-slate-800 bg-slate-50">
                            <td className="px-5 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider sticky left-0 z-10 bg-slate-50 border-r-2 border-slate-800">
                                Count
                            </td>
                            {activeRoles.map(role => (
                                <td key={role.id} className="px-1 py-2.5 text-center border-l border-slate-100">
                                    <span className="text-[11px] font-bold text-slate-600 tabular-nums">
                                        {roleCounts[role.id]}
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
