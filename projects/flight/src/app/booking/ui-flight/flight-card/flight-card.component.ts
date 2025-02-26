import { DatePipe, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Output, effect, inject, input, linkedSignal, model, output, untracked } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectCdBlink } from '../../../shared/util-cd-visualizer';
import { Flight } from '../../logic-flight';


@Component({
  selector: 'app-flight-card',
  imports: [
    NgStyle, DatePipe,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="card"
      [ngStyle]="{ 'background-color': selected() ? 'rgb(204, 197, 185)' : 'white' }"
    >
      <div class="card-header">
        <h2 class="card-title">{{ flightState().from }} - {{ flightState().to }}</h2>
      </div>

      <div class="card-body">
        <p>Flight-No.: {{ flightState().id }}</p>
        <p>Date: {{ flightState().date | date : "dd.MM.yyyy HH:mm" }}</p>
        <p>
          <button
            (click)="toggleSelection()"
            class="btn btn-info btn-sm"
            style="min-width: 85px; margin-right: 5px"
          >{{ selected() ? "Remove" : "Select" }}</button>
          <a
            [routerLink]="['../edit', flightState().id]"
            class="btn btn-success btn-sm"
            style="min-width: 85px; margin-right: 5px"
          >Edit</a>
          <button
            (click)="delay()"
            class="btn btn-danger btn-sm"
            style="min-width: 85px; margin-right: 5px"
          >Delay</button>
        </p>
      </div>
    </div>

    <!-- {{ blink() }} -->
  `
})
export class FlightCardComponent {
  blink = injectCdBlink();
  private destroyRef = inject(DestroyRef);

  readonly item = input.required<Flight>();
  readonly itemChange = output<Flight>();
  readonly selected = model(false);
  readonly flightState = linkedSignal({
    source: this.item,
    computation: item => item
  });

  constructor() {
    effect(() => untracked(() => {
      console.log('INIT Card', this.item());
      this.destroyRef.onDestroy(() => console.log('DESTROY Card', this.item()));
    }));
  }

  toggleSelection(): void {
    this.selected.update(curr => !curr);
    this.flightState.update(curr => ({ ...curr, from: 'Oslo' }));
  }

  delay(): void {
    this.itemChange.emit(this.flightState());
  }
}
