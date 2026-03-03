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
    }, [contributors, creditRoles]);

    return (
        <div className="w-full space-y-3">
            {/* Legend */}
            <div className="flex items-center gap-6 text-xs text-slate-500 font-sans px-1">
                <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 bg-[#2c5282] border border-[#2c5282]" />
                    <span>Contributed</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 bg-[#f7fafc] border border-slate-300" />
                    <span>Not applicable</span>
                </div>
            </div>

            <div className="w-full overflow-x-auto relative">
                {/* Extra top padding for rotated headers */}
                <div className="pt-[120px]">
                    <table className="border-collapse" style={{ borderSpacing: 0 }}>
                        <thead>
                            <tr>
                                {/* Top-left corner cell */}
                                <th className="sticky left-0 z-40 bg-white border-b border-r border-slate-400 px-3 py-2 text-left text-[11px] font-bold text-slate-700 uppercase tracking-wider align-bottom min-w-[140px]">
                                    Author
                                </th>
                                {activeRoles.map(role => (
                                    <th
                                        key={role.id}
                                        className="border-b border-l border-slate-400 relative p-0 align-bottom"
                                        style={{ width: 36, minWidth: 36, maxWidth: 36 }}
                                    >
                                        {/* Rotated header text */}
                                        <div
                                            className="absolute bottom-0 left-1/2 origin-bottom-left whitespace-nowrap text-[11px] font-semibold text-slate-700 font-sans"
                                            style={{
                                                transform: 'rotate(-45deg) translateX(-50%)',
                                                transformOrigin: 'bottom left',
                                                paddingBottom: 6,
                                                paddingLeft: 2,
                                            }}
                                        >
                                            {role.title}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {contributors.map(contributor => (
                                <tr key={contributor.id}>
                                    <td className="sticky left-0 z-10 bg-white border-b border-r border-slate-400 px-3 py-1.5 text-sm font-semibold text-slate-800 font-sans whitespace-nowrap">
                                        {contributor.name || 'Unnamed'}
                                    </td>
                                    {activeRoles.map(role => {
                                        const hasRole = contributor.roles.includes(role.id);
                                        return (
                                            <td
                                                key={role.id}
                                                className="border-b border-l border-slate-300 p-0"
                                                style={{ width: 36, height: 28 }}
                                            >
                                                <div
                                                    className="w-full h-full"
                                                    style={{
                                                        backgroundColor: hasRole ? '#2c5282' : '#f7fafc',
                                                    }}
                                                    title={hasRole ? `${contributor.name}: ${role.title}` : ''}
                                                />
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {activeRoles.length === 0 && contributors.length > 0 && (
                <div className="text-center py-8 text-slate-400 text-sm italic">
                    No roles assigned yet. Use the Matrix Grid view to assign roles.
                </div>
            )}
        </div>
    );
};
