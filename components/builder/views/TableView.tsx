import React from 'react';
import { Contributor } from '../../../types';
import { creditRoles } from '../../../data/roles';

interface TableViewProps {
    contributors: Contributor[];
}

export const TableView: React.FC<TableViewProps> = ({ contributors }) => {
    if (contributors.length === 0) return null;

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
                        <tr key={contributor.id}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-serif text-slate-800">
                                {contributor.name}
                            </td>
                            {creditRoles.map(role => (
                                <td key={role.id} className="px-3 py-3 text-center border-l border-slate-200 text-slate-800 font-bold">
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
