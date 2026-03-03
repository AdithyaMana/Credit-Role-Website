import React, { useMemo } from 'react';
import { Contributor } from '../../../types';
import { creditRoles } from '../../../data/roles';

interface InlineMatrixViewProps {
    contributors: Contributor[];
}

export const InlineMatrixView: React.FC<InlineMatrixViewProps> = ({ contributors }) => {
    // Only show roles that have been assigned to at least one contributor
    const activeRoles = useMemo(() => {
        const usedRoleIds = new Set(contributors.flatMap(c => c.roles));
        return creditRoles.filter(role => usedRoleIds.has(role.id));
    }, [contributors]);

    // Count how many contributors have each role (for summary)
    const roleCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        for (const role of activeRoles) {
            counts[role.id] = contributors.filter(c => c.roles.includes(role.id)).length;
        }
        return counts;
    }, [contributors, activeRoles]);

    // Generate the binary matrix data for the heatmap
    const matrix = useMemo(() => {
        return contributors.map(contributor => ({
            name: contributor.name || 'Unnamed',
            cells: activeRoles.map(role => ({
                roleId: role.id,
                value: contributor.roles.includes(role.id) ? 1 : 0,
            })),
        }));
    }, [contributors, activeRoles]);

    if (contributors.length === 0 || activeRoles.length === 0) {
        return (
            <div className="w-full bg-white border border-slate-200 rounded-lg p-8 text-center text-slate-400 text-sm italic">
                No roles assigned yet. Use the Matrix Grid view to assign roles.
            </div>
        );
    }

    // Compute cell size based on number of roles/contributors
    const cellSize = 36;
    const labelWidth = 140;
    const headerHeight = 120;
    const svgWidth = labelWidth + activeRoles.length * cellSize + 60; // +60 for color legend
    const svgHeight = headerHeight + contributors.length * cellSize + 40; // +40 for summary

    return (
        <div className="w-full space-y-3">
            {/* Title */}
            <div className="flex items-baseline justify-between">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    Author–Role Contribution Matrix
                </p>
                <p className="text-[10px] text-slate-400">
                    n = {contributors.length} authors, {activeRoles.length} roles
                </p>
            </div>

            {/* SVG Heatmap */}
            <div className="w-full overflow-x-auto custom-scrollbar bg-white border border-slate-200 rounded-lg p-4">
                <svg
                    width={svgWidth}
                    height={svgHeight}
                    viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                    className="block"
                    style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}
                >
                    {/* Column headers (rotated role names) */}
                    {activeRoles.map((role, colIdx) => {
                        const x = labelWidth + colIdx * cellSize + cellSize / 2;
                        return (
                            <text
                                key={role.id}
                                x={x}
                                y={headerHeight - 6}
                                textAnchor="start"
                                fontSize="10"
                                fontWeight="600"
                                fill="#475569"
                                transform={`rotate(-45, ${x}, ${headerHeight - 6})`}
                            >
                                {role.title}
                            </text>
                        );
                    })}

                    {/* Row labels and heatmap cells */}
                    {matrix.map((row, rowIdx) => {
                        const y = headerHeight + rowIdx * cellSize;
                        return (
                            <g key={rowIdx}>
                                {/* Row label */}
                                <text
                                    x={labelWidth - 8}
                                    y={y + cellSize / 2 + 4}
                                    textAnchor="end"
                                    fontSize="11"
                                    fontWeight="600"
                                    fill="#1e293b"
                                >
                                    {row.name.length > 16 ? row.name.substring(0, 14) + '…' : row.name}
                                </text>

                                {/* Cells */}
                                {row.cells.map((cell, colIdx) => {
                                    const x = labelWidth + colIdx * cellSize;
                                    return (
                                        <g key={cell.roleId}>
                                            <rect
                                                x={x + 1}
                                                y={y + 1}
                                                width={cellSize - 2}
                                                height={cellSize - 2}
                                                fill={cell.value === 1 ? '#1e3a5f' : '#f1f5f9'}
                                                stroke="#e2e8f0"
                                                strokeWidth="0.5"
                                                rx="2"
                                            />
                                            {/* Value annotation inside cell */}
                                            <text
                                                x={x + cellSize / 2}
                                                y={y + cellSize / 2 + 4}
                                                textAnchor="middle"
                                                fontSize="11"
                                                fontWeight="700"
                                                fill={cell.value === 1 ? '#ffffff' : '#cbd5e1'}
                                            >
                                                {cell.value}
                                            </text>
                                        </g>
                                    );
                                })}
                            </g>
                        );
                    })}

                    {/* Summary row */}
                    {(() => {
                        const summaryY = headerHeight + contributors.length * cellSize + 8;
                        return (
                            <g>
                                <text
                                    x={labelWidth - 8}
                                    y={summaryY + 12}
                                    textAnchor="end"
                                    fontSize="10"
                                    fontWeight="700"
                                    fill="#64748b"
                                >
                                    Σ
                                </text>
                                {activeRoles.map((role, colIdx) => {
                                    const x = labelWidth + colIdx * cellSize;
                                    return (
                                        <text
                                            key={role.id}
                                            x={x + cellSize / 2}
                                            y={summaryY + 12}
                                            textAnchor="middle"
                                            fontSize="10"
                                            fontWeight="700"
                                            fill="#334155"
                                        >
                                            {roleCounts[role.id]}
                                        </text>
                                    );
                                })}
                                {/* Separator line */}
                                <line
                                    x1={labelWidth}
                                    y1={summaryY - 2}
                                    x2={labelWidth + activeRoles.length * cellSize}
                                    y2={summaryY - 2}
                                    stroke="#94a3b8"
                                    strokeWidth="1"
                                />
                            </g>
                        );
                    })()}

                    {/* Color Legend */}
                    {(() => {
                        const legendX = labelWidth + activeRoles.length * cellSize + 16;
                        const legendY = headerHeight + 4;
                        return (
                            <g>
                                <text x={legendX} y={legendY} fontSize="9" fontWeight="700" fill="#64748b">
                                    Key
                                </text>
                                {/* Filled = assigned */}
                                <rect x={legendX} y={legendY + 6} width={14} height={14} fill="#1e3a5f" rx="2" />
                                <text x={legendX + 18} y={legendY + 17} fontSize="9" fill="#475569">
                                    Yes
                                </text>
                                {/* Empty = not assigned */}
                                <rect x={legendX} y={legendY + 26} width={14} height={14} fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.5" rx="2" />
                                <text x={legendX + 18} y={legendY + 37} fontSize="9" fill="#475569">
                                    No
                                </text>
                            </g>
                        );
                    })()}
                </svg>
            </div>

            {/* Figure caption */}
            <p className="text-[11px] text-slate-500 italic leading-relaxed">
                <strong className="not-italic text-slate-700">Fig.</strong> Binary contribution matrix showing CRediT role assignments.
                Filled cells (1) indicate a role was performed by the contributor; empty cells (0) indicate no contribution to that role.
            </p>
        </div>
    );
};
