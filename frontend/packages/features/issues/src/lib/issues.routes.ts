import { Routes } from '@angular/router';

import { authGuard } from '@github-issues/auth';
import { IssuesComponent } from './issues/issues.component';

export const ISSUES_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: IssuesComponent,
  },
];
