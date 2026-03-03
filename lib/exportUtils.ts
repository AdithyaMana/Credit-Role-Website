import { Contributor } from '../types';
import { creditRoles } from '../data/roles';

/**
 * Transforms internal Contributor data into a clean JSON array
 * mapping Author names to their human-readable Role titles.
 */
export const generateExportData = (contributors: Contributor[]) => {
    return contributors.map(c => ({
        name: c.name,
        roles: c.roles
            .map(roleId => creditRoles.find(r => r.id === roleId)?.title)
            .filter(Boolean) as string[]
    }));
};

/**
 * Triggers a browser download of the contributors data as a formatted JSON file.
 */
export const downloadAsJson = (contributors: Contributor[]) => {
    const data = generateExportData(contributors);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'credit-roles-export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

/**
 * Copies the raw JSON string directly to the user's clipboard.
 */
export const copyToClipboard = async (contributors: Contributor[]): Promise<boolean> => {
    try {
        const data = generateExportData(contributors);
        const textData = JSON.stringify(data, null, 2);
        await navigator.clipboard.writeText(textData);
        return true;
    } catch (err) {
        console.error('Failed to copy text: ', err);
        return false;
    }
};

/**
 * Generates CSV string format
 */
export const generateCsvData = (contributors: Contributor[]): string => {
    const rolesHeader = creditRoles.map(r => r.title);
    const headers = ['Author', ...rolesHeader];

    const rows = contributors.map(contributor => {
        const roleStatuses = creditRoles.map(role => contributor.roles.includes(role.id) ? '1' : '0');
        return [
            `"${contributor.name.replace(/"/g, '""')}"`,
            ...roleStatuses
        ];
    });

    return [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');
};

/**
 * Generates Markdown table format
 */
export const generateMarkdownData = (contributors: Contributor[]): string => {
    const rolesHeader = creditRoles.map(r => r.title);
    const headers = ['Author', ...rolesHeader];

    // Create separator row
    const separators = ['---', ...rolesHeader.map(() => '---')];

    const rows = contributors.map(contributor => {
        const roleStatuses = creditRoles.map(role => contributor.roles.includes(role.id) ? '✓' : '');
        return [
            contributor.name,
            ...roleStatuses
        ];
    });

    return [
        `| ${headers.join(' | ')} |`,
        `| ${separators.join(' | ')} |`,
        ...rows.map(row => `| ${row.join(' | ')} |`)
    ].join('\n');
};

/**
 * Downloads data as a file
 */
const downloadFile = (filename: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

export const downloadAsCsv = (contributors: Contributor[]) => {
    downloadFile('credit-roles-export.csv', generateCsvData(contributors), 'text/csv');
};

export const downloadAsMarkdown = (contributors: Contributor[]) => {
    downloadFile('credit-roles-export.md', generateMarkdownData(contributors), 'text/markdown');
};

export const copyTextToClipboard = async (text: string): Promise<boolean> => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy text: ', err);
        return false;
    }
};
