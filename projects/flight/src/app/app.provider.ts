import { InjectionToken } from "@angular/core";

export const ACCESS_ALLOWED = new InjectionToken<boolean>('ACCESS_ALLOWED', {
  providedIn: 'root',
  factory: () => true
});
