import { User } from '../types/types';

export const users: User[] = [
    {
        id: 1,
        name: 'Basic Viewer Test',
        role: 'basic viewer',
    },
    {
        id: 2,
        name: 'Financial Analyst Test',
        role: 'financial analyst',
    },
    {
        id: 3,
        name: 'Energy Specialist Test',
        role: 'energy specialist',
    },
    {
        id: 4,
        name: 'Admin Test',
        role: 'admin',
    },
];

export const rolePermissions = {
    'basic viewer': { canViewEnergy: false, canViewCost: false, canViewChart: false },
    'financial analyst': { canViewEnergy: false, canViewCost: true, canViewChart: true },
    'energy specialist': { canViewEnergy: true, canViewCost: false, canViewChart: true },
    admin: { canViewEnergy: true, canViewCost: true, canViewChart: true },
};
