import React from 'react';
import { Contributor } from '../../../types';
import { creditRoles } from '../../../data/roles';

interface InlineMatrixViewProps {
    contributors: Contributor[];
}

export const InlineMatrixView: React.FC<InlineMatrixViewProps> = ({ contributors }) => {
    return (
        <div className="w-full overflow-x-auto border border-slate-200 rounded-xl bg-slate-50/50 shadow-sm custom-scrollbar pb-0">
            <table className="min-w-full divide-y divide-slate-200 border-collapse">
                <thead className="bg-slate-50/80 sticky top-0 z-30 shadow-sm border-b border-slate-200">
                    <tr>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-800 uppercase tracking-wider sticky left-0 z-40 bg-slate-50 border-r border-slate-200">
                            Contributor
                        </th>
                        {creditRoles.map(role => (
                            <th key={role.id} scope="col" className="px-2 py-3 text-center min-w-[36px]">
                                {/* Diagonal Text Header */}
                                <div className="w-8 h-32 relative mx-auto">
                                    <div className="absolute font-sans text-[10px] font-bold tracking-wider uppercase text-slate-700 origin-top-left rotate-[-45deg] translate-y-28 translate-x-4 whitespace-nowrap">
                                        {role.title}
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans bg-white">
                    {contributors.map(contributor => (
                        <tr key={contributor.id} className="group hover:bg-indigo-50/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900 sticky left-0 z-20 bg-white border-r border-slate-200 group-hover:bg-slate-50 transition-colors">
                                <span>{contributor.name || 'Unnamed Author'}</span>
                            </td>
                            {creditRoles.map(role => {
                                const Icon = role.icon;
                                const hasRole = contributor.roles.includes(role.id);
                                return (
                                    <td
                                        key={role.id}
                                        className={`px-1 py-1 text-center border-l border-slate-100 transition-colors ${hasRole ? 'bg-indigo-50/50' : ''}`}
                                    >
                                        <div className="flex justify-center p-2">
                                            {hasRole ? (
                                                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm ring-2 ring-indigo-200">
                                                    <Icon size={18} strokeWidth={2} />
                                                </div>
                                            ) : (
                                                <div className="w-8 h-8 rounded-lg bg-slate-50/50 flex items-center justify-center text-slate-300 border border-slate-100">
                                                    <Icon size={16} strokeWidth={1} className="opacity-20" />
                                                </div>
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
