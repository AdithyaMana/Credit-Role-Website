import React from 'react';
import { Contributor } from '../../../types';
import { creditRoles } from '../../../data/roles';

interface AuthorListViewProps {
    contributors: Contributor[];
}

export const AuthorListView: React.FC<AuthorListViewProps> = ({ contributors }) => {
    if (contributors.length === 0) return null;

    return (
        <div className="w-full bg-white border border-slate-200 rounded-xl p-6 lg:p-8 shadow-sm">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">
                Contributions (by Author)
            </h3>
            <div className="space-y-4 font-serif text-[15px] leading-relaxed text-slate-800">
                {contributors.map(contributor => {
                    return (
                        <div key={contributor.id} className="flex flex-col gap-1">
                            <strong className="font-sans font-semibold text-slate-900">{contributor.name}</strong>
                            <div className="flex flex-wrap gap-2 text-sm text-slate-600 italic">
                                {contributor.roles.length > 0 ? (
                                    contributor.roles.map(roleId => {
                                        const role = creditRoles.find(r => r.id === roleId);
                                        const Icon = role?.icon;
                                        return (
                                            <span key={roleId} className="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-full not-italic">
                                                {Icon && <Icon size={12} strokeWidth={2} />}
                                                {role?.title}
                                            </span>
                                        );
                                    })
                                ) : (
                                    <span className="italic text-slate-400">No roles specified.</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
