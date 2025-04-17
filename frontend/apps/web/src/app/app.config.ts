import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { reducers, metaReducers } from './reducers';
import { appRoutes } from './app.routes';
import { IssuesEffects } from 'packages/features/issues/src/lib/+state/issues.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes),
    provideStore(reducers, { metaReducers }),
    provideEffects([IssuesEffects]),
  ],
};
