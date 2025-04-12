import { Routes } from '@angular/router';
import { provideState,  } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { issuesReducer } from './+state/issues.reducer';
import { IssuesEffects } from './+state/issues.effects';

export const ISSUES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./issues/issues.component').then((m) => m.IssuesComponent),
    providers: [
      provideState('issues', issuesReducer),
      provideEffects(IssuesEffects),
    ],
  },
];
