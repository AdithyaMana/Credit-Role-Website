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
                    const authorRoleTitles = contributor.roles
                        .map(roleId => creditRoles.find(r => r.id === roleId)?.title)
                        .filter(Boolean);

                    return (
                        <div key={contributor.id}>
                            <strong className="font-sans font-semibold text-slate-900">{contributor.name}:</strong>{' '}
                            {authorRoleTitles.length > 0 ? (
                                <span>{authorRoleTitles.join(', ')}.</span>
                            ) : (
                                <span className="italic text-slate-400">No roles specified.</span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
