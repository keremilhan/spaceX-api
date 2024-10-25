import { Launch } from '../types/types';

export const formatNumberWithDots = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const calculateEnergyConsumption = (launchOrLaunches: Launch | Launch[]) => {
    const calculateForSingleLaunch = (launch: Launch) => {
        const rocketMass = launch?.rocket?.rocket?.mass?.kg || 0;
        const firstStageFuel = launch?.rocket?.rocket?.first_stage?.fuel_amount_tons || 0;
        const secondStageFuel = launch?.rocket?.rocket?.second_stage?.fuel_amount_tons || 0;

        const totalFuelMass = (firstStageFuel + secondStageFuel) * 1000; // kg
        const totalMass = rocketMass + totalFuelMass;

        return totalMass * 15 * 1.35e7; // Joules
    };

    if (Array.isArray(launchOrLaunches)) {
        return launchOrLaunches.reduce((total, launch) => total + calculateForSingleLaunch(launch), 0);
    } else {
        return calculateForSingleLaunch(launchOrLaunches);
    }
};

export const calculateTotalMass = (launches: Launch[]) => {
    return launches.reduce((total, launch) => {
        const rocketMass = launch?.rocket?.rocket?.mass?.kg || 0;
        const firstStageFuel = launch?.rocket?.rocket?.first_stage?.fuel_amount_tons || 0;
        const secondStageFuel = launch?.rocket?.rocket?.second_stage?.fuel_amount_tons || 0;

        const totalFuelMass = (firstStageFuel + secondStageFuel) * 1000; //  kg
        return total + rocketMass + totalFuelMass;
    }, 0);
};

export const calculateTotalCost = (launches: Launch[]) => {
    return launches.reduce((total, launch) => {
        const costPerLaunch = launch?.rocket?.rocket?.cost_per_launch || 0;
        return total + costPerLaunch;
    }, 0);
};
