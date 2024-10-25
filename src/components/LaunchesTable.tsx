import { Box, Checkbox, CircularProgress, Stack, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { Launch, UserRole } from '../types/types';
import { GET_LAUNCHES } from '../queries/launches';
import { calculateEnergyConsumption, calculateTotalCost, calculateTotalMass, formatNumberWithDots } from '../utils/functions';
import { rolePermissions } from '../utils/constants';
import { useMemo } from 'react';

const LaunchTable: React.FC<{ selectedLaunchesId: string[]; handleSelectLaunchId: (param: string) => void; selectedUserRole: UserRole }> = ({
    selectedLaunchesId,
    handleSelectLaunchId,
    selectedUserRole,
}) => {
    const { loading, error, data } = useQuery(GET_LAUNCHES);
    const userPermission = rolePermissions[selectedUserRole];

    const selectedLaunches = useMemo(() => {
        return data?.launchesPast.filter((launch: Launch) => selectedLaunchesId.includes(launch.id)) || [];
    }, [data, selectedLaunchesId]);

    if (loading)
        return (
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );

    if (error) return <Typography>Error: {error.message}</Typography>;

    const uniqueRocketNames: string[] = Array.from(new Set(data?.launchesPast.map((launch: Launch) => launch.rocket.rocket.name)));

    const filteredLaunches = (rocketName: string) => {
        return data?.launchesPast.filter((launch: Launch) => launch.rocket.rocket.name === rocketName);
    };

    return (
        <Stack sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', flexDirection: 'row', marginTop: 3, paddingY: 4 }}>
            <Box sx={{ display: 'flex', gap: 5, paddingTop: 2 }}>
                {uniqueRocketNames.map(rocketName => {
                    const rocketLaunches = filteredLaunches(rocketName);

                    return (
                        <Box key={rocketName} sx={{ minWidth: 250 }}>
                            <Typography variant="h4" align="center">
                                {rocketName}
                            </Typography>
                            <Stack sx={{ maxHeight: 250, overflowY: 'auto', marginTop: 2 }}>
                                {rocketLaunches.map((launch: Launch) => (
                                    <Box key={launch.id} display="flex" alignItems="center" justifyContent={'center'}>
                                        <Checkbox checked={selectedLaunchesId.includes(launch.id)} onChange={() => handleSelectLaunchId(launch.id)} />
                                        <Typography>
                                            {new Date(launch.launch_date_utc).toLocaleDateString('en-GB', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                            })}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    );
                })}
            </Box>

            <Box sx={{ width: 300, marginX: 3, paddingX: 5, paddingTop: 2, borderRadius: 2, display: 'flex', flexDirection: 'column', backgroundColor: '#1876D1', zIndex: 1000 }}>
                <Typography variant="h4" align="center" color="white">
                    Aggregated Info
                </Typography>

                {/* Display each launch date with a checkbox */}
                <Stack sx={{ maxHeight: 400, overflowY: 'auto', marginTop: 2, gap: 3, color: 'white' }}>
                    <Typography variant="h5">Total Mass: {formatNumberWithDots(calculateTotalMass(selectedLaunches))} kg</Typography>
                    {userPermission.canViewCost && <Typography variant="h5">Total Cost: ${formatNumberWithDots(calculateTotalCost(selectedLaunches))}</Typography>}
                    {userPermission.canViewEnergy && <Typography variant="h5">Total Energy Consumption: {formatNumberWithDots(calculateEnergyConsumption(selectedLaunches))} J</Typography>}
                </Stack>
            </Box>
        </Stack>
    );
};

export default LaunchTable;
