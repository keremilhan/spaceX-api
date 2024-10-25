export interface Rocket {
    name: 'falcon_1' | 'falcon_9' | 'falcon_heavy';
    cost_per_launch: number;
    mass: {
        kg: number;
    };
    first_stage: {
        fuel_amount_tons: number;
    };
    second_stage: {
        fuel_amount_tons: number;
    };
}

export interface Launch {
    id: string;
    launch_date_utc: string;
    launch_success: boolean | null;
    launch_year: string;
    rocket: {
        rocket: Rocket;
    };
}

export interface User {
    id: number;
    name: string;
    role: UserRole;
}

export type UserRole = 'financial analyst' | 'energy specialist' | 'basic viewer' | 'admin';
