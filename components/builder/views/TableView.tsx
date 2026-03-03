import React from 'react';
import { Contributor } from '../../../types';
import { creditRoles } from '../../../data/roles';
import { Trash2 } from 'lucide-react';

interface TableViewProps {
    contributors: Contributor[];
    onUpdateName: (id: string, name: string) => void;
    onToggleRole: (contributorId: string, roleId: string) => void;
    onRemove: (id: string) => void;
}

export const TableView: React.FC<TableViewProps> = ({ contributors, onUpdateName, onToggleRole, onRemove }) => {
    return (
        <div className="w-full overflow-x-auto border-t-2 border-b-2 border-slate-800 bg-white custom-scrollbar pb-2">
            <table className="min-w-full divide-y divide-slate-300">
                <thead>
                    <tr>
                        <th scope="col" className="px-4 py-3 text-left font-serif text-sm font-semibold text-slate-900 border-b-2 border-slate-800">
                            Author
                        </th>
                        {creditRoles.map(role => (
                            <th key={role.id} scope="col" className="px-3 py-3 text-center font-serif text-sm font-semibold text-slate-900 bg-slate-50/50 border-b-2 border-slate-800 border-l border-slate-200 truncate max-w-[100px]" title={role.title}>
                                {role.title.substring(0, 4)}...
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                    {contributors.map(contributor => (
                        <tr key={contributor.id} className="group hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-serif text-slate-800">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={contributor.name}
                                        onChange={(e) => onUpdateName(contributor.id, e.target.value)}
                                        placeholder="Author Name..."
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
                                    className="px-3 py-3 text-center border-l border-slate-200 text-slate-800 font-bold cursor-pointer hover:bg-slate-100 transition-colors"
                                    onClick={() => onToggleRole(contributor.id, role.id)}
                                >
                                    {contributor.roles.includes(role.id) ? '•' : ''}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
