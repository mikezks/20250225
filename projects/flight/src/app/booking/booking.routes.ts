import { Routes } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";
import { FlightBookingComponent, FlightEditComponent, FlightSearchComponent } from "./feature-flight";
import { TicketEffects } from "./logic-flight/+state/effects";
import { ticketFeature } from "./logic-flight/+state/reducer";
import { resolveFlight } from "./logic-flight/data-access/flight.resolver";
import { provideNavigationConfig } from "../shared/logic-navigation";
import { BOOKING_NAVIGATION } from "./booking.navigation";


export const BOOKING_ROUTES: Routes = [
  {
    path: '',
    component: FlightBookingComponent,
    providers: [
      provideNavigationConfig(BOOKING_NAVIGATION),
      provideState(ticketFeature),
      provideEffects([TicketEffects]),
    ],
    children: [
      {
        path: '',
        redirectTo: 'flight',
        pathMatch: 'full'
      },
      {
        path: 'flight',
        children: [
          {
            path: '',
            redirectTo: 'search',
            pathMatch: 'full'
          },
          {
            path: 'search',
            component: FlightSearchComponent,
          },
          {
            path: 'edit/:id',
            component: FlightEditComponent,
            resolve: {
              flight: resolveFlight
            }
          }
        ]
      },
      /* {
        path: 'my-flights',
        component: MyFlightsComponent,
      } */
    ]
  }
];

export default BOOKING_ROUTES;
