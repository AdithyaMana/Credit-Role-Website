import React from 'react';
import { CategoryType } from '../types';

const Legend: React.FC = () => {
  const items = [
    { label: CategoryType.STRATEGY, color: 'bg-strategy' },
    { label: CategoryType.INVESTIGATION, color: 'bg-investigation' },
    { label: CategoryType.INFRASTRUCTURE, color: 'bg-infrastructure' },
    { label: CategoryType.DISSEMINATION, color: 'bg-dissemination' },
  ];

  return (
    <div className="flex flex-wrap gap-x-8 gap-y-3 justify-center mt-6 px-4 max-w-2xl">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <div className={`w-4 h-4 rounded-full ${item.color} ring-2 ring-white shadow-sm`}></div>
          <span className="text-sm text-slate-600 font-semibold uppercase tracking-wide">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Legend;