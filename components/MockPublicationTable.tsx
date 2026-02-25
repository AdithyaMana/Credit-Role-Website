import React from 'react';
import { Lightbulb, FolderTree, Microscope, Pencil } from 'lucide-react';
import clsx from 'clsx';

// Reusing generic themes/icons for mock data
const MOCK_DATA = [
    { topic: 'Taxonomy Usability Study', pub: 'Lai et al., 2026', chapter: 'Chap. 1', status: 'published', conceptualization: true, planning: true, execution: false, writing: true },
    { topic: 'Icon Conception and Design', pub: 'Mana et al., 2026', chapter: 'Chap. 2', status: 'published', conceptualization: true, planning: false, execution: true, writing: false },
    { topic: 'Quantitative Survey Analysis', pub: 'Schäfer et al., 2026', chapter: 'Chap. 3', status: 'in preparation', conceptualization: false, planning: true, execution: true, writing: true },
    { topic: 'Final Implementation', pub: 'Morrison et al., 2026', chapter: 'Chap. 4', status: 'submitted', conceptualization: false, planning: true, execution: true, writing: true },
];

const COLUMNS = [
    { id: 'conceptualization', label: 'Conceptualisation', icon: Lightbulb, color: 'text-indigo-600' },
    { id: 'planning', label: 'Planning', icon: FolderTree, color: 'text-slate-600' },
    { id: 'execution', label: 'Execution', icon: Microscope, color: 'text-teal-600' },
    { id: 'writing', label: 'Manuscript writing', icon: Pencil, color: 'text-orange-600' }
];

const MockPublicationTable: React.FC = () => {
    return (
        <div className="w-full overflow-x-auto bg-white border border-slate-200 shadow-sm sm:rounded-lg my-8 custom-scrollbar">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        <th scope="col" className="px-4 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Topic</th>
                        <th scope="col" className="px-4 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Publication</th>
                        <th scope="col" className="px-4 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Chapter</th>
                        <th scope="col" className="px-4 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>

                        {COLUMNS.map(col => (
                            <th key={col.id} scope="col" className="px-4 py-4 text-center">
                                <div className="flex flex-col items-center gap-2">
                                    <col.icon size={18} className={col.color} strokeWidth={2} />
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden md:block whitespace-nowrap">
                                        {col.label}
                                    </span>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="bg-white divide-y divide-slate-100 font-sans">
                    {MOCK_DATA.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-slate-800">{row.topic}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600 hidden sm:table-cell">{row.pub}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">{row.chapter}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm">
                                <span className={clsx(
                                    "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                                    row.status === 'published' ? "bg-green-100 text-green-800" :
                                        row.status === 'submitted' ? "bg-blue-100 text-blue-800" :
                                            "bg-yellow-100 text-yellow-800"
                                )}>
                                    {row.status}
                                </span>
                            </td>

                            <td className="px-4 py-4 whitespace-nowrap text-center text-slate-800 text-lg font-bold">
                                {row.conceptualization ? '✓' : ''}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-center text-slate-800 text-lg font-bold">
                                {row.planning ? '✓' : ''}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-center text-slate-800 text-lg font-bold">
                                {row.execution ? '✓' : ''}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-center text-slate-800 text-lg font-bold">
                                {row.writing ? '✓' : ''}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MockPublicationTable;
