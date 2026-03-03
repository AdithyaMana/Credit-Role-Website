import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, User } from 'lucide-react';
import { Contributor } from '../../types';
import { creditRoles } from '../../data/roles';
import { RoleChip } from './RoleChip';

interface ContributorCardProps {
    contributor: Contributor;
    onUpdateName: (id: string, name: string) => void;
    onRemove: (id: string) => void;
    onToggleRole: (contributorId: string, roleId: string) => void;
}

export const ContributorCard: React.FC<ContributorCardProps> = ({
    contributor,
    onUpdateName,
    onRemove,
    onToggleRole,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
        >
            <div className="flex flex-col md:flex-row md:items-start p-4 gap-4">
                {/* Author Input Section */}
                <div className="flex-shrink-0 w-full md:w-64 flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center shrink-0 border border-slate-200">
                        <User size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <input
                            type="text"
                            value={contributor.name}
                            onChange={(e) => onUpdateName(contributor.id, e.target.value)}
                            placeholder="Contributor Name"
                            className="w-full bg-transparent border-0 border-b-2 border-transparent hover:border-slate-200 focus:border-indigo-500 focus:ring-0 px-1 py-1 text-slate-900 font-semibold text-base transition-colors placeholder:text-slate-300 outline-none"
                        />
                    </div>
                    <button
                        onClick={() => onRemove(contributor.id)}
                        className="md:hidden p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                        aria-label="Remove Contributor"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>

                {/* Roles Section */}
                <div className="flex-1 flex flex-wrap gap-2 pt-1 md:pt-0">
                    {creditRoles.map(role => (
                        <RoleChip
                            key={role.id}
                            role={role}
                            isSelected={contributor.roles.includes(role.id)}
                            onToggle={() => onToggleRole(contributor.id, role.id)}
                        />
                    ))}
                </div>

                {/* Desktop Delete */}
                <div className="hidden md:flex shrink-0">
                    <button
                        onClick={() => onRemove(contributor.id)}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Remove Contributor"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
