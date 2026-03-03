import React from 'react';
import { Contributor } from '../../../types';
import { creditRoles } from '../../../data/roles';

interface InlineMatrixViewProps {
    contributors: Contributor[];
}

export const InlineMatrixView: React.FC<InlineMatrixViewProps> = ({ contributors }) => {
    // Only show roles assigned to at least one contributor
    const activeRoles = creditRoles.filter(role =>
        contributors.some(c => c.roles.includes(role.id))
    );

    if (contributors.length === 0 || activeRoles.length === 0) {
        return (
            <div className="w-full py-12 text-center text-slate-400 italic text-sm">
                No roles assigned yet. Use the Matrix Grid to assign roles.
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto rounded-lg border border-slate-300 bg-white shadow-sm">
            <table className="border-collapse">
                {/* Header: vertical role names */}
                <thead>
                    <tr>
                        {/* Top-left corner cell */}
                        <th className="sticky left-0 z-30 bg-white border-b-2 border-r border-slate-400 px-4 py-2 text-left text-xs font-bold text-slate-600 uppercase tracking-wider align-bottom">
                            Author
                        </th>
                        {activeRoles.map(role => {
                            const Icon = role.icon;
                            return (
                                <th
                                    key={role.id}
                                    className="border-b-2 border-slate-400 border-l border-slate-200 px-0 py-2 align-bottom"
                                    style={{ width: 36 }}
                                >
                                    <div className="flex flex-col items-center justify-end h-full gap-1 pb-1" title={role.title}>
                                        <Icon size={14} className="text-slate-500" strokeWidth={1.5} />
                                    </div>
                                </th>
                            );
                        })}
                    </tr>
                </thead>

                {/* Body: author rows with filled/empty cells */}
                <tbody>
                    {contributors.map((contributor, rowIdx) => (
                        <tr key={contributor.id} className="group">
                            {/* Author name */}
                            <td className={`sticky left-0 z-20 bg-white px-4 py-2 text-sm font-semibold text-slate-800 whitespace-nowrap border-r border-slate-400 group-hover:bg-slate-50 transition-colors ${rowIdx < contributors.length - 1 ? 'border-b border-slate-200' : ''}`}>
                                {contributor.name || 'Unnamed'}
                            </td>
                            {/* Role cells */}
                            {activeRoles.map(role => {
                                const hasRole = contributor.roles.includes(role.id);
                                return (
                                    <td
                                        key={role.id}
                                        className={`text-center border-l border-slate-200 ${rowIdx < contributors.length - 1 ? 'border-b border-slate-200' : ''}`}
                                        style={{ width: 36, height: 32, padding: 0 }}
                                    >
                                        {hasRole ? (
                                            <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                    <circle cx="6" cy="6" r="3" fill="white" opacity="0.5" />
                                                </svg>
                                            </div>
                                        ) : (
                                            <div className="w-full h-full bg-slate-50" />
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
