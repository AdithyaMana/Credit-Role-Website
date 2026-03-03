import React from 'react';
import { Contributor } from '../../../types';
import { creditRoles } from '../../../data/roles';

interface InlineMatrixViewProps {
    contributors: Contributor[];
}

export const InlineMatrixView: React.FC<InlineMatrixViewProps> = ({ contributors }) => {
    // Filter to only show roles that have been assigned to at least one author
    const activeRoles = creditRoles.filter(role =>
        contributors.some(c => c.roles.includes(role.id))
    );

    return (
        <div className="w-full overflow-x-auto border-t border-b border-slate-200 bg-white custom-scrollbar pb-0 relative">
            <table className="min-w-full divide-y divide-slate-100 border-collapse">
                <thead className="bg-slate-50/50">
                    <tr>
                        <th scope="col" className="px-5 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest sticky left-0 z-20 bg-slate-50 border-r border-slate-200">
                            Contributor
                        </th>
                        {activeRoles.map(role => (
                            <th key={role.id} scope="col" className="px-1 py-0 text-center min-w-[32px] border-b border-slate-200 align-bottom h-32">
                                <div className="w-8 h-full relative mx-auto overflow-visible">
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-sans text-[9px] font-bold tracking-wider uppercase text-slate-500 origin-bottom-left rotate-[-45deg] whitespace-nowrap">
                                        {role.title}
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                    {contributors.map(contributor => (
                        <tr key={contributor.id} className="group hover:bg-slate-50/50 transition-colors">
                            <td className="px-5 py-2.5 whitespace-nowrap text-xs font-semibold text-slate-700 sticky left-0 z-10 bg-white group-hover:bg-slate-50/50 border-r border-slate-200 shadow-[1px_0_0_0_#e2e8f0] transition-colors">
                                <span>{contributor.name || 'Unnamed Author'}</span>
                            </td>
                            {activeRoles.map(role => {
                                const hasRole = contributor.roles.includes(role.id);
                                return (
                                    <td
                                        key={role.id}
                                        className="p-1 text-center border-l border-slate-50"
                                    >
                                        <div className={`w-6 h-6 mx-auto rounded-sm flex items-center justify-center transition-all duration-300 ${hasRole
                                                ? 'bg-slate-900 border border-slate-900'
                                                : 'bg-slate-50 border border-slate-100'
                                            }`}>
                                            {hasRole && <div className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />}
                                        </div>
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
