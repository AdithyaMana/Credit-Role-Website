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
                    const authorRoles = contributor.roles
                        .map(roleId => creditRoles.find(r => r.id === roleId))
                        .filter(Boolean);

                    return (
                        <div key={contributor.id}>
                            <strong className="font-sans font-semibold text-slate-900">{contributor.name}:</strong>{' '}
                            {authorRoles.length > 0 ? (
                                <div className="inline-flex flex-wrap items-center gap-2">
                                    {authorRoles.map(role => {
                                        const Icon = role!.icon;
                                        return (
                                            <span key={role!.id} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                                                <Icon size={12} strokeWidth={2} />
                                                <span>{role!.title}</span>
                                            </span>
                                        );
                                    })}
                                </div>
                            ) : (
                                <span className="italic text-slate-400 text-sm">No roles specified.</span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
