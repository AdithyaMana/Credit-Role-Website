import { useState, useEffect } from 'react';
import { Contributor } from '../types';

export const useBuilderState = () => {
    const [contributors, setContributors] = useState<Contributor[]>(() => {
        try {
            const saved = localStorage.getItem('credit_builder_contributors');
            if (saved) return JSON.parse(saved);
        } catch (err) {
            console.error('Failed to load contributors from localStorage', err);
        }
        return [];
    });

    useEffect(() => {
        try {
            localStorage.setItem('credit_builder_contributors', JSON.stringify(contributors));
        } catch (err) {
            console.error('Failed to save contributors to localStorage', err);
        }
    }, [contributors]);

    const addContributor = () => {
        const newContributor: Contributor = {
            id: crypto.randomUUID(),
            name: `Contributor ${contributors.length + 1}`,
            roles: [],
        };
        setContributors(prev => [newContributor, ...prev]);
    };

    const removeContributor = (id: string) => {
        setContributors(prev => prev.filter(c => c.id !== id));
    };

    const updateContributorName = (id: string, name: string) => {
        setContributors(prev => prev.map(c => (c.id === id ? { ...c, name } : c)));
    };

    const toggleContributorRole = (contributorId: string, roleId: string) => {
        setContributors(prev =>
            prev.map(c => {
                if (c.id !== contributorId) return c;
                const roles = c.roles.includes(roleId)
                    ? c.roles.filter(r => r !== roleId)
                    : [...c.roles, roleId];
                return { ...c, roles };
            })
        );
    };

    const clearAll = () => {
        setContributors([]);
    };

    return {
        contributors,
        addContributor,
        removeContributor,
        updateContributorName,
        toggleContributorRole,
        clearAll,
    };
};
