import { useState } from 'react';
import { LaunchesChart, LaunchesTable, Navbar } from '../components';
import { Box, SelectChangeEvent } from '@mui/material';
import { UserRole } from '../types/types';

const Dashboard = () => {
    const [selectedLaunchesId, setSelectedLaunchesId] = useState<string[]>([]);
    const [selectedUserRole, setSelectedUserRole] = useState<UserRole>('basic viewer');

    const handleSelectLaunchId = (id: string) => {
        setSelectedLaunchesId(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
    };

    const handleSelectUser = (event: SelectChangeEvent<UserRole>) => {
        setSelectedUserRole(event.target.value as UserRole);
    };

    return (
        <Box sx={{ height: '100%' }}>
            <Navbar selectedUserRole={selectedUserRole} handleSelectUser={handleSelectUser} />
            <LaunchesTable selectedLaunchesId={selectedLaunchesId} handleSelectLaunchId={handleSelectLaunchId} selectedUserRole={selectedUserRole} />
            {selectedLaunchesId.length > 1 && <LaunchesChart selectedLaunchesId={selectedLaunchesId} selectedUserRole={selectedUserRole} />}
        </Box>
    );
};

export default Dashboard;
