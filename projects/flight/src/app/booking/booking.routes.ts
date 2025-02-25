import { provideHttpClient, withInterceptors, withRequestsMadeViaParent } from "@angular/common/http";
import { Routes } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";
import { FlightBookingComponent, FlightEditComponent, FlightSearchComponent } from "./feature-flight";
import { TicketEffects } from "./logic-flight/+state/effects";
import { ticketFeature } from "./logic-flight/+state/reducer";
import { resolveFlight } from "./logic-flight/data-access/flight.resolver";
import { tap } from "rxjs";
import { FlightService } from "./api-boarding";


export const BOOKING_ROUTES: Routes = [
  {
    path: '',
    component: FlightBookingComponent,
    providers: [
      provideHttpClient(
        withInterceptors([
          (req, next) => next(req).pipe(
            tap(resp => console.log('HTTP Response Log Info from Booking', resp))
          )
        ]),
        withRequestsMadeViaParent()
      ),
      provideState(ticketFeature),
      provideEffects([TicketEffects]),
      FlightService
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
      }
    ]
  }
];

export default BOOKING_ROUTES;
