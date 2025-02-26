import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Flight } from "../model/flight";
import { computed, inject } from "@angular/core";
import { FlightService } from "../data-access/flight.service";
import { FlightFilter } from "../model/flight-filter";
import { tap } from "rxjs";


export const BookingStore = signalStore(
  // { providedIn: 'root' },
  withState({
    filter: {
      from: 'Hamburg',
      to: 'Graz',
      urgent: false
    },
    basket: {
      3: true,
      5: true
    } as Record<number, boolean>,
    flights: [] as Flight[]
  }),
  withComputed(store => ({
    delayedFlight: computed(() => store.flights().filter(flight => flight.delayed))
  })),
  // Updater
  withMethods(store => ({
    setFlights: (flights: Flight[]) => patchState(store, { flights }),
    setFilter: (filter: FlightFilter) => patchState(store, { filter })
  })),
  // Effects
  withMethods((
    store,
    flightService = inject(FlightService)
  ) => ({
    loadFlights: () => {
      flightService.find(
        store.filter.from(),
        store.filter.to(),
        store.filter.urgent()
      ).pipe(
        tap(flights => console.log('Signal Store says hi! :)', flights))
      ).subscribe(flights => store.setFlights(flights))
    }
  }))
);
