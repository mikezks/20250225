import { CommonModule } from '@angular/common';
import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SIGNAL } from '@angular/core/primitives/signals';
import { FormsModule } from '@angular/forms';
import { delay, tap } from 'rxjs';
import { FlightService } from '../../api-boarding';
import { Flight, FlightFilter, injectTicketsFacade } from '../../logic-flight';
import { FlightCardComponent, FlightFilterComponent } from '../../ui-flight';


@Component({
  selector: 'app-flight-search',
  imports: [
    CommonModule,
    FormsModule,
    FlightCardComponent,
    FlightFilterComponent
  ],
  templateUrl: './flight-search.component.html',
})
export class FlightSearchComponent {
  private ticketsFacade = injectTicketsFacade();
  private readonly flightService = inject(FlightService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly londonFlights = this.flightService.find('London', '').pipe(
    delay(5_000),
    tap(flights => console.log(flights)),
    // takeUntilDestroyed()
  );

  protected filter = signal({
    from: 'London',
    to: 'New York',
    urgent: false
  });
  protected readonly route = computed(
    () => 'From ' + this.filter().from + ' to ' + this.filter().to + '.'
  );
  protected basket: Record<number, boolean> = {
    3: true,
    5: true
  };
  protected flights = this.ticketsFacade.flights;

  constructor() {
    const effectCallback = () => {
      console.log(this.route())
    };
    let activeConsumer = effect(effectCallback);

    console.log(this.route[SIGNAL]);

    // this.londonFlights.subscribe();

    this.destroyRef.onDestroy(() => console.log('DESTROYED: Flight Search'));
  }

  protected search(filter: FlightFilter): void {
    this.flightService.find('London', '').pipe(
      delay(5_000),
      tap(flights => console.log(flights)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();


    this.filter.set(filter);

    if (!this.filter().from || !this.filter().to) {
      return;
    }

    this.ticketsFacade.search(this.filter());
  }

  protected delay(flight: Flight): void {
    const oldFlight = flight;
    const oldDate = new Date(oldFlight.date);

    const newDate = new Date(oldDate.getTime() + 1000 * 60 * 5); // Add 5 min
    const newFlight = {
      ...oldFlight,
      date: newDate.toISOString(),
      delayed: true
    };

    this.ticketsFacade.update(newFlight);
  }

  protected reset(): void {
    this.ticketsFacade.reset();
  }
}
