import { NavigationConfig } from "../shared/model-navigation";


export const LUGGAGE_NAVIGATION: NavigationConfig = [
  {
    route: 'luggage',
    label: 'Luggage',
    icon: 'luggage',
    items: [
      {
        route: 'checkin',
        label: 'Checkin',
        icon: 'checkin'
      },
      {
        route: 'report-loss',
        label: 'Report Loss',
        icon: 'report-loss'
      },
    ]
  }
];
