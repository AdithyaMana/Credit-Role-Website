import React, { useMemo } from 'react';
import { Contributor } from '../../../types';
import { creditRoles } from '../../../data/roles';

interface RoleListViewProps {
    contributors: Contributor[];
}

export const RoleListView: React.FC<RoleListViewProps> = ({ contributors }) => {
    if (contributors.length === 0) return null;

    // Transform data: Role -> Authors
    const roleToAuthors = useMemo(() => {
        return creditRoles.map(role => {
            const activeContributors = contributors
                .filter(c => c.roles.includes(role.id))
                .map(c => c.name);

            return {
                roleId: role.id,
                roleTitle: role.title,
                Icon: role.icon,
                authors: activeContributors
            };
        }).filter(group => group.authors.length > 0);
    }, [contributors]);

    return (
        <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-6 lg:p-8 shadow-sm">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">
                Contributions (by Role)
            </h3>

            {roleToAuthors.length === 0 ? (
                <p className="text-slate-400 italic text-sm">No roles assigned yet.</p>
            ) : (
                <div className="space-y-4 font-serif text-[15px] leading-relaxed text-slate-800">
                    {roleToAuthors.map((group, idx) => (
                        <div key={group.roleId} className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <group.Icon size={16} className="text-slate-700" strokeWidth={1.5} />
                                <strong className="font-sans font-semibold text-slate-900">{group.roleTitle}</strong>
                            </div>
                            <span className="text-slate-600 pl-6">{group.authors.join(', ')}.</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
