import React, { useMemo } from 'react';
import { Contributor } from '../../../types';
import { creditRoles } from '../../../data/roles';

interface InlineMatrixViewProps {
    contributors: Contributor[];
}

export const InlineMatrixView: React.FC<InlineMatrixViewProps> = ({ contributors }) => {
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

    return (
        <div className="w-full max-h-[65vh] overflow-x-auto overflow-y-auto border-t-2 border-b-2 border-slate-800 bg-white custom-scrollbar pb-0 relative">
            <table className="min-w-full divide-y divide-slate-300">
                <thead className="sticky top-0 z-30 bg-white shadow-sm">
                    <tr>
                        <th scope="col" className="px-4 py-3 text-left font-serif text-sm font-semibold text-slate-900 border-b-2 border-slate-800 sticky left-0 z-40 bg-white shadow-[1px_0_0_0_#e2e8f0]">
                            Author
                        </th>
                        {activeRoles.map(role => {
                            const Icon = role.icon;
                            return (
                                <th key={role.id} scope="col" className="px-3 py-3 text-center font-serif text-sm font-semibold text-slate-900 bg-white border-b-2 border-slate-800 border-l border-slate-200" title={role.title}>
                                    <div className="flex justify-center">
                                        <Icon size={18} className="text-slate-700" strokeWidth={1.5} />
                                    </div>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                    {contributors.map(contributor => (
                        <tr key={contributor.id} className="group hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-serif text-slate-800 sticky left-0 z-20 bg-white group-hover:bg-slate-50 transition-colors shadow-[1px_0_0_0_#f1f5f9]">
                                <span className="font-semibold">{contributor.name || 'Unnamed Author'}</span>
                            </td>
                            {activeRoles.map(role => {
                                const hasRole = contributor.roles.includes(role.id);
                                return (
                                    <td
                                        key={role.id}
                                        className="px-3 py-3 text-center border-l border-slate-200"
                                    >
                                        <div className="flex justify-center">
                                            <div
                                                className={`w-[22px] h-[22px] rounded-[3px] ${hasRole
                                                        ? 'bg-slate-800'
                                                        : 'bg-slate-100'
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
                            <td className="px-4 py-2.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider sticky left-0 z-20 bg-slate-50 shadow-[1px_0_0_0_#f1f5f9]">
                                Total
                            </td>
                            {activeRoles.map(role => (
                                <td key={role.id} className="px-3 py-2.5 text-center border-l border-slate-200">
                                    <span className="text-xs font-bold text-slate-600 tabular-nums">
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
