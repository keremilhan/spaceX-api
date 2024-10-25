import { gql } from '@apollo/client';

export const GET_LAUNCHES = gql`
    query GetLaunches {
        launchesPast {
            id
            launch_date_utc
            rocket {
                rocket {
                    cost_per_launch
                    name
                    mass {
                        kg
                    }
                    first_stage {
                        fuel_amount_tons
                    }
                    second_stage {
                        fuel_amount_tons
                    }
                }
            }
            launch_success
            launch_year
        }
    }
`;
