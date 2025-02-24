import { NavigationConfig } from "../shared/model-navigation";


export const BOOKING_NAVIGATION: NavigationConfig = [
  {
    route: 'booking',
    label: 'Booking',
    icon: 'booking',
    items: [
      {
        route: 'flight',
        label: 'Flights',
        icon: 'flight'
      },
      {
        route: 'my-flights',
        label: 'My Flights',
        icon: 'flight'
      }
    ]
  }
];
