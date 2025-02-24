import { NavigationConfig } from "../shared/model-navigation";


export const BOARDING_NAVIGATION: NavigationConfig = [
  {
    route: 'boarding',
    label: 'Boarding',
    icon: 'boarding',
    items: [
      {
        route: 'departures',
        label: 'Departures',
        icon: 'departures'
      },
      {
        route: 'scan-ticket',
        label: 'Scan Ticket',
        icon: 'mobile'
      }
    ]
  }
];
