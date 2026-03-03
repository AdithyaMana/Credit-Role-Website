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
