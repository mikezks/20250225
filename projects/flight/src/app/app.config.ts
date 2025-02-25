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
import { provideNavigationService } from './shared/logic-navigation';
import { APP_NAVIGATION } from './app.navigation';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES,
      withComponentInputBinding(),
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
    provideNavigationService(APP_NAVIGATION)
  ]
};
