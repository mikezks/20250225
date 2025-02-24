import { Routes } from '@angular/router';
import { LuggageCheckinComponent } from './features/luggage-checkin/luggage-checkin.component';
import { ReportLossComponent } from './features/report-loss/report-loss.component';
import { provideNavigationConfig } from '../shared/logic-navigation';
import { LUGGAGE_NAVIGATION } from './luggage.navigation';


export const LUGGAGE_ROUTES: Routes = [
  {
    path: '',
    providers: [
      provideNavigationConfig(LUGGAGE_NAVIGATION)
    ],
    children: [
      {
        path: '',
        redirectTo: 'checkin',
        pathMatch: 'full'
      },
      {
        path: 'checkin',
        component: LuggageCheckinComponent
      },
      {
        path: 'report-loss',
        component: ReportLossComponent
      }
    ]
  }
];

export default LUGGAGE_ROUTES;
