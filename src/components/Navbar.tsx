import React from 'react';
import { AppBar, Select, MenuItem, FormControl, InputLabel, Box, Chip, SelectChangeEvent } from '@mui/material';
import { rolePermissions, users } from '../utils/constants';
import { UserRole } from '../types/types';

const Navbar: React.FC<{ selectedUserRole: UserRole; handleSelectUser: (event: SelectChangeEvent<UserRole>) => void }> = ({ selectedUserRole, handleSelectUser }) => {
    const userPermission = rolePermissions[selectedUserRole];

    const renderChip = (enabled: boolean, label: string) => <Chip label={label} color={enabled ? 'primary' : 'error'} sx={{ marginRight: 1 }} />;

    return (
        <AppBar color="default" position="static">
            <Box gap={20} display={'flex'} sx={{ padding: 2, paddingX: 5 }}>
                <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                    <InputLabel id="user-select-label">Select User</InputLabel>
                    <Select labelId="user-select-label" value={selectedUserRole} onChange={handleSelectUser} label="Select User">
                        {users.map(user => (
                            <MenuItem key={user.id} value={user.role}>
                                {user.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box display={'flex'}>
                    <Box display="flex" alignItems="center">
                        {renderChip(userPermission.canViewEnergy, 'Can View Energy')}
                    </Box>

                    <Box display="flex" alignItems="center">
                        {renderChip(userPermission.canViewCost, 'Can View Cost')}
                    </Box>

                    <Box display="flex" alignItems="center">
                        {renderChip(userPermission.canViewChart, 'Can View Chart')}
                    </Box>
                </Box>
            </Box>
        </AppBar>
    );
};

export default Navbar;
