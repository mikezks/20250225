import { CommonModule } from '@angular/common';
import { Component, computed, DestroyRef, effect, inject, signal, untracked } from '@angular/core';
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
    effect(() => {
      const route = this.route();
      const filter = untracked(() => this.filter());
      untracked(() => this.logRoute(route));
    });

    console.log(this.filter().from);
    this.filter.update(curr => ({ ...curr, from: 'Barcelona' }));
    console.log(this.filter().from);
    this.filter.update(curr => ({ ...curr, from: 'Madrid' }));
    console.log(this.filter().from);
    this.filter.update(curr => ({ ...curr, from: 'Paris' }));
    console.log(this.filter().from);
    this.filter.update(curr => ({ ...curr, from: 'Rome' }));
    console.log(this.filter().from);
    this.filter.update(curr => ({ ...curr, from: 'Athens' }));
    console.log(this.filter().from);
    this.filter.update(curr => ({ ...curr, from: 'Berlin' }));
    console.log(this.filter().from);

    // Glitch-free update behavior
    const counter = signal(0);
    const isEven = computed(() => counter() % 2 === 0);
  }

  private logRoute(route: string): void {
    console.log(route);
  }

  protected search(filter: FlightFilter): void {
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
