import React from 'react';
import { Contributor } from '../../../types';
import { creditRoles } from '../../../data/roles';

interface InlineMatrixViewProps {
    contributors: Contributor[];
}

export const InlineMatrixView: React.FC<InlineMatrixViewProps> = ({ contributors }) => {
    return (
        <div className="w-full overflow-x-auto border border-slate-200 rounded-lg bg-slate-50/30 shadow-sm custom-scrollbar pb-2">
            <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-slate-50/80">
                    <tr>
                        <th scope="col" className="px-4 py-3 text-left text-[11px] font-bold text-slate-800 uppercase tracking-widest sticky left-0 z-20 bg-slate-50 border-r border-slate-200/50">
                            Contributor
                        </th>
                        {creditRoles.map(role => {
                            const Icon = role.icon;
                            return (
                                <th key={role.id} scope="col" className="px-1 py-3 text-center min-w-[40px]">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-4 h-24 relative overflow-hidden mx-auto">
                                            <div className="absolute font-sans text-[9px] font-bold tracking-wider uppercase text-slate-600 origin-top-left rotate-[-90deg] translate-y-20 translate-x-2 whitespace-nowrap">
                                                {role.title}
                                            </div>
                                        </div>
                                        <Icon size={12} className="text-slate-400" strokeWidth={1.5} />
                                    </div>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans bg-white/50">
                    {contributors.map(contributor => (
                        <tr key={contributor.id} className="group hover:bg-indigo-50/50 transition-colors">
                            <td className="px-4 py-2 whitespace-nowrap text-xs font-semibold text-slate-900 sticky left-0 z-10 bg-white/80 border-r border-slate-100 backdrop-blur-sm shadow-[1px_0_0_0_#f1f5f9]">
                                <span>{contributor.name || 'Unnamed Author'}</span>
                            </td>
                            {creditRoles.map(role => {
                                const Icon = role.icon;
                                const hasRole = contributor.roles.includes(role.id);
                                return (
                                    <td
                                        key={role.id}
                                        className={`px-1 py-1 text-center border-l border-slate-50 transition-all ${hasRole ? 'bg-indigo-600/10' : ''}`}
                                    >
                                        <div className="flex justify-center items-center h-6">
                                            {hasRole ? (
                                                <Icon size={12} className="text-indigo-600" strokeWidth={2.5} />
                                            ) : (
                                                <span className="text-slate-200 text-[10px]">—</span>
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
