import React from 'react';
import { Contributor } from '../../../types';
import { creditRoles } from '../../../data/roles';

interface InlineMatrixViewProps {
    contributors: Contributor[];
}

export const InlineMatrixView: React.FC<InlineMatrixViewProps> = ({ contributors }) => {
    return (
        <div className="w-full overflow-x-auto border border-red-200 rounded-lg bg-red-50/30 shadow-sm custom-scrollbar pb-2">
            <table className="min-w-full divide-y divide-red-100">
                <thead className="bg-red-50/80">
                    <tr>
                        <th scope="col" className="px-4 py-3 text-left text-[11px] font-bold text-red-800 uppercase tracking-widest sticky left-0 z-20 bg-red-50 border-r border-red-200/50">
                            Contributor
                        </th>
                        {creditRoles.map(role => (
                            <th key={role.id} scope="col" className="px-2 py-3 text-center min-w-[36px]">
                                {/* Diagonal Text Header */}
                                <div className="w-6 h-28 relative overflow-hidden mx-auto">
                                    <div className="absolute font-sans text-[10px] font-bold tracking-wider uppercase text-red-900 origin-top-left rotate-[-90deg] translate-y-24 translate-x-3 whitespace-nowrap">
                                        {role.title}
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-red-100 font-sans bg-white/50">
                    {contributors.map(contributor => (
                        <tr key={contributor.id} className="group hover:bg-red-50/50 transition-colors">
                            <td className="px-4 py-2 whitespace-nowrap text-xs font-semibold text-red-900 sticky left-0 z-10 bg-white/80 border-r border-red-100 backdrop-blur-sm shadow-[1px_0_0_0_#fee2e2]">
                                <span>{contributor.name || 'Unnamed Author'}</span>
                            </td>
                            {creditRoles.map(role => {
                                const hasRole = contributor.roles.includes(role.id);
                                return (
                                    <td
                                        key={role.id}
                                        className="px-2 py-2 text-center text-red-600 font-bold text-xs bg-white/30 border-l border-red-50"
                                    >
                                        {hasRole ? (
                                            <span className="inline-flex w-4 h-4 rounded-sm bg-red-600 text-white items-center justify-center border border-red-700">✓</span>
                                        ) : (
                                            <span className="text-red-200/50 hover:text-red-400">—</span>
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
