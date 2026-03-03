import React from 'react';
import { Contributor, CategoryType } from '../../../types';
import { creditRoles } from '../../../data/roles';
import clsx from 'clsx';
import { Check } from 'lucide-react';

import { Trash2 } from 'lucide-react';

interface MatrixViewProps {
    contributors: Contributor[];
    onUpdateName: (id: string, name: string) => void;
    onToggleRole: (contributorId: string, roleId: string) => void;
    onRemove: (id: string) => void;
}

const getCategoryColorText = (category: CategoryType) => {
    switch (category) {
        case CategoryType.STRATEGY: return 'text-indigo-600';
        case CategoryType.RESEARCH: return 'text-teal-600';
        case CategoryType.INFRASTRUCTURE: return 'text-slate-600';
        case CategoryType.DISSEMINATION: return 'text-orange-600';
        default: return 'text-slate-600';
    }
};

export const MatrixView: React.FC<MatrixViewProps> = ({ contributors, onUpdateName, onToggleRole, onRemove }) => {
    return (
        <div className="w-full overflow-x-auto shadow-sm border border-slate-200 rounded-xl bg-white custom-scrollbar pb-2">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider sticky left-0 z-20 bg-slate-50 border-r border-slate-200">
                            Contributor
                        </th>
                        {creditRoles.map(role => {
                            const Icon = role.icon;
                            return (
                                <th key={role.id} scope="col" className="px-3 py-4 text-center min-w-[70px]">
                                    <div className="flex flex-col items-center gap-2 group relative" title={role.title}>
                                        <Icon size={20} className={getCategoryColorText(role.category)} strokeWidth={2} />
                                        <span className="hidden opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 bg-slate-800 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded transition-opacity whitespace-nowrap z-30">
                                            {role.title}
                                        </span>
                                    </div>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 font-sans">
                    {contributors.map(contributor => (
                        <tr key={contributor.id} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-slate-800 sticky left-0 z-10 bg-white border-r border-slate-100 group-hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={contributor.name}
                                        onChange={(e) => onUpdateName(contributor.id, e.target.value)}
                                        placeholder="Name..."
                                        className="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:ring-0 px-1 py-1 w-32 outline-none font-semibold transition-colors"
                                    />
                                    <button
                                        onClick={() => onRemove(contributor.id)}
                                        className="p-1 text-slate-300 hover:text-red-500 rounded transition-colors opacity-0 group-hover:opacity-100"
                                        title="Remove"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </td>
                            {creditRoles.map(role => (
                                <td
                                    key={role.id}
                                    className="px-3 py-4 whitespace-nowrap text-center cursor-pointer hover:bg-indigo-50/50 transition-colors"
                                    onClick={() => onToggleRole(contributor.id, role.id)}
                                >
                                    {contributor.roles.includes(role.id) ? (
                                        <div className="w-full flex justify-center">
                                            <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center border border-slate-200 shadow-sm scale-110 transition-transform">
                                                <Check size={14} className={getCategoryColorText(role.category)} strokeWidth={3} />
                                            </div>
                                        </div>
                                    ) : (
                                        <span className="text-slate-200/50 block group-hover:text-slate-300">—</span>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
