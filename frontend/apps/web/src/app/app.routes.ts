import { Route } from '@angular/router';
import { authGuard, provideAuthFeature } from '@github-issues/auth';

export const appRoutes: Route[] = [
  {
    path: 'issues',
    loadChildren: () =>
      import('@github-issues/issues').then((m) => m.ISSUES_ROUTES),
    canActivate: [authGuard],
    providers: [...provideAuthFeature()],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@github-issues/auth').then((m) => m.AUTH_ROUTES),
    providers: [...provideAuthFeature()],
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
