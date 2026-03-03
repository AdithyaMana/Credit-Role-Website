import React from 'react';
import clsx from 'clsx';
import { CreditRole, CategoryType } from '../../types';

interface RoleChipProps {
    role: CreditRole;
    isSelected: boolean;
    onToggle: () => void;
}

const getCategoryColors = (category: CategoryType, isSelected: boolean) => {
    if (!isSelected) {
        return 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300';
    }

    switch (category) {
        case CategoryType.STRATEGY: return 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300 shadow-sm';
        case CategoryType.RESEARCH: return 'bg-teal-50 border-teal-200 text-teal-800 hover:bg-teal-100 hover:border-teal-300 shadow-sm';
        case CategoryType.INFRASTRUCTURE: return 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200 hover:border-slate-400 shadow-sm';
        case CategoryType.DISSEMINATION: return 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100 hover:border-orange-300 shadow-sm';
        default: return 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200 shadow-sm';
    }
};

export const RoleChip: React.FC<RoleChipProps> = ({ role, isSelected, onToggle }) => {
    const Icon = role.icon;
    const colors = getCategoryColors(role.category, isSelected);

    return (
        <button
            onClick={onToggle}
            className={clsx(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all text-[11px] font-medium uppercase tracking-wide select-none group",
                colors
            )}
            title={role.description}
        >
            <Icon size={14} className={clsx(
                "transition-colors",
                isSelected ? "opacity-100" : "opacity-50 group-hover:opacity-75"
            )} />
            {role.title}
        </button>
    );
};
