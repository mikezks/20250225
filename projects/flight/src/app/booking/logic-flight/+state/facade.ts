import { inject } from "@angular/core"
import { Store } from "@ngrx/store"
import { ticketActions } from "./actions";
import { ticketFeature } from "./reducer";
import { FlightFilter } from "../model/flight-filter";
import { Flight } from "../model/flight";
import { BookingStore } from "./booking.store";


export function injectTicketsFacade() {
  // const store = inject(Store);
  const store = inject(BookingStore);

  // store.

  return {
    flights: store.flights,
    search: (filter: FlightFilter) => {
      store.setFilter(filter);
      store.loadFlights();
    },
    update: (flight: Flight) => {},
    reset: () =>
      store.setFlights([])
  };
}
