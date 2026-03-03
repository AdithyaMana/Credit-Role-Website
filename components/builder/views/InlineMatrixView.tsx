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
        <div className="w-full overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-sm custom-scrollbar relative">
            <table className="min-w-full border-separate border-spacing-0">
                <thead>
                    <tr className="bg-slate-50/80 backdrop-blur-sm">
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-800 uppercase tracking-widest sticky top-0 left-0 z-40 bg-slate-50 border-b-2 border-r-2 border-slate-900 h-40 align-bottom">
                            Contributor
                        </th>
                        {activeRoles.map(role => (
                            <th key={role.id} className="px-0 py-0 text-center min-w-[40px] sticky top-0 z-30 bg-slate-50 border-b-2 border-slate-900 border-r border-slate-200 h-40 align-bottom group">
                                <div className="w-10 h-32 relative mx-auto">
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 -rotate-90 origin-center whitespace-nowrap text-[10px] font-bold tracking-wider uppercase text-slate-600 group-hover:text-slate-950 transition-colors">
                                        {role.title}
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                    {contributors.map(contributor => (
                        <tr key={contributor.id} className="hover:bg-slate-50/80 transition-colors group">
                            <td className="px-6 py-3 whitespace-nowrap text-sm font-bold text-slate-900 sticky left-0 z-20 bg-white group-hover:bg-slate-50/80 border-r-2 border-slate-900 transition-colors">
                                {contributor.name || 'Unnamed Author'}
                            </td>
                            {activeRoles.map(role => {
                                const hasRole = contributor.roles.includes(role.id);
                                return (
                                    <td
                                        key={role.id}
                                        className={`p-0 text-center border-r border-slate-200 h-10 transition-colors ${hasRole ? 'bg-slate-900' : 'bg-white'}`}
                                    >
                                        <div className="w-full h-full flex items-center justify-center">
                                            {hasRole ? (
                                                <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40 shadow-sm" />
                                            ) : (
                                                <div className="w-1 h-1 rounded-full bg-slate-100" />
                                            )}
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
