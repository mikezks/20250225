import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../../../shared/ui-common';
import { provideNavigationService } from '../../../shared/logic-navigation';
import { NavigationProviderDirective } from '../../../shared/ui-common/navigation/navigation-provider.directive';


@Component({
  selector: 'app-flight-booking',
  imports: [
    RouterOutlet,
    NavigationComponent,
    NavigationProviderDirective
  ],
  providers: [
    provideNavigationService([
      {
        route: 'flight/search',
        label: 'Flight Search',
        icon: 'flight'
      }
    ])
  ],
  template: `
    <app-navigation class="nav-standalone" />
    <app-navigation [navConfig]="navState" class="nav-standalone" />

    <div>
      <router-outlet></router-outlet>
    </div>
  `
})
export class FlightBookingComponent {
  navState = [
    {
      route: 'flight/departures',
      label: 'Departures',
      icon: 'departures'
    }
  ]
}
