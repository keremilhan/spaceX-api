import { useQuery } from '@apollo/client';
import { Box, CircularProgress, Typography } from '@mui/material';
import Chart from 'react-apexcharts';
import { Launch, UserRole } from '../types/types';
import { rolePermissions } from '../utils/constants';
import { GET_LAUNCHES } from '../queries/launches';
import { useMemo } from 'react';
import { calculateEnergyConsumption, formatNumberWithDots } from '../utils/functions';
import { ApexOptions } from 'apexcharts';

const LaunchesChart: React.FC<{ selectedLaunchesId: string[]; selectedUserRole: UserRole }> = ({ selectedLaunchesId, selectedUserRole }) => {
    const { loading, error, data } = useQuery(GET_LAUNCHES);
    const userPermission = rolePermissions[selectedUserRole];
    const selectedLaunches = useMemo(() => {
        return data?.launchesPast.filter((launch: Launch) => selectedLaunchesId.includes(launch.id)) || [];
    }, [data, selectedLaunchesId]);

    const generateChartData = () => {
        return [
            userPermission.canViewEnergy && {
                name: 'Energy Consumption',
                data: selectedLaunches.map((launch: Launch) => calculateEnergyConsumption(launch)),
                color: '#4a5bdb',
            },
            userPermission.canViewCost && {
                name: 'Cost',
                data: selectedLaunches.map((launch: Launch) => launch?.rocket?.rocket?.cost_per_launch),
                color: '#15e97b',
            },
        ].filter(Boolean) as ApexAxisChartSeries;
    };

    const chartData = useMemo(generateChartData, [selectedLaunches, userPermission.canViewEnergy, userPermission.canViewCost]);

    if (loading)
        return (
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    if (error) return <Typography>Error: {error.message}</Typography>;
    if (!userPermission.canViewChart) {
        return (
            <Typography marginTop={10} align="center" variant="h6">
                You do not have permission to view the chart.
            </Typography>
        );
    }

    const chartOptions: ApexOptions = {
        dataLabels: {
            enabled: false,
        },
        chart: {
            id: 'basic-bar',
            animations: {
                enabled: true,
                dynamicAnimation: {
                    speed: 1000,
                },
            },
        },
        tooltip: {
            enabled: true,
            shared: true,
            followCursor: true,
            intersect: false,
            hideEmptySeries: true,
            style: {
                fontSize: '12px',
                fontFamily: undefined,
            },
            marker: {
                show: true,
            },
            items: {
                display: 'flex',
            },
        },
        xaxis: {
            categories: selectedLaunches.map(
                (launch: Launch) =>
                    `${launch?.rocket.rocket.name} (${new Date(launch?.launch_date_utc).toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    })})`
            ),
            title: {
                text: 'Rocket Name (Launch Date)',
            },
        },
        yaxis: [
            userPermission.canViewEnergy && {
                title: {
                    text: 'Energy Consumption (Joules)',
                },
                labels: {
                    formatter: (val: number) => {
                        if (val > 1_000_000_000) {
                            return (val / 1_000_000_000).toFixed(2) + ' GJ'; // Giga Joules
                        } else return val;
                    },
                },
            },
            userPermission.canViewCost && {
                opposite: userPermission.canViewEnergy ? true : false,
                title: {
                    text: 'Cost (USD)',
                },
                labels: {
                    formatter: (val: number) => {
                        if (val > 10_000_000) {
                            return '$' + (val / 1_000_000).toFixed(2) + 'M'; // Million USD
                        } else return '$' + formatNumberWithDots(val);
                    },
                },
                style: {
                    colors: '#132345',
                },
            },
        ].filter(Boolean) as ApexYAxis[],
    };

    return (
        <Box sx={{ height: '100%' }} paddingX={10} marginTop={5}>
            <Chart type="bar" options={chartOptions} series={chartData} height={350} />
        </Box>
    );
};

export default LaunchesChart;
