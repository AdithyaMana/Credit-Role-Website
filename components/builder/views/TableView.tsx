import React from 'react';
import { Contributor } from '../../../types';
import { creditRoles } from '../../../data/roles';

interface TableViewProps {
    contributors: Contributor[];
}

export const TableView: React.FC<TableViewProps> = ({ contributors }) => {
    return (
        <div className="w-full max-h-[65vh] overflow-x-auto overflow-y-auto border-t-2 border-b-2 border-slate-800 bg-white custom-scrollbar pb-0 relative">
            <table className="min-w-full divide-y divide-slate-300">
                <thead className="sticky top-0 z-30 bg-white shadow-sm">
                    <tr>
                        <th scope="col" className="px-4 py-3 text-left font-serif text-sm font-semibold text-slate-900 border-b-2 border-slate-800 sticky left-0 z-40 bg-white shadow-[1px_0_0_0_#e2e8f0]">
                            Author
                        </th>
                        {creditRoles.map(role => {
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
                            {creditRoles.map(role => {
                                const Icon = role.icon;
                                return (
                                    <td
                                        key={role.id}
                                        className="px-3 py-3 text-center border-l border-slate-200"
                                    >
                                        {contributor.roles.includes(role.id) ? (
                                            <div className="flex justify-center opacity-60">
                                                <Icon size={14} className="text-slate-700" strokeWidth={2} />
                                            </div>
                                        ) : (
                                            <span className="text-slate-200">—</span>
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
