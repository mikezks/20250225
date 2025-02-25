import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { APP_ROUTES } from './app.routes';
import { provideRouterFeature } from './shared/logic-router-state';
import { authInterceptor } from './shared/logic-communication/auth/auth.interceptor';
import { FlightService } from './booking/api-boarding';
import { delay, tap } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES,
      withComponentInputBinding(),
      // withDebugTracing()
    ),
    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])
    ),
    provideStore(),
    provideEffects(),
    provideRouterFeature(),
    provideStoreDevtools(),
    /* provideAppInitializer((
      flightService = inject(FlightService)
    ) => flightService.find('Hamburg', '').pipe(
      delay(5_000),
      tap(console.log)
    )) */
  ]
};
