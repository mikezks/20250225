import { Router, Routes } from '@angular/router';
import { HomeComponent } from './shared/feature-core';
import { inject } from '@angular/core';
import { ACCESS_ALLOWED } from './app.provider';


export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'booking',
    loadChildren: () => import('./booking'),
    canMatch: [
      () => inject(ACCESS_ALLOWED) || inject(Router).createUrlTree(['/home'])
    ]
  },
  {
    path: 'checkin',
    loadChildren: () => import('./checkin')
  },
  {
    path: 'luggage',
    loadChildren: () => import('./luggage')
  },
  {
    path: 'boarding',
    loadChildren: () => import('./boarding')
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
